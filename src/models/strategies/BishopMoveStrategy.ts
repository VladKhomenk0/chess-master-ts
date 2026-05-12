import type { MoveStrategy } from "./MoveStrategy.js";
import  {type Board} from "../Board.js";

export class BishopMoveStrategy implements MoveStrategy{
    canMove(startX: number, startY: number, endX: number, endY: number, board: Board): boolean {
        const dx = Math.abs(endX - startX);
        const dy = Math.abs(endY - startY);

        if(dx === dy){
            return true;
        }

        return false;
    }
}