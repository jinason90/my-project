import { AbsoluteFill, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { Background } from "../components/Background";
import { BracketText } from "../components/BracketText";
import { CutoutImage } from "../components/CutoutImage";
import { fontFamily, palette } from "../theme";

export const ProductRevealScene: React.FC<{ productKicker: string; productHeadline: string }> = ({
  productKicker,
  productHeadline,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const slide = spring({ frame, fps, config: { damping: 16, mass: 0.8 } });
  const imageOpacity = interpolate(frame, [0, 20], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const kickerOpacity = interpolate(frame, [0, 15], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const headlineOpacity = interpolate(frame, [18, 38], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const headlineScale = interpolate(frame, [18, 38], [0.9, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill>
      <Background />
      <div style={{ position: "absolute", top: 150, left: 0, right: 0, textAlign: "center", opacity: kickerOpacity }}>
        <BracketText text={productKicker} size={34} weight={700} />
      </div>
      <div
        style={{
          position: "absolute",
          top: 250,
          left: 0,
          right: 0,
          textAlign: "center",
          opacity: headlineOpacity,
          transform: `scale(${headlineScale})`,
          fontSize: 64,
          fontWeight: 900,
          color: palette.white,
          fontFamily,
        }}
      >
        {productHeadline}
      </div>
      <div
        style={{
          position: "absolute",
          bottom: 140,
          left: 0,
          right: 0,
          display: "flex",
          justifyContent: "center",
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
    </AbsoluteFill>
  );
};
