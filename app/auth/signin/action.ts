"use server"

import { createServerClient } from "@/lib/supabase-server"
import { redirect } from "next/navigation"
import { cookies } from "next/headers"

export async function signIn(formData: FormData) {
  const email = formData.get("email") as string
  const password = formData.get("password") as string

  console.log("🚀 SignIn action started")
  console.log("📧 Email:", email)

  if (!email || !password) {
    console.log("❌ Missing email or password")
    redirect("/auth/signin?error=Email and password are required")
  }

  try {
    console.log("🔄 Creating Supabase client...")
    const supabase = createServerClient()

    console.log("🔄 Attempting signin...")
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    console.log("📊 Signin response data:", data)
    console.log("❌ Signin error:", error)

    if (error) {
      console.error("🚨 Detailed signin error:", {
        message: error.message,
        status: error.status,
        name: error.name,
      })

      if (error.message.includes("Invalid login credentials")) {
        redirect("/auth/signin?error=Invalid email or password")
      }

      if (error.message.includes("Email not confirmed")) {
        redirect("/auth/signin?error=Please check your email and confirm your account first")
      }

      redirect(`/auth/signin?error=${encodeURIComponent(error.message)}`)
    }

    if (data.user && data.session) {
      console.log("✅ User signed in successfully:", data.user.id)

      // Set the session cookie manually for server-side auth
      const cookieStore = cookies()
      cookieStore.set("supabase-auth-token", data.session.access_token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 60 * 60 * 24 * 7, // 7 days
      })

      redirect("/dashboard")
    }

    console.log("⚠️ No user data returned but no error")
    redirect("/auth/signin?error=Sign in failed. Please try again.")
  } catch (error: any) {
    console.error("🚨 Unexpected signin error:", error)
    redirect("/auth/signin?error=Unable to sign in. Please try again.")
  }
}
