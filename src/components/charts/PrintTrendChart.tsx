'use client'

import {
  LineChart, Line, XAxis, YAxis, CartesianGrid,
  Tooltip, Legend, ResponsiveContainer,
} from 'recharts'
import { formatNumber } from '@/lib/format'

interface PrintTrendChartProps {
  data: { 주차: string;[key: string]: string | number }[]
  lines: { key: string; label: string; dash?: boolean }[]
}

const GRAYS = ['#111111', '#666666', '#AAAAAA', '#CCCCCC']

export default function PrintTrendChart({ data, lines }: PrintTrendChartProps) {
  return (
    <ResponsiveContainer width="100%" height={160}>
      <LineChart data={data} margin={{ top: 4, right: 8, left: 0, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" vertical={false} />
        <XAxis
          dataKey="주차"
          tick={{ fill: '#9CA3AF', fontSize: 9 }}
          axisLine={false} tickLine={false} dy={4}
        />
        <YAxis
          tick={{ fill: '#9CA3AF', fontSize: 9 }}
          axisLine={false} tickLine={false}
          tickFormatter={(v) => formatNumber(v)}
          width={52}
        />
        <Tooltip
          contentStyle={{ fontSize: 11, border: '1px solid #E5E7EB', borderRadius: 6 }}
          formatter={(val) => formatNumber(Number(val))}
        />
        <Legend
          iconType="plainline"
          iconSize={16}
          wrapperStyle={{ fontSize: 10, color: '#6B7280', paddingTop: 8 }}
        />
        {lines.map((line, i) => (
          <Line
            key={line.key}
            type="monotone"
            dataKey={line.key}
            name={line.label}
            stroke={GRAYS[i % GRAYS.length]}
            strokeWidth={1.5}
            strokeDasharray={line.dash ? '4 3' : undefined}
            dot={{ r: 2, strokeWidth: 0, fill: GRAYS[i % GRAYS.length] }}
            activeDot={{ r: 4 }}
          />
        ))}
      </LineChart>
    </ResponsiveContainer>
  )
}
