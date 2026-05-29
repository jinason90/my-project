import { getHomepageData, getTrafficSourceData, getAllWeeks, HomepageRow, TrafficSourceRow } from '@/lib/sheets'
import KpiCard from '@/components/ui/KpiCard'
import TrendChart from '@/components/charts/TrendChart'
import DetailTable from '@/components/ui/DetailTable'
import DonutChart from '@/components/charts/DonutChart'
import WeekComment from '@/components/ui/WeekComment'
import WeekSelector from '@/components/ui/WeekSelector'
import PageShell from '@/components/layout/PageShell'
import SectionBlock from '@/components/layout/SectionBlock'

export const revalidate = 3600

const TRAFFIC_COLORS = ['#1D6FEB','#00C49F','#FF6B35','#A78BFA','#FBBF24','#E31837','#8B90A7']

export default async function HomepagePage({
  searchParams,
}: {
  searchParams: Promise<{ week?: string }>
}) {
  const { week } = await searchParams
  const results = await Promise.allSettled([
    getHomepageData(), getTrafficSourceData(), getAllWeeks('홈페이지'),
  ])
  const rows: HomepageRow[]         = results[0].status === 'fulfilled' ? results[0].value : []
  const sources: TrafficSourceRow[] = results[1].status === 'fulfilled' ? results[1].value : []
  const weeks: string[]             = results[2].status === 'fulfilled' ? results[2].value : []

  const reversedWeeks = [...weeks].reverse()
  const selectedWeek = week ?? reversedWeeks[0] ?? (rows[rows.length - 1]?.주차 ?? '')
  const latest = rows.find(r => r.주차 === selectedWeek) ?? rows[rows.length - 1]
  const last9 = rows.slice(-9)
  const comment = latest?.코멘트 ?? ''

  const trendData = last9.map((r: HomepageRow) => ({ 주차: r.주차, '조회수': r.조회수, '방문수': r.방문수 }))
  const latestSources = sources
    .filter((s: TrafficSourceRow) => s.주차 === selectedWeek)
    .map((s, i) => ({ name: s.채널명, value: s.비중, color: TRAFFIC_COLORS[i % TRAFFIC_COLORS.length] }))

  return (
    <PageShell
      title="홈페이지" accent="#00C49F"
      weekSelector={reversedWeeks.length > 0 ? <WeekSelector weeks={reversedWeeks} selected={selectedWeek} /> : undefined}
    >
      <SectionBlock title="이번 주 KPI">
        <WeekComment comment={comment} />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 16 }}>
          <KpiCard channel="홈페이지" label="이번 주 방문수" visits={latest?.방문수 ?? 0} delta={latest?.방문수증감 ?? 0} />
          <KpiCard channel="홈페이지" label="이번 주 조회수" visits={latest?.조회수 ?? 0} delta={latest?.조회수증감 ?? 0} />
        </div>
      </SectionBlock>

      <SectionBlock title="9주 추이">
        <TrendChart data={trendData} channels={['조회수', '방문수']}
          channelColors={{ '조회수': '#6EE7D0', '방문수': '#00C49F' }} title="조회수 · 방문수" height={240} />
      </SectionBlock>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.6fr', gap: 16, marginBottom: 32 }}>
        <div>
          <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', color: 'var(--text-muted)', textTransform: 'uppercase' as const, marginBottom: 14 }}>유입채널 비중</div>
          <DonutChart
            data={latestSources.length > 0 ? latestSources : [{ name: '데이터 없음', value: 1, color: '#2A2D3E' }]}
            title={`${selectedWeek} 유입채널`} unit="%" height={260} />
        </div>
        <div>
          <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', color: 'var(--text-muted)', textTransform: 'uppercase' as const, marginBottom: 14 }}>9주 데이터</div>
          <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 12, overflow: 'hidden' }}>
            <DetailTable
              rows={last9 as unknown as Record<string, string | number>[]}
              columns={[
                { key: '주차', label: '주차' },
                { key: '조회수', label: '조회수' },
                { key: '조회수증감', label: '증감', isDelta: true },
                { key: '방문수', label: '방문수' },
                { key: '방문수증감', label: '증감', isDelta: true },
              ]}
            />
          </div>
        </div>
      </div>
    </PageShell>
  )
}
