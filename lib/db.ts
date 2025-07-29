import { createClient as createSupabaseClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

console.log("🔧 Supabase Configuration:")
console.log("URL:", supabaseUrl ? "✅ Set" : "❌ Missing")
console.log("Key:", supabaseAnonKey ? "✅ Set" : "❌ Missing")

if (!supabaseUrl || !supabaseAnonKey) {
  console.error("🚨 Missing Supabase environment variables!")
  throw new Error("Missing Supabase environment variables. Please check your .env.local file.")
}

export function createClient() {
  console.log("🔄 Creating Supabase client...")
  const client = createSupabaseClient(supabaseUrl, supabaseAnonKey)
  console.log("✅ Supabase client created")
  return client
}
