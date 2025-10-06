"use client"

import type React from "react"
import { useState, useEffect, useRef } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/contexts/AuthContext"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { toast } from "sonner"
import {
  Camera,
  Upload,
  X,
  Plus,
  Star,
  Sparkles,
  Award,
  ImageIcon,
  Video,
  Instagram,
  Youtube,
  Globe,
  CheckCircle2,
  AlertCircle,
  MapPin,
  Mail,
  Phone,
  Briefcase,
  GraduationCap,
  LanguagesIcon,
} from "lucide-react"
import {
  type TalentProfile,
  type TalentExperience,
  EXPERIENCE_LEVELS,
  ACTING_SKILLS,
  INDIAN_LANGUAGES,
  INDIAN_STATES,
  PROJECT_TYPES,
} from "@/lib/types/talent"
import { OnboardingTour, OnboardingWelcome, type OnboardingStep } from "@/components/onboarding-tour"

export default function CreateProfilePage() {
  const { user, loading } = useAuth()
  const router = useRouter()
  const [saving, setSaving] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [agreedToTerms, setAgreedToTerms] = useState(false)
  const [showWelcome, setShowWelcome] = useState(false)
  const [showTour, setShowTour] = useState(false)

  // Profile data
  const [profile, setProfile] = useState<Partial<TalentProfile>>({
    full_name: "",
    email: user?.email || "",
    phone: "",
    city: "",
    state: "",
    bio: "",
    experience_level: "Beginner",
    acting_skills: [],
    languages: [],
    profile_status: "draft",
    instagram_url: "",
    youtube_url: "",
    website_url: "",
  })

  const [experience, setExperience] = useState<Partial<TalentExperience>[]>([])
  const [profileImage, setProfileImage] = useState<string>("")
  const [galleryImages, setGalleryImages] = useState<string[]>([])
  const [showreelLink, setShowreelLink] = useState("")
  const [monologueLink, setMonologueLink] = useState("")

  // Refs for scrolling
  const essenceRef = useRef<HTMLDivElement>(null)
  const craftRef = useRef<HTMLDivElement>(null)
  const showcaseRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const profilePictureRef = useRef<HTMLDivElement>(null)
  const nameInputRef = useRef<HTMLDivElement>(null)
  const bioTextareaRef = useRef<HTMLDivElement>(null)
  const skillsSectionRef = useRef<HTMLDivElement>(null)
  const gallerySectionRef = useRef<HTMLDivElement>(null)
  const publishButtonRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login")
    }
  }, [user, loading, router])

  useEffect(() => {
    if (user?.email) {
      setProfile((prev) => ({ ...prev, email: user.email }))
    }
  }, [user])

  useEffect(() => {
    // Check if user has seen onboarding
    const hasSeenOnboarding = localStorage.getItem("profile-onboarding-completed")
    if (!hasSeenOnboarding && user) {
      // Show welcome modal after a brief delay
      const timer = setTimeout(() => {
        setShowWelcome(true)
      }, 500)
      return () => clearTimeout(timer)
    }
  }, [user])

  const handleInputChange = (field: keyof TalentProfile, value: any) => {
    setProfile((prev) => ({ ...prev, [field]: value }))
  }

  const handleSkillToggle = (skill: string) => {
    setProfile((prev) => {
      const skills = prev.acting_skills || []
      const newSkills = skills.includes(skill) ? skills.filter((s) => s !== skill) : [...skills, skill]
      return { ...prev, acting_skills: newSkills }
    })
  }

  const handleLanguageToggle = (language: string) => {
    setProfile((prev) => {
      const languages = prev.languages || []
      const newLanguages = languages.includes(language)
        ? languages.filter((l) => l !== language)
        : [...languages, language]
      return { ...prev, languages: newLanguages }
    })
  }

  const addWorkHighlight = () => {
    setExperience((prev) => [
      ...prev,
      {
        project_title: "",
        project_type: "Film",
        role: "",
        production_company: "",
        description: "",
      },
    ])
  }

  const updateWorkHighlight = (index: number, field: keyof TalentExperience, value: any) => {
    setExperience((prev) => prev.map((exp, i) => (i === index ? { ...exp, [field]: value } : exp)))
  }

  const removeWorkHighlight = (index: number) => {
    setExperience((prev) => prev.filter((_, i) => i !== index))
  }

  const handleFileUpload = async (file: File, type: "profile" | "gallery") => {
    setUploading(true)
    try {
      const formData = new FormData()
      formData.append("file", file)
      formData.append("type", type === "profile" ? "profile" : "portfolio")

      const response = await fetch("/api/talent-profile/media", {
        method: "POST",
        body: formData,
      })

      if (response.ok) {
        const data = await response.json()
        if (type === "profile") {
          setProfileImage(data.url)
          toast.success("Profile picture uploaded!")
        } else {
          if (galleryImages.length < 5) {
            setGalleryImages((prev) => [...prev, data.url])
            toast.success("Image added to gallery!")
          } else {
            toast.error("Maximum 5 images allowed in gallery")
          }
        }
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
    setGalleryImages((prev) => prev.filter((_, i) => i !== index))
  }

  const scrollToSection = (ref: React.RefObject<HTMLDivElement>) => {
    ref.current?.scrollIntoView({ behavior: "smooth", block: "start" })
  }

  const validateEssence = () => {
    return profile.full_name && profile.email && profile.phone && profile.city && profile.state && profile.bio
  }

  const validateCraft = () => {
    return profile.experience_level && (profile.acting_skills?.length || 0) > 0 && (profile.languages?.length || 0) > 0
  }

  const validateShowcase = () => {
    return profileImage || galleryImages.length > 0
  }

  const saveProfile = async () => {
    if (!agreedToTerms) {
      toast.error("Please agree to the Terms & Privacy Policy")
      return
    }

    if (!validateEssence() || !validateCraft()) {
      toast.error("Please complete all required fields")
      return
    }

    setSaving(true)
    try {
      const profileData = {
        ...profile,
        profile_image_url: profileImage,
        portfolio_images: galleryImages,
        portfolio_videos: [showreelLink, monologueLink].filter(Boolean),
        profile_status: "published",
      }

      const payload = {
        profile: profileData,
        education: [],
        experience,
        training: [],
      }

      const response = await fetch("/api/talent-profile", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
        credentials: "include",
      })

      if (!response.ok) {
        throw new Error("Failed to save profile")
      }

      toast.success("Profile created successfully! 🎉")
      setTimeout(() => {
        router.push("/talent-directory")
      }, 1500)
    } catch (error) {
      console.error("Save error:", error)
      toast.error("Failed to create profile")
    } finally {
      setSaving(false)
    }
  }

  const handleStartTour = () => {
    setShowWelcome(false)
    setShowTour(true)
  }

  const handleSkipTour = () => {
    setShowWelcome(false)
    setShowTour(false)
    localStorage.setItem("profile-onboarding-completed", "skipped")
  }

  const handleCompleteTour = () => {
    setShowTour(false)
    toast.success("🎉 You're ready to create your profile!")
  }

  const onboardingSteps: OnboardingStep[] = [
    {
      id: "welcome",
      title: "Let's Get Started!",
      description:
        "We'll guide you through creating your professional actor profile. This tour will take about 5 minutes.",
      position: "center",
      icon: <Sparkles className="h-5 w-5" />,
    },
    {
      id: "profile-picture",
      title: "Add Your Profile Picture",
      description:
        "Upload a professional headshot. This is the first thing casting directors will see, so make it count!",
      targetRef: profilePictureRef,
      position: "bottom",
      icon: <Camera className="h-5 w-5" />,
    },
    {
      id: "basic-info",
      title: "Your Basic Information",
      description:
        "Fill in your name, contact details, and location. These help casting directors reach you for opportunities.",
      targetRef: nameInputRef,
      position: "bottom",
      icon: <Mail className="h-5 w-5" />,
    },
    {
      id: "bio",
      title: "Tell Your Story",
      description:
        "Write a compelling bio that showcases your passion and unique qualities. Be authentic and let your personality shine!",
      targetRef: bioTextareaRef,
      position: "top",
      icon: <Sparkles className="h-5 w-5" />,
      action: () => scrollToSection(essenceRef),
    },
    {
      id: "skills",
      title: "Showcase Your Skills",
      description:
        "Select your acting skills and languages. This helps casting directors find you for the right roles.",
      targetRef: skillsSectionRef,
      position: "bottom",
      icon: <Award className="h-5 w-5" />,
      action: () => scrollToSection(craftRef),
    },
    {
      id: "gallery",
      title: "Build Your Visual Portfolio",
      description:
        "Add up to 5 images to showcase your versatility and range. Include headshots, production stills, or character photos.",
      targetRef: gallerySectionRef,
      position: "top",
      icon: <ImageIcon className="h-5 w-5" />,
      action: () => scrollToSection(showcaseRef),
    },
    {
      id: "complete",
      title: "You're All Set!",
      description:
        "Once you've filled in all the required fields and agreed to the terms, click the publish button to make your profile live!",
      targetRef: publishButtonRef,
      position: "top",
      icon: <CheckCircle2 className="h-5 w-5" />,
    },
  ]

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p>Loading...</p>
        </div>
      </div>
    )
  }

  if (!user) return null

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-white/80 backdrop-blur-lg border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="font-playfair text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                Create Your Actor Profile
              </h1>
              <p className="text-sm text-gray-600">Share your talent with the world</p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" onClick={() => router.back()}>
                Cancel
              </Button>
              <Button
                onClick={saveProfile}
                disabled={saving || !agreedToTerms}
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
              >
                {saving ? "Publishing..." : "Publish Profile"}
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Navigation */}
      <div className="sticky top-[73px] z-40 bg-white border-b">
        <div className="container mx-auto px-4">
          <div className="flex gap-4 py-3 overflow-x-auto">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => scrollToSection(essenceRef)}
              className="flex items-center gap-2"
            >
              <Sparkles className="h-4 w-4" />
              Essence
              {validateEssence() && <CheckCircle2 className="h-4 w-4 text-green-500" />}
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => scrollToSection(craftRef)}
              className="flex items-center gap-2"
            >
              <Award className="h-4 w-4" />
              Craft
              {validateCraft() && <CheckCircle2 className="h-4 w-4 text-green-500" />}
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => scrollToSection(showcaseRef)}
              className="flex items-center gap-2"
            >
              <Star className="h-4 w-4" />
              Showcase
              {validateShowcase() && <CheckCircle2 className="h-4 w-4 text-green-500" />}
            </Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 max-w-4xl space-y-8">
        {/* Section 1: Essence */}
        <div ref={essenceRef} className="scroll-mt-32">
          <Card className="overflow-hidden border-2 border-purple-200">
            <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white p-6">
              <div className="flex items-center gap-3">
                <Sparkles className="h-8 w-8" />
                <div>
                  <h2 className="text-2xl font-bold">Your Essence</h2>
                  <p className="text-purple-100">Who you are at your core</p>
                </div>
              </div>
            </div>

            <CardContent className="p-6 space-y-6">
              {/* Profile Picture */}
              <div ref={profilePictureRef} className="flex flex-col items-center space-y-4">
                <div className="relative">
                  {profileImage ? (
                    <div className="relative">
                      <img
                        src={profileImage || "/placeholder.svg"}
                        alt="Profile"
                        className="w-32 h-32 rounded-full object-cover border-4 border-purple-200"
                      />
                      <Button
                        variant="outline"
                        size="sm"
                        className="absolute -top-2 -right-2 rounded-full h-8 w-8 p-0 bg-transparent"
                        onClick={() => setProfileImage("")}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ) : (
                    <div className="w-32 h-32 rounded-full border-4 border-dashed border-purple-300 flex items-center justify-center bg-purple-50">
                      <Camera className="h-12 w-12 text-purple-400" />
                    </div>
                  )}
                </div>
                <div>
                  <Button
                    variant="outline"
                    disabled={uploading}
                    onClick={() => inputRef.current?.click()}
                    className="border-purple-300 hover:bg-purple-50"
                  >
                    <Upload className="h-4 w-4 mr-2" />
                    {uploading ? "Uploading..." : "Upload Profile Picture"}
                  </Button>
                  <Input
                    ref={inputRef}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => {
                      const file = e.target.files?.[0]
                      if (file) handleFileUpload(file, "profile")
                    }}
                  />
                  <p className="text-xs text-gray-500 mt-2 text-center">A professional headshot works best</p>
                </div>
              </div>

              {/* Name & Contact */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div ref={nameInputRef} className="space-y-2">
                  <Label htmlFor="full_name" className="flex items-center gap-2">
                    <span className="text-red-500">*</span>
                    Full Name
                  </Label>
                  <Input
                    id="full_name"
                    value={profile.full_name || ""}
                    onChange={(e) => handleInputChange("full_name", e.target.value)}
                    placeholder="Your stage name or full name"
                    className="border-purple-200 focus:border-purple-400"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="flex items-center gap-2">
                    <Mail className="h-4 w-4" />
                    <span className="text-red-500">*</span>
                    Email
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={profile.email || ""}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    placeholder="your.email@example.com"
                    className="border-purple-200 focus:border-purple-400"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone" className="flex items-center gap-2">
                    <Phone className="h-4 w-4" />
                    <span className="text-red-500">*</span>
                    Phone
                  </Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={profile.phone || ""}
                    onChange={(e) => handleInputChange("phone", e.target.value)}
                    placeholder="+91 XXXXX XXXXX"
                    className="border-purple-200 focus:border-purple-400"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="city" className="flex items-center gap-2">
                    <MapPin className="h-4 w-4" />
                    <span className="text-red-500">*</span>
                    City
                  </Label>
                  <Input
                    id="city"
                    value={profile.city || ""}
                    onChange={(e) => handleInputChange("city", e.target.value)}
                    placeholder="Your city"
                    className="border-purple-200 focus:border-purple-400"
                  />
                </div>

                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="state" className="flex items-center gap-2">
                    <span className="text-red-500">*</span>
                    State
                  </Label>
                  <Select value={profile.state || ""} onValueChange={(value) => handleInputChange("state", value)}>
                    <SelectTrigger className="border-purple-200 focus:border-purple-400">
                      <SelectValue placeholder="Select your state" />
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

              {/* About/Bio */}
              <div ref={bioTextareaRef} className="space-y-2">
                <Label htmlFor="bio" className="flex items-center gap-2">
                  <span className="text-red-500">*</span>
                  About You
                </Label>
                <Textarea
                  id="bio"
                  value={profile.bio || ""}
                  onChange={(e) => handleInputChange("bio", e.target.value)}
                  placeholder="Tell us your story... What drives you as an actor? What makes you unique?"
                  rows={5}
                  className="border-purple-200 focus:border-purple-400"
                />
                <p className="text-sm text-gray-500">
                  Share your passion, background, and what makes you stand out. {profile.bio?.length || 0} characters
                </p>
              </div>

              {!validateEssence() && (
                <div className="flex items-center gap-2 text-amber-600 bg-amber-50 p-3 rounded-lg">
                  <AlertCircle className="h-5 w-5" />
                  <p className="text-sm">Please complete all required fields in this section</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Section 2: Craft */}
        <div ref={craftRef} className="scroll-mt-32">
          <Card className="overflow-hidden border-2 border-blue-200">
            <div className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white p-6">
              <div className="flex items-center gap-3">
                <Award className="h-8 w-8" />
                <div>
                  <h2 className="text-2xl font-bold">Your Craft</h2>
                  <p className="text-blue-100">Skills, experience, and expertise</p>
                </div>
              </div>
            </div>

            <CardContent className="p-6 space-y-6">
              {/* Experience Level */}
              <div className="space-y-2">
                <Label htmlFor="experience_level" className="flex items-center gap-2">
                  <Briefcase className="h-4 w-4" />
                  <span className="text-red-500">*</span>
                  Experience Level
                </Label>
                <Select
                  value={profile.experience_level || ""}
                  onValueChange={(value) => handleInputChange("experience_level", value)}
                >
                  <SelectTrigger className="border-blue-200 focus:border-blue-400">
                    <SelectValue placeholder="Select your experience level" />
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

              {/* Acting Skills */}
              <div ref={skillsSectionRef} className="space-y-3">
                <Label className="flex items-center gap-2">
                  <Star className="h-4 w-4" />
                  <span className="text-red-500">*</span>
                  Acting Skills
                </Label>
                <div className="flex flex-wrap gap-2">
                  {ACTING_SKILLS.map((skill) => (
                    <Badge
                      key={skill}
                      variant={(profile.acting_skills || []).includes(skill) ? "default" : "outline"}
                      className={`cursor-pointer transition-all ${
                        (profile.acting_skills || []).includes(skill)
                          ? "bg-blue-600 hover:bg-blue-700"
                          : "hover:bg-blue-50 hover:border-blue-300"
                      }`}
                      onClick={() => handleSkillToggle(skill)}
                    >
                      {skill}
                      {(profile.acting_skills || []).includes(skill) && <CheckCircle2 className="h-3 w-3 ml-1" />}
                    </Badge>
                  ))}
                </div>
                <p className="text-sm text-gray-500">
                  Select all skills that apply. {profile.acting_skills?.length || 0} selected
                </p>
              </div>

              {/* Languages */}
              <div className="space-y-3">
                <Label className="flex items-center gap-2">
                  <LanguagesIcon className="h-4 w-4" />
                  <span className="text-red-500">*</span>
                  Languages
                </Label>
                <div className="flex flex-wrap gap-2">
                  {INDIAN_LANGUAGES.map((language) => (
                    <Badge
                      key={language}
                      variant={(profile.languages || []).includes(language) ? "default" : "outline"}
                      className={`cursor-pointer transition-all ${
                        (profile.languages || []).includes(language)
                          ? "bg-cyan-600 hover:bg-cyan-700"
                          : "hover:bg-cyan-50 hover:border-cyan-300"
                      }`}
                      onClick={() => handleLanguageToggle(language)}
                    >
                      {language}
                      {(profile.languages || []).includes(language) && <CheckCircle2 className="h-3 w-3 ml-1" />}
                    </Badge>
                  ))}
                </div>
                <p className="text-sm text-gray-500">
                  Select languages you can perform in. {profile.languages?.length || 0} selected
                </p>
              </div>

              {/* Past Work Highlights */}
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <Label className="flex items-center gap-2">
                    <GraduationCap className="h-4 w-4" />
                    Past Work Highlights
                  </Label>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={addWorkHighlight}
                    className="border-blue-300 hover:bg-blue-50 bg-transparent"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add Work
                  </Button>
                </div>

                {experience.length === 0 ? (
                  <div className="text-center py-8 border-2 border-dashed border-blue-200 rounded-lg">
                    <p className="text-gray-500">No work highlights added yet</p>
                    <p className="text-sm text-gray-400 mt-1">Click "Add Work" to showcase your experience</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {experience.map((work, index) => (
                      <Card key={index} className="border-blue-200">
                        <CardContent className="p-4 space-y-4">
                          <div className="flex justify-between items-start">
                            <h4 className="font-medium text-blue-900">Work #{index + 1}</h4>
                            <Button variant="ghost" size="sm" onClick={() => removeWorkHighlight(index)}>
                              <X className="h-4 w-4" />
                            </Button>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label>Project Title</Label>
                              <Input
                                value={work.project_title || ""}
                                onChange={(e) => updateWorkHighlight(index, "project_title", e.target.value)}
                                placeholder="Name of the project"
                                className="border-blue-200"
                              />
                            </div>

                            <div className="space-y-2">
                              <Label>Project Type</Label>
                              <Select
                                value={work.project_type || ""}
                                onValueChange={(value) => updateWorkHighlight(index, "project_type", value)}
                              >
                                <SelectTrigger className="border-blue-200">
                                  <SelectValue placeholder="Select type" />
                                </SelectTrigger>
                                <SelectContent>
                                  {PROJECT_TYPES.map((type) => (
                                    <SelectItem key={type} value={type}>
                                      {type}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            </div>

                            <div className="space-y-2">
                              <Label>Your Role</Label>
                              <Input
                                value={work.role || ""}
                                onChange={(e) => updateWorkHighlight(index, "role", e.target.value)}
                                placeholder="Character or position"
                                className="border-blue-200"
                              />
                            </div>

                            <div className="space-y-2">
                              <Label>Production Company</Label>
                              <Input
                                value={work.production_company || ""}
                                onChange={(e) => updateWorkHighlight(index, "production_company", e.target.value)}
                                placeholder="Production house"
                                className="border-blue-200"
                              />
                            </div>
                          </div>

                          <div className="space-y-2">
                            <Label>Description</Label>
                            <Textarea
                              value={work.description || ""}
                              onChange={(e) => updateWorkHighlight(index, "description", e.target.value)}
                              placeholder="Brief description of your contribution..."
                              rows={2}
                              className="border-blue-200"
                            />
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </div>

              {!validateCraft() && (
                <div className="flex items-center gap-2 text-amber-600 bg-amber-50 p-3 rounded-lg">
                  <AlertCircle className="h-5 w-5" />
                  <p className="text-sm">Please complete all required fields in this section</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Section 3: Showcase */}
        <div ref={showcaseRef} className="scroll-mt-32">
          <Card className="overflow-hidden border-2 border-pink-200">
            <div className="bg-gradient-to-r from-pink-600 to-rose-600 text-white p-6">
              <div className="flex items-center gap-3">
                <Star className="h-8 w-8" />
                <div>
                  <h2 className="text-2xl font-bold">Your Showcase</h2>
                  <p className="text-pink-100">Visual portfolio and media</p>
                </div>
              </div>
            </div>

            <CardContent className="p-6 space-y-6">
              {/* Gallery Images */}
              <div ref={gallerySectionRef} className="space-y-4">
                <Label className="flex items-center gap-2">
                  <ImageIcon className="h-4 w-4" />
                  Gallery (Max 5 images)
                </Label>

                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {galleryImages.map((url, index) => (
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

                  {galleryImages.length < 5 && (
                    <div className="aspect-square border-2 border-dashed border-pink-300 rounded-lg flex items-center justify-center hover:bg-pink-50 transition-colors">
                      <Label htmlFor="gallery-upload" className="cursor-pointer flex flex-col items-center gap-2">
                        <Plus className="h-8 w-8 text-pink-400" />
                        <span className="text-sm text-pink-600">Add Image</span>
                      </Label>
                      <Input
                        id="gallery-upload"
                        type="file"
                        accept="image/*"
                        className="hidden"
                        disabled={uploading}
                        onChange={(e) => {
                          const file = e.target.files?.[0]
                          if (file) handleFileUpload(file, "gallery")
                        }}
                      />
                    </div>
                  )}
                </div>
                <p className="text-sm text-gray-500">
                  {galleryImages.length}/5 images uploaded. Showcase your best moments!
                </p>
              </div>

              {/* Video Links */}
              <div className="space-y-4">
                <Label className="flex items-center gap-2">
                  <Video className="h-4 w-4" />
                  Video Links
                </Label>

                <div className="space-y-3">
                  <div className="space-y-2">
                    <Label htmlFor="showreel" className="text-sm text-gray-600">
                      Showreel
                    </Label>
                    <Input
                      id="showreel"
                      type="url"
                      value={showreelLink}
                      onChange={(e) => setShowreelLink(e.target.value)}
                      placeholder="https://youtube.com/watch?v=..."
                      className="border-pink-200 focus:border-pink-400"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="monologue" className="text-sm text-gray-600">
                      Monologue
                    </Label>
                    <Input
                      id="monologue"
                      type="url"
                      value={monologueLink}
                      onChange={(e) => setMonologueLink(e.target.value)}
                      placeholder="https://youtube.com/watch?v=..."
                      className="border-pink-200 focus:border-pink-400"
                    />
                  </div>
                </div>
              </div>

              {/* Social Media Links */}
              <div className="space-y-4">
                <Label className="flex items-center gap-2">
                  <Globe className="h-4 w-4" />
                  Social Media
                </Label>

                <div className="space-y-3">
                  <div className="space-y-2">
                    <Label htmlFor="instagram" className="flex items-center gap-2 text-sm text-gray-600">
                      <Instagram className="h-4 w-4" />
                      Instagram
                    </Label>
                    <Input
                      id="instagram"
                      type="url"
                      value={profile.instagram_url || ""}
                      onChange={(e) => handleInputChange("instagram_url", e.target.value)}
                      placeholder="https://instagram.com/your_username"
                      className="border-pink-200 focus:border-pink-400"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="youtube" className="flex items-center gap-2 text-sm text-gray-600">
                      <Youtube className="h-4 w-4" />
                      YouTube
                    </Label>
                    <Input
                      id="youtube"
                      type="url"
                      value={profile.youtube_url || ""}
                      onChange={(e) => handleInputChange("youtube_url", e.target.value)}
                      placeholder="https://youtube.com/@your_channel"
                      className="border-pink-200 focus:border-pink-400"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="website" className="flex items-center gap-2 text-sm text-gray-600">
                      <Globe className="h-4 w-4" />
                      Website
                    </Label>
                    <Input
                      id="website"
                      type="url"
                      value={profile.website_url || ""}
                      onChange={(e) => handleInputChange("website_url", e.target.value)}
                      placeholder="https://your-website.com"
                      className="border-pink-200 focus:border-pink-400"
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Terms & Privacy Footer */}
        <Card className="border-2 border-gray-200">
          <CardContent className="p-6">
            <div className="flex items-start space-x-3">
              <Checkbox
                id="terms"
                checked={agreedToTerms}
                onCheckedChange={(checked) => setAgreedToTerms(checked as boolean)}
                className="mt-1"
              />
              <div className="space-y-2">
                <Label htmlFor="terms" className="text-base font-medium cursor-pointer">
                  I agree to the Terms & Privacy Policy
                </Label>
                <p className="text-sm text-gray-600">
                  By creating this profile, you agree to our{" "}
                  <a href="/terms" className="text-purple-600 hover:underline">
                    Terms of Service
                  </a>{" "}
                  and{" "}
                  <a href="/privacy" className="text-purple-600 hover:underline">
                    Privacy Policy
                  </a>
                  . Your information will be visible to casting directors and industry professionals.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Final Submit Button */}
        <div ref={publishButtonRef} className="sticky bottom-4 z-40">
          <Card className="border-2 border-purple-200 shadow-lg">
            <CardContent className="p-4">
              <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                <div className="flex items-center gap-2 text-sm">
                  <div className="flex items-center gap-1">
                    {validateEssence() ? (
                      <CheckCircle2 className="h-4 w-4 text-green-500" />
                    ) : (
                      <AlertCircle className="h-4 w-4 text-amber-500" />
                    )}
                    <span>Essence</span>
                  </div>
                  <span className="text-gray-300">•</span>
                  <div className="flex items-center gap-1">
                    {validateCraft() ? (
                      <CheckCircle2 className="h-4 w-4 text-green-500" />
                    ) : (
                      <AlertCircle className="h-4 w-4 text-amber-500" />
                    )}
                    <span>Craft</span>
                  </div>
                  <span className="text-gray-300">•</span>
                  <div className="flex items-center gap-1">
                    {validateShowcase() ? (
                      <CheckCircle2 className="h-4 w-4 text-green-500" />
                    ) : (
                      <AlertCircle className="h-4 w-4 text-gray-400" />
                    )}
                    <span>Showcase</span>
                  </div>
                </div>

                <Button
                  onClick={saveProfile}
                  disabled={saving || !agreedToTerms || !validateEssence() || !validateCraft()}
                  size="lg"
                  className="w-full md:w-auto bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                >
                  {saving ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                      Publishing...
                    </>
                  ) : (
                    <>
                      <Star className="h-4 w-4 mr-2" />
                      Publish Your Profile
                    </>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Onboarding Components */}
      <OnboardingWelcome isOpen={showWelcome} onStart={handleStartTour} onSkip={handleSkipTour} />

      <OnboardingTour
        steps={onboardingSteps}
        isOpen={showTour}
        onComplete={handleCompleteTour}
        onSkip={handleSkipTour}
        storageKey="profile-onboarding-completed"
      />
    </div>
  )
}
