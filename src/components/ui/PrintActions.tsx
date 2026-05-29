'use client'

import { useRouter } from 'next/navigation'

export default function PrintActions() {
  const router = useRouter()

  const baseStyle: React.CSSProperties = {
    padding: '6px 16px', borderRadius: 6, fontSize: 12, fontWeight: 600,
    cursor: 'pointer', fontFamily: 'inherit',
  }

  return (
    <div style={{ display: 'flex', gap: 8 }}>
      <button
        onClick={() => router.back()}
        style={{ ...baseStyle, background: '#fff', color: '#374151', border: '1px solid #D1D5DB' }}
      >
        ← 돌아가기
      </button>
      <button
        onClick={() => window.print()}
        style={{ ...baseStyle, background: '#E31837', color: '#fff', border: 'none' }}
      >
        🖨 인쇄 / PDF 저장
      </button>
    </div>
  )
}
