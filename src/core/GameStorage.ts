import { Color } from "../models/types.js";

export interface SavedGameState {
    boardMatrix: Array<Array<{ type: string; color: string } | null>>;
    currentPlayer: Color;
    capturedPiecesData: Array<{ type: string; color: string }>;
    formattedHistory: string[];
}

export class GameStorage {
    private readonly STORAGE_KEY = "chess_game_save_state";

    public saveGame(state: SavedGameState): boolean {
        try {
            localStorage.setItem(this.STORAGE_KEY, JSON.stringify(state));
            return true;
        } catch (error) {
            console.error("Помилка збереження гри:", error);
            return false;
        }
    }

    public loadGame(): SavedGameState | null {
        try {
            const data = localStorage.getItem(this.STORAGE_KEY);
            return data ? JSON.parse(data) : null;
        } catch (error) {
            console.error("Помилка завантаження гри:", error);
            return null;
        }
    }

    public clearSave(): void {
        localStorage.removeItem(this.STORAGE_KEY);
    }

    public hasSavedGame(): boolean {
        return localStorage.getItem(this.STORAGE_KEY) !== null;
    }
}