import { sql } from "@/lib/db"
import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { id } = params
    const contacts = await sql`SELECT * FROM contacts WHERE id = ${id}`
    if (contacts.length === 0) {
      return NextResponse.json({ error: "Contact not found" }, { status: 404 })
    }
    return NextResponse.json(contacts[0])
  } catch (error) {
    console.error("Error fetching contact:", error)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { id } = params
    const { name, email, phone, address } = await request.json()
    const updatedContact = await sql`
      UPDATE contacts
      SET name = ${name}, email = ${email}, phone = ${phone}, address = ${address}
      WHERE id = ${id}
      RETURNING *;
    `
    if (updatedContact.length === 0) {
      return NextResponse.json({ error: "Contact not found" }, { status: 404 })
    }
    return NextResponse.json(updatedContact[0])
  } catch (error) {
    console.error("Error updating contact:", error)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { id } = params
    const deletedContact = await sql`
      DELETE FROM contacts
      WHERE id = ${id}
      RETURNING *;
    `
    if (deletedContact.length === 0) {
      return NextResponse.json({ error: "Contact not found" }, { status: 404 })
    }
    return NextResponse.json({ message: "Contact deleted successfully" })
  } catch (error) {
    console.error("Error deleting contact:", error)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}
