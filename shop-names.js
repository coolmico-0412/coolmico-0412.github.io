/* ═══════════════════════════════════════════════════════════════════
   shop-names.js  —  商品名稱多語系對照表
   ═══════════════════════════════════════════════════════════════════

   ✅ 這是唯一需要編輯的翻譯檔案
      不需要動 shop.html 或任何其他檔案

   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   新增翻譯：加一行即可
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

   '商品中文名稱': { en: 'English', vi: '越南文', id: '印尼文', th: 'ภาษาไทย', zh: '中文' },

   ⚠  KEY 必須和 Firebase 裡的商品名稱一字不差（含空格、全半形）
   ⚠  en = 英文（菲律賓 PH），vi = 越南文，id = 印尼文，th = 泰文，zh = 中文
      其他語系不需要填，系統自動顯示原文

   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   修改後如何生效？
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

   上傳本檔到伺服器後，同時將 shop-sw.js 裡的 APP_VERSION 加一位
   （如 v1.3.0 → v1.3.1），Service Worker 才會清除快取並拉取新版本。

   ═══════════════════════════════════════════════════════════════════ */

export const PRODUCT_NAME_MAP = {

  // ── 飲料 Drinks ──────────────────────────────────────────────────
  'กาแฟกระป๋องไต้หวัน伯朗咖啡': { en: 'Brown Canned Coffee',                vi: 'Cà phê lon Brown',                   id: 'Kopi Kaleng Brown', th: 'กาแฟกระป๋องไต้หวัน', zh: '伯朗咖啡' },
  'เป๊บซี่百事可樂2L': { en: 'Pepsi Cola 2L',                      vi: 'Pepsi Cola 2L',                      id: 'Pepsi Cola 2L', th: 'เป๊บซี่', zh: '百事可樂2L' },
  '鳳梨椰果': { en: 'Pineapple Coconut Jelly',            vi: 'Thạch dừa dứa',                      id: 'Nata de Coco Nanas', th: 'สับปะรดนาตาเดโก', zh: '鳳梨椰果' },
  '荔枝椰果': { en: 'Lychee Coconut Jelly',               vi: 'Thạch dừa vải',                      id: 'Nata de Coco Leci', th: 'ลิ้นจี่นาตาเดโก', zh: '荔枝椰果' },
  'โซดา金勇蘇打水': { en: 'Soda Water',                         vi: 'Nước soda',                          id: 'Air Soda', th: 'โซดา', zh: '金勇蘇打水' },
  'น้ำเปล่า礦泉水': { en: 'Mineral Water',                      vi: 'Nước khoáng',                        id: 'Air Mineral', th: 'น้ำเปล่า', zh: '礦泉水' },
  'น้ำมะพร้าว椰子汁': { en: 'Coconut Juice',                      vi: 'Nước dừa',                           id: 'Air Kelapa', th: 'น้ำมะพร้าว', zh: '椰子汁' },
  'ชาไทย泰式奶茶': { en: 'Thai Milk Tea',                      vi: 'Trà sữa Thái',                       id: 'Teh Thai Susu', th: 'ชาไทย', zh: '泰式奶茶' },
  'สปอนเซอร์運動飲料沙賓': { en: 'Sponsor Sports Drink',               vi: 'Nước uống thể thao Sponsor',         id: 'Minuman Olahraga Sponsor', th: 'สปอนเซอร์', zh: '運動飲料沙賓' },


  // ── 冷凍食品 Frozen Food ──────────────────────────────────────────
  'แหนมหมู大酸肉': { en: 'Fermented Pork (Naem)',              vi: 'Nem chua Thái',                      id: 'Naem Babi Fermentasi', th: 'แหนมหมู', zh: '大酸肉' },
  'แหนมหมูแท่งยาว長酸肉': { en: 'Long Fermented Pork Roll (Naem)',    vi: 'Nem chua Thái thanh dài',            id: 'Naem Babi Fermentasi Panjang', th: 'แหนมหมูแท่งยาว', zh: '長酸肉' },
  'คางปลา魚下巴': { en: 'Fish Jaw',                           vi: 'Cằm cá',                             id: 'Dagu Ikan', th: 'คางปลา', zh: '魚下巴' },
  'ฮอตดอกใหญ่大熱狗': { en: 'Large Hot Dog',                      vi: 'Xúc xích lớn',                       id: 'Sosis Besar', th: 'ฮอตดอกใหญ่', zh: '大熱狗' },


  // ── 食品 Food ────────────────────────────────────────────────────
  'แคบหมู豬皮酥': { en: 'Crispy Pork Rinds',                  vi: 'Da heo chiên giòn',                  id: 'Kulit Babi Goreng Renyah', th: 'แคบหมู', zh: '豬皮酥' },
  'โอวัลติน阿華田-Big': { en: 'Ovaltine (Big)',                     vi: 'Ovaltine (Lớn)',                     id: 'Ovaltine (Besar)', th: 'โอวัลติน', zh: '阿華田-Big' },
  'ลูกอมฮอลล์LEMONSODA': { en: "Hall's Lemon Soda Candy",            vi: "Kẹo Hall's Lemon Soda",              id: "Permen Hall's Lemon Soda", th: 'ลูกอมฮอลล์', zh: "Hall's檸檬蘇打糖" },
  'มาม่าMama泡麵': { en: 'Mama Instant Noodles',               vi: 'Mì gói Mama',                        id: 'Mie Instan Mama', th: 'มาม่า', zh: 'Mama泡麵' },
  'เนสกาแฟกระปุกNeecafe罐': { en: 'Nescafé Coffee Jar',                 vi: 'Cà phê Nescafé hũ',                  id: 'Kopi Nescafé Toples', th: 'เนสกาแฟกระปุก', zh: '雀巢咖啡罐' },


  // ── 調味品 Seasonings ─────────────────────────────────────────────

  // — 油鹽糖 Oil / Salt / Sugar —
  '大豆沙拉油': { en: 'Soybean Salad Oil',                  vi: 'Dầu đậu nành',                       id: 'Minyak Kedelai', th: 'น้ำมันถั่วเหลือง', zh: '大豆沙拉油' },
  'น้ำมันพืชองุ่น沙拉油': { en: 'Vegetable Salad Oil',                vi: 'Dầu ăn salad',                       id: 'Minyak Sayur', th: 'น้ำมันพืชองุ่น', zh: '沙拉油' },
  'เกลือ碘鹽': { en: 'Iodized Salt',                       vi: 'Muối i-ốt',                          id: 'Garam Beryodium', th: 'เกลือ', zh: '碘鹽' },
  'น้ำตาล二號砂糖': { en: 'Granulated Sugar No.2',              vi: 'Đường cát số 2',                     id: 'Gula Pasir No.2', th: 'น้ำตาล', zh: '二號砂糖' },
  '二號砂糖': { en: 'Granulated Sugar No.2',              vi: 'Đường cát số 2',                     id: 'Gula Pasir No.2', th: 'น้ำตาลทรายเบอร์สอง', zh: '二號砂糖' },
  'น้ำตาลมะพร้าวกระปุก棕櫚糖': { en: 'Palm Sugar (Jar)',                   vi: 'Đường thốt nốt (hũ)',                id: 'Gula Aren (Toples)', th: 'น้ำตาลมะพร้าวกระปุก', zh: '棕櫚糖' },

  // — 醬料 Sauces —
  'ABC調味液': { en: 'ABC Seasoning Sauce',                vi: 'Nước chấm ABC',                      id: 'Kecap ABC', th: 'ซอสปรุงรสABC', zh: 'ABC調味液' },
  'ซีอิ๊วขาว ขวดแก้ว仁和園醬油700': { en: 'Soy Sauce Glass Bottle 700ml',       vi: 'Nước tương chai thủy tinh 700ml',    id: 'Kecap Asin Botol Kaca 700ml', th: 'ซีอิ๊วขาว ขวดแก้ว', zh: '仁和園醬油700' },
  'ซีอิ๊วดำใหญ่仁和園醬油274': { en: 'Dark Soy Sauce 274ml',               vi: 'Tương đen 274ml',                    id: 'Kecap Manis Gelap 274ml', th: 'ซีอิ๊วดำใหญ่', zh: '仁和園醬油274' },
  'น้ำปลาแท้ กุ้ง魚露700': { en: 'Fish Sauce 700ml',                   vi: 'Nước mắm 700ml',                     id: 'Kecap Ikan 700ml', th: 'น้ำปลาแท้ กุ้ง', zh: '魚露700' },
  'ซอสหอยเส็ก蠔油150': { en: 'Oyster Sauce 150ml',                 vi: 'Dầu hào 150ml',                      id: 'Saus Tiram 150ml', th: 'ซอสหอยเส็ก', zh: '蠔油150' },
  'น้ำจิ้มสุกี้泰式甜辣醬': { en: 'Thai Sweet Chili Sauce',             vi: 'Tương ớt ngọt Thái',                 id: 'Saus Cabai Manis Thai', th: 'น้ำจิ้มสุกี้', zh: '泰式甜辣醬' },
  'น้ำจิ้มไก่เด็กสมบูรณ์仁和園甜辣醬350': { en: 'Sweet Chili Sauce 350ml',       vi: 'Tương ớt ngọt 350ml',                id: 'Saus Cabai Manis 350ml', th: 'น้ำจิ้มไก่เด็กสมบูรณ์', zh: '仁和園甜辣醬350' },
  'น้ำจิ้มสุกี้ สูตรกวางตุ้ง潘泰火鍋醬小': { en: 'Cantonese Hot Pot Sauce (Small)', vi: 'Tương lẩu Quảng Đông (nhỏ)',      id: 'Saus Hot Pot Kanton (Kecil)', th: 'น้ำจิ้มสุกี้ สูตรกวางตุ้ง', zh: '潘泰火鍋醬小' },
  'เต้าเจี้ยวเล็ก仁和園豆瓣醬350': { en: 'Bean Paste 350ml',                   vi: 'Tương đậu 350ml',                    id: 'Tauco 350ml', th: 'เต้าเจี้ยวเล็ก', zh: '仁和園豆瓣醬350' },
  'ผักกาดดอง華南菜': { en: 'Pickled Mustard Greens',             vi: 'Dưa cải chua',                       id: 'Sayur Asin', th: 'ผักกาดดอง', zh: '華南菜' },

  // — 香料 Spices —
  'ผงชูรส味素800': { en: 'MSG 800g',                           vi: 'Bột ngọt 800g',                      id: 'Vetsin 800g', th: 'ผงชูรส', zh: '味素800' },
  'พริกป่น辣椒粉': { en: 'Chili Powder',                       vi: 'Bột ớt',                             id: 'Bubuk Cabai', th: 'พริกป่น', zh: '辣椒粉' },
  'พริกแห้ง辣椒干': { en: 'Dried Chili',                        vi: 'Ớt khô',                             id: 'Cabai Kering', th: 'พริกแห้ง', zh: '辣椒干' },

  // — 咖哩醬 Curry Pastes —
  'พริกแกงเผ็ด有心紅咖哩小': { en: 'Red Curry Paste (Small)',            vi: 'Cà ri đỏ (nhỏ)',                     id: 'Pasta Kari Merah (Kecil)', th: 'พริกแกงเผ็ด', zh: '有心紅咖哩小' },
  'พริกแกงเขียวหวาน有心綠咖哩醬小': { en: 'Green Curry Paste (Small)',          vi: 'Cà ri xanh (nhỏ)',                   id: 'Pasta Kari Hijau (Kecil)', th: 'พริกแกงเขียวหวาน', zh: '有心綠咖哩醬小' },
  'พริกแกงพะแนง有心咖哩醬': { en: 'Panang Curry Paste',                 vi: 'Cà ri Panang',                       id: 'Pasta Kari Panang', th: 'พริกแกงพะแนง', zh: '有心咖哩醬' },
  'พริกแกงน้ำยา有心咖哩醬': { en: 'Nam Ya Curry Paste',                 vi: 'Cà ri Nam Ya',                       id: 'Pasta Kari Nam Ya', th: 'พริกแกงน้ำยา', zh: '有心咖哩醬' },
  'ต้มยำสำเร็จ有心酸辣醬小': { en: 'Tom Yum Paste (Small)',              vi: 'Tương tom yum (nhỏ)',                id: 'Pasta Tom Yum (Kecil)', th: 'ต้มยำสำเร็จ', zh: '有心酸辣醬小' },
  'ซอสผัดผงกะหรี่泰式螃蟹料理包': { en: 'Thai Crab Curry Sauce Pack',         vi: 'Gói gia vị cà ri cua Thái',          id: 'Bumbu Kari Kepiting Thai', th: 'ซอสผัดผงกะหรี่', zh: '泰式螃蟹料理包' },

  // — 湯料 Soup Bases —
  'คนอต้มยำ酸辣湯塊': { en: 'Knorr Tom Yum Soup Cube',            vi: 'Viên súp tom yum Knorr',             id: 'Kaldu Tom Yum Knorr', th: 'คนอต้มยำ', zh: '酸辣湯塊' },
  'คนอไก่雞湯塊': { en: 'Knorr Chicken Stock Cube',           vi: 'Hạt nêm gà Knorr',                   id: 'Kaldu Ayam Knorr', th: 'คนอไก่', zh: '雞湯塊' },
  'คนอหมู豬湯塊': { en: 'Knorr Pork Stock Cube',              vi: 'Hạt nêm heo Knorr',                  id: 'Kaldu Babi Knorr', th: 'คนอหมู', zh: '豬湯塊' },

  // — 粉料 Powders & Flour —
  'ผงฟู蛋糕粉': { en: 'Baking Powder',                      vi: 'Bột nổi',                            id: 'Baking Powder', th: 'ผงฟู', zh: '蛋糕粉' },
  'แป้งโกกิ油炸粉GOGI': { en: 'GOGI Frying Powder',                 vi: 'Bột chiên GOGI',                     id: 'Tepung Goreng GOGI', th: 'แป้งโกกิ', zh: '油炸粉GOGI' },

  // — 麵粉條 Noodles —
  'เส้นก๋วยเตี๋ยวเวียดนาม澱粉條': { en: 'Vietnamese Starch Noodles',          vi: 'Miến Việt Nam',                      id: 'Bihun Pati Vietnam', th: 'เส้นก๋วยเตี๋ยวเวียดนาม', zh: '澱粉條' },
  'เส้นหมี่ขาว米粉': { en: 'Rice Vermicelli',                    vi: 'Bún gạo',                            id: 'Bihun', th: 'เส้นหมี่ขาว', zh: '米粉' },

  // — 奶類 Dairy —
  'คนเนชั่น三花調製奶水': { en: 'Three Flowers Evaporated Milk',      vi: 'Sữa đặc ba hoa',                     id: 'Susu Evaporasi Tiga Bunga', th: 'คนเนชั่น', zh: '三花調製奶水' },
  'นมข้นหวาน瑪麗煉乳': { en: 'Marie Sweetened Condensed Milk',     vi: 'Sữa đặc có đường Marie',             id: 'Susu Kental Manis Marie', th: 'นมข้นหวาน', zh: '瑪麗煉乳' },

  // — 罐頭 Canned Goods —
  'ลูกชิดกระป๋อง亞達子罐頭': { en: 'Canned Toddy Palm Seeds',            vi: 'Hạt thốt nốt đóng hộp',             id: 'Kaleng Buah Lontar', th: 'ลูกชิดกระป๋อง', zh: '亞達子罐頭' },
  'ลำไยกระป๋อง龍眼罐頭': { en: 'Canned Longan',                      vi: 'Nhãn đóng hộp',                      id: 'Kaleng Kelengkeng', th: 'ลำไยกระป๋อง', zh: '龍眼罐頭' },
  'ขนุนกระป๋อง波羅密罐頭': { en: 'Canned Jackfruit',                   vi: 'Mít đóng hộp',                       id: 'Kaleng Nangka', th: 'ขนุนกระป๋อง', zh: '波羅密罐頭' },
  'เงาะในน้ำเชื่อม紅毛丹罐頭': { en: 'Canned Rambutan in Syrup',           vi: 'Chôm chôm trong xi-rô đóng hộp',    id: 'Kaleng Rambutan dalam Sirup', th: 'เงาะในน้ำเชื่อม', zh: '紅毛丹罐頭' },
  'แห้วกระป๋อง悖齊罐頭': { en: 'Canned Water Chestnut',              vi: 'Củ năng đóng hộp',                   id: 'Kaleng Water Chestnut', th: 'แห้วกระป๋อง', zh: '悖齊罐頭' },
  'ฉู่ฉี่สามแม่ครัว椰漿沙丁魚': { en: 'Three Cooks Sardine Choo Chee Curry', vi: 'Cá mòi cà ri dừa Ba Bếp',          id: 'Sarden Kari Kelapa Tiga Koki', th: 'ฉู่ฉี่สามแม่ครัว', zh: '椰漿沙丁魚' },
  'ปลากระป๋องคั่วกลิ้ง鯖魚調味醬1': { en: 'Canned Mackerel Kua Kling No.1',    vi: 'Cá thu đóng hộp Kua Kling No.1',    id: 'Kaleng Ikan Tenggiri Kua Kling No.1', th: 'ปลากระป๋องคั่วกลิ้ง', zh: '鯖魚調味醬1' },
  'ปุ้มปุ้ยปลาราดพริกSmiling辣醬炸魚': { en: 'Smiling Spicy Fish (Chili Sauce)',  vi: 'Cá sốt ớt Smiling',                 id: 'Ikan Saus Pedas Smiling', th: 'ปุ้มปุ้ยปลาราดพริก', zh: 'Smiling辣醬炸魚' },
  'ปุ้มปุ้ยปลาทอดSmiling辣醬炸魚': { en: 'Smiling Fried Spicy Fish',           vi: 'Cá chiên sốt ớt Smiling',            id: 'Ikan Goreng Pedas Smiling', th: 'ปุ้มปุ้ยปลาทอด', zh: 'Smiling辣醬炸魚' },
  'หอยลายSmiling辣醬炸魚': { en: 'Smiling Spicy Clams',                vi: 'Nghêu sốt cay Smiling',              id: 'Kerang Pedas Smiling', th: 'หอยลาย', zh: 'Smiling辣醬炸魚' },


  // ── 酒 Alcohol ────────────────────────────────────────────────────
  'ไวน์玫瑰紅酒': { en: 'Rosé Red Wine',                      vi: 'Rượu vang hồng',                     id: 'Anggur Rosé', th: 'ไวน์', zh: '玫瑰紅酒' },
  'เบียร์ไต้หวัน金牌啤酒': { en: 'Taiwan Gold Medal Beer',             vi: 'Bia Vàng Đài Loan',                  id: 'Bir Emas Taiwan', th: 'เบียร์ไต้หวัน', zh: '金牌啤酒' },
  'เหล้าขาว南都': { en: 'Nandu White Spirits',                vi: 'Rượu trắng Nam Đô',                  id: 'Arak Putih Nam Du', th: 'เหล้าขาว', zh: '南都' },
  'เหล้าเสือ紅虎': { en: 'Red Tiger Spirits',                  vi: 'Rượu Cọp Đỏ',                        id: 'Arak Harimau Merah', th: 'เหล้าเสือ', zh: '紅虎' },
  'ไวน์ขาว58金高': { en: 'Jin Gao White Spirits 58%',          vi: 'Rượu trắng Kim Cao 58%',             id: 'Arak Putih Jin Gao 58%', th: 'ไวน์ขาว', zh: '金高' },


  // ── 清潔保養品 Hygiene & Beauty ───────────────────────────────────
  'โลชั่นน้ำหอม R-Series浪漫乳液': { en: 'R-Series Romantic Lotion',           vi: 'Dưỡng thể R-Series Lãng Mạn',       id: 'Losion R-Series Romantis', th: 'โลชั่นน้ำหอม R-Series', zh: '浪漫乳液' },
  'ยาสีฟัน กลิสเทอร์安麗牙膏': { en: 'Amway Glister Toothpaste',           vi: 'Kem đánh răng Amway Glister',        id: 'Pasta Gigi Amway Glister', th: 'ยาสีฟัน กลิสเทอร์', zh: '安麗牙膏' },
  'ยาสีฟันColgate牙膏': { en: 'Colgate Toothpaste',                 vi: 'Kem đánh răng Colgate',              id: 'Pasta Gigi Colgate', th: 'ยาสีฟัน', zh: '牙膏' },
  'โคโลญจน์Nivea體香劑': { en: 'Nivea Deodorant',                    vi: 'Lăn khử mùi Nivea',                  id: 'Deodoran Nivea', th: 'โคโลญจน์', zh: '體香劑' },
  'โฟมล้างหน้าNivea洗面乳': { en: 'Nivea Facial Wash Foam',             vi: 'Sữa rửa mặt Nivea',                  id: 'Sabun Muka Busa Nivea', th: 'โฟมล้างหน้า', zh: '洗面乳' },
  'น้ำยาบ้วนปาก漱口水': { en: 'Mouthwash',                          vi: 'Nước súc miệng',                     id: 'Obat Kumur', th: 'น้ำยาบ้วนปาก', zh: '漱口水' },
  'วาสลีนVaseline': { en: 'Vaseline Petroleum Jelly',           vi: 'Vaseline',                           id: 'Vaseline', th: 'วาสลีน', zh: '凡士林護膚膏' },
  "เบบี้ออยล์Johnson's嬰兒油": { en: "Johnson's Baby Oil",                 vi: "Dầu em bé Johnson's",                id: "Minyak Bayi Johnson's", th: 'เบบี้ออยล์', zh: '嬰兒油' },
  'แชมพูClearShampoo': { en: 'Clear Shampoo',                      vi: 'Dầu gội Clear',                      id: 'Sampo Clear', th: 'แชมพู', zh: 'Clear洗髮精' },
  'แป้งฝุ่นCare爽身粉': { en: 'Care Talcum Powder',                 vi: 'Phấn rôm Care',                      id: 'Bedak Tabur Care', th: 'แป้งฝุ่น', zh: '爽身粉' },
  'ครีมบำรุงซองOlay補': { en: 'Olay Moisturizer (Sachet)',          vi: 'Kem dưỡng ẩm Olay (gói)',            id: 'Krim Pelembab Olay (Sachet)', th: 'ครีมบำรุงซอง', zh: 'Olay補水霜(小包)' },
  'ครีมบำรุงOlay補': { en: 'Olay Moisturizer',                   vi: 'Kem dưỡng ẩm Olay',                  id: 'Krim Pelembab Olay', th: 'ครีมบำรุง', zh: 'Olay補水霜' },
  'ครีมบำรุงซองNivea精華液盒': { en: 'Nivea Serum (Box)',                  vi: 'Tinh chất Nivea (hộp)',               id: 'Serum Nivea (Kotak)', th: 'ครีมบำรุงซอง', zh: '精華液盒' },
  'ครีมบำรุงซองNivea精華液': { en: 'Nivea Serum (Sachet)',               vi: 'Tinh chất Nivea (gói)',               id: 'Serum Nivea (Sachet)', th: 'ครีมบำรุงซอง', zh: '精華液' },
  'ปรับผ้านุ่มDowny800ml': { en: 'Downy Fabric Softener 800ml',        vi: 'Nước xả vải Downy 800ml',            id: 'Pelembut Pakaian Downy 800ml', th: 'ปรับผ้านุ่ม', zh: 'Downy柔順劑800ml' },
  'ปรับผ้านุ่มH柔軟精': { en: 'H Fabric Softener',                  vi: 'Nước xả vải H',                      id: 'Pelembut Pakaian H', th: 'ปรับผ้านุ่ม', zh: '柔軟精' },
  'แฟ๊บE洗衣粉': { en: 'FAB Laundry Detergent Powder',       vi: 'Bột giặt FAB',                       id: 'Deterjen Bubuk FAB', th: 'แฟ๊บ', zh: '洗衣粉' },


  // ── 其他 Other ───────────────────────────────────────────────────
  '橡皮圈': { en: 'Rubber Bands',                       vi: 'Dây thun',                           id: 'Karet Gelang', th: 'ยางรัด', zh: '橡皮圈' },
  '平口夾': { en: 'Binder Clip',                        vi: 'Kẹp bướm',                           id: 'Klip Kertas', th: 'คลิปก้าน', zh: '平口夾' },
  '關刀梳': { en: 'Wide-Tooth Comb',                    vi: 'Lược răng thưa',                     id: 'Sisir Bergigi Jarang', th: 'หวีฟันห่าง', zh: '關刀梳' },
  'แก๊สกระป๋อง瓦斯罐一個': { en: 'Gas Canister (Single)',              vi: 'Bình ga (1 cái)',                     id: 'Tabung Gas (1 buah)', th: 'แก๊สกระป๋อง', zh: '瓦斯罐一個' },
  'แก้วกาแฟ蝴蝶杯': { en: 'Butterfly Coffee Cup',               vi: 'Ly cà phê Butterfly',                id: 'Gelas Kopi Butterfly', th: 'แก้วกาแฟ', zh: '蝴蝶杯' },
  'ไพ่撲克牌': { en: 'Playing Cards',                      vi: 'Bài tây',                            id: 'Kartu Remi', th: 'ไพ่', zh: '撲克牌' },
  'ไฟแช็ก打火機': { en: 'Lighter',                            vi: 'Bật lửa',                            id: 'Korek Api Gas', th: 'ไฟแช็ก', zh: '打火機' },

};
