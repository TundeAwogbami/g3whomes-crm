import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface FinancialRecord {
  id: string
  date: string
  type: "income" | "expense" | "investment"
  description: string
  amount: number
  currency: string
  category: string
}

const financialRecords: FinancialRecord[] = [
  {
    id: "1",
    date: "2023-07-01",
    type: "income",
    description: "Property Sale - 123 Oak St",
    amount: 15000000,
    currency: "NGN",
    category: "Sales",
  },
  {
    id: "2",
    date: "2023-07-05",
    type: "expense",
    description: "Office Rent",
    amount: 500000,
    currency: "NGN",
    category: "Operations",
  },
  {
    id: "3",
    date: "2023-07-10",
    type: "income",
    description: "Consulting Fee - ABC Corp",
    amount: 2500000,
    currency: "NGN",
    category: "Services",
  },
  {
    id: "4",
    date: "2023-07-12",
    type: "expense",
    description: "Marketing Campaign",
    amount: 1200000,
    currency: "NGN",
    category: "Marketing",
  },
  {
    id: "5",
    date: "2023-07-15",
    type: "investment",
    description: "New Property Acquisition",
    amount: 50000000,
    currency: "NGN",
    category: "Assets",
  },
]

export function FinancialRecordsTable() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Financial Records</CardTitle>
        <CardDescription>Overview of company income, expenses, and investments.</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Description</TableHead>
              <TableHead className="text-right">Amount</TableHead>
              <TableHead>Category</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {financialRecords.map((record) => (
              <TableRow key={record.id}>
                <TableCell>{record.date}</TableCell>
                <TableCell>
                  <Badge
                    variant={
                      record.type === "income" ? "default" : record.type === "expense" ? "destructive" : "secondary"
                    }
                  >
                    {record.type.charAt(0).toUpperCase() + record.type.slice(1)}
                  </Badge>
                </TableCell>
                <TableCell>{record.description}</TableCell>
                <TableCell className="text-right">
                  {record.currency} {record.amount.toLocaleString()}
                </TableCell>
                <TableCell>{record.category}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
