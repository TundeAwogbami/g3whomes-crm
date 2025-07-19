import { NextResponse } from "next/server"
import { createUser, getUserByEmail } from "@/lib/auth"
import bcrypt from "bcryptjs"

export async function POST(req: Request) {
  try {
    const { name, email, password, role } = await req.json()

    if (!name || !email || !password || !role) {
      return NextResponse.json({ error: "All fields are required." }, { status: 400 })
    }

    const existingUser = await getUserByEmail(email)
    if (existingUser) {
      return NextResponse.json({ error: "User with this email already exists." }, { status: 409 })
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    await createUser({ name, email, password: hashedPassword, role })

    return NextResponse.json({ message: "User registered successfully." }, { status: 201 })
  } catch (error) {
    console.error("Registration error:", error)
    return NextResponse.json({ error: "Internal server error." }, { status: 500 })
  }
}
