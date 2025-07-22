import { FinancialRecordsTable } from "@/components/financial-records-table"

export default function FinancialRecordsPage() {
  return (
    <div className="flex min-h-[calc(100vh_-_theme(spacing.16))] flex-1 flex-col p-4 md:p-10">
      <h1 className="text-3xl font-bold mb-6">Financial Records</h1>
      <FinancialRecordsTable />
    </div>
  )
}
