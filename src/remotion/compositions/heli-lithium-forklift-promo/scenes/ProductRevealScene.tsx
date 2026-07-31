import { AbsoluteFill, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { Background } from "../components/Background";
import { CutoutImage } from "../components/CutoutImage";
import { fontFamily, palette } from "../theme";

export const ProductRevealScene: React.FC<{ productName: string }> = ({ productName }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const slide = spring({ frame, fps, config: { damping: 16, mass: 0.8 } });
  const imageOpacity = interpolate(frame, [0, 20], [0, 1], {
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
      <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", gap: 40 }}>
        <div
          style={{
            opacity: imageOpacity,
            transform: `translateX(${(1 - slide) * -120}px) scale(${0.85 + slide * 0.15})`,
          }}
        >
          <CutoutImage
            src={staticFile("remotion/heli-lithium-forklift-promo/lithium-forklift-hero.jpg")}
            filterId="product-reveal-cutout"
            style={{ width: 880, display: "block", filter: `url(#product-reveal-cutout) drop-shadow(0 40px 50px rgba(0,0,0,0.55))` }}
          />
        </div>
        <div style={{ fontSize: 72, fontWeight: 900, color: palette.white, fontFamily, minHeight: 90 }}>
          {shownName}
          <span style={{ opacity: cursorVisible ? 1 : 0, color: palette.red }}>|</span>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
