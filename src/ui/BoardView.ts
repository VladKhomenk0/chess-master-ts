import {Board} from "../models/Board.js";
import { type GameEngine } from "../core/GameEngine.js";

export class BoardView {
    private game: GameEngine;
    private board: Board;
    private container: HTMLElement;
    // Chosen cell
    private selectedCell: { x: number; y: number } | null;

    constructor(game: GameEngine) {
        this.game = game;
        this.board = game.board;
        this.selectedCell = null;
        const container = document.getElementById("board");

        if (!container) {
            throw new Error("Container element not found");
        }
        this.container = container;
        this.render();
        this.initEventListeners();
    }

    render() {
        // Clean container
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

                    cellElement.appendChild(img);
                }
                this.container.appendChild(cellElement);
            }
        }
    }

    private clearMoveHints() {
        const hints = this.container.querySelectorAll('.possible-move, .possible-capture');
        hints.forEach(hint => {
            hint.classList.remove('possible-move', 'possible-capture');
        });
    }

    private showMoveHints(startX: number, startY: number) {
        const validMoves = this.game.getValidMoves(startX, startY);

        for (const move of validMoves) {
            const cellElement = this.container.querySelector(`.cell[data-x="${move.x}"][data-y="${move.y}"]`);
            if (!cellElement) continue;

            const targetPiece = this.board.cells[move.y]![move.x];

            if (targetPiece) {
                cellElement.classList.add('possible-capture');
            } else {
                cellElement.classList.add('possible-move');
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

                // if we click on the same piece the selected cell will be canceled
                if (this.selectedCell.x === x && this.selectedCell.y === y) {
                    this.selectedCell = null;
                    const previouslySelected = this.container.querySelector('.cell.selected');
                    if (previouslySelected) {
                        previouslySelected.classList.remove('selected');
                    }
                    this.clearMoveHints();
                    return;
                }

                const pieceInHand = this.board.cells[this.selectedCell.y]![this.selectedCell.x];

                if (clickedPiece && pieceInHand && clickedPiece.color === pieceInHand.color) {
                    this.selectedCell = { x: x, y: y };

                    const previouslySelected = this.container.querySelector('.cell.selected');
                    if (previouslySelected) {
                        previouslySelected.classList.remove('selected');
                    }
                    cell.classList.add('selected');

                    this.clearMoveHints();
                    this.showMoveHints(x, y);
                    return;
                }

                const moveSuccessful = this.game.processMove(this.selectedCell.x, this.selectedCell.y, x, y);
                if (moveSuccessful) {
                    this.selectedCell = null;
                    this.render();
                } else {
                    console.log("Хід заборонено правилами або зараз не ваш хід!");
                    this.selectedCell = null;
                    const previouslySelected = this.container.querySelector('.cell.selected');
                    if (previouslySelected) {
                        previouslySelected.classList.remove('selected');
                    }
                    this.clearMoveHints();
                }

            } else {
                if (clickedPiece) {
                    if (clickedPiece.color === this.game.currentPlayer) {
                        this.selectedCell = {x: x, y: y};

                        const previouslySelected = this.container.querySelector('.cell.selected');
                        if (previouslySelected) {
                            previouslySelected.classList.remove('selected');
                        }
                        cell.classList.add('selected');

                        this.showMoveHints(x, y);
                    }
                }
            }
        });
    }
}