/**
 * 星露牧場 - 進化系統
 * 30種牧場雞進化形態 - Stardew Valley風格
 */

const EVOLUTIONS = [
    // ========== 全能型 (5種) ==========
    {
        id: "all_round_master",
        name: "黃金冠軍雞",
        emoji: "🥇",
        image: "assets/images/evo_all_round_master.png",
        description: "五育並重，德智體群美全面發展的牧場之星",
        condition: (stats) => stats.chinese >= 4 && stats.english >= 4 && stats.math >= 4 && stats.general >= 4,
        type: "balanced",
        color: "#FFD700",
        badge: "全能冠軍"
    },
    {
        id: "knowledge_sage",
        name: "智慧智者雞",
        emoji: "📚",
        image: "assets/images/evo_knowledge_sage.png",
        description: "博覽群書，在牧場圖書館度過無數個日夜",
        condition: (stats) => stats.chinese >= 3 && stats.english >= 3 && stats.math >= 3 && stats.general >= 3,
        type: "balanced",
        color: "#9B59B6",
        badge: "博學多才"
    },
    {
        id: "rising_star",
        name: "閃耀新星雞",
        emoji: "⭐",
        image: "assets/images/evo_rising_star.png",
        description: "牧場上最耀眼的新星，潛力無限",
        condition: (stats) => stats.chinese >= 2 && stats.english >= 2 && stats.math >= 2 && stats.general >= 2,
        type: "balanced",
        color: "#3498DB",
        badge: "明日之星"
    },
    {
        id: "steady_developer",
        name: "穩健農夫雞",
        emoji: "🌾",
        image: "assets/images/chicken_basic.png",
        description: "穩扎穩打，像耕田一樣步步為營",
        condition: (stats) => stats.chinese >= 1 && stats.english >= 1 && stats.math >= 1 && stats.general >= 1,
        type: "balanced",
        color: "#95A5A6",
        badge: "穩中求進"
    },
    {
        id: "all_rounder_star",
        name: "雙星牧場雞",
        emoji: "🌟",
        image: "assets/images/evo_rising_star.png",
        description: "雙領域專精的全方位牧場人才",
        condition: (stats) => {
            const sorted = Object.values(stats).sort((a, b) => b - a);
            return sorted[0] >= 5 && sorted[1] >= 5;
        },
        type: "balanced",
        color: "#E74C3C",
        badge: "雙料冠軍"
    },

    // ========== 數學型 (4種) ==========
    {
        id: "math_genius",
        name: "計算大師雞",
        emoji: "🔢",
        image: "assets/images/evo_math_genius.png",
        description: "數理邏輯超人一等，牧場的會計師",
        condition: (stats) => stats.math >= 10,
        type: "math",
        color: "#2980B9",
        badge: "數學大師"
    },
    {
        id: "calculation_master",
        name: "算盤達人雞",
        emoji: "🧮",
        image: "assets/images/evo_calculation_master.png",
        description: "速算能力驚人，算收成從不出錯",
        condition: (stats) => stats.math >= 7 && stats.chinese < 4 && stats.english < 4,
        type: "math",
        color: "#1ABC9C",
        badge: "人腦計算機"
    },
    {
        id: "geometry_expert",
        name: "測量專家雞",
        emoji: "📐",
        image: "assets/images/evo_geometry_expert.png",
        description: "空間感與邏輯並重，規劃農地最拿手",
        condition: (stats) => stats.math >= 5 && stats.general >= 3,
        type: "math",
        color: "#16A085",
        badge: "空間大師"
    },
    {
        id: "logic_thinker",
        name: "邏輯思考雞",
        emoji: "🧩",
        image: "assets/images/evo_logic_thinker.png",
        description: "邏輯推理能力強，解決牧場難題的高手",
        condition: (stats) => stats.math >= 5 && stats.chinese >= 3,
        type: "math",
        color: "#27AE60",
        badge: "邏輯鬼才"
    },

    // ========== 語文型 (4種) ==========
    {
        id: "chinese_master",
        name: "詩人墨客雞",
        emoji: "📝",
        image: "assets/images/evo_chinese_master.png",
        description: "詩詞歌賦無所不能，牧場的文學家",
        condition: (stats) => stats.chinese >= 10,
        type: "chinese",
        color: "#E74C3C",
        badge: "文學巨匠"
    },
    {
        id: "literary_talent",
        name: "文學才子雞",
        emoji: "📖",
        image: "assets/images/evo_literary_talent.png",
        description: "文采飛揚，妙筆生花，日記寫得最好",
        condition: (stats) => stats.chinese >= 7 && stats.math < 4 && stats.english < 4,
        type: "chinese",
        color: "#C0392B",
        badge: "文思泉湧"
    },
    {
        id: "bilingual_elite",
        name: "雙語翻譯雞",
        emoji: "🌏",
        image: "assets/images/evo_bilingual_elite.png",
        description: "中英文雙語俱佳，接待外國遊客沒問題",
        condition: (stats) => stats.chinese >= 5 && stats.english >= 5,
        type: "chinese",
        color: "#F39C12",
        badge: "語言天才"
    },
    {
        id: "reading_expert",
        name: "閱讀愛好雞",
        emoji: "👓",
        image: "assets/images/evo_reading_expert.png",
        description: "閱讀理解能力強，牧場圖書館的常客",
        condition: (stats) => stats.chinese >= 5 && stats.general >= 3,
        type: "chinese",
        color: "#D35400",
        badge: "閱讀達人"
    },

    // ========== 英文型 (4種) ==========
    {
        id: "english_fluent",
        name: "英文流利雞",
        emoji: "🔤",
        image: "assets/images/evo_english_fluent.png",
        description: "英語說寫讀聽樣樣精通，國際化牧場雞",
        condition: (stats) => stats.english >= 10,
        type: "english",
        color: "#8E44AD",
        badge: "英語大師"
    },
    {
        id: "language_expert",
        name: "外語達人雞",
        emoji: "🗣️",
        image: "assets/images/evo_language_expert.png",
        description: "語言天賦異稟，會說多國語言",
        condition: (stats) => stats.english >= 7 && stats.chinese < 4 && stats.math < 4,
        type: "english",
        color: "#9B59B6",
        badge: "語言天才"
    },
    {
        id: "international_view",
        name: "國際視野雞",
        emoji: "🌐",
        image: "assets/images/evo_international_view.png",
        description: "具備國際觀的知識份子，環遊世界的夢想家",
        condition: (stats) => stats.english >= 5 && stats.general >= 5,
        type: "english",
        color: "#7D3C98",
        badge: "全球視野"
    },
    {
        id: "translation_expert",
        name: "翻譯專家雞",
        emoji: "📚",
        image: "assets/images/evo_translation_expert.png",
        description: "中英互譯能力強，牧場的官方翻譯",
        condition: (stats) => stats.english >= 5 && stats.chinese >= 3,
        type: "english",
        color: "#A569BD",
        badge: "翻譯達人"
    },

    // ========== 常識型 (4種) ==========
    {
        id: "general_knowledge_master",
        name: "百科全書雞",
        emoji: "🌍",
        image: "assets/images/evo_general_knowledge_master.png",
        description: "生活知識百事通，牧場的智多星",
        condition: (stats) => stats.general >= 10,
        type: "general",
        color: "#27AE60",
        badge: "百科全書"
    },
    {
        id: "science_explorer",
        name: "科學實驗雞",
        emoji: "🔬",
        image: "assets/images/evo_science_explorer.png",
        description: "科學素養深厚，喜歡研究農作物",
        condition: (stats) => stats.general >= 7 && stats.math >= 3,
        type: "general",
        color: "#229954",
        badge: "科學家"
    },
    {
        id: "geography_expert",
        name: "地理導遊雞",
        emoji: "🗺️",
        image: "assets/images/evo_geography_expert.png",
        description: "人文地理知識豐富，知道哪裡土壤最好",
        condition: (stats) => stats.general >= 5 && stats.chinese >= 3,
        type: "general",
        color: "#1E8449",
        badge: "地理通"
    },
    {
        id: "nature_observer",
        name: "自然觀察雞",
        emoji: "🌿",
        image: "assets/images/evo_nature_observer.png",
        description: "自然科學與外語並重，熱愛觀察生態",
        condition: (stats) => stats.general >= 5 && stats.english >= 3,
        type: "general",
        color: "#52BE80",
        badge: "自然學家"
    },

    // ========== 趣味/彩蛋型 (9種) ==========
    {
        id: "adventurous_imbalanced",
        name: "冒險探險雞",
        emoji: "🎲",
        image: "assets/images/evo_adventurous_imbalanced.png",
        description: "大膽冒險的偏科勇士，喜歡探索未知領域",
        condition: (stats) => {
            const values = Object.values(stats);
            const max = Math.max(...values);
            const min = Math.min(...values);
            return max >= 8 && min <= 1;
        },
        type: "special",
        color: "#E67E22",
        badge: "偏科王"
    },
    {
        id: "liberal_arts_chicken",
        name: "藝術畫家雞",
        emoji: "📜",
        image: "assets/images/evo_liberal_arts_chicken.png",
        description: "文科能力超強，畫得一手好畫",
        condition: (stats) => stats.chinese + stats.english >= 12,
        type: "special",
        color: "#D35400",
        badge: "文科狀元"
    },
    {
        id: "science_warrior",
        name: "科學戰士雞",
        emoji: "⚔️",
        image: "assets/images/evo_science_warrior.png",
        description: "理科思維敏銳，像戰士一樣精確",
        condition: (stats) => stats.math + stats.general >= 12,
        type: "special",
        color: "#2C3E50",
        badge: "理科狀元"
    },
    {
        id: "language_master",
        name: "語言大師雞",
        emoji: "💬",
        image: "assets/images/evo_language_master.png",
        description: "語言天才，牧場的溝通專家",
        condition: (stats) => stats.chinese + stats.english >= 10 && stats.math + stats.general <= 5,
        type: "special",
        color: "#8E44AD",
        badge: "語言專家"
    },
    {
        id: "science_geek",
        name: "科學怪咖雞",
        emoji: "🧪",
        image: "assets/images/evo_science_geek.png",
        description: "科學狂熱份子，總是做奇怪的實驗",
        condition: (stats) => stats.math + stats.general >= 10 && stats.chinese + stats.english <= 5,
        type: "special",
        color: "#16A085",
        badge: "科學狂人"
    },
    {
        id: "last_minute",
        name: "臨時抱佛腳雞",
        emoji: "⏰",
        image: "assets/images/evo_last_minute.png",
        description: "考試前的奇蹟，總是最後一刻爆發",
        condition: (stats) => {
            const values = Object.values(stats);
            return values.some(v => v === 20) && values.filter(v => v === 0).length === 3;
        },
        type: "special",
        color: "#F1C40F",
        badge: "考試神器"
    },
    {
        id: "extreme_imbalanced",
        name: "彩虹偏科雞",
        emoji: "🌈",
        image: "assets/images/evo_extreme_imbalanced.png",
        description: "嚴重偏科的特異人才，獨一無二的存在",
        condition: (stats) => {
            const values = Object.values(stats).sort((a, b) => b - a);
            return values[0] - values[3] >= 8;
        },
        type: "special",
        color: "#E91E63",
        badge: "特立獨行"
    },
    {
        id: "casual_cultivator",
        name: "隨緣茶道雞",
        emoji: "☯️",
        image: "assets/images/evo_casual_cultivator.png",
        description: "順其自然，隨遇而安，享受牧場生活",
        condition: (stats) => {
            const values = Object.values(stats);
            return values.every(v => v >= 3 && v <= 7) && new Set(values).size >= 3;
        },
        type: "special",
        color: "#95A5A6",
        badge: "隨遇而安"
    },
    {
        id: "mystery_mutant",
        name: "神秘變異雞",
        emoji: "👽",
        image: "assets/images/evo_mystery_mutant.png",
        description: "無法預測的神秘形態，牧場的傳說",
        condition: (stats) => {
            // 特殊組合：例如質數組合等
            const values = Object.values(stats);
            const sum = values.reduce((a, b) => a + b, 0);
            return sum === 20 && values.some(v => [2, 3, 5, 7, 11, 13, 17, 19].includes(v));
        },
        type: "special",
        color: "#9C27B0",
        badge: "神秘來客"
    }
];

// 科目名稱對照
const SUBJECT_NAMES = {
    chinese: "中文",
    english: "英文",
    math: "數學",
    general: "常識"
};

// 科目圖示對照
const SUBJECT_ICONS = {
    chinese: "🌾",
    english: "🌽",
    math: "🥕",
    general: "🍅"
};

// 年級名稱對照
const GRADE_NAMES = {
    1: "一年級",
    2: "二年級",
    3: "三年級",
    4: "四年級",
    5: "五年級",
    6: "六年級"
};

// 進化計算函數
function calculateEvolution(stats) {
    // 檢查是否達到進化條件
    const total = stats.chinese + stats.english + stats.math + stats.general;
    if (total < 20) return null;

    // 按優先級檢查進化條件（越特殊的越先檢查）
    const priorityOrder = [
        // 特殊/彩蛋型（最優先）
        "last_minute", "mystery_mutant", "extreme_imbalanced", "adventurous_imbalanced",
        "language_master", "science_geek", "liberal_arts_chicken", "science_warrior", "casual_cultivator",
        // 學科專精型
        "math_genius", "chinese_master", "english_fluent", "general_knowledge_master",
        "calculation_master", "literary_talent", "language_expert",
        // 混合型
        "geometry_expert", "logic_thinker", "bilingual_elite", "reading_expert",
        "international_view", "translation_expert", "science_explorer", "geography_expert", "nature_observer",
        // 全能型（最後檢查）
        "all_round_master", "knowledge_sage", "rising_star", "steady_developer", "all_rounder_star"
    ];

    for (const evoId of priorityOrder) {
        const evolution = EVOLUTIONS.find(e => e.id === evoId);
        if (evolution && evolution.condition(stats)) {
            return evolution;
        }
    }

    // 預設進化
    return EVOLUTIONS.find(e => e.id === "steady_developer");
}

// 獲取已收集的進化
function getCollectedEvolutions(unlockedIds) {
    return EVOLUTIONS.map(evo => ({
        ...evo,
        unlocked: unlockedIds.includes(evo.id)
    }));
}

// 按類型過濾進化
function filterEvolutionsByType(type) {
    if (type === 'all') return EVOLUTIONS;
    return EVOLUTIONS.filter(e => e.type === type);
}

// 獲取雞隻圖片路徑
function getChickenImage(stage, evolutionId = null) {
    if (stage === 'egg') {
        return 'assets/images/chicken_egg.png';
    } else if (stage === 'baby') {
        return 'assets/images/chicken_baby.png';
    } else if (stage === 'evolved' && evolutionId) {
        const evolution = EVOLUTIONS.find(e => e.id === evolutionId);
        return evolution ? evolution.image : 'assets/images/chicken_basic.png';
    }
    return 'assets/images/chicken_basic.png';
}

// 獲取雞隻名稱
function getChickenName(stage, evolutionId = null) {
    if (stage === 'egg') {
        return '牧場蛋';
    } else if (stage === 'baby') {
        return '小雞仔';
    } else if (stage === 'evolved' && evolutionId) {
        const evolution = EVOLUTIONS.find(e => e.id === evolutionId);
        return evolution ? evolution.name : '牧場雞';
    }
    return '牧場雞';
}

// 獲取雞隻描述
function getChickenDescription(stage, evolutionId = null) {
    if (stage === 'egg') {
        return '等待孵化...';
    } else if (stage === 'baby') {
        return '努力學習中...';
    } else if (stage === 'evolved' && evolutionId) {
        const evolution = EVOLUTIONS.find(e => e.id === evolutionId);
        return evolution ? evolution.description : '一隻普通的牧場雞';
    }
    return '一隻普通的牧場雞';
}
