import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Code, Users, Home, Settings, Zap } from "lucide-react"
import Link from "next/link"

export default function DevToolsPage() {
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">🛠️ Development Tools</h1>
          <p className="text-gray-600">Tools and utilities for testing your G3W Homes CRM</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Role Testing */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="w-5 h-5 text-blue-500" />
                Role Testing
              </CardTitle>
              <CardDescription>Test different user roles and permissions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 mb-4">
                <Badge variant="outline">Admin - Full Access</Badge>
                <Badge variant="outline">Agent - Property Management</Badge>
                <Badge variant="outline">Affiliate - Referrals</Badge>
                <Badge variant="outline">Staff - View Only</Badge>
              </div>
              <Link href="/dashboard">
                <Button className="w-full">
                  <Zap className="w-4 h-4 mr-2" />
                  Test Roles
                </Button>
              </Link>
            </CardContent>
          </Card>

          {/* Auth Testing */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Code className="w-5 h-5 text-green-500" />
                Auth Testing
              </CardTitle>
              <CardDescription>Test authentication flows and Supabase connection</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 mb-4">
                <p className="text-sm text-gray-600">• Connection testing</p>
                <p className="text-sm text-gray-600">• Signup/signin flows</p>
                <p className="text-sm text-gray-600">• Session management</p>
              </div>
              <Link href="/test-auth">
                <Button className="w-full bg-transparent" variant="outline">
                  <Code className="w-4 h-4 mr-2" />
                  Test Auth
                </Button>
              </Link>
            </CardContent>
          </Card>

          {/* Feature Development */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Home className="w-5 h-5 text-orange-500" />
                Feature Development
              </CardTitle>
              <CardDescription>Build and test CRM features</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 mb-4">
                <p className="text-sm text-gray-600">• Property management</p>
                <p className="text-sm text-gray-600">• Client management</p>
                <p className="text-sm text-gray-600">• Deal pipeline</p>
              </div>
              <Button className="w-full bg-transparent" variant="outline" disabled>
                <Settings className="w-4 h-4 mr-2" />
                Coming Soon
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>🚀 Quick Development Actions</CardTitle>
            <CardDescription>Common development tasks and shortcuts</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Link href="/auth/signup">
                <Button variant="outline" className="w-full bg-transparent">
                  Create Test User
                </Button>
              </Link>
              <Link href="/dashboard">
                <Button variant="outline" className="w-full bg-transparent">
                  Switch User Roles
                </Button>
              </Link>
              <Link href="/test-auth">
                <Button variant="outline" className="w-full bg-transparent">
                  Test Authentication
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
