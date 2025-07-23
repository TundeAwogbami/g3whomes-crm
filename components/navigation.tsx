"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, Users, Building, FileText, Settings, BarChart, DollarSign, Briefcase, LinkIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { signOut, useSession } from "next-auth/react" // Import useSession

export function Navigation() {
  const pathname = usePathname()
  const { data: session } = useSession() // Get session data
  const userRole = session?.user?.role || "guest" // Default role

  const navItems = [
    { href: "/dashboard", icon: Home, label: "Dashboard", roles: ["admin", "agent", "user", "guest"] },
    { href: "/contacts", icon: Users, label: "Contacts", roles: ["admin", "agent", "user"] },
    { href: "/properties", icon: Building, label: "Properties", roles: ["admin", "agent", "user"] },
    { href: "/deals", icon: Briefcase, label: "Deals", roles: ["admin", "agent", "user"] },
    { href: "/tasks", icon: Briefcase, label: "Tasks", roles: ["admin", "agent", "user"] },
    { href: "/documents", icon: FileText, label: "Documents", roles: ["admin", "agent", "user"] },
    { href: "/reports", icon: BarChart, label: "Reports", roles: ["admin", "agent"] },
    { href: "/settings", icon: Settings, label: "Settings", roles: ["admin", "agent", "user"] },
    { href: "/financial-records", icon: DollarSign, label: "Financial Records", roles: ["admin"] }, // Admin only
    { href: "/staff", icon: Users, label: "Staff", roles: ["admin"] }, // Admin only
    { href: "/affiliates", icon: LinkIcon, label: "Affiliates", roles: ["admin", "agent"] },
  ]

  return (
    <div className="flex h-full flex-col">
      <div className="flex h-16 items-center border-b px-4 lg:px-6">
        <Link href="/dashboard" className="flex items-center gap-2 font-semibold">
          <Building className="h-6 w-6" />
          <span className="text-lg">G3W Homes CRM</span>
        </Link>
      </div>
      <nav className="flex-1 overflow-auto py-4">
        <ul className="grid items-start gap-2 px-4 text-sm font-medium lg:px-6">
          {navItems.map((item) =>
            item.roles.includes(userRole) ? ( // Conditionally render based on role
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary ${
                    pathname === item.href ? "bg-muted text-primary" : "text-muted-foreground"
                  }`}
                >
                  <item.icon className="h-4 w-4" />
                  {item.label}
                </Link>
              </li>
            ) : null,
          )}
        </ul>
      </nav>
      <div className="mt-auto border-t p-4 lg:p-6">
        <div className="flex items-center gap-3">
          <Avatar>
            <AvatarImage src="/placeholder-user.jpg" alt="User Avatar" />
            <AvatarFallback>
              {session?.user?.name
                ? session.user.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")
                : "JD"}
            </AvatarFallback>
          </Avatar>
          <div className="grid gap-0.5">
            <div className="font-semibold">{session?.user?.name || "Guest User"}</div>
            <div className="text-xs text-muted-foreground">{session?.user?.role || "Guest"}</div>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="ml-auto rounded-full">
                <Settings className="h-4 w-4" />
                <span className="sr-only">User menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuItem>Support</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => signOut()}>Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  )
}
