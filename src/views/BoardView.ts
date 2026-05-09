import {Board} from "../models/Board.js";

export class BoardView {
    private board: Board;
    private container: HTMLElement;

    constructor(board: Board) {
        this.board = board;
        const container = document.getElementById("board");

        if (!container) {
            throw new Error("Container element not found");
        }
        this.container = container; }

}