
import React from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Play, Square, RotateCcw } from 'lucide-react';

interface GameControlsProps {
  gameActive: boolean;
  onStartGame: () => void;
  onDrawBall: () => void;
  onResetGame: () => void;
  availableBalls: number;
  drawnBalls: number;
}

const GameControls: React.FC<GameControlsProps> = ({
  gameActive,
  onStartGame,
  onDrawBall,
  onResetGame,
  availableBalls,
  drawnBalls
}) => {
  return (
    <Card className="bg-gradient-to-br from-yellow-600 to-yellow-500 border-yellow-400 border-2 shadow-2xl">
      <div className="p-6">
        <h2 className="text-2xl font-bold text-black mb-6 text-center">CONTROLES DEL JUEGO</h2>
        
        <div className="space-y-4">
          {!gameActive ? (
            <Button 
              onClick={onStartGame}
              className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-4 text-xl transition-all duration-300 transform hover:scale-105"
              size="lg"
            >
              <Play className="mr-2" />
              INICIAR JUEGO
            </Button>
          ) : (
            <>
              <Button 
                onClick={onDrawBall}
                disabled={availableBalls === 0}
                className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-4 text-xl transition-all duration-300 transform hover:scale-105 disabled:opacity-50"
                size="lg"
              >
                <Square className="mr-2" />
                SACAR BALOTA
              </Button>
              
              <Button 
                onClick={onResetGame}
                variant="outline"
                className="w-full border-2 border-black text-black hover:bg-black hover:text-yellow-500 font-bold py-3 transition-all duration-300"
                size="lg"
              >
                <RotateCcw className="mr-2" />
                REINICIAR
              </Button>
            </>
          )}
        </div>

        {/* Game Stats */}
        <div className="mt-6 p-4 bg-black/20 rounded-lg">
          <div className="grid grid-cols-2 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-black">{drawnBalls}</div>
              <div className="text-sm text-black/80">Extraídas</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-black">{availableBalls}</div>
              <div className="text-sm text-black/80">Restantes</div>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default GameControls;
