
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";
import { Download, FileText, Globe } from 'lucide-react';

interface BingoCard {
  id: number;
  numbers: (number | null)[][];
}

const BingoCardGenerator: React.FC = () => {
  const [numberOfCards, setNumberOfCards] = useState<number>(1);
  const [generatedCards, setGeneratedCards] = useState<BingoCard[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);

  const generateRandomCard = (cardId: number): BingoCard => {
    // Create a 9x3 grid
    const card: (number | null)[][] = [];
    const usedNumbers = new Set<number>();
    
    for (let row = 0; row < 3; row++) {
      const cardRow: (number | null)[] = [];
      const blanksInThisRow = Math.floor(Math.random() * 3) + 2; // 2-4 blanks per row
      const blankPositions = new Set<number>();
      
      // Select random positions for blanks
      while (blankPositions.size < blanksInThisRow) {
        blankPositions.add(Math.floor(Math.random() * 9));
      }
      
      for (let col = 0; col < 9; col++) {
        if (blankPositions.has(col)) {
          cardRow.push(null);
        } else {
          let randomNumber;
          do {
            randomNumber = Math.floor(Math.random() * 99) + 1;
          } while (usedNumbers.has(randomNumber));
          
          usedNumbers.add(randomNumber);
          cardRow.push(randomNumber);
        }
      }
      card.push(cardRow);
    }
    
    return { id: cardId, numbers: card };
  };

  const generateCards = async () => {
    if (numberOfCards < 1 || numberOfCards > 20000) {
      toast({
        title: "Error",
        description: "El número de cartones debe estar entre 1 y 20,000",
        variant: "destructive",
      });
      return;
    }

    setIsGenerating(true);
    const cards: BingoCard[] = [];
    
    try {
      for (let i = 0; i < numberOfCards; i++) {
        cards.push(generateRandomCard(i + 1));
        
        // Update progress every 100 cards
        if (i % 100 === 0) {
          await new Promise(resolve => setTimeout(resolve, 1));
        }
      }
      
      setGeneratedCards(cards);
      toast({
        title: "¡Éxito!",
        description: `Se generaron ${numberOfCards} cartones de bingo`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Ocurrió un error al generar los cartones",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const exportToPDF = () => {
    // Create a printable HTML structure for PDF
    const printContent = generatedCards.map(card => `
      <div style="page-break-after: always; margin: 20px; border: 2px solid #000; padding: 10px;">
        <h3 style="text-align: center; margin-bottom: 10px;">CARTÓN DE BINGO #${card.id}</h3>
        <table style="width: 100%; border-collapse: collapse; margin: 0 auto;">
          ${card.numbers.map(row => `
            <tr>
              ${row.map(cell => `
                <td style="width: 40px; height: 40px; border: 1px solid #000; text-align: center; vertical-align: middle; font-size: 14px; font-weight: bold; ${cell ? 'background: #f0f0f0;' : 'background: #fff;'}">
                  ${cell ? cell.toString().padStart(2, '0') : ''}
                </td>
              `).join('')}
            </tr>
          `).join('')}
        </table>
      </div>
    `).join('');

    const printWindow = window.open('', '_blank');
    if (printWindow) {
      printWindow.document.write(`
        <html>
          <head>
            <title>Cartones de Bingo</title>
            <style>
              body { font-family: Arial, sans-serif; margin: 0; padding: 20px; }
              @media print { 
                body { margin: 0; }
                .no-print { display: none; }
              }
            </style>
          </head>
          <body>
            <div class="no-print" style="text-align: center; margin-bottom: 20px;">
              <button onclick="window.print()" style="padding: 10px 20px; font-size: 16px; background: #007cba; color: white; border: none; border-radius: 5px; cursor: pointer;">
                Imprimir Cartones
              </button>
            </div>
            ${printContent}
          </body>
        </html>
      `);
      printWindow.document.close();
    }
  };

  const exportToHTML = () => {
    const htmlContent = `
      <!DOCTYPE html>
      <html lang="es">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Cartones de Bingo - Casino</title>
        <style>
          body { font-family: Arial, sans-serif; margin: 0; padding: 20px; background: #f5f5f5; }
          .container { max-width: 1200px; margin: 0 auto; }
          .card { background: white; margin: 20px 0; padding: 20px; border-radius: 10px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); }
          .card h3 { text-align: center; color: #d4af37; margin-bottom: 15px; }
          table { width: 100%; border-collapse: collapse; margin: 0 auto; max-width: 450px; }
          td { width: 50px; height: 50px; border: 2px solid #333; text-align: center; vertical-align: middle; font-size: 16px; font-weight: bold; }
          .number { background: linear-gradient(135deg, #ffd700, #ffed4e); }
          .blank { background: #f9f9f9; }
          .header { text-align: center; background: linear-gradient(135deg, #d4af37, #ffd700); padding: 20px; border-radius: 10px; margin-bottom: 30px; }
          .header h1 { margin: 0; color: #000; font-size: 2.5em; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>🎰 CARTONES DE BINGO CASINO 🎰</h1>
            <p>Total de cartones generados: ${generatedCards.length}</p>
          </div>
          ${generatedCards.map(card => `
            <div class="card">
              <h3>CARTÓN DE BINGO #${card.id}</h3>
              <table>
                ${card.numbers.map(row => `
                  <tr>
                    ${row.map(cell => `
                      <td class="${cell ? 'number' : 'blank'}">
                        ${cell ? cell.toString().padStart(2, '0') : ''}
                      </td>
                    `).join('')}
                  </tr>
                `).join('')}
              </table>
            </div>
          `).join('')}
        </div>
      </body>
      </html>
    `;

    const blob = new Blob([htmlContent], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `cartones-bingo-${numberOfCards}.html`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <Card className="bg-gradient-to-br from-purple-800 to-purple-900 border-purple-600 border-2 shadow-2xl">
      <div className="p-6">
        <h2 className="text-2xl font-bold text-yellow-400 mb-6 text-center">
          🎲 GENERADOR DE CARTONES 🎲
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <Label htmlFor="numberOfCards" className="text-white font-bold">
              Número de Cartones (máx. 20,000)
            </Label>
            <Input
              id="numberOfCards"
              type="number"
              min="1"
              max="20000"
              value={numberOfCards}
              onChange={(e) => setNumberOfCards(parseInt(e.target.value) || 1)}
              className="mt-2 bg-white text-black font-bold"
            />
          </div>
          
          <div className="flex items-end">
            <Button
              onClick={generateCards}
              disabled={isGenerating}
              className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 transition-all duration-300 transform hover:scale-105"
            >
              {isGenerating ? 'Generando...' : 'GENERAR CARTONES'}
            </Button>
          </div>
        </div>

        {generatedCards.length > 0 && (
          <div className="space-y-4">
            <div className="flex flex-wrap gap-4 justify-center">
              <Button
                onClick={exportToPDF}
                className="bg-red-600 hover:bg-red-700 text-white font-bold"
              >
                <FileText className="mr-2" />
                Exportar a PDF
              </Button>
              
              <Button
                onClick={exportToHTML}
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold"
              >
                <Globe className="mr-2" />
                Exportar a HTML
              </Button>
            </div>
            
            <div className="bg-yellow-400 p-4 rounded-lg">
              <p className="text-black font-bold text-center">
                ✅ {generatedCards.length} cartones generados exitosamente
              </p>
            </div>

            {/* Preview of first few cards */}
            <div className="mt-6">
              <h3 className="text-lg font-bold text-yellow-400 mb-4">Vista Previa (Primeros 3 Cartones)</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {generatedCards.slice(0, 3).map(card => (
                  <div key={card.id} className="bg-white p-4 rounded-lg">
                    <h4 className="text-center text-black font-bold mb-2">Cartón #{card.id}</h4>
                    <table className="w-full border-collapse">
                      <tbody>
                        {card.numbers.map((row, rowIndex) => (
                          <tr key={rowIndex}>
                            {row.map((cell, cellIndex) => (
                              <td
                                key={cellIndex}
                                className={`w-8 h-8 border border-gray-400 text-center text-xs font-bold ${
                                  cell ? 'bg-yellow-200 text-black' : 'bg-gray-100'
                                }`}
                              >
                                {cell ? cell.toString().padStart(2, '0') : ''}
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </Card>
  );
};

export default BingoCardGenerator;
