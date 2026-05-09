import { Board } from "../Board.js";

export interface MoveStrategy {
    /**
     * @returns true, якщо хід можливий за правилами цієї стратегії
     */
    canMove(
        startX: number,
        startY: number,
        endX: number,
        endY: number,
        board: Board
    ): boolean;
}

