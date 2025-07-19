import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider" // Corrected import
import AuthProvider from "@/components/auth-provider"
import { Toaster } from "@/components/toaster"
import Navigation from "@/components/navigation" // Corrected import to default export

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Real Estate CRM",
  description: "A comprehensive CRM for real estate management",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <AuthProvider>
            <div className="flex min-h-screen">
              <Navigation /> {/* Render the Navigation component */}
              <main className="flex-1 flex flex-col">{children}</main>
            </div>
            <Toaster />
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
