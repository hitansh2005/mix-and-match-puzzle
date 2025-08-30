import { useRef, useEffect } from "react";
import { PuzzlePiece as PuzzlePieceComponent } from "./PuzzlePiece";
import { PuzzlePiece } from "./PuzzleGame";

interface GameBoardProps {
  pieces: PuzzlePiece[];
  setPieces: React.Dispatch<React.SetStateAction<PuzzlePiece[]>>;
}

export const GameBoard = ({ pieces, setPieces }: GameBoardProps) => {
  const boardRef = useRef<HTMLDivElement>(null);

  const handlePieceMove = (pieceId: number, newX: number, newY: number) => {
    setPieces(prev => prev.map(piece => 
      piece.id === pieceId 
        ? { ...piece, x: newX, y: newY }
        : piece
    ));
  };

  const handlePieceFlip = (pieceId: number) => {
    setPieces(prev => prev.map(piece => 
      piece.id === pieceId 
        ? { ...piece, isFlipped: !piece.isFlipped }
        : piece
    ));
  };

  return (
    <div className="bg-card/50 backdrop-blur-sm rounded-2xl p-6 shadow-lg border-2 border-border/50">
      <div 
        ref={boardRef}
        className="relative bg-game-bg rounded-xl min-h-[600px] overflow-hidden border-2 border-dashed border-primary/20"
        style={{ 
          backgroundImage: `radial-gradient(circle at 1px 1px, hsl(var(--primary) / 0.1) 1px, transparent 0)`,
          backgroundSize: '20px 20px'
        }}
      >
        {pieces.map((piece) => (
          <PuzzlePieceComponent
            key={piece.id}
            piece={piece}
            onMove={handlePieceMove}
            onFlip={handlePieceFlip}
          />
        ))}
        
        {pieces.length === 0 && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center text-muted-foreground">
              <div className="text-4xl mb-4">🧩</div>
              <p className="text-lg font-semibold">Your puzzle pieces will appear here!</p>
              <p className="text-sm">Drag them around and click to flip</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};