import {Piece} from "./Piece.js";

export class King extends Piece{
    public canMove(): boolean {
        return true;
    }
}