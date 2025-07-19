import { sql } from "@/lib/db"
import { type NextRequest, NextResponse } from "next/server"

export async function GET() {
  try {
    const tasks = await sql`SELECT * FROM tasks ORDER BY created_at DESC`
    return NextResponse.json(tasks)
  } catch (error) {
    console.error("Error fetching tasks:", error)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const { deal_id, contact_id, title, description, due_date, status } = await request.json()
    if (!title) {
      return NextResponse.json({ error: "Title is required" }, { status: 400 })
    }
    const newTask = await sql`
      INSERT INTO tasks (deal_id, contact_id, title, description, due_date, status)
      VALUES (${deal_id}, ${contact_id}, ${title}, ${description}, ${due_date}, ${status})
      RETURNING *;
    `
    return NextResponse.json(newTask[0], { status: 201 })
  } catch (error) {
    console.error("Error creating task:", error)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}
