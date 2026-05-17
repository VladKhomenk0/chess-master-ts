import type {MoveStrategy} from "./MoveStrategy.js";
import {Board} from "../Board.js";

export class RookMoveStrategy implements MoveStrategy{
    canMove(startX: number, startY: number, endX: number, endY: number, board: Board): boolean {
        const dx = Math.abs(endX - startX);
        const dy = Math.abs(endY - startY);

        if ((dx === 0 && dy > 0) || (dx > 0 && dy === 0)) {
            return true;
        }

        return false;
    }
}