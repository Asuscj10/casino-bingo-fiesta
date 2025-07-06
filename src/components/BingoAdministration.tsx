
import React, { useState } from 'react';
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";
import { Search, FileText } from 'lucide-react';
import { BingoCard, findCardBySerial } from '@/utils/bingoCardUtils';

interface BingoAdministrationProps {
  drawnBalls: number[];
}

const BingoAdministration: React.FC<BingoAdministrationProps> = ({ drawnBalls }) => {
  const [serialNumber, setSerialNumber] = useState('');
  const [foundCard, setFoundCard] = useState<BingoCard | null>(null);
  const [searchPerformed, setSearchPerformed] = useState(false);

  const searchCard = () => {
    if (!serialNumber.trim()) {
      toast({
        title: "Error",
        description: "Por favor ingrese un número de serie",
        variant: "destructive",
      });
      return;
    }

    const card = findCardBySerial(serialNumber.trim());
    setFoundCard(card);
    setSearchPerformed(true);

    if (card) {
      toast({
        title: "¡Cartón encontrado!",
        description: `Cartón ${card.serialNumber} localizado exitosamente`,
      });
    } else {
      toast({
        title: "Cartón no encontrado",
        description: "No se encontró un cartón con ese número de serie",
        variant: "destructive",
      });
    }
  };

  const getHitNumbers = (card: BingoCard): number[] => {
    const cardNumbers = card.numbers.flat().filter(n => n !== null) as number[];
    return cardNumbers.filter(number => drawnBalls.includes(number));
  };

  const renderCardWithHits = (card: BingoCard) => {
    const hitNumbers = getHitNumbers(card);
    
    return (
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <div className="text-center mb-4">
          <h3 className="text-xl font-bold text-black mb-2">
            CARTÓN #{card.id}
          </h3>
          <div className="bg-blue-600 text-white px-4 py-2 rounded-lg inline-block">
            <span className="font-bold">Serie: {card.serialNumber}</span>
          </div>
          {card.seriesId && (
            <p className="text-gray-600 mt-1">Tira Europea #{card.seriesId}</p>
          )}
        </div>

        <table className="w-full border-collapse mb-4">
          <tbody>
            {card.numbers.map((row, rowIndex) => (
              <tr key={rowIndex}>
                {row.map((cell, cellIndex) => {
                  const isHit = cell !== null && drawnBalls.includes(cell);
                  return (
                    <td
                      key={cellIndex}
                      className={`w-12 h-12 border-2 border-gray-400 text-center text-sm font-bold ${
                        cell 
                          ? isHit 
                            ? 'bg-green-500 text-white animate-pulse' 
                            : 'bg-yellow-200 text-black'
                          : 'bg-gray-100'
                      }`}
                    >
                      {cell ? cell.toString().padStart(2, '0') : ''}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>

        <div className="grid grid-cols-2 gap-4 text-center">
          <div className="bg-green-100 p-3 rounded-lg">
            <div className="text-2xl font-bold text-green-600">{hitNumbers.length}</div>
            <div className="text-sm text-green-800">Números Acertados</div>
          </div>
          <div className="bg-blue-100 p-3 rounded-lg">
            <div className="text-2xl font-bold text-blue-600">
              {card.numbers.flat().filter(n => n !== null).length}
            </div>
            <div className="text-sm text-blue-800">Números Total</div>
          </div>
        </div>

        {hitNumbers.length > 0 && (
          <div className="mt-4 p-3 bg-green-50 rounded-lg">
            <h4 className="font-bold text-green-800 mb-2">Números Acertados:</h4>
            <div className="flex flex-wrap gap-2">
              {hitNumbers.sort((a, b) => a - b).map(number => (
                <span
                  key={number}
                  className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-bold"
                >
                  {number.toString().padStart(2, '0')}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <Card className="bg-gradient-to-br from-indigo-800 to-indigo-900 border-indigo-600 border-2 shadow-2xl">
      <div className="p-6">
        <h2 className="text-2xl font-bold text-yellow-400 mb-6 text-center">
          🔍 ADMINISTRACIÓN DE CARTONES 🔍
        </h2>

        <div className="bg-indigo-700 p-4 rounded-lg mb-6">
          <h3 className="text-yellow-400 font-bold mb-2">Consultar Cartón</h3>
          <p className="text-white text-sm mb-4">
            Ingrese el número de serie del cartón para consultar su estado actual.
            Formato: DDMMYYYY-C# (individual) o DDMMYYYY-T# (tira europea)
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="md:col-span-2">
              <Label htmlFor="serialNumber" className="text-white font-bold">
                Número de Serie
              </Label>
              <Input
                id="serialNumber"
                type="text"
                placeholder="Ej: 06072025-C1 o 06072025-T1"
                value={serialNumber}
                onChange={(e) => setSerialNumber(e.target.value.toUpperCase())}
                className="mt-2 bg-white text-black font-bold"
                onKeyPress={(e) => e.key === 'Enter' && searchCard()}
              />
            </div>
            
            <div className="flex items-end">
              <Button
                onClick={searchCard}
                className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3"
              >
                <Search className="mr-2" />
                BUSCAR
              </Button>
            </div>
          </div>
        </div>

        {searchPerformed && (
          <div className="mt-6">
            {foundCard ? (
              <div>
                <div className="flex items-center justify-center mb-4">
                  <div className="bg-green-600 text-white px-4 py-2 rounded-lg">
                    <FileText className="inline mr-2" />
                    <span className="font-bold">Cartón Encontrado</span>
                  </div>
                </div>
                {renderCardWithHits(foundCard)}
              </div>
            ) : (
              <div className="bg-red-900 border-2 border-red-600 p-6 rounded-lg text-center">
                <div className="text-red-400 text-6xl mb-4">❌</div>
                <h3 className="text-xl font-bold text-red-400 mb-2">
                  Cartón No Encontrado
                </h3>
                <p className="text-red-300">
                  No se encontró ningún cartón con el número de serie: 
                  <span className="font-bold ml-2">{serialNumber}</span>
                </p>
                <p className="text-red-300 text-sm mt-2">
                  Verifique que el número de serie sea correcto y que el cartón haya sido generado.
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </Card>
  );
};

export default BingoAdministration;
