"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, Filter } from "lucide-react"
import Link from "next/link"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { getContacts } from "@/lib/api"

export default async function ContactsPage() {
  const contactsData = await getContacts()
  const [searchTerm, setSearchTerm] = useState("")
  const [activeTab, setActiveTab] = useState("all")

  const contacts = [
    { id: 1, name: "Alice Smith", email: "alice.smith@example.com", phone: "111-222-3333", type: "Buyer" },
    { id: 2, name: "Bob Johnson", email: "bob.johnson@example.com", phone: "444-555-6666", type: "Seller" },
    { id: 3, name: "Charlie Brown", email: "charlie.brown@example.com", phone: "777-888-9999", type: "Agent" },
    {
      id: 4,
      name: "John Smith",
      email: "john.smith@email.com",
      phone: "+234 801 234 5678",
      type: "buyer",
      status: "active",
      lastContact: "2 days ago",
      properties: 3,
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: 5,
      name: "Sarah Johnson",
      email: "sarah.j@email.com",
      phone: "+234 802 345 6789",
      type: "seller",
      status: "qualified",
      lastContact: "1 week ago",
      properties: 1,
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: 6,
      name: "Mike Davis",
      email: "mike.davis@email.com",
      phone: "+234 803 456 7890",
      type: "investor",
      status: "lead",
      lastContact: "3 days ago",
      properties: 5,
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: 7,
      name: "Emma Wilson",
      email: "emma.wilson@email.com",
      phone: "+234 804 567 8901",
      type: "buyer",
      status: "active",
      lastContact: "1 day ago",
      properties: 2,
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: 8,
      name: "Robert Brown",
      email: "robert.brown@email.com",
      phone: "+234 805 678 9012",
      type: "seller",
      status: "inactive",
      lastContact: "2 weeks ago",
      properties: 1,
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: 9,
      name: "Lisa Garcia",
      email: "lisa.garcia@email.com",
      phone: "+234 806 789 0123",
      type: "lead",
      status: "qualified",
      lastContact: "5 days ago",
      properties: 0,
      avatar: "/placeholder.svg?height=40&width=40",
    },
    ...contactsData,
  ]

  const filteredContacts = contacts.filter((contact) => {
    const matchesSearch =
      contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesTab = activeTab === "all" || contact.type.toLowerCase() === activeTab.toLowerCase()
    return matchesSearch && matchesTab
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800"
      case "qualified":
        return "bg-blue-100 text-blue-800"
      case "lead":
        return "bg-yellow-100 text-yellow-800"
      case "inactive":
        return "bg-gray-100 text-gray-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getTypeColor = (type: string) => {
    switch (type.toLowerCase()) {
      case "buyer":
        return "bg-purple-100 text-purple-800"
      case "seller":
        return "bg-orange-100 text-orange-800"
      case "investor":
        return "bg-indigo-100 text-indigo-800"
      case "lead":
        return "bg-pink-100 text-pink-800"
      case "agent":
        return "bg-gray-100 text-gray-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="flex flex-1 flex-col p-4 md:p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-semibold">Contacts</h1>
        <Button asChild className="bg-dark-orange-500 hover:bg-dark-orange-600">
          <Link href="/contacts/add">Add Contact</Link>
        </Button>
      </div>

      {/* Search and Filters */}
      <Card className="mb-6">
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Search contacts..."
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

      {/* Contact Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-6">
        <TabsList>
          <TabsTrigger value="all">All Contacts</TabsTrigger>
          <TabsTrigger value="buyer">Buyers</TabsTrigger>
          <TabsTrigger value="seller">Sellers</TabsTrigger>
          <TabsTrigger value="investor">Investors</TabsTrigger>
          <TabsTrigger value="lead">Leads</TabsTrigger>
          <TabsTrigger value="agent">Agents</TabsTrigger>
        </TabsList>
      </Tabs>

      {/* Contacts Table */}
      <Card>
        <CardHeader>
          <CardTitle>Contact List</CardTitle>
          <CardDescription>Manage your client and lead contacts.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Phone</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredContacts.map((contact) => (
                <TableRow key={contact.id}>
                  <TableCell className="font-medium">{contact.name}</TableCell>
                  <TableCell>{contact.email}</TableCell>
                  <TableCell>{contact.phone}</TableCell>
                  <TableCell>
                    <Badge className={getTypeColor(contact.type)}>{contact.type}</Badge>
                    {contact.status && <Badge className={getStatusColor(contact.status)}>{contact.status}</Badge>}
                  </TableCell>
                  <TableCell>
                    <Button variant="ghost" size="sm">
                      Edit
                    </Button>
                    <Button variant="ghost" size="sm" className="text-red-500">
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {filteredContacts.length === 0 && (
        <Card className="mt-6">
          <CardContent className="p-12 text-center">
            <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Search className="w-6 h-6 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No contacts found</h3>
            <p className="text-gray-600 mb-4">Try adjusting your search or filter criteria</p>
            <Button asChild className="bg-dark-orange-500 hover:bg-dark-orange-600">
              <Link href="/contacts/add">Add Your First Contact</Link>
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
