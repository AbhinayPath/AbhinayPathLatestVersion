"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/contexts/AuthContext"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Progress } from "@/components/ui/progress"
import { toast } from "sonner"
import {
  User,
  MapPin,
  Upload,
  X,
  Plus,
  Star,
  Briefcase,
  Camera,
  LinkIcon,
  Youtube,
  Instagram,
  Globe,
  Eye,
  AlertCircle,
  Mail,
  Check,
} from "lucide-react"
import { EXPERIENCE_LEVELS, ACTING_SKILLS, INDIAN_LANGUAGES, INDIAN_STATES } from "@/lib/types/talent"

const STEPS = [
  { id: 1, title: "Essence", icon: User, description: "Basic information and introduction" },
  { id: 2, title: "Craft", icon: Briefcase, description: "Skills, experience, and past work" },
  { id: 3, title: "Showcase", icon: Camera, description: "Gallery, showreel, and social links" },
  { id: 4, title: "Review", icon: Eye, description: "Review and publish your profile" },
]

export default function CreateActorProfilePage() {
  const { user, loading } = useAuth()
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(1)
  const [saving, setSaving] = useState(false)
  const [uploading, setUploading] = useState(false)

  // Form data
  const [formData, setFormData] = useState({
    // Essence
    full_name: "",
    profile_image_url: "",
    city: "",
    state: "",
    bio: "",
    email: user?.email || "",
    phone: "",
    website_url: "",

    // Craft
    experience_level: "Beginner" as const,
    years_of_experience: 0,
    acting_skills: [] as string[],
    languages: [] as string[],
    past_work: [] as Array<{
      project_title: string
      role: string
      production_company: string
      year: string
    }>,

    // Showcase
    portfolio_images: [] as string[],
    showreel_url: "",
    monologue_url: "",
    instagram_url: "",
    youtube_url: "",
    imdb_url: "",

    // Consent
    terms_accepted: false,
    privacy_accepted: false,
  })

  // Redirect if not logged in
  useEffect(() => {
    if (!loading && !user) {
      toast.error("Please log in to create an actor profile")
      router.push("/login")
    }
  }, [user, loading, router])

  useEffect(() => {
    if (user?.email) {
      setFormData((prev) => ({ ...prev, email: user.email || "" }))
    }
  }, [user])

  const handleInputChange = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleArrayFieldToggle = (field: "acting_skills" | "languages", value: string) => {
    setFormData((prev) => {
      const currentArray = prev[field]
      const newArray = currentArray.includes(value)
        ? currentArray.filter((item) => item !== value)
        : [...currentArray, value]
      return { ...prev, [field]: newArray }
    })
  }

  const addPastWork = () => {
    setFormData((prev) => ({
      ...prev,
      past_work: [...prev.past_work, { project_title: "", role: "", production_company: "", year: "" }],
    }))
  }

  const updatePastWork = (index: number, field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      past_work: prev.past_work.map((work, i) => (i === index ? { ...work, [field]: value } : work)),
    }))
  }

  const removePastWork = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      past_work: prev.past_work.filter((_, i) => i !== index),
    }))
  }

  const handleImageUpload = async (file: File, type: "profile" | "gallery") => {
    if (!file) return

    setUploading(true)
    try {
      const formData = new FormData()
      formData.append("file", file)
      formData.append("type", type)

      const response = await fetch("/api/talent-profile/media", {
        method: "POST",
        body: formData,
      })

      if (response.ok) {
        const data = await response.json()

        if (type === "profile") {
          setFormData((prev) => ({ ...prev, profile_image_url: data.url }))
        } else {
          setFormData((prev) => ({
            ...prev,
            portfolio_images: [...prev.portfolio_images, data.url],
          }))
        }

        toast.success("Image uploaded successfully!")
      } else {
        throw new Error("Upload failed")
      }
    } catch (error) {
      console.error("Upload error:", error)
      toast.error("Failed to upload image")
    } finally {
      setUploading(false)
    }
  }

  const removeGalleryImage = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      portfolio_images: prev.portfolio_images.filter((_, i) => i !== index),
    }))
  }

  const validateStep = () => {
    switch (currentStep) {
      case 1: // Essence
        if (!formData.full_name) return "Name is required"
        if (!formData.city) return "City is required"
        if (!formData.state) return "State is required"
        if (!formData.bio || formData.bio.length < 50) return "Bio must be at least 50 characters"
        if (!formData.email) return "Email is required"
        return null

      case 2: // Craft
        if (!formData.experience_level) return "Experience level is required"
        if (formData.acting_skills.length === 0) return "Please select at least one skill"
        if (formData.languages.length === 0) return "Please select at least one language"
        return null

      case 3: // Showcase
        if (!formData.terms_accepted || !formData.privacy_accepted) {
          return "Please accept Terms & Privacy Policy"
        }
        return null

      default:
        return null
    }
  }

  const nextStep = () => {
    const error = validateStep()
    if (error) {
      toast.error(error, {
        description: "Please complete all required fields",
        icon: <AlertCircle className="text-red-500" />,
      })
      return
    }

    if (currentStep < STEPS.length) {
      setCurrentStep(currentStep + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleSubmit = async () => {
    const error = validateStep()
    if (error) {
      toast.error(error)
      return
    }

    setSaving(true)
    try {
      // Prepare profile data
      const profileData = {
        full_name: formData.full_name,
        email: formData.email,
        phone: formData.phone,
        city: formData.city,
        state: formData.state,
        bio: formData.bio,
        profile_image_url: formData.profile_image_url,
        experience_level: formData.experience_level,
        years_of_experience: formData.years_of_experience,
        acting_skills: formData.acting_skills,
        languages: formData.languages,
        portfolio_images: formData.portfolio_images,
        website_url: formData.website_url,
        instagram_url: formData.instagram_url,
        youtube_url: formData.youtube_url,
        imdb_url: formData.imdb_url,
        profile_status: "published",
      }

      // Map past work to experience records
      const experience = formData.past_work
        .filter((work) => work.project_title && work.role)
        .map((work) => ({
          project_title: work.project_title,
          role: work.role,
          production_company: work.production_company,
          start_date: work.year ? `${work.year}-01-01` : undefined,
        }))

      const response = await fetch("/api/talent-profile", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          profile: profileData,
          experience,
          education: [],
          training: [],
        }),
        credentials: "include",
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error || "Failed to create profile")
      }

      const data = await response.json()
      toast.success("Actor profile created successfully!", {
        description: "Your profile is now live and visible to casting directors.",
      })

      // Redirect to the actor's profile page
      router.push(`/actors/${data.data.id}`)
    } catch (error) {
      console.error("Submit error:", error)
      toast.error(error instanceof Error ? error.message : "Failed to create profile")
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return null
  }

  const progress = (currentStep / STEPS.length) * 100

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50">
      <div className="container mx-auto px-4 py-8 max-w-5xl">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="font-playfair text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            Create Your Actor Profile
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Showcase your talent and connect with casting directors, producers, and industry professionals
          </p>
        </div>

        {/* Progress Indicator */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            {STEPS.map((step) => {
              const Icon = step.icon
              const isActive = currentStep === step.id
              const isCompleted = currentStep > step.id

              return (
                <div key={step.id} className="flex flex-col items-center flex-1">
                  <div
                    className={`
                    w-12 h-12 rounded-full flex items-center justify-center border-2 mb-2 transition-all
                    ${
                      isActive
                        ? "bg-purple-600 border-purple-600 text-white scale-110"
                        : isCompleted
                          ? "bg-green-500 border-green-500 text-white"
                          : "bg-white border-gray-300 text-gray-400"
                    }
                  `}
                  >
                    {isCompleted ? <Check className="h-5 w-5" /> : <Icon className="h-5 w-5" />}
                  </div>
                  <span
                    className={`text-xs md:text-sm font-medium text-center ${
                      isActive ? "text-purple-600" : isCompleted ? "text-green-600" : "text-gray-500"
                    }`}
                  >
                    {step.title}
                  </span>
                </div>
              )
            })}
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        {/* Form Content */}
        <Card className="shadow-xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-2xl">
              {(() => {
                const Icon = STEPS[currentStep - 1].icon
                return <Icon className="h-6 w-6 text-purple-600" />
              })()}
              {STEPS[currentStep - 1].title}
            </CardTitle>
            <CardDescription className="text-base">{STEPS[currentStep - 1].description}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* STEP 1: ESSENCE */}
            {currentStep === 1 && (
              <div className="space-y-6">
                {/* Profile Picture */}
                <Card className="border-purple-100">
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Camera className="h-5 w-5 text-purple-600" />
                      Profile Picture *
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-col items-center space-y-4">
                      {formData.profile_image_url ? (
                        <div className="relative">
                          <img
                            src={formData.profile_image_url || "/placeholder.svg"}
                            alt="Profile"
                            className="w-32 h-32 rounded-full object-cover border-4 border-purple-200"
                          />
                          <Button
                            variant="outline"
                            size="sm"
                            className="absolute -top-2 -right-2 rounded-full h-8 w-8 p-0 bg-transparent"
                            onClick={() => handleInputChange("profile_image_url", "")}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      ) : (
                        <div className="w-32 h-32 rounded-full border-2 border-dashed border-purple-300 flex items-center justify-center bg-purple-50">
                          <User className="h-12 w-12 text-purple-300" />
                        </div>
                      )}
                      <div className="text-center">
                        <input
                          type="file"
                          id="profile-image"
                          accept="image/*"
                          className="hidden"
                          onChange={(e) => {
                            const file = e.target.files?.[0]
                            if (file) handleImageUpload(file, "profile")
                          }}
                        />
                        <Button
                          variant="outline"
                          disabled={uploading}
                          onClick={() => document.getElementById("profile-image")?.click()}
                          className="border-purple-300 hover:bg-purple-50"
                        >
                          <Upload className="h-4 w-4 mr-2" />
                          {uploading ? "Uploading..." : "Upload Photo"}
                        </Button>
                        <p className="text-sm text-gray-500 mt-2">
                          JPG, PNG or WebP. Max 5MB. Professional headshot recommended.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Basic Information */}
                <Card className="border-purple-100">
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <User className="h-5 w-5 text-purple-600" />
                      Basic Information
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label htmlFor="full_name" className="text-base">
                        Full Name <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="full_name"
                        value={formData.full_name}
                        onChange={(e) => handleInputChange("full_name", e.target.value)}
                        placeholder="Enter your full name"
                        className="mt-1"
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="city" className="text-base">
                          City <span className="text-red-500">*</span>
                        </Label>
                        <Input
                          id="city"
                          value={formData.city}
                          onChange={(e) => handleInputChange("city", e.target.value)}
                          placeholder="Your city"
                          className="mt-1"
                        />
                      </div>

                      <div>
                        <Label htmlFor="state" className="text-base">
                          State <span className="text-red-500">*</span>
                        </Label>
                        <Select value={formData.state} onValueChange={(value) => handleInputChange("state", value)}>
                          <SelectTrigger className="mt-1">
                            <SelectValue placeholder="Select state" />
                          </SelectTrigger>
                          <SelectContent>
                            {INDIAN_STATES.map((state) => (
                              <SelectItem key={state} value={state}>
                                {state}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="bio" className="text-base">
                        About / Bio <span className="text-red-500">*</span>
                      </Label>
                      <Textarea
                        id="bio"
                        value={formData.bio}
                        onChange={(e) => handleInputChange("bio", e.target.value)}
                        placeholder="Tell us about yourself, your passion for acting, training, and what makes you unique... (minimum 50 characters)"
                        rows={6}
                        className="mt-1"
                      />
                      <p className="text-sm text-gray-500 mt-1">{formData.bio.length} / 50 minimum characters</p>
                    </div>
                  </CardContent>
                </Card>

                {/* Contact Information */}
                <Card className="border-purple-100">
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Mail className="h-5 w-5 text-purple-600" />
                      Contact Information
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label htmlFor="email" className="text-base">
                        Email <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange("email", e.target.value)}
                        placeholder="your.email@example.com"
                        className="mt-1"
                      />
                    </div>

                    <div>
                      <Label htmlFor="phone" className="text-base">
                        Phone Number
                      </Label>
                      <Input
                        id="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => handleInputChange("phone", e.target.value)}
                        placeholder="+91 XXXXX XXXXX"
                        className="mt-1"
                      />
                    </div>

                    <div>
                      <Label htmlFor="website_url" className="text-base">
                        Website
                      </Label>
                      <Input
                        id="website_url"
                        type="url"
                        value={formData.website_url}
                        onChange={(e) => handleInputChange("website_url", e.target.value)}
                        placeholder="https://yourwebsite.com"
                        className="mt-1"
                      />
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {/* STEP 2: CRAFT */}
            {currentStep === 2 && (
              <div className="space-y-6">
                {/* Experience Level */}
                <Card className="border-purple-100">
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Briefcase className="h-5 w-5 text-purple-600" />
                      Experience Level <span className="text-red-500">*</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="experience_level" className="text-base">
                          Experience Level
                        </Label>
                        <Select
                          value={formData.experience_level}
                          onValueChange={(value) => handleInputChange("experience_level", value)}
                        >
                          <SelectTrigger className="mt-1">
                            <SelectValue placeholder="Select experience level" />
                          </SelectTrigger>
                          <SelectContent>
                            {EXPERIENCE_LEVELS.map((level) => (
                              <SelectItem key={level} value={level}>
                                {level}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <Label htmlFor="years_of_experience" className="text-base">
                          Years of Experience
                        </Label>
                        <Input
                          id="years_of_experience"
                          type="number"
                          min="0"
                          max="50"
                          value={formData.years_of_experience}
                          onChange={(e) =>
                            handleInputChange("years_of_experience", Number.parseInt(e.target.value) || 0)
                          }
                          className="mt-1"
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Skills */}
                <Card className="border-purple-100">
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Star className="h-5 w-5 text-purple-600" />
                      Acting Skills <span className="text-red-500">*</span>
                    </CardTitle>
                    <CardDescription>Select all skills that apply to you</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                      {ACTING_SKILLS.map((skill) => (
                        <div key={skill} className="flex items-center space-x-2">
                          <Checkbox
                            id={`skill-${skill}`}
                            checked={formData.acting_skills.includes(skill)}
                            onCheckedChange={() => handleArrayFieldToggle("acting_skills", skill)}
                          />
                          <Label htmlFor={`skill-${skill}`} className="text-sm cursor-pointer">
                            {skill}
                          </Label>
                        </div>
                      ))}
                    </div>
                    {formData.acting_skills.length > 0 && (
                      <div className="mt-4">
                        <p className="text-sm text-gray-600 mb-2">Selected Skills:</p>
                        <div className="flex flex-wrap gap-2">
                          {formData.acting_skills.map((skill) => (
                            <Badge key={skill} variant="secondary" className="bg-purple-100 text-purple-700">
                              {skill}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>

                {/* Languages */}
                <Card className="border-purple-100">
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Globe className="h-5 w-5 text-purple-600" />
                      Languages <span className="text-red-500">*</span>
                    </CardTitle>
                    <CardDescription>Select all languages you can speak</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                      {INDIAN_LANGUAGES.map((language) => (
                        <div key={language} className="flex items-center space-x-2">
                          <Checkbox
                            id={`lang-${language}`}
                            checked={formData.languages.includes(language)}
                            onCheckedChange={() => handleArrayFieldToggle("languages", language)}
                          />
                          <Label htmlFor={`lang-${language}`} className="text-sm cursor-pointer">
                            {language}
                          </Label>
                        </div>
                      ))}
                    </div>
                    {formData.languages.length > 0 && (
                      <div className="mt-4">
                        <p className="text-sm text-gray-600 mb-2">Selected Languages:</p>
                        <div className="flex flex-wrap gap-2">
                          {formData.languages.map((language) => (
                            <Badge key={language} variant="secondary" className="bg-purple-100 text-purple-700">
                              {language}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>

                {/* Past Work Highlights */}
                <Card className="border-purple-100">
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2 justify-between">
                      <span className="flex items-center gap-2">
                        <Star className="h-5 w-5 text-purple-600" />
                        Past Work Highlights
                      </span>
                      <Button
                        onClick={addPastWork}
                        size="sm"
                        variant="outline"
                        className="border-purple-300 bg-transparent"
                      >
                        <Plus className="h-4 w-4 mr-2" />
                        Add Work
                      </Button>
                    </CardTitle>
                    <CardDescription>Showcase your best projects (optional)</CardDescription>
                  </CardHeader>
                  <CardContent>
                    {formData.past_work.length === 0 ? (
                      <div className="text-center py-8 text-gray-500">
                        <p>No past work added yet.</p>
                        <p className="text-sm">Click "Add Work" to showcase your experience.</p>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {formData.past_work.map((work, index) => (
                          <div key={index} className="border rounded-lg p-4 space-y-3 bg-gray-50">
                            <div className="flex justify-between items-start">
                              <h4 className="font-medium text-purple-700">Project #{index + 1}</h4>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => removePastWork(index)}
                                className="h-8 w-8 p-0 text-red-500 hover:text-red-700 hover:bg-red-50"
                              >
                                <X className="h-4 w-4" />
                              </Button>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                              <Input
                                placeholder="Project Title *"
                                value={work.project_title}
                                onChange={(e) => updatePastWork(index, "project_title", e.target.value)}
                              />
                              <Input
                                placeholder="Your Role *"
                                value={work.role}
                                onChange={(e) => updatePastWork(index, "role", e.target.value)}
                              />
                              <Input
                                placeholder="Production Company"
                                value={work.production_company}
                                onChange={(e) => updatePastWork(index, "production_company", e.target.value)}
                              />
                              <Input
                                placeholder="Year (e.g., 2023)"
                                value={work.year}
                                onChange={(e) => updatePastWork(index, "year", e.target.value)}
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            )}

            {/* STEP 3: SHOWCASE */}
            {currentStep === 3 && (
              <div className="space-y-6">
                {/* Gallery */}
                <Card className="border-purple-100">
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Camera className="h-5 w-5 text-purple-600" />
                      Portfolio Gallery (Max 5)
                    </CardTitle>
                    <CardDescription>Upload high-quality images showcasing your work</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      {formData.portfolio_images.map((url, index) => (
                        <div key={index} className="relative aspect-square group">
                          <img
                            src={url || "/placeholder.svg"}
                            alt={`Gallery ${index + 1}`}
                            className="w-full h-full object-cover rounded-lg"
                          />
                          <Button
                            variant="outline"
                            size="sm"
                            className="absolute -top-2 -right-2 rounded-full h-8 w-8 p-0 opacity-0 group-hover:opacity-100 transition-opacity bg-transparent"
                            onClick={() => removeGalleryImage(index)}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}

                      {formData.portfolio_images.length < 5 && (
                        <div
                          className="aspect-square border-2 border-dashed border-purple-300 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:bg-purple-50 transition-colors"
                          onClick={() => document.getElementById("gallery-upload")?.click()}
                        >
                          <Upload className="h-8 w-8 text-purple-400 mb-2" />
                          <span className="text-sm text-purple-600">Add Image</span>
                          <input
                            type="file"
                            id="gallery-upload"
                            accept="image/*"
                            className="hidden"
                            onChange={(e) => {
                              const file = e.target.files?.[0]
                              if (file) handleImageUpload(file, "gallery")
                            }}
                          />
                        </div>
                      )}
                    </div>
                    <p className="text-sm text-gray-500 mt-4">{formData.portfolio_images.length} / 5 images uploaded</p>
                  </CardContent>
                </Card>

                {/* Video Links */}
                <Card className="border-purple-100">
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Youtube className="h-5 w-5 text-purple-600" />
                      Showreel & Monologue
                    </CardTitle>
                    <CardDescription>Add links to your video performances</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label htmlFor="showreel_url" className="text-base">
                        Showreel Link
                      </Label>
                      <Input
                        id="showreel_url"
                        type="url"
                        value={formData.showreel_url}
                        onChange={(e) => handleInputChange("showreel_url", e.target.value)}
                        placeholder="https://youtube.com/watch?v=..."
                        className="mt-1"
                      />
                    </div>

                    <div>
                      <Label htmlFor="monologue_url" className="text-base">
                        Monologue Link
                      </Label>
                      <Input
                        id="monologue_url"
                        type="url"
                        value={formData.monologue_url}
                        onChange={(e) => handleInputChange("monologue_url", e.target.value)}
                        placeholder="https://youtube.com/watch?v=..."
                        className="mt-1"
                      />
                    </div>
                  </CardContent>
                </Card>

                {/* Social Links */}
                <Card className="border-purple-100">
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <LinkIcon className="h-5 w-5 text-purple-600" />
                      Social Media Links
                    </CardTitle>
                    <CardDescription>Connect your professional social profiles</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label htmlFor="instagram_url" className="text-base flex items-center gap-2">
                        <Instagram className="h-4 w-4" />
                        Instagram
                      </Label>
                      <Input
                        id="instagram_url"
                        type="url"
                        value={formData.instagram_url}
                        onChange={(e) => handleInputChange("instagram_url", e.target.value)}
                        placeholder="https://instagram.com/yourhandle"
                        className="mt-1"
                      />
                    </div>

                    <div>
                      <Label htmlFor="youtube_url" className="text-base flex items-center gap-2">
                        <Youtube className="h-4 w-4" />
                        YouTube
                      </Label>
                      <Input
                        id="youtube_url"
                        type="url"
                        value={formData.youtube_url}
                        onChange={(e) => handleInputChange("youtube_url", e.target.value)}
                        placeholder="https://youtube.com/@yourchannel"
                        className="mt-1"
                      />
                    </div>

                    <div>
                      <Label htmlFor="imdb_url" className="text-base flex items-center gap-2">
                        <Globe className="h-4 w-4" />
                        IMDb
                      </Label>
                      <Input
                        id="imdb_url"
                        type="url"
                        value={formData.imdb_url}
                        onChange={(e) => handleInputChange("imdb_url", e.target.value)}
                        placeholder="https://imdb.com/name/nm..."
                        className="mt-1"
                      />
                    </div>
                  </CardContent>
                </Card>

                {/* Consent Footer */}
                <Card className="border-purple-200 bg-purple-50">
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <AlertCircle className="h-5 w-5 text-purple-600" />
                      Terms & Privacy <span className="text-red-500">*</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-start space-x-3">
                      <Checkbox
                        id="terms"
                        checked={formData.terms_accepted}
                        onCheckedChange={(checked) => handleInputChange("terms_accepted", checked)}
                        className="mt-1"
                      />
                      <Label htmlFor="terms" className="text-sm cursor-pointer leading-relaxed">
                        I confirm that all details provided are genuine and that I have the right to use all uploaded
                        content. I understand that providing false information may result in profile suspension.
                      </Label>
                    </div>

                    <div className="flex items-start space-x-3">
                      <Checkbox
                        id="privacy"
                        checked={formData.privacy_accepted}
                        onCheckedChange={(checked) => handleInputChange("privacy_accepted", checked)}
                        className="mt-1"
                      />
                      <Label htmlFor="privacy" className="text-sm cursor-pointer leading-relaxed">
                        I agree to Abhinayपथ's{" "}
                        <a href="/terms" className="text-purple-600 hover:underline" target="_blank" rel="noreferrer">
                          Terms of Service
                        </a>{" "}
                        and{" "}
                        <a href="/privacy" className="text-purple-600 hover:underline" target="_blank" rel="noreferrer">
                          Privacy Policy
                        </a>
                        . I understand that my profile will be publicly visible to casting directors and producers.
                      </Label>
                    </div>

                    {(!formData.terms_accepted || !formData.privacy_accepted) && (
                      <div className="flex items-start gap-2 p-3 bg-red-50 border border-red-200 rounded-lg">
                        <AlertCircle className="h-5 w-5 text-red-500 flex-shrink-0 mt-0.5" />
                        <p className="text-sm text-red-700">Please accept both checkboxes to publish your profile</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            )}

            {/* STEP 4: REVIEW */}
            {currentStep === 4 && (
              <div className="space-y-6">
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold text-purple-700 mb-2">Review Your Profile</h3>
                  <p className="text-gray-600">
                    Please review all information before publishing. You can edit your profile anytime after publishing.
                  </p>
                </div>

                {/* Essence Review */}
                <Card className="border-purple-100">
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <User className="h-5 w-5 text-purple-600" />
                      Essence
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-start gap-4">
                      {formData.profile_image_url && (
                        <img
                          src={formData.profile_image_url || "/placeholder.svg"}
                          alt="Profile"
                          className="w-20 h-20 rounded-full object-cover border-2 border-purple-200"
                        />
                      )}
                      <div className="flex-1">
                        <h4 className="font-semibold text-lg">{formData.full_name}</h4>
                        <p className="text-gray-600 flex items-center gap-1 mt-1">
                          <MapPin className="h-4 w-4" />
                          {formData.city}, {formData.state}
                        </p>
                        <p className="text-sm text-gray-700 mt-2 line-clamp-3">{formData.bio}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Craft Review */}
                <Card className="border-purple-100">
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Briefcase className="h-5 w-5 text-purple-600" />
                      Craft
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Experience Level</p>
                      <Badge variant="secondary" className="mt-1">
                        {formData.experience_level} • {formData.years_of_experience} years
                      </Badge>
                    </div>

                    <div>
                      <p className="text-sm font-medium text-gray-600 mb-2">Skills</p>
                      <div className="flex flex-wrap gap-2">
                        {formData.acting_skills.map((skill) => (
                          <Badge key={skill} variant="secondary" className="bg-purple-100 text-purple-700">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div>
                      <p className="text-sm font-medium text-gray-600 mb-2">Languages</p>
                      <div className="flex flex-wrap gap-2">
                        {formData.languages.map((lang) => (
                          <Badge key={lang} variant="secondary" className="bg-purple-100 text-purple-700">
                            {lang}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {formData.past_work.length > 0 && (
                      <div>
                        <p className="text-sm font-medium text-gray-600 mb-2">Past Work</p>
                        <div className="space-y-2">
                          {formData.past_work.map((work, index) => (
                            <div key={index} className="text-sm bg-gray-50 p-3 rounded">
                              <p className="font-medium">{work.project_title}</p>
                              <p className="text-gray-600">{work.role}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>

                {/* Showcase Review */}
                <Card className="border-purple-100">
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Camera className="h-5 w-5 text-purple-600" />
                      Showcase
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {formData.portfolio_images.length > 0 && (
                      <div>
                        <p className="text-sm font-medium text-gray-600 mb-2">Gallery</p>
                        <div className="grid grid-cols-4 gap-2">
                          {formData.portfolio_images.map((url, index) => (
                            <img
                              key={index}
                              src={url || "/placeholder.svg"}
                              alt={`Gallery ${index + 1}`}
                              className="w-full aspect-square object-cover rounded"
                            />
                          ))}
                        </div>
                      </div>
                    )}

                    {(formData.showreel_url || formData.monologue_url) && (
                      <div>
                        <p className="text-sm font-medium text-gray-600 mb-2">Videos</p>
                        <div className="space-y-1 text-sm">
                          {formData.showreel_url && <p className="text-purple-600">✓ Showreel added</p>}
                          {formData.monologue_url && <p className="text-purple-600">✓ Monologue added</p>}
                        </div>
                      </div>
                    )}

                    {(formData.instagram_url || formData.youtube_url || formData.imdb_url) && (
                      <div>
                        <p className="text-sm font-medium text-gray-600 mb-2">Social Links</p>
                        <div className="space-y-1 text-sm">
                          {formData.instagram_url && <p className="text-purple-600">✓ Instagram connected</p>}
                          {formData.youtube_url && <p className="text-purple-600">✓ YouTube connected</p>}
                          {formData.imdb_url && <p className="text-purple-600">✓ IMDb connected</p>}
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            )}
          </CardContent>

          {/* Navigation Buttons */}
          <div className="border-t p-6">
            <div className="flex justify-between items-center">
              <Button
                variant="outline"
                onClick={prevStep}
                disabled={currentStep === 1}
                className="border-purple-300 bg-transparent"
              >
                Previous
              </Button>

              <div className="flex gap-3">
                {currentStep < STEPS.length ? (
                  <Button
                    onClick={nextStep}
                    className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                  >
                    Next Step
                  </Button>
                ) : (
                  <Button
                    onClick={handleSubmit}
                    disabled={saving || !formData.terms_accepted || !formData.privacy_accepted}
                    className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                  >
                    {saving ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Publishing...
                      </>
                    ) : (
                      <>
                        <Check className="h-4 w-4 mr-2" />
                        Publish Profile
                      </>
                    )}
                  </Button>
                )}
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}
