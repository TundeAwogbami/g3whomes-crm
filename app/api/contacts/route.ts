import { sql } from "@/lib/db"
import { type NextRequest, NextResponse } from "next/server"

export async function GET() {
  try {
    const contacts = await sql`SELECT * FROM contacts ORDER BY created_at DESC`
    return NextResponse.json(contacts)
  } catch (error) {
    console.error("Error fetching contacts:", error)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const { name, email, phone, address } = await request.json()
    if (!name || !email) {
      return NextResponse.json({ error: "Name and email are required" }, { status: 400 })
    }
    const newContact = await sql`
      INSERT INTO contacts (name, email, phone, address)
      VALUES (${name}, ${email}, ${phone}, ${address})
      RETURNING *;
    `
    return NextResponse.json(newContact[0], { status: 201 })
  } catch (error: any) {
    console.error("Error creating contact:", error)
    if (error.code === "23505") {
      // Unique violation
      return NextResponse.json({ error: "Contact with this email already exists" }, { status: 409 })
    }
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}
