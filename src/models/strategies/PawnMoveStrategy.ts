import type {MoveStrategy} from "./MoveStrategy.js";
import {Board} from "../Board.js";
import type {Piece} from "../Piece.js";

export class PawnMoveStrategy implements MoveStrategy{
    canMove(startX: number, startY: number, endX: number, endY: number, board: Board, piece: Piece): boolean {

        const moveDirection = piece.color === "white" ? -1 : 1;

        const dx = endX - startX;
        const dy = endY - startY;

        if (dx === 0) {
            if (dy === moveDirection) {
                return board.getPiece(endX, endY) === null;
            }

            if (piece.isFirstMove && dy === moveDirection * 2) {
                const intermediateY = startY + moveDirection;
                return board.getPiece(startX, intermediateY) === null &&
                    board.getPiece(endX, endY) === null;
            }
        }
        if (Math.abs(dx) === 1 && dy === moveDirection) {
            const targetPiece = board.getPiece(endX, endY);
            if (targetPiece !== null && targetPiece.color !== piece.color) {
                return true;
            }
        }

        return false;
    }
}