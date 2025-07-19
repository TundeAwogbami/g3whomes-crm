"use client"

import React from "react"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  Home,
  Users,
  DollarSign,
  ClipboardList,
  FileText,
  Database,
  Settings,
  BarChart,
  LogOut,
  User2,
  ChevronDown,
  ChevronUp,
  Shield,
} from "lucide-react"
import { cn } from "@/lib/utils"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  SidebarSeparator,
  useSidebar,
} from "@/components/ui/sidebar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { signOut, useSession } from "next-auth/react"

export default function Navigation() {
  const pathname = usePathname()
  const { data: session } = useSession()
  const { state } = useSidebar()

  // State for the custom collapsible Admin section
  const [isAdminOpen, setIsAdminOpen] = React.useState(true) // Default to open

  const menuItems = [
    {
      title: "Dashboard",
      href: "/",
      icon: Home,
    },
    {
      title: "CRM",
      items: [
        {
          title: "Contacts",
          href: "/contacts",
          icon: Users,
        },
        {
          title: "Properties",
          href: "/properties",
          icon: Home,
        },
        {
          title: "Deals",
          href: "/deals",
          icon: DollarSign,
        },
        {
          title: "Tasks",
          href: "/tasks",
          icon: ClipboardList,
        },
      ],
    },
    {
      title: "Data Management",
      items: [
        {
          title: "Documents",
          href: "/documents",
          icon: FileText,
        },
        {
          title: "Data Records",
          href: "/data-management",
          icon: Database,
        },
      ],
    },
    {
      title: "Reports",
      href: "/reports",
      icon: BarChart,
    },
    {
      title: "Settings",
      href: "/settings",
      icon: Settings,
    },
  ]

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="p-2">
        <Link href="/" className="flex items-center gap-2 px-2 text-lg font-semibold">
          <Home className="h-6 w-6 text-dark-orange-500" />
          <span className={cn("transition-opacity", state === "collapsed" && "opacity-0")}>CRM</span>
        </Link>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          {menuItems.map((group, index) => (
            <React.Fragment key={group.title}>
              {group.href ? (
                <SidebarMenuItem>
                  <SidebarMenuButton asChild isActive={pathname === group.href}>
                    <Link href={group.href}>
                      <group.icon />
                      <span>{group.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ) : (
                <SidebarMenuItem>
                  <SidebarGroupLabel asChild>
                    <SidebarMenuButton onClick={() => setIsAdminOpen(!isAdminOpen)}>
                      {group.title === "CRM" && <Users />}
                      {group.title === "Data Management" && <Database />}
                      <span>{group.title}</span>
                      <ChevronDown
                        className={cn("ml-auto h-4 w-4 transition-transform", isAdminOpen && "rotate-180")}
                      />
                    </SidebarMenuButton>
                  </SidebarGroupLabel>
                </SidebarMenuItem>
              )}
              {index < menuItems.length - 1 && <SidebarSeparator />}
            </React.Fragment>
          ))}

          {/* Admin section - now using custom state */}
          <SidebarSeparator />
          <SidebarMenuItem>
            <SidebarGroupLabel asChild>
              <SidebarMenuButton onClick={() => setIsAdminOpen(!isAdminOpen)}>
                <Shield />
                <span>Admin</span>
                <ChevronDown className={cn("ml-auto transition-transform", isAdminOpen && "rotate-180")} />
              </SidebarMenuButton>
            </SidebarGroupLabel>
          </SidebarMenuItem>
          {isAdminOpen && (
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
          )}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton>
                  <Avatar className="h-6 w-6">
                    <AvatarImage src="/placeholder-user.jpg" />
                    <AvatarFallback>
                      {session?.user?.name ? session.user.name.charAt(0) : <User2 className="h-4 w-4" />}
                    </AvatarFallback>
                  </Avatar>
                  <span className={cn("transition-opacity", state === "collapsed" && "opacity-0")}>
                    {session?.user?.name || session?.user?.email || "Guest"}
                  </span>
                  <ChevronUp
                    className={cn("ml-auto h-4 w-4 transition-opacity", state === "collapsed" && "opacity-0")}
                  />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent side="top" className="w-[--radix-popper-anchor-width]">
                <DropdownMenuItem asChild>
                  <Link href="/profile">
                    <User2 className="mr-2 h-4 w-4" />
                    <span>Profile</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => signOut({ callbackUrl: "/auth/signout" })}>
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
  )
}
