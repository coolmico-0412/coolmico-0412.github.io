/* ═══════════════════════════════════════════════════════════════
   Service Worker — ร้านค้าออนไลน์ PWA  v1.5.10

   ⚠️  快取策略修正說明：
       HTML 頁面 → Network First（確保永遠拿到最新版本）
       JS SDK / 字型 → Cache First（不常變，省流量）
       Firebase RTDB → Network First（即時資料）
   ═══════════════════════════════════════════════════════════════ */

const APP_VERSION    = 'v1.5.10'; // Firebase 資料庫規則收緊為需 auth != null；初始化流程新增
                                  // signInAnonymously()（無畫面、顧客無感登入，不 await 整個模組，
                                  // 只在 serverGet() / writeOrderToFirebase() 真正讀寫前才等待），
                                  // 登入失敗時沿用原本 _fbOK 判斷與 local fallback 顯示邏輯
                                  // 程式碼清理：移除舊版獨立客服選單殘留（toggleContactMenu/closeContactMenu 及對應 CSS，
                                  // #contact-menu 已於 v1.5.8 會員抽屜合併後不存在）；移除頁首 BOM；
                                  // 修正 viewport 停用縮放（改為可縮放，符合無障礙需求）；
                                  // 修正 cartEmpty 換行符號只替換第一個的問題（改用全域 regex，同 successMsg 作法）
const STATIC_CACHE   = `shop-static-${APP_VERSION}`;
const FONT_CACHE     = `shop-fonts-${APP_VERSION}`;
const FIREBASE_CACHE = `shop-firebase-${APP_VERSION}`;
const ALL_CACHES     = [STATIC_CACHE, FONT_CACHE, FIREBASE_CACHE];
const CACHE_PREFIX   = 'shop-'; // ← 只清除自己的舊快取，不動 pos-* / report-* 快取

const PRECACHE_ASSETS = [
  './shop-names.js',         // ← 翻譯對照表（每次更新翻譯後重新抓取）
  './shop-images.js',        // ← 商品圖片設定（每次新增/移除圖片後重新抓取）
  './shop-manifest.json',
  './icons/icon-72.png',
  './icons/icon-96.png',
  './icons/icon-128.png',
  './icons/icon-192.png',
  './icons/icon-512.png',
];

/* ── Install ── */
self.addEventListener('install', event => {
  console.log('[SW] Installing', APP_VERSION);
  // ⚠️ 不在此呼叫 skipWaiting()！
  // 新版 SW 安裝後會進入「等待」狀態，直到使用者按「立即更新」才切換。
  // 自動 skipWaiting → controllerchange → location.reload() 會造成無限刷新。
  event.waitUntil(
    caches.open(STATIC_CACHE)
      .then(cache => cache.addAll(PRECACHE_ASSETS))
      .catch(err => console.warn('[SW] Precache partial failure (non-fatal):', err))
  );
});

/* ── Activate：只清除 shop-* 舊版快取，不刪除 pos-* / report-* ── */
self.addEventListener('activate', event => {
  console.log('[SW] Activating', APP_VERSION);
  event.waitUntil(
    caches.keys()
      .then(keys => Promise.all(
        keys.filter(k => k.startsWith(CACHE_PREFIX) && !ALL_CACHES.includes(k)).map(k => {
          console.log('[SW] Delete old cache:', k);
          return caches.delete(k);
        })
      ))
      .then(() => self.clients.claim())
  );
});

/* ── Fetch ── */
self.addEventListener('fetch', event => {
  const { request } = event;
  const url = new URL(request.url);

  if (request.method !== 'GET') {
    event.respondWith(fetch(request));
    return;
  }

  // Firebase RTDB → Network First
  if (url.hostname.includes('firebasedatabase.app') ||
      url.hostname.includes('firebase.googleapis.com')) {
    event.respondWith(networkFirst(request, FIREBASE_CACHE, 10000));
    return;
  }

  // Firebase SDK (gstatic) → Cache First
  if (url.hostname === 'www.gstatic.com') {
    event.respondWith(cacheFirst(request, STATIC_CACHE));
    return;
  }

  // Google Fonts CSS → Stale While Revalidate
  if (url.hostname === 'fonts.googleapis.com') {
    event.respondWith(staleWhileRevalidate(request, FONT_CACHE));
    return;
  }

  // Google Fonts 字型 → Cache First
  if (url.hostname === 'fonts.gstatic.com') {
    event.respondWith(cacheFirst(request, FONT_CACHE));
    return;
  }

  // shop-names.js 翻譯檔、shop-images.js 圖片設定 → Network First（修改後馬上生效）
  if (url.pathname.endsWith('shop-names.js') ||
      url.pathname.endsWith('shop-images.js')) {
    event.respondWith(networkFirstHTML(request, STATIC_CACHE));
    return;
  }

  // HTML 頁面 → Network First（防止顯示舊版本的關鍵）
  if (url.pathname.endsWith('.html') ||
      url.pathname.endsWith('/') ||
      url.pathname === '/') {
    event.respondWith(networkFirstHTML(request, STATIC_CACHE));
    return;
  }

  // 其他靜態資源 → Cache First
  event.respondWith(cacheFirst(request, STATIC_CACHE));
});

/* ── Network First ── */
async function networkFirst(request, cacheName, timeoutMs) {
  try {
    const ctrl  = new AbortController();
    const timer = setTimeout(() => ctrl.abort(), timeoutMs);
    const response = await fetch(request, { signal: ctrl.signal });
    clearTimeout(timer);
    if (response.ok) {
      const cache = await caches.open(cacheName);
      cache.put(request, response.clone());
    }
    return response;
  } catch(e) {
    const cached = await caches.match(request);
    return cached || new Response(JSON.stringify({ offline: true }),
      { headers: { 'Content-Type': 'application/json' }, status: 503 });
  }
}

/* ── Network First for HTML ── */
async function networkFirstHTML(request, cacheName) {
  try {
    const response = await fetch(request);
    if (response.ok) {
      const cache = await caches.open(cacheName);
      cache.put(request, response.clone());
    }
    return response;
  } catch(e) {
    const cached = await caches.match(request)
                || await caches.match('./index.html')
                || await caches.match('./shop.html');
    if (cached) return cached;
    return new Response(
      `<!DOCTYPE html><html lang="th"><head>
        <meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1">
        <title>ออฟไลน์</title>
        <style>body{margin:0;min-height:100vh;display:flex;flex-direction:column;
          align-items:center;justify-content:center;gap:16px;background:#FFF8F2;
          font-family:sans-serif;text-align:center;padding:20px}
          .icon{font-size:56px}h2{color:#C94E6E;margin:0}p{color:#9B7060;font-size:14px;line-height:1.6;margin:0}
          button{margin-top:8px;padding:12px 28px;border:none;border-radius:50px;
            background:#C94E6E;color:#fff;font-size:15px;cursor:pointer}
        </style></head><body>
        <div class="icon">📵</div>
        <h2>ไม่มีอินเทอร์เน็ต / 離線中</h2>
        <p>กรุณาเชื่อมต่ออินเทอร์เน็ตแล้วลองใหม่<br>請連接網路後重試</p>
        <button onclick="location.reload()">ลองใหม่ / 重試</button>
      </body></html>`,
      { headers: { 'Content-Type': 'text/html; charset=utf-8' }, status: 503 }
    );
  }
}

/* ── Cache First ── */
async function cacheFirst(request, cacheName) {
  const cached = await caches.match(request);
  if (cached) return cached;
  try {
    const response = await fetch(request);
    if (response.ok) {
      const cache = await caches.open(cacheName);
      cache.put(request, response.clone());
    }
    return response;
  } catch(e) {
    return new Response('Offline', { status: 503 });
  }
}

/* ── Stale While Revalidate ── */
async function staleWhileRevalidate(request, cacheName) {
  const cached = await caches.match(request);
  const networkPromise = fetch(request).then(async r => {
    if (r.ok) { const c = await caches.open(cacheName); c.put(request, r.clone()); }
    return r;
  }).catch(() => cached || new Response('Offline', { status: 503 }));
  return cached || networkPromise;
}

/* ── Message: SKIP_WAITING ── */
self.addEventListener('message', event => {
  if (event.data?.type === 'SKIP_WAITING') self.skipWaiting();
});

/* ── Background Sync ── */
self.addEventListener('sync', event => {
  if (event.tag === 'sync-orders') {
    event.waitUntil(
      self.clients.matchAll({ type: 'window' })
        .then(clients => clients.forEach(c => c.postMessage({ type: 'SYNC_ORDERS' })))
    );
  }
});

/* ── Push ── */
self.addEventListener('push', event => {
  if (!event.data) return;
  try {
    const d = event.data.json();
    event.waitUntil(self.registration.showNotification(d.title || 'ร้านค้า', {
      body: d.body || '', icon: './icons/icon-192.png',
      badge: './icons/icon-72.png', tag: d.tag || 'shop', data: d.url || './',
    }));
  } catch(e) { console.error('[SW] Push parse error:', e); }
});
self.addEventListener('notificationclick', event => {
  event.notification.close();
  event.waitUntil(self.clients.openWindow(event.notification.data || './'));
});

console.log('[SW] Loaded', APP_VERSION);
