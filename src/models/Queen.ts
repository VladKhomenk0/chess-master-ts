import {Piece} from "./Piece.js";

export class Queen extends Piece{
    public canMove(): boolean {
        return true;
    }
}