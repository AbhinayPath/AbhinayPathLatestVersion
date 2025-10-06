"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import {
  ChevronDown,
  ChevronUp,
  Upload,
  X,
  Plus,
  AlertCircle,
  User,
  Sparkles,
  Award,
  LinkIcon,
  Camera,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { toast } from "sonner"

const SKILL_OPTIONS = [
  "Acting",
  "Direction",
  "Voice Acting",
  "Backstage",
  "Teaching",
  "Stage Combat",
  "Dance",
  "Singing",
  "Script Writing",
  "Improvisation",
]

const LANGUAGE_OPTIONS = [
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
  "Urdu",
]

interface WorkHighlight {
  production: string
  role: string
  year: string
}

export default function CreateActorProfilePage() {
  const router = useRouter()

  // Essence Section (always visible)
  const [name, setName] = useState("")
  const [profileImage, setProfileImage] = useState<string | null>(null)
  const [city, setCity] = useState("")
  const [tagline, setTagline] = useState("")
  const [bio, setBio] = useState("")

  // Craft Section (collapsible)
  const [craftOpen, setCraftOpen] = useState(false)
  const [experienceLevel, setExperienceLevel] = useState<string>("")
  const [selectedSkills, setSelectedSkills] = useState<string[]>([])
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>([])
  const [workHighlights, setWorkHighlights] = useState<WorkHighlight[]>([{ production: "", role: "", year: "" }])

  // Showcase Section (collapsible)
  const [showcaseOpen, setShowcaseOpen] = useState(false)
  const [galleryImages, setGalleryImages] = useState<(string | null)[]>([null, null, null])
  const [showreelUrl, setShowreelUrl] = useState("")
  const [socialLink, setSocialLink] = useState("")

  // Consent
  const [confirmTruth, setConfirmTruth] = useState(false)
  const [agreeTerms, setAgreeTerms] = useState(false)

  // Validation
  const [touched, setTouched] = useState<Record<string, boolean>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  const markTouched = (field: string) => {
    setTouched((prev) => ({ ...prev, [field]: true }))
  }

  // Validation helpers
  const isEssenceComplete = name && profileImage && city && tagline && bio && bio.length <= 300
  const hasGalleryImages = galleryImages.some((img) => img !== null)
  const isShowcaseComplete = hasGalleryImages || showreelUrl
  const isFormValid = isEssenceComplete && experienceLevel && confirmTruth && agreeTerms

  const bioWordCount = bio.trim().split(/\s+/).filter(Boolean).length
  const bioCharCount = bio.length

  // Handle profile image upload
  const handleProfileImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setProfileImage(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  // Handle gallery image upload
  const handleGalleryImageUpload = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        const newImages = [...galleryImages]
        newImages[index] = reader.result as string
        setGalleryImages(newImages)
      }
      reader.readAsDataURL(file)
    }
  }

  // Handle removing gallery image
  const removeGalleryImage = (index: number) => {
    const newImages = [...galleryImages]
    newImages[index] = null
    setGalleryImages(newImages)
  }

  // Handle skills toggle
  const toggleSkill = (skill: string) => {
    if (selectedSkills.includes(skill)) {
      setSelectedSkills(selectedSkills.filter((s) => s !== skill))
    } else {
      if (selectedSkills.length < 5) {
        setSelectedSkills([...selectedSkills, skill])
      } else {
        toast.error("Maximum 5 skills allowed")
      }
    }
  }

  // Handle languages toggle
  const toggleLanguage = (language: string) => {
    if (selectedLanguages.includes(language)) {
      setSelectedLanguages(selectedLanguages.filter((l) => l !== language))
    } else {
      if (selectedLanguages.length < 6) {
        setSelectedLanguages([...selectedLanguages, language])
      } else {
        toast.error("Maximum 6 languages allowed")
      }
    }
  }

  // Handle work highlights
  const addWorkHighlight = () => {
    if (workHighlights.length < 3) {
      setWorkHighlights([...workHighlights, { production: "", role: "", year: "" }])
    }
  }

  const removeWorkHighlight = (index: number) => {
    setWorkHighlights(workHighlights.filter((_, i) => i !== index))
  }

  const updateWorkHighlight = (index: number, field: keyof WorkHighlight, value: string) => {
    const newHighlights = [...workHighlights]
    newHighlights[index][field] = value
    setWorkHighlights(newHighlights)
  }

  // Handle form submission
  const handleSubmit = async () => {
    // Mark all required fields as touched
    setTouched({
      name: true,
      profileImage: true,
      city: true,
      tagline: true,
      bio: true,
      experienceLevel: true,
    })

    if (!isFormValid) {
      toast.error("Please complete all required fields")
      return
    }

    setIsSubmitting(true)

    try {
      // TODO: API call to save profile
      await new Promise((resolve) => setTimeout(resolve, 2000)) // Simulate API call

      toast.success("Profile created successfully!")
      router.push("/actors")
    } catch (error) {
      toast.error("Failed to create profile. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            Create Your Actor Profile
          </h1>
          <p className="text-gray-600">Join Abhinayपथ's community of talented artists</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Form */}
          <div className="lg:col-span-2 space-y-6">
            {/* ESSENCE SECTION */}
            <Card className="border-2 border-purple-200 shadow-lg">
              <CardHeader className="bg-gradient-to-r from-purple-100 to-pink-100">
                <div className="flex items-center gap-2">
                  <User className="w-5 h-5 text-purple-600" />
                  <CardTitle className="text-2xl">Essence</CardTitle>
                </div>
                <CardDescription>Your core identity as an artist</CardDescription>
              </CardHeader>
              <CardContent className="pt-6 space-y-6">
                {/* Profile Picture */}
                <div>
                  <Label htmlFor="profile-image" className="text-base font-semibold">
                    Profile Picture <span className="text-red-500">*</span>
                  </Label>
                  <p className="text-sm text-gray-500 mb-3">A clear headshot that represents you</p>

                  <div className="flex items-start gap-4">
                    <div className="relative">
                      {profileImage ? (
                        <div className="relative w-32 h-32 rounded-lg overflow-hidden border-2 border-purple-200">
                          <Image src={profileImage || "/placeholder.svg"} alt="Profile" fill className="object-cover" />
                          <button
                            onClick={() => setProfileImage(null)}
                            className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      ) : (
                        <label className="w-32 h-32 border-2 border-dashed border-purple-300 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:border-purple-500 hover:bg-purple-50 transition">
                          <Camera className="w-8 h-8 text-purple-400 mb-2" />
                          <span className="text-xs text-purple-600 font-medium">Upload</span>
                          <input
                            id="profile-image"
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={handleProfileImageUpload}
                            onBlur={() => markTouched("profileImage")}
                          />
                        </label>
                      )}
                    </div>
                    {touched.profileImage && !profileImage && (
                      <div className="flex items-center gap-2 text-red-600 text-sm">
                        <AlertCircle className="w-4 h-4" />
                        <span>Profile picture is required</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Name */}
                <div>
                  <Label htmlFor="name" className="text-base font-semibold">
                    Full Name <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    onBlur={() => markTouched("name")}
                    placeholder="Enter your full name"
                    className="mt-2"
                  />
                  {touched.name && !name && (
                    <p className="text-red-600 text-sm mt-1 flex items-center gap-1">
                      <AlertCircle className="w-4 h-4" />
                      Name is required
                    </p>
                  )}
                </div>

                {/* City */}
                <div>
                  <Label htmlFor="city" className="text-base font-semibold">
                    City <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="city"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    onBlur={() => markTouched("city")}
                    placeholder="e.g., Mumbai, Delhi, Bangalore"
                    className="mt-2"
                  />
                  {touched.city && !city && (
                    <p className="text-red-600 text-sm mt-1 flex items-center gap-1">
                      <AlertCircle className="w-4 h-4" />
                      City is required
                    </p>
                  )}
                </div>

                {/* Tagline / Role Type */}
                <div>
                  <Label htmlFor="tagline" className="text-base font-semibold">
                    Tagline / Role Type <span className="text-red-500">*</span>
                  </Label>
                  <p className="text-sm text-gray-500 mb-2">e.g., "Actor | Director | Trainer"</p>
                  <Input
                    id="tagline"
                    value={tagline}
                    onChange={(e) => setTagline(e.target.value)}
                    onBlur={() => markTouched("tagline")}
                    placeholder="Actor | Director"
                    className="mt-2"
                  />
                  {touched.tagline && !tagline && (
                    <p className="text-red-600 text-sm mt-1 flex items-center gap-1">
                      <AlertCircle className="w-4 h-4" />
                      Tagline is required
                    </p>
                  )}
                </div>

                {/* About (Bio) */}
                <div>
                  <Label htmlFor="bio" className="text-base font-semibold">
                    About <span className="text-red-500">*</span>
                  </Label>
                  <p className="text-sm text-gray-500 mb-2">
                    Speak from the heart. 2–3 sentences. ({bioWordCount} words, {bioCharCount}/300 characters)
                  </p>
                  <Textarea
                    id="bio"
                    value={bio}
                    onChange={(e) => {
                      if (e.target.value.length <= 300) {
                        setBio(e.target.value)
                      }
                    }}
                    onBlur={() => markTouched("bio")}
                    placeholder="Tell the community about your journey, passion, and what drives you as an artist..."
                    className="mt-2 min-h-[100px]"
                    maxLength={300}
                  />
                  {touched.bio && !bio && (
                    <p className="text-red-600 text-sm mt-1 flex items-center gap-1">
                      <AlertCircle className="w-4 h-4" />
                      Bio is required
                    </p>
                  )}
                  {bio && bioWordCount > 50 && (
                    <p className="text-amber-600 text-sm mt-1">
                      Consider keeping it shorter (2-3 sentences recommended)
                    </p>
                  )}
                </div>

                {/* Contact CTA */}
                <div className="pt-4 border-t">
                  <Button
                    className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                    disabled
                  >
                    Message via Abhinayपथ
                  </Button>
                  <p className="text-xs text-gray-500 text-center mt-2">
                    This button will be enabled once your profile is published
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* CRAFT SECTION */}
            <Card className="border-2 border-blue-200 shadow-lg">
              <CardHeader
                className="bg-gradient-to-r from-blue-100 to-cyan-100 cursor-pointer hover:from-blue-200 hover:to-cyan-200 transition"
                onClick={() => setCraftOpen(!craftOpen)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Award className="w-5 h-5 text-blue-600" />
                    <CardTitle className="text-2xl">Craft</CardTitle>
                  </div>
                  {craftOpen ? (
                    <ChevronUp className="w-5 h-5 text-blue-600" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-blue-600" />
                  )}
                </div>
                <CardDescription>Your skills, experience, and artistic journey</CardDescription>
              </CardHeader>

              {craftOpen && (
                <CardContent className="pt-6 space-y-6">
                  {/* Experience Level */}
                  <div>
                    <Label className="text-base font-semibold">
                      Experience Level <span className="text-red-500">*</span>
                    </Label>
                    <RadioGroup
                      value={experienceLevel}
                      onValueChange={setExperienceLevel}
                      className="mt-3"
                      onBlur={() => markTouched("experienceLevel")}
                    >
                      <div className="flex items-center space-x-2 border rounded-lg p-3 hover:bg-blue-50 cursor-pointer">
                        <RadioGroupItem value="Beginner" id="beginner" />
                        <Label htmlFor="beginner" className="cursor-pointer flex-1">
                          <div className="font-semibold">Beginner</div>
                          <div className="text-sm text-gray-500">Just starting out or exploring theatre</div>
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2 border rounded-lg p-3 hover:bg-blue-50 cursor-pointer">
                        <RadioGroupItem value="Intermediate" id="intermediate" />
                        <Label htmlFor="intermediate" className="cursor-pointer flex-1">
                          <div className="font-semibold">Intermediate</div>
                          <div className="text-sm text-gray-500">Some experience with productions or training</div>
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2 border rounded-lg p-3 hover:bg-blue-50 cursor-pointer">
                        <RadioGroupItem value="Professional" id="professional" />
                        <Label htmlFor="professional" className="cursor-pointer flex-1">
                          <div className="font-semibold">Professional</div>
                          <div className="text-sm text-gray-500">Established career in theatre or film</div>
                        </Label>
                      </div>
                    </RadioGroup>
                    {touched.experienceLevel && !experienceLevel && (
                      <p className="text-red-600 text-sm mt-2 flex items-center gap-1">
                        <AlertCircle className="w-4 h-4" />
                        Please select your experience level
                      </p>
                    )}
                  </div>

                  {/* Primary Skills */}
                  <div>
                    <Label className="text-base font-semibold">Primary Skills (Select up to 5)</Label>
                    <div className="flex flex-wrap gap-2 mt-3">
                      {SKILL_OPTIONS.map((skill) => (
                        <Badge
                          key={skill}
                          variant={selectedSkills.includes(skill) ? "default" : "outline"}
                          className={cn(
                            "cursor-pointer transition-all",
                            selectedSkills.includes(skill) ? "bg-blue-600 hover:bg-blue-700" : "hover:bg-blue-100",
                          )}
                          onClick={() => toggleSkill(skill)}
                        >
                          {skill}
                          {selectedSkills.includes(skill) && <X className="w-3 h-3 ml-1" />}
                        </Badge>
                      ))}
                    </div>
                    <p className="text-sm text-gray-500 mt-2">{selectedSkills.length}/5 skills selected</p>
                  </div>

                  {/* Languages */}
                  <div>
                    <Label className="text-base font-semibold">Languages (Select up to 6)</Label>
                    <div className="flex flex-wrap gap-2 mt-3">
                      {LANGUAGE_OPTIONS.map((language) => (
                        <Badge
                          key={language}
                          variant={selectedLanguages.includes(language) ? "default" : "outline"}
                          className={cn(
                            "cursor-pointer transition-all",
                            selectedLanguages.includes(language)
                              ? "bg-cyan-600 hover:bg-cyan-700"
                              : "hover:bg-cyan-100",
                          )}
                          onClick={() => toggleLanguage(language)}
                        >
                          {language}
                          {selectedLanguages.includes(language) && <X className="w-3 h-3 ml-1" />}
                        </Badge>
                      ))}
                    </div>
                    <p className="text-sm text-gray-500 mt-2">{selectedLanguages.length}/6 languages selected</p>
                  </div>

                  {/* Past Work Highlights */}
                  <div>
                    <Label className="text-base font-semibold">Past Work Highlights (Optional, up to 3)</Label>
                    <p className="text-sm text-gray-500 mb-3">Format: Play/Film • Role • Year</p>

                    <div className="space-y-3">
                      {workHighlights.map((highlight, index) => (
                        <div key={index} className="flex gap-2">
                          <Input
                            placeholder="Production name"
                            value={highlight.production}
                            onChange={(e) => updateWorkHighlight(index, "production", e.target.value)}
                            className="flex-1"
                          />
                          <Input
                            placeholder="Role"
                            value={highlight.role}
                            onChange={(e) => updateWorkHighlight(index, "role", e.target.value)}
                            className="flex-1"
                          />
                          <Input
                            placeholder="Year"
                            value={highlight.year}
                            onChange={(e) => updateWorkHighlight(index, "year", e.target.value)}
                            className="w-24"
                            maxLength={4}
                          />
                          {workHighlights.length > 1 && (
                            <Button variant="ghost" size="icon" onClick={() => removeWorkHighlight(index)}>
                              <X className="w-4 h-4" />
                            </Button>
                          )}
                        </div>
                      ))}
                    </div>

                    {workHighlights.length < 3 && (
                      <Button variant="outline" size="sm" onClick={addWorkHighlight} className="mt-3 bg-transparent">
                        <Plus className="w-4 h-4 mr-2" />
                        Add Highlight
                      </Button>
                    )}
                  </div>
                </CardContent>
              )}
            </Card>

            {/* SHOWCASE SECTION */}
            <Card className="border-2 border-pink-200 shadow-lg">
              <CardHeader
                className="bg-gradient-to-r from-pink-100 to-purple-100 cursor-pointer hover:from-pink-200 hover:to-purple-200 transition"
                onClick={() => setShowcaseOpen(!showcaseOpen)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-pink-600" />
                    <CardTitle className="text-2xl">Showcase</CardTitle>
                  </div>
                  {showcaseOpen ? (
                    <ChevronUp className="w-5 h-5 text-pink-600" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-pink-600" />
                  )}
                </div>
                <CardDescription>Share your best work with the community</CardDescription>
              </CardHeader>

              {showcaseOpen && (
                <CardContent className="pt-6 space-y-6">
                  {/* Gallery */}
                  <div>
                    <Label className="text-base font-semibold">Gallery (Max 3 images)</Label>
                    <p className="text-sm text-gray-500 mb-3">3 best photos only</p>

                    <div className="grid grid-cols-3 gap-4">
                      {galleryImages.map((image, index) => (
                        <div key={index}>
                          {image ? (
                            <div className="relative aspect-square rounded-lg overflow-hidden border-2 border-pink-200">
                              <Image
                                src={image || "/placeholder.svg"}
                                alt={`Gallery ${index + 1}`}
                                fill
                                className="object-cover"
                              />
                              <button
                                onClick={() => removeGalleryImage(index)}
                                className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                              >
                                <X className="w-4 h-4" />
                              </button>
                            </div>
                          ) : (
                            <label className="aspect-square border-2 border-dashed border-pink-300 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:border-pink-500 hover:bg-pink-50 transition">
                              <Upload className="w-6 h-6 text-pink-400 mb-2" />
                              <span className="text-xs text-pink-600 font-medium">Upload</span>
                              <input
                                type="file"
                                accept="image/*"
                                className="hidden"
                                onChange={(e) => handleGalleryImageUpload(index, e)}
                              />
                            </label>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Showreel / Monologue */}
                  <div>
                    <Label htmlFor="showreel" className="text-base font-semibold">
                      Showreel / Monologue Link
                      {!hasGalleryImages && <span className="text-red-500"> *</span>}
                    </Label>
                    <p className="text-sm text-gray-500 mb-2">
                      {hasGalleryImages
                        ? "Optional - YouTube or Vimeo link"
                        : "Required if no gallery images - YouTube or Vimeo link"}
                    </p>
                    <Input
                      id="showreel"
                      value={showreelUrl}
                      onChange={(e) => setShowreelUrl(e.target.value)}
                      placeholder="https://youtube.com/watch?v=..."
                      className="mt-2"
                    />
                  </div>

                  {/* Social Link */}
                  <div>
                    <Label htmlFor="social" className="text-base font-semibold">
                      Social Link (Optional)
                    </Label>
                    <p className="text-sm text-gray-500 mb-2">Instagram or YouTube profile</p>
                    <div className="flex gap-2">
                      <div className="flex-1 relative">
                        <LinkIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <Input
                          id="social"
                          value={socialLink}
                          onChange={(e) => setSocialLink(e.target.value)}
                          placeholder="https://instagram.com/yourprofile"
                          className="pl-10"
                        />
                      </div>
                    </div>
                  </div>
                </CardContent>
              )}
            </Card>

            {/* CONSENT FOOTER */}
            <Card className="border-2 border-gray-200 shadow-lg">
              <CardContent className="pt-6 space-y-4">
                <div className="flex items-start gap-3">
                  <Checkbox
                    id="confirm-truth"
                    checked={confirmTruth}
                    onCheckedChange={(checked) => setConfirmTruth(checked as boolean)}
                  />
                  <Label
                    htmlFor="confirm-truth"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                  >
                    I confirm all details are true. <span className="text-red-500">*</span>
                  </Label>
                </div>

                <div className="flex items-start gap-3">
                  <Checkbox
                    id="agree-terms"
                    checked={agreeTerms}
                    onCheckedChange={(checked) => setAgreeTerms(checked as boolean)}
                  />
                  <Label
                    htmlFor="agree-terms"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                  >
                    I agree to Abhinayपथ's{" "}
                    <a href="/terms" className="text-purple-600 hover:underline">
                      Terms
                    </a>{" "}
                    &{" "}
                    <a href="/privacy" className="text-purple-600 hover:underline">
                      Privacy Policy
                    </a>
                    . <span className="text-red-500">*</span>
                  </Label>
                </div>

                <Separator className="my-4" />

                <div className="flex items-center justify-between text-xs text-gray-500">
                  <div className="space-x-3">
                    <a href="/privacy" className="hover:text-purple-600 hover:underline">
                      Privacy
                    </a>
                    <span>•</span>
                    <a href="/terms" className="hover:text-purple-600 hover:underline">
                      Terms
                    </a>
                    <span>•</span>
                    <a href="/report" className="hover:text-purple-600 hover:underline">
                      Report Misuse
                    </a>
                  </div>
                </div>

                <Button
                  onClick={handleSubmit}
                  disabled={!isFormValid || isSubmitting}
                  className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-lg py-6"
                >
                  {isSubmitting ? "Creating Profile..." : "Save Profile"}
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Preview Card (Sticky on Desktop) */}
          <div className="lg:col-span-1">
            <Card className="sticky top-8 border-2 border-purple-200 shadow-lg">
              <CardHeader className="bg-gradient-to-br from-purple-100 to-pink-100">
                <CardTitle className="text-lg">Profile Preview</CardTitle>
                <CardDescription>How others will see you</CardDescription>
              </CardHeader>
              <CardContent className="pt-6 space-y-4">
                {/* Profile Image */}
                <div className="flex justify-center">
                  <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-purple-200">
                    {profileImage ? (
                      <Image
                        src={profileImage || "/placeholder.svg"}
                        alt="Preview"
                        width={128}
                        height={128}
                        className="object-cover w-full h-full"
                      />
                    ) : (
                      <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                        <User className="w-16 h-16 text-gray-400" />
                      </div>
                    )}
                  </div>
                </div>

                {/* Name & Tagline */}
                <div className="text-center">
                  <h3 className="text-xl font-bold">{name || "Your Name"}</h3>
                  <p className="text-sm text-gray-600">{tagline || "Actor | Director | Trainer"}</p>
                  <p className="text-sm text-gray-500 mt-1">{city || "Your City"}</p>
                </div>

                {/* Bio Snippet */}
                {bio && <p className="text-sm text-gray-700 text-center line-clamp-3 px-2">{bio}</p>}

                {/* Skills Pills */}
                {selectedSkills.length > 0 && (
                  <div>
                    <p className="text-xs font-semibold text-gray-600 mb-2">Skills</p>
                    <div className="flex flex-wrap gap-1">
                      {selectedSkills.slice(0, 5).map((skill) => (
                        <Badge key={skill} variant="secondary" className="text-xs">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                {/* Languages Pills */}
                {selectedLanguages.length > 0 && (
                  <div>
                    <p className="text-xs font-semibold text-gray-600 mb-2">Languages</p>
                    <div className="flex flex-wrap gap-1">
                      {selectedLanguages.slice(0, 4).map((language) => (
                        <Badge key={language} variant="outline" className="text-xs">
                          {language}
                        </Badge>
                      ))}
                      {selectedLanguages.length > 4 && (
                        <Badge variant="outline" className="text-xs">
                          +{selectedLanguages.length - 4}
                        </Badge>
                      )}
                    </div>
                  </div>
                )}

                {/* Gallery Preview */}
                {hasGalleryImages && (
                  <div>
                    <p className="text-xs font-semibold text-gray-600 mb-2">Gallery</p>
                    <div className="grid grid-cols-3 gap-2">
                      {galleryImages
                        .filter((img) => img !== null)
                        .slice(0, 3)
                        .map((img, idx) => (
                          <div key={idx} className="aspect-square rounded overflow-hidden border">
                            <Image
                              src={img! || "/placeholder.svg"}
                              alt={`Gallery ${idx + 1}`}
                              width={100}
                              height={100}
                              className="object-cover w-full h-full"
                            />
                          </div>
                        ))}
                    </div>
                  </div>
                )}

                {/* CTA Button */}
                <Button
                  className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                  disabled
                >
                  Message via Abhinayपथ
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
