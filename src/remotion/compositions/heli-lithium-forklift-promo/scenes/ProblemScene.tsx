import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { Background } from "../components/Background";
import { fontFamily, palette } from "../theme";

export const ProblemScene: React.FC<{ problems: string[] }> = ({ problems }) => {
  const frame = useCurrentFrame();
  const titleOpacity = interpolate(frame, [0, 15], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill>
      <Background />
      <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", gap: 36, padding: "0 80px" }}>
        <div style={{ opacity: titleOpacity, fontSize: 34, fontWeight: 700, color: palette.gray, fontFamily }}>
          기존 엔진 지게차는…
        </div>
        {problems.map((problem, i) => {
          const localStart = 15 + i * 30;
          const itemOpacity = interpolate(frame, [localStart, localStart + 12], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          });
          const itemX = interpolate(frame, [localStart, localStart + 12], [-40, 0], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          });
          const strike = interpolate(frame, [localStart + 16, localStart + 28], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          });
          const xOpacity = interpolate(frame, [localStart + 28, localStart + 34], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          });

          return (
            <div
              key={problem}
              style={{
                position: "relative",
                opacity: itemOpacity,
                transform: `translateX(${itemX}px)`,
                fontSize: 46,
                fontWeight: 800,
                color: palette.white,
                fontFamily,
              }}
            >
              {problem}
              <div
                style={{
                  position: "absolute",
                  left: 0,
                  top: "50%",
                  height: 4,
                  width: `${strike * 100}%`,
                  background: palette.red,
                  transform: "translateY(-50%)",
                }}
              />
              <svg
                width="36"
                height="36"
                viewBox="0 0 24 24"
                style={{
                  position: "absolute",
                  right: -50,
                  top: "50%",
                  transform: "translateY(-50%)",
                  opacity: xOpacity,
                }}
              >
                <line x1="4" y1="4" x2="20" y2="20" stroke={palette.red} strokeWidth={3} strokeLinecap="round" />
                <line x1="20" y1="4" x2="4" y2="20" stroke={palette.red} strokeWidth={3} strokeLinecap="round" />
              </svg>
            </div>
          );
        })}
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
