"use client"

import type React from "react"

import { useSession } from "next-auth/react"
import { usePathname } from "next/navigation"
import Navigation from "@/components/navigation"
import { Loader2 } from "lucide-react"

interface AuthWrapperProps {
  children: React.ReactNode
}

export function AuthWrapper({ children }: AuthWrapperProps) {
  const { data: session, status } = useSession()
  const pathname = usePathname()

  // Define public paths that don't require authentication
  const isPublicPath = pathname.startsWith("/auth/")

  // Show loading spinner while checking authentication
  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4 text-dark-orange-600" />
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }

  // If it's a public path (auth pages), render without navigation
  if (isPublicPath) {
    return <>{children}</>
  }

  // If user is not authenticated and trying to access protected route
  if (!session) {
    // This should be handled by middleware, but as a fallback
    window.location.href = "/auth/signin"
    return null
  }

  // Render with navigation for authenticated users
  return (
    <div className="flex h-screen bg-gray-50">
      <Navigation />
      <main className="flex-1 lg:ml-64 overflow-auto">{children}</main>
    </div>
  )
}
