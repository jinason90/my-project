import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { Background } from "../components/Background";
import { bodyFont, displayFont } from "../fonts";

export const Intro: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  const titleSpring = spring({
    frame,
    fps,
    config: { damping: 12, stiffness: 170, mass: 0.7 },
  });
  const titleScale = interpolate(titleSpring, [0, 1], [0.7, 1]);
  const titleOpacity = interpolate(frame, [0, 15], [0, 1], {
    extrapolateRight: "clamp",
  });

  const subOpacity = interpolate(frame, [22, 38], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const subY = interpolate(frame, [22, 38], [24, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const fadeOut = interpolate(
    frame,
    [durationInFrames - 15, durationInFrames],
    [1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  return (
    <AbsoluteFill style={{ opacity: fadeOut }}>
      <Background color="#4DA3FF" />
      <AbsoluteFill
        style={{
          alignItems: "center",
          justifyContent: "center",
          padding: "0 80px",
        }}
      >
        <div
          style={{
            fontFamily: bodyFont,
            fontWeight: 700,
            fontSize: 30,
            color: "#8AA0C8",
            letterSpacing: 6,
            marginBottom: 28,
          }}
        >
          HELI KOREA · LITHIUM FORKLIFT
        </div>
        <div
          style={{
            fontFamily: displayFont,
            fontSize: 112,
            color: "#FFFFFF",
            textAlign: "center",
            lineHeight: 1.2,
            opacity: titleOpacity,
            transform: `scale(${titleScale})`,
          }}
        >
          헬리코리아
          <br />
          리튬 지게차
        </div>
        <div
          style={{
            fontFamily: displayFont,
            fontSize: 54,
            color: "#4DA3FF",
            marginTop: 44,
            opacity: subOpacity,
            transform: `translateY(${subY}px)`,
          }}
        >
          선택해야 할 6가지 이유
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
