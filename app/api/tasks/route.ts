import { type NextRequest, NextResponse } from "next/server"
import { getTasks, createTask } from "@/lib/db-supabase"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const filters = {
      status: searchParams.get("status") || undefined,
      assigned_to: searchParams.get("assigned_to") ? Number.parseInt(searchParams.get("assigned_to")!) : undefined,
      priority: searchParams.get("priority") || undefined,
    }

    const tasks = await getTasks(filters)
    return NextResponse.json(tasks)
  } catch (error) {
    console.error("API Error:", error)
    return NextResponse.json({ error: "Failed to fetch tasks" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const task = await createTask(body)
    return NextResponse.json(task, { status: 201 })
  } catch (error) {
    console.error("API Error:", error)
    return NextResponse.json({ error: "Failed to create task" }, { status: 500 })
  }
}
