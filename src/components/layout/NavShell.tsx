'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

const CHANNEL_NAV = [
  { href: '/blog',     label: '블로그',  icon: '✦', accent: '#1D6FEB' },
  { href: '/homepage', label: '홈페이지', icon: '◈', accent: '#00C49F' },
  { href: '/shopping', label: '쇼핑몰',  icon: '◉', accent: '#FF6B35' },
  { href: '/ads',      label: '광고',    icon: '▲', accent: '#E31837'  },
]

const REPORT_NAV = [
  { href: '/report/cs',          label: 'CS현황',   icon: '◐', accent: '#1D6FEB' },
  { href: '/report/news',        label: '뉴스',     icon: '◑', accent: '#00C49F' },
  { href: '/report/action-plan', label: '액션플랜', icon: '◒', accent: '#A78BFA' },
]

function Logo() {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
      <div style={{
        width: 30, height: 30, background: '#E31837', borderRadius: 7, flexShrink: 0,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: 13, fontWeight: 900, color: '#fff',
      }}>H</div>
      <div>
        <div style={{ fontSize: 13, fontWeight: 800, color: '#F0F2FF', letterSpacing: '-0.01em' }}>HELIKOREA</div>
        <div style={{ fontSize: 10, color: '#5A5F7A', letterSpacing: '0.04em' }}>DASHBOARD</div>
      </div>
    </div>
  )
}

function NavItem({ href, label, icon, accent, pathname }: {
  href: string; label: string; icon: string; accent: string; pathname: string
}) {
  const active = pathname === href || pathname.startsWith(href + '/')
  return (
    <Link href={href} style={{ textDecoration: 'none' }}>
      <div style={{
        display: 'flex', alignItems: 'center', gap: 10,
        padding: '10px 12px', borderRadius: 8, marginBottom: 2,
        background: active ? accent + '18' : 'transparent',
        borderLeft: active ? `3px solid ${accent}` : '3px solid transparent',
        cursor: 'pointer',
      }}>
        <span style={{ fontSize: 12, color: active ? accent : '#5A5F7A', width: 16, textAlign: 'center' }}>{icon}</span>
        <span style={{ fontSize: 13, fontWeight: active ? 700 : 500, color: active ? '#F0F2FF' : '#8B90A7' }}>{label}</span>
      </div>
    </Link>
  )
}

function Sidebar({ pathname }: { pathname: string }) {
  return (
    <aside style={{
      width: 220, minHeight: '100vh',
      background: '#13151F', borderRight: '1px solid #2A2D3E',
      display: 'flex', flexDirection: 'column',
      position: 'fixed', top: 0, left: 0, zIndex: 20,
    }}>
      <div style={{ padding: '0 24px', height: 64, display: 'flex', alignItems: 'center', borderBottom: '1px solid #2A2D3E' }}>
        <Logo />
      </div>
      <nav style={{ padding: '16px 12px', flex: 1, overflowY: 'auto' }}>
        <div style={{ fontSize: 10, fontWeight: 700, color: '#5A5F7A', letterSpacing: '0.1em', padding: '0 12px', marginBottom: 8 }}>
          CHANNELS
        </div>
        {CHANNEL_NAV.map((item) => <NavItem key={item.href} {...item} pathname={pathname} />)}

        <div style={{ fontSize: 10, fontWeight: 700, color: '#5A5F7A', letterSpacing: '0.1em', padding: '16px 12px 8px' }}>
          REPORT
        </div>
        {REPORT_NAV.map((item) => <NavItem key={item.href} {...item} pathname={pathname} />)}
      </nav>
      <div style={{ padding: '16px 24px', borderTop: '1px solid #2A2D3E' }}>
        <div style={{ fontSize: 10, color: '#5A5F7A' }}>헬리코리아 마케팅팀</div>
      </div>
    </aside>
  )
}

function MobileTabs({ pathname }: { pathname: string }) {
  const allNav = [...CHANNEL_NAV, ...REPORT_NAV]
  return (
    <nav style={{
      display: 'flex', background: '#13151F',
      borderBottom: '1px solid #2A2D3E',
      overflowX: 'auto', scrollbarWidth: 'none',
    }}>
      {allNav.map(({ href, label, accent }) => {
        const active = pathname === href || pathname.startsWith(href + '/')
        return (
          <Link key={href} href={href} style={{ textDecoration: 'none', flexShrink: 0 }}>
            <div style={{
              padding: '14px 16px', fontSize: 13,
              fontWeight: active ? 700 : 500,
              color: active ? accent : '#8B90A7',
              borderBottom: active ? `2px solid ${accent}` : '2px solid transparent',
              whiteSpace: 'nowrap',
            }}>
              {label}
            </div>
          </Link>
        )
      })}
    </nav>
  )
}

export default function NavShell() {
  const pathname = usePathname()
  return (
    <>
      <div className="layout-sidebar"><Sidebar pathname={pathname} /></div>
      <div className="layout-mobile-tabs"><MobileTabs pathname={pathname} /></div>
    </>
  )
}
