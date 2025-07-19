import { type NextRequest, NextResponse } from "next/server"
import { sql, handleDbError } from "@/lib/db"

// GET /api/deals - Fetch all deals
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const stage = searchParams.get("stage")
    const agent_id = searchParams.get("agent_id")

    let query = `
      SELECT d.*, 
             c.first_name as contact_first_name, c.last_name as contact_last_name,
             p.title as property_title, p.address as property_address,
             u.first_name as agent_first_name, u.last_name as agent_last_name
      FROM deals d
      LEFT JOIN contacts c ON d.contact_id = c.id
      LEFT JOIN properties p ON d.property_id = p.id
      LEFT JOIN users u ON d.agent_id = u.id
      WHERE 1=1
    `
    const params: any[] = []

    if (stage) {
      query += ` AND d.stage = $${params.length + 1}`
      params.push(stage)
    }

    if (agent_id) {
      query += ` AND d.agent_id = $${params.length + 1}`
      params.push(Number.parseInt(agent_id))
    }

    query += ` ORDER BY d.created_at DESC`

    const deals = await sql(query, params)
    return NextResponse.json(deals)
  } catch (error) {
    handleDbError(error)
    return NextResponse.json({ error: "Failed to fetch deals" }, { status: 500 })
  }
}

// POST /api/deals - Create new deal
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const {
      title,
      contact_id,
      property_id,
      agent_id,
      deal_value,
      commission_rate = 3.0,
      stage = "lead",
      probability = 50,
      expected_close_date,
      notes,
    } = body

    if (!title || !contact_id || !agent_id) {
      return NextResponse.json({ error: "Title, contact, and agent are required" }, { status: 400 })
    }

    // Calculate commission amount if deal value is provided
    const commission_amount = deal_value && commission_rate ? (deal_value * commission_rate) / 100 : null

    const result = await sql`
      INSERT INTO deals (
        title, contact_id, property_id, agent_id, deal_value,
        commission_rate, commission_amount, stage, probability,
        expected_close_date, notes
      )
      VALUES (
        ${title}, ${contact_id}, ${property_id}, ${agent_id}, ${deal_value},
        ${commission_rate}, ${commission_amount}, ${stage}, ${probability},
        ${expected_close_date}, ${notes}
      )
      RETURNING *
    `

    return NextResponse.json(result[0], { status: 201 })
  } catch (error) {
    handleDbError(error)
    return NextResponse.json({ error: "Failed to create deal" }, { status: 500 })
  }
}
