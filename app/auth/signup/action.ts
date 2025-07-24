"use server"
import { createClient as getSupabaseServerClient } from "@/lib/supabase" // Alias the import to avoid conflicts

export async function signUp(prevState: any, formData: FormData) {
  const username = formData.get("username") as string
  const email = formData.get("email") as string
  const password = formData.get("password") as string
  const confirmPassword = formData.get("confirm-password") as string
  const role = formData.get("role") as string // Get the selected role from the form

  if (password !== confirmPassword) {
    return { success: false, message: "Passwords do not match." }
  }

  const supabase = getSupabaseServerClient() // Use the aliased function

  // 1. Sign up the user with Supabase Auth
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        username: username, // Store username in user metadata
      },
    },
  })

  if (error) {
    console.error("Signup error:", error.message)
    return { success: false, message: error.message }
  }

  if (data.user) {
    // 2. Update the user's profile in the 'profiles' table with the selected role
    // This is crucial for your application's RBAC
    const { error: profileError } = await supabase.from("profiles").update({ role: role }).eq("id", data.user.id)

    if (profileError) {
      console.error("Error updating user profile role:", profileError.message)
      // You might want to handle this more gracefully, e.g., delete the auth user
      // if profile update fails, or log it for manual correction.
      return { success: false, message: `Signup successful, but failed to set role: ${profileError.message}` }
    }

    return { success: true, message: "Signup successful! Please check your email to confirm your account." }
  }

  return { success: false, message: "An unexpected error occurred during signup." }
}
