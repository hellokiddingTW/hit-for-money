import React, { useEffect, useState } from "react";
import tw, { styled } from "twin.macro";
import CardHolder from "@/assets/card-holder-bg.svg?react";
import CardBorder from "@/assets/card-border.svg?react";
import GameCard, { CardStatus, CardString } from "@/components/game/GameCard";
import Icon from "@/components/ui/Icon";
import { GameState } from "@/constants/game";

interface ICardResultProps {
  isBet: boolean;
  gameState: string;
  roundCards: CardString[];
  onHandleGameState: (gameState: GameState) => void;
}

const Container = styled.div`
  ${tw`w-full h-full flex justify-around items-center`}
`;
const CardWrapper = styled.div`
  ${tw`w-[27%] h-[40%] relative`}
`;
const CardHolderIcon = styled(Icon)`
  ${tw` w-full h-full`}
`;
const StyledCard = styled(GameCard)`
  ${tw`absolute  top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2`}
`;

const ClickNotify = styled.div`
  ${tw`w-[90%] h-[3rem] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center bg-[rgba(0,0,0,.6)] text-white font-bold rounded-md cursor-pointer`}
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
`;

const GameResult = (props: ICardResultProps) => {
  const { isBet, roundCards, gameState, onHandleGameState } = props;
  const [resultCardStatus, setResultCardStatus] = useState("close");

  const [card1, card2, card3] = roundCards;

  const onClickOpenCard = () => {
    if (!isBet) return;
    setResultCardStatus("open");
    onHandleGameState("GAME_RESULT");
  };

  useEffect(() => {
    if (gameState === "GAME_START") {
      setResultCardStatus("close");
    }
  }, [gameState]);

  return (
    <Container>
      <CardWrapper>
        <CardHolderIcon width="100%" height="100%">
          <CardHolder />
        </CardHolderIcon>
        <StyledCard
          status="open"
          iconProps={{ width: "8rem", height: "auto" }}
          card={card1}
        />
      </CardWrapper>
      <CardWrapper onClick={onClickOpenCard}>
        <CardHolderIcon width="100%" height="100%">
          <CardBorder />
        </CardHolderIcon>
        <StyledCard
          status={resultCardStatus as CardStatus}
          iconProps={{ width: "8rem", height: "auto" }}
          card={card2}
        />
        {isBet && resultCardStatus === "close" && (
          <ClickNotify>點擊開牌</ClickNotify>
        )}
      </CardWrapper>
      <CardWrapper>
        <CardHolderIcon width="100%" height="100%">
          <CardHolder />
        </CardHolderIcon>
        <StyledCard
          status="open"
          iconProps={{ width: "8rem", height: "auto" }}
          card={card3}
        />
      </CardWrapper>
    </Container>
  );
};

export default GameResult;
