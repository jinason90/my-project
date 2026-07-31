import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { Background } from "../components/Background";
import { bodyFont, displayFont } from "../fonts";
import type { Tip } from "../data/tips";

export const TipScene: React.FC<{ tip: Tip; index: number; total: number }> = ({
  tip,
  index,
  total,
}) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  const numberSpring = spring({
    frame,
    fps,
    config: { damping: 10, stiffness: 190, mass: 0.6 },
  });
  const numberScale = interpolate(numberSpring, [0, 1], [0.3, 1]);
  const numberOpacity = interpolate(frame, [0, 8], [0, 1], {
    extrapolateRight: "clamp",
  });

  const barScale = interpolate(numberSpring, [0, 1], [0, 1]);

  const titleSpring = spring({
    frame: frame - 6,
    fps,
    config: { damping: 14, stiffness: 160, mass: 0.6 },
  });
  const titleX = interpolate(titleSpring, [0, 1], [-70, 0]);
  const titleOpacity = interpolate(frame, [6, 20], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const detailOpacity = interpolate(frame, [18, 32], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const detailY = interpolate(frame, [18, 32], [18, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const fadeOut = interpolate(
    frame,
    [durationInFrames - 14, durationInFrames],
    [1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  return (
    <AbsoluteFill style={{ opacity: fadeOut }}>
      <Background color={tip.color} />
      <AbsoluteFill
        style={{
          justifyContent: "center",
          padding: "0 88px",
        }}
      >
        <div
          style={{
            fontFamily: bodyFont,
            fontWeight: 700,
            fontSize: 32,
            color: tip.color,
            letterSpacing: 4,
          }}
        >
          HELI KOREA · TIP {index + 1}/{total}
        </div>
        <div
          style={{
            fontFamily: displayFont,
            fontSize: 250,
            lineHeight: 1,
            color: tip.color,
            opacity: numberOpacity,
            transform: `scale(${numberScale})`,
            transformOrigin: "left",
            marginTop: 16,
            textShadow: `0 0 70px ${tip.color}99`,
          }}
        >
          {tip.number}
        </div>
        <div
          style={{
            width: 128,
            height: 8,
            backgroundColor: tip.color,
            borderRadius: 4,
            marginTop: 8,
            marginBottom: 32,
            transform: `scaleX(${barScale})`,
            transformOrigin: "left",
          }}
        />
        <div
          style={{
            fontFamily: displayFont,
            fontSize: 74,
            color: "#FFFFFF",
            lineHeight: 1.2,
            opacity: titleOpacity,
            transform: `translateX(${titleX}px)`,
          }}
        >
          {tip.title}
        </div>
        <div
          style={{
            fontFamily: bodyFont,
            fontWeight: 500,
            fontSize: 36,
            color: "#C9CDD6",
            marginTop: 24,
            lineHeight: 1.5,
            opacity: detailOpacity,
            transform: `translateY(${detailY}px)`,
          }}
        >
          {tip.detail}
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
