"use server"

import { createServerClient } from "@/lib/supabase-server"
import { redirect } from "next/navigation"

export async function signUp(formData: FormData) {
  const email = formData.get("email") as string
  const password = formData.get("password") as string
  const role = formData.get("role") as string

  console.log("🚀 SignUp action started")
  console.log("📧 Email:", email)
  console.log("🔐 Password length:", password?.length)
  console.log("👤 Role:", role)

  // Basic validation
  if (!email || !password) {
    console.log("❌ Missing email or password")
    redirect("/auth/signup?error=Email and password are required")
  }

  if (password.length < 6) {
    console.log("❌ Password too short")
    redirect("/auth/signup?error=Password must be at least 6 characters long")
  }

  try {
    console.log("🔄 Creating Supabase client...")
    const supabase = createServerClient()

    console.log("🔄 Attempting signup...")
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          role: role || "staff",
        },
      },
    })

    console.log("📊 Signup response data:", data)
    console.log("❌ Signup error:", error)

    if (error) {
      console.error("🚨 Detailed signup error:", {
        message: error.message,
        status: error.status,
        name: error.name,
      })

      // Handle specific error cases
      if (error.message.includes("User already registered") || error.message.includes("already been registered")) {
        redirect("/auth/signup?error=An account with this email already exists. Please sign in instead.")
      }

      if (error.message.includes("Password should be at least")) {
        redirect("/auth/signup?error=Password must be at least 6 characters long")
      }

      if (error.message.includes("Invalid email")) {
        redirect("/auth/signup?error=Please enter a valid email address")
      }

      if (error.message.includes("Signup is disabled")) {
        redirect("/auth/signup?error=Account registration is currently disabled")
      }

      // Generic error fallback
      redirect(`/auth/signup?error=${encodeURIComponent(error.message)}`)
    }

    // Success cases
    if (data.user) {
      console.log("✅ User created successfully:", data.user.id)

      if (data.user.email_confirmed_at) {
        console.log("✅ Email already confirmed")
        redirect("/auth/signin?message=Account created successfully! You can now sign in.")
      } else {
        console.log("📧 Email confirmation required")
        redirect("/auth/signin?message=Please check your email and click the confirmation link before signing in.")
      }
    }

    console.log("⚠️ No user data returned but no error")
    redirect("/auth/signin?message=Account created! Please check your email for confirmation.")
  } catch (error: any) {
    console.error("🚨 Unexpected signup error:", error)

    // Handle specific caught errors
    if (error.message?.includes("already exists")) {
      redirect("/auth/signup?error=An account with this email already exists. Please sign in instead.")
    }

    redirect("/auth/signup?error=Unable to create account. Please try again.")
  }
}
