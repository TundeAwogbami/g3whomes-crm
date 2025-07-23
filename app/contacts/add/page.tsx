import { ContactForm } from "@/components/contact-form"
import { addContact } from "@/app/contacts/action"
import { useFormState } from "react-dom"

export default function AddContactPage() {
  const [state, formAction] = useFormState(addContact, null)

  return (
    <div className="flex min-h-[calc(100vh_-_theme(spacing.16))] flex-1 flex-col items-center justify-center p-4 md:p-10">
      <ContactForm formAction={formAction} formState={state} />
    </div>
  )
}
