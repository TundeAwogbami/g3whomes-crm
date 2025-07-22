import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

interface Affiliate {
  id: string
  name: string
  contactPerson: string
  email: string
  phoneNumber: string
  commissionRate: string
}

const affiliates: Affiliate[] = [
  {
    id: "1",
    name: "Partner Solutions Inc.",
    contactPerson: "Alice Smith",
    email: "alice@partner.com",
    phoneNumber: "555-111-2222",
    commissionRate: "10%",
  },
  {
    id: "2",
    name: "Global Connect LLC",
    contactPerson: "Bob Johnson",
    email: "bob@global.com",
    phoneNumber: "555-333-4444",
    commissionRate: "12%",
  },
  {
    id: "3",
    name: "Local Realty Network",
    contactPerson: "Carol White",
    email: "carol@local.com",
    phoneNumber: "555-555-6666",
    commissionRate: "8%",
  },
]

export function AffiliatesTable() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Affiliates</CardTitle>
        <CardDescription>A list of your company's affiliates.</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Contact Person</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Phone</TableHead>
              <TableHead>Commission Rate</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {affiliates.map((affiliate) => (
              <TableRow key={affiliate.id}>
                <TableCell className="font-medium">{affiliate.name}</TableCell>
                <TableCell>{affiliate.contactPerson}</TableCell>
                <TableCell>{affiliate.email}</TableCell>
                <TableCell>{affiliate.phoneNumber}</TableCell>
                <TableCell>{affiliate.commissionRate}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
