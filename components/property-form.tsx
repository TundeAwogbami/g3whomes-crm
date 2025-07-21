"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export function PropertyForm() {
  return (
    <Card className="w-full max-w-2xl">
      <CardHeader>
        <CardTitle>Add New Property</CardTitle>
        <CardDescription>Fill in the details below to add a new property to your CRM.</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="address">Address</Label>
            <Input id="address" placeholder="123 Main St" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="city">City</Label>
            <Input id="city" placeholder="Anytown" required />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="state">State</Label>
            <Input id="state" placeholder="CA" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="zip">Zip Code</Label>
            <Input id="zip" placeholder="90210" required />
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="description">Description</Label>
          <Textarea id="description" placeholder="Property description..." className="min-h-[100px]" />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="price">Price</Label>
            <Input id="price" type="number" placeholder="500000" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="size">Size (sq ft)</Label>
            <Input id="size" type="number" placeholder="1500" />
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-end">
        <Button type="submit">Add Property</Button>
      </CardFooter>
    </Card>
  )
}
