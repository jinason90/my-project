import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { Background } from "../components/Background";
import { ForkliftSilhouette } from "../components/ForkliftSilhouette";
import { fontFamily, palette } from "../theme";

export const ProductRevealScene: React.FC<{ productName: string }> = ({ productName }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const slide = spring({ frame, fps, config: { damping: 16, mass: 0.8 } });
  const silhouetteOpacity = interpolate(frame, [0, 20], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const typingStart = 45;
  const perChar = 2.5;
  const chars = Math.floor(
    interpolate(frame, [typingStart, typingStart + productName.length * perChar], [0, productName.length], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    })
  );
  const shownName = productName.slice(0, chars);
  const cursorVisible = Math.floor(frame / 8) % 2 === 0 && chars < productName.length;

  return (
    <AbsoluteFill>
      <Background />
      <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", gap: 50 }}>
        <div
          style={{
            opacity: silhouetteOpacity,
            transform: `translateX(${(1 - slide) * -120}px) scale(${0.85 + slide * 0.15})`,
            filter: `drop-shadow(0 0 60px ${palette.redGlow})`,
          }}
        >
          <ForkliftSilhouette width={520} height={320} />
        </div>
        <div style={{ fontSize: 56, fontWeight: 900, color: palette.white, fontFamily, minHeight: 70 }}>
          {shownName}
          <span style={{ opacity: cursorVisible ? 1 : 0, color: palette.red }}>|</span>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
