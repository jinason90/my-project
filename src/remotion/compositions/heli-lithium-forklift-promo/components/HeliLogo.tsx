import { Img, staticFile } from "remotion";
import { fontFamily, palette } from "../theme";

export const HeliLogo: React.FC<{ sub: string; scale?: number; width?: number }> = ({
  sub,
  scale = 1,
  width = 420,
}) => (
  <div
    style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      transform: `scale(${scale})`,
    }}
  >
    <Img src={staticFile("remotion/heli-lithium-forklift-promo/heli-logo.png")} style={{ width }} />
    <div
      style={{
        marginTop: 10,
        fontSize: 30,
        fontWeight: 600,
        letterSpacing: 10,
        color: palette.gray,
        fontFamily,
      }}
    >
      {sub}
    </div>
  </div>
);
