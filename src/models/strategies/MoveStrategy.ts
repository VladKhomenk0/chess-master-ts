import { Board } from "../Board.js";
import { Piece } from "../Piece.js";

export interface MoveStrategy {
    /**
     * @returns true, якщо хід можливий за правилами цієї стратегії
     */
    canMove(
        startX: number,
        startY: number,
        endX: number,
        endY: number,
        board: Board,
        piece: Piece
    ): boolean;
}

