import { staticFile } from "remotion";
import { CutoutImage } from "./CutoutImage";

/**
 * The AI-generated charging station photo has garbled placeholder text on
 * its screen readout and warning sticker (a known AI-image artifact). Since
 * the prop is shown large here, two "frosted glass" patches blur just those
 * regions via backdrop-filter, leaving the HELI wordmark and cabinet shape
 * sharp.
 */
export const ChargingStationProp: React.FC<{ width?: number }> = ({ width = 640 }) => {
  const height = width * (1920 / 2210);

  return (
    <div style={{ position: "relative", width, height }}>
      <CutoutImage
        src={staticFile("remotion/heli-lithium-forklift-promo/prop-charging-station.png")}
        filterId="charging-station-cutout"
        style={{ width, height, display: "block" }}
      />
      <div
        style={{
          position: "absolute",
          left: "2%",
          top: "15%",
          width: "60%",
          height: "25%",
          borderRadius: 12,
          backdropFilter: "blur(14px)",
          WebkitBackdropFilter: "blur(14px)",
          background: "rgba(20,20,20,0.15)",
        }}
      />
      <div
        style={{
          position: "absolute",
          left: "35%",
          top: "60%",
          width: "22%",
          height: "23%",
          borderRadius: 10,
          backdropFilter: "blur(14px)",
          WebkitBackdropFilter: "blur(14px)",
          background: "rgba(20,20,20,0.15)",
        }}
      />
    </div>
  );
};
