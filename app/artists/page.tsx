"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Search, MapPin, Star, Briefcase, Users, Filter, X } from "lucide-react"
import Link from "next/link"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface TalentProfile {
  id: string
  full_name: string
  profile_image_url?: string
  city?: string
  state?: string
  bio?: string
  experience_level?: string
  skills?: string[]
  languages?: string[]
  verified?: boolean
  years_of_experience?: number
}

export default function ArtistsDirectoryPage() {
  const [artists, setArtists] = useState<TalentProfile[]>([])
  const [filteredArtists, setFilteredArtists] = useState<TalentProfile[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [experienceFilter, setExperienceFilter] = useState<string>("all")
  const [locationFilter, setLocationFilter] = useState("")

  useEffect(() => {
    fetchArtists()
  }, [])

  useEffect(() => {
    filterArtists()
  }, [searchQuery, experienceFilter, locationFilter, artists])

  const fetchArtists = async () => {
    try {
      setLoading(true)
      const response = await fetch("/api/talent-profile?published=true")

      if (!response.ok) {
        throw new Error("Failed to fetch artists")
      }

      const data = await response.json()
      setArtists(data)
      setFilteredArtists(data)
    } catch (error) {
      console.error("Error fetching artists:", error)
      setArtists([])
      setFilteredArtists([])
    } finally {
      setLoading(false)
    }
  }

  const filterArtists = () => {
    let filtered = [...artists]

    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(
        (artist) =>
          artist.full_name?.toLowerCase().includes(query) ||
          artist.city?.toLowerCase().includes(query) ||
          artist.bio?.toLowerCase().includes(query) ||
          artist.skills?.some((skill) => skill.toLowerCase().includes(query)),
      )
    }

    // Experience level filter
    if (experienceFilter !== "all") {
      filtered = filtered.filter((artist) => artist.experience_level?.toLowerCase() === experienceFilter.toLowerCase())
    }

    // Location filter
    if (locationFilter) {
      const location = locationFilter.toLowerCase()
      filtered = filtered.filter(
        (artist) => artist.city?.toLowerCase().includes(location) || artist.state?.toLowerCase().includes(location),
      )
    }

    setFilteredArtists(filtered)
  }

  const clearFilters = () => {
    setSearchQuery("")
    setExperienceFilter("all")
    setLocationFilter("")
  }

  const hasActiveFilters = searchQuery || experienceFilter !== "all" || locationFilter

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50">
        <div className="container mx-auto px-4 py-16">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
            <p className="mt-4 text-gray-600">Loading artists...</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-purple-600 to-pink-600 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
              <Users className="h-4 w-4" />
              <span className="text-sm font-medium">{artists.length} Talented Artists</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Discover Theatre Artists</h1>
            <p className="text-lg text-purple-100 max-w-2xl mx-auto">
              Connect with talented actors, directors, and theatre professionals from across India
            </p>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-purple-50/50 to-transparent"></div>
      </section>

      {/* Filters Section */}
      <section className="bg-white border-b sticky top-0 z-40 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                type="text"
                placeholder="Search by name, city, or skills..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Experience Level Filter */}
            <Select value={experienceFilter} onValueChange={setExperienceFilter}>
              <SelectTrigger className="w-full md:w-[200px]">
                <Briefcase className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Experience Level" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Levels</SelectItem>
                <SelectItem value="beginner">Beginner</SelectItem>
                <SelectItem value="intermediate">Intermediate</SelectItem>
                <SelectItem value="advanced">Advanced</SelectItem>
                <SelectItem value="professional">Professional</SelectItem>
              </SelectContent>
            </Select>

            {/* Location Filter */}
            <div className="relative w-full md:w-[200px]">
              <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                type="text"
                placeholder="Filter by city..."
                value={locationFilter}
                onChange={(e) => setLocationFilter(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Clear Filters */}
            {hasActiveFilters && (
              <Button variant="outline" onClick={clearFilters} className="whitespace-nowrap bg-transparent">
                <X className="h-4 w-4 mr-2" />
                Clear
              </Button>
            )}
          </div>

          {/* Active Filters Summary */}
          {hasActiveFilters && (
            <div className="mt-3 flex items-center gap-2 text-sm text-gray-600">
              <Filter className="h-4 w-4" />
              <span>
                Showing {filteredArtists.length} of {artists.length} artists
              </span>
            </div>
          )}
        </div>
      </section>

      {/* Artists Grid */}
      <section className="container mx-auto px-4 py-12">
        {filteredArtists.length === 0 ? (
          <div className="text-center py-16">
            <Users className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-800 mb-2">No artists found</h3>
            <p className="text-gray-600 mb-6">
              {hasActiveFilters
                ? "Try adjusting your filters to see more results."
                : "No artists have published their profiles yet."}
            </p>
            {hasActiveFilters && (
              <Button onClick={clearFilters} variant="outline">
                Clear all filters
              </Button>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredArtists.map((artist) => (
              <Card key={artist.id} className="group hover:shadow-xl transition-all duration-300 border-purple-100">
                <CardContent className="p-6">
                  {/* Avatar & Basic Info */}
                  <div className="flex items-start gap-4 mb-4">
                    <div className="relative">
                      <Avatar className="h-16 w-16 border-2 border-purple-200">
                        <AvatarImage src={artist.profile_image_url || "/placeholder.svg"} alt={artist.full_name} />
                        <AvatarFallback className="bg-purple-100 text-purple-700">
                          {artist.full_name
                            ?.split(" ")
                            .map((n) => n[0])
                            .join("")
                            .toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      {artist.verified && (
                        <div className="absolute -bottom-1 -right-1 bg-blue-500 rounded-full p-1">
                          <Star className="h-3 w-3 text-white fill-white" />
                        </div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-lg text-gray-900 truncate">{artist.full_name}</h3>
                      {(artist.city || artist.state) && (
                        <div className="flex items-center gap-1 text-sm text-gray-600 mt-1">
                          <MapPin className="h-3 w-3" />
                          <span className="truncate">{[artist.city, artist.state].filter(Boolean).join(", ")}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Experience Badge */}
                  {artist.experience_level && (
                    <div className="mb-3">
                      <Badge variant="secondary" className="bg-purple-100 text-purple-700">
                        <Briefcase className="h-3 w-3 mr-1" />
                        {artist.experience_level}
                        {artist.years_of_experience && ` • ${artist.years_of_experience}y`}
                      </Badge>
                    </div>
                  )}

                  {/* Bio */}
                  {artist.bio && <p className="text-sm text-gray-600 line-clamp-2 mb-4">{artist.bio}</p>}

                  {/* Skills */}
                  {artist.skills && artist.skills.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {artist.skills.slice(0, 3).map((skill, idx) => (
                        <Badge key={idx} variant="outline" className="text-xs border-purple-200 text-purple-700">
                          {skill}
                        </Badge>
                      ))}
                      {artist.skills.length > 3 && (
                        <Badge variant="outline" className="text-xs border-gray-200 text-gray-600">
                          +{artist.skills.length - 3} more
                        </Badge>
                      )}
                    </div>
                  )}

                  {/* View Profile Button */}
                  <Link href={`/artists/${artist.id}`}>
                    <Button className="w-full bg-purple-600 hover:bg-purple-700 group-hover:shadow-lg transition-all">
                      View Profile
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </section>
    </div>
  )
}
