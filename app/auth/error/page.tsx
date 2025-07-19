import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function AuthErrorPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 dark:bg-gray-950">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold">Authentication Error</CardTitle>
          <CardDescription>There was an issue with your authentication. Please try again.</CardDescription>
        </CardHeader>
        <CardContent className="text-center">
          <p className="mb-4 text-sm text-gray-500 dark:text-gray-400">
            You might have been redirected here due to an invalid session or an error during login/signup.
          </p>
          <Button asChild className="w-full bg-dark-orange-500 hover:bg-dark-orange-600">
            <Link href="/auth/signin">Go to Login</Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
