"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, Plus, Calendar, Clock, User, Phone, Mail, Home, CheckCircle } from "lucide-react"

export default function TasksPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [activeTab, setActiveTab] = useState("all")

  const tasks = [
    {
      id: 1,
      title: "Follow up with John Smith",
      description: "Discuss financing options for downtown condo",
      type: "call",
      priority: "high",
      status: "pending",
      dueDate: "Today, 3:00 PM",
      client: "John Smith",
      property: "123 Oak Street",
      assignee: "Sarah Wilson",
      completed: false,
      avatar: "/placeholder.svg?height=32&width=32",
    },
    {
      id: 2,
      title: "Property showing",
      description: "Show luxury home to potential buyers",
      type: "showing",
      priority: "medium",
      status: "scheduled",
      dueDate: "Tomorrow, 10:00 AM",
      client: "Emma Johnson",
      property: "456 Pine Avenue",
      assignee: "Mike Davis",
      completed: false,
      avatar: "/placeholder.svg?height=32&width=32",
    },
    {
      id: 3,
      title: "Contract review",
      description: "Review purchase agreement terms",
      type: "paperwork",
      priority: "high",
      status: "in-progress",
      dueDate: "Dec 18, 2:00 PM",
      client: "Robert Brown",
      property: "789 Elm Drive",
      assignee: "Lisa Garcia",
      completed: false,
      avatar: "/placeholder.svg?height=32&width=32",
    },
    {
      id: 4,
      title: "Market analysis",
      description: "Prepare CMA for new listing",
      type: "research",
      priority: "low",
      status: "completed",
      dueDate: "Dec 15, 9:00 AM",
      client: "David Wilson",
      property: "321 Ocean View",
      assignee: "John Doe",
      completed: true,
      avatar: "/placeholder.svg?height=32&width=32",
    },
    {
      id: 5,
      title: "Send listing photos",
      description: "Email professional photos to client",
      type: "email",
      priority: "medium",
      status: "pending",
      dueDate: "Dec 20, 11:00 AM",
      client: "Maria Garcia",
      property: "654 Maple Street",
      assignee: "Sarah Wilson",
      completed: false,
      avatar: "/placeholder.svg?height=32&width=32",
    },
  ]

  const filteredTasks = tasks.filter((task) => {
    const matchesSearch =
      task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      task.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
      task.property.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesTab =
      activeTab === "all" ||
      (activeTab === "pending" && !task.completed) ||
      (activeTab === "completed" && task.completed) ||
      task.priority === activeTab
    return matchesSearch && matchesTab
  })

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

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "call":
        return <Phone className="w-4 h-4" />
      case "email":
        return <Mail className="w-4 h-4" />
      case "showing":
        return <Home className="w-4 h-4" />
      case "paperwork":
        return <CheckCircle className="w-4 h-4" />
      case "research":
        return <Search className="w-4 h-4" />
      default:
        return <Clock className="w-4 h-4" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800"
      case "in-progress":
        return "bg-blue-100 text-blue-800"
      case "scheduled":
        return "bg-purple-100 text-purple-800"
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const toggleTaskCompletion = (taskId: number) => {
    // In a real app, this would update the task in the database
    console.log(`Toggle completion for task ${taskId}`)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Tasks & Activities</h1>
              <p className="text-gray-600">Manage your daily activities and follow-ups</p>
            </div>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Add Task
            </Button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Search tasks..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </CardContent>
        </Card>

        {/* Task Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-6">
          <TabsList>
            <TabsTrigger value="all">All Tasks</TabsTrigger>
            <TabsTrigger value="pending">Pending</TabsTrigger>
            <TabsTrigger value="completed">Completed</TabsTrigger>
            <TabsTrigger value="high">High Priority</TabsTrigger>
          </TabsList>
        </Tabs>

        {/* Tasks List */}
        <div className="space-y-4">
          {filteredTasks.map((task) => (
            <Card key={task.id} className={`hover:shadow-md transition-shadow ${task.completed ? "opacity-75" : ""}`}>
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <Checkbox
                    checked={task.completed}
                    onCheckedChange={() => toggleTaskCompletion(task.id)}
                    className="mt-1"
                  />

                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-3">
                        <h3
                          className={`text-lg font-semibold ${task.completed ? "line-through text-gray-500" : "text-gray-900"}`}
                        >
                          {task.title}
                        </h3>
                        <div className="flex items-center space-x-2">
                          {getTypeIcon(task.type)}
                          <Badge className={getPriorityColor(task.priority)}>{task.priority}</Badge>
                          <Badge className={getStatusColor(task.status)}>{task.status}</Badge>
                        </div>
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <Calendar className="w-4 h-4 mr-1" />
                        {task.dueDate}
                      </div>
                    </div>

                    <p className="text-gray-600 mb-3">{task.description}</p>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4 text-sm text-gray-600">
                        <div className="flex items-center">
                          <User className="w-4 h-4 mr-1" />
                          {task.client}
                        </div>
                        <div className="flex items-center">
                          <Home className="w-4 h-4 mr-1" />
                          {task.property}
                        </div>
                      </div>

                      <div className="flex items-center space-x-3">
                        <div className="flex items-center space-x-2 text-sm text-gray-600">
                          <Avatar className="w-6 h-6">
                            <AvatarImage src={task.avatar || "/placeholder.svg"} alt={task.assignee} />
                            <AvatarFallback>
                              {task.assignee
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <span>{task.assignee}</span>
                        </div>
                        <Button variant="outline" size="sm">
                          Edit
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredTasks.length === 0 && (
          <Card>
            <CardContent className="p-12 text-center">
              <CheckCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No tasks found</h3>
              <p className="text-gray-600 mb-4">Try adjusting your search or filter criteria</p>
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                Create Your First Task
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-8">
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-blue-600 mb-1">{tasks.filter((t) => !t.completed).length}</div>
              <div className="text-sm text-gray-600">Pending Tasks</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-green-600 mb-1">{tasks.filter((t) => t.completed).length}</div>
              <div className="text-sm text-gray-600">Completed</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-red-600 mb-1">
                {tasks.filter((t) => t.priority === "high" && !t.completed).length}
              </div>
              <div className="text-sm text-gray-600">High Priority</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-yellow-600 mb-1">
                {tasks.filter((t) => t.dueDate.includes("Today")).length}
              </div>
              <div className="text-sm text-gray-600">Due Today</div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
