import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { Background } from "../components/Background";
import { HeliLogo } from "../components/HeliLogo";
import { fontFamily, palette } from "../theme";

export const OpeningScene: React.FC<{ brandSub: string; headline: string }> = ({
  brandSub,
  headline,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const logoScale = spring({ frame, fps, config: { damping: 12 } });
  const logoOpacity = interpolate(frame, [0, 15], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const headlineOpacity = interpolate(frame, [25, 50], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const headlineY = interpolate(frame, [25, 50], [20, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill>
      <Background />
      <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", gap: 60 }}>
        <div style={{ opacity: logoOpacity, transform: `scale(${0.7 + logoScale * 0.3})` }}>
          <HeliLogo sub={brandSub} />
        </div>
        <div
          style={{
            opacity: headlineOpacity,
            transform: `translateY(${headlineY}px)`,
            fontSize: 52,
            fontWeight: 800,
            color: palette.white,
            textAlign: "center",
            lineHeight: 1.4,
            whiteSpace: "pre-line",
            padding: "0 60px",
            fontFamily,
          }}
        >
          {headline}
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
