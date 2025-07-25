import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, Home, User, Mail, Lock, UserCheck } from "lucide-react"
import Link from "next/link"
import { signUp } from "./action"

export default function SignUpPage({
  searchParams,
}: {
  searchParams: { error?: string; message?: string }
}) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-600 via-red-600 to-pink-700">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-yellow-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-red-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-1000"></div>
        <div className="absolute top-40 left-40 w-60 h-60 bg-orange-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-500"></div>
      </div>

      {/* Header */}
      <header className="relative bg-white/10 backdrop-blur-md border-b border-white/20 px-4 sm:px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Link href="/">
              <Button variant="ghost" size="sm" className="text-white hover:bg-white/20 md:hidden">
                <ArrowLeft className="w-4 h-4" />
              </Button>
            </Link>
            <div className="w-8 h-8 bg-gradient-to-r from-white/20 to-white/30 rounded-lg flex items-center justify-center backdrop-blur-sm">
              <Home className="w-4 h-4 text-white" />
            </div>
            <h1 className="text-lg sm:text-xl font-bold text-white">G3W Homes CRM</h1>
          </div>
          <div className="flex items-center gap-2 sm:gap-3">
            <Link href="/auth/signup">
              <Button
                size="sm"
                className="bg-white/20 hover:bg-white/30 text-white border border-white/30 backdrop-blur-sm"
              >
                Sign Up
              </Button>
            </Link>
            <Link href="/auth/signin">
              <Button
                size="sm"
                className="bg-white/20 hover:bg-white/30 text-white border border-white/30 backdrop-blur-sm"
              >
                Sign In
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <div className="relative flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <Card className="w-full max-w-md bg-white/95 backdrop-blur-xl shadow-2xl border-0">
          <CardHeader className="space-y-1 text-center pb-8">
            <div className="mx-auto w-16 h-16 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center mb-4 shadow-lg">
              <User className="w-8 h-8 text-white" />
            </div>
            <CardTitle className="text-3xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
              Create Account
            </CardTitle>
            <CardDescription className="text-gray-600 text-lg">
              Join G3W Homes CRM to manage your real estate business
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {searchParams.error && (
              <div className="p-4 text-sm text-red-700 bg-red-50 border border-red-200 rounded-lg shadow-sm">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-red-500 rounded-full flex-shrink-0"></div>
                  {searchParams.error}
                </div>
              </div>
            )}
            {searchParams.message && (
              <div className="p-4 text-sm text-green-700 bg-green-50 border border-green-200 rounded-lg shadow-sm">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-green-500 rounded-full flex-shrink-0"></div>
                  {searchParams.message}
                </div>
              </div>
            )}

            <form action={signUp} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-gray-700 font-medium flex items-center gap-2">
                  <Mail className="w-4 h-4 text-orange-500" />
                  Email
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Enter your email"
                  required
                  className="h-12 border-2 border-gray-200 focus:border-orange-500 focus:ring-orange-500 rounded-lg"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-gray-700 font-medium flex items-center gap-2">
                  <Lock className="w-4 h-4 text-orange-500" />
                  Password
                </Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Create a password"
                  required
                  className="h-12 border-2 border-gray-200 focus:border-orange-500 focus:ring-orange-500 rounded-lg"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="role" className="text-gray-700 font-medium flex items-center gap-2">
                  <UserCheck className="w-4 h-4 text-orange-500" />
                  Role
                </Label>
                <Select name="role" defaultValue="staff">
                  <SelectTrigger className="h-12 border-2 border-gray-200 focus:border-orange-500 focus:ring-orange-500 rounded-lg">
                    <SelectValue placeholder="Select your role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="staff">Staff</SelectItem>
                    <SelectItem value="agent">Agent</SelectItem>
                    <SelectItem value="affiliate">Affiliate</SelectItem>
                    <SelectItem value="admin">Admin</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Button
                type="submit"
                className="w-full h-12 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 transform hover:-translate-y-0.5"
              >
                Create Account
              </Button>
            </form>

            <div className="text-center">
              <p className="text-gray-600">
                Already have an account?{" "}
                <Link
                  href="/auth/signin"
                  className="text-orange-600 hover:text-orange-700 font-semibold hover:underline"
                >
                  Sign in
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
