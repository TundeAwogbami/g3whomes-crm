"use client"

import type React from "react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Upload, Download, FileText } from "lucide-react"
import { useState, useRef, useEffect } from "react"
import { uploadDocument, getDocuments } from "@/app/documents/action" // Import actions
import { useFormState, useFormStatus } from "react-dom" // Correct import for useFormState and useFormStatus
import { Input } from "@/components/ui/input"
import { useSession } from "next-auth/react" // To get current user for uploadedBy
import { createBrowserClient } from "@supabase/ssr"

interface Document {
  id: string
  name: string
  type: string
  uploaded_by: string
  uploaded_at: string
  storage_path: string
  size: number
}

export function DocumentsList() {
  const { data: session } = useSession()
  const [file, setFile] = useState<File | null>(null)
  const [fileName, setFileName] = useState<string>("")
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [documents, setDocuments] = useState<Document[]>([])
  const { pending } = useFormStatus() // Get pending status
  const [state, formAction] = useFormState(uploadDocument, null) // Use useFormState

  useEffect(() => {
    const fetchDocs = async () => {
      const fetchedDocuments = await getDocuments()
      setDocuments(fetchedDocuments)
    }
    fetchDocs()
  }, [state]) // Re-fetch when upload state changes

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0]
      setFile(selectedFile)
      setFileName(selectedFile.name)
    } else {
      setFile(null)
      setFileName("")
    }
  }

  const handleSubmit = async (formData: FormData) => {
    if (!file) {
      alert("Please select a file to upload.")
      return
    }
    formData.append("file", file)
    formData.append("fileName", fileName)
    formData.append("uploadedBy", session?.user?.name || session?.user?.email || "Unknown")
    await formAction(formData)
    setFile(null)
    setFileName("")
    if (fileInputRef.current) {
      fileInputRef.current.value = "" // Clear file input
    }
  }

  const handleDownload = (path: string) => {
    const supabase = createBrowserClient()
    const { data } = supabase.storage.from("documents").getPublicUrl(path)
    if (data?.publicUrl) {
      window.open(data.publicUrl, "_blank")
    } else {
      alert("Could not get download URL.")
    }
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle>Documents</CardTitle>
        <form action={handleSubmit} className="flex items-center gap-2">
          <Input
            type="file"
            onChange={handleFileChange}
            ref={fileInputRef}
            className="max-w-[200px] text-sm"
            disabled={pending}
          />
          <Button type="submit" size="sm" className="gap-1" disabled={pending || !file}>
            <Upload className="h-4 w-4" />
            {pending ? "Uploading..." : "Upload Document"}
          </Button>
        </form>
      </CardHeader>
      <CardContent>
        {state?.message && (
          <p className={`mb-4 text-sm ${state.success ? "text-green-500" : "text-red-500"}`}>{state.message}</p>
        )}
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Size</TableHead>
              <TableHead>Uploaded By</TableHead>
              <TableHead>Upload Date</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {documents.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center text-muted-foreground">
                  No documents uploaded yet.
                </TableCell>
              </TableRow>
            ) : (
              documents.map((doc) => (
                <TableRow key={doc.id}>
                  <TableCell className="font-medium flex items-center gap-2">
                    <FileText className="h-4 w-4 text-muted-foreground" />
                    {doc.name}
                  </TableCell>
                  <TableCell>{doc.type.split("/").pop()}</TableCell>
                  <TableCell>{(doc.size / 1024).toFixed(2)} KB</TableCell>
                  <TableCell>{doc.uploaded_by}</TableCell>
                  <TableCell>{new Date(doc.uploaded_at).toLocaleDateString()}</TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="icon" onClick={() => handleDownload(doc.storage_path)}>
                      <Download className="h-4 w-4" />
                      <span className="sr-only">Download</span>
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
