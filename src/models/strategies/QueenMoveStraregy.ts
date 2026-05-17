import type {MoveStrategy} from "./MoveStrategy.js";
import {RookMoveStrategy} from "./RookMoveStrategy.js";
import {BishopMoveStrategy} from "./BishopMoveStrategy.js";
import type {Piece} from "../Piece.js";
import type {Board} from "../Board.js";

export class QueenMoveStrategy implements MoveStrategy {
    private rookStrategy = new RookMoveStrategy();
    private bishopStrategy = new BishopMoveStrategy();

    canMove(startX: number, startY: number, endX: number, endY: number, board: Board, piece: Piece): boolean {
        return (
            this.rookStrategy.canMove(startX, startY, endX, endY, board) ||
            this.bishopStrategy.canMove(startX, startY, endX, endY, board)
        );
    }
}