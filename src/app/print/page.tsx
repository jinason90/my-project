import {
  getBlogData, getHomepageData, getShoppingData, getAdData,
  getCsDetailData, calcCsStat, getActionPlanData, getNewsData,
  BlogRow, HomepageRow, ShoppingRow, AdRow, CsDetailRow, ActionPlanRow, NewsRow,
} from '@/lib/sheets'
import { formatNumber, formatDelta, getDeltaDirection } from '@/lib/format'
import PrintActions from '@/components/ui/PrintActions'
import PrintTrendChart from '@/components/charts/PrintTrendChart'

export const revalidate = 3600

// ─── 공통 스타일 상수 ─────────────────────────────────────────
const FONT = "'Pretendard Variable','Pretendard',-apple-system,sans-serif"

const tableStyle: React.CSSProperties = { width: '100%', borderCollapse: 'collapse', fontSize: 11 }
const thStyle: React.CSSProperties = {
  padding: '7px 10px', fontWeight: 700, color: '#6B7280', fontSize: 10,
  letterSpacing: '0.04em', borderBottom: '1px solid #E5E7EB',
  background: '#F9FAFB', textAlign: 'left',
}
const tdStyle = (align?: 'left' | 'right'): React.CSSProperties => ({
  padding: '7px 10px', textAlign: align ?? 'left',
  borderBottom: '1px solid #F3F4F6', verticalAlign: 'top',
})

// ─── 날짜 ─────────────────────────────────────────────────────
function today() {
  return new Date().toLocaleDateString('ko-KR', { year: 'numeric', month: 'long', day: 'numeric' })
}

// ─── 증감 표시 ───────────────────────────────────────────────
function Delta({ value }: { value: number }) {
  const dir = getDeltaDirection(value)
  const color = dir === 'up' ? '#16A34A' : dir === 'down' ? '#DC2626' : '#9CA3AF'
  const arrow = dir === 'up' ? '▲' : dir === 'down' ? '▼' : '—'
  return (
    <span style={{ fontSize: 10, color, marginLeft: 4, fontWeight: 600 }}>
      {arrow} {formatDelta(value)}
    </span>
  )
}

// ─── 채널 섹션 헤더 ───────────────────────────────────────────
function ChannelHeader({ label, week }: { label: string; week: string }) {
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: 14,
      background: '#F5F5F5',
      borderLeft: '5px solid #E31837',
      borderRadius: '0 6px 6px 0',
      padding: '14px 20px',
      marginBottom: 24,
    }}>
      <div>
        <div style={{ fontSize: 16, fontWeight: 800, color: '#111', letterSpacing: '-0.01em' }}>
          {label}
        </div>
        {week && (
          <div style={{ fontSize: 11, color: '#9CA3AF', marginTop: 2 }}>
            {week} 기준
          </div>
        )}
      </div>
    </div>
  )
}

// ─── 채널 KPI 카드 ────────────────────────────────────────────
function ChannelKpiBox({ label, accent, metrics, comment }: {
  label: string; accent: string
  metrics: { name: string; value: number; delta: number }[]
  comment?: string
}) {
  return (
    <div style={{
      border: '1px solid #E5E7EB', borderTop: `3px solid ${accent}`,
      borderRadius: 6, padding: '16px 18px', background: '#FAFAFA',
      pageBreakInside: 'avoid',
    }}>
      <div style={{ fontSize: 11, fontWeight: 700, color: accent, marginBottom: 10, letterSpacing: '0.04em' }}>
        {label}
      </div>
      <div style={{ display: 'flex', gap: 28 }}>
        {metrics.map(m => (
          <div key={m.name}>
            <div style={{ fontSize: 10, color: '#9CA3AF', marginBottom: 2 }}>{m.name}</div>
            <div style={{ fontSize: 18, fontWeight: 800, color: '#111', lineHeight: 1 }}>
              {formatNumber(m.value)}<Delta value={m.delta} />
            </div>
          </div>
        ))}
      </div>
      {comment && (
        <div style={{
          marginTop: 10, paddingTop: 8, borderTop: '1px solid #F0F0F0',
          fontSize: 11, color: '#9CA3AF', fontStyle: 'italic',
        }}>
          {comment}
        </div>
      )}
    </div>
  )
}

// ─── 데이터 테이블 ────────────────────────────────────────────
function DataTable({ rows, cols }: {
  rows: Record<string, string | number>[]
  cols: { key: string; label: string; isDelta?: boolean }[]
}) {
  return (
    <table style={tableStyle}>
      <thead>
        <tr>
          {cols.map(c => (
            <th key={c.key} style={{ ...thStyle, textAlign: c.key === '주차' ? 'left' : 'right' as const }}>
              {c.label}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((row, i) => (
          <tr key={i}>
            {cols.map(c => {
              const val = row[c.key]
              const num = typeof val === 'number' ? val : Number(val)
              const dir = c.isDelta ? getDeltaDirection(num) : 'neutral'
              return (
                <td key={c.key} style={{
                  ...tdStyle(c.key === '주차' ? 'left' : 'right'),
                  color: c.isDelta
                    ? dir === 'up' ? '#16A34A' : dir === 'down' ? '#DC2626' : '#9CA3AF'
                    : '#111',
                  fontWeight: c.key === '주차' ? 600 : 400,
                }}>
                  {c.isDelta ? formatDelta(num) : c.key === '주차' ? String(val) : formatNumber(num)}
                </td>
              )
            })}
          </tr>
        ))}
      </tbody>
    </table>
  )
}

// ─── 차트 + 테이블 블록 ───────────────────────────────────────
function ChartBlock({ chartData, chartLines, tableRows, tableCols }: {
  chartData: { 주차: string;[k: string]: string | number }[]
  chartLines: { key: string; label: string; dash?: boolean }[]
  tableRows: Record<string, string | number>[]
  tableCols: { key: string; label: string; isDelta?: boolean }[]
}) {
  return (
    <div style={{ pageBreakInside: 'avoid' }}>
      <PrintTrendChart data={chartData} lines={chartLines} />
      <div style={{ marginTop: 24 }}>
        <div style={{ fontSize: 12, fontWeight: 700, color: '#6B7280', marginBottom: 8 }}>
          9주 데이터
        </div>
        <DataTable rows={tableRows} cols={tableCols} />
      </div>
    </div>
  )
}

// ─── 페이지 컨테이너 ──────────────────────────────────────────
function Page({ children, breakBefore }: { children: React.ReactNode; breakBefore?: boolean }) {
  return (
    <div className="print-page" style={{
      pageBreakBefore: breakBefore ? 'always' : 'auto',
      padding: '0',
    }}>
      {children}
    </div>
  )
}

// ─── 메인 페이지 ─────────────────────────────────────────────
export default async function PrintPage({
  searchParams,
}: {
  searchParams: Promise<{ week?: string }>
}) {
  const { week } = await searchParams

  const settled = await Promise.allSettled([
    getBlogData(), getHomepageData(), getShoppingData(), getAdData(),
    getCsDetailData(), getActionPlanData(), getNewsData(),
  ])
  const blogRows     = (settled[0].status === 'fulfilled' ? settled[0].value : []) as BlogRow[]
  const homepageRows = (settled[1].status === 'fulfilled' ? settled[1].value : []) as HomepageRow[]
  const shoppingRows = (settled[2].status === 'fulfilled' ? settled[2].value : []) as ShoppingRow[]
  const adRows       = (settled[3].status === 'fulfilled' ? settled[3].value : []) as AdRow[]
  const csDetails    = (settled[4].status === 'fulfilled' ? settled[4].value : []) as CsDetailRow[]
  const plans        = (settled[5].status === 'fulfilled' ? settled[5].value : []) as ActionPlanRow[]
  const news         = (settled[6].status === 'fulfilled' ? settled[6].value : []) as NewsRow[]

  const latestWeek = week ?? blogRows[blogRows.length - 1]?.주차 ?? ''
  const lb = blogRows.find(r => r.주차 === latestWeek) ?? blogRows[blogRows.length - 1]
  const lh = homepageRows.find(r => r.주차 === latestWeek) ?? homepageRows[homepageRows.length - 1]
  const ls = shoppingRows.find(r => r.주차 === latestWeek) ?? shoppingRows[shoppingRows.length - 1]
  const la = adRows.find(r => r.주차 === latestWeek) ?? adRows[adRows.length - 1]

  const last9Blog     = blogRows.slice(-9) as unknown as Record<string, string | number>[]
  const last9Homepage = homepageRows.slice(-9) as unknown as Record<string, string | number>[]
  const last9Shopping = shoppingRows.slice(-9) as unknown as Record<string, string | number>[]
  const last9Ad       = adRows.slice(-9) as unknown as Record<string, string | number>[]

  const csStat    = calcCsStat(csDetails)
  const planWeek  = plans[plans.length - 1]?.주차 ?? ''
  const latestPlans = planWeek ? plans.filter(p => p.주차 === planWeek) : plans.slice(-10)
  const latestNews  = news.slice(-5).reverse()

  const STATUS_COLOR: Record<string, string> = {
    완료: '#16A34A', '진행중': '#D97706', '미완': '#DC2626', '대기': '#9CA3AF',
  }
  const CS_STATUS_COLOR: Record<string, string> = {
    종결: '#9CA3AF', 확인필요: '#D97706', 추진중: '#2563EB',
  }

  return (
    <>
      {/* ── 인쇄 전용 CSS ─────────────────────────────────────── */}
      <style>{`
        @media print {
          @page {
            size: A4;
            margin: 20mm 15mm;
          }
          /* 쪽수 카운터 */
          body { counter-reset: page-counter; }
          .print-page { counter-increment: page-counter; position: relative; }
          .print-page::after {
            content: counter(page-counter) " / 6";
            position: fixed;
            bottom: 10mm;
            right: 15mm;
            font-size: 9pt;
            color: #9CA3AF;
            font-family: 'Pretendard Variable', 'Pretendard', sans-serif;
          }
          .no-print { display: none !important; }
          .layout-sidebar, .layout-mobile-tabs { display: none !important; }
          .layout-main { margin-left: 0 !important; }
          body { background: #fff !important; }
        }
        @media screen {
          .print-page {
            max-width: 794px;
            margin: 0 auto;
            padding: 48px 60px 56px;
            background: #fff;
            border-bottom: 1px dashed #E5E7EB;
          }
          .print-page:last-child { border-bottom: none; }
        }
      `}</style>

      {/* ── 화면 전용 안내 배너 ──────────────────────────────── */}
      <div className="no-print" style={{
        background: '#FEF9EC', borderBottom: '1px solid #FDE68A',
        padding: '12px 28px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      }}>
        <span style={{ fontSize: 12, color: '#92400E', fontFamily: FONT }}>
          🖨 <strong>Ctrl + P</strong> (Mac: ⌘ + P) — 여백: <strong>없음</strong>, 배경 그래픽: <strong>포함</strong>으로 설정 후 PDF 저장
        </span>
        <PrintActions />
      </div>

      {/* ══════════════════════════════════════════════════════
          1페이지: 표지 + 채널별 KPI 요약
      ══════════════════════════════════════════════════════ */}
      <Page>
        <div style={{ fontFamily: FONT, color: '#111', fontSize: 11, lineHeight: 1.65 }}>

          {/* 표지 헤더 */}
          <div style={{
            display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between',
            marginBottom: 40, paddingBottom: 20, borderBottom: '2.5px solid #111',
          }}>
            <div>
              <div style={{ fontSize: 10, fontWeight: 700, color: '#E31837', letterSpacing: '0.14em', marginBottom: 8 }}>
                HELIKOREA MARKETING
              </div>
              <div style={{ fontSize: 26, fontWeight: 900, color: '#111', letterSpacing: '-0.02em', marginBottom: 10 }}>
                주간 마케팅 보고서
              </div>
              <div style={{ fontSize: 12, color: '#6B7280' }}>
                {latestWeek && <span style={{ marginRight: 24 }}>보고 기준&nbsp;<strong style={{ color: '#111' }}>{latestWeek}</strong></span>}
                <span>작성일&nbsp;{today()}</span>
              </div>
            </div>
            <div style={{
              width: 56, height: 56, background: '#E31837', borderRadius: 12,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 24, fontWeight: 900, color: '#fff', flexShrink: 0,
            }}>H</div>
          </div>

          {/* 채널별 KPI 요약 */}
          <div style={{ fontSize: 14, fontWeight: 800, color: '#111', paddingBottom: 8, borderBottom: '2px solid #E31837', marginBottom: 20, display: 'block' }}>
            채널별 핵심 지표
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            <ChannelKpiBox label="블로그" accent="#1D6FEB"
              metrics={[
                { name: '방문수', value: lb?.방문수 ?? 0, delta: lb?.방문수증감 ?? 0 },
                { name: '조회수', value: lb?.조회수 ?? 0, delta: lb?.조회수증감 ?? 0 },
              ]}
              comment={lb?.코멘트}
            />
            <ChannelKpiBox label="홈페이지" accent="#009678"
              metrics={[
                { name: '방문수', value: lh?.방문수 ?? 0, delta: lh?.방문수증감 ?? 0 },
                { name: '조회수', value: lh?.조회수 ?? 0, delta: lh?.조회수증감 ?? 0 },
              ]}
              comment={lh?.코멘트}
            />
            <ChannelKpiBox label="쇼핑몰" accent="#D9520F"
              metrics={[
                { name: '방문수', value: ls?.방문수 ?? 0, delta: ls?.방문수증감 ?? 0 },
                { name: '페이지뷰', value: ls?.페이지뷰 ?? 0, delta: ls?.페이지뷰증감 ?? 0 },
              ]}
              comment={ls?.코멘트}
            />
            <ChannelKpiBox label="광고" accent="#C21230"
              metrics={[
                { name: '노출수', value: la?.노출수 ?? 0, delta: la?.노출수증감 ?? 0 },
                { name: '클릭수', value: la?.클릭수 ?? 0, delta: la?.클릭수증감 ?? 0 },
              ]}
              comment={la?.코멘트}
            />
          </div>
        </div>
      </Page>

      {/* ══════════════════════════════════════════════════════
          2페이지: 블로그 상세
      ══════════════════════════════════════════════════════ */}
      <Page breakBefore>
        <div style={{ fontFamily: FONT, color: '#111', fontSize: 11, lineHeight: 1.65 }}>
          <ChannelHeader label="블로그" week={latestWeek} />
          <ChartBlock
            chartData={blogRows.slice(-9).map(r => ({ 주차: r.주차, '조회수': r.조회수, '방문수': r.방문수 }))}
            chartLines={[{ key: '조회수', label: '조회수' }, { key: '방문수', label: '방문수', dash: true }]}
            tableRows={last9Blog}
            tableCols={[
              { key: '주차', label: '주차' },
              { key: '조회수', label: '조회수' },
              { key: '조회수증감', label: '조회수 증감', isDelta: true },
              { key: '방문수', label: '방문수' },
              { key: '방문수증감', label: '방문수 증감', isDelta: true },
            ]}
          />
        </div>
      </Page>

      {/* ══════════════════════════════════════════════════════
          3페이지: 홈페이지 상세
      ══════════════════════════════════════════════════════ */}
      <Page breakBefore>
        <div style={{ fontFamily: FONT, color: '#111', fontSize: 11, lineHeight: 1.65 }}>
          <ChannelHeader label="홈페이지" week={latestWeek} />
          <ChartBlock
            chartData={homepageRows.slice(-9).map(r => ({ 주차: r.주차, '조회수': r.조회수, '방문수': r.방문수 }))}
            chartLines={[{ key: '조회수', label: '조회수' }, { key: '방문수', label: '방문수', dash: true }]}
            tableRows={last9Homepage}
            tableCols={[
              { key: '주차', label: '주차' },
              { key: '조회수', label: '조회수' },
              { key: '조회수증감', label: '조회수 증감', isDelta: true },
              { key: '방문수', label: '방문수' },
              { key: '방문수증감', label: '방문수 증감', isDelta: true },
            ]}
          />
        </div>
      </Page>

      {/* ══════════════════════════════════════════════════════
          4페이지: 쇼핑몰 상세
      ══════════════════════════════════════════════════════ */}
      <Page breakBefore>
        <div style={{ fontFamily: FONT, color: '#111', fontSize: 11, lineHeight: 1.65 }}>
          <ChannelHeader label="쇼핑몰" week={latestWeek} />
          <ChartBlock
            chartData={shoppingRows.slice(-9).map(r => ({ 주차: r.주차, '방문수': r.방문수, '페이지뷰': r.페이지뷰 }))}
            chartLines={[{ key: '방문수', label: '방문수' }, { key: '페이지뷰', label: '페이지뷰', dash: true }]}
            tableRows={last9Shopping}
            tableCols={[
              { key: '주차', label: '주차' },
              { key: '방문수', label: '방문수' },
              { key: '방문수증감', label: '방문수 증감', isDelta: true },
              { key: '페이지뷰', label: '페이지뷰' },
              { key: '페이지뷰증감', label: '페이지뷰 증감', isDelta: true },
            ]}
          />
        </div>
      </Page>

      {/* ══════════════════════════════════════════════════════
          5페이지: 광고 상세
      ══════════════════════════════════════════════════════ */}
      <Page breakBefore>
        <div style={{ fontFamily: FONT, color: '#111', fontSize: 11, lineHeight: 1.65 }}>
          <ChannelHeader label="광고" week={latestWeek} />
          <ChartBlock
            chartData={adRows.slice(-9).map(r => ({ 주차: r.주차, '노출수': r.노출수, '클릭수': r.클릭수 }))}
            chartLines={[{ key: '노출수', label: '노출수' }, { key: '클릭수', label: '클릭수', dash: true }]}
            tableRows={last9Ad}
            tableCols={[
              { key: '주차', label: '주차' },
              { key: '노출수', label: '노출수' },
              { key: '노출수증감', label: '노출수 증감', isDelta: true },
              { key: '클릭수', label: '클릭수' },
              { key: '클릭수증감', label: '클릭수 증감', isDelta: true },
            ]}
          />
        </div>
      </Page>

      {/* ══════════════════════════════════════════════════════
          6페이지: CS현황 + 액션플랜 + 뉴스
      ══════════════════════════════════════════════════════ */}
      <Page breakBefore>
        <div style={{ fontFamily: FONT, color: '#111', fontSize: 11, lineHeight: 1.65 }}>

          {/* CS현황 */}
          <div style={{ marginBottom: 36 }}>
            <div style={{ fontSize: 14, fontWeight: 800, paddingBottom: 8, borderBottom: '2px solid #E31837', marginBottom: 18, display: 'block' }}>
              CS 문의 현황
            </div>
            <div style={{ display: 'flex', gap: 10, marginBottom: 20 }}>
              {[
                { label: '총 문의', value: csStat.총건수 },
                { label: '견적문의', value: csStat.견적 },
                { label: 'A/S 요청', value: csStat.AS },
                { label: '기타문의', value: csStat.기타 },
                { label: '제품문의', value: csStat.제품문의 },
              ].map(({ label, value }) => (
                <div key={label} style={{
                  flex: 1, border: '1px solid #E5E7EB', borderRadius: 6,
                  padding: '10px 12px', textAlign: 'center',
                }}>
                  <div style={{ fontSize: 10, color: '#9CA3AF', marginBottom: 5 }}>{label}</div>
                  <div style={{ fontSize: 20, fontWeight: 800, color: '#111' }}>
                    {formatNumber(value)}
                  </div>
                  <div style={{ fontSize: 10, color: '#D1D5DB', marginTop: 2 }}>건</div>
                </div>
              ))}
            </div>
            {csDetails.length > 0 && (
              <table style={tableStyle}>
                <thead>
                  <tr>
                    {['NO', '날짜', '구분', '접수경로', '회사명', '요청내용', '처리현황'].map(c => (
                      <th key={c} style={thStyle}>{c}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {csDetails.map((row, i) => {
                    const stColor = CS_STATUS_COLOR[row.처리현황] ?? '#9CA3AF'
                    const isEst = row.구분 === '견적문의'
                    return (
                      <tr key={i} style={{ background: isEst ? '#FFFBFB' : 'transparent', pageBreakInside: 'avoid' }}>
                        <td style={{ ...tdStyle(), color: '#9CA3AF', fontSize: 10 }}>{String(row.NO || i + 1).padStart(2, '0')}</td>
                        <td style={{ ...tdStyle(), whiteSpace: 'nowrap' as const }}>{row.날짜}</td>
                        <td style={{ ...tdStyle(), whiteSpace: 'nowrap' as const }}>
                          <span style={{ fontSize: 10, fontWeight: 600, color: isEst ? '#C21230' : '#6B7280' }}>{row.구분}</span>
                        </td>
                        <td style={{ ...tdStyle(), whiteSpace: 'nowrap' as const }}>{row.접수경로}</td>
                        <td style={{ ...tdStyle(), fontWeight: 600, whiteSpace: 'nowrap' as const }}>{row.회사명}</td>
                        <td style={{ ...tdStyle(), color: '#374151', maxWidth: 180 }}>
                          <div style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' as const }}>{row.요청내용}</div>
                        </td>
                        <td style={{ ...tdStyle(), whiteSpace: 'nowrap' as const }}>
                          <span style={{ fontSize: 10, fontWeight: 700, color: stColor }}>{row.처리현황}</span>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            )}
          </div>

          {/* 액션플랜 */}
          {latestPlans.length > 0 && (
            <div style={{ marginBottom: 36, pageBreakInside: 'avoid' }}>
              <div style={{ fontSize: 14, fontWeight: 800, paddingBottom: 8, borderBottom: '2px solid #E31837', marginBottom: 18 }}>
                액션플랜{planWeek ? ` — ${planWeek}` : ''}
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                {latestPlans.map((p, i) => {
                  const sc = STATUS_COLOR[p.상태] ?? '#9CA3AF'
                  return (
                    <div key={i} style={{
                      display: 'flex', alignItems: 'flex-start', gap: 10,
                      padding: '9px 12px', border: '1px solid #F3F4F6',
                      borderRadius: 6, background: '#FAFAFA',
                      opacity: p.상태 === '완료' ? 0.55 : 1,
                      pageBreakInside: 'avoid',
                    }}>
                      <span style={{ fontSize: 10, color: sc, flexShrink: 0, marginTop: 2 }}>●</span>
                      <div style={{ flex: 1 }}>
                        <span style={{ fontSize: 11, color: '#111', textDecoration: p.상태 === '완료' ? 'line-through' : 'none' }}>{p.내용}</span>
                        <span style={{ fontSize: 10, color: '#9CA3AF', marginLeft: 10 }}>담당: {p.담당} / 마감: {p.마감}</span>
                      </div>
                      <span style={{ fontSize: 10, fontWeight: 700, color: sc, flexShrink: 0 }}>{p.상태}</span>
                    </div>
                  )
                })}
              </div>
            </div>
          )}

          {/* 뉴스 */}
          {latestNews.length > 0 && (
            <div style={{ pageBreakInside: 'avoid' }}>
              <div style={{ fontSize: 14, fontWeight: 800, paddingBottom: 8, borderBottom: '2px solid #E31837', marginBottom: 18 }}>
                이번 주 뉴스
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {latestNews.map((item, i) => (
                  <div key={i} style={{
                    padding: '10px 14px', border: '1px solid #E5E7EB',
                    borderLeft: '3px solid #9CA3AF', borderRadius: 6,
                    pageBreakInside: 'avoid',
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 5 }}>
                      <span style={{ fontSize: 10, fontWeight: 700, padding: '1px 7px', borderRadius: 20, background: '#F3F4F6', color: '#374151' }}>{item.카테고리}</span>
                      <span style={{ fontSize: 10, color: '#9CA3AF' }}>{item.날짜}</span>
                      <span style={{ fontSize: 10, color: '#9CA3AF', marginLeft: 'auto' }}>{item.출처}</span>
                    </div>
                    <div style={{ fontSize: 11, fontWeight: 700, color: '#111', marginBottom: 3 }}>
                      {item.링크 ? <a href={item.링크} style={{ color: '#111', textDecoration: 'none' }}>{item.제목}</a> : item.제목}
                    </div>
                    <div style={{ fontSize: 11, color: '#6B7280', lineHeight: 1.5 }}>{item.핵심내용}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 푸터 */}
          <div style={{
            marginTop: 40, paddingTop: 12, borderTop: '1px solid #E5E7EB',
            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          }}>
            <span style={{ fontSize: 10, color: '#9CA3AF' }}>Source: Naver Search Advisor · GA4 · Cafe24</span>
            <span style={{ fontSize: 10, color: '#9CA3AF' }}>HELIKOREA Marketing Dashboard · {today()}</span>
          </div>
        </div>
      </Page>
    </>
  )
}
