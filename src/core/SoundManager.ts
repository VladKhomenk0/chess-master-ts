// src/core/SoundManager.ts

export enum ChessSound {
    Move = "move",
    Capture = "capture",
    Check = "check",
    GameEnd = "gameEnd"
}

export class SoundManager {
    private static instance: SoundManager;
    private audioContext: AudioContext | null = null;
    private isMuted: boolean = false;

    private constructor() {
        const savedMute = localStorage.getItem("chess_muted");
        this.isMuted = savedMute === "true";
    }

    public static getInstance(): SoundManager {
        if (!SoundManager.instance) {
            SoundManager.instance = new SoundManager();
        }
        return SoundManager.instance;
    }

    private initAudio(): void {
        if (!this.audioContext) {
            this.audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
        }
    }

    public toggleMute(): boolean {
        this.isMuted = !this.isMuted;
        localStorage.setItem("chess_muted", String(this.isMuted));
        console.log(`[SoundManager]: Звук переключено. Поточний стан мікрофона: ${this.isMuted ? "Вимкнено" : "Увімкнено"}`);
        return this.isMuted;
    }

    public getMutedStatus(): boolean {
        return this.isMuted;
    }

    public play(soundType: ChessSound): void {
        if (this.isMuted) return;

        try {
            this.initAudio();
            if (!this.audioContext) return;

            if (this.audioContext.state === "suspended") {
                this.audioContext.resume();
            }

            const osc = this.audioContext.createOscillator();
            const gainNode = this.audioContext.createGain();

            osc.connect(gainNode);
            gainNode.connect(this.audioContext.destination);

            const now = this.audioContext.currentTime;

            switch (soundType) {
                case ChessSound.Move:
                    osc.type = "triangle";
                    osc.frequency.setValueAtTime(320, now);
                    osc.frequency.exponentialRampToValueAtTime(120, now + 0.1);
                    gainNode.gain.setValueAtTime(0.4, now);
                    gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.12);
                    osc.start(now);
                    osc.stop(now + 0.12);
                    break;

                case ChessSound.Capture:
                    osc.type = "sine";
                    osc.frequency.setValueAtTime(440, now);
                    osc.frequency.setValueAtTime(580, now + 0.04);
                    gainNode.gain.setValueAtTime(0.3, now);
                    gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.15);
                    osc.start(now);
                    osc.stop(now + 0.15);
                    break;

                case ChessSound.Check:
                    osc.type = "sawtooth";
                    osc.frequency.setValueAtTime(180, now);
                    osc.frequency.linearRampToValueAtTime(150, now + 0.2);
                    gainNode.gain.setValueAtTime(0.2, now);
                    gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.25);
                    osc.start(now);
                    osc.stop(now + 0.25);
                    break;

                case ChessSound.GameEnd:
                    osc.type = "sine";
                    osc.frequency.setValueAtTime(520, now);
                    osc.frequency.exponentialRampToValueAtTime(260, now + 0.4);
                    gainNode.gain.setValueAtTime(0.3, now);
                    gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.5);
                    osc.start(now);
                    osc.stop(now + 0.5);
                    break;
            }
        } catch (error) {
            console.error("[SoundManager]: Помилка відтворення звуку", error);
        }
    }
}