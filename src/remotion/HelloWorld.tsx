import { AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig } from "remotion";

export const HelloWorld: React.FC<{ titleText: string }> = ({ titleText }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const opacity = interpolate(frame, [0, fps], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "white",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <h1 style={{ opacity, fontSize: 80, fontFamily: "sans-serif" }}>
        {titleText}
      </h1>
    </AbsoluteFill>
  );
};
