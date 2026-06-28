/* ══════════════════════════════════════════
   REPORT Service Worker  v1.1.0
   HTML  → Network First（永遠取最新版）
   Firebase → Network First（即時資料）
   Fonts → Stale While Revalidate / Cache First
   其他靜態資源 → Cache First

   ★ 重要：activate 事件只清除 report-* 前綴的快取，
     不影響同站的 pos-* 和 shop-* 快取。
   ══════════════════════════════════════════ */
const VER          = 'report-v1.1.0';
const STATIC_CACHE = `report-static-${VER}`;
const FONT_CACHE   = `report-fonts-${VER}`;
const ALL_CACHES   = [STATIC_CACHE, FONT_CACHE];
const CACHE_PREFIX = 'report-'; // 只清除自己的舊快取

const PRECACHE = [
  './REPORT.html',
];

/* ── Install ── */
self.addEventListener('install', e => {
  console.log('[REPORT-SW] install', VER);
  e.waitUntil(
    caches.open(STATIC_CACHE)
      .then(c => c.addAll(PRECACHE))
      .then(() => self.skipWaiting())
      .catch(() => self.skipWaiting())
  );
});

/* ── Activate：只清除 report-* 舊快取 ── */
self.addEventListener('activate', e => {
  console.log('[REPORT-SW] activate', VER);
  e.waitUntil(
    caches.keys()
      .then(keys => Promise.all(
        keys
          .filter(k => k.startsWith(CACHE_PREFIX) && !ALL_CACHES.includes(k))
          .map(k => {
            console.log('[REPORT-SW] Delete old cache:', k);
            return caches.delete(k);
          })
      ))
      .then(() => self.clients.claim())
  );
});

/* ── Fetch ── */
self.addEventListener('fetch', e => {
  const { request } = e;
  if (request.method !== 'GET') { e.respondWith(fetch(request)); return; }
  const url = new URL(request.url);

  // Firebase RTDB → Network First（即時資料）
  if (url.hostname.includes('firebasedatabase.app') ||
      url.hostname.includes('firebase.googleapis.com')) {
    e.respondWith(networkFirst(request, STATIC_CACHE, 10000));
    return;
  }
  // Firebase SDK (gstatic) → Cache First
  if (url.hostname === 'www.gstatic.com') {
    e.respondWith(cacheFirst(request, STATIC_CACHE));
    return;
  }
  // Google Fonts CSS → Stale While Revalidate
  if (url.hostname === 'fonts.googleapis.com') {
    e.respondWith(staleWhileRevalidate(request, FONT_CACHE));
    return;
  }
  // Google Fonts 字型 → Cache First
  if (url.hostname === 'fonts.gstatic.com') {
    e.respondWith(cacheFirst(request, FONT_CACHE));
    return;
  }
  // HTML → Network First（確保永遠最新）
  if (url.pathname.endsWith('.html') || url.pathname.endsWith('/') || url.pathname === '/') {
    e.respondWith(networkFirstHTML(request, STATIC_CACHE, 4500));
    return;
  }
  // 其他靜態資源 → Cache First
  e.respondWith(cacheFirst(request, STATIC_CACHE));
});

/* ── Fetch with Timeout ── */
async function fetchWithTimeout(req, timeout = 8000) {
  const ctrl = new AbortController();
  const t = setTimeout(() => ctrl.abort(), timeout);
  try {
    return await fetch(req, { signal: ctrl.signal });
  } finally {
    clearTimeout(t);
  }
}

/* ── Network First ── */
async function networkFirst(req, cache, timeout = 10000) {
  try {
    const res = await fetchWithTimeout(req, timeout);
    if (res.ok) (await caches.open(cache)).put(req, res.clone());
    return res;
  } catch(e) {
    return (await caches.match(req)) ||
      new Response(JSON.stringify({ offline: true }), {
        status: 503, headers: { 'Content-Type': 'application/json' }
      });
  }
}

/* ── Network First for HTML（含離線 fallback）── */
async function networkFirstHTML(req, cache, timeout = 4500) {
  try {
    const res = await fetchWithTimeout(req, timeout);
    if (res.ok) (await caches.open(cache)).put(req, res.clone());
    return res;
  } catch(e) {
    const cached = await caches.match(req) || await caches.match('./REPORT.html');
    if (cached) return cached;
    return new Response(
      `<!DOCTYPE html><html lang="zh-TW"><head>
        <meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1">
        <title>離線中 - REPORT</title>
        <style>body{margin:0;min-height:100vh;display:flex;flex-direction:column;
          align-items:center;justify-content:center;gap:16px;background:#f1f5f9;
          font-family:sans-serif;text-align:center;padding:20px}
          h2{color:#1e3a8a;margin:0}p{color:#64748b;font-size:14px;margin:0;line-height:1.6}
          button{padding:12px 28px;border:none;border-radius:50px;background:#1e3a8a;
            color:#fff;font-size:15px;cursor:pointer;margin-top:8px}
        </style></head><body>
        <div style="font-size:52px">📵</div>
        <h2>離線中</h2>
        <p>請連接網路後重試</p>
        <button onclick="location.reload()">重試</button>
      </body></html>`,
      { headers: { 'Content-Type': 'text/html;charset=utf-8' }, status: 503 }
    );
  }
}

/* ── Cache First ── */
async function cacheFirst(req, cache) {
  const hit = await caches.match(req);
  if (hit) return hit;
  try {
    const res = await fetch(req);
    if (res.ok) (await caches.open(cache)).put(req, res.clone());
    return res;
  } catch(e) { return new Response('Offline', { status: 503 }); }
}

/* ── Stale While Revalidate ── */
async function staleWhileRevalidate(req, cache) {
  const cached = await caches.match(req);
  const update = fetch(req).then(async r => {
    if (r.ok) (await caches.open(cache)).put(req, r.clone());
    return r;
  }).catch(() => cached);
  return cached || update;
}

/* ── Message ── */
self.addEventListener('message', e => {
  if (e.data?.type === 'SKIP_WAITING') self.skipWaiting();
});

console.log('[REPORT-SW] loaded', VER);
