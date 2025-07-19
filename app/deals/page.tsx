"use client"

import { TableHeader as UI_TableHeader } from "@/components/ui/table"
import { Table, TableBody, TableHead, TableRow, TableCell } from "@/components/ui/table"
import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Search,
  DollarSign,
  Calendar,
  User,
  Home,
  TrendingUp,
  Clock,
  CheckCircle,
  Plus,
  PlusCircle,
  Users,
  CreditCard,
  Activity,
} from "lucide-react"
import { formatNaira, calculateCommission } from "@/lib/currency"
import type { Deal } from "@/lib/types"
import useSWR from "swr"
import { getDeals } from "@/lib/api"

const fetcher = (url: string) => fetch(url).then((res) => res.json())

export default async function DealsPage() {
  const dealsData = await getDeals()
  const { data: deals, error } = useSWR<Deal[]>("/api/deals", fetcher)
  const [searchTerm, setSearchTerm] = useState("")

  const totalDealValue = dealsData.reduce((sum, deal) => sum + (deal.deal_value || 0), 0)
  const pendingDeals = dealsData.filter((deal) => deal.stage !== "Closed Won" && deal.stage !== "Closed Lost").length
  const closedWonDeals = dealsData.filter((deal) => deal.stage === "Closed Won").length
  const averageDealValue = dealsData.length > 0 ? totalDealValue / dealsData.length : 0

  const filteredDeals = dealsData.filter(
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

  if (error) return <div>Failed to load deals</div>
  if (!deals) return <div>Loading deals...</div>

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
              <PlusCircle className="w-4 h-4 mr-2" />
              Add Deal
            </Button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Pipeline Overview */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-8">
          {/* Deals Overview Cards */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Deal Value</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{formatNaira(totalDealValue)}</div>
              <p className="text-xs text-muted-foreground">Sum of all deal values</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending Deals</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{pendingDeals}</div>
              <p className="text-xs text-muted-foreground">Deals not yet closed</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Closed Won Deals</CardTitle>
              <CreditCard className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{closedWonDeals}</div>
              <p className="text-xs text-muted-foreground">Successfully closed deals</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Average Deal Value</CardTitle>
              <Activity className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{formatNaira(averageDealValue)}</div>
              <p className="text-xs text-muted-foreground">Average value per deal</p>
            </CardContent>
          </Card>
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
                    <div className="text-xl font-bold text-green-600">{formatNaira(deal.deal_value || 0)}</div>
                    <div className="text-sm text-gray-600">
                      Commission: {formatNaira(calculateCommission(deal.deal_value || 0))}
                    </div>
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
                      <Progress value={deal.progress || 0} className="h-2" />
                      <span className="text-sm text-gray-600">{deal.progress || 0}%</span>
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600">Probability</label>
                    <div className="text-lg font-semibold text-gray-900 mt-1">{deal.probability || 0}%</div>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600">Close Date</label>
                    <div className="flex items-center text-gray-900 mt-1">
                      <Calendar className="w-4 h-4 mr-1" />
                      {deal.close_date}
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t">
                  <div className="text-sm text-gray-600">
                    Agent: {deal.agent} • Last activity: {deal.last_activity}
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
                <PlusCircle className="h-4 w-4 mr-2" />
                Create Your First Deal
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Deals Table */}
        <Card>
          <CardHeader>
            <CardTitle>All Deals</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <UI_TableHeader>
                <TableRow>
                  <TableHead>Property Address</TableHead>
                  <TableHead>Client Name</TableHead>
                  <TableHead>Value</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Closing Date</TableHead>
                </TableRow>
              </UI_TableHeader>
              <TableBody>
                {deals.map((deal) => (
                  <TableRow key={deal.id}>
                    <TableCell>{deal.property}</TableCell>
                    <TableCell>{deal.client}</TableCell>
                    <TableCell>{formatNaira(deal.deal_value || 0)}</TableCell>
                    <TableCell>{deal.stage}</TableCell>
                    <TableCell>{deal.close_date}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Updated Deals Section */}
        <div className="flex flex-col gap-4 p-4 md:p-6 mt-8">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold">Deals</h1>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Deal
            </Button>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {deals.map((deal) => (
              <Card key={deal.id}>
                <CardHeader>
                  <CardTitle>{deal.property}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-500">Client: {deal.client}</p>
                  <p className="text-sm text-gray-500">Value: {formatNaira(deal.deal_value || 0)}</p>
                  <p className="text-sm text-gray-500">Status: {deal.stage}</p>
                  <p className="text-sm text-gray-500">Close Date: {deal.close_date}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
