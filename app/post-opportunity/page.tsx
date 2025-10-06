"use client"

import { Calendar } from "@/components/ui/calendar"

import { useState } from "react"
import { CalendarIcon, ChevronDown, Globe, MapPin, Sparkles, Upload, X, Eye } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { format } from "date-fns"
import { cn } from "@/lib/utils"
import { Separator } from "@/components/ui/separator"

const opportunityTypes = [
  { label: "Theatre Play", value: "theatre" },
  { label: "Short Film", value: "short-film" },
  { label: "Feature Film", value: "feature-film" },
  { label: "Advertisement", value: "ad" },
  { label: "Backstage Role", value: "backstage" },
  { label: "Job Opening", value: "job" },
]

const LANGUAGES = [
  "Hindi",
  "English",
  "Marathi",
  "Tamil",
  "Telugu",
  "Bengali",
  "Gujarati",
  "Kannada",
  "Malayalam",
  "Punjabi",
]

const genderOptions = [
  { label: "Any", value: "any" },
  { label: "Male", value: "male" },
  { label: "Female", value: "female" },
  { label: "Other", value: "other" },
  { label: "Prefer not to say", value: "prefer-not-to-say" },
]

const experienceLevels = [
  { label: "Beginner", value: "beginner" },
  { label: "Intermediate", value: "intermediate" },
  { label: "Professional", value: "professional" },
]

const feeOptions = [
  { label: "Not specified", value: "not-specified" },
  { label: "Free / Volunteer", value: "free" },
  { label: "Stipend", value: "stipend" },
  { label: "Paid", value: "paid" },
]

export default function PostOpportunityPage() {
  const [formData, setFormData] = useState({
    title: "",
    type: "",
    deadline: undefined as Date | undefined,
    locationMode: "city" as "city" | "online",
    city: "",
    venue: "",
    platform: "",
    description: "",
    applicationMethod: "quick" as "quick" | "contact",
    contactType: "" as "whatsapp" | "email" | "form" | "",
    contactValue: "",
    rolesNeeded: "",
    gender: "any",
    ageMin: "",
    ageMax: "",
    selectedLanguages: [] as string[],
    experience: "",
    feeType: "not-specified",
    feeAmount: "",
    visibility: "public" as "public" | "unlisted",
    requestPhotos: false,
    photoHelper: "",
    requestVideos: false,
    videoHelper: "",
  })

  const [advancedOpen, setAdvancedOpen] = useState(false)
  const [contactDetailsOpen, setContactDetailsOpen] = useState(false)
  const [previewOpen, setPreviewOpen] = useState(false)

  const updateField = (field: keyof typeof formData, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const toggleLanguage = (lang: string) => {
    setFormData((prev) => ({
      ...prev,
      selectedLanguages: prev.selectedLanguages.includes(lang)
        ? prev.selectedLanguages.filter((l) => l !== lang)
        : prev.selectedLanguages.length < 4
          ? [...prev.selectedLanguages, lang]
          : prev.selectedLanguages,
    }))
  }

  const isFormValid =
    formData.title.trim() !== "" &&
    formData.type !== "" &&
    formData.deadline !== undefined &&
    formData.description.trim() !== "" &&
    (formData.locationMode === "online" ? formData.platform.trim() !== "" : formData.city.trim() !== "")

  const handlePublish = () => {
    if (isFormValid) {
      alert("Opportunity published successfully!")
      // TODO: Implement actual publish logic
    }
  }

  return (
    <div className="min-h-screen bg-white py-12">
      <div className="container max-w-7xl mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Form Section */}
          <div className="space-y-6">
            <div className="space-y-2">
              <h1 className="text-3xl font-light tracking-tight text-gray-900">Post an Opportunity</h1>
              <p className="text-gray-600">Share your casting call or job opening with the community.</p>
            </div>

            {/* Core Section */}
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-8 space-y-6">
              <h2 className="text-lg font-medium text-gray-900">Core Details</h2>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Opportunity Title *</Label>
                  <Input
                    id="title"
                    placeholder="e.g., Lead Role in Theatre Play"
                    value={formData.title}
                    onChange={(e) => updateField("title", e.target.value)}
                    className="rounded-xl mt-1"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="type">Type *</Label>
                  <Select value={formData.type} onValueChange={(val) => updateField("type", val)}>
                    <SelectTrigger className="rounded-xl mt-1">
                      <SelectValue placeholder="Select opportunity type" />
                    </SelectTrigger>
                    <SelectContent>
                      {opportunityTypes.map((type) => (
                        <SelectItem key={type.value} value={type.value}>
                          {type.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Application Deadline *</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left font-normal rounded-xl mt-1",
                          !formData.deadline && "text-muted-foreground",
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {formData.deadline ? format(formData.deadline, "PPP") : <span>Pick a date</span>}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={formData.deadline}
                        onSelect={(date) => updateField("deadline", date)}
                        disabled={(date) => date < new Date()}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>

                <div className="space-y-2">
                  <Label>Location Mode *</Label>
                  <div className="flex gap-2 mt-2">
                    <Button
                      type="button"
                      variant={formData.locationMode === "city" ? "default" : "outline"}
                      className="flex-1 rounded-xl"
                      onClick={() => updateField("locationMode", "city")}
                    >
                      <MapPin className="mr-2 h-4 w-4" />
                      City
                    </Button>
                    <Button
                      type="button"
                      variant={formData.locationMode === "online" ? "default" : "outline"}
                      className="flex-1 rounded-xl"
                      onClick={() => updateField("locationMode", "online")}
                    >
                      <Globe className="mr-2 h-4 w-4" />
                      Online
                    </Button>
                  </div>
                </div>

                {formData.locationMode === "city" ? (
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="city">City *</Label>
                      <Input
                        id="city"
                        placeholder="Mumbai"
                        value={formData.city}
                        onChange={(e) => updateField("city", e.target.value)}
                        className="rounded-xl mt-1"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="venue">Venue (Optional)</Label>
                      <Input
                        id="venue"
                        placeholder="Prithvi Theatre"
                        value={formData.venue}
                        onChange={(e) => updateField("venue", e.target.value)}
                        className="rounded-xl mt-1"
                      />
                    </div>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <Label htmlFor="platform">Platform *</Label>
                    <Input
                      id="platform"
                      placeholder="Zoom, Google Meet, etc."
                      value={formData.platform}
                      onChange={(e) => updateField("platform", e.target.value)}
                      className="rounded-xl mt-1"
                    />
                  </div>
                )}

                <div className="space-y-2">
                  <Label htmlFor="description">Description *</Label>
                  <Textarea
                    id="description"
                    placeholder="Describe the opportunity, requirements, and what you're looking for..."
                    value={formData.description}
                    onChange={(e) => updateField("description", e.target.value)}
                    className="rounded-xl min-h-[120px] resize-none mt-1"
                  />
                </div>

                <div className="space-y-2">
                  <Label>Application Method</Label>
                  <div className="space-y-3 mt-2">
                    <div className="flex items-center space-x-2">
                      <input
                        type="radio"
                        id="quick-apply"
                        name="applicationMethod"
                        checked={formData.applicationMethod === "quick"}
                        onChange={() => updateField("applicationMethod", "quick")}
                        className="h-4 w-4"
                      />
                      <Label htmlFor="quick-apply" className="font-normal cursor-pointer">
                        Quick Apply on Abhinayपथ (Recommended)
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input
                        type="radio"
                        id="contact-apply"
                        name="applicationMethod"
                        checked={formData.applicationMethod === "contact"}
                        onChange={() => updateField("applicationMethod", "contact")}
                        className="h-4 w-4"
                      />
                      <Label htmlFor="contact-apply" className="font-normal cursor-pointer">
                        External Contact
                      </Label>
                    </div>
                  </div>
                </div>

                {formData.applicationMethod === "contact" && (
                  <Collapsible open={contactDetailsOpen} onOpenChange={setContactDetailsOpen}>
                    <CollapsibleTrigger className="flex items-center justify-between w-full p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                      <span className="text-sm font-medium">Contact Details</span>
                      <ChevronDown className={cn("h-4 w-4 transition-transform", contactDetailsOpen && "rotate-180")} />
                    </CollapsibleTrigger>
                    <CollapsibleContent className="pt-4 space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="contactType">Contact Type</Label>
                        <Select value={formData.contactType} onValueChange={(val) => updateField("contactType", val)}>
                          <SelectTrigger className="rounded-xl mt-1">
                            <SelectValue placeholder="Select type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="whatsapp">WhatsApp</SelectItem>
                            <SelectItem value="email">Email</SelectItem>
                            <SelectItem value="form">Form URL</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      {formData.contactType === "whatsapp" && (
                        <div className="space-y-2">
                          <Label htmlFor="contactValue">WhatsApp Number</Label>
                          <Input
                            id="contactValue"
                            placeholder="+91 98765 43210"
                            value={formData.contactValue}
                            onChange={(e) => updateField("contactValue", e.target.value)}
                            className="rounded-xl mt-1"
                          />
                        </div>
                      )}
                      {formData.contactType === "email" && (
                        <div className="space-y-2">
                          <Label htmlFor="contactValue">Email Address</Label>
                          <Input
                            id="contactValue"
                            type="email"
                            placeholder="contact@example.com"
                            value={formData.contactValue}
                            onChange={(e) => updateField("contactValue", e.target.value)}
                            className="rounded-xl mt-1"
                          />
                        </div>
                      )}
                      {formData.contactType === "form" && (
                        <div className="space-y-2">
                          <Label htmlFor="contactValue">Form URL</Label>
                          <Input
                            id="contactValue"
                            type="url"
                            placeholder="https://forms.google.com/..."
                            value={formData.contactValue}
                            onChange={(e) => updateField("contactValue", e.target.value)}
                            className="rounded-xl mt-1"
                          />
                        </div>
                      )}
                    </CollapsibleContent>
                  </Collapsible>
                )}
              </div>
            </div>

            {/* Advanced Section */}
            <Collapsible open={advancedOpen} onOpenChange={setAdvancedOpen}>
              <CollapsibleTrigger className="flex items-center justify-between w-full p-6 bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                <span className="font-medium">Advanced Options</span>
                <ChevronDown className={cn("h-5 w-5 transition-transform", advancedOpen && "rotate-180")} />
              </CollapsibleTrigger>
              <CollapsibleContent className="mt-4">
                <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-8 space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="rolesNeeded">Roles Needed</Label>
                    <Input
                      id="rolesNeeded"
                      placeholder="e.g., Lead Actor, Supporting Role"
                      value={formData.rolesNeeded}
                      onChange={(e) => updateField("rolesNeeded", e.target.value)}
                      className="rounded-xl mt-1"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="gender">Gender Preference</Label>
                    <Select value={formData.gender} onValueChange={(val) => updateField("gender", val)}>
                      <SelectTrigger className="rounded-xl mt-1">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {genderOptions.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Age Range</Label>
                    <div className="grid grid-cols-2 gap-4">
                      <Input
                        placeholder="Min"
                        type="number"
                        value={formData.ageMin}
                        onChange={(e) => updateField("ageMin", e.target.value)}
                        className="rounded-xl mt-1"
                      />
                      <Input
                        placeholder="Max"
                        type="number"
                        value={formData.ageMax}
                        onChange={(e) => updateField("ageMax", e.target.value)}
                        className="rounded-xl mt-1"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Languages (max 4)</Label>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {LANGUAGES.map((lang) => (
                        <Button
                          key={lang}
                          type="button"
                          variant={formData.selectedLanguages.includes(lang) ? "default" : "outline"}
                          size="sm"
                          onClick={() => toggleLanguage(lang)}
                          disabled={
                            !formData.selectedLanguages.includes(lang) && formData.selectedLanguages.length >= 4
                          }
                          className="rounded-full"
                        >
                          {lang}
                          {formData.selectedLanguages.includes(lang) && <X className="ml-1 h-3 w-3" />}
                        </Button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="experience">Experience Level</Label>
                    <Select value={formData.experience} onValueChange={(val) => updateField("experience", val)}>
                      <SelectTrigger className="rounded-xl mt-1">
                        <SelectValue placeholder="Select level" />
                      </SelectTrigger>
                      <SelectContent>
                        {experienceLevels.map((level) => (
                          <SelectItem key={level.value} value={level.value}>
                            {level.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="feeType">Fee / Pay</Label>
                    <Select value={formData.feeType} onValueChange={(val) => updateField("feeType", val)}>
                      <SelectTrigger className="rounded-xl mt-1">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {feeOptions.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {(formData.feeType === "stipend" || formData.feeType === "paid") && (
                    <div className="space-y-2">
                      <Label htmlFor="feeAmount">Amount (₹)</Label>
                      <Input
                        id="feeAmount"
                        type="number"
                        placeholder="5000"
                        value={formData.feeAmount}
                        onChange={(e) => updateField("feeAmount", e.target.value)}
                        className="rounded-xl mt-1"
                      />
                    </div>
                  )}

                  <div className="space-y-2">
                    <Label>Visibility</Label>
                    <div className="flex gap-2 mt-2">
                      <Button
                        type="button"
                        variant={formData.visibility === "public" ? "default" : "outline"}
                        className="flex-1 rounded-xl"
                        onClick={() => updateField("visibility", "public")}
                      >
                        Public
                      </Button>
                      <Button
                        type="button"
                        variant={formData.visibility === "unlisted" ? "default" : "outline"}
                        className="flex-1 rounded-xl"
                        onClick={() => updateField("visibility", "unlisted")}
                      >
                        Unlisted
                      </Button>
                    </div>
                  </div>
                </div>
              </CollapsibleContent>
            </Collapsible>

            {/* Media Request Section */}
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-8 space-y-6">
              <h3 className="font-medium text-gray-900">Media Request (Optional)</h3>

              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <Checkbox
                    id="requestPhotos"
                    checked={formData.requestPhotos}
                    onCheckedChange={(checked) => updateField("requestPhotos", checked)}
                    className="mt-1"
                  />
                  <div className="space-y-2 flex-1">
                    <Label htmlFor="requestPhotos" className="cursor-pointer font-normal">
                      Request Photos
                    </Label>
                    {formData.requestPhotos && (
                      <Input
                        placeholder="e.g., Recent headshots, portfolio photos"
                        value={formData.photoHelper}
                        onChange={(e) => updateField("photoHelper", e.target.value)}
                        className="rounded-xl text-sm mt-2"
                      />
                    )}
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <Checkbox
                    id="requestVideos"
                    checked={formData.requestVideos}
                    onCheckedChange={(checked) => updateField("requestVideos", checked)}
                    className="mt-1"
                  />
                  <div className="space-y-2 flex-1">
                    <Label htmlFor="requestVideos" className="cursor-pointer font-normal">
                      Request Video Links
                    </Label>
                    {formData.requestVideos && (
                      <Input
                        placeholder="e.g., Performance reel, audition tape"
                        value={formData.videoHelper}
                        onChange={(e) => updateField("videoHelper", e.target.value)}
                        className="rounded-xl text-sm mt-2"
                      />
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex gap-4">
              <Sheet open={previewOpen} onOpenChange={setPreviewOpen}>
                <SheetTrigger asChild>
                  <Button variant="outline" className="flex-1 rounded-xl bg-transparent" disabled={!isFormValid}>
                    <Eye className="mr-2 h-4 w-4" />
                    Preview Apply Flow
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-full sm:max-w-lg overflow-y-auto">
                  <SheetHeader>
                    <SheetTitle>Artist Application Preview</SheetTitle>
                  </SheetHeader>
                  <div className="mt-6 space-y-6">
                    <div className="space-y-2">
                      <h3 className="font-medium">Applying for: {formData.title || "Opportunity Title"}</h3>
                      <p className="text-sm text-gray-500">
                        {formData.description || "Description will appear here..."}
                      </p>
                    </div>

                    <Separator />

                    {formData.requestPhotos && (
                      <div className="space-y-2">
                        <Label>Upload Photos {formData.photoHelper && `(${formData.photoHelper})`}</Label>
                        <div className="border-2 border-dashed rounded-lg p-8 text-center">
                          <Upload className="w-8 h-8 mx-auto text-gray-400 mb-2" />
                          <p className="text-sm text-gray-500">Click to upload or drag and drop</p>
                        </div>
                      </div>
                    )}

                    {formData.requestVideos && (
                      <div className="space-y-2">
                        <Label>Video Links {formData.videoHelper && `(${formData.videoHelper})`}</Label>
                        <Input placeholder="Paste YouTube/Vimeo link" />
                      </div>
                    )}

                    <Button className="w-full">Submit Application</Button>
                  </div>
                </SheetContent>
              </Sheet>

              <Button onClick={handlePublish} disabled={!isFormValid} className="flex-1 rounded-xl">
                <Sparkles className="mr-2 h-4 w-4" />
                Publish Opportunity
              </Button>
            </div>

            <p className="text-center text-sm text-gray-500">© Abhinayपथ • Minimal form, maximal clarity.</p>
          </div>

          {/* Live Preview */}
          <div className="lg:sticky lg:top-8 h-fit hidden lg:block">
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-8 space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-medium text-gray-900">Live Preview</h2>
                <Badge variant="outline" className="rounded-full">
                  {formData.visibility === "public" ? "Public" : "Unlisted"}
                </Badge>
              </div>

              {formData.title ? (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <h3 className="text-2xl font-light text-gray-900">{formData.title}</h3>
                    {formData.type && (
                      <Badge variant="secondary" className="rounded-full">
                        {opportunityTypes.find((t) => t.value === formData.type)?.label}
                      </Badge>
                    )}
                  </div>

                  {formData.deadline && (
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <CalendarIcon className="h-4 w-4" />
                      <span>Deadline: {format(formData.deadline, "PPP")}</span>
                    </div>
                  )}

                  {formData.locationMode === "city"
                    ? (formData.city || formData.venue) && (
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <MapPin className="h-4 w-4" />
                          <span>
                            {formData.city}
                            {formData.venue && ` • ${formData.venue}`}
                          </span>
                        </div>
                      )
                    : formData.platform && (
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Globe className="h-4 w-4" />
                          <span>{formData.platform}</span>
                        </div>
                      )}

                  {formData.description && (
                    <div className="pt-4 border-t">
                      <p className="text-sm text-gray-700 whitespace-pre-wrap">{formData.description}</p>
                    </div>
                  )}

                  {(formData.rolesNeeded ||
                    formData.gender !== "any" ||
                    formData.ageMin ||
                    formData.ageMax ||
                    formData.selectedLanguages.length > 0 ||
                    formData.experience) && (
                    <div className="pt-4 border-t space-y-3">
                      <h4 className="text-sm font-medium text-gray-900">Requirements</h4>
                      <div className="space-y-2 text-sm text-gray-600">
                        {formData.rolesNeeded && <p>• {formData.rolesNeeded}</p>}
                        {formData.gender !== "any" && (
                          <p>• Gender: {genderOptions.find((g) => g.value === formData.gender)?.label}</p>
                        )}
                        {(formData.ageMin || formData.ageMax) && (
                          <p>
                            • Age: {formData.ageMin || "Any"} - {formData.ageMax || "Any"} years
                          </p>
                        )}
                        {formData.selectedLanguages.length > 0 && (
                          <p>• Languages: {formData.selectedLanguages.join(", ")}</p>
                        )}
                        {formData.experience && (
                          <p>• Experience: {experienceLevels.find((e) => e.value === formData.experience)?.label}</p>
                        )}
                      </div>
                    </div>
                  )}

                  {formData.feeType !== "not-specified" && (
                    <div className="pt-4 border-t">
                      <p className="text-sm text-gray-600">
                        <span className="font-medium">Compensation:</span>{" "}
                        {formData.feeType === "free"
                          ? "Free / Volunteer"
                          : formData.feeAmount
                            ? `₹${formData.feeAmount}`
                            : formData.feeType === "stipend"
                              ? "Stipend amount not specified"
                              : "Paid amount not specified"}
                      </p>
                    </div>
                  )}

                  {(formData.requestPhotos || formData.requestVideos) && (
                    <div className="pt-4 border-t">
                      <h4 className="text-sm font-medium text-gray-900 mb-2">Media Required</h4>
                      <div className="space-y-1 text-sm text-gray-600">
                        {formData.requestPhotos && (
                          <p>• Photos {formData.photoHelper && `(${formData.photoHelper})`}</p>
                        )}
                        {formData.requestVideos && (
                          <p>• Video Links {formData.videoHelper && `(${formData.videoHelper})`}</p>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="py-12 text-center text-gray-400">
                  <p className="text-sm">Fill in the form to see preview</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
