import type { MoveStrategy } from "./MoveStrategy.js";
import type { Board } from "../Board.js";
import type { Piece } from "../Piece.js";
import { Rook } from "../Rook.js";

export class KingMoveStrategy implements MoveStrategy {

    canMove(startX: number, startY: number, endX: number, endY: number, board: Board, piece: Piece): boolean {
        const dx = Math.abs(endX - startX);
        const dy = Math.abs(endY - startY);

        // Стандартний хід короля
        if ((dx === 1 && dy === 1) || (dx === 1 && dy === 0) || (dx === 0 && dy === 1)) {
            return true;
        }

        if (dy === 0 && dx === 2 && piece.isFirstMove) {

            if (endX === startX + 2) {
                const rook = board.cells[startY]![7];
                if (rook instanceof Rook && rook.isFirstMove) {
                    if (!board.cells[startY]![startX + 1] && !board.cells[startY]![startX + 2]) {
                        return true;
                    }
                }
            }

            if (endX === startX - 2) {
                const rook = board.cells[startY]![0];
                if (rook instanceof Rook && rook.isFirstMove) {
                    if (!board.cells[startY]![startX - 1] && !board.cells[startY]![startX - 2] && !board.cells[startY]![startX - 3]) {
                        return true;
                    }
                }
            }
        }

        return false;
    }
}