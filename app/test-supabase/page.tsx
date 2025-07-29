"use client"

import { useState } from "react"
import { createClient } from "@/lib/supabase"
import { Button } from "@/components/ui/button"

export default function TestSupabase() {
  const [result, setResult] = useState<string>("")
  const [loading, setLoading] = useState(false)

  const testConnection = async () => {
    setLoading(true)
    setResult("Testing...")

    try {
      const supabase = createClient()

      // Test basic connection
      const { data, error } = await supabase.auth.getSession()

      if (error) {
        setResult(`❌ Connection Error: ${error.message}`)
      } else {
        setResult("✅ Supabase connection successful!")
      }
    } catch (error) {
      setResult(`❌ Unexpected Error: ${error}`)
    } finally {
      setLoading(false)
    }
  }

  const testSignup = async () => {
    setLoading(true)
    setResult("Testing signup...")

    try {
      const supabase = createClient()

      const { data, error } = await supabase.auth.signUp({
        email: "test@example.com",
        password: "testpassword123",
      })

      if (error) {
        setResult(`❌ Signup Error: ${error.message}`)
      } else {
        setResult("✅ Signup test successful!")
      }
    } catch (error) {
      setResult(`❌ Unexpected Error: ${error}`)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="p-8 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Supabase Test</h1>

      <div className="space-y-4">
        <Button onClick={testConnection} disabled={loading}>
          Test Connection
        </Button>

        <Button onClick={testSignup} disabled={loading}>
          Test Signup
        </Button>

        {result && (
          <div className="p-4 bg-gray-100 rounded-lg">
            <pre className="text-sm">{result}</pre>
          </div>
        )}
      </div>
    </div>
  )
}
