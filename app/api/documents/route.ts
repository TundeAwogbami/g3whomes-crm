import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { getDocuments, createDocument, deleteDocument } from "@/lib/db-supabase"
import type { Document } from "@/lib/types"

export async function GET(request: Request) {
  const session = await getServerSession(authOptions)
  if (!session || !session.user) {
    return new NextResponse(JSON.stringify({ message: "Unauthorized" }), { status: 401 })
  }

  const { searchParams } = new URL(request.url)
  const category = searchParams.get("category") || undefined
  const document_type = searchParams.get("document_type") || undefined
  const access_level = searchParams.get("access_level") || undefined
  const search = searchParams.get("search") || undefined

  try {
    const documents = await getDocuments(session.user, { category, document_type, access_level, search })
    return NextResponse.json(documents)
  } catch (error) {
    console.error("API Error fetching documents:", error)
    return new NextResponse(JSON.stringify({ message: "Failed to fetch documents" }), { status: 500 })
  }
}

export async function POST(request: Request) {
  const session = await getServerSession(authOptions)
  if (!session || !session.user) {
    return new NextResponse(JSON.stringify({ message: "Unauthorized" }), { status: 401 })
  }

  try {
    const documentData: Omit<Document, "id" | "created_at" | "updated_at" | "uploaded_by"> = await request.json()
    const newDocument = await createDocument(documentData, session.user)
    if (!newDocument) {
      return new NextResponse(JSON.stringify({ message: "Failed to create document" }), { status: 500 })
    }
    return NextResponse.json(newDocument, { status: 201 })
  } catch (error) {
    console.error("API Error creating document:", error)
    return new NextResponse(JSON.stringify({ message: "Failed to create document" }), { status: 500 })
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
    return new NextResponse(JSON.stringify({ message: "Document ID is required" }), { status: 400 })
  }

  try {
    await deleteDocument(id, session.user)
    return new NextResponse(null, { status: 204 })
  } catch (error) {
    console.error("API Error deleting document:", error)
    return new NextResponse(JSON.stringify({ message: "Failed to delete document" }), { status: 500 })
  }
}
