import { ReportsOverview } from "@/components/reports-overview"

export default function ReportsPage() {
  return (
    <div className="flex min-h-[calc(100vh_-_theme(spacing.16))] flex-1 flex-col p-4 md:p-10">
      <h1 className="text-3xl font-bold mb-6">Reports</h1>
      <ReportsOverview />
    </div>
  )
}
