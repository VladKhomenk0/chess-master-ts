import { type Position, Color } from "./types.js";

export abstract class Piece {
    public position: Position;
    public color: Color;

    constructor(position: Position, color: Color) {
        this.position = position;
        this.color = color;
    }

    abstract canMove(targetPosition: Position) : boolean;
}