
export enum NotifyType {
    Info = "info",
    Success = "success",
    Warning = "warning",
    Danger = "danger"
}

export class NotificationManager {
    private static instance: NotificationManager;
    private containerId = "toast-container";

    private constructor() {
        this.createContainer();
    }

    public static getInstance(): NotificationManager {
        if (!NotificationManager.instance) {
            NotificationManager.instance = new NotificationManager();
        }
        return NotificationManager.instance;
    }

    // Створюємо глобальний контейнер для тостів, якщо його немає
    private createContainer(): void {
        let container = document.getElementById(this.containerId);
        if (!container) {
            container = document.createElement("div");
            container.id = this.containerId;

            // Стилізуємо контейнер через JS, щоб не засмічувати CSS
            container.style.position = "fixed";
            container.style.bottom = "20px";
            container.style.right = "20px";
            container.style.zIndex = "9999";
            container.style.display = "flex";
            container.style.flexDirection = "column";
            container.style.gap = "10px";

            document.body.appendChild(container);
        }
    }

    // Головний метод виклику красивого сповіщення
    public show(message: string, type: NotifyType = NotifyType.Info, duration = 4000): void {
        const container = document.getElementById(this.containerId);
        if (!container) return;

        const toast = document.createElement("div");
        toast.className = `toast toast-${type}`;
        toast.innerText = message;

        // Базові стилі для плашки сповіщення
        toast.style.padding = "12px 20px";
        toast.style.borderRadius = "6px";
        toast.style.color = "#fff";
        toast.style.fontFamily = "sans-serif";
        toast.style.fontSize = "14px";
        toast.style.boxShadow = "0 4px 12px rgba(0,0,0,0.15)";
        toast.style.opacity = "0";
        toast.style.transform = "translateY(20px)";
        toast.style.transition = "all 0.3s ease";

        // Колірна гамма залежно від типу події
        switch (type) {
            case NotifyType.Success:
                toast.style.backgroundColor = "#4caf50"; // Зелений
                break;
            case NotifyType.Warning:
                toast.style.backgroundColor = "#ff9800"; // Помаранчевий
                break;
            case NotifyType.Danger:
                toast.style.backgroundColor = "#f44336"; // Червоний
                break;
            case NotifyType.Info:
            default:
                toast.style.backgroundColor = "#2196f3"; // Синій
                break;
        }

        container.appendChild(toast);

        // Анімація появи (через micro-timeout)
        setTimeout(() => {
            toast.style.opacity = "1";
            toast.style.transform = "translateY(0)";
        }, 10);

        // Анімація зникнення та видалення з DOM
        setTimeout(() => {
            toast.style.opacity = "0";
            toast.style.transform = "translateY(-20px)";
            setTimeout(() => {
                toast.remove();
            }, 300);
        }, duration);
    }
}