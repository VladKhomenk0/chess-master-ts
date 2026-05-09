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
        this.container = container;
        this.render();
    }

    render(){
        this.container.innerHTML = "";

        for (let y = 0; y < 8; y++) {
            for (let x = 0; x < 8; x++) {

                let cellElement = document.createElement("div");
                cellElement.classList.add("cell");

                const isBlack = (x + y) % 2 === 1;
                cellElement.classList.add(isBlack ? "black" : "white");

                const piece = this.board.cells[y]![x];

                if (piece) {
                    const img = document.createElement("img");
                    img.src = `/assets/images/${piece.color.toLowerCase()}-${piece.constructor.name.toLowerCase()}.png`;

                    cellElement.appendChild(img); } this.container.appendChild(cellElement);
            }
        }
    }
}