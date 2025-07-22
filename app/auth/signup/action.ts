"use server"
import { createClient } from "@/lib/supabase" // Assuming you have a Supabase client setup in lib/supabase.ts

export async function signUp(formData: FormData) {
  const email = formData.get("email") as string
  const password = formData.get("password") as string
  const username = formData.get("username") as string // Assuming you want to store username

  const supabase = createClient() // Initialize Supabase client

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
    // Optionally, you might want to insert the user into a 'profiles' table here
    // await supabase.from('profiles').insert([{ id: data.user.id, username: username, email: email }]);
    return { success: true, message: "Signup successful! Please check your email to confirm your account." }
  }

  return { success: false, message: "An unexpected error occurred during signup." }
}
