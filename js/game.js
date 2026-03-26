/**
 * 星露牧場 - 主遊戲邏輯
 * Stardew Valley風格學習遊戲
 */

// ===== 輔助函數（確保在類定義之前存在）=====
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

class LearningChickenGame {
    constructor() {
        this.state = this.loadState() || this.getInitialState();
        this.currentQuiz = [];
        this.currentQuestionIndex = 0;
        this.currentSubject = null;
        this.quizCorrect = 0;
    }

    getInitialState() {
        return {
            level: 1,
            progress: 0, // 成長值，0-20
            feeds: { chinese: 0, english: 0, math: 0, general: 0 },
            stats: { chinese: 0, english: 0, math: 0, general: 0 }, // 答對題數統計
            answeredQuestions: { chinese: [], english: [], math: [], general: [] }, // 已答題目ID
            chicken: {
                name: "牧場蛋",
                stage: "egg", // egg, baby, evolved
                evolutionId: null
            },
            unlockedEvolutions: [],
            currentGrade: 6 // 預設顯示所有年級
        };
    }

    loadState() {
        const saved = localStorage.getItem('stardewRanchState');
        return saved ? JSON.parse(saved) : null;
    }

    saveState() {
        localStorage.setItem('stardewRanchState', JSON.stringify(this.state));
    }

    // ===== 畫面切換 =====
    showScreen(screenId) {
        document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
        document.getElementById(screenId).classList.add('active');
    }

    // ===== 遊戲開始 =====
    start() {
        console.log('[星露牧場] 開始遊戲被調用');
        try {
            if (typeof soundSystem !== 'undefined') {
                soundSystem.init();
                soundSystem.unlock();
            }
        } catch (e) {
            console.warn('音效初始化失敗:', e);
        }
        
        try {
            this.updateUI();
            this.showScreen('main-screen');
            console.log('[星露牧場] 已成功切換到主畫面');
        } catch (e) {
            console.error('[星露牧場] 切換畫面失敗:', e);
            alert('遊戲初始化失敗，請刷新頁面重試');
        }
    }

    // ===== 更新主畫面 =====
    updateUI() {
        // 等級與進度
        document.getElementById('level').textContent = this.state.level;
        document.getElementById('progress-text').textContent = `${this.state.progress}/20`;
        document.getElementById('progress-fill').style.width = `${(this.state.progress / 20) * 100}%`;

        // 飼料數量
        document.getElementById('feed-chinese').textContent = this.state.feeds.chinese;
        document.getElementById('feed-english').textContent = this.state.feeds.english;
        document.getElementById('feed-math').textContent = this.state.feeds.math;
        document.getElementById('feed-general').textContent = this.state.feeds.general;

        // 統計
        document.getElementById('stat-chinese').textContent = this.state.stats.chinese;
        document.getElementById('stat-english').textContent = this.state.stats.english;
        document.getElementById('stat-math').textContent = this.state.stats.math;
        document.getElementById('stat-general').textContent = this.state.stats.general;

        // 餵食按鈕狀態
        const hasFeed = Object.values(this.state.feeds).some(f => f > 0);
        document.getElementById('feed-btn').disabled = !hasFeed;

        // 更新雞的顯示
        this.updateChickenDisplay();

        this.saveState();
    }

    updateChickenDisplay() {
        const chickenEl = document.getElementById('chicken');
        const nameEl = document.getElementById('chicken-name');
        const titleEl = document.getElementById('chicken-title');
        const imgEl = document.getElementById('chicken-img');

        // 設置圖片
        const imagePath = getChickenImage(this.state.chicken.stage, this.state.chicken.evolutionId);
        if (imgEl) {
            imgEl.src = imagePath;
        }

        // 設置名稱和描述
        nameEl.textContent = getChickenName(this.state.chicken.stage, this.state.chicken.evolutionId);
        titleEl.textContent = getChickenDescription(this.state.chicken.stage, this.state.chicken.evolutionId);

        // 更新階段樣式
        chickenEl.className = `chicken stage-${this.state.chicken.stage}`;

        // 檢查進化條件
        const totalStats = Object.values(this.state.stats).reduce((a, b) => a + b, 0);
        if (totalStats >= 20 && this.state.chicken.stage !== 'evolved') {
            document.getElementById('evolution-glow').classList.add('active');
        } else {
            document.getElementById('evolution-glow').classList.remove('active');
        }
    }

    // ===== 開始答題 =====
    startQuiz(subject) {
        try {
            const slot = document.querySelector(`[data-subject="${subject}"]`);
            if (slot && typeof effects !== 'undefined') {
                effects.showButtonClick(slot);
            }
            if (typeof soundSystem !== 'undefined') {
                soundSystem.playClick();
            }
        } catch (e) {
            console.warn('特效/音效錯誤:', e);
        }
        this.currentSubject = subject;
        this.currentQuestionIndex = 0;
        this.quizCorrect = 0;
        
        // 獲取5道題目（傳入已答過嘅題目ID，避免重複）
        const answeredIds = this.state.answeredQuestions[subject] || [];
        this.currentQuiz = getRandomQuestions(subject, 5, this.state.currentGrade, answeredIds);
        
        // 為每條題目加ID，方便記錄
        this.currentQuiz = this.currentQuiz.map((q, idx) => ({
            ...q,
            _quizId: q._id || `${subject}_q${idx}_${Date.now()}`
        }));
        
        // 更新標題
        const subjectNameEl = document.getElementById('quiz-subject-name');
        subjectNameEl.textContent = SUBJECT_NAMES[subject];
        subjectNameEl.style.color = this.getSubjectColor(subject);
        document.getElementById('quiz-grade').textContent = this.state.currentGrade >= 6 ? '混合年級' : GRADE_NAMES[this.state.currentGrade];
        
        this.showQuestion();
        this.showScreen('quiz-screen');
    }

    getSubjectColor(subject) {
        const colors = { 
            chinese: '#E53935', 
            english: '#FFD54F', 
            math: '#FF7043', 
            general: '#43A047' 
        };
        return colors[subject];
    }

    showQuestion() {
        const question = this.currentQuiz[this.currentQuestionIndex];
        document.getElementById('q-current').textContent = this.currentQuestionIndex + 1;
        document.getElementById('question-text').textContent = question.question;
        document.getElementById('question-hint').textContent = question.hint ? `💡 ${question.hint}` : '';

        const optionsContainer = document.getElementById('options-container');
        optionsContainer.innerHTML = '';

        question.options.forEach((option, index) => {
            const btn = document.createElement('button');
            btn.className = 'option-btn';
            btn.innerHTML = `
                <span class="option-letter">${String.fromCharCode(65 + index)}</span>
                <span>${option}</span>
            `;
            btn.onclick = () => this.selectAnswer(index);
            optionsContainer.appendChild(btn);
        });

        document.getElementById('quiz-result').style.display = 'none';
    }

    selectAnswer(selectedIndex) {
        const question = this.currentQuiz[this.currentQuestionIndex];
        const isCorrect = selectedIndex === question.answer;
        
        const buttons = document.querySelectorAll('.option-btn');
        buttons.forEach((btn, index) => {
            btn.classList.add('disabled');
            btn.onclick = null;
            if (index === question.answer) {
                btn.classList.add('correct');
            } else if (index === selectedIndex && !isCorrect) {
                btn.classList.add('wrong');
            }
        });

        if (isCorrect) {
            this.quizCorrect++;
            if (typeof soundSystem !== 'undefined') soundSystem.playCorrect();
            if (typeof effects !== 'undefined') effects.showCorrect(window.innerWidth / 2, window.innerHeight / 2);
        } else {
            if (typeof soundSystem !== 'undefined') soundSystem.playWrong();
            if (typeof effects !== 'undefined') effects.showWrong(window.innerWidth / 2, window.innerHeight / 2);
        }

        // 顯示結果
        setTimeout(() => {
            this.showQuizResult(isCorrect);
        }, 800);
    }

    showQuizResult(isCorrect) {
        const resultDiv = document.getElementById('quiz-result');
        const iconEl = document.getElementById('result-icon');
        const textEl = document.getElementById('result-text');
        const rewardEl = document.getElementById('result-reward');

        if (isCorrect) {
            iconEl.innerHTML = `<img src="assets/images/ui_star.png" alt="答對" style="width: 100%; height: 100%;">`;
            textEl.textContent = '答對了！';
            textEl.style.color = '#27AE60';
            rewardEl.innerHTML = `獲得 <img src="assets/images/crop_${this.currentSubject}.png" style="width: 24px; height: 24px; vertical-align: middle;"> ${SUBJECT_NAMES[this.currentSubject]}作物 x1`;
        } else {
            iconEl.innerHTML = `<span style="font-size: 60px;">💭</span>`;
            textEl.textContent = '答錯了...';
            textEl.style.color = '#E74C3C';
            rewardEl.textContent = '再接再厲！下次一定行！';
        }

        resultDiv.style.display = 'flex';
    }

    nextQuestion() {
        this.currentQuestionIndex++;
        
        if (this.currentQuestionIndex < this.currentQuiz.length) {
            this.showQuestion();
        } else {
            // 答題結束，發放獎勵
            this.finishQuiz();
        }
    }

    finishQuiz() {
        // 記錄已答過嘅題目ID
        this.currentQuiz.forEach(q => {
            if (q._id && !this.state.answeredQuestions[this.currentSubject].includes(q._id)) {
                this.state.answeredQuestions[this.currentSubject].push(q._id);
            }
        });
        
        // 限制記錄數量，避免 localStorage 過大（每科最多記錄100條）
        const maxHistory = 100;
        if (this.state.answeredQuestions[this.currentSubject].length > maxHistory) {
            this.state.answeredQuestions[this.currentSubject] = 
                this.state.answeredQuestions[this.currentSubject].slice(-maxHistory);
        }
        
        // 發放飼料
        this.state.feeds[this.currentSubject] += this.quizCorrect;
        
        if (this.quizCorrect > 0) {
            if (typeof soundSystem !== 'undefined') soundSystem.playFeedGet();
            if (typeof effects !== 'undefined') effects.showFeedGet(window.innerWidth / 2, window.innerHeight / 3);
        }
        
        // 統計答對題數（用於進化計算）
        this.state.stats[this.currentSubject] += this.quizCorrect;

        // 更新等級
        const totalAnswered = Object.values(this.state.stats).reduce((a, b) => a + b, 0);
        this.state.level = Math.floor(totalAnswered / 10) + 1;

        // 檢查進化條件
        if (totalAnswered >= 20 && this.state.chicken.stage !== 'evolved') {
            this.showScreen('evolution-screen');
            this.setupEvolutionScreen();
        } else {
            // 更新階段
            if (totalAnswered >= 1 && this.state.chicken.stage === 'egg') {
                this.state.chicken.stage = 'baby';
            }
            this.updateUI();
            this.backToMain();
        }

        this.saveState();
    }

    // ===== 餵食 =====
    feedChicken() {
        const totalFeed = Object.values(this.state.feeds).reduce((a, b) => a + b, 0);
        if (totalFeed === 0) return;

        // 計算成長值（每種飼料提供不同成長值）
        const growth = Math.min(totalFeed, 20 - this.state.progress);
        this.state.progress += growth;

        // 消耗飼料
        const subjects = ['chinese', 'english', 'math', 'general'];
        let remaining = growth;
        for (const subject of subjects) {
            const consume = Math.min(this.state.feeds[subject], remaining);
            this.state.feeds[subject] -= consume;
            remaining -= consume;
            if (remaining <= 0) break;
        }

        // 餵食動畫
        this.showFeedAnimation();
        if (typeof soundSystem !== 'undefined') soundSystem.playFeed();

        // 檢查進化
        if (this.state.progress >= 20 && this.state.chicken.stage !== 'evolved') {
            const totalStats = Object.values(this.state.stats).reduce((a, b) => a + b, 0);
            if (totalStats >= 20) {
                setTimeout(() => {
                    this.showScreen('evolution-screen');
                    this.setupEvolutionScreen();
                }, 1000);
            }
        }

        this.updateUI();
    }

    showFeedAnimation() {
        const container = document.getElementById('chicken-container');
        const chicken = document.getElementById('chicken');
        
        // 添加開心跳躍動畫
        chicken.classList.add('happy');
        setTimeout(() => chicken.classList.remove('happy'), 600);
        
        // 創建愛心粒子
        for (let i = 0; i < 5; i++) {
            setTimeout(() => {
                const heart = document.createElement('div');
                heart.className = 'love-particle';
                heart.style.left = `${45 + Math.random() * 10}%`;
                heart.style.top = `${40 + Math.random() * 10}%`;
                heart.style.animationDelay = `${Math.random() * 0.3}s`;
                container.appendChild(heart);
                setTimeout(() => heart.remove(), 1500);
            }, i * 100);
        }
        
        // 創建星星粒子
        for (let i = 0; i < 4; i++) {
            setTimeout(() => {
                const star = document.createElement('div');
                star.className = 'star-particle';
                const angle = (i / 4) * Math.PI * 2;
                const distance = 30 + Math.random() * 20;
                star.style.left = `${50 + Math.cos(angle) * 15}%`;
                star.style.top = `${50 + Math.sin(angle) * 15}%`;
                container.appendChild(star);
                setTimeout(() => star.remove(), 1000);
            }, 200 + i * 150);
        }
        
        // 粒子特效
        if (typeof effects !== 'undefined') {
            effects.showFeedGet(
                container.getBoundingClientRect().left + container.offsetWidth / 2,
                container.getBoundingClientRect().top + container.offsetHeight / 2
            );
        }
    }

    // ===== 進化 =====
    setupEvolutionScreen() {
        const statsDiv = document.getElementById('evolution-stats');
        statsDiv.innerHTML = `
            <div class="stat-row">
                <img src="assets/images/crop_chinese.png" style="width: 20px; height: 20px; vertical-align: middle; margin-right: 5px;"> 中文: ${this.state.stats.chinese} 題
            </div>
            <div class="stat-row">
                <img src="assets/images/crop_english.png" style="width: 20px; height: 20px; vertical-align: middle; margin-right: 5px;"> 英文: ${this.state.stats.english} 題  
            </div>
            <div class="stat-row">
                <img src="assets/images/crop_math.png" style="width: 20px; height: 20px; vertical-align: middle; margin-right: 5px;"> 數學: ${this.state.stats.math} 題
            </div>
            <div class="stat-row">
                <img src="assets/images/crop_general.png" style="width: 20px; height: 20px; vertical-align: middle; margin-right: 5px;"> 常識: ${this.state.stats.general} 題
            </div>
        `;

        // 設置舊形態圖片
        const oldImg = document.querySelector('#evo-old img');
        if (oldImg) {
            oldImg.src = getChickenImage(this.state.chicken.stage, this.state.chicken.evolutionId);
        }
        document.getElementById('evo-new').classList.add('hidden');
    }

    performEvolution() {
        if (typeof soundSystem !== 'undefined') soundSystem.playEvolution();
        if (typeof effects !== 'undefined') effects.showEvolution(window.innerWidth / 2, window.innerHeight / 2);
        
        const evolution = calculateEvolution(this.state.stats);
        
        if (evolution) {
            this.state.chicken.stage = 'evolved';
            this.state.chicken.evolutionId = evolution.id;
            this.state.chicken.name = evolution.name;

            // 添加到已收集
            if (!this.state.unlockedEvolutions.includes(evolution.id)) {
                this.state.unlockedEvolutions.push(evolution.id);
            }

            // 顯示新形態
            const newEl = document.getElementById('evo-new');
            const newImg = newEl.querySelector('img');
            if (newImg) {
                newImg.src = evolution.image;
            }
            newEl.classList.remove('hidden');

            // 顯示結果彈窗
            setTimeout(() => {
                this.showEvolutionResult(evolution);
            }, 1500);
        }

        this.saveState();
    }

    showEvolutionResult(evolution) {
        const resultImg = document.querySelector('#result-chicken-emoji img');
        if (resultImg) {
            resultImg.src = evolution.image;
        }
        document.getElementById('result-chicken-name').textContent = evolution.name;
        document.getElementById('result-chicken-title').textContent = evolution.description;
        document.getElementById('result-description').textContent = `恭喜！你的牧場雞進化成「${evolution.name}」！`;
        
        const badgesDiv = document.getElementById('result-badges');
        badgesDiv.innerHTML = `<span class="badge" style="background: ${evolution.color}">${evolution.badge}</span>`;

        document.getElementById('evolution-result-modal').classList.add('active');
    }

    closeEvolutionResult() {
        document.getElementById('evolution-result-modal').classList.remove('active');
        this.updateUI();
        this.showScreen('main-screen');
    }

    // ===== 圖鑑 =====
    showCollection() {
        this.renderCollection('all');
        this.showScreen('collection-screen');
    }

    // ===== 設置 =====
    showSettings() {
        const settingsHtml = `
            <div class="modal active" id="settings-modal">
                <div class="modal-content" style="max-width: 320px;">
                    <h3>⚙️ 設置</h3>
                    <div style="margin: 20px 0; text-align: left;">
                        <div style="margin-bottom: 15px;">
                            <label style="display: block; margin-bottom: 8px; color: #636E72; font-size: 14px;">🎵 音效</label>
                            <button id="btn-sound" class="btn ${soundSystem && soundSystem.enabled ? 'btn-primary' : 'btn-secondary'}" style="width: 100%;">
                                ${soundSystem && soundSystem.enabled ? '🔊 開啟' : '🔇 關閉'}
                            </button>
                        </div>
                        <div style="margin-bottom: 15px;">
                            <label style="display: block; margin-bottom: 8px; color: #636E72; font-size: 14px;">📊 遊戲統計</label>
                            <div style="background: #F8F9FA; padding: 12px; border-radius: 8px; font-size: 13px;">
                                <div>等級: Lv.${this.state.level}</div>
                                <div>已答對: ${Object.values(this.state.stats).reduce((a,b)=>a+b,0)} 題</div>
                                <div>已收集: ${this.state.unlockedEvolutions.length}/30 形態</div>
                            </div>
                        </div>
                    </div>
                    <button class="btn btn-primary" onclick="document.getElementById('settings-modal').remove()" style="width: 100%;">關閉</button>
                </div>
            </div>
        `;
        
        document.body.insertAdjacentHTML('beforeend', settingsHtml);
        
        // 綁定音效切換
        const soundBtn = document.getElementById('btn-sound');
        if (soundBtn) {
            soundBtn.onclick = () => {
                if (typeof soundSystem !== 'undefined') {
                    soundSystem.toggle();
                    soundBtn.textContent = soundSystem.enabled ? '🔊 開啟' : '🔇 關閉';
                    soundBtn.className = `btn ${soundSystem.enabled ? 'btn-primary' : 'btn-secondary'}`;
                }
            };
        }
        
        // 點擊背景關閉
        const modal = document.getElementById('settings-modal');
        modal.addEventListener('click', (e) => {
            if (e.target === modal) modal.remove();
        });
    }

    renderCollection(filter) {
        const grid = document.getElementById('collection-grid');
        const evolutions = filter === 'all' ? EVOLUTIONS : EVOLUTIONS.filter(e => e.type === filter);
        
        grid.innerHTML = '';
        evolutions.forEach(evo => {
            const unlocked = this.state.unlockedEvolutions.includes(evo.id);
            const item = document.createElement('div');
            item.className = `collection-item ${unlocked ? 'unlocked' : 'locked'}`;
            
            if (unlocked) {
                item.style.cssText = `
                    background: linear-gradient(135deg, ${evo.color}20, ${evo.color}05);
                    border: 2px solid ${evo.color}40;
                    box-shadow: 0 4px 15px ${evo.color}30;
                `;
            }
            
            item.innerHTML = `
                <div class="collection-emoji" style="${unlocked ? '' : 'filter: grayscale(100%);'}">
                    <img src="${unlocked ? evo.image : 'assets/images/chicken_egg.png'}" alt="${unlocked ? evo.name : '???'}" 
                         style="width: 100%; height: 100%; object-fit: contain;">
                </div>
                <div class="collection-name" style="color: ${unlocked ? evo.color : '#999'};">${unlocked ? evo.name : '???'}</div>
                ${unlocked ? `<div style="position: absolute; top: 5px; right: 5px; font-size: 12px;">✓</div>` : ''}
            `;
            
            if (unlocked) {
                item.onclick = () => this.showEvolutionDetail(evo);
            }
            grid.appendChild(item);
        });

        document.getElementById('collected').textContent = this.state.unlockedEvolutions.length;
    }

    showEvolutionDetail(evolution) {
        // 創建更詳細的彈窗
        const modal = document.createElement('div');
        modal.className = 'modal active';
        modal.innerHTML = `
            <div class="modal-content evolution-detail-modal" style="max-width: 320px;">
                <div style="width: 80px; height: 80px; margin: 0 auto 10px;">
                    <img src="${evolution.image}" style="width: 100%; height: 100%; object-fit: contain; filter: drop-shadow(0 4px 10px rgba(0,0,0,0.2));">
                </div>
                <h2 style="color: ${evolution.color}; margin-bottom: 5px;">${evolution.name}</h2>
                <p style="color: #636E72; font-size: 14px; margin-bottom: 15px;">${evolution.description}</p>
                <div class="badge" style="background: ${evolution.color}; display: inline-block; margin-bottom: 15px; padding: 6px 16px; border-radius: 20px; color: white; font-weight: bold;">${evolution.badge}</div>
                <div style="background: #F8F9FA; padding: 12px; border-radius: 12px; margin-bottom: 15px; text-align: left;">
                    <div style="font-size: 12px; color: #636E72; margin-bottom: 8px;">📊 進化條件：</div>
                    <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 8px; font-size: 13px;">
                        <div><img src="assets/images/crop_chinese.png" style="width: 16px; height: 16px; vertical-align: middle;"> 中文: ${this.state.stats.chinese} 題</div>
                        <div><img src="assets/images/crop_english.png" style="width: 16px; height: 16px; vertical-align: middle;"> 英文: ${this.state.stats.english} 題</div>
                        <div><img src="assets/images/crop_math.png" style="width: 16px; height: 16px; vertical-align: middle;"> 數學: ${this.state.stats.math} 題</div>
                        <div><img src="assets/images/crop_general.png" style="width: 16px; height: 16px; vertical-align: middle;"> 常識: ${this.state.stats.general} 題</div>
                    </div>
                </div>
                <button class="btn btn-primary" onclick="this.closest('.modal').remove()" style="width: 100%;">關閉</button>
            </div>
        `;
        document.body.appendChild(modal);
        
        // 點擊背景關閉
        modal.addEventListener('click', (e) => {
            if (e.target === modal) modal.remove();
        });
    }

    // ===== 菜單 =====
    toggleMenu() {
        const choice = prompt('選擇功能：\n1. 圖鑑\n2. 設置\n3. 重置遊戲\n\n(輸入數字 1-3)');
        
        if (choice === null || choice === '') return; // 用戶取消
        
        if (choice === '1') this.showCollection();
        else if (choice === '2') this.showSettings();
        else if (choice === '3' && confirm('確定要重置遊戲嗎？⚠️ 遊戲進度會重置，但已收集的圖鑑會保留！')) {
            // 保存圖鑑進度
            const preservedCollection = this.state.unlockedEvolutions || [];
            
            // 重置遊戲
            localStorage.removeItem('stardewRanchState');
            this.state = this.getInitialState();
            
            // 恢復圖鑑
            this.state.unlockedEvolutions = preservedCollection;
            
            // 確保其他狀態正確初始化
            this.state.answeredQuestions = { chinese: [], english: [], math: [], general: [] };
            
            this.updateUI();
            
            // 顯示提示
            setTimeout(() => {
                alert(`✅ 遊戲已重置！\n📚 已保留 ${preservedCollection.length}/30 個收集的形態`);
            }, 100);
        }
    }

    // ===== 說明 =====
    showTutorial() {
        document.getElementById('tutorial-modal').classList.add('active');
    }

    closeModal() {
        document.getElementById('tutorial-modal').classList.remove('active');
    }

    backToMain() {
        this.showScreen('main-screen');
        this.updateUI();
    }
}

// 初始化遊戲
let game = null;

document.addEventListener('DOMContentLoaded', () => {
    console.log('[星露牧場] DOM 已加載，開始初始化...');
    
    try {
        // 檢查依賴
        if (typeof QUESTION_BANK === 'undefined') {
            console.error('[星露牧場] questions.js 未正確加載');
        }
        if (typeof EVOLUTIONS === 'undefined') {
            console.error('[星露牧場] evolutions.js 未正確加載');
        }
        
        // 創建遊戲實例
        game = new LearningChickenGame();
        console.log('[星露牧場] 遊戲初始化完成');
        
        // 檢查 localStorage 數據
        const savedState = localStorage.getItem('stardewRanchState');
        if (savedState) {
            console.log('[星露牧場] 已載入保存的遊戲進度');
        }
    } catch (e) {
        console.error('[星露牧場] 遊戲初始化失敗:', e);
        alert('遊戲初始化失敗，請刷新頁面重試');
    }
});

// 圖鑑過濾按鈕事件
document.addEventListener('click', (e) => {
    if (e.target.classList.contains('filter-btn')) {
        document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
        e.target.classList.add('active');
        if (game) {
            game.renderCollection(e.target.dataset.filter);
        }
    }
});
