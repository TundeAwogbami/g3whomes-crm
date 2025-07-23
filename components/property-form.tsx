"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { useFormStatus } from "react-dom"

interface PropertyFormProps {
  formAction: (formData: FormData) => void
  formState: any
}

export function PropertyForm({ formAction, formState }: PropertyFormProps) {
  const { pending } = useFormStatus()

  return (
    <Card className="w-full max-w-2xl">
      <CardHeader>
        <CardTitle>Add New Property</CardTitle>
        <CardDescription>Fill in the details below to add a new property to your CRM.</CardDescription>
      </CardHeader>
      <form action={formAction}>
        <CardContent className="grid gap-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="address">Address</Label>
              <Input id="address" name="address" placeholder="123 Main St" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="city">City</Label>
              <Input id="city" name="city" placeholder="Anytown" required />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="state">State</Label>
              <Input id="state" name="state" placeholder="CA" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="zip">Zip Code</Label>
              <Input id="zip" name="zip" placeholder="90210" required />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              name="description"
              placeholder="Property description..."
              className="min-h-[100px]"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="price">Price</Label>
              <Input id="price" name="price" type="number" placeholder="500000" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="size">Size (sq ft)</Label>
              <Input id="size" name="size" type="number" placeholder="1500" />
            </div>
          </div>
          {formState?.message && (
            <p className={`text-sm ${formState.success ? "text-green-500" : "text-red-500"}`}>{formState.message}</p>
          )}
        </CardContent>
        <CardFooter className="flex justify-end">
          <Button type="submit" disabled={pending}>
            {pending ? "Adding..." : "Add Property"}
          </Button>
        </CardFooter>
      </form>
    </Card>
  )
}
