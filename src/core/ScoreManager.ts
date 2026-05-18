import { NotificationManager, NotifyType } from "../ui/NotificationManager.js";

export class ScoreManager {
    private static readonly STORAGE_KEY = "chess_master_lifetime_score";

    /**
     * Отримує поточний глобальний рахунок із LocalStorage
     */
    public static getScore(): { white: number; black: number } {
        const data = localStorage.getItem(this.STORAGE_KEY);
        if (!data) return { white: 0, black: 0 };
        try {
            return JSON.parse(data);
        } catch {
            return { white: 0, black: 0 };
        }
    }

    /**
     * Записує нову перемогу для однієї зі сторін
     */
    public static recordWin(winner: "white" | "black"): void {
        const score = this.getScore();
        if (winner === "white") {
            score.white++;
        } else {
            score.black++;
        }

        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(score));
        this.updateUI();

        const notifications = NotificationManager.getInstance();
        notifications.show(`Рахунок серії оновлено! 🏆`, NotifyType.Success, 3000);
    }

    /**
     * Повністю скидає статистику серії ігор
     */
    public static resetScore(): void {
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify({ white: 0, black: 0 }));
        this.updateUI();

        const notifications = NotificationManager.getInstance();
        notifications.show("Глобальну статистику перемог скинуто!", NotifyType.Warning, 3000);
    }

    /**
     * Динамічно оновлює блок статистики на екрані з аналізом лідера
     */
    public static updateUI(): void {
        const score = this.getScore();
        const container = document.getElementById("lifetime-score-box");
        if (!container) return;

        const diff = score.white - score.black;
        let statusText = "Йде рівна боротьба ⚖️";

        if (diff >= 3) {
            statusText = "Білі абсолютно домінують! 🔥";
        } else if (diff > 0) {
            statusText = "Білі вириваються вперед! 📈";
        } else if (diff <= -3) {
            statusText = "Чорні розносять суперника! 🔥";
        } else if (diff < 0) {
            statusText = "Чорні захопили лідерство! 📈";
        }

        container.innerHTML = `
            🏆 Рахунок серії ігор:<br>
            <b style="color: #fff;">Білі: ${score.white}</b> — <b style="color: #111; text-shadow: 0 0 2px #fff;">Чорні: ${score.black}</b><br>
            <span style="font-size: 11px; color: #aaa; font-style: italic;">${statusText}</span>
        `;
    }
}