import { Piece } from "../models/Piece.js";

export interface MoveRecord {
    pieceMoved: string;
    pieceColor: string;
    startX: number;
    startY: number;
    endX: number;
    endY: number;
    capturedPiece: string | null;
    isPromotion: boolean;
}

export class MoveHistory {
    private moves: MoveRecord[] = [];

    public addMove(
        pieceMoved: Piece,
        startX: number, startY: number,
        endX: number, endY: number,
        capturedPiece: Piece | null = null,
        isPromotion: boolean = false
    ) {
        this.moves.push({
            pieceMoved: pieceMoved.constructor.name,
            pieceColor: pieceMoved.color,
            startX,
            startY,
            endX,
            endY,
            capturedPiece: capturedPiece ? capturedPiece.constructor.name : null,
            isPromotion
        });
    }

    public getHistory(): MoveRecord[] {
        return this.moves;
    }

    public clear() {
        this.moves = [];
    }

    private toChessNotation(x: number, y: number): string {
        const letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
        const row = 8 - y;
        return `${letters[x]}${row}`;
    }

    public getFormattedHistory(): string[] {
        const formatted: string[] = [];

        // Збираємо ходи парами (Білі, Чорні)
        for (let i = 0; i < this.moves.length; i += 2) {
            const whiteMove = this.moves[i];
            const blackMove = this.moves[i + 1];

            if (!whiteMove) continue;

            let turnText = `${Math.floor(i / 2) + 1}. `;

            turnText += this.formatSingleMove(whiteMove);

            if (blackMove) {
                turnText += ` ${this.formatSingleMove(blackMove)}`;
            }

            formatted.push(turnText);
        }

        return formatted;
    }

    private formatSingleMove(move: MoveRecord): string {
        const pieceInitials: { [key: string]: string } = {
            "King": "K", "Queen": "Q", "Rook": "R", "Bishop": "B", "Knight": "N", "Pawn": ""
        };

        let notation = pieceInitials[move.pieceMoved] || "";

        if (move.capturedPiece) {
            if (move.pieceMoved === "Pawn") {
                const letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
                notation += `${letters[move.startX]}x`;
            } else {
                notation += "x";
            }
        }

        notation += this.toChessNotation(move.endX, move.endY);

        if (move.isPromotion) notation += "=Q";

        return notation;
    }
}