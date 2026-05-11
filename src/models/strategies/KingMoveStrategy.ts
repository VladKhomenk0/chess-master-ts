import type {MoveStrategy} from "./MoveStrategy.js";
import {Board} from "../Board.js";

export class KingMoveStrategy implements MoveStrategy {
    canMove(startX: number, startY: number, endX: number, endY: number, board: Board): boolean {
        const dx = Math.abs(endX - startX);
        const dy = Math.abs(endY - startY);

        if(dx === 1 && dy === 1){
            return true;
        }

        return false;
    }
}

