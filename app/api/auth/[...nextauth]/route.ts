import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { createClient } from "@/lib/supabase" // Your server-side Supabase client

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null
        }

        const supabase = createClient()

        // Sign in with Supabase
        const { data, error } = await supabase.auth.signInWithPassword({
          email: credentials.email,
          password: credentials.password,
        })

        if (error || !data.user) {
          console.error("Authentication error:", error?.message || "No user data")
          throw new Error(error?.message || "Invalid credentials")
        }

        // Fetch user role from your 'staff' table
        const { data: staffData, error: staffError } = await supabase
          .from("staff")
          .select("role")
          .eq("email", data.user.email)
          .single()

        if (staffError) {
          console.error("Error fetching staff role:", staffError.message)
          // Continue without role if not found, or throw error based on your policy
        }

        return {
          id: data.user.id,
          email: data.user.email,
          name: data.user.user_metadata.username || data.user.email, // Use username if available
          role: staffData?.role || "user", // Default to 'user' if no role found
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
        token.role = user.role // Add role to JWT
      }
      return token
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id as string
        session.user.role = token.role as string // Add role to session
      }
      return session
    },
  },
  pages: {
    signIn: "/auth/signin",
    signOut: "/auth/signin", // Redirect to sign-in after logout
    error: "/auth/signin", // Error page for authentication errors
  },
  secret: process.env.NEXTAUTH_SECRET,
})

export { handler as GET, handler as POST }
