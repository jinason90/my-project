'use client'

import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts'

export interface DonutSlice {
  name: string
  value: number
  color: string
}

interface DonutChartProps {
  data: DonutSlice[]
  title: string
  unit?: string
  height?: number
}

function CustomTooltip({ active, payload, unit }: any) {
  if (!active || !payload?.length) return null
  const { name, value, payload: p } = payload[0]
  return (
    <div style={{
      background: '#1C1E2E', border: '1px solid #2A2D3E',
      borderRadius: 8, padding: '8px 12px', fontSize: 12,
    }}>
      <span style={{ color: p.color, marginRight: 6 }}>●</span>
      <span style={{ color: '#8B90A7' }}>{name}: </span>
      <span style={{ fontWeight: 700, color: '#F0F2FF' }}>{value}{unit ?? ''}</span>
    </div>
  )
}

export default function DonutChart({ data, title, unit, height = 260 }: DonutChartProps) {
  return (
    <div style={{
      background: 'var(--bg-card)', border: '1px solid var(--border)',
      borderRadius: 12, padding: '20px 24px',
    }}>
      <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 16 }}>
        {title}
      </div>
      <ResponsiveContainer width="100%" height={height}>
        <PieChart>
          <Pie data={data} cx="50%" cy="45%" innerRadius="50%" outerRadius="72%"
            paddingAngle={3} dataKey="value">
            {data.map((entry, i) => <Cell key={i} fill={entry.color} />)}
          </Pie>
          <Tooltip content={<CustomTooltip unit={unit} />} />
          <Legend iconType="circle" iconSize={8}
            wrapperStyle={{ fontSize: 12, color: '#8B90A7', paddingTop: 8 }} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  )
}
