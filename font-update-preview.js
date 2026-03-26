// 驗證字體更新效果
const { createCanvas, registerFont } = require('canvas');
const fs = require('fs');

const canvas = createCanvas(800, 600);
const ctx = canvas.getContext('2d');

// 背景
const gradient = ctx.createLinearGradient(0, 0, 0, 600);
gradient.addColorStop(0, '#87CEEB');
gradient.addColorStop(0.4, '#B3E5FC');
gradient.addColorStop(0.4, '#7CB342');
gradient.addColorStop(1, '#558B2F');
ctx.fillStyle = gradient;
ctx.fillRect(0, 0, 800, 600);

// 標題區塊
ctx.fillStyle = 'rgba(255, 255, 255, 0.95)';
ctx.roundRect = function(x, y, w, h, r) {
    this.beginPath();
    this.moveTo(x + r, y);
    this.lineTo(x + w - r, y);
    this.quadraticCurveTo(x + w, y, x + w, y + r);
    this.lineTo(x + w, y + h - r);
    this.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
    this.lineTo(x + r, y + h);
    this.quadraticCurveTo(x, y + h, x, y + h - r);
    this.lineTo(x, y + r);
    this.quadraticCurveTo(x, y, x + r, y);
    this.closePath();
    this.fill();
};
ctx.roundRect(50, 30, 700, 540, 20);

// 標題
ctx.fillStyle = '#3E2723';
ctx.font = 'bold 36px sans-serif';
ctx.textAlign = 'center';
ctx.fillText('🔤 字體更新完成', 400, 80);

// 字體說明
ctx.font = '24px sans-serif';
ctx.fillStyle = '#5D4037';
ctx.fillText('使用字體：霞鶩文楷 (LXGW WenKai)', 400, 120);

// 字體特性
const features = [
    '✅ 開源免費商用',
    '✅ 手寫風格，可愛易讀',
    '✅ 適合遊戲標題和正文',
    '✅ 有 Regular 和 Bold 兩種字重',
    '✅ 系統字體後備方案',
];

ctx.textAlign = 'left';
ctx.font = '22px sans-serif';
ctx.fillStyle = '#3E2723';
features.forEach((feat, i) => {
    ctx.fillText(feat, 100, 180 + i * 40);
});

// 字體預覽區
ctx.fillStyle = '#F5F5F5';
ctx.fillRect(100, 380, 600, 160);
ctx.strokeStyle = '#8D6E63';
ctx.lineWidth = 3;
ctx.strokeRect(100, 380, 600, 160);

ctx.fillStyle = '#3E2723';
ctx.font = '18px sans-serif';
ctx.textAlign = 'center';
ctx.fillText('字體預覽（實際效果請訪問網站）', 400, 410);

// 預覽文字
ctx.font = 'bold 28px sans-serif';
ctx.fillStyle = '#7CB342';
ctx.fillText('星露牧場', 400, 460);

ctx.font = '24px sans-serif';
ctx.fillStyle = '#5D4037';
ctx.fillText('答題種植 · 牧場養成', 400, 500);

// 網址
ctx.font = 'bold 20px sans-serif';
ctx.fillStyle = '#1976D2';
ctx.fillText('tc-gh-claw.github.io/learning-chicken/', 400, 550);

// 保存
const buffer = canvas.toBuffer('image/png');
fs.writeFileSync('./FONT_UPDATE.png', buffer);
console.log('✅ 字體更新預覽已生成: FONT_UPDATE.png');
