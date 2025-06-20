import { type NextRequest, NextResponse } from "next/server"
import { sql, handleDbError } from "@/lib/db"

// GET /api/properties - Fetch all properties
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const status = searchParams.get("status")
    const type = searchParams.get("type")
    const listing_type = searchParams.get("listing_type")
    const search = searchParams.get("search")

    let query = `
      SELECT p.*, u.first_name as agent_first_name, u.last_name as agent_last_name,
             c.first_name as owner_first_name, c.last_name as owner_last_name
      FROM properties p
      LEFT JOIN users u ON p.listing_agent_id = u.id
      LEFT JOIN contacts c ON p.owner_contact_id = c.id
      WHERE 1=1
    `
    const params: any[] = []

    if (status) {
      query += ` AND p.status = $${params.length + 1}`
      params.push(status)
    }

    if (type) {
      query += ` AND p.property_type = $${params.length + 1}`
      params.push(type)
    }

    if (listing_type) {
      query += ` AND p.listing_type = $${params.length + 1}`
      params.push(listing_type)
    }

    if (search) {
      query += ` AND (p.title ILIKE $${params.length + 1} OR p.address ILIKE $${params.length + 1} OR p.city ILIKE $${params.length + 1})`
      params.push(`%${search}%`)
    }

    query += ` ORDER BY p.created_at DESC`

    const properties = await sql(query, params)
    return NextResponse.json(properties)
  } catch (error) {
    handleDbError(error)
    return NextResponse.json({ error: "Failed to fetch properties" }, { status: 500 })
  }
}

// POST /api/properties - Create new property
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const {
      title,
      description,
      address,
      city,
      state,
      zip_code,
      price,
      property_type,
      listing_type,
      status = "active",
      bedrooms,
      bathrooms,
      square_feet,
      lot_size,
      year_built,
      garage_spaces,
      features,
      images,
      virtual_tour_url,
      listing_agent_id,
      owner_contact_id,
    } = body

    if (!title || !address || !city || !state || !zip_code || !property_type || !listing_type) {
      return NextResponse.json({ error: "Required fields are missing" }, { status: 400 })
    }

    const result = await sql`
      INSERT INTO properties (
        title, description, address, city, state, zip_code, price,
        property_type, listing_type, status, bedrooms, bathrooms,
        square_feet, lot_size, year_built, garage_spaces, features,
        images, virtual_tour_url, listing_agent_id, owner_contact_id
      )
      VALUES (
        ${title}, ${description}, ${address}, ${city}, ${state}, ${zip_code}, ${price},
        ${property_type}, ${listing_type}, ${status}, ${bedrooms}, ${bathrooms},
        ${square_feet}, ${lot_size}, ${year_built}, ${garage_spaces}, ${features},
        ${images}, ${virtual_tour_url}, ${listing_agent_id}, ${owner_contact_id}
      )
      RETURNING *
    `

    return NextResponse.json(result[0], { status: 201 })
  } catch (error) {
    handleDbError(error)
    return NextResponse.json({ error: "Failed to create property" }, { status: 500 })
  }
}
