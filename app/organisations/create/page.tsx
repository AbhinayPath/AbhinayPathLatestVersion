"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Separator } from "@/components/ui/separator"
import {
  Building2,
  MapPin,
  Globe,
  Instagram,
  Youtube,
  Mail,
  Phone,
  Plus,
  X,
  Upload,
  ChevronDown,
  ChevronUp,
  Users,
  Briefcase,
  ImageIcon,
  Video,
  Check,
  AlertCircle,
} from "lucide-react"
import { toast } from "sonner"
import { cn } from "@/lib/utils"

const organisationTypes = [
  "Theatre Group",
  "Casting Agency",
  "Training School/Institute",
  "Corporate Institution",
  "College/University",
  "Production House",
  "Other",
]

const coreAreas = [
  "Acting Training",
  "Theatre Productions",
  "Casting/Auditions",
  "Corporate Workshops",
  "Theatre in Education (TIE)",
  "Music/Dance/Multidisciplinary",
  "Stage Design/Tech/Backstage",
  "Directing & Playwriting",
  "Voice & Movement",
  "Children's Theatre",
]

const countries = ["India", "USA", "UK", "Canada", "Australia", "Other"]

interface KeyPerson {
  id: string
  name: string
  designation: string
}

interface Program {
  id: string
  name: string
  brief: string
  duration: string
}

interface VideoLink {
  id: string
  url: string
  title: string
}

export default function CreateOrganisationProfile() {
  // Essence
  const [orgName, setOrgName] = useState("")
  const [selectedTypes, setSelectedTypes] = useState<string[]>([])
  const [foundedYear, setFoundedYear] = useState("")
  const [language, setLanguage] = useState("")
  const [city, setCity] = useState("")
  const [state, setState] = useState("")
  const [country, setCountry] = useState("India")
  const [website, setWebsite] = useState("")
  const [instagram, setInstagram] = useState("")
  const [youtube, setYoutube] = useState("")
  const [about, setAbout] = useState("")

  // Work
  const [selectedAreas, setSelectedAreas] = useState<string[]>([])
  const [keyPeople, setKeyPeople] = useState<KeyPerson[]>([{ id: "1", name: "", designation: "" }])
  const [activeSince, setActiveSince] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [address, setAddress] = useState("")

  // Showcase
  const [coverImage, setCoverImage] = useState<string | null>(null)
  const [gallery, setGallery] = useState<string[]>([])
  const [videoLinks, setVideoLinks] = useState<VideoLink[]>([])

  // Deep Section (Conditional)
  const [programs, setPrograms] = useState<Program[]>([])
  const [productions, setProductions] = useState("")
  const [partners, setPartners] = useState("")

  // Footer
  const [confirmedGenuine, setConfirmedGenuine] = useState(false)
  const [agreedTerms, setAgreedTerms] = useState(false)

  // UI State
  const [workExpanded, setWorkExpanded] = useState(true)
  const [showcaseExpanded, setShowcaseExpanded] = useState(true)
  const [deepSectionExpanded, setDeepSectionExpanded] = useState(false)

  // Validation
  const [showErrors, setShowErrors] = useState(false)

  const shouldShowDeepSection = selectedTypes.some((type) =>
    ["Training School/Institute", "College/University", "Corporate Institution"].includes(type),
  )

  // Toggle functions
  const toggleType = (type: string) => {
    setSelectedTypes((prev) => (prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]))
  }

  const toggleArea = (area: string) => {
    if (selectedAreas.includes(area)) {
      setSelectedAreas((prev) => prev.filter((a) => a !== area))
    } else {
      setSelectedAreas((prev) => [...prev, area])
    }
  }

  // Key People handlers
  const addKeyPerson = () => {
    if (keyPeople.length < 5) {
      setKeyPeople([...keyPeople, { id: Date.now().toString(), name: "", designation: "" }])
    } else {
      toast.error("Maximum 5 key people allowed")
    }
  }

  const removeKeyPerson = (id: string) => {
    if (keyPeople.length > 1) {
      setKeyPeople(keyPeople.filter((p) => p.id !== id))
    }
  }

  const updateKeyPerson = (id: string, field: "name" | "designation", value: string) => {
    setKeyPeople(keyPeople.map((p) => (p.id === id ? { ...p, [field]: value } : p)))
  }

  // Program handlers
  const addProgram = () => {
    if (programs.length < 10) {
      setPrograms([...programs, { id: Date.now().toString(), name: "", brief: "", duration: "" }])
    } else {
      toast.error("Maximum 10 programs allowed")
    }
  }

  const removeProgram = (id: string) => {
    setPrograms(programs.filter((p) => p.id !== id))
  }

  const updateProgram = (id: string, field: keyof Program, value: string) => {
    setPrograms(programs.map((p) => (p.id === id ? { ...p, [field]: value } : p)))
  }

  // Video link handlers
  const addVideoLink = () => {
    if (videoLinks.length < 3) {
      setVideoLinks([...videoLinks, { id: Date.now().toString(), url: "", title: "" }])
    } else {
      toast.error("Maximum 3 video links allowed")
    }
  }

  const removeVideoLink = (id: string) => {
    setVideoLinks(videoLinks.filter((v) => v.id !== id))
  }

  const updateVideoLink = (id: string, field: "url" | "title", value: string) => {
    setVideoLinks(videoLinks.map((v) => (v.id === id ? { ...v, [field]: value } : v)))
  }

  // Image handlers
  const handleCoverImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setCoverImage(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleGalleryUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    if (gallery.length + files.length > 8) {
      toast.error("Maximum 8 gallery images allowed")
      return
    }

    files.forEach((file) => {
      const reader = new FileReader()
      reader.onloadend = () => {
        setGallery((prev) => [...prev, reader.result as string])
      }
      reader.readAsDataURL(file)
    })
  }

  const removeGalleryImage = (index: number) => {
    setGallery(gallery.filter((_, i) => i !== index))
  }

  // Validation
  const isFormValid = () => {
    return (
      orgName.trim() !== "" &&
      selectedTypes.length > 0 &&
      city.trim() !== "" &&
      email.trim() !== "" &&
      confirmedGenuine &&
      agreedTerms
    )
  }

  // Calculate profile completeness
  const calculateCompleteness = () => {
    let filled = 0
    const total = 20

    if (orgName) filled++
    if (selectedTypes.length > 0) filled++
    if (foundedYear) filled++
    if (language) filled++
    if (city) filled++
    if (state) filled++
    if (country) filled++
    if (website || instagram || youtube) filled++
    if (about) filled++
    if (selectedAreas.length > 0) filled++
    if (keyPeople.some((p) => p.name)) filled++
    if (activeSince) filled++
    if (email) filled++
    if (phone) filled++
    if (address) filled++
    if (coverImage) filled++
    if (gallery.length > 0) filled++
    if (videoLinks.some((v) => v.url)) filled++
    if (productions) filled++
    if (partners) filled++

    return Math.round((filled / total) * 100)
  }

  const handleSaveAndPublish = () => {
    setShowErrors(true)
    if (!isFormValid()) {
      toast.error("Please fill all required fields and agree to terms")
      return
    }

    // Here you would submit to your API
    console.log("Publishing profile...")
    toast.success("Published. You can edit anytime.")
  }

  const handleSaveDraft = () => {
    // Here you would save as draft
    console.log("Saving draft...")
    toast.success("Draft saved")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-purple-50">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-orange-600 to-purple-600 bg-clip-text text-transparent mb-2">
            Create Organisation Profile
          </h1>
          <p className="text-muted-foreground">Build your presence on Abhinayपथ</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Form */}
          <div className="lg:col-span-2 space-y-6">
            {/* A) ESSENCE */}
            <Card className="border-2 border-orange-200">
              <CardHeader className="bg-gradient-to-r from-orange-50 to-orange-100">
                <div className="flex items-center gap-2">
                  <Building2 className="h-5 w-5 text-orange-600" />
                  <CardTitle>Essence</CardTitle>
                </div>
                <CardDescription>Who you are</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6 pt-6">
                {/* Organisation Name */}
                <div className="space-y-2">
                  <Label htmlFor="orgName" className="flex items-center gap-1">
                    Organisation / Group Name <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="orgName"
                    value={orgName}
                    onChange={(e) => setOrgName(e.target.value)}
                    placeholder="Enter organisation name"
                    className={cn(showErrors && !orgName && "border-red-500")}
                  />
                  {showErrors && !orgName && (
                    <p className="text-sm text-red-500 flex items-center gap-1">
                      <AlertCircle className="h-3 w-3" />
                      Organisation name is required
                    </p>
                  )}
                </div>

                {/* Type */}
                <div className="space-y-2">
                  <Label className="flex items-center gap-1">
                    Type <span className="text-red-500">*</span>
                    <span className="text-xs text-muted-foreground ml-1">(Select at least one)</span>
                  </Label>
                  <div className="flex flex-wrap gap-2">
                    {organisationTypes.map((type) => (
                      <Badge
                        key={type}
                        variant={selectedTypes.includes(type) ? "default" : "outline"}
                        className={cn(
                          "cursor-pointer transition-all",
                          selectedTypes.includes(type) ? "bg-orange-600 hover:bg-orange-700" : "hover:bg-orange-50",
                        )}
                        onClick={() => toggleType(type)}
                      >
                        {type}
                        {selectedTypes.includes(type) && <Check className="ml-1 h-3 w-3" />}
                      </Badge>
                    ))}
                  </div>
                  {showErrors && selectedTypes.length === 0 && (
                    <p className="text-sm text-red-500 flex items-center gap-1">
                      <AlertCircle className="h-3 w-3" />
                      Please select at least one type
                    </p>
                  )}
                </div>

                {/* Founded Year & Language */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="foundedYear">Founded Year</Label>
                    <Input
                      id="foundedYear"
                      type="number"
                      value={foundedYear}
                      onChange={(e) => setFoundedYear(e.target.value)}
                      placeholder="e.g., 2010"
                      min="1900"
                      max={new Date().getFullYear()}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="language">Primary Language</Label>
                    <Input
                      id="language"
                      value={language}
                      onChange={(e) => setLanguage(e.target.value)}
                      placeholder="e.g., Hindi, English"
                    />
                  </div>
                </div>

                {/* Location */}
                <div className="space-y-2">
                  <Label className="flex items-center gap-1">
                    <MapPin className="h-4 w-4" />
                    Location
                  </Label>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Input
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        placeholder="City *"
                        className={cn(showErrors && !city && "border-red-500")}
                      />
                      {showErrors && !city && <p className="text-xs text-red-500">Required</p>}
                    </div>
                    <Input value={state} onChange={(e) => setState(e.target.value)} placeholder="State / Province" />
                    <select
                      value={country}
                      onChange={(e) => setCountry(e.target.value)}
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"
                    >
                      {countries.map((c) => (
                        <option key={c} value={c}>
                          {c}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Social Links */}
                <div className="space-y-2">
                  <Label>Online Presence</Label>
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <Globe className="h-4 w-4 text-muted-foreground" />
                      <Input
                        value={website}
                        onChange={(e) => setWebsite(e.target.value)}
                        placeholder="Website URL"
                        type="url"
                      />
                    </div>
                    <div className="flex items-center gap-2">
                      <Instagram className="h-4 w-4 text-muted-foreground" />
                      <Input
                        value={instagram}
                        onChange={(e) => setInstagram(e.target.value)}
                        placeholder="Instagram URL"
                        type="url"
                      />
                    </div>
                    <div className="flex items-center gap-2">
                      <Youtube className="h-4 w-4 text-muted-foreground" />
                      <Input
                        value={youtube}
                        onChange={(e) => setYoutube(e.target.value)}
                        placeholder="YouTube URL"
                        type="url"
                      />
                    </div>
                  </div>
                </div>

                {/* About */}
                <div className="space-y-2">
                  <Label htmlFor="about">About the Organisation</Label>
                  <p className="text-xs text-muted-foreground">
                    What drives your work in theatre or training? (2–4 sentences)
                  </p>
                  <Textarea
                    id="about"
                    value={about}
                    onChange={(e) => setAbout(e.target.value)}
                    placeholder="Tell us about your organisation's vision and mission..."
                    rows={4}
                    maxLength={500}
                  />
                  <p className="text-xs text-right text-muted-foreground">{about.length}/500</p>
                </div>
              </CardContent>
            </Card>

            {/* B) WORK */}
            <Card className="border-2 border-blue-200">
              <CardHeader
                className="bg-gradient-to-r from-blue-50 to-blue-100 cursor-pointer"
                onClick={() => setWorkExpanded(!workExpanded)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Briefcase className="h-5 w-5 text-blue-600" />
                    <CardTitle>Work</CardTitle>
                  </div>
                  {workExpanded ? <ChevronUp /> : <ChevronDown />}
                </div>
                <CardDescription>What you do</CardDescription>
              </CardHeader>
              {workExpanded && (
                <CardContent className="space-y-6 pt-6">
                  {/* Core Areas */}
                  <div className="space-y-2">
                    <Label>Core Areas of Work</Label>
                    <div className="flex flex-wrap gap-2">
                      {coreAreas.map((area) => (
                        <Badge
                          key={area}
                          variant={selectedAreas.includes(area) ? "default" : "outline"}
                          className={cn(
                            "cursor-pointer transition-all",
                            selectedAreas.includes(area) ? "bg-blue-600 hover:bg-blue-700" : "hover:bg-blue-50",
                          )}
                          onClick={() => toggleArea(area)}
                        >
                          {area}
                          {selectedAreas.includes(area) && <Check className="ml-1 h-3 w-3" />}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Key People */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <Label className="flex items-center gap-1">
                        <Users className="h-4 w-4" />
                        Key People / Founders
                      </Label>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={addKeyPerson}
                        disabled={keyPeople.length >= 5}
                      >
                        <Plus className="h-4 w-4 mr-1" />
                        Add
                      </Button>
                    </div>
                    {keyPeople.map((person, index) => (
                      <div key={person.id} className="flex gap-2">
                        <Input
                          value={person.name}
                          onChange={(e) => updateKeyPerson(person.id, "name", e.target.value)}
                          placeholder="Name"
                          className="flex-1"
                        />
                        <Input
                          value={person.designation}
                          onChange={(e) => updateKeyPerson(person.id, "designation", e.target.value)}
                          placeholder="Designation"
                          className="flex-1"
                        />
                        {keyPeople.length > 1 && (
                          <Button type="button" variant="ghost" size="icon" onClick={() => removeKeyPerson(person.id)}>
                            <X className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                    ))}
                  </div>

                  {/* Active Since */}
                  <div className="space-y-2">
                    <Label htmlFor="activeSince">Active Since / Notable Collaborations</Label>
                    <Textarea
                      id="activeSince"
                      value={activeSince}
                      onChange={(e) => setActiveSince(e.target.value)}
                      placeholder="Brief history or notable partnerships..."
                      rows={2}
                    />
                  </div>

                  <Separator />

                  {/* Contact Info */}
                  <div className="space-y-4">
                    <h3 className="font-semibold">Contact Information</h3>
                    <div className="space-y-3">
                      <div className="space-y-2">
                        <Label htmlFor="email" className="flex items-center gap-1">
                          <Mail className="h-4 w-4" />
                          Email <span className="text-red-500">*</span>
                        </Label>
                        <Input
                          id="email"
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="contact@organisation.com"
                          className={cn(showErrors && !email && "border-red-500")}
                        />
                        {showErrors && !email && (
                          <p className="text-sm text-red-500 flex items-center gap-1">
                            <AlertCircle className="h-3 w-3" />
                            Email is required
                          </p>
                        )}
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone" className="flex items-center gap-1">
                          <Phone className="h-4 w-4" />
                          Phone
                        </Label>
                        <Input
                          id="phone"
                          type="tel"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          placeholder="+91 XXXXXXXXXX"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="address">Office Address</Label>
                        <Textarea
                          id="address"
                          value={address}
                          onChange={(e) => setAddress(e.target.value)}
                          placeholder="Complete address..."
                          rows={3}
                        />
                      </div>
                    </div>
                  </div>
                </CardContent>
              )}
            </Card>

            {/* C) SHOWCASE */}
            <Card className="border-2 border-purple-200">
              <CardHeader
                className="bg-gradient-to-r from-purple-50 to-purple-100 cursor-pointer"
                onClick={() => setShowcaseExpanded(!showcaseExpanded)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <ImageIcon className="h-5 w-5 text-purple-600" />
                    <CardTitle>Showcase</CardTitle>
                  </div>
                  {showcaseExpanded ? <ChevronUp /> : <ChevronDown />}
                </div>
                <CardDescription>Proof of work</CardDescription>
              </CardHeader>
              {showcaseExpanded && (
                <CardContent className="space-y-6 pt-6">
                  {/* Cover Image */}
                  <div className="space-y-2">
                    <Label>Cover Image / Poster</Label>
                    <div className="flex items-center gap-4">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleCoverImageUpload}
                        className="hidden"
                        id="cover-upload"
                      />
                      <label
                        htmlFor="cover-upload"
                        className="flex-1 h-32 border-2 border-dashed rounded-lg flex items-center justify-center cursor-pointer hover:bg-muted/50 transition-colors"
                      >
                        {coverImage ? (
                          <img
                            src={coverImage || "/placeholder.svg"}
                            alt="Cover"
                            className="h-full w-full object-cover rounded-lg"
                          />
                        ) : (
                          <div className="text-center">
                            <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                            <p className="text-sm text-muted-foreground">Upload cover image</p>
                          </div>
                        )}
                      </label>
                      {coverImage && (
                        <Button type="button" variant="ghost" size="icon" onClick={() => setCoverImage(null)}>
                          <X className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  </div>

                  {/* Gallery */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label>Gallery (Max 8 images)</Label>
                      <span className="text-xs text-muted-foreground">{gallery.length}/8</span>
                    </div>
                    <div className="grid grid-cols-4 gap-4">
                      {gallery.map((img, index) => (
                        <div key={index} className="relative aspect-square">
                          <img
                            src={img || "/placeholder.svg"}
                            alt={`Gallery ${index + 1}`}
                            className="w-full h-full object-cover rounded-lg"
                          />
                          <Button
                            type="button"
                            variant="destructive"
                            size="icon"
                            className="absolute top-1 right-1 h-6 w-6"
                            onClick={() => removeGalleryImage(index)}
                          >
                            <X className="h-3 w-3" />
                          </Button>
                        </div>
                      ))}
                      {gallery.length < 8 && (
                        <label className="aspect-square border-2 border-dashed rounded-lg flex items-center justify-center cursor-pointer hover:bg-muted/50 transition-colors">
                          <input
                            type="file"
                            accept="image/*"
                            multiple
                            onChange={handleGalleryUpload}
                            className="hidden"
                          />
                          <Plus className="h-6 w-6 text-muted-foreground" />
                        </label>
                      )}
                    </div>
                  </div>

                  {/* Video Links */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <Label className="flex items-center gap-1">
                        <Video className="h-4 w-4" />
                        Video Links (Max 3)
                      </Label>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={addVideoLink}
                        disabled={videoLinks.length >= 3}
                      >
                        <Plus className="h-4 w-4 mr-1" />
                        Add
                      </Button>
                    </div>
                    {videoLinks.map((video) => (
                      <div key={video.id} className="flex gap-2">
                        <Input
                          value={video.title}
                          onChange={(e) => updateVideoLink(video.id, "title", e.target.value)}
                          placeholder="Video title"
                          className="flex-1"
                        />
                        <Input
                          value={video.url}
                          onChange={(e) => updateVideoLink(video.id, "url", e.target.value)}
                          placeholder="YouTube/Vimeo URL"
                          type="url"
                          className="flex-[2]"
                        />
                        <Button type="button" variant="ghost" size="icon" onClick={() => removeVideoLink(video.id)}>
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                    {videoLinks.length === 0 && (
                      <p className="text-sm text-muted-foreground">No video links added yet</p>
                    )}
                  </div>

                  {/* Featured Opportunities */}
                  <div className="p-4 bg-muted/30 rounded-lg">
                    <h4 className="font-semibold mb-2">Featured Opportunities</h4>
                    <p className="text-sm text-muted-foreground">
                      When you post castings, workshops, or jobs, they will automatically appear here on your profile.
                    </p>
                  </div>
                </CardContent>
              )}
            </Card>

            {/* D) DEEP SECTION (Conditional) */}
            {shouldShowDeepSection && (
              <Card className="border-2 border-green-200">
                <CardHeader
                  className="bg-gradient-to-r from-green-50 to-green-100 cursor-pointer"
                  onClick={() => setDeepSectionExpanded(!deepSectionExpanded)}
                >
                  <div className="flex items-center justify-between">
                    <CardTitle>Programs & Partners</CardTitle>
                    {deepSectionExpanded ? <ChevronUp /> : <ChevronDown />}
                  </div>
                  <CardDescription>Optional: Additional details for educational institutions</CardDescription>
                </CardHeader>
                {deepSectionExpanded && (
                  <CardContent className="space-y-6 pt-6">
                    {/* Programs */}
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <Label>Courses / Programs Offered</Label>
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={addProgram}
                          disabled={programs.length >= 10}
                        >
                          <Plus className="h-4 w-4 mr-1" />
                          Add Program
                        </Button>
                      </div>
                      {programs.map((program) => (
                        <Card key={program.id} className="p-4">
                          <div className="space-y-3">
                            <div className="flex gap-2">
                              <Input
                                value={program.name}
                                onChange={(e) => updateProgram(program.id, "name", e.target.value)}
                                placeholder="Program name"
                                className="flex-1"
                              />
                              <Input
                                value={program.duration}
                                onChange={(e) => updateProgram(program.id, "duration", e.target.value)}
                                placeholder="Duration"
                                className="w-32"
                              />
                              <Button
                                type="button"
                                variant="ghost"
                                size="icon"
                                onClick={() => removeProgram(program.id)}
                              >
                                <X className="h-4 w-4" />
                              </Button>
                            </div>
                            <Textarea
                              value={program.brief}
                              onChange={(e) => updateProgram(program.id, "brief", e.target.value)}
                              placeholder="Brief description"
                              rows={2}
                            />
                          </div>
                        </Card>
                      ))}
                      {programs.length === 0 && <p className="text-sm text-muted-foreground">No programs added yet</p>}
                    </div>

                    {/* Productions */}
                    <div className="space-y-2">
                      <Label>Past Productions / Festivals Hosted</Label>
                      <Textarea
                        value={productions}
                        onChange={(e) => setProductions(e.target.value)}
                        placeholder="List notable productions or festivals..."
                        rows={3}
                      />
                    </div>

                    {/* Partners */}
                    <div className="space-y-2">
                      <Label>Corporate Clients / Partners</Label>
                      <Textarea
                        value={partners}
                        onChange={(e) => setPartners(e.target.value)}
                        placeholder="List key partners or clients..."
                        rows={3}
                      />
                    </div>
                  </CardContent>
                )}
              </Card>
            )}

            {/* Footer / Trust */}
            <Card className="border-2 border-orange-200 bg-orange-50/50">
              <CardContent className="pt-6 space-y-4">
                <div className="flex items-start gap-3">
                  <Checkbox
                    id="confirm-genuine"
                    checked={confirmedGenuine}
                    onCheckedChange={(checked) => setConfirmedGenuine(checked as boolean)}
                    className={cn(showErrors && !confirmedGenuine && "border-red-500")}
                  />
                  <label htmlFor="confirm-genuine" className="text-sm leading-tight cursor-pointer">
                    I confirm details are genuine and I have the right to represent this organisation.
                  </label>
                </div>

                <div className="flex items-start gap-3">
                  <Checkbox
                    id="agree-terms"
                    checked={agreedTerms}
                    onCheckedChange={(checked) => setAgreedTerms(checked as boolean)}
                    className={cn(showErrors && !agreedTerms && "border-red-500")}
                  />
                  <label htmlFor="agree-terms" className="text-sm leading-tight cursor-pointer">
                    I agree to Abhinayपथ's{" "}
                    <a href="/terms" className="text-orange-600 hover:underline">
                      Terms
                    </a>
                    {" & "}
                    <a href="/privacy" className="text-orange-600 hover:underline">
                      Privacy Policy
                    </a>
                    .
                  </label>
                </div>

                {showErrors && (!confirmedGenuine || !agreedTerms) && (
                  <p className="text-sm text-red-500 flex items-center gap-1">
                    <AlertCircle className="h-3 w-3" />
                    Please accept both terms to continue
                  </p>
                )}

                <Separator />

                <div className="flex flex-wrap gap-4 text-xs text-muted-foreground">
                  <a href="/privacy" className="hover:text-foreground">
                    Privacy Policy
                  </a>
                  <span>•</span>
                  <a href="/terms" className="hover:text-foreground">
                    Terms of Service
                  </a>
                  <span>•</span>
                  <a href="/report" className="hover:text-foreground">
                    Report Misuse
                  </a>
                </div>

                <div className="flex gap-3 pt-4">
                  <Button type="button" variant="outline" className="flex-1 bg-transparent" onClick={handleSaveDraft}>
                    Save Draft
                  </Button>
                  <Button
                    type="button"
                    className="flex-1 bg-gradient-to-r from-orange-600 to-purple-600 hover:from-orange-700 hover:to-purple-700"
                    onClick={handleSaveAndPublish}
                    disabled={!isFormValid()}
                  >
                    Save & Publish Profile
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Live Preview */}
          <div className="lg:col-span-1">
            <div className="sticky top-8">
              <Card className="border-2 border-purple-300 shadow-lg">
                <CardHeader className="pb-4">
                  <CardTitle className="text-lg">Live Preview</CardTitle>
                  <CardDescription>Profile completeness: {calculateCompleteness()}%</CardDescription>
                  <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                    <div
                      className="bg-gradient-to-r from-orange-600 to-purple-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${calculateCompleteness()}%` }}
                    />
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Cover */}
                  {coverImage && (
                    <div className="w-full h-32 rounded-lg overflow-hidden">
                      <img src={coverImage || "/placeholder.svg"} alt="Cover" className="w-full h-full object-cover" />
                    </div>
                  )}

                  {/* Header */}
                  <div className="space-y-2">
                    <h3 className="font-bold text-xl">{orgName || "Organisation Name"}</h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedTypes.slice(0, 2).map((type) => (
                        <Badge key={type} variant="secondary" className="text-xs">
                          {type}
                        </Badge>
                      ))}
                      {selectedTypes.length > 2 && (
                        <Badge variant="secondary" className="text-xs">
                          +{selectedTypes.length - 2}
                        </Badge>
                      )}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <MapPin className="h-3 w-3" />
                      <span>
                        {city || "City"}
                        {state && `, ${state}`}, {country}
                      </span>
                    </div>
                  </div>

                  {/* About */}
                  {about && <p className="text-sm line-clamp-3">{about}</p>}

                  {/* Core Areas */}
                  {selectedAreas.length > 0 && (
                    <div className="space-y-2">
                      <Label className="text-xs text-muted-foreground">Core Areas</Label>
                      <div className="flex flex-wrap gap-1">
                        {selectedAreas.slice(0, 4).map((area) => (
                          <Badge key={area} variant="outline" className="text-xs">
                            {area}
                          </Badge>
                        ))}
                        {selectedAreas.length > 4 && (
                          <Badge variant="outline" className="text-xs">
                            +{selectedAreas.length - 4}
                          </Badge>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Key People */}
                  {keyPeople.some((p) => p.name) && (
                    <div className="space-y-2">
                      <Label className="text-xs text-muted-foreground">Key People</Label>
                      <div className="space-y-1">
                        {keyPeople
                          .filter((p) => p.name)
                          .slice(0, 2)
                          .map((person) => (
                            <div key={person.id} className="text-sm">
                              <span className="font-medium">{person.name}</span>
                              {person.designation && (
                                <span className="text-muted-foreground"> • {person.designation}</span>
                              )}
                            </div>
                          ))}
                      </div>
                    </div>
                  )}

                  {/* Gallery Preview */}
                  {gallery.length > 0 && (
                    <div className="grid grid-cols-3 gap-2">
                      {gallery.slice(0, 3).map((img, index) => (
                        <img
                          key={index}
                          src={img || "/placeholder.svg"}
                          alt={`Gallery ${index + 1}`}
                          className="aspect-square object-cover rounded"
                        />
                      ))}
                    </div>
                  )}

                  {/* Social Links */}
                  {(website || instagram || youtube) && (
                    <div className="flex gap-2">
                      {website && (
                        <a href={website} target="_blank" rel="noopener noreferrer">
                          <Button variant="outline" size="icon" className="h-8 w-8 bg-transparent">
                            <Globe className="h-4 w-4" />
                          </Button>
                        </a>
                      )}
                      {instagram && (
                        <a href={instagram} target="_blank" rel="noopener noreferrer">
                          <Button variant="outline" size="icon" className="h-8 w-8 bg-transparent">
                            <Instagram className="h-4 w-4" />
                          </Button>
                        </a>
                      )}
                      {youtube && (
                        <a href={youtube} target="_blank" rel="noopener noreferrer">
                          <Button variant="outline" size="icon" className="h-8 w-8 bg-transparent">
                            <Youtube className="h-4 w-4" />
                          </Button>
                        </a>
                      )}
                    </div>
                  )}

                  <Separator />

                  {/* CTA */}
                  <Button className="w-full bg-gradient-to-r from-orange-600 to-purple-600">
                    Message Organisation
                  </Button>

                  {/* Featured Opportunities */}
                  <div className="text-xs text-muted-foreground text-center p-2 bg-muted/30 rounded">
                    Featured opportunities will appear here
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
