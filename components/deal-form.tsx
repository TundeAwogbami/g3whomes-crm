"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useFormStatus } from "react-dom"
import { useState } from "react"

interface DealFormProps {
  formAction: (formData: FormData) => void
  formState: any
}

export function DealForm({ formAction, formState }: DealFormProps) {
  const { pending } = useFormStatus()
  const [selectedStage, setSelectedStage] = useState<string>("lead")

  return (
    <Card className="w-full max-w-2xl">
      <CardHeader>
        <CardTitle>Add New Deal</CardTitle>
        <CardDescription>Enter details for a new property deal.</CardDescription>
      </CardHeader>
      <form action={formAction}>
        <CardContent className="grid gap-4">
          <div className="space-y-2">
            <Label htmlFor="dealName">Deal Name</Label>
            <Input id="dealName" name="dealName" placeholder="Sale of 123 Oak St" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="client">Client</Label>
            <Input id="client" name="client" placeholder="John Doe" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="property">Property</Label>
            <Input id="property" name="property" placeholder="123 Oak St" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="value">Deal Value (NGN)</Label>
              <Input id="value" name="value" type="number" placeholder="15000000" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="stage">Stage</Label>
              <Select name="stage" value={selectedStage} onValueChange={setSelectedStage}>
                <SelectTrigger id="stage">
                  <SelectValue placeholder="Select stage" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="lead">Lead</SelectItem>
                  <SelectItem value="qualified">Qualified</SelectItem>
                  <SelectItem value="negotiation">Negotiation</SelectItem>
                  <SelectItem value="closed">Closed</SelectItem>
                  <SelectItem value="lost">Lost</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="notes">Notes</Label>
            <Textarea
              id="notes"
              name="notes"
              placeholder="Any specific terms or conditions..."
              className="min-h-[100px]"
            />
          </div>
          {formState?.message && (
            <p className={`text-sm ${formState.success ? "text-green-500" : "text-red-500"}`}>{formState.message}</p>
          )}
        </CardContent>
        <CardFooter className="flex justify-end">
          <Button type="submit" disabled={pending}>
            {pending ? "Adding..." : "Add Deal"}
          </Button>
        </CardFooter>
      </form>
    </Card>
  )
}
