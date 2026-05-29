import { getActionPlanData, getIssueData, getAllWeeks } from '@/lib/sheets'
import PageShell from '@/components/layout/PageShell'
import WeekSelector from '@/components/ui/WeekSelector'

export const revalidate = 3600

const STATUS_COLOR: Record<string, string> = {
  완료: '#34D399', '진행중': '#FBBF24', '미완': '#F87171', '대기': '#8B90A7',
}
const ISSUE_COLOR: Record<string, string> = {
  주의: '#FBBF24', 긴급: '#F87171', 일반: '#8B90A7', 기회: '#34D399',
}

export default async function ActionPlanPage({
  searchParams,
}: {
  searchParams: Promise<{ week?: string }>
}) {
  const { week } = await searchParams
  const [plans, issues, weeks] = await Promise.all([
    getActionPlanData().catch(() => []),
    getIssueData().catch(() => []),
    getAllWeeks('액션플랜').catch(() => []),
  ])

  const reversedWeeks = [...weeks].reverse()
  const selectedWeek = week ?? reversedWeeks[0] ?? ''

  const filteredPlans  = selectedWeek ? plans.filter(p => p.주차 === selectedWeek) : plans
  const filteredIssues = selectedWeek ? issues.filter(i => i.주차 === selectedWeek) : issues

  const done = filteredPlans.filter(p => p.상태 === '완료')
  const todo = filteredPlans.filter(p => p.상태 !== '완료')

  return (
    <PageShell
      title="액션플랜"
      accent="#A78BFA"
      weekSelector={
        reversedWeeks.length > 0 ? (
          <WeekSelector weeks={reversedWeeks} selected={selectedWeek} />
        ) : undefined
      }
    >
      {/* 진행 요약 */}
      {filteredPlans.length > 0 && (
        <div style={{ display: 'flex', gap: 12, marginBottom: 24 }}>
          {[
            { label: '전체', value: filteredPlans.length, color: '#8B90A7' },
            { label: '완료', value: done.length, color: '#34D399' },
            { label: '미완료', value: todo.length, color: '#F87171' },
          ].map(({ label, value, color }) => (
            <div key={label} style={{
              background: 'var(--bg-card)', border: '1px solid var(--border)',
              borderRadius: 8, padding: '12px 20px', display: 'flex', alignItems: 'center', gap: 8,
            }}>
              <span style={{ width: 8, height: 8, borderRadius: '50%', background: color, display: 'inline-block' }} />
              <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>{label}</span>
              <span style={{ fontSize: 18, fontWeight: 700, color: 'var(--text-primary)' }}>{value}</span>
            </div>
          ))}
        </div>
      )}

      {/* 액션플랜 + 이슈 2열 */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: 16 }}>
        <div>
          <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: 14 }}>
            액션플랜
          </div>
          {filteredPlans.length === 0 ? (
            <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 10, padding: '20px', color: 'var(--text-muted)', fontSize: 13 }}>
              액션플랜 없음
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {filteredPlans.map((p, i) => {
                const sc = STATUS_COLOR[p.상태] ?? '#8B90A7'
                return (
                  <div key={i} style={{
                    background: 'var(--bg-card)', border: '1px solid var(--border)',
                    borderRadius: 10, padding: '12px 16px',
                    display: 'flex', alignItems: 'flex-start', gap: 12,
                    opacity: p.상태 === '완료' ? 0.55 : 1,
                  }}>
                    <div style={{ width: 6, height: 6, borderRadius: '50%', background: sc, marginTop: 6, flexShrink: 0 }} />
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{
                        fontSize: 13, color: 'var(--text-primary)', fontWeight: 500,
                        textDecoration: p.상태 === '완료' ? 'line-through' : 'none',
                      }}>{p.내용}</div>
                      <div style={{ display: 'flex', gap: 12, marginTop: 5 }}>
                        <span style={{ fontSize: 11, color: 'var(--text-muted)' }}>담당 {p.담당}</span>
                        <span style={{ fontSize: 11, color: 'var(--text-muted)' }}>마감 {p.마감}</span>
                      </div>
                    </div>
                    <div style={{
                      fontSize: 10, fontWeight: 700, padding: '2px 8px',
                      borderRadius: 20, background: sc + '22', color: sc, flexShrink: 0,
                    }}>{p.상태}</div>
                  </div>
                )
              })}
            </div>
          )}
        </div>

        <div>
          <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: 14 }}>
            이슈
          </div>
          {filteredIssues.length === 0 ? (
            <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 10, padding: '20px', color: 'var(--text-muted)', fontSize: 13 }}>
              등록된 이슈 없음
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {filteredIssues.map((issue, i) => {
                const ic = ISSUE_COLOR[issue.구분] ?? '#8B90A7'
                return (
                  <div key={i} style={{
                    background: 'var(--bg-card)', border: '1px solid var(--border)',
                    borderRadius: 10, padding: '12px 16px', borderLeft: `3px solid ${ic}`,
                  }}>
                    <div style={{ marginBottom: 6 }}>
                      <span style={{ fontSize: 10, fontWeight: 700, padding: '2px 8px', borderRadius: 20, background: ic + '22', color: ic }}>
                        {issue.구분}
                      </span>
                    </div>
                    <div style={{ fontSize: 13, color: 'var(--text-primary)', lineHeight: 1.5 }}>{issue.내용}</div>
                  </div>
                )
              })}
            </div>
          )}
        </div>
      </div>
    </PageShell>
  )
}
