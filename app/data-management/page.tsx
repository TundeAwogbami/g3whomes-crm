"use client"

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
    setLoading(true)
    setError(null)
    try {
      const queryParams = new URLSearchParams()
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
    } finally {
      setLoading(false)
    }
  }

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
      return
    }

    try {
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
    </div>
  )
}
