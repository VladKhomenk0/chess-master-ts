import {Board} from "../models/Board.js";

export class BoardView {
    private board: Board;
    private container: HTMLElement;
    private selectedCell: { x: number; y: number } | null;

    constructor(board: Board) {
        this.board = board;
        this.selectedCell = null;
        const container = document.getElementById("board");

        if (!container) {
            throw new Error("Container element not found");
        }
        this.container = container;
        this.render();
        this.initEventListeners();

    }

    render(){
        this.container.innerHTML = "";

        for (let y = 0; y < 8; y++) {
            for (let x = 0; x < 8; x++) {

                let cellElement = document.createElement("div");

                cellElement.setAttribute("data-x", x.toString());
                cellElement.setAttribute("data-y", y.toString());

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

    initEventListeners() {
        this.container.addEventListener("click", (event) => {
            const target = event.target as HTMLElement;

            const cell = target.closest('.cell') as HTMLElement;

            if (!cell) return;

            const x = Number(cell.getAttribute("data-x"));
            const y = Number(cell.getAttribute("data-y"));

            const clickedPiece = this.board.cells[y]![x];

            if (this.selectedCell) {
                const pieceInHand = this.board.cells[this.selectedCell.y]![this.selectedCell.x];

                if (clickedPiece && pieceInHand && clickedPiece.color === pieceInHand.color) {

                    this.selectedCell = { x: x, y: y };
                    const previouslySelected = this.container.querySelector('.cell.selected');
                    if (previouslySelected) {
                        previouslySelected.classList.remove('selected');
                    }

                    cell.classList.add('selected');

                    return;
                }
                this.board.movePiece(this.selectedCell.x, this.selectedCell.y, x, y);
                this.selectedCell = null;
                this.render();

            } else {
                if (clickedPiece) {

                    this.selectedCell = {x: x, y: y};

                    const previouslySelected = this.container.querySelector('.cell.selected');
                    if (previouslySelected) {
                        previouslySelected.classList.remove('selected');
                    }
                    cell.classList.add('selected');
                }
            }

        });
    }
}
