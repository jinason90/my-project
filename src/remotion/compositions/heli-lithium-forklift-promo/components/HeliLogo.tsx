import { fontFamily, palette } from "../theme";

export const HeliLogo: React.FC<{ name: string; sub: string; scale?: number }> = ({
  name,
  sub,
  scale = 1,
}) => (
  <div
    style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      transform: `scale(${scale})`,
    }}
  >
    <div
      style={{
        fontSize: 110,
        fontWeight: 900,
        color: palette.white,
        letterSpacing: 4,
        lineHeight: 1,
        fontFamily,
      }}
    >
      <span style={{ color: palette.red }}>{name.slice(0, 2)}</span>
      {name.slice(2)}
    </div>
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
