"use client"

import { useState, useMemo } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import {
  ChevronDown,
  ChevronUp,
  CalendarIcon,
  MapPin,
  Globe,
  Briefcase,
  Clock,
  Users,
  Languages,
  Star,
  DollarSign,
  Eye,
  EyeOff,
  ImageIcon,
  CheckCircle2,
  AlertCircle,
} from "lucide-react"
import { format } from "date-fns"
import { cn } from "@/lib/utils"
import { toast } from "sonner"

const opportunityTypes = ["Theatre Play", "Short Film", "Feature Film", "Ad", "Backstage", "Job"]

const genderOptions = ["Any", "Male", "Female", "Other", "Prefer not to say"]

const experienceLevels = ["Beginner", "Intermediate", "Professional"]

const payOptions = ["Not specified", "Free", "Stipend", "Paid"]

const languageOptions = [
  "Hindi",
  "English",
  "Bengali",
  "Tamil",
  "Telugu",
  "Marathi",
  "Gujarati",
  "Kannada",
  "Malayalam",
  "Punjabi",
  "Urdu",
  "Assamese",
  "Odia",
]

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

  // Media Request
  const [requestPhotos, setRequestPhotos] = useState(false)
  const [photoHelper, setPhotoHelper] = useState("")
  const [requestVideo, setRequestVideo] = useState(false)
  const [videoHelper, setVideoHelper] = useState("")

  // Consent
  const [consent1, setConsent1] = useState(false)
  const [consent2, setConsent2] = useState(false)

  // UI State
  const [contactOpen, setContactOpen] = useState(false)
  const [applyFlowOpen, setApplyFlowOpen] = useState(false)

  // Calculate progress
  const progress = useMemo(() => {
    const requiredFields = [
      title,
      type,
      deadline,
      locationMode === "city" ? city : true,
      description,
      consent1,
      consent2,
    ]

    if (pay === "Stipend" || pay === "Paid") {
      requiredFields.push(!!amount)
    }

    if (ageMin && ageMax) {
      requiredFields.push(Number.parseInt(ageMin) <= Number.parseInt(ageMax))
    }

    const completed = requiredFields.filter(Boolean).length
    return Math.round((completed / requiredFields.length) * 100)
  }, [title, type, deadline, locationMode, city, description, consent1, consent2, pay, amount, ageMin, ageMax])

  const canPublish = progress === 100

  const handleLanguageToggle = (lang: string) => {
    if (selectedLanguages.includes(lang)) {
      setSelectedLanguages(selectedLanguages.filter((l) => l !== lang))
    } else if (selectedLanguages.length < 4) {
      setSelectedLanguages([...selectedLanguages, lang])
    }
  }

  const handlePublish = () => {
    if (!canPublish) return
    toast.success("Published. You can edit anytime.")
  }

  const getApplicationMethodLabel = () => {
    switch (applicationMethod) {
      case "platform":
        return "Apply on Abhinayपथ"
      case "whatsapp":
        return "Apply via WhatsApp"
      case "email":
        return "Apply via Email"
      case "external":
        return "Apply Externally"
      default:
        return "Apply"
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Header */}
      <div className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-600 to-red-600 flex items-center justify-center text-white font-bold text-sm">
                AP
              </div>
              <div>
                <h1 className="text-xl font-playfair font-bold text-gray-900">Post Opportunity</h1>
                <p className="text-sm text-gray-600">Keep it crisp. Artists love clarity.</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-600">All times IST</span>
              <div className="flex items-center gap-2">
                <div className="w-32 h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-purple-600 to-red-600 transition-all duration-500"
                    style={{ width: `${progress}%` }}
                  />
                </div>
                <span className="text-sm font-medium text-gray-900">{progress}%</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-[1fr,400px] gap-8 max-w-7xl mx-auto">
          {/* Left Column - Form */}
          <div className="space-y-6">
            {/* Core Section */}
            <Card className="rounded-2xl shadow-soft border-gray-200">
              <CardHeader className="border-b border-gray-100">
                <div className="flex items-center gap-2">
                  <Briefcase className="w-5 h-5 text-purple-600" />
                  <CardTitle className="font-playfair">Core Details</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-5 pt-6">
                {/* Title */}
                <div className="space-y-2">
                  <Label htmlFor="title" className="text-sm font-medium">
                    Title <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="e.g., Lead Role for Historical Drama"
                    className="h-11 rounded-lg"
                  />
                </div>

                {/* Type */}
                <div className="space-y-2">
                  <Label htmlFor="type" className="text-sm font-medium">
                    Type <span className="text-red-500">*</span>
                  </Label>
                  <Select value={type} onValueChange={setType}>
                    <SelectTrigger id="type" className="h-11 rounded-lg">
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
                  <Label className="text-sm font-medium">
                    Deadline <span className="text-red-500">*</span>
                  </Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full h-11 rounded-lg justify-start text-left font-normal",
                          !deadline && "text-muted-foreground",
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {deadline ? format(deadline, "PPP") : "Pick a date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
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

                {/* Location Mode */}
                <div className="space-y-3">
                  <Label className="text-sm font-medium">
                    Location Mode <span className="text-red-500">*</span>
                  </Label>
                  <div className="flex gap-3">
                    <Button
                      type="button"
                      variant={locationMode === "city" ? "default" : "outline"}
                      className="flex-1 h-11 rounded-lg"
                      onClick={() => setLocationMode("city")}
                    >
                      <MapPin className="w-4 h-4 mr-2" />
                      City
                    </Button>
                    <Button
                      type="button"
                      variant={locationMode === "online" ? "default" : "outline"}
                      className="flex-1 h-11 rounded-lg"
                      onClick={() => setLocationMode("online")}
                    >
                      <Globe className="w-4 h-4 mr-2" />
                      Online
                    </Button>
                  </div>
                </div>

                {/* Conditional Location Fields */}
                {locationMode === "city" ? (
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="city" className="text-sm font-medium">
                        City <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="city"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        placeholder="e.g., Mumbai"
                        className="h-11 rounded-lg"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="venue" className="text-sm font-medium">
                        Venue (optional)
                      </Label>
                      <Input
                        id="venue"
                        value={venue}
                        onChange={(e) => setVenue(e.target.value)}
                        placeholder="e.g., Prithvi Theatre"
                        className="h-11 rounded-lg"
                      />
                    </div>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <Label htmlFor="platform" className="text-sm font-medium">
                      Platform (optional)
                    </Label>
                    <Input
                      id="platform"
                      value={platform}
                      onChange={(e) => setPlatform(e.target.value)}
                      placeholder="e.g., Zoom, Google Meet"
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
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="What to prepare, key dates, audition flow..."
                    className="min-h-[120px] rounded-lg resize-none"
                  />
                  <p className="text-xs text-gray-500">What to prepare, key dates, audition flow</p>
                </div>

                {/* Application Method */}
                <div className="space-y-3">
                  <Label className="text-sm font-medium">Application Method</Label>
                  <RadioGroup value={applicationMethod} onValueChange={setApplicationMethod}>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2 p-3 rounded-lg border border-gray-200 hover:border-purple-300 transition-colors">
                        <RadioGroupItem value="platform" id="platform-method" />
                        <Label htmlFor="platform-method" className="flex-1 cursor-pointer font-normal">
                          Quick Apply on Abhinayपथ
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2 p-3 rounded-lg border border-gray-200 hover:border-purple-300 transition-colors">
                        <RadioGroupItem value="whatsapp" id="whatsapp-method" />
                        <Label htmlFor="whatsapp-method" className="flex-1 cursor-pointer font-normal">
                          WhatsApp
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2 p-3 rounded-lg border border-gray-200 hover:border-purple-300 transition-colors">
                        <RadioGroupItem value="email" id="email-method" />
                        <Label htmlFor="email-method" className="flex-1 cursor-pointer font-normal">
                          Email
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2 p-3 rounded-lg border border-gray-200 hover:border-purple-300 transition-colors">
                        <RadioGroupItem value="external" id="external-method" />
                        <Label htmlFor="external-method" className="flex-1 cursor-pointer font-normal">
                          External Form
                        </Label>
                      </div>
                    </div>
                  </RadioGroup>
                </div>

                {/* Optional Contact */}
                {applicationMethod !== "platform" && (
                  <div className="space-y-2">
                    <button
                      type="button"
                      onClick={() => setContactOpen(!contactOpen)}
                      className="flex items-center gap-2 text-sm font-medium text-purple-600 hover:text-purple-700 transition-colors"
                    >
                      {contactOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                      Contact Info (optional)
                    </button>
                    {contactOpen && (
                      <div className="pl-6 space-y-2 animate-in slide-in-from-top-2">
                        <Input
                          value={contactInfo}
                          onChange={(e) => setContactInfo(e.target.value)}
                          placeholder={
                            applicationMethod === "whatsapp"
                              ? "+91 XXXXX XXXXX"
                              : applicationMethod === "email"
                                ? "contact@example.com"
                                : "https://forms.google.com/..."
                          }
                          className="h-11 rounded-lg"
                        />
                      </div>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Advanced Section */}
            <Card className="rounded-2xl shadow-soft border-gray-200">
              <CardHeader
                className="border-b border-gray-100 cursor-pointer hover:bg-gray-50/50 transition-colors"
                onClick={() => setAdvancedOpen(!advancedOpen)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Star className="w-5 h-5 text-purple-600" />
                    <CardTitle className="font-playfair">Advanced Details</CardTitle>
                  </div>
                  {advancedOpen ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                </div>
              </CardHeader>
              {advancedOpen && (
                <CardContent className="space-y-5 pt-6">
                  {/* Roles Needed */}
                  <div className="space-y-2">
                    <Label htmlFor="roles" className="text-sm font-medium">
                      Roles Needed
                    </Label>
                    <Input
                      id="roles"
                      value={rolesNeeded}
                      onChange={(e) => setRolesNeeded(e.target.value)}
                      placeholder="e.g., 2 Female (20-25), 1 Male (30-40)"
                      className="h-11 rounded-lg"
                    />
                  </div>

                  {/* Gender Preference */}
                  <div className="space-y-2">
                    <Label htmlFor="gender" className="text-sm font-medium">
                      Gender Preference
                    </Label>
                    <Select value={gender} onValueChange={setGender}>
                      <SelectTrigger id="gender" className="h-11 rounded-lg">
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
                    <Label className="text-sm font-medium">Age Range</Label>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Input
                          type="number"
                          value={ageMin}
                          onChange={(e) => setAgeMin(e.target.value)}
                          placeholder="Min"
                          className="h-11 rounded-lg"
                        />
                      </div>
                      <div>
                        <Input
                          type="number"
                          value={ageMax}
                          onChange={(e) => setAgeMax(e.target.value)}
                          placeholder="Max"
                          className="h-11 rounded-lg"
                        />
                      </div>
                    </div>
                    {ageMin && ageMax && Number.parseInt(ageMin) > Number.parseInt(ageMax) && (
                      <p className="text-xs text-red-600 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        Minimum age must be less than maximum age
                      </p>
                    )}
                  </div>

                  {/* Languages */}
                  <div className="space-y-2">
                    <Label className="text-sm font-medium">
                      Languages <span className="text-gray-500 text-xs">(max 4)</span>
                    </Label>
                    <div className="flex flex-wrap gap-2">
                      {languageOptions.map((lang) => (
                        <button
                          key={lang}
                          type="button"
                          onClick={() => handleLanguageToggle(lang)}
                          disabled={!selectedLanguages.includes(lang) && selectedLanguages.length >= 4}
                          className={cn(
                            "px-3 py-1.5 rounded-full text-sm font-medium transition-all",
                            selectedLanguages.includes(lang)
                              ? "bg-purple-600 text-white"
                              : "bg-gray-100 text-gray-700 hover:bg-gray-200",
                            !selectedLanguages.includes(lang) &&
                              selectedLanguages.length >= 4 &&
                              "opacity-50 cursor-not-allowed",
                          )}
                        >
                          {lang}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Experience */}
                  <div className="space-y-2">
                    <Label htmlFor="experience" className="text-sm font-medium">
                      Experience
                    </Label>
                    <Select value={experience} onValueChange={setExperience}>
                      <SelectTrigger id="experience" className="h-11 rounded-lg">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {experienceLevels.map((e) => (
                          <SelectItem key={e} value={e}>
                            {e}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Fee / Pay */}
                  <div className="space-y-3">
                    <Label htmlFor="pay" className="text-sm font-medium">
                      Fee / Pay
                    </Label>
                    <Select value={pay} onValueChange={setPay}>
                      <SelectTrigger id="pay" className="h-11 rounded-lg">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {payOptions.map((p) => (
                          <SelectItem key={p} value={p}>
                            {p}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {(pay === "Stipend" || pay === "Paid") && (
                      <div className="pl-6 space-y-2 animate-in slide-in-from-top-2">
                        <Label htmlFor="amount" className="text-sm font-medium">
                          Amount <span className="text-red-500">*</span>
                        </Label>
                        <div className="relative">
                          <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                          <Input
                            id="amount"
                            type="number"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            placeholder="5000"
                            className="h-11 rounded-lg pl-10"
                          />
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Visibility */}
                  <div className="space-y-3">
                    <Label className="text-sm font-medium">Visibility</Label>
                    <div className="flex gap-3">
                      <Button
                        type="button"
                        variant={visibility === "public" ? "default" : "outline"}
                        className="flex-1 h-11 rounded-lg"
                        onClick={() => setVisibility("public")}
                      >
                        <Eye className="w-4 h-4 mr-2" />
                        Public
                      </Button>
                      <Button
                        type="button"
                        variant={visibility === "unlisted" ? "default" : "outline"}
                        className="flex-1 h-11 rounded-lg"
                        onClick={() => setVisibility("unlisted")}
                      >
                        <EyeOff className="w-4 h-4 mr-2" />
                        Unlisted
                      </Button>
                    </div>
                  </div>
                </CardContent>
              )}
            </Card>

            {/* Media Request Section */}
            <Card className="rounded-2xl shadow-soft border-gray-200">
              <CardHeader className="border-b border-gray-100">
                <div className="flex items-center gap-2">
                  <ImageIcon className="w-5 h-5 text-purple-600" />
                  <CardTitle className="font-playfair">Media Request</CardTitle>
                </div>
                <CardDescription>Optional - Request media from applicants</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4 pt-6">
                {/* Request Photos */}
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="request-photos"
                      checked={requestPhotos}
                      onCheckedChange={(checked) => setRequestPhotos(checked as boolean)}
                    />
                    <Label htmlFor="request-photos" className="cursor-pointer font-medium">
                      Request Photos
                    </Label>
                  </div>
                  {requestPhotos && (
                    <div className="pl-6 space-y-2 animate-in slide-in-from-top-2">
                      <Input
                        value={photoHelper}
                        onChange={(e) => setPhotoHelper(e.target.value)}
                        placeholder="Helper text (optional)"
                        className="h-11 rounded-lg"
                      />
                      <p className="text-xs text-gray-500">
                        💡 Tip: JPG/PNG/WebP up to 5MB each. Ask for 1 headshot + 1 full body.
                      </p>
                    </div>
                  )}
                </div>

                {/* Request Video */}
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="request-video"
                      checked={requestVideo}
                      onCheckedChange={(checked) => setRequestVideo(checked as boolean)}
                    />
                    <Label htmlFor="request-video" className="cursor-pointer font-medium">
                      Request Video Links
                    </Label>
                  </div>
                  {requestVideo && (
                    <div className="pl-6 space-y-2 animate-in slide-in-from-top-2">
                      <Input
                        value={videoHelper}
                        onChange={(e) => setVideoHelper(e.target.value)}
                        placeholder="Helper text (optional)"
                        className="h-11 rounded-lg"
                      />
                      <p className="text-xs text-gray-500">
                        💡 Tip: 1-min monologue link (YouTube/Vimeo/Drive; shareable).
                      </p>
                    </div>
                  )}
                </div>

                {!requestPhotos && !requestVideo && (
                  <p className="text-sm text-gray-500 py-4 text-center">No media requested.</p>
                )}
              </CardContent>
            </Card>

            {/* Consent Section */}
            <Card className="rounded-2xl shadow-soft border-gray-200 border-2 border-purple-100">
              <CardContent className="space-y-4 pt-6">
                <div className="flex items-start space-x-3">
                  <Checkbox
                    id="consent1"
                    checked={consent1}
                    onCheckedChange={(checked) => setConsent1(checked as boolean)}
                    className="mt-1"
                  />
                  <Label htmlFor="consent1" className="cursor-pointer text-sm leading-relaxed">
                    I confirm that all details provided are genuine and that I have the right to conduct this
                    casting/workshop.
                  </Label>
                </div>
                <div className="flex items-start space-x-3">
                  <Checkbox
                    id="consent2"
                    checked={consent2}
                    onCheckedChange={(checked) => setConsent2(checked as boolean)}
                    className="mt-1"
                  />
                  <Label htmlFor="consent2" className="cursor-pointer text-sm leading-relaxed">
                    I agree to Abhinayपथ's{" "}
                    <a href="/terms" className="text-purple-600 hover:underline">
                      Terms
                    </a>
                    {" & "}
                    <a href="/privacy" className="text-purple-600 hover:underline">
                      Privacy Policy
                    </a>
                    .
                  </Label>
                </div>
              </CardContent>
            </Card>

            {/* Action Buttons */}
            <div className="flex gap-4">
              <Button
                onClick={handlePublish}
                disabled={!canPublish}
                className="flex-1 h-12 rounded-lg text-base font-medium"
              >
                <CheckCircle2 className="w-5 h-5 mr-2" />
                Publish Opportunity
              </Button>
              <Button
                variant="outline"
                onClick={() => setApplyFlowOpen(true)}
                className="flex-1 h-12 rounded-lg text-base font-medium"
              >
                Preview Apply Flow
              </Button>
            </div>
          </div>

          {/* Right Column - Live Preview */}
          <div className="lg:sticky lg:top-24 h-fit">
            <Card className="rounded-2xl shadow-soft border-gray-200">
              <CardHeader className="border-b border-gray-100">
                <CardTitle className="font-playfair text-lg">Live Preview</CardTitle>
                <CardDescription>How artists will see your opportunity</CardDescription>
              </CardHeader>
              <CardContent className="p-6 space-y-4">
                {/* Type & Location */}
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Badge variant="secondary" className="font-normal">
                    {type || "Type"}
                  </Badge>
                  <span>•</span>
                  <span>{locationMode === "city" ? city || "City" : "Online"}</span>
                </div>

                {/* Title */}
                <h3 className="text-2xl font-playfair font-bold text-gray-900">
                  {title || "Your opportunity title will appear here"}
                </h3>

                {/* Deadline & Location Detail */}
                <div className="flex items-center gap-4 text-sm text-gray-600">
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    <span>Deadline: {deadline ? format(deadline, "PP") : "Not set"}</span>
                  </div>
                  {locationMode === "city" && venue && (
                    <>
                      <span>•</span>
                      <div className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        <span>{venue}</span>
                      </div>
                    </>
                  )}
                  {locationMode === "online" && platform && (
                    <>
                      <span>•</span>
                      <div className="flex items-center gap-1">
                        <Globe className="w-4 h-4" />
                        <span>{platform}</span>
                      </div>
                    </>
                  )}
                </div>

                {/* Description Snippet */}
                <div className="prose prose-sm max-w-none">
                  <p className="text-gray-700 line-clamp-3">{description || "Your description will appear here..."}</p>
                </div>

                {/* Requirements */}
                <div className="space-y-2 pt-2">
                  <h4 className="text-sm font-semibold text-gray-900">Requirements</h4>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="flex items-center gap-2 text-sm">
                      <Users className="w-4 h-4 text-gray-500" />
                      <span className="text-gray-700">{gender}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Clock className="w-4 h-4 text-gray-500" />
                      <span className="text-gray-700">{ageMin && ageMax ? `${ageMin}-${ageMax} yrs` : "Any age"}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Languages className="w-4 h-4 text-gray-500" />
                      <span className="text-gray-700">
                        {selectedLanguages.length > 0 ? selectedLanguages.join(", ") : "Any"}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Star className="w-4 h-4 text-gray-500" />
                      <span className="text-gray-700">{experience}</span>
                    </div>
                  </div>
                </div>

                {/* Pay */}
                <div className="pt-2 border-t border-gray-100">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-900">Compensation</span>
                    <span className="text-sm font-semibold text-gray-900">
                      {pay === "Not specified"
                        ? "Not specified"
                        : pay === "Free"
                          ? "Free"
                          : (pay === "Stipend" || pay === "Paid") && amount
                            ? `₹${amount}`
                            : pay}
                    </span>
                  </div>
                </div>

                {/* CTA */}
                <Button className="w-full h-11 rounded-lg text-base font-medium">{getApplicationMethodLabel()}</Button>

                {/* Visibility Badge */}
                <div className="flex justify-center">
                  <Badge variant="outline" className="text-xs">
                    Visibility: {visibility === "public" ? "Public" : "Unlisted"}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center py-8 text-sm text-gray-600">
          <p>© Abhinayपथ • Minimal form, maximal clarity.</p>
          <div className="flex items-center justify-center gap-4 mt-2">
            <a href="/privacy" className="hover:text-purple-600 transition-colors">
              Privacy Policy
            </a>
            <span>•</span>
            <a href="/terms" className="hover:text-purple-600 transition-colors">
              Terms
            </a>
            <span>•</span>
            <a href="/report" className="hover:text-purple-600 transition-colors">
              Report Misuse
            </a>
          </div>
        </div>
      </div>

      {/* Apply Flow Preview Sheet */}
      <Sheet open={applyFlowOpen} onOpenChange={setApplyFlowOpen}>
        <SheetContent className="w-full sm:max-w-lg">
          <SheetHeader>
            <SheetTitle className="font-playfair">Apply Flow Preview</SheetTitle>
            <SheetDescription>This is how artists will apply to your opportunity</SheetDescription>
          </SheetHeader>
          <div className="space-y-6 mt-6">
            <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
              <p className="text-sm text-purple-900">Your Abhinayपथ profile will be shared with the organiser.</p>
            </div>

            {requestPhotos && (
              <div className="space-y-3">
                <Label className="text-sm font-medium">Upload Photos {photoHelper && `(${photoHelper})`}</Label>
                <div className="grid grid-cols-2 gap-3">
                  {[1, 2].map((i) => (
                    <div
                      key={i}
                      className="aspect-square rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center text-gray-400 hover:border-purple-400 hover:text-purple-600 transition-colors cursor-pointer"
                    >
                      <div className="text-center">
                        <ImageIcon className="w-8 h-8 mx-auto mb-2" />
                        <p className="text-xs">Upload photo {i}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {requestVideo && (
              <div className="space-y-3">
                <Label className="text-sm font-medium">Video Links {videoHelper && `(${videoHelper})`}</Label>
                {[1, 2].map((i) => (
                  <Input key={i} placeholder={`Video link ${i}`} className="h-11 rounded-lg" />
                ))}
              </div>
            )}

            <Button disabled={!requestPhotos && !requestVideo} className="w-full h-11 rounded-lg">
              Submit Application
            </Button>

            {!requestPhotos && !requestVideo && (
              <p className="text-sm text-gray-500 text-center py-4">No media requested. Application will be instant.</p>
            )}
          </div>
        </SheetContent>
      </Sheet>
    </div>
  )
}
