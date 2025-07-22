import { AffiliatesTable } from "@/components/affiliates-table"

export default function AffiliatesPage() {
  return (
    <div className="flex min-h-[calc(100vh_-_theme(spacing.16))] flex-1 flex-col p-4 md:p-10">
      <h1 className="text-3xl font-bold mb-6">Affiliates</h1>
      <AffiliatesTable />
    </div>
  )
}
