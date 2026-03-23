/**
 * 學習雞 - 進化系統
 * 30種進化形態定義
 */

const EVOLUTIONS = [
    // ========== 全能型 (5種) ==========
    {
        id: "all_round_master",
        name: "全能學霸雞",
        emoji: "🎓",
        description: "五育並重，德智體群美全面發展",
        condition: (stats) => stats.chinese >= 4 && stats.english >= 4 && stats.math >= 4 && stats.general >= 4,
        type: "balanced",
        color: "#FFD700",
        badge: "全能冠軍"
    },
    {
        id: "knowledge_sage",
        name: "知識博學雞",
        emoji: "📚",
        description: "博覽群書，涉獵廣泛",
        condition: (stats) => stats.chinese >= 3 && stats.english >= 3 && stats.math >= 3 && stats.general >= 3,
        type: "balanced",
        color: "#9B59B6",
        badge: "博學多才"
    },
    {
        id: "rising_star",
        name: "潛力新星雞",
        emoji: "⭐",
        description: "潛力無限，後勁十足",
        condition: (stats) => stats.chinese >= 2 && stats.english >= 2 && stats.math >= 2 && stats.general >= 2,
        type: "balanced",
        color: "#3498DB",
        badge: "明日之星"
    },
    {
        id: "steady_developer",
        name: "平均發展雞",
        emoji: "⚖️",
        description: "穩扎穩打，步步為營",
        condition: (stats) => stats.chinese >= 1 && stats.english >= 1 && stats.math >= 1 && stats.general >= 1,
        type: "balanced",
        color: "#95A5A6",
        badge: "穩中求進"
    },
    {
        id: "all_rounder_star",
        name: "全才之星雞",
        emoji: "🌟",
        description: "雙領域專精的全方位人才",
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
        name: "數學天才雞",
        emoji: "🔢",
        description: "數理邏輯超人一等",
        condition: (stats) => stats.math >= 10,
        type: "math",
        color: "#2980B9",
        badge: "數學大師"
    },
    {
        id: "calculation_master",
        name: "計算大師雞",
        emoji: "🧮",
        description: "速算能力驚人",
        condition: (stats) => stats.math >= 7 && stats.chinese < 4 && stats.english < 4,
        type: "math",
        color: "#1ABC9C",
        badge: "人腦計算機"
    },
    {
        id: "geometry_expert",
        name: "幾何專家雞",
        emoji: "📐",
        description: "空間感與邏輯並重",
        condition: (stats) => stats.math >= 5 && stats.general >= 3,
        type: "math",
        color: "#16A085",
        badge: "空間大師"
    },
    {
        id: "logic_thinker",
        name: "邏輯思維雞",
        emoji: "🧩",
        description: "邏輯推理能力強",
        condition: (stats) => stats.math >= 5 && stats.chinese >= 3,
        type: "math",
        color: "#27AE60",
        badge: "邏輯鬼才"
    },

    // ========== 語文型 (4種) ==========
    {
        id: "chinese_master",
        name: "語文大師雞",
        emoji: "📝",
        description: "詩詞歌賦無所不能",
        condition: (stats) => stats.chinese >= 10,
        type: "chinese",
        color: "#E74C3C",
        badge: "文學巨匠"
    },
    {
        id: "literary_talent",
        name: "文學才子雞",
        emoji: "📖",
        description: "文采飛揚，妙筆生花",
        condition: (stats) => stats.chinese >= 7 && stats.math < 4 && stats.english < 4,
        type: "chinese",
        color: "#C0392B",
        badge: "文思泉湧"
    },
    {
        id: "bilingual_elite",
        name: "雙語精英雞",
        emoji: "🌏",
        description: "中英文雙語俱佳",
        condition: (stats) => stats.chinese >= 5 && stats.english >= 5,
        type: "chinese",
        color: "#F39C12",
        badge: "語言天才"
    },
    {
        id: "reading_expert",
        name: "閱讀理解雞",
        emoji: "👓",
        description: "閱讀理解能力強",
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
        description: "英語說寫讀聽樣樣精通",
        condition: (stats) => stats.english >= 10,
        type: "english",
        color: "#8E44AD",
        badge: "英語大師"
    },
    {
        id: "language_expert",
        name: "外語達人雞",
        emoji: "🗣️",
        description: "語言天賦異稟",
        condition: (stats) => stats.english >= 7 && stats.chinese < 4 && stats.math < 4,
        type: "english",
        color: "#9B59B6",
        badge: "語言天才"
    },
    {
        id: "international_view",
        name: "國際視野雞",
        emoji: "🌐",
        description: "具備國際觀的知識份子",
        condition: (stats) => stats.english >= 5 && stats.general >= 5,
        type: "english",
        color: "#7D3C98",
        badge: "全球視野"
    },
    {
        id: "translation_expert",
        name: "翻譯專家雞",
        emoji: "📚",
        description: "中英互譯能力強",
        condition: (stats) => stats.english >= 5 && stats.chinese >= 3,
        type: "english",
        color: "#A569BD",
        badge: "翻譯達人"
    },

    // ========== 常識型 (4種) ==========
    {
        id: "general_knowledge_master",
        name: "常識達人雞",
        emoji: "🌍",
        description: "生活知識百事通",
        condition: (stats) => stats.general >= 10,
        type: "general",
        color: "#27AE60",
        badge: "百科全書"
    },
    {
        id: "science_explorer",
        name: "科學探索雞",
        emoji: "🔬",
        description: "科學素養深厚",
        condition: (stats) => stats.general >= 7 && stats.math >= 3,
        type: "general",
        color: "#229954",
        badge: "科學家"
    },
    {
        id: "geography_expert",
        name: "地理專家雞",
        emoji: "🗺️",
        description: "人文地理知識豐富",
        condition: (stats) => stats.general >= 5 && stats.chinese >= 3,
        type: "general",
        color: "#1E8449",
        badge: "地理通"
    },
    {
        id: "nature_observer",
        name: "自然觀察雞",
        emoji: "🌿",
        description: "自然科學與外語並重",
        condition: (stats) => stats.general >= 5 && stats.english >= 3,
        type: "general",
        color: "#52BE80",
        badge: "自然學家"
    },

    // ========== 趣味/彩蛋型 (9種) ==========
    {
        id: "adventurous_imbalanced",
        name: "偏科冒險雞",
        emoji: "🎲",
        description: "大膽冒險的偏科勇士",
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
        name: "文科小雞",
        emoji: "📜",
        description: "文科能力超強",
        condition: (stats) => stats.chinese + stats.english >= 12,
        type: "special",
        color: "#D35400",
        badge: "文科狀元"
    },
    {
        id: "science_warrior",
        name: "理科戰士雞",
        emoji: "⚔️",
        description: "理科思維敏銳",
        condition: (stats) => stats.math + stats.general >= 12,
        type: "special",
        color: "#2C3E50",
        badge: "理科狀元"
    },
    {
        id: "language_master",
        name: "語言大師雞",
        emoji: "💬",
        description: "語言天才",
        condition: (stats) => stats.chinese + stats.english >= 10 && stats.math + stats.general <= 5,
        type: "special",
        color: "#8E44AD",
        badge: "語言專家"
    },
    {
        id: "science_geek",
        name: "科學怪雞",
        emoji: "🧪",
        description: "科學狂熱份子",
        condition: (stats) => stats.math + stats.general >= 10 && stats.chinese + stats.english <= 5,
        type: "special",
        color: "#16A085",
        badge: "科學狂人"
    },
    {
        id: "last_minute",
        name: "臨時抱佛腳雞",
        emoji: "⏰",
        description: "考試前的奇蹟",
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
        name: "偏科奇才雞",
        emoji: "🌈",
        description: "嚴重偏科的特異人才",
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
        name: "隨緣修煉雞",
        emoji: "☯️",
        description: "順其自然，隨遇而安",
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
        description: "無法預測的神秘形態",
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
