"use client"

import { useState } from "react"
import { format } from "date-fns"
import { CalendarIcon, MapPin, Globe, ChevronDown, ChevronUp, ImageIcon, Video, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { cn } from "@/lib/utils"

interface FormData {
  title: string
  type: string
  deadline: Date | undefined
  locationMode: "city" | "online"
  city: string
  venue: string
  platform: string
  description: string
  applicationMethod: "platform" | "whatsapp" | "email" | "external"
  contactInfo: string
  rolesNeeded: string
  gender: string
  ageMin: string
  ageMax: string
  languages: string[]
  experience: string
  feeType: string
  amount: string
  visibility: "public" | "unlisted"
  requestPhotos: boolean
  photoHelper: string
  requestVideos: boolean
  videoHelper: string
  consentGenuine: boolean
  consentTerms: boolean
}

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

export default function PostOpportunityPage() {
  const [formData, setFormData] = useState<FormData>({
    title: "",
    type: "",
    deadline: undefined,
    locationMode: "city",
    city: "",
    venue: "",
    platform: "",
    description: "",
    applicationMethod: "platform",
    contactInfo: "",
    rolesNeeded: "",
    gender: "any",
    ageMin: "",
    ageMax: "",
    languages: [],
    experience: "",
    feeType: "not-specified",
    amount: "",
    visibility: "public",
    requestPhotos: false,
    photoHelper: "",
    requestVideos: false,
    videoHelper: "",
    consentGenuine: false,
    consentTerms: false,
  })

  const [advancedOpen, setAdvancedOpen] = useState(false)
  const [contactOpen, setContactOpen] = useState(false)
  const [applyFlowOpen, setApplyFlowOpen] = useState(false)

  const updateField = (field: keyof FormData, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const toggleLanguage = (lang: string) => {
    setFormData((prev) => {
      const languages = prev.languages.includes(lang)
        ? prev.languages.filter((l) => l !== lang)
        : prev.languages.length < 4
          ? [...prev.languages, lang]
          : prev.languages
      return { ...prev, languages }
    })
  }

  // Calculate form completion
  const requiredFields = {
    title: !!formData.title,
    type: !!formData.type,
    deadline: !!formData.deadline,
    location: formData.locationMode === "city" ? !!formData.city : true,
    description: !!formData.description,
    amount: formData.feeType === "stipend" || formData.feeType === "paid" ? !!formData.amount : true,
    ageRange:
      formData.ageMin && formData.ageMax
        ? Number.parseInt(formData.ageMin) <= Number.parseInt(formData.ageMax)
        : !formData.ageMin && !formData.ageMax,
    consents: formData.consentGenuine && formData.consentTerms,
  }

  const completionPercentage = Math.round(
    (Object.values(requiredFields).filter(Boolean).length / Object.values(requiredFields).length) * 100,
  )
  const canPublish = Object.values(requiredFields).every(Boolean)

  const handlePublish = () => {
    if (canPublish) {
      // TODO: API call
      alert("Published successfully! ✓")
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Header */}
      <div className="border-b bg-white/80 backdrop-blur-sm sticky top-16 z-40">
        <div className="container py-6">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#7E1F2E]/10 flex items-center justify-center">
                <span className="text-[#7E1F2E] font-semibold text-sm">AP</span>
              </div>
              <h1 className="text-2xl font-semibold text-gray-900">Post Opportunity</h1>
            </div>
            <span className="text-sm text-gray-500">All times IST</span>
          </div>
          <p className="text-gray-600 text-sm">Keep it crisp. Artists love clarity.</p>

          {/* Progress indicator */}
          <div className="mt-4">
            <div className="h-1 bg-gray-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-[#7E1F2E] transition-all duration-500 ease-out"
                style={{ width: `${completionPercentage}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="container py-8">
        <div className="grid lg:grid-cols-2 gap-8 items-start">
          {/* Left Column - Form */}
          <div className="space-y-6">
            {/* Core Section */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 space-y-6 hover:shadow-md transition-shadow">
              <div className="flex items-center gap-2 text-gray-900 font-medium">
                <div className="w-1 h-5 bg-[#7E1F2E] rounded-full" />
                Core Details
              </div>

              {/* Title */}
              <div className="space-y-2">
                <Label htmlFor="title">
                  Title <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="title"
                  placeholder="e.g., Lead Actor for Hamlet"
                  value={formData.title}
                  onChange={(e) => updateField("title", e.target.value)}
                  className="rounded-xl"
                />
              </div>

              {/* Type */}
              <div className="space-y-2">
                <Label htmlFor="type">
                  Type <span className="text-red-500">*</span>
                </Label>
                <Select value={formData.type} onValueChange={(value) => updateField("type", value)}>
                  <SelectTrigger className="rounded-xl">
                    <SelectValue placeholder="Select opportunity type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="theatre">Theatre Play</SelectItem>
                    <SelectItem value="short-film">Short Film</SelectItem>
                    <SelectItem value="feature-film">Feature Film</SelectItem>
                    <SelectItem value="ad">Advertisement</SelectItem>
                    <SelectItem value="backstage">Backstage Role</SelectItem>
                    <SelectItem value="job">Job Opening</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Deadline */}
              <div className="space-y-2">
                <Label>
                  Application Deadline <span className="text-red-500">*</span>
                </Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal rounded-xl",
                        !formData.deadline && "text-muted-foreground",
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {formData.deadline ? format(formData.deadline, "PPP") : "Pick a date"}
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

              {/* Location Mode */}
              <div className="space-y-3">
                <Label>Location Mode</Label>
                <div className="flex gap-2">
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

              {/* Conditional Location Fields */}
              {formData.locationMode === "city" ? (
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="city">
                      City <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="city"
                      placeholder="Mumbai"
                      value={formData.city}
                      onChange={(e) => updateField("city", e.target.value)}
                      className="rounded-xl"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="venue">Venue (optional)</Label>
                    <Input
                      id="venue"
                      placeholder="Theatre name"
                      value={formData.venue}
                      onChange={(e) => updateField("venue", e.target.value)}
                      className="rounded-xl"
                    />
                  </div>
                </div>
              ) : (
                <div className="space-y-2">
                  <Label htmlFor="platform">Platform (optional)</Label>
                  <Input
                    id="platform"
                    placeholder="Zoom, Google Meet, etc."
                    value={formData.platform}
                    onChange={(e) => updateField("platform", e.target.value)}
                    className="rounded-xl"
                  />
                </div>
              )}

              {/* Description */}
              <div className="space-y-2">
                <Label htmlFor="description">
                  Description <span className="text-red-500">*</span>
                </Label>
                <Textarea
                  id="description"
                  placeholder="What to prepare, key dates, audition flow..."
                  value={formData.description}
                  onChange={(e) => updateField("description", e.target.value)}
                  className="rounded-xl min-h-[120px] resize-none"
                />
              </div>

              {/* Application Method */}
              <div className="space-y-3">
                <Label>Application Method</Label>
                <RadioGroup
                  value={formData.applicationMethod}
                  onValueChange={(value: any) => updateField("applicationMethod", value)}
                  className="space-y-2"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="platform" id="platform-apply" />
                    <Label htmlFor="platform-apply" className="font-normal cursor-pointer">
                      Quick Apply on Abhinayपथ (Recommended)
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="whatsapp" id="whatsapp-apply" />
                    <Label htmlFor="whatsapp-apply" className="font-normal cursor-pointer">
                      WhatsApp
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="email" id="email-apply" />
                    <Label htmlFor="email-apply" className="font-normal cursor-pointer">
                      Email
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="external" id="external-apply" />
                    <Label htmlFor="external-apply" className="font-normal cursor-pointer">
                      External Form
                    </Label>
                  </div>
                </RadioGroup>
              </div>

              {/* Optional Contact */}
              {formData.applicationMethod !== "platform" && (
                <div className="space-y-3">
                  <button
                    type="button"
                    onClick={() => setContactOpen(!contactOpen)}
                    className="flex items-center justify-between w-full text-sm text-gray-700 hover:text-gray-900 transition-colors"
                  >
                    <span>Contact Information (optional)</span>
                    {contactOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                  </button>
                  {contactOpen && (
                    <div className="space-y-2 pt-2 animate-in slide-in-from-top-2">
                      <Input
                        placeholder={
                          formData.applicationMethod === "whatsapp"
                            ? "+91 98765 43210"
                            : formData.applicationMethod === "email"
                              ? "casting@example.com"
                              : "https://forms.google.com/..."
                        }
                        value={formData.contactInfo}
                        onChange={(e) => updateField("contactInfo", e.target.value)}
                        className="rounded-xl"
                      />
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Advanced Section */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 space-y-4 hover:shadow-md transition-shadow">
              <button
                type="button"
                onClick={() => setAdvancedOpen(!advancedOpen)}
                className="flex items-center justify-between w-full text-gray-900 font-medium"
              >
                <div className="flex items-center gap-2">
                  <div className="w-1 h-5 bg-[#7E1F2E] rounded-full" />
                  Advanced Details
                </div>
                {advancedOpen ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
              </button>

              {advancedOpen && (
                <div className="space-y-6 pt-2 animate-in slide-in-from-top-4">
                  {/* Roles Needed */}
                  <div className="space-y-2">
                    <Label htmlFor="roles">Roles Needed</Label>
                    <Input
                      id="roles"
                      placeholder="e.g., 2 Female (20-25), 1 Male (30-40)"
                      value={formData.rolesNeeded}
                      onChange={(e) => updateField("rolesNeeded", e.target.value)}
                      className="rounded-xl"
                    />
                  </div>

                  {/* Gender Preference */}
                  <div className="space-y-2">
                    <Label htmlFor="gender">Gender Preference</Label>
                    <Select value={formData.gender} onValueChange={(value) => updateField("gender", value)}>
                      <SelectTrigger className="rounded-xl">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="any">Any</SelectItem>
                        <SelectItem value="male">Male</SelectItem>
                        <SelectItem value="female">Female</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                        <SelectItem value="prefer-not-to-say">Prefer not to say</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Age Range */}
                  <div className="space-y-2">
                    <Label>Age Range</Label>
                    <div className="grid grid-cols-2 gap-4">
                      <Input
                        type="number"
                        placeholder="Min"
                        value={formData.ageMin}
                        onChange={(e) => updateField("ageMin", e.target.value)}
                        className="rounded-xl"
                      />
                      <Input
                        type="number"
                        placeholder="Max"
                        value={formData.ageMax}
                        onChange={(e) => updateField("ageMax", e.target.value)}
                        className="rounded-xl"
                      />
                    </div>
                    {formData.ageMin &&
                      formData.ageMax &&
                      Number.parseInt(formData.ageMin) > Number.parseInt(formData.ageMax) && (
                        <p className="text-xs text-red-500 flex items-center gap-1">
                          <AlertCircle className="h-3 w-3" />
                          Min age must be less than or equal to max age
                        </p>
                      )}
                  </div>

                  {/* Languages */}
                  <div className="space-y-2">
                    <Label>Languages (max 4)</Label>
                    <div className="flex flex-wrap gap-2">
                      {LANGUAGES.map((lang) => (
                        <button
                          key={lang}
                          type="button"
                          onClick={() => toggleLanguage(lang)}
                          className={cn(
                            "px-3 py-1.5 rounded-full text-sm font-medium transition-all",
                            formData.languages.includes(lang)
                              ? "bg-[#7E1F2E] text-white"
                              : "bg-gray-100 text-gray-700 hover:bg-gray-200",
                          )}
                          disabled={!formData.languages.includes(lang) && formData.languages.length >= 4}
                        >
                          {lang}
                        </button>
                      ))}
                    </div>
                    <p className="text-xs text-gray-500">{formData.languages.length} / 4 selected</p>
                  </div>

                  {/* Experience */}
                  <div className="space-y-2">
                    <Label htmlFor="experience">Experience Level</Label>
                    <Select value={formData.experience} onValueChange={(value) => updateField("experience", value)}>
                      <SelectTrigger className="rounded-xl">
                        <SelectValue placeholder="Select experience level" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="beginner">Beginner</SelectItem>
                        <SelectItem value="intermediate">Intermediate</SelectItem>
                        <SelectItem value="professional">Professional</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Fee/Pay */}
                  <div className="space-y-3">
                    <Label htmlFor="fee">Fee / Pay</Label>
                    <Select value={formData.feeType} onValueChange={(value) => updateField("feeType", value)}>
                      <SelectTrigger className="rounded-xl">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="not-specified">Not specified</SelectItem>
                        <SelectItem value="free">Free</SelectItem>
                        <SelectItem value="stipend">Stipend</SelectItem>
                        <SelectItem value="paid">Paid</SelectItem>
                      </SelectContent>
                    </Select>
                    {(formData.feeType === "stipend" || formData.feeType === "paid") && (
                      <div className="space-y-2 animate-in slide-in-from-top-2">
                        <Label htmlFor="amount">
                          Amount (₹) <span className="text-red-500">*</span>
                        </Label>
                        <Input
                          id="amount"
                          type="number"
                          placeholder="5000"
                          value={formData.amount}
                          onChange={(e) => updateField("amount", e.target.value)}
                          className="rounded-xl"
                        />
                      </div>
                    )}
                  </div>

                  {/* Visibility */}
                  <div className="space-y-3">
                    <Label>Visibility</Label>
                    <div className="flex gap-2">
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
              )}
            </div>

            {/* Media Request Section */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 space-y-4 hover:shadow-md transition-shadow">
              <div className="flex items-center gap-2 text-gray-900 font-medium">
                <div className="w-1 h-5 bg-[#7E1F2E] rounded-full" />
                Media Request (Optional)
              </div>

              {/* Request Photos */}
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="request-photos"
                    checked={formData.requestPhotos}
                    onCheckedChange={(checked: boolean) => updateField("requestPhotos", checked)}
                  />
                  <Label htmlFor="request-photos" className="font-normal cursor-pointer flex items-center gap-2">
                    <ImageIcon className="h-4 w-4 text-gray-500" />
                    Request Photos
                  </Label>
                </div>
                {formData.requestPhotos && (
                  <div className="ml-6 space-y-2 animate-in slide-in-from-top-2">
                    <Input
                      placeholder="Helper text (e.g., 1 headshot + 1 full body)"
                      value={formData.photoHelper}
                      onChange={(e) => updateField("photoHelper", e.target.value)}
                      className="rounded-xl"
                    />
                    <p className="text-xs text-gray-500">
                      💡 JPG/PNG/WebP up to 5MB each. Ask for 1 headshot + 1 full body.
                    </p>
                  </div>
                )}
              </div>

              {/* Request Videos */}
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="request-videos"
                    checked={formData.requestVideos}
                    onCheckedChange={(checked: boolean) => updateField("requestVideos", checked)}
                  />
                  <Label htmlFor="request-videos" className="font-normal cursor-pointer flex items-center gap-2">
                    <Video className="h-4 w-4 text-gray-500" />
                    Request Video Links
                  </Label>
                </div>
                {formData.requestVideos && (
                  <div className="ml-6 space-y-2 animate-in slide-in-from-top-2">
                    <Input
                      placeholder="Helper text (e.g., 1-min monologue)"
                      value={formData.videoHelper}
                      onChange={(e) => updateField("videoHelper", e.target.value)}
                      className="rounded-xl"
                    />
                    <p className="text-xs text-gray-500">💡 1-min monologue link (YouTube/Vimeo/Drive; shareable).</p>
                  </div>
                )}
              </div>

              {!formData.requestPhotos && !formData.requestVideos && (
                <p className="text-sm text-gray-400 italic">No media requested.</p>
              )}
            </div>

            {/* Consent Section */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 space-y-4 hover:shadow-md transition-shadow">
              <div className="flex items-center gap-2 text-gray-900 font-medium">
                <div className="w-1 h-5 bg-[#7E1F2E] rounded-full" />
                Consent & Agreements
              </div>

              <div className="space-y-3">
                <div className="flex items-start space-x-2">
                  <Checkbox
                    id="consent-genuine"
                    checked={formData.consentGenuine}
                    onCheckedChange={(checked: boolean) => updateField("consentGenuine", checked)}
                    className="mt-1"
                  />
                  <Label htmlFor="consent-genuine" className="font-normal cursor-pointer leading-relaxed">
                    I confirm that all details provided are genuine and that I have the right to conduct this
                    casting/workshop.
                  </Label>
                </div>

                <div className="flex items-start space-x-2">
                  <Checkbox
                    id="consent-terms"
                    checked={formData.consentTerms}
                    onCheckedChange={(checked: boolean) => updateField("consentTerms", checked)}
                    className="mt-1"
                  />
                  <Label htmlFor="consent-terms" className="font-normal cursor-pointer leading-relaxed">
                    I agree to Abhinayपथ's{" "}
                    <a href="/terms" className="text-[#7E1F2E] underline">
                      Terms
                    </a>{" "}
                    &{" "}
                    <a href="/privacy" className="text-[#7E1F2E] underline">
                      Privacy Policy
                    </a>
                    .
                  </Label>
                </div>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex gap-3">
              <Sheet open={applyFlowOpen} onOpenChange={setApplyFlowOpen}>
                <SheetTrigger asChild>
                  <Button variant="outline" className="flex-1 rounded-xl bg-transparent">
                    Preview Apply Flow
                  </Button>
                </SheetTrigger>
                <SheetContent className="sm:max-w-md">
                  <SheetHeader>
                    <SheetTitle>Artist Application Experience</SheetTitle>
                  </SheetHeader>
                  <div className="space-y-6 mt-6">
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-sm text-blue-900">
                      Your Abhinayपथ profile will be shared with the organiser.
                    </div>

                    {formData.requestPhotos && (
                      <div className="space-y-3">
                        <Label>Upload Photos</Label>
                        <div className="grid grid-cols-2 gap-3">
                          {[1, 2, 3].map((i) => (
                            <div
                              key={i}
                              className="aspect-square border-2 border-dashed border-gray-300 rounded-xl flex items-center justify-center hover:border-[#7E1F2E] transition-colors cursor-pointer"
                            >
                              <ImageIcon className="h-8 w-8 text-gray-400" />
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {formData.requestVideos && (
                      <div className="space-y-3">
                        <Label>Video Links</Label>
                        <div className="space-y-2">
                          {[1, 2, 3].map((i) => (
                            <Input key={i} placeholder={`Video link ${i}`} className="rounded-xl" />
                          ))}
                        </div>
                      </div>
                    )}

                    <Button className="w-full rounded-xl" disabled={!formData.requestPhotos && !formData.requestVideos}>
                      Submit Application
                    </Button>
                  </div>
                </SheetContent>
              </Sheet>

              <Button
                onClick={handlePublish}
                disabled={!canPublish}
                className="flex-1 rounded-xl bg-[#7E1F2E] hover:bg-[#6a1a27] disabled:opacity-50"
              >
                Publish Opportunity
              </Button>
            </div>
          </div>

          {/* Right Column - Live Preview */}
          <div className="sticky top-32">
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 space-y-4">
              <div className="flex items-center justify-between text-sm text-gray-500">
                <span>
                  {formData.type ? formData.type.replace("-", " ").toUpperCase() : "TYPE"} •{" "}
                  {formData.locationMode === "city" ? formData.city || "CITY" : "ONLINE"}
                </span>
                <Badge variant="outline" className="rounded-full">
                  {formData.visibility === "public" ? "Public" : "Unlisted"}
                </Badge>
              </div>

              <h2 className="text-2xl font-semibold text-gray-900">
                {formData.title || "Your opportunity title will appear here"}
              </h2>

              <div className="flex items-center gap-4 text-sm text-gray-600">
                <div className="flex items-center gap-1">
                  <CalendarIcon className="h-4 w-4" />
                  Deadline: {formData.deadline ? format(formData.deadline, "PPP") : "Not set"}
                </div>
                <div className="flex items-center gap-1">
                  {formData.locationMode === "city" ? (
                    <>
                      <MapPin className="h-4 w-4" />
                      {formData.city || "City"}
                      {formData.venue && ` • ${formData.venue}`}
                    </>
                  ) : (
                    <>
                      <Globe className="h-4 w-4" />
                      {formData.platform || "Online"}
                    </>
                  )}
                </div>
              </div>

              <div className="border-t pt-4">
                <p className="text-gray-700 whitespace-pre-wrap">
                  {formData.description || "Description will appear here..."}
                </p>
              </div>

              {(formData.rolesNeeded ||
                formData.gender !== "any" ||
                formData.ageMin ||
                formData.languages.length > 0 ||
                formData.experience) && (
                <div className="border-t pt-4 space-y-2">
                  <h3 className="font-medium text-gray-900">Requirements</h3>
                  <div className="space-y-1 text-sm text-gray-600">
                    {formData.rolesNeeded && <p>Roles: {formData.rolesNeeded}</p>}
                    {formData.gender !== "any" && (
                      <p>Gender: {formData.gender.replace("-", " ").replace(/\b\w/g, (l) => l.toUpperCase())}</p>
                    )}
                    {(formData.ageMin || formData.ageMax) && (
                      <p>
                        Age: {formData.ageMin || "Any"} - {formData.ageMax || "Any"}
                      </p>
                    )}
                    {formData.languages.length > 0 && <p>Languages: {formData.languages.join(", ")}</p>}
                    {formData.experience && (
                      <p>Experience: {formData.experience.charAt(0).toUpperCase() + formData.experience.slice(1)}</p>
                    )}
                  </div>
                </div>
              )}

              <div className="border-t pt-4">
                <p className="text-sm text-gray-600">
                  <span className="font-medium text-gray-900">Compensation:</span>{" "}
                  {formData.feeType === "not-specified"
                    ? "Not specified"
                    : formData.feeType === "free"
                      ? "Free"
                      : formData.feeType === "stipend"
                        ? `Stipend: ₹${formData.amount || "TBD"}`
                        : `Paid: ₹${formData.amount || "TBD"}`}
                </p>
              </div>

              <Button className="w-full rounded-xl bg-[#7E1F2E] hover:bg-[#6a1a27]">
                {formData.applicationMethod === "platform" ? "Apply on Abhinayपथ" : "Contact / External"}
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t bg-white py-8 mt-12">
        <div className="container text-center space-y-2">
          <p className="text-sm text-gray-600">© Abhinayपथ • Minimal form, maximal clarity.</p>
          <div className="flex items-center justify-center gap-4 text-xs text-gray-500">
            <a href="/privacy" className="hover:text-[#7E1F2E] transition-colors">
              Privacy Policy
            </a>
            <span>•</span>
            <a href="/terms" className="hover:text-[#7E1F2E] transition-colors">
              Terms
            </a>
            <span>•</span>
            <a href="/report" className="hover:text-[#7E1F2E] transition-colors">
              Report Misuse
            </a>
          </div>
        </div>
      </footer>
    </div>
  )
}
