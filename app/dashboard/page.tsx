import { RoleDashboard } from "@/components/role-dashboard"
import { getServerSession } from "next-auth"
import { redirect } from "next/navigation"

export default async function DashboardPage() {
  const session = await getServerSession()

  // Redirect to sign-in if not authenticated
  if (!session) {
    redirect("/auth/signin")
  }

  return <RoleDashboard />
}
