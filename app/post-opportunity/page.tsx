"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Progress } from "@/components/ui/progress"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { toast } from "@/components/ui/use-toast"
import {
  CalendarIcon,
  ChevronDown,
  ChevronUp,
  MapPin,
  Video,
  Users,
  Briefcase,
  Camera,
  Info,
  Globe,
  Clock,
  DollarSign,
  Eye,
  CheckCircle2,
} from "lucide-react"
import { format } from "date-fns"
import { cn } from "@/lib/utils"
import Link from "next/link"

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
  contact: string
  rolesNeeded: string
  gender: string
  ageMin: string
  ageMax: string
  languages: string[]
  experience: string
  payType: string
  amount: string
  visibility: "public" | "unlisted"
  requestPhotos: boolean
  photoHelperText: string
  requestVideos: boolean
  videoHelperText: string
  consent1: boolean
  consent2: boolean
}

const LANGUAGES = [
  "Hindi",
  "English",
  "Marathi",
  "Tamil",
  "Telugu",
  "Kannada",
  "Bengali",
  "Gujarati",
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
    contact: "",
    rolesNeeded: "",
    gender: "any",
    ageMin: "",
    ageMax: "",
    languages: [],
    experience: "",
    payType: "not-specified",
    amount: "",
    visibility: "public",
    requestPhotos: false,
    photoHelperText: "",
    requestVideos: false,
    videoHelperText: "",
    consent1: false,
    consent2: false,
  })

  const [advancedOpen, setAdvancedOpen] = useState(false)
  const [contactOpen, setContactOpen] = useState(false)
  const [applyFlowOpen, setApplyFlowOpen] = useState(false)
  const [progress, setProgress] = useState(0)

  const requiredFields = [
    formData.title,
    formData.type,
    formData.deadline,
    formData.locationMode === "city" ? formData.city : true,
    formData.description,
    formData.consent1,
    formData.consent2,
  ]

  const conditionalFields = [formData.payType === "stipend" || formData.payType === "paid" ? formData.amount : true]

  useEffect(() => {
    const allRequired = [...requiredFields, ...conditionalFields]
    const filled = allRequired.filter(Boolean).length
    setProgress((filled / allRequired.length) * 100)
  }, [formData])

  const isFormValid = () => {
    return (
      requiredFields.every(Boolean) &&
      conditionalFields.every(Boolean) &&
      (!formData.ageMin || !formData.ageMax || Number(formData.ageMin) <= Number(formData.ageMax))
    )
  }

  const handlePublish = () => {
    if (isFormValid()) {
      toast({
        title: "Published Successfully! 🎉",
        description: "You can edit this opportunity anytime.",
      })
    }
  }

  const toggleLanguage = (lang: string) => {
    if (formData.languages.includes(lang)) {
      setFormData({
        ...formData,
        languages: formData.languages.filter((l) => l !== lang),
      })
    } else if (formData.languages.length < 4) {
      setFormData({
        ...formData,
        languages: [...formData.languages, lang],
      })
    }
  }

  const getLocationDisplay = () => {
    if (formData.locationMode === "online") {
      return formData.platform ? `Online (${formData.platform})` : "Online"
    }
    return formData.city || "Location TBD"
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50/50 to-white">
      {/* Header */}
      <div className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="container py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-purple-600 to-red-600 flex items-center justify-center text-white font-bold text-sm">
                AP
              </div>
              <div>
                <h1 className="font-playfair text-2xl font-bold text-gray-900">Post Opportunity</h1>
                <p className="text-sm text-gray-500">Keep it crisp. Artists love clarity.</p>
              </div>
            </div>
            <div className="text-right">
              <Badge variant="outline" className="text-xs">
                <Clock className="h-3 w-3 mr-1" />
                All times IST
              </Badge>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mt-4">
            <Progress value={progress} className="h-1.5" />
            <p className="text-xs text-gray-500 mt-1.5">{Math.round(progress)}% complete</p>
          </div>
        </div>
      </div>

      <div className="container py-8">
        <div className="grid lg:grid-cols-[1fr_400px] gap-8">
          {/* Left Column - Form */}
          <div className="space-y-6">
            {/* Core Section */}
            <Card className="border-gray-200 shadow-sm hover:shadow-md transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Briefcase className="h-5 w-5 text-purple-600" />
                  Core Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Title *</Label>
                  <Input
                    id="title"
                    placeholder="e.g., Lead Actor for Theatre Play"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="rounded-xl"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="type">Type *</Label>
                  <Select value={formData.type} onValueChange={(value) => setFormData({ ...formData, type: value })}>
                    <SelectTrigger id="type" className="rounded-xl">
                      <SelectValue placeholder="Select opportunity type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="theatre">Theatre Play</SelectItem>
                      <SelectItem value="short-film">Short Film</SelectItem>
                      <SelectItem value="feature-film">Feature Film</SelectItem>
                      <SelectItem value="ad">Advertisement</SelectItem>
                      <SelectItem value="backstage">Backstage Role</SelectItem>
                      <SelectItem value="job">Job</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Deadline *</Label>
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
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={formData.deadline}
                        onSelect={(date) => setFormData({ ...formData, deadline: date })}
                        disabled={(date) => date < new Date()}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>

                <Separator />

                <div className="space-y-3">
                  <Label>Location Mode *</Label>
                  <div className="flex gap-4">
                    <Button
                      type="button"
                      variant={formData.locationMode === "city" ? "default" : "outline"}
                      onClick={() => setFormData({ ...formData, locationMode: "city" })}
                      className="flex-1 rounded-xl"
                    >
                      <MapPin className="h-4 w-4 mr-2" />
                      City
                    </Button>
                    <Button
                      type="button"
                      variant={formData.locationMode === "online" ? "default" : "outline"}
                      onClick={() => setFormData({ ...formData, locationMode: "online" })}
                      className="flex-1 rounded-xl"
                    >
                      <Video className="h-4 w-4 mr-2" />
                      Online
                    </Button>
                  </div>
                </div>

                {formData.locationMode === "city" ? (
                  <>
                    <div className="space-y-2">
                      <Label htmlFor="city">City *</Label>
                      <Input
                        id="city"
                        placeholder="e.g., Mumbai"
                        value={formData.city}
                        onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                        className="rounded-xl"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="venue">Venue (Optional)</Label>
                      <Input
                        id="venue"
                        placeholder="e.g., Prithvi Theatre"
                        value={formData.venue}
                        onChange={(e) => setFormData({ ...formData, venue: e.target.value })}
                        className="rounded-xl"
                      />
                    </div>
                  </>
                ) : (
                  <div className="space-y-2">
                    <Label htmlFor="platform">Platform (Optional)</Label>
                    <Input
                      id="platform"
                      placeholder="e.g., Zoom, Google Meet"
                      value={formData.platform}
                      onChange={(e) => setFormData({ ...formData, platform: e.target.value })}
                      className="rounded-xl"
                    />
                  </div>
                )}

                <div className="space-y-2">
                  <Label htmlFor="description">Description *</Label>
                  <Textarea
                    id="description"
                    placeholder="What to prepare, key dates, audition flow..."
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="rounded-xl min-h-[120px]"
                  />
                  <p className="text-xs text-gray-500">What to prepare, key dates, audition flow</p>
                </div>

                <Separator />

                <div className="space-y-3">
                  <Label>Application Method *</Label>
                  <RadioGroup
                    value={formData.applicationMethod}
                    onValueChange={(value: any) => setFormData({ ...formData, applicationMethod: value })}
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="platform" id="platform-method" />
                      <Label htmlFor="platform-method" className="font-normal cursor-pointer">
                        Quick Apply on Abhinayपथ (Recommended)
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="whatsapp" id="whatsapp-method" />
                      <Label htmlFor="whatsapp-method" className="font-normal cursor-pointer">
                        WhatsApp
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="email" id="email-method" />
                      <Label htmlFor="email-method" className="font-normal cursor-pointer">
                        Email
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="external" id="external-method" />
                      <Label htmlFor="external-method" className="font-normal cursor-pointer">
                        External Form
                      </Label>
                    </div>
                  </RadioGroup>
                </div>

                {formData.applicationMethod !== "platform" && (
                  <Collapsible open={contactOpen} onOpenChange={setContactOpen}>
                    <CollapsibleTrigger asChild>
                      <Button variant="ghost" className="w-full justify-between rounded-xl">
                        <span className="text-sm">Contact Details</span>
                        {contactOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                      </Button>
                    </CollapsibleTrigger>
                    <CollapsibleContent className="pt-3">
                      <Input
                        placeholder={
                          formData.applicationMethod === "whatsapp"
                            ? "WhatsApp number (with country code)"
                            : formData.applicationMethod === "email"
                              ? "Email address"
                              : "Form URL"
                        }
                        value={formData.contact}
                        onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
                        className="rounded-xl"
                      />
                    </CollapsibleContent>
                  </Collapsible>
                )}
              </CardContent>
            </Card>

            {/* Advanced Section */}
            <Card className="border-gray-200 shadow-sm hover:shadow-md transition-shadow">
              <Collapsible open={advancedOpen} onOpenChange={setAdvancedOpen}>
                <CardHeader>
                  <CollapsibleTrigger asChild>
                    <Button variant="ghost" className="w-full justify-between p-0 hover:bg-transparent">
                      <CardTitle className="flex items-center gap-2 text-lg">
                        <Users className="h-5 w-5 text-purple-600" />
                        Advanced Details (Optional)
                      </CardTitle>
                      {advancedOpen ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
                    </Button>
                  </CollapsibleTrigger>
                </CardHeader>
                <CollapsibleContent>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="roles">Roles Needed</Label>
                      <Input
                        id="roles"
                        placeholder="e.g., 2 Female (20-25), 1 Male (30-40)"
                        value={formData.rolesNeeded}
                        onChange={(e) => setFormData({ ...formData, rolesNeeded: e.target.value })}
                        className="rounded-xl"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="gender">Gender Preference</Label>
                      <Select
                        value={formData.gender}
                        onValueChange={(value) => setFormData({ ...formData, gender: value })}
                      >
                        <SelectTrigger id="gender" className="rounded-xl">
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

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="age-min">Age Range (Min)</Label>
                        <Input
                          id="age-min"
                          type="number"
                          placeholder="18"
                          value={formData.ageMin}
                          onChange={(e) => setFormData({ ...formData, ageMin: e.target.value })}
                          className="rounded-xl"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="age-max">Age Range (Max)</Label>
                        <Input
                          id="age-max"
                          type="number"
                          placeholder="35"
                          value={formData.ageMax}
                          onChange={(e) => setFormData({ ...formData, ageMax: e.target.value })}
                          className="rounded-xl"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label>Languages (Max 4)</Label>
                      <div className="flex flex-wrap gap-2">
                        {LANGUAGES.map((lang) => (
                          <Badge
                            key={lang}
                            variant={formData.languages.includes(lang) ? "default" : "outline"}
                            className="cursor-pointer rounded-full px-3 py-1 transition-all hover:scale-105"
                            onClick={() => toggleLanguage(lang)}
                          >
                            {lang}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="experience">Experience Level</Label>
                      <Select
                        value={formData.experience}
                        onValueChange={(value) => setFormData({ ...formData, experience: value })}
                      >
                        <SelectTrigger id="experience" className="rounded-xl">
                          <SelectValue placeholder="Select experience level" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="beginner">Beginner</SelectItem>
                          <SelectItem value="intermediate">Intermediate</SelectItem>
                          <SelectItem value="professional">Professional</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="pay-type">Fee / Pay</Label>
                      <Select
                        value={formData.payType}
                        onValueChange={(value) => setFormData({ ...formData, payType: value })}
                      >
                        <SelectTrigger id="pay-type" className="rounded-xl">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="not-specified">Not specified</SelectItem>
                          <SelectItem value="free">Free</SelectItem>
                          <SelectItem value="stipend">Stipend</SelectItem>
                          <SelectItem value="paid">Paid</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    {(formData.payType === "stipend" || formData.payType === "paid") && (
                      <div className="space-y-2">
                        <Label htmlFor="amount">Amount *</Label>
                        <div className="relative">
                          <DollarSign className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
                          <Input
                            id="amount"
                            type="number"
                            placeholder="Enter amount in ₹"
                            value={formData.amount}
                            onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                            className="pl-10 rounded-xl"
                          />
                        </div>
                      </div>
                    )}

                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                      <div className="space-y-0.5">
                        <Label htmlFor="visibility" className="text-base">
                          Visibility
                        </Label>
                        <p className="text-sm text-gray-500">
                          {formData.visibility === "public" ? "Anyone can find this" : "Only via direct link"}
                        </p>
                      </div>
                      <Switch
                        id="visibility"
                        checked={formData.visibility === "public"}
                        onCheckedChange={(checked) =>
                          setFormData({ ...formData, visibility: checked ? "public" : "unlisted" })
                        }
                      />
                    </div>
                  </CardContent>
                </CollapsibleContent>
              </Collapsible>
            </Card>

            {/* Media Request Section */}
            <Card className="border-gray-200 shadow-sm hover:shadow-md transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Camera className="h-5 w-5 text-purple-600" />
                  Media Request (Optional)
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-start space-x-3 p-4 bg-gray-50 rounded-xl">
                    <Checkbox
                      id="request-photos"
                      checked={formData.requestPhotos}
                      onCheckedChange={(checked) => setFormData({ ...formData, requestPhotos: checked as boolean })}
                    />
                    <div className="flex-1 space-y-2">
                      <Label htmlFor="request-photos" className="cursor-pointer font-normal">
                        Request Photos
                      </Label>
                      <p className="text-xs text-gray-500">
                        JPG/PNG/WebP up to 5MB each. Ask for 1 headshot + 1 full body.
                      </p>
                      {formData.requestPhotos && (
                        <Input
                          placeholder="Helper text (optional)"
                          value={formData.photoHelperText}
                          onChange={(e) => setFormData({ ...formData, photoHelperText: e.target.value })}
                          className="mt-2 rounded-xl text-sm"
                        />
                      )}
                    </div>
                  </div>

                  <div className="flex items-start space-x-3 p-4 bg-gray-50 rounded-xl">
                    <Checkbox
                      id="request-videos"
                      checked={formData.requestVideos}
                      onCheckedChange={(checked) => setFormData({ ...formData, requestVideos: checked as boolean })}
                    />
                    <div className="flex-1 space-y-2">
                      <Label htmlFor="request-videos" className="cursor-pointer font-normal">
                        Request Video Links
                      </Label>
                      <p className="text-xs text-gray-500">1-min monologue link (YouTube/Vimeo/Drive; shareable).</p>
                      {formData.requestVideos && (
                        <Input
                          placeholder="Helper text (optional)"
                          value={formData.videoHelperText}
                          onChange={(e) => setFormData({ ...formData, videoHelperText: e.target.value })}
                          className="mt-2 rounded-xl text-sm"
                        />
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Consent Section */}
            <Card className="border-gray-200 shadow-sm hover:shadow-md transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <CheckCircle2 className="h-5 w-5 text-purple-600" />
                  Consent
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start space-x-3">
                  <Checkbox
                    id="consent1"
                    checked={formData.consent1}
                    onCheckedChange={(checked) => setFormData({ ...formData, consent1: checked as boolean })}
                  />
                  <Label htmlFor="consent1" className="cursor-pointer font-normal leading-relaxed">
                    I confirm that all details provided are genuine and that I have the right to conduct this
                    casting/workshop.
                  </Label>
                </div>

                <div className="flex items-start space-x-3">
                  <Checkbox
                    id="consent2"
                    checked={formData.consent2}
                    onCheckedChange={(checked) => setFormData({ ...formData, consent2: checked as boolean })}
                  />
                  <Label htmlFor="consent2" className="cursor-pointer font-normal leading-relaxed">
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
            <div className="flex gap-4 pb-8">
              <Button
                size="lg"
                onClick={handlePublish}
                disabled={!isFormValid()}
                className="flex-1 rounded-xl bg-gradient-to-r from-purple-600 to-red-600 hover:from-purple-700 hover:to-red-700 text-white font-medium shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              >
                Publish Opportunity
              </Button>
              <Sheet open={applyFlowOpen} onOpenChange={setApplyFlowOpen}>
                <SheetTrigger asChild>
                  <Button size="lg" variant="outline" className="rounded-xl bg-transparent">
                    <Eye className="h-4 w-4 mr-2" />
                    Preview Apply Flow
                  </Button>
                </SheetTrigger>
                <SheetContent className="sm:max-w-lg overflow-y-auto">
                  <SheetHeader>
                    <SheetTitle>Artist Application View</SheetTitle>
                  </SheetHeader>
                  <div className="mt-6 space-y-6">
                    <div className="p-4 bg-blue-50 border border-blue-200 rounded-xl">
                      <p className="text-sm text-blue-800">
                        <Info className="h-4 w-4 inline mr-2" />
                        Your Abhinayपथ profile will be shared with the organiser.
                      </p>
                    </div>

                    {formData.requestPhotos && (
                      <div className="space-y-3">
                        <Label>Upload Photos</Label>
                        <div className="grid grid-cols-2 gap-3">
                          <div className="h-32 border-2 border-dashed border-gray-300 rounded-xl flex items-center justify-center bg-gray-50">
                            <Camera className="h-8 w-8 text-gray-400" />
                          </div>
                          <div className="h-32 border-2 border-dashed border-gray-300 rounded-xl flex items-center justify-center bg-gray-50">
                            <Camera className="h-8 w-8 text-gray-400" />
                          </div>
                        </div>
                        {formData.photoHelperText && (
                          <p className="text-xs text-gray-600">{formData.photoHelperText}</p>
                        )}
                      </div>
                    )}

                    {formData.requestVideos && (
                      <div className="space-y-3">
                        <Label>Video Links</Label>
                        <Input placeholder="YouTube/Vimeo/Drive link" className="rounded-xl" />
                        <Input placeholder="Additional link (optional)" className="rounded-xl" />
                        {formData.videoHelperText && (
                          <p className="text-xs text-gray-600">{formData.videoHelperText}</p>
                        )}
                      </div>
                    )}

                    <Button
                      size="lg"
                      className="w-full rounded-xl"
                      disabled={formData.requestPhotos || formData.requestVideos}
                    >
                      Submit Application
                    </Button>

                    {(formData.requestPhotos || formData.requestVideos) && (
                      <p className="text-xs text-center text-gray-500">Complete required media uploads to submit</p>
                    )}
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>

          {/* Right Column - Live Preview */}
          <div className="lg:sticky lg:top-24 h-fit">
            <Card className="border-gray-200 shadow-lg overflow-hidden">
              <div className="bg-gradient-to-br from-purple-600/10 to-red-600/10 p-4 border-b">
                <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                  <Badge variant="secondary" className="rounded-full">
                    {formData.type || "Type"}
                  </Badge>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    {formData.locationMode === "online" ? (
                      <Video className="h-3.5 w-3.5" />
                    ) : (
                      <MapPin className="h-3.5 w-3.5" />
                    )}
                    {getLocationDisplay()}
                  </span>
                </div>
                <h3 className="font-playfair text-xl font-bold text-gray-900 mb-1">
                  {formData.title || "Opportunity Title"}
                </h3>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <CalendarIcon className="h-3.5 w-3.5" />
                  <span>Deadline: {formData.deadline ? format(formData.deadline, "PPP") : "Not set"}</span>
                </div>
              </div>

              <CardContent className="p-6 space-y-4">
                <div>
                  <h4 className="font-semibold text-sm text-gray-900 mb-2">Description</h4>
                  <p className="text-sm text-gray-600 line-clamp-4">
                    {formData.description || "Description will appear here..."}
                  </p>
                </div>

                {(formData.rolesNeeded ||
                  formData.gender !== "any" ||
                  formData.ageMin ||
                  formData.languages.length > 0 ||
                  formData.experience) && <Separator />}

                {(formData.rolesNeeded ||
                  formData.gender !== "any" ||
                  formData.ageMin ||
                  formData.languages.length > 0 ||
                  formData.experience) && (
                  <div>
                    <h4 className="font-semibold text-sm text-gray-900 mb-3">Requirements</h4>
                    <div className="space-y-2 text-sm">
                      {formData.rolesNeeded && (
                        <div className="flex gap-2">
                          <span className="text-gray-500 min-w-20">Roles:</span>
                          <span className="text-gray-900">{formData.rolesNeeded}</span>
                        </div>
                      )}
                      {formData.gender !== "any" && (
                        <div className="flex gap-2">
                          <span className="text-gray-500 min-w-20">Gender:</span>
                          <span className="text-gray-900 capitalize">{formData.gender}</span>
                        </div>
                      )}
                      {(formData.ageMin || formData.ageMax) && (
                        <div className="flex gap-2">
                          <span className="text-gray-500 min-w-20">Age:</span>
                          <span className="text-gray-900">
                            {formData.ageMin || "Any"} - {formData.ageMax || "Any"}
                          </span>
                        </div>
                      )}
                      {formData.languages.length > 0 && (
                        <div className="flex gap-2">
                          <span className="text-gray-500 min-w-20">Languages:</span>
                          <span className="text-gray-900">{formData.languages.join(", ")}</span>
                        </div>
                      )}
                      {formData.experience && (
                        <div className="flex gap-2">
                          <span className="text-gray-500 min-w-20">Experience:</span>
                          <span className="text-gray-900 capitalize">{formData.experience}</span>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                <Separator />

                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Compensation</p>
                    <p className="font-semibold text-gray-900">
                      {formData.payType === "not-specified"
                        ? "Not specified"
                        : formData.payType === "free"
                          ? "Free"
                          : formData.amount
                            ? `₹${formData.amount}`
                            : "To be decided"}
                    </p>
                  </div>
                  <Badge variant={formData.visibility === "public" ? "default" : "secondary"} className="rounded-full">
                    <Globe className="h-3 w-3 mr-1" />
                    {formData.visibility === "public" ? "Public" : "Unlisted"}
                  </Badge>
                </div>

                <Button className="w-full rounded-xl bg-gradient-to-r from-purple-600 to-red-600 hover:from-purple-700 hover:to-red-700 text-white">
                  {formData.applicationMethod === "platform"
                    ? "Apply on Abhinayपथ"
                    : formData.applicationMethod === "whatsapp"
                      ? "Contact via WhatsApp"
                      : formData.applicationMethod === "email"
                        ? "Apply via Email"
                        : "Apply via External Form"}
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t bg-white/80 backdrop-blur-sm py-6 mt-12">
        <div className="container text-center">
          <p className="text-sm text-gray-600">© Abhinayपथ • Minimal form, maximal clarity.</p>
          <div className="flex items-center justify-center gap-4 mt-2 text-xs text-gray-500">
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
        </div>
      </footer>
    </div>
  )
}
