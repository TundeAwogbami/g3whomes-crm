"use server"

import { createClient } from "@/lib/supabase"
import { revalidatePath } from "next/cache"

export async function addContact(prevState: any, formData: FormData) {
  const firstName = formData.get("firstName") as string
  const lastName = formData.get("lastName") as string
  const email = formData.get("email") as string
  const phone = formData.get("phone") as string
  const company = formData.get("company") as string
  const notes = formData.get("notes") as string

  const supabase = createClient()

  const { data, error } = await supabase.from("contacts").insert([
    {
      first_name: firstName,
      last_name: lastName,
      email: email,
      phone: phone,
      company: company,
      notes: notes,
    },
  ])

  if (error) {
    console.error("Error adding contact:", error.message)
    return { success: false, message: `Failed to add contact: ${error.message}` }
  }

  revalidatePath("/contacts")
  return { success: true, message: "Contact added successfully!" }
}
