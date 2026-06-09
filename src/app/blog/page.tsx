import { getBlogData, getPopularPostData, getAllWeeks, BlogRow, PopularPostRow } from '@/lib/sheets'
import { formatNumber } from '@/lib/format'
import KpiCard from '@/components/ui/KpiCard'
import TrendChart from '@/components/charts/TrendChart'
import DetailTable from '@/components/ui/DetailTable'
import WeekComment from '@/components/ui/WeekComment'
import WeekSelector from '@/components/ui/WeekSelector'
import PageShell from '@/components/layout/PageShell'
import SectionBlock from '@/components/layout/SectionBlock'

export const revalidate = 3600

export default async function BlogPage({
  searchParams,
}: {
  searchParams: Promise<{ week?: string }>
}) {
  const { week } = await searchParams
  const results = await Promise.allSettled([
    getBlogData(), getPopularPostData(), getAllWeeks('블로그'),
  ])
  const rows: BlogRow[]         = results[0].status === 'fulfilled' ? results[0].value : []
  const posts: PopularPostRow[] = results[1].status === 'fulfilled' ? results[1].value : []
  const weeks: string[]         = results[2].status === 'fulfilled' ? results[2].value : []

  const reversedWeeks = [...weeks].reverse()
  const selectedWeek = week ?? reversedWeeks[0] ?? (rows[rows.length - 1]?.주차 ?? '')
  const latest = rows.find(r => r.주차 === selectedWeek) ?? rows[rows.length - 1]
  const last9 = rows.slice(-9)
  const comment = latest?.코멘트 ?? ''

  const trendData = last9.map((r: BlogRow) => ({ 주차: r.주차, '조회수': r.조회수, '방문수': r.방문수 }))
  const topPosts = posts
    .filter((p: PopularPostRow) => p.주차 === selectedWeek)
    .sort((a, b) => a.순위 - b.순위)
    .slice(0, 3)

  return (
    <PageShell
      title="블로그" accent="#1D6FEB"
      weekSelector={reversedWeeks.length > 0 ? <WeekSelector weeks={reversedWeeks} selected={selectedWeek} /> : undefined}
    >
      <SectionBlock title="이번 주 KPI">
        <WeekComment comment={comment} />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 16 }}>
          <KpiCard channel="블로그" label="이번 주 방문수" visits={latest?.방문수 ?? 0} delta={latest?.방문수증감 ?? 0} />
          <KpiCard channel="블로그" label="이번 주 조회수" visits={latest?.조회수 ?? 0} delta={latest?.조회수증감 ?? 0} />
        </div>
      </SectionBlock>

      <SectionBlock title="9주 추이">
        <TrendChart data={trendData} channels={['조회수', '방문수']}
          channelColors={{ '조회수': '#93C5FD', '방문수': '#1D6FEB' }} title="조회수 · 방문수" height={240} />
      </SectionBlock>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.6fr', gap: 16, marginBottom: 32 }}>
        <div>
          <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', color: 'var(--text-muted)', textTransform: 'uppercase' as const, marginBottom: 14 }}>
            인기 포스트 TOP 3
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' as const, gap: 10 }}>
            {topPosts.length === 0 ? (
              <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 10, padding: '16px 20px', color: 'var(--text-muted)', fontSize: 13 }}>데이터 없음</div>
            ) : topPosts.map((p, i) => (
              <div key={i} style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 10, padding: '14px 18px', display: 'flex', alignItems: 'center', gap: 14 }}>
                <div style={{ width: 28, height: 28, borderRadius: 8, flexShrink: 0, background: i === 0 ? '#1D6FEB' : '#2A2D3E', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 800, color: i === 0 ? '#fff' : '#8B90A7' }}>
                  {p.순위}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-primary)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' as const }}>{p.제목}</div>
                  <div style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 3 }}>조회수 {formatNumber(p.조회수)}</div>
                </div>
              </div>
            ))}
          </div>
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
