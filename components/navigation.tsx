"use client"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { signOut, useSession } from "next-auth/react"
import {
  Home,
  Users,
  Building,
  Handshake,
  CalendarCheck,
  FileText,
  Settings,
  LogOut,
  ChevronDown,
  BarChart3,
  Package2,
  User2,
  Database,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export default function Navigation() {
  const pathname = usePathname()
  const { data: session } = useSession()

  const navItems = [
    {
      title: "Dashboard",
      href: "/",
      icon: Home,
      isActive: pathname === "/",
    },
    {
      title: "Clients",
      href: "/contacts",
      icon: Users,
      isActive: pathname.startsWith("/contacts"),
    },
    {
      title: "Properties",
      href: "/properties",
      icon: Building,
      isActive: pathname.startsWith("/properties"),
    },
    {
      title: "Deals",
      href: "/deals",
      icon: Handshake,
      isActive: pathname.startsWith("/deals"),
    },
    {
      title: "Tasks",
      href: "/tasks",
      icon: CalendarCheck,
      isActive: pathname.startsWith("/tasks"),
    },
    {
      title: "Documents",
      href: "/documents",
      icon: FileText,
      isActive: pathname.startsWith("/documents"),
    },
    {
      title: "Data Management",
      href: "/data-management",
      icon: Database,
      isActive: pathname.startsWith("/data-management"),
    },
    {
      title: "Reports",
      href: "/reports",
      icon: BarChart3,
      isActive: pathname.startsWith("/reports"),
    },
  ]

  return (
    <Sidebar>
      <SidebarHeader className="flex items-center justify-between px-4 py-2">
        <Link href="/" className="flex items-center gap-2 font-semibold">
          <Package2 className="h-6 w-6 text-dark-orange-500" />
          <span className="text-lg text-dark-orange-700">Real Estate CRM</span>
        </Link>
        <SidebarTrigger className="lg:hidden" />
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Main Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild isActive={item.isActive}>
                    <Link href={item.href}>
                      <item.icon className="h-5 w-5" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarSeparator />

        <SidebarGroup>
          <SidebarGroupLabel>Settings</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={pathname === "/settings"}>
                  <Link href="/settings">
                    <Settings className="h-5 w-5" />
                    <span>Settings</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="flex items-center justify-between px-4 py-2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="w-full justify-start gap-2">
              <Avatar className="h-8 w-8">
                <AvatarImage src={session?.user?.image || "/placeholder-user.jpg"} alt="User Avatar" />
                <AvatarFallback>{session?.user?.name?.[0] || "U"}</AvatarFallback>
              </Avatar>
              <div className="flex flex-col items-start">
                <span className="font-medium">{session?.user?.name || "Guest"}</span>
                <span className="text-xs text-muted-foreground">{session?.user?.email || "Not signed in"}</span>
              </div>
              <ChevronDown className="ml-auto h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56" align="end">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link href="/profile">
                <User2 className="mr-2 h-4 w-4" />
                Profile
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href="/settings">
                <Settings className="mr-2 h-4 w-4" />
                Settings
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => signOut({ callbackUrl: "/auth/signout" })}>
              <LogOut className="mr-2 h-4 w-4" />
              Sign Out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarFooter>
    </Sidebar>
  )
}
