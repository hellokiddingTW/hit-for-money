import { CardString } from "@/components/game/GameCard";

export const calcCardPoints = (cards: CardString[]) => {
  return cards.map((card) => {
    const [, y] = card.split("");
    return parseInt(y, 16);
  });
};

export const calcGameBetResult = (cards: CardString[], choice?: string) => {
  const [p1, p2, p3] = calcCardPoints(cards);
  if (p1 !== p3) {
    const min = Math.min(p1, p3);
    const max = Math.max(p1, p3);

    if (p2 > min && p2 < max) {
      return "WIN";
    } else if (p2 === p1 || p2 === p3) {
      return "HIT";
    } else {
      return "LOSE";
    }
  }
  // 兩張門柱牌相同的情況
  else {
    if (p2 === p1) {
      return "SUPER_HIT"; // 撞柱，3 倍
    } else if (choice === "high" && p2 > p1) {
      return "WIN"; // 選 High 且射中
    } else if (choice === "low" && p2 < p1) {
      return "WIN"; // 選 Low 且射中
    } else {
      return "LOSE"; // 不符合選擇
    }
  }
};
