"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useFormStatus } from "react-dom"
import { useState } from "react"

interface TaskFormProps {
  formAction: (formData: FormData) => void
  formState: any
}

export function TaskForm({ formAction, formState }: TaskFormProps) {
  const { pending } = useFormStatus()
  const [selectedPriority, setSelectedPriority] = useState<string>("medium")

  return (
    <Card className="w-full max-w-2xl">
      <CardHeader>
        <CardTitle>Add New Task</CardTitle>
        <CardDescription>Create a new task for your team or yourself.</CardDescription>
      </CardHeader>
      <form action={formAction}>
        <CardContent className="grid gap-4">
          <div className="space-y-2">
            <Label htmlFor="taskName">Task Name</Label>
            <Input id="taskName" name="taskName" placeholder="Follow up with John Doe" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="dueDate">Due Date</Label>
            <Input id="dueDate" name="dueDate" type="date" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="assignedTo">Assigned To</Label>
            <Input id="assignedTo" name="assignedTo" placeholder="Jane Smith" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="priority">Priority</Label>
            <Select name="priority" value={selectedPriority} onValueChange={setSelectedPriority}>
              <SelectTrigger id="priority">
                <SelectValue placeholder="Select priority" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="low">Low</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="high">High</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              name="description"
              placeholder="Details about the task..."
              className="min-h-[100px]"
            />
          </div>
          {formState?.message && (
            <p className={`text-sm ${formState.success ? "text-green-500" : "text-red-500"}`}>{formState.message}</p>
          )}
        </CardContent>
        <CardFooter className="flex justify-end">
          <Button type="submit" disabled={pending}>
            {pending ? "Adding..." : "Add Task"}
          </Button>
        </CardFooter>
      </form>
    </Card>
  )
}
