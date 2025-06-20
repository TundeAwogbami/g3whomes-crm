"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, Plus, MapPin, Bed, Bath, Square, Filter, MoreHorizontal, Eye, Edit, Heart } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

export default function PropertiesPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [activeTab, setActiveTab] = useState("all")

  const properties = [
    {
      id: 1,
      title: "Modern Downtown Condo",
      address: "123 Oak Street, New York, NY 10001",
      price: "$450,000",
      type: "sale",
      status: "active",
      bedrooms: 2,
      bathrooms: 2,
      sqft: 1200,
      image: "/placeholder.svg?height=200&width=300",
      agent: "John Doe",
      listed: "2 weeks ago",
      views: 45,
      favorites: 12,
    },
    {
      id: 2,
      title: "Luxury Family Home",
      address: "456 Pine Avenue, Los Angeles, CA 90210",
      price: "$750,000",
      type: "sale",
      status: "pending",
      bedrooms: 4,
      bathrooms: 3,
      sqft: 2500,
      image: "/placeholder.svg?height=200&width=300",
      agent: "Jane Smith",
      listed: "1 month ago",
      views: 89,
      favorites: 23,
    },
    {
      id: 3,
      title: "Investment Property",
      address: "789 Elm Drive, Chicago, IL 60601",
      price: "$2,500/month",
      type: "rent",
      status: "active",
      bedrooms: 3,
      bathrooms: 2,
      sqft: 1800,
      image: "/placeholder.svg?height=200&width=300",
      agent: "Mike Johnson",
      listed: "3 days ago",
      views: 23,
      favorites: 8,
    },
    {
      id: 4,
      title: "Beachfront Villa",
      address: "321 Ocean View, Miami, FL 33101",
      price: "$1,200,000",
      type: "sale",
      status: "sold",
      bedrooms: 5,
      bathrooms: 4,
      sqft: 3200,
      image: "/placeholder.svg?height=200&width=300",
      agent: "Sarah Wilson",
      listed: "2 months ago",
      views: 156,
      favorites: 45,
    },
  ]

  const filteredProperties = properties.filter((property) => {
    const matchesSearch =
      property.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      property.address.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesTab = activeTab === "all" || property.type === activeTab || property.status === activeTab
    return matchesSearch && matchesTab
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800"
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "sold":
        return "bg-blue-100 text-blue-800"
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
              <h1 className="text-3xl font-bold text-gray-900">Properties</h1>
              <p className="text-gray-600">Manage your property listings and inventory</p>
            </div>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Add Property
            </Button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search and Filters */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search properties..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Button variant="outline">
                <Filter className="w-4 h-4 mr-2" />
                Filter
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Property Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-6">
          <TabsList>
            <TabsTrigger value="all">All Properties</TabsTrigger>
            <TabsTrigger value="sale">For Sale</TabsTrigger>
            <TabsTrigger value="rent">For Rent</TabsTrigger>
            <TabsTrigger value="sold">Sold</TabsTrigger>
          </TabsList>
        </Tabs>

        {/* Properties Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProperties.map((property) => (
            <Card key={property.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="relative">
                <img
                  src={property.image || "/placeholder.svg"}
                  alt={property.title}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute top-4 left-4">
                  <Badge className={getStatusColor(property.status)}>{property.status}</Badge>
                </div>
                <div className="absolute top-4 right-4">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="secondary" size="sm">
                        <MoreHorizontal className="w-4 h-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuItem>
                        <Eye className="w-4 h-4 mr-2" />
                        View Details
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Edit className="w-4 h-4 mr-2" />
                        Edit Property
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-red-600">Delete</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>

              <CardHeader className="pb-4">
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-lg mb-1">{property.title}</CardTitle>
                    <div className="flex items-center text-sm text-gray-600">
                      <MapPin className="w-4 h-4 mr-1" />
                      {property.address}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-xl font-bold text-green-600">{property.price}</div>
                  </div>
                </div>
              </CardHeader>

              <CardContent>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-4 text-sm text-gray-600">
                    <div className="flex items-center">
                      <Bed className="w-4 h-4 mr-1" />
                      {property.bedrooms}
                    </div>
                    <div className="flex items-center">
                      <Bath className="w-4 h-4 mr-1" />
                      {property.bathrooms}
                    </div>
                    <div className="flex items-center">
                      <Square className="w-4 h-4 mr-1" />
                      {property.sqft} sqft
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between text-sm text-gray-600 pt-4 border-t">
                  <div>
                    <div>Agent: {property.agent}</div>
                    <div>Listed: {property.listed}</div>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center space-x-3">
                      <div className="flex items-center">
                        <Eye className="w-4 h-4 mr-1" />
                        {property.views}
                      </div>
                      <div className="flex items-center">
                        <Heart className="w-4 h-4 mr-1" />
                        {property.favorites}
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredProperties.length === 0 && (
          <Card>
            <CardContent className="p-12 text-center">
              <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Search className="w-6 h-6 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No properties found</h3>
              <p className="text-gray-600 mb-4">Try adjusting your search or filter criteria</p>
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                Add Your First Property
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
