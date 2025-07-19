import { type NextRequest, NextResponse } from "next/server"
import { getProperties, createProperty } from "@/lib/db-supabase"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const filters = {
      status: searchParams.get("status") || undefined,
      type: searchParams.get("type") || undefined,
      listing_type: searchParams.get("listing_type") || undefined,
      search: searchParams.get("search") || undefined,
    }

    const properties = await getProperties(filters)
    return NextResponse.json(properties)
  } catch (error) {
    console.error("API Error:", error)
    return NextResponse.json({ error: "Failed to fetch properties" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const property = await createProperty(body)
    return NextResponse.json(property, { status: 201 })
  } catch (error) {
    console.error("API Error:", error)
    return NextResponse.json({ error: "Failed to create property" }, { status: 500 })
  }
}
