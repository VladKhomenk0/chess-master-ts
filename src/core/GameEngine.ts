import { Board } from "../models/Board.js";

export class GameEngine {
    public board: Board;
    public currentPlayer: "white" | "black";
    public isGameOver: boolean = false;

    constructor(board: Board) {
        this.board = board;
        this.currentPlayer = "white";
    }

    public processMove(startX: number, startY: number, endX: number, endY: number): boolean {
        const piece = this.board.getPiece(startX, startY);

        if (!piece) {
            console.log("Тут немає фігури!");
            return false;
        }
        if (piece.color !== this.currentPlayer) {
            console.log(`Зараз хід кольору: ${this.currentPlayer}`);
            return false;
        }

            // use strategy pattern to find out if piece can move
        if (!piece.canMove({x: startX, y: startY}, {x: endX, y: endY}, this.board)) {
            console.log("Ця фігура так не ходить або шлях заблоковано!");
            return false;
        }

        this.executeMove(startX, startY, endX, endY);
        this.switchTurn();

        return true;
    }

        // move piece
    private executeMove(startX: number, startY: number, endX: number, endY: number): void {
        this.board.movePiece(startX, startY, endX, endY);
        console.log(`Фігуру переміщено з (${startX}, ${startY}) на (${endX}, ${endY})`);
    }

        // change the current color to move
    public switchTurn(): void {
        this.currentPlayer = this.currentPlayer === 'white' ? 'black' : 'white';
        console.log(`Хід передано. Тепер ходять: ${this.currentPlayer}`);
    }
}