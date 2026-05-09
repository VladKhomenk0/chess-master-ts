import {Piece} from "./Piece.js";
import {Bishop} from "./Bishop.js";
import {King} from "./King.js";
import {Knight} from "./Knight.js";
import {Pawn} from "./Pawn.js";
import {Queen} from "./Queen.js";
import {Rook} from "./Rook.js";
import {Color} from "./types.js";


export class Board{
     public cells: (Piece | null)[][];

     constructor() {
         this.cells = this.createEmptyBoard();
         this.initBoard();
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

     private initBoard() {
        this.addPawn();
        this.addRook();
        this.addKnight();
        this.addBishop();
        this.addKing();
        this.addQueen();
     }

     private addPawn(){
        for (let i = 0; i < 8; i++) {
            this.cells[1]![i] = new Pawn( {x: i, y: 1}, Color.Black);
            this.cells[6]![i] = new Pawn( {x: i, y: 6}, Color.White);
        }
     }

    private addRook(){
         this.cells[0]![0] = new Rook( {x: 0, y: 0}, Color.Black);
         this.cells[0]![7] = new Rook( {x: 7, y: 0}, Color.Black);

         this.cells[7]![0] = new Rook( {x: 0, y: 7}, Color.White);
         this.cells[7]![7] = new Rook( {x: 7, y: 7}, Color.White);
    }

    private addKnight(){
         this.cells[0]![1] = new Knight( {x: 1, y: 0}, Color.Black);
         this.cells[0]![6] = new Knight( {x: 6, y: 0}, Color.Black);

        this.cells[7]![1] = new Knight( {x: 1, y: 7}, Color.White);
        this.cells[7]![6] = new Knight( {x: 6, y: 7}, Color.White);
    }

    private addBishop(){
        this.cells[0]![2] = new Bishop( {x: 2, y: 0}, Color.Black);
        this.cells[0]![5] = new Bishop( {x: 5, y: 0}, Color.Black);

        this.cells[7]![2] = new Bishop( {x: 2, y: 7}, Color.White);
        this.cells[7]![5] = new Bishop( {x: 5, y: 7}, Color.White);
    }

    private addKing(){
        this.cells[0]![4] = new King( {x: 4, y: 0}, Color.Black);
        this.cells[7]![4] = new King( {x: 4, y: 7}, Color.White);
    }

    private addQueen(){
        this.cells[0]![3] = new Queen( {x: 3, y: 0}, Color.Black);
        this.cells[7]![3] = new Queen( {x: 3, y: 7}, Color.White);
    }

}