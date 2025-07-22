import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Upload, Download } from "lucide-react"

interface Document {
  id: string
  name: string
  type: string
  uploadedBy: string
  uploadDate: string
}

const documents: Document[] = [
  { id: "1", name: "Client Agreement - John Doe", type: "PDF", uploadedBy: "John Doe", uploadDate: "2023-01-15" },
  { id: "2", name: "Property Listing - 123 Oak St", type: "PDF", uploadedBy: "Jane Smith", uploadDate: "2023-02-20" },
  { id: "3", name: "Financial Report Q1 2023", type: "XLSX", uploadedBy: "Admin", uploadDate: "2023-04-01" },
]

export function DocumentsList() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle>Documents</CardTitle>
        <Button size="sm" className="gap-1">
          <Upload className="h-4 w-4" />
          Upload Document
        </Button>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Uploaded By</TableHead>
              <TableHead>Upload Date</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {documents.map((doc) => (
              <TableRow key={doc.id}>
                <TableCell className="font-medium">{doc.name}</TableCell>
                <TableCell>{doc.type}</TableCell>
                <TableCell>{doc.uploadedBy}</TableCell>
                <TableCell>{doc.uploadDate}</TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="icon">
                    <Download className="h-4 w-4" />
                    <span className="sr-only">Download</span>
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
