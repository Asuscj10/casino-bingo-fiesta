
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import BingoGameboard from '@/components/BingoGameboard';
import BingoCardGenerator from '@/components/BingoCardGenerator';
import BallDisplay from '@/components/BallDisplay';
import GameControls from '@/components/GameControls';
import DrawnBalls from '@/components/DrawnBalls';

const Index = () => {
  const [gameActive, setGameActive] = useState(false);
  const [drawnBalls, setDrawnBalls] = useState<number[]>([]);
  const [currentBall, setCurrentBall] = useState<number | null>(null);
  const [availableBalls, setAvailableBalls] = useState<number[]>([]);

  // Initialize available balls (01-99)
  useEffect(() => {
    const balls = Array.from({ length: 99 }, (_, i) => i + 1);
    setAvailableBalls(balls);
  }, []);

  const startGame = () => {
    setGameActive(true);
    setDrawnBalls([]);
    setCurrentBall(null);
    const balls = Array.from({ length: 99 }, (_, i) => i + 1);
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
    const balls = Array.from({ length: 99 }, (_, i) => i + 1);
    setAvailableBalls(balls);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-900 via-red-800 to-black text-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-yellow-600 to-yellow-500 shadow-2xl">
        <div className="container mx-auto px-4 py-6">
          <h1 className="text-4xl md:text-6xl font-bold text-center text-black tracking-wider">
            🎰 CASINO BINGO 🎰
          </h1>
          <p className="text-center text-black/80 text-lg mt-2">Sistema Profesional de Bingo en Vivo</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
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

        {/* Card Generator Section */}
        <div className="mt-12">
          <BingoCardGenerator />
        </div>
      </div>
    </div>
  );
};

export default Index;
