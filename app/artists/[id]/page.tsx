"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Mail,
  Phone,
  MapPin,
  Star,
  Briefcase,
  Languages,
  Globe,
  Instagram,
  Youtube,
  Film,
  Award,
  Calendar,
  Building,
  Play,
  ExternalLink,
  Sparkles,
} from "lucide-react"
import Link from "next/link"
import Image from "next/image"

interface TalentProfile {
  id: string
  full_name: string
  email?: string
  phone?: string
  city?: string
  state?: string
  bio?: string
  profile_image_url?: string
  experience_level?: string
  years_of_experience?: number
  skills?: string[]
  languages?: string[]
  verified?: boolean
  portfolio_images?: string[]
  showreel_url?: string
  monologue_url?: string
  instagram_url?: string
  youtube_url?: string
  website_url?: string
  imdb_url?: string
  experience_records?: Array<{
    project_title: string
    role: string
    description?: string
    year?: string
  }>
  training_records?: Array<{
    program_name: string
    instructor?: string
    institution?: string
    year?: string
  }>
  education_records?: Array<{
    degree: string
    institution: string
    year?: string
  }>
}

export default function ArtistProfilePage() {
  const params = useParams()
  const [artist, setArtist] = useState<TalentProfile | null>(null)
  const [loading, setLoading] = useState(true)
  const [termsAccepted, setTermsAccepted] = useState(false)
  const [privacyAccepted, setPrivacyAccepted] = useState(false)

  useEffect(() => {
    if (params.id) {
      fetchArtist(params.id as string)
    }
  }, [params.id])

  const fetchArtist = async (id: string) => {
    try {
      setLoading(true)
      const response = await fetch(`/api/talent-profile/${id}`)

      if (!response.ok) {
        throw new Error("Failed to fetch artist profile")
      }

      const data = await response.json()
      setArtist(data)
    } catch (error) {
      console.error("Error fetching artist:", error)
      setArtist(null)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
          <p className="mt-4 text-gray-600">Loading profile...</p>
        </div>
      </div>
    )
  }

  if (!artist) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Artist Not Found</h2>
          <p className="text-gray-600 mb-6">The profile you're looking for doesn't exist.</p>
          <Link href="/artists">
            <Button>Browse All Artists</Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50">
      {/* ESSENCE Section */}
      <section className="relative bg-gradient-to-r from-purple-600 to-pink-600 text-white py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            {/* Profile Image */}
            <div className="relative inline-block mb-6">
              <Avatar className="h-32 w-32 md:h-40 md:w-40 border-4 border-white shadow-2xl">
                <AvatarImage src={artist.profile_image_url || "/placeholder.svg"} alt={artist.full_name} />
                <AvatarFallback className="bg-purple-100 text-purple-700 text-4xl">
                  {artist.full_name
                    ?.split(" ")
                    .map((n) => n[0])
                    .join("")
                    .toUpperCase()}
                </AvatarFallback>
              </Avatar>
              {artist.verified && (
                <div className="absolute bottom-2 right-2 bg-blue-500 rounded-full p-2 shadow-lg">
                  <Star className="h-5 w-5 text-white fill-white" />
                </div>
              )}
            </div>

            {/* Name & Location */}
            <h1 className="text-4xl md:text-5xl font-bold mb-3">{artist.full_name}</h1>
            {(artist.city || artist.state) && (
              <div className="flex items-center justify-center gap-2 text-purple-100 mb-6">
                <MapPin className="h-5 w-5" />
                <span className="text-lg">{[artist.city, artist.state].filter(Boolean).join(", ")}</span>
              </div>
            )}

            {/* Bio */}
            {artist.bio && (
              <p className="text-lg text-purple-50 max-w-2xl mx-auto mb-8 leading-relaxed">{artist.bio}</p>
            )}

            {/* Contact Buttons */}
            <div className="flex flex-wrap justify-center gap-3">
              {artist.email && (
                <Button
                  asChild
                  variant="secondary"
                  className="bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white border-white/30"
                >
                  <a href={`mailto:${artist.email}`}>
                    <Mail className="h-4 w-4 mr-2" />
                    Email
                  </a>
                </Button>
              )}
              {artist.phone && (
                <Button
                  asChild
                  variant="secondary"
                  className="bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white border-white/30"
                >
                  <a href={`tel:${artist.phone}`}>
                    <Phone className="h-4 w-4 mr-2" />
                    Call
                  </a>
                </Button>
              )}
              {artist.website_url && (
                <Button
                  asChild
                  variant="secondary"
                  className="bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white border-white/30"
                >
                  <a href={artist.website_url} target="_blank" rel="noopener noreferrer">
                    <Globe className="h-4 w-4 mr-2" />
                    Website
                  </a>
                </Button>
              )}
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-purple-50 to-transparent"></div>
      </section>

      <div className="container mx-auto px-4 py-12 max-w-6xl">
        {/* CRAFT Section */}
        <section className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <Sparkles className="h-6 w-6 text-purple-600" />
            <h2 className="text-3xl font-bold text-gray-900">Craft</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Experience & Skills */}
            <Card className="border-purple-100">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Briefcase className="h-5 w-5 text-purple-600" />
                  Experience & Skills
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Experience Level */}
                {artist.experience_level && (
                  <div>
                    <label className="text-sm font-medium text-gray-700 block mb-2">Experience Level</label>
                    <Badge className="bg-purple-100 text-purple-700 hover:bg-purple-200">
                      {artist.experience_level}
                      {artist.years_of_experience && ` • ${artist.years_of_experience} years`}
                    </Badge>
                  </div>
                )}

                {/* Skills */}
                {artist.skills && artist.skills.length > 0 && (
                  <div>
                    <label className="text-sm font-medium text-gray-700 block mb-2">Skills & Specializations</label>
                    <div className="flex flex-wrap gap-2">
                      {artist.skills.map((skill, idx) => (
                        <Badge key={idx} variant="outline" className="border-purple-200 text-purple-700">
                          <Star className="h-3 w-3 mr-1 fill-purple-700" />
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
                <CardTitle className="flex items-center gap-2">
                  <Languages className="h-5 w-5 text-purple-600" />
                  Languages
                </CardTitle>
              </CardHeader>
              <CardContent>
                {artist.languages && artist.languages.length > 0 ? (
                  <div className="flex flex-wrap gap-2">
                    {artist.languages.map((language, idx) => (
                      <Badge key={idx} variant="secondary" className="bg-purple-50 text-purple-700">
                        {language}
                      </Badge>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500 text-sm">No languages specified</p>
                )}
              </CardContent>
            </Card>

            {/* Past Work Highlights */}
            {artist.experience_records && artist.experience_records.length > 0 && (
              <Card className="border-purple-100 md:col-span-2">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Award className="h-5 w-5 text-purple-600" />
                    Past Work Highlights
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {artist.experience_records.slice(0, 3).map((work, idx) => (
                      <div key={idx} className="flex gap-4 p-4 bg-purple-50/50 rounded-lg">
                        <div className="flex-shrink-0">
                          <div className="h-12 w-12 rounded-full bg-purple-100 flex items-center justify-center">
                            <Film className="h-6 w-6 text-purple-600" />
                          </div>
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold text-gray-900">{work.project_title}</h4>
                          <p className="text-sm text-purple-600 font-medium">{work.role}</p>
                          {work.description && <p className="text-sm text-gray-600 mt-1">{work.description}</p>}
                          {work.year && (
                            <div className="flex items-center gap-1 mt-2 text-xs text-gray-500">
                              <Calendar className="h-3 w-3" />
                              {work.year}
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Training & Education */}
            {((artist.training_records && artist.training_records.length > 0) ||
              (artist.education_records && artist.education_records.length > 0)) && (
              <Card className="border-purple-100 md:col-span-2">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Building className="h-5 w-5 text-purple-600" />
                    Training & Education
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {artist.training_records?.map((training, idx) => (
                    <div key={idx} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                      <Award className="h-5 w-5 text-purple-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <h5 className="font-medium text-gray-900">{training.program_name}</h5>
                        {training.instructor && (
                          <p className="text-sm text-gray-600">Instructor: {training.instructor}</p>
                        )}
                        {training.institution && <p className="text-sm text-gray-600">{training.institution}</p>}
                        {training.year && <p className="text-xs text-gray-500 mt-1">{training.year}</p>}
                      </div>
                    </div>
                  ))}
                  {artist.education_records?.map((edu, idx) => (
                    <div key={idx} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                      <Building className="h-5 w-5 text-purple-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <h5 className="font-medium text-gray-900">{edu.degree}</h5>
                        <p className="text-sm text-gray-600">{edu.institution}</p>
                        {edu.year && <p className="text-xs text-gray-500 mt-1">{edu.year}</p>}
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            )}
          </div>
        </section>

        <Separator className="my-12" />

        {/* SHOWCASE Section */}
        <section className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <Film className="h-6 w-6 text-purple-600" />
            <h2 className="text-3xl font-bold text-gray-900">Showcase</h2>
          </div>

          {/* Portfolio Gallery */}
          {artist.portfolio_images && artist.portfolio_images.length > 0 && (
            <Card className="border-purple-100 mb-6">
              <CardHeader>
                <CardTitle>Portfolio Gallery</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                  {artist.portfolio_images.slice(0, 5).map((image, idx) => {
                    const isVideo =
                      image.includes("youtube.com") ||
                      image.includes("youtu.be") ||
                      image.includes("vimeo.com") ||
                      image.endsWith(".mp4") ||
                      image.endsWith(".mov")

                    return (
                      <div
                        key={idx}
                        className="relative aspect-square rounded-lg overflow-hidden group cursor-pointer hover:shadow-xl transition-all"
                      >
                        <Image
                          src={image || "/placeholder.svg"}
                          alt={`Portfolio ${idx + 1}`}
                          fill
                          className="object-cover group-hover:scale-110 transition-transform duration-300"
                        />
                        {isVideo && (
                          <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                            <Play className="h-12 w-12 text-white" />
                          </div>
                        )}
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Showreels & Links */}
          <div className="grid md:grid-cols-2 gap-6">
            {/* Showreels */}
            {(artist.showreel_url || artist.monologue_url) && (
              <Card className="border-purple-100">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Play className="h-5 w-5 text-purple-600" />
                    Showreels
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {artist.showreel_url && (
                    <Button asChild variant="outline" className="w-full justify-start bg-transparent">
                      <a href={artist.showreel_url} target="_blank" rel="noopener noreferrer">
                        <Film className="h-4 w-4 mr-2" />
                        Watch Showreel
                        <ExternalLink className="h-4 w-4 ml-auto" />
                      </a>
                    </Button>
                  )}
                  {artist.monologue_url && (
                    <Button asChild variant="outline" className="w-full justify-start bg-transparent">
                      <a href={artist.monologue_url} target="_blank" rel="noopener noreferrer">
                        <Play className="h-4 w-4 mr-2" />
                        Watch Monologue
                        <ExternalLink className="h-4 w-4 ml-auto" />
                      </a>
                    </Button>
                  )}
                </CardContent>
              </Card>
            )}

            {/* Social Media */}
            {(artist.instagram_url || artist.youtube_url || artist.imdb_url) && (
              <Card className="border-purple-100">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Globe className="h-5 w-5 text-purple-600" />
                    Connect Online
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {artist.instagram_url && (
                    <Button asChild variant="outline" className="w-full justify-start bg-transparent">
                      <a href={artist.instagram_url} target="_blank" rel="noopener noreferrer">
                        <Instagram className="h-4 w-4 mr-2" />
                        Instagram
                        <ExternalLink className="h-4 w-4 ml-auto" />
                      </a>
                    </Button>
                  )}
                  {artist.youtube_url && (
                    <Button asChild variant="outline" className="w-full justify-start bg-transparent">
                      <a href={artist.youtube_url} target="_blank" rel="noopener noreferrer">
                        <Youtube className="h-4 w-4 mr-2" />
                        YouTube
                        <ExternalLink className="h-4 w-4 ml-auto" />
                      </a>
                    </Button>
                  )}
                  {artist.imdb_url && (
                    <Button asChild variant="outline" className="w-full justify-start bg-transparent">
                      <a href={artist.imdb_url} target="_blank" rel="noopener noreferrer">
                        <Film className="h-4 w-4 mr-2" />
                        IMDb
                        <ExternalLink className="h-4 w-4 ml-auto" />
                      </a>
                    </Button>
                  )}
                </CardContent>
              </Card>
            )}
          </div>

          {/* Call to Action */}
          <Card className="border-purple-200 bg-gradient-to-r from-purple-50 to-pink-50 mt-6">
            <CardContent className="p-6 text-center">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Interested in collaborating?</h3>
              <p className="text-gray-600 mb-4">Reach out to discuss opportunities and creative projects</p>
              <div className="flex justify-center gap-3">
                {artist.email && (
                  <Button asChild className="bg-purple-600 hover:bg-purple-700">
                    <a href={`mailto:${artist.email}`}>
                      <Mail className="h-4 w-4 mr-2" />
                      Send Email
                    </a>
                  </Button>
                )}
                {artist.phone && (
                  <Button asChild variant="outline">
                    <a href={`tel:${artist.phone}`}>
                      <Phone className="h-4 w-4 mr-2" />
                      Call Now
                    </a>
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        </section>

        <Separator className="my-12" />

        {/* Consent Footer */}
        <section className="mb-8">
          <Card className="border-purple-200 bg-purple-50/50">
            <CardContent className="p-6 space-y-4">
              <h3 className="font-semibold text-gray-900 mb-3">Public Profile Notice</h3>

              <div className="space-y-3 text-sm">
                <div className="flex items-start gap-3">
                  <Checkbox
                    id="terms"
                    checked={termsAccepted}
                    onCheckedChange={(checked) => setTermsAccepted(checked as boolean)}
                  />
                  <label htmlFor="terms" className="text-gray-700 leading-relaxed cursor-pointer">
                    I understand that this profile is publicly visible and I accept the{" "}
                    <Link href="/terms" className="text-purple-600 hover:underline">
                      Terms & Conditions
                    </Link>
                  </label>
                </div>

                <div className="flex items-start gap-3">
                  <Checkbox
                    id="privacy"
                    checked={privacyAccepted}
                    onCheckedChange={(checked) => setPrivacyAccepted(checked as boolean)}
                  />
                  <label htmlFor="privacy" className="text-gray-700 leading-relaxed cursor-pointer">
                    I acknowledge the{" "}
                    <Link href="/privacy" className="text-purple-600 hover:underline">
                      Privacy Policy
                    </Link>{" "}
                    and understand how my data is displayed and protected
                  </label>
                </div>
              </div>

              <p className="text-xs text-gray-600 mt-4 pt-4 border-t border-purple-200">
                This profile has been published by the artist and is visible to all visitors of Abhinayपथ. If you notice
                any inappropriate content, please contact us.
              </p>
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  )
}
