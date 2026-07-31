import { AbsoluteFill, Img, staticFile } from "remotion";
import { palette } from "../theme";

export const Background: React.FC = () => (
  <AbsoluteFill>
    <Img
      src={staticFile("remotion/heli-lithium-forklift-promo/bg-studio.png")}
      style={{ width: "100%", height: "100%", objectFit: "cover" }}
    />
    <AbsoluteFill
      style={{
        background: `radial-gradient(circle at 50% 18%, ${palette.redGlow}, transparent 50%), linear-gradient(180deg, rgba(6,6,6,0.55) 0%, rgba(6,6,6,0.25) 35%, rgba(6,6,6,0.55) 75%, rgba(6,6,6,0.9) 100%)`,
      }}
    />
  </AbsoluteFill>
);
