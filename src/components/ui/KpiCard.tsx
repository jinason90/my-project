'use client'

import { formatNumber, formatDelta, getDeltaDirection, getChannelColor } from '@/lib/format'

interface KpiCardProps {
  channel: string
  label?: string
  visits: number
  delta: number
}

const CHANNEL_ICONS: Record<string, string> = { 블로그: '✦', 홈페이지: '◈', 쇼핑몰: '◉', 광고: '▲' }

export default function KpiCard({ channel, label = '이번 주 방문수', visits, delta }: KpiCardProps) {
  const direction = getDeltaDirection(delta)
  const color = getChannelColor(channel)
  const icon = CHANNEL_ICONS[channel] ?? '●'

  return (
    <div style={{
      background: 'var(--bg-card)', border: '1px solid var(--border)',
      borderRadius: 12, padding: '20px 24px', position: 'relative', overflow: 'hidden',
      transition: 'border-color 0.2s',
    }}
      onMouseEnter={e => (e.currentTarget.style.borderColor = color + '60')}
      onMouseLeave={e => (e.currentTarget.style.borderColor = 'var(--border)')}
    >
      <div style={{ position: 'absolute', top: 0, left: 0, width: 3, height: '100%', background: color, borderRadius: '12px 0 0 12px' }} />
      <div style={{ position: 'absolute', top: -40, right: -40, width: 110, height: 110, borderRadius: '50%', background: color + '0D', pointerEvents: 'none' }} />
      <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 12 }}>
        <span style={{ color, fontSize: 11 }}>{icon}</span>
        <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.08em', color: 'var(--text-secondary)', textTransform: 'uppercase' }}>
          {channel}
        </span>
      </div>
      <div style={{ fontSize: 32, fontWeight: 700, letterSpacing: '-0.02em', color: 'var(--text-primary)', lineHeight: 1, marginBottom: 8 }}>
        {formatNumber(visits)}
      </div>
      <div style={{ fontSize: 11, color: 'var(--text-muted)', marginBottom: 12 }}>{label}</div>
      <div style={{ display: 'inline-flex', alignItems: 'center', gap: 4, padding: '3px 9px', borderRadius: 20, fontSize: 11, fontWeight: 600,
        background: direction === 'up' ? 'rgba(52,211,153,0.12)' : direction === 'down' ? 'rgba(248,113,113,0.12)' : 'rgba(139,144,167,0.12)',
        color: direction === 'up' ? 'var(--up)' : direction === 'down' ? 'var(--down)' : 'var(--text-secondary)',
      }}>
        {direction === 'up' ? '▲' : direction === 'down' ? '▼' : '—'} {formatDelta(delta)}
      </div>
      <span style={{ marginLeft: 8, fontSize: 11, color: 'var(--text-muted)' }}>전주 대비</span>
    </div>
  )
}
