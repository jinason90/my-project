'use client'

import { useRouter } from 'next/navigation'

export default function PrintButton() {
  const router = useRouter()
  return (
    <button
      className="no-print"
      onClick={() => router.push('/print')}
      style={{
        display: 'flex', alignItems: 'center', gap: 6,
        background: 'transparent',
        border: '1px solid #2A2D3E',
        borderRadius: 20,
        padding: '5px 14px',
        fontSize: 11, fontWeight: 600,
        color: '#8B90A7',
        cursor: 'pointer',
        fontFamily: 'inherit',
        transition: 'border-color 0.15s, color 0.15s',
      }}
      onMouseEnter={e => {
        e.currentTarget.style.borderColor = '#E31837'
        e.currentTarget.style.color = '#F0F2FF'
      }}
      onMouseLeave={e => {
        e.currentTarget.style.borderColor = '#2A2D3E'
        e.currentTarget.style.color = '#8B90A7'
      }}
    >
      <span style={{ fontSize: 12 }}>🖨</span>
      PDF 보고서
    </button>
  )
}
