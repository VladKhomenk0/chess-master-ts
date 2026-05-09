import {Piece} from "./Piece.js";

export class Knight extends Piece{
    public canMove(): boolean {
        return true;
    }
}