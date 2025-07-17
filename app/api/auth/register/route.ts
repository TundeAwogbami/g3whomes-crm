import { type NextRequest, NextResponse } from "next/server"
import bcrypt from "bcryptjs"

// In a real application, you would save this to your database
// For now, we'll simulate user creation
const users: any[] = []

export async function POST(request: NextRequest) {
  try {
    const { firstName, lastName, email, password, role, phone } = await request.json()

    // Validate required fields
    if (!firstName || !lastName || !email || !password || !role) {
      return NextResponse.json({ message: "Missing required fields" }, { status: 400 })
    }

    // Check if user already exists
    const existingUser = users.find((user) => user.email === email)
    if (existingUser) {
      return NextResponse.json({ message: "User with this email already exists" }, { status: 409 })
    }

    // Hash password
    const saltRounds = 10
    const hashedPassword = await bcrypt.hash(password, saltRounds)

    // Create new user
    const newUser = {
      id: Date.now().toString(),
      firstName,
      lastName,
      email,
      password_hash: hashedPassword,
      role,
      phone: phone || null,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    }

    // Save user (in real app, save to database)
    users.push(newUser)

    // Return success response (don't include password)
    const { password_hash, ...userResponse } = newUser
    return NextResponse.json(
      {
        message: "User created successfully",
        user: userResponse,
      },
      { status: 201 },
    )
  } catch (error) {
    console.error("Registration error:", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}
