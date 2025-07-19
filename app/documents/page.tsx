"use client"

<<<<<<< HEAD
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
=======
import { Skeleton } from "@/components/ui/skeleton"

import * as React from "react"
import { Plus, Search, FileText, ImageIcon, Video, Music, File, Download, Trash2, Eye } from "lucide-react"
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
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import type { Document } from "@/lib/db-supabase"

const documentCategories = ["Client", "Staff", "Affiliate", "Property", "Company"]
const documentTypes = ["Contract", "Medical", "Financial", "Identity", "Property", "Legal", "Insurance", "Tax"]
const accessLevels = ["Public", "Internal", "Confidential", "Restricted"]

export default function DocumentsPage() {
  const { data: session } = useSession()
  const router = useRouter()
  const { toast } = useToast()

  const [documents, setDocuments] = React.useState<Document[]>([])
  const [loading, setLoading] = React.useState(true)
  const [searchTerm, setSearchTerm] = React.useState("")
  const [selectedCategory, setSelectedCategory] = React.useState<string | undefined>(undefined)
  const [selectedDocumentType, setSelectedDocumentType] = React.useState<string | undefined>(undefined)
  const [newDocument, setNewDocument] = React.useState({
    name: "",
    file_url: "", // In a real app, this would be handled by file upload to storage
    file_type: "",
    file_size: 0,
>>>>>>> parent of 02a07d6 (Changes)
    category: "",
    document_type: "",
    access_level: "Internal",
    tags: [],
    metadata: {},
  })
<<<<<<< HEAD
  const [uploadError, setUploadError] = useState<string | null>(null)
  const [uploadSuccess, setUploadSuccess] = useState<string | null>(null)
=======
  const [isAddDocumentDialogOpen, setIsAddDocumentDialogOpen] = React.useState(false)

  React.useEffect(() => {
    if (session?.user) {
      fetchDocuments()
    }
  }, [session])
>>>>>>> parent of 02a07d6 (Changes)

  const fetchDocuments = async () => {
    setLoading(true)
    setError(null)
    try {
      const queryParams = new URLSearchParams()
<<<<<<< HEAD
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
=======
      if (selectedCategory) queryParams.append("category", selectedCategory)
      if (selectedDocumentType) queryParams.append("document_type", selectedDocumentType)
      if (searchTerm) queryParams.append("search", searchTerm)

      const res = await fetch(`/api/documents?${queryParams.toString()}`)
      if (!res.ok) {
        throw new Error("Failed to fetch documents")
      }
      const data = await res.json()
      setDocuments(data)
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load documents.",
        variant: "destructive",
      })
      console.error("Error fetching documents:", error)
>>>>>>> parent of 02a07d6 (Changes)
    } finally {
      setLoading(false)
    }
  }

<<<<<<< HEAD
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
=======
  const handleAddDocument = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!session?.user) {
      toast({
        title: "Unauthorized",
        description: "Please sign in to add documents.",
        variant: "destructive",
      })
>>>>>>> parent of 02a07d6 (Changes)
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
<<<<<<< HEAD
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
=======
        throw new Error("Failed to add document")
      }

      toast({
        title: "Success",
        description: "Document added successfully.",
      })
      setIsAddDocumentDialogOpen(false)
      setNewDocument({
        name: "",
        file_url: "",
        file_type: "",
        file_size: 0,
        category: "",
        document_type: "",
        access_level: "Internal",
        tags: [],
        metadata: {},
      })
      fetchDocuments()
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add document.",
        variant: "destructive",
      })
      console.error("Error adding document:", error)
>>>>>>> parent of 02a07d6 (Changes)
    }
  }

  const handleDeleteDocument = async (id: string) => {
<<<<<<< HEAD
    if (!window.confirm("Are you sure you want to delete this document?")) {
=======
    if (!session?.user) {
      toast({
        title: "Unauthorized",
        description: "Please sign in to delete documents.",
        variant: "destructive",
      })
      return
    }

    if (!confirm("Are you sure you want to delete this document?")) {
>>>>>>> parent of 02a07d6 (Changes)
      return
    }
    try {
      const res = await fetch(`/api/documents?id=${id}`, {
        method: "DELETE",
      })

      if (!res.ok) {
<<<<<<< HEAD
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
=======
        throw new Error("Failed to delete document")
      }

      toast({
        title: "Success",
        description: "Document deleted successfully.",
      })
      fetchDocuments()
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete document.",
        variant: "destructive",
>>>>>>> parent of 02a07d6 (Changes)
      })
      console.error("Error deleting document:", error)
    }
  }

<<<<<<< HEAD
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
=======
  const handleLogAccess = async (documentId: string, action: string) => {
    if (!session?.user) return // Don't log if not authenticated

    try {
      await fetch("/api/documents", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ documentId, action }),
      })
    } catch (error) {
      console.error("Failed to log document access:", error)
    }
  }

  const getFileIcon = (fileType: string) => {
    if (fileType.includes("pdf")) return <FileText className="h-5 w-5 text-red-500" />
    if (fileType.includes("image")) return <ImageIcon className="h-5 w-5 text-blue-500" />
    if (fileType.includes("video")) return <Video className="h-5 w-5 text-purple-500" />
    if (fileType.includes("audio")) return <Music className="h-5 w-5 text-green-500" />
    return <File className="h-5 w-5 text-gray-500" />
  }

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes"
    const k = 1024
    const sizes = ["Bytes", "KB", "MB", "GB", "TB"]
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
  }

  return (
    <div className="flex flex-col gap-6 p-4 lg:p-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Documents</h1>
        <Dialog open={isAddDocumentDialogOpen} onOpenChange={setIsAddDocumentDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" /> Add Document
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Add New Document</DialogTitle>
              <DialogDescription>Fill in the details for the new document.</DialogDescription>
            </DialogHeader>
            <form onSubmit={handleAddDocument} className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Name
                </Label>
                <Input
                  id="name"
                  value={newDocument.name}
                  onChange={(e) => setNewDocument({ ...newDocument, name: e.target.value })}
                  className="col-span-3"
                  required
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="file_url" className="text-right">
                  File URL
                </Label>
                <Input
                  id="file_url"
                  value={newDocument.file_url}
                  onChange={(e) => setNewDocument({ ...newDocument, file_url: e.target.value })}
                  className="col-span-3"
                  placeholder="e.g., https://example.com/doc.pdf"
                  required
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="file_type" className="text-right">
                  File Type
                </Label>
                <Input
                  id="file_type"
                  value={newDocument.file_type}
                  onChange={(e) => setNewDocument({ ...newDocument, file_type: e.target.value })}
                  className="col-span-3"
                  placeholder="e.g., application/pdf"
                  required
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="file_size" className="text-right">
                  File Size (Bytes)
                </Label>
                <Input
                  id="file_size"
                  type="number"
                  value={newDocument.file_size}
                  onChange={(e) => setNewDocument({ ...newDocument, file_size: Number.parseInt(e.target.value) || 0 })}
                  className="col-span-3"
                  required
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="category" className="text-right">
                  Category
                </Label>
                <Select
                  onValueChange={(value) => setNewDocument({ ...newDocument, category: value })}
                  value={newDocument.category}
                  required
                >
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    {documentCategories.map((cat) => (
                      <SelectItem key={cat} value={cat}>
                        {cat}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="document_type" className="text-right">
                  Document Type
                </Label>
                <Select
                  onValueChange={(value) => setNewDocument({ ...newDocument, document_type: value })}
                  value={newDocument.document_type}
                  required
                >
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select a document type" />
                  </SelectTrigger>
                  <SelectContent>
                    {documentTypes.map((type) => (
                      <SelectItem key={type} value={type}>
                        {type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="access_level" className="text-right">
                  Access Level
                </Label>
                <Select
                  onValueChange={(value) =>
                    setNewDocument({
                      ...newDocument,
                      access_level: value as "Public" | "Internal" | "Confidential" | "Restricted",
                    })
                  }
                  value={newDocument.access_level}
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
                  value={newDocument.tags.join(", ")}
                  onChange={(e) =>
                    setNewDocument({ ...newDocument, tags: e.target.value.split(",").map((tag) => tag.trim()) })
                  }
                  className="col-span-3"
                />
              </div>
              <DialogFooter>
                <Button type="submit">Add Document</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
          <Input
            placeholder="Search documents..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") fetchDocuments()
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
            {documentCategories.map((cat) => (
              <SelectItem key={cat} value={cat}>
                {cat}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select onValueChange={setSelectedDocumentType} value={selectedDocumentType}>
          <SelectTrigger className="w-full md:w-[180px]">
            <SelectValue placeholder="Filter by Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Types</SelectItem>
            {documentTypes.map((type) => (
              <SelectItem key={type} value={type}>
                {type}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Button onClick={fetchDocuments}>Apply Filters</Button>
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
      ) : documents.length === 0 ? (
        <div className="text-center text-gray-500 py-10">No documents found.</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {documents.map((doc) => (
            <Card key={doc.id}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-lg font-medium flex items-center gap-2">
                  {getFileIcon(doc.file_type)} {doc.name}
                </CardTitle>
                <Badge variant="secondary">{doc.access_level}</Badge>
              </CardHeader>
              <CardContent className="space-y-2">
                <p className="text-sm text-gray-500">Category: {doc.category}</p>
                <p className="text-sm text-gray-500">Type: {doc.document_type}</p>
                <p className="text-sm text-gray-500">Size: {formatFileSize(doc.file_size)}</p>
                <div className="flex flex-wrap gap-1">
                  {doc.tags.map((tag, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
                <div className="flex gap-2 mt-4">
                  <Button variant="outline" size="sm" asChild onClick={() => handleLogAccess(doc.id, "view")}>
                    <a href={doc.file_url} target="_blank" rel="noopener noreferrer">
                      <Eye className="h-4 w-4 mr-1" /> View
                    </a>
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => handleLogAccess(doc.id, "download")}>
                    <Download className="h-4 w-4 mr-1" /> Download
                  </Button>
                  <Button variant="destructive" size="sm" onClick={() => handleDeleteDocument(doc.id)}>
                    <Trash2 className="h-4 w-4 mr-1" /> Delete
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
>>>>>>> parent of 02a07d6 (Changes)
    </div>
  )
}
