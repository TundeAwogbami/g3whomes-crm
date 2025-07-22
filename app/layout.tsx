import { Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Navigation } from "@/components/navigation"
import Link from "next/link"
import { AuthProvider } from "@/components/auth-provider" // Import the new AuthProvider

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "G3W Homes CRM",
  description: "Your comprehensive CRM for real estate management.",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {/* Wrap the entire app with AuthProvider */}
        <AuthProvider>
          <div className="grid min-h-screen w-full lg:grid-cols-[280px_1fr]">
            <div className="hidden border-r bg-muted/40 lg:block">
              <Navigation />
            </div>
            <div className="flex flex-col">
              <header className="flex h-16 items-center gap-4 border-b bg-background px-4 lg:px-6">
                <div className="flex-1 text-lg font-semibold lg:hidden">G3W Homes CRM</div>
                <div className="ml-auto flex items-center gap-2">
                  {/* Add Client Button */}
                  <Link href="/clients/add">
                    <Button size="sm" className="h-8 gap-1">
                      <Plus className="h-3.5 w-3.5" />
                      <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">Add Client</span>
                    </Button>
                  </Link>
                  {/* Add Property Button */}
                  <Link href="/properties/add">
                    <Button size="sm" className="h-8 gap-1">
                      <Plus className="h-3.5 w-3.5" />
                      <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">Add Property</span>
                    </Button>
                  </Link>
                </div>
              </header>
              <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">{children}</main>
            </div>
          </div>
        </AuthProvider>
      </body>
    </html>
  )
}
