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
import { Progress } from "@/components/ui/progress"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format } from "date-fns"
import {
  CalendarIcon,
  ChevronDown,
  MapPin,
  Globe,
  Briefcase,
  Users,
  DollarSign,
  Eye,
  Camera,
  CheckCircle2,
  X,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { toast } from "sonner"
import Link from "next/link"

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
  // Form state
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
  const [genderPreference, setGenderPreference] = useState("any")
  const [ageMin, setAgeMin] = useState("")
  const [ageMax, setAgeMax] = useState("")
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>([])
  const [experience, setExperience] = useState("")
  const [payType, setPayType] = useState("not-specified")
  const [payAmount, setPayAmount] = useState("")
  const [visibility, setVisibility] = useState("public")

  // Media request
  const [requestPhotos, setRequestPhotos] = useState(false)
  const [photoHelperText, setPhotoHelperText] = useState("")
  const [requestVideos, setRequestVideos] = useState(false)
  const [videoHelperText, setVideoHelperText] = useState("")

  // Consent
  const [consent1, setConsent1] = useState(false)
  const [consent2, setConsent2] = useState(false)

  // UI state
  const [contactOpen, setContactOpen] = useState(false)
  const [applyFlowOpen, setApplyFlowOpen] = useState(false)

  // Calculate progress
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const requiredFields = [
      title,
      type,
      deadline,
      locationMode === "city" ? city : true,
      description,
      applicationMethod,
      consent1,
      consent2,
    ]

    const completed = requiredFields.filter(Boolean).length
    const total = requiredFields.length
    setProgress((completed / total) * 100)
  }, [title, type, deadline, city, description, applicationMethod, consent1, consent2, locationMode])

  const toggleLanguage = (lang: string) => {
    if (selectedLanguages.includes(lang)) {
      setSelectedLanguages(selectedLanguages.filter((l) => l !== lang))
    } else if (selectedLanguages.length < 4) {
      setSelectedLanguages([...selectedLanguages, lang])
    }
  }

  const isFormValid = () => {
    if (!title || !type || !deadline || !description || !consent1 || !consent2) return false
    if (locationMode === "city" && !city) return false
    if ((payType === "stipend" || payType === "paid") && !payAmount) return false
    if (ageMin && ageMax && Number(ageMin) > Number(ageMax)) return false
    return true
  }

  const handlePublish = () => {
    if (!isFormValid()) return

    toast.success("Published. You can edit anytime.")
    // Here you would normally submit to an API
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="container max-w-7xl mx-auto px-4 py-12">
        {/* Header */}
        <div className="mb-8 text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Badge variant="secondary" className="text-xs font-medium px-3 py-1">
              AP
            </Badge>
            <h1 className="font-playfair text-4xl font-bold text-gray-900">Post Opportunity</h1>
            <Badge variant="outline" className="text-xs px-3 py-1">
              All times IST
            </Badge>
          </div>
          <p className="text-gray-600 text-sm">Keep it crisp. Artists love clarity.</p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8 max-w-2xl mx-auto">
          <div className="flex items-center justify-between text-xs text-gray-600 mb-2">
            <span>Form completion</span>
            <span className="font-medium">{Math.round(progress)}%</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Left Column - Form */}
          <div className="space-y-6">
            {/* Core Section */}
            <Card className="border-2 shadow-md rounded-2xl overflow-hidden transition-all hover:shadow-lg">
              <CardHeader className="bg-gradient-to-r from-purple-50 to-pink-50 pb-4">
                <div className="flex items-center gap-2">
                  <Briefcase className="h-5 w-5 text-purple-600" />
                  <CardTitle className="text-xl">Core Details</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="pt-6 space-y-5">
                {/* Title */}
                <div className="space-y-2">
                  <Label htmlFor="title" className="text-sm font-medium">
                    Title <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="title"
                    placeholder="e.g., Lead Actor for Feature Film"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="rounded-lg border-gray-300 focus:border-purple-500 focus:ring-purple-500"
                  />
                </div>

                {/* Type */}
                <div className="space-y-2">
                  <Label htmlFor="type" className="text-sm font-medium">
                    Type <span className="text-red-500">*</span>
                  </Label>
                  <Select value={type} onValueChange={setType}>
                    <SelectTrigger className="rounded-lg">
                      <SelectValue placeholder="Select opportunity type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="theatre-play">Theatre Play</SelectItem>
                      <SelectItem value="short-film">Short Film</SelectItem>
                      <SelectItem value="feature-film">Feature Film</SelectItem>
                      <SelectItem value="ad">Ad</SelectItem>
                      <SelectItem value="backstage">Backstage</SelectItem>
                      <SelectItem value="job">Job</SelectItem>
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
                          "w-full justify-start text-left font-normal rounded-lg",
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
                      className="flex-1 rounded-lg"
                      onClick={() => setLocationMode("city")}
                    >
                      <MapPin className="mr-2 h-4 w-4" />
                      City
                    </Button>
                    <Button
                      type="button"
                      variant={locationMode === "online" ? "default" : "outline"}
                      className="flex-1 rounded-lg"
                      onClick={() => setLocationMode("online")}
                    >
                      <Globe className="mr-2 h-4 w-4" />
                      Online
                    </Button>
                  </div>
                </div>

                {/* City/Venue or Platform */}
                {locationMode === "city" ? (
                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-2">
                      <Label htmlFor="city" className="text-sm font-medium">
                        City <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="city"
                        placeholder="e.g., Mumbai"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        className="rounded-lg"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="venue" className="text-sm font-medium">
                        Venue
                      </Label>
                      <Input
                        id="venue"
                        placeholder="Optional"
                        value={venue}
                        onChange={(e) => setVenue(e.target.value)}
                        className="rounded-lg"
                      />
                    </div>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <Label htmlFor="platform" className="text-sm font-medium">
                      Platform
                    </Label>
                    <Input
                      id="platform"
                      placeholder="e.g., Zoom, Google Meet"
                      value={platform}
                      onChange={(e) => setPlatform(e.target.value)}
                      className="rounded-lg"
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
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="rounded-lg min-h-[120px] resize-none"
                  />
                </div>

                {/* Application Method */}
                <div className="space-y-3">
                  <Label className="text-sm font-medium">
                    Application Method <span className="text-red-500">*</span>
                  </Label>
                  <RadioGroup value={applicationMethod} onValueChange={setApplicationMethod} className="space-y-2">
                    <div className="flex items-center space-x-2 p-3 rounded-lg border hover:bg-gray-50 transition-colors">
                      <RadioGroupItem value="platform" id="platform-method" />
                      <Label htmlFor="platform-method" className="flex-1 cursor-pointer">
                        Quick Apply on Abhinayपथ
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2 p-3 rounded-lg border hover:bg-gray-50 transition-colors">
                      <RadioGroupItem value="whatsapp" id="whatsapp-method" />
                      <Label htmlFor="whatsapp-method" className="flex-1 cursor-pointer">
                        WhatsApp
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2 p-3 rounded-lg border hover:bg-gray-50 transition-colors">
                      <RadioGroupItem value="email" id="email-method" />
                      <Label htmlFor="email-method" className="flex-1 cursor-pointer">
                        Email
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2 p-3 rounded-lg border hover:bg-gray-50 transition-colors">
                      <RadioGroupItem value="external" id="external-method" />
                      <Label htmlFor="external-method" className="flex-1 cursor-pointer">
                        External Form
                      </Label>
                    </div>
                  </RadioGroup>
                </div>

                {/* Optional Contact */}
                {applicationMethod !== "platform" && (
                  <Collapsible open={contactOpen} onOpenChange={setContactOpen}>
                    <CollapsibleTrigger asChild>
                      <Button variant="ghost" className="w-full justify-between p-3 h-auto">
                        <span className="text-sm font-medium">Contact Information</span>
                        <ChevronDown className={cn("h-4 w-4 transition-transform", contactOpen && "rotate-180")} />
                      </Button>
                    </CollapsibleTrigger>
                    <CollapsibleContent className="pt-3">
                      <Input
                        placeholder={
                          applicationMethod === "whatsapp"
                            ? "WhatsApp number"
                            : applicationMethod === "email"
                              ? "Email address"
                              : "Form URL"
                        }
                        value={contactInfo}
                        onChange={(e) => setContactInfo(e.target.value)}
                        className="rounded-lg"
                      />
                    </CollapsibleContent>
                  </Collapsible>
                )}
              </CardContent>
            </Card>

            {/* Advanced Section */}
            <Collapsible open={advancedOpen} onOpenChange={setAdvancedOpen}>
              <Card className="border-2 shadow-md rounded-2xl overflow-hidden transition-all hover:shadow-lg">
                <CollapsibleTrigger asChild>
                  <CardHeader className="bg-gradient-to-r from-blue-50 to-cyan-50 pb-4 cursor-pointer hover:bg-blue-100 transition-colors">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Users className="h-5 w-5 text-blue-600" />
                        <CardTitle className="text-xl">Advanced Details</CardTitle>
                      </div>
                      <ChevronDown className={cn("h-5 w-5 transition-transform", advancedOpen && "rotate-180")} />
                    </div>
                  </CardHeader>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <CardContent className="pt-6 space-y-5">
                    {/* Roles Needed */}
                    <div className="space-y-2">
                      <Label htmlFor="roles" className="text-sm font-medium">
                        Roles Needed
                      </Label>
                      <Input
                        id="roles"
                        placeholder="e.g., 2 Female (20–25), 1 Male (30–40)"
                        value={rolesNeeded}
                        onChange={(e) => setRolesNeeded(e.target.value)}
                        className="rounded-lg"
                      />
                    </div>

                    {/* Gender Preference */}
                    <div className="space-y-2">
                      <Label className="text-sm font-medium">Gender Preference</Label>
                      <Select value={genderPreference} onValueChange={setGenderPreference}>
                        <SelectTrigger className="rounded-lg">
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
                      <Label className="text-sm font-medium">Age Range</Label>
                      <div className="grid grid-cols-2 gap-3">
                        <Input
                          type="number"
                          placeholder="Min"
                          value={ageMin}
                          onChange={(e) => setAgeMin(e.target.value)}
                          className="rounded-lg"
                        />
                        <Input
                          type="number"
                          placeholder="Max"
                          value={ageMax}
                          onChange={(e) => setAgeMax(e.target.value)}
                          className="rounded-lg"
                        />
                      </div>
                      {ageMin && ageMax && Number(ageMin) > Number(ageMax) && (
                        <p className="text-xs text-red-500">Min age must be less than max age</p>
                      )}
                    </div>

                    {/* Languages */}
                    <div className="space-y-2">
                      <Label className="text-sm font-medium">Languages (max 4)</Label>
                      <div className="flex flex-wrap gap-2">
                        {LANGUAGES.map((lang) => (
                          <button
                            key={lang}
                            type="button"
                            onClick={() => toggleLanguage(lang)}
                            className={cn(
                              "px-3 py-1.5 rounded-full text-sm font-medium transition-all",
                              selectedLanguages.includes(lang)
                                ? "bg-purple-600 text-white shadow-md"
                                : "bg-gray-100 text-gray-700 hover:bg-gray-200",
                            )}
                            disabled={!selectedLanguages.includes(lang) && selectedLanguages.length >= 4}
                          >
                            {lang}
                            {selectedLanguages.includes(lang) && <X className="inline-block ml-1 h-3 w-3" />}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Experience */}
                    <div className="space-y-2">
                      <Label className="text-sm font-medium">Experience</Label>
                      <Select value={experience} onValueChange={setExperience}>
                        <SelectTrigger className="rounded-lg">
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
                      <Label className="text-sm font-medium">Fee / Pay</Label>
                      <Select value={payType} onValueChange={setPayType}>
                        <SelectTrigger className="rounded-lg">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="not-specified">Not specified</SelectItem>
                          <SelectItem value="free">Free</SelectItem>
                          <SelectItem value="stipend">Stipend</SelectItem>
                          <SelectItem value="paid">Paid</SelectItem>
                        </SelectContent>
                      </Select>

                      {(payType === "stipend" || payType === "paid") && (
                        <Input
                          type="number"
                          placeholder="Amount (₹)"
                          value={payAmount}
                          onChange={(e) => setPayAmount(e.target.value)}
                          className="rounded-lg"
                        />
                      )}
                    </div>

                    {/* Visibility */}
                    <div className="space-y-3">
                      <Label className="text-sm font-medium">Visibility</Label>
                      <div className="flex gap-3">
                        <Button
                          type="button"
                          variant={visibility === "public" ? "default" : "outline"}
                          className="flex-1 rounded-lg"
                          onClick={() => setVisibility("public")}
                        >
                          <Eye className="mr-2 h-4 w-4" />
                          Public
                        </Button>
                        <Button
                          type="button"
                          variant={visibility === "unlisted" ? "default" : "outline"}
                          className="flex-1 rounded-lg"
                          onClick={() => setVisibility("unlisted")}
                        >
                          Unlisted
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </CollapsibleContent>
              </Card>
            </Collapsible>

            {/* Media Request */}
            <Card className="border-2 shadow-md rounded-2xl overflow-hidden transition-all hover:shadow-lg">
              <CardHeader className="bg-gradient-to-r from-green-50 to-emerald-50 pb-4">
                <div className="flex items-center gap-2">
                  <Camera className="h-5 w-5 text-green-600" />
                  <CardTitle className="text-xl">Media Request (Optional)</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="pt-6 space-y-5">
                {/* Request Photos */}
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="request-photos"
                      checked={requestPhotos}
                      onCheckedChange={(checked) => setRequestPhotos(checked as boolean)}
                    />
                    <Label htmlFor="request-photos" className="text-sm font-medium cursor-pointer">
                      Request Photos
                    </Label>
                  </div>

                  {requestPhotos && (
                    <div className="space-y-2 ml-6">
                      <Input
                        placeholder="Helper text (optional)"
                        value={photoHelperText}
                        onChange={(e) => setPhotoHelperText(e.target.value)}
                        className="rounded-lg"
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
                      checked={requestVideos}
                      onCheckedChange={(checked) => setRequestVideos(checked as boolean)}
                    />
                    <Label htmlFor="request-videos" className="text-sm font-medium cursor-pointer">
                      Request Video Links
                    </Label>
                  </div>

                  {requestVideos && (
                    <div className="space-y-2 ml-6">
                      <Input
                        placeholder="Helper text (optional)"
                        value={videoHelperText}
                        onChange={(e) => setVideoHelperText(e.target.value)}
                        className="rounded-lg"
                      />
                      <p className="text-xs text-gray-500">💡 1-min monologue link (YouTube/Vimeo/Drive; shareable).</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Consent */}
            <Card className="border-2 border-purple-200 shadow-md rounded-2xl overflow-hidden">
              <CardContent className="pt-6 space-y-4">
                <div className="flex items-start space-x-3">
                  <Checkbox
                    id="consent1"
                    checked={consent1}
                    onCheckedChange={(checked) => setConsent1(checked as boolean)}
                  />
                  <Label htmlFor="consent1" className="text-sm leading-relaxed cursor-pointer">
                    I confirm that all details provided are genuine and that I have the right to conduct this
                    casting/workshop.
                  </Label>
                </div>

                <div className="flex items-start space-x-3">
                  <Checkbox
                    id="consent2"
                    checked={consent2}
                    onCheckedChange={(checked) => setConsent2(checked as boolean)}
                  />
                  <Label htmlFor="consent2" className="text-sm leading-relaxed cursor-pointer">
                    I agree to Abhinayपथ's{" "}
                    <Link href="/terms" className="text-purple-600 hover:underline">
                      Terms
                    </Link>{" "}
                    &{" "}
                    <Link href="/privacy" className="text-purple-600 hover:underline">
                      Privacy Policy
                    </Link>
                    .
                  </Label>
                </div>
              </CardContent>
            </Card>

            {/* CTAs */}
            <div className="flex gap-3">
              <Button
                onClick={handlePublish}
                disabled={!isFormValid()}
                className="flex-1 rounded-lg h-12 text-base font-medium bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
              >
                <CheckCircle2 className="mr-2 h-5 w-5" />
                Publish Opportunity
              </Button>

              <Sheet open={applyFlowOpen} onOpenChange={setApplyFlowOpen}>
                <SheetTrigger asChild>
                  <Button variant="outline" className="rounded-lg h-12 px-6 bg-transparent">
                    <Eye className="mr-2 h-4 w-4" />
                    Preview Apply Flow
                  </Button>
                </SheetTrigger>
                <SheetContent className="w-full sm:max-w-md overflow-y-auto">
                  <SheetHeader>
                    <SheetTitle>Artist Application View</SheetTitle>
                    <SheetDescription>This is what artists will see when they apply</SheetDescription>
                  </SheetHeader>

                  <div className="mt-6 space-y-6">
                    <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                      <p className="text-sm text-blue-900">Your Abhinayपथ profile will be shared with the organiser.</p>
                    </div>

                    {requestPhotos && (
                      <div className="space-y-3">
                        <Label className="text-sm font-medium">Upload Photos</Label>
                        <div className="grid grid-cols-2 gap-3">
                          <div className="aspect-square border-2 border-dashed rounded-lg flex items-center justify-center hover:bg-gray-50 cursor-pointer">
                            <Camera className="h-8 w-8 text-gray-400" />
                          </div>
                          <div className="aspect-square border-2 border-dashed rounded-lg flex items-center justify-center hover:bg-gray-50 cursor-pointer">
                            <Camera className="h-8 w-8 text-gray-400" />
                          </div>
                        </div>
                        {photoHelperText && <p className="text-xs text-gray-600">{photoHelperText}</p>}
                      </div>
                    )}

                    {requestVideos && (
                      <div className="space-y-3">
                        <Label className="text-sm font-medium">Video Links</Label>
                        <div className="space-y-2">
                          <Input placeholder="YouTube/Vimeo/Drive link" className="rounded-lg" />
                          <Input placeholder="YouTube/Vimeo/Drive link" className="rounded-lg" />
                        </div>
                        {videoHelperText && <p className="text-xs text-gray-600">{videoHelperText}</p>}
                      </div>
                    )}

                    <Button className="w-full rounded-lg h-12" disabled>
                      Submit Application
                    </Button>

                    <p className="text-xs text-center text-gray-500">
                      Submit will be enabled once all required media is provided
                    </p>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>

          {/* Right Column - Live Preview */}
          <div className="lg:sticky lg:top-24 h-fit">
            <Card className="border-2 shadow-xl rounded-2xl overflow-hidden">
              <CardHeader className="bg-gradient-to-r from-purple-600 to-pink-600 text-white">
                <div className="flex items-center gap-2 mb-2">
                  <Eye className="h-5 w-5" />
                  <CardTitle className="text-lg">Live Preview</CardTitle>
                </div>
                <p className="text-sm text-purple-100">How it will appear to artists</p>
              </CardHeader>
              <CardContent className="pt-6 space-y-4">
                {/* Type and Location */}
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  {type && (
                    <Badge variant="secondary" className="capitalize">
                      {type.replace("-", " ")}
                    </Badge>
                  )}
                  {(city || platform) && (
                    <>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        {locationMode === "city" ? (
                          <>
                            <MapPin className="h-3 w-3" />
                            {city || "City"}
                          </>
                        ) : (
                          <>
                            <Globe className="h-3 w-3" />
                            Online
                          </>
                        )}
                      </span>
                    </>
                  )}
                </div>

                {/* Title */}
                <h3 className="font-playfair text-2xl font-bold text-gray-900">{title || "Opportunity Title"}</h3>

                {/* Deadline and Location Detail */}
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  {deadline && (
                    <>
                      <CalendarIcon className="h-4 w-4" />
                      <span>Deadline: {format(deadline, "MMM d, yyyy")}</span>
                    </>
                  )}
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

                {/* Description */}
                <div className="prose prose-sm max-w-none">
                  <p className="text-gray-700 line-clamp-4">{description || "Description will appear here..."}</p>
                </div>

                {/* Requirements */}
                {(genderPreference !== "any" || ageMin || ageMax || selectedLanguages.length > 0 || experience) && (
                  <div className="space-y-2 pt-4 border-t">
                    <h4 className="text-sm font-semibold text-gray-900">Requirements</h4>
                    <div className="flex flex-wrap gap-2">
                      {genderPreference !== "any" && (
                        <Badge variant="outline" className="capitalize">
                          {genderPreference.replace("-", " ")}
                        </Badge>
                      )}
                      {(ageMin || ageMax) && (
                        <Badge variant="outline">
                          Age: {ageMin || "?"}–{ageMax || "?"}
                        </Badge>
                      )}
                      {selectedLanguages.map((lang) => (
                        <Badge key={lang} variant="outline">
                          {lang}
                        </Badge>
                      ))}
                      {experience && (
                        <Badge variant="outline" className="capitalize">
                          {experience}
                        </Badge>
                      )}
                    </div>
                  </div>
                )}

                {/* Pay */}
                <div className="flex items-center gap-2 text-sm pt-4 border-t">
                  <DollarSign className="h-4 w-4 text-gray-600" />
                  <span className="text-gray-900 font-medium">
                    {payType === "not-specified" && "Not specified"}
                    {payType === "free" && "Free"}
                    {payType === "stipend" && (payAmount ? `Stipend: ₹${payAmount}` : "Stipend")}
                    {payType === "paid" && (payAmount ? `Paid: ₹${payAmount}` : "Paid")}
                  </span>
                </div>

                {/* CTA */}
                <Button className="w-full rounded-lg h-12 mt-6 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
                  {applicationMethod === "platform"
                    ? "Apply on Abhinayपथ"
                    : applicationMethod === "whatsapp"
                      ? "Apply via WhatsApp"
                      : applicationMethod === "email"
                        ? "Apply via Email"
                        : "Apply via External Form"}
                </Button>

                {/* Visibility Badge */}
                <div className="flex justify-center pt-4">
                  <Badge variant="outline" className="text-xs capitalize">
                    Visibility: {visibility}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Footer */}
        <footer className="mt-16 text-center text-sm text-gray-600 space-y-2">
          <p>© Abhinayपथ • Minimal form, maximal clarity.</p>
          <div className="flex items-center justify-center gap-4">
            <Link href="/privacy" className="hover:text-purple-600 transition-colors">
              Privacy Policy
            </Link>
            <span>•</span>
            <Link href="/terms" className="hover:text-purple-600 transition-colors">
              Terms
            </Link>
            <span>•</span>
            <Link href="/report" className="hover:text-purple-600 transition-colors">
              Report Misuse
            </Link>
          </div>
        </footer>
      </div>
    </div>
  )
}
