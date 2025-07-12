
import React, { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import BingoGame from '@/components/BingoGame';
import BingoCardGenerator from '@/components/BingoCardGenerator';
import BingoAdministration from '@/components/BingoAdministration';

const Index = () => {
  const [drawnBalls, setDrawnBalls] = useState<number[]>([]);
  const [gameActive, setGameActive] = useState(false);
  const [currentBall, setCurrentBall] = useState<number | null>(null);  
  const [availableBalls, setAvailableBalls] = useState<number[]>([]);

  // Initialize available balls (01-90)
  useEffect(() => {
    const balls = Array.from({ length: 90 }, (_, i) => i + 1);
    setAvailableBalls(balls);
  }, []);

  return (
    <div className="min-h-screen festival-bg-electric-blue festival-text-white">
      {/* Header */}
      <div className="festival-bg-vibrant-yellow shadow-2xl">
        <div className="container mx-auto px-4 py-6">
          <h1 className="text-4xl md:text-6xl font-bold text-center text-black tracking-wider">
            🎰 CASINO BINGO 🎰
          </h1>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <Tabs defaultValue="game" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8 festival-bg-vibrant-yellow h-12">
            <TabsTrigger 
              value="game" 
              className="text-black font-bold data-[state=active]:festival-bg-vibrant-yellow data-[state=active]:text-black hover:festival-text-fuchsia"
            >
              🎯 JUEGO EN VIVO
            </TabsTrigger>
            <TabsTrigger 
              value="generator" 
              className="text-black font-bold data-[state=active]:festival-bg-vibrant-yellow data-[state=active]:text-black hover:festival-text-fuchsia"
            >
              🎲 GENERADOR DE CARTONES
            </TabsTrigger>
            <TabsTrigger 
              value="administration" 
              className="text-black font-bold data-[state=active]:festival-bg-vibrant-yellow data-[state=active]:text-black hover:festival-text-fuchsia"
            >
              🔍 ADMINISTRACIÓN
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="game">
            <BingoGame 
              onDrawnBallsChange={setDrawnBalls}
              drawnBalls={drawnBalls}
              gameActive={gameActive}
              setGameActive={setGameActive}
              currentBall={currentBall}
              setCurrentBall={setCurrentBall}
              availableBalls={availableBalls}
              setAvailableBalls={setAvailableBalls}
            />
          </TabsContent>
          
          <TabsContent value="generator">
            <BingoCardGenerator />
          </TabsContent>
          
          <TabsContent value="administration">
            <BingoAdministration drawnBalls={drawnBalls} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Index;
