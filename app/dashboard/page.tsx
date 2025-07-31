import { redirect } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Users, Home, DollarSign, TrendingUp, LogOut, Shield, Settings, UserCheck, RefreshCw } from "lucide-react"
import { cookies } from "next/headers"
import { switchRole } from "./switch-role-action"

// Role-based permissions
const ROLE_PERMISSIONS = {
  admin: {
    label: "Administrator",
    color: "bg-red-500",
    permissions: ["manage_users", "manage_properties", "view_analytics", "manage_settings"],
    description: "Full system access - can manage everything",
  },
  agent: {
    label: "Real Estate Agent",
    color: "bg-blue-500",
    permissions: ["manage_properties", "view_clients", "create_deals"],
    description: "Can manage properties and create deals with clients",
  },
  affiliate: {
    label: "Affiliate Partner",
    color: "bg-green-500",
    permissions: ["view_properties", "create_referrals"],
    description: "Can view properties and create referrals for commissions",
  },
  staff: {
    label: "Staff Member",
    color: "bg-gray-500",
    permissions: ["view_properties", "view_clients"],
    description: "Basic access - can view properties and client information",
  },
}

export default async function DashboardPage() {
  const cookieStore = cookies()
  const authCookie = cookieStore.get("auth-user")

  console.log("🔍 Dashboard - Auth cookie exists:", !!authCookie)

  if (!authCookie) {
    console.log("❌ No auth cookie, redirecting to signin")
    redirect("/auth/signin")
  }

  let user
  try {
    user = JSON.parse(authCookie.value)
    console.log("✅ Dashboard - User loaded:", user.email, "Role:", user.role)
  } catch (error) {
    console.log("❌ Invalid auth cookie, redirecting to signin")
    redirect("/auth/signin")
  }

  const userRole = user.role || "staff"
  const roleInfo = ROLE_PERMISSIONS[userRole as keyof typeof ROLE_PERMISSIONS]

  async function signOut() {
    "use server"
    const cookieStore = cookies()
    cookieStore.delete("auth-user")
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
            <div className="flex items-center gap-2">
              <Badge className={`${roleInfo.color} text-white`}>
                <Shield className="w-3 h-3 mr-1" />
                {roleInfo.label}
              </Badge>
              <span className="text-sm text-gray-600">{user.email}</span>
            </div>
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
        {/* Development Role Switcher */}
        <Card className="bg-gradient-to-r from-purple-50 to-blue-50 border-purple-200 mb-6">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-purple-900 flex items-center gap-2">
              <RefreshCw className="w-5 h-5" />🚀 Development Mode - Role Switcher
            </CardTitle>
            <CardDescription className="text-purple-700">
              Switch between different user roles to test features during development
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {Object.entries(ROLE_PERMISSIONS).map(([role, info]) => (
                <form key={role} action={switchRole}>
                  <input type="hidden" name="newRole" value={role} />
                  <Button
                    type="submit"
                    variant={userRole === role ? "default" : "outline"}
                    className={`w-full h-auto p-3 flex flex-col items-center gap-2 ${
                      userRole === role ? info.color + " text-white" : ""
                    }`}
                  >
                    <Shield className="w-4 h-4" />
                    <span className="text-xs font-medium">{info.label}</span>
                    {userRole === role && (
                      <Badge variant="secondary" className="text-xs">
                        Current
                      </Badge>
                    )}
                  </Button>
                </form>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="mb-6 sm:mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">🎉 Welcome, {roleInfo.label}!</h2>
          <p className="text-gray-600">{roleInfo.description}</p>
        </div>

        {/* Role-based Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-8">
          <Card className="bg-white">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Total Clients</CardTitle>
              <Users className="h-4 w-4 text-blue-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">
                {roleInfo.permissions.includes("view_clients") ? "1,234" : "---"}
              </div>
              <p className="text-xs text-green-600">
                {roleInfo.permissions.includes("view_clients") ? "+12% from last month" : "Access restricted"}
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Active Listings</CardTitle>
              <Home className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">
                {roleInfo.permissions.includes("view_properties") ? "89" : "---"}
              </div>
              <p className="text-xs text-green-600">
                {roleInfo.permissions.includes("view_properties") ? "+5% from last month" : "Access restricted"}
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Monthly Revenue</CardTitle>
              <DollarSign className="h-4 w-4 text-yellow-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">
                {roleInfo.permissions.includes("view_analytics") ? "₦187.5M" : "---"}
              </div>
              <p className="text-xs text-green-600">
                {roleInfo.permissions.includes("view_analytics") ? "+18% from last month" : "Access restricted"}
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Deals Closed</CardTitle>
              <TrendingUp className="h-4 w-4 text-purple-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">
                {roleInfo.permissions.includes("create_deals") ? "23" : "---"}
              </div>
              <p className="text-xs text-green-600">
                {roleInfo.permissions.includes("create_deals") ? "+8% from last month" : "Access restricted"}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Role-specific Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
          {/* Admin Features */}
          {userRole === "admin" && (
            <>
              <Card className="bg-gradient-to-br from-red-50 to-red-100 border-red-200">
                <CardHeader>
                  <CardTitle className="text-red-800 flex items-center gap-2">
                    <Settings className="w-5 h-5" />
                    Admin Panel
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-red-700 text-sm mb-3">Manage system settings and users</p>
                  <Button className="w-full bg-red-600 hover:bg-red-700">Access Admin Panel</Button>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-red-50 to-red-100 border-red-200">
                <CardHeader>
                  <CardTitle className="text-red-800 flex items-center gap-2">
                    <Users className="w-5 h-5" />
                    User Management
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-red-700 text-sm mb-3">Add, edit, and manage user accounts</p>
                  <Button className="w-full bg-red-600 hover:bg-red-700">Manage Users</Button>
                </CardContent>
              </Card>
            </>
          )}

          {/* Agent Features */}
          {(userRole === "agent" || userRole === "admin") && (
            <>
              <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
                <CardHeader>
                  <CardTitle className="text-blue-800 flex items-center gap-2">
                    <Home className="w-5 h-5" />
                    Property Management
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-blue-700 text-sm mb-3">Add, edit, and manage property listings</p>
                  <Button className="w-full bg-blue-600 hover:bg-blue-700">Manage Properties</Button>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
                <CardHeader>
                  <CardTitle className="text-blue-800 flex items-center gap-2">
                    <TrendingUp className="w-5 h-5" />
                    Deal Pipeline
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-blue-700 text-sm mb-3">Track and manage sales deals</p>
                  <Button className="w-full bg-blue-600 hover:bg-blue-700">View Pipeline</Button>
                </CardContent>
              </Card>
            </>
          )}

          {/* Affiliate Features */}
          {(userRole === "affiliate" || userRole === "admin") && (
            <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
              <CardHeader>
                <CardTitle className="text-green-800 flex items-center gap-2">
                  <DollarSign className="w-5 h-5" />
                  Referral System
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-green-700 text-sm mb-3">Create referrals and track commissions</p>
                <Button className="w-full bg-green-600 hover:bg-green-700">My Referrals</Button>
              </CardContent>
            </Card>
          )}

          {/* Staff Features */}
          {(userRole === "staff" || userRole === "admin") && (
            <Card className="bg-gradient-to-br from-gray-50 to-gray-100 border-gray-200">
              <CardHeader>
                <CardTitle className="text-gray-800 flex items-center gap-2">
                  <UserCheck className="w-5 h-5" />
                  Client Directory
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 text-sm mb-3">View client information and history</p>
                <Button className="w-full bg-gray-600 hover:bg-gray-700">View Clients</Button>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Current Role Info */}
        <Card className="bg-white">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-gray-900 flex items-center gap-2">
              <UserCheck className="w-5 h-5" />
              Current Role: {roleInfo.label}
            </CardTitle>
            <CardDescription>{roleInfo.description}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <p className="text-sm text-gray-600">Email</p>
                <p className="font-medium">{user.email}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">User ID</p>
                <code className="text-xs bg-gray-100 px-2 py-1 rounded">{user.id}</code>
              </div>
            </div>

            <div>
              <p className="text-sm text-gray-600 mb-2">Your Permissions:</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {Object.entries({
                  manage_users: "👥 Manage Users",
                  manage_properties: "🏠 Manage Properties",
                  view_analytics: "📊 View Analytics",
                  manage_settings: "⚙️ Manage Settings",
                  view_clients: "👤 View Clients",
                  create_deals: "🤝 Create Deals",
                  view_properties: "🏘️ View Properties",
                  create_referrals: "🔗 Create Referrals",
                }).map(([permission, label]) => (
                  <div key={permission} className="flex items-center gap-2">
                    {roleInfo.permissions.includes(permission) ? (
                      <Badge variant="secondary" className="bg-green-100 text-green-800">
                        ✅ {label}
                      </Badge>
                    ) : (
                      <Badge variant="outline" className="text-gray-500">
                        ❌ {label}
                      </Badge>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
