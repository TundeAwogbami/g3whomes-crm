"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { BarChart3, TrendingUp, Users, Home, DollarSign, Download, Calendar, Filter } from "lucide-react"
import { formatNaira, formatNairaCompact } from "@/lib/currency"

export default function ReportsPage() {
  const salesData = [
    { month: "Jan", sales: 45000000, deals: 12 },
    { month: "Feb", sales: 52000000, deals: 15 },
    { month: "Mar", sales: 38000000, deals: 10 },
    { month: "Apr", sales: 67000000, deals: 18 },
    { month: "May", sales: 71000000, deals: 20 },
    { month: "Jun", sales: 89000000, deals: 25 },
  ]

  const agentPerformance = [
    { name: "Sarah Wilson", deals: 25, revenue: 187500000, commission: 9375000 },
    { name: "John Doe", deals: 22, revenue: 165000000, commission: 8250000 },
    { name: "Mike Davis", deals: 18, revenue: 135000000, commission: 6750000 },
    { name: "Lisa Garcia", deals: 15, revenue: 112500000, commission: 5625000 },
  ]

  const propertyTypes = [
    { type: "House", count: 45, percentage: 45 },
    { type: "Condo", count: 25, percentage: 25 },
    { type: "Townhouse", count: 20, percentage: 20 },
    { type: "Commercial", count: 10, percentage: 10 },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Reports & Analytics</h1>
              <p className="text-gray-600">Track performance and analyze business metrics</p>
            </div>
            <div className="flex space-x-3">
              <Button variant="outline">
                <Filter className="w-4 h-4 mr-2" />
                Filter
              </Button>
              <Button>
                <Download className="w-4 h-4 mr-2" />
                Export Report
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Date Range Selector */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Calendar className="w-4 h-4 text-gray-500" />
                <span className="text-sm font-medium">Time Period:</span>
              </div>
              <Select defaultValue="6months">
                <SelectTrigger className="w-48">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1month">Last Month</SelectItem>
                  <SelectItem value="3months">Last 3 Months</SelectItem>
                  <SelectItem value="6months">Last 6 Months</SelectItem>
                  <SelectItem value="1year">Last Year</SelectItem>
                  <SelectItem value="custom">Custom Range</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="sales">Sales Performance</TabsTrigger>
            <TabsTrigger value="agents">Agent Performance</TabsTrigger>
            <TabsTrigger value="properties">Property Analysis</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Key Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Total Revenue</p>
                      <p className="text-2xl font-bold text-gray-900">{formatNairaCompact(567000000)}</p>
                      <p className="text-sm text-green-600">+23% from last period</p>
                    </div>
                    <DollarSign className="w-8 h-8 text-green-600" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Deals Closed</p>
                      <p className="text-2xl font-bold text-gray-900">80</p>
                      <p className="text-sm text-green-600">+15% from last period</p>
                    </div>
                    <TrendingUp className="w-8 h-8 text-blue-600" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Active Clients</p>
                      <p className="text-2xl font-bold text-gray-900">234</p>
                      <p className="text-sm text-green-600">+8% from last period</p>
                    </div>
                    <Users className="w-8 h-8 text-purple-600" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Properties Listed</p>
                      <p className="text-2xl font-bold text-gray-900">156</p>
                      <p className="text-sm text-green-600">+12% from last period</p>
                    </div>
                    <Home className="w-8 h-8 text-orange-600" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sales Trend Chart Placeholder */}
            <Card>
              <CardHeader>
                <CardTitle>Sales Trend</CardTitle>
                <CardDescription>Monthly sales performance over the last 6 months</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
                  <div className="text-center">
                    <BarChart3 className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600">Chart visualization would go here</p>
                    <p className="text-sm text-gray-500">Integration with charting library needed</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="sales" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Monthly Sales Performance</CardTitle>
                <CardDescription>Revenue and deals closed by month</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {salesData.map((month, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div>
                        <h4 className="font-medium">{month.month} 2024</h4>
                        <p className="text-sm text-gray-600">{month.deals} deals closed</p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-green-600">{formatNaira(month.sales)}</p>
                        <Progress value={(month.sales / 100000000) * 100} className="w-24 h-2 mt-1" />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="agents" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Agent Performance Ranking</CardTitle>
                <CardDescription>Top performing agents by deals and revenue</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {agentPerformance.map((agent, index) => (
                    <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center space-x-4">
                        <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">
                          {index + 1}
                        </div>
                        <div>
                          <h4 className="font-medium">{agent.name}</h4>
                          <p className="text-sm text-gray-600">{agent.deals} deals closed</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold">{formatNaira(agent.revenue)}</p>
                        <p className="text-sm text-green-600">Commission: {formatNaira(agent.commission)}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="properties" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Property Type Distribution</CardTitle>
                <CardDescription>Breakdown of properties by type</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {propertyTypes.map((property, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex justify-between">
                        <span className="font-medium">{property.type}</span>
                        <span className="text-sm text-gray-600">{property.count} properties</span>
                      </div>
                      <Progress value={property.percentage} className="h-2" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
