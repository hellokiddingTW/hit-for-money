import { animated, useSprings, useSpring } from "@react-spring/web";
import Soccer from "@/assets/soccer.png";
// import WinBg from "@/assets/winBg.png";
import tw, { styled } from "twin.macro";
import useResponsive from "@/hooks/useResponsive";
import { useState } from "react";
import { GameState } from "@/constants/game";

const Container = styled.div`
  ${tw` absolute w-full h-[15%] bottom-[5%] left-1/2 -translate-x-1/2  flex flex-col justify-center items-center`}
  background:#000;
  z-index: 2;
  backdrop-filter: blur(10px); /* 模糊效果 */
  -webkit-backdrop-filter: blur(10px); /* 兼容 Safari */
`;

const Text = styled(animated.div)`
  ${tw`w-[3rem]  font-bold text-white font-impact`}
`;

const TextWrapper = styled.div`
  ${tw`w-full flex justify-center items-center space-x-2`}
`;

const Ball = styled(animated.img)`
  ${tw`absolute w-[4.25rem]`}
`;

const WinAmtBoard = styled.div`
  ${tw`w-full h-[15%] bottom-[5%] absolute bg-[rgba(0,0,0,.6)] flex items-center justify-center`}
`;

const ComfirmButton = styled.div`
  ${tw`w-[12rem] h-[4rem] bg-white rounded-xl  text-[2.5rem] font-impact font-bold cursor-pointer`}
`;

const WinAnimated = ({
  isWin,
  setShowWinAmtBoard,
}: {
  isWin: boolean;
  setShowWinAmtBoard: (isShow: boolean) => void;
}) => {
  const { isMobile } = useResponsive();
  const winLetter = ["G", " ", "A", "L"];
  const loseLetter = ["L", " ", "S", "E"];
  const letters = isWin ? winLetter : loseLetter;

  const [springs] = useSprings(
    letters.length,
    (i) => ({
      from: { rotate: 0, x: 0, fontSize: "0rem" },
      to: [
        {
          fontSize: isMobile ? "4rem" : "5.5rem",
          rotate: 720,
          x: 0,
          config: { duration: 500 + i * 150 },
        },
        { x: -500, fontSize: "0rem", config: { duration: 500 }, delay: 1200 },
      ],
      onRest: (result) => {
        if (
          i === letters.length - 1 &&
          result.value.x === -500 &&
          result.value.fontSize === "0rem"
        ) {
          setShowWinAmtBoard(true);
        }
      },
    }),
    []
  );

  const textAnimationTs = 1000 + 150 * 2;

  const [style] = useSpring(
    () => ({
      from: { x: 500, y: 200, rotate: 0 },
      to: [
        { x: -28, y: 8, rotate: 1080 },
        {
          x: -500,
          width: "0rem",
          config: { duration: 500 },
          delay: textAnimationTs,
        },
      ],
      config: { duration: 500 },
    }),
    []
  );

  return (
    <TextWrapper>
      {springs.map((style, index) => (
        <Text key={index} style={style}>
          {letters[index]}
        </Text>
      ))}

      <Ball style={style} src={Soccer} />
    </TextWrapper>
  );
};

const WinLoseAnimation = ({
  isWin,
  onHandleGameState,
}: {
  isWin: boolean;
  onHandleGameState: (gameState: GameState) => void;
}) => {
  const onClickComfirm = () => {
    onHandleGameState("GAME_START");
  };

  const [showWinAmtoard, setShowWinAmtBoard] = useState(false);
  return showWinAmtoard ? (
    <WinAmtBoard>
      <ComfirmButton onClick={onClickComfirm}>下面一位</ComfirmButton>
    </WinAmtBoard>
  ) : (
    <Container>
      <WinAnimated setShowWinAmtBoard={setShowWinAmtBoard} isWin={isWin} />
    </Container>
  );
};

export default WinLoseAnimation;
