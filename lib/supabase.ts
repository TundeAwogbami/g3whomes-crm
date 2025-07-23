import { createClient } from "@supabase/supabase-js"
import { createServerActionClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error("Missing Supabase environment variables")
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Get user data function
export async function getUserData() {
  const { data, error } = await supabase.from("users").select("*", { count: "exact", head: true })
  if (error) throw error
}

// Test connection function
export async function testSupabaseConnection() {
  try {
    const { data, error } = await supabase.from("users").select("count", { count: "exact", head: true })
    if (error) throw error
    console.log("✅ Supabase connected successfully")
    return true
  } catch (error) {
    console.error("❌ Supabase connection failed:", error)
    return false
  }
}
