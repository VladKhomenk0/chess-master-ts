import { NotificationManager, NotifyType } from "./NotificationManager.js";

export class FullscreenManager {
    /**
     * Перемикає повноекранний режим браузера
     */
    public static toggleFullscreen(): void {
        const doc = window.document;
        const docEl = doc.documentElement;
        const notifications = NotificationManager.getInstance();

        // Кросбраузерна підтримка (Chrome, Firefox, Safari, Edge)
        const requestFullScreen = docEl.requestFullscreen || (docEl as any).mozRequestFullScreen || (docEl as any).webkitRequestFullScreen || (docEl as any).msRequestFullscreen;
        const cancelFullScreen = doc.exitFullscreen || (doc as any).mozCancelFullScreen || (doc as any).webkitExitFullscreen || (doc as any).msExitFullscreen;

        // Перевіряємо, чи ми вже в повноекранному режимі
        const isFullscreen = doc.fullscreenElement || (doc as any).mozFullScreenElement || (doc as any).webkitFullscreenElement || (doc as any).msFullscreenElement;

        try {
            if (!isFullscreen) {
                if (requestFullScreen) {
                    requestFullScreen.call(docEl).then(() => {
                        notifications.show("Повноекранний режим увімкнено (натисніть ESC або F щоб вийти)", NotifyType.Info, 3000);
                    }).catch((err: Error) => console.error("Помилка Fullscreen:", err));
                }
            } else {
                if (cancelFullScreen) {
                    cancelFullScreen.call(doc).then(() => {
                        notifications.show("Повноекранний режим вимкнено", NotifyType.Info, 2000);
                    });
                }
            }
        } catch (error) {
            console.error("Fullscreen API не підтримується:", error);
        }
    }
}