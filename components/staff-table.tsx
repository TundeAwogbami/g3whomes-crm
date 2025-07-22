import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface StaffMember {
  id: string
  name: string
  email: string
  role: string
  hireDate: string
  avatarUrl?: string
}

const staffMembers: StaffMember[] = [
  {
    id: "1",
    name: "Jane Smith",
    email: "jane.s@example.com",
    role: "Sales Manager",
    hireDate: "2022-03-01",
    avatarUrl: "/placeholder-user.jpg",
  },
  {
    id: "2",
    name: "Mike Johnson",
    email: "mike.j@example.com",
    role: "Property Agent",
    hireDate: "2022-06-15",
    avatarUrl: "/placeholder-user.jpg",
  },
  {
    id: "3",
    name: "Emily Davis",
    email: "emily.d@example.com",
    role: "Admin Assistant",
    hireDate: "2023-01-10",
    avatarUrl: "/placeholder-user.jpg",
  },
]

export function StaffTable() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Staff Members</CardTitle>
        <CardDescription>A list of all current staff members.</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Hire Date</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {staffMembers.map((member) => (
              <TableRow key={member.id}>
                <TableCell className="flex items-center gap-2">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={member.avatarUrl || "/placeholder.svg"} alt={`@${member.name}`} />
                    <AvatarFallback>
                      {member.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  {member.name}
                </TableCell>
                <TableCell>{member.email}</TableCell>
                <TableCell>{member.role}</TableCell>
                <TableCell>{member.hireDate}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
