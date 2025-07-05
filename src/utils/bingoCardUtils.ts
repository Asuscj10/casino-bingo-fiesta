
export interface BingoCard {
  id: number;
  numbers: (number | null)[][];
  seriesId?: number;
}

export interface EuropeanStrip {
  id: number;
  cards: BingoCard[];
  allNumbers: number[];
}

// Clase para evitar repeticiones entre cartones
class NumberTracker {
  private usedCombinations = new Set<string>();

  isUnique(numbers: (number | null)[][]): boolean {
    const nonNullNumbers = numbers.flat().filter(n => n !== null).sort().join(',');
    return !this.usedCombinations.has(nonNullNumbers);
  }

  addCombination(numbers: (number | null)[][]): void {
    const nonNullNumbers = numbers.flat().filter(n => n !== null).sort().join(',');
    this.usedCombinations.add(nonNullNumbers);
  }

  reset(): void {
    this.usedCombinations.clear();
  }
}

export const globalNumberTracker = new NumberTracker();

export const generateRandomCard = (cardId: number, seriesId?: number): BingoCard => {
  let attempts = 0;
  const maxAttempts = 1000;

  while (attempts < maxAttempts) {
    const card: (number | null)[][] = [];
    const usedNumbers = new Set<number>();
    
    for (let row = 0; row < 3; row++) {
      const cardRow: (number | null)[] = [];
      const numbersInThisRow = 5; // Exactly 5 numbers per row
      const blankPositions = new Set<number>();
      
      // Select 4 random positions for blanks (5 numbers, 4 blanks)
      while (blankPositions.size < 4) {
        blankPositions.add(Math.floor(Math.random() * 9));
      }
      
      for (let col = 0; col < 9; col++) {
        if (blankPositions.has(col)) {
          cardRow.push(null);
        } else {
          // Generate number based on column (European bingo style)
          const min = col * 10 + 1;
          const max = col === 8 ? 90 : (col + 1) * 10;
          
          let randomNumber;
          let attempts = 0;
          do {
            randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
            attempts++;
          } while (usedNumbers.has(randomNumber) && attempts < 100);
          
          if (attempts < 100) {
            usedNumbers.add(randomNumber);
            cardRow.push(randomNumber);
          } else {
            cardRow.push(null);
          }
        }
      }
      card.push(cardRow);
    }
    
    // Check if this combination is unique
    if (globalNumberTracker.isUnique(card)) {
      globalNumberTracker.addCombination(card);
      return { id: cardId, numbers: card, seriesId };
    }
    
    attempts++;
  }
  
  // Fallback: return a simple card if we can't generate a unique one
  console.warn(`Could not generate unique card after ${maxAttempts} attempts`);
  return generateSimpleCard(cardId, seriesId);
};

const generateSimpleCard = (cardId: number, seriesId?: number): BingoCard => {
  const card: (number | null)[][] = [];
  let numberCounter = 1;
  
  for (let row = 0; row < 3; row++) {
    const cardRow: (number | null)[] = [];
    for (let col = 0; col < 9; col++) {
      if (Math.random() > 0.55) { // ~45% chance of number
        cardRow.push(numberCounter <= 90 ? numberCounter++ : null);
      } else {
        cardRow.push(null);
      }
    }
    card.push(cardRow);
  }
  
  return { id: cardId, numbers: card, seriesId };
};

export const generateEuropeanStrip = (stripId: number): EuropeanStrip => {
  const cards: BingoCard[] = [];
  const allNumbers = Array.from({ length: 90 }, (_, i) => i + 1);
  const shuffledNumbers = [...allNumbers].sort(() => Math.random() - 0.5);
  
  // Distribute 90 numbers across 6 cards (15 numbers each)
  for (let cardIndex = 0; cardIndex < 6; cardIndex++) {
    const cardNumbers = shuffledNumbers.slice(cardIndex * 15, (cardIndex + 1) * 15);
    const card = createCardFromNumbers(cardNumbers, stripId * 6 + cardIndex + 1, stripId);
    cards.push(card);
  }
  
  return {
    id: stripId,
    cards,
    allNumbers
  };
};

const createCardFromNumbers = (numbers: number[], cardId: number, seriesId: number): BingoCard => {
  const card: (number | null)[][] = [];
  const numbersToPlace = [...numbers].sort((a, b) => a - b);
  let numberIndex = 0;
  
  for (let row = 0; row < 3; row++) {
    const cardRow: (number | null)[] = [];
    const numbersInRow = Math.min(5, numbersToPlace.length - numberIndex);
    const positions = Array.from({ length: 9 }, (_, i) => i);
    const selectedPositions = positions.sort(() => Math.random() - 0.5).slice(0, numbersInRow);
    
    for (let col = 0; col < 9; col++) {
      if (selectedPositions.includes(col) && numberIndex < numbersToPlace.length) {
        cardRow.push(numbersToPlace[numberIndex++]);
      } else {
        cardRow.push(null);
      }
    }
    card.push(cardRow);
  }
  
  globalNumberTracker.addCombination(card);
  return { id: cardId, numbers: card, seriesId };
};

export const resetNumberTracker = () => {
  globalNumberTracker.reset();
};
