import { getShoppingData, getPopularProductData, getAllWeeks, ShoppingRow } from '@/lib/sheets'
import { formatNumber } from '@/lib/format'
import KpiCard from '@/components/ui/KpiCard'
import TrendChart from '@/components/charts/TrendChart'
import DetailTable from '@/components/ui/DetailTable'
import WeekComment from '@/components/ui/WeekComment'
import WeekSelector from '@/components/ui/WeekSelector'
import PageShell from '@/components/layout/PageShell'
import SectionBlock from '@/components/layout/SectionBlock'

export const revalidate = 3600

export default async function ShoppingPage({
  searchParams,
}: {
  searchParams: Promise<{ week?: string }>
}) {
  const { week } = await searchParams
  const results = await Promise.allSettled([
    getShoppingData(), getPopularProductData(), getAllWeeks('쇼핑몰'),
  ])
  const rows     = results[0].status === 'fulfilled' ? results[0].value : []
  const products = results[1].status === 'fulfilled' ? results[1].value : []
  const weeks    = results[2].status === 'fulfilled' ? results[2].value : []

  const reversedWeeks = [...weeks].reverse()
  const selectedWeek = week ?? reversedWeeks[0] ?? (rows[rows.length - 1]?.주차 ?? '')
  const latest = rows.find((r: ShoppingRow) => r.주차 === selectedWeek) ?? rows[rows.length - 1]
  const last9 = rows.slice(-9)
  const comment = latest?.코멘트 ?? ''

  const trendData = last9.map((r: ShoppingRow) => ({ 주차: r.주차, '방문수': r.방문수, '페이지뷰': r.페이지뷰 }))
  const topProducts = products
    .filter(p => p.주차 === selectedWeek)
    .sort((a, b) => a.순위 - b.순위)
    .slice(0, 3)

  return (
    <PageShell
      title="쇼핑몰" accent="#FF6B35"
      weekSelector={reversedWeeks.length > 0 ? <WeekSelector weeks={reversedWeeks} selected={selectedWeek} /> : undefined}
    >
      <SectionBlock title="이번 주 KPI">
        <WeekComment comment={comment} />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 16 }}>
          <KpiCard channel="쇼핑몰" label="이번 주 방문수"   visits={latest?.방문수 ?? 0}  delta={latest?.방문수증감 ?? 0} />
          <KpiCard channel="쇼핑몰" label="이번 주 페이지뷰" visits={latest?.페이지뷰 ?? 0} delta={latest?.페이지뷰증감 ?? 0} />
        </div>
      </SectionBlock>

      <SectionBlock title="9주 추이">
        <TrendChart data={trendData} channels={['방문수', '페이지뷰']}
          channelColors={{ '방문수': '#FF6B35', '페이지뷰': '#FFAD85' }} title="방문수 · 페이지뷰" height={240} />
      </SectionBlock>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.6fr', gap: 16, marginBottom: 32 }}>
        <div>
          <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', color: 'var(--text-muted)', textTransform: 'uppercase' as const, marginBottom: 14 }}>
            인기상품 TOP 3
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' as const, gap: 10 }}>
            {topProducts.length === 0 ? (
              <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 10, padding: '16px 20px', color: 'var(--text-muted)', fontSize: 13 }}>데이터 없음</div>
            ) : topProducts.map((p, i) => (
              <div key={i} style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 10, padding: '14px 18px', display: 'flex', alignItems: 'center', gap: 14 }}>
                <div style={{ width: 28, height: 28, borderRadius: 8, flexShrink: 0, background: i === 0 ? '#FF6B35' : '#2A2D3E', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 800, color: i === 0 ? '#fff' : '#8B90A7' }}>
                  {p.순위}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-primary)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' as const }}>{p.상품명}</div>
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
                { key: '방문수', label: '방문수' },
                { key: '방문수증감', label: '방문수 증감', isDelta: true },
                { key: '페이지뷰', label: '페이지뷰' },
                { key: '페이지뷰증감', label: '페이지뷰 증감', isDelta: true },
              ]}
            />
          </div>
        </div>
      </div>
    </PageShell>
  )
}
