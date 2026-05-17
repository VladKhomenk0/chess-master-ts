import { Board } from "./models/Board.js";
import { GameEngine } from "./core/GameEngine.js";
import { BoardView } from "./ui/BoardView.js";

const board = new Board();

const game = new GameEngine(board);

const view = new BoardView(game);