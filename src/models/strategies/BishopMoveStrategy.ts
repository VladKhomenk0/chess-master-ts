import type { MoveStrategy } from "./MoveStrategy.js";
import  {type Board} from "../Board.js";

export class BishopMoveStrategy implements MoveStrategy{

    canMove(startX: number, startY: number, endX: number, endY: number, board: Board): boolean {

        const dx = endX - startX;
        const dy = endY - startY;

        if (Math.abs(dx) !== Math.abs(dy)) {
            return false;
        }

        const stepX = Math.sign(dx);
        const stepY = Math.sign(dy);

        let currentX = startX + stepX;
        let currentY = startY + stepY;

        while (currentX !== endX && currentY !== endY) {
            if (board.getPiece(currentX, currentY) !== null) {
                return false;
            }

            currentX += stepX;
            currentY += stepY;
        }

        return true;
    }
}