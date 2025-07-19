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
      .from("data_records")
      .select("*")
      .eq("user_id", session.user.id) // Ensure only user's records are fetched
      .order("created_at", { ascending: false })

    if (error) {
      console.error("Error fetching data records:", error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json(data)
  } catch (error) {
    console.error("Unexpected error fetching data records:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function POST(req: Request) {
  const session = await getSession()

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const { record_type, data: recordData } = await req.json()

    if (!record_type || !recordData) {
      return NextResponse.json({ error: "Record type and data are required" }, { status: 400 })
    }

    const { data, error } = await supabaseAdmin
      .from("data_records")
      .insert({
        user_id: session.user.id,
        record_type,
        data: recordData,
      })
      .select()

    if (error) {
      console.error("Error inserting data record:", error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json(data[0], { status: 201 })
  } catch (error) {
    console.error("Unexpected error creating data record:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function PUT(req: Request) {
  const session = await getSession()

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const { id, record_type, data: recordData } = await req.json()

    if (!id || !record_type || !recordData) {
      return NextResponse.json({ error: "ID, record type, and data are required for update" }, { status: 400 })
    }

    const { data, error } = await supabaseAdmin
      .from("data_records")
      .update({ record_type, data: recordData })
      .eq("id", id)
      .eq("user_id", session.user.id) // Ensure user can only update their own records
      .select()

    if (error) {
      console.error("Error updating data record:", error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    if (data.length === 0) {
      return NextResponse.json({ error: "Record not found or unauthorized" }, { status: 404 })
    }

    return NextResponse.json(data[0])
  } catch (error) {
    console.error("Unexpected error updating data record:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function DELETE(req: Request) {
  const session = await getSession()

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const { id } = await req.json()

    if (!id) {
      return NextResponse.json({ error: "Record ID is required for deletion" }, { status: 400 })
    }

    const { error, count } = await supabaseAdmin
      .from("data_records")
      .delete()
      .eq("id", id)
      .eq("user_id", session.user.id) // Ensure user can only delete their own records
      .select()

    if (error) {
      console.error("Error deleting data record:", error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    if (count === 0) {
      return NextResponse.json({ error: "Record not found or unauthorized" }, { status: 404 })
    }

    return NextResponse.json({ message: "Record deleted successfully" })
  } catch (error) {
    console.error("Unexpected error deleting data record:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
