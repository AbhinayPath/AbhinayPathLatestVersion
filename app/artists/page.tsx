"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Search, MapPin, Award, Filter, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface Artist {
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
}

export default function ArtistsDirectoryPage() {
  const [artists, setArtists] = useState<Artist[]>([])
  const [filteredArtists, setFilteredArtists] = useState<Artist[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [experienceFilter, setExperienceFilter] = useState<string>("all")
  const [locationFilter, setLocationFilter] = useState<string>("all")

  useEffect(() => {
    fetchArtists()
  }, [])

  useEffect(() => {
    filterArtists()
  }, [artists, searchQuery, experienceFilter, locationFilter])

  const fetchArtists = async () => {
    try {
      const response = await fetch("/api/talent-profile")
      if (!response.ok) throw new Error("Failed to fetch artists")
      const data = await response.json()
      setArtists(data.profiles || [])
    } catch (error) {
      console.error("Error fetching artists:", error)
    } finally {
      setLoading(false)
    }
  }

  const filterArtists = () => {
    let filtered = [...artists]

    // Search filter
    if (searchQuery) {
      filtered = filtered.filter(
        (artist) =>
          artist.full_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          artist.city?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          artist.acting_skills?.some((skill) => skill.toLowerCase().includes(searchQuery.toLowerCase())),
      )
    }

    // Experience filter
    if (experienceFilter !== "all") {
      filtered = filtered.filter((artist) => artist.experience_level === experienceFilter)
    }

    // Location filter
    if (locationFilter !== "all") {
      filtered = filtered.filter((artist) => artist.state === locationFilter)
    }

    setFilteredArtists(filtered)
  }

  const clearFilters = () => {
    setSearchQuery("")
    setExperienceFilter("all")
    setLocationFilter("all")
  }

  // Get unique locations
  const locations = Array.from(new Set(artists.map((a) => a.state).filter(Boolean)))

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#7E1F2E] mx-auto mb-4"></div>
          <p className="text-gray-600">Loading artists...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-purple-600 to-pink-600 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Discover Talented Artists</h1>
            <p className="text-lg text-purple-100">Explore profiles of actors, directors, and theatre professionals</p>
          </div>
        </div>
      </section>

      {/* Search and Filters */}
      <section className="py-8 bg-white border-b">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col md:flex-row gap-4">
              {/* Search */}
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <Input
                  type="text"
                  placeholder="Search by name, city, or skills..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>

              {/* Experience Filter */}
              <Select value={experienceFilter} onValueChange={setExperienceFilter}>
                <SelectTrigger className="w-full md:w-[200px]">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Experience Level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Levels</SelectItem>
                  <SelectItem value="Beginner">Beginner</SelectItem>
                  <SelectItem value="Intermediate">Intermediate</SelectItem>
                  <SelectItem value="Advanced">Advanced</SelectItem>
                  <SelectItem value="Professional">Professional</SelectItem>
                </SelectContent>
              </Select>

              {/* Location Filter */}
              <Select value={locationFilter} onValueChange={setLocationFilter}>
                <SelectTrigger className="w-full md:w-[200px]">
                  <MapPin className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Location" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Locations</SelectItem>
                  {locations.map((location) => (
                    <SelectItem key={location} value={location}>
                      {location}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {/* Clear Filters */}
              {(searchQuery || experienceFilter !== "all" || locationFilter !== "all") && (
                <Button variant="outline" onClick={clearFilters}>
                  <X className="h-4 w-4 mr-2" />
                  Clear
                </Button>
              )}
            </div>

            {/* Results Count */}
            <div className="mt-4 text-sm text-gray-600">
              Showing {filteredArtists.length} of {artists.length} artists
            </div>
          </div>
        </div>
      </section>

      {/* Artists Grid */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            {filteredArtists.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">🎭</div>
                <h3 className="text-xl font-semibold mb-2">No artists found</h3>
                <p className="text-gray-600 mb-4">Try adjusting your search or filters</p>
                <Button onClick={clearFilters}>Clear Filters</Button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredArtists.map((artist) => (
                  <Link key={artist.id} href={`/artists/${artist.id}`}>
                    <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer">
                      <CardContent className="p-6">
                        {/* Profile Picture */}
                        <div className="relative w-24 h-24 mx-auto mb-4">
                          <Image
                            src={artist.profile_picture_url || "/placeholder-user.jpg"}
                            alt={artist.full_name}
                            fill
                            className="rounded-full object-cover"
                          />
                          <div className="absolute -bottom-1 -right-1 bg-green-500 rounded-full p-1">
                            <Award className="h-4 w-4 text-white" />
                          </div>
                        </div>

                        {/* Name and Location */}
                        <h3 className="text-lg font-semibold text-center mb-1">{artist.full_name}</h3>
                        <p className="text-sm text-gray-600 text-center mb-3 flex items-center justify-center gap-1">
                          <MapPin className="h-3 w-3" />
                          {artist.city}, {artist.state}
                        </p>

                        {/* Experience Badge */}
                        <div className="flex justify-center mb-3">
                          <Badge variant="secondary">
                            {artist.experience_level}
                            {artist.years_of_experience && ` · ${artist.years_of_experience}y`}
                          </Badge>
                        </div>

                        {/* Bio Preview */}
                        <p className="text-sm text-gray-600 text-center mb-4 line-clamp-2">{artist.bio}</p>

                        {/* Skills */}
                        <div className="flex flex-wrap gap-2 justify-center">
                          {artist.acting_skills?.slice(0, 3).map((skill, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {skill}
                            </Badge>
                          ))}
                          {artist.acting_skills?.length > 3 && (
                            <Badge variant="outline" className="text-xs">
                              +{artist.acting_skills.length - 3}
                            </Badge>
                          )}
                        </div>

                        {/* View Profile Button */}
                        <Button className="w-full mt-4 bg-transparent" variant="outline">
                          View Profile
                        </Button>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  )
}
