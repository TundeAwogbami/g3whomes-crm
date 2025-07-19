"use client"

import { useState, useEffect } from "react"
import { useSession } from "next-auth/react"
import { Card, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { useToast } from "@/hooks/use-toast"
import { Loader2 } from "lucide-react"

export default function ProfilePage() {
  const { data: session, status, update } = useSession()
  const { toast } = useToast()

  const [isEditing, setIsEditing] = useState(false)
  const [name, setName] = useState(session?.user?.name || "")
  const [email, setEmail] = useState(session?.user?.email || "")
  const [phone, setPhone] = useState("")
  const [address, setAddress] = useState("")
  const [bio, setBio] = useState("")
  const [company, setCompany] = useState("")
  const [title, setTitle] = useState("")
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (status === "authenticated" && session?.user) {
      setName(session.user.name || "")
      setEmail(session.user.email || "")
      // In a real app, you'd fetch these from a database
      setPhone("123-456-7890")
      setAddress("123 Main St, Anytown, USA")
      setBio("Experienced real estate agent passionate about helping clients find their dream homes.")
      setCompany("Acme Realty")
      setTitle("Senior Agent")
    }
  }, [session, status])

  const handleSave = async () => {
    setLoading(true)
    try {
      // In a real application, you would send this data to your backend
      // For this example, we'll simulate an update and then update the session
      await new Promise((resolve) => setTimeout(resolve, 1000)) // Simulate API call

      // Update the session with new name if it changed
      if (session?.user?.name !== name) {
        await update({ user: { name } })
      }

      toast({
        title: "Profile Updated",
        description: "Your profile information has been saved.",
      })
      setIsEditing(false)
    } catch (error) {
      console.error("Failed to save profile:", error)
      toast({
        title: "Error",
        description: "Failed to save profile. Please try again.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  if (status === "loading") {
    return (
      <div className="flex flex-1 items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-dark-orange-500" />
      </div>
    )
  }

  if (!session) {
    return (
      <div className="flex flex-1 items-center justify-center">
        <p>Please sign in to view your profile.</p>
      </div>
    )
  }

  return (
    <div className="flex flex-1 flex-col p-4 md:p-6">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-semibold">Profile</h1>
        {isEditing ? (
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => setIsEditing(false)} disabled={loading}>
              Cancel
            </Button>
            <Button onClick={handleSave} disabled={loading} className="bg-dark-orange-500 hover:bg-dark-orange-600">
              {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
              Save
            </Button>
          </div>
        ) : (
          <Button onClick={() => setIsEditing(true)} className="bg-dark-orange-500 hover:bg-dark-orange-600">
            Edit Profile
          </Button>
        )}
      </div>

      <Card>
        <CardContent className="p-6 grid gap-6">
          <div className="flex items-center gap-4">
            <Avatar className="h-20 w-20">
              <AvatarImage src={session.user?.image || "/placeholder-user.jpg"} />
              <AvatarFallback>{session.user?.name?.[0] || "U"}</AvatarFallback>
            </Avatar>
            <div>
              <h2 className="text-xl font-bold">{session.user?.name}</h2>
              <p className="text-muted-foreground">{session.user?.email}</p>
              <Badge variant="secondary" className="mt-1 capitalize">
                {session.user?.role}
              </Badge>
            </div>
          </div>

          <Separator />

          <div className="grid gap-4">
            <h3 className="text-lg font-semibold">Personal Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Name</Label>
                <Input id="name" value={name} onChange={(e) => setName(e.target.value)} disabled={!isEditing} />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={!isEditing}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="phone">Phone</Label>
                <Input id="phone" value={phone} onChange={(e) => setPhone(e.target.value)} disabled={!isEditing} />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="address">Address</Label>
                <Input
                  id="address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  disabled={!isEditing}
                />
              </div>
            </div>
          </div>

          <Separator />

          <div className="grid gap-4">
            <h3 className="text-lg font-semibold">Professional Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="company">Company</Label>
                <Input
                  id="company"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  disabled={!isEditing}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="title">Title</Label>
                <Input id="title" value={title} onChange={(e) => setTitle(e.target.value)} disabled={!isEditing} />
              </div>
            </div>
          </div>

          <Separator />

          <div className="grid gap-4">
            <h3 className="text-lg font-semibold">Bio</h3>
            <Textarea
              id="bio"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              disabled={!isEditing}
              className="min-h-[120px]"
            />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
