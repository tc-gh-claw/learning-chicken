/**
 * 學習雞 - 題目庫
 * 包含中文、英文、數學、常識四科
 * 難度分級：1-6年級
 */

const QUESTION_BANK = {
    chinese: [
        // 一年級
        { grade: 1, question: "『水』字有幾多筆畫？", options: ["3畫", "4畫", "5畫", "6畫"], answer: 1, hint: "豎鉤、橫撇、撇、捺" },
        { grade: 1, question: "『日』加一筆可以變成邊個字？", options: ["白", "目", "田", "以上皆是"], answer: 3, hint: "都可以加一橫或一豎" },
        { grade: 1, question: "『三』的讀音是？", options: ["sān", "shān", "sāam", "saam"], answer: 0, hint: "普通話拼音" },
        { grade: 1, question: "『山』字的部首是？", options: ["山", "丨", "凵", "無部首"], answer: 0, hint: "本身就是部首" },
        { grade: 1, question: "『人』加兩筆可以變成？", options: ["太", "天", "夫", "以上皆可"], answer: 3, hint: "加在不同位置有不同字" },
        
        // 二年級
        { grade: 2, question: "『蝴蝶』的正確讀音是？", options: ["hú dié", "hú diě", "hū dié", "hú dé"], answer: 0, hint: "蝴=hu2, 蝶=die2" },
        { grade: 2, question: "『美麗』的反義詞是？", options: ["醜陋", "難看", "普通", "古怪"], answer: 0, hint: "意思相反" },
        { grade: 2, question: "『因為...所以...』是什麼關係？", options: ["因果關係", "轉折關係", "並列關係", "選擇關係"], answer: 0, hint: "一個是原因，一個是結果" },
        { grade: 2, question: "『跳』字的部首是？", options: ["足", "兆", "儿", "⻊"], answer: 0, hint: "與腳有關" },
        { grade: 2, question: "『春夏秋冬』四季的順序是？", options: ["春夏秋冬", "夏秋冬春", "春秋冬夏", "冬秋夏春"], answer: 0, hint: "春季開始" },
        
        // 三年級
        { grade: 3, question: "『刻舟求劍』這個成語的意思是？", options: ["不知變通", "堅持不懈", "勤奮學習", "勇敢冒險"], answer: 0, hint: "比喻拘泥固執，不知變通" },
        { grade: 3, question: "『不但...而且...』是什麼關係？", options: ["遞進關係", "轉折關係", "因果關係", "假設關係"], answer: 0, hint: "意思更進一層" },
        { grade: 3, question: "『床前明月光』的下一句是？", options: ["疑是地上霜", "舉頭望明月", "低頭思故鄉", "唯見長江流"], answer: 0, hint: "李白《靜夜思》" },
        { grade: 3, question: "『高興』的同義詞是？", options: ["開心", "傷心", "生氣", "害怕"], answer: 0, hint: "意思相近" },
        { grade: 3, question: "『曰』字的意思是？", options: ["說", "太陽", "日子", "月"], answer: 0, hint: "古文用法" },
        
        // 四年級
        { grade: 4, question: "『比喻』這種修辭手法是？", options: ["用相似事物比擬", "把事物擬人化", "誇大事實", "重複強調"], answer: 0, hint: "打比方" },
        { grade: 4, question: "『欲窮千里目』的下一句是？", options: ["更上一層樓", "黃河入海流", "白日依山盡", "獨在異鄉為異客"], answer: 0, hint: "王之渙《登鸛雀樓》" },
        { grade: 4, question: "『雖然...但是...』是什麼關係？", options: ["轉折關係", "遞進關係", "因果關係", "並列關係"], answer: 0, hint: "前後意思相反" },
        { grade: 4, question: "『破釜沉舟』的意思是？", options: ["下定決心", "浪費資源", "做事魯莽", "準備後路"], answer: 0, hint: "比喻決心奮鬥到底" },
        { grade: 4, question: "『狐假虎威』中的『假』字意思是？", options: ["借", "假裝", "虛假", "放假"], answer: 0, hint: "借用別人的威勢" },
        
        // 五年級
        { grade: 5, question: "『先天下之憂而憂』是邊個的名句？", options: ["范仲淹", "李白", "杜甫", "蘇軾"], answer: 0, hint: "《岳陽樓記》" },
        { grade: 5, question: "『擬人』這種修辭手法是？", options: ["把事物人格化", "用相似事物比擬", "誇大事實", "引用名句"], answer: 0, hint: "賦予事物人的特徵" },
        { grade: 5, question: "人生自古誰無死』的下一句是？", options: ["留取丹心照汗青", "化作春泥更護花", "橫眉冷對千夫指", "我勸天公重抖擻"], answer: 0, hint: "文天祥《過零丁洋》" },
        { grade: 5, question: "『愚公移山』體現的精神是？", options: ["堅持不懈", "魯莽冒險", "浪費時間", "逃避現實"], answer: 0, hint: "比喻有毅力、有恆心" },
        { grade: 5, question: "『之』字在文言文中常作？", options: ["助詞", "動詞", "名詞", "形容詞"], answer: 0, hint: "語氣助詞或代詞" },
        
        // 六年級
        { grade: 6, question: "『路漫漫其修遠兮』是邊個的作品？", options: ["屈原", "李白", "杜甫", "蘇軾"], answer: 0, hint: "《離騷》" },
        { grade: 6, question: "『對偶』的特點是？", options: ["字數相等、結構相同", "意思相反", "重複強調", "層層遞進"], answer: 0, hint: "詞性、結構對稱" },
        { grade: 6, question: "『學而時習之』出自？", options: ["《論語》", "《孟子》", "《大學》", "《中庸》"], answer: 0, hint: "孔子語錄" },
        { grade: 6, question: "『襯托』這種寫作手法是？", options: ["用次要事物突出主要事物", "直接描寫", "誇張描述", "對比相反事物"], answer: 0, hint: "烘雲托月" },
        { grade: 6, question: "『海內存知己』的下一句是？", options: ["天涯若比鄰", "無病亦呻吟", "獨在異鄉為異客", "西出陽關無故人"], answer: 0, hint: "王勃《送杜少府之任蜀州》" }
    ],
    
    english: [
        // 一年級
        { grade: 1, question: "'Apple' 的意思是？", options: ["蘋果", "香蕉", "橙", "葡萄"], answer: 0, hint: "紅色/綠色的水果" },
        { grade: 1, question: "'Cat' 是什麼動物？", options: ["貓", "狗", "鳥", "魚"], answer: 0, hint: "會喵喵叫" },
        { grade: 1, question: "'Red' 是什麼顏色？", options: ["紅色", "藍色", "綠色", "黃色"], answer: 0, hint: "像蘋果的顏色" },
        { grade: 1, question: "'One' 的意思是？", options: ["1", "2", "3", "4"], answer: 0, hint: "數字" },
        { grade: 1, question: "'Dog' 會發出什麼聲音？", options: ["Woof", "Meow", "Moo", "Quack"], answer: 0, hint: "汪汪叫" },
        
        // 二年級
        { grade: 2, question: "'I have ___ apple.' 填什麼？", options: ["an", "a", "the", "/"], answer: 0, hint: "apple以元音開頭" },
        { grade: 2, question: "'He ___ a student.' 填什麼？", options: ["is", "are", "am", "be"], answer: 0, hint: "第三人稱單數" },
        { grade: 2, question: "'Book' 的複數是？", options: ["Books", "Bookes", "Booking", "Book"], answer: 0, hint: "一般加s" },
        { grade: 2, question: "'I like ___ (play)." 填什麼？", options: ["playing", "play", "played", "to playing"], answer: 0, hint: "like + doing" },
        { grade: 2, question: "'Happy' 的反義詞是？", options: ["Sad", "Angry", "Tired", "Hungry"], answer: 0, hint: "不開心" },
        
        // 三年級
        { grade: 3, question: "'Yesterday I ___ to school.' 填什麼？", options: ["went", "go", "going", "gone"], answer: 0, hint: "過去式" },
        { grade: 3, question: "'She is ___ than me.' 填什麼？", options: ["taller", "tall", "tallest", "the tall"], answer: 0, hint: "比較級加-er" },
        { grade: 3, question: "'This is ___ book.' (我的) 填什麼？", options: ["my", "mine", "me", "I"], answer: 0, hint: "形容詞性物主代詞" },
        { grade: 3, question: "'There ___ a pen on the desk.' 填什麼？", options: ["is", "are", "am", "be"], answer: 0, hint: "單數用is" },
        { grade: 3, question: "'Can you ___ (swim)?" 填什麼？", options: ["swim", "swims", "swimming", "to swim"], answer: 0, hint: "can後用原形" },
        
        // 四年級
        { grade: 4, question: "'If it rains tomorrow, I ___ at home.'", options: ["will stay", "stay", "stayed", "staying"], answer: 0, hint: "if條件句，主句用將來式" },
        { grade: 4, question: "'He has lived here ___ 2010.' 填什麼？", options: ["since", "for", "at", "in"], answer: 0, hint: "since+時間點" },
        { grade: 4, question: "'The book ___ (write) by Lu Xun.'", options: ["was written", "wrote", "is writing", "writes"], answer: 0, hint: "被動語態" },
        { grade: 4, question: "'Neither Tom ___ Mary likes coffee.'", options: ["nor", "or", "and", "but"], answer: 0, hint: "neither...nor..." },
        { grade: 4, question: "'I don't know ___ he will come.'", options: ["if/whether", "that", "what", "which"], answer: 0, hint: "是否" },
        
        // 五年級
        { grade: 5, question: "'Hardly ___ when it began to rain.'", options: ["had I arrived", "I had arrived", "I arrived", "have I arrived"], answer: 0, hint: "Hardly...when倒裝" },
        { grade: 5, question: "'Not only he but also I ___ wrong.'", options: ["am", "is", "are", "be"], answer: 0, hint: "就近原則" },
        { grade: 5, question: "'By next year, I ___ (graduate)."", options: ["will have graduated", "will graduate", "graduate", "graduated"], answer: 0, hint: "將來完成式" },
        { grade: 5, question: "'Had I known earlier, I ___ (tell) you.'", options: ["would have told", "would tell", "will tell", "told"], answer: 0, hint: "與過去事實相反的虛擬" },
        { grade: 5, question: "'The sooner, ___.'", options: ["the better", "better", "the best", "best"], answer: 0, hint: "the+比較級, the+比較級" },
        
        // 六年級
        { grade: 6, question: "'It is high time we ___ (leave)."", options: ["left", "leave", "leaving", "to leave"], answer: 0, hint: "虛擬語氣用過去式" },
        { grade: 6, question: "'___ (Judge) from his accent, he is from Guangdong.'", options: ["Judging", "Judged", "To judge", "Judge"], answer: 0, hint: "獨立主格" },
        { grade: 6, question: "'I wish I ___ (be) a bird.'", options: ["were", "was", "am", "be"], answer: 0, hint: "與現在事實相反的虛擬" },
        { grade: 6, question: "'No sooner ___ than he fell asleep.'", options: ["had he lain down", "he had lain down", "he lay down", "did he lie down"], answer: 0, hint: "No sooner...than倒裝" },
        { grade: 6, question: "'However hard ___, he can't succeed.'", options: ["he tries", "does he try", "he tried", "has he tried"], answer: 0, hint: "However+adj.+主語+動詞" }
    ],
    
    math: [
        // 一年級
        { grade: 1, question: "3 + 5 = ?", options: ["7", "8", "9", "6"], answer: 1, hint: "3+5=8" },
        { grade: 1, question: "10 - 4 = ?", options: ["5", "6", "7", "4"], answer: 1, hint: "10-4=6" },
        { grade: 1, question: "2 + 2 + 3 = ?", options: ["6", "7", "8", "5"], answer: 1, hint: "先算2+2=4，再加3" },
        { grade: 1, question: "比8多2的數是？", options: ["9", "10", "11", "12"], answer: 1, hint: "8+2=10" },
        { grade: 1, question: "一個蘋果切開，分成2份，每份是？", options: ["1/4", "1/2", "1/3", "全部"], answer: 1, hint: "平均分成2份" },
        
        // 二年級
        { grade: 2, question: "7 × 8 = ?", options: ["54", "56", "48", "63"], answer: 1, hint: "七八五十六" },
        { grade: 2, question: "36 ÷ 6 = ?", options: ["5", "6", "7", "4"], answer: 1, hint: "六六三十六" },
        { grade: 2, question: "一個長方形長5cm，寬3cm，周長是？", options: ["15cm", "16cm", "8cm", "20cm"], answer: 1, hint: "(長+寬)×2" },
        { grade: 2, question: "小明有12顆糖，給小華4顆後還剩？", options: ["6顆", "8顆", "7顆", "9顆"], answer: 1, hint: "12-4=8" },
        { grade: 2, question: "一個正方形有幾條邊？", options: ["3條", "4條", "5條", "6條"], answer: 1, hint: "四邊形" },
        
        // 三年級
        { grade: 3, question: "125 × 8 = ?", options: ["1000", "925", "850", "750"], answer: 0, hint: "125×8=1000" },
        { grade: 3, question: "一個長方形長8cm，寬5cm，面積是？", options: ["26cm²", "40cm²", "13cm²", "35cm²"], answer: 1, hint: "長×寬" },
        { grade: 3, question: "3/4 + 1/4 = ?", options: ["1", "4/8", "3/8", "2/4"], answer: 0, hint: "同分母分數相加" },
        { grade: 3, question: "24和36的最大公因數是？", options: ["6", "12", "8", "4"], answer: 1, hint: "24=12×2, 36=12×3" },
        { grade: 3, question: "一個三角形三個角分別是60°、70°，第三個角是？", options: ["40°", "50°", "60°", "70°"], answer: 1, hint: "三角形內角和180°" },
        
        // 四年級
        { grade: 4, question: "0.25 × 4 = ?", options: ["0.1", "1", "0.5", "1.5"], answer: 1, hint: "1/4 × 4 = 1" },
        { grade: 4, question: "一個圓的直徑是10cm，半徑是？", options: ["20cm", "5cm", "15cm", "10cm"], answer: 1, hint: "半徑=直徑÷2" },
        { grade: 4, question: "2/3 ÷ 4/9 = ?", options: ["1/6", "3/2", "8/27", "6/12"], answer: 1, hint: "除以一個分數=乘它的倒數" },
        { grade: 4, question: "一個長方體長5cm、寬4cm、高3cm，體積是？", options: ["60cm³", "48cm³", "35cm³", "12cm³"], answer: 0, hint: "長×寬×高" },
        { grade: 4, question: "15是25的百分之幾？", options: ["50%", "60%", "75%", "40%"], answer: 1, hint: "15÷25×100%" },
        
        // 五年級
        { grade: 5, question: "解方程：2x + 5 = 15，x = ?", options: ["5", "4", "6", "10"], answer: 0, hint: "2x=15-5=10, x=5" },
        { grade: 5, question: "一個圓的半徑是4cm，面積約是？(π取3.14)", options: ["25.12cm²", "50.24cm²", "12.56cm²", "100.48cm²"], answer: 1, hint: "πr² = 3.14×16" },
        { grade: 5, question: "(-3) × (-4) = ?", options: ["-12", "12", "-7", "7"], answer: 1, hint: "負負得正" },
        { grade: 5, question: "將45分解質因數是？", options: ["3×15", "3²×5", "5×9", "1×45"], answer: 1, hint: "45=9×5=3²×5" },
        { grade: 5, question: "一個等腰三角形，頂角是40°，底角是？", options: ["70°", "60°", "80°", "40°"], answer: 0, hint: "(180-40)÷2=70" },
        
        // 六年級
        { grade: 6, question: "一個數的30%是24，這個數是？", options: ["72", "80", "60", "90"], answer: 1, hint: "24÷0.3=80" },
        { grade: 6, question: "甲:乙 = 3:4，甲是60，乙是？", options: ["70", "80", "90", "100"], answer: 1, hint: "60÷3×4=80" },
        { grade: 6, question: "(-2)³ = ?", options: ["-8", "8", "-6", "6"], answer: 0, hint: "(-2)×(-2)×(-2)" },
        { grade: 6, question: "一個正方體的對角線長度是邊長的多少倍？", options: ["√2", "√3", "2", "3"], answer: 1, hint: "空間對角線 = 邊長×√3" },
        { grade: 6, question: "擲一個骰子，出現偶數的概率是？", options: ["1/3", "1/2", "2/3", "1/6"], answer: 1, hint: "偶數有2,4,6共3個" }
    ],
    
    general: [
        // 一年級
        { grade: 1, question: "一年有幾個季節？", options: ["3個", "4個", "5個", "6個"], answer: 1, hint: "春夏秋冬" },
        { grade: 1, question: "水在什麼溫度會結冰？", options: ["0°C", "10°C", "100°C", "-10°C"], answer: 0, hint: "零度" },
        { grade: 1, question: "太陽從哪邊升起？", options: ["東方", "西方", "南方", "北方"], answer: 0, hint: "東升西落" },
        { grade: 1, question: "人體最大的器官是？", options: ["肝臟", "皮膚", "心臟", "大腦"], answer: 1, hint: "覆蓋全身" },
        { grade: 1, question: "彩虹有幾種顏色？", options: ["5種", "6種", "7種", "8種"], answer: 2, hint: "紅橙黃綠青藍紫" },
        
        // 二年級
        { grade: 2, question: "地球有幾個大洋？", options: ["3個", "4個", "5個", "6個"], answer: 2, hint: "太平洋、大西洋、印度洋、南冰洋、北冰洋" },
        { grade: 2, question: "植物進行光合作用需要什麼？", options: ["陽光", "月光", "燈光", "火光"], answer: 0, hint: "太陽光" },
        { grade: 2, question: "人體有多少塊骨頭？（成人）", options: ["106塊", "206塊", "306塊", "156塊"], answer: 1, hint: "約200塊" },
        { grade: 2, question: "中國的首都是？", options: ["上海", "北京", "廣州", "深圳"], answer: 1, hint: "北方大城市" },
        { grade: 2, question: "企鵝生活在？", options: ["北極", "南極", "赤道", "沙漠"], answer: 1, hint: "南極洲" },
        
        // 三年級
        { grade: 3, question: "水的化學式是？", options: ["HO", "H₂O", "CO₂", "O₂"], answer: 1, hint: "兩個氫一個氧" },
        { grade: 3, question: "世界上最高的山峰是？", options: ["富士山", "珠穆朗瑪峰", "泰山", "黃山"], answer: 1, hint: "喜馬拉雅山脈" },
        { grade: 3, question: "青蛙屬於什麼動物？", options: ["哺乳類", "兩棲類", "爬蟲類", "魚類"], answer: 1, hint: "既能在水中也能在陸地生活" },
        { grade: 3, question: "電燈是誰發明的？", options: ["愛因斯坦", "愛迪生", "牛頓", "居里夫人"], answer: 1, hint: "Thomas Edison" },
        { grade: 3, question: "人體的呼吸系統主要器官是？", options: ["心臟", "肺", "肝臟", "胃"], answer: 1, hint: "吸進氧氣呼出二氧化碳" },
        
        // 四年級
        { grade: 4, question: "太陽系有幾顆行星？", options: ["7顆", "8顆", "9顆", "10顆"], answer: 1, hint: "水星、金星、地球、火星、木星、土星、天王星、海王星" },
        { grade: 4, question: "人體的循環系統主要由什麼推動？", options: ["肺", "心臟", "大腦", "肝臟"], answer: 1, hint: "不停跳動的器官" },
        { grade: 4, question: "中國最長的河流是？", options: ["黃河", "長江", "珠江", "黑龍江"], answer: 1, hint: "流經多個省份" },
        { grade: 4, question: "光合作用產生什麼氣體？", options: ["二氧化碳", "氧氣", "氮氣", "氫氣"], answer: 1, hint: "我們呼吸需要的氣體" },
        { grade: 4, question: "地球的自轉週期是？", options: ["365天", "24小時", "30天", "12小時"], answer: 1, hint: "一天" },
        
        // 五年級
        { grade: 5, question: "DNA的全名是？", options: ["去氧核糖核酸", "核糖核酸", "氨基酸", "蛋白質"], answer: 0, hint: "Deoxyribonucleic acid" },
        { grade: 5, question: "人體有多少對染色體？", options: ["22對", "23對", "24對", "25對"], answer: 1, hint: "共46條" },
        { grade: 5, question: "牛頓發現了什麼定律？", options: ["相對論", "萬有引力", "進化論", "原子論"], answer: 1, hint: "蘋果落地的故事" },
        { grade: 5, question: "世界上最大的海洋是？", options: ["大西洋", "太平洋", "印度洋", "北冰洋"], answer: 1, hint: "面積最大的" },
        { grade: 5, question: "人體的消化系統從哪裡開始？", options: ["胃", "口腔", "小腸", "大腸"], answer: 1, hint: "吃東西的地方" },
        
        // 六年級
        { grade: 6, question: "原子的中心是什麼？", options: ["電子", "質子", "中子", "原子核"], answer: 3, hint: "包含質子和中子" },
        { grade: 6, question: "相對論是誰提出的？", options: ["牛頓", "愛因斯坦", "霍金", "居里夫人"], answer: 1, hint: "Albert Einstein" },
        { grade: 6, question: "地球的表層分為幾大板塊？", options: ["5個", "6個", "7個", "8個"], answer: 2, hint: "太平洋板塊、歐亞板塊等" },
        { grade: 6, question: "元素週期表是誰發明的？", options: ["門捷列夫", "居里夫人", "道爾頓", "拉瓦錫"], answer: 0, hint: "俄國化學家" },
        { grade: 6, question: "光速約為每秒多少公里？", options: ["15萬", "30萬", "45萬", "60萬"], answer: 1, hint: "299,792 km/s" }
    ]
};

// 輔助函數：根據年級獲取對應題目
function getQuestionsByGrade(subject, grade) {
    if (!QUESTION_BANK[subject]) return [];
    return QUESTION_BANK[subject].filter(q => q.grade === grade);
}

// 輔助函數：隨機獲取指定數量的題目（混合年級）
function getRandomQuestions(subject, count, maxGrade = 6) {
    if (!QUESTION_BANK[subject]) return [];
    const filtered = QUESTION_BANK[subject].filter(q => q.grade <= maxGrade);
    const shuffled = [...filtered].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, count);
}

// 科目名稱映射
const SUBJECT_NAMES = {
    chinese: "中文",
    english: "英文",
    math: "數學",
    general: "常識"
};

// 科目圖標映射
const SUBJECT_ICONS = {
    chinese: "📝",
    english: "🔤",
    math: "🔢",
    general: "🌍"
};

// 年級名稱映射
const GRADE_NAMES = {
    1: "一年級",
    2: "二年級",
    3: "三年級",
    4: "四年級",
    5: "五年級",
    6: "六年級"
};
