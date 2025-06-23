import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Users, Home, DollarSign, TrendingUp, Calendar, Phone, Plus } from "lucide-react"
import { formatNairaCompact } from "@/lib/currency"

export default function Dashboard() {
  const stats = [
    {
      title: "Total Clients",
      value: "1,234",
      change: "+12%",
      icon: Users,
      color: "text-blue-600",
    },
    {
      title: "Active Listings",
      value: "89",
      change: "+5%",
      icon: Home,
      color: "text-green-600",
    },
    {
      title: "Monthly Revenue",
      value: formatNairaCompact(187500000), // ₦187.5M
      change: "+18%",
      icon: DollarSign,
      color: "text-yellow-600",
    },
    {
      title: "Deals Closed",
      value: "23",
      change: "+8%",
      icon: TrendingUp,
      color: "text-purple-600",
    },
  ]

  const recentActivities = [
    {
      id: 1,
      type: "call",
      client: "John Smith",
      property: "123 Oak Street",
      time: "2 hours ago",
      status: "completed",
    },
    {
      id: 2,
      type: "showing",
      client: "Sarah Johnson",
      property: "456 Pine Avenue",
      time: "4 hours ago",
      status: "scheduled",
    },
    {
      id: 3,
      type: "offer",
      client: "Mike Davis",
      property: "789 Elm Drive",
      time: "1 day ago",
      status: "pending",
    },
  ]

  const upcomingTasks = [
    {
      id: 1,
      task: "Follow up with potential buyer",
      client: "Emma Wilson",
      dueDate: "Today, 3:00 PM",
      priority: "high",
    },
    {
      id: 2,
      task: "Property inspection",
      client: "Robert Brown",
      dueDate: "Tomorrow, 10:00 AM",
      priority: "medium",
    },
    {
      id: 3,
      task: "Contract review",
      client: "Lisa Garcia",
      dueDate: "Dec 18, 2:00 PM",
      priority: "low",
    },
  ]

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
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                Add Client
              </Button>
              <Button variant="outline">
                <Plus className="w-4 h-4 mr-2" />
                Add Property
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon
            return (
              <Card key={index}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                      <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                      <p className="text-sm text-green-600">{stat.change} from last month</p>
                    </div>
                    <Icon className={`w-8 h-8 ${stat.color}`} />
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recent Activities */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Recent Activities</CardTitle>
              <CardDescription>Latest client interactions and property activities</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivities.map((activity) => (
                  <div key={activity.id} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                    <div className="flex-shrink-0">
                      {activity.type === "call" && <Phone className="w-5 h-5 text-blue-600" />}
                      {activity.type === "showing" && <Home className="w-5 h-5 text-green-600" />}
                      {activity.type === "offer" && <DollarSign className="w-5 h-5 text-yellow-600" />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900">{activity.client}</p>
                      <p className="text-sm text-gray-500">{activity.property}</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge variant={activity.status === "completed" ? "default" : "secondary"}>
                        {activity.status}
                      </Badge>
                      <span className="text-sm text-gray-500">{activity.time}</span>
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
              <CardDescription>Your scheduled activities</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {upcomingTasks.map((task) => (
                  <div key={task.id} className="p-4 border rounded-lg">
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="text-sm font-medium text-gray-900">{task.task}</h4>
                      <Badge
                        variant={
                          task.priority === "high"
                            ? "destructive"
                            : task.priority === "medium"
                              ? "default"
                              : "secondary"
                        }
                      >
                        {task.priority}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-600 mb-1">{task.client}</p>
                    <div className="flex items-center text-sm text-gray-500">
                      <Calendar className="w-4 h-4 mr-1" />
                      {task.dueDate}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sales Pipeline */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Sales Pipeline</CardTitle>
            <CardDescription>Current deals progress</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="text-center">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Leads</h3>
                <div className="text-3xl font-bold text-blue-600 mb-2">45</div>
                <Progress value={75} className="h-2" />
                <p className="text-sm text-gray-500 mt-1">{formatNairaCompact(3150000000)} potential</p>
              </div>
              <div className="text-center">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Qualified</h3>
                <div className="text-3xl font-bold text-yellow-600 mb-2">23</div>
                <Progress value={60} className="h-2" />
                <p className="text-sm text-gray-500 mt-1">{formatNairaCompact(2700000000)} potential</p>
              </div>
              <div className="text-center">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Negotiation</h3>
                <div className="text-3xl font-bold text-orange-600 mb-2">12</div>
                <Progress value={40} className="h-2" />
                <p className="text-sm text-gray-500 mt-1">{formatNairaCompact(1800000000)} potential</p>
              </div>
              <div className="text-center">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Closed</h3>
                <div className="text-3xl font-bold text-green-600 mb-2">8</div>
                <Progress value={100} className="h-2" />
                <p className="text-sm text-gray-500 mt-1">{formatNairaCompact(1275000000)} closed</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
