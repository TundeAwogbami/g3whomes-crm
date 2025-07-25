import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  Users,
  Home,
  DollarSign,
  TrendingUp,
  Phone,
  Calendar,
  ArrowLeft,
  Eye,
  FileText,
  Handshake,
  CheckCircle,
  Clock,
  MapPin,
  Star,
  Activity,
  Zap,
  Target,
} from "lucide-react"
import Link from "next/link"

export default function HomePage() {
  // Mock pipeline data
  const pipelineStages = [
    {
      name: "Lead Generation",
      count: 45,
      value: "₦125M",
      color: "bg-blue-500",
      icon: Users,
      deals: [
        { client: "John Doe", property: "Lagos Villa", value: "₦15M" },
        { client: "Jane Smith", property: "Abuja Apartment", value: "₦8M" },
        { client: "Mike Johnson", property: "PH Duplex", value: "₦12M" },
      ],
    },
    {
      name: "Property Viewing",
      count: 23,
      value: "₦89M",
      color: "bg-yellow-500",
      icon: Eye,
      deals: [
        { client: "Sarah Wilson", property: "Ikeja House", value: "₦18M" },
        { client: "David Brown", property: "VI Penthouse", value: "₦25M" },
      ],
    },
    {
      name: "Negotiation",
      count: 12,
      value: "₦67M",
      color: "bg-orange-500",
      icon: Handshake,
      deals: [
        { client: "Lisa Garcia", property: "Lekki Mansion", value: "₦35M" },
        { client: "Tom Anderson", property: "GRA Estate", value: "₦22M" },
      ],
    },
    {
      name: "Contract Signed",
      count: 8,
      value: "₦45M",
      color: "bg-green-500",
      icon: FileText,
      deals: [{ client: "Emma Davis", property: "Ikoyi Tower", value: "₦28M" }],
    },
    {
      name: "Closed Deals",
      count: 23,
      value: "₦187.5M",
      color: "bg-purple-500",
      icon: CheckCircle,
      deals: [
        { client: "Robert Taylor", property: "Marina Complex", value: "₦42M" },
        { client: "Anna White", property: "Surulere Home", value: "₦16M" },
      ],
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-gray-200/50 px-4 sm:px-6 py-4 shadow-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {/* Mobile Back Button */}
            <Button variant="ghost" size="sm" className="md:hidden mr-2 hover:bg-orange-100">
              <ArrowLeft className="w-4 h-4" />
            </Button>
            <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg flex items-center justify-center shadow-lg">
              <Home className="w-4 h-4 text-white" />
            </div>
            <h1 className="text-lg sm:text-xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
              G3W Homes CRM
            </h1>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <Link href="/auth/signup">
              <Button
                size="sm"
                className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white px-4 py-2 text-sm shadow-lg hover:shadow-xl transition-all duration-200"
              >
                Sign Up
              </Button>
            </Link>
            <Link href="/auth/signin">
              <Button
                size="sm"
                className="bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white px-4 py-2 text-sm shadow-lg hover:shadow-xl transition-all duration-200"
              >
                Sign In
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="p-4 sm:p-6">
        {/* Welcome Section */}
        <div className="mb-6 sm:mb-8">
          <h2 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-indigo-800 bg-clip-text text-transparent mb-2">
            G3WHomes
          </h2>
          <p className="text-gray-600 text-lg">Welcome back! Here's what's happening today.</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-8">
          <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-blue-700">Total Clients</CardTitle>
              <div className="p-2 bg-blue-500 rounded-full">
                <Users className="h-4 w-4 text-white" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-blue-900">1,234</div>
              <div className="flex items-center gap-2 mt-2">
                <TrendingUp className="h-3 w-3 text-green-600" />
                <p className="text-xs text-green-600 font-medium">+12% from last month</p>
              </div>
              <Progress value={75} className="mt-3 h-2" />
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-green-700">Active Listings</CardTitle>
              <div className="p-2 bg-green-500 rounded-full">
                <Home className="h-4 w-4 text-white" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-green-900">89</div>
              <div className="flex items-center gap-2 mt-2">
                <TrendingUp className="h-3 w-3 text-green-600" />
                <p className="text-xs text-green-600 font-medium">+5% from last month</p>
              </div>
              <Progress value={60} className="mt-3 h-2" />
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-yellow-50 to-yellow-100 border-yellow-200 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-yellow-700">Monthly Revenue</CardTitle>
              <div className="p-2 bg-yellow-500 rounded-full">
                <DollarSign className="h-4 w-4 text-white" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-yellow-900">₦187.5M</div>
              <div className="flex items-center gap-2 mt-2">
                <TrendingUp className="h-3 w-3 text-green-600" />
                <p className="text-xs text-green-600 font-medium">+18% from last month</p>
              </div>
              <Progress value={85} className="mt-3 h-2" />
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-purple-700">Deals Closed</CardTitle>
              <div className="p-2 bg-purple-500 rounded-full">
                <Target className="h-4 w-4 text-white" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-purple-900">23</div>
              <div className="flex items-center gap-2 mt-2">
                <TrendingUp className="h-3 w-3 text-green-600" />
                <p className="text-xs text-green-600 font-medium">+8% from last month</p>
              </div>
              <Progress value={70} className="mt-3 h-2" />
            </CardContent>
          </Card>
        </div>

        {/* Recent Activities and Upcoming Tasks */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 mb-6 sm:mb-8">
          {/* Recent Activities */}
          <Card className="bg-white/80 backdrop-blur-sm shadow-xl border-0 hover:shadow-2xl transition-all duration-300">
            <CardHeader className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-t-lg">
              <div className="flex items-center gap-2">
                <Activity className="h-5 w-5" />
                <CardTitle className="text-lg font-semibold">Recent Activities</CardTitle>
              </div>
              <CardDescription className="text-blue-100">
                Latest client interactions and property activities
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6 space-y-4">
              <div className="flex items-center gap-4 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-100 hover:shadow-md transition-all duration-200">
                <div className="relative">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-400 to-blue-600 rounded-full flex items-center justify-center shadow-lg">
                    <span className="text-white font-bold text-sm">JS</span>
                  </div>
                  <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white flex items-center justify-center">
                    <Phone className="w-2 h-2 text-white" />
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-gray-900">John Smith</p>
                  <div className="flex items-center gap-1 text-sm text-gray-600">
                    <MapPin className="w-3 h-3" />
                    <span className="truncate">123 Oak Street</span>
                  </div>
                  <div className="flex items-center gap-2 mt-1">
                    <Badge className="bg-green-500 text-white hover:bg-green-600 text-xs">completed</Badge>
                    <div className="flex items-center gap-1 text-xs text-gray-500">
                      <Clock className="w-3 h-3" />
                      <span>2 hours ago</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className={`w-3 h-3 ${i < 4 ? "fill-current" : ""}`} />
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-4 p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border border-green-100 hover:shadow-md transition-all duration-200">
                <div className="relative">
                  <div className="w-12 h-12 bg-gradient-to-r from-green-400 to-green-600 rounded-full flex items-center justify-center shadow-lg">
                    <span className="text-white font-bold text-sm">SJ</span>
                  </div>
                  <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-blue-500 rounded-full border-2 border-white flex items-center justify-center">
                    <Home className="w-2 h-2 text-white" />
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-gray-900">Sarah Johnson</p>
                  <div className="flex items-center gap-1 text-sm text-gray-600">
                    <MapPin className="w-3 h-3" />
                    <span className="truncate">456 Pine Avenue</span>
                  </div>
                  <div className="flex items-center gap-2 mt-1">
                    <Badge variant="secondary" className="text-xs bg-blue-100 text-blue-800">
                      scheduled
                    </Badge>
                    <div className="flex items-center gap-1 text-xs text-gray-500">
                      <Clock className="w-3 h-3" />
                      <span>4 hours ago</span>
                    </div>
                  </div>
                </div>
                <Progress value={65} className="w-16 h-2" />
              </div>

              <div className="flex items-center gap-4 p-4 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-xl border border-yellow-100 hover:shadow-md transition-all duration-200">
                <div className="relative">
                  <div className="w-12 h-12 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center shadow-lg">
                    <span className="text-white font-bold text-sm">MD</span>
                  </div>
                  <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-yellow-500 rounded-full border-2 border-white flex items-center justify-center">
                    <DollarSign className="w-2 h-2 text-white" />
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-gray-900">Mike Davis</p>
                  <div className="flex items-center gap-1 text-sm text-gray-600">
                    <MapPin className="w-3 h-3" />
                    <span className="truncate">789 Elm Drive</span>
                  </div>
                  <div className="flex items-center gap-2 mt-1">
                    <Badge variant="outline" className="text-xs border-orange-300 text-orange-700">
                      pending
                    </Badge>
                    <div className="flex items-center gap-1 text-xs text-gray-500">
                      <Clock className="w-3 h-3" />
                      <span>1 day ago</span>
                    </div>
                  </div>
                </div>
                <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center">
                  <Zap className="w-4 h-4 text-yellow-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Upcoming Tasks */}
          <Card className="bg-white/80 backdrop-blur-sm shadow-xl border-0 hover:shadow-2xl transition-all duration-300">
            <CardHeader className="bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-t-lg">
              <div className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                <CardTitle className="text-lg font-semibold">Upcoming Tasks</CardTitle>
              </div>
              <CardDescription className="text-purple-100">Your scheduled activities</CardDescription>
            </CardHeader>
            <CardContent className="p-6 space-y-4">
              <div className="p-4 bg-gradient-to-r from-red-50 to-pink-50 rounded-xl border-l-4 border-red-500 hover:shadow-md transition-all duration-200">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-red-400 to-pink-500 rounded-full flex items-center justify-center shadow-lg">
                    <span className="text-white font-bold text-sm">EW</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-gray-900">Follow up with potential buyer</p>
                    <p className="text-sm text-gray-600">Emma Wilson</p>
                    <div className="flex items-center gap-2 mt-2">
                      <div className="flex items-center gap-1 text-xs text-gray-500">
                        <Calendar className="w-3 h-3" />
                        <span>Today, 3:00 PM</span>
                      </div>
                      <Badge variant="destructive" className="text-xs">
                        high
                      </Badge>
                    </div>
                    <Progress value={25} className="mt-2 h-2" />
                  </div>
                </div>
              </div>

              <div className="p-4 bg-gradient-to-r from-orange-50 to-yellow-50 rounded-xl border-l-4 border-orange-500 hover:shadow-md transition-all duration-200">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-orange-400 to-yellow-500 rounded-full flex items-center justify-center shadow-lg">
                    <span className="text-white font-bold text-sm">RB</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-gray-900">Property inspection</p>
                    <p className="text-sm text-gray-600">Robert Brown</p>
                    <div className="flex items-center gap-2 mt-2">
                      <div className="flex items-center gap-1 text-xs text-gray-500">
                        <Calendar className="w-3 h-3" />
                        <span>Tomorrow, 10:00 AM</span>
                      </div>
                      <Badge className="bg-orange-500 text-white hover:bg-orange-600 text-xs">medium</Badge>
                    </div>
                    <Progress value={60} className="mt-2 h-2" />
                  </div>
                </div>
              </div>

              <div className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border-l-4 border-blue-500 hover:shadow-md transition-all duration-200">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-400 to-indigo-500 rounded-full flex items-center justify-center shadow-lg">
                    <span className="text-white font-bold text-sm">LG</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-gray-900">Contract review</p>
                    <p className="text-sm text-gray-600">Lisa Garcia</p>
                    <div className="flex items-center gap-2 mt-2">
                      <div className="flex items-center gap-1 text-xs text-gray-500">
                        <Calendar className="w-3 h-3" />
                        <span>Dec 18, 2:00 PM</span>
                      </div>
                      <Badge variant="secondary" className="text-xs bg-blue-100 text-blue-800">
                        low
                      </Badge>
                    </div>
                    <Progress value={90} className="mt-2 h-2" />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sales Pipeline Section */}
        <Card className="bg-white/80 backdrop-blur-sm shadow-xl border-0">
          <CardHeader className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-t-lg">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              <CardTitle className="text-lg font-semibold">Sales Pipeline</CardTitle>
            </div>
            <CardDescription className="text-indigo-100">Current deals progress</CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            {/* Pipeline Overview */}
            <div className="mb-6">
              <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
                <span>Total Pipeline Value</span>
                <span className="font-semibold text-gray-900 text-lg">₦513.5M</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3 shadow-inner">
                <div
                  className="bg-gradient-to-r from-blue-500 via-yellow-500 via-orange-500 via-green-500 to-purple-500 h-3 rounded-full shadow-lg"
                  style={{ width: "75%" }}
                ></div>
              </div>
            </div>

            {/* Pipeline Stages */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
              {pipelineStages.map((stage, index) => {
                const Icon = stage.icon
                return (
                  <div key={stage.name} className="relative">
                    <div className="bg-gradient-to-br from-white to-gray-50 rounded-xl p-4 border-2 border-gray-200 hover:border-gray-300 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                      <div className="flex items-center gap-2 mb-3">
                        <div
                          className={`w-10 h-10 ${stage.color} rounded-xl flex items-center justify-center shadow-lg`}
                        >
                          <Icon className="w-5 h-5 text-white" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold text-gray-900 text-sm">{stage.name}</h4>
                        </div>
                      </div>

                      <div className="space-y-2 mb-3">
                        <div className="flex justify-between items-center">
                          <span className="text-xs text-gray-600">Deals</span>
                          <span className="text-lg font-bold text-gray-900">{stage.count}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-xs text-gray-600">Value</span>
                          <span className="text-sm font-bold text-gray-900">{stage.value}</span>
                        </div>
                      </div>

                      {/* Sample deals in this stage */}
                      <div className="space-y-2">
                        {stage.deals.slice(0, 2).map((deal, dealIndex) => (
                          <div
                            key={dealIndex}
                            className="bg-gradient-to-r from-gray-50 to-white rounded-lg p-3 text-xs shadow-sm border border-gray-100"
                          >
                            <div className="font-semibold text-gray-900 truncate">{deal.client}</div>
                            <div className="text-gray-600 truncate">{deal.property}</div>
                            <div className="text-gray-900 font-bold">{deal.value}</div>
                          </div>
                        ))}
                        {stage.deals.length > 2 && (
                          <div className="text-xs text-gray-500 text-center py-2 bg-gray-50 rounded-lg">
                            +{stage.deals.length - 2} more deals
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Arrow connector for desktop */}
                    {index < pipelineStages.length - 1 && (
                      <div className="hidden lg:block absolute top-1/2 -right-2 transform -translate-y-1/2 z-10">
                        <div className="w-4 h-4 bg-white border-2 border-gray-300 rotate-45 shadow-lg"></div>
                      </div>
                    )}
                  </div>
                )
              })}
            </div>

            {/* Pipeline Summary */}
            <div className="mt-8 pt-6 border-t border-gray-200">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
                <div className="p-4 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl">
                  <div className="text-3xl font-bold text-blue-600">111</div>
                  <div className="text-sm text-gray-600 font-medium">Total Deals</div>
                </div>
                <div className="p-4 bg-gradient-to-br from-green-50 to-green-100 rounded-xl">
                  <div className="text-3xl font-bold text-green-600">21%</div>
                  <div className="text-sm text-gray-600 font-medium">Close Rate</div>
                </div>
                <div className="p-4 bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl">
                  <div className="text-3xl font-bold text-orange-600">45</div>
                  <div className="text-sm text-gray-600 font-medium">Avg. Days</div>
                </div>
                <div className="p-4 bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl">
                  <div className="text-3xl font-bold text-purple-600">₦8.1M</div>
                  <div className="text-sm text-gray-600 font-medium">Avg. Deal Size</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
