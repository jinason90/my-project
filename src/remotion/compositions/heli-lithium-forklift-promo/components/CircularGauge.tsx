import { interpolate, useCurrentFrame } from "remotion";
import { palette } from "../theme";

export const CircularGauge: React.FC<{
  size?: number;
  progress?: number;
  startFrame?: number;
  durationInFrames?: number;
  children: React.ReactNode;
}> = ({ size = 420, progress = 0.78, startFrame = 0, durationInFrames = 40, children }) => {
  const frame = useCurrentFrame();
  const radius = size / 2 - 14;
  const circumference = 2 * Math.PI * radius;
  const drawn = interpolate(frame, [startFrame, startFrame + durationInFrames], [0, progress], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <div style={{ position: "relative", width: size, height: size }}>
      <svg width={size} height={size} style={{ position: "absolute", inset: 0, transform: "rotate(-90deg)" }}>
        <circle cx={size / 2} cy={size / 2} r={radius} stroke="rgba(255,255,255,0.12)" strokeWidth={10} fill="none" />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={palette.red}
          strokeWidth={10}
          fill="none"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={circumference * (1 - drawn)}
        />
      </svg>
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {children}
      </div>
    </div>
  );
};
