/**
 * 學習雞 - 音效系統
 * 使用 Web Audio API 實現免版權音效
 */

class SoundSystem {
    constructor() {
        this.audioContext = null;
        this.enabled = true;
        this.volume = 0.5;
        this.initialized = false;
    }

    init() {
        if (this.initialized) return;
        
        try {
            const AudioContext = window.AudioContext || window.webkitAudioContext;
            if (!AudioContext) {
                console.warn('Web Audio API not supported');
                this.enabled = false;
                return;
            }
            this.audioContext = new AudioContext();
            this.initialized = true;
        } catch (e) {
            console.warn('Web Audio API not supported');
            this.enabled = false;
        }
    }

    // 播放按鈕點擊音效
    playClick() {
        if (!this.enabled || !this.audioContext) return;
        this.playTone(800, 0.05, 'sine');
    }

    // 播放正確答案音效
    playCorrect() {
        if (!this.enabled || !this.audioContext) return;
        this.playArpeggio([523.25, 659.25, 783.99], 0.1); // C大調和弦
    }

    // 播放錯誤答案音效
    playWrong() {
        if (!this.enabled || !this.audioContext) return;
        this.playTone(200, 0.3, 'sawtooth');
    }

    // 播放獲得飼料音效
    playFeedGet() {
        if (!this.enabled || !this.audioContext) return;
        this.playArpeggio([523.25, 659.25, 783.99, 1046.50], 0.08);
    }

    // 播放餵食音效
    playFeed() {
        if (!this.enabled || !this.audioContext) return;
        this.playTone(440, 0.1, 'sine');
        setTimeout(() => this.playTone(554, 0.1, 'sine'), 100);
        setTimeout(() => this.playTone(659, 0.1, 'sine'), 200);
    }

    // 播放進化音效
    playEvolution() {
        if (!this.enabled || !this.audioContext) return;
        
        const now = this.audioContext.currentTime;
        
        // 魔法治療音效
        [523.25, 659.25, 783.99, 1046.50, 1318.51, 1567.98].forEach((freq, i) => {
            const osc = this.audioContext.createOscillator();
            const gain = this.audioContext.createGain();
            
            osc.frequency.value = freq;
            osc.type = 'sine';
            
            gain.gain.setValueAtTime(0, now + i * 0.1);
            gain.gain.linearRampToValueAtTime(0.3 * this.volume, now + i * 0.1 + 0.05);
            gain.gain.exponentialRampToValueAtTime(0.01, now + i * 0.1 + 0.3);
            
            osc.connect(gain);
            gain.connect(this.audioContext.destination);
            
            osc.start(now + i * 0.1);
            osc.stop(now + i * 0.1 + 0.4);
        });
    }

    // 播放背景音樂（簡單循環）
    playBGM() {
        if (!this.enabled || !this.audioContext) return;
        
        // 創建簡單的循環音樂
        const notes = [
            { freq: 523.25, duration: 0.5 }, // C
            { freq: 587.33, duration: 0.5 }, // D
            { freq: 659.25, duration: 0.5 }, // E
            { freq: 523.25, duration: 0.5 }, // C
        ];
        
        let currentTime = this.audioContext.currentTime;
        
        notes.forEach(note => {
            this.playToneAtTime(note.freq, note.duration, currentTime, 0.1);
            currentTime += note.duration;
        });
    }

    // 基礎播放單音
    playTone(frequency, duration, type = 'sine') {
        if (!this.audioContext) return;
        
        const osc = this.audioContext.createOscillator();
        const gain = this.audioContext.createGain();
        
        osc.frequency.value = frequency;
        osc.type = type;
        
        gain.gain.setValueAtTime(0.3 * this.volume, this.audioContext.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + duration);
        
        osc.connect(gain);
        gain.connect(this.audioContext.destination);
        
        osc.start();
        osc.stop(this.audioContext.currentTime + duration);
    }

    // 在指定時間播放音
    playToneAtTime(frequency, duration, startTime, volume = 0.3) {
        if (!this.audioContext) return;
        
        const osc = this.audioContext.createOscillator();
        const gain = this.audioContext.createGain();
        
        osc.frequency.value = frequency;
        osc.type = 'sine';
        
        gain.gain.setValueAtTime(volume * this.volume, startTime);
        gain.gain.exponentialRampToValueAtTime(0.01, startTime + duration);
        
        osc.connect(gain);
        gain.connect(this.audioContext.destination);
        
        osc.start(startTime);
        osc.stop(startTime + duration);
    }

    // 播放琶音
    playArpeggio(frequencies, interval) {
        if (!this.audioContext) return;
        
        const now = this.audioContext.currentTime;
        frequencies.forEach((freq, i) => {
            this.playToneAtTime(freq, 0.2, now + i * interval);
        });
    }

    // 設置音量
    setVolume(vol) {
        this.volume = Math.max(0, Math.min(1, vol));
    }

    // 開關音效
    toggle() {
        this.enabled = !this.enabled;
        return this.enabled;
    }

    // 解鎖音頻（用戶交互後調用）
    unlock() {
        if (this.audioContext && this.audioContext.state === 'suspended') {
            this.audioContext.resume();
        }
    }
}

// 創建全局音效實例
const soundSystem = new SoundSystem();

// 頁面加載後初始化
document.addEventListener('DOMContentLoaded', () => {
    // 延遲初始化，等待用戶交互
    const initAudio = () => {
        soundSystem.init();
        soundSystem.unlock();
        document.removeEventListener('click', initAudio);
        document.removeEventListener('touchstart', initAudio);
    };
    
    document.addEventListener('click', initAudio);
    document.addEventListener('touchstart', initAudio);
});
