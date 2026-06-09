'use client'

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Cell,
  ResponsiveContainer,
} from 'recharts'
import { getChannelColor, formatNumber } from '@/lib/format'

interface BarDataPoint {
  채널: string
  방문수: number
}

interface ChannelBarChartProps {
  data: BarDataPoint[]
}

function CustomTooltip({ active, payload, label }: any) {
  if (!active || !payload?.length) return null
  return (
    <div
      style={{
        background: '#1C1E2E',
        border: '1px solid #2A2D3E',
        borderRadius: 8,
        padding: '10px 14px',
        fontSize: 12,
      }}
    >
      <div style={{ color: '#8B90A7', marginBottom: 6, fontWeight: 600 }}>{label}</div>
      <div style={{ color: '#F0F2FF', fontWeight: 700, fontSize: 14 }}>
        {formatNumber(payload[0].value)}
        <span style={{ fontSize: 11, color: '#8B90A7', marginLeft: 4 }}>방문</span>
      </div>
    </div>
  )
}

export default function ChannelBarChart({ data }: ChannelBarChartProps) {
  const max = Math.max(...data.map((d) => d.방문수))

  return (
    <div
      style={{
        background: 'var(--bg-card)',
        border: '1px solid var(--border)',
        borderRadius: 12,
        padding: '24px 28px',
      }}
    >
      {/* 헤더 */}
      <div style={{ marginBottom: 24 }}>
        <div
          style={{
            fontSize: 11,
            fontWeight: 600,
            letterSpacing: '0.1em',
            color: 'var(--text-muted)',
            textTransform: 'uppercase',
            marginBottom: 4,
          }}
        >
          This Week
        </div>
        <div
          style={{
            fontSize: 16,
            fontWeight: 700,
            color: 'var(--text-primary)',
          }}
        >
          채널별 방문수 비교
        </div>
      </div>

      <ResponsiveContainer width="100%" height={280}>
        <BarChart data={data} margin={{ top: 4, right: 8, left: 0, bottom: 0 }} barSize={48}>
          <CartesianGrid strokeDasharray="3 3" stroke="#2A2D3E" vertical={false} />
          <XAxis
            dataKey="채널"
            tick={{ fill: '#8B90A7', fontSize: 12, fontWeight: 600 }}
            axisLine={false}
            tickLine={false}
            dy={8}
          />
          <YAxis
            tick={{ fill: '#8B90A7', fontSize: 11 }}
            axisLine={false}
            tickLine={false}
            tickFormatter={(v) => formatNumber(v)}
            width={60}
          />
          <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(255,255,255,0.03)' }} />
          <Bar dataKey="방문수" radius={[6, 6, 0, 0]}>
            {data.map((entry) => (
              <Cell
                key={entry.채널}
                fill={getChannelColor(entry.채널)}
                opacity={entry.방문수 === max ? 1 : 0.65}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>

      {/* 하단 수치 요약 */}
      <div
        style={{
          display: 'flex',
          gap: 12,
          marginTop: 20,
          paddingTop: 20,
          borderTop: '1px solid var(--border)',
        }}
      >
        {data.map((d) => (
          <div key={d.채널} style={{ flex: 1, textAlign: 'center' }}>
            <div
              style={{
                width: 8,
                height: 8,
                borderRadius: '50%',
                background: getChannelColor(d.채널),
                margin: '0 auto 6px',
              }}
            />
            <div style={{ fontSize: 11, color: 'var(--text-muted)', marginBottom: 2 }}>
              {d.채널}
            </div>
            <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--text-primary)' }}>
              {formatNumber(d.방문수)}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
