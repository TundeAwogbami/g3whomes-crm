import { type NextRequest, NextResponse } from "next/server"
import { sql, handleDbError } from "@/lib/db"

// GET /api/contacts/[id] - Fetch single contact
export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const id = Number.parseInt(params.id)
    if (isNaN(id)) {
      return NextResponse.json({ error: "Invalid contact ID" }, { status: 400 })
    }

    const result = await sql`
      SELECT c.*, u.first_name as agent_first_name, u.last_name as agent_last_name
      FROM contacts c
      LEFT JOIN users u ON c.assigned_agent_id = u.id
      WHERE c.id = ${id}
    `

    if (result.length === 0) {
      return NextResponse.json({ error: "Contact not found" }, { status: 404 })
    }

    return NextResponse.json(result[0])
  } catch (error) {
    handleDbError(error)
    return NextResponse.json({ error: "Failed to fetch contact" }, { status: 500 })
  }
}

// PUT /api/contacts/[id] - Update contact
export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const id = Number.parseInt(params.id)
    if (isNaN(id)) {
      return NextResponse.json({ error: "Invalid contact ID" }, { status: 400 })
    }

    const body = await request.json()
    const {
      first_name,
      last_name,
      email,
      phone,
      type,
      status,
      address,
      city,
      state,
      zip_code,
      notes,
      assigned_agent_id,
    } = body

    const result = await sql`
      UPDATE contacts SET
        first_name = ${first_name},
        last_name = ${last_name},
        email = ${email},
        phone = ${phone},
        type = ${type},
        status = ${status},
        address = ${address},
        city = ${city},
        state = ${state},
        zip_code = ${zip_code},
        notes = ${notes},
        assigned_agent_id = ${assigned_agent_id},
        updated_at = CURRENT_TIMESTAMP
      WHERE id = ${id}
      RETURNING *
    `

    if (result.length === 0) {
      return NextResponse.json({ error: "Contact not found" }, { status: 404 })
    }

    return NextResponse.json(result[0])
  } catch (error) {
    handleDbError(error)
    return NextResponse.json({ error: "Failed to update contact" }, { status: 500 })
  }
}

// DELETE /api/contacts/[id] - Delete contact
export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const id = Number.parseInt(params.id)
    if (isNaN(id)) {
      return NextResponse.json({ error: "Invalid contact ID" }, { status: 400 })
    }

    const result = await sql`
      DELETE FROM contacts WHERE id = ${id} RETURNING id
    `

    if (result.length === 0) {
      return NextResponse.json({ error: "Contact not found" }, { status: 404 })
    }

    return NextResponse.json({ message: "Contact deleted successfully" })
  } catch (error) {
    handleDbError(error)
    return NextResponse.json({ error: "Failed to delete contact" }, { status: 500 })
  }
}
