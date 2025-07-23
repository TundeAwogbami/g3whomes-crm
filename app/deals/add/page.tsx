import { DealForm } from "@/components/deal-form"
import { addDeal } from "@/app/deals/action"
import { useFormState } from "react-dom"

export default function AddDealPage() {
  const [state, formAction] = useFormState(addDeal, null)

  return (
    <div className="flex min-h-[calc(100vh_-_theme(spacing.16))] flex-1 flex-col items-center justify-center p-4 md:p-10">
      <DealForm formAction={formAction} formState={state} />
    </div>
  )
}
