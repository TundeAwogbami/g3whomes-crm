"use client"

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
    setLoading(true)
    try {
      const queryParams = new URLSearchParams()
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
    } finally {
      setLoading(false)
    }
  }

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
      return
    }

    try {
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
    }
  }

  return (
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
    </div>
  )
}
