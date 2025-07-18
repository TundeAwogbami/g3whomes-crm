import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { getDataRecords, createDataRecord, updateDataRecord, deleteDataRecord } from "@/lib/db-supabase"

export async function GET(request: Request) {
  const session = await getServerSession(authOptions)
  if (!session || !session.user) {
    return new NextResponse(JSON.stringify({ message: "Unauthorized" }), { status: 401 })
  }

  const { searchParams } = new URL(request.url)
  const category = searchParams.get("category") || undefined
  const record_type = searchParams.get("record_type") || undefined
  const search = searchParams.get("search") || undefined

  try {
    const records = await getDataRecords(session.user, { category, record_type, search })
    return NextResponse.json(records)
  } catch (error) {
    console.error("API Error fetching data records:", error)
    return new NextResponse(JSON.stringify({ message: "Failed to fetch data records" }), { status: 500 })
  }
}

export async function POST(request: Request) {
  const session = await getServerSession(authOptions)
  if (!session || !session.user) {
    return new NextResponse(JSON.stringify({ message: "Unauthorized" }), { status: 401 })
  }

  try {
    const body = await request.json()
    const newRecord = await createDataRecord(session.user, body)
    if (!newRecord) {
      return new NextResponse(JSON.stringify({ message: "Failed to create data record" }), { status: 500 })
    }
    return NextResponse.json(newRecord, { status: 201 })
  } catch (error) {
    console.error("API Error creating data record:", error)
    return new NextResponse(JSON.stringify({ message: "Failed to create data record" }), { status: 500 })
  }
}

export async function PUT(request: Request) {
  const session = await getServerSession(authOptions)
  if (!session || !session.user) {
    return new NextResponse(JSON.stringify({ message: "Unauthorized" }), { status: 401 })
  }

  const { searchParams } = new URL(request.url)
  const id = searchParams.get("id")

  if (!id) {
    return new NextResponse(JSON.stringify({ message: "Record ID is required" }), { status: 400 })
  }

  try {
    const body = await request.json()
    const updatedRecord = await updateDataRecord(session.user, id, body)
    if (!updatedRecord) {
      return new NextResponse(JSON.stringify({ message: "Failed to update data record" }), { status: 500 })
    }
    return NextResponse.json(updatedRecord)
  } catch (error) {
    console.error("API Error updating data record:", error)
    return new NextResponse(JSON.stringify({ message: "Failed to update data record" }), { status: 500 })
  }
}

export async function DELETE(request: Request) {
  const session = await getServerSession(authOptions)
  if (!session || !session.user) {
    return new NextResponse(JSON.stringify({ message: "Unauthorized" }), { status: 401 })
  }

  const { searchParams } = new URL(request.url)
  const id = searchParams.get("id")

  if (!id) {
    return new NextResponse(JSON.stringify({ message: "Record ID is required" }), { status: 400 })
  }

  try {
    const success = await deleteDataRecord(session.user, id)
    if (!success) {
      return new NextResponse(JSON.stringify({ message: "Failed to delete data record" }), { status: 500 })
    }
    return new NextResponse(null, { status: 204 })
  } catch (error) {
    console.error("API Error deleting data record:", error)
    return new NextResponse(JSON.stringify({ message: "Failed to delete data record" }), { status: 500 })
  }
}
