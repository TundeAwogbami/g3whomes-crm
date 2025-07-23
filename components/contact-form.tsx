"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { useFormStatus } from "react-dom"

interface ContactFormProps {
  formAction: (formData: FormData) => void
  formState: any
}

export function ContactForm({ formAction, formState }: ContactFormProps) {
  const { pending } = useFormStatus()

  return (
    <Card className="w-full max-w-2xl">
      <CardHeader>
        <CardTitle>Add New Contact</CardTitle>
        <CardDescription>Enter details for a new contact.</CardDescription>
      </CardHeader>
      <form action={formAction}>
        <CardContent className="grid gap-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="firstName">First Name</Label>
              <Input id="firstName" name="firstName" placeholder="Jane" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName">Last Name</Label>
              <Input id="lastName" name="lastName" placeholder="Doe" required />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" name="email" type="email" placeholder="jane.doe@example.com" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone">Phone Number</Label>
            <Input id="phone" name="phone" type="tel" placeholder="+1 (555) 987-6543" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="company">Company</Label>
            <Input id="company" name="company" placeholder="ABC Realty" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="notes">Notes</Label>
            <Textarea
              id="notes"
              name="notes"
              placeholder="Any relevant notes about the contact..."
              className="min-h-[100px]"
            />
          </div>
          {formState?.message && (
            <p className={`text-sm ${formState.success ? "text-green-500" : "text-red-500"}`}>{formState.message}</p>
          )}
        </CardContent>
        <CardFooter className="flex justify-end">
          <Button type="submit" disabled={pending}>
            {pending ? "Adding..." : "Add Contact"}
          </Button>
        </CardFooter>
      </form>
    </Card>
  )
}
