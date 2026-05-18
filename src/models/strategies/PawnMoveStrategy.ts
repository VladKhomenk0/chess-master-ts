import type { MoveStrategy } from "./MoveStrategy.js";
import type { Board } from "../Board.js";
import type { Piece } from "../Piece.js";
import { Color } from "../types.js";

export class PawnMoveStrategy implements MoveStrategy {

    canMove(startX: number, startY: number, endX: number, endY: number, board: Board, piece: Piece): boolean {
        const direction = piece.color === Color.White ? -1 : 1;

        const dx = Math.abs(endX - startX);
        const dy = endY - startY;

        if (dx === 0 && dy === direction && !board.cells[endY]![endX]) {
            return true;
        }

        if (dx === 0 && dy === direction * 2 && piece.isFirstMove) {
            if (!board.cells[startY + direction]![endX] && !board.cells[endY]![endX]) {
                return true;
            }
        }

        if (dx === 1 && dy === direction) {
            const targetPiece = board.cells[endY]![endX];
            if (targetPiece && targetPiece.color !== piece.color) {
                return true;
            }

            if (!targetPiece && board.lastMove) {
                const { piece: lastPiece, startY: lastStartY, endY: lastEndY, endX: lastEndX } = board.lastMove;

                if (
                    lastPiece.color !== piece.color &&
                    lastPiece.constructor.name === "Pawn" &&
                    Math.abs(lastEndY - lastStartY) === 2 &&
                    lastEndY === startY &&
                    lastEndX === endX
                ) {
                    return true;
                }
            }
        }

        return false;
    }
}