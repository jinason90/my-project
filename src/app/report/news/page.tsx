import { getNewsData, getAllWeeks } from '@/lib/sheets'
import PageShell from '@/components/layout/PageShell'
import NewsCard from '@/components/ui/NewsCard'
import WeekSelector from '@/components/ui/WeekSelector'

export const revalidate = 3600

export default async function NewsPage({
  searchParams,
}: {
  searchParams: Promise<{ week?: string }>
}) {
  const { week } = await searchParams
  const [news, weeks] = await Promise.all([
    getNewsData().catch(() => []),
    getAllWeeks('뉴스').catch(() => []),
  ])

  // 뉴스 탭은 '주차' 대신 '날짜' 컬럼이라 별도로 날짜 목록 추출
  const dates = [...new Set(news.map((n) => n.날짜).filter(Boolean))].reverse()
  const selectedDate = week ?? dates[0] ?? ''
  const filtered = selectedDate
    ? news.filter((n) => n.날짜 === selectedDate)
    : news.slice(-10).reverse()

  return (
    <PageShell
      title="뉴스"
      accent="#00C49F"
      weekSelector={
        dates.length > 0 ? (
          <WeekSelector weeks={dates} selected={selectedDate} />
        ) : undefined
      }
    >
      {filtered.length === 0 ? (
        <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 10, padding: '20px', color: 'var(--text-muted)', fontSize: 13 }}>
          등록된 뉴스 없음
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: 12 }}>
          {filtered.map((item, i) => (
            <NewsCard key={i} 날짜={item.날짜} 제목={item.제목} 핵심내용={item.핵심내용}
              출처={item.출처} 카테고리={item.카테고리} 링크={item.링크} />
          ))}
        </div>
      )}
    </PageShell>
  )
}
