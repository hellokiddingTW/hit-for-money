import { forwardRef } from "react";
import { css, styled } from "twin.macro";

export type UIProps = {
  size?: "md" | "xl" | "lg" | "sm" | "xs";
};

export interface IIconProps extends UIProps {
  id?: string;
  ref?: React.Ref<HTMLDivElement>;
  style?: React.CSSProperties;
  className?: string;
  wrapperWidth?: string;
  wrapperHeight?: string;
  width: string;
  height: string;
  /** svg color */
  color?: string;
  opacity?: number;
  stroke?: string;
  isOverflow?: boolean;
  isDisabled?: boolean;
  onClick?: React.MouseEventHandler;
  children?: React.ReactNode;
}

const StyledIcon = styled.div<IIconProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: ${(p) => p.wrapperWidth || p.width || "2rem"};
  height: ${(p) => p.wrapperHeight || p.height || "2rem"};
  min-width: ${(p) => p.wrapperWidth || p.width || "2rem"};
  min-height: ${(p) => p.wrapperHeight || p.height || "2rem"};
  cursor: ${(p) => (!p.isDisabled && p.onClick ? "pointer" : "inherit")};

  & svg,
  & img {
    width: ${(p) => p.width} !important;
    height: ${(p) => p.height} !important;
    ${(p) =>
      p.isOverflow &&
      css`
        min-width: ${p.width};
        min-height: ${p.height};
      `}
  }

  & > svg path {
    ${(p) => p.stroke && `stroke: ${p.stroke};`}
    ${(p) => p.color && `fill: ${p.color};`}
    ${(p) => p.opacity && `fill-opacity: ${p.opacity};`}
  }
`;

const Icon = forwardRef<HTMLDivElement, IIconProps>((props, ref) => {
  const { isDisabled, onClick } = props;

  const onClickIcon = (e: React.MouseEvent) => {
    if (isDisabled) return;
    onClick?.(e);
  };

  return <StyledIcon {...props} ref={ref} onClick={onClickIcon} />;
});

Icon.displayName = "Icon";

export default Icon;
