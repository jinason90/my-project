// ─── 공통 타입 ───────────────────────────────────────────────
export type Product = 'lithium-forklift' | 'agv' | 'aerial-work' | 'hand-pallet'

export interface MetricCard {
  title: string
  value: string | number
  change: number // % 증감
  unit?: string
}

export interface ChartDataPoint {
  month: string
  value: number
  product?: Product
}
