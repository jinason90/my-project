import { AbsoluteFill, useCurrentFrame } from "remotion";

export const Background: React.FC<{ color: string }> = ({ color }) => {
  const frame = useCurrentFrame();
  const pulse = Math.sin(frame / 20) * 0.06 + 0.94;

  return (
    <AbsoluteFill style={{ backgroundColor: "#08080C" }}>
      <AbsoluteFill
        style={{
          background: `radial-gradient(circle at 50% 32%, ${color}3d 0%, transparent 60%)`,
          transform: `scale(${pulse})`,
        }}
      />
      <AbsoluteFill
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.035) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.035) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
        }}
      />
    </AbsoluteFill>
  );
};
