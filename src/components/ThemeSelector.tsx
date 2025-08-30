import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Theme } from "./PuzzleGame";

interface ThemeSelectorProps {
  themes: Theme[];
  onThemeSelect: (theme: Theme) => void;
}

export const ThemeSelector = ({ themes, onThemeSelect }: ThemeSelectorProps) => {
  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-5xl font-bold text-primary mb-4" style={{ fontFamily: 'Fredoka One' }}>
          Flip & Fit Puzzle
        </h1>
        <p className="text-xl text-muted-foreground">
          Choose your puzzle theme and start the fun!
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {themes.map((theme) => (
          <Card 
            key={theme.id} 
            className="cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-xl bg-card/80 backdrop-blur-sm border-2 hover:border-primary/50"
            onClick={() => onThemeSelect(theme)}
          >
            <CardHeader className="pb-3">
              <div className="aspect-square bg-gradient-primary rounded-lg mb-3 flex items-center justify-center">
                <img
                  src={theme.preview}
                  alt={theme.name}
                  className="w-20 h-20 object-cover rounded-lg opacity-80"
                />
              </div>
              <CardTitle className="text-xl text-center" style={{ fontFamily: 'Comic Neue' }}>
                {theme.name}
              </CardTitle>
              <CardDescription className="text-center">
                48 pieces of fun!
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button 
                className="w-full game-button bg-gradient-primary text-primary-foreground hover:bg-gradient-primary/90" 
                size="lg"
              >
                <span className="font-semibold">Play Now!</span>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
      
      <div className="text-center mt-8">
        <p className="text-sm text-muted-foreground">
          🧩 Drag pieces around • 🔄 Click to flip pieces • 🎯 Find the perfect match!
        </p>
      </div>
    </div>
  );
};