"use client"

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
  AlertCircle,
  Sparkles,
  Loader2,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { toast } from "sonner"
import Link from "next/link"
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
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

export default function PostOpportunityPage() {
  const router = useRouter()
  const supabase = createClientComponentClient()
  
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

  // Pincode + State/City dropdowns
  const [pincode, setPincode] = useState("")
  const [selectedState, setSelectedState] = useState("")
  const [stateOptions, setStateOptions] = useState<string[]>([])
  const [cityOptions, setCityOptions] = useState<string[]>([])
  const [isCityDisabled, setIsCityDisabled] = useState(true)
  const [stateSearch, setStateSearch] = useState("")
  const [citySearch, setCitySearch] = useState("")
  const [isPincodeLoading, setIsPincodeLoading] = useState(false)

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
  const [showPreview, setShowPreview] = useState(false)
  const [isPublishing, setIsPublishing] = useState(false)
  const [isDraft, setIsDraft] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  // Calculate progress
  const [progress, setProgress] = useState(0)

  // Handle initial loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1000)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    const requiredFields = [
      title,
      type,
      deadline,
      locationMode === "city" ? (selectedState && city) : true,
      description,
      applicationMethod,
      consent1,
      consent2,
    ]

    const completed = requiredFields.filter(Boolean).length
    const total = requiredFields.length
    setProgress((completed / total) * 100)
  }, [title, type, deadline, selectedState, city, description, applicationMethod, consent1, consent2, locationMode])

  // Load states initially
  useEffect(() => {
    setStateOptions(Array.from(INDIAN_STATES))
  }, [])

  // Load cities when state selected
  useEffect(() => {
    if (!selectedState) {
      setCityOptions([])
      setIsCityDisabled(true)
      return
    }

    (async () => {
      const { data, error } = await supabase
        .from("pincodes")
        .select("city")
        .eq("state", selectedState)

      if (error) {
        console.error("Error loading cities:", error)
        return
      }

      const unique = Array.from(new Set((data || []).map((r: any) => (r.city || '').trim()).filter(Boolean)))
      setCityOptions(unique)
      setIsCityDisabled(false)
    })()
  }, [selectedState])

  // Auto-fill state/city on valid 6-digit pincode
  useEffect(() => {
    const six = pincode.replace(/\D/g, "")
    if (six.length !== 6) return

    const lookup = async () => {
      setIsPincodeLoading(true)
      try {
        // First try matching pincode as text
        const { data: res1, error } = await supabase
          .from("pincodes")
          .select("state, city")
          .eq("pincode", six)
          .limit(1)
          .maybeSingle()

        let row = res1
        if (error) {
          console.error("Pincode lookup error (text):", error)
        }

        if (!row) {
          const parsed = parseInt(six, 10)
          const { data: res2 } = await supabase
            .from("pincodes")
            .select("state, city")
            .eq("pincode_int", parsed)
            .limit(1)
            .maybeSingle()
          row = res2 || null
        }

        if (row) {
          const stateValue = (row.state || '').trim()
          const cityValue = (row.city || '').trim()
          if (stateValue) setSelectedState(stateValue)
          if (cityValue) setCity(cityValue)
          setIsCityDisabled(false)
          setStateOptions((prev) => Array.from(new Set([...prev, stateValue])))
          setCityOptions((prev) => Array.from(new Set([...prev, cityValue])))
        } else {
          toast.error("No results found for this pincode")
        }
      } catch (e) {
        console.error("Error looking up pincode:", e)
      } finally {
        setIsPincodeLoading(false)
      }
    }

    lookup()
  }, [pincode])

  const toggleLanguage = (lang: string) => {
    if (selectedLanguages.includes(lang)) {
      setSelectedLanguages(selectedLanguages.filter((l) => l !== lang))
    } else if (selectedLanguages.length < 4) {
      setSelectedLanguages([...selectedLanguages, lang])
    }
  }

  const isFormValid = () => {
    if (!title || !type || !deadline || !description || !consent1 || !consent2) return false
    if (locationMode === "city" && (!selectedState || !city)) return false
    if ((payType === "stipend" || payType === "paid") && !payAmount) return false
    if (ageMin && ageMax && Number(ageMin) > Number(ageMax)) return false
    return true
  }

  const handlePublish = async () => {
    if (!isFormValid()) {
      toast.error("Please fill in all required fields")
      return
    }

    setIsPublishing(true)

    try {
      // Check if user is authenticated
      const { data: { user }, error: authError } = await supabase.auth.getUser()
      
      if (authError || !user) {
        toast.error("Please log in to post an opportunity")
        router.push('/auth/login')
        return
      }

      // Prepare opportunity data
      const opportunityData = {
        title,
        type,
        description,
        deadline: deadline?.toISOString(),
        location_mode: locationMode,
        state: locationMode === 'city' ? selectedState : null,
        city: locationMode === 'city' ? city : null,
        venue: locationMode === 'city' ? venue : null,
        platform: locationMode === 'online' ? platform : null,
        application_method: applicationMethod,
        contact_info: contactInfo,
        roles_needed: rolesNeeded,
        gender_preference: genderPreference,
        age_min: ageMin ? parseInt(ageMin) : null,
        age_max: ageMax ? parseInt(ageMax) : null,
        languages: selectedLanguages,
        experience_required: experience,
        pay_type: payType,
        pay_amount: payAmount ? parseFloat(payAmount) : null,
        visibility,
        request_photos: requestPhotos,
        photo_helper_text: photoHelperText,
        request_videos: requestVideos,
        video_helper_text: videoHelperText,
        status: 'published'
      }

      // Make API call to create opportunity
      const response = await fetch('/api/opportunities', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(opportunityData),
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.error || 'Failed to publish opportunity')
      }

      toast.success("Opportunity published successfully!")
      
      // Redirect to the opportunity page or dashboard
      router.push(`/opportunities/${result.opportunity.id}`)
      
    } catch (error) {
      console.error('Error publishing opportunity:', error)
      toast.error(error instanceof Error ? error.message : 'Failed to publish opportunity')
    } finally {
      setIsPublishing(false)
    }
  }

  const handleSaveDraft = async () => {
    setIsDraft(true)

    try {
      // Check if user is authenticated
      const { data: { user }, error: authError } = await supabase.auth.getUser()
      
      if (authError || !user) {
        toast.error("Please log in to save a draft")
        router.push('/auth/login')
        return
      }

      // Prepare opportunity data
      const opportunityData = {
        title: title || 'Untitled Opportunity',
        type: type || 'job',
        description: description || '',
        deadline: deadline?.toISOString(),
        location_mode: locationMode,
        state: locationMode === 'city' ? selectedState : null,
        city: locationMode === 'city' ? city : null,
        venue: locationMode === 'city' ? venue : null,
        platform: locationMode === 'online' ? platform : null,
        application_method: applicationMethod,
        contact_info: contactInfo,
        roles_needed: rolesNeeded,
        gender_preference: genderPreference,
        age_min: ageMin ? parseInt(ageMin) : null,
        age_max: ageMax ? parseInt(ageMax) : null,
        languages: selectedLanguages,
        experience_required: experience,
        pay_type: payType,
        pay_amount: payAmount ? parseFloat(payAmount) : null,
        visibility,
        request_photos: requestPhotos,
        photo_helper_text: photoHelperText,
        request_videos: requestVideos,
        video_helper_text: videoHelperText,
        status: 'draft'
      }

      // Make API call to create draft
      const response = await fetch('/api/opportunities', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(opportunityData),
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.error || 'Failed to save draft')
      }

      toast.success("Draft saved successfully!")
      
    } catch (error) {
      console.error('Error saving draft:', error)
      toast.error(error instanceof Error ? error.message : 'Failed to save draft')
    } finally {
      setIsDraft(false)
    }
  }

  // Loading screen
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-purple-200 border-t-purple-600 rounded-full mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Loading Post Opportunity</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12">
        {/* Header - Mobile Optimized */}
        <div className="mb-6 sm:mb-8 text-center">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-3 mb-3 sm:mb-4">
            <Badge variant="secondary" className="text-xs font-medium px-2 sm:px-3 py-1">
              AP
            </Badge>
            <h1 className="font-playfair text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900">Post Opportunity</h1>
            <Badge variant="outline" className="text-xs px-2 sm:px-3 py-1">
              All times IST
            </Badge>
          </div>
          <p className="text-gray-600 text-xs sm:text-sm">Keep it crisp. Artists love clarity.</p>
        </div>

        {/* Progress Bar - Mobile Optimized */}
        <div className="mb-6 sm:mb-8 max-w-2xl mx-auto">
          <div className="flex items-center justify-between text-xs text-gray-600 mb-2">
            <span>Form completion</span>
            <span className="font-medium">{Math.round(progress)}%</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        {/* Mobile Preview Toggle Button */}
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
            {/* Core Section - Mobile Optimized */}
            <Card className="border-2 shadow-md rounded-xl sm:rounded-2xl overflow-hidden transition-all hover:shadow-lg">
              <CardHeader className="bg-gradient-to-r from-purple-50 to-pink-50 pb-3 sm:pb-4 px-4 sm:px-6">
                <div className="flex items-center gap-2">
                  <Briefcase className="h-4 w-4 sm:h-5 sm:w-5 text-purple-600 flex-shrink-0" />
                  <CardTitle className="text-base sm:text-lg lg:text-xl">Core Details</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="pt-4 sm:pt-6 px-4 sm:px-6 space-y-4 sm:space-y-5">
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
                    className="rounded-lg border-gray-300 focus:border-purple-500 focus:ring-purple-500 h-11 sm:h-10 text-base sm:text-sm"
                  />
                </div>

                {/* Type */}
                <div className="space-y-2">
                  <Label htmlFor="type" className="text-sm font-medium">
                    Type <span className="text-red-500">*</span>
                  </Label>
                  <Select value={type} onValueChange={setType}>
                    <SelectTrigger className="rounded-lg h-11 sm:h-10">
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
                          "w-full justify-start text-left font-normal rounded-lg h-11 sm:h-10",
                          !deadline && "text-muted-foreground",
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4 flex-shrink-0" />
                        <span className="truncate">{deadline ? format(deadline, "PPP") : "Pick a date"}</span>
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

                {/* Location Mode - Mobile Optimized */}
                <div className="space-y-3">
                  <Label className="text-sm font-medium">
                    Location Mode <span className="text-red-500">*</span>
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

                {/* City/Venue or Platform - Mobile Optimized */}
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
                      Platform
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

                {/* Description - Mobile Optimized */}
                <div className="space-y-2">
                  <Label htmlFor="description" className="text-sm font-medium">
                    Description <span className="text-red-500">*</span>
                  </Label>
                  <Textarea
                    id="description"
                    placeholder="What to prepare, key dates, audition flow..."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="rounded-lg min-h-[100px] sm:min-h-[120px] resize-none text-base sm:text-sm"
                  />
                </div>

                {/* Application Method - Mobile Optimized */}
                <div className="space-y-3">
                  <Label className="text-sm font-medium">
                    Application Method <span className="text-red-500">*</span>
                  </Label>
                  <RadioGroup value={applicationMethod} onValueChange={setApplicationMethod} className="space-y-2">
                    <div className="flex items-center space-x-2 p-3 rounded-lg border hover:bg-gray-50 transition-colors touch-manipulation">
                      <RadioGroupItem value="platform" id="platform-method" />
                      <Label htmlFor="platform-method" className="flex-1 cursor-pointer text-sm">
                        Quick Apply on Abhinayपथ
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2 p-3 rounded-lg border hover:bg-gray-50 transition-colors touch-manipulation">
                      <RadioGroupItem value="whatsapp" id="whatsapp-method" />
                      <Label htmlFor="whatsapp-method" className="flex-1 cursor-pointer text-sm">
                        WhatsApp
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2 p-3 rounded-lg border hover:bg-gray-50 transition-colors touch-manipulation">
                      <RadioGroupItem value="email" id="email-method" />
                      <Label htmlFor="email-method" className="flex-1 cursor-pointer text-sm">
                        Email
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2 p-3 rounded-lg border hover:bg-gray-50 transition-colors touch-manipulation">
                      <RadioGroupItem value="external" id="external-method" />
                      <Label htmlFor="external-method" className="flex-1 cursor-pointer text-sm">
                        External Form
                      </Label>
                    </div>
                  </RadioGroup>
                </div>

                {/* Optional Contact - Mobile Optimized */}
                {applicationMethod !== "platform" && (
                  <Collapsible open={contactOpen} onOpenChange={setContactOpen}>
                    <CollapsibleTrigger asChild>
                      <Button variant="ghost" className="w-full justify-between p-3 h-auto touch-manipulation">
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
                        className="rounded-lg h-11 sm:h-10"
                      />
                    </CollapsibleContent>
                  </Collapsible>
                )}
              </CardContent>
            </Card>

            {/* Advanced Section - Mobile Optimized */}
            <Collapsible open={advancedOpen} onOpenChange={setAdvancedOpen}>
              <Card className="border-2 shadow-md rounded-xl sm:rounded-2xl overflow-hidden transition-all hover:shadow-lg">
                <CollapsibleTrigger asChild>
                  <CardHeader className="bg-gradient-to-r from-blue-50 to-cyan-50 pb-3 sm:pb-4 cursor-pointer hover:bg-blue-100 transition-colors px-4 sm:px-6 touch-manipulation">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Users className="h-4 w-4 sm:h-5 sm:w-5 text-blue-600 flex-shrink-0" />
                        <CardTitle className="text-base sm:text-lg lg:text-xl">Advanced Details</CardTitle>
                      </div>
                      <ChevronDown className={cn("h-5 w-5 transition-transform", advancedOpen && "rotate-180")} />
                    </div>
                  </CardHeader>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <CardContent className="pt-4 sm:pt-6 px-4 sm:px-6 space-y-4 sm:space-y-5">
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
                        className="rounded-lg h-11 sm:h-10"
                      />
                    </div>

                    {/* Gender Preference */}
                    <div className="space-y-2">
                      <Label className="text-sm font-medium">Gender Preference</Label>
                      <Select value={genderPreference} onValueChange={setGenderPreference}>
                        <SelectTrigger className="rounded-lg h-11 sm:h-10">
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

                    {/* Age Range - Mobile Optimized */}
                    <div className="space-y-2">
                      <Label className="text-sm font-medium">Age Range</Label>
                      <div className="grid grid-cols-2 gap-2 sm:gap-3">
                        <Input
                          type="number"
                          placeholder="Min"
                          value={ageMin}
                          onChange={(e) => setAgeMin(e.target.value)}
                          className="rounded-lg h-11 sm:h-10"
                        />
                        <Input
                          type="number"
                          placeholder="Max"
                          value={ageMax}
                          onChange={(e) => setAgeMax(e.target.value)}
                          className="rounded-lg h-11 sm:h-10"
                        />
                      </div>
                      {ageMin && ageMax && Number(ageMin) > Number(ageMax) && (
                        <p className="text-xs text-red-500 flex items-center gap-1">
                          <AlertCircle className="h-3 w-3 flex-shrink-0" />
                          Min age must be less than max age
                        </p>
                      )}
                    </div>

                    {/* Languages - Mobile Optimized with Better Touch Targets */}
                    <div className="space-y-2">
                      <Label className="text-sm font-medium">Languages (max 4)</Label>
                      <div className="flex flex-wrap gap-2">
                        {LANGUAGES.map((lang) => (
                          <button
                            key={lang}
                            type="button"
                            onClick={() => toggleLanguage(lang)}
                            className={cn(
                              "px-3 sm:px-4 py-2 sm:py-2 rounded-full text-xs sm:text-sm font-medium transition-all touch-manipulation min-h-[44px] sm:min-h-0",
                              selectedLanguages.includes(lang)
                                ? "bg-purple-600 text-white shadow-md"
                                : "bg-gray-100 text-gray-700 hover:bg-gray-200",
                              !selectedLanguages.includes(lang) &&
                                selectedLanguages.length >= 4 &&
                                "opacity-40 cursor-not-allowed",
                            )}
                            disabled={!selectedLanguages.includes(lang) && selectedLanguages.length >= 4}
                          >
                            {lang}
                            {selectedLanguages.includes(lang) && (
                              <X className="inline-block ml-1 h-3 w-3 sm:h-3 sm:w-3" />
                            )}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Experience */}
                    <div className="space-y-2">
                      <Label className="text-sm font-medium">Experience</Label>
                      <Select value={experience} onValueChange={setExperience}>
                        <SelectTrigger className="rounded-lg h-11 sm:h-10">
                          <SelectValue placeholder="Select experience level" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="beginner">Beginner</SelectItem>
                          <SelectItem value="intermediate">Intermediate</SelectItem>
                          <SelectItem value="professional">Professional</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Fee/Pay - Mobile Optimized */}
                    <div className="space-y-3">
                      <Label className="text-sm font-medium">Fee / Pay</Label>
                      <Select value={payType} onValueChange={setPayType}>
                        <SelectTrigger className="rounded-lg h-11 sm:h-10">
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
                          className="rounded-lg h-11 sm:h-10"
                        />
                      )}
                    </div>

                    {/* Visibility - Mobile Optimized */}
                    <div className="space-y-3">
                      <Label className="text-sm font-medium">Visibility</Label>
                      <div className="grid grid-cols-2 gap-2 sm:gap-3">
                        <Button
                          type="button"
                          variant={visibility === "public" ? "default" : "outline"}
                          className="rounded-lg h-11 sm:h-10 text-sm touch-manipulation"
                          onClick={() => setVisibility("public")}
                        >
                          <Eye className="mr-1 sm:mr-2 h-4 w-4 flex-shrink-0" />
                          Public
                        </Button>
                        <Button
                          type="button"
                          variant={visibility === "unlisted" ? "default" : "outline"}
                          className="rounded-lg h-11 sm:h-10 text-sm touch-manipulation"
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

            {/* Media Request - Mobile Optimized */}
            <Card className="border-2 shadow-md rounded-xl sm:rounded-2xl overflow-hidden transition-all hover:shadow-lg">
              <CardHeader className="bg-gradient-to-r from-green-50 to-emerald-50 pb-3 sm:pb-4 px-4 sm:px-6">
                <div className="flex items-center gap-2">
                  <Camera className="h-4 w-4 sm:h-5 sm:w-5 text-green-600 flex-shrink-0" />
                  <CardTitle className="text-base sm:text-lg lg:text-xl">Media Request (Optional)</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="pt-4 sm:pt-6 px-4 sm:px-6 space-y-4 sm:space-y-5">
                {/* Request Photos */}
                <div className="space-y-3">
                  <div className="flex items-center space-x-2 touch-manipulation">
                    <Checkbox
                      id="request-photos"
                      checked={requestPhotos}
                      onCheckedChange={(checked) => setRequestPhotos(checked as boolean)}
                      className="h-5 w-5"
                    />
                    <Label htmlFor="request-photos" className="text-sm font-medium cursor-pointer">
                      Request Photos
                    </Label>
                  </div>

                  {requestPhotos && (
                    <div className="space-y-2 ml-0 sm:ml-6">
                      <Input
                        placeholder="Helper text (optional)"
                        value={photoHelperText}
                        onChange={(e) => setPhotoHelperText(e.target.value)}
                        className="rounded-lg h-11 sm:h-10"
                      />
                      <p className="text-xs text-gray-500 flex items-start gap-1">
                        <Sparkles className="h-3 w-3 mt-0.5 flex-shrink-0 text-purple-500" />
                        JPG/PNG/WebP up to 5MB each. Ask for 1 headshot + 1 full body.
                      </p>
                    </div>
                  )}
                </div>

                {/* Request Videos */}
                <div className="space-y-3">
                  <div className="flex items-center space-x-2 touch-manipulation">
                    <Checkbox
                      id="request-videos"
                      checked={requestVideos}
                      onCheckedChange={(checked) => setRequestVideos(checked as boolean)}
                      className="h-5 w-5"
                    />
                    <Label htmlFor="request-videos" className="text-sm font-medium cursor-pointer">
                      Request Video Links
                    </Label>
                  </div>

                  {requestVideos && (
                    <div className="space-y-2 ml-0 sm:ml-6">
                      <Input
                        placeholder="Helper text (optional)"
                        value={videoHelperText}
                        onChange={(e) => setVideoHelperText(e.target.value)}
                        className="rounded-lg h-11 sm:h-10"
                      />
                      <p className="text-xs text-gray-500 flex items-start gap-1">
                        <Sparkles className="h-3 w-3 mt-0.5 flex-shrink-0 text-purple-500" />
                        1-min monologue link (YouTube/Vimeo/Drive; shareable).
                      </p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Consent - Mobile Optimized */}
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
                    I confirm that all details provided are genuine and that I have the right to conduct this
                    casting/workshop.
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

            {/* CTAs - Mobile Optimized */}
            <div className="flex flex-col sm:flex-row gap-3">
              <Button
                onClick={handlePublish}
                disabled={!isFormValid() || isPublishing || isDraft}
                className="flex-1 rounded-lg h-12 sm:h-12 text-base font-medium bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 touch-manipulation disabled:opacity-50"
              >
                {isPublishing ? (
                  <>
                    <div className="mr-2 h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
                    Publishing...
                  </>
                ) : (
                  <>
                    <CheckCircle2 className="mr-2 h-5 w-5 flex-shrink-0" />
                    Publish Opportunity
                  </>
                )}
              </Button>
              
              {/* <Button
                onClick={handleSaveDraft}
                disabled={isDraft || isPublishing}
                variant="outline"
                className="flex-1 sm:flex-none rounded-lg h-12 sm:h-12 text-base font-medium border-2 touch-manipulation disabled:opacity-50"
              >
                {isDraft ? (
                  <>
                    <div className="mr-2 h-5 w-5 animate-spin rounded-full border-2 border-current border-t-transparent" />
                    Saving...
                  </>
                ) : (
                  'Save Draft'
                )}
              </Button> */}

              {/* <Sheet open={applyFlowOpen} onOpenChange={setApplyFlowOpen}>
                <SheetTrigger asChild>
                  <Button
                    variant="outline"
                    className="rounded-lg h-12 sm:h-12 px-6 bg-transparent border-2 touch-manipulation sm:w-auto"
                  >
                    <Eye className="mr-2 h-4 w-4 flex-shrink-0" />
                    <span className="hidden sm:inline">Preview Apply Flow</span>
                    <span className="sm:hidden">Preview</span>
                  </Button>
                </SheetTrigger>
                <SheetContent className="w-full sm:max-w-md overflow-y-auto">
                  <SheetHeader>
                    <SheetTitle className="text-lg sm:text-xl">Artist Application View</SheetTitle>
                    <SheetDescription className="text-sm">
                      This is what artists will see when they apply
                    </SheetDescription>
                  </SheetHeader>

                  <div className="mt-6 space-y-6">
                    <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                      <p className="text-sm text-blue-900">Your Abhinayपथ profile will be shared with the organiser.</p>
                    </div>

                    {requestPhotos && (
                      <div className="space-y-3">
                        <Label className="text-sm font-medium">Upload Photos</Label>
                        <div className="grid grid-cols-2 gap-3">
                          <div className="aspect-square border-2 border-dashed rounded-lg flex items-center justify-center hover:bg-gray-50 cursor-pointer touch-manipulation">
                            <Camera className="h-8 w-8 text-gray-400" />
                          </div>
                          <div className="aspect-square border-2 border-dashed rounded-lg flex items-center justify-center hover:bg-gray-50 cursor-pointer touch-manipulation">
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
                          <Input placeholder="YouTube/Vimeo/Drive link" className="rounded-lg h-11" />
                          <Input placeholder="YouTube/Vimeo/Drive link" className="rounded-lg h-11" />
                        </div>
                        {videoHelperText && <p className="text-xs text-gray-600">{videoHelperText}</p>}
                      </div>
                    )}

                    <Button className="w-full rounded-lg h-12 touch-manipulation" disabled>
                      Submit Application
                    </Button>

                    <p className="text-xs text-center text-gray-500">
                      Submit will be enabled once all required media is provided
                    </p>
                  </div>
                </SheetContent>
              </Sheet> */}
            </div>
          </div>

          {/* Right Column - Live Preview - Mobile Toggle */}
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
                <p className="text-xs sm:text-sm text-purple-100">How it will appear to artists</p>
              </CardHeader>
              <CardContent className="pt-4 sm:pt-6 px-4 sm:px-6 space-y-3 sm:space-y-4">
                {/* Type and Location */}
                <div className="flex items-center gap-2 text-sm text-gray-600 flex-wrap">
                  {type && (
                    <Badge variant="secondary" className="capitalize text-xs">
                      {type.replace("-", " ")}
                    </Badge>
                  )}
                  {(city || platform) && (
                    <>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        {locationMode === "city" ? (
                          <>
                            <MapPin className="h-3 w-3 flex-shrink-0" />
                            <span className="truncate">{city || "City"}</span>
                          </>
                        ) : (
                          <>
                            <Globe className="h-3 w-3 flex-shrink-0" />
                            Online
                          </>
                        )}
                      </span>
                    </>
                  )}
                </div>

                {/* Title */}
                <h3 className="font-playfair text-xl sm:text-2xl font-bold text-gray-900 break-words">
                  {title || "Opportunity Title"}
                </h3>

                {/* Deadline and Location Detail */}
                <div className="flex items-start sm:items-center gap-2 text-sm text-gray-600 flex-wrap">
                  {deadline && (
                    <>
                      <CalendarIcon className="h-4 w-4 flex-shrink-0" />
                      <span className="break-words">Deadline: {format(deadline, "MMM d, yyyy")}</span>
                    </>
                  )}
                  {locationMode === "city" && venue && (
                    <>
                      <span className="hidden sm:inline">•</span>
                      <span className="break-words w-full sm:w-auto">{venue}</span>
                    </>
                  )}
                  {locationMode === "online" && platform && (
                    <>
                      <span className="hidden sm:inline">•</span>
                      <span className="break-words w-full sm:w-auto">{platform}</span>
                    </>
                  )}
                </div>

                {/* Description */}
                <div className="prose prose-sm max-w-none">
                  <p className="text-gray-700 line-clamp-4 text-sm sm:text-base break-words">
                    {description || "Description will appear here..."}
                  </p>
                </div>

                {/* Requirements */}
                {(genderPreference !== "any" || ageMin || ageMax || selectedLanguages.length > 0 || experience) && (
                  <div className="space-y-2 pt-4 border-t">
                    <h4 className="text-sm font-semibold text-gray-900">Requirements</h4>
                    <div className="flex flex-wrap gap-2">
                      {genderPreference !== "any" && (
                        <Badge variant="outline" className="capitalize text-xs">
                          {genderPreference.replace("-", " ")}
                        </Badge>
                      )}
                      {(ageMin || ageMax) && (
                        <Badge variant="outline" className="text-xs">
                          Age: {ageMin || "?"}–{ageMax || "?"}
                        </Badge>
                      )}
                      {selectedLanguages.map((lang) => (
                        <Badge key={lang} variant="outline" className="text-xs">
                          {lang}
                        </Badge>
                      ))}
                      {experience && (
                        <Badge variant="outline" className="capitalize text-xs">
                          {experience}
                        </Badge>
                      )}
                    </div>
                  </div>
                )}

                {/* Pay */}
                <div className="flex items-center gap-2 text-sm pt-4 border-t">
                  <DollarSign className="h-4 w-4 text-gray-600 flex-shrink-0" />
                  <span className="text-gray-900 font-medium break-words">
                    {payType === "not-specified" && "Not specified"}
                    {payType === "free" && "Free"}
                    {payType === "stipend" && (payAmount ? `Stipend: ₹${payAmount}` : "Stipend")}
                    {payType === "paid" && (payAmount ? `Paid: ₹${payAmount}` : "Paid")}
                  </span>
                </div>

                {/* CTA */}
                <Button className="w-full rounded-lg h-12 mt-6 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-sm sm:text-base touch-manipulation">
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

        {/* Footer - Mobile Optimized */}
        <footer className="mt-12 sm:mt-16 text-center text-xs sm:text-sm text-gray-600 space-y-2 px-4">
          <p>© Abhinayपथ • Minimal form, maximal clarity.</p>
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
