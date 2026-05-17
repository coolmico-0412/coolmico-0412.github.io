/* ═══════════════════════════════════════════════════════════════
   Service Worker — ร้านค้าออนไลน์ PWA
   策略：
     靜態資源 (HTML/字體/圖示) → Cache First（離線可用）
     Firebase RTDB              → Network First（優先即時，降級快取）
     Google Fonts               → Stale While Revalidate
   ═══════════════════════════════════════════════════════════════ */

const APP_VERSION   = 'v1.1.0';   // bumped: fixed Android start_url 404
const STATIC_CACHE  = `shop-static-${APP_VERSION}`;
const FONT_CACHE    = `shop-fonts-${APP_VERSION}`;
const FIREBASE_CACHE= `shop-firebase-${APP_VERSION}`;
const ALL_CACHES    = [STATIC_CACHE, FONT_CACHE, FIREBASE_CACHE];

/* ── 預先快取的靜態資源 ── */
const STATIC_ASSETS = [
  './index.html',
  './shop_order.html',
  './manifest.json',
];

/* ══════════════════════════════════════════════
   Install: 預先快取核心資源
══════════════════════════════════════════════ */
self.addEventListener('install', event => {
  console.log('[SW] Installing', APP_VERSION);
  event.waitUntil(
    caches.open(STATIC_CACHE)
      .then(cache => cache.addAll(STATIC_ASSETS))
      .then(() => self.skipWaiting())  // 立即接管，不等舊 SW 關閉
      .catch(err => console.warn('[SW] Pre-cache failed:', err))
  );
});

/* ══════════════════════════════════════════════
   Activate: 清除舊版快取
══════════════════════════════════════════════ */
self.addEventListener('activate', event => {
  console.log('[SW] Activating', APP_VERSION);
  event.waitUntil(
    caches.keys()
      .then(keys => Promise.all(
        keys
          .filter(key => !ALL_CACHES.includes(key))
          .map(key => {
            console.log('[SW] Deleting old cache:', key);
            return caches.delete(key);
          })
      ))
      .then(() => self.clients.claim())  // 立即控制所有分頁
  );
});

/* ══════════════════════════════════════════════
   Fetch: 請求攔截與路由
══════════════════════════════════════════════ */
self.addEventListener('fetch', event => {
  const { request } = event;
  const url = new URL(request.url);

  // ── 1. Firebase RTDB → Network First（即時資料優先）──
  if (url.hostname.includes('firebasedatabase.app') ||
      url.hostname.includes('firebase.googleapis.com') ||
      url.hostname.includes('firestore.googleapis.com')) {
    event.respondWith(networkFirstWithCache(request, FIREBASE_CACHE, 10000));
    return;
  }

  // ── 2. Google Fonts CSS → Stale While Revalidate ──
  if (url.hostname === 'fonts.googleapis.com') {
    event.respondWith(staleWhileRevalidate(request, FONT_CACHE));
    return;
  }

  // ── 3. Google Fonts 字型檔 → Cache First（永久快取字型）──
  if (url.hostname === 'fonts.gstatic.com') {
    event.respondWith(cacheFirst(request, FONT_CACHE));
    return;
  }

  // ── 4. Firebase CDN (SDK JS) → Cache First ──
  if (url.hostname === 'www.gstatic.com') {
    event.respondWith(cacheFirst(request, STATIC_CACHE));
    return;
  }

  // ── 5. 本地靜態資源 → Cache First，離線回 fallback ──
  if (request.method === 'GET') {
    event.respondWith(cacheFirstWithFallback(request, STATIC_CACHE));
    return;
  }

  // ── 6. 其他（POST 等）→ 直接走網路 ──
  event.respondWith(fetch(request).catch(() =>
    new Response(JSON.stringify({ error: 'offline' }),
      { headers: { 'Content-Type': 'application/json' } })
  ));
});

/* ══════════════════════════════════════════════
   快取策略函式
══════════════════════════════════════════════ */

/** Cache First: 快取有就用，沒有才打網路，成功後存快取 */
async function cacheFirst(request, cacheName) {
  try {
    const cached = await caches.match(request);
    if (cached) return cached;
    const response = await fetch(request);
    if (response.ok) {
      const cache = await caches.open(cacheName);
      cache.put(request, response.clone());
    }
    return response;
  } catch(e) {
    const cached = await caches.match(request);
    return cached || new Response('Offline', { status: 503 });
  }
}

/** Cache First with HTML fallback: 離線時回傳主頁 */
async function cacheFirstWithFallback(request, cacheName) {
  try {
    const cached = await caches.match(request);
    if (cached) return cached;
    const response = await fetch(request);
    if (response.ok && request.method === 'GET') {
      const cache = await caches.open(cacheName);
      cache.put(request, response.clone());
    }
    return response;
  } catch(e) {
    // 離線降級：優先回 index.html（PWA start_url），再試 shop_order.html
    const fallback = await caches.match('./index.html')
                  || await caches.match('./shop_order.html');
    if (fallback) return fallback;
    return new Response(
      `<!DOCTYPE html><html><body style="font-family:sans-serif;text-align:center;padding:40px">
        <h2>📵 ไม่มีอินเทอร์เน็ต / 離線中</h2>
        <p>กรุณาเชื่อมต่ออินเทอร์เน็ตแล้วลองใหม่<br>請連接網路後重試</p>
      </body></html>`,
      { headers: { 'Content-Type': 'text/html; charset=utf-8' }, status: 503 }
    );
  }
}

/** Network First with Cache: 優先網路，逾時或失敗才用快取 */
async function networkFirstWithCache(request, cacheName, timeoutMs = 8000) {
  try {
    const fetchPromise = fetch(request);
    const timeoutPromise = new Promise((_, reject) =>
      setTimeout(() => reject(new Error('timeout')), timeoutMs)
    );
    const response = await Promise.race([fetchPromise, timeoutPromise]);
    if (response.ok) {
      const cache = await caches.open(cacheName);
      cache.put(request, response.clone());
    }
    return response;
  } catch(e) {
    const cached = await caches.match(request);
    if (cached) return cached;
    return new Response(JSON.stringify({ offline: true }),
      { headers: { 'Content-Type': 'application/json' }, status: 503 });
  }
}

/** Stale While Revalidate: 先回快取，背景更新 */
async function staleWhileRevalidate(request, cacheName) {
  const cached   = await caches.match(request);
  const fetchAndCache = fetch(request).then(async response => {
    if (response.ok) {
      const cache = await caches.open(cacheName);
      cache.put(request, response.clone());
    }
    return response;
  }).catch(() => cached);

  return cached || fetchAndCache;
}

/* ══════════════════════════════════════════════
   Background Sync: 離線訂單補送
   （當網路恢復時自動重試未送出的訂單）
══════════════════════════════════════════════ */
self.addEventListener('sync', event => {
  if (event.tag === 'sync-orders') {
    event.waitUntil(syncPendingOrders());
  }
});

async function syncPendingOrders() {
  // 通知主頁面執行補送邏輯
  const clients = await self.clients.matchAll({ type: 'window' });
  clients.forEach(client => {
    client.postMessage({ type: 'SYNC_ORDERS' });
  });
}

/* ══════════════════════════════════════════════
   Push Notifications（預留，未來可用）
══════════════════════════════════════════════ */
self.addEventListener('push', event => {
  if (!event.data) return;
  try {
    const data = event.data.json();
    event.waitUntil(
      self.registration.showNotification(data.title || 'ร้านค้า', {
        body:  data.body  || '',
        icon:  './icons/icon-192.png',
        badge: './icons/icon-72.png',
        tag:   data.tag   || 'shop-notification',
        data:  data.url   || './',
      })
    );
  } catch(e) {}
});

self.addEventListener('notificationclick', event => {
  event.notification.close();
  event.waitUntil(
    self.clients.openWindow(event.notification.data || './')
  );
});

console.log('[SW] Service Worker loaded', APP_VERSION);
