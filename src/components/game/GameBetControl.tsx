import { useEffect, useState } from "react";
import tw, { styled } from "twin.macro";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import useAppStore from "@/stores/appStore";
import { calcGameBetResult } from "@/utils/calcCards";
import { CardString } from "@/components/game/GameCard";
import { GameState } from "@/constants/Game";

interface GameBetControlProps {
  roundCards: CardString[];
  betPoolAmount: number;
  onConfirmBet: (betAmount: number) => void;
  onHandleGameState: (gameState: GameState) => void;
}

const Container = styled.div`
  ${tw`w-full h-full`}
`;

const ButtonWrapper = styled.div`
  ${tw`flex items-center justify-center space-x-4`}
`;

const BetContainer = styled.div`
  ${tw` w-full min-h-[30%] p-6 space-y-8 flex flex-col items-center animate-slide-in-up bg-[rgba(0,0,0,.6)] rounded-t-[2rem] absolute left-0 bottom-0`}
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
`;

const ComffirmButton = styled(Button)`
  ${tw`w-[12rem] h-[4rem] text-[2.5rem] font-impact font-bold`}
`;

const BadgeContainer = styled.div`
  ${tw`flex items-center justify-center space-x-2`}
`;

const StyledBadge = styled(Badge)`
  ${tw`bg-white font-bold  cursor-pointer`}
`;

const StyledLabel = styled(Label)`
  ${tw`text-white font-bold text-[1.5rem] `}
`;

const StyledInput = styled(Input)`
  ${tw`text-white w-[75%]`}
`;

const InvalidateText = styled.div`
  ${tw`
  text-[red] text-[.75rem] !mt-3 absolute left-[16%] top-[60%] font-bold
`}
`;

const GameBetControl = (props: GameBetControlProps) => {
  const { betPoolAmount, onConfirmBet, onHandleGameState } = props;
  const [isShowBetBoard, setIsShowBetBoard] = useState(false);
  const [betValue, setBetValue] = useState<number>(0);
  const [isMaxBet, setIsMaxBet] = useState(false);

  const betAmount = [10, 50, 100, 500, 1000, "All", "Clear"];

  const handleShoot = () => {
    setIsShowBetBoard(true);
    onHandleGameState("GAME_BET");
  };

  const handleClickBadge = (amt: string | number) => {
    if (amt === "All") {
      setBetValue(betPoolAmount);
      return;
    }
    if (amt === "Clear") {
      setBetValue(0);
      return;
    }

    return setBetValue((prev) => {
      return prev + Number(amt);
    });
  };

  const handleCancel = () => {
    setIsShowBetBoard(false);
  };

  const handleConfirmBet = () => {
    onConfirmBet(betValue);
    setIsShowBetBoard(false);
    setBetValue(0);
  };

  useEffect(() => {
    if (betValue > betPoolAmount) {
      setIsMaxBet(true);
      return;
    }
    setIsMaxBet(false);
  }, [betValue]);

  return (
    <Container>
      <ButtonWrapper>
        <ComffirmButton>PASS</ComffirmButton>
        <ComffirmButton onClick={handleShoot}>SHOOT</ComffirmButton>
      </ButtonWrapper>
      {isShowBetBoard && (
        <BetContainer>
          <StyledLabel>請輸入下注金額</StyledLabel>
          <BadgeContainer>
            {betAmount.map((amt) => (
              <StyledBadge
                onClick={() => handleClickBadge(amt)}
                className={
                  amt === "All"
                    ? "text-[#D9B300]"
                    : amt === "Clear"
                    ? "text-[red]"
                    : "text-black"
                }
                key={amt}
              >
                {amt}
              </StyledBadge>
            ))}
          </BadgeContainer>

          <StyledInput
            onChange={(e) => setBetValue(Number(e.target.value))}
            value={betValue}
            type="tel"
          />
          {isMaxBet && <InvalidateText>下注超過彩池金額</InvalidateText>}
          <ButtonWrapper>
            <Button onClick={handleCancel}>取消</Button>
            <Button
              disabled={isMaxBet || betValue === 0}
              onClick={handleConfirmBet}
            >
              確定
            </Button>
          </ButtonWrapper>
        </BetContainer>
      )}
    </Container>
  );
};

export default GameBetControl;
