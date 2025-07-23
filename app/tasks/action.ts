"use server"

import { createClient } from "@/lib/supabase"
import { revalidatePath } from "next/cache"

export async function addTask(prevState: any, formData: FormData) {
  const taskName = formData.get("taskName") as string
  const dueDate = formData.get("dueDate") as string
  const assignedTo = formData.get("assignedTo") as string // This would ideally be an assigned_to_id UUID
  const priority = formData.get("priority") as string
  const description = formData.get("description") as string

  const supabase = createClient()

  // In a real app, you'd fetch assigned_to_id based on name or use select inputs with IDs
  const { data, error } = await supabase.from("tasks").insert([
    {
      task_name: taskName,
      due_date: dueDate,
      // assigned_to_id: null, // Placeholder, replace with actual profile UUID
      priority: priority,
      description: description,
    },
  ])

  if (error) {
    console.error("Error adding task:", error.message)
    return { success: false, message: `Failed to add task: ${error.message}` }
  }

  revalidatePath("/tasks")
  return { success: true, message: "Task added successfully!" }
}
