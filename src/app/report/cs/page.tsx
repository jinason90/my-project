import { getCsDetailData, calcCsStat, getAllWeeks } from '@/lib/sheets'
import PageShell from '@/components/layout/PageShell'
import CsSection from '@/components/ui/CsSection'
import WeekSelector from '@/components/ui/WeekSelector'

export const revalidate = 3600

export default async function CsPage({
  searchParams,
}: {
  searchParams: Promise<{ week?: string }>
}) {
  const { week } = await searchParams
  const [csDetails, weeks] = await Promise.all([
    getCsDetailData().catch(() => []),
    getAllWeeks('액션플랜').catch(() => []),
  ])

  const selectedWeek = week ?? weeks[weeks.length - 1] ?? ''
  const csStat = calcCsStat(csDetails)

  return (
    <PageShell
      title="CS현황"
      accent="#1D6FEB"
      weekSelector={
        weeks.length > 0 ? (
          <WeekSelector weeks={[...weeks].reverse()} selected={selectedWeek} />
        ) : undefined
      }
    >
      <CsSection stat={csStat} details={csDetails} />
    </PageShell>
  )
}
