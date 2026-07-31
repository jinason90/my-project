import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import type { SpecIconName } from "../content";
import { fontFamily, palette } from "../theme";
import { Icon } from "./Icon";

export const SpecCard: React.FC<{ icon: SpecIconName; label: string; delay: number }> = ({
  icon,
  label,
  delay,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const entrance = spring({ frame: frame - delay, fps, config: { damping: 14, mass: 0.6 } });
  const opacity = interpolate(frame, [delay, delay + 10], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <div
      style={{
        opacity,
        transform: `translateY(${(1 - entrance) * 30}px) scale(${0.9 + entrance * 0.1})`,
        background: "rgba(255,255,255,0.05)",
        border: "1px solid rgba(255,255,255,0.12)",
        borderRadius: 24,
        padding: "28px 20px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 14,
        textAlign: "center",
      }}
    >
      <Icon name={icon} size={48} color={palette.red} />
      <div
        style={{
          fontSize: 26,
          fontWeight: 700,
          color: palette.white,
          lineHeight: 1.3,
          whiteSpace: "pre-line",
          fontFamily,
        }}
      >
        {label}
      </div>
    </div>
  );
};
