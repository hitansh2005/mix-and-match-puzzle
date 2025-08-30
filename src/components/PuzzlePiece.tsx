import { useState, useRef, useEffect } from "react";
import { PuzzlePiece as PuzzlePieceType } from "./PuzzleGame";

interface PuzzlePieceProps {
  piece: PuzzlePieceType;
  onMove: (pieceId: number, newX: number, newY: number) => void;
  onFlip: (pieceId: number) => void;
}

export const PuzzlePiece = ({ piece, onMove, onFlip }: PuzzlePieceProps) => {
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const pieceRef = useRef<HTMLDivElement>(null);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (e.detail === 2) {
      // Double click to flip
      onFlip(piece.id);
      return;
    }

    setIsDragging(true);
    const rect = pieceRef.current?.getBoundingClientRect();
    if (rect) {
      setDragOffset({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      });
    }
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging || !pieceRef.current) return;
    
    const board = pieceRef.current.parentElement;
    if (!board) return;
    
    const boardRect = board.getBoundingClientRect();
    const newX = e.clientX - boardRect.left - dragOffset.x;
    const newY = e.clientY - boardRect.top - dragOffset.y;
    
    // Keep piece within board bounds
    const maxX = boardRect.width - 80;
    const maxY = boardRect.height - 80;
    
    const clampedX = Math.max(0, Math.min(maxX, newX));
    const clampedY = Math.max(0, Math.min(maxY, newY));
    
    onMove(piece.id, clampedX, clampedY);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Add global mouse event listeners
  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isDragging, dragOffset]);

  // Touch support for mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    const touch = e.touches[0];
    setIsDragging(true);
    const rect = pieceRef.current?.getBoundingClientRect();
    if (rect) {
      setDragOffset({
        x: touch.clientX - rect.left,
        y: touch.clientY - rect.top
      });
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging || !pieceRef.current) return;
    
    e.preventDefault();
    const touch = e.touches[0];
    const board = pieceRef.current.parentElement;
    if (!board) return;
    
    const boardRect = board.getBoundingClientRect();
    const newX = touch.clientX - boardRect.left - dragOffset.x;
    const newY = touch.clientY - boardRect.top - dragOffset.y;
    
    const maxX = boardRect.width - 80;
    const maxY = boardRect.height - 80;
    
    const clampedX = Math.max(0, Math.min(maxX, newX));
    const clampedY = Math.max(0, Math.min(maxY, newY));
    
    onMove(piece.id, clampedX, clampedY);
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  return (
    <div
      ref={pieceRef}
      className={`puzzle-piece absolute w-20 h-20 ${isDragging ? 'dragging' : ''}`}
      style={{
        left: piece.x,
        top: piece.y,
        zIndex: isDragging ? 1000 : 1
      }}
      onMouseDown={handleMouseDown}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onClick={() => onFlip(piece.id)}
    >
      <div className={`piece-flip w-full h-full relative ${piece.isFlipped ? 'flipped' : ''}`}>
        {/* Front face */}
        <div className="piece-face absolute inset-0 bg-white rounded-lg border-2 border-primary/20 overflow-hidden">
          <img
            src={piece.frontImage}
            alt={`Puzzle piece ${piece.id}`}
            className="w-full h-full object-cover"
            draggable={false}
          />
          <div className="absolute bottom-0 right-0 bg-primary/80 text-primary-foreground text-xs px-1 rounded-tl">
            {piece.id + 1}
          </div>
        </div>
        
        {/* Back face */}
        <div className="piece-face piece-back absolute inset-0 bg-secondary rounded-lg border-2 border-secondary/20 overflow-hidden">
          <img
            src={piece.backImage}
            alt={`Puzzle piece ${piece.id} back`}
            className="w-full h-full object-cover"
            draggable={false}
          />
        </div>
      </div>
    </div>
  );
};
