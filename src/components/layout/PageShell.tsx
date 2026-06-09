import { Suspense } from 'react'
import PrintButton from '@/components/ui/PrintButton'

interface PageShellProps {
  title: string
  accent: string
  badge?: string
  weekSelector?: React.ReactNode
  children: React.ReactNode
}

export default function PageShell({ title, accent, badge, weekSelector, children }: PageShellProps) {
  return (
    <div style={{ padding: '32px 36px 80px' }}>
      <div style={{
        display: 'flex', alignItems: 'center',
        justifyContent: 'space-between', marginBottom: 32,
        paddingBottom: 20, borderBottom: '1px solid var(--border)',
      }}>
        {/* 타이틀 */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ width: 4, height: 20, background: accent, borderRadius: 2 }} />
          <h1 style={{ fontSize: 20, fontWeight: 800, color: 'var(--text-primary)', letterSpacing: '-0.02em' }}>
            {title}
          </h1>
        </div>

        {/* 우측: 주차 선택 + PDF 버튼 */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <Suspense fallback={
            <div style={{
              fontSize: 11, color: 'var(--text-secondary)',
              background: 'var(--bg-card)', border: '1px solid var(--border)',
              borderRadius: 20, padding: '4px 12px', fontWeight: 600,
            }}>
              {badge ?? ''}
            </div>
          }>
            {weekSelector ?? (badge && (
              <div style={{
                fontSize: 11, color: 'var(--text-secondary)',
                background: 'var(--bg-card)', border: '1px solid var(--border)',
                borderRadius: 20, padding: '4px 12px', fontWeight: 600,
              }}>
                기준: {badge}
              </div>
            ))}
          </Suspense>
          <PrintButton />
        </div>
      </div>
      {children}
    </div>
  )
}
