import bg from "@/assets/gif/blg.gif";
import TitleImgPng from "@/assets/title.png";
import tw, { styled } from "twin.macro";
import SettingBoard from "@/components/SettingBoard";
import { useEffect } from "react";
import localStorageUtil from "@/utils/localStorage";
const Container = styled.div`
  ${tw`w-full h-full relative`}
  background: url(${bg});
  background-size: cover;
  background-position: center;
  &::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
  }
`;

const TitleImg = styled.img`
  ${tw`w-[50%] md:w-[70%]  absolute top-[3.5rem] md:top-[6.5rem] left-1/2 -translate-x-1/2 -translate-y-1/2`}
  z-index:1;
`;
const Home = () => {
  useEffect(() => {
    localStorageUtil.remove('gameInfo');
  }, []);

  return (
    <Container>
      <TitleImg src={TitleImgPng} />
      <SettingBoard />
    </Container>
  );
};

export default Home;
