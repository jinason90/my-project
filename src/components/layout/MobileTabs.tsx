'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

const NAV = [
  { href: '/blog',     label: '블로그',  accent: '#1D6FEB' },
  { href: '/homepage', label: '홈페이지', accent: '#00C49F' },
  { href: '/shopping', label: '쇼핑몰',  accent: '#FF6B35' },
  { href: '/ads',      label: '광고',    accent: '#E31837'  },
  { href: '/report',   label: '리포트',  accent: '#A78BFA'  },
]

export default function MobileTabs() {
  const pathname = usePathname()
  return (
    <nav style={{
      display: 'flex',
      background: '#13151F',
      borderBottom: '1px solid #2A2D3E',
      overflowX: 'auto',
      scrollbarWidth: 'none',
    }}>
      {NAV.map(({ href, label, accent }) => {
        const active = pathname === href || pathname.startsWith(href + '/')
        return (
          <Link key={href} href={href} style={{ textDecoration: 'none', flexShrink: 0 }}>
            <div style={{
              padding: '14px 20px',
              fontSize: 13, fontWeight: active ? 700 : 500,
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
