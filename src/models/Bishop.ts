import {Piece} from "./Piece.js";

export class Bishop extends Piece{
    public canMove(): boolean {
        return true;
    }
}