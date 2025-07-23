"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { useFormStatus } from "react-dom" // Import useFormStatus

interface ClientFormProps {
  formAction: (formData: FormData) => void
  formState: any
}

export function ClientForm({ formAction, formState }: ClientFormProps) {
  const { pending } = useFormStatus()

  return (
    <Card className="w-full max-w-2xl">
      <CardHeader>
        <CardTitle>Add New Client</CardTitle>
        <CardDescription>Fill in the details below to add a new client to your CRM.</CardDescription>
      </CardHeader>
      <form action={formAction}>
        {" "}
        {/* Wrap content in form and pass action */}
        <CardContent className="grid gap-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="firstName">First Name</Label>
              <Input id="firstName" name="firstName" placeholder="John" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName">Last Name</Label>
              <Input id="lastName" name="lastName" placeholder="Doe" required />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" name="email" type="email" placeholder="john.doe@example.com" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone">Phone Number</Label>
            <Input id="phone" name="phone" type="tel" placeholder="+1 (555) 123-4567" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="address">Address</Label>
            <Input id="address" name="address" placeholder="123 Main St, Anytown, USA" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="notes">Notes</Label>
            <Textarea
              id="notes"
              name="notes"
              placeholder="Any additional notes about the client..."
              className="min-h-[100px]"
            />
          </div>
          {formState?.message && (
            <p className={`text-sm ${formState.success ? "text-green-500" : "text-red-500"}`}>{formState.message}</p>
          )}
        </CardContent>
        <CardFooter className="flex justify-end">
          <Button type="submit" disabled={pending}>
            {pending ? "Adding..." : "Add Client"}
          </Button>
        </CardFooter>
      </form>
    </Card>
  )
}
