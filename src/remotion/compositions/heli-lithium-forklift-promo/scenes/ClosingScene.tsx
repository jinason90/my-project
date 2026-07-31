import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { Background } from "../components/Background";
import { HeliLogo } from "../components/HeliLogo";
import { fontFamily, palette } from "../theme";

export const ClosingScene: React.FC<{
  brandSub: string;
  ctaText: string;
  contact: string;
  durationInFrames: number;
}> = ({ brandSub, ctaText, contact, durationInFrames }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const logoScale = spring({ frame, fps, config: { damping: 12 } });
  const ctaOpacity = interpolate(frame, [20, 45], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const contactOpacity = interpolate(frame, [45, 65], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const fadeOut = interpolate(frame, [durationInFrames - 25, durationInFrames], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill style={{ opacity: fadeOut }}>
      <Background />
      <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", gap: 44 }}>
        <div style={{ transform: `scale(${0.8 + logoScale * 0.2})` }}>
          <HeliLogo sub={brandSub} />
        </div>
        <div
          style={{
            opacity: ctaOpacity,
            fontSize: 42,
            fontWeight: 800,
            color: palette.white,
            textAlign: "center",
            padding: "0 60px",
            fontFamily,
          }}
        >
          {ctaText}
        </div>
        <div
          style={{
            opacity: contactOpacity,
            fontSize: 30,
            fontWeight: 600,
            color: palette.red,
            letterSpacing: 2,
            fontFamily,
          }}
        >
          {contact}
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
