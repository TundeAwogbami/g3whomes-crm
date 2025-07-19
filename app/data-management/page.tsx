"use client"

import { DialogDescription } from "@/components/ui/dialog"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogClose } from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import { Loader2, PlusCircle, Edit, Trash2 } from "lucide-react"

interface DataRecord {
  id: string
  record_type: string
  data: Record<string, any>
  created_at: string
  updated_at: string
}

export default function DataManagementPage() {
  const [records, setRecords] = useState<DataRecord[]>([])
  const [loading, setLoading] = useState(true)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [currentRecord, setCurrentRecord] = useState<DataRecord | null>(null)
  const [recordType, setRecordType] = useState("")
  const [recordData, setRecordData] = useState("") // JSON string
  const [submitting, setSubmitting] = useState(false)
  const { toast } = useToast()

  useEffect(() => {
    fetchRecords()
  }, [])

  const fetchRecords = async () => {
    setLoading(true)
    try {
      const response = await fetch("/api/data-records")
      if (!response.ok) {
        throw new Error("Failed to fetch data records")
      }
      const data = await response.json()
      setRecords(data)
    } catch (error) {
      console.error("Error fetching data records:", error)
      toast({
        title: "Error",
        description: "Failed to load data records.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleAddClick = () => {
    setCurrentRecord(null)
    setRecordType("")
    setRecordData("")
    setIsModalOpen(true)
  }

  const handleEditClick = (record: DataRecord) => {
    setCurrentRecord(record)
    setRecordType(record.record_type)
    setRecordData(JSON.stringify(record.data, null, 2)) // Pretty print JSON
    setIsModalOpen(true)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)
    try {
      let parsedData: Record<string, any>
      try {
        parsedData = JSON.parse(recordData)
      } catch (jsonError) {
        toast({
          title: "Invalid JSON",
          description: "Please enter valid JSON data.",
          variant: "destructive",
        })
        setSubmitting(false)
        return
      }

      const method = currentRecord ? "PUT" : "POST"
      const url = "/api/data-records"
      const body = currentRecord
        ? JSON.stringify({ id: currentRecord.id, record_type: recordType, data: parsedData })
        : JSON.stringify({ record_type: recordType, data: parsedData })

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body,
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || "Failed to save record")
      }

      toast({
        title: "Success",
        description: `Record ${currentRecord ? "updated" : "added"} successfully.`,
      })
      setIsModalOpen(false)
      fetchRecords()
    } catch (error: any) {
      console.error("Error saving record:", error)
      toast({
        title: "Error",
        description: error.message || "Failed to save record.",
        variant: "destructive",
      })
    } finally {
      setSubmitting(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this record?")) {
      return
    }

    try {
      const response = await fetch("/api/data-records", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || "Failed to delete record")
      }

      toast({
        title: "Success",
        description: "Record deleted successfully.",
      })
      fetchRecords()
    } catch (error: any) {
      console.error("Error deleting record:", error)
      toast({
        title: "Error",
        description: error.message || "Failed to delete record.",
        variant: "destructive",
      })
    }
  }

  return (
    <div className="flex flex-1 flex-col p-4 md:p-6">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-semibold">Data Records</h1>
        <Button onClick={handleAddClick} className="bg-dark-orange-500 hover:bg-dark-orange-600">
          <PlusCircle className="mr-2 h-4 w-4" /> Add New Record
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Custom Data Records</CardTitle>
          <CardDescription>Manage flexible data structures for various purposes.</CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex justify-center items-center h-40">
              <Loader2 className="h-8 w-8 animate-spin text-dark-orange-500" />
            </div>
          ) : records.length === 0 ? (
            <p className="text-center text-muted-foreground">No data records found.</p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Record Type</TableHead>
                  <TableHead>Data (JSON)</TableHead>
                  <TableHead>Created At</TableHead>
                  <TableHead>Updated At</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {records.map((record) => (
                  <TableRow key={record.id}>
                    <TableCell className="font-medium">{record.id.substring(0, 8)}...</TableCell>
                    <TableCell>{record.record_type}</TableCell>
                    <TableCell className="max-w-[300px] truncate text-xs font-mono">
                      {JSON.stringify(record.data)}
                    </TableCell>
                    <TableCell>{new Date(record.created_at).toLocaleDateString()}</TableCell>
                    <TableCell>{new Date(record.updated_at).toLocaleDateString()}</TableCell>
                    <TableCell>
                      <Button variant="ghost" size="sm" onClick={() => handleEditClick(record)}>
                        <Edit className="h-4 w-4" />
                        <span className="sr-only">Edit</span>
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDelete(record.id)}
                        className="text-red-500"
                      >
                        <Trash2 className="h-4 w-4" />
                        <span className="sr-only">Delete</span>
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{currentRecord ? "Edit Data Record" : "Add New Data Record"}</DialogTitle>
            <DialogDescription>
              {currentRecord ? "Modify the details of this data record." : "Create a new flexible data record."}
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="record-type">Record Type</Label>
              <Input id="record-type" value={recordType} onChange={(e) => setRecordType(e.target.value)} required />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="record-data">Data (JSON)</Label>
              <Textarea
                id="record-data"
                value={recordData}
                onChange={(e) => setRecordData(e.target.value)}
                placeholder='e.g., {"key": "value", "number": 123}'
                className="min-h-[150px] font-mono text-xs"
                required
              />
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline">Cancel</Button>
              </DialogClose>
              <Button type="submit" disabled={submitting} className="bg-dark-orange-500 hover:bg-dark-orange-600">
                {submitting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                {currentRecord ? "Save Changes" : "Create Record"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}
