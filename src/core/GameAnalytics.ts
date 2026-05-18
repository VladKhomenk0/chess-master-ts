import { Piece } from "../models/Piece.js";

export interface AnalyticsReport {
    totalMovesCount: number;
    capturedCount: number;
    whiteAverageTime: number;
    blackAverageTime: number;
    mostActivePieceType: string;
    checksCount: number;
}

export class GameAnalytics {
    private moveTimes: { white: number[]; black: number[] } = { white: [], black: [] };
    private pieceMoveCounters: Map<string, number> = new Map();
    private checksCount: number = 0;
    private startTime: number;

    constructor() {
        this.startTime = Date.now();
    }

    public registerMove(piece: Piece, durationSeconds: number): void {
        const color = piece.color.toLowerCase() as "white" | "black";
        this.moveTimes[color].push(durationSeconds);

        const pieceName = piece.constructor.name;
        const currentCount = this.pieceMoveCounters.get(pieceName) || 0;
        this.pieceMoveCounters.set(pieceName, currentCount + 1);
    }

    public registerCheck(): void {
        this.checksCount++;
    }

    private getMostActivePiece(): string {
        let maxMoves = 0;
        let mostActive = "None";

        this.pieceMoveCounters.forEach((count, pieceType) => {
            if (count > maxMoves) {
                maxMoves = count;
                mostActive = pieceType;
            }
        });

        return maxMoves > 0 ? `${mostActive} (${maxMoves} ходів)` : "Немає";
    }

    private calculateAverageTime(times: number[]): number {
        if (times.length === 0) return 0;
        const sum = times.reduce((acc, t) => acc + t, 0);
        return parseFloat((sum / times.length).toFixed(1));
    }

    public generateReport(totalMoves: number, totalCaptured: number): AnalyticsReport {
        return {
            totalMovesCount: totalMoves,
            capturedCount: totalCaptured,
            whiteAverageTime: this.calculateAverageTime(this.moveTimes.white),
            blackAverageTime: this.calculateAverageTime(this.moveTimes.black),
            mostActivePieceType: this.getMostActivePiece(),
            checksCount: this.checksCount
        };
    }

    public reset(): void {
        this.moveTimes = { white: [], black: [] };
        this.pieceMoveCounters.clear();
        this.checksCount = 0;
        this.startTime = Date.now();
    }
}