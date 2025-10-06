"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  MapPin,
  Mail,
  Phone,
  Globe,
  Star,
  Briefcase,
  Play,
  Instagram,
  Youtube,
  ExternalLink,
  ArrowLeft,
  CheckCircle2,
  MessageCircle,
} from "lucide-react"
import Link from "next/link"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"

interface ArtistProfile {
  id: string
  full_name: string
  email: string
  phone?: string
  city?: string
  state?: string
  bio?: string
  profile_image_url?: string
  experience_level?: string
  acting_skills?: string[]
  languages?: string[]
  years_of_experience?: number
  portfolio_images?: string[]
  portfolio_videos?: string[]
  instagram_url?: string
  youtube_url?: string
  website_url?: string
  imdb_url?: string
  verified?: boolean
  experience?: Array<{
    project_title: string
    role: string
    project_type: string
    start_date: string
  }>
}

export default function ArtistProfilePage() {
  const params = useParams()
  const router = useRouter()
  const [profile, setProfile] = useState<ArtistProfile | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [agreedToTerms, setAgreedToTerms] = useState(false)
  const [agreedToPrivacy, setAgreedToPrivacy] = useState(false)

  useEffect(() => {
    if (params.id) {
      fetchArtistProfile(params.id as string)
    }
  }, [params.id])

  const fetchArtistProfile = async (id: string) => {
    try {
      const response = await fetch(`/api/talent-profile/${id}`)
      if (response.ok) {
        const data = await response.json()
        setProfile(data)
      } else {
        setError("Profile not found")
      }
    } catch (error) {
      console.error("Error fetching artist profile:", error)
      setError("Failed to load profile")
    } finally {
      setLoading(false)
    }
  }

  const getInitials = () => {
    if (!profile) return ""
    const names = profile.full_name.split(" ")
    return names.length >= 2
      ? `${names[0].charAt(0)}${names[names.length - 1].charAt(0)}`.toUpperCase()
      : names[0].substring(0, 2).toUpperCase()
  }

  const getMediaItems = () => {
    const items = []
    if (profile?.portfolio_images) {
      items.push(...profile.portfolio_images.map((url) => ({ type: "image", url })))
    }
    if (profile?.portfolio_videos) {
      items.push(...profile.portfolio_videos.map((url) => ({ type: "video", url })))
    }
    return items.slice(0, 5) // Limit to 5 items
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white">
        <div className="container mx-auto px-4 py-8">
          <div className="animate-pulse space-y-8">
            <div className="h-8 bg-gray-200 rounded w-1/4"></div>
            <div className="max-w-5xl mx-auto space-y-6">
              <div className="h-64 bg-gray-200 rounded-lg"></div>
              <div className="h-48 bg-gray-200 rounded-lg"></div>
              <div className="h-48 bg-gray-200 rounded-lg"></div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (error || !profile) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white">
        <div className="container mx-auto px-4 py-16 text-center">
          <div className="text-6xl mb-4">😔</div>
          <h1 className="text-2xl font-bold mb-2">Artist Profile Not Found</h1>
          <p className="text-muted-foreground mb-4">
            {error || "The artist profile you're looking for doesn't exist or has been removed."}
          </p>
          <Button asChild>
            <Link href="/artists">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Browse Artists
            </Link>
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white">
      <div className="container mx-auto px-4 py-8 space-y-8">
        {/* Back Button */}
        <Button variant="outline" asChild>
          <Link href="/artists">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Artists
          </Link>
        </Button>

        <div className="max-w-5xl mx-auto space-y-8">
          {/* ESSENCE Section */}
          <Card className="overflow-hidden border-2 border-primary/20 shadow-lg">
            <div className="bg-gradient-to-r from-primary/10 to-purple-100 p-8">
              <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
                <div className="relative">
                  <Avatar className="w-32 h-32 border-4 border-white shadow-xl">
                    <AvatarImage src={profile.profile_image_url || "/placeholder.svg"} alt={profile.full_name} />
                    <AvatarFallback className="text-3xl bg-primary/20">{getInitials()}</AvatarFallback>
                  </Avatar>
                  {profile.verified && (
                    <div className="absolute -bottom-2 -right-2 bg-blue-500 rounded-full p-2 shadow-lg">
                      <CheckCircle2 className="h-6 w-6 text-white" />
                    </div>
                  )}
                </div>

                <div className="flex-1 text-center md:text-left space-y-4">
                  <div>
                    <h1 className="text-4xl font-bold font-playfair mb-2">{profile.full_name}</h1>
                    {profile.city && (
                      <div className="flex items-center justify-center md:justify-start text-muted-foreground gap-2">
                        <MapPin className="h-4 w-4" />
                        <span>
                          {profile.city}
                          {profile.state ? `, ${profile.state}` : ""}
                        </span>
                      </div>
                    )}
                  </div>

                  {profile.bio && <p className="text-muted-foreground leading-relaxed max-w-2xl">{profile.bio}</p>}

                  <div className="flex flex-wrap gap-3 justify-center md:justify-start">
                    {profile.email && (
                      <Button variant="default" size="sm" asChild>
                        <a href={`mailto:${profile.email}`}>
                          <Mail className="h-4 w-4 mr-2" />
                          Contact
                        </a>
                      </Button>
                    )}
                    {profile.phone && (
                      <Button variant="outline" size="sm" asChild>
                        <a href={`tel:${profile.phone}`}>
                          <Phone className="h-4 w-4 mr-2" />
                          Call
                        </a>
                      </Button>
                    )}
                    {profile.website_url && (
                      <Button variant="outline" size="sm" asChild>
                        <a href={profile.website_url} target="_blank" rel="noopener noreferrer">
                          <Globe className="h-4 w-4 mr-2" />
                          Website
                        </a>
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </Card>

          {/* CRAFT Section */}
          <Card className="border-2 border-purple-100">
            <CardContent className="p-8 space-y-6">
              <div>
                <h2 className="text-2xl font-bold font-playfair mb-6 flex items-center gap-2">
                  <Briefcase className="h-6 w-6 text-primary" />
                  Craft & Expertise
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Experience Level */}
                <div className="space-y-2">
                  <h3 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide">
                    Experience Level
                  </h3>
                  <div className="flex items-center gap-2">
                    <Badge variant="default" className="text-base px-4 py-2">
                      {profile.experience_level || "Not specified"}
                    </Badge>
                    {profile.years_of_experience && (
                      <span className="text-muted-foreground">({profile.years_of_experience}+ years)</span>
                    )}
                  </div>
                </div>

                {/* Languages */}
                {profile.languages && profile.languages.length > 0 && (
                  <div className="space-y-2">
                    <h3 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide">Languages</h3>
                    <div className="flex flex-wrap gap-2">
                      {profile.languages.map((language, index) => (
                        <Badge key={index} variant="secondary" className="px-3 py-1">
                          {language}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Skills */}
              {profile.acting_skills && profile.acting_skills.length > 0 && (
                <div className="space-y-3">
                  <h3 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide">
                    Skills & Specializations
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {profile.acting_skills.map((skill, index) => (
                      <Badge
                        key={index}
                        variant="outline"
                        className="px-3 py-1 border-primary/30 hover:bg-primary/10 transition-colors"
                      >
                        <Star className="h-3 w-3 mr-1 text-primary" />
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              {/* Past Work Highlights */}
              {profile.experience && profile.experience.length > 0 && (
                <div className="space-y-3">
                  <h3 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide">
                    Past Work Highlights
                  </h3>
                  <div className="space-y-3">
                    {profile.experience.slice(0, 3).map((exp, index) => (
                      <div key={index} className="bg-purple-50 rounded-lg p-4 border border-purple-100">
                        <div className="flex justify-between items-start">
                          <div>
                            <h4 className="font-medium">{exp.project_title}</h4>
                            <p className="text-sm text-muted-foreground">
                              {exp.role} • {exp.project_type}
                            </p>
                          </div>
                          <span className="text-xs text-muted-foreground">
                            {new Date(exp.start_date).getFullYear()}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* SHOWCASE Section */}
          <Card className="border-2 border-purple-100">
            <CardContent className="p-8 space-y-6">
              <div>
                <h2 className="text-2xl font-bold font-playfair mb-6 flex items-center gap-2">
                  <Play className="h-6 w-6 text-primary" />
                  Showcase
                </h2>
              </div>

              {/* Gallery */}
              {getMediaItems().length > 0 && (
                <div className="space-y-3">
                  <h3 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide">
                    Portfolio Gallery
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                    {getMediaItems().map((item, index) => (
                      <div
                        key={index}
                        className="aspect-square relative overflow-hidden rounded-lg border-2 border-purple-100 hover:border-primary transition-all group cursor-pointer"
                      >
                        {item.type === "image" ? (
                          <img
                            src={item.url || "/placeholder.svg"}
                            alt={`Portfolio ${index + 1}`}
                            className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-300"
                          />
                        ) : (
                          <div className="relative w-full h-full bg-black">
                            <video src={item.url} className="object-cover w-full h-full" />
                            <div className="absolute inset-0 flex items-center justify-center bg-black/40 group-hover:bg-black/20 transition-colors">
                              <Play className="h-12 w-12 text-white" />
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                  {(profile.portfolio_images?.length || 0) + (profile.portfolio_videos?.length || 0) > 5 && (
                    <p className="text-sm text-muted-foreground text-center">
                      Showing 5 of {(profile.portfolio_images?.length || 0) + (profile.portfolio_videos?.length || 0)}{" "}
                      items
                    </p>
                  )}
                </div>
              )}

              {/* Showreels & Links */}
              <div className="space-y-3">
                <h3 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide">
                  Links & Profiles
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                  {profile.youtube_url && (
                    <Button variant="outline" className="w-full justify-start bg-transparent" asChild>
                      <a href={profile.youtube_url} target="_blank" rel="noopener noreferrer">
                        <Youtube className="h-4 w-4 mr-2 text-red-600" />
                        Showreel
                      </a>
                    </Button>
                  )}
                  {profile.instagram_url && (
                    <Button variant="outline" className="w-full justify-start bg-transparent" asChild>
                      <a href={profile.instagram_url} target="_blank" rel="noopener noreferrer">
                        <Instagram className="h-4 w-4 mr-2 text-pink-600" />
                        Instagram
                      </a>
                    </Button>
                  )}
                  {profile.imdb_url && (
                    <Button variant="outline" className="w-full justify-start bg-transparent" asChild>
                      <a href={profile.imdb_url} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="h-4 w-4 mr-2 text-yellow-600" />
                        IMDb
                      </a>
                    </Button>
                  )}
                </div>
              </div>

              {/* Social Connect */}
              <div className="bg-gradient-to-r from-primary/5 to-purple-50 rounded-lg p-6 border border-primary/20">
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div>
                    <h3 className="font-semibold mb-1">Interested in collaborating?</h3>
                    <p className="text-sm text-muted-foreground">
                      Reach out to {profile.full_name.split(" ")[0]} for opportunities
                    </p>
                  </div>
                  <Button size="lg" asChild>
                    <a href={`mailto:${profile.email}`}>
                      <MessageCircle className="h-4 w-4 mr-2" />
                      Get in Touch
                    </a>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Consent Footer */}
          <Card className="border-2 border-purple-100 bg-purple-50/50">
            <CardContent className="p-6">
              <div className="space-y-4">
                <h3 className="font-semibold text-sm uppercase tracking-wide text-muted-foreground">Legal & Consent</h3>
                <div className="space-y-3">
                  <div className="flex items-start space-x-3">
                    <Checkbox
                      id="terms"
                      checked={agreedToTerms}
                      onCheckedChange={(checked) => setAgreedToTerms(checked as boolean)}
                      className="mt-1"
                    />
                    <Label htmlFor="terms" className="text-sm leading-relaxed cursor-pointer">
                      I confirm that all information displayed on this profile is accurate and I have the right to
                      showcase this content.
                    </Label>
                  </div>
                  <div className="flex items-start space-x-3">
                    <Checkbox
                      id="privacy"
                      checked={agreedToPrivacy}
                      onCheckedChange={(checked) => setAgreedToPrivacy(checked as boolean)}
                      className="mt-1"
                    />
                    <Label htmlFor="privacy" className="text-sm leading-relaxed cursor-pointer">
                      I agree to Abhinayपथ's{" "}
                      <Link href="/terms" className="text-primary hover:underline">
                        Terms of Service
                      </Link>{" "}
                      and{" "}
                      <Link href="/privacy" className="text-primary hover:underline">
                        Privacy Policy
                      </Link>
                      .
                    </Label>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground mt-4">
                  This profile is publicly visible and may be viewed by casting directors, producers, and other artists
                  on Abhinayपथ.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
