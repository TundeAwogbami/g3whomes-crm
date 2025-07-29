import { createClient as createSupabaseClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error("Missing Supabase environment variables")
}

// Client-side Supabase client (singleton pattern)
let clientInstance: ReturnType<typeof createSupabaseClient> | null = null

export function createClient() {
  // Only create singleton in browser environment
  if (typeof window !== "undefined") {
    if (!clientInstance) {
      clientInstance = createSupabaseClient(supabaseUrl, supabaseAnonKey)
    }
    return clientInstance
  }

  // For server-side, create new instance each time
  return createSupabaseClient(supabaseUrl, supabaseAnonKey)
}
