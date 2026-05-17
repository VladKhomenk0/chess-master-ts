import { type GameEngine } from "../core/GameEngine.js";

export class ScoreboardView {
    private game: GameEngine;
    private playerTurnElement: HTMLElement | null;
    private capturedWhiteContainer: HTMLElement | null;
    private capturedBlackContainer: HTMLElement | null;
    private restartBtn: HTMLElement | null;

    constructor(game: GameEngine) {
        this.game = game;

        this.playerTurnElement = document.getElementById("current-player-turn");
        this.capturedWhiteContainer = document.getElementById("captured-white");
        this.capturedBlackContainer = document.getElementById("captured-black");
        this.restartBtn = document.getElementById("restart-btn");

        this.initEventListeners();
        this.update();
    }

    public update() {
        this.updatePlayerTurn();
        this.updateCapturedPieces();
    }

    private updatePlayerTurn() {
        if (!this.playerTurnElement) return;

        const currentPlayer = this.game.currentPlayer; // "White" або "Black"
        this.playerTurnElement.textContent = currentPlayer === "white" ? "white" : "black";

        if (currentPlayer === "white") {
            this.playerTurnElement.className = "turn-white";
        } else {
            this.playerTurnElement.className = "turn-black";
        }
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

            if (piece.color === "White") {
                this.capturedWhiteContainer?.appendChild(img);
            } else {
                this.capturedBlackContainer?.appendChild(img);
            }
        });
    }

    private initEventListeners() {
        if (!this.restartBtn) return;

        this.restartBtn.addEventListener("click", () => {
            if (typeof (this.game as any).restart === "function") {
                (this.game as any).restart();
                window.location.reload();
            } else {
                window.location.reload();
            }
        });
    }
}