
import React from 'react';
import { Card } from "@/components/ui/card";

interface BingoGameboardProps {
  drawnBalls: number[];
}

const BingoGameboard: React.FC<BingoGameboardProps> = ({ drawnBalls }) => {
  const renderNumberGrid = () => {
    const numbers = Array.from({ length: 90 }, (_, i) => i + 1);
    
    return (
      <div className="grid grid-cols-10 gap-2 p-6">
        {numbers.map(number => {
          const isDrawn = drawnBalls.includes(number);
          return (
            <div
              key={number}
              className={`
                w-12 h-12 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-500
                ${isDrawn 
                  ? 'bg-green-500 text-white scale-110 shadow-lg animate-pulse' 
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }
              `}
            >
              {number.toString().padStart(2, '0')}
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <Card className="bg-gradient-to-br from-gray-800 to-gray-900 border-gray-600 border-2 shadow-2xl">
      <div className="p-6">
        <h2 className="text-2xl font-bold text-yellow-400 mb-6 text-center">TABLERO DE NÚMEROS</h2>
        <div className="bg-black/30 rounded-lg">
          {renderNumberGrid()}
        </div>
        <p className="text-center text-gray-400 text-sm mt-4">
          Los números en <span className="text-green-400 font-bold">verde</span> han sido extraídos
        </p>
      </div>
    </Card>
  );
};

export default BingoGameboard;
