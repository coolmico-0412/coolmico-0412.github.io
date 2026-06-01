/* ═══════════════════════════════════════════════════════════════════
   shop-names.js  —  商品名稱多語系對照表
   ═══════════════════════════════════════════════════════════════════

   ✅ 這是唯一需要編輯的翻譯檔案
      不需要動 shop.html 或任何其他檔案

   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   新增翻譯：加一行即可
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

   '商品中文名稱': { vi: '越南文名稱', id: '印尼文名稱' },

   ⚠  KEY 必須和 Firebase 裡的商品名稱一字不差（含空格、全半形）
   ⚠  vi = 越南文，id = 印尼文；其他語系不需要填，系統自動顯示原文

   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   修改後如何生效？
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

   上傳本檔到伺服器後，同時將 shop-sw.js 裡的 APP_VERSION 加一位
   （如 v1.2.1 → v1.2.2），Service Worker 才會清除快取並拉取新版本。

   ═══════════════════════════════════════════════════════════════════ */

export const PRODUCT_NAME_MAP = {

  // ── 飲料 Drinks ──────────────────────────────────────────────────
  '統一麥香奶茶':     { vi: 'Trà sữa vị lúa mì',         id: 'Teh Susu Rasa Gandum' },
  '光泉鮮乳':         { vi: 'Sữa tươi Quang Tuyền',       id: 'Susu Segar' },
  '御茶園煎茶':       { vi: 'Trà xanh kiểu Nhật',         id: 'Teh Hijau Jepang' },
  '農夫山泉礦泉水':   { vi: 'Nước khoáng',                id: 'Air Mineral' },
  '黑松沙士':         { vi: 'Nước ngọt vị thảo mộc',      id: 'Minuman Sarsaparilla' },
  '可口可樂':         { vi: 'Coca-Cola',                   id: 'Coca-Cola' },
  '百事可樂':         { vi: 'Pepsi',                       id: 'Pepsi' },
  '海洋深層水':       { vi: 'Nước biển sâu',               id: 'Air Laut Dalam' },
  '鮮果多':           { vi: 'Nước ép trái cây',            id: 'Jus Buah' },
  '舒跑':             { vi: 'Nước uống thể thao',          id: 'Minuman Olahraga' },
  '維他露':           { vi: 'Nước uống bổ sung vitamin',   id: 'Minuman Vitamin' },
  '統一AB優酪乳':     { vi: 'Sữa chua AB',                 id: 'Yogurt Probiotik AB' },
  '養樂多':           { vi: 'Yakult',                      id: 'Yakult' },
  '林鳳營鮮乳':       { vi: 'Sữa tươi Lin Feng Ying',     id: 'Susu Segar Lin Feng Ying' },
  '豆漿':             { vi: 'Sữa đậu nành',                id: 'Susu Kedelai' },
  '燕麥奶':           { vi: 'Sữa yến mạch',                id: 'Susu Oat' },
  '椰奶':             { vi: 'Nước cốt dừa',                id: 'Santan' },

  // ── 冷凍食品 Frozen Food ──────────────────────────────────────────
  '小美冰淇淋':       { vi: 'Kem que Xiaomei',             id: 'Es Krim Xiaomei' },
  '義美冰棒':         { vi: 'Kem que I-Mei',               id: 'Es Loli I-Mei' },
  '冷凍水餃':         { vi: 'Há cảo đông lạnh',            id: 'Pangsit Beku' },
  '冷凍湯圓':         { vi: 'Bánh trôi đông lạnh',         id: 'Tangyuan Beku' },
  '冷凍魚丸':         { vi: 'Viên cá đông lạnh',           id: 'Bakso Ikan Beku' },
  '冷凍蝦仁':         { vi: 'Tôm đông lạnh',               id: 'Udang Beku' },
  '冷凍雞腿':         { vi: 'Đùi gà đông lạnh',            id: 'Paha Ayam Beku' },
  '冷凍豬肉片':       { vi: 'Thịt heo thái lát đông lạnh', id: 'Daging Babi Iris Beku' },
  '速凍披薩':         { vi: 'Pizza đông lạnh',              id: 'Pizza Beku' },
  '冷凍毛豆':         { vi: 'Đậu edamame đông lạnh',       id: 'Edamame Beku' },
  '冷凍玉米':         { vi: 'Ngô đông lạnh',               id: 'Jagung Beku' },

  // ── 食品 Food ────────────────────────────────────────────────────
  '旺旺仙貝':         { vi: 'Bánh gạo Want Want',          id: 'Kerupuk Beras Want Want' },
  '義美小泡芙':       { vi: 'Bánh su kem nhỏ I-Mei',       id: 'Kue Sus Kecil I-Mei' },
  '統一布丁':         { vi: 'Bánh pudding',                id: 'Puding' },
  '泡麵':             { vi: 'Mì tôm',                      id: 'Mie Instan' },
  '統一肉燥麵':       { vi: 'Mì thịt kho',                id: 'Mie Daging Cincang' },
  '維力炸醬麵':       { vi: 'Mì tương đen',                id: 'Mie Saus Kedelai Hitam' },
  '科學麵':           { vi: 'Mì ăn liền khô (snack)',      id: 'Snack Mie Kering' },
  '乖乖':             { vi: 'Snack ngô Guai Guai',         id: 'Snack Jagung Guai Guai' },
  '洋芋片':           { vi: 'Khoai tây chiên giòn',        id: 'Keripik Kentang' },
  '巧克力':           { vi: 'Sô cô la',                    id: 'Cokelat' },
  '糖果':             { vi: 'Kẹo',                         id: 'Permen' },
  '花生':             { vi: 'Đậu phộng rang',              id: 'Kacang Tanah' },
  '瓜子':             { vi: 'Hạt bí rang',                 id: 'Biji Labu Goreng' },
  '魷魚絲':           { vi: 'Mực khô sợi',                id: 'Cumi-cumi Kering' },
  '豆干':             { vi: 'Đậu hũ khô',                 id: 'Tahu Kering' },
  '肉鬆':             { vi: 'Chà bông',                    id: 'Abon' },
  '肉紙':             { vi: 'Thịt sấy mỏng',              id: 'Daging Kering Tipis' },
  '海苔':             { vi: 'Rong biển nướng',             id: 'Rumput Laut Panggang' },
  '餅乾':             { vi: 'Bánh quy',                    id: 'Biskuit' },
  '燕麥片':           { vi: 'Yến mạch',                   id: 'Oatmeal' },
  '即食燕麥':         { vi: 'Yến mạch ăn liền',            id: 'Oatmeal Instan' },

  // ── 米 Rice ──────────────────────────────────────────────────────
  '池上米':           { vi: 'Gạo Chishang',                id: 'Beras Chishang' },
  '台灣白米':         { vi: 'Gạo trắng Đài Loan',          id: 'Beras Putih Taiwan' },
  '越光米':           { vi: 'Gạo Koshihikari',             id: 'Beras Koshihikari' },
  '糙米':             { vi: 'Gạo lứt',                     id: 'Beras Merah' },
  '泰國香米':         { vi: 'Gạo Hom Mali Thái',           id: 'Beras Wangi Thailand' },
  '五穀米':           { vi: 'Gạo ngũ cốc',                 id: 'Beras Lima Biji-bijian' },

  // ── 調味品 Seasonings ─────────────────────────────────────────────
  '醬油':             { vi: 'Nước tương',                  id: 'Kecap Asin' },
  '醬油膏':           { vi: 'Nước tương đặc',              id: 'Kecap Manis Kental' },
  '沙拉油':           { vi: 'Dầu ăn',                      id: 'Minyak Goreng' },
  '芝麻油':           { vi: 'Dầu mè',                      id: 'Minyak Wijen' },
  '烏醋':             { vi: 'Giấm đen',                    id: 'Cuka Hitam' },
  '白醋':             { vi: 'Giấm trắng',                  id: 'Cuka Putih' },
  '蠔油':             { vi: 'Dầu hào',                     id: 'Saus Tiram' },
  '魚露':             { vi: 'Nước mắm',                    id: 'Kecap Ikan' },
  '辣椒醬':           { vi: 'Tương ớt',                    id: 'Sambal' },
  '番茄醬':           { vi: 'Tương cà',                    id: 'Saus Tomat' },
  '味噌':             { vi: 'Tương miso',                  id: 'Miso' },
  '味精':             { vi: 'Bột ngọt',                    id: 'Penyedap Rasa MSG' },
  '砂糖':             { vi: 'Đường cát',                   id: 'Gula Pasir' },
  '二砂糖':           { vi: 'Đường vàng',                  id: 'Gula Merah Pasir' },
  '鹽':               { vi: 'Muối',                        id: 'Garam' },
  '胡椒粉':           { vi: 'Bột tiêu',                    id: 'Lada Hitam Bubuk' },
  '辣椒粉':           { vi: 'Bột ớt',                      id: 'Cabai Bubuk' },
  '薑黃粉':           { vi: 'Bột nghệ',                    id: 'Bubuk Kunyit' },
  '咖哩粉':           { vi: 'Bột cà ri',                   id: 'Bubuk Kari' },

  // ── 酒 Alcohol ────────────────────────────────────────────────────
  '台灣啤酒':         { vi: 'Bia Đài Loan',                id: 'Bir Taiwan' },
  '啤酒':             { vi: 'Bia',                         id: 'Bir' },
  '紹興酒':           { vi: 'Rượu Thiệu Hưng',            id: 'Arak Shaoxing' },
  '米酒':             { vi: 'Rượu gạo',                   id: 'Arak Beras' },
  '高粱酒':           { vi: 'Rượu cao lương',              id: 'Arak Sorgum' },
  '紅酒':             { vi: 'Rượu vang đỏ',               id: 'Wine Merah' },
  '威士忌':           { vi: 'Rượu whisky',                id: 'Wiski' },

  // ── 清潔保養品 Hygiene & Beauty ───────────────────────────────────
  '洗髮精':           { vi: 'Dầu gội đầu',                id: 'Sampo' },
  '潤髮乳':           { vi: 'Dầu xả tóc',                 id: 'Kondisioner Rambut' },
  '沐浴乳':           { vi: 'Sữa tắm',                    id: 'Sabun Mandi Cair' },
  '洗面乳':           { vi: 'Sữa rửa mặt',                id: 'Sabun Cuci Muka' },
  '牙膏':             { vi: 'Kem đánh răng',               id: 'Pasta Gigi' },
  '牙刷':             { vi: 'Bàn chải đánh răng',         id: 'Sikat Gigi' },
  '衛生紙':           { vi: 'Giấy vệ sinh',               id: 'Tisu Toilet' },
  '濕紙巾':           { vi: 'Khăn ướt',                   id: 'Tisu Basah' },
  '洗衣精':           { vi: 'Nước giặt',                  id: 'Deterjen Cair' },
  '洗碗精':           { vi: 'Nước rửa chén',              id: 'Sabun Cuci Piring' },
  '衛生棉':           { vi: 'Băng vệ sinh',               id: 'Pembalut' },
  '面膜':             { vi: 'Mặt nạ dưỡng da',            id: 'Masker Wajah' },
  '乳液':             { vi: 'Kem dưỡng ẩm',               id: 'Losion' },
  '防曬乳':           { vi: 'Kem chống nắng',             id: 'Tabir Surya' },
  '護手霜':           { vi: 'Kem dưỡng tay',              id: 'Pelembab Tangan' },
  '棉花棒':           { vi: 'Tăm bông',                   id: 'Cotton Bud' },
  '剃鬚刀':           { vi: 'Dao cạo râu',                id: 'Pisau Cukur' },

};
