"use client"

import { useEffect } from "react"
import { signOut, useSession } from "next-auth/react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function SignOutPage() {
  const { data: session, status } = useSession()

  useEffect(() => {
    // If session is still active, force sign out
    if (status === "authenticated") {
      signOut({ redirect: false }) // Sign out without redirecting immediately
    }
  }, [status])

  if (status === "loading") {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-100 dark:bg-gray-950">
        <p>Loading...</p>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 dark:bg-gray-950">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold">Signed Out</CardTitle>
          <CardDescription>You have been successfully signed out of your account.</CardDescription>
        </CardHeader>
        <CardContent className="text-center">
          {session?.user?.email && (
            <p className="mb-4 text-sm text-gray-500 dark:text-gray-400">
              Thank you for using our service, {session.user.name || session.user.email}.
            </p>
          )}
          <Button asChild className="w-full bg-dark-orange-500 hover:bg-dark-orange-600">
            <Link href="/auth/signin">Sign In Again</Link>
          </Button>
          <Button asChild variant="link" className="w-full mt-2">
            <Link href="/">Go to Home</Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
