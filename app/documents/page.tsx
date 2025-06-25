"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, FileText, Download, Eye, MoreHorizontal, Upload, Filter } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

export default function DocumentsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [activeTab, setActiveTab] = useState("all")

  const documents = [
    {
      id: 1,
      name: "Purchase Agreement - John Smith",
      type: "contract",
      size: "2.4 MB",
      uploadedBy: "Sarah Wilson",
      uploadedAt: "2 days ago",
      client: "John Smith",
      property: "123 Oak Street",
    },
    {
      id: 2,
      name: "Property Inspection Report",
      type: "inspection",
      size: "1.8 MB",
      uploadedBy: "Mike Davis",
      uploadedAt: "1 week ago",
      client: "Emma Johnson",
      property: "456 Pine Avenue",
    },
    {
      id: 3,
      name: "Financial Pre-approval Letter",
      type: "financial",
      size: "856 KB",
      uploadedBy: "Lisa Garcia",
      uploadedAt: "3 days ago",
      client: "Robert Brown",
      property: "789 Elm Drive",
    },
    {
      id: 4,
      name: "Property Marketing Brochure",
      type: "marketing",
      size: "3.2 MB",
      uploadedBy: "John Doe",
      uploadedAt: "5 days ago",
      client: "Maria Garcia",
      property: "321 Ocean View",
    },
  ]

  const filteredDocuments = documents.filter((doc) => {
    const matchesSearch =
      doc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.property.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesTab = activeTab === "all" || doc.type === activeTab
    return matchesSearch && matchesTab
  })

  const getTypeColor = (type: string) => {
    switch (type) {
      case "contract":
        return "bg-blue-100 text-blue-800"
      case "inspection":
        return "bg-green-100 text-green-800"
      case "financial":
        return "bg-yellow-100 text-yellow-800"
      case "marketing":
        return "bg-purple-100 text-purple-800"
      case "legal":
        return "bg-red-100 text-red-800"
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
              <h1 className="text-3xl font-bold text-gray-900">Documents</h1>
              <p className="text-gray-600">Manage contracts, reports, and other important files</p>
            </div>
            <Button>
              <Upload className="w-4 h-4 mr-2" />
              Upload Document
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
                  placeholder="Search documents..."
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

        {/* Document Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-6">
          <TabsList>
            <TabsTrigger value="all">All Documents</TabsTrigger>
            <TabsTrigger value="contract">Contracts</TabsTrigger>
            <TabsTrigger value="inspection">Inspections</TabsTrigger>
            <TabsTrigger value="financial">Financial</TabsTrigger>
            <TabsTrigger value="marketing">Marketing</TabsTrigger>
          </TabsList>
        </Tabs>

        {/* Documents List */}
        <div className="space-y-4">
          {filteredDocuments.map((document) => (
            <Card key={document.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="flex-shrink-0">
                      <FileText className="w-8 h-8 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">{document.name}</h3>
                      <div className="flex items-center space-x-4 text-sm text-gray-600 mt-1">
                        <span>Client: {document.client}</span>
                        <span>Property: {document.property}</span>
                        <span>Size: {document.size}</span>
                      </div>
                      <div className="flex items-center space-x-2 mt-2">
                        <Badge className={getTypeColor(document.type)}>{document.type}</Badge>
                        <span className="text-sm text-gray-500">
                          Uploaded by {document.uploadedBy} • {document.uploadedAt}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Button variant="outline" size="sm">
                      <Eye className="w-4 h-4 mr-2" />
                      View
                    </Button>
                    <Button variant="outline" size="sm">
                      <Download className="w-4 h-4 mr-2" />
                      Download
                    </Button>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <MoreHorizontal className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <DropdownMenuItem>Edit Details</DropdownMenuItem>
                        <DropdownMenuItem>Share</DropdownMenuItem>
                        <DropdownMenuItem>Move to Folder</DropdownMenuItem>
                        <DropdownMenuItem className="text-red-600">Delete</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredDocuments.length === 0 && (
          <Card>
            <CardContent className="p-12 text-center">
              <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No documents found</h3>
              <p className="text-gray-600 mb-4">Try adjusting your search or filter criteria</p>
              <Button>
                <Upload className="w-4 h-4 mr-2" />
                Upload Your First Document
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
