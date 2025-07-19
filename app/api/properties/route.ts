import { sql } from "@/lib/db"
import { type NextRequest, NextResponse } from "next/server"

export async function GET() {
  try {
    const properties = await sql`SELECT * FROM properties ORDER BY created_at DESC`
    return NextResponse.json(properties)
  } catch (error) {
    console.error("Error fetching properties:", error)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const { address, city, state, zip_code, price, status } = await request.json()
    if (!address) {
      return NextResponse.json({ error: "Address is required" }, { status: 400 })
    }
    const newProperty = await sql`
      INSERT INTO properties (address, city, state, zip_code, price, status)
      VALUES (${address}, ${city}, ${state}, ${zip_code}, ${price}, ${status})
      RETURNING *;
    `
    return NextResponse.json(newProperty[0], { status: 201 })
  } catch (error) {
    console.error("Error creating property:", error)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}
