import { sql } from "@/lib/db"
import { type NextRequest, NextResponse } from "next/server"

export async function GET() {
  try {
    const deals = await sql`SELECT * FROM deals ORDER BY created_at DESC`
    return NextResponse.json(deals)
  } catch (error) {
    console.error("Error fetching deals:", error)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const { property_id, contact_id, deal_value, stage, close_date } = await request.json()
    if (!deal_value || !stage) {
      return NextResponse.json({ error: "Deal value and stage are required" }, { status: 400 })
    }
    const newDeal = await sql`
      INSERT INTO deals (property_id, contact_id, deal_value, stage, close_date)
      VALUES (${property_id}, ${contact_id}, ${deal_value}, ${stage}, ${close_date})
      RETURNING *;
    `
    return NextResponse.json(newDeal[0], { status: 201 })
  } catch (error) {
    console.error("Error creating deal:", error)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}
