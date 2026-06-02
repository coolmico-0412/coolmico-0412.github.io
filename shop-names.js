/* ═══════════════════════════════════════════════════════════════════
   shop-names.js  —  商品名稱多語系對照表
   ═══════════════════════════════════════════════════════════════════

   ✅ 這是唯一需要編輯的翻譯檔案
      不需要動 shop.html 或任何其他檔案

   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   新增翻譯：加一行即可
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

   '商品中文名稱': { en: 'English', vi: '越南文', id: '印尼文' },

   ⚠  KEY 必須和 Firebase 裡的商品名稱一字不差（含空格、全半形）
   ⚠  en = 英文（菲律賓 PH），vi = 越南文，id = 印尼文
      其他語系不需要填，系統自動顯示原文

   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   修改後如何生效？
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

   上傳本檔到伺服器後，同時將 shop-sw.js 裡的 APP_VERSION 加一位
   （如 v1.3.0 → v1.3.1），Service Worker 才會清除快取並拉取新版本。

   ═══════════════════════════════════════════════════════════════════ */

export const PRODUCT_NAME_MAP = {

  // ── 飲料 Drinks ──────────────────────────────────────────────────
  '統一麥香奶茶':     { en: 'Wheat Milk Tea',              vi: 'Trà sữa vị lúa mì',         id: 'Teh Susu Rasa Gandum' },
  '光泉鮮乳':         { en: 'Fresh Milk',                  vi: 'Sữa tươi Quang Tuyền',       id: 'Susu Segar' },
  '御茶園煎茶':       { en: 'Japanese Green Tea',          vi: 'Trà xanh kiểu Nhật',         id: 'Teh Hijau Jepang' },
  '農夫山泉礦泉水':   { en: 'Mineral Water',               vi: 'Nước khoáng',                id: 'Air Mineral' },
  '黑松沙士':         { en: 'Sarsaparilla Soda',           vi: 'Nước ngọt vị thảo mộc',      id: 'Minuman Sarsaparilla' },
  '可口可樂':         { en: 'Coca-Cola',                   vi: 'Coca-Cola',                   id: 'Coca-Cola' },
  '百事可樂':         { en: 'Pepsi',                       vi: 'Pepsi',                       id: 'Pepsi' },
  '海洋深層水':       { en: 'Deep Ocean Water',            vi: 'Nước biển sâu',               id: 'Air Laut Dalam' },
  '鮮果多':           { en: 'Fruit Juice',                 vi: 'Nước ép trái cây',            id: 'Jus Buah' },
  '舒跑':             { en: 'Sports Drink',                vi: 'Nước uống thể thao',          id: 'Minuman Olahraga' },
  '維他露':           { en: 'Vitamin Water',               vi: 'Nước uống bổ sung vitamin',   id: 'Minuman Vitamin' },
  '統一AB優酪乳':     { en: 'AB Yogurt Drink',             vi: 'Sữa chua AB',                 id: 'Yogurt Probiotik AB' },
  '養樂多':           { en: 'Yakult',                      vi: 'Yakult',                      id: 'Yakult' },
  '林鳳營鮮乳':       { en: 'Lin Feng Ying Fresh Milk',    vi: 'Sữa tươi Lin Feng Ying',     id: 'Susu Segar Lin Feng Ying' },
  '豆漿':             { en: 'Soy Milk',                    vi: 'Sữa đậu nành',                id: 'Susu Kedelai' },
  '燕麥奶':           { en: 'Oat Milk',                    vi: 'Sữa yến mạch',                id: 'Susu Oat' },
  '椰奶':             { en: 'Coconut Milk',                vi: 'Nước cốt dừa',                id: 'Santan' },

  // ── 冷凍食品 Frozen Food ──────────────────────────────────────────
  '小美冰淇淋':       { en: 'Xiaomei Ice Cream Bar',       vi: 'Kem que Xiaomei',             id: 'Es Krim Xiaomei' },
  '義美冰棒':         { en: 'I-Mei Ice Pop',               vi: 'Kem que I-Mei',               id: 'Es Loli I-Mei' },
  '冷凍水餃':         { en: 'Frozen Dumplings',            vi: 'Há cảo đông lạnh',            id: 'Pangsit Beku' },
  '冷凍湯圓':         { en: 'Frozen Tang Yuan',            vi: 'Bánh trôi đông lạnh',         id: 'Tangyuan Beku' },
  '冷凍魚丸':         { en: 'Frozen Fish Balls',           vi: 'Viên cá đông lạnh',           id: 'Bakso Ikan Beku' },
  '冷凍蝦仁':         { en: 'Frozen Shrimp',               vi: 'Tôm đông lạnh',               id: 'Udang Beku' },
  '冷凍雞腿':         { en: 'Frozen Chicken Leg',          vi: 'Đùi gà đông lạnh',            id: 'Paha Ayam Beku' },
  '冷凍豬肉片':       { en: 'Frozen Sliced Pork',          vi: 'Thịt heo thái lát đông lạnh', id: 'Daging Babi Iris Beku' },
  '速凍披薩':         { en: 'Frozen Pizza',                vi: 'Pizza đông lạnh',              id: 'Pizza Beku' },
  '冷凍毛豆':         { en: 'Frozen Edamame',              vi: 'Đậu edamame đông lạnh',       id: 'Edamame Beku' },
  '冷凍玉米':         { en: 'Frozen Corn',                 vi: 'Ngô đông lạnh',               id: 'Jagung Beku' },

  // ── 食品 Food ────────────────────────────────────────────────────
  '旺旺仙貝':         { en: 'Want Want Rice Crackers',     vi: 'Bánh gạo Want Want',          id: 'Kerupuk Beras Want Want' },
  '義美小泡芙':       { en: 'I-Mei Mini Cream Puffs',      vi: 'Bánh su kem nhỏ I-Mei',       id: 'Kue Sus Kecil I-Mei' },
  '統一布丁':         { en: 'Uni-President Pudding',       vi: 'Bánh pudding',                id: 'Puding' },
  '泡麵':             { en: 'Instant Noodles',             vi: 'Mì tôm',                      id: 'Mie Instan' },
  '統一肉燥麵':       { en: 'Braised Pork Noodles',        vi: 'Mì thịt kho',                id: 'Mie Daging Cincang' },
  '維力炸醬麵':       { en: 'Black Bean Paste Noodles',    vi: 'Mì tương đen',                id: 'Mie Saus Kedelai Hitam' },
  '科學麵':           { en: 'Dry Snack Noodles',           vi: 'Mì ăn liền khô (snack)',      id: 'Snack Mie Kering' },
  '乖乖':             { en: 'Guai Guai Corn Snack',        vi: 'Snack ngô Guai Guai',         id: 'Snack Jagung Guai Guai' },
  '洋芋片':           { en: 'Potato Chips',                vi: 'Khoai tây chiên giòn',        id: 'Keripik Kentang' },
  '巧克力':           { en: 'Chocolate',                   vi: 'Sô cô la',                    id: 'Cokelat' },
  '糖果':             { en: 'Candy',                       vi: 'Kẹo',                         id: 'Permen' },
  '花生':             { en: 'Roasted Peanuts',             vi: 'Đậu phộng rang',              id: 'Kacang Tanah' },
  '瓜子':             { en: 'Roasted Pumpkin Seeds',       vi: 'Hạt bí rang',                 id: 'Biji Labu Goreng' },
  '魷魚絲':           { en: 'Dried Shredded Squid',        vi: 'Mực khô sợi',                id: 'Cumi-cumi Kering' },
  '豆干':             { en: 'Dried Tofu',                  vi: 'Đậu hũ khô',                 id: 'Tahu Kering' },
  '肉鬆':             { en: 'Pork Floss',                  vi: 'Chà bông',                    id: 'Abon' },
  '肉紙':             { en: 'Pork Jerky Sheet',            vi: 'Thịt sấy mỏng',              id: 'Daging Kering Tipis' },
  '海苔':             { en: 'Roasted Seaweed',             vi: 'Rong biển nướng',             id: 'Rumput Laut Panggang' },
  '餅乾':             { en: 'Biscuits',                    vi: 'Bánh quy',                    id: 'Biskuit' },
  '燕麥片':           { en: 'Oats',                        vi: 'Yến mạch',                   id: 'Oatmeal' },
  '即食燕麥':         { en: 'Instant Oatmeal',             vi: 'Yến mạch ăn liền',            id: 'Oatmeal Instan' },

  // ── 米 Rice ──────────────────────────────────────────────────────
  '池上米':           { en: 'Chishang Rice',               vi: 'Gạo Chishang',                id: 'Beras Chishang' },
  '台灣白米':         { en: 'Taiwan White Rice',           vi: 'Gạo trắng Đài Loan',          id: 'Beras Putih Taiwan' },
  '越光米':           { en: 'Koshihikari Rice',            vi: 'Gạo Koshihikari',             id: 'Beras Koshihikari' },
  '糙米':             { en: 'Brown Rice',                  vi: 'Gạo lứt',                     id: 'Beras Merah' },
  '泰國香米':         { en: 'Thai Jasmine Rice',           vi: 'Gạo Hom Mali Thái',           id: 'Beras Wangi Thailand' },
  '五穀米':           { en: 'Five-Grain Rice',             vi: 'Gạo ngũ cốc',                 id: 'Beras Lima Biji-bijian' },

  // ── 調味品 Seasonings ─────────────────────────────────────────────
  '醬油':             { en: 'Soy Sauce',                   vi: 'Nước tương',                  id: 'Kecap Asin' },
  '醬油膏':           { en: 'Thick Soy Sauce',             vi: 'Nước tương đặc',              id: 'Kecap Manis Kental' },
  '沙拉油':           { en: 'Cooking Oil',                 vi: 'Dầu ăn',                      id: 'Minyak Goreng' },
  '芝麻油':           { en: 'Sesame Oil',                  vi: 'Dầu mè',                      id: 'Minyak Wijen' },
  '烏醋':             { en: 'Black Vinegar',               vi: 'Giấm đen',                    id: 'Cuka Hitam' },
  '白醋':             { en: 'White Vinegar',               vi: 'Giấm trắng',                  id: 'Cuka Putih' },
  '蠔油':             { en: 'Oyster Sauce',                vi: 'Dầu hào',                     id: 'Saus Tiram' },
  '魚露':             { en: 'Fish Sauce',                  vi: 'Nước mắm',                    id: 'Kecap Ikan' },
  '辣椒醬':           { en: 'Chili Sauce',                 vi: 'Tương ớt',                    id: 'Sambal' },
  '番茄醬':           { en: 'Ketchup',                     vi: 'Tương cà',                    id: 'Saus Tomat' },
  '味噌':             { en: 'Miso Paste',                  vi: 'Tương miso',                  id: 'Miso' },
  '味精':             { en: 'MSG',                         vi: 'Bột ngọt',                    id: 'Penyedap Rasa MSG' },
  '砂糖':             { en: 'White Sugar',                 vi: 'Đường cát',                   id: 'Gula Pasir' },
  '二砂糖':           { en: 'Raw Cane Sugar',              vi: 'Đường vàng',                  id: 'Gula Merah Pasir' },
  '鹽':               { en: 'Salt',                        vi: 'Muối',                        id: 'Garam' },
  '胡椒粉':           { en: 'Black Pepper Powder',         vi: 'Bột tiêu',                    id: 'Lada Hitam Bubuk' },
  '辣椒粉':           { en: 'Chili Powder',                vi: 'Bột ớt',                      id: 'Cabai Bubuk' },
  '薑黃粉':           { en: 'Turmeric Powder',             vi: 'Bột nghệ',                    id: 'Bubuk Kunyit' },
  '咖哩粉':           { en: 'Curry Powder',                vi: 'Bột cà ri',                   id: 'Bubuk Kari' },

  // ── 酒 Alcohol ────────────────────────────────────────────────────
  '台灣啤酒':         { en: 'Taiwan Beer',                 vi: 'Bia Đài Loan',                id: 'Bir Taiwan' },
  '啤酒':             { en: 'Beer',                        vi: 'Bia',                         id: 'Bir' },
  '紹興酒':           { en: 'Shaoxing Rice Wine',          vi: 'Rượu Thiệu Hưng',            id: 'Arak Shaoxing' },
  '米酒':             { en: 'Rice Wine',                   vi: 'Rượu gạo',                   id: 'Arak Beras' },
  '高粱酒':           { en: 'Sorghum Baijiu',              vi: 'Rượu cao lương',              id: 'Arak Sorgum' },
  '紅酒':             { en: 'Red Wine',                    vi: 'Rượu vang đỏ',               id: 'Wine Merah' },
  '威士忌':           { en: 'Whisky',                      vi: 'Rượu whisky',                id: 'Wiski' },

  // ── 清潔保養品 Hygiene & Beauty ───────────────────────────────────
  '洗髮精':           { en: 'Shampoo',                     vi: 'Dầu gội đầu',                id: 'Sampo' },
  '潤髮乳':           { en: 'Hair Conditioner',            vi: 'Dầu xả tóc',                 id: 'Kondisioner Rambut' },
  '沐浴乳':           { en: 'Body Wash',                   vi: 'Sữa tắm',                    id: 'Sabun Mandi Cair' },
  '洗面乳':           { en: 'Facial Cleanser',             vi: 'Sữa rửa mặt',                id: 'Sabun Cuci Muka' },
  '牙膏':             { en: 'Toothpaste',                  vi: 'Kem đánh răng',               id: 'Pasta Gigi' },
  '牙刷':             { en: 'Toothbrush',                  vi: 'Bàn chải đánh răng',         id: 'Sikat Gigi' },
  '衛生紙':           { en: 'Toilet Paper',                vi: 'Giấy vệ sinh',               id: 'Tisu Toilet' },
  '濕紙巾':           { en: 'Wet Wipes',                   vi: 'Khăn ướt',                   id: 'Tisu Basah' },
  '洗衣精':           { en: 'Laundry Detergent',           vi: 'Nước giặt',                  id: 'Deterjen Cair' },
  '洗碗精':           { en: 'Dish Soap',                   vi: 'Nước rửa chén',              id: 'Sabun Cuci Piring' },
  '衛生棉':           { en: 'Sanitary Pads',               vi: 'Băng vệ sinh',               id: 'Pembalut' },
  '面膜':             { en: 'Sheet Mask',                  vi: 'Mặt nạ dưỡng da',            id: 'Masker Wajah' },
  '乳液':             { en: 'Body Lotion',                 vi: 'Kem dưỡng ẩm',               id: 'Losion' },
  '防曬乳':           { en: 'Sunscreen',                   vi: 'Kem chống nắng',             id: 'Tabir Surya' },
  '護手霜':           { en: 'Hand Cream',                  vi: 'Kem dưỡng tay',              id: 'Pelembab Tangan' },
  '棉花棒':           { en: 'Cotton Buds',                 vi: 'Tăm bông',                   id: 'Cotton Bud' },
  '剃鬚刀':           { en: 'Razor',                       vi: 'Dao cạo râu',                id: 'Pisau Cukur' },

  // ── 其他 ───────────────────────────────────
  '橡皮圈':           { en: '1',                     vi: '2',                id: '3' },
  '平口夾':           { en: '1',                     vi: '2',                id: '3' },
};
