import {Piece} from "./Piece.js";

export class Rook extends Piece{
    public canMove(): boolean {
        return true;
    }
}