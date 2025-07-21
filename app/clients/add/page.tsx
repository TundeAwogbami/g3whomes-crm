import { ClientForm } from "@/components/client-form"

export default function AddClientPage() {
  return (
    <div className="flex min-h-[calc(100vh_-_theme(spacing.16))] flex-1 flex-col items-center justify-center p-4 md:p-10">
      <ClientForm />
    </div>
  )
}
