"use server" // Explicitly mark this file as a Server Module

import { createClient as createSupabaseClient } from "@supabase/supabase-js"
import { createServerActionClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"

// This client is for Server Actions and Route Handlers
export async function createClient() {
  // Made async
  return createServerActionClient({ cookies })
}

// This client is for client-side operations if needed (e.g., in DocumentsList for public URL)
// Ensure NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY are set in .env.local
export async function createBrowserClient() {
  // Made async
  return createSupabaseClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!)
}
