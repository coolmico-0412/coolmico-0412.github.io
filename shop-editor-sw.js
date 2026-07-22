/* ═══════════════════════════════════════════════════════════════════
   shop-editor-sw.js — 獨立 Service Worker
   ═══════════════════════════════════════════════════════════════════

   ✅ 這支 Service Worker 只服務「商品翻譯 & 圖片設定編輯器」自己
      跟 shop.html 用的 shop-sw.js 完全分開：
      - 快取名稱不同（shop-editor-cache-* vs shop-sw 那邊自己的命名）
      - 註冊時的 scope 鎖定在 shop-editor.html 這一頁本身
        （在 shop-editor.html 裡的 <script> 註冊時指定）
      → 兩支 Service Worker 不會互相覆蓋、也不會互相清對方的快取

   策略：Network First（跟 shop-sw.js 目前的策略一致）
      連得上網路時，永遠抓最新版本並更新快取；
      抓不到網路（離線）時，才退而使用快取內容，
      讓這個編輯器在沒有網路時也還能開啟、繼續編輯。

   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   修改後如何生效？
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   把下面的 APP_VERSION 加一版（如 v1 → v2），
   下次開啟編輯器時就會自動清掉舊快取、抓新版本。
   ═══════════════════════════════════════════════════════════════════ */

const APP_VERSION = 'v2';
const CACHE_NAME = `shop-editor-cache-${APP_VERSION}`;

// App Shell：離線時仍要能開啟編輯器所需的最基本檔案
const APP_SHELL = [
  './shop-editor.html',
  './shop-editor.webmanifest',
  './icons/shop-editor-icon-192.png',
  './icons/shop-editor-icon-512.png',
];

self.addEventListener('install', (event) => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(APP_SHELL))
      .catch(() => { /* 首次安裝時若抓不到某個檔案就先略過，不擋住安裝 */ })
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then((names) => Promise.all(
        names
          .filter((n) => n.startsWith('shop-editor-cache-') && n !== CACHE_NAME)
          .map((n) => caches.delete(n))
      ))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  const req = event.request;
  if (req.method !== 'GET') return;

  // 只處理同源（自己網站）的請求；Google Fonts 等跨網域請求交給瀏覽器自己處理，
  // 避免跨網域快取造成不必要的複雜度
  const url = new URL(req.url);
  if (url.origin !== self.location.origin) return;

  event.respondWith(
    fetch(req)
      .then((res) => {
        const resClone = res.clone();
        caches.open(CACHE_NAME).then((cache) => cache.put(req, resClone)).catch(() => {});
        return res;
      })
      .catch(() => caches.match(req))
  );
});
