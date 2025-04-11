import { configResponsive, useResponsive } from 'ahooks';

// config as tailwind breakpoints
configResponsive({
  sm: 640,
  md: 768,
  '2md': 834,
  lg: 1024,
  xl: 1280,
  hxl: 1440,
  '2xl': 1536,
});

// wrap useResponsive with extra info
export default () => {
  const responsive = useResponsive();

  // breakpoints according to layout
  // > 1440
  const isLarge = responsive?.hxl;
  // > 1280 && < 1440
  const isMedium = responsive?.xl && !isLarge;
  // > 1280 && < 1024
  const isSmall = responsive.lg && !responsive.xl;
  // > 768 && < 1024
  const isIPad = responsive?.md && !responsive.lg;
  // < 768
  const isMobile = !responsive?.md;

  return {
    responsive,
    isMobile,
    isSmall,
    isMedium,
    isLarge,
    isIPad,
  };
};
