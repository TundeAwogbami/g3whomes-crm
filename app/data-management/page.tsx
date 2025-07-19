"use client"

<<<<<<< HEAD
import { useState, useEffect } from "react"
import { useSession } from "next-auth/react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import {
  PlusCircle,
  Edit,
  Trash2,
  AlertCircle,
  CheckCircle,
  Users,
  User,
  Handshake,
  Clipboard,
  DollarSign,
  Building,
  Gavel,
  Lock,
  Unlock,
  FileJson,
  Info,
} from "lucide-react"
import { format } from "date-fns"
import type { DataRecord } from "@/lib/types"

const recordCategories = [
  { value: "Client", label: "Client", icon: Users },
  { value: "Staff", label: "Staff", icon: User },
  { value: "Affiliate", label: "Affiliate", icon: Handshake },
  { value: "Medical", label: "Medical", icon: Clipboard },
  { value: "Financial", label: "Financial", icon: DollarSign },
  { value: "Property", label: "Property", icon: Building },
  { value: "Legal", label: "Legal", icon: Gavel },
]

const accessLevels = [
  { value: "Public", label: "Public", icon: Unlock },
  { value: "Internal", label: "Internal", icon: Users },
  { value: "Confidential", label: "Confidential", icon: Lock },
  { value: "Restricted", label: "Restricted", icon: Lock },
]

export default function DataManagementPage() {
  const { data: session } = useSession()
  const [records, setRecords] = useState<DataRecord[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [filters, setFilters] = useState({
    category: "",
    record_type: "",
    access_level: "",
    search: "",
  })
  const [newRecord, setNewRecord] = useState<Partial<DataRecord>>({
    title: "",
    category: "",
    record_type: "",
    data: {},
    access_level: "Internal",
    tags: [],
  })
  const [editRecord, setEditRecord] = useState<DataRecord | null>(null)
  const [formError, setFormError] = useState<string | null>(null)
  const [formSuccess, setFormSuccess] = useState<string | null>(null)

  const fetchDataRecords = async () => {
=======
import { Skeleton } from "@/components/ui/skeleton"

import * as React from "react"
import { Plus, Search, Edit, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import type { DataRecord } from "@/lib/db-supabase"

const recordCategories = ["Client", "Staff", "Affiliate", "Medical", "Financial", "Property", "Legal"]
const recordTypes = [
  "Personal Info",
  "Payroll",
  "Health Report",
  "Contract Details",
  "Valuation",
  "Compliance",
  "Performance Review",
  "Other",
]
const accessLevels = ["Public", "Internal", "Confidential", "Restricted"]

export default function DataManagementPage() {
  const { data: session } = useSession()
  const router = useRouter()
  const { toast } = useToast()

  const [records, setRecords] = React.useState<DataRecord[]>([])
  const [loading, setLoading] = React.useState(true)
  const [searchTerm, setSearchTerm] = React.useState("")
  const [selectedCategory, setSelectedCategory] = React.useState<string | undefined>(undefined)
  const [selectedRecordType, setSelectedRecordType] = React.useState<string | undefined>(undefined)
  const [currentRecord, setCurrentRecord] = React.useState<Partial<DataRecord>>({
    title: "",
    category: "",
    record_type: "",
    data: {},
    access_level: "Internal",
    tags: [],
  })
  const [isRecordDialogOpen, setIsRecordDialogOpen] = React.useState(false)
  const [isEditing, setIsEditing] = React.useState(false)

  React.useEffect(() => {
    if (session?.user) {
      fetchRecords()
    }
  }, [session])

  const fetchRecords = async () => {
>>>>>>> parent of 02a07d6 (Changes)
    setLoading(true)
    setError(null)
    try {
      const queryParams = new URLSearchParams()
<<<<<<< HEAD
      if (filters.category) queryParams.append("category", filters.category)
      if (filters.record_type) queryParams.append("record_type", filters.record_type)
      if (filters.access_level) queryParams.append("access_level", filters.access_level)
      if (filters.search) queryParams.append("search", filters.search)

      const res = await fetch(`/api/data-records?${queryParams.toString()}`)
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`)
      }
      const data = await res.json()
      setRecords(data)
    } catch (err: any) {
      setError(err.message || "Failed to fetch data records.")
=======
      if (selectedCategory) queryParams.append("category", selectedCategory)
      if (selectedRecordType) queryParams.append("record_type", selectedRecordType)
      if (searchTerm) queryParams.append("search", searchTerm)

      const res = await fetch(`/api/data-records?${queryParams.toString()}`)
      if (!res.ok) {
        throw new Error("Failed to fetch data records")
      }
      const data = await res.json()
      setRecords(data)
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load data records.",
        variant: "destructive",
      })
      console.error("Error fetching data records:", error)
>>>>>>> parent of 02a07d6 (Changes)
    } finally {
      setLoading(false)
    }
  }

<<<<<<< HEAD
  useEffect(() => {
    if (session) {
      fetchDataRecords()
    }
  }, [session, filters])

  const handleFilterChange = (key: string, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }))
  }

  const handleNewRecordChange = (key: string, value: any) => {
    setNewRecord((prev) => ({ ...prev, [key]: value }))
  }

  const handleEditRecordChange = (key: string, value: any) => {
    if (editRecord) {
      setEditRecord((prev) => ({ ...prev!, [key]: value }))
    }
  }

  const handleCreateRecord = async () => {
    setFormError(null)
    setFormSuccess(null)
    if (!newRecord.title || !newRecord.category || !newRecord.data) {
      setFormError("Please fill all required fields (Title, Category, Data).")
=======
  const handleOpenDialog = (record?: DataRecord) => {
    if (record) {
      setCurrentRecord(record)
      setIsEditing(true)
    } else {
      setCurrentRecord({
        title: "",
        category: "",
        record_type: "",
        data: {},
        access_level: "Internal",
        tags: [],
      })
      setIsEditing(false)
    }
    setIsRecordDialogOpen(true)
  }

  const handleSaveRecord = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!session?.user) {
      toast({
        title: "Unauthorized",
        description: "Please sign in to manage records.",
        variant: "destructive",
      })
      return
    }

    try {
      const method = isEditing ? "PUT" : "POST"
      const url = isEditing ? `/api/data-records?id=${currentRecord.id}` : "/api/data-records"

      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(currentRecord),
      })

      if (!res.ok) {
        throw new Error(`Failed to ${isEditing ? "update" : "add"} record`)
      }

      toast({
        title: "Success",
        description: `Record ${isEditing ? "updated" : "added"} successfully.`,
      })
      setIsRecordDialogOpen(false)
      fetchRecords()
    } catch (error) {
      toast({
        title: "Error",
        description: `Failed to ${isEditing ? "update" : "add"} record.`,
        variant: "destructive",
      })
      console.error(`Error ${isEditing ? "updating" : "adding"} record:`, error)
    }
  }

  const handleDeleteRecord = async (id: string) => {
    if (!session?.user) {
      toast({
        title: "Unauthorized",
        description: "Please sign in to delete records.",
        variant: "destructive",
      })
      return
    }

    if (!confirm("Are you sure you want to delete this record?")) {
>>>>>>> parent of 02a07d6 (Changes)
      return
    }

    try {
<<<<<<< HEAD
      const res = await fetch("/api/data-records", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newRecord),
      })

      if (!res.ok) {
        const errorData = await res.json()
        throw new Error(errorData.message || `HTTP error! status: ${res.status}`)
      }

      setFormSuccess("Data record created successfully!")
      setNewRecord({
        title: "",
        category: "",
        record_type: "",
        data: {},
        access_level: "Internal",
        tags: [],
      })
      fetchDataRecords() // Refresh list
    } catch (err: any) {
      setFormError(err.message || "Failed to create data record.")
=======
      const res = await fetch(`/api/data-records?id=${id}`, {
        method: "DELETE",
      })

      if (!res.ok) {
        throw new Error("Failed to delete record")
      }

      toast({
        title: "Success",
        description: "Record deleted successfully.",
      })
      fetchRecords()
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete record.",
        variant: "destructive",
      })
      console.error("Error deleting record:", error)
>>>>>>> parent of 02a07d6 (Changes)
    }
  }

  const handleUpdateRecord = async () => {
    setFormError(null)
    setFormSuccess(null)
    if (!editRecord?.id || !editRecord.title || !editRecord.category || !editRecord.data) {
      setFormError("Please fill all required fields (Title, Category, Data).")
      return
    }

    try {
      const res = await fetch(`/api/data-records?id=${editRecord.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(editRecord),
      })

      if (!res.ok) {
        const errorData = await res.json()
        throw new Error(errorData.message || `HTTP error! status: ${res.status}`)
      }

      setFormSuccess("Data record updated successfully!")
      setEditRecord(null) // Close dialog
      fetchDataRecords() // Refresh list
    } catch (err: any) {
      setFormError(err.message || "Failed to update data record.")
    }
  }

  const handleDeleteRecord = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this data record?")) {
      return
    }
    try {
      const res = await fetch(`/api/data-records?id=${id}`, {
        method: "DELETE",
      })

      if (!res.ok) {
        const errorData = await res.json()
        throw new Error(errorData.message || `HTTP error! status: ${res.status}`)
      }

      setFormSuccess("Data record deleted successfully!")
      fetchDataRecords() // Refresh list
    } catch (err: any) {
      setFormError(err.message || "Failed to delete data record.")
    }
  }

  if (!session) {
    return <div className="flex items-center justify-center h-full">Please sign in to view data records.</div>
  }

  return (
<<<<<<< HEAD
    <div className="flex flex-col gap-6 p-6">
      <h1 className="text-3xl font-bold text-dark-orange-700">Data Management</h1>

      {formError && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{formError}</AlertDescription>
        </Alert>
      )}
      {formSuccess && (
        <Alert>
          <CheckCircle className="h-4 w-4" />
          <AlertTitle>Success</AlertTitle>
          <AlertDescription>{formSuccess}</AlertDescription>
        </Alert>
      )}

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <PlusCircle className="h-5 w-5" /> Create New Data Record
          </CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <div className="space-y-2">
            <Label htmlFor="recordTitle">Record Title</Label>
            <Input
              id="recordTitle"
              placeholder="e.g., John Doe Medical History"
              value={newRecord.title}
              onChange={(e) => handleNewRecordChange("title", e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="recordCategory">Category</Label>
            <Select value={newRecord.category} onValueChange={(value) => handleNewRecordChange("category", value)}>
              <SelectTrigger id="recordCategory">
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                {recordCategories.map((cat) => (
                  <SelectItem key={cat.value} value={cat.value}>
                    <div className="flex items-center gap-2">
                      <cat.icon className="h-4 w-4" /> {cat.label}
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="recordType">Record Type (Optional)</Label>
            <Input
              id="recordType"
              placeholder="e.g., Health Report, Payroll"
              value={newRecord.record_type || ""}
              onChange={(e) => handleNewRecordChange("record_type", e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="accessLevel">Access Level</Label>
            <Select
              value={newRecord.access_level}
              onValueChange={(value) => handleNewRecordChange("access_level", value)}
            >
              <SelectTrigger id="accessLevel">
                <SelectValue placeholder="Select access level" />
              </SelectTrigger>
              <SelectContent>
                {accessLevels.map((level) => (
                  <SelectItem key={level.value} value={level.value}>
                    <div className="flex items-center gap-2">
                      <level.icon className="h-4 w-4" /> {level.label}
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="recordTags">Tags (comma-separated)</Label>
            <Input
              id="recordTags"
              placeholder="e.g., sensitive, urgent"
              value={newRecord.tags?.join(", ") || ""}
              onChange={(e) =>
                handleNewRecordChange(
                  "tags",
                  e.target.value.split(",").map((tag) => tag.trim()),
                )
              }
            />
          </div>
          <div className="space-y-2 md:col-span-2 lg:col-span-3">
            <Label htmlFor="recordData">Data (JSON)</Label>
            <Textarea
              id="recordData"
              placeholder='{"diagnosis": "Flu", "treatment": "Rest and fluids"}'
              value={JSON.stringify(newRecord.data, null, 2)}
              onChange={(e) => {
                try {
                  handleNewRecordChange("data", JSON.parse(e.target.value))
                } catch {
                  // Ignore invalid JSON input for now, handle on submit
                }
              }}
              className="min-h-[100px]"
            />
          </div>
          <div className="md:col-span-2 lg:col-span-3 flex justify-end">
            <Button onClick={handleCreateRecord} className="bg-dark-orange-500 hover:bg-dark-orange-600">
              <PlusCircle className="mr-2 h-4 w-4" /> Create Record
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileJson className="h-5 w-5" /> All Data Records
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-4 flex flex-wrap items-center gap-4">
            <Input
              placeholder="Search records..."
              className="max-w-sm flex-1"
              value={filters.search}
              onChange={(e) => handleFilterChange("search", e.target.value)}
            />
            <Select value={filters.category} onValueChange={(value) => handleFilterChange("category", value)}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {recordCategories.map((cat) => (
                  <SelectItem key={cat.value} value={cat.value}>
                    {cat.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={filters.access_level} onValueChange={(value) => handleFilterChange("access_level", value)}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by Access" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Access Levels</SelectItem>
                {accessLevels.map((level) => (
                  <SelectItem key={level.value} value={level.value}>
                    {level.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button
              onClick={() => setFilters({ category: "", record_type: "", access_level: "", search: "" })}
              variant="outline"
            >
              Reset Filters
            </Button>
          </div>

          {loading ? (
            <div className="text-center py-8">Loading data records...</div>
          ) : error ? (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          ) : records.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">No data records found.</div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Title</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Access</TableHead>
                    <TableHead>Created By</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {records.map((record) => {
                    const CategoryIcon = recordCategories.find((c) => c.value === record.category)?.icon || Info
                    const AccessIcon = accessLevels.find((a) => a.value === record.access_level)?.icon || Lock

                    return (
                      <TableRow key={record.id}>
                        <TableCell className="font-medium">{record.title}</TableCell>
                        <TableCell>
                          <Badge variant="outline" className="flex items-center gap-1">
                            <CategoryIcon className="h-3 w-3" /> {record.category}
                          </Badge>
                        </TableCell>
                        <TableCell>{record.record_type || "N/A"}</TableCell>
                        <TableCell>
                          <Badge variant="outline" className="flex items-center gap-1">
                            <AccessIcon className="h-3 w-3" /> {record.access_level}
                          </Badge>
                        </TableCell>
                        <TableCell>{record.created_by}</TableCell>
                        <TableCell>{format(new Date(record.created_at), "PPP")}</TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Dialog>
                              <DialogTrigger asChild>
                                <Button variant="outline" size="sm" onClick={() => setEditRecord(record)}>
                                  <Edit className="h-4 w-4" />
                                  <span className="sr-only">Edit</span>
                                </Button>
                              </DialogTrigger>
                              <DialogContent className="sm:max-w-[600px]">
                                <DialogHeader>
                                  <DialogTitle>Edit Data Record</DialogTitle>
                                </DialogHeader>
                                {editRecord && (
                                  <div className="grid gap-4 py-4">
                                    <div className="space-y-2">
                                      <Label htmlFor="editTitle">Record Title</Label>
                                      <Input
                                        id="editTitle"
                                        value={editRecord.title}
                                        onChange={(e) => handleEditRecordChange("title", e.target.value)}
                                      />
                                    </div>
                                    <div className="space-y-2">
                                      <Label htmlFor="editCategory">Category</Label>
                                      <Select
                                        value={editRecord.category}
                                        onValueChange={(value) => handleEditRecordChange("category", value)}
                                      >
                                        <SelectTrigger id="editCategory">
                                          <SelectValue placeholder="Select category" />
                                        </SelectTrigger>
                                        <SelectContent>
                                          {recordCategories.map((cat) => (
                                            <SelectItem key={cat.value} value={cat.value}>
                                              {cat.label}
                                            </SelectItem>
                                          ))}
                                        </SelectContent>
                                      </Select>
                                    </div>
                                    <div className="space-y-2">
                                      <Label htmlFor="editRecordType">Record Type (Optional)</Label>
                                      <Input
                                        id="editRecordType"
                                        value={editRecord.record_type || ""}
                                        onChange={(e) => handleEditRecordChange("record_type", e.target.value)}
                                      />
                                    </div>
                                    <div className="space-y-2">
                                      <Label htmlFor="editAccessLevel">Access Level</Label>
                                      <Select
                                        value={editRecord.access_level}
                                        onValueChange={(value) => handleEditRecordChange("access_level", value)}
                                      >
                                        <SelectTrigger id="editAccessLevel">
                                          <SelectValue placeholder="Select access level" />
                                        </SelectTrigger>
                                        <SelectContent>
                                          {accessLevels.map((level) => (
                                            <SelectItem key={level.value} value={level.value}>
                                              {level.label}
                                            </SelectItem>
                                          ))}
                                        </SelectContent>
                                      </Select>
                                    </div>
                                    <div className="space-y-2">
                                      <Label htmlFor="editRecordTags">Tags (comma-separated)</Label>
                                      <Input
                                        id="editRecordTags"
                                        value={editRecord.tags?.join(", ") || ""}
                                        onChange={(e) =>
                                          handleEditRecordChange(
                                            "tags",
                                            e.target.value.split(",").map((tag) => tag.trim()),
                                          )
                                        }
                                      />
                                    </div>
                                    <div className="space-y-2">
                                      <Label htmlFor="editRecordData">Data (JSON)</Label>
                                      <Textarea
                                        id="editRecordData"
                                        value={JSON.stringify(editRecord.data, null, 2)}
                                        onChange={(e) => {
                                          try {
                                            handleEditRecordChange("data", JSON.parse(e.target.value))
                                          } catch {
                                            // Ignore invalid JSON
                                          }
                                        }}
                                        className="min-h-[150px]"
                                      />
                                    </div>
                                    <Button
                                      onClick={handleUpdateRecord}
                                      className="bg-dark-orange-500 hover:bg-dark-orange-600"
                                    >
                                      Save Changes
                                    </Button>
                                  </div>
                                )}
                              </DialogContent>
                            </Dialog>
                            <Button variant="destructive" size="sm" onClick={() => handleDeleteRecord(record.id)}>
                              <Trash2 className="h-4 w-4" />
                              <span className="sr-only">Delete</span>
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    )
                  })}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
=======
    <div className="flex flex-col gap-6 p-4 lg:p-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Data Management</h1>
        <Button onClick={() => handleOpenDialog()}>
          <Plus className="mr-2 h-4 w-4" /> Add Record
        </Button>
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
          <Input
            placeholder="Search records..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") fetchRecords()
            }}
            className="pl-9 pr-4 py-2 rounded-md border border-input focus:ring-2 focus:ring-dark-orange-500 focus:border-dark-orange-500 w-full"
          />
        </div>
        <Select onValueChange={setSelectedCategory} value={selectedCategory}>
          <SelectTrigger className="w-full md:w-[180px]">
            <SelectValue placeholder="Filter by Category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            {recordCategories.map((cat) => (
              <SelectItem key={cat} value={cat}>
                {cat}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select onValueChange={setSelectedRecordType} value={selectedRecordType}>
          <SelectTrigger className="w-full md:w-[180px]">
            <SelectValue placeholder="Filter by Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Types</SelectItem>
            {recordTypes.map((type) => (
              <SelectItem key={type} value={type}>
                {type}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Button onClick={fetchRecords}>Apply Filters</Button>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <Card key={i} className="animate-pulse">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <Skeleton className="h-6 w-3/4" />
                <Skeleton className="h-6 w-6 rounded-full" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-4 w-1/2 mb-2" />
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-4 w-2/3" />
              </CardContent>
            </Card>
          ))}
        </div>
      ) : records.length === 0 ? (
        <div className="text-center text-gray-500 py-10">No data records found.</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {records.map((record) => (
            <Card key={record.id}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-lg font-medium">{record.title}</CardTitle>
                <Badge variant="secondary">{record.access_level}</Badge>
              </CardHeader>
              <CardContent className="space-y-2">
                <p className="text-sm text-gray-500">Category: {record.category}</p>
                {record.record_type && <p className="text-sm text-gray-500">Type: {record.record_type}</p>}
                <div className="text-sm text-gray-700 max-h-20 overflow-hidden">
                  <pre className="whitespace-pre-wrap text-xs bg-gray-50 p-2 rounded-md">
                    {JSON.stringify(record.data, null, 2)}
                  </pre>
                </div>
                <div className="flex flex-wrap gap-1">
                  {record.tags.map((tag, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
                <div className="flex gap-2 mt-4">
                  <Button variant="outline" size="sm" onClick={() => handleOpenDialog(record)}>
                    <Edit className="h-4 w-4 mr-1" /> Edit
                  </Button>
                  <Button variant="destructive" size="sm" onClick={() => handleDeleteRecord(record.id)}>
                    <Trash2 className="h-4 w-4 mr-1" /> Delete
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      <Dialog open={isRecordDialogOpen} onOpenChange={setIsRecordDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>{isEditing ? "Edit Record" : "Add New Record"}</DialogTitle>
            <DialogDescription>
              {isEditing ? "Edit the details of this record." : "Fill in the details for the new record."}
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSaveRecord} className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="title" className="text-right">
                Title
              </Label>
              <Input
                id="title"
                value={currentRecord.title || ""}
                onChange={(e) => setCurrentRecord({ ...currentRecord, title: e.target.value })}
                className="col-span-3"
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="category" className="text-right">
                Category
              </Label>
              <Select
                onValueChange={(value) => setCurrentRecord({ ...currentRecord, category: value })}
                value={currentRecord.category}
                required
              >
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  {recordCategories.map((cat) => (
                    <SelectItem key={cat} value={cat}>
                      {cat}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="record_type" className="text-right">
                Record Type
              </Label>
              <Select
                onValueChange={(value) => setCurrentRecord({ ...currentRecord, record_type: value })}
                value={currentRecord.record_type}
              >
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select a record type" />
                </SelectTrigger>
                <SelectContent>
                  {recordTypes.map((type) => (
                    <SelectItem key={type} value={type}>
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="data" className="text-right">
                Data (JSON)
              </Label>
              <Textarea
                id="data"
                value={JSON.stringify(currentRecord.data, null, 2)}
                onChange={(e) => {
                  try {
                    setCurrentRecord({ ...currentRecord, data: JSON.parse(e.target.value) })
                  } catch (error) {
                    // Handle invalid JSON input
                    console.error("Invalid JSON:", error)
                  }
                }}
                className="col-span-3 min-h-[100px]"
                placeholder='{"key": "value"}'
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="access_level" className="text-right">
                Access Level
              </Label>
              <Select
                onValueChange={(value) =>
                  setCurrentRecord({
                    ...currentRecord,
                    access_level: value as "Public" | "Internal" | "Confidential" | "Restricted",
                  })
                }
                value={currentRecord.access_level}
                required
              >
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select access level" />
                </SelectTrigger>
                <SelectContent>
                  {accessLevels.map((level) => (
                    <SelectItem key={level} value={level}>
                      {level}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="tags" className="text-right">
                Tags (comma-separated)
              </Label>
              <Input
                id="tags"
                value={currentRecord.tags?.join(", ") || ""}
                onChange={(e) =>
                  setCurrentRecord({ ...currentRecord, tags: e.target.value.split(",").map((tag) => tag.trim()) })
                }
                className="col-span-3"
              />
            </div>
            <DialogFooter>
              <Button type="submit">{isEditing ? "Save Changes" : "Add Record"}</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
>>>>>>> parent of 02a07d6 (Changes)
    </div>
  )
}
