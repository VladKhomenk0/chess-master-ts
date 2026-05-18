// src/core/ThemeManager.ts

export enum BoardTheme {
    Classic = "classic",
    Dark = "dark",
    Neon = "neon",
    Wood = "wood"
}

interface ThemeColors {
    lightCell: string;
    darkCell: string;
    background: string;
    scoreboardBg: string;
    highlight: string;
    btnHover: string;
}

export class ThemeManager {
    private static instance: ThemeManager;
    private currentTheme: BoardTheme = BoardTheme.Classic;

    // Велика розгорнута база пресетів для дизайну
    private themes: Record<BoardTheme, ThemeColors> = {
        [BoardTheme.Classic]: {
            lightCell: "#eeeed2",
            darkCell: "#769656",
            background: "#f0f0f0",
            scoreboardBg: "#312e2b",
            highlight: "rgba(144, 238, 144, 0.7)",
            btnHover: "#647f49"
        },
        [BoardTheme.Dark]: {
            lightCell: "#b8b6b4",
            darkCell: "#51504e",
            background: "#1e1e1e",
            scoreboardBg: "#2d2d2d",
            highlight: "rgba(241, 179, 81, 0.5)",
            btnHover: "#444444"
        },
        [BoardTheme.Neon]: {
            lightCell: "#1f2d3d",
            darkCell: "#005f73",
            background: "#0a0f1d",
            scoreboardBg: "#111827",
            highlight: "rgba(238, 155, 0, 0.6)",
            btnHover: "#0a9396"
        },
        [BoardTheme.Wood]: {
            lightCell: "#f0d9b5",
            darkCell: "#b58863",
            background: "#3e2723",
            scoreboardBg: "#4e342e",
            highlight: "rgba(212, 163, 115, 0.6)",
            btnHover: "#2d1b18"
        }
    };

    private constructor() {
        const savedTheme = localStorage.getItem("chess_theme") as BoardTheme;
        if (savedTheme && Object.values(BoardTheme).includes(savedTheme)) {
            this.currentTheme = savedTheme;
        }
    }

    public static getInstance(): ThemeManager {
        if (!ThemeManager.instance) {
            ThemeManager.instance = new ThemeManager();
        }
        return ThemeManager.instance;
    }

    public getCurrentTheme(): BoardTheme {
        return this.currentTheme;
    }

    // Динамічно інжектує CSS-змінні в Document Root
    public applyTheme(theme: BoardTheme): void {
        this.currentTheme = theme;
        localStorage.setItem("chess_theme", theme);

        const colors = this.themes[theme];
        const root = document.documentElement;

        if (colors) {
            root.style.setProperty("--board-light", colors.lightCell);
            root.style.setProperty("--board-dark", colors.darkCell);
            root.style.setProperty("--bg-main", colors.background);
            root.style.setProperty("--scoreboard-bg", colors.scoreboardBg);
            root.style.setProperty("--cell-highlight", colors.highlight);
            root.style.setProperty("--btn-hover", colors.btnHover);
            console.log(`[ThemeManager]: Успішно активовано тему: ${theme}`);
        }
    }

    public init(): void {
        this.applyTheme(this.currentTheme);
    }
}