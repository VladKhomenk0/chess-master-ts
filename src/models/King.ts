import {Piece} from "./Piece.js";
import {Color} from "./types.js";
import {DefaultMoveStrategy} from "./strategies/DefaultMoveStrategy.js";
import {KingMoveStrategy} from "./strategies/KingMoveStrategy.js";

export class King extends Piece{
    constructor(position: {x: number, y: number}, color: Color) {
        super(position, color, new KingMoveStrategy());
    }
}