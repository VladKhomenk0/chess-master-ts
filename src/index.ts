// src/index.ts
import { Board } from "./models/Board.js";
import { GameEngine } from "./core/GameEngine.js";
import { BoardView } from "./ui/BoardView.js";
import { ScoreboardView } from "./ui/ScoreboardView.js";
import { ThemeManager, BoardTheme } from "./core/ThemeManager.js"; // 👈 Імпортуємо наш новий менеджер тем

// Ініціалізуємо систему кастомізації тем до завантаження UI
const themeManager = ThemeManager.getInstance();
themeManager.init();

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

const themeSelect = document.getElementById("theme-select") as HTMLSelectElement;
if (themeSelect) {
    // Встановлюємо збережене значення в dropdown
    themeSelect.value = themeManager.getCurrentTheme();

    // Слухаємо подію зміни значення користувачем
    themeSelect.addEventListener("change", (e: Event) => {
        const target = e.target as HTMLSelectElement;
        themeManager.applyTheme(target.value as BoardTheme);
    });
}