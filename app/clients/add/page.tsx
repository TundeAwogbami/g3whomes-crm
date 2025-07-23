import { ClientForm } from "@/components/client-form"
import { addClient } from "@/app/clients/action" // Import the server action
import { useFormState } from "react-dom" // Import useFormState

export default function AddClientPage() {
  const [state, formAction] = useFormState(addClient, null) // Initialize useFormState

  return (
    <div className="flex min-h-[calc(100vh_-_theme(spacing.16))] flex-1 flex-col items-center justify-center p-4 md:p-10">
      <ClientForm formAction={formAction} formState={state} />
    </div>
  )
}
