"use client"

import { useState, useEffect, useMemo } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Filter, ChevronDown, ChevronUp, Star, X, Loader2 } from "lucide-react"
import WorkshopBanner from "@/components/workshop-banner"
import WorkshopCard from "@/components/workshop-card"
import MobileFilterDrawer from "@/components/mobile-filter-drawer"
import ActiveFilters from "@/components/active-filters"
import { useMediaQuery } from "@/hooks/use-media-query"

export default function WorkshopsContent() {
  // Map API workshop + sessions to UI card fields
  interface UIWorkshop {
    id: number
    title: string
    trainer: string
    institution: string
    location: string
    state: string
    date: string
    time: string
    description: string
    price: string
    featured?: boolean
    registrationLink: string
  }

  const [workshops, setWorkshops] = useState<UIWorkshop[]>([])
  const [loading, setLoading] = useState(true)

  function formatDateFromISO(dateStr?: string) {
    if (!dateStr) return "Date TBD"
    const d = new Date(dateStr)
    if (isNaN(d.getTime())) return dateStr
    return d.toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })
  }

  function mapApiWorkshop(w: any): UIWorkshop {
    const sessions = Array.isArray(w?.workshop_sessions) ? w.workshop_sessions : []
    // sort by date ascending and pick first session for card preview
    const first = sessions
      .slice()
      .sort((a: any, b: any) => String(a.session_date).localeCompare(String(b.session_date)))[0]

    const location = w?.location_mode === "online" ? "Online" : w?.city || "—"
    const state = w?.location_mode === "online" ? "All India" : w?.state || "-"

    const price = w?.fee_type === "paid" ? (w?.fee_amount ? `₹${w.fee_amount}` : "Paid") : "Free"

    // choose a sensible institution hint for the banner line
    const institution = w?.venue || w?.platform || (w?.city ? `City: ${w.city}` : "Institution")

    return {
      id: w.id,
      title: w.title || "Untitled Workshop",
      trainer: "Workshop Host",
      institution,
      location,
      state,
      date: first ? formatDateFromISO(first.session_date) : "Date TBD",
      time: first ? `${first.start_time || "Time TBD"}${first.duration ? ` • ${first.duration}` : ""}` : "Time TBD",
      description: w?.description || "",
      price,
      featured: Boolean(w?.verified),
      registrationLink: w?.registration_link || "#",
    }
  }

  useEffect(() => {
    let cancelled = false
    async function load() {
      try {
        setLoading(true)
        const res = await fetch("/api/workshops?status=published&limit=50")
        if (!res.ok) return
        const json = await res.json()
        const apiWorkshops = Array.isArray(json?.workshops) ? json.workshops : []
        const mapped: UIWorkshop[] = apiWorkshops.map(mapApiWorkshop)
        if (!cancelled) setWorkshops(mapped)
      } catch (e) {
        // silently fail to avoid UI structure changes
        console.error("Failed to load workshops", e)
      } finally {
        if (!cancelled) setLoading(false)
      }
    }
    load()
    return () => {
      cancelled = true
    }
  }, [])

  // Derive filter options from fetched data
  const states = useMemo(() => [...new Set(workshops.map((w) => w.state))].sort(), [workshops])
  const cities = useMemo(() => [...new Set(workshops.map((w) => w.location))].sort(), [workshops])
  const trainers = useMemo(() => [...new Set(workshops.map((w) => w.trainer))].sort(), [workshops])
  const institutions = useMemo(() => [...new Set(workshops.map((w) => w.institution))].sort(), [workshops])

  const [filters, setFilters] = useState({
    search: "",
    city: "",
    state: "",
    trainer: "",
    institution: "",
  })
  const [showDesktopFilters, setShowDesktopFilters] = useState(false)
  const isMobile = useMediaQuery("(max-width: 768px)")
  const isSmallMobile = useMediaQuery("(max-width: 640px)")

  const filteredWorkshops = workshops.filter((workshop) => {
    return (
      (filters.search === "" ||
        workshop.title.toLowerCase().includes(filters.search.toLowerCase()) ||
        workshop.description.toLowerCase().includes(filters.search.toLowerCase())) &&
      (filters.city === "" || workshop.location === filters.city) &&
      (filters.state === "" || workshop.state === filters.state) &&
      (filters.trainer === "" || workshop.trainer === filters.trainer) &&
      (filters.institution === "" || workshop.institution === filters.institution)
    )
  })

  const handleFilterChange = (key: string, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value === "all" ? "" : value }))
  }

  const clearFilters = () => {
    setFilters({
      search: "",
      city: "",
      state: "",
      trainer: "",
      institution: "",
    })
  }

  // Featured workshops
  const featuredWorkshops = workshops.filter((workshop) => workshop.featured)
  const hasActiveFilters = Object.values(filters).some((value) => value !== "")

  return (
    <div className="container py-6 md:py-16 px-3 sm:px-6">
      <WorkshopBanner />

      <div className="max-w-3xl mx-auto text-center mb-8 md:mb-12">
        <h1 className="font-playfair text-3xl md:text-5xl font-bold mb-3 text-gray-800">
          Workshops & <span className="text-primary">Training</span>
        </h1>
        <p className="text-gray-600 text-sm md:text-base max-w-xl mx-auto">
          Enhance your skills with professional workshops and training sessions led by renowned theater professionals
          from across the country.
        </p>
      </div>

      {/* Mobile Search */}
      {isMobile && (
        <div className="mb-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              type="text"
              placeholder="Search workshops"
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

      {/* Mobile Filter Button and Count */}
      <div className="mb-6 flex justify-between items-center">
        <h2 className="font-playfair text-lg md:text-xl font-bold">
          {hasActiveFilters
            ? `${filteredWorkshops.length} Workshop${filteredWorkshops.length !== 1 ? "s" : ""} Found`
            : "All Workshops"}
        </h2>

        <div className="flex items-center gap-2">
          <MobileFilterDrawer
            filters={filters}
            cities={cities}
            states={states}
            trainers={trainers}
            institutions={institutions}
            handleFilterChange={handleFilterChange}
            clearFilters={clearFilters}
          />

          {/* Desktop Filter Toggle */}
          <Button
            variant="outline"
            className="hidden md:flex items-center gap-2 rounded-full"
            onClick={() => setShowDesktopFilters(!showDesktopFilters)}
          >
            <Filter className="h-4 w-4" />
            Filters
            {showDesktopFilters ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
          </Button>
        </div>
      </div>

      {/* Active Filters Display */}
      <ActiveFilters filters={filters} handleFilterChange={handleFilterChange} clearFilters={clearFilters} />

      {/* Desktop Filters */}
      {showDesktopFilters && (
        <div className="hidden md:block mb-8 p-6 bg-gray-50 rounded-xl">
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                type="text"
                placeholder="Search workshops"
                className="pl-10 rounded-full"
                value={filters.search}
                onChange={(e) => handleFilterChange("search", e.target.value)}
              />
            </div>

            <Select value={filters.city} onValueChange={(value) => handleFilterChange("city", value)}>
              <SelectTrigger className="rounded-full">
                <SelectValue placeholder="City" />
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

            <Select value={filters.state} onValueChange={(value) => handleFilterChange("state", value)}>
              <SelectTrigger className="rounded-full">
                <SelectValue placeholder="State" />
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

            <Select value={filters.trainer} onValueChange={(value) => handleFilterChange("trainer", value)}>
              <SelectTrigger className="rounded-full">
                <SelectValue placeholder="Trainer" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Trainers</SelectItem>
                {trainers.map((trainer) => (
                  <SelectItem key={trainer} value={trainer}>
                    {trainer}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={filters.institution} onValueChange={(value) => handleFilterChange("institution", value)}>
              <SelectTrigger className="rounded-full">
                <SelectValue placeholder="Institution" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Institutions</SelectItem>
                {institutions.map((institution) => (
                  <SelectItem key={institution} value={institution}>
                    {institution}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      )}

      {featuredWorkshops.length > 0 && !hasActiveFilters && !isSmallMobile && (
        <div className="mb-10 md:mb-16">
          <div className="flex items-center mb-4 md:mb-6">
            <Star className="h-5 w-5 text-secondary mr-2 fill-secondary" />
            <h2 className="font-playfair text-xl md:text-2xl font-bold">Featured Workshops</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
            {featuredWorkshops.slice(0, 2).map((workshop) => (
              <WorkshopCard key={workshop.id} workshop={workshop} />
            ))}
          </div>
        </div>
      )}

      {/* Workshop Cards */}
      {loading && workshops.length === 0 ? (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="h-6 w-6 animate-spin text-primary mr-2" />
          <span className="text-gray-600">Loading workshops…</span>
        </div>
      ) : filteredWorkshops.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
          {filteredWorkshops.map((workshop) => (
            <WorkshopCard key={workshop.id} workshop={workshop} variant={isMobile ? "compact" : "full"} />
          ))}
        </div>
      ) : (
        <div className="text-center py-8 md:py-12 bg-gray-50 rounded-xl">
          <p className="text-gray-500 mb-4">No workshops match your current filters.</p>
          <Button onClick={clearFilters} variant="outline" className="rounded-full">
            Clear Filters
          </Button>
        </div>
      )}
    </div>
  )
}
