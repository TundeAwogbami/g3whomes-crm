"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Users, Home, DollarSign, TrendingUp, Plus, Phone, Calendar } from "lucide-react"
import Link from "next/link"
import { formatNaira } from "@/lib/currency"

export default function Dashboard() {
  const stats = [
    {
      title: "Total Clients",
      value: "1,234",
      change: "+12% from last month",
      icon: Users,
      color: "text-blue-600",
    },
    {
      title: "Active Listings",
      value: "89",
      change: "+5% from last month",
      icon: Home,
      color: "text-green-600",
    },
    {
      title: "Monthly Revenue",
      value: formatNaira(187500000), // ₦187.5M
      change: "+18% from last month",
      icon: DollarSign,
      color: "text-yellow-600",
    },
    {
      title: "Deals Closed",
      value: "23",
      change: "+8% from last month",
      icon: TrendingUp,
      color: "text-purple-600",
    },
  ]

  const recentActivities = [
    {
      id: 1,
      type: "client",
      title: "John Smith",
      subtitle: "123 Oak Street",
      status: "completed",
      time: "2 hours ago",
      icon: Phone,
    },
    {
      id: 2,
      type: "property",
      title: "Sarah Johnson",
      subtitle: "456 Pine Avenue",
      status: "scheduled",
      time: "4 hours ago",
      icon: Home,
    },
    {
      id: 3,
      type: "deal",
      title: "Mike Davis",
      subtitle: "789 Elm Drive",
      status: "pending",
      time: "1 day ago",
      icon: DollarSign,
    },
  ]

  const upcomingTasks = [
    {
      id: 1,
      title: "Follow up with potential buyer",
      client: "Emma Wilson",
      time: "Today, 3:00 PM",
      priority: "high",
    },
    {
      id: 2,
      title: "Property inspection",
      client: "Robert Brown",
      time: "Tomorrow, 10:00 AM",
      priority: "medium",
    },
    {
      id: 3,
      title: "Contract review",
      client: "Lisa Garcia",
      time: "Dec 18, 2:00 PM",
      priority: "low",
    },
  ]

  const salesPipeline = [
    { stage: "Leads", count: 45, color: "bg-gray-200" },
    { stage: "Qualified", count: 23, color: "bg-blue-200" },
    { stage: "Negotiation", count: 12, color: "bg-yellow-200" },
    { stage: "Closed", count: 8, color: "bg-green-200" },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800"
      case "scheduled":
        return "bg-blue-100 text-blue-800"
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-800"
      case "medium":
        return "bg-yellow-100 text-yellow-800"
      case "low":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">G3WHomes</h1>
              <p className="text-gray-600">Welcome back! Here's what's happening today.</p>
            </div>
            <div className="flex space-x-3">
              <Link href="/contacts/add">
                <Button className="bg-dark-orange-600 hover:bg-dark-orange-700 text-white">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Client
                </Button>
              </Link>
              <Link href="/properties/add">
                <Button className="bg-dark-orange-600 hover:bg-dark-orange-700 text-white">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Property
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Card key={index}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                    <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                    <p className="text-sm text-green-600">{stat.change}</p>
                  </div>
                  <div className={`p-3 rounded-full bg-gray-100 ${stat.color}`}>
                    <stat.icon className="w-6 h-6" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Recent Activities */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Activities</CardTitle>
              <p className="text-sm text-gray-600">Latest client interactions and property activities</p>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivities.map((activity) => (
                  <div key={activity.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-white rounded-lg">
                        <activity.icon className="w-4 h-4 text-gray-600" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{activity.title}</p>
                        <p className="text-sm text-gray-600">{activity.subtitle}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <Badge className={getStatusColor(activity.status)}>{activity.status}</Badge>
                      <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Upcoming Tasks */}
          <Card>
            <CardHeader>
              <CardTitle>Upcoming Tasks</CardTitle>
              <p className="text-sm text-gray-600">Your scheduled activities</p>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {upcomingTasks.map((task) => (
                  <div key={task.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-white rounded-lg">
                        <Calendar className="w-4 h-4 text-gray-600" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{task.title}</p>
                        <p className="text-sm text-gray-600">{task.client}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <Badge className={getPriorityColor(task.priority)}>{task.priority}</Badge>
                      <p className="text-xs text-gray-500 mt-1">
                        <Calendar className="w-3 h-3 inline mr-1" />
                        {task.time}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sales Pipeline */}
        <Card>
          <CardHeader>
            <CardTitle>Sales Pipeline</CardTitle>
            <p className="text-sm text-gray-600">Current deals progress</p>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {salesPipeline.map((stage, index) => (
                <div key={index} className="text-center">
                  <div className={`${stage.color} rounded-lg p-6 mb-2`}>
                    <div className="text-2xl font-bold text-gray-900">{stage.count}</div>
                  </div>
                  <p className="text-sm font-medium text-gray-600">{stage.stage}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
