export type Tip = {
  number: string;
  color: string;
  title: string;
  detail: string;
};

export const tips: Tip[] = [
  {
    number: "01",
    color: "#FF7A3D",
    title: "1시간 초급속 충전",
    detail: "80V / 202Ah · 배터리 잔량 30% 기준 완충",
  },
  {
    number: "02",
    color: "#2ED9A2",
    title: "5년 10,000시간 보증",
    detail: "선(先)도래 조건 배터리 보증",
  },
  {
    number: "03",
    color: "#4DA3FF",
    title: "엔진오일 · 필터 Zero",
    detail: "소모품 교체 없는 유지비 절감",
  },
  {
    number: "04",
    color: "#B98CFF",
    title: "저소음 실내 작업",
    detail: "소음 걱정 없이 실내에서도 OK",
  },
  {
    number: "05",
    color: "#3DDCE0",
    title: "에어컨 · 히터 장착",
    detail: "사계절 쾌적한 운전석",
  },
  {
    number: "06",
    color: "#FF4F81",
    title: "배터리 옵션 다양화",
    detail: "작업 환경 맞춤으로 비용까지 절약",
  },
];
