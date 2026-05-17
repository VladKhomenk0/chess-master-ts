import type {MoveStrategy} from "./MoveStrategy.js";
import {Color} from "../types.js";
import type {Board} from "../Board.js";

export class KnightMoveStrategy implements MoveStrategy{
    canMove(startX: number, startY: number, endX: number, endY: number, board: Board): boolean {

        const dx = Math.abs(endX - startX);
        const dy = Math.abs(endY - startY);

        if (dx === 2 && dy === 1 || dx === 1 && dy === 2) {
            return true;
        }

        return false;
    }
}