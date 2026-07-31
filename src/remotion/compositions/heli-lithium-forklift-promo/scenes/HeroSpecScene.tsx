import { AbsoluteFill, interpolate, Series, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { Background } from "../components/Background";
import { CountUp } from "../components/CountUp";
import { Icon } from "../components/Icon";
import type { HeroSpec } from "../content";
import { SCENES, fontFamily, palette } from "../theme";

const HeroSpecSlide: React.FC<{ spec: HeroSpec; durationInFrames: number }> = ({
  spec,
  durationInFrames,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const scale = spring({ frame, fps, config: { damping: 14 } });
  const opacity = interpolate(frame, [0, 15], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const exitOpacity = interpolate(frame, [durationInFrames - 15, durationInFrames], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", opacity: opacity * exitOpacity }}>
      <div
        style={{
          transform: `scale(${0.85 + scale * 0.15})`,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 20,
          padding: "0 70px",
          textAlign: "center",
        }}
      >
        <Icon name={spec.icon} size={70} color={palette.red} />
        <div style={{ fontSize: 30, fontWeight: 700, color: palette.gray, fontFamily }}>{spec.label}</div>
        <div style={{ fontSize: 140, fontWeight: 900, color: palette.white, fontFamily, lineHeight: 1 }}>
          <CountUp to={spec.value} suffix={spec.suffix} startFrame={10} durationInFrames={35} />
        </div>
        {spec.sublabel && <div style={{ fontSize: 24, color: palette.gray, fontFamily }}>{spec.sublabel}</div>}
      </div>
    </AbsoluteFill>
  );
};

export const HeroSpecScene: React.FC<{ specs: HeroSpec[] }> = ({ specs }) => {
  const each = Math.floor(SCENES.heroSpecs.duration / specs.length);

  return (
    <AbsoluteFill>
      <Background />
      <Series>
        {specs.map((spec) => (
          <Series.Sequence key={spec.label} durationInFrames={each}>
            <HeroSpecSlide spec={spec} durationInFrames={each} />
          </Series.Sequence>
        ))}
      </Series>
    </AbsoluteFill>
  );
};
