"use server"

import { createClient } from "@/lib/supabase"
import { revalidatePath } from "next/cache"

export async function addDeal(prevState: any, formData: FormData) {
  const dealName = formData.get("dealName") as string
  const client = formData.get("client") as string // This would ideally be a client_id UUID
  const property = formData.get("property") as string // This would ideally be a property_id UUID
  const value = Number.parseFloat(formData.get("value") as string)
  const stage = formData.get("stage") as string
  const notes = formData.get("notes") as string

  const supabase = createClient()

  // In a real app, you'd fetch client_id and property_id based on names or use select inputs with IDs
  // For now, we'll insert with placeholder IDs or null if not found.
  // You might need to adjust your 'deals' table schema if client_id/property_id are NOT NULL.
  const { data, error } = await supabase.from("deals").insert([
    {
      deal_name: dealName,
      // client_id: null, // Placeholder, replace with actual client UUID
      // property_id: null, // Placeholder, replace with actual property UUID
      deal_value: value,
      stage: stage,
      notes: notes,
    },
  ])

  if (error) {
    console.error("Error adding deal:", error.message)
    return { success: false, message: `Failed to add deal: ${error.message}` }
  }

  revalidatePath("/deals")
  return { success: true, message: "Deal added successfully!" }
}
