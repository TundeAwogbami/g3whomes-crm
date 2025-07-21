import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function DocumentsPage() {
  return (
    <div className="flex min-h-[calc(100vh_-_theme(spacing.16))] flex-1 flex-col p-4 md:p-10">
      <h1 className="text-3xl font-bold mb-6">Documents</h1>
      <Card>
        <CardHeader>
          <CardTitle>Your Documents</CardTitle>
          <CardDescription>Manage all your important documents here.</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Document management features will be implemented here.</p>
          {/* Placeholder for document list, upload, etc. */}
        </CardContent>
      </Card>
    </div>
  )
}
