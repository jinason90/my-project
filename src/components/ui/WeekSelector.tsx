'use client'

import { useRouter, usePathname, useSearchParams } from 'next/navigation'
import { useCallback } from 'react'

interface WeekSelectorProps {
  weeks: string[]
  selected: string
}

export default function WeekSelector({ weeks, selected }: WeekSelectorProps) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const handleChange = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
    const params = new URLSearchParams(searchParams.toString())
    params.set('week', e.target.value)
    router.push(`${pathname}?${params.toString()}`)
  }, [router, pathname, searchParams])

  return (
    <div style={{ position: 'relative' }}>
      <select
        value={selected}
        onChange={handleChange}
        style={{
          appearance: 'none',
          background: 'var(--bg-card)',
          border: '1px solid var(--border)',
          borderRadius: 20,
          padding: '4px 32px 4px 12px',
          fontSize: 11,
          fontWeight: 600,
          color: 'var(--text-secondary)',
          cursor: 'pointer',
          outline: 'none',
          fontFamily: 'inherit',
        }}
      >
        {weeks.map((w) => (
          <option key={w} value={w} style={{ background: '#1C1E2E', color: '#F0F2FF' }}>
            {w}
          </option>
        ))}
      </select>
      {/* 드롭다운 화살표 */}
      <div style={{
        position: 'absolute', right: 10, top: '50%',
        transform: 'translateY(-50%)',
        pointerEvents: 'none',
        fontSize: 9, color: 'var(--text-muted)',
      }}>▼</div>
    </div>
  )
}
