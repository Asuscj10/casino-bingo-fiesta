
import React from 'react';
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";

interface DrawnBallsProps {
  drawnBalls: number[];
}

const DrawnBalls: React.FC<DrawnBallsProps> = ({ drawnBalls }) => {
  return (
    <Card className="bg-gradient-to-br from-blue-800 to-blue-900 border-blue-600 border-2 shadow-2xl">
      <div className="p-6">
        <h2 className="text-xl font-bold text-yellow-400 mb-4 text-center">
          BALOTAS EXTRAÍDAS ({drawnBalls.length})
        </h2>
        
        <ScrollArea className="h-96">
          <div className="grid grid-cols-6 gap-2">
            {drawnBalls.map((ball, index) => (
              <div
                key={`${ball}-${index}`}
                className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center text-black font-bold text-sm shadow-lg transform hover:scale-110 transition-all duration-300"
              >
                {ball.toString().padStart(2, '0')}
              </div>
            ))}
          </div>
          
          {drawnBalls.length === 0 && (
            <div className="text-center text-gray-400 py-8">
              <p>No se han extraído balotas aún</p>
              <p className="text-sm mt-2">Inicia el juego para comenzar</p>
            </div>
          )}
        </ScrollArea>
        
        {drawnBalls.length > 0 && (
          <div className="mt-4 p-3 bg-yellow-400 rounded-lg">
            <p className="text-black font-bold text-center">
              Última balota: {drawnBalls[drawnBalls.length - 1].toString().padStart(2, '0')}
            </p>
          </div>
        )}
      </div>
    </Card>
  );
};

export default DrawnBalls;
