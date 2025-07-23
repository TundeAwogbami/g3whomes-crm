import { DealForm } from "@/components/deal-form"

export default function AddDealPage() {
  return (
    <div className="flex min-h-[calc(100vh_-_theme(spacing.16))] flex-1 flex-col items-center justify-center p-4 md:p-10">
      <DealForm />
    </div>
  )
}
