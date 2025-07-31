"use server"

import { cookies } from "next/headers"
import { redirect } from "next/navigation"

export async function switchRole(formData: FormData) {
  const newRole = formData.get("newRole") as string

  console.log("🔄 Switching role to:", newRole)

  const cookieStore = cookies()
  const authCookie = cookieStore.get("auth-user")

  if (!authCookie) {
    redirect("/auth/signin")
  }

  try {
    const user = JSON.parse(authCookie.value)

    // Update user role
    const updatedUser = {
      ...user,
      role: newRole,
      roleChangedAt: new Date().toISOString(),
    }

    // Set updated cookie
    cookieStore.set("auth-user", JSON.stringify(updatedUser), {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7, // 7 days
    })

    console.log("✅ Role switched successfully to:", newRole)
    redirect("/dashboard")
  } catch (error) {
    console.error("❌ Error switching role:", error)
    redirect("/dashboard")
  }
}
