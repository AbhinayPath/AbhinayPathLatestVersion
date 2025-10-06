"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  Calendar,
  MapPin,
  Globe,
  ChevronDown,
  ChevronUp,
  Info,
  CheckCircle2,
  Upload,
  LinkIcon,
  Sparkles,
} from "lucide-react"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { toast } from "@/hooks/use-toast"
import Link from "next/link"

const languages = [
  "Hindi",
  "English",
  "Marathi",
  "Bengali",
  "Tamil",
  "Telugu",
  "Gujarati",
  "Kannada",
  "Malayalam",
  "Punjabi",
  "Urdu",
  "Odia",
]

export default function PostOpportunityPage() {
  const [formData, setFormData] = useState({
    title: "",
    type: "",
    deadline: "",
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
    languages: [] as string[],
    experience: "",
    feeType: "not-specified",
    feeAmount: "",
    visibility: "public",
    requestPhotos: false,
    photoHelper: "",
    requestVideos: false,
    videoHelper: "",
    consent1: false,
    consent2: false,
  })

  const [advancedOpen, setAdvancedOpen] = useState(false)
  const [contactOpen, setContactOpen] = useState(false)
  const [previewOpen, setPreviewOpen] = useState(false)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const requiredFields = [
      formData.title,
      formData.type,
      formData.deadline,
      formData.locationMode === "city" ? formData.city : true,
      formData.description,
      formData.consent1,
      formData.consent2,
    ]
    const filledFields = requiredFields.filter(Boolean).length
    const progressValue = (filledFields / requiredFields.length) * 100
    setProgress(progressValue)
  }, [formData])

  const handleInputChange = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleLanguageToggle = (lang: string) => {
    setFormData((prev) => {
      const newLanguages = prev.languages.includes(lang)
        ? prev.languages.filter((l) => l !== lang)
        : prev.languages.length < 4
          ? [...prev.languages, lang]
          : prev.languages
      return { ...prev, languages: newLanguages }
    })
  }

  const isFormValid = () => {
    const baseValid =
      formData.title &&
      formData.type &&
      formData.deadline &&
      (formData.locationMode === "city" ? formData.city : true) &&
      formData.description &&
      formData.consent1 &&
      formData.consent2

    const ageValid =
      !formData.ageMin || !formData.ageMax || Number.parseInt(formData.ageMin) <= Number.parseInt(formData.ageMax)
    const feeValid = formData.feeType === "not-specified" || formData.feeType === "free" || formData.feeAmount

    return baseValid && ageValid && feeValid
  }

  const handlePublish = () => {
    if (isFormValid()) {
      toast({
        title: "Published successfully!",
        description: "Your opportunity is now live. You can edit it anytime.",
      })
    }
  }

  const formatDate = (dateString: string) => {
    if (!dateString) return ""
    const date = new Date(dateString)
    return date.toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-purple-50/30">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Header */}
        <div className="mb-8 animate-fade-in">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-3">
              <div className="bg-gradient-to-br from-primary to-primary/80 text-white px-3 py-1.5 rounded-lg text-sm font-semibold shadow-sm">
                AP
              </div>
              <h1 className="text-3xl md:text-4xl font-playfair font-bold text-gray-900">Post Opportunity</h1>
            </div>
            <div className="text-sm text-gray-600 bg-white px-3 py-1.5 rounded-lg border shadow-sm">
              All times <span className="font-semibold text-primary">IST</span>
            </div>
          </div>
          <p className="text-gray-600 flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-primary" />
            Keep it crisp. Artists love clarity.
          </p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8 bg-white p-4 rounded-2xl shadow-sm border animate-fade-in">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700">Completion Progress</span>
            <span className="text-sm font-semibold text-primary">{Math.round(progress)}%</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        {/* Two Column Layout */}
        <div className="grid lg:grid-cols-[1fr,400px] gap-8">
          {/* Left Column - Form */}
          <div className="space-y-6">
            {/* Core Section */}
            <Card className="shadow-md border-0 rounded-2xl overflow-hidden animate-fade-in">
              <CardHeader className="bg-gradient-to-r from-primary/5 to-transparent pb-4">
                <CardTitle className="flex items-center gap-2 text-xl">
                  <CheckCircle2 className="h-5 w-5 text-primary" />
                  Core Details
                </CardTitle>
                <CardDescription>Essential information about your opportunity</CardDescription>
              </CardHeader>
              <CardContent className="pt-6 space-y-5">
                {/* Title */}
                <div className="space-y-2">
                  <Label htmlFor="title" className="text-sm font-medium">
                    Title <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="title"
                    placeholder="e.g., Lead Role in Historical Drama"
                    value={formData.title}
                    onChange={(e) => handleInputChange("title", e.target.value)}
                    className="h-11 rounded-lg border-gray-300 focus:border-primary focus:ring-primary transition-all"
                  />
                </div>

                {/* Type */}
                <div className="space-y-2">
                  <Label htmlFor="type" className="text-sm font-medium">
                    Type <span className="text-red-500">*</span>
                  </Label>
                  <Select value={formData.type} onValueChange={(value) => handleInputChange("type", value)}>
                    <SelectTrigger className="h-11 rounded-lg">
                      <SelectValue placeholder="Select opportunity type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="theatre-play">Theatre Play</SelectItem>
                      <SelectItem value="short-film">Short Film</SelectItem>
                      <SelectItem value="feature-film">Feature Film</SelectItem>
                      <SelectItem value="ad">Advertisement</SelectItem>
                      <SelectItem value="backstage">Backstage Role</SelectItem>
                      <SelectItem value="job">Job Position</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Deadline */}
                <div className="space-y-2">
                  <Label htmlFor="deadline" className="text-sm font-medium flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-primary" />
                    Application Deadline <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="deadline"
                    type="date"
                    min={new Date().toISOString().split("T")[0]}
                    value={formData.deadline}
                    onChange={(e) => handleInputChange("deadline", e.target.value)}
                    className="h-11 rounded-lg border-gray-300 focus:border-primary focus:ring-primary transition-all"
                  />
                </div>

                {/* Location Mode */}
                <div className="space-y-3">
                  <Label className="text-sm font-medium">Location Mode</Label>
                  <RadioGroup
                    value={formData.locationMode}
                    onValueChange={(value) => handleInputChange("locationMode", value)}
                    className="flex gap-4"
                  >
                    <div className="flex items-center space-x-2 bg-gray-50 px-4 py-3 rounded-lg border-2 border-transparent has-[:checked]:border-primary has-[:checked]:bg-primary/5 transition-all cursor-pointer">
                      <RadioGroupItem value="city" id="city" />
                      <Label htmlFor="city" className="cursor-pointer flex items-center gap-2">
                        <MapPin className="h-4 w-4" />
                        City
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2 bg-gray-50 px-4 py-3 rounded-lg border-2 border-transparent has-[:checked]:border-primary has-[:checked]:bg-primary/5 transition-all cursor-pointer">
                      <RadioGroupItem value="online" id="online" />
                      <Label htmlFor="online" className="cursor-pointer flex items-center gap-2">
                        <Globe className="h-4 w-4" />
                        Online
                      </Label>
                    </div>
                  </RadioGroup>
                </div>

                {/* City Fields */}
                {formData.locationMode === "city" && (
                  <div className="grid md:grid-cols-2 gap-4 animate-fade-in">
                    <div className="space-y-2">
                      <Label htmlFor="city" className="text-sm font-medium">
                        City <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="city"
                        placeholder="e.g., Mumbai"
                        value={formData.city}
                        onChange={(e) => handleInputChange("city", e.target.value)}
                        className="h-11 rounded-lg"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="venue" className="text-sm font-medium">
                        Venue <span className="text-gray-400">(optional)</span>
                      </Label>
                      <Input
                        id="venue"
                        placeholder="e.g., Prithvi Theatre"
                        value={formData.venue}
                        onChange={(e) => handleInputChange("venue", e.target.value)}
                        className="h-11 rounded-lg"
                      />
                    </div>
                  </div>
                )}

                {/* Online Platform */}
                {formData.locationMode === "online" && (
                  <div className="space-y-2 animate-fade-in">
                    <Label htmlFor="platform" className="text-sm font-medium">
                      Platform <span className="text-gray-400">(optional)</span>
                    </Label>
                    <Input
                      id="platform"
                      placeholder="e.g., Zoom, Google Meet"
                      value={formData.platform}
                      onChange={(e) => handleInputChange("platform", e.target.value)}
                      className="h-11 rounded-lg"
                    />
                  </div>
                )}

                {/* Description */}
                <div className="space-y-2">
                  <Label htmlFor="description" className="text-sm font-medium">
                    Description <span className="text-red-500">*</span>
                  </Label>
                  <Textarea
                    id="description"
                    placeholder="What to prepare, key dates, audition flow..."
                    value={formData.description}
                    onChange={(e) => handleInputChange("description", e.target.value)}
                    className="min-h-[120px] rounded-lg border-gray-300 focus:border-primary focus:ring-primary transition-all resize-none"
                  />
                  <p className="text-xs text-gray-500 flex items-start gap-1">
                    <Info className="h-3 w-3 mt-0.5 flex-shrink-0" />
                    Include what artists should prepare, important dates, and audition process details
                  </p>
                </div>

                {/* Application Method */}
                <div className="space-y-3">
                  <Label className="text-sm font-medium">Application Method</Label>
                  <RadioGroup
                    value={formData.applicationMethod}
                    onValueChange={(value) => handleInputChange("applicationMethod", value)}
                    className="space-y-3"
                  >
                    <div className="flex items-center space-x-3 bg-primary/5 border-2 border-primary px-4 py-3 rounded-lg">
                      <RadioGroupItem value="platform" id="platform-apply" />
                      <Label htmlFor="platform-apply" className="cursor-pointer flex-1">
                        <span className="font-medium">Quick Apply on Abhinayपथ</span>
                        <p className="text-xs text-gray-600 mt-0.5">Recommended for faster applications</p>
                      </Label>
                    </div>
                    <div className="flex items-center space-x-3 bg-gray-50 px-4 py-3 rounded-lg border-2 border-transparent has-[:checked]:border-primary has-[:checked]:bg-primary/5 transition-all">
                      <RadioGroupItem value="whatsapp" id="whatsapp" />
                      <Label htmlFor="whatsapp" className="cursor-pointer">
                        WhatsApp
                      </Label>
                    </div>
                    <div className="flex items-center space-x-3 bg-gray-50 px-4 py-3 rounded-lg border-2 border-transparent has-[:checked]:border-primary has-[:checked]:bg-primary/5 transition-all">
                      <RadioGroupItem value="email" id="email" />
                      <Label htmlFor="email" className="cursor-pointer">
                        Email
                      </Label>
                    </div>
                    <div className="flex items-center space-x-3 bg-gray-50 px-4 py-3 rounded-lg border-2 border-transparent has-[:checked]:border-primary has-[:checked]:bg-primary/5 transition-all">
                      <RadioGroupItem value="external" id="external" />
                      <Label htmlFor="external" className="cursor-pointer">
                        External Form
                      </Label>
                    </div>
                  </RadioGroup>
                </div>

                {/* Optional Contact */}
                {formData.applicationMethod !== "platform" && (
                  <Collapsible open={contactOpen} onOpenChange={setContactOpen} className="animate-fade-in">
                    <CollapsibleTrigger className="flex items-center justify-between w-full text-sm font-medium text-primary hover:text-primary/80 transition-colors">
                      <span>Optional Contact Details</span>
                      {contactOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                    </CollapsibleTrigger>
                    <CollapsibleContent className="mt-3">
                      <div className="space-y-2">
                        <Label htmlFor="contactInfo" className="text-sm font-medium">
                          {formData.applicationMethod === "whatsapp"
                            ? "WhatsApp Number"
                            : formData.applicationMethod === "email"
                              ? "Email Address"
                              : "Form URL"}
                        </Label>
                        <Input
                          id="contactInfo"
                          placeholder={
                            formData.applicationMethod === "whatsapp"
                              ? "+91 98765 43210"
                              : formData.applicationMethod === "email"
                                ? "casting@example.com"
                                : "https://forms.google.com/..."
                          }
                          value={formData.contactInfo}
                          onChange={(e) => handleInputChange("contactInfo", e.target.value)}
                          className="h-11 rounded-lg"
                        />
                      </div>
                    </CollapsibleContent>
                  </Collapsible>
                )}
              </CardContent>
            </Card>

            {/* Advanced Section */}
            <Collapsible open={advancedOpen} onOpenChange={setAdvancedOpen} className="animate-fade-in">
              <Card className="shadow-md border-0 rounded-2xl overflow-hidden">
                <CardHeader className="bg-gradient-to-r from-purple-50 to-transparent pb-4">
                  <CollapsibleTrigger className="flex items-center justify-between w-full text-left group">
                    <div>
                      <CardTitle className="flex items-center gap-2 text-xl group-hover:text-primary transition-colors">
                        <Info className="h-5 w-5" />
                        Advanced Details
                        <Badge variant="secondary" className="ml-2">
                          Optional
                        </Badge>
                      </CardTitle>
                      <CardDescription>Specify requirements and preferences</CardDescription>
                    </div>
                    {advancedOpen ? (
                      <ChevronUp className="h-5 w-5 text-primary" />
                    ) : (
                      <ChevronDown className="h-5 w-5 text-gray-400 group-hover:text-primary transition-colors" />
                    )}
                  </CollapsibleTrigger>
                </CardHeader>
                <CollapsibleContent>
                  <CardContent className="pt-6 space-y-5">
                    {/* Roles Needed */}
                    <div className="space-y-2">
                      <Label htmlFor="roles" className="text-sm font-medium">
                        Roles Needed
                      </Label>
                      <Input
                        id="roles"
                        placeholder="e.g., 2 Female (20-25), 1 Male (30-40)"
                        value={formData.rolesNeeded}
                        onChange={(e) => handleInputChange("rolesNeeded", e.target.value)}
                        className="h-11 rounded-lg"
                      />
                    </div>

                    {/* Gender Preference */}
                    <div className="space-y-2">
                      <Label htmlFor="gender" className="text-sm font-medium">
                        Gender Preference
                      </Label>
                      <Select value={formData.gender} onValueChange={(value) => handleInputChange("gender", value)}>
                        <SelectTrigger className="h-11 rounded-lg">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="any">Any</SelectItem>
                          <SelectItem value="male">Male</SelectItem>
                          <SelectItem value="female">Female</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                          <SelectItem value="not-say">Prefer not to say</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Age Range */}
                    <div className="space-y-2">
                      <Label className="text-sm font-medium">Age Range</Label>
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <Input
                            type="number"
                            placeholder="Min"
                            value={formData.ageMin}
                            onChange={(e) => handleInputChange("ageMin", e.target.value)}
                            className="h-11 rounded-lg"
                            min="0"
                            max="100"
                          />
                        </div>
                        <div>
                          <Input
                            type="number"
                            placeholder="Max"
                            value={formData.ageMax}
                            onChange={(e) => handleInputChange("ageMax", e.target.value)}
                            className="h-11 rounded-lg"
                            min="0"
                            max="100"
                          />
                        </div>
                      </div>
                      {formData.ageMin &&
                        formData.ageMax &&
                        Number.parseInt(formData.ageMin) > Number.parseInt(formData.ageMax) && (
                          <p className="text-xs text-red-500">Min age cannot be greater than max age</p>
                        )}
                    </div>

                    {/* Languages */}
                    <div className="space-y-3">
                      <Label className="text-sm font-medium">
                        Languages <span className="text-gray-400 font-normal">(Select up to 4)</span>
                      </Label>
                      <div className="flex flex-wrap gap-2">
                        {languages.map((lang) => (
                          <button
                            key={lang}
                            onClick={() => handleLanguageToggle(lang)}
                            disabled={!formData.languages.includes(lang) && formData.languages.length >= 4}
                            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                              formData.languages.includes(lang)
                                ? "bg-primary text-white shadow-sm"
                                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                            } disabled:opacity-50 disabled:cursor-not-allowed`}
                          >
                            {lang}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Experience Level */}
                    <div className="space-y-2">
                      <Label htmlFor="experience" className="text-sm font-medium">
                        Experience Level
                      </Label>
                      <Select
                        value={formData.experience}
                        onValueChange={(value) => handleInputChange("experience", value)}
                      >
                        <SelectTrigger className="h-11 rounded-lg">
                          <SelectValue placeholder="Select experience level" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="beginner">Beginner</SelectItem>
                          <SelectItem value="intermediate">Intermediate</SelectItem>
                          <SelectItem value="professional">Professional</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Fee / Pay */}
                    <div className="space-y-3">
                      <Label className="text-sm font-medium">Fee / Pay</Label>
                      <Select value={formData.feeType} onValueChange={(value) => handleInputChange("feeType", value)}>
                        <SelectTrigger className="h-11 rounded-lg">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="not-specified">Not specified</SelectItem>
                          <SelectItem value="free">Free / Volunteer</SelectItem>
                          <SelectItem value="stipend">Stipend</SelectItem>
                          <SelectItem value="paid">Paid</SelectItem>
                        </SelectContent>
                      </Select>
                      {(formData.feeType === "stipend" || formData.feeType === "paid") && (
                        <div className="space-y-2 animate-fade-in">
                          <Label htmlFor="amount" className="text-sm font-medium">
                            Amount (₹) <span className="text-red-500">*</span>
                          </Label>
                          <Input
                            id="amount"
                            type="number"
                            placeholder="e.g., 5000"
                            value={formData.feeAmount}
                            onChange={(e) => handleInputChange("feeAmount", e.target.value)}
                            className="h-11 rounded-lg"
                          />
                        </div>
                      )}
                    </div>

                    {/* Visibility */}
                    <div className="space-y-3">
                      <Label className="text-sm font-medium">Visibility</Label>
                      <RadioGroup
                        value={formData.visibility}
                        onValueChange={(value) => handleInputChange("visibility", value)}
                        className="flex gap-4"
                      >
                        <div className="flex items-center space-x-2 bg-gray-50 px-4 py-3 rounded-lg border-2 border-transparent has-[:checked]:border-primary has-[:checked]:bg-primary/5 transition-all cursor-pointer flex-1">
                          <RadioGroupItem value="public" id="public" />
                          <Label htmlFor="public" className="cursor-pointer flex-1">
                            <span className="font-medium">Public</span>
                            <p className="text-xs text-gray-600">Visible to all users</p>
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2 bg-gray-50 px-4 py-3 rounded-lg border-2 border-transparent has-[:checked]:border-primary has-[:checked]:bg-primary/5 transition-all cursor-pointer flex-1">
                          <RadioGroupItem value="unlisted" id="unlisted" />
                          <Label htmlFor="unlisted" className="cursor-pointer flex-1">
                            <span className="font-medium">Unlisted</span>
                            <p className="text-xs text-gray-600">Only via direct link</p>
                          </Label>
                        </div>
                      </RadioGroup>
                    </div>
                  </CardContent>
                </CollapsibleContent>
              </Card>
            </Collapsible>

            {/* Media Request Section */}
            <Card className="shadow-md border-0 rounded-2xl overflow-hidden animate-fade-in">
              <CardHeader className="bg-gradient-to-r from-blue-50 to-transparent pb-4">
                <CardTitle className="flex items-center gap-2 text-xl">
                  <Upload className="h-5 w-5 text-primary" />
                  Media Request
                  <Badge variant="secondary" className="ml-2">
                    Optional
                  </Badge>
                </CardTitle>
                <CardDescription>Request photos or video links from applicants</CardDescription>
              </CardHeader>
              <CardContent className="pt-6 space-y-5">
                {/* Request Photos */}
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <Checkbox
                      id="photos"
                      checked={formData.requestPhotos}
                      onCheckedChange={(checked) => handleInputChange("requestPhotos", checked)}
                    />
                    <Label htmlFor="photos" className="cursor-pointer font-medium">
                      Request Photos
                    </Label>
                  </div>
                  {formData.requestPhotos && (
                    <div className="ml-7 space-y-2 animate-fade-in">
                      <Input
                        placeholder="Helper text (optional, e.g., '1 headshot and 1 full body shot')"
                        value={formData.photoHelper}
                        onChange={(e) => handleInputChange("photoHelper", e.target.value)}
                        className="h-11 rounded-lg"
                      />
                      <p className="text-xs text-gray-500 flex items-start gap-1">
                        <Info className="h-3 w-3 mt-0.5 flex-shrink-0" />
                        JPG/PNG/WebP up to 5MB each. Ask for 1 headshot + 1 full body shot
                      </p>
                    </div>
                  )}
                </div>

                {/* Request Videos */}
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <Checkbox
                      id="videos"
                      checked={formData.requestVideos}
                      onCheckedChange={(checked) => handleInputChange("requestVideos", checked)}
                    />
                    <Label htmlFor="videos" className="cursor-pointer font-medium">
                      Request Video Links
                    </Label>
                  </div>
                  {formData.requestVideos && (
                    <div className="ml-7 space-y-2 animate-fade-in">
                      <Input
                        placeholder="Helper text (optional, e.g., '1-minute monologue')"
                        value={formData.videoHelper}
                        onChange={(e) => handleInputChange("videoHelper", e.target.value)}
                        className="h-11 rounded-lg"
                      />
                      <p className="text-xs text-gray-500 flex items-start gap-1">
                        <Info className="h-3 w-3 mt-0.5 flex-shrink-0" />
                        1-min monologue link (YouTube/Vimeo/Drive; shareable)
                      </p>
                    </div>
                  )}
                </div>

                {!formData.requestPhotos && !formData.requestVideos && (
                  <div className="text-center py-8 text-gray-400">
                    <Upload className="h-12 w-12 mx-auto mb-2 opacity-30" />
                    <p className="text-sm">No media requested</p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Consent Section */}
            <Card className="shadow-md border-0 rounded-2xl overflow-hidden border-l-4 border-l-primary animate-fade-in">
              <CardContent className="pt-6 space-y-4">
                <div className="flex items-start space-x-3">
                  <Checkbox
                    id="consent1"
                    checked={formData.consent1}
                    onCheckedChange={(checked) => handleInputChange("consent1", checked)}
                    className="mt-0.5"
                  />
                  <Label htmlFor="consent1" className="cursor-pointer text-sm leading-relaxed">
                    I confirm that all details provided are genuine and that I have the right to conduct this
                    casting/workshop. <span className="text-red-500">*</span>
                  </Label>
                </div>
                <div className="flex items-start space-x-3">
                  <Checkbox
                    id="consent2"
                    checked={formData.consent2}
                    onCheckedChange={(checked) => handleInputChange("consent2", checked)}
                    className="mt-0.5"
                  />
                  <Label htmlFor="consent2" className="cursor-pointer text-sm leading-relaxed">
                    I agree to Abhinayपथ's{" "}
                    <Link href="/privacy" className="text-primary hover:underline font-medium">
                      Privacy Policy
                    </Link>{" "}
                    and{" "}
                    <Link href="/terms" className="text-primary hover:underline font-medium">
                      Terms of Service
                    </Link>
                    . <span className="text-red-500">*</span>
                  </Label>
                </div>
              </CardContent>
            </Card>

            {/* Action Buttons */}
            <div className="flex gap-4 animate-fade-in">
              <Button
                onClick={handlePublish}
                disabled={!isFormValid()}
                className="flex-1 h-12 text-base font-semibold rounded-xl shadow-md hover:shadow-lg transition-all disabled:opacity-50"
              >
                <CheckCircle2 className="mr-2 h-5 w-5" />
                Publish Opportunity
              </Button>
              <Button
                onClick={() => setPreviewOpen(true)}
                variant="outline"
                className="h-12 px-6 rounded-xl border-2 hover:bg-primary/5 transition-all"
              >
                Preview Apply Flow
              </Button>
            </div>
          </div>

          {/* Right Column - Live Preview */}
          <div className="lg:sticky lg:top-8 h-fit">
            <Card className="shadow-lg border-0 rounded-2xl overflow-hidden animate-fade-in">
              <CardHeader className="bg-gradient-to-br from-primary to-primary/80 text-white pb-4">
                <CardTitle className="text-lg flex items-center justify-between">
                  <span>Live Preview</span>
                  <Badge variant="secondary" className="bg-white/20 text-white border-0">
                    {formData.visibility === "public" ? "Public" : "Unlisted"}
                  </Badge>
                </CardTitle>
                <CardDescription className="text-white/80">How artists will see your post</CardDescription>
              </CardHeader>
              <CardContent className="pt-6 space-y-4">
                {/* Type and Location Badge */}
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Badge variant="outline" className="font-normal">
                    {formData.type ? formData.type.replace("-", " ").replace(/\b\w/g, (l) => l.toUpperCase()) : "Type"}
                  </Badge>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    {formData.locationMode === "city" ? (
                      <>
                        <MapPin className="h-3.5 w-3.5" />
                        {formData.city || "City"}
                      </>
                    ) : (
                      <>
                        <Globe className="h-3.5 w-3.5" />
                        Online
                      </>
                    )}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-2xl font-playfair font-bold text-gray-900 leading-tight">
                  {formData.title || "Your Opportunity Title"}
                </h3>

                {/* Deadline and Location */}
                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <span className="flex items-center gap-1.5 font-medium">
                    <Calendar className="h-4 w-4 text-primary" />
                    Deadline: {formData.deadline ? formatDate(formData.deadline) : "Not set"}
                  </span>
                  {formData.locationMode === "city" && formData.venue && (
                    <>
                      <span>•</span>
                      <span>{formData.venue}</span>
                    </>
                  )}
                  {formData.locationMode === "online" && formData.platform && (
                    <>
                      <span>•</span>
                      <span>{formData.platform}</span>
                    </>
                  )}
                </div>

                {/* Description */}
                <div className="pt-2">
                  <p className="text-gray-700 text-sm leading-relaxed line-clamp-4">
                    {formData.description || "Your opportunity description will appear here..."}
                  </p>
                </div>

                {/* Requirements */}
                {(formData.gender !== "any" ||
                  formData.ageMin ||
                  formData.ageMax ||
                  formData.languages.length > 0 ||
                  formData.experience) && (
                  <div className="pt-2 space-y-2 border-t">
                    <h4 className="text-sm font-semibold text-gray-900">Requirements</h4>
                    <div className="flex flex-wrap gap-2">
                      {formData.gender !== "any" && (
                        <Badge variant="secondary" className="font-normal">
                          {formData.gender.replace("-", " ").replace(/\b\w/g, (l) => l.toUpperCase())}
                        </Badge>
                      )}
                      {(formData.ageMin || formData.ageMax) && (
                        <Badge variant="secondary" className="font-normal">
                          Age: {formData.ageMin || "?"}-{formData.ageMax || "?"}
                        </Badge>
                      )}
                      {formData.languages.map((lang) => (
                        <Badge key={lang} variant="secondary" className="font-normal">
                          {lang}
                        </Badge>
                      ))}
                      {formData.experience && (
                        <Badge variant="secondary" className="font-normal">
                          {formData.experience.charAt(0).toUpperCase() + formData.experience.slice(1)}
                        </Badge>
                      )}
                    </div>
                  </div>
                )}

                {/* Pay */}
                <div className="pt-2 border-t">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Compensation</span>
                    <span className="font-semibold text-gray-900">
                      {formData.feeType === "not-specified" && "Not specified"}
                      {formData.feeType === "free" && "Free / Volunteer"}
                      {formData.feeType === "stipend" &&
                        (formData.feeAmount ? `₹${formData.feeAmount} (Stipend)` : "Stipend")}
                      {formData.feeType === "paid" && (formData.feeAmount ? `₹${formData.feeAmount}` : "Paid")}
                    </span>
                  </div>
                </div>

                {/* CTA Button */}
                <Button className="w-full h-11 font-semibold rounded-lg shadow-md hover:shadow-lg transition-all mt-4">
                  {formData.applicationMethod === "platform" && "Apply on Abhinayपथ"}
                  {formData.applicationMethod === "whatsapp" && "Apply via WhatsApp"}
                  {formData.applicationMethod === "email" && "Apply via Email"}
                  {formData.applicationMethod === "external" && "Apply via External Form"}
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-12 text-center text-sm text-gray-600 border-t pt-8">
          <p className="mb-2">© Abhinayपथ • Minimal form, maximal clarity.</p>
          <div className="flex items-center justify-center gap-4">
            <Link href="/privacy" className="hover:text-primary transition-colors">
              Privacy Policy
            </Link>
            <span>•</span>
            <Link href="/terms" className="hover:text-primary transition-colors">
              Terms of Service
            </Link>
            <span>•</span>
            <Link href="/report" className="hover:text-primary transition-colors">
              Report Misuse
            </Link>
          </div>
        </div>
      </div>

      {/* Apply Flow Preview Sheet */}
      <Sheet open={previewOpen} onOpenChange={setPreviewOpen}>
        <SheetContent className="w-full sm:max-w-lg overflow-y-auto">
          <SheetHeader>
            <SheetTitle>Artist Application Experience</SheetTitle>
            <SheetDescription>This is how artists will apply to your opportunity</SheetDescription>
          </SheetHeader>
          <div className="mt-6 space-y-6">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-sm">
              <p className="text-blue-900">
                <strong>Note:</strong> Your Abhinayपथ profile will be shared with the organizer.
              </p>
            </div>

            {formData.requestPhotos && (
              <div className="space-y-3">
                <Label className="text-base font-semibold">Upload Photos</Label>
                {formData.photoHelper && <p className="text-sm text-gray-600">{formData.photoHelper}</p>}
                <div className="grid grid-cols-2 gap-3">
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 flex flex-col items-center justify-center text-gray-400 hover:border-primary hover:bg-primary/5 transition-all cursor-pointer">
                    <Upload className="h-8 w-8 mb-2" />
                    <span className="text-sm">Photo 1</span>
                  </div>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 flex flex-col items-center justify-center text-gray-400 hover:border-primary hover:bg-primary/5 transition-all cursor-pointer">
                    <Upload className="h-8 w-8 mb-2" />
                    <span className="text-sm">Photo 2</span>
                  </div>
                </div>
                <p className="text-xs text-gray-500">JPG, PNG, or WebP • Max 5MB each</p>
              </div>
            )}

            {formData.requestVideos && (
              <div className="space-y-3">
                <Label className="text-base font-semibold">Video Links</Label>
                {formData.videoHelper && <p className="text-sm text-gray-600">{formData.videoHelper}</p>}
                <div className="space-y-2">
                  <Input placeholder="https://youtube.com/watch?v=..." className="h-11 rounded-lg" disabled />
                  <Input placeholder="https://vimeo.com/..." className="h-11 rounded-lg" disabled />
                  <Input placeholder="https://drive.google.com/..." className="h-11 rounded-lg" disabled />
                </div>
                <p className="text-xs text-gray-500 flex items-center gap-1">
                  <LinkIcon className="h-3 w-3" />
                  YouTube, Vimeo, or Google Drive links
                </p>
              </div>
            )}

            {!formData.requestPhotos && !formData.requestVideos && (
              <div className="text-center py-12 text-gray-400">
                <Info className="h-12 w-12 mx-auto mb-3 opacity-30" />
                <p className="text-sm">No additional media required</p>
                <p className="text-xs mt-1">Artists can apply directly with their profile</p>
              </div>
            )}

            <Button
              className="w-full h-12 font-semibold rounded-lg"
              disabled={formData.requestPhotos || formData.requestVideos}
            >
              Submit Application
            </Button>
            <p className="text-xs text-center text-gray-500">Button will be enabled once required media is uploaded</p>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  )
}
