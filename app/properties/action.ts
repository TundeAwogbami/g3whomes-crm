"use server"

import { createClient } from "@/lib/supabase"
import { revalidatePath } from "next/cache"

export async function addProperty(prevState: any, formData: FormData) {
  const address = formData.get("address") as string
  const city = formData.get("city") as string
  const state = formData.get("state") as string
  const zip = formData.get("zip") as string
  const description = formData.get("description") as string
  const price = Number.parseFloat(formData.get("price") as string)
  const size = Number.parseInt(formData.get("size") as string)

  const supabase = createClient()

  const { data, error } = await supabase.from("properties").insert([
    {
      address: address,
      city: city,
      state: state,
      zip_code: zip,
      description: description,
      price: price,
      size_sqft: size,
    },
  ])

  if (error) {
    console.error("Error adding property:", error.message)
    return { success: false, message: `Failed to add property: ${error.message}` }
  }

  revalidatePath("/properties") // Revalidate the properties page
  return { success: true, message: "Property added successfully!" }
}
