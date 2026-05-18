
export class ChessClock {
    private whiteTime: number;
    private blackTime: number;
    private activePlayer: "white" | "black";
    private intervalId: any | null = null;

    private onTick: (whiteStr: string, blackStr: string) => void;
    private onTimeOut: (loser: "white" | "black") => void;

    constructor(
        initialMinutes: number,
        onTick: (whiteStr: string, blackStr: string) => void,
        onTimeOut: (loser: "white" | "black") => void
    ) {
        this.whiteTime = initialMinutes * 60;
        this.blackTime = initialMinutes * 60;
        this.activePlayer = "white"; // Білі починають завжди
        this.onTick = onTick;
        this.onTimeOut = onTimeOut;
    }

    public startOrSwitch(currentPlayer: "white" | "black") {
        this.activePlayer = currentPlayer;

        if (!this.intervalId) {
            this.intervalId = setInterval(() => {
                this.tick();
            }, 1000);
        }
    }

    public stop() {
        if (this.intervalId) {
            clearInterval(this.intervalId);
            this.intervalId = null;
        }
    }

    public reset(minutes: number) {
        this.stop();
        this.whiteTime = minutes * 60;
        this.blackTime = minutes * 60;
        this.activePlayer = "white";
        this.triggerTickCallback();
    }

    private tick() {
        if (this.activePlayer === "white") {
            this.whiteTime--;
            if (this.whiteTime <= 0) {
                this.stop();
                this.onTimeOut("white");
            }
        } else {
            this.blackTime--;
            if (this.blackTime <= 0) {
                this.stop();
                this.onTimeOut("black");
            }
        }

        this.triggerTickCallback();
    }

    private triggerTickCallback() {
        this.onTick(this.formatTime(this.whiteTime), this.formatTime(this.blackTime));
    }

    private formatTime(seconds: number): string {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;

        const minsStr = mins < 10 ? `0${mins}` : `${mins}`;
        const secsStr = secs < 10 ? `0${secs}` : `${secs}`;

        return `${minsStr}:${secsStr}`;
    }

    public getActivePlayer(): "white" | "black" {
        return this.activePlayer;
    }
}