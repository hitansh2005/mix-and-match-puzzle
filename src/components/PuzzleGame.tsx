import { useState } from "react";
import { ThemeSelector } from "./ThemeSelector";
import { GameBoard } from "./GameBoard";
import { GameControls } from "./GameControls";
import { useToast } from "@/hooks/use-toast";

// Import puzzle images
import animalsPiece1 from "@/assets/animals-piece-1.jpg";
import oceanPiece1 from "@/assets/ocean-piece-1.jpg";
import spacePiece1 from "@/assets/space-piece-1.jpg";
import animalsBack from "@/assets/animals-back.jpg";
import oceanBack from "@/assets/ocean-back.jpg";
import spaceBack from "@/assets/space-back.jpg";

export interface PuzzlePiece {
  id: number;
  frontImage: string;
  backImage: string;
  x: number;
  y: number;
  isFlipped: boolean;
  correctX: number;
  correctY: number;
}

export interface Theme {
  id: string;
  name: string;
  pieces: string[];
  backImage: string;
  preview: string;
}

// Sample themes with generated images  
const sampleThemes: Theme[] = [
  {
    id: "animals",
    name: "Forest Animals",
    pieces: Array(48).fill(animalsPiece1),
    backImage: animalsBack,
    preview: animalsPiece1
  },
  {
    id: "ocean",
    name: "Ocean Adventure", 
    pieces: Array(48).fill(oceanPiece1),
    backImage: oceanBack,
    preview: oceanPiece1
  },
  {
    id: "space",
    name: "Space Explorer",
    pieces: Array(48).fill(spacePiece1),
    backImage: spaceBack,
    preview: spacePiece1
  }
];

export const PuzzleGame = () => {
  const [selectedTheme, setSelectedTheme] = useState<Theme | null>(null);
  const [pieces, setPieces] = useState<PuzzlePiece[]>([]);
  const [gameStarted, setGameStarted] = useState(false);
  const { toast } = useToast();

  const handleThemeSelect = (theme: Theme) => {
    setSelectedTheme(theme);
    initializePuzzle(theme);
    setGameStarted(true);
    toast({
      title: "Theme Selected!",
      description: `Let's play with ${theme.name}!`,
    });
  };

  const initializePuzzle = (theme: Theme) => {
    const newPieces: PuzzlePiece[] = [];
    const gridSize = Math.sqrt(48); // 6.93, so we'll use a flexible grid
    const cols = 8;
    const rows = 6;
    
    for (let i = 0; i < 48; i++) {
      const correctX = (i % cols) * 80;
      const correctY = Math.floor(i / cols) * 80;
      
      newPieces.push({
        id: i,
        frontImage: theme.pieces[i] || theme.pieces[0], // Use first image for all pieces (you can expand this)
        backImage: theme.backImage,
        x: Math.random() * 600 + 100, // Random initial position
        y: Math.random() * 400 + 100,
        isFlipped: false,
        correctX,
        correctY
      });
    }
    
    setPieces(newPieces);
  };

  const shufflePieces = () => {
    setPieces(prev => prev.map(piece => ({
      ...piece,
      x: Math.random() * 600 + 100,
      y: Math.random() * 400 + 100,
      isFlipped: false
    })));
    toast({
      title: "Pieces Shuffled!",
      description: "Ready for a new challenge!",
    });
  };

  const flipAllPieces = () => {
    setPieces(prev => prev.map(piece => ({
      ...piece,
      isFlipped: !piece.isFlipped
    })));
    toast({
      title: "All Pieces Flipped!",
      description: "What do you see now?",
    });
  };

  const solvePuzzle = () => {
    setPieces(prev => prev.map(piece => ({
      ...piece,
      x: piece.correctX,
      y: piece.correctY,
      isFlipped: false
    })));
    toast({
      title: "Puzzle Solved! 🎉",
      description: "Amazing work! Want to try again?",
    });
  };

  const resetPuzzle = () => {
    setSelectedTheme(null);
    setPieces([]);
    setGameStarted(false);
    toast({
      title: "Puzzle Reset",
      description: "Choose a new theme to start again!",
    });
  };

  if (!gameStarted || !selectedTheme) {
    return (
      <div className="min-h-screen bg-gradient-bg flex items-center justify-center p-4">
        <ThemeSelector themes={sampleThemes} onThemeSelect={handleThemeSelect} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-bg p-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-6">
          <h1 className="text-4xl font-bold text-primary mb-2" style={{ fontFamily: 'Fredoka One' }}>
            CoDi's Mix & Match Puzzle
          </h1>
          <p className="text-lg text-muted-foreground">
            Playing: <span className="text-primary font-semibold">{selectedTheme.name}</span>
          </p>
        </div>
        
        <GameControls
          onShuffle={shufflePieces}
          onFlipAll={flipAllPieces}
          onSolve={solvePuzzle}
          onReset={resetPuzzle}
        />
        
        <GameBoard
          pieces={pieces}
          setPieces={setPieces}
        />
      </div>
    </div>
  );
};