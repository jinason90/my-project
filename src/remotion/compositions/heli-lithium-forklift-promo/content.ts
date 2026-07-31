export type SpecIconName =
  | "charge"
  | "warranty"
  | "maintenance"
  | "noise"
  | "climate"
  | "battery";

export type HeroSpec = {
  icon: SpecIconName;
  value: number;
  suffix: string;
  label: string;
  sublabel?: string;
};

export type FeatureSpec = {
  icon: SpecIconName;
  label: string;
};

export type HeliPromoProps = {
  brandSub: string;
  headlineKicker: string[];
  headlinePunch: string;
  problems: string[];
  productKicker: string;
  productHeadline: string;
  heroSpecs: HeroSpec[];
  featureSpecs: FeatureSpec[];
  ctaText: string;
  contact: string;
};

export const defaultHeliPromoProps: HeliPromoProps = {
  brandSub: "헬리코리아",
  headlineKicker: ["매연 없이 [[저공해]]로", "소음 없이 [[저소음]]으로"],
  headlinePunch: "친환경 지게차의 기준",
  problems: ["매연 배출", "소음 공해", "높은 연료비"],
  productKicker: "단 [[60분]] 급속충전",
  productHeadline: "충전 완료",
  heroSpecs: [
    {
      icon: "charge",
      value: 60,
      suffix: "분",
      label: "급속 충전",
      sublabel: "80V/202Ah · 배터리 잔량 30% 기준 완충",
    },
    {
      icon: "warranty",
      value: 5,
      suffix: "년",
      label: "배터리 보증",
      sublabel: "10,000시간 선도래분 보증",
    },
  ],
  featureSpecs: [
    { icon: "maintenance", label: "엔진오일·필터\n교체 불필요" },
    { icon: "noise", label: "저소음\n실내 작업 가능" },
    { icon: "climate", label: "에어컨·히터\n장착 가능" },
    { icon: "battery", label: "다양한 배터리 옵션\n환경에 맞춰 선택" },
  ],
  ctaText: "지금 헬리코리아에 문의하세요",
  contact: "www.helikorea.co.kr",
};
