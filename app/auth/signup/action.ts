"use server"

import { redirect } from "next/navigation"
import { createClient } from "@supabase/supabase-js"

export async function signUp(formData: FormData) {
  const email = formData.get("email") as string
  const password = formData.get("password") as string
  const role = formData.get("role") as string

  console.log("🚀 Server Action SignUp started")
  console.log("📧 Email:", email)
  console.log("👤 Role:", role)

  if (!email || !password) {
    redirect("/auth/signup?error=Email and password are required")
  }

  if (password.length < 6) {
    redirect("/auth/signup?error=Password must be at least 6 characters")
  }

  try {
    const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!, {
      auth: {
        persistSession: false,
      },
    })

    // Create new user with role
    const { data, error } = await supabase.auth.signUp({
      email: email.trim().toLowerCase(),
      password: password,
      options: {
        data: {
          role: role || "staff",
          createdAt: new Date().toISOString(),
        },
      },
    })

    console.log("📊 Server Signup result:")
    console.log("- User:", data.user?.id)
    console.log("- Error:", error?.message)

    if (error) {
      console.error("🚨 Server Signup error:", error)

      if (error.message.includes("already registered")) {
        redirect("/auth/signup?error=Email already exists. Please sign in instead.")
      }

      redirect(`/auth/signup?error=${encodeURIComponent(error.message)}`)
    }

    if (data.user) {
      console.log("✅ Server User created successfully with role:", role)
      // Use a more reliable redirect approach
      redirect("/auth/signin?message=Account created successfully! You can now sign in.")
    }

    redirect("/auth/signup?error=Unknown error occurred")
  } catch (error: any) {
    console.error("🚨 Server Unexpected error:", error)

    // Check if it's a redirect error (which is actually success)
    if (error.message?.includes("NEXT_REDIRECT")) {
      console.log("✅ Redirect successful (this is expected)")
      return
    }

    redirect("/auth/signup?error=Server error. Please try again.")
  }
}
