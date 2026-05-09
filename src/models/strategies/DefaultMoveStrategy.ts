import { type MoveStrategy } from "./MoveStrategy.js";
import { Board } from "../Board.js";

export class DefaultMoveStrategy implements MoveStrategy {
    canMove(startX: number, startY: number, endX: number, endY: number, board: Board): boolean {
        return true;
    }
}