"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
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
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format } from "date-fns"
import {
  CalendarIcon,
  MapPin,
  Globe,
  GraduationCap,
  Users,
  DollarSign,
  Eye,
  CheckCircle2,
  X,
  AlertCircle,
  Sparkles,
  Plus,
  Trash2,
  Upload,
  Clock,
  ArrowLeft,
  LinkIcon,
  Mail,
  Phone,
  Loader2,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { toast } from "sonner"
import Link from "next/link"
import Image from "next/image"
import { createClient } from "@supabase/supabase-js"
import { INDIAN_STATES } from "@/lib/types/talent"

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

interface WorkshopSession {
  id: string
  date: Date | undefined
  startTime: string
  duration: string
}

export default function PostWorkshopPage() {
  const router = useRouter()

  // Core Fields
  const [title, setTitle] = useState("")
  const [sessions, setSessions] = useState<WorkshopSession[]>([
    { id: "1", date: undefined, startTime: "", duration: "" },
  ])
  const [locationMode, setLocationMode] = useState<"city" | "online">("city")
  const [city, setCity] = useState("")
  const [venue, setVenue] = useState("")
  const [platform, setPlatform] = useState("")
  // Pincode + State/City dropdowns
  const [pincode, setPincode] = useState("")
  const [selectedState, setSelectedState] = useState("")
  const [stateOptions, setStateOptions] = useState<string[]>([])
  const [cityOptions, setCityOptions] = useState<string[]>([])
  const [isCityDisabled, setIsCityDisabled] = useState(true)
  const [stateSearch, setStateSearch] = useState("")
  const [citySearch, setCitySearch] = useState("")
  const [stateOpen, setStateOpen] = useState(false)
  const [cityOpen, setCityOpen] = useState(false)
  const [isPincodeLoading, setIsPincodeLoading] = useState(false)
  const [description, setDescription] = useState("")
  const [feeType, setFeeType] = useState<"free" | "paid">("free")
  const [feeAmount, setFeeAmount] = useState("")
  const [feeNote, setFeeNote] = useState("")
  const [coverImage, setCoverImage] = useState<File | null>(null)
  const [coverImagePreview, setCoverImagePreview] = useState<string>("")
  const [registrationLink, setRegistrationLink] = useState("")
  const [contactMethod, setContactMethod] = useState<"whatsapp" | "email" | "both">("whatsapp")
  const [whatsappNumber, setWhatsappNumber] = useState("")
  const [email, setEmail] = useState("")

  // Optional Fields
  const [skillLevel, setSkillLevel] = useState("open-to-all")
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>([])
  const [capacity, setCapacity] = useState("")
  const [registrationDeadline, setRegistrationDeadline] = useState<Date>()
  const [targetAudience, setTargetAudience] = useState("")

  // Consent
  const [consent1, setConsent1] = useState(false)
  const [consent2, setConsent2] = useState(false)

  // UI State
  const [showPreview, setShowPreview] = useState(false)
  const [progress, setProgress] = useState(0)
  const [isPublishing, setIsPublishing] = useState(false)

  // Calculate Progress
  useEffect(() => {
    const requiredFields = [
      title,
      sessions[0].date,
      sessions[0].startTime,
      sessions[0].duration,
      locationMode === "city" ? (selectedState && city) : platform,
      description,
      feeType === "paid" ? feeAmount : true,
      consent1,
      consent2,
    ]

    const completed = requiredFields.filter(Boolean).length
    const total = requiredFields.length
    setProgress((completed / total) * 100)
  }, [title, sessions, city, selectedState, platform, description, feeType, feeAmount, consent1, consent2, locationMode])

  // Load distinct states on mount
  useEffect(() => {
    async function loadStates() {
      const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL as string
      const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string
      if (!supabaseUrl || !supabaseAnonKey) {
        setStateOptions(Array.from(INDIAN_STATES))
        return
      }
      const client = createClient(supabaseUrl, supabaseAnonKey)
      const { data, error } = await client
        .from("pincodes")
        .select("state")
        .order("state", { ascending: true })
        .limit(50000)
      if (!error && data) {
        const unique = Array.from(new Set(data.map((d: any) => (d.state || "").trim()))).filter(Boolean)
        setStateOptions(unique)
      }
    }
    loadStates()
  }, [])

  // When state changes, load cities and enable city dropdown
  useEffect(() => {
    async function loadCities() {
      if (!selectedState) {
        setCityOptions([])
        setIsCityDisabled(true)
        return
      }
      setIsCityDisabled(false)
      const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL as string
      const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string
      if (!supabaseUrl || !supabaseAnonKey) return
      const client = createClient(supabaseUrl, supabaseAnonKey)
      const { data, error } = await client
        .from("pincodes")
        .select("city")
        .eq("state", selectedState)
        .order("city", { ascending: true })
        .limit(50000)
      if (!error && data) {
        const unique = Array.from(new Set(data.map((d: any) => (d.city || "").trim()))).filter(Boolean)
        setCityOptions(unique)
      }
    }
    loadCities()
  }, [selectedState])

  // Auto-fill state/city on valid 6-digit pincode
  useEffect(() => {
    async function tryAutofill() {
      const six = pincode.replace(/\D/g, "")
      if (six.length !== 6) return
      const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL as string
      const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string
      if (!supabaseUrl || !supabaseAnonKey) return
      
      setIsPincodeLoading(true)
      try {
        const client = createClient(supabaseUrl, supabaseAnonKey)
        // First try matching pincode as text
        let { data, error } = await client
          .from("pincodes")
          .select("city, state")
          .eq("pincode", six)
          .limit(1)
      
        if (error) {
          console.error("Pincode lookup error (text):", error)
        }
      
        let row: any | null = Array.isArray(data) && data.length > 0 ? data[0] : null
      
        // Fallback: try numeric column if text match fails
        if (!row) {
          const parsed = parseInt(six, 10)
          if (!Number.isNaN(parsed)) {
            const res2 = await client
              .from("pincodes")
              .select("city, state")
              .eq("pincode_int", parsed)
              .limit(1)
            if (res2.error) {
              console.error("Pincode lookup error (int):", res2.error)
            }
            row = Array.isArray(res2.data) && res2.data.length > 0 ? res2.data[0] : null
          }
        }
      
        if (row) {
         setSelectedState((row.state || "").trim())
          setCity((row.city || "").trim())
          const stateValue = (row.state || "").trim()
          const cityValue = (row.city || "").trim()
          setSelectedState(stateValue)
          setCity(cityValue)
          // Enable city dropdown immediately on autofill
          setIsCityDisabled(false)
          // Ensure dropdowns include the autofilled values even if options are empty
          if (stateValue) {
            setStateOptions((prev) => Array.from(new Set([...prev, stateValue])))
          }
          if (cityValue) {
           setCityOptions((prev) => Array.from(new Set([...prev, cityValue])))
          }
        }
      } finally {
        setIsPincodeLoading(false)
      }
    }
    tryAutofill()
  }, [pincode])

  const toggleLanguage = (lang: string) => {
    if (selectedLanguages.includes(lang)) {
      setSelectedLanguages(selectedLanguages.filter((l) => l !== lang))
    } else {
      setSelectedLanguages([...selectedLanguages, lang])
    }
  }

  const addSession = () => {
    setSessions([
      ...sessions,
      {
        id: Date.now().toString(),
        date: undefined,
        startTime: "",
        duration: "",
      },
    ])
  }

  const removeSession = (id: string) => {
    if (sessions.length > 1) {
      setSessions(sessions.filter((s) => s.id !== id))
    }
  }

  const updateSession = (id: string, field: keyof WorkshopSession, value: any) => {
    setSessions(sessions.map((s) => (s.id === id ? { ...s, [field]: value } : s)))
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast.error("Image must be less than 5MB")
        return
      }
      setCoverImage(file)
      const reader = new FileReader()
      reader.onloadend = () => {
        setCoverImagePreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const isFormValid = () => {
    if (!title || !description || !consent1 || !consent2) return false
    if (sessions.length === 0 || !sessions[0].date || !sessions[0].startTime || !sessions[0].duration) return false
    if (locationMode === "city" && (!selectedState || !city)) return false
    if (locationMode === "online" && !platform) return false
    if (feeType === "paid" && !feeAmount) return false
    return true
  }

  const handlePublish = async () => {
    if (!isFormValid()) {
      toast.error("Please fill in all required fields")
      return
    }

    setIsPublishing(true)
    try {
      let coverImageUrl: string | null = null
      if (coverImage) {
        const formData = new FormData()
        formData.append("file", coverImage)
        formData.append("type", "cover")

        const uploadRes = await fetch("/api/workshops/media", {
          method: "POST",
          body: formData,
        })
        const uploadData = await uploadRes.json()
        if (!uploadRes.ok) {
          throw new Error(uploadData?.error || "Failed to upload cover image")
        }
        coverImageUrl = uploadData.url
      }

      const payload = {
        title,
        description,
        sessions: sessions
          .map((s) => ({
            date: s.date ? format(s.date as Date, "yyyy-MM-dd") : null,
            startTime: s.startTime,
            duration: s.duration,
          }))
          .filter((s) => s.date),
        locationMode,
        state: locationMode === "city" ? selectedState : null,
        city: locationMode === "city" ? city : null,
        pincode: locationMode === "city" ? pincode : null,
        venue,
        platform: locationMode === "online" ? platform : null,
        feeType,
        feeAmount: feeType === "paid" ? feeAmount : null,
        feeNote,
        coverImage: coverImageUrl,
        registrationLink,
        contactMethod,
        whatsappNumber:
          contactMethod === "whatsapp" || contactMethod === "both" ? whatsappNumber : null,
        email: contactMethod === "email" || contactMethod === "both" ? email : null,
        skillLevel,
        selectedLanguages,
        capacity,
        registrationDeadline: registrationDeadline
          ? format(registrationDeadline as Date, "yyyy-MM-dd")
          : null,
        targetAudience,
        visibility: "public",
        status: "published",
      }

      const res = await fetch("/api/workshops", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })
      const data = await res.json()
      if (!res.ok) {
        throw new Error(data?.error || "Failed to create workshop")
      }

      toast.success("Workshop posted successfully!")
      router.push(`/workshops/${data.workshop.id}`)
    } catch (err: any) {
      console.error("Publish workshop failed:", err)
      toast.error(err?.message || "Failed to post workshop")
    } finally {
      setIsPublishing(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12">
        {/* Header */}
        <div className="mb-6 sm:mb-8">
          <Button
            variant="ghost"
            onClick={() => router.back()}
            className="mb-4 text-sm sm:text-base h-10 sm:h-auto px-3 sm:px-4 touch-manipulation"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>

          <div className="text-center">
            <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-3 mb-3 sm:mb-4">
              <Badge variant="secondary" className="text-xs font-medium px-2 sm:px-3 py-1">
                AP
              </Badge>
              <h1 className="font-playfair text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900">Post Workshop</h1>
              <Badge variant="outline" className="text-xs px-2 sm:px-3 py-1">
                All times IST
              </Badge>
            </div>
            <p className="text-gray-600 text-xs sm:text-sm">Share your knowledge with the theatre community</p>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mb-6 sm:mb-8 max-w-2xl mx-auto">
          <div className="flex items-center justify-between text-xs text-gray-600 mb-2">
            <span>Form completion</span>
            <span className="font-medium">{Math.round(progress)}%</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        {/* Mobile Preview Toggle */}
        <div className="lg:hidden mb-6">
          <Button
            variant="outline"
            className="w-full rounded-lg h-12 border-2 bg-transparent"
            onClick={() => setShowPreview(!showPreview)}
          >
            <Eye className="mr-2 h-4 w-4" />
            {showPreview ? "Hide Preview" : "Show Live Preview"}
          </Button>
        </div>

        <div className="grid lg:grid-cols-2 gap-6 lg:gap-8">
          {/* Left Column - Form */}
          <div className={cn("space-y-4 sm:space-y-6", showPreview && "hidden lg:block")}>
            {/* Core Details Card */}
            <Card className="border-2 shadow-md rounded-xl sm:rounded-2xl overflow-hidden transition-all hover:shadow-lg">
              <CardHeader className="bg-gradient-to-r from-purple-50 to-pink-50 pb-3 sm:pb-4 px-4 sm:px-6">
                <div className="flex items-center gap-2">
                  <GraduationCap className="h-4 w-4 sm:h-5 sm:w-5 text-purple-600 flex-shrink-0" />
                  <CardTitle className="text-base sm:text-lg lg:text-xl">Core Details</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="pt-4 sm:pt-6 px-4 sm:px-6 space-y-4 sm:space-y-5">
                {/* Workshop Title */}
                <div className="space-y-2">
                  <Label htmlFor="title" className="text-sm font-medium">
                    Workshop Title <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="title"
                    placeholder='e.g., "Clowning for Beginners"'
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="rounded-lg h-11 sm:h-10 text-base sm:text-sm"
                  />
                </div>

                {/* Sessions */}
                <div className="space-y-3">
                  <Label className="text-sm font-medium">
                    Date & Time <span className="text-red-500">*</span>
                  </Label>

                  {sessions.map((session, index) => (
                    <Card key={session.id} className="border">
                      <CardContent className="pt-4 space-y-3">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-medium text-gray-700">Session {index + 1}</span>
                          {sessions.length > 1 && (
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => removeSession(session.id)}
                              className="h-8 text-red-600 hover:text-red-700 hover:bg-red-50"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          )}
                        </div>

                        <div className="space-y-2">
                          <Label className="text-xs">Date</Label>
                          <Popover>
                            <PopoverTrigger asChild>
                              <Button
                                variant="outline"
                                className={cn(
                                  "w-full justify-start text-left font-normal h-11 sm:h-10 text-sm",
                                  !session.date && "text-muted-foreground",
                                )}
                              >
                                <CalendarIcon className="mr-2 h-4 w-4 flex-shrink-0" />
                                <span className="truncate">
                                  {session.date ? format(session.date, "PPP") : "Pick a date"}
                                </span>
                              </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0" align="start">
                              <Calendar
                                mode="single"
                                selected={session.date}
                                onSelect={(date) => updateSession(session.id, "date", date)}
                                disabled={(date) => date < new Date()}
                                initialFocus
                              />
                            </PopoverContent>
                          </Popover>
                        </div>

                        <div className="grid grid-cols-2 gap-2">
                          <div className="space-y-2">
                            <Label className="text-xs">Start Time</Label>
                            <Input
                              type="time"
                              value={session.startTime}
                              onChange={(e) => updateSession(session.id, "startTime", e.target.value)}
                              className="rounded-lg h-11 sm:h-10"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label className="text-xs">Duration</Label>
                            <Select
                              value={session.duration}
                              onValueChange={(value) => updateSession(session.id, "duration", value)}
                            >
                              <SelectTrigger className="h-11 sm:h-10">
                                <SelectValue placeholder="Select" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="1h">1 hour</SelectItem>
                                <SelectItem value="1.5h">1.5 hours</SelectItem>
                                <SelectItem value="2h">2 hours</SelectItem>
                                <SelectItem value="2.5h">2.5 hours</SelectItem>
                                <SelectItem value="3h">3 hours</SelectItem>
                                <SelectItem value="4h">4 hours</SelectItem>
                                <SelectItem value="full-day">Full Day</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}

                  <Button
                    type="button"
                    variant="outline"
                    onClick={addSession}
                    className="w-full h-11 rounded-lg border-dashed touch-manipulation bg-transparent"
                  >
                    <Plus className="mr-2 h-4 w-4" />
                    Add Another Session
                  </Button>
                </div>

                {/* Location Mode */}
                <div className="space-y-3">
                  <Label className="text-sm font-medium">
                    Location <span className="text-red-500">*</span>
                  </Label>
                  <div className="grid grid-cols-2 gap-2 sm:gap-3">
                    <Button
                      type="button"
                      variant={locationMode === "city" ? "default" : "outline"}
                      className="rounded-lg h-11 sm:h-10 text-sm"
                      onClick={() => setLocationMode("city")}
                    >
                      <MapPin className="mr-1 sm:mr-2 h-4 w-4 flex-shrink-0" />
                      City
                    </Button>
                    <Button
                      type="button"
                      variant={locationMode === "online" ? "default" : "outline"}
                      className="rounded-lg h-11 sm:h-10 text-sm"
                      onClick={() => setLocationMode("online")}
                    >
                      <Globe className="mr-1 sm:mr-2 h-4 w-4 flex-shrink-0" />
                      Online
                    </Button>
                  </div>
                </div>

                {/* City/Venue or Platform */}
                {locationMode === "city" ? (
                  <>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {/* Pincode */}
                    <div className="space-y-2">
                      <Label htmlFor="pincode" className="text-sm font-medium">
                        Pincode
                      </Label>
                      <div className="relative">
                        <Input
                          id="pincode"
                          inputMode="numeric"
                          maxLength={6}
                          placeholder="Enter 6-digit pincode"
                          value={pincode}
                          onChange={(e) => setPincode(e.target.value)}
                          className="rounded-lg h-11 sm:h-10 pr-10"
                        />
                        {isPincodeLoading && (
                          <div className="absolute inset-y-0 right-2 flex items-center">
                            <Loader2 className="h-4 w-4 animate-spin text-gray-400" />
                          </div>
                        )}
                      </div>
                    </div>
                    </div>

                    {/* Venue */}
                    <div className="space-y-2">
                      <Label htmlFor="venue" className="text-sm font-medium">
                        Venue
                      </Label>
                      <Input
                        id="venue"
                        placeholder="Optional"
                        value={venue}
                        onChange={(e) => setVenue(e.target.value)}
                        className="rounded-lg h-11 sm:h-10"
                      />
                    </div>

                    {/* State Dropdown (searchable) */}
                    <div className="space-y-2">
                      <Label className="text-sm font-medium">
                        State <span className="text-red-500">*</span>
                      </Label>
                      <Select value={selectedState} onValueChange={setSelectedState}>
                        <SelectTrigger className="h-11 sm:h-10">
                          <SelectValue placeholder="Select state" />
                        </SelectTrigger>
                        <SelectContent>
                          <div className="p-2 border-b">
                            <Input
                              placeholder="Search state"
                              value={stateSearch}
                              onChange={(e) => setStateSearch(e.target.value)}
                              className="h-9"
                            />
                          </div>
                          {stateOptions
                            .filter((s) => s.toLowerCase().includes(stateSearch.toLowerCase()))
                            .map((s) => (
                              <SelectItem key={s} value={s}>
                                {s}
                              </SelectItem>
                            ))}
                        </SelectContent>
                      </Select>
                    </div>

                    {/* City Dropdown (searchable, disabled until state selected) */}
                    <div className="space-y-2">
                      <Label className="text-sm font-medium">
                        City <span className="text-red-500">*</span>
                      </Label>
                      <Select value={city} onValueChange={setCity}>
                        <SelectTrigger className="h-11 sm:h-10" disabled={isCityDisabled}>
                          <SelectValue placeholder={isCityDisabled ? "Select a state first" : "Select city"} />
                        </SelectTrigger>
                        <SelectContent>
                          <div className="p-2 border-b">
                            <Input
                              placeholder="Search city"
                              value={citySearch}
                              onChange={(e) => setCitySearch(e.target.value)}
                              className="h-9"
                            />
                          </div>
                          {cityOptions
                            .filter((c) => c.toLowerCase().includes(citySearch.toLowerCase()))
                            .map((c) => (
                              <SelectItem key={c} value={c}>
                                {c}
                              </SelectItem>
                            ))}
                        </SelectContent>
                      </Select>
                    </div>
                  
                  </>
                ) : (
                  <div className="space-y-2">
                    <Label htmlFor="platform" className="text-sm font-medium">
                      Platform <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="platform"
                      placeholder="e.g., Zoom, Google Meet"
                      value={platform}
                      onChange={(e) => setPlatform(e.target.value)}
                      className="rounded-lg h-11 sm:h-10"
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
                    placeholder="Describe what participants will learn, prerequisites, what to bring..."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="rounded-lg min-h-[120px] sm:min-h-[140px] resize-none text-base sm:text-sm"
                  />
                  <p className="text-xs text-gray-500">You can use line breaks for better formatting</p>
                </div>

                {/* Fee */}
                <div className="space-y-3">
                  <Label className="text-sm font-medium">
                    Fee <span className="text-red-500">*</span>
                  </Label>
                  <RadioGroup value={feeType} onValueChange={(value: "free" | "paid") => setFeeType(value)}>
                    <div className="flex items-center space-x-2 p-3 rounded-lg border hover:bg-gray-50 transition-colors touch-manipulation">
                      <RadioGroupItem value="free" id="free" />
                      <Label htmlFor="free" className="flex-1 cursor-pointer text-sm">
                        Free Workshop
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2 p-3 rounded-lg border hover:bg-gray-50 transition-colors touch-manipulation">
                      <RadioGroupItem value="paid" id="paid" />
                      <Label htmlFor="paid" className="flex-1 cursor-pointer text-sm">
                        Paid Workshop
                      </Label>
                    </div>
                  </RadioGroup>

                  {feeType === "paid" && (
                    <div className="space-y-3 pl-0 sm:pl-6">
                      <div className="space-y-2">
                        <Label htmlFor="feeAmount" className="text-sm">
                          Amount (₹) <span className="text-red-500">*</span>
                        </Label>
                        <Input
                          id="feeAmount"
                          type="number"
                          placeholder="e.g., 2500"
                          value={feeAmount}
                          onChange={(e) => setFeeAmount(e.target.value)}
                          className="rounded-lg h-11 sm:h-10"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="feeNote" className="text-sm">
                          Fee Note (Optional)
                        </Label>
                        <Input
                          id="feeNote"
                          placeholder="e.g., Per session or total fee"
                          value={feeNote}
                          onChange={(e) => setFeeNote(e.target.value)}
                          className="rounded-lg h-11 sm:h-10"
                        />
                      </div>
                    </div>
                  )}
                </div>

                {/* Cover Image */}
                <div className="space-y-2">
                  <Label htmlFor="coverImage" className="text-sm font-medium">
                    Cover Image
                  </Label>
                  <div className="space-y-3">
                    {coverImagePreview ? (
                      <div className="relative rounded-lg overflow-hidden border-2 border-gray-200">
                        <Image
                          src={coverImagePreview || "/placeholder.svg"}
                          alt="Cover preview"
                          width={600}
                          height={300}
                          className="w-full h-48 object-cover"
                        />
                        <Button
                          type="button"
                          variant="destructive"
                          size="sm"
                          onClick={() => {
                            setCoverImage(null)
                            setCoverImagePreview("")
                          }}
                          className="absolute top-2 right-2"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    ) : (
                      <label
                        htmlFor="coverImage"
                        className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed rounded-lg cursor-pointer hover:bg-gray-50 transition-colors"
                      >
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                          <Upload className="h-10 w-10 text-gray-400 mb-3" />
                          <p className="text-sm text-gray-600 mb-1">Click to upload cover image</p>
                          <p className="text-xs text-gray-500">Landscape, JPG/PNG/WebP, max 5MB</p>
                        </div>
                        <input
                          id="coverImage"
                          type="file"
                          className="hidden"
                          accept="image/jpeg,image/png,image/webp"
                          onChange={handleImageUpload}
                        />
                      </label>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Optional Details Card */}
            <Card className="border-2 shadow-md rounded-xl sm:rounded-2xl overflow-hidden transition-all hover:shadow-lg">
              <CardHeader className="bg-gradient-to-r from-blue-50 to-cyan-50 pb-3 sm:pb-4 px-4 sm:px-6">
                <div className="flex items-center gap-2">
                  <Sparkles className="h-4 w-4 sm:h-5 sm:w-5 text-blue-600 flex-shrink-0" />
                  <CardTitle className="text-base sm:text-lg lg:text-xl">Optional Details</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="pt-4 sm:pt-6 px-4 sm:px-6 space-y-4 sm:space-y-5">
                {/* Skill Level */}
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Skill Level</Label>
                  <Select value={skillLevel} onValueChange={setSkillLevel}>
                    <SelectTrigger className="h-11 sm:h-10">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="open-to-all">Open to All</SelectItem>
                      <SelectItem value="beginner">Beginner</SelectItem>
                      <SelectItem value="intermediate">Intermediate</SelectItem>
                      <SelectItem value="advanced">Advanced</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Language of Instruction */}
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Language of Instruction</Label>
                  <div className="flex flex-wrap gap-2">
                    {LANGUAGES.map((lang) => (
                      <button
                        key={lang}
                        type="button"
                        onClick={() => toggleLanguage(lang)}
                        className={cn(
                          "px-3 sm:px-4 py-2 rounded-full text-xs sm:text-sm font-medium transition-all touch-manipulation min-h-[44px] sm:min-h-0",
                          selectedLanguages.includes(lang)
                            ? "bg-purple-600 text-white shadow-md"
                            : "bg-gray-100 text-gray-700 hover:bg-gray-200",
                        )}
                      >
                        {lang}
                        {selectedLanguages.includes(lang) && <X className="inline-block ml-1 h-3 w-3" />}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Capacity */}
                <div className="space-y-2">
                  <Label htmlFor="capacity" className="text-sm font-medium">
                    Capacity
                  </Label>
                  <Input
                    id="capacity"
                    type="number"
                    placeholder="e.g., 25 participants"
                    value={capacity}
                    onChange={(e) => setCapacity(e.target.value)}
                    className="rounded-lg h-11 sm:h-10"
                  />
                </div>

                {/* Registration Deadline */}
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Registration Deadline</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left font-normal h-11 sm:h-10",
                          !registrationDeadline && "text-muted-foreground",
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4 flex-shrink-0" />
                        <span className="truncate">
                          {registrationDeadline ? format(registrationDeadline, "PPP") : "Pick a date"}
                        </span>
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={registrationDeadline}
                        onSelect={setRegistrationDeadline}
                        disabled={(date) => date < new Date()}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>

                {/* Target Audience */}
                <div className="space-y-2">
                  <Label htmlFor="targetAudience" className="text-sm font-medium">
                    Who Can Attend
                  </Label>
                  <Input
                    id="targetAudience"
                    placeholder='e.g., "Actors, Clowns, Theatre Trainers"'
                    value={targetAudience}
                    onChange={(e) => setTargetAudience(e.target.value)}
                    className="rounded-lg h-11 sm:h-10"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Registration & Contact Card */}
            <Card className="border-2 shadow-md rounded-xl sm:rounded-2xl overflow-hidden transition-all hover:shadow-lg">
              <CardHeader className="bg-gradient-to-r from-green-50 to-emerald-50 pb-3 sm:pb-4 px-4 sm:px-6">
                <div className="flex items-center gap-2">
                  <LinkIcon className="h-4 w-4 sm:h-5 sm:w-5 text-green-600 flex-shrink-0" />
                  <CardTitle className="text-base sm:text-lg lg:text-xl">Registration & Contact</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="pt-4 sm:pt-6 px-4 sm:px-6 space-y-4 sm:space-y-5">
                {/* Registration Link */}
                <div className="space-y-2">
                  <Label htmlFor="registrationLink" className="text-sm font-medium">
                    Registration Link (Optional)
                  </Label>
                  <Input
                    id="registrationLink"
                    type="url"
                    placeholder="e.g., Google Form, BookMyShow link"
                    value={registrationLink}
                    onChange={(e) => setRegistrationLink(e.target.value)}
                    className="rounded-lg h-11 sm:h-10"
                  />
                  <p className="text-xs text-gray-500">Only if using an external platform</p>
                </div>

                {/* Contact Method */}
                <div className="space-y-3">
                  <Label className="text-sm font-medium">Contact Information</Label>
                  <Select value={contactMethod} onValueChange={(value: any) => setContactMethod(value)}>
                    <SelectTrigger className="h-11 sm:h-10">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="whatsapp">WhatsApp</SelectItem>
                      <SelectItem value="email">Email</SelectItem>
                      <SelectItem value="both">Both</SelectItem>
                    </SelectContent>
                  </Select>

                  {(contactMethod === "whatsapp" || contactMethod === "both") && (
                    <div className="space-y-2">
                      <Label htmlFor="whatsapp" className="text-sm flex items-center gap-1">
                        <Phone className="h-3 w-3" />
                        WhatsApp Number
                      </Label>
                      <Input
                        id="whatsapp"
                        type="tel"
                        placeholder="+91 98765 43210"
                        value={whatsappNumber}
                        onChange={(e) => setWhatsappNumber(e.target.value)}
                        className="rounded-lg h-11 sm:h-10"
                      />
                    </div>
                  )}

                  {(contactMethod === "email" || contactMethod === "both") && (
                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-sm flex items-center gap-1">
                        <Mail className="h-3 w-3" />
                        Email Address
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="workshop@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="rounded-lg h-11 sm:h-10"
                      />
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Consent Card */}
            <Card className="border-2 border-purple-200 shadow-md rounded-xl sm:rounded-2xl overflow-hidden">
              <CardContent className="pt-4 sm:pt-6 px-4 sm:px-6 space-y-4">
                <div className="flex items-start space-x-3 touch-manipulation">
                  <Checkbox
                    id="consent1"
                    checked={consent1}
                    onCheckedChange={(checked) => setConsent1(checked as boolean)}
                    className="mt-1 h-5 w-5 flex-shrink-0"
                  />
                  <Label htmlFor="consent1" className="text-sm leading-relaxed cursor-pointer">
                    I confirm that all details provided are genuine and that I have the right to conduct this workshop.
                  </Label>
                </div>

                <div className="flex items-start space-x-3 touch-manipulation">
                  <Checkbox
                    id="consent2"
                    checked={consent2}
                    onCheckedChange={(checked) => setConsent2(checked as boolean)}
                    className="mt-1 h-5 w-5 flex-shrink-0"
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

            {/* Publish Button */}
            <Button
              onClick={handlePublish}
              disabled={!isFormValid()}
              className="w-full rounded-lg h-12 text-base font-medium bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 touch-manipulation"
            >
              <CheckCircle2 className="mr-2 h-5 w-5 flex-shrink-0" />
              {isPublishing ? "Publishing..." : "Publish Workshop"}
            </Button>
          </div>

          {/* Right Column - Live Preview */}
          <div
            className={cn(
              "lg:sticky lg:top-24 h-fit",
              !showPreview && "hidden lg:block",
              showPreview && "block lg:block",
            )}
          >
            <Card className="border-2 shadow-xl rounded-xl sm:rounded-2xl overflow-hidden">
              <CardHeader className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 sm:px-6 py-4 sm:py-6">
                <div className="flex items-center gap-2 mb-2">
                  <Eye className="h-4 w-4 sm:h-5 sm:w-5 flex-shrink-0" />
                  <CardTitle className="text-base sm:text-lg">Live Preview</CardTitle>
                </div>
                <p className="text-xs sm:text-sm text-purple-100">How participants will see your workshop</p>
              </CardHeader>
              <CardContent className="p-0">
                {/* Cover Image */}
                {coverImagePreview && (
                  <div className="relative w-full h-48 sm:h-64">
                    <Image
                      src={coverImagePreview || "/placeholder.svg"}
                      alt="Workshop cover"
                      fill
                      className="object-cover"
                    />
                  </div>
                )}

                <div className="p-4 sm:p-6 space-y-3 sm:space-y-4">
                  {/* Badges */}
                  <div className="flex items-center gap-2 flex-wrap">
                    <Badge variant="secondary" className="text-xs">
                      Workshop
                    </Badge>
                    {feeType === "free" && (
                      <Badge variant="default" className="bg-green-500 text-xs">
                        Free
                      </Badge>
                    )}
                    {locationMode === "online" && (
                      <Badge variant="outline" className="text-xs">
                        🌐 Online
                      </Badge>
                    )}
                    {skillLevel !== "open-to-all" && (
                      <Badge variant="outline" className="text-xs capitalize">
                        {skillLevel}
                      </Badge>
                    )}
                  </div>

                  {/* Title */}
                  <h3 className="font-playfair text-xl sm:text-2xl font-bold text-gray-900 break-words">
                    {title || "Workshop Title"}
                  </h3>

                  {/* Sessions */}
                  {sessions.length > 0 && sessions[0].date && (
                    <div className="space-y-2">
                      <h4 className="text-sm font-semibold text-gray-900 flex items-center gap-2">
                        <Clock className="h-4 w-4" />
                        Schedule
                      </h4>
                      {sessions.map((session, index) => (
                        <div key={session.id} className="flex items-center gap-2 text-sm text-gray-600">
                          <CalendarIcon className="h-3 w-3 flex-shrink-0" />
                          <span>
                            {session.date && format(session.date, "MMM d, yyyy")}
                            {session.startTime && ` at ${session.startTime}`}
                            {session.duration && ` (${session.duration})`}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Location */}
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    {locationMode === "city" ? (
                      <>
                        <MapPin className="h-4 w-4 flex-shrink-0" />
                        <span>
                          {(city || "City") + (selectedState ? `, ${selectedState}` : "")}
                          {venue && `, ${venue}`}
                        </span>
                      </>
                    ) : (
                      <>
                        <Globe className="h-4 w-4 flex-shrink-0" />
                        <span>{platform || "Online Platform"}</span>
                      </>
                    )}
                  </div>

                  {/* Description */}
                  {description && (
                    <div className="prose prose-sm max-w-none">
                      <p className="text-gray-700 whitespace-pre-wrap break-words text-sm">{description}</p>
                    </div>
                  )}

                  {/* Additional Info */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-4 border-t">
                    {feeType === "paid" && feeAmount && (
                      <div className="flex items-center gap-2 text-sm">
                        <DollarSign className="h-4 w-4 text-gray-500 flex-shrink-0" />
                        <div>
                          <div className="text-gray-500 text-xs">Fee</div>
                          <div className="font-medium">
                            ₹{feeAmount}
                            {feeNote && <span className="text-xs text-gray-500"> ({feeNote})</span>}
                          </div>
                        </div>
                      </div>
                    )}

                    {capacity && (
                      <div className="flex items-center gap-2 text-sm">
                        <Users className="h-4 w-4 text-gray-500 flex-shrink-0" />
                        <div>
                          <div className="text-gray-500 text-xs">Capacity</div>
                          <div className="font-medium">{capacity} participants</div>
                        </div>
                      </div>
                    )}

                    {registrationDeadline && (
                      <div className="flex items-center gap-2 text-sm">
                        <AlertCircle className="h-4 w-4 text-gray-500 flex-shrink-0" />
                        <div>
                          <div className="text-gray-500 text-xs">Register by</div>
                          <div className="font-medium">{format(registrationDeadline, "MMM d, yyyy")}</div>
                        </div>
                      </div>
                    )}

                    {targetAudience && (
                      <div className="flex items-center gap-2 text-sm col-span-full">
                        <Users className="h-4 w-4 text-gray-500 flex-shrink-0" />
                        <div>
                          <div className="text-gray-500 text-xs">Who can attend</div>
                          <div className="font-medium">{targetAudience}</div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Languages */}
                  {selectedLanguages.length > 0 && (
                    <div className="space-y-2 pt-4 border-t">
                      <h4 className="text-sm font-semibold text-gray-900">Language of Instruction</h4>
                      <div className="flex flex-wrap gap-2">
                        {selectedLanguages.map((lang) => (
                          <Badge key={lang} variant="outline" className="text-xs">
                            {lang}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Register Button */}
                  <Button className="w-full rounded-lg h-12 mt-6 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 touch-manipulation">
                    Register for Workshop
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Mobile: Back to Form Button */}
            <div className="lg:hidden mt-4">
              <Button
                variant="outline"
                className="w-full rounded-lg h-12 bg-transparent"
                onClick={() => setShowPreview(false)}
              >
                Back to Form
              </Button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="mt-12 sm:mt-16 text-center text-xs sm:text-sm text-gray-600 space-y-2 px-4">
          <p>© Abhinayपथ • Empowering theatre education</p>
          <div className="flex items-center justify-center gap-3 sm:gap-4 flex-wrap">
            <Link href="/privacy" className="hover:text-purple-600 transition-colors touch-manipulation">
              Privacy Policy
            </Link>
            <span className="hidden sm:inline">•</span>
            <Link href="/terms" className="hover:text-purple-600 transition-colors touch-manipulation">
              Terms
            </Link>
            <span className="hidden sm:inline">•</span>
            <Link href="/report" className="hover:text-purple-600 transition-colors touch-manipulation">
              Report Misuse
            </Link>
          </div>
        </footer>
      </div>
    </div>
  )
}
