import { NotificationManager, NotifyType } from "../ui/NotificationManager.js";

export class ShortcutManager {
    private static isInitialized = false;

    /**
     * Ініціалізує глобального слухача подій клавіатури
     */
    public static init(): void {
        if (this.isInitialized) return;

        document.addEventListener("keydown", (event: KeyboardEvent) => {
            // Ігноруємо натискання, якщо користувач щось вводить у можливі інпути (хоч у нас їх і немає, але це best practice)
            if (event.target instanceof HTMLInputElement || event.target instanceof HTMLTextAreaElement) {
                return;
            }

            const notifications = NotificationManager.getInstance();
            const key = event.key.toLowerCase();

            switch (key) {
                case "m": // Mute
                case "ь": // Кирилиця
                    const muteBtn = document.getElementById("mute-btn") as HTMLButtonElement;
                    if (muteBtn) muteBtn.click();
                    break;

                case "r": // Restart
                case "к":
                    const restartBtn = document.getElementById("restart-btn") as HTMLButtonElement;
                    if (restartBtn) restartBtn.click();
                    break;

                case "e": // Export
                case "у":
                    const exportBtn = document.getElementById("export-btn") as HTMLButtonElement;
                    if (exportBtn) exportBtn.click();
                    break;

                case "h": // Help
                case "р":
                    const helpText = "Гарячі клавіші:\n[R] - Рестарт\n[M] - Звук\n[E] - Експорт\n[H] - Ця підказка";
                    notifications.show(helpText, NotifyType.Info, 5000);
                    break;

                case "f": // Fullscreen
                case "а": // Кирилиця
                    const fsBtn = document.getElementById("fullscreen-btn") as HTMLButtonElement;
                    if (fsBtn) fsBtn.click();
                    break;
            }
        });

        this.isInitialized = true;
        console.log("[ShortcutManager] Гарячі клавіші активовано (M, R, E, H)");
    }
}