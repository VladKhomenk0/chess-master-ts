import type {MoveStrategy} from "./MoveStrategy.js";
import {Board} from "../Board.js";

export class RookMoveStrategy implements MoveStrategy{

    canMove(startX: number, startY: number, endX: number, endY: number, board: Board): boolean {
        const dx = endX - startX;
        const dy = endY - startY;

        if (startX !== endX && startY !== endY) {
            return false; // Якщо хід по обох осях одночасно — це не для Тури
        }

        const stepX = Math.sign(dx);
        const stepY = Math.sign(dy);

        let currentX = startX + stepX;
        let currentY = startY + stepY;

        while (currentX !== endX || currentY !== endY) {
            if (board.getPiece(currentX, currentY) !== null) {
                return false;
            }

            currentX += stepX;
            currentY += stepY;
        }

        return true;
    }
}