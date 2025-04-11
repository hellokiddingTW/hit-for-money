import React from "react";
import tw, { styled } from "twin.macro";
import DigiNumber from "@/components/ui/DigiNumber";

interface IDigiNumberBoardProps {
  numbers: number;
}

const Container = styled.div`
  ${tw`w-full flex justify-center items-center p-4 rounded-md h-[3.5rem] md:h-[4rem] bg-black relative`}
  &::after {
    content: "";
    position: absolute;
    top: 0.25rem;
    left: 0.25rem;
    width: calc(100% - 0.5rem);
    height: calc(100% - 0.5rem);
    background-color: rgba(256, 256, 256, 0.8);
  }
`;

const DigiNumberContainer = styled.div`
  ${tw`flex justify-center items-center bg-black space-x-2 absolute bg-black top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 `}
  width:calc(100% - 0.7rem);
  height: calc(100% - 0.7rem);
  z-index: 1;
`;

const DigiNumberBoard = (props: IDigiNumberBoardProps) => {
  const { numbers = 0 } = props;
  const numArr = Array.from(String(numbers));
  return (
    <Container>
      <DigiNumberContainer>
        {numArr.map((num, index) => (
          <DigiNumber key={index} digit={num} />
        ))}
      </DigiNumberContainer>
    </Container>
  );
};

export default DigiNumberBoard;
