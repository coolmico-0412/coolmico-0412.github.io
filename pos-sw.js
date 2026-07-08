/* ══════════════════════════════════════════
   POS Service Worker  v1.2.14
   HTML  → Network First（永遠取最新版）
   SDK   → Cache First（省流量）
   Fonts → Stale While Revalidate
   ──────────────────────────────────────────
   v1.2.14（線上訂單移除會員列表；賒帳新增收據截圖上傳，
            SW 本身無邏輯變動，僅提升版號以促使已安裝的 PWA
            儘快取得更新後的 POS.html）
     1. [Feature] 線上訂單頁移除「會員列表」統計按鈕與彈跳視窗
        （ooOpenMemberList/ooOpenMemberHistory 及 m-member-list/
        m-member-history 兩個 Modal 一併移除），統計按鈕格數由
        3 欄改為 2 欄（僅保留「待處理」「已完成」）
     2. [Feature] 勾選「賒帳」並按下「確定結帳」時，於關閉「確認
        購買清單」畫面前先擷取該畫面截圖（html2canvas，由 CDN
        延遲載入，僅賒帳交易才載入），結帳完成後於背景上傳至
        ImgBB 圖床；成功後圖片網址存入該筆交易 receiptUrl，可於
        「交易明細」彈跳視窗（openTxDetail）點擊查看，失敗則
        顯示提示但不影響結帳流程本身
     3. [Fix] confirmCheckout 因新增 await 擷取畫面截圖而改為
        async function；為避免賒帳交易的雙音提示音／語音因排在
        await 之後而脫離使用者手勢範圍、導致 iOS 無法播放語音，
        兩者一律搶先移至函式最開頭同步觸發
   v1.2.13（POS.html 新增「賒帳」功能，SW 本身無邏輯變動，
            僅提升版號以促使已安裝的 PWA 儘快取得更新後的 POS.html）
     1. [Feature] 結帳按鈕與暫存按鈕中間新增「賒帳」核取方塊（中泰雙語），
        勾選後總計 ×1.1；本週交易明細內賒帳交易底色改為蒂芬妮藍；
        交易明細彈跳視窗與確認購買清單最下面新增「賒帳10%」中泰雙語費用列
   v1.2.12（POS.html 程式碼健檢：安全性 + 一致性修正，SW 本身無邏輯變動，
            僅提升版號以促使已安裝的 PWA 儘快取得更新後的 POS.html）
     1. [Security] confirmDeleteTx 品項摘要缺 h() 轉義（tx.items 可能源自
        Firebase 線上訂單資料）→ 補上轉義，並補 money() 格式化
     2. [Bug] isValidBarcode 允許 . / $ 但這些是 Firebase RTDB 鍵值保留字元，
        含這些字元的條碼會靜默同步失敗 → 驗證規則改為不允許
     3. [Bug] renderProdGrid 分類列表 empty class 三元運算式寫成
        empty?' ':' '（兩分支相同，從未真正套用）→ 修正並補齊對應 CSS
     4. [Bug] showDrilldown 以 {} 分組商品名稱，商品名稱為 '__proto__' 時
        可能汙染 Object.prototype → 改用 Object.create(null)
     5. [Bug] 多處金額顯示未套用 money()（addByBarcode/addNobcProdToCart
        狀態列、saveTempNobc、renderRecentTx 統計卡片）→ 統一格式化
     6. [Perf] 移除 6 個已無呼叫點的空函式（onHwKeydown 等相容舊呼叫點死碼）
   v1.2.11
     1. [Bug] 關閉平板/手機螢幕後再開啟，畫面空白需點擊才能恢復
        根本原因 A：.overlay 與 #numpad-overlay 的 backdrop-filter:blur(2px)
          在 opacity:0（關閉狀態）時仍建立 GPU 合成層，螢幕喚醒後
          GPU Compositor 無法自動重繪，直到觸控事件才恢復。
          → 修正：將 backdrop-filter 移至 .open 狀態，僅在 Modal 開啟時才啟用。
        根本原因 B：無「螢幕喚醒 → 強制重繪」機制。
          → 修正：新增全域 visibilitychange 監聽器，
            使用雙幀 rAF 觸發 GPU 合成層重繪，模擬點擊的喚醒效果。
   v1.2.10
     - [Bug] renderHoldBar: 暫存購物車金額未套用 money() → 修正千分位格式
     - [Bug] openReview table: 結帳明細單價/小計未套用 money() → 修正
     - [Bug] renderCart row: 購物車商品單價未套用 money() → 修正
     - [Bug] renderNobcListModal/renderProdGrid: 商品價格顯示缺 money() → 修正
     - [Bug] showDrilldown/renderMonthly/Weekly/Daily: 金額缺 money() → 修正
     - [Perf] renderStats: 移除 6 個引用不存在 DOM 元素的死碼 → pass-through
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
const VER          = 'pos-v1.2.14';
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
