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

        this.game.clock = new ChessClock(
            5, // Кількість хвилин на партію (можна змінити на 10 або 3)
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

        if (this.game.currentPlayer === "white") {
            this.timerWhiteBox.classList.add("timer-active");
        } else {
            this.timerBlackBox.classList.add("timer-active");
        }
    }

    private updatePlayerTurn() {
        if (!this.playerTurnElement) return;

        const currentPlayer = this.game.currentPlayer;
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

        const captured = (this.game as any).capturedPieces || [];

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

        const moveHistoryObj = (this.game as any).moveHistory;
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