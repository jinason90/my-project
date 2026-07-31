import { palette } from "../theme";

export const ForkliftSilhouette: React.FC<{ width?: number; height?: number }> = ({
  width = 480,
  height = 300,
}) => (
  <svg width={width} height={height} viewBox="0 0 420 260" fill="none">
    <rect x="40" y="10" width="10" height="200" fill={palette.charcoalLight} />
    <rect x="70" y="10" width="10" height="200" fill={palette.charcoalLight} />
    <rect x="40" y="40" width="40" height="8" fill={palette.red} />
    <rect x="40" y="90" width="40" height="8" fill={palette.red} />
    <rect x="30" y="150" width="60" height="14" fill={palette.gray} />
    <rect x="90" y="156" width="90" height="8" fill={palette.gray} />
    <rect x="90" y="180" width="90" height="8" fill={palette.gray} />
    <rect x="270" y="150" width="35" height="60" fill={palette.charcoalLight} />
    <rect x="80" y="140" width="220" height="70" rx="10" fill={palette.red} />
    <rect
      x="140"
      y="60"
      width="120"
      height="90"
      rx="14"
      fill={palette.charcoalLight}
      stroke={palette.white}
      strokeWidth={2}
    />
    <rect
      x="155"
      y="75"
      width="90"
      height="50"
      rx="6"
      fill="rgba(255,255,255,0.08)"
      stroke={palette.white}
      strokeWidth={1.5}
    />
    <circle cx="140" cy="215" r="30" fill={palette.black} stroke={palette.white} strokeWidth={3} />
    <circle cx="140" cy="215" r="10" fill={palette.gray} />
    <circle cx="260" cy="215" r="30" fill={palette.black} stroke={palette.white} strokeWidth={3} />
    <circle cx="260" cy="215" r="10" fill={palette.gray} />
  </svg>
);
