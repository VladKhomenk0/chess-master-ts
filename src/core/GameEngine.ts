import { Board } from "../models/Board.js";

export class GameEngine {
    public board: Board;
    public currentPlayer: "white" | "black";
    public isGameOver: boolean = false;

    constructor(board: Board) {
        this.board = board;
        this.currentPlayer = "white";
    }

    // Допоміжний метод для зміни черги ходу
    public switchTurn(): void {
        this.currentPlayer = this.currentPlayer === 'white' ? 'black' : 'white';
        console.log(`Хід передано. Тепер ходять: ${this.currentPlayer}`);
    }
}