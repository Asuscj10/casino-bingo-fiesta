
import React, { useState, useEffect } from 'react';
import BingoGameboard from '@/components/BingoGameboard';
import BallDisplay from '@/components/BallDisplay';
import GameControls from '@/components/GameControls';
import DrawnBalls from '@/components/DrawnBalls';

const BingoGame: React.FC = () => {
  const [gameActive, setGameActive] = useState(false);
  const [drawnBalls, setDrawnBalls] = useState<number[]>([]);
  const [currentBall, setCurrentBall] = useState<number | null>(null);
  const [availableBalls, setAvailableBalls] = useState<number[]>([]);

  // Initialize available balls (01-90)
  useEffect(() => {
    const balls = Array.from({ length: 90 }, (_, i) => i + 1);
    setAvailableBalls(balls);
  }, []);

  const startGame = () => {
    setGameActive(true);
    setDrawnBalls([]);
    setCurrentBall(null);
    const balls = Array.from({ length: 90 }, (_, i) => i + 1);
    setAvailableBalls(balls);
  };

  const drawBall = () => {
    if (availableBalls.length === 0) return;
    
    const randomIndex = Math.floor(Math.random() * availableBalls.length);
    const drawnBall = availableBalls[randomIndex];
    
    setCurrentBall(drawnBall);
    setDrawnBalls(prev => [...prev, drawnBall]);
    setAvailableBalls(prev => prev.filter(ball => ball !== drawnBall));
  };

  const resetGame = () => {
    setGameActive(false);
    setDrawnBalls([]);
    setCurrentBall(null);
    const balls = Array.from({ length: 90 }, (_, i) => i + 1);
    setAvailableBalls(balls);
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
