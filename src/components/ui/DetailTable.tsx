'use client'

import { formatNumber, formatDelta, getDeltaDirection } from '@/lib/format'

export interface ColDef {
  key: string
  label: string
  isDelta?: boolean
}

export default function DetailTable({
  rows,
  columns,
}: {
  rows: Record<string, string | number>[]
  columns: ColDef[]
}) {
  return (
    <div style={{ overflowX: 'auto' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
        <thead>
          <tr>
            {columns.map((col) => (
              <th key={col.key} style={{
                padding: '10px 16px',
                textAlign: col.key === '주차' ? 'left' : 'right',
                color: 'var(--text-muted)', fontWeight: 600, fontSize: 11,
                letterSpacing: '0.06em', borderBottom: '1px solid var(--border)', whiteSpace: 'nowrap',
              }}>{col.label}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i} style={{ borderBottom: '1px solid rgba(42,45,62,0.5)' }}>
              {columns.map((col) => {
                const val = row[col.key]
                const numVal = typeof val === 'number' ? val : Number(val)
                const dir = col.isDelta ? getDeltaDirection(numVal) : 'neutral'
                return (
                  <td key={col.key} style={{
                    padding: '10px 16px',
                    textAlign: col.key === '주차' ? 'left' : 'right',
                    color: col.isDelta
                      ? dir === 'up' ? 'var(--up)' : dir === 'down' ? 'var(--down)' : 'var(--text-muted)'
                      : 'var(--text-primary)',
                    fontWeight: col.key === '주차' ? 600 : 400, whiteSpace: 'nowrap',
                  }}>
                    {col.isDelta ? formatDelta(numVal)
                      : col.key === '주차' ? String(val)
                      : formatNumber(numVal)}
                  </td>
                )
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
