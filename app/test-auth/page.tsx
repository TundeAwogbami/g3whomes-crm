"use client"

import { useState } from "react"
import { createClient } from "@/lib/supabase"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function TestAuth() {
  const [email, setEmail] = useState("test@example.com")
  const [password, setPassword] = useState("testpass123")
  const [result, setResult] = useState("")
  const [loading, setLoading] = useState(false)

  const testSignUp = async () => {
    setLoading(true)
    setResult("Testing signup...")

    try {
      const supabase = createClient()

      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      })

      if (error) {
        setResult(`❌ Signup Error: ${error.message}`)
      } else {
        setResult(`✅ Signup Success! User ID: ${data.user?.id}`)
      }
    } catch (error: any) {
      setResult(`❌ Unexpected Error: ${error.message}`)
    } finally {
      setLoading(false)
    }
  }

  const testSignIn = async () => {
    setLoading(true)
    setResult("Testing signin...")

    try {
      const supabase = createClient()

      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (error) {
        setResult(`❌ SignIn Error: ${error.message}`)
      } else {
        setResult(`✅ SignIn Success! User: ${data.user?.email}`)
      }
    } catch (error: any) {
      setResult(`❌ Unexpected Error: ${error.message}`)
    } finally {
      setLoading(false)
    }
  }

  const testConnection = async () => {
    setLoading(true)
    setResult("Testing connection...")

    try {
      const supabase = createClient()

      const { data, error } = await supabase.auth.getSession()

      if (error) {
        setResult(`❌ Connection Error: ${error.message}`)
      } else {
        setResult("✅ Connection successful!")
      }
    } catch (error: any) {
      setResult(`❌ Connection Failed: ${error.message}`)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="p-8 max-w-md mx-auto space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>🧪 Auth Testing</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="test@example.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Password</label>
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="testpass123"
            />
          </div>

          <div className="space-y-2">
            <Button onClick={testConnection} disabled={loading} className="w-full">
              Test Connection
            </Button>

            <Button onClick={testSignUp} disabled={loading} className="w-full">
              Test Sign Up
            </Button>

            <Button onClick={testSignIn} disabled={loading} className="w-full">
              Test Sign In
            </Button>
          </div>

          {result && (
            <div className="p-4 bg-gray-100 rounded-lg">
              <pre className="text-sm whitespace-pre-wrap">{result}</pre>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
