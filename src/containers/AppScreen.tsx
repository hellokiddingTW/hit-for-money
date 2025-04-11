import React, { useEffect, useState } from "react";
import tw, { styled } from "twin.macro";

interface IAppScreenProps {
  children: React.ReactNode;
}

const Container = styled.div<{ width?: string; height?: string }>`
  ${tw`bg-black`}
  width: ${(p) => p.width};
  height: ${(p) => p.height};
`;
const AppScreen = ({ children }: IAppScreenProps) => {
  const [appSize, setAppSize] = useState({
    appWidth: window.innerWidth,
    appHeight: window.innerHeight,
  });

  useEffect(() => {
    const handleResize = () => {
      const windowHeight = window.innerHeight;
      const newWidth = (windowHeight * 375) / 667;
      setAppSize({
        appWidth: newWidth,
        appHeight: windowHeight,
      });
      console.log(newWidth, windowHeight);
    };
    handleResize();

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <Container
      width={`${appSize.appWidth}px`}
      height={`${appSize.appHeight}px`}
    >
      {children}
    </Container>
  );
};

export default AppScreen;
