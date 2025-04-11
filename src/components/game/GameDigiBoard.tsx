import { Player } from "@/pages/InGame";
import React from "react";
import tw, { styled } from "twin.macro";

interface IDigiNumberBoardProps {
  betPoolAmount: number;
  currentPlayerInfo: Player;
}

const Container = styled.div`
  ${tw` w-full md:w-[90%] h-auto mt-[2rem] md:mt-[3.5rem]  p-3 md:p-5 bg-black space-y-2 rounded-xl`}
`;

const RowContainer = styled.div`
  ${tw`flex flex-col space-y-1 `}
`;

const Title = styled.div`
  ${tw` text-start text-[1.5rem] text-white font-bold`}
  font-family:'ozone';
`;

const Content = styled.div`
  ${tw`text-[red] bg-[rgba(255,255,255,.2)] font-erbos text-[2rem] rounded-sm`}
`;

const GameDigiBoard = (props: IDigiNumberBoardProps) => {
  const { betPoolAmount = 0, currentPlayerInfo } = props;
  const { playerName, balance } = currentPlayerInfo;

  const digiBoardConfig = [
    {
      title: "BET POOL",
      content: betPoolAmount,
    },
    {
      title: "NOW PLAYING",
      content: playerName,
    },
    {
      title: "BALANCE",
      content: balance,
    },
  ];

  return (
    <Container>
      {digiBoardConfig.map((item, index) => (
        <RowContainer key={index}>
          <Title>{item.title}</Title>
          <Content>{item.content}</Content>
        </RowContainer>
      ))}
    </Container>
  );
};

export default GameDigiBoard;
