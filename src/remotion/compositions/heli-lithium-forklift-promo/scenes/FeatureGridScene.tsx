import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { Background } from "../components/Background";
import { SpecCard } from "../components/SpecCard";
import type { FeatureSpec } from "../content";
import { fontFamily, palette } from "../theme";

export const FeatureGridScene: React.FC<{ features: FeatureSpec[] }> = ({ features }) => {
  const frame = useCurrentFrame();
  const titleOpacity = interpolate(frame, [0, 15], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill>
      <Background />
      <div
        style={{
          position: "absolute",
          top: 150,
          left: 0,
          right: 0,
          textAlign: "center",
          opacity: titleOpacity,
          fontSize: 30,
          fontWeight: 700,
          color: palette.white,
          fontFamily,
        }}
      >
        이런 것도 가능해요
      </div>
      <div
        style={{
          position: "absolute",
          top: 280,
          left: 0,
          right: 0,
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 20,
          padding: "0 60px",
        }}
      >
        {features.map((feature, i) => (
          <SpecCard key={feature.label} icon={feature.icon} label={feature.label} delay={20 + i * 12} />
        ))}
      </div>
    </AbsoluteFill>
  );
};
