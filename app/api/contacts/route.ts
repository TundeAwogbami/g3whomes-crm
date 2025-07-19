import { type NextRequest, NextResponse } from "next/server"
import { sql, handleDbError } from "@/lib/db"

// GET /api/contacts - Fetch all contacts
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const type = searchParams.get("type")
    const status = searchParams.get("status")
    const search = searchParams.get("search")

    let query = `
      SELECT c.*, u.first_name as agent_first_name, u.last_name as agent_last_name
      FROM contacts c
      LEFT JOIN users u ON c.assigned_agent_id = u.id
      WHERE 1=1
    `
    const params: any[] = []

    if (type) {
      query += ` AND c.type = $${params.length + 1}`
      params.push(type)
    }

    if (status) {
      query += ` AND c.status = $${params.length + 1}`
      params.push(status)
    }

    if (search) {
      query += ` AND (c.first_name ILIKE $${params.length + 1} OR c.last_name ILIKE $${params.length + 1} OR c.email ILIKE $${params.length + 1})`
      params.push(`%${search}%`)
    }

    query += ` ORDER BY c.created_at DESC`

    const contacts = await sql(query, params)
    return NextResponse.json(contacts)
  } catch (error) {
    handleDbError(error)
    return NextResponse.json({ error: "Failed to fetch contacts" }, { status: 500 })
  }
}

// POST /api/contacts - Create new contact
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const {
      first_name,
      last_name,
      email,
      phone,
      type = "lead",
      status = "lead",
      address,
      city,
      state,
      zip_code,
      notes,
      assigned_agent_id,
    } = body

    if (!first_name || !last_name) {
      return NextResponse.json({ error: "First name and last name are required" }, { status: 400 })
    }

    const result = await sql`
      INSERT INTO contacts (
        first_name, last_name, email, phone, type, status,
        address, city, state, zip_code, notes, assigned_agent_id
      )
      VALUES (
        ${first_name}, ${last_name}, ${email}, ${phone}, ${type}, ${status},
        ${address}, ${city}, ${state}, ${zip_code}, ${notes}, ${assigned_agent_id}
      )
      RETURNING *
    `

    return NextResponse.json(result[0], { status: 201 })
  } catch (error) {
    handleDbError(error)
    return NextResponse.json({ error: "Failed to create contact" }, { status: 500 })
  }
}
