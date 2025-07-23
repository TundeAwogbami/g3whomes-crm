import { PropertyForm } from "@/components/property-form"
import { addProperty } from "@/app/properties/action" // Import the server action
import { useFormState } from "react-dom" // Import useFormState

export default function AddPropertyPage() {
  const [state, formAction] = useFormState(addProperty, null)

  return (
    <div className="flex min-h-[calc(100vh_-_theme(spacing.16))] flex-1 flex-col items-center justify-center p-4 md:p-10">
      <PropertyForm formAction={formAction} formState={state} />
    </div>
  )
}
