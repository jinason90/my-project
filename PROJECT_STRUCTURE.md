# helikorea-marketing-dashboard

## Stack
- Next.js 16 (App Router)
- TypeScript 5
- Tailwind CSS 4
- recharts 3
- googleapis 172
- @radix-ui/colors 3

## 디렉토리 구조
```
src/
├── app/                   # App Router 라우팅
│   ├── layout.tsx
│   ├── page.tsx
│   └── globals.css
├── components/
│   ├── ui/                # 공통 UI 컴포넌트 (Button, Card 등)
│   └── charts/            # recharts 래핑 컴포넌트
├── lib/
│   └── utils.ts           # cn(), formatNumber(), formatPercent()
└── types/
    └── index.ts           # 공통 타입 정의
```

## 다음 단계 제안
1. `src/app/dashboard/page.tsx` — 메인 대시보드 페이지
2. `src/lib/google.ts` — Google Analytics / Search Console API 연결
3. `src/components/charts/LeadChart.tsx` — 리드 추이 차트
