
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Play, Pause, Square, RotateCcw } from 'lucide-react';

interface GameControlsProps {
  gameActive: boolean;
  onStartGame: () => void;
  onDrawBall: () => void;
  onPauseGame: () => void;
  onResetGame: () => void;
  availableBalls: number;
  drawnBalls: number;
  isAutoMode: boolean;
  setIsAutoMode: (auto: boolean) => void;
  autoInterval: number;
  setAutoInterval: (interval: number) => void;
}

const GameControls: React.FC<GameControlsProps> = ({
  gameActive,
  onStartGame,
  onDrawBall,
  onPauseGame,
  onResetGame,
  availableBalls,
  drawnBalls,
  isAutoMode,
  setIsAutoMode,
  autoInterval,
  setAutoInterval
}) => {
  const [timeRemaining, setTimeRemaining] = useState(0);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    
    if (gameActive && isAutoMode && availableBalls > 0) {
      setTimeRemaining(autoInterval);
      
      timer = setInterval(() => {
        setTimeRemaining((prev) => {
          if (prev <= 1) {
            onDrawBall();
            return autoInterval;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => {
      if (timer) clearInterval(timer);
    };
  }, [gameActive, isAutoMode, autoInterval, availableBalls, onDrawBall]);

  const handleStartGame = () => {
    setIsAutoMode(true);
    onStartGame();
  };

  const handlePause = () => {
    setIsAutoMode(false);
    onPauseGame();
  };

  const handleResume = () => {
    setIsAutoMode(true);
  };

  return (
    <Card className="bg-gradient-to-br from-yellow-600 to-yellow-500 border-yellow-400 border-2 shadow-2xl">
      <div className="p-6">
        <h2 className="text-2xl font-bold text-black mb-6 text-center">CONTROLES DEL JUEGO</h2>
        
        {/* Configuración de tiempo */}
        <div className="mb-6">
          <label className="block text-black font-bold mb-2">Intervalo de tiempo (segundos)</label>
          <Select value={autoInterval.toString()} onValueChange={(value) => setAutoInterval(parseInt(value))}>
            <SelectTrigger className="w-full bg-white text-black font-bold">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="5">5 segundos</SelectItem>
              <SelectItem value="10">10 segundos</SelectItem>
              <SelectItem value="20">20 segundos</SelectItem>
              <SelectItem value="30">30 segundos</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-4">
          {!gameActive ? (
            <Button 
              onClick={handleStartGame}
              className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-4 text-xl transition-all duration-300 transform hover:scale-105"
              size="lg"
            >
              <Play className="mr-2" />
              INICIAR JUEGO
            </Button>
          ) : (
            <>
              <div className="grid grid-cols-2 gap-4">
                {isAutoMode ? (
                  <Button 
                    onClick={handlePause}
                    className="bg-orange-600 hover:bg-orange-700 text-white font-bold py-3 transition-all duration-300"
                    size="lg"
                  >
                    <Pause className="mr-2" />
                    PAUSAR
                  </Button>
                ) : (
                  <Button 
                    onClick={handleResume}
                    className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 transition-all duration-300"
                    size="lg"
                  >
                    <Play className="mr-2" />
                    REANUDAR
                  </Button>
                )}
                
                <Button 
                  onClick={onDrawBall}
                  disabled={availableBalls === 0}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 transition-all duration-300 disabled:opacity-50"
                  size="lg"
                >
                  <Square className="mr-2" />
                  MANUAL
                </Button>
              </div>
              
              <Button 
                onClick={onResetGame}
                variant="outline"
                className="w-full border-2 border-black text-black hover:bg-black hover:text-yellow-500 font-bold py-3 transition-all duration-300"
                size="lg"
              >
                <RotateCcw className="mr-2" />
                NUEVO JUEGO
              </Button>
            </>
          )}
        </div>

        {/* Contador de tiempo */}
        {gameActive && isAutoMode && availableBalls > 0 && (
          <div className="mt-4 p-4 bg-black/20 rounded-lg text-center">
            <div className="text-3xl font-bold text-black">{timeRemaining}</div>
            <div className="text-sm text-black/80">Próxima balota en</div>
          </div>
        )}

        {/* Estadísticas del juego */}
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
