'use client'

import {
  LineChart, Line, XAxis, YAxis, CartesianGrid,
  Tooltip, Legend, ResponsiveContainer,
} from 'recharts'
import { formatNumber } from '@/lib/format'

export interface TrendPoint {
  주차: string
  [channel: string]: string | number
}

export interface TrendChartProps {
  data: TrendPoint[]
  channels: string[]
  channelColors: Record<string, string>
  title: string
  unit?: string       // Y축 단위 표시용 (예: '방문수', '클릭수')
  height?: number
}

function CustomTooltip({ active, payload, label, unit }: any) {
  if (!active || !payload?.length) return null
  return (
    <div style={{
      background: '#1C1E2E', border: '1px solid #2A2D3E',
      borderRadius: 8, padding: '10px 14px', fontSize: 12, minWidth: 140,
    }}>
      <div style={{ color: '#8B90A7', marginBottom: 8, fontWeight: 600 }}>{label}</div>
      {payload.map((entry: any) => (
        <div key={entry.dataKey} style={{
          display: 'flex', alignItems: 'center',
          gap: 8, marginBottom: 4,
        }}>
          <span style={{
            display: 'inline-block', width: 8, height: 8,
            borderRadius: '50%', background: entry.color, flexShrink: 0,
          }} />
          <span style={{ color: '#8B90A7' }}>{entry.dataKey}</span>
          <span style={{ fontWeight: 600, marginLeft: 'auto', paddingLeft: 12, color: '#F0F2FF' }}>
            {formatNumber(entry.value)}
            {unit && <span style={{ color: '#5A5F7A', fontSize: 10, marginLeft: 2 }}>{unit}</span>}
          </span>
        </div>
      ))}
    </div>
  )
}

export default function TrendChart({
  data, channels, channelColors, title, unit, height = 220,
}: TrendChartProps) {
  return (
    <div style={{
      background: 'var(--bg-card)', border: '1px solid var(--border)',
      borderRadius: 12, padding: '20px 24px',
    }}>
      {/* 헤더 */}
      <div style={{ marginBottom: 16 }}>
        <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--text-primary)' }}>
          {title}
        </div>
        {unit && (
          <div style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 2 }}>
            단위: {unit}
          </div>
        )}
      </div>

      <ResponsiveContainer width="100%" height={height}>
        <LineChart data={data} margin={{ top: 4, right: 4, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#2A2D3E" vertical={false} />
          <XAxis
            dataKey="주차"
            tick={{ fill: '#8B90A7', fontSize: 10 }}
            axisLine={false} tickLine={false} dy={6}
          />
          <YAxis
            tick={{ fill: '#8B90A7', fontSize: 10 }}
            axisLine={false} tickLine={false}
            tickFormatter={(v) => formatNumber(v)}
            width={56}
          />
          <Tooltip content={<CustomTooltip unit={unit} />} />
          {channels.length > 1 && (
            <Legend
              wrapperStyle={{ fontSize: 11, color: '#8B90A7', paddingTop: 12 }}
              iconType="circle" iconSize={7}
            />
          )}
          {channels.map((ch) => (
            <Line
              key={ch} type="monotone" dataKey={ch}
              stroke={channelColors[ch] ?? '#8B90A7'} strokeWidth={2}
              dot={{ r: 3, strokeWidth: 0, fill: channelColors[ch] ?? '#8B90A7' }}
              activeDot={{ r: 5, strokeWidth: 0 }}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
