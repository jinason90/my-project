import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { Background } from "../components/Background";
import { bodyFont, displayFont } from "../fonts";

export const Outro: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const logoSpring = spring({
    frame,
    fps,
    config: { damping: 12, stiffness: 170, mass: 0.7 },
  });
  const logoScale = interpolate(logoSpring, [0, 1], [0.6, 1]);
  const logoOpacity = interpolate(frame, [0, 15], [0, 1], {
    extrapolateRight: "clamp",
  });

  const ctaOpacity = interpolate(frame, [26, 42], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const ctaScale = interpolate(frame, [26, 42], [0.85, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill>
      <Background color="#2ED9A2" />
      <AbsoluteFill
        style={{
          alignItems: "center",
          justifyContent: "center",
          padding: "0 80px",
        }}
      >
        <div
          style={{
            fontFamily: displayFont,
            fontSize: 92,
            color: "#FFFFFF",
            opacity: logoOpacity,
            transform: `scale(${logoScale})`,
            textAlign: "center",
          }}
        >
          헬리코리아
        </div>
        <div
          style={{
            fontFamily: bodyFont,
            fontWeight: 600,
            fontSize: 34,
            color: "#C9CDD6",
            marginTop: 18,
            opacity: logoOpacity,
            textAlign: "center",
          }}
        >
          리튬 지게차로 작업 효율을 높이세요
        </div>
        <div
          style={{
            marginTop: 56,
            padding: "22px 56px",
            borderRadius: 999,
            backgroundColor: "#2ED9A2",
            opacity: ctaOpacity,
            transform: `scale(${ctaScale})`,
          }}
        >
          <span
            style={{ fontFamily: displayFont, fontSize: 40, color: "#08080C" }}
          >
            지금 문의하기
          </span>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
