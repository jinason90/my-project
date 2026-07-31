import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { Background } from "../components/Background";
import { BracketText } from "../components/BracketText";
import { HeliLogo } from "../components/HeliLogo";
import { fontFamily, palette } from "../theme";

export const OpeningScene: React.FC<{
  brandSub: string;
  headlineKicker: string[];
  headlinePunch: string;
}> = ({ brandSub, headlineKicker, headlinePunch }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const logoScale = spring({ frame, fps, config: { damping: 12 } });
  const logoOpacity = interpolate(frame, [0, 15], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const kickerOpacity = interpolate(frame, [22, 42], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const kickerY = interpolate(frame, [22, 42], [16, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const punchOpacity = interpolate(frame, [45, 68], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const punchScale = interpolate(frame, [45, 68], [0.92, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill>
      <Background />
      <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", gap: 56, padding: "0 64px" }}>
        <div style={{ opacity: logoOpacity, transform: `scale(${0.7 + logoScale * 0.3})` }}>
          <HeliLogo sub={brandSub} />
        </div>
        <div
          style={{
            opacity: kickerOpacity,
            transform: `translateY(${kickerY}px)`,
            display: "flex",
            flexDirection: "column",
            gap: 10,
            textAlign: "center",
          }}
        >
          {headlineKicker.map((line) => (
            <BracketText key={line} text={line} size={44} weight={700} />
          ))}
        </div>
        <div
          style={{
            opacity: punchOpacity,
            transform: `scale(${punchScale})`,
            fontSize: 86,
            fontWeight: 900,
            color: palette.white,
            textAlign: "center",
            lineHeight: 1.25,
            fontFamily,
          }}
        >
          {headlinePunch}
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
