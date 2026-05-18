import { type GameEngine } from "../core/GameEngine.js";
import { ChessClock } from "../core/ChessClock.js";

export class ScoreboardView {
    private game: GameEngine;
    private playerTurnElement: HTMLElement | null;
    private capturedWhiteContainer: HTMLElement | null;
    private capturedBlackContainer: HTMLElement | null;
    private restartBtn: HTMLElement | null;
    private movesLogContainer: HTMLElement | null;

    private timerWhiteElement: HTMLElement | null;
    private timerBlackElement: HTMLElement | null;
    private timerWhiteBox: HTMLElement | null;
    private timerBlackBox: HTMLElement | null;

    private statActivePiece: HTMLElement | null;
    private statWhiteTime: HTMLElement | null;
    private statBlackTime: HTMLElement | null;
    private statChecks: HTMLElement | null;

    constructor(game: GameEngine) {
        this.game = game;

        this.playerTurnElement = document.getElementById("current-player-turn");
        this.capturedWhiteContainer = document.getElementById("captured-white");
        this.capturedBlackContainer = document.getElementById("captured-black");
        this.restartBtn = document.getElementById("restart-btn");
        this.movesLogContainer = document.getElementById("moves-log");

        this.timerWhiteElement = document.getElementById("timer-white");
        this.timerBlackElement = document.getElementById("timer-black");
        this.timerWhiteBox = document.getElementById("timer-white-box");
        this.timerBlackBox = document.getElementById("timer-black-box");

        this.statActivePiece = document.getElementById("stat-active-piece");
        this.statWhiteTime = document.getElementById("stat-white-time");
        this.statBlackTime = document.getElementById("stat-black-time");
        this.statChecks = document.getElementById("stat-checks");

        this.game.clock = new ChessClock(
            5,
            (whiteStr, blackStr) => this.handleClockTick(whiteStr, blackStr),
            (loser) => this.handleTimeOut(loser)
        );

        this.initEventListeners();
        this.update();
    }

    public update() {
        this.updatePlayerTurn();
        this.updateCapturedPieces();
        this.updateMoveHistory();
        this.updateActiveTimerHighlight();
        this.updateAnalytics();
    }

    private updateAnalytics() {
        if (!this.game.analytics) return;

        const totalMoves = (this.game as any).moveHistory?.moves?.length || 0;
        const totalCaptured = this.game.capturedPieces?.length || 0;

        const report = this.game.analytics.generateReport(totalMoves, totalCaptured);

        if (this.statActivePiece) this.statActivePiece.textContent = report.mostActivePieceType;
        if (this.statWhiteTime) this.statWhiteTime.textContent = `${report.whiteAverageTime}с`;
        if (this.statBlackTime) this.statBlackTime.textContent = `${report.blackAverageTime}с`;
        if (this.statChecks) this.statChecks.textContent = report.checksCount.toString();
    }

    private handleClockTick(whiteStr: string, blackStr: string) {
        if (this.timerWhiteElement) this.timerWhiteElement.textContent = whiteStr;
        if (this.timerBlackElement) this.timerBlackElement.textContent = blackStr;
    }

    private handleTimeOut(loser: "white" | "black") {
        (this.game as any).isGameOver = true;
        const winner = loser === "white" ? "Чорні" : "Білі";
        alert(`Час вийшов! Перемогли ${winner}! 🏆`);
    }

    private updateActiveTimerHighlight() {
        if (!this.timerWhiteBox || !this.timerBlackBox) return;

        this.timerWhiteBox.classList.remove("timer-active");
        this.timerBlackBox.classList.remove("timer-active");

        const currentTurnColor = this.game.currentPlayer.toLowerCase();
        if (currentTurnColor === "white") {
            this.timerWhiteBox.classList.add("timer-active");
        } else {
            this.timerBlackBox.classList.add("timer-active");
        }
    }

    private updatePlayerTurn() {
        if (!this.playerTurnElement) return;

        const currentPlayer = this.game.currentPlayer.toLowerCase();
        this.playerTurnElement.textContent = currentPlayer === "white" ? "White" : "Black";

        if (currentPlayer === "white") {
            this.playerTurnElement.className = "turn-white";
        } else {
            this.playerTurnElement.className = "turn-black";
        }

        this.updateActiveTimerHighlight();
    }

    private updateCapturedPieces() {
        if (!this.capturedWhiteContainer || !this.capturedBlackContainer) return;

        this.capturedWhiteContainer.innerHTML = "";
        this.capturedBlackContainer.innerHTML = "";

        const captured = this.game.capturedPieces || [];

        captured.forEach((piece: any) => {
            const img = document.createElement("img");
            img.src = `/assets/images/${piece.color.toLowerCase()}-${piece.constructor.name.toLowerCase()}.png`;
            img.title = piece.constructor.name;

            if (piece.color.toLowerCase() === "white") {
                this.capturedWhiteContainer?.appendChild(img);
            } else {
                this.capturedBlackContainer?.appendChild(img);
            }
        });
    }

    private updateMoveHistory() {
        if (!this.movesLogContainer) return;
        this.movesLogContainer.innerHTML = "";

        const moveHistoryObj = this.game.moveHistory;
        if (!moveHistoryObj || typeof moveHistoryObj.getFormattedHistory !== "function") return;

        const historyStrings = moveHistoryObj.getFormattedHistory();

        historyStrings.forEach((moveText: string) => {
            const moveRow = document.createElement("div");
            moveRow.className = "move-row";
            moveRow.textContent = moveText;
            this.movesLogContainer?.appendChild(moveRow);
        });

        this.movesLogContainer.scrollTop = this.movesLogContainer.scrollHeight;
    }

    private initEventListeners() {
        if (!this.restartBtn) return;

        this.restartBtn.addEventListener("click", () => {
            this.game.restart();
            this.update();

            const event = new CustomEvent("game-restarted");
            document.dispatchEvent(event);
        });
    }
}