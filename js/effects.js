/**
 * 學習雞 - 視覺特效系統
 * 粒子效果、動畫、光效
 */

class EffectsSystem {
    constructor() {
        this.particles = [];
        this.canvas = null;
        this.ctx = null;
        this.animationId = null;
    }

    // 初始化粒子畫布
    initCanvas() {
        if (this.canvas) return;
        
        try {
            this.canvas = document.createElement('canvas');
            this.canvas.id = 'effects-canvas';
            this.canvas.style.cssText = `
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                pointer-events: none;
                z-index: 9999;
            `;
            document.body.appendChild(this.canvas);
            
            this.ctx = this.canvas.getContext('2d');
            this.resize();
            
            window.addEventListener('resize', () => this.resize());
            this.startAnimation();
        } catch (e) {
            console.warn('特效初始化失敗:', e);
        }
    }

    resize() {
        if (!this.canvas) return;
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    // 創建粒子
    createParticle(x, y, type = 'sparkle') {
        const colors = {
            sparkle: ['#FFD700', '#FFA500', '#FF6347', '#FF69B4'],
            feed: ['#90EE90', '#98FB98', '#00FF7F', '#32CD32'],
            evolution: ['#9370DB', '#BA55D3', '#FF69B4', '#FFD700'],
            correct: ['#00FF00', '#32CD32', '#90EE90', '#98FB98'],
            wrong: ['#FF0000', '#FF6347', '#DC143C', '#B22222']
        };

        const particleTypes = {
            sparkle: { size: [2, 6], speed: [1, 3], life: [30, 60] },
            feed: { size: [4, 10], speed: [2, 5], life: [40, 80] },
            evolution: { size: [5, 15], speed: [3, 8], life: [60, 120] },
            correct: { size: [3, 8], speed: [2, 6], life: [30, 60] },
            wrong: { size: [4, 10], speed: [1, 4], life: [40, 70] }
        };

        const config = particleTypes[type] || particleTypes.sparkle;
        const colorList = colors[type] || colors.sparkle;

        return {
            x: x,
            y: y,
            vx: (Math.random() - 0.5) * config.speed[1],
            vy: (Math.random() - 0.5) * config.speed[1] - 2,
            size: Math.random() * (config.size[1] - config.size[0]) + config.size[0],
            color: colorList[Math.floor(Math.random() * colorList.length)],
            life: Math.random() * (config.life[1] - config.life[0]) + config.life[0],
            maxLife: 0,
            type: type
        };
    }

    // 發射粒子
    emit(x, y, count = 10, type = 'sparkle') {
        this.initCanvas();
        
        for (let i = 0; i < count; i++) {
            const particle = this.createParticle(x, y, type);
            particle.maxLife = particle.life;
            this.particles.push(particle);
        }
    }

    // 從元素中心發射粒子
    emitFromElement(element, count = 10, type = 'sparkle') {
        const rect = element.getBoundingClientRect();
        const x = rect.left + rect.width / 2;
        const y = rect.top + rect.height / 2;
        this.emit(x, y, count, type);
    }

    // 更新粒子
    update() {
        this.particles = this.particles.filter(p => {
            p.x += p.vx;
            p.y += p.vy;
            p.vy += 0.1; // 重力
            p.life--;
            return p.life > 0;
        });
    }

    // 繪製粒子
    draw() {
        if (!this.ctx) return;
        
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        this.particles.forEach(p => {
            const alpha = p.life / p.maxLife;
            this.ctx.globalAlpha = alpha;
            this.ctx.fillStyle = p.color;
            
            if (p.type === 'sparkle') {
                // 繪製星形
                this.drawStar(p.x, p.y, p.size, alpha);
            } else if (p.type === 'evolution') {
                // 繪製圓形光暈
                const gradient = this.ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size * 2);
                gradient.addColorStop(0, p.color);
                gradient.addColorStop(1, 'transparent');
                this.ctx.fillStyle = gradient;
                this.ctx.beginPath();
                this.ctx.arc(p.x, p.y, p.size * 2, 0, Math.PI * 2);
                this.ctx.fill();
            } else {
                // 繪製圓形
                this.ctx.beginPath();
                this.ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                this.ctx.fill();
            }
        });
        
        this.ctx.globalAlpha = 1;
    }

    // 繪製星形
    drawStar(x, y, size, alpha) {
        this.ctx.beginPath();
        for (let i = 0; i < 5; i++) {
            const angle = (i * 4 * Math.PI) / 5 - Math.PI / 2;
            const px = x + Math.cos(angle) * size;
            const py = y + Math.sin(angle) * size;
            if (i === 0) {
                this.ctx.moveTo(px, py);
            } else {
                this.ctx.lineTo(px, py);
            }
        }
        this.ctx.closePath();
        this.ctx.fill();
    }

    // 動畫循環
    startAnimation() {
        const animate = () => {
            this.update();
            this.draw();
            this.animationId = requestAnimationFrame(animate);
        };
        animate();
    }

    // 答對特效
    showCorrect(x, y) {
        this.emit(x, y, 20, 'correct');
    }

    // 答錯特效
    showWrong(x, y) {
        this.emit(x, y, 15, 'wrong');
    }

    // 獲得飼料特效
    showFeedGet(x, y) {
        this.emit(x, y, 25, 'feed');
    }

    // 進化特效
    showEvolution(x, y) {
        this.emit(x, y, 50, 'evolution');
    }

    // 按鈕點擊特效
    showButtonClick(element) {
        this.emitFromElement(element, 8, 'sparkle');
    }

    // 清理
    destroy() {
        if (this.animationId) {
            cancelAnimationFrame(this.animationId);
        }
        if (this.canvas) {
            this.canvas.remove();
        }
    }
}

// 創建全局特效實例
const effects = new EffectsSystem();

// 擴展 CSS 動畫
const styleSheet = document.createElement('style');
styleSheet.textContent = `
    /* 額外動畫效果 */
    @keyframes shake {
        0%, 100% { transform: translateX(0); }
        25% { transform: translateX(-5px); }
        75% { transform: translateX(5px); }
    }

    @keyframes glow {
        0%, 100% { box-shadow: 0 0 5px currentColor; }
        50% { box-shadow: 0 0 20px currentColor, 0 0 40px currentColor; }
    }

    @keyframes floatUp {
        0% { transform: translateY(0) scale(1); opacity: 1; }
        100% { transform: translateY(-100px) scale(0); opacity: 0; }
    }

    @keyframes popIn {
        0% { transform: scale(0); }
        80% { transform: scale(1.1); }
        100% { transform: scale(1); }
    }

    @keyframes wiggle {
        0%, 100% { transform: rotate(0deg); }
        25% { transform: rotate(-5deg); }
        75% { transform: rotate(5deg); }
    }

    .shake { animation: shake 0.3s ease; }
    .glow { animation: glow 1s ease infinite; }
    .pop-in { animation: popIn 0.3s ease; }
    .wiggle { animation: wiggle 0.5s ease; }

    /* 按鈕懸停效果增強 */
    .btn {
        position: relative;
        overflow: hidden;
    }

    .btn::after {
        content: '';
        position: absolute;
        top: 50%;
        left: 50%;
        width: 0;
        height: 0;
        background: rgba(255, 255, 255, 0.3);
        border-radius: 50%;
        transform: translate(-50%, -50%);
        transition: width 0.3s, height 0.3s;
    }

    .btn:active::after {
        width: 200%;
        height: 200%;
    }

    /* 答題選項增強 */
    .option-btn {
        position: relative;
        overflow: hidden;
    }

    .option-btn::before {
        content: '';
        position: absolute;
        top: 0;
        left: -100%;
        width: 100%;
        height: 100%;
        background: linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent);
        transition: left 0.5s;
    }

    .option-btn:hover::before {
        left: 100%;
    }

    /* 進度條閃爍效果 */
    .progress-fill {
        position: relative;
    }

    .progress-fill::after {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent);
        animation: shimmer 2s infinite;
    }

    @keyframes shimmer {
        0% { transform: translateX(-100%); }
        100% { transform: translateX(100%); }
    }
`;
document.head.appendChild(styleSheet);
