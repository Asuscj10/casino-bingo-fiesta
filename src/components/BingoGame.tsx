
import React, { useEffect, useState } from 'react';
import BingoGameboard from '@/components/BingoGameboard';
import GameControls from '@/components/GameControls';

interface BingoGameProps {
  onDrawnBallsChange?: (drawnBalls: number[]) => void;
  drawnBalls: number[];
  gameActive: boolean;
  setGameActive: (active: boolean) => void;
  currentBall: number | null;
  setCurrentBall: (ball: number | null) => void;
  availableBalls: number[];
  setAvailableBalls: (balls: number[]) => void;
}

const BingoGame: React.FC<BingoGameProps> = ({ 
  onDrawnBallsChange,
  drawnBalls,
  gameActive,
  setGameActive,
  currentBall,
  setCurrentBall,
  availableBalls,
  setAvailableBalls
}) => {
  const [isAutoMode, setIsAutoMode] = useState(true);
  const [autoInterval, setAutoInterval] = useState(10);

  // Notify parent component when drawn balls change
  useEffect(() => {
    if (onDrawnBallsChange) {
      onDrawnBallsChange(drawnBalls);
    }
  }, [drawnBalls, onDrawnBallsChange]);

  const startGame = () => {
    setGameActive(true);
    // Reset balls state
    const balls = Array.from({ length: 90 }, (_, i) => i + 1);
    setAvailableBalls(balls);
    setCurrentBall(null);
    if (onDrawnBallsChange) {
      onDrawnBallsChange([]);
    }
  };

  const drawBall = () => {
    if (availableBalls.length === 0) return;
    
    const randomIndex = Math.floor(Math.random() * availableBalls.length);
    const drawnBall = availableBalls[randomIndex];
    
    setCurrentBall(drawnBall);
    const newDrawnBalls = [...drawnBalls, drawnBall];
    if (onDrawnBallsChange) {
      onDrawnBallsChange(newDrawnBalls);
    }
    const newAvailableBalls = availableBalls.filter(ball => ball !== drawnBall);
    setAvailableBalls(newAvailableBalls);
  };

  const pauseGame = () => {
    // Solo pausa el modo automático, no detiene el juego
  };

  const resetGame = () => {
    setGameActive(false);
    setCurrentBall(null);
    setIsAutoMode(true);
    const balls = Array.from({ length: 90 }, (_, i) => i + 1);
    setAvailableBalls(balls);
    if (onDrawnBallsChange) {
      onDrawnBallsChange([]);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Left Column - Game Controls */}
      <div className="lg:col-span-1">
        <GameControls 
          gameActive={gameActive}
          onStartGame={startGame}
          onDrawBall={drawBall}
          onPauseGame={pauseGame}
          onResetGame={resetGame}
          availableBalls={availableBalls.length}
          drawnBalls={drawnBalls.length}
          isAutoMode={isAutoMode}
          setIsAutoMode={setIsAutoMode}
          autoInterval={autoInterval}
          setAutoInterval={setAutoInterval}
        />
      </div>

      {/* Right Column - Gameboard */}
      <div className="lg:col-span-1">
        <BingoGameboard drawnBalls={drawnBalls} />
      </div>
    </div>
  );
};

export default BingoGame;
