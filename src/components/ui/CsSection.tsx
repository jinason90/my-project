'use client'

import { CsStatRow, CsDetailRow } from '@/lib/sheets'
import { formatNumber } from '@/lib/format'

const STATUS_STYLE: Record<string, { bg: string; color: string }> = {
  종결:    { bg: 'rgba(139,144,167,0.15)', color: '#8B90A7' },
  확인필요: { bg: 'rgba(251,191,36,0.15)',  color: '#FBBF24' },
  추진중:  { bg: 'rgba(29,111,235,0.15)',   color: '#1D6FEB' },
}

const CS_CARDS: { key: keyof Omit<CsStatRow, '총건수'>; label: string; num: string }[] = [
  { key: '견적',    label: '견적문의', num: '01' },
  { key: 'AS',      label: 'A/S 요청', num: '02' },
  { key: '기타',    label: '기타문의', num: '03' },
  { key: '제품문의', label: '제품문의', num: '04' },
]

interface CsSectionProps {
  stat: CsStatRow
  details: CsDetailRow[]
}

export default function CsSection({ stat, details }: CsSectionProps) {
  const total = stat.총건수

  return (
    <div>
      {/* ── 상단 카드 4개 ─────────────────────────────────── */}
      <div style={{ marginBottom: 24 }}>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, marginBottom: 16 }}>
          <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', color: 'var(--text-muted)', textTransform: 'uppercase' }}>
            CS 문의 현황
          </span>
          <span style={{ fontSize: 11, color: 'var(--text-muted)' }}>—</span>
          <span style={{ fontSize: 13, fontWeight: 700, color: 'var(--text-primary)' }}>
            총 {formatNumber(total)}건
          </span>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12 }}>
          {CS_CARDS.map(({ key, label, num }) => {
            const value = stat[key] as number
            const pct = total > 0 ? Math.round((value / total) * 100) : 0
            return (
              <div key={key} style={{
                background: 'var(--bg-card)', border: '1px solid var(--border)',
                borderRadius: 10, padding: '18px 20px',
                position: 'relative', overflow: 'hidden',
              }}>
                <div style={{
                  position: 'absolute', bottom: -8, right: 8,
                  fontSize: 52, fontWeight: 900, color: '#E3183710',
                  letterSpacing: '-0.04em', lineHeight: 1, userSelect: 'none',
                }}>
                  {num}
                </div>
                <div style={{ fontSize: 11, fontWeight: 800, color: '#E31837', letterSpacing: '0.04em', marginBottom: 12 }}>
                  {num}
                </div>
                <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-secondary)', marginBottom: 10 }}>
                  {label}
                </div>
                <div style={{ fontSize: 30, fontWeight: 800, color: 'var(--text-primary)', letterSpacing: '-0.02em', lineHeight: 1, marginBottom: 8 }}>
                  {formatNumber(value)}
                  <span style={{ fontSize: 13, fontWeight: 500, color: 'var(--text-muted)', marginLeft: 4 }}>건</span>
                </div>
                <div style={{ height: 3, background: '#2A2D3E', borderRadius: 2, marginBottom: 6 }}>
                  <div style={{ height: '100%', width: `${pct}%`, background: '#E31837', borderRadius: 2 }} />
                </div>
                <div style={{ fontSize: 10, color: 'var(--text-muted)' }}>{pct}%</div>
              </div>
            )
          })}
        </div>
      </div>

      {/* ── 하단 상세 테이블 ─────────────────────────────── */}
      <div>
        <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: 14 }}>
          CS 상세 내역
        </div>
        {details.length === 0 ? (
          <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 10, padding: '20px', color: 'var(--text-muted)', fontSize: 13 }}>
            CS상세 데이터 없음
          </div>
        ) : (
          <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 12, overflow: 'hidden' }}>
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid var(--border)' }}>
                    {['NO', '날짜', '구분', '회사명', '요청내용', '처리내용', '처리현황'].map((col) => (
                      <th key={col} style={{
                        padding: '10px 14px', textAlign: 'left',
                        fontSize: 11, fontWeight: 700, color: 'var(--text-muted)',
                        letterSpacing: '0.06em', whiteSpace: 'nowrap',
                        background: '#13151F',
                      }}>
                        {col}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {details.map((row, i) => {
                    const st = STATUS_STYLE[row.처리현황] ?? { bg: 'transparent', color: 'var(--text-secondary)' }
                    const isEstimate = row.구분 === '견적문의'
                    return (
                      <tr key={i} style={{
                        borderBottom: '1px solid rgba(42,45,62,0.5)',
                        background: isEstimate ? 'rgba(227,24,55,0.04)' : 'transparent',
                      }}>
                        <td style={{ padding: '10px 14px', color: 'var(--text-muted)', fontSize: 11, whiteSpace: 'nowrap' }}>
                          {String(row.NO || i + 1).padStart(2, '0')}
                        </td>
                        <td style={{ padding: '10px 14px', color: 'var(--text-secondary)', whiteSpace: 'nowrap' }}>{row.날짜}</td>
                        <td style={{ padding: '10px 14px', whiteSpace: 'nowrap' }}>
                          <span style={{
                            fontSize: 11, fontWeight: 600, padding: '2px 8px', borderRadius: 20,
                            background: isEstimate ? 'rgba(227,24,55,0.12)' : 'rgba(139,144,167,0.12)',
                            color: isEstimate ? '#E31837' : 'var(--text-secondary)',
                          }}>
                            {row.구분}
                          </span>
                        </td>
                        <td style={{ padding: '10px 14px', color: 'var(--text-primary)', fontWeight: 500, whiteSpace: 'nowrap' }}>{row.회사명}</td>
                        <td style={{ padding: '10px 14px', color: 'var(--text-secondary)', maxWidth: 220 }}>
                          <div style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{row.요청내용}</div>
                        </td>
                        <td style={{ padding: '10px 14px', color: 'var(--text-secondary)', maxWidth: 220 }}>
                          <div style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{row.처리내용}</div>
                        </td>
                        <td style={{ padding: '10px 14px', whiteSpace: 'nowrap' }}>
                          <span style={{ fontSize: 11, fontWeight: 700, padding: '3px 10px', borderRadius: 20, background: st.bg, color: st.color }}>
                            {row.처리현황}
                          </span>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
