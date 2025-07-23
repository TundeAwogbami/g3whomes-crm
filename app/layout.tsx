import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { AuthProvider } from "@/components/auth-provider" // Import the new AuthProvider
import { Building } from "lucide-react" // Import Building icon for the header

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
          <div className="flex min-h-screen w-full flex-col">
            {" "}
            {/* Adjusted layout for no sidebar */}
            <header className="flex h-16 items-center gap-4 border-b bg-background px-4 lg:px-6">
              <Link href="/dashboard" className="flex items-center gap-2 font-semibold">
                <Building className="h-6 w-6" />
                <span className="text-lg">G3W Homes CRM</span> {/* Always visible title */}
              </Link>
              <div className="ml-auto flex items-center gap-2">
                {/* Sign Up Button */}
                <Link href="/auth/signup">
                  <Button size="sm" className="h-8">
                    <span className="whitespace-nowrap">Sign Up</span>
                  </Button>
                </Link>
                {/* Sign In Button */}
                <Link href="/auth/signin">
                  <Button size="sm" className="h-8">
                    <span className="whitespace-nowrap">Sign In</span>
                  </Button>
                </Link>
              </div>
            </header>
            <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">{children}</main>
          </div>
        </AuthProvider>
      </body>
    </html>
  )
}
