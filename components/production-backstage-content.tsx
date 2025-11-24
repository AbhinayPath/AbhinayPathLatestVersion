"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import {
  Instagram,
  Mail,
  MapPin,
  Sparkles,
  Phone,
  Search,
  Filter,
  ChevronDown,
  ChevronUp,
  X,
  Briefcase,
  Calendar,
  ExternalLink,
  Youtube,
  Video,
  Facebook,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useMediaQuery } from "@/hooks/use-media-query"
import { productionProfessionals } from "@/lib/data/production-backstage"

export default function ProductionBackstageContent() {
  const [filters, setFilters] = useState({
    search: "",
    city: "",
    state: "",
    skill: "",
  })
  const [showDesktopFilters, setShowDesktopFilters] = useState(true)
  const isMobile = useMediaQuery("(max-width: 768px)")

  // Get unique values for filters
  // Extract city from location string (assuming "Area, City" or just "City")
  const cities = [
    ...new Set(
      productionProfessionals.map((p) => {
        const parts = p.location.split(",")
        return parts[parts.length - 1].trim()
      }),
    ),
  ].sort()

  const states = [...new Set(productionProfessionals.map((p) => p.state))].sort()
  const allSkills = [...new Set(productionProfessionals.flatMap((p) => p.skills))].sort()

  const filteredProfessionals = productionProfessionals.filter((professional) => {
    const matchesSearch =
      filters.search === "" ||
      professional.name.toLowerCase().includes(filters.search.toLowerCase()) ||
      professional.productions.some((prod) => prod.toLowerCase().includes(filters.search.toLowerCase())) ||
      professional.skills.some((skill) => skill.toLowerCase().includes(filters.search.toLowerCase()))

    const matchesCity = filters.city === "" || professional.location.toLowerCase().includes(filters.city.toLowerCase())
    const matchesState = filters.state === "" || professional.state === filters.state
    const matchesSkill = filters.skill === "" || professional.skills.includes(filters.skill)

    return matchesSearch && matchesCity && matchesState && matchesSkill
  })

  const handleFilterChange = (key: string, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }))
  }

  const clearFilters = () => {
    setFilters({
      search: "",
      city: "",
      state: "",
      skill: "",
    })
  }

  const hasActiveFilters = Object.values(filters).some((value) => value !== "")
  const activeFilterCount = Object.values(filters).filter((value) => value !== "").length

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-muted/20 to-background">
      {/* Hero Section */}
      <section className="relative py-12 sm:py-16 md:py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5" />
        <div className="container relative">
          <div className="max-w-3xl mx-auto text-center space-y-4 sm:space-y-6 md:space-y-8 overflow-hidden">
            <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-primary/10 text-primary text-xs sm:text-sm font-medium">
              <Sparkles className="h-3 w-3 sm:h-4 sm:w-4 flex-shrink-0" />
              <span>Behind the Scenes</span>
            </div>
            <h1 className="font-playfair text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-balance leading-tight">
              Production & Backstage
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-muted-foreground text-pretty max-w-2xl mx-auto px-2">
              Discover the skilled professionals who make the magic happen behind the curtains. From lighting designers
              to stage managers, meet the backbone of theatre.
            </p>
          </div>
        </div>
      </section>

      <section className="py-8 px-4">
        <div className="container">
          {/* Mobile Search */}
          {isMobile && (
            <div className="mb-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Search professionals..."
                  className="pl-10 rounded-full"
                  value={filters.search}
                  onChange={(e) => handleFilterChange("search", e.target.value)}
                />
                {filters.search && (
                  <button
                    className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 hover:text-gray-600"
                    onClick={() => handleFilterChange("search", "")}
                  >
                    <X className="h-4 w-4" />
                  </button>
                )}
              </div>
            </div>
          )}

          {/* Filter Header */}
          <div className="mb-6 flex justify-between items-center">
            <h2 className="font-playfair text-lg md:text-xl font-bold">
              {hasActiveFilters
                ? `${filteredProfessionals.length} Professional${filteredProfessionals.length !== 1 ? "s" : ""} Found`
                : `All Professionals (${productionProfessionals.length})`}
            </h2>

            {/* Desktop Filter Toggle */}
            <Button
              variant="outline"
              className="hidden md:flex items-center gap-2 rounded-full bg-transparent"
              onClick={() => setShowDesktopFilters(!showDesktopFilters)}
            >
              <Filter className="h-4 w-4" />
              {showDesktopFilters ? "Hide Filters" : "Show Filters"}
              {activeFilterCount > 0 && (
                <Badge variant="secondary" className="ml-1 h-5 w-5 rounded-full p-0 flex items-center justify-center">
                  {activeFilterCount}
                </Badge>
              )}
              {showDesktopFilters ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
            </Button>
          </div>

          {/* Active Filters Display */}
          {hasActiveFilters && (
            <div className="mb-6 flex flex-wrap gap-2 items-center">
              {filters.search && (
                <div className="bg-gray-100 text-gray-800 text-xs md:text-sm px-3 py-1.5 rounded-full flex items-center gap-2">
                  <span className="truncate max-w-[150px]">Search: {filters.search}</span>
                  <button
                    onClick={() => handleFilterChange("search", "")}
                    className="text-gray-500 hover:text-gray-700"
                    aria-label="Remove search filter"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </div>
              )}
              {filters.state && (
                <div className="bg-gray-100 text-gray-800 text-xs md:text-sm px-3 py-1.5 rounded-full flex items-center gap-2">
                  <span>State: {filters.state}</span>
                  <button
                    onClick={() => handleFilterChange("state", "")}
                    className="text-gray-500 hover:text-gray-700"
                    aria-label="Remove state filter"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              )}
              {filters.city && (
                <div className="bg-gray-100 text-gray-800 text-xs md:text-sm px-3 py-1.5 rounded-full flex items-center gap-2">
                  <span>City: {filters.city}</span>
                  <button
                    onClick={() => handleFilterChange("city", "")}
                    className="text-gray-500 hover:text-gray-700"
                    aria-label="Remove city filter"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              )}
              {filters.skill && (
                <div className="bg-gray-100 text-gray-800 text-xs md:text-sm px-3 py-1.5 rounded-full flex items-center gap-2">
                  <span>Skill: {filters.skill}</span>
                  <button
                    onClick={() => handleFilterChange("skill", "")}
                    className="text-gray-500 hover:text-gray-700"
                    aria-label="Remove skill filter"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              )}
              <Button
                variant="ghost"
                size="sm"
                onClick={clearFilters}
                className="text-xs md:text-sm h-7 px-3 text-gray-500 hover:text-gray-700"
              >
                Clear all
              </Button>
            </div>
          )}

          {/* Filter Controls */}
          {showDesktopFilters && (
            <div className="mb-8 p-6 bg-gray-50 rounded-xl">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {/* Search - Desktop only */}
                <div className="hidden md:block relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    type="text"
                    placeholder="Search professionals..."
                    className="pl-10 rounded-full"
                    value={filters.search}
                    onChange={(e) => handleFilterChange("search", e.target.value)}
                  />
                </div>

                {/* State Filter */}
                <Select
                  value={filters.state}
                  onValueChange={(value) => handleFilterChange("state", value === "all" ? "" : value)}
                >
                  <SelectTrigger className="rounded-full">
                    <SelectValue placeholder="All States" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All States</SelectItem>
                    {states.map((state) => (
                      <SelectItem key={state} value={state}>
                        {state}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                {/* City Filter */}
                <Select
                  value={filters.city}
                  onValueChange={(value) => handleFilterChange("city", value === "all" ? "" : value)}
                >
                  <SelectTrigger className="rounded-full">
                    <SelectValue placeholder="All Cities" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Cities</SelectItem>
                    {cities.map((city) => (
                      <SelectItem key={city} value={city}>
                        {city}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                {/* Skills Filter */}
                <Select
                  value={filters.skill}
                  onValueChange={(value) => handleFilterChange("skill", value === "all" ? "" : value)}
                >
                  <SelectTrigger className="rounded-full">
                    <SelectValue placeholder="All Skills" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Skills</SelectItem>
                    {allSkills.map((skill) => (
                      <SelectItem key={skill} value={skill}>
                        {skill}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Professionals Grid */}
      <section className="py-8 px-4">
        <div className="container">
          {filteredProfessionals.length > 0 ? (
            <div className="grid gap-8 sm:gap-10 md:gap-12 lg:gap-16">
              {filteredProfessionals.map((professional) => (
                <Card
                  key={professional.id}
                  className="overflow-hidden border-0 shadow-lg hover:shadow-xl transition-shadow duration-300"
                >
                  <div className="grid md:grid-cols-5 gap-4 sm:gap-6 md:gap-8 p-4 sm:p-6 md:p-8 lg:p-12">
                    {/* Image */}
                    <div className="md:col-span-2">
                      <div className="relative w-full aspect-[3/4] rounded-xl sm:rounded-2xl overflow-hidden bg-muted">
                        <Image
                          src={professional.image || "/placeholder.svg"}
                          alt={professional.name}
                          fill
                          className="object-cover"
                          sizes="(max-width: 640px) 100vw, (max-width: 768px) 100vw, 40vw"
                          priority
                        />
                      </div>
                    </div>

                    {/* Details */}
                    <div className="md:col-span-3 space-y-4 sm:space-y-6 md:space-y-8 overflow-hidden">
                      {/* Header */}
                      <div className="space-y-3 sm:space-y-4">
                        <div className="flex items-start justify-between gap-2 sm:gap-4">
                          <div className="flex-1 min-w-0">
                            <h2 className="font-playfair text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-balance break-words leading-tight">
                              {professional.name}
                            </h2>
                            <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 mt-2 sm:mt-3 text-muted-foreground text-sm sm:text-base">
                              <MapPin className="h-3 w-3 sm:h-4 sm:w-4 flex-shrink-0" />
                              <span className="break-words">
                                {professional.location}, {professional.state}
                              </span>
                            </div>
                          </div>
                          <div className="flex gap-1.5 sm:gap-2 flex-shrink-0">
                            {professional.instagram && (
                              <Link href={professional.instagram} target="_blank" rel="noopener noreferrer">
                                <Button
                                  size="icon"
                                  variant="outline"
                                  className="rounded-full bg-transparent h-8 w-8 sm:h-10 sm:w-10"
                                >
                                  <Instagram className="h-4 w-4 sm:h-5 sm:w-5" />
                                </Button>
                              </Link>
                            )}
                            {professional.facebook && (
                              <Link href={professional.facebook} target="_blank" rel="noopener noreferrer">
                                <Button
                                  size="icon"
                                  variant="outline"
                                  className="rounded-full bg-transparent h-8 w-8 sm:h-10 sm:w-10"
                                >
                                  <Facebook className="h-4 w-4 sm:h-5 sm:w-5" />
                                </Button>
                              </Link>
                            )}
                            {professional.youtube && (
                              <Link href={professional.youtube} target="_blank" rel="noopener noreferrer">
                                <Button
                                  size="icon"
                                  variant="outline"
                                  className="rounded-full bg-transparent h-8 w-8 sm:h-10 sm:w-10"
                                >
                                  <Youtube className="h-4 w-4 sm:h-5 sm:w-5" />
                                </Button>
                              </Link>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Quick Info */}
                      <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
                        <div className="space-y-2 min-w-0">
                          <div className="flex items-center gap-2 text-xs sm:text-sm font-medium text-muted-foreground">
                            <Briefcase className="h-3 w-3 sm:h-4 sm:w-4 flex-shrink-0" />
                            <span>Skills</span>
                          </div>
                          <div className="flex flex-wrap gap-1.5 sm:gap-2">
                            {professional.skills.map((skill) => (
                              <Badge key={skill} variant="secondary" className="text-xs sm:text-sm">
                                {skill}
                              </Badge>
                            ))}
                          </div>
                        </div>

                        <div className="space-y-2 min-w-0">
                          <div className="flex items-center gap-2 text-xs sm:text-sm font-medium text-muted-foreground">
                            <Calendar className="h-3 w-3 sm:h-4 sm:w-4 flex-shrink-0" />
                            <span>Experience</span>
                          </div>
                          <p className="text-sm font-medium">{professional.experience}</p>
                        </div>
                      </div>

                      {professional.email && (
                        <div className="space-y-2 min-w-0">
                          <div className="flex items-center gap-2 text-xs sm:text-sm font-medium text-muted-foreground">
                            <Mail className="h-3 w-3 sm:h-4 sm:w-4 flex-shrink-0" />
                            <span>Email</span>
                          </div>
                          <Link
                            href={`mailto:${professional.email}`}
                            className="text-xs sm:text-sm text-primary hover:underline block truncate"
                          >
                            {professional.email}
                          </Link>
                        </div>
                      )}

                      {professional.whatsapp && (
                        <div className="space-y-2 min-w-0">
                          <div className="flex items-center gap-2 text-xs sm:text-sm font-medium text-muted-foreground">
                            <Phone className="h-3 w-3 sm:h-4 sm:w-4 flex-shrink-0" />
                            <span>WhatsApp</span>
                          </div>
                          <Link
                            href={`https://wa.me/${professional.whatsapp}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs sm:text-sm text-primary hover:underline block break-all"
                          >
                            +91 {professional.whatsapp}
                          </Link>
                        </div>
                      )}

                      {/* Productions */}
                      <div className="space-y-2 sm:space-y-3">
                        <h3 className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                          Productions Worked With
                        </h3>
                        <div className="flex flex-wrap gap-2">
                          {professional.productions.map((prod, index) => (
                            <Badge
                              key={index}
                              variant="outline"
                              className="text-xs sm:text-sm px-2 sm:px-3 py-1 bg-muted/30"
                            >
                              {prod}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      {/* CTA */}
                      <div className="pt-2 sm:pt-4 flex flex-wrap gap-2 sm:gap-3">
                        {professional.workLink && (
                          <Link href={professional.workLink} target="_blank" rel="noopener noreferrer">
                            <Button className="rounded-full text-xs sm:text-sm h-9 sm:h-11">
                              <ExternalLink className="h-3 w-3 sm:h-4 sm:w-4 mr-1.5 sm:mr-2" />
                              View Work Portfolio
                            </Button>
                          </Link>
                        )}
                        {professional.auditionVideo && (
                          <Link href={professional.auditionVideo} target="_blank" rel="noopener noreferrer">
                            <Button className="rounded-full text-xs sm:text-sm h-9 sm:h-11">
                              <Video className="h-3 w-3 sm:h-4 sm:w-4 mr-1.5 sm:mr-2" />
                              Watch Audition Video
                            </Button>
                          </Link>
                        )}
                        {professional.whatsapp && (
                          <Link
                            href={`https://wa.me/${professional.whatsapp}`}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <Button
                              variant="outline"
                              className="rounded-full bg-transparent text-xs sm:text-sm h-9 sm:h-11"
                            >
                              <Phone className="h-3 w-3 sm:h-4 sm:w-4 mr-1.5 sm:mr-2" />
                              Contact via WhatsApp
                            </Button>
                          </Link>
                        )}
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-20 text-muted-foreground">
              No professionals found matching your criteria.
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
