"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useSession } from "next-auth/react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import {
  FileText,
  Folder,
  Lock,
  Unlock,
  Upload,
  PlusCircle,
  Download,
  Trash2,
  AlertCircle,
  CheckCircle,
  Handshake,
  Home,
  Users,
  Building,
  Briefcase,
  File,
  Clipboard,
  DollarSign,
  Shield,
  User,
  Gavel,
  FileBadge,
  FileCheck,
  FileJson,
  FileAudio,
  FileVideo,
  FileImage,
  FileSpreadsheet,
  FileIcon as FileWord,
  FileIcon as FilePdf,
} from "lucide-react"
import { format } from "date-fns"
import type { Document } from "@/lib/types"

const documentCategories = [
  { value: "Client", label: "Client", icon: Users },
  { value: "Staff", label: "Staff", icon: User },
  { value: "Affiliate", label: "Affiliate", icon: Handshake },
  { value: "Property", label: "Property", icon: Building },
  { value: "Company", label: "Company", icon: Briefcase },
]

const documentTypes = [
  { value: "Contract", label: "Contract", icon: FileText },
  { value: "Medical", label: "Medical", icon: Clipboard },
  { value: "Financial", label: "Financial", icon: DollarSign },
  { value: "Identity", label: "Identity", icon: Shield },
  { value: "Property", label: "Property", icon: Home },
  { value: "Legal", label: "Legal", icon: Gavel },
  { value: "Insurance", label: "Insurance", icon: FileBadge },
  { value: "Tax", label: "Tax", icon: FileCheck },
  { value: "Other", label: "Other", icon: File },
]

const accessLevels = [
  { value: "Public", label: "Public", icon: Unlock },
  { value: "Internal", label: "Internal", icon: Users },
  { value: "Confidential", label: "Confidential", icon: Lock },
  { value: "Restricted", label: "Restricted", icon: Shield },
]

const fileTypeIcons: { [key: string]: React.ElementType } = {
  pdf: FilePdf,
  doc: FileWord,
  docx: FileWord,
  xls: FileSpreadsheet,
  xlsx: FileSpreadsheet,
  jpg: FileImage,
  jpeg: FileImage,
  png: FileImage,
  gif: FileImage,
  mp4: FileVideo,
  mov: FileVideo,
  avi: FileVideo,
  mp3: FileAudio,
  wav: FileAudio,
  json: FileJson,
  txt: FileText,
  default: File,
}

function getFileTypeIcon(fileName: string) {
  const ext = fileName.split(".").pop()?.toLowerCase() || "default"
  return fileTypeIcons[ext] || fileTypeIcons.default
}

export default function DocumentsPage() {
  const { data: session } = useSession()
  const [documents, setDocuments] = useState<Document[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [filters, setFilters] = useState({
    category: "All Categories",
    document_type: "All Types",
    access_level: "All Access Levels",
    search: "",
  })
  const [newDocument, setNewDocument] = useState<Partial<Document>>({
    name: "",
    file_url: "",
    category: "",
    document_type: "",
    access_level: "Internal",
    tags: [],
    metadata: {},
  })
  const [uploadError, setUploadError] = useState<string | null>(null)
  const [uploadSuccess, setUploadSuccess] = useState<string | null>(null)

  const fetchDocuments = async () => {
    setLoading(true)
    setError(null)
    try {
      const queryParams = new URLSearchParams()
      if (filters.category !== "All Categories") queryParams.append("category", filters.category)
      if (filters.document_type !== "All Types") queryParams.append("document_type", filters.document_type)
      if (filters.access_level !== "All Access Levels") queryParams.append("access_level", filters.access_level)
      if (filters.search) queryParams.append("search", filters.search)

      const res = await fetch(`/api/documents?${queryParams.toString()}`)
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`)
      }
      const data = await res.json()
      setDocuments(data)
    } catch (err: any) {
      setError(err.message || "Failed to fetch documents.")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (session) {
      fetchDocuments()
    }
  }, [session, filters])

  const handleFilterChange = (key: string, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }))
  }

  const handleNewDocumentChange = (key: string, value: any) => {
    setNewDocument((prev) => ({ ...prev, [key]: value }))
  }

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    setUploadError(null)
    setUploadSuccess(null)

    // In a real application, you would upload the file to a storage service (e.g., Supabase Storage, S3)
    // For this example, we'll simulate an upload and use a placeholder URL.
    try {
      // Simulate file upload
      const simulatedUploadUrl = `/uploads/${file.name}` // Replace with actual uploaded URL
      const simulatedFileSize = file.size
      const simulatedFileType = file.type.split("/").pop() || "unknown"

      setNewDocument((prev) => ({
        ...prev,
        file_url: simulatedUploadUrl,
        file_name: file.name,
        file_size: simulatedFileSize,
        file_type: simulatedFileType,
      }))
      setUploadSuccess("File selected. Ready to create document.")
    } catch (err) {
      setUploadError("Failed to process file for upload.")
    }
  }

  const handleCreateDocument = async () => {
    setUploadError(null)
    setUploadSuccess(null)
    if (!newDocument.name || !newDocument.file_url || !newDocument.category || !newDocument.document_type) {
      setUploadError("Please fill all required fields (Name, File, Category, Document Type).")
      return
    }

    try {
      const res = await fetch("/api/documents", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newDocument),
      })

      if (!res.ok) {
        const errorData = await res.json()
        throw new Error(errorData.message || `HTTP error! status: ${res.status}`)
      }

      setUploadSuccess("Document created successfully!")
      setNewDocument({
        name: "",
        file_url: "",
        category: "",
        document_type: "",
        access_level: "Internal",
        tags: [],
        metadata: {},
      })
      fetchDocuments() // Refresh list
    } catch (err: any) {
      setUploadError(err.message || "Failed to create document.")
    }
  }

  const handleDeleteDocument = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this document?")) {
      return
    }
    try {
      const res = await fetch(`/api/documents?id=${id}`, {
        method: "DELETE",
      })

      if (!res.ok) {
        const errorData = await res.json()
        throw new Error(errorData.message || `HTTP error! status: ${res.status}`)
      }

      setUploadSuccess("Document deleted successfully!")
      fetchDocuments() // Refresh list
    } catch (err: any) {
      setUploadError(err.message || "Failed to delete document.")
    }
  }

  const handleDownloadDocument = async (document: Document) => {
    // In a real application, you would trigger a secure download from your storage service
    // For this example, we'll just open the simulated URL.
    window.open(document.file_url, "_blank")

    // Log document access
    if (session?.user?.id) {
      await fetch("/api/documents/log-access", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ documentId: document.id, action: "download" }),
      })
    }
  }

  if (!session) {
    return <div className="flex items-center justify-center h-full">Please sign in to view documents.</div>
  }

  return (
    <div className="flex flex-col gap-6 p-6">
      <h1 className="text-3xl font-bold text-dark-orange-700">Document Management</h1>

      {uploadError && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{uploadError}</AlertDescription>
        </Alert>
      )}
      {uploadSuccess && (
        <Alert>
          <CheckCircle className="h-4 w-4" />
          <AlertTitle>Success</AlertTitle>
          <AlertDescription>{uploadSuccess}</AlertDescription>
        </Alert>
      )}

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <PlusCircle className="h-5 w-5" /> Upload New Document
          </CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <div className="space-y-2">
            <Label htmlFor="documentName">Document Name</Label>
            <Input
              id="documentName"
              placeholder="e.g., Client Contract Q4 2023"
              value={newDocument.name}
              onChange={(e) => handleNewDocumentChange("name", e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="fileUpload">File</Label>
            <Input id="fileUpload" type="file" onChange={handleFileUpload} />
            {newDocument.file_name && (
              <p className="text-sm text-muted-foreground">Selected: {newDocument.file_name}</p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="documentCategory">Category</Label>
            <Select value={newDocument.category} onValueChange={(value) => handleNewDocumentChange("category", value)}>
              <SelectTrigger id="documentCategory">
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                {documentCategories.map((cat) => (
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
            <Label htmlFor="documentType">Document Type</Label>
            <Select
              value={newDocument.document_type}
              onValueChange={(value) => handleNewDocumentChange("document_type", value)}
            >
              <SelectTrigger id="documentType">
                <SelectValue placeholder="Select type" />
              </SelectTrigger>
              <SelectContent>
                {documentTypes.map((type) => (
                  <SelectItem key={type.value} value={type.value}>
                    <div className="flex items-center gap-2">
                      <type.icon className="h-4 w-4" /> {type.label}
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="accessLevel">Access Level</Label>
            <Select
              value={newDocument.access_level}
              onValueChange={(value) => handleNewDocumentChange("access_level", value)}
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
            <Label htmlFor="documentTags">Tags (comma-separated)</Label>
            <Input
              id="documentTags"
              placeholder="e.g., urgent, signed, client-A"
              value={newDocument.tags?.join(", ") || ""}
              onChange={(e) =>
                handleNewDocumentChange(
                  "tags",
                  e.target.value.split(",").map((tag) => tag.trim()),
                )
              }
            />
          </div>
          <div className="space-y-2 md:col-span-2 lg:col-span-3">
            <Label htmlFor="metadata">Metadata (JSON)</Label>
            <Textarea
              id="metadata"
              placeholder='{"version": "1.0", "status": "approved"}'
              value={JSON.stringify(newDocument.metadata, null, 2)}
              onChange={(e) => {
                try {
                  handleNewDocumentChange("metadata", JSON.parse(e.target.value))
                } catch {
                  // Ignore invalid JSON input for now, handle on submit
                }
              }}
            />
          </div>
          <div className="md:col-span-2 lg:col-span-3 flex justify-end">
            <Button onClick={handleCreateDocument} className="bg-dark-orange-500 hover:bg-dark-orange-600">
              <Upload className="mr-2 h-4 w-4" /> Create Document
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Folder className="h-5 w-5" /> All Documents
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-4 flex flex-wrap items-center gap-4">
            <Input
              placeholder="Search documents..."
              className="max-w-sm flex-1"
              value={filters.search}
              onChange={(e) => handleFilterChange("search", e.target.value)}
            />
            <Select value={filters.category} onValueChange={(value) => handleFilterChange("category", value)}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All Categories">All Categories</SelectItem>
                {documentCategories.map((cat) => (
                  <SelectItem key={cat.value} value={cat.value}>
                    {cat.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={filters.document_type} onValueChange={(value) => handleFilterChange("document_type", value)}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All Types">All Types</SelectItem>
                {documentTypes.map((type) => (
                  <SelectItem key={type.value} value={type.value}>
                    {type.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={filters.access_level} onValueChange={(value) => handleFilterChange("access_level", value)}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by Access" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All Access Levels">All Access Levels</SelectItem>
                {accessLevels.map((level) => (
                  <SelectItem key={level.value} value={level.value}>
                    {level.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button
              onClick={() =>
                setFilters({
                  category: "All Categories",
                  document_type: "All Types",
                  access_level: "All Access Levels",
                  search: "",
                })
              }
              variant="outline"
            >
              Reset Filters
            </Button>
          </div>

          {loading ? (
            <div className="text-center py-8">Loading documents...</div>
          ) : error ? (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          ) : documents.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">No documents found.</div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Access</TableHead>
                    <TableHead>Uploaded By</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {documents.map((doc) => {
                    const CategoryIcon = documentCategories.find((c) => c.value === doc.category)?.icon || Folder
                    const TypeIcon = documentTypes.find((t) => t.value === doc.document_type)?.icon || File
                    const AccessIcon = accessLevels.find((a) => a.value === doc.access_level)?.icon || Lock
                    const FileIcon = getFileTypeIcon(doc.file_url)

                    return (
                      <TableRow key={doc.id}>
                        <TableCell className="font-medium flex items-center gap-2">
                          <FileIcon className="h-5 w-5 text-dark-orange-500" />
                          {doc.name}
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline" className="flex items-center gap-1">
                            <CategoryIcon className="h-3 w-3" /> {doc.category}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline" className="flex items-center gap-1">
                            <TypeIcon className="h-3 w-3" /> {doc.document_type}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline" className="flex items-center gap-1">
                            <AccessIcon className="h-3 w-3" /> {doc.access_level}
                          </Badge>
                        </TableCell>
                        <TableCell>{doc.uploaded_by}</TableCell>
                        <TableCell>{format(new Date(doc.created_at), "PPP")}</TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button variant="outline" size="sm" onClick={() => handleDownloadDocument(doc)}>
                              <Download className="h-4 w-4" />
                              <span className="sr-only">Download</span>
                            </Button>
                            <Button variant="destructive" size="sm" onClick={() => handleDeleteDocument(doc.id)}>
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
