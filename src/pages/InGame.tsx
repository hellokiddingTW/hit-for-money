import { useEffect, useMemo, useState } from "react";
import tw, { styled } from "twin.macro";
// import GameBetPool from "@/components/game/GameBetPool";
import FootballPitch from "@/assets/football-pitch.jpg";
import GameResult from "@/components/game/GameResult";
import GameDigiBoard from "@/components/game/GameDigiBoard";
import WinLoseAnimation from "@/components/animation/WinLoseAnimation";
import GameBetControl from "@/components/game/GameBetControl";
import { useNavigate } from "react-router-dom";
import { useGameCards } from "@/hooks/useGame";
import { calcGameBetResult } from "@/utils/calcCards";
import localStorageUtil from "@/utils/localStorage";
import { GameInfo, GameState } from "@/constants/game";
import { WinResult } from "@/constants/game";

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
  const navigate = useNavigate();
  const storedSetting = localStorageUtil.get<GameInfo>("gameInfo");
  const [betAmount, setBetAmount] = useState(0);
  const [gameState, setGameState] = useState("" as GameState);
  const [gameInfo, setGameInfo] = useState<GameInfo>({} as GameInfo);
  const [isLoading, setIsLoading] = useState(true);
  const [isUpdownMode, setUpdownMode] = useState(false);
  const [playerSelected, setPlayerSelected] = useState("");
  const [isWin, setIsWin] = useState(false);
  const { cards, upDownMode } = useGameCards();
  const isBet = betAmount !== 0;
  const isLastPlayer = gameInfo.currentPlayerIdx === gameInfo.playerCnt - 1;
  const currentPlayerIdx = gameInfo.currentPlayerIdx ?? 0;

  const currentPlayer = useMemo(() => {
    return gameInfo.players?.[currentPlayerIdx] ?? ({} as Player);
  }, [gameInfo.players, currentPlayerIdx]);

  const gameInit = () => {
    if (storedSetting) {
      setGameInfo(storedSetting);
      setGameState(storedSetting.gameState);
      setIsLoading(false);
    } else {
      navigate("/");
    }
  };

  const updateGameInfo = (partial: Partial<GameInfo>) => {
    setGameInfo((prev) => ({
      ...prev,
      ...partial,
    }));
  };

  const updateNewRound = () => {
    updateGameInfo({
      roundCards: cards,
    });
    setBetAmount(0);
    setUpdownMode(upDownMode);
  };

  const updateCurrentIdx = () => {
    const nextIdx = isLastPlayer ? 0 : gameInfo.currentPlayerIdx + 1;
    updateGameInfo({ currentPlayerIdx: nextIdx });
  };

  const handleGameState = (newGameState: GameState) => {
    updateGameInfo({ gameState: newGameState });
    setGameState(newGameState);
    if (newGameState === "GAME_START") {
      updateCurrentIdx();
    }
  };

  const handleWinLose = () => {
    if (betAmount === 0 || gameState !== "GAME_RESULT") return;

    const result = calcGameBetResult(gameInfo.roundCards, playerSelected);
    const betPoolChanges = {
      WIN: -betAmount,
      LOSE: betAmount,
      HIT: 2 * betAmount,
      SUPER_HIT: 3 * betAmount,
    };

    const winLoseAmt = betPoolChanges[result] || 0;
    setIsWin(result === WinResult.WIN);

    const updatedPlayers = gameInfo.players.map((player, idx) =>
      idx === gameInfo.currentPlayerIdx
        ? { ...player, balance: player.balance - winLoseAmt }
        : player
    );

    updateGameInfo({
      betPool: gameInfo.betPool + winLoseAmt,
      players: updatedPlayers,
    });
  };

  console.log(`upDownMode`, upDownMode, cards);

  useEffect(() => {
    gameInit();
  }, []);

  useEffect(() => {
    localStorageUtil.set("gameInfo", gameInfo);
  }, [gameInfo]);

  useEffect(() => {
    handleWinLose();
    if (gameState === "GAME_START") {
      updateNewRound();
    }
  }, [betAmount, gameState, currentPlayerIdx]);

  return (
    <Container>
      <InGameBg>
        {isLoading ? (
          <div>is loading</div>
        ) : (
          <GameContainer>
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
              isBet={isBet}
              isUpDownMode={isUpdownMode}
              betPoolAmount={gameInfo.betPool}
              onHandleGameState={handleGameState}
              onSelectUpDown={setPlayerSelected}
              onConfirmBet={setBetAmount}
              onClickPass={updateCurrentIdx}
            />
            {gameState === "GAME_RESULT" && (
              <WinLoseAnimation
                onHandleGameState={handleGameState}
                isWin={isWin}
              />
            )}
          </GameContainer>
        )}
      </InGameBg>
    </Container>
  );
};

export default InGame;
