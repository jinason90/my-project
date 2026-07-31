import { Easing, interpolate, useCurrentFrame } from "remotion";

export const CountUp: React.FC<{
  to: number;
  from?: number;
  startFrame?: number;
  durationInFrames?: number;
  suffix?: string;
}> = ({ to, from = 0, startFrame = 0, durationInFrames = 30, suffix = "" }) => {
  const frame = useCurrentFrame();
  const value = interpolate(frame, [startFrame, startFrame + durationInFrames], [from, to], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });

  return (
    <>
      {Math.round(value).toLocaleString("ko-KR")}
      {suffix}
    </>
  );
};
