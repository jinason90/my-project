import type { Metadata } from 'next'
import './globals.css'
import NavShell from '@/components/layout/NavShell'

export const metadata: Metadata = {
  title: 'HELIKOREA Marketing Dashboard',
  description: '헬리코리아 채널별 방문수 · 조회수 주간 트래킹',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <body suppressHydrationWarning>
        <NavShell />
        <main className="layout-main" style={{ minHeight: '100vh', background: 'var(--bg-base)' }}>
          {children}
        </main>
      </body>
    </html>
  )
}
