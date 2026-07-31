import type { SpecIconName } from "../content";
import { palette } from "../theme";

export const Icon: React.FC<{ name: SpecIconName; size?: number; color?: string }> = ({
  name,
  size = 56,
  color = palette.white,
}) => {
  const common = {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: color,
    strokeWidth: 1.6,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };

  switch (name) {
    case "charge":
      return (
        <svg {...common}>
          <path d="M13 2 3 14h7l-1 8 10-12h-7l1-8Z" fill={color} stroke="none" />
        </svg>
      );
    case "warranty":
      return (
        <svg {...common}>
          <path d="M12 2 4 5v6c0 5 3.4 9 8 11 4.6-2 8-6 8-11V5l-8-3Z" />
          <path d="m9 12 2 2 4-4" />
        </svg>
      );
    case "maintenance":
      return (
        <svg {...common}>
          <path d="M14.7 6.3a4 4 0 0 1-5.4 5.4L4 17l3 3 5.3-5.3a4 4 0 0 1 5.4-5.4L21 6l-3-3-3.3 3.3Z" />
          <line x1="3" y1="21" x2="7" y2="17" />
        </svg>
      );
    case "noise":
      return (
        <svg {...common}>
          <polygon points="4,9 8,9 13,4 13,20 8,15 4,15" fill={color} stroke="none" />
          <line x1="16" y1="9" x2="21" y2="15" />
          <line x1="21" y1="9" x2="16" y2="15" />
        </svg>
      );
    case "climate":
      return (
        <svg {...common}>
          <line x1="12" y1="2" x2="12" y2="22" />
          <line x1="4.5" y1="6" x2="19.5" y2="18" />
          <line x1="19.5" y1="6" x2="4.5" y2="18" />
        </svg>
      );
    case "battery":
      return (
        <svg {...common}>
          <rect x="2" y="7" width="18" height="10" rx="2" />
          <line x1="22" y1="10" x2="22" y2="14" />
          <rect x="5" y="9.5" width="6" height="5" fill={color} stroke="none" />
        </svg>
      );
    default:
      return null;
  }
};
