import {Piece} from "./Piece.js";
import {Bishop} from "./Bishop.js";
import {King} from "./King.js";
import {Knight} from "./Knight.js";
import {Pawn} from "./Pawn.js";
import {Queen} from "./Queen.js";
import {Rook} from "./Rook.js";


export class Board{
     public cells: (Piece | null)[][];

     constructor() {
         this.cells = this.createEmptyBoard();
     }

     private createEmptyBoard() : (Piece | null)[][] {
         const board: (Piece | null)[][] = [];

            for (let i = 0; i < 8; i++) {
                const row: (Piece | null)[] = [];
                for (let j = 0; j < 8; j++) {
                    row.push(null);
                }
                board.push(row);
            }
            return board;
     }

}