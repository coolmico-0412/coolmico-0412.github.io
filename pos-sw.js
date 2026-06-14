/* ══════════════════════════════════════════
   POS Service Worker  v1.2.9
   HTML  → Network First（永遠取最新版）
   SDK   → Cache First（省流量）
   Fonts → Stale While Revalidate
   ──────────────────────────────────────────
   版本更新紀錄 CHANGELOG
   v1.2.9
     - [Bug] saveEditProduct: outOfStock 等屬性在編輯後遺失 → spread 保留
     - [Bug] pickDataFile catch: 非 AbortError 顯示錯誤訊息錯誤 → 修正
     - [Bug] readyState 快速路徑漏呼叫 _loadHeldCarts() → 補齊
     - [Bug] setQty/renderCart/openReview 總金額缺 money() 千分位格式 → 修正
     - [Perf] 移除末尾無作用的 showPage wrapper（focusHwIfNeeded 為空函式）
   v1.2.8
     - [Bug] activate 僅清除 pos-* 舊快取，避免刪除同站其他 App 快取
   v1.2.6
     - [Bug] renderHoldBar map 參數 h 遮蔽 h() XSS 函式 → 改名 hc
     - [Bug] openModal('m-firebase') 從未呼叫 loadFbConfigToModal → 已修正
     - [Bug] 移除 toggleNewBcMode() 死碼（參照不存在的 DOM 元素）
     - [Perf] renderHoldBar/renderCart/setQty 雙 reduce → 單次迴圈
     - [Perf] 移除 _origRenderProd 空 wrapper
     - [UX]  heldCarts 以 sessionStorage 持久化，重整後不遺失
     - [CSS] will-change 加入掃描動畫元素
   v1.2.5
     - [Bug] amountToThai เอ็ด rule 修正 + ≥10M 數字修正
     - [Bug] speak() 語音重試雙響 / voice 遺失 / onvoiceschanged 覆寫 修正
     - [Feature] 線上訂單新訂單提示音 + TTS 通知
     - [Bug] clearAllData 同步清空 shop/transactions
   ★ 維護人員注意：每次修改請將版本最後數字 +1，
     並在 CHANGELOG 補充說明異動內容。
   ══════════════════════════════════════════ */
const VER          = 'pos-v1.2.9';
const STATIC_CACHE = `pos-static-${VER}`;
const FONT_CACHE   = `pos-fonts-${VER}`;
const FB_CACHE     = `pos-firebase-${VER}`;
const ALL_CACHES   = [STATIC_CACHE, FONT_CACHE, FB_CACHE];
const CACHE_PREFIX = 'pos-';

const PRECACHE = [
  './POS.html',
  './pos-manifest.json',
  './pos-icons/pos-icon-72.png',
  './pos-icons/pos-icon-96.png',
  './pos-icons/pos-icon-128.png',
  './pos-icons/pos-icon-192.png',
  './pos-icons/pos-icon-512.png',
];

/* ── Install ── */
self.addEventListener('install', e => {
  console.log('[POS-SW] install', VER);
  e.waitUntil(
    caches.open(STATIC_CACHE)
      .then(c => c.addAll(PRECACHE))
      .then(() => self.skipWaiting())
      .catch(() => self.skipWaiting())
  );
});

/* ── Activate：清舊快取 ── */
self.addEventListener('activate', e => {
  console.log('[POS-SW] activate', VER);
  e.waitUntil(
    caches.keys()
      .then(keys => Promise.all(
        keys
          .filter(k => k.startsWith(CACHE_PREFIX) && !ALL_CACHES.includes(k))
          .map(k => caches.delete(k))
      ))
      .then(() => self.clients.claim())
  );
});

/* ── Fetch ── */
self.addEventListener('fetch', e => {
  const { request } = e;
  if (request.method !== 'GET') { e.respondWith(fetch(request)); return; }
  const url = new URL(request.url);

  // Firebase RTDB → Network First
  if (url.hostname.includes('firebasedatabase.app') ||
      url.hostname.includes('firebase.googleapis.com')) {
    e.respondWith(networkFirst(request, FB_CACHE, 10000));
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

/* ── Network First ── */
async function fetchWithTimeout(req, timeout = 8000) {
  const ctrl = new AbortController();
  const t = setTimeout(() => ctrl.abort(), timeout);
  try {
    return await fetch(req, { signal: ctrl.signal });
  } finally {
    clearTimeout(t);
  }
}

async function networkFirst(req, cache, timeout = 10000) {
    try {
      const res = await fetchWithTimeout(req, timeout);
      if (res.ok) (await caches.open(cache)).put(req, res.clone());
      return res;
    } catch(e) {
      return (await caches.match(req)) ||
        new Response(JSON.stringify({ offline:true }), { status:503,
          headers:{'Content-Type':'application/json'} });
    }
  }

/* ── Network First HTML（含離線 fallback）── */
async function networkFirstHTML(req, cache, timeout = 4500) {
    try {
      const res = await fetchWithTimeout(req, timeout);
      if (res.ok) (await caches.open(cache)).put(req, res.clone());
      return res;
    } catch(e) {
      const cached = await caches.match(req) ||
                     await caches.match('./POS.html');
      if (cached) return cached;
      return new Response(
        `<!DOCTYPE html><html lang="th"><head>
          <meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1">
          <title>Offline - POS</title>
          <style>body{margin:0;min-height:100vh;display:flex;flex-direction:column;
            align-items:center;justify-content:center;gap:16px;background:#f1f5f9;
            font-family:sans-serif;text-align:center;padding:20px}
            h2{color:#2563eb;margin:0}p{color:#64748b;font-size:14px;margin:0;line-height:1.6}
            button{padding:12px 28px;border:none;border-radius:50px;background:#2563eb;
              color:#fff;font-size:15px;cursor:pointer;margin-top:8px}
          </style></head><body>
          <div style="font-size:52px">📵</div>
          <h2>ไม่มีอินเทอร์เน็ต / 離線中</h2>
          <p>กรุณาเชื่อมต่อเน็ตแล้วลองใหม่<br>請連接網路後重試</p>
          <button onclick="location.reload()">ลองใหม่ / 重試</button>
        </body></html>`,
        { headers:{'Content-Type':'text/html;charset=utf-8'}, status:503 }
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
  } catch(e) { return new Response('Offline', { status:503 }); }
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

console.log('[POS-SW] loaded', VER);
