import { Board } from "./models/Board.js";
import { GameEngine } from "./core/GameEngine.js";
import { BoardView } from "./ui/BoardView.js";
import { ScoreboardView } from "./ui/ScoreboardView.js";
import { ThemeManager, BoardTheme } from "./core/ThemeManager.js";
import { NotificationManager, NotifyType } from "./ui/NotificationManager.js";
import { SoundManager } from "./core/SoundManager.js";
import { ExportManager } from "./core/ExportManager.js";
import { ShortcutManager } from "./core/ShortcutManager.js";
import { FullscreenManager } from "./ui/FullscreenManager.js";
import { ScoreManager } from "./core/ScoreManager.js";


const themeManager = ThemeManager.getInstance();
themeManager.init();
ShortcutManager.init();
ScoreManager.updateUI();

const notificationService = NotificationManager.getInstance();

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

    notificationService.show("Попередню партію успішно відновлено!", NotifyType.Success, 3500);
} else {
    notificationService.show("Ласкаво просимо до Chess Master! Вдалої гри.", NotifyType.Info, 4000);
}

const themeSelect = document.getElementById("theme-select") as HTMLSelectElement;
if (themeSelect) {
    // Встановлюємо збережене значення в dropdown меню
    themeSelect.value = themeManager.getCurrentTheme();

    themeSelect.addEventListener("change", (e: Event) => {
        const target = e.target as HTMLSelectElement;
        const selectedTheme = target.value as BoardTheme;

        themeManager.applyTheme(selectedTheme);
        notificationService.show(`Стиль дошки змінено на: ${selectedTheme.toUpperCase()}`, NotifyType.Success, 2500);
    });
}

const muteBtn = document.getElementById("mute-btn") as HTMLButtonElement;
if (muteBtn) {
    const soundService = SoundManager.getInstance();

    muteBtn.innerText = soundService.getMutedStatus() ? "🔇 Звук: Вимкнено" : "🔊 Звук: Unmuted";

    muteBtn.addEventListener("click", () => {
        const isCurrentlyMuted = soundService.toggleMute();

        muteBtn.innerText = isCurrentlyMuted ? "🔇 Звук: Вимкнено" : "🔊 Звук: Увімкнено";

        const statusMessage = isCurrentlyMuted ? "Звукові ефекти повністю вимкнено" : "Звукові ефекти успішно увімкнено";
        const toastType = isCurrentlyMuted ? NotifyType.Warning : NotifyType.Info;

        notificationService.show(statusMessage, toastType, 3000);
    });
}

const restartBtn = document.getElementById("restart-btn") as HTMLButtonElement;
if (restartBtn) {
    restartBtn.addEventListener("click", () => {
        notificationService.show("Гру перезапущено! Фігури розставлено на початкові позиції.", NotifyType.Info, 3000);
    });
}

const exportBtn = document.getElementById("export-btn") as HTMLButtonElement;
if (exportBtn) {
    exportBtn.addEventListener("click", () => {
        ExportManager.downloadMatchLog();
    });
}

const fullscreenBtn = document.getElementById("fullscreen-btn") as HTMLButtonElement;
if (fullscreenBtn) {
    fullscreenBtn.addEventListener("click", () => {
        FullscreenManager.toggleFullscreen();
    });
}