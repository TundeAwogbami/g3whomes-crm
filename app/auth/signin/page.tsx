"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"

export default function SignInPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setLoading(true)

    const result = await signIn("credentials", {
      redirect: false,
      email,
      password,
    })

    if (result?.error) {
      setError(result.error)
      toast({
        title: "Login Failed",
        description: result.error,
        variant: "destructive",
      })
    } else {
      toast({
        title: "Login Successful",
        description: "You have been successfully logged in.",
      })
      router.push("/")
    }
    setLoading(false)
  }

  const handleDemoLogin = async (demoEmail: string, demoPassword: string) => {
    setLoading(true)
    setError(null)
    const result = await signIn("credentials", {
      redirect: false,
      email: demoEmail,
      password: demoPassword,
    })

    if (result?.error) {
      setError(result.error)
      toast({
        title: "Demo Login Failed",
        description: result.error,
        variant: "destructive",
      })
    } else {
      toast({
        title: "Demo Login Successful",
        description: "You are logged in as a demo user.",
      })
      router.push("/")
    }
    setLoading(false)
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 dark:bg-gray-950">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold">Sign In</CardTitle>
          <CardDescription>Enter your credentials to access your account.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            {error && <p className="text-sm text-red-500 text-center">{error}</p>}
            <Button type="submit" className="w-full bg-dark-orange-500 hover:bg-dark-orange-600" disabled={loading}>
              {loading ? "Signing In..." : "Sign In"}
            </Button>
          </form>
          <div className="mt-4 space-y-2">
            <Button
              variant="outline"
              className="w-full bg-transparent"
              onClick={() => handleDemoLogin("agent@example.com", "password123")}
              disabled={loading}
            >
              Demo Agent Account
            </Button>
            <Button
              variant="outline"
              className="w-full bg-transparent"
              onClick={() => handleDemoLogin("admin@example.com", "password123")}
              disabled={loading}
            >
              Demo Admin Account
            </Button>
          </div>
          <div className="mt-4 text-center text-sm">
            Don't have an account?{" "}
            <Link href="/auth/signup" className="underline text-dark-orange-500 hover:text-dark-orange-600">
              Sign up
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
