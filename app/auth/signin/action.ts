"use server"

import { redirect } from "next/navigation"
import { createClient } from "@supabase/supabase-js"
import { cookies } from "next/headers"

export async function signIn(formData: FormData) {
  const email = formData.get("email") as string
  const password = formData.get("password") as string

  console.log("🚀 Server Action SignIn started")
  console.log("📧 Email:", email)

  if (!email || !password) {
    redirect("/auth/signin?error=Email and password are required")
  }

  try {
    const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!, {
      auth: {
        persistSession: false,
      },
    })

    const { data, error } = await supabase.auth.signInWithPassword({
      email: email.trim().toLowerCase(),
      password: password,
    })

    console.log("📊 Server SignIn result:")
    console.log("- User:", data.user?.id)
    console.log("- Session:", !!data.session)
    console.log("- Error:", error?.message)

    if (error) {
      console.error("🚨 Server SignIn error:", error)
      redirect(`/auth/signin?error=${encodeURIComponent(error.message)}`)
    }

    if (data.user && data.session) {
      console.log("✅ Server User signed in successfully!")

      // Get user role from metadata
      const userRole = data.user.user_metadata?.role || "staff"
      console.log("👤 User role:", userRole)

      // Set comprehensive auth cookie
      const cookieStore = cookies()
      cookieStore.set(
        "auth-user",
        JSON.stringify({
          id: data.user.id,
          email: data.user.email,
          role: userRole,
          signedInAt: new Date().toISOString(),
        }),
        {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: "lax",
          maxAge: 60 * 60 * 24 * 7, // 7 days
        },
      )

      console.log("🍪 Auth cookie set, redirecting to dashboard")
      redirect("/dashboard")
    }

    redirect("/auth/signin?error=Sign in failed")
  } catch (error: any) {
    console.error("🚨 Server Unexpected error:", error)

    // Check if it's a redirect error (which is actually success)
    if (error.message?.includes("NEXT_REDIRECT")) {
      console.log("✅ Redirect successful (this is expected)")
      return
    }

    redirect("/auth/signin?error=Server error. Please try again.")
  }
}
