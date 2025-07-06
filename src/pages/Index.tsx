
import React, { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import BingoGame from '@/components/BingoGame';
import BingoCardGenerator from '@/components/BingoCardGenerator';
import BingoAdministration from '@/components/BingoAdministration';

const Index = () => {
  const [drawnBalls, setDrawnBalls] = useState<number[]>([]);

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
        <Tabs defaultValue="game" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8 bg-yellow-600 h-12">
            <TabsTrigger 
              value="game" 
              className="text-black font-bold data-[state=active]:bg-yellow-500 data-[state=active]:text-black"
            >
              🎯 JUEGO EN VIVO
            </TabsTrigger>
            <TabsTrigger 
              value="generator" 
              className="text-black font-bold data-[state=active]:bg-yellow-500 data-[state=active]:text-black"
            >
              🎲 GENERADOR DE CARTONES
            </TabsTrigger>
            <TabsTrigger 
              value="administration" 
              className="text-black font-bold data-[state=active]:bg-yellow-500 data-[state=active]:text-black"
            >
              🔍 ADMINISTRACIÓN
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="game">
            <BingoGame onDrawnBallsChange={setDrawnBalls} />
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
