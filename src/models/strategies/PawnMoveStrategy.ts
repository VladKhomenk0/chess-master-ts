import type {MoveStrategy} from "./MoveStrategy.js";
import {Board} from "../Board.js";
import type {Piece} from "../Piece.js";

export class PawnMoveStrategy implements MoveStrategy{
    canMove(startX: number, startY: number, endX: number, endY: number, board: Board, piece: Piece): boolean {
        let moveDirection: number = 1;

        if (piece.color == "white"){
            moveDirection = -1;
        }

        const dx = endX - startX;
        const dy = endY - startY;
        if (piece.isFirstMove){
            piece.isFirstMove = false;

            if (dx === 0 && (dy === moveDirection || dy === 2 * moveDirection)) {
                return true;
            }

            return false;
        } else {
            if (dx === 0 && dy === moveDirection) {
                return true;
            }

            return false;
        }

    }
}