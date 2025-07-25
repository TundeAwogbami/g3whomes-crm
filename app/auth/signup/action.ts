"use server"

import { createClient } from "@/lib/supabase"
import { redirect } from "next/navigation"

export async function signUp(formData: FormData) {
  const supabase = createClient()

  const email = formData.get("email") as string
  const password = formData.get("password") as string
  const role = formData.get("role") as string

  if (!email || !password) {
    redirect("/auth/signup?error=Email and password are required")
  }

  try {
    // 1. Sign up the user with Supabase Auth
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          role: role || "staff",
        },
      },
    })

    if (error) {
      console.error("Signup error:", error)
      redirect(`/auth/signup?error=${encodeURIComponent(error.message)}`)
    }

    if (data.user) {
      redirect("/auth/signin?message=Check your email to confirm your account")
    }

    redirect("/auth/signin?message=Account created successfully")
  } catch (error) {
    console.error("Unexpected signup error:", error)
    redirect("/auth/signup?error=Could not create account. Please try again.")
  }
}
