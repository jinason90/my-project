import { AbsoluteFill, interpolate, Series, useCurrentFrame } from "remotion";
import { Background } from "../components/Background";
import { BracketText } from "../components/BracketText";
import { ChargingStationProp } from "../components/ChargingStationProp";
import { CircularGauge } from "../components/CircularGauge";
import { CountUp } from "../components/CountUp";
import { Icon } from "../components/Icon";
import type { HeroSpec } from "../content";
import { SCENES, fontFamily, palette } from "../theme";

const ChargeSlide: React.FC<{ spec: HeroSpec }> = ({ spec }) => {
  const frame = useCurrentFrame();
  const headerOpacity = interpolate(frame, [0, 15], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const propOpacity = interpolate(frame, [10, 28], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 30,
        padding: "0 60px",
        textAlign: "center",
      }}
    >
      <div style={{ opacity: headerOpacity, display: "flex", flexDirection: "column", gap: 6 }}>
        <div style={{ fontSize: 26, fontWeight: 700, color: palette.gray, fontFamily }}>{spec.label}</div>
        <BracketText text={`[[${spec.value}${spec.suffix}]]`} size={52} weight={900} />
      </div>
      <div style={{ opacity: propOpacity }}>
        <ChargingStationProp width={620} />
      </div>
      {spec.sublabel && (
        <div style={{ fontSize: 26, fontWeight: 500, color: palette.gray, fontFamily }}>{spec.sublabel}</div>
      )}
    </div>
  );
};

const DefaultSpecSlide: React.FC<{ spec: HeroSpec }> = ({ spec }) => (
  <div
    style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: 28,
      padding: "0 60px",
      textAlign: "center",
    }}
  >
    <div style={{ fontSize: 38, fontWeight: 800, color: palette.white, fontFamily }}>{spec.label}</div>
    <CircularGauge size={460} startFrame={8} durationInFrames={40}>
      <Icon name={spec.icon} size={54} color={palette.red} />
      <div style={{ fontSize: 128, fontWeight: 900, color: palette.white, fontFamily, lineHeight: 1, marginTop: 8 }}>
        <CountUp to={spec.value} suffix={spec.suffix} startFrame={10} durationInFrames={35} />
      </div>
    </CircularGauge>
    {spec.sublabel && (
      <div style={{ fontSize: 28, fontWeight: 500, color: palette.gray, fontFamily }}>{spec.sublabel}</div>
    )}
  </div>
);

const HeroSpecSlide: React.FC<{ spec: HeroSpec; durationInFrames: number }> = ({
  spec,
  durationInFrames,
}) => {
  const frame = useCurrentFrame();
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
      {spec.icon === "charge" ? <ChargeSlide spec={spec} /> : <DefaultSpecSlide spec={spec} />}
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
