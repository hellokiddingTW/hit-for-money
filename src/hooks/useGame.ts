import { CardString, cardStrings } from "@/components/game/GameCard";
import { useEffect, useState } from "react";

export const useGameCards = () => {
  // const [cards, setCards] = useState<CardString[]>([]);
  const drawThreeCards = (): CardString[] => {
    const deck = [...cardStrings];
    const drawnCards: CardString[] = [];

    for (let i = 0; i < 3; i++) {
      const randomIndex = Math.floor(Math.random() * deck.length);
      drawnCards.push(deck[randomIndex]);
      deck.splice(randomIndex, 1);
    }

    return drawnCards;
  };

  const cards = drawThreeCards();

  return { cards };
};
