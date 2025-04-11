import React from "react";
import tw, { styled } from "twin.macro";
import DigiNumberBoard from "@/components/DigiNumberBoard";

const Container = styled.div`
  ${tw`w-full h-full`}
`;

const BetPoolContainer = styled.div`
  ${tw`absolute w-[70%] h-auto top-[5%] left-1/2 -translate-x-1/2  text-[2rem] text-white font-bold space-y-3`}
`;

const BetPoolTitle = styled.div`
  ${tw``}
`;

const BetPoolAmountWrapper = styled.div`
  ${tw`relative w-full`}
`;

const Text = styled.div`
  ${tw`font-erbos text-[2rem] text-black font-bold`}/* font-family:'Erbos Draco 1st Open NBP'; */
`;

const GameBetPool = () => {
  return (
    <Container>
      <BetPoolContainer>
        <BetPoolTitle>{"彩池總金額"}</BetPoolTitle>
        <Text className="font-erbosOpenNBP">aaabbbccc</Text>
        <BetPoolAmountWrapper>
          <DigiNumberBoard numbers={40} />
        </BetPoolAmountWrapper>
      </BetPoolContainer>
    </Container>
  );
};

export default GameBetPool;
