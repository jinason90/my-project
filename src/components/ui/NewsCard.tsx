'use client'

import { useState } from 'react'

const NEWS_CATEGORY_COLOR: Record<string, string> = {
  산업: '#1D6FEB', 경쟁사: '#E31837', 기술: '#00C49F', 정책: '#A78BFA',
  트렌드: '#FF6B35', 기타: '#8B90A7',
}

interface NewsCardProps {
  날짜: string
  제목: string
  핵심내용: string
  출처: string
  카테고리: string
  링크: string
}

export default function NewsCard({ 날짜, 제목, 핵심내용, 출처, 카테고리, 링크 }: NewsCardProps) {
  const [hovered, setHovered] = useState(false)
  const cc = NEWS_CATEGORY_COLOR[카테고리] ?? '#8B90A7'

  return (
    <div style={{
      background: 'var(--bg-card)', border: '1px solid var(--border)',
      borderRadius: 10, padding: '14px 16px',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 7 }}>
        <span style={{
          fontSize: 10, fontWeight: 700, padding: '2px 8px',
          borderRadius: 20, background: cc + '22', color: cc,
        }}>{카테고리}</span>
        <span style={{ fontSize: 11, color: 'var(--text-muted)' }}>{날짜}</span>
        <span style={{ fontSize: 11, color: 'var(--text-muted)', marginLeft: 'auto' }}>{출처}</span>
      </div>
      <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 5, lineHeight: 1.4 }}>
        {링크 ? (
          <a
            href={링크}
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: hovered ? cc : 'var(--text-primary)', textDecoration: 'none', transition: 'color 0.15s' }}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
          >
            {제목}
          </a>
        ) : (
          <span style={{ color: 'var(--text-primary)' }}>{제목}</span>
        )}
      </div>
      <div style={{ fontSize: 12, color: 'var(--text-secondary)', lineHeight: 1.5 }}>
        {핵심내용}
      </div>
    </div>
  )
}
