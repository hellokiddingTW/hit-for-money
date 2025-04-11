import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import tw, { styled } from "twin.macro";
import { useNavigate } from "react-router-dom";
import localStorageUtil from "@/utils/localStorage";
import { useGameCards } from "@/hooks/useGame";

const Container = styled.div`
  ${tw`w-[75%] space-y-5 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[rgba(0, 0, 0,.7)] p-5 rounded-md`}
  z-index:1;
`;

const InputContainer = styled.div`
  ${tw`flex flex-col gap-3`}
`;

const CheckboxContainer = styled.div`
  ${tw`flex  space-x-2`}
`;

const CheckboxLabel = styled.label`
  ${tw`text-left`}
`;

const ButtonContainer = styled.div`
  ${tw`flex justify-center space-x-4`}
`;

const StyledButton = styled(Button)`
  ${tw`w-[50%] h-[2.5rem]`}
`;

const Title = styled.div`
  ${tw`text-[2rem] text-white font-bold`}
`;

const StyledForm = styled.form`
  ${tw`space-y-8`}
`;

const InValidateText = styled.span`
  ${tw`text-[red] text-[0.75rem] absolute bottom-[-1.4rem] left-0`}
`;

const InputWrapper = styled.div`
  ${tw`relative`}
`;

const SettingBoard = () => {
  const navigate = useNavigate();
  const { cards } = useGameCards();

  const labelStyle = `text-white text-left`;
  const [isValidation, setIsValidation] = useState({
    playerCnt: true,
    baseBet: true,
  });
  const [errorText, setErrorText] = useState({
    playerCnt: "",
    baseBet: "",
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const data = Object.fromEntries(fd.entries());
    const players = playerInit(Number(data.playerCnt), Number(data.baseBet));
    const gameSettingInit = {
      playerCnt: data.playerCnt,
      baseBet: data.baseBet,
      currentPlayerIdx: 0,
      betPool: Number(data.baseBet) * Number(data.playerCnt),
      gameState: "GAME_START",
      players: players,
      roundCards: cards,
    };

    localStorageUtil.set("gameInfo", gameSettingInit);

    navigate("/game");
  };

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (Number(value) > 8 && name === "playerCnt") {
      setIsValidation((prev) => ({ ...prev, [name]: false }));
      setErrorText((prev) => ({ ...prev, [name]: "最大人數上限8人" }));
      return;
    }
    if (Number(value) <= 0) {
      setIsValidation((prev) => ({ ...prev, [name]: false }));
      setErrorText((prev) => ({ ...prev, [name]: "不得為0或空白" }));
      return;
    }

    setIsValidation((prev) => ({
      ...prev,
      [name]: true,
    }));
  };

  const playerInit = (playerCnt: number, baseBet: number) => {
    const newPlayers = Array.from({ length: playerCnt }, (_, index) => ({
      playerName: `PLAYER${index + 1}`,
      balance: 0 - baseBet,
      bet: 0,
      playerId: index + 1,
    }));
    return newPlayers;
  };

  return (
    <Container>
      <StyledForm onSubmit={handleSubmit}>
        <Title>開桌設定</Title>
        <InputContainer>
          <Label className={labelStyle} htmlFor="playerCnt">
            玩家人數
          </Label>
          <InputWrapper>
            <Input
              className="text-white font-bold"
              name="playerCnt"
              id="playerCnt"
              type="number"
              max="8"
              min="1"
              defaultValue={2}
              onChange={handleOnChange}
            />
            {!isValidation.playerCnt && (
              <InValidateText>{errorText.playerCnt}</InValidateText>
            )}
          </InputWrapper>
        </InputContainer>
        <InputContainer>
          <Label className={labelStyle} htmlFor="baseBet">
            獎池基本金額
          </Label>
          <InputWrapper>
            <Input
              className="text-white font-bold"
              name="baseBet"
              id="baseBet"
              type="number"
              defaultValue={10}
              onChange={handleOnChange}
            />
            {!isValidation.baseBet && (
              <InValidateText>{errorText.baseBet}</InValidateText>
            )}
          </InputWrapper>
        </InputContainer>
        <CheckboxContainer>
          <Checkbox id="useSeven" name="useSeven" />
          <CheckboxLabel className="grid gap-1.5 leading-none">
            <Label
              htmlFor="useSeven"
              className="text-sm text-white font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Use 7 as Joker
            </Label>
            <p className="text-sm text-muted-foreground">
              You agree to our Terms of Service and Privacy Policy.
            </p>
          </CheckboxLabel>
        </CheckboxContainer>

        <ButtonContainer>
          <StyledButton
            disabled={!isValidation.baseBet || !isValidation.playerCnt}
          >
            {"確定"}
          </StyledButton>
        </ButtonContainer>
      </StyledForm>
    </Container>
  );
};

export default SettingBoard;
