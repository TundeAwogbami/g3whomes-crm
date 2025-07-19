import { withAuth } from "next-auth/middleware"
import { NextResponse } from "next/server"

export default withAuth(
  function middleware(req) {
    const { pathname } = req.nextUrl
    const { token } = req.nextauth

    // Redirect authenticated users from auth pages to dashboard
    if (token && (pathname.startsWith("/auth/signin") || pathname.startsWith("/auth/signup"))) {
      return NextResponse.redirect(new URL("/", req.url))
    }

    // Protect dashboard and other pages
    if (!token && !pathname.startsWith("/auth")) {
      return NextResponse.redirect(new URL("/auth/signin", req.url))
    }

    // Allow access to auth pages if not authenticated
    if (!token && pathname.startsWith("/auth")) {
      return NextResponse.next()
    }

    // Allow access to all other pages if authenticated
    return NextResponse.next()
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
    pages: {
      signIn: "/auth/signin",
      error: "/auth/error",
    },
  },
)

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
}
