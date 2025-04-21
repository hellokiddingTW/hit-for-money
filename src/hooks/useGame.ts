import { CardString, cardStrings } from "@/components/game/GameCard";
import { calcCardPoints } from "@/utils/calcCards";

export const useGameCards = () => {
  // const [cards, setCards] = useState<CardString[]>([]);
  // const [upDownMode, setUpDownMode] = useState<boolean>(false);
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

  const upDownMode = () => {
    const [p1, , p3] = calcCardPoints(cards);
    return p1 === p3;
  };

  return { cards, upDownMode: upDownMode() };
};


