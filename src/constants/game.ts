import { CardString } from "@/components/game/GameCard";
import { Player } from "@/pages/InGame";

export type GameState = "GAME_START" | "GAME_BET" | "GAME_RESULT";

export type GameInfo = {
  playerCnt: number;
  baseBet: number;
  betPool: number;
  currentPlayerIdx: number;
  gameState: GameState;
  players: Player[];
  roundCards: CardString[];
};

export const  WinResult = {
  WIN: "WIN",
  LOSE: "LOSE",
  HIT: "HIT",
  SUPER_HIT: "SUPER_HIT",
} as const
