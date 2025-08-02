import { Suspense } from "react"
import { EmployeeRanking } from "@/components/dashboard/employee-ranking"
import { mockProfessionals, mockEvents } from "@/lib/calendar-utils"

interface RankingsPageProps {
  params: {
    locale: string
  }
}

export default function RankingsPage({ params }: RankingsPageProps) {
  // In a real app, you would get tenantId from authentication/session
  const tenantId = "beleza-milena" // This should come from your auth system

  return (
    <div className="container mx-auto py-6">
      <Suspense
        fallback={
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        }
      >
        <EmployeeRanking
          professionals={mockProfessionals}
          events={mockEvents}
          tenantId={tenantId}
          locale={params.locale}
        />
      </Suspense>
    </div>
  )
}
