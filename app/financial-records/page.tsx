import { FinancialRecordsTable } from "@/components/financial-records-table"
import { getServerSession } from "next-auth"
import { redirect } from "next/navigation"
import { authOptions } from "@/app/api/auth/[...nextauth]/route" // Import authOptions

export default async function FinancialRecordsPage() {
  const session = await getServerSession(authOptions)

  // Redirect if not authenticated or not an admin
  if (!session || session.user.role !== "admin") {
    redirect("/auth/signin?error=AccessDenied")
  }

  return (
    <div className="flex min-h-[calc(100vh_-_theme(spacing.16))] flex-1 flex-col p-4 md:p-10">
      <h1 className="text-3xl font-bold mb-6">Financial Records</h1>
      <FinancialRecordsTable />
    </div>
  )
}

// This function gets called at build time
export async function getStaticProps() {
  return {
    props: {},
  }
}