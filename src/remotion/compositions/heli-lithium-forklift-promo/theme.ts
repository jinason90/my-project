export const palette = {
  red: "#C8102E",
  redDeep: "#7A0E1F",
  redGlow: "rgba(200,16,46,0.35)",
  black: "#060606",
  charcoal: "#141414",
  charcoalLight: "#1F1F1F",
  white: "#FFFFFF",
  gray: "#A8A8A8",
} as const;

export const fontFamily =
  "'Pretendard', 'Apple SD Gothic Neo', 'Malgun Gothic', 'Noto Sans KR', sans-serif";

export const FPS = 30;

export const SCENES = {
  opening: { from: 0, duration: 90 },
  problem: { from: 90, duration: 120 },
  product: { from: 210, duration: 150 },
  heroSpecs: { from: 360, duration: 150 },
  featureSpecs: { from: 510, duration: 240 },
  closing: { from: 750, duration: 150 },
} as const;

export const TOTAL_DURATION = 900;
