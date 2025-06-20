import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import Navigation from "@/components/navigation"
import AuthProvider from "@/components/auth-provider"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Real Estate CRM",
  description: "Comprehensive CRM system for real estate professionals",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <div className="flex h-screen bg-gray-50">
            <Navigation />
            <main className="flex-1 lg:ml-64 overflow-auto">{children}</main>
          </div>
        </AuthProvider>
      </body>
    </html>
  )
}
