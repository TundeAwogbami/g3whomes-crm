"use server"

import { createClient } from "@/lib/supabase"
import { revalidatePath } from "next/cache"

export async function addClient(prevState: any, formData: FormData) {
  const firstName = formData.get("firstName") as string
  const lastName = formData.get("lastName") as string
  const email = formData.get("email") as string
  const phone = formData.get("phone") as string
  const address = formData.get("address") as string
  const notes = formData.get("notes") as string

  const supabase = createClient()

  const { data, error } = await supabase.from("contacts").insert([
    {
      first_name: firstName,
      last_name: lastName,
      email: email,
      phone: phone,
      address: address,
      notes: notes,
    },
  ])

  if (error) {
    console.error("Error adding client:", error.message)
    return { success: false, message: `Failed to add client: ${error.message}` }
  }

  revalidatePath("/clients") // Revalidate the clients page to show new data
  return { success: true, message: "Client added successfully!" }
}
