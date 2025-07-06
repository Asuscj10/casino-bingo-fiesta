
import React, { useEffect } from 'react';
import BingoGameboard from '@/components/BingoGameboard';
import BallDisplay from '@/components/BallDisplay';
import GameControls from '@/components/GameControls';
import DrawnBalls from '@/components/DrawnBalls';

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
    setAvailableBalls(prev => prev.filter(ball => ball !== drawnBall));
  };

  const resetGame = () => {
    setGameActive(false);
    setCurrentBall(null);
    const balls = Array.from({ length: 90 }, (_, i) => i + 1);
    setAvailableBalls(balls);
    if (onDrawnBallsChange) {
      onDrawnBallsChange([]);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Left Column - Game Controls & Ball Display */}
      <div className="lg:col-span-1 space-y-6">
        <GameControls 
          gameActive={gameActive}
          onStartGame={startGame}
          onDrawBall={drawBall}
          onResetGame={resetGame}
          availableBalls={availableBalls.length}
          drawnBalls={drawnBalls.length}
        />
        
        <BallDisplay currentBall={currentBall} />
      </div>

      {/* Middle Column - Gameboard */}
      <div className="lg:col-span-1">
        <BingoGameboard drawnBalls={drawnBalls} />
      </div>

      {/* Right Column - Drawn Balls History */}
      <div className="lg:col-span-1">
        <DrawnBalls drawnBalls={drawnBalls} />
      </div>
    </div>
  );
};

export default BingoGame;
