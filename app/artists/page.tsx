"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { MapPin, Search, Filter, CheckCircle2, Star, Users } from "lucide-react"
import Link from "next/link"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface Artist {
  id: string
  full_name: string
  city?: string
  state?: string
  bio?: string
  profile_image_url?: string
  experience_level?: string
  acting_skills?: string[]
  verified?: boolean
  years_of_experience?: number
}

export default function ArtistsDirectoryPage() {
  const [artists, setArtists] = useState<Artist[]>([])
  const [filteredArtists, setFilteredArtists] = useState<Artist[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [experienceFilter, setExperienceFilter] = useState("all")
  const [locationFilter, setLocationFilter] = useState("all")

  useEffect(() => {
    fetchArtists()
  }, [])

  useEffect(() => {
    filterArtists()
  }, [searchQuery, experienceFilter, locationFilter, artists])

  const fetchArtists = async () => {
    try {
      // This would fetch from your API
      const response = await fetch("/api/talent-profile")
      if (response.ok) {
        const data = await response.json()
        setArtists(data)
        setFilteredArtists(data)
      }
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
          artist.full_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
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
      filtered = filtered.filter((artist) => artist.city === locationFilter)
    }

    setFilteredArtists(filtered)
  }

  const getInitials = (name: string) => {
    const names = name.split(" ")
    return names.length >= 2
      ? `${names[0].charAt(0)}${names[names.length - 1].charAt(0)}`.toUpperCase()
      : names[0].substring(0, 2).toUpperCase()
  }

  const uniqueCities = Array.from(new Set(artists.map((a) => a.city).filter(Boolean)))

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white">
        <div className="container mx-auto px-4 py-8">
          <div className="animate-pulse space-y-8">
            <div className="h-12 bg-gray-200 rounded w-1/3"></div>
            <div className="h-16 bg-gray-200 rounded"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="h-64 bg-gray-200 rounded-lg"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-primary to-purple-700 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <Users className="h-16 w-16 mx-auto mb-4" />
          <h1 className="text-4xl md:text-5xl font-bold font-playfair mb-4">Discover Talented Artists</h1>
          <p className="text-lg md:text-xl max-w-2xl mx-auto opacity-90">
            Connect with India's finest theatre and film artists on Abhinayपथ
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 space-y-8">
        {/* Search & Filters */}
        <Card className="border-2 border-purple-100">
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {/* Search */}
              <div className="md:col-span-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search by name, city, or skills..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

              {/* Experience Filter */}
              <Select value={experienceFilter} onValueChange={setExperienceFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Experience Level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Levels</SelectItem>
                  <SelectItem value="Fresher">Fresher</SelectItem>
                  <SelectItem value="Beginner">Beginner</SelectItem>
                  <SelectItem value="Intermediate">Intermediate</SelectItem>
                  <SelectItem value="Professional">Professional</SelectItem>
                  <SelectItem value="Expert">Expert</SelectItem>
                </SelectContent>
              </Select>

              {/* Location Filter */}
              <Select value={locationFilter} onValueChange={setLocationFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Location" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Locations</SelectItem>
                  {uniqueCities.map((city) => (
                    <SelectItem key={city} value={city!}>
                      {city}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="mt-4 flex items-center justify-between text-sm text-muted-foreground">
              <span>
                Showing {filteredArtists.length} of {artists.length} artists
              </span>
              {(searchQuery || experienceFilter !== "all" || locationFilter !== "all") && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    setSearchQuery("")
                    setExperienceFilter("all")
                    setLocationFilter("all")
                  }}
                >
                  Clear Filters
                </Button>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Artists Grid */}
        {filteredArtists.length === 0 ? (
          <Card className="border-2 border-purple-100">
            <CardContent className="p-12 text-center">
              <Filter className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
              <h3 className="text-xl font-semibold mb-2">No artists found</h3>
              <p className="text-muted-foreground">Try adjusting your filters or search query</p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredArtists.map((artist) => (
              <Card
                key={artist.id}
                className="border-2 border-purple-100 hover:border-primary transition-all hover:shadow-lg group"
              >
                <CardContent className="p-6">
                  <div className="flex flex-col items-center text-center space-y-4">
                    {/* Avatar */}
                    <div className="relative">
                      <Avatar className="w-24 h-24 border-4 border-white shadow-lg">
                        <AvatarImage src={artist.profile_image_url || "/placeholder.svg"} alt={artist.full_name} />
                        <AvatarFallback className="text-xl bg-primary/20">
                          {getInitials(artist.full_name)}
                        </AvatarFallback>
                      </Avatar>
                      {artist.verified && (
                        <div className="absolute -bottom-1 -right-1 bg-blue-500 rounded-full p-1">
                          <CheckCircle2 className="h-4 w-4 text-white" />
                        </div>
                      )}
                    </div>

                    {/* Name & Location */}
                    <div className="space-y-1">
                      <h3 className="font-bold text-lg group-hover:text-primary transition-colors">
                        {artist.full_name}
                      </h3>
                      {artist.city && (
                        <div className="flex items-center justify-center text-sm text-muted-foreground">
                          <MapPin className="h-3 w-3 mr-1" />
                          {artist.city}
                          {artist.state ? `, ${artist.state}` : ""}
                        </div>
                      )}
                    </div>

                    {/* Experience Badge */}
                    <div className="flex items-center gap-2">
                      <Badge variant="default" className="px-3 py-1">
                        {artist.experience_level || "Not specified"}
                      </Badge>
                      {artist.years_of_experience && (
                        <span className="text-xs text-muted-foreground">{artist.years_of_experience}+ yrs</span>
                      )}
                    </div>

                    {/* Bio Preview */}
                    {artist.bio && <p className="text-sm text-muted-foreground line-clamp-2">{artist.bio}</p>}

                    {/* Skills Preview */}
                    {artist.acting_skills && artist.acting_skills.length > 0 && (
                      <div className="flex flex-wrap gap-1 justify-center">
                        {artist.acting_skills.slice(0, 3).map((skill, index) => (
                          <Badge key={index} variant="outline" className="text-xs px-2 py-0.5">
                            <Star className="h-2 w-2 mr-1" />
                            {skill}
                          </Badge>
                        ))}
                        {artist.acting_skills.length > 3 && (
                          <Badge variant="outline" className="text-xs px-2 py-0.5">
                            +{artist.acting_skills.length - 3}
                          </Badge>
                        )}
                      </div>
                    )}
                  </div>
                </CardContent>

                <CardFooter className="p-4 pt-0">
                  <Button asChild className="w-full">
                    <Link href={`/artists/${artist.id}`}>View Profile</Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
