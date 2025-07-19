"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"
import { createProperty, updateProperty } from "@/lib/api"
import type { Property } from "@/lib/types"
import { NairaInput } from "@/components/ui/naira-input"

interface PropertyFormProps {
  initialData?: Property
}

export function PropertyForm({ initialData }: PropertyFormProps) {
  const [address, setAddress] = useState(initialData?.address || "")
  const [city, setCity] = useState(initialData?.city || "")
  const [state, setState] = useState(initialData?.state || "")
  const [zipCode, setZipCode] = useState(initialData?.zip_code || "")
  const [price, setPrice] = useState<number>(initialData?.price || 0)
  const [status, setStatus] = useState(initialData?.status || "For Sale")
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      const propertyData = {
        address,
        city,
        state,
        zip_code: zipCode,
        price,
        status,
      }

      if (initialData) {
        await updateProperty(initialData.id, propertyData)
        toast({
          title: "Success!",
          description: "Property updated successfully.",
        })
      } else {
        await createProperty(propertyData)
        toast({
          title: "Success!",
          description: "Property added successfully.",
        })
      }
      router.push("/properties")
      router.refresh()
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to save property.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4">
      <div>
        <Label htmlFor="address">Address</Label>
        <Textarea id="address" value={address} onChange={(e) => setAddress(e.target.value)} required rows={3} />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="city">City</Label>
          <Input id="city" value={city} onChange={(e) => setCity(e.target.value)} />
        </div>
        <div>
          <Label htmlFor="state">State</Label>
          <Input id="state" value={state} onChange={(e) => setState(e.target.value)} />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="zipCode">Zip Code</Label>
          <Input id="zipCode" value={zipCode} onChange={(e) => setZipCode(e.target.value)} />
        </div>
        <div>
          <Label htmlFor="price">Price</Label>
          <NairaInput id="price" value={price} onValueChange={setPrice} type="number" required />
        </div>
      </div>
      <div>
        <Label htmlFor="status">Status</Label>
        <Select value={status} onValueChange={setStatus}>
          <SelectTrigger>
            <SelectValue placeholder="Select status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="For Sale">For Sale</SelectItem>
            <SelectItem value="Under Contract">Under Contract</SelectItem>
            <SelectItem value="Sold">Sold</SelectItem>
            <SelectItem value="Off Market">Off Market</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <Button type="submit" disabled={loading}>
        {loading ? "Saving..." : initialData ? "Update Property" : "Add Property"}
      </Button>
    </form>
  )
}
