import { Board } from "../models/Board.js";
import { type Color } from "../models/types.js"
import {King} from "../models/King.js";
import {Piece} from "../models/Piece.js";
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

        const targetPiece = this.board.cells[endY]![endX] ?? null;

        this.board.cells[endY]![endX] = piece;
        this.board.cells[startY]![startX] = null;

        const isSelfCheck = this.isCheck(this.currentPlayer);

        this.board.cells[startY]![startX] = piece;
        this.board.cells[endY]![endX] = targetPiece ?? null;

        if (isSelfCheck) {
            console.log("Неможливо зробити хід: ваш король залишиться під шахом!");
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

    public isCheck(color: string): boolean {

        let kingX = 0;
        let kingY = 0;

        for (let i = 0; i < 8; i++){
            for (let j = 0; j < 8; j++){
                if (this.board.cells[j]![i] instanceof King && this.board.cells[j]![i]?.color === color) {
                    kingX = i;
                    kingY = j;
                }
            }
        }
        for (let i = 0; i < 8; i++){
            for (let j = 0; j < 8; j++){
                if (this.board.cells[j]![i] instanceof Piece && this.board.cells[j]![i]?.color !== color) {
                    const piece = this.board.cells[j]![i];
                    if (piece?.canMove({x: i, y: j}, {x: kingX, y: kingY}, this.board)) {
                        return true;
                    }
                }
            }
        }
        return false;
    }
}