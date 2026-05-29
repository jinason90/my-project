'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

const NAV = [
  { href: '/blog',     label: '블로그',  icon: '✦', accent: '#1D6FEB' },
  { href: '/homepage', label: '홈페이지', icon: '◈', accent: '#00C49F' },
  { href: '/shopping', label: '쇼핑몰',  icon: '◉', accent: '#FF6B35' },
  { href: '/ads',      label: '광고',    icon: '▲', accent: '#E31837'  },
  { href: '/report',   label: '리포트',  icon: '◎', accent: '#A78BFA'  },
]

export default function Sidebar() {
  const pathname = usePathname()

  return (
    <aside style={{
      width: 220,
      minHeight: '100vh',
      background: '#13151F',
      borderRight: '1px solid #2A2D3E',
      display: 'flex',
      flexDirection: 'column',
      position: 'fixed',
      top: 0,
      left: 0,
      zIndex: 20,
    }}>
      {/* 로고 */}
      <div style={{
        padding: '0 24px',
        height: 64,
        display: 'flex',
        alignItems: 'center',
        gap: 10,
        borderBottom: '1px solid #2A2D3E',
      }}>
        <div style={{
          width: 30, height: 30,
          background: '#E31837', borderRadius: 7,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 13, fontWeight: 900, color: '#fff', flexShrink: 0,
        }}>H</div>
        <div>
          <div style={{ fontSize: 13, fontWeight: 800, color: '#F0F2FF', letterSpacing: '-0.01em' }}>
            HELIKOREA
          </div>
          <div style={{ fontSize: 10, color: '#5A5F7A', letterSpacing: '0.04em' }}>
            DASHBOARD
          </div>
        </div>
      </div>

      {/* 네비게이션 */}
      <nav style={{ padding: '16px 12px', flex: 1 }}>
        <div style={{ fontSize: 10, fontWeight: 700, color: '#5A5F7A', letterSpacing: '0.1em', padding: '0 12px', marginBottom: 8 }}>
          CHANNELS
        </div>
        {NAV.slice(0, 4).map(({ href, label, icon, accent }) => {
          const active = pathname === href || pathname.startsWith(href + '/')
          return (
            <Link key={href} href={href} style={{ textDecoration: 'none' }}>
              <div style={{
                display: 'flex', alignItems: 'center', gap: 10,
                padding: '10px 12px', borderRadius: 8, marginBottom: 2,
                background: active ? accent + '18' : 'transparent',
                borderLeft: active ? `3px solid ${accent}` : '3px solid transparent',
                transition: 'all 0.15s',
                cursor: 'pointer',
              }}>
                <span style={{ fontSize: 12, color: active ? accent : '#5A5F7A', width: 16, textAlign: 'center' }}>
                  {icon}
                </span>
                <span style={{ fontSize: 13, fontWeight: active ? 700 : 500, color: active ? '#F0F2FF' : '#8B90A7' }}>
                  {label}
                </span>
              </div>
            </Link>
          )
        })}

        <div style={{ fontSize: 10, fontWeight: 700, color: '#5A5F7A', letterSpacing: '0.1em', padding: '16px 12px 8px' }}>
          REPORT
        </div>
        {NAV.slice(4).map(({ href, label, icon, accent }) => {
          const active = pathname === href
          return (
            <Link key={href} href={href} style={{ textDecoration: 'none' }}>
              <div style={{
                display: 'flex', alignItems: 'center', gap: 10,
                padding: '10px 12px', borderRadius: 8, marginBottom: 2,
                background: active ? accent + '18' : 'transparent',
                borderLeft: active ? `3px solid ${accent}` : '3px solid transparent',
                transition: 'all 0.15s',
                cursor: 'pointer',
              }}>
                <span style={{ fontSize: 12, color: active ? accent : '#5A5F7A', width: 16, textAlign: 'center' }}>
                  {icon}
                </span>
                <span style={{ fontSize: 13, fontWeight: active ? 700 : 500, color: active ? '#F0F2FF' : '#8B90A7' }}>
                  {label}
                </span>
              </div>
            </Link>
          )
        })}
      </nav>

      {/* 하단 */}
      <div style={{ padding: '16px 24px', borderTop: '1px solid #2A2D3E' }}>
        <div style={{ fontSize: 10, color: '#5A5F7A' }}>헬리코리아 마케팅팀</div>
      </div>
    </aside>
  )
}
