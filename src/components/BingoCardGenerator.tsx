import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "@/hooks/use-toast";
import { Download, FileText, Globe, Users } from 'lucide-react';
import ImageUploadSection from '@/components/ImageUploadSection';
import { 
  BingoCard, 
  EuropeanStrip, 
  generateRandomCard, 
  generateEuropeanStrip, 
  resetNumberTracker,
  registerGeneratedCards,
  registerGeneratedStrips
} from '@/utils/bingoCardUtils';

const BingoCardGenerator: React.FC = () => {
  const [numberOfCards, setNumberOfCards] = useState<number>(1);
  const [numberOfStrips, setNumberOfStrips] = useState<number>(1);
  const [generatedCards, setGeneratedCards] = useState<BingoCard[]>([]);
  const [generatedStrips, setGeneratedStrips] = useState<EuropeanStrip[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const generateIndividualCards = async () => {
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
      resetNumberTracker();
      
      for (let i = 0; i < numberOfCards; i++) {
        let attempts = 0;
        let newCard: BingoCard | null = null;
        
        while (attempts < 50 && !newCard) {
          const candidateCard = generateRandomCard(i + 1);
          
          const isUnique = !cards.some(existingCard => 
            JSON.stringify(existingCard.numbers) === JSON.stringify(candidateCard.numbers)
          );
          
          if (isUnique) {
            newCard = candidateCard;
          } else {
            attempts++;
          }
        }
        
        if (newCard) {
          cards.push(newCard);
        } else {
          console.warn(`Could not generate unique card ${i + 1} after 50 attempts`);
          cards.push(generateRandomCard(i + 1));
        }
        
        if (i % 100 === 0) {
          await new Promise(resolve => setTimeout(resolve, 1));
        }
      }
      
      setGeneratedCards(cards);
      setGeneratedStrips([]);
      registerGeneratedCards(cards);
      
      toast({
        title: "¡Éxito!",
        description: `Se generaron ${numberOfCards} cartones individuales`,
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

  const generateEuropeanStrips = async () => {
    if (numberOfStrips < 1 || numberOfStrips > 10000) {
      toast({
        title: "Error",
        description: "El número de tiras debe estar entre 1 y 10,000",
        variant: "destructive",
      });
      return;
    }

    setIsGenerating(true);
    const strips: EuropeanStrip[] = [];
    
    try {
      resetNumberTracker();
      
      for (let i = 0; i < numberOfStrips; i++) {
        let attempts = 0;
        let newStrip: EuropeanStrip | null = null;
        
        while (attempts < 30 && !newStrip) {
          const candidateStrip = generateEuropeanStrip(i + 1);
          
          const isUnique = !strips.some(existingStrip => 
            JSON.stringify(existingStrip.allNumbers.sort()) === JSON.stringify(candidateStrip.allNumbers.sort())
          );
          
          if (isUnique) {
            newStrip = candidateStrip;
          } else {
            attempts++;
          }
        }
        
        if (newStrip) {
          strips.push(newStrip);
        } else {
          console.warn(`Could not generate unique strip ${i + 1} after 30 attempts`);
          strips.push(generateEuropeanStrip(i + 1));
        }
        
        if (i % 10 === 0) {
          await new Promise(resolve => setTimeout(resolve, 1));
        }
      }
      
      setGeneratedStrips(strips);
      setGeneratedCards([]);
      registerGeneratedStrips(strips);
      
      toast({
        title: "¡Éxito!",
        description: `Se generaron ${numberOfStrips} tiras europeas (${numberOfStrips * 6} cartones en total)`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Ocurrió un error al generar las tiras",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const getAllCards = (): BingoCard[] => {
    if (generatedCards.length > 0) {
      return generatedCards;
    }
    if (generatedStrips.length > 0) {
      return generatedStrips.flatMap(strip => strip.cards);
    }
    return [];
  };

  const getImageStyle = () => {
    if (!selectedImage) return '';
    return `background-image: url(${selectedImage}); background-size: contain; background-repeat: no-repeat; background-position: center;`;
  };

  const exportToPDF = () => {
    const allCards = getAllCards();
    if (allCards.length === 0) return;

    const cardsPerPage = 12;
    const pages: BingoCard[][] = [];
    
    if (generatedStrips.length > 0) {
      for (let i = 0; i < generatedStrips.length; i += 2) {
        const pageCards: BingoCard[] = [];
        if (generatedStrips[i]) {
          pageCards.push(...generatedStrips[i].cards);
        }
        if (generatedStrips[i + 1]) {
          pageCards.push(...generatedStrips[i + 1].cards);
        }
        pages.push(pageCards);
      }
    } else {
      for (let i = 0; i < allCards.length; i += cardsPerPage) {
        pages.push(allCards.slice(i, i + cardsPerPage));
      }
    }

    const printContent = pages.map((pageCards, pageIndex) => {
      const leftCards = pageCards.slice(0, 6);
      const rightCards = pageCards.slice(6, 12);
      
      return `
        <div style="page-break-after: ${pageIndex < pages.length - 1 ? 'always' : 'auto'}; width: 21.59cm; height: 27.94cm; margin: 0; padding: 1cm; box-sizing: border-box; display: flex; justify-content: space-between;">
          <div style="width: 48%; display: flex; flex-direction: column; justify-content: space-around;">
            ${leftCards.map(card => `
              <div style="margin-bottom: 0.5cm; border: 2px solid #007BFF; padding: 0.3cm; background: #FFD700;">
                <h4 style="text-align: center; margin: 0 0 0.2cm 0; font-size: 12px; font-weight: bold; color: #000;">
                  CARTÓN DE BINGO #${card.serialNumber}
                </h4>
                <table style="width: 100%; border-collapse: collapse;">
                  ${card.numbers.map(row => `
                    <tr>
                      ${row.map(cell => `
                        <td style="width: 11.11%; height: 0.8cm; border: 1px solid #007BFF; text-align: center; vertical-align: middle; font-size: 10px; font-weight: bold; ${cell ? 'background: #fff; color: #000;' : selectedImage ? `${getImageStyle()} background-color: #f9f9f9;` : 'background: #fff;'}">
                          ${cell ? cell.toString().padStart(2, '0') : ''}
                        </td>
                      `).join('')}
                    </tr>
                  `).join('')}
                </table>
              </div>
            `).join('')}
          </div>
          
          <div style="width: 48%; display: flex; flex-direction: column; justify-content: space-around;">
            ${rightCards.map(card => `
              <div style="margin-bottom: 0.5cm; border: 2px solid #007BFF; padding: 0.3cm; background: #FFD700;">
                <h4 style="text-align: center; margin: 0 0 0.2cm 0; font-size: 12px; font-weight: bold; color: #000;">
                  CARTÓN DE BINGO #${card.serialNumber}
                </h4>
                <table style="width: 100%; border-collapse: collapse;">
                  ${card.numbers.map(row => `
                    <tr>
                      ${row.map(cell => `
                        <td style="width: 11.11%; height: 0.8cm; border: 1px solid #007BFF; text-align: center; vertical-align: middle; font-size: 10px; font-weight: bold; ${cell ? 'background: #fff; color: #000;' : selectedImage ? `${getImageStyle()} background-color: #f9f9f9;` : 'background: #fff;'}">
                          ${cell ? cell.toString().padStart(2, '0') : ''}
                        </td>
                      `).join('')}
                    </tr>
                  `).join('')}
                </table>
              </div>
            `).join('')}
          </div>
        </div>
      `;
    }).join('');

    const printWindow = window.open('', '_blank');
    if (printWindow) {
      printWindow.document.write(`
        <html>
          <head>
            <title>Cartones de Bingo - Festival</title>
            <style>
              @page { 
                size: 21.59cm 27.94cm; 
                margin: 0; 
              }
              body { 
                font-family: Arial, sans-serif; 
                margin: 0; 
                padding: 0; 
                background: #007BFF;
              }
              @media print { 
                body { margin: 0; }
                .no-print { display: none; }
              }
            </style>
          </head>
          <body>
            <div class="no-print" style="position: fixed; top: 10px; left: 50%; transform: translateX(-50%); z-index: 1000; background: #FFD700; padding: 10px; border: 1px solid #007BFF; border-radius: 5px;">
              <button onclick="window.print()" style="padding: 10px 20px; font-size: 16px; background: #007BFF; color: white; border: none; border-radius: 5px; cursor: pointer;">
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
    const allCards = getAllCards();
    if (allCards.length === 0) return;

    const cardsPerPage = 12;
    const pages: BingoCard[][] = [];
    
    if (generatedStrips.length > 0) {
      for (let i = 0; i < generatedStrips.length; i += 2) {
        const pageCards: BingoCard[] = [];
        if (generatedStrips[i]) {
          pageCards.push(...generatedStrips[i].cards);
        }
        if (generatedStrips[i + 1]) {
          pageCards.push(...generatedStrips[i + 1].cards);
        }
        pages.push(pageCards);
      }
    } else {
      for (let i = 0; i < allCards.length; i += cardsPerPage) {
        pages.push(allCards.slice(i, i + cardsPerPage));
      }
    }

    const htmlContent = `
      <!DOCTYPE html>
      <html lang="es">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Cartones de Bingo - Festival</title>
        <style>
          @page { 
            size: 21.59cm 27.94cm; 
            margin: 0; 
          }
          body { 
            font-family: Arial, sans-serif; 
            margin: 0; 
            padding: 0; 
            background: #007BFF; 
          }
          .page { 
            width: 21.59cm; 
            height: 27.94cm; 
            margin: 0; 
            padding: 1cm; 
            box-sizing: border-box; 
            display: flex; 
            justify-content: space-between; 
            page-break-after: always;
          }
          .page:last-child { page-break-after: auto; }
          .column { 
            width: 48%; 
            display: flex; 
            flex-direction: column; 
            justify-content: space-around; 
          }
          .card { 
            margin-bottom: 0.5cm; 
            border: 2px solid #007BFF; 
            padding: 0.3cm;
            background: #FFD700; 
          }
          .card h4 { 
            text-align: center; 
            margin: 0 0 0.2cm 0; 
            font-size: 12px; 
            font-weight: bold;
            color: #000; 
          }
          table { 
            width: 100%; 
            border-collapse: collapse; 
          }
          td { 
            width: 11.11%; 
            height: 0.8cm; 
            border: 1px solid #007BFF; 
            text-align: center; 
            vertical-align: middle; 
            font-size: 10px; 
            font-weight: bold; 
          }
          .number { background: #fff; color: #000; }
          .blank { 
            background: #fff; 
            ${selectedImage ? `background-image: url(${selectedImage}); background-size: contain; background-repeat: no-repeat; background-position: center; background-color: #f9f9f9;` : ''}
          }
        </style>
      </head>
      <body>
        ${pages.map(pageCards => {
          const leftCards = pageCards.slice(0, 6);
          const rightCards = pageCards.slice(6, 12);
          
          return `
            <div class="page">
              <div class="column">
                ${leftCards.map(card => `
                  <div class="card">
                    <h4>CARTÓN DE BINGO #${card.serialNumber}</h4>
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
              
              <div class="column">
                ${rightCards.map(card => `
                  <div class="card">
                    <h4>CARTÓN DE BINGO #${card.serialNumber}</h4>
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
            </div>
          `;
        }).join('')}
      </body>
      </html>
    `;

    const blob = new Blob([htmlContent], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `cartones-bingo-festival-${allCards.length}.html`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const renderCardPreview = (card: BingoCard) => (
    <div key={card.id} className="bg-white p-4 rounded-lg festival-border-fuchsia border-2">
      <h4 className="text-center text-black font-bold mb-2">
        Cartón #{card.serialNumber}
      </h4>
      <div className="text-center festival-text-fuchsia font-bold text-sm mb-3">
        Serie: {card.serialNumber}
      </div>
      <table className="w-full border-collapse">
        <tbody>
          {card.numbers.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {row.map((cell, cellIndex) => (
                <td
                  key={cellIndex}
                  className={`w-8 h-8 border border-gray-400 text-center text-xs font-bold ${
                    cell ? 'festival-bg-vibrant-yellow text-black' : 'bg-gray-100'
                  }`}
                  style={!cell && selectedImage ? { 
                    backgroundImage: `url(${selectedImage})`,
                    backgroundSize: 'contain',
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'center',
                    backgroundColor: '#f9f9f9'
                  } : {}}
                >
                  {cell ? cell.toString().padStart(2, '0') : ''}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  return (
    <div className="space-y-6">
      <Card className="festival-bg-electric-blue festival-border-fuchsia border-2 shadow-2xl">
        <div className="p-6">
          <h2 className="text-2xl font-bold festival-text-white mb-6 text-center">
            🎲 GENERADOR DE CARTONES 🎲
          </h2>
          
          <Tabs defaultValue="individual" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-6 festival-bg-vibrant-yellow">
              <TabsTrigger value="individual" className="text-black font-bold hover:festival-text-fuchsia">
                📄 Cartones Individuales
              </TabsTrigger>
              <TabsTrigger value="european" className="text-black font-bold hover:festival-text-fuchsia">
                🎯 Tiras Europeas
              </TabsTrigger>
            </TabsList>

            <TabsContent value="individual" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="numberOfCards" className="festival-text-white font-bold">
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
                    onClick={generateIndividualCards}
                    disabled={isGenerating}
                    className="w-full festival-bg-vibrant-yellow text-black font-bold hover:bg-yellow-400 py-3"
                  >
                    {isGenerating ? 'Generando...' : 'GENERAR CARTONES'}
                  </Button>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="european" className="space-y-6">
              <div className="festival-bg-vibrant-yellow p-4 rounded-lg mb-6">
                <h3 className="text-black font-bold mb-2">🎯 Tiras Europeas</h3>
                <p className="text-black text-sm">
                  Cada tira contiene 6 cartones con todos los números del 01-90 distribuidos sin repetición.
                  Perfectas para el bingo europeo tradicional.
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="numberOfStrips" className="festival-text-white font-bold">
                    Número de Tiras (máx. 10,000)
                  </Label>
                  <Input
                    id="numberOfStrips"
                    type="number"
                    min="1"
                    max="10000"
                    value={numberOfStrips}
                    onChange={(e) => setNumberOfStrips(parseInt(e.target.value) || 1)}
                    className="mt-2 bg-white text-black font-bold"
                  />
                  <p className="festival-text-lime text-xs mt-1">
                    Cada tira = 6 cartones ({numberOfStrips * 6} cartones en total)
                  </p>
                </div>
                
                <div className="flex items-end">
                  <Button
                    onClick={generateEuropeanStrips}
                    disabled={isGenerating}
                    className="w-full festival-bg-vibrant-yellow text-black font-bold hover:bg-yellow-400 py-3"
                  >
                    <Users className="mr-2" />
                    {isGenerating ? 'Generando...' : 'GENERAR TIRAS'}
                  </Button>
                </div>
              </div>
            </TabsContent>
          </Tabs>

          {(generatedCards.length > 0 || generatedStrips.length > 0) && (
            <div className="space-y-4 mt-8">
              <div className="flex flex-wrap gap-4 justify-center">
                <Button
                  onClick={exportToPDF}
                  className="festival-bg-vibrant-yellow text-black font-bold hover:bg-yellow-400"
                >
                  <FileText className="mr-2" />
                  Exportar a PDF
                </Button>
                
                <Button
                  onClick={exportToHTML}
                  className="festival-bg-vibrant-yellow text-black font-bold hover:bg-yellow-400"
                >
                  <Globe className="mr-2" />
                  Exportar a HTML
                </Button>
              </div>
              
              <div className="festival-bg-vibrant-yellow p-4 rounded-lg">
                <p className="text-black font-bold text-center">
                  ✅ {getAllCards().length} cartones generados exitosamente
                  {generatedStrips.length > 0 && ` en ${generatedStrips.length} tiras europeas`}
                  {selectedImage && ' 🖼️ con imagen personalizada'}
                </p>
              </div>

              <div className="mt-6">
                <h3 className="text-lg font-bold festival-text-white mb-4">
                  Vista Previa (Primeros 3 Cartones)
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {getAllCards().slice(0, 3).map(renderCardPreview)}
                </div>
              </div>
            </div>
          )}
        </div>
      </Card>

      {/* Sección de carga de imagen */}
      <ImageUploadSection 
        onImageSelect={setSelectedImage}
        selectedImage={selectedImage}
      />
    </div>
  );
};

export default BingoCardGenerator;
