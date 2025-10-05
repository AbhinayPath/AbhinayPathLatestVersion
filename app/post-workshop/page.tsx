"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { toast } from "sonner"
import { GraduationCap, Calendar, MapPin, Upload, Eye, Send, DollarSign, LinkIcon, Mail, Phone } from "lucide-react"

export default function PostWorkshopPage() {
  const router = useRouter()
  const [saving, setSaving] = useState(false)
  const [showPreview, setShowPreview] = useState(false)

  const [formData, setFormData] = useState({
    title: "",
    date: "",
    time: "",
    duration: "",
    location_type: "",
    city: "",
    venue: "",
    description: "",
    fee_type: "",
    fee_amount: "",
    cover_image: "",
    registration_link: "",
    contact_email: "",
    contact_phone: "",
  })

  const handleInputChange = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async () => {
    if (!formData.title || !formData.date || !formData.description) {
      toast.error("Please fill in all required fields")
      return
    }

    setSaving(true)
    try {
      // TODO: Submit to API
      toast.success("Workshop posted successfully!")
      router.push("/")
    } catch (error) {
      console.error("Submit error:", error)
      toast.error("Failed to post workshop")
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50 py-8">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="font-playfair text-4xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            Post a Workshop
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Create a workshop listing to share knowledge and skills with the community
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <GraduationCap className="h-5 w-5" />
                Workshop Details
              </CardTitle>
              <CardDescription>All fields on one page - quick and simple</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Workshop Title */}
              <div className="space-y-2">
                <Label htmlFor="title">Workshop Title *</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => handleInputChange("title", e.target.value)}
                  placeholder="e.g., Introduction to Method Acting"
                  required
                />
              </div>

              {/* Date & Time */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="date">Date *</Label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="date"
                      type="date"
                      value={formData.date}
                      onChange={(e) => handleInputChange("date", e.target.value)}
                      className="pl-10"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="time">Time</Label>
                  <Input
                    id="time"
                    type="time"
                    value={formData.time}
                    onChange={(e) => handleInputChange("time", e.target.value)}
                    placeholder="10:00 AM"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="duration">Duration</Label>
                  <Input
                    id="duration"
                    value={formData.duration}
                    onChange={(e) => handleInputChange("duration", e.target.value)}
                    placeholder="e.g., 2 hours"
                  />
                </div>
              </div>

              {/* Location */}
              <div className="space-y-4">
                <Label>Location *</Label>
                <Select
                  value={formData.location_type}
                  onValueChange={(value) => handleInputChange("location_type", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select location type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Online">Online</SelectItem>
                    <SelectItem value="In-Person">In-Person</SelectItem>
                  </SelectContent>
                </Select>

                {formData.location_type === "In-Person" && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="city">City</Label>
                      <Input
                        id="city"
                        value={formData.city}
                        onChange={(e) => handleInputChange("city", e.target.value)}
                        placeholder="e.g., Delhi"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="venue">Venue</Label>
                      <Input
                        id="venue"
                        value={formData.venue}
                        onChange={(e) => handleInputChange("venue", e.target.value)}
                        placeholder="e.g., National School of Drama"
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Description */}
              <div className="space-y-2">
                <Label htmlFor="description">Description *</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => handleInputChange("description", e.target.value)}
                  placeholder="Describe what participants will learn, workshop format, prerequisites, etc..."
                  rows={6}
                  required
                />
                <p className="text-sm text-gray-500">{formData.description.length} characters</p>
              </div>

              {/* Fee */}
              <div className="space-y-4">
                <Label>Fee *</Label>
                <Select value={formData.fee_type} onValueChange={(value) => handleInputChange("fee_type", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select fee type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Free">Free</SelectItem>
                    <SelectItem value="Paid">Paid</SelectItem>
                  </SelectContent>
                </Select>

                {formData.fee_type === "Paid" && (
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      type="number"
                      value={formData.fee_amount}
                      onChange={(e) => handleInputChange("fee_amount", e.target.value)}
                      className="pl-10"
                      placeholder="Enter amount in ₹"
                    />
                  </div>
                )}
              </div>

              {/* Cover Image */}
              <div className="space-y-2">
                <Label htmlFor="cover_image">Cover Image / Poster</Label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-purple-400 transition-colors cursor-pointer">
                  <Upload className="h-8 w-8 mx-auto mb-2 text-gray-400" />
                  <p className="text-sm text-gray-600 mb-1">Click to upload or drag and drop</p>
                  <p className="text-xs text-gray-400">PNG, JPG up to 5MB</p>
                  <Input id="cover_image" type="file" accept="image/*" className="hidden" />
                </div>
              </div>

              {/* Optional Fields */}
              <div className="pt-6 border-t space-y-4">
                <h3 className="font-semibold text-lg">Optional Contact & Registration</h3>

                <div className="space-y-2">
                  <Label htmlFor="registration_link">Registration Link</Label>
                  <div className="relative">
                    <LinkIcon className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="registration_link"
                      type="url"
                      value={formData.registration_link}
                      onChange={(e) => handleInputChange("registration_link", e.target.value)}
                      className="pl-10"
                      placeholder="https://forms.google.com/..."
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="contact_email">Contact Email</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        id="contact_email"
                        type="email"
                        value={formData.contact_email}
                        onChange={(e) => handleInputChange("contact_email", e.target.value)}
                        className="pl-10"
                        placeholder="workshop@email.com"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="contact_phone">Contact WhatsApp</Label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        id="contact_phone"
                        type="tel"
                        value={formData.contact_phone}
                        onChange={(e) => handleInputChange("contact_phone", e.target.value)}
                        className="pl-10"
                        placeholder="+91 98765 43210"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex justify-between gap-4 mt-8">
            <Button variant="outline" onClick={() => setShowPreview(!showPreview)}>
              <Eye className="h-4 w-4 mr-2" />
              {showPreview ? "Hide Preview" : "Show Preview"}
            </Button>

            <div className="flex gap-4">
              <Button variant="outline" onClick={() => router.push("/")}>
                Cancel
              </Button>
              <Button
                onClick={handleSubmit}
                disabled={saving || !formData.title || !formData.date || !formData.description}
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
              >
                <Send className="h-4 w-4 mr-2" />
                {saving ? "Posting..." : "Post Workshop"}
              </Button>
            </div>
          </div>

          {/* Preview */}
          {showPreview && (
            <Card className="mt-6 border-2 border-purple-200">
              <CardHeader className="bg-gradient-to-r from-purple-50 to-pink-50">
                <CardTitle>Preview</CardTitle>
                <CardDescription>This is how your workshop will appear</CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="space-y-4">
                  <h2 className="text-2xl font-bold">{formData.title || "Your Workshop Title"}</h2>
                  <div className="flex flex-wrap gap-2 text-sm text-gray-600">
                    {formData.date && (
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        {new Date(formData.date).toLocaleDateString()}
                        {formData.time && ` at ${formData.time}`}
                      </div>
                    )}
                    {formData.location_type && (
                      <div className="flex items-center gap-1">
                        <MapPin className="h-4 w-4" />
                        {formData.location_type === "Online" ? "Online" : `${formData.city || "City"}`}
                      </div>
                    )}
                    {formData.fee_type && (
                      <div className="flex items-center gap-1">
                        <DollarSign className="h-4 w-4" />
                        {formData.fee_type === "Free" ? "Free" : `₹${formData.fee_amount || "---"}`}
                      </div>
                    )}
                  </div>
                  <p className="text-gray-700 whitespace-pre-wrap">
                    {formData.description || "Your description will appear here..."}
                  </p>
                  {(formData.contact_email || formData.contact_phone) && (
                    <div className="pt-4 border-t space-y-1">
                      {formData.contact_email && <p className="text-sm">Email: {formData.contact_email}</p>}
                      {formData.contact_phone && <p className="text-sm">WhatsApp: {formData.contact_phone}</p>}
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
