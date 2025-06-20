import { type NextRequest, NextResponse } from "next/server"
import { sql, handleDbError } from "@/lib/db"

// GET /api/tasks - Fetch all tasks
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const status = searchParams.get("status")
    const assigned_to = searchParams.get("assigned_to")
    const priority = searchParams.get("priority")

    let query = `
      SELECT t.*,
             c.first_name as contact_first_name, c.last_name as contact_last_name,
             p.title as property_title,
             d.title as deal_title,
             u.first_name as assignee_first_name, u.last_name as assignee_last_name
      FROM tasks t
      LEFT JOIN contacts c ON t.contact_id = c.id
      LEFT JOIN properties p ON t.property_id = p.id
      LEFT JOIN deals d ON t.deal_id = d.id
      LEFT JOIN users u ON t.assigned_to = u.id
      WHERE 1=1
    `
    const params: any[] = []

    if (status) {
      query += ` AND t.status = $${params.length + 1}`
      params.push(status)
    }

    if (assigned_to) {
      query += ` AND t.assigned_to = $${params.length + 1}`
      params.push(Number.parseInt(assigned_to))
    }

    if (priority) {
      query += ` AND t.priority = $${params.length + 1}`
      params.push(priority)
    }

    query += ` ORDER BY t.due_date ASC, t.priority DESC`

    const tasks = await sql(query, params)
    return NextResponse.json(tasks)
  } catch (error) {
    handleDbError(error)
    return NextResponse.json({ error: "Failed to fetch tasks" }, { status: 500 })
  }
}

// POST /api/tasks - Create new task
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const {
      title,
      description,
      task_type,
      priority = "medium",
      status = "pending",
      due_date,
      assigned_to,
      contact_id,
      property_id,
      deal_id,
    } = body

    if (!title || !assigned_to) {
      return NextResponse.json({ error: "Title and assigned user are required" }, { status: 400 })
    }

    const result = await sql`
      INSERT INTO tasks (
        title, description, task_type, priority, status,
        due_date, assigned_to, contact_id, property_id, deal_id
      )
      VALUES (
        ${title}, ${description}, ${task_type}, ${priority}, ${status},
        ${due_date}, ${assigned_to}, ${contact_id}, ${property_id}, ${deal_id}
      )
      RETURNING *
    `

    return NextResponse.json(result[0], { status: 201 })
  } catch (error) {
    handleDbError(error)
    return NextResponse.json({ error: "Failed to create task" }, { status: 500 })
  }
}
