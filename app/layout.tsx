import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import Link from "next/link"
import { AuthProvider } from "@/components/auth-provider"
import { Logo } from "@/components/logo"

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
        <AuthProvider>
          <div className="flex min-h-screen w-full flex-col">
            <header className="flex h-16 items-center gap-4 border-b bg-background px-4 lg:px-6">
              <Link href="/" className="flex items-center gap-2 font-semibold hover:opacity-80 transition-opacity">
                <Logo />
              </Link>
            </header>
            <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">{children}</main>
          </div>
        </AuthProvider>
      </body>
    </html>
  )
}
