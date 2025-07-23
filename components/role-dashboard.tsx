"use client"

import type React from "react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useSession } from "next-auth/react"
import { Home, Building, Users, DollarSign, FileText, TrendingUp, Settings } from "lucide-react"
import Link from "next/link"

interface DashboardMetric {
  title: string
  value: string | number
  subtitle: string
  icon: React.ComponentType<{ className?: string }>
  trend?: string
}

interface ActivityItem {
  title: string
  time: string
  type: "success" | "warning" | "info"
}

export function RoleDashboard() {
  const { data: session } = useSession()
  const userRole = session?.user?.role || "user"
  const userName = session?.user?.name || "User"

  // Role-specific metrics
  const getMetricsForRole = (): DashboardMetric[] => {
    switch (userRole) {
      case "admin":
        return [
          { title: "Total Revenue", value: "₦187.5M", subtitle: "+18% from last month", icon: DollarSign, trend: "up" },
          { title: "Active Agents", value: "23", subtitle: "Currently active", icon: Users },
          { title: "Properties Listed", value: "156", subtitle: "Across all agents", icon: Building },
        ]
      case "agent":
        return [
          { title: "Total Listings", value: "12", subtitle: "+2 from last month", icon: Building, trend: "up" },
          { title: "Active Listings", value: "8", subtitle: "Currently on market", icon: Home },
          { title: "Pending Sales", value: "4", subtitle: "Awaiting completion", icon: DollarSign },
        ]
      case "affiliate":
        return [
          { title: "Referrals Made", value: "18", subtitle: "+3 this month", icon: Users, trend: "up" },
          { title: "Commission Earned", value: "₦2.4M", subtitle: "This quarter", icon: DollarSign },
          { title: "Active Partnerships", value: "5", subtitle: "Current collaborations", icon: Building },
        ]
      default:
        return [
          { title: "My Tasks", value: "7", subtitle: "3 due today", icon: FileText },
          { title: "Contacts", value: "45", subtitle: "In my network", icon: Users },
          { title: "Documents", value: "12", subtitle: "Uploaded this month", icon: FileText },
        ]
    }
  }

  // Role-specific activities
  const getActivitiesForRole = (): ActivityItem[] => {
    switch (userRole) {
      case "admin":
        return [
          { title: "New agent John Smith joined the team", time: "2 hours ago", type: "success" },
          { title: "Monthly revenue target achieved", time: "1 day ago", type: "success" },
          { title: "System backup completed successfully", time: "2 days ago", type: "info" },
        ]
      case "agent":
        return [
          { title: "New inquiry for Modern Family Home", time: "2 hours ago", type: "success" },
          { title: "Luxury Condo status changed to Pending", time: "1 day ago", type: "warning" },
          { title: "Price updated for Downtown Apartment", time: "3 days ago", type: "info" },
        ]
      case "affiliate":
        return [
          { title: "Referral commission processed", time: "1 hour ago", type: "success" },
          { title: "New partnership agreement signed", time: "2 days ago", type: "success" },
          { title: "Monthly report generated", time: "1 week ago", type: "info" },
        ]
      default:
        return [
          { title: "Task assigned: Follow up with client", time: "1 hour ago", type: "warning" },
          { title: "Document uploaded successfully", time: "3 hours ago", type: "success" },
          { title: "Meeting scheduled for tomorrow", time: "1 day ago", type: "info" },
        ]
    }
  }

  // Role-specific navigation tabs
  const getNavigationForRole = () => {
    switch (userRole) {
      case "admin":
        return [
          { label: "Dashboard", href: "/dashboard", active: true },
          { label: "Staff Management", href: "/staff" },
          { label: "Financial Records", href: "/financial-records" },
          { label: "Reports", href: "/reports" },
        ]
      case "agent":
        return [
          { label: "Dashboard", href: "/dashboard", active: true },
          { label: "My Listings", href: "/properties" },
          { label: "Add Listing", href: "/properties/add" },
          { label: "Profile", href: "/profile" },
        ]
      case "affiliate":
        return [
          { label: "Dashboard", href: "/dashboard", active: true },
          { label: "My Referrals", href: "/referrals" },
          { label: "Partnerships", href: "/affiliates" },
          { label: "Earnings", href: "/earnings" },
        ]
      default:
        return [
          { label: "Dashboard", href: "/dashboard", active: true },
          { label: "My Tasks", href: "/tasks" },
          { label: "Contacts", href: "/contacts" },
          { label: "Documents", href: "/documents" },
        ]
    }
  }

  const getRoleTitle = () => {
    switch (userRole) {
      case "admin":
        return "Admin Portal"
      case "agent":
        return "Agent Portal"
      case "affiliate":
        return "Affiliate Portal"
      default:
        return "Staff Portal"
    }
  }

  const metrics = getMetricsForRole()
  const activities = getActivitiesForRole()
  const navigation = getNavigationForRole()

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="flex items-center justify-between px-6 py-4">
          <div className="flex items-center gap-2">
            <Home className="h-6 w-6 text-primary" />
            <h1 className="text-xl font-semibold text-gray-900">{getRoleTitle()}</h1>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-600">Welcome, {userName}</span>
            <Link href="/settings">
              <Button variant="ghost" size="sm" className="gap-2">
                <Settings className="h-4 w-4" />
                Settings
              </Button>
            </Link>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="px-6">
          <nav className="flex space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  item.active
                    ? "border-primary text-primary"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-6">
        {/* Metrics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {metrics.map((metric, index) => (
            <Card key={index} className="bg-white">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">{metric.title}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <p className="text-2xl font-bold text-gray-900">{metric.value}</p>
                      {metric.trend && <TrendingUp className="h-4 w-4 text-green-500" />}
                    </div>
                    <p className="text-xs text-gray-500 mt-1">{metric.subtitle}</p>
                  </div>
                  <div className="p-3 bg-gray-100 rounded-lg">
                    <metric.icon className="h-6 w-6 text-gray-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Recent Activity */}
        <Card className="bg-white">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-gray-900">Recent Activity</CardTitle>
            <p className="text-sm text-gray-600">Your latest updates and notifications</p>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-4">
              {activities.map((activity, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div
                    className={`w-2 h-2 rounded-full mt-2 ${
                      activity.type === "success"
                        ? "bg-green-500"
                        : activity.type === "warning"
                          ? "bg-yellow-500"
                          : "bg-blue-500"
                    }`}
                  />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">{activity.title}</p>
                    <p className="text-xs text-gray-500">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
