"use client"

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
    category: "",
    document_type: "",
    access_level: "Internal",
    tags: [],
    metadata: {},
  })
  const [isAddDocumentDialogOpen, setIsAddDocumentDialogOpen] = React.useState(false)

  React.useEffect(() => {
    if (session?.user) {
      fetchDocuments()
    }
  }, [session])

  const fetchDocuments = async () => {
    setLoading(true)
    try {
      const queryParams = new URLSearchParams()
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
    } finally {
      setLoading(false)
    }
  }

  const handleAddDocument = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!session?.user) {
      toast({
        title: "Unauthorized",
        description: "Please sign in to add documents.",
        variant: "destructive",
      })
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
    }
  }

  const handleDeleteDocument = async (id: string) => {
    if (!session?.user) {
      toast({
        title: "Unauthorized",
        description: "Please sign in to delete documents.",
        variant: "destructive",
      })
      return
    }

    if (!confirm("Are you sure you want to delete this document?")) {
      return
    }

    try {
      const res = await fetch(`/api/documents?id=${id}`, {
        method: "DELETE",
      })

      if (!res.ok) {
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
      })
      console.error("Error deleting document:", error)
    }
  }

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
    </div>
  )
}
