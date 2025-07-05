
import React from 'react';
import { Card } from "@/components/ui/card";

interface BallDisplayProps {
  currentBall: number | null;
}

const BallDisplay: React.FC<BallDisplayProps> = ({ currentBall }) => {
  return (
    <Card className="bg-gradient-to-br from-red-600 to-red-800 border-red-400 border-2 shadow-2xl">
      <div className="p-6 text-center">
        <h2 className="text-xl font-bold text-yellow-400 mb-4">BALOTA ACTUAL</h2>
        
        <div className="relative">
          <div className="w-32 h-32 mx-auto bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full shadow-2xl flex items-center justify-center border-4 border-yellow-300 animate-pulse">
            {currentBall ? (
              <span className="text-4xl font-bold text-black">
                {currentBall.toString().padStart(2, '0')}
              </span>
            ) : (
              <span className="text-2xl font-bold text-black/60">--</span>
            )}
          </div>
          
          {currentBall && (
            <div className="absolute -top-2 -right-2 w-8 h-8 bg-green-500 rounded-full animate-ping"></div>
          )}
        </div>

        {currentBall && (
          <div className="mt-4 p-3 bg-yellow-400 rounded-lg">
            <p className="text-black font-bold text-lg">
              ¡BALOTA NÚMERO {currentBall.toString().padStart(2, '0')}!
            </p>
          </div>
        )}
      </div>
    </Card>
  );
};

export default BallDisplay;
