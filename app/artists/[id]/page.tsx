"use client"

import { useEffect, useState } from "react"
import { use } from "react"
import Image from "next/image"
import Link from "next/link"
import {
  MapPin,
  Mail,
  Phone,
  Globe,
  Star,
  Award,
  Languages,
  Instagram,
  Youtube,
  Film,
  CheckCircle2,
  Play,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Checkbox } from "@/components/ui/checkbox"

interface ArtistProfile {
  id: string
  user_id: string
  full_name: string
  city: string
  state: string
  bio: string
  profile_picture_url: string | null
  experience_level: "Beginner" | "Intermediate" | "Advanced" | "Professional"
  years_of_experience: number | null
  acting_skills: string[]
  languages: string[]
  contact_email: string | null
  contact_phone: string | null
  website: string | null
  social_instagram: string | null
  social_youtube: string | null
  social_imdb: string | null
}

interface Education {
  institution: string
  degree: string
  field_of_study: string | null
  start_year: number
  end_year: number | null
}

interface Experience {
  project_title: string
  role: string
  description: string | null
  year: number
}

interface Training {
  workshop_name: string
  instructor: string | null
  description: string | null
  year: number
}

interface Media {
  id: string
  media_type: "image" | "video"
  media_url: string
  thumbnail_url: string | null
  title: string | null
}

interface ArtistData {
  profile: ArtistProfile
  education: Education[]
  experience: Experience[]
  training: Training[]
  media: Media[]
}

export default function ArtistProfilePage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = use(params)
  const [artistData, setArtistData] = useState<ArtistData | null>(null)
  const [loading, setLoading] = useState(true)
  const [termsAccepted, setTermsAccepted] = useState(false)
  const [privacyAccepted, setPrivacyAccepted] = useState(false)

  useEffect(() => {
    fetchArtistProfile()
  }, [id])

  const fetchArtistProfile = async () => {
    try {
      const response = await fetch(`/api/talent-profile/${id}`)
      if (!response.ok) throw new Error("Failed to fetch artist profile")
      const data = await response.json()
      setArtistData(data)
    } catch (error) {
      console.error("Error fetching artist profile:", error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#7E1F2E] mx-auto mb-4"></div>
          <p className="text-gray-600">Loading artist profile...</p>
        </div>
      </div>
    )
  }

  if (!artistData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">😔</div>
          <h2 className="text-2xl font-bold mb-2">Profile Not Found</h2>
          <p className="text-gray-600 mb-4">The artist profile you're looking for doesn't exist.</p>
          <Link href="/artists">
            <Button>Browse All Artists</Button>
          </Link>
        </div>
      </div>
    )
  }

  const { profile, education, experience, training, media } = artistData

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white">
      {/* ESSENCE Section */}
      <section className="bg-gradient-to-r from-purple-600 to-pink-600 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-col md:flex-row items-center gap-8">
              {/* Profile Picture */}
              <div className="relative">
                <div className="relative w-40 h-40 md:w-48 md:h-48">
                  <Image
                    src={profile.profile_picture_url || "/placeholder-user.jpg"}
                    alt={profile.full_name}
                    fill
                    className="rounded-full object-cover border-4 border-white shadow-xl"
                  />
                  <div className="absolute -bottom-2 -right-2 bg-green-500 rounded-full p-2 border-4 border-white">
                    <Award className="h-6 w-6 text-white" />
                  </div>
                </div>
              </div>

              {/* Artist Info */}
              <div className="flex-1 text-center md:text-left">
                <h1 className="text-4xl md:text-5xl font-bold mb-2">{profile.full_name}</h1>
                <p className="text-xl text-purple-100 mb-4 flex items-center justify-center md:justify-start gap-2">
                  <MapPin className="h-5 w-5" />
                  {profile.city}, {profile.state}
                </p>
                <p className="text-lg text-purple-50 mb-6 max-w-2xl">{profile.bio}</p>

                {/* Contact Buttons */}
                <div className="flex flex-wrap gap-3 justify-center md:justify-start">
                  {profile.contact_email && (
                    <Button
                      variant="secondary"
                      size="sm"
                      asChild
                      className="bg-white/20 hover:bg-white/30 text-white border-white/30"
                    >
                      <a href={`mailto:${profile.contact_email}`}>
                        <Mail className="h-4 w-4 mr-2" />
                        Email
                      </a>
                    </Button>
                  )}
                  {profile.contact_phone && (
                    <Button
                      variant="secondary"
                      size="sm"
                      asChild
                      className="bg-white/20 hover:bg-white/30 text-white border-white/30"
                    >
                      <a href={`tel:${profile.contact_phone}`}>
                        <Phone className="h-4 w-4 mr-2" />
                        Call
                      </a>
                    </Button>
                  )}
                  {profile.website && (
                    <Button
                      variant="secondary"
                      size="sm"
                      asChild
                      className="bg-white/20 hover:bg-white/30 text-white border-white/30"
                    >
                      <a href={profile.website} target="_blank" rel="noopener noreferrer">
                        <Globe className="h-4 w-4 mr-2" />
                        Website
                      </a>
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CRAFT Section */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-center text-gray-900">The Craft</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              {/* Experience Level */}
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-start gap-3">
                    <div className="bg-purple-100 p-3 rounded-lg">
                      <Award className="h-6 w-6 text-purple-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-1">Experience</h3>
                      <p className="text-gray-600">
                        {profile.experience_level}
                        {profile.years_of_experience && ` · ${profile.years_of_experience} years`}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Languages */}
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-start gap-3">
                    <div className="bg-blue-100 p-3 rounded-lg">
                      <Languages className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-1">Languages</h3>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {profile.languages?.map((lang, index) => (
                          <Badge key={index} variant="secondary">
                            {lang}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Skills */}
            <Card className="mb-8">
              <CardContent className="p-6">
                <div className="flex items-start gap-3">
                  <div className="bg-pink-100 p-3 rounded-lg">
                    <Star className="h-6 w-6 text-pink-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg mb-3">Skills & Specializations</h3>
                    <div className="flex flex-wrap gap-2">
                      {profile.acting_skills?.map((skill, index) => (
                        <Badge key={index} variant="outline" className="text-sm">
                          <Star className="h-3 w-3 mr-1" />
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Past Work Highlights */}
            {experience.length > 0 && (
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-semibold text-lg mb-4">Past Work Highlights</h3>
                  <div className="space-y-4">
                    {experience.slice(0, 3).map((exp, index) => (
                      <div key={index}>
                        <div className="flex justify-between items-start mb-1">
                          <h4 className="font-semibold">{exp.project_title}</h4>
                          <span className="text-sm text-gray-500">{exp.year}</span>
                        </div>
                        <p className="text-sm text-gray-600">{exp.role}</p>
                        {exp.description && <p className="text-sm text-gray-500 mt-1">{exp.description}</p>}
                        {index < Math.min(experience.length, 3) - 1 && <Separator className="mt-4" />}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </section>

      {/* SHOWCASE Section */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-center text-gray-900">Showcase</h2>

            {/* Portfolio Gallery */}
            {media.length > 0 && (
              <Card className="mb-8">
                <CardContent className="p-6">
                  <h3 className="font-semibold text-lg mb-4">Portfolio Gallery</h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {media.map((item) => (
                      <div
                        key={item.id}
                        className="relative aspect-square rounded-lg overflow-hidden group cursor-pointer"
                      >
                        <Image
                          src={item.thumbnail_url || item.media_url}
                          alt={item.title || "Portfolio item"}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        {item.media_type === "video" && (
                          <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                            <div className="bg-white/90 rounded-full p-3">
                              <Play className="h-6 w-6 text-gray-900" />
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Social Links */}
            <Card className="mb-8">
              <CardContent className="p-6">
                <h3 className="font-semibold text-lg mb-4">Connect & Watch</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {profile.social_youtube && (
                    <Button variant="outline" asChild className="h-auto py-4 bg-transparent">
                      <a
                        href={profile.social_youtube}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex flex-col items-center gap-2"
                      >
                        <Youtube className="h-8 w-8 text-red-600" />
                        <span className="text-sm">Showreel</span>
                      </a>
                    </Button>
                  )}
                  {profile.social_instagram && (
                    <Button variant="outline" asChild className="h-auto py-4 bg-transparent">
                      <a
                        href={profile.social_instagram}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex flex-col items-center gap-2"
                      >
                        <Instagram className="h-8 w-8 text-pink-600" />
                        <span className="text-sm">Instagram</span>
                      </a>
                    </Button>
                  )}
                  {profile.social_imdb && (
                    <Button variant="outline" asChild className="h-auto py-4 bg-transparent">
                      <a
                        href={profile.social_imdb}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex flex-col items-center gap-2"
                      >
                        <Film className="h-8 w-8 text-yellow-600" />
                        <span className="text-sm">IMDb</span>
                      </a>
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Call to Action */}
            <Card className="bg-gradient-to-r from-purple-600 to-pink-600 text-white">
              <CardContent className="p-8 text-center">
                <h3 className="text-2xl font-bold mb-2">Let's Collaborate!</h3>
                <p className="text-purple-100 mb-4">Interested in working together? Get in touch!</p>
                {profile.contact_email && (
                  <Button variant="secondary" size="lg" asChild>
                    <a href={`mailto:${profile.contact_email}`}>
                      <Mail className="h-5 w-5 mr-2" />
                      Send Message
                    </a>
                  </Button>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Consent Footer */}
      <section className="py-8 bg-purple-50 border-t">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-purple-600" />
                  Profile Visibility & Consent
                </h3>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <Checkbox
                      id="terms"
                      checked={termsAccepted}
                      onCheckedChange={(checked) => setTermsAccepted(checked as boolean)}
                    />
                    <label htmlFor="terms" className="text-sm text-gray-700 leading-relaxed">
                      I confirm that this profile accurately represents me and I accept Abhinayपथ's{" "}
                      <Link href="/terms" className="text-purple-600 hover:underline">
                        Terms & Conditions
                      </Link>
                      .
                    </label>
                  </div>
                  <div className="flex items-start gap-3">
                    <Checkbox
                      id="privacy"
                      checked={privacyAccepted}
                      onCheckedChange={(checked) => setPrivacyAccepted(checked as boolean)}
                    />
                    <label htmlFor="privacy" className="text-sm text-gray-700 leading-relaxed">
                      I understand this profile is publicly visible and agree to Abhinayपथ's{" "}
                      <Link href="/privacy" className="text-purple-600 hover:underline">
                        Privacy Policy
                      </Link>
                      .
                    </label>
                  </div>
                </div>
                <p className="text-xs text-gray-500 mt-4">
                  This profile is publicly visible and can be viewed by casting directors, producers, and other theatre
                  professionals.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  )
}
