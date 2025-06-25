"use client"

import type React from "react"

import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus, Loader2 } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface AddClientModalProps {
  onClientAdded?: () => void
}

export function AddClientModal({ onClientAdded }: AddClientModalProps) {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const { toast } = useToast()

  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    type: "lead",
    status: "lead",
    address: "",
    city: "",
    state: "",
    zip_code: "",
    notes: "",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const response = await fetch("/api/contacts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        throw new Error("Failed to create contact")
      }

      toast({
        title: "Success!",
        description: "Client has been added successfully.",
      })

      // Reset form
      setFormData({
        first_name: "",
        last_name: "",
        email: "",
        phone: "",
        type: "lead",
        status: "lead",
        address: "",
        city: "",
        state: "",
        zip_code: "",
        notes: "",
      })

      setOpen(false)
      onClientAdded?.()
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add client. Please try again.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          Add Client
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add New Client</DialogTitle>
          <DialogDescription>Create a new client record in your CRM system.</DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="first_name">First Name *</Label>
              <Input
                id="first_name"
                value={formData.first_name}
                onChange={(e) => handleInputChange("first_name", e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="last_name">Last Name *</Label>
              <Input
                id="last_name"
                value={formData.last_name}
                onChange={(e) => handleInputChange("last_name", e.target.value)}
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone</Label>
              <Input
                id="phone"
                value={formData.phone}
                onChange={(e) => handleInputChange("phone", e.target.value)}
                placeholder="+234 xxx xxx xxxx"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="type">Client Type</Label>
              <Select value={formData.type} onValueChange={(value) => handleInputChange("type", value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="buyer">Buyer</SelectItem>
                  <SelectItem value="seller">Seller</SelectItem>
                  <SelectItem value="investor">Investor</SelectItem>
                  <SelectItem value="lead">Lead</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="status">Status</Label>
              <Select value={formData.status} onValueChange={(value) => handleInputChange("status", value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="lead">Lead</SelectItem>
                  <SelectItem value="qualified">Qualified</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="address">Address</Label>
            <Input
              id="address"
              value={formData.address}
              onChange={(e) => handleInputChange("address", e.target.value)}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="city">City</Label>
              <Input id="city" value={formData.city} onChange={(e) => handleInputChange("city", e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="state">State</Label>
              <Select value={formData.state} onValueChange={(value) => handleInputChange("state", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select state" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Lagos">Lagos</SelectItem>
                  <SelectItem value="FCT">FCT (Abuja)</SelectItem>
                  <SelectItem value="Rivers">Rivers</SelectItem>
                  <SelectItem value="Ogun">Ogun</SelectItem>
                  <SelectItem value="Kano">Kano</SelectItem>
                  <SelectItem value="Kaduna">Kaduna</SelectItem>
                  <SelectItem value="Oyo">Oyo</SelectItem>
                  <SelectItem value="Delta">Delta</SelectItem>
                  <SelectItem value="Edo">Edo</SelectItem>
                  <SelectItem value="Anambra">Anambra</SelectItem>
                  <SelectItem value="Plateau">Plateau</SelectItem>
                  <SelectItem value="Osun">Osun</SelectItem>
                  <SelectItem value="Bauchi">Bauchi</SelectItem>
                  <SelectItem value="Borno">Borno</SelectItem>
                  <SelectItem value="Taraba">Taraba</SelectItem>
                  <SelectItem value="Cross River">Cross River</SelectItem>
                  <SelectItem value="Benue">Benue</SelectItem>
                  <SelectItem value="Kwara">Kwara</SelectItem>
                  <SelectItem value="Jigawa">Jigawa</SelectItem>
                  <SelectItem value="Katsina">Katsina</SelectItem>
                  <SelectItem value="Sokoto">Sokoto</SelectItem>
                  <SelectItem value="Kebbi">Kebbi</SelectItem>
                  <SelectItem value="Niger">Niger</SelectItem>
                  <SelectItem value="Kogi">Kogi</SelectItem>
                  <SelectItem value="Nasarawa">Nasarawa</SelectItem>
                  <SelectItem value="Yobe">Yobe</SelectItem>
                  <SelectItem value="Ebonyi">Ebonyi</SelectItem>
                  <SelectItem value="Ondo">Ondo</SelectItem>
                  <SelectItem value="Ekiti">Ekiti</SelectItem>
                  <SelectItem value="Adamawa">Adamawa</SelectItem>
                  <SelectItem value="Akwa Ibom">Akwa Ibom</SelectItem>
                  <SelectItem value="Imo">Imo</SelectItem>
                  <SelectItem value="Bayelsa">Bayelsa</SelectItem>
                  <SelectItem value="Gombe">Gombe</SelectItem>
                  <SelectItem value="Zamfara">Zamfara</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="zip_code">Zip Code</Label>
              <Input
                id="zip_code"
                value={formData.zip_code}
                onChange={(e) => handleInputChange("zip_code", e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes">Notes</Label>
            <Textarea
              id="notes"
              value={formData.notes}
              onChange={(e) => handleInputChange("notes", e.target.value)}
              rows={3}
            />
          </div>

          <div className="flex justify-end space-x-2 pt-4">
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={loading}>
              {loading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
              Add Client
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
