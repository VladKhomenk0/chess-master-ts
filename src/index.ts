import { Board } from "./models/Board.js";
import { GameEngine } from "./core/GameEngine.js";
import { BoardView } from "./ui/BoardView.js";
import { ScoreboardView } from "./ui/ScoreboardView.js";

const board = new Board();

const game = new GameEngine(board);

const scoreboardView = new ScoreboardView(game);

const wasLoaded = game.loadSavedGameIfPresent();

const boardView = new BoardView(game, () => {
    scoreboardView.update();
});

if (wasLoaded) {
    scoreboardView.update();
    if (typeof (boardView as any).render === "function") {
        (boardView as any).render();
    }
    const currentClockColor = game.currentPlayer.toLowerCase() as "white" | "black";
    game.clock.startOrSwitch(currentClockColor);
}