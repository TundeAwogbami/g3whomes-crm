"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, Users, Building, FileText, Settings, BarChart, DollarSign, Briefcase, LinkIcon } from "lucide-react" // Renamed Link icon to LinkIcon
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
import { signOut } from "next-auth/react"

export function Navigation() {
  const pathname = usePathname()

  const navItems = [
    { href: "/dashboard", icon: Home, label: "Dashboard" },
    { href: "/contacts", icon: Users, label: "Contacts" },
    { href: "/properties", icon: Building, label: "Properties" },
    { href: "/deals", icon: Briefcase, label: "Deals" },
    { href: "/tasks", icon: Briefcase, label: "Tasks" },
    { href: "/documents", icon: FileText, label: "Documents" },
    { href: "/reports", icon: BarChart, label: "Reports" },
    { href: "/settings", icon: Settings, label: "Settings" },
    { href: "/financial-records", icon: DollarSign, label: "Financial Records" },
    { href: "/staff", icon: Users, label: "Staff" },
    { href: "/affiliates", icon: LinkIcon, label: "Affiliates" }, // Now using LinkIcon
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
          {navItems.map((item) => (
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
          ))}
        </ul>
      </nav>
      <div className="mt-auto border-t p-4 lg:p-6">
        <div className="flex items-center gap-3">
          <Avatar>
            <AvatarImage src="/placeholder-user.jpg" alt="User Avatar" />
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
          <div className="grid gap-0.5">
            <div className="font-semibold">John Doe</div>
            <div className="text-xs text-muted-foreground">Real Estate Agent</div>
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
