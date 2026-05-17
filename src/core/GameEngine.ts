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

        //  Чи є там взагалі фігура?
        if (!piece) {
            console.log("Тут немає фігури!");
            return false;
        }

        // Чи ходить зараз цей колір?
        if (piece.color !== this.currentPlayer) {
            console.log(`Зараз хід кольору: ${this.currentPlayer}`);
            return false;
        }

        // Чи може фігура теоретично так піти за своїми правилами?
        if (!piece.canMove({x: startX, y: startY}, {x: endX, y: endY}, this.board)) {
            console.log("Ця фігура так не ходить або шлях заблоковано!");
            return false;
        }

        this.executeMove(startX, startY, endX, endY);

        // Передаємо хід іншому гравцю
        this.switchTurn();

        return true;
    }

    // Фізичне переміщення фігури на дошці
    private executeMove(startX: number, startY: number, endX: number, endY: number): void {
        const piece = this.board.getPiece(startX, startY);

        this.board.cells[endY]![endX] = piece;
        this.board.cells[startY]![startX] = null;

        console.log(`Фігуру переміщено з (${startX}, ${startY}) на (${endX}, ${endY})`);
    }

    // Допоміжний метод для зміни черги ходу
    public switchTurn(): void {
        this.currentPlayer = this.currentPlayer === 'white' ? 'black' : 'white';
        console.log(`Хід передано. Тепер ходять: ${this.currentPlayer}`);
    }
}