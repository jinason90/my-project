import { getAdData, getAllWeeks, AdRow } from '@/lib/sheets'
import KpiCard from '@/components/ui/KpiCard'
import TrendChart from '@/components/charts/TrendChart'
import DetailTable from '@/components/ui/DetailTable'
import WeekComment from '@/components/ui/WeekComment'
import WeekSelector from '@/components/ui/WeekSelector'
import PageShell from '@/components/layout/PageShell'
import SectionBlock from '@/components/layout/SectionBlock'

export const revalidate = 3600

export default async function AdsPage({
  searchParams,
}: {
  searchParams: Promise<{ week?: string }>
}) {
  const { week } = await searchParams
  const results = await Promise.allSettled([
    getAdData(), getAllWeeks('광고'),
  ])
  const rows  = results[0].status === 'fulfilled' ? results[0].value : []
  const weeks = results[1].status === 'fulfilled' ? results[1].value : []

  const reversedWeeks = [...weeks].reverse()
  const selectedWeek = week ?? reversedWeeks[0] ?? (rows[rows.length - 1]?.주차 ?? '')
  const latest = rows.find((r: AdRow) => r.주차 === selectedWeek) ?? rows[rows.length - 1]
  const last9 = rows.slice(-9)
  const comment = latest?.코멘트 ?? ''

  const trendData = last9.map((r: AdRow) => ({ 주차: r.주차, '노출수': r.노출수, '클릭수': r.클릭수 }))

  return (
    <PageShell
      title="광고" accent="#E31837"
      weekSelector={reversedWeeks.length > 0 ? <WeekSelector weeks={reversedWeeks} selected={selectedWeek} /> : undefined}
    >
      <SectionBlock title="이번 주 KPI">
        <WeekComment comment={comment} />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 16 }}>
          <KpiCard channel="광고" label="이번 주 노출수" visits={latest?.노출수 ?? 0} delta={latest?.노출수증감 ?? 0} />
          <KpiCard channel="광고" label="이번 주 클릭수" visits={latest?.클릭수 ?? 0} delta={latest?.클릭수증감 ?? 0} />
        </div>
      </SectionBlock>

      <SectionBlock title="9주 추이">
        <TrendChart data={trendData} channels={['노출수', '클릭수']}
          channelColors={{ '노출수': '#E31837', '클릭수': '#FF6B9D' }} title="노출수 · 클릭수" height={240} />
      </SectionBlock>

      <SectionBlock title="9주 데이터">
        <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 12, overflow: 'hidden' }}>
          <DetailTable
            rows={last9 as unknown as Record<string, string | number>[]}
            columns={[
              { key: '주차', label: '주차' },
              { key: '노출수', label: '노출수' },
              { key: '노출수증감', label: '노출수 증감', isDelta: true },
              { key: '클릭수', label: '클릭수' },
              { key: '클릭수증감', label: '클릭수 증감', isDelta: true },
            ]}
          />
        </div>
      </SectionBlock>
    </PageShell>
  )
}
