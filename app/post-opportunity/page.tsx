"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { Progress } from "@/components/ui/progress"
import {
  CalendarIcon,
  ChevronDown,
  MapPin,
  Globe,
  Briefcase,
  Users,
  DollarSign,
  Film,
  FileText,
  Upload,
  LinkIcon,
  CheckCircle2,
  AlertCircle,
  Sparkles,
} from "lucide-react"
import { format } from "date-fns"
import { cn } from "@/lib/utils"
import { toast } from "sonner"
import Link from "next/link"

const opportunityTypes = ["Theatre Play", "Short Film", "Feature Film", "Ad", "Backstage", "Job"]

const genderOptions = ["Any", "Male", "Female", "Other", "Prefer not to say"]

const experienceLevels = ["Beginner", "Intermediate", "Professional"]

const languageOptions = [
  "Hindi",
  "English",
  "Tamil",
  "Telugu",
  "Malayalam",
  "Kannada",
  "Bengali",
  "Marathi",
  "Gujarati",
  "Punjabi",
]

const payOptions = ["Not specified", "Free", "Stipend", "Paid"]

export default function PostOpportunityPage() {
  // Core fields
  const [title, setTitle] = useState("")
  const [type, setType] = useState("")
  const [deadline, setDeadline] = useState<Date>()
  const [locationMode, setLocationMode] = useState<"city" | "online">("city")
  const [city, setCity] = useState("")
  const [venue, setVenue] = useState("")
  const [platform, setPlatform] = useState("")
  const [description, setDescription] = useState("")
  const [applicationMethod, setApplicationMethod] = useState("platform")
  const [contactInfo, setContactInfo] = useState("")

  // Advanced fields
  const [advancedOpen, setAdvancedOpen] = useState(false)
  const [rolesNeeded, setRolesNeeded] = useState("")
  const [gender, setGender] = useState("Any")
  const [ageMin, setAgeMin] = useState("")
  const [ageMax, setAgeMax] = useState("")
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>([])
  const [experience, setExperience] = useState("Beginner")
  const [pay, setPay] = useState("Not specified")
  const [amount, setAmount] = useState("")
  const [visibility, setVisibility] = useState<"public" | "unlisted">("public")

  // Media request
  const [requestPhotos, setRequestPhotos] = useState(false)
  const [photoHelperText, setPhotoHelperText] = useState("")
  const [requestVideos, setRequestVideos] = useState(false)
  const [videoHelperText, setVideoHelperText] = useState("")

  // Consent
  const [genuineConsent, setGenuineConsent] = useState(false)
  const [termsConsent, setTermsConsent] = useState(false)

  // UI state
  const [contactOpen, setContactOpen] = useState(false)
  const [applyFlowOpen, setApplyFlowOpen] = useState(false)
  const [progress, setProgress] = useState(0)

  // Calculate form completion progress
  useEffect(() => {
    const requiredFields = [
      title,
      type,
      deadline,
      locationMode === "city" ? city : true,
      description,
      genuineConsent,
      termsConsent,
    ]

    const filledFields = requiredFields.filter(Boolean).length
    const progressPercentage = (filledFields / requiredFields.length) * 100
    setProgress(progressPercentage)
  }, [title, type, deadline, city, locationMode, description, genuineConsent, termsConsent])

  const toggleLanguage = (lang: string) => {
    if (selectedLanguages.includes(lang)) {
      setSelectedLanguages(selectedLanguages.filter((l) => l !== lang))
    } else if (selectedLanguages.length < 4) {
      setSelectedLanguages([...selectedLanguages, lang])
    }
  }

  const isFormValid = () => {
    if (!title || !type || !deadline || !description || !genuineConsent || !termsConsent) {
      return false
    }
    if (locationMode === "city" && !city) {
      return false
    }
    if (ageMin && ageMax && Number.parseInt(ageMin) > Number.parseInt(ageMax)) {
      return false
    }
    if ((pay === "Stipend" || pay === "Paid") && !amount) {
      return false
    }
    return true
  }

  const handlePublish = () => {
    if (isFormValid()) {
      toast.success("Published. You can edit anytime.")
      // Handle actual publish logic here
    }
  }

  const getApplicationMethodLabel = () => {
    switch (applicationMethod) {
      case "platform":
        return "Apply on Abhinayपथ"
      case "whatsapp":
        return "Contact via WhatsApp"
      case "email":
        return "Contact via Email"
      case "external":
        return "Apply via External Form"
      default:
        return "Apply"
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-purple-50/20">
      {/* Header */}
      <div className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-600 to-purple-700 flex items-center justify-center text-white font-bold text-sm shadow-lg">
                AP
              </div>
              <div>
                <h1 className="text-2xl font-playfair font-bold text-gray-900">Post Opportunity</h1>
                <p className="text-sm text-gray-600">Keep it crisp. Artists love clarity.</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-xs text-gray-500 uppercase tracking-wide">All times IST</p>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mt-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-medium text-gray-600">Form completion</span>
              <span className="text-xs font-semibold text-purple-600">{Math.round(progress)}%</span>
            </div>
            <Progress value={progress} className="h-1.5" />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-2 gap-8 max-w-7xl mx-auto">
          {/* Left Column - Form */}
          <div className="space-y-6">
            {/* Core Section */}
            <Card className="border-2 shadow-soft hover:shadow-lg transition-shadow duration-300">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Briefcase className="w-5 h-5 text-purple-600" />
                  Core Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-5">
                {/* Title */}
                <div className="space-y-2">
                  <Label htmlFor="title" className="text-sm font-medium text-gray-700">
                    Title <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="e.g., Auditions for Macbeth"
                    className="h-11 transition-all duration-200 focus:ring-2 focus:ring-purple-500"
                  />
                </div>

                {/* Type */}
                <div className="space-y-2">
                  <Label htmlFor="type" className="text-sm font-medium text-gray-700">
                    Type <span className="text-red-500">*</span>
                  </Label>
                  <Select value={type} onValueChange={setType}>
                    <SelectTrigger className="h-11">
                      <SelectValue placeholder="Select opportunity type" />
                    </SelectTrigger>
                    <SelectContent>
                      {opportunityTypes.map((t) => (
                        <SelectItem key={t} value={t}>
                          {t}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Deadline */}
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-gray-700">
                    Deadline <span className="text-red-500">*</span>
                  </Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full h-11 justify-start text-left font-normal",
                          !deadline && "text-muted-foreground",
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {deadline ? format(deadline, "PPP") : <span>Pick a date</span>}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={deadline}
                        onSelect={setDeadline}
                        disabled={(date) => date < new Date()}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>

                {/* Location Mode Toggle */}
                <div className="space-y-3">
                  <Label className="text-sm font-medium text-gray-700">Location Mode</Label>
                  <div className="flex gap-2">
                    <Button
                      type="button"
                      variant={locationMode === "city" ? "default" : "outline"}
                      onClick={() => setLocationMode("city")}
                      className="flex-1 h-11"
                    >
                      <MapPin className="w-4 h-4 mr-2" />
                      City
                    </Button>
                    <Button
                      type="button"
                      variant={locationMode === "online" ? "default" : "outline"}
                      onClick={() => setLocationMode("online")}
                      className="flex-1 h-11"
                    >
                      <Globe className="w-4 h-4 mr-2" />
                      Online
                    </Button>
                  </div>
                </div>

                {/* Conditional Location Fields */}
                {locationMode === "city" ? (
                  <div className="space-y-4 animate-fade-in">
                    <div className="space-y-2">
                      <Label htmlFor="city" className="text-sm font-medium text-gray-700">
                        City <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="city"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        placeholder="e.g., Mumbai"
                        className="h-11"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="venue" className="text-sm font-medium text-gray-700">
                        Venue <span className="text-gray-400 text-xs">(optional)</span>
                      </Label>
                      <Input
                        id="venue"
                        value={venue}
                        onChange={(e) => setVenue(e.target.value)}
                        placeholder="e.g., Prithvi Theatre"
                        className="h-11"
                      />
                    </div>
                  </div>
                ) : (
                  <div className="space-y-2 animate-fade-in">
                    <Label htmlFor="platform" className="text-sm font-medium text-gray-700">
                      Platform <span className="text-gray-400 text-xs">(optional)</span>
                    </Label>
                    <Input
                      id="platform"
                      value={platform}
                      onChange={(e) => setPlatform(e.target.value)}
                      placeholder="e.g., Zoom, Google Meet"
                      className="h-11"
                    />
                  </div>
                )}

                {/* Description */}
                <div className="space-y-2">
                  <Label htmlFor="description" className="text-sm font-medium text-gray-700">
                    Description <span className="text-red-500">*</span>
                  </Label>
                  <Textarea
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="What to prepare, key dates, audition flow..."
                    className="min-h-[120px] resize-none transition-all duration-200 focus:ring-2 focus:ring-purple-500"
                  />
                  <p className="text-xs text-gray-500">What to prepare, key dates, audition flow</p>
                </div>

                {/* Application Method */}
                <div className="space-y-3">
                  <Label className="text-sm font-medium text-gray-700">Application Method</Label>
                  <RadioGroup value={applicationMethod} onValueChange={setApplicationMethod}>
                    <div className="flex items-center space-x-2 py-2">
                      <RadioGroupItem value="platform" id="platform-method" />
                      <Label htmlFor="platform-method" className="font-normal cursor-pointer">
                        Quick Apply on Abhinayपथ <span className="text-xs text-purple-600">(Recommended)</span>
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2 py-2">
                      <RadioGroupItem value="whatsapp" id="whatsapp-method" />
                      <Label htmlFor="whatsapp-method" className="font-normal cursor-pointer">
                        WhatsApp
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2 py-2">
                      <RadioGroupItem value="email" id="email-method" />
                      <Label htmlFor="email-method" className="font-normal cursor-pointer">
                        Email
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2 py-2">
                      <RadioGroupItem value="external" id="external-method" />
                      <Label htmlFor="external-method" className="font-normal cursor-pointer">
                        External Form
                      </Label>
                    </div>
                  </RadioGroup>
                </div>

                {/* Optional Contact - Collapsible */}
                {applicationMethod !== "platform" && (
                  <Collapsible open={contactOpen} onOpenChange={setContactOpen}>
                    <CollapsibleTrigger className="flex items-center justify-between w-full py-2 text-sm font-medium text-gray-700 hover:text-purple-600 transition-colors">
                      <span>Contact Information</span>
                      <ChevronDown className={cn("w-4 h-4 transition-transform", contactOpen && "rotate-180")} />
                    </CollapsibleTrigger>
                    <CollapsibleContent className="pt-3 animate-fade-in">
                      <Input
                        value={contactInfo}
                        onChange={(e) => setContactInfo(e.target.value)}
                        placeholder={
                          applicationMethod === "whatsapp"
                            ? "WhatsApp number"
                            : applicationMethod === "email"
                              ? "Email address"
                              : "Form URL"
                        }
                        className="h-11"
                      />
                    </CollapsibleContent>
                  </Collapsible>
                )}
              </CardContent>
            </Card>

            {/* Advanced Section - Collapsible */}
            <Card className="border-2 shadow-soft hover:shadow-lg transition-shadow duration-300">
              <Collapsible open={advancedOpen} onOpenChange={setAdvancedOpen}>
                <CollapsibleTrigger className="w-full">
                  <CardHeader className="cursor-pointer hover:bg-gray-50/50 transition-colors">
                    <CardTitle className="flex items-center justify-between text-lg">
                      <div className="flex items-center gap-2">
                        <Users className="w-5 h-5 text-purple-600" />
                        Advanced Details
                      </div>
                      <ChevronDown
                        className={cn("w-5 h-5 text-gray-400 transition-transform", advancedOpen && "rotate-180")}
                      />
                    </CardTitle>
                  </CardHeader>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <CardContent className="space-y-5">
                    {/* Roles Needed */}
                    <div className="space-y-2">
                      <Label htmlFor="roles" className="text-sm font-medium text-gray-700">
                        Roles Needed
                      </Label>
                      <Input
                        id="roles"
                        value={rolesNeeded}
                        onChange={(e) => setRolesNeeded(e.target.value)}
                        placeholder="e.g., 2 Female (20-25), 1 Male (30-40)"
                        className="h-11"
                      />
                    </div>

                    {/* Gender Preference */}
                    <div className="space-y-2">
                      <Label className="text-sm font-medium text-gray-700">Gender Preference</Label>
                      <Select value={gender} onValueChange={setGender}>
                        <SelectTrigger className="h-11">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {genderOptions.map((g) => (
                            <SelectItem key={g} value={g}>
                              {g}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Age Range */}
                    <div className="space-y-2">
                      <Label className="text-sm font-medium text-gray-700">Age Range</Label>
                      <div className="grid grid-cols-2 gap-3">
                        <Input
                          type="number"
                          value={ageMin}
                          onChange={(e) => setAgeMin(e.target.value)}
                          placeholder="Min"
                          className="h-11"
                        />
                        <Input
                          type="number"
                          value={ageMax}
                          onChange={(e) => setAgeMax(e.target.value)}
                          placeholder="Max"
                          className="h-11"
                        />
                      </div>
                      {ageMin && ageMax && Number.parseInt(ageMin) > Number.parseInt(ageMax) && (
                        <p className="text-xs text-red-500 flex items-center gap-1">
                          <AlertCircle className="w-3 h-3" />
                          Min age must be less than max age
                        </p>
                      )}
                    </div>

                    {/* Languages - Chips */}
                    <div className="space-y-3">
                      <Label className="text-sm font-medium text-gray-700">
                        Languages <span className="text-xs text-gray-500">(max 4)</span>
                      </Label>
                      <div className="flex flex-wrap gap-2">
                        {languageOptions.map((lang) => (
                          <button
                            key={lang}
                            type="button"
                            onClick={() => toggleLanguage(lang)}
                            disabled={!selectedLanguages.includes(lang) && selectedLanguages.length >= 4}
                            className={cn(
                              "px-4 py-2 rounded-full text-sm font-medium transition-all duration-200",
                              selectedLanguages.includes(lang)
                                ? "bg-purple-600 text-white shadow-md hover:bg-purple-700"
                                : "bg-gray-100 text-gray-700 hover:bg-gray-200",
                              !selectedLanguages.includes(lang) &&
                                selectedLanguages.length >= 4 &&
                                "opacity-40 cursor-not-allowed",
                            )}
                          >
                            {lang}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Experience */}
                    <div className="space-y-2">
                      <Label className="text-sm font-medium text-gray-700">Experience Level</Label>
                      <Select value={experience} onValueChange={setExperience}>
                        <SelectTrigger className="h-11">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {experienceLevels.map((level) => (
                            <SelectItem key={level} value={level}>
                              {level}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Fee / Pay */}
                    <div className="space-y-3">
                      <Label className="text-sm font-medium text-gray-700">Fee / Pay</Label>
                      <Select value={pay} onValueChange={setPay}>
                        <SelectTrigger className="h-11">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {payOptions.map((option) => (
                            <SelectItem key={option} value={option}>
                              {option}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>

                      {(pay === "Stipend" || pay === "Paid") && (
                        <div className="space-y-2 animate-fade-in">
                          <Label htmlFor="amount" className="text-sm font-medium text-gray-700">
                            Amount <span className="text-red-500">*</span>
                          </Label>
                          <Input
                            id="amount"
                            type="number"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            placeholder="Enter amount in ₹"
                            className="h-11"
                          />
                        </div>
                      )}
                    </div>

                    {/* Visibility */}
                    <div className="space-y-3">
                      <Label className="text-sm font-medium text-gray-700">Visibility</Label>
                      <div className="flex gap-2">
                        <Button
                          type="button"
                          variant={visibility === "public" ? "default" : "outline"}
                          onClick={() => setVisibility("public")}
                          className="flex-1 h-11"
                        >
                          Public
                        </Button>
                        <Button
                          type="button"
                          variant={visibility === "unlisted" ? "default" : "outline"}
                          onClick={() => setVisibility("unlisted")}
                          className="flex-1 h-11"
                        >
                          Unlisted
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </CollapsibleContent>
              </Collapsible>
            </Card>

            {/* Media Request Section */}
            <Card className="border-2 shadow-soft hover:shadow-lg transition-shadow duration-300">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Film className="w-5 h-5 text-purple-600" />
                  Media Request <span className="text-sm text-gray-500 font-normal">(optional)</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-5">
                {/* Request Photos */}
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="request-photos"
                      checked={requestPhotos}
                      onCheckedChange={(checked) => setRequestPhotos(checked as boolean)}
                    />
                    <Label htmlFor="request-photos" className="font-normal cursor-pointer">
                      Request Photos
                    </Label>
                  </div>
                  {requestPhotos && (
                    <div className="space-y-2 ml-6 animate-fade-in">
                      <Input
                        value={photoHelperText}
                        onChange={(e) => setPhotoHelperText(e.target.value)}
                        placeholder="Helper text (optional)"
                        className="h-11"
                      />
                      <p className="text-xs text-gray-500 flex items-start gap-1">
                        <Sparkles className="w-3 h-3 mt-0.5 flex-shrink-0 text-purple-500" />
                        Tip: JPG/PNG/WebP up to 5MB each. Ask for 1 headshot + 1 full body.
                      </p>
                    </div>
                  )}
                </div>

                {/* Request Video Links */}
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="request-videos"
                      checked={requestVideos}
                      onCheckedChange={(checked) => setRequestVideos(checked as boolean)}
                    />
                    <Label htmlFor="request-videos" className="font-normal cursor-pointer">
                      Request Video Links
                    </Label>
                  </div>
                  {requestVideos && (
                    <div className="space-y-2 ml-6 animate-fade-in">
                      <Input
                        value={videoHelperText}
                        onChange={(e) => setVideoHelperText(e.target.value)}
                        placeholder="Helper text (optional)"
                        className="h-11"
                      />
                      <p className="text-xs text-gray-500 flex items-start gap-1">
                        <Sparkles className="w-3 h-3 mt-0.5 flex-shrink-0 text-purple-500" />
                        Tip: 1-min monologue link (YouTube/Vimeo/Drive; shareable).
                      </p>
                    </div>
                  )}
                </div>

                {!requestPhotos && !requestVideos && (
                  <p className="text-sm text-gray-500 text-center py-4">No media requested.</p>
                )}
              </CardContent>
            </Card>

            {/* Consent Section */}
            <Card className="border-2 border-purple-200 shadow-soft">
              <CardContent className="pt-6 space-y-4">
                <div className="flex items-start space-x-3">
                  <Checkbox
                    id="genuine-consent"
                    checked={genuineConsent}
                    onCheckedChange={(checked) => setGenuineConsent(checked as boolean)}
                    className="mt-1"
                  />
                  <Label htmlFor="genuine-consent" className="font-normal cursor-pointer leading-relaxed">
                    I confirm that all details provided are genuine and that I have the right to conduct this
                    casting/workshop. <span className="text-red-500">*</span>
                  </Label>
                </div>
                <div className="flex items-start space-x-3">
                  <Checkbox
                    id="terms-consent"
                    checked={termsConsent}
                    onCheckedChange={(checked) => setTermsConsent(checked as boolean)}
                    className="mt-1"
                  />
                  <Label htmlFor="terms-consent" className="font-normal cursor-pointer leading-relaxed">
                    I agree to Abhinayपथ's{" "}
                    <Link href="/terms" className="text-purple-600 hover:underline">
                      Terms
                    </Link>
                    {" & "}
                    <Link href="/privacy" className="text-purple-600 hover:underline">
                      Privacy Policy
                    </Link>
                    . <span className="text-red-500">*</span>
                  </Label>
                </div>
              </CardContent>
            </Card>

            {/* Action Buttons */}
            <div className="flex gap-3">
              <Button
                onClick={handlePublish}
                disabled={!isFormValid()}
                className="flex-1 h-12 text-base font-medium shadow-lg hover:shadow-xl transition-all duration-200"
              >
                <CheckCircle2 className="w-5 h-5 mr-2" />
                Publish Opportunity
              </Button>
              <Button
                variant="outline"
                onClick={() => setApplyFlowOpen(true)}
                className="h-12 px-6 border-2 hover:bg-purple-50"
              >
                <FileText className="w-5 h-5" />
              </Button>
            </div>
          </div>

          {/* Right Column - Live Preview (Sticky) */}
          <div className="lg:sticky lg:top-24 h-fit">
            <Card className="border-2 shadow-xl">
              <CardHeader className="bg-gradient-to-br from-purple-50 to-white">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">Live Preview</CardTitle>
                  <Badge variant="outline" className="text-xs">
                    {visibility === "public" ? "Public" : "Unlisted"}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="pt-6 space-y-4">
                {/* Type & Location */}
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Badge variant="secondary" className="font-medium">
                    {type || "Type"}
                  </Badge>
                  <span>•</span>
                  {locationMode === "city" ? (
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3 h-3" />
                      {city || "City"}
                    </span>
                  ) : (
                    <span className="flex items-center gap-1">
                      <Globe className="w-3 h-3" />
                      Online
                    </span>
                  )}
                </div>

                {/* Title */}
                <h3 className="text-2xl font-playfair font-bold text-gray-900">{title || "Opportunity Title"}</h3>

                {/* Deadline & Location Detail */}
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <CalendarIcon className="w-4 h-4" />
                  <span className="font-medium">Deadline: {deadline ? format(deadline, "PPP") : "Not set"}</span>
                  {locationMode === "city" && venue && (
                    <>
                      <span>•</span>
                      <span>{venue}</span>
                    </>
                  )}
                  {locationMode === "online" && platform && (
                    <>
                      <span>•</span>
                      <span>{platform}</span>
                    </>
                  )}
                </div>

                {/* Description Snippet */}
                <div className="pt-2 border-t">
                  <p className="text-sm text-gray-700 line-clamp-3">
                    {description || "Description will appear here..."}
                  </p>
                </div>

                {/* Requirements */}
                {(gender !== "Any" ||
                  ageMin ||
                  ageMax ||
                  selectedLanguages.length > 0 ||
                  experience !== "Beginner") && (
                  <div className="pt-2 border-t space-y-2">
                    <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Requirements</h4>
                    <div className="flex flex-wrap gap-2">
                      {gender !== "Any" && (
                        <Badge variant="outline" className="text-xs">
                          {gender}
                        </Badge>
                      )}
                      {(ageMin || ageMax) && (
                        <Badge variant="outline" className="text-xs">
                          Age: {ageMin || "?"} - {ageMax || "?"}
                        </Badge>
                      )}
                      {selectedLanguages.map((lang) => (
                        <Badge key={lang} variant="outline" className="text-xs">
                          {lang}
                        </Badge>
                      ))}
                      {experience !== "Beginner" && (
                        <Badge variant="outline" className="text-xs">
                          {experience}
                        </Badge>
                      )}
                    </div>
                  </div>
                )}

                {/* Pay */}
                <div className="pt-2 border-t">
                  <div className="flex items-center gap-2 text-sm">
                    <DollarSign className="w-4 h-4 text-gray-400" />
                    <span className="font-medium text-gray-700">
                      {pay === "Not specified" && "Not specified"}
                      {pay === "Free" && "Free"}
                      {pay === "Stipend" && (amount ? `₹${amount} stipend` : "Stipend")}
                      {pay === "Paid" && (amount ? `₹${amount}` : "Paid")}
                    </span>
                  </div>
                </div>

                {/* CTA */}
                <Button className="w-full h-12 text-base font-medium mt-4">{getApplicationMethodLabel()}</Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Apply Flow Preview Sheet */}
      <Sheet open={applyFlowOpen} onOpenChange={setApplyFlowOpen}>
        <SheetContent side="right" className="w-full sm:max-w-xl overflow-y-auto">
          <SheetHeader>
            <SheetTitle className="text-xl font-playfair">Artist Application Flow</SheetTitle>
            <SheetDescription>Preview how artists will see and complete their application</SheetDescription>
          </SheetHeader>

          <div className="mt-6 space-y-6">
            {/* Profile Notice */}
            <div className="p-4 bg-purple-50 border border-purple-200 rounded-lg">
              <p className="text-sm text-purple-900 flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 mt-0.5 flex-shrink-0" />
                Your Abhinayपथ profile will be shared with the organiser.
              </p>
            </div>

            {/* Photos Request */}
            {requestPhotos && (
              <div className="space-y-3">
                <h4 className="font-semibold text-gray-900 flex items-center gap-2">
                  <Upload className="w-5 h-5 text-purple-600" />
                  Upload Photos
                </h4>
                {photoHelperText && <p className="text-sm text-gray-600">{photoHelperText}</p>}
                <div className="grid grid-cols-2 gap-3">
                  <div className="aspect-[3/4] border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center text-center p-4 hover:border-purple-400 transition-colors cursor-pointer">
                    <Upload className="w-8 h-8 text-gray-400 mb-2" />
                    <span className="text-xs text-gray-600">Headshot</span>
                  </div>
                  <div className="aspect-[3/4] border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center text-center p-4 hover:border-purple-400 transition-colors cursor-pointer">
                    <Upload className="w-8 h-8 text-gray-400 mb-2" />
                    <span className="text-xs text-gray-600">Full Body</span>
                  </div>
                </div>
              </div>
            )}

            {/* Video Links Request */}
            {requestVideos && (
              <div className="space-y-3">
                <h4 className="font-semibold text-gray-900 flex items-center gap-2">
                  <LinkIcon className="w-5 h-5 text-purple-600" />
                  Video Links
                </h4>
                {videoHelperText && <p className="text-sm text-gray-600">{videoHelperText}</p>}
                <div className="space-y-2">
                  <Input placeholder="YouTube/Vimeo/Drive link" className="h-11" />
                  <Input placeholder="Additional link (optional)" className="h-11" />
                  <Input placeholder="Additional link (optional)" className="h-11" />
                </div>
              </div>
            )}

            {/* Submit Button */}
            <Button className="w-full h-12 text-base font-medium" disabled={requestPhotos || requestVideos}>
              Submit Application
            </Button>

            {(requestPhotos || requestVideos) && (
              <p className="text-xs text-center text-gray-500">
                Submit will be enabled when required media is uploaded
              </p>
            )}
          </div>
        </SheetContent>
      </Sheet>

      {/* Footer */}
      <footer className="border-t mt-16 py-8 bg-white">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm text-gray-600">© Abhinayपथ • Minimal form, maximal clarity.</p>
          <div className="flex items-center justify-center gap-4 mt-2 text-xs">
            <Link href="/privacy" className="text-purple-600 hover:underline">
              Privacy Policy
            </Link>
            <span className="text-gray-300">•</span>
            <Link href="/terms" className="text-purple-600 hover:underline">
              Terms
            </Link>
            <span className="text-gray-300">•</span>
            <Link href="/report" className="text-purple-600 hover:underline">
              Report Misuse
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
