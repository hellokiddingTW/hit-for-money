import { useEffect, useState } from "react";
import tw, { styled } from "twin.macro";
// import GameBetPool from "@/components/game/GameBetPool";
import FootballPitch from "@/assets/football-pitch.jpg";
import GameResult from "@/components/game/GameResult";
import GameDigiBoard from "@/components/game/GameDigiBoard";
import useAppStore from "@/stores/appStore";
import WinLoseAnimation from "@/components/animation/WinLoseAnimation";
import GameBetControl from "@/components/game/GameBetControl";
import { useNavigate } from "react-router-dom";
import { useGameCards } from "@/hooks/useGame";
import { calcGameBetResult } from "@/utils/calcCards";
import localStorageUtil from "@/utils/localStorage";
import { GameInfo, GameState } from "@/constants/Game";

export type Player = {
  playerName: string;
  balance: number;
};

const Container = styled.div`
  ${tw`w-full h-full `}
`;

const InGameBg = styled.div`
  ${tw`w-full h-full relative overflow-hidden `}
  background:url(${FootballPitch});
  background-size: cover;
  background-position: center;
`;

const GameContainer = styled.div`
  ${tw`w-full h-full px-4 absolute top-0 left-0 flex flex-col space-y-4 justify-center items-center`}
  z-index:1;
`;

// const Mask = styled.div`
//   ${tw`absolute inset-0 bg-[#0E121E66] flex justify-center items-center`}
//   z-index:2;
// `;

// const defaultGameInfo: GameInfo = {
//   playerCnt: 0,
//   baseBet: 0,
//   betPool: 0,
//   currentPlayerIdx: 0,
//   gameState: "GAME_START",
//   players: [],
//   roundCards: [],
// };

const InGame = () => {
  const navitage = useNavigate();
  const { cards } = useGameCards();
  const storedSetting = localStorageUtil.get<GameInfo>("gameInfo");
  const [currentPlayer, setCurrentPlayer] = useState<Player>({} as Player);
  // const [isBet, setIsBet] = useState(false);
  const [betAmount, setBetAmount] = useState(0);
  const [gameState, setGameState] = useState("" as GameState);
  const [gameInfo, setGameInfo] = useState<GameInfo>({} as GameInfo);
  const [isLoading, setIsLoading] = useState(true);
  const isBet = betAmount !== 0;
  const isLastPlayer = gameInfo.currentPlayerIdx === gameInfo.playerCnt - 1;
  const gameInit = () => {
    if (storedSetting) {
      const { gameState, players, currentPlayerIdx } = storedSetting;
      const cp = players[currentPlayerIdx];
      setCurrentPlayer(cp as Player);
      setGameInfo({
        ...storedSetting,
      });
      setGameState(gameState);
      setIsLoading(false);
    } else navitage("/");
  };

  const updateCurrentPlayer = () => {
    const cp = gameInfo.players[gameInfo.currentPlayerIdx];
    setGameInfo((prev) => {
      return {
        ...prev,
        roundCards: cards,
      };
    });
    setBetAmount(0);
    setCurrentPlayer(cp as Player);
  };

  const handleGameState = (newGameState: GameState) => {
    setGameInfo((prev) => {
      return {
        ...prev,
        gameState: newGameState,
        currentPlayerIdx:
          newGameState !== "GAME_START"
            ? prev.currentPlayerIdx
            : isLastPlayer
            ? 0
            : prev.currentPlayerIdx + 1,
      };
    });
    setGameState(newGameState);
  };

  const handleWinLose = () => {
    if (betAmount === 0 || gameState !== "GAME_RESULT") return;
    const result = calcGameBetResult(gameInfo.roundCards);
    const betPoolChanges = {
      WIN: -betAmount,
      LOSE: betAmount,
      HIT: 2 * betAmount,
      SUPER_HIT: 3 * betAmount,
    };
    const winLoseAmt = betPoolChanges[result] || 0;
    setGameInfo((prev) => {
      return {
        ...prev,
        betPool: prev.betPool + winLoseAmt,
        players: prev.players.map((player, idx) =>
          idx === prev.currentPlayerIdx
            ? {
                ...player,
                balance: player.balance - winLoseAmt,
              }
            : player
        ),
      };
    });
    setCurrentPlayer((prev) => {
      return {
        ...prev,
        balance: prev.balance - winLoseAmt,
      };
    });
  };

  useEffect(() => {
    gameInit();
  }, []);

  useEffect(() => {
    localStorageUtil.set("gameInfo", gameInfo);
  }, [gameInfo]);

  useEffect(() => {
    handleWinLose();
    if (gameState === "GAME_START") {
      updateCurrentPlayer();

    }
  }, [betAmount, gameState]);

  return (
    <Container>
      <InGameBg>
        {isLoading ? (
          <div>is loading</div>
        ) : (
          <GameContainer>
            {/* <GameBetPool /> */}
            <GameDigiBoard
              betPoolAmount={gameInfo.betPool}
              currentPlayerInfo={currentPlayer}
            />

            <GameResult
              isBet={isBet}
              gameState={gameState}
              roundCards={gameInfo.roundCards}
              onHandleGameState={handleGameState}
            />
            <GameBetControl
              onHandleGameState={handleGameState}
              onConfirmBet={setBetAmount}
              roundCards={gameInfo.roundCards}
              betPoolAmount={gameInfo.betPool}
            />
            {gameState === "GAME_RESULT" && (
              <WinLoseAnimation onHandleGameState={handleGameState} />
            )}
          </GameContainer>
        )}
      </InGameBg>
    </Container>
  );
};

export default InGame;
