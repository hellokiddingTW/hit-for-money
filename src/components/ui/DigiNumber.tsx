import tw, { styled } from "twin.macro";

// 七段顯示器樣式
const Digit = styled.div`
  ${tw`relative w-4 h-8 inline-block mx-0.5`}/* 縮小為 16px 寬 x 32px 高 */
`;

const Segment = styled.div<{ isActive: boolean }>`
  ${tw`absolute bg-red-500 opacity-20`} /* 預設關閉狀態 */
  ${(props) => props.isActive && tw`opacity-100`} /* 點亮狀態 */
  transition: opacity 0.2s;
`;

const SegmentA = styled(Segment)`
  ${tw`top-[0.125rem] left-1 w-2 h-0.5`}/* 頂部線段：8px 寬 x 2px 高 */
`;
const SegmentB = styled(Segment)`
  ${tw`top-1 right-0 w-0.5 h-3`}/* 右上線段：2px 寬 x 12px 高 */
`;
const SegmentC = styled(Segment)`
  ${tw`bottom-1 right-0 w-0.5 h-3`}/* 右下線段：2px 寬 x 12px 高 */
`;
const SegmentD = styled(Segment)`
  ${tw`bottom-[0.125rem] left-1 w-2 h-0.5`}/* 底部線段：8px 寬 x 2px 高 */
`;
const SegmentE = styled(Segment)`
  ${tw`bottom-1 left-0 w-0.5 h-3`}/* 左下線段：2px 寬 x 12px 高 */
`;
const SegmentF = styled(Segment)`
  ${tw`top-1 left-0 w-0.5 h-3`}/* 左上線段：2px 寬 x 12px 高 */
`;
const SegmentG = styled(Segment)`
  ${tw`top-4 left-1 w-2 h-0.5`}/* 中間線段：8px 寬 x 2px 高 */
`;

const segmentMap: { [key: string]: boolean[] } = {
  "0": [true, true, true, true, true, true, false], // a, b, c, d, e, f, g
  "1": [false, true, true, false, false, false, false],
  "2": [true, true, false, true, true, false, true],
  "3": [true, true, true, true, false, false, true],
  "4": [false, true, true, false, false, true, true],
  "5": [true, false, true, true, false, true, true],
  "6": [true, false, true, true, true, true, true],
  "7": [true, true, true, false, false, false, false],
  "8": [true, true, true, true, true, true, true],
  "9": [true, true, true, true, false, true, true],
};
const DigiNumber = ({ digit }: { digit: string }) => {
  const segments = segmentMap[digit] ?? segmentMap["0"];

  console.log(digit);
  return (
    <Digit>
      <SegmentA isActive={segments[0]} />
      <SegmentB isActive={segments[1]} />
      <SegmentC isActive={segments[2]} />
      <SegmentD isActive={segments[3]} />
      <SegmentE isActive={segments[4]} />
      <SegmentF isActive={segments[5]} />
      <SegmentG isActive={segments[6]} />
    </Digit>
  );
};

export default DigiNumber;
