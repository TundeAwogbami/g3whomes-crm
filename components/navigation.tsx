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
<<<<<<< HEAD
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
=======
  ChevronUp,
  Shield,
  Package2,
  BarChart3,
} from "lucide-react"
>>>>>>> parent of 02a07d6 (Changes)
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
<<<<<<< HEAD
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
=======
  SidebarProvider,
  useSidebar,
} from "@/components/ui/sidebar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

// Menu items.
const navItems = [
  {
    title: "Dashboard",
    href: "/",
    icon: Home,
  },
  {
    title: "Contacts",
    href: "/contacts",
    icon: Users,
  },
  {
    title: "Properties",
    href: "/properties",
    icon: Building,
  },
  {
    title: "Deals",
    href: "/deals",
    icon: Handshake,
  },
  {
    title: "Tasks",
    href: "/tasks",
    icon: CalendarCheck,
  },
  {
    title: "Documents",
    href: "/documents",
    icon: FileText,
  },
  {
    title: "Data Management",
    href: "/data-management",
    icon: Database,
  },
  {
    title: "Reports",
    href: "/reports",
    icon: BarChart3,
  },
  {
    title: "Settings",
    href: "/settings",
    icon: Settings,
  },
]
>>>>>>> parent of 02a07d6 (Changes)

export default function Navigation() {
  const pathname = usePathname()
  const { data: session } = useSession()
<<<<<<< HEAD

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
=======
  const { toggleSidebar } = useSidebar()

  const handleSignOut = async () => {
    await signOut({ callbackUrl: "/auth/signout" })
  }

  return (
    <SidebarProvider>
      <Sidebar collapsible="icon" variant="sidebar">
        <SidebarHeader>
          <Link href="/" className="flex items-center gap-2 font-semibold">
            <Package2 className="h-6 w-6" />
            <span className="group-data-[collapsible=icon]:hidden">Real Estate CRM</span>
          </Link>
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupContent>
              <SidebarMenu>
                {navItems.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild isActive={pathname === item.href}>
                      <Link href={item.href}>
                        <item.icon />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>

          <SidebarSeparator />

          <Collapsible defaultOpen className="group/collapsible">
            <SidebarGroup>
              <SidebarGroupLabel asChild>
                <CollapsibleTrigger asChild>
                  <SidebarMenuButton>
                    <Shield />
                    <span>Admin</span>
                    <ChevronDown className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180" />
                  </SidebarMenuButton>
                </CollapsibleTrigger>
              </SidebarGroupLabel>
              <CollapsibleContent>
                <SidebarGroupContent>
                  <SidebarMenu>
                    <SidebarMenuItem>
                      <SidebarMenuButton asChild>
                        <Link href="/admin/users">
                          <Users />
                          <span>Users</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                      <SidebarMenuButton asChild>
                        <Link href="/admin/roles">
                          <Settings />
                          <span>Roles</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  </SidebarMenu>
                </SidebarGroupContent>
              </CollapsibleContent>
            </SidebarGroup>
          </Collapsible>
        </SidebarContent>
        <SidebarFooter>
          <SidebarMenu>
            <SidebarMenuItem>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <SidebarMenuButton>
                    <Avatar className="h-6 w-6">
                      <AvatarImage src={session?.user?.image || "/placeholder-user.jpg"} />
                      <AvatarFallback>{session?.user?.name?.[0] || "U"}</AvatarFallback>
                    </Avatar>
                    <span className="group-data-[collapsible=icon]:hidden">{session?.user?.name || "Guest"}</span>
                    <ChevronUp className="ml-auto group-data-[collapsible=icon]:hidden" />
                  </SidebarMenuButton>
                </DropdownMenuTrigger>
                <DropdownMenuContent side="top" className="w-[--radix-popper-anchor-width]">
                  <DropdownMenuItem asChild>
                    <Link href="/profile">
                      <User2 className="mr-2 h-4 w-4" />
                      <span>Profile</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={handleSignOut}>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Sign out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
        <SidebarRail />
      </Sidebar>
    </SidebarProvider>
>>>>>>> parent of 02a07d6 (Changes)
  )
}
