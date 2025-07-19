import { NextResponse } from "next/server"
import { supabaseAdmin } from "@/lib/db-supabase"
import { getSession } from "@/lib/auth"

export async function GET() {
  const session = await getSession()

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const { data, error } = await supabaseAdmin
      .from("documents")
      .select("*")
      .eq("user_id", session.user.id) // Ensure only user's documents are fetched
      .order("uploaded_at", { ascending: false })

    if (error) {
      console.error("Error fetching documents:", error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json(data)
  } catch (error) {
    console.error("Unexpected error fetching documents:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function POST(req: Request) {
  const session = await getSession()

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const { file_name, file_url, file_type, file_size } = await req.json()

    if (!file_name || !file_url) {
      return NextResponse.json({ error: "File name and URL are required" }, { status: 400 })
    }

    const { data, error } = await supabaseAdmin
      .from("documents")
      .insert({
        user_id: session.user.id,
        file_name,
        file_url,
        file_type,
        file_size,
      })
      .select()

    if (error) {
      console.error("Error inserting document:", error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json(data[0], { status: 201 })
  } catch (error) {
    console.error("Unexpected error uploading document:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
