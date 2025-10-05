"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { toast } from "sonner"
import { Film, ChevronDown, ChevronUp, Eye, Send, Calendar, MapPin, Users, DollarSign } from "lucide-react"

export default function PostAuditionPage() {
  const router = useRouter()
  const [saving, setSaving] = useState(false)
  const [showAdvanced, setShowAdvanced] = useState(false)
  const [showPreview, setShowPreview] = useState(false)

  const [formData, setFormData] = useState({
    title: "",
    type: "",
    deadline: "",
    location_type: "",
    city: "",
    venue: "",
    description: "",
    contact: "",
    roles_needed: "",
    gender: "",
    age_min: "",
    age_max: "",
    languages: [] as string[],
    experience_level: "",
    fee_type: "",
    fee_amount: "",
    request_photos: false,
    photo_instructions: "",
    request_video: false,
    video_instructions: "",
  })

  const handleInputChange = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleLanguageToggle = (language: string) => {
    setFormData((prev) => ({
      ...prev,
      languages: prev.languages.includes(language)
        ? prev.languages.filter((l) => l !== language)
        : [...prev.languages, language],
    }))
  }

  const handleSubmit = async () => {
    if (!formData.title || !formData.type || !formData.deadline || !formData.description || !formData.contact) {
      toast.error("Please fill in all required fields")
      return
    }

    setSaving(true)
    try {
      // TODO: Submit to API
      toast.success("Audition posted successfully!")
      router.push("/")
    } catch (error) {
      console.error("Submit error:", error)
      toast.error("Failed to post audition")
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50 py-8">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="font-playfair text-4xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            Post Casting / Job Opportunity
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Create a detailed listing to attract the right talent for your project
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Film className="h-5 w-5" />
                Core Details
              </CardTitle>
              <CardDescription>
                Basic information about the opportunity (all required fields marked with *)
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Title */}
              <div className="space-y-2">
                <Label htmlFor="title">Title *</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => handleInputChange("title", e.target.value)}
                  placeholder="e.g., Casting: Lead Role in Hindi Play"
                  required
                />
              </div>

              {/* Type */}
              <div className="space-y-2">
                <Label htmlFor="type">Type *</Label>
                <Select value={formData.type} onValueChange={(value) => handleInputChange("type", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select opportunity type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Theatre Play">Theatre Play</SelectItem>
                    <SelectItem value="Short Film">Short Film</SelectItem>
                    <SelectItem value="Feature Film">Feature Film</SelectItem>
                    <SelectItem value="Advertisement">Advertisement</SelectItem>
                    <SelectItem value="Backstage">Backstage / Crew</SelectItem>
                    <SelectItem value="Job">Job Position</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Deadline */}
              <div className="space-y-2">
                <Label htmlFor="deadline">Application Deadline *</Label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="deadline"
                    type="date"
                    value={formData.deadline}
                    onChange={(e) => handleInputChange("deadline", e.target.value)}
                    className="pl-10"
                    required
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
                        placeholder="e.g., Mumbai"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="venue">Venue</Label>
                      <Input
                        id="venue"
                        value={formData.venue}
                        onChange={(e) => handleInputChange("venue", e.target.value)}
                        placeholder="e.g., Prithvi Theatre"
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
                  placeholder="Describe the role, audition requirements, project details, etc..."
                  rows={6}
                  required
                />
                <p className="text-sm text-gray-500">{formData.description.length} characters</p>
              </div>

              {/* Contact */}
              <div className="space-y-2">
                <Label htmlFor="contact">Contact (WhatsApp / Email / URL) *</Label>
                <Input
                  id="contact"
                  value={formData.contact}
                  onChange={(e) => handleInputChange("contact", e.target.value)}
                  placeholder="e.g., +91 98765 43210 or contact@email.com"
                  required
                />
              </div>
            </CardContent>
          </Card>

          {/* Advanced Options */}
          <Card className="mt-6">
            <CardHeader>
              <button
                onClick={() => setShowAdvanced(!showAdvanced)}
                className="w-full flex items-center justify-between text-left"
              >
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-5 w-5" />
                    Advanced Options
                  </CardTitle>
                  <CardDescription>Add more specific requirements for applicants</CardDescription>
                </div>
                {showAdvanced ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
              </button>
            </CardHeader>

            {showAdvanced && (
              <CardContent className="space-y-6">
                {/* Roles Needed */}
                <div className="space-y-2">
                  <Label htmlFor="roles_needed">Roles Needed</Label>
                  <Input
                    id="roles_needed"
                    value={formData.roles_needed}
                    onChange={(e) => handleInputChange("roles_needed", e.target.value)}
                    placeholder="e.g., 2 Lead Actors, 1 Supporting Actor"
                  />
                </div>

                {/* Gender */}
                <div className="space-y-2">
                  <Label htmlFor="gender">Gender</Label>
                  <Select value={formData.gender} onValueChange={(value) => handleInputChange("gender", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select preferred gender" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Male">Male</SelectItem>
                      <SelectItem value="Female">Female</SelectItem>
                      <SelectItem value="Any">Any</SelectItem>
                      <SelectItem value="Other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Age Range */}
                <div className="space-y-2">
                  <Label>Age Range</Label>
                  <div className="grid grid-cols-2 gap-4">
                    <Input
                      type="number"
                      value={formData.age_min}
                      onChange={(e) => handleInputChange("age_min", e.target.value)}
                      placeholder="Min (e.g., 18)"
                    />
                    <Input
                      type="number"
                      value={formData.age_max}
                      onChange={(e) => handleInputChange("age_max", e.target.value)}
                      placeholder="Max (e.g., 30)"
                    />
                  </div>
                </div>

                {/* Languages */}
                <div className="space-y-2">
                  <Label>Languages</Label>
                  <div className="flex flex-wrap gap-2">
                    {[
                      "Hindi",
                      "English",
                      "Tamil",
                      "Telugu",
                      "Bengali",
                      "Marathi",
                      "Gujarati",
                      "Kannada",
                      "Malayalam",
                    ].map((lang) => (
                      <Badge
                        key={lang}
                        variant={formData.languages.includes(lang) ? "default" : "outline"}
                        className="cursor-pointer"
                        onClick={() => handleLanguageToggle(lang)}
                      >
                        {lang}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Experience Level */}
                <div className="space-y-2">
                  <Label htmlFor="experience_level">Experience Level</Label>
                  <Select
                    value={formData.experience_level}
                    onValueChange={(value) => handleInputChange("experience_level", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select experience level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Beginner">Beginner</SelectItem>
                      <SelectItem value="Intermediate">Intermediate</SelectItem>
                      <SelectItem value="Professional">Professional</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Fee/Pay */}
                <div className="space-y-4">
                  <Label>Fee / Pay</Label>
                  <Select value={formData.fee_type} onValueChange={(value) => handleInputChange("fee_type", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select payment type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Free">Free / Volunteer</SelectItem>
                      <SelectItem value="Stipend">Stipend</SelectItem>
                      <SelectItem value="Paid">Paid</SelectItem>
                    </SelectContent>
                  </Select>

                  {(formData.fee_type === "Stipend" || formData.fee_type === "Paid") && (
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
              </CardContent>
            )}
          </Card>

          {/* Media Request Section */}
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Media Request</CardTitle>
              <CardDescription>Request photos or video submissions from applicants</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <Checkbox
                    id="request_photos"
                    checked={formData.request_photos}
                    onCheckedChange={(checked) => handleInputChange("request_photos", checked)}
                  />
                  <div className="space-y-2 flex-1">
                    <Label htmlFor="request_photos" className="text-base font-normal cursor-pointer">
                      Request Photos (2-3 images)
                    </Label>
                    {formData.request_photos && (
                      <Input
                        value={formData.photo_instructions}
                        onChange={(e) => handleInputChange("photo_instructions", e.target.value)}
                        placeholder="Optional: e.g., Please upload 1 headshot and 1 full-body photo"
                        className="mt-2"
                      />
                    )}
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <Checkbox
                    id="request_video"
                    checked={formData.request_video}
                    onCheckedChange={(checked) => handleInputChange("request_video", checked)}
                  />
                  <div className="space-y-2 flex-1">
                    <Label htmlFor="request_video" className="text-base font-normal cursor-pointer">
                      Request Video Link (YouTube / Drive)
                    </Label>
                    {formData.request_video && (
                      <Input
                        value={formData.video_instructions}
                        onChange={(e) => handleInputChange("video_instructions", e.target.value)}
                        placeholder="Optional: e.g., Upload a 1-min monologue in Hindi"
                        className="mt-2"
                      />
                    )}
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
                disabled={
                  saving ||
                  !formData.title ||
                  !formData.type ||
                  !formData.deadline ||
                  !formData.description ||
                  !formData.contact
                }
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
              >
                <Send className="h-4 w-4 mr-2" />
                {saving ? "Posting..." : "Post Opportunity"}
              </Button>
            </div>
          </div>

          {/* Preview */}
          {showPreview && (
            <Card className="mt-6 border-2 border-purple-200">
              <CardHeader className="bg-gradient-to-r from-purple-50 to-pink-50">
                <CardTitle>Preview</CardTitle>
                <CardDescription>This is how your listing will appear</CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="space-y-4">
                  <h2 className="text-2xl font-bold">{formData.title || "Your Title Here"}</h2>
                  <div className="flex flex-wrap gap-2">
                    {formData.type && <Badge>{formData.type}</Badge>}
                    {formData.location_type && (
                      <Badge variant="outline">
                        <MapPin className="h-3 w-3 mr-1" />
                        {formData.location_type === "Online" ? "Online" : `${formData.city || "City"}`}
                      </Badge>
                    )}
                    {formData.deadline && (
                      <Badge variant="outline">
                        <Calendar className="h-3 w-3 mr-1" />
                        Apply by {new Date(formData.deadline).toLocaleDateString()}
                      </Badge>
                    )}
                  </div>
                  <p className="text-gray-700 whitespace-pre-wrap">
                    {formData.description || "Your description will appear here..."}
                  </p>
                  {formData.contact && (
                    <div className="pt-4 border-t">
                      <p className="text-sm font-medium">Contact: {formData.contact}</p>
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
