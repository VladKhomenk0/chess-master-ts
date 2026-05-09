import {Piece} from "./Piece.js";
import {Color} from "./types.js";
import {DefaultMoveStrategy} from "./strategies/DefaultMoveStrategy.js";

export class King extends Piece{
    constructor(position: {x: number, y: number}, color: Color) {
        super(position, color, new DefaultMoveStrategy());
    }
}