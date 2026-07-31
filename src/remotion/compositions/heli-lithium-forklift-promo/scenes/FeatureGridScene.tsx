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
      <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", gap: 40, padding: "0 60px" }}>
        <div style={{ opacity: titleOpacity, fontSize: 40, fontWeight: 700, color: palette.white, fontFamily }}>
          이런 것도 가능해요
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24, width: "100%" }}>
          {features.map((feature, i) => (
            <SpecCard key={feature.label} icon={feature.icon} label={feature.label} delay={20 + i * 12} />
          ))}
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
