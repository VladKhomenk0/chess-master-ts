import { Board } from "./models/Board.js";
import { GameEngine } from "./core/GameEngine.js";
import { BoardView } from "./ui/BoardView.js";
import { ScoreboardView } from "./ui/ScoreboardView.js";

const board = new Board();

const game = new GameEngine(board);
const scoreboardView = new ScoreboardView(game);

const boardView = new BoardView(game, () => {
    scoreboardView.update();
});
