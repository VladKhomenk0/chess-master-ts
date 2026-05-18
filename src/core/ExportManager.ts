// src/core/ExportManager.ts
import { NotificationManager, NotifyType } from "../ui/NotificationManager.js";

export class ExportManager {
    /**
     * Генерує текстовий файл з історією ходів, беручи дані прямо з UI
     */
    public static downloadMatchLog(): void {
        const notifications = NotificationManager.getInstance();

        // Шукаємо контейнер з історією ходів на екрані
        const movesContainer = document.querySelector('.moves-log') as HTMLElement;

        if (!movesContainer || !movesContainer.innerText.trim()) {
            notifications.show("Немає ходів для експорту! Зробіть хоча б один хід.", NotifyType.Warning, 3000);
            return;
        }

        // Формуємо красивий текст для файлу
        let fileContent = "=== CHESS MASTER: ІСТОРІЯ ПАРТІЇ ===\n";
        fileContent += `Дата: ${new Date().toLocaleString()}\n`;
        fileContent += "====================================\n\n";

        // Беремо весь текст з HTML-контейнера
        fileContent += movesContainer.innerText + "\n";

        fileContent += "\n====================================\n";
        fileContent += "Згенеровано рушієм ChessMaster JS\n";

        try {
            // Створюємо Blob (бінарний файл) з текстом
            const blob = new Blob([fileContent], { type: "text/plain;charset=utf-8" });
            const url = URL.createObjectURL(blob);

            // Створюємо тимчасове посилання для завантаження
            const downloadLink = document.createElement("a");
            downloadLink.href = url;
            downloadLink.download = `chess_match_${new Date().getTime()}.txt`;

            // Програмно натискаємо на посилання
            document.body.appendChild(downloadLink);
            downloadLink.click();

            // Прибираємо за собою
            document.body.removeChild(downloadLink);
            URL.revokeObjectURL(url);

            notifications.show("Партію успішно експортовано у файл!", NotifyType.Success, 3000);
        } catch (error) {
            console.error("Помилка експорту:", error);
            notifications.show("Не вдалося експортувати партію.", NotifyType.Danger, 3000);
        }
    }
}