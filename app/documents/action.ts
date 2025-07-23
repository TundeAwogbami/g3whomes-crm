"use server"

import { createClient } from "@/lib/supabase" // Your server-side Supabase client
import { revalidatePath } from "next/cache"

export async function uploadDocument(formData: FormData) {
  const file = formData.get("file") as File
  const fileName = (formData.get("fileName") as string) || file.name
  const uploadedBy = (formData.get("uploadedBy") as string) || "Unknown" // Get from session in real app

  if (!file) {
    return { success: false, message: "No file provided." }
  }

  const supabase = createClient()

  // Upload file to Supabase Storage
  const { data: uploadData, error: uploadError } = await supabase.storage
    .from("documents") // Ensure you have a bucket named 'documents' in Supabase
    .upload(`${fileName}`, file, {
      cacheControl: "3600",
      upsert: false,
    })

  if (uploadError) {
    console.error("Supabase upload error:", uploadError)
    return { success: false, message: `File upload failed: ${uploadError.message}` }
  }

  // Insert document metadata into a 'documents' table in your database
  const { data: insertData, error: insertError } = await supabase.from("documents").insert([
    {
      name: fileName,
      storage_path: uploadData.path,
      type: file.type,
      size: file.size,
      uploaded_by: uploadedBy,
    },
  ])

  if (insertError) {
    console.error("Supabase insert error:", insertError)
    // Optionally, delete the uploaded file if metadata insertion fails
    await supabase.storage.from("documents").remove([uploadData.path])
    return { success: false, message: `Failed to record document: ${insertError.message}` }
  }

  revalidatePath("/documents") // Revalidate the documents page to show new file
  return { success: true, message: "Document uploaded successfully!" }
}

export async function getDocuments() {
  const supabase = createClient()
  const { data, error } = await supabase.from("documents").select("*").order("uploaded_at", { ascending: false })

  if (error) {
    console.error("Error fetching documents:", error.message)
    return []
  }
  return data
}
