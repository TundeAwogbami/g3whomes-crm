"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Search, Plus, DollarSign, Calendar, User, Home, TrendingUp, Clock, CheckCircle } from "lucide-react"
import { formatNaira, calculateCommission } from "@/lib/currency"

export default function DealsPage() {
  const [searchTerm, setSearchTerm] = useState("")

  const deals = [
    {
      id: 1,
      title: "Downtown Condo Sale",
      client: "John Smith",
      property: "123 Tiamiyu Savage Street",
      value: formatNaira(67500000), // ₦67.5M
      commission: formatNaira(calculateCommission(67500000)), // ₦3.375M (5%)
      stage: "negotiation",
      progress: 75,
      probability: 85,
      closeDate: "Dec 25, 2024",
      agent: "Sarah Wilson",
      lastActivity: "2 hours ago",
      avatar: "/placeholder.svg?height=32&width=32",
    },
    {
      id: 2,
      title: "Family Home Purchase",
      client: "Emma Johnson",
      property: "456 Banana Island Road",
      value: formatNaira(112500000), // ₦112.5M
      commission: formatNaira(calculateCommission(112500000)), // ₦5.625M (5%)
      stage: "qualified",
      progress: 50,
      probability: 70,
      closeDate: "Jan 15, 2025",
      agent: "Mike Davis",
      lastActivity: "1 day ago",
      avatar: "/placeholder.svg?height=32&width=32",
    },
    {
      id: 3,
      title: "Investment Property",
      client: "Robert Brown",
      property: "789 Gwarinpa Estate",
      value: formatNaira(48000000), // ₦48M
      commission: formatNaira(calculateCommission(48000000)), // ₦2.4M (5%)
      stage: "proposal",
      progress: 25,
      probability: 45,
      closeDate: "Feb 10, 2025",
      agent: "Lisa Garcia",
      lastActivity: "3 days ago",
      avatar: "/placeholder.svg?height=32&width=32",
    },
    {
      id: 4,
      title: "Luxury Villa Sale",
      client: "David Wilson",
      property: "321 Lekki Peninsula",
      value: formatNaira(180000000), // ₦180M
      commission: formatNaira(calculateCommission(180000000)), // ₦9M (5%)
      stage: "closed",
      progress: 100,
      probability: 100,
      closeDate: "Dec 10, 2024",
      agent: "John Doe",
      lastActivity: "1 week ago",
      avatar: "/placeholder.svg?height=32&width=32",
    },
  ]

  const pipelineStages = [
    { name: "Lead", count: 15, value: formatNaira(3150000000) }, // ₦3.15B
    { name: "Qualified", count: 8, value: formatNaira(2700000000) }, // ₦2.7B
    { name: "Proposal", count: 5, value: formatNaira(1800000000) }, // ₦1.8B
    { name: "Negotiation", count: 3, value: formatNaira(1425000000) }, // ₦1.425B
    { name: "Closed", count: 2, value: formatNaira(975000000) }, // ₦975M
  ]

  const filteredDeals = deals.filter(
    (deal) =>
      deal.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      deal.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
      deal.property.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const getStageColor = (stage: string) => {
    switch (stage) {
      case "lead":
        return "bg-gray-100 text-gray-800"
      case "qualified":
        return "bg-blue-100 text-blue-800"
      case "proposal":
        return "bg-yellow-100 text-yellow-800"
      case "negotiation":
        return "bg-orange-100 text-orange-800"
      case "closed":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStageIcon = (stage: string) => {
    switch (stage) {
      case "lead":
        return <User className="w-4 h-4" />
      case "qualified":
        return <CheckCircle className="w-4 h-4" />
      case "proposal":
        return <DollarSign className="w-4 h-4" />
      case "negotiation":
        return <TrendingUp className="w-4 h-4" />
      case "closed":
        return <CheckCircle className="w-4 h-4" />
      default:
        return <Clock className="w-4 h-4" />
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Deals Pipeline</h1>
              <p className="text-gray-600">Track and manage your sales opportunities</p>
            </div>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Add Deal
            </Button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Pipeline Overview */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-8">
          {pipelineStages.map((stage, index) => (
            <Card key={index}>
              <CardContent className="p-4 text-center">
                <h3 className="font-semibold text-gray-900 mb-2">{stage.name}</h3>
                <div className="text-2xl font-bold text-blue-600 mb-1">{stage.count}</div>
                <div className="text-sm text-gray-600">{stage.value}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Search */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Search deals..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </CardContent>
        </Card>

        {/* Deals List */}
        <div className="space-y-4">
          {filteredDeals.map((deal) => (
            <Card key={deal.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-4">
                    <Avatar>
                      <AvatarImage src={deal.avatar || "/placeholder.svg"} alt={deal.client} />
                      <AvatarFallback>
                        {deal.client
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">{deal.title}</h3>
                      <div className="flex items-center space-x-4 text-sm text-gray-600">
                        <div className="flex items-center">
                          <User className="w-4 h-4 mr-1" />
                          {deal.client}
                        </div>
                        <div className="flex items-center">
                          <Home className="w-4 h-4 mr-1" />
                          {deal.property}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-xl font-bold text-green-600">{deal.value}</div>
                    <div className="text-sm text-gray-600">Commission: {deal.commission}</div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                  <div>
                    <label className="text-sm font-medium text-gray-600">Stage</label>
                    <div className="flex items-center space-x-2 mt-1">
                      {getStageIcon(deal.stage)}
                      <Badge className={getStageColor(deal.stage)}>{deal.stage}</Badge>
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600">Progress</label>
                    <div className="mt-1">
                      <Progress value={deal.progress} className="h-2" />
                      <span className="text-sm text-gray-600">{deal.progress}%</span>
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600">Probability</label>
                    <div className="text-lg font-semibold text-gray-900 mt-1">{deal.probability}%</div>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600">Close Date</label>
                    <div className="flex items-center text-gray-900 mt-1">
                      <Calendar className="w-4 h-4 mr-1" />
                      {deal.closeDate}
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t">
                  <div className="text-sm text-gray-600">
                    Agent: {deal.agent} • Last activity: {deal.lastActivity}
                  </div>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm">
                      View Details
                    </Button>
                    <Button size="sm">Update</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredDeals.length === 0 && (
          <Card>
            <CardContent className="p-12 text-center">
              <DollarSign className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No deals found</h3>
              <p className="text-gray-600 mb-4">Try adjusting your search criteria</p>
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                Create Your First Deal
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
