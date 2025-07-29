import { createServerClient } from "@/lib/supabase-server"
import { redirect } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Users, Home, DollarSign, TrendingUp, LogOut } from "lucide-react"
import { cookies } from "next/headers"

export default async function DashboardPage() {
  const supabase = createServerClient()

  // Try to get user from session
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser()

  console.log("🔍 Dashboard - User:", user)
  console.log("🔍 Dashboard - Error:", error)

  if (error || !user) {
    console.log("❌ No authenticated user, redirecting to signin")
    redirect("/auth/signin")
  }

  async function signOut() {
    "use server"
    const supabase = createServerClient()
    await supabase.auth.signOut()

    // Clear the auth cookie
    const cookieStore = cookies()
    cookieStore.delete("supabase-auth-token")

    redirect("/auth/signin")
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-4 sm:px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-orange-500 rounded flex items-center justify-center">
              <Home className="w-3 h-3 text-white" />
            </div>
            <h1 className="text-lg sm:text-xl font-semibold text-gray-900">G3W Homes CRM</h1>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-600">Welcome, {user.email}</span>
            <form action={signOut}>
              <Button size="sm" variant="outline">
                <LogOut className="w-4 h-4 mr-2" />
                Sign Out
              </Button>
            </form>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="p-4 sm:p-6">
        <div className="mb-6 sm:mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">Dashboard</h2>
          <p className="text-gray-600">Welcome back! Here's what's happening today.</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-8">
          <Card className="bg-white">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Total Clients</CardTitle>
              <Users className="h-4 w-4 text-blue-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">1,234</div>
              <p className="text-xs text-green-600">+12% from last month</p>
            </CardContent>
          </Card>

          <Card className="bg-white">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Active Listings</CardTitle>
              <Home className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">89</div>
              <p className="text-xs text-green-600">+5% from last month</p>
            </CardContent>
          </Card>

          <Card className="bg-white">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Monthly Revenue</CardTitle>
              <DollarSign className="h-4 w-4 text-yellow-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">₦187.5M</div>
              <p className="text-xs text-green-600">+18% from last month</p>
            </CardContent>
          </Card>

          <Card className="bg-white">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Deals Closed</CardTitle>
              <TrendingUp className="h-4 w-4 text-purple-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">23</div>
              <p className="text-xs text-green-600">+8% from last month</p>
            </CardContent>
          </Card>
        </div>

        <Card className="bg-white">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-gray-900">🎉 Authentication Success!</CardTitle>
            <CardDescription className="text-gray-600">
              You are successfully signed in as: <Badge variant="secondary">{user.email}</Badge>
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <p className="text-gray-600">
                <strong>✅ Your authentication is working perfectly!</strong>
              </p>
              <p className="text-sm text-gray-500">
                User ID: <code className="bg-gray-100 px-2 py-1 rounded">{user.id}</code>
              </p>
              <p className="text-sm text-gray-500">
                Email: <code className="bg-gray-100 px-2 py-1 rounded">{user.email}</code>
              </p>
              <p className="text-sm text-gray-500">
                Role: <code className="bg-gray-100 px-2 py-1 rounded">{user.user_metadata?.role || "staff"}</code>
              </p>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
