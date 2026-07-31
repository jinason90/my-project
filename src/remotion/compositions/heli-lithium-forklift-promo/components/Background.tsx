import { AbsoluteFill } from "remotion";
import { palette } from "../theme";

export const Background: React.FC = () => (
  <AbsoluteFill
    style={{
      background: `radial-gradient(circle at 50% 20%, ${palette.redGlow}, transparent 55%), linear-gradient(180deg, ${palette.black} 0%, ${palette.charcoal} 60%, ${palette.black} 100%)`,
    }}
  >
    <AbsoluteFill
      style={{
        backgroundImage:
          "repeating-linear-gradient(115deg, rgba(255,255,255,0.03) 0px, rgba(255,255,255,0.03) 2px, transparent 2px, transparent 40px)",
      }}
    />
  </AbsoluteFill>
);
