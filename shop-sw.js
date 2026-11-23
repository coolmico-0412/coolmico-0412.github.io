/* ═══════════════════════════════════════════════════════════════
   Service Worker — ร้านค้าออนไลน์ PWA  v1.5.11

   快取策略：
     HTML 頁面 / shop-names.js / shop-images.js → Network First（永遠拿到最新版本，離線才用快取）
     商品圖片 images/*.webp                      → Stale While Revalidate（先顯示快取、背景更新，
                                                    換圖不必再靠 bump 版本號）
     Firebase SDK (gstatic) / 字型               → Cache First（不常變，省流量）
     其他同源靜態檔（icon、manifest）            → Cache First
     Firebase RTDB / Auth、Nominatim、OSM 圖磚、
     Leaflet CDN 等跨網域請求                    → 不攔截，交給瀏覽器處理

   v1.5.11 修正摘要：
     · 預快取改用 Promise.allSettled：原本 cache.addAll() 是「全有或全無」，任何一個檔案 404
       （例如 icon 漏傳）會導致整批都沒快取，卻只印出 "partial failure"
     · 預快取加入 ./shop.html，確保第一次離線也打得開
     · 所有 caches.match() 改為只查自己的快取：原本跨所有快取查詢，離線 fallback 的
       './index.html' 可能撈到同網域 POS / report 系統的頁面
     · 不再攔截 Firebase RTDB：原本 10 秒 AbortController 會把 long-polling（WebSocket 被擋時的
       備援傳輸，本來就會連線 30 秒以上）強制中斷，且會把帶 auth token 的 URL 存進 Cache Storage
     · 不再攔截非 GET 與跨網域請求：原本 Nominatim 反查結果與 OSM 圖磚都被 Cache First 無限制快取
     · stale-while-revalidate 補上 event.waitUntil，避免背景更新被瀏覽器提早終止
     · 離線備援頁只回給「頁面導覽」；JS / JSON 請求失敗不再回傳 HTML
     · push 通知點擊改開 ./shop.html（原本 './' 會開到網域根目錄，可能是 POS）
   ═══════════════════════════════════════════════════════════════ */

const APP_VERSION    = 'v1.5.11';
const STATIC_CACHE   = `shop-static-${APP_VERSION}`;
const FONT_CACHE     = `shop-fonts-${APP_VERSION}`;
const ALL_CACHES     = [STATIC_CACHE, FONT_CACHE];
const CACHE_PREFIX   = 'shop-'; // ← 只清除自己的舊快取，不動 pos-* / report-* 快取

const PRECACHE_ASSETS = [
  './shop.html',             // ← 頁面本體（離線 fallback 用）
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
  // 新版 SW 安裝後進入「等待」狀態，由頁面在「沒有填寫中的訂單」時送 SKIP_WAITING 才切換。
  event.waitUntil(
    caches.open(STATIC_CACHE).then(cache =>
      // 逐一加入：個別檔案失敗不影響其他檔案（addAll 是全有或全無）
      Promise.allSettled(PRECACHE_ASSETS.map(url => cache.add(url))).then(results => {
        const failed = results
          .map((r, i) => (r.status === 'rejected' ? PRECACHE_ASSETS[i] : null))
          .filter(Boolean);
        if (failed.length) console.warn('[SW] Precache failed (non-fatal):', failed);
      })
    )
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

  // 非 GET（Firebase Auth 的 POST 等）→ 完全交給瀏覽器
  if (request.method !== 'GET') return;

  const url = new URL(request.url);

  // Firebase SDK (gstatic，網址含版本號) → Cache First
  if (url.hostname === 'www.gstatic.com') {
    event.respondWith(cacheFirst(request, STATIC_CACHE));
    return;
  }
  // Google Fonts CSS → Stale While Revalidate
  if (url.hostname === 'fonts.googleapis.com') {
    event.respondWith(staleWhileRevalidate(event, FONT_CACHE));
    return;
  }
  // Google Fonts 字型檔 → Cache First
  if (url.hostname === 'fonts.gstatic.com') {
    event.respondWith(cacheFirst(request, FONT_CACHE));
    return;
  }

  // 其餘跨網域請求（Firebase RTDB / Auth、Nominatim、OSM 圖磚、Leaflet CDN…）→ 不攔截
  if (url.origin !== self.location.origin) return;

  // 頁面導覽 / HTML → Network First（防止顯示舊版本的關鍵）
  if (request.mode === 'navigate' ||
      url.pathname.endsWith('.html') ||
      url.pathname.endsWith('/')) {
    event.respondWith(networkFirst(request, STATIC_CACHE, { navigation: true }));
    return;
  }

  // shop-names.js 翻譯檔、shop-images.js 圖片設定 → Network First（修改後馬上生效）
  if (url.pathname.endsWith('shop-names.js') ||
      url.pathname.endsWith('shop-images.js')) {
    event.respondWith(networkFirst(request, STATIC_CACHE, { navigation: false }));
    return;
  }

  // 商品圖片 → Stale While Revalidate（換圖後下次開啟即更新）
  if (url.pathname.includes('/images/')) {
    event.respondWith(staleWhileRevalidate(event, STATIC_CACHE));
    return;
  }

  // 其他同源靜態資源（icon、manifest）→ Cache First
  event.respondWith(cacheFirst(request, STATIC_CACHE));
});

/* ── Network First（只查自己的快取）── */
async function networkFirst(request, cacheName, { navigation }) {
  const cache = await caches.open(cacheName);
  try {
    const response = await fetch(request);
    if (response.ok) cache.put(request, response.clone());
    return response;
  } catch (e) {
    const cached = await cache.match(request, { ignoreSearch: true })
                || (navigation ? await cache.match('./shop.html') : null);
    if (cached) return cached;

    if (!navigation) return new Response('', { status: 503 });

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

/* ── Cache First（只查自己的快取）── */
async function cacheFirst(request, cacheName) {
  const cache  = await caches.open(cacheName);
  const cached = await cache.match(request);
  if (cached) return cached;
  try {
    const response = await fetch(request);
    if (response.ok) cache.put(request, response.clone());
    return response;
  } catch (e) {
    return new Response('Offline', { status: 503 });
  }
}

/* ── Stale While Revalidate（背景更新以 waitUntil 保活）── */
async function staleWhileRevalidate(event, cacheName) {
  const { request } = event;
  const cache  = await caches.open(cacheName);
  const cached = await cache.match(request);

  const network = fetch(request).then(async response => {
    if (response && response.ok) await cache.put(request, response.clone());
    return response;
  });

  if (cached) {
    event.waitUntil(network.catch(() => {}));   // 背景更新失敗無妨
    return cached;
  }
  return network.catch(() => new Response('Offline', { status: 503 }));
}

/* ── Message: SKIP_WAITING ── */
self.addEventListener('message', event => {
  if (event.data?.type === 'SKIP_WAITING') self.skipWaiting();
});

/* ── Background Sync（頁面端目前沒有處理 SYNC_ORDERS，保留供日後使用）── */
self.addEventListener('sync', event => {
  if (event.tag === 'sync-orders') {
    event.waitUntil(
      self.clients.matchAll({ type: 'window' })
        .then(clients => clients.forEach(c => c.postMessage({ type: 'SYNC_ORDERS' })))
    );
  }
});

/* ── Push（頁面端目前沒有訂閱流程，保留供日後使用）── */
self.addEventListener('push', event => {
  if (!event.data) return;
  try {
    const d = event.data.json();
    event.waitUntil(self.registration.showNotification(d.title || 'ร้านค้า', {
      body: d.body || '', icon: './icons/icon-192.png',
      badge: './icons/icon-72.png', tag: d.tag || 'shop', data: d.url || './shop.html',
    }));
  } catch(e) { console.error('[SW] Push parse error:', e); }
});
self.addEventListener('notificationclick', event => {
  event.notification.close();
  const target = new URL(event.notification.data || './shop.html', self.registration.scope).href;
  event.waitUntil(
    self.clients.matchAll({ type: 'window', includeUncontrolled: true }).then(list => {
      const existing = list.find(c => c.url.startsWith(self.registration.scope) && 'focus' in c);
      return existing ? existing.focus() : self.clients.openWindow(target);
    })
  );
});

console.log('[SW] Loaded', APP_VERSION);
