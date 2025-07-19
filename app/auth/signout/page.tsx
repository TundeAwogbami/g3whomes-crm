"use client"

import { useEffect, useState } from "react"
import { signOut, useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Loader2, LogOut, ArrowLeft } from "lucide-react"

export default function SignOut() {
  const [isSigningOut, setIsSigningOut] = useState(false)
  const { data: session, status } = useSession()
  const router = useRouter()

  useEffect(() => {
    // If user is not authenticated, redirect to signin
    if (status === "unauthenticated") {
      router.push("/auth/signin")
    }
  }, [status, router])

  const handleSignOut = async () => {
    setIsSigningOut(true)
    try {
      await signOut({
        callbackUrl: "/auth/signin?message=You have been signed out successfully",
        redirect: true,
      })
    } catch (error) {
      console.error("Sign out error:", error)
      setIsSigningOut(false)
    }
  }

  const handleCancel = () => {
    router.back()
  }

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4 text-dark-orange-600" />
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }

  if (status === "unauthenticated") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <p className="text-gray-600">Redirecting to sign in...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mb-4">
            <LogOut className="w-6 h-6 text-red-600" />
          </div>
          <CardTitle className="text-2xl font-bold">Sign Out</CardTitle>
          <CardDescription>Are you sure you want to sign out of your account?</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-sm text-gray-600 mb-2">Currently signed in as:</p>
              <p className="font-medium text-gray-900">{session?.user?.name}</p>
              <p className="text-sm text-gray-500">{session?.user?.email}</p>
            </div>

            <div className="flex flex-col space-y-3">
              <Button
                onClick={handleSignOut}
                disabled={isSigningOut}
                className="w-full bg-red-600 hover:bg-red-700 text-white"
              >
                {isSigningOut && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {isSigningOut ? "Signing Out..." : "Yes, Sign Out"}
              </Button>

              <Button
                onClick={handleCancel}
                variant="outline"
                disabled={isSigningOut}
                className="w-full bg-transparent"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Cancel
              </Button>
            </div>

            <p className="text-xs text-gray-500 text-center">
              You will be redirected to the sign in page after signing out.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
