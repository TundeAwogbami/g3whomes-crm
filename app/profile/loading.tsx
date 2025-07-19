import { Loader2 } from "lucide-react"

export default function ProfileLoading() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 dark:bg-gray-950">
      <Loader2 className="h-8 w-8 animate-spin text-dark-orange-500" />
    </div>
  )
}
