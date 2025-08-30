import { Button } from "@/components/ui/button";
import { Shuffle, RotateCcw, Zap, RotateCw } from "lucide-react";

interface GameControlsProps {
  onShuffle: () => void;
  onFlipAll: () => void;
  onSolve: () => void;
  onReset: () => void;
}

export const GameControls = ({ onShuffle, onFlipAll, onSolve, onReset }: GameControlsProps) => {
  return (
    <div className="bg-card/80 backdrop-blur-sm rounded-xl p-4 mb-6 shadow-lg border border-border/50">
      <div className="flex flex-wrap gap-3 justify-center items-center">
        <Button
          onClick={onShuffle}
          className="game-button bg-gradient-secondary text-secondary-foreground hover:bg-gradient-secondary/90"
          size="lg"
        >
          <Shuffle className="w-5 h-5 mr-2" />
          <span className="font-semibold">Shuffle</span>
        </Button>

        <Button
          onClick={onFlipAll}
          className="game-button bg-gradient-primary text-primary-foreground hover:bg-gradient-primary/90"
          size="lg"
        >
          <RotateCw className="w-5 h-5 mr-2" />
          <span className="font-semibold">Flip All</span>
        </Button>

        <Button
          onClick={onSolve}
          className="game-button bg-gradient-success text-accent-foreground hover:bg-gradient-success/90"
          size="lg"
        >
          <Zap className="w-5 h-5 mr-2" />
          <span className="font-semibold">Solve It!</span>
        </Button>

        <Button
          onClick={onReset}
          variant="outline"
          className="game-button border-2 border-destructive/50 text-destructive hover:bg-destructive/10"
          size="lg"
        >
          <RotateCcw className="w-5 h-5 mr-2" />
          <span className="font-semibold">Reset</span>
        </Button>
      </div>
      
      <div className="text-center mt-3">
        <p className="text-sm text-muted-foreground">
          💡 <strong>Tip:</strong> Double-click or tap any piece to flip it!
        </p>
      </div>
    </div>
  );
};