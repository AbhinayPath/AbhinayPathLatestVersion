"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, Filter, ChevronDown, ChevronUp, X } from "lucide-react"
import WorkshopCard from "@/components/workshop-card"
import MobileFilterDrawer from "@/components/mobile-filter-drawer"
import ActiveFilters from "@/components/active-filters"
import { useMediaQuery } from "@/hooks/use-media-query"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { ShareWorkshopButton } from "@/components/share-workshop-button"
import { getWorkshopsData, isWorkshopExpired, type Workshop } from "@/lib/data/workshops-data"

// Get all workshops including expired ones
const workshops: Workshop[] = getWorkshopsData(true)

// Filter out expired workshops for display
const activeWorkshops = workshops.filter((workshop) => !isWorkshopExpired(workshop))

// Get unique countries, states, cities, and trainers for filters (from active workshops only)
const countries = [...new Set(activeWorkshops.map((workshop) => workshop.country))].filter(Boolean).sort()
const states = [...new Set(activeWorkshops.map((workshop) => workshop.state))].filter(Boolean).sort()
const cities = [...new Set(activeWorkshops.map((workshop) => workshop.location))].filter(Boolean).sort()
const trainers = [...new Set(activeWorkshops.map((workshop) => workshop.trainer))].filter(Boolean).sort()
const categories = [...new Set(activeWorkshops.map((workshop) => workshop.category))].filter(Boolean).sort()

// Filter logic
function filterWorkshops(
  searchQuery: string,
  selectedCountry: string,
  selectedState: string,
  selectedCity: string,
  selectedCategory: string
) {
  return activeWorkshops.filter((workshop) => {
    const matchesSearch =
      searchQuery === "" ||
      workshop.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      workshop.institution.toLowerCase().includes(searchQuery.toLowerCase()) ||
      workshop.trainer.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesCountry = selectedCountry === "all" || workshop.country === selectedCountry
    const matchesState = selectedState === "all" || workshop.state === selectedState
    const matchesCity = selectedCity === "all" || workshop.location === selectedCity
    const matchesCategory = selectedCategory === "all" || workshop.category === selectedCategory

    return matchesSearch && matchesCountry && matchesState && matchesCity && matchesCategory
  })
}

export default function WorkshopsContent() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCountry, setSelectedCountry] = useState("all")
  const [selectedState, setSelectedState] = useState("all")
  const [selectedCity, setSelectedCity] = useState("all")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [activeCategory, setActiveCategory] = useState("all")
  const [filters, setFilters] = useState({
    country: "all",
    state: "all",
    city: "all",
    category: "all",
  })
  const [showDesktopFilters, setShowDesktopFilters] = useState(true)
  const isMobile = useMediaQuery("(max-width: 1024px)")

  const filteredWorkshops = filterWorkshops(searchQuery, selectedCountry, selectedState, selectedCity, selectedCategory)
  const featuredWorkshops = filteredWorkshops.filter((w) => w.featured).slice(0, 3)

  const handleCountryChange = (value: string) => {
    setSelectedCountry(value)
    setSelectedState("all")
    setSelectedCity("all")
  }

  const handleStateChange = (value: string) => {
    setSelectedState(value)
    setSelectedCity("all")
  }

  const handleCityChange = (value: string) => {
    setSelectedCity(value)
  }

  const handleCategoryChange = (value: string) => {
    setSelectedCategory(value)
  }

  const handleClearFilters = () => {
    setSearchQuery("")
    setSelectedCountry("all")
    setSelectedState("all")
    setSelectedCity("all")
    setSelectedCategory("all")
    setActiveCategory("all")
  }

  const activeFiltersCount = [
    selectedCountry !== "all",
    selectedState !== "all",
    selectedCity !== "all",
    selectedCategory !== "all",
    searchQuery !== "",
  ].filter(Boolean).length

  const statesForCountry = selectedCountry === "all" ? states : [...new Set(activeWorkshops.filter((w) => w.country === selectedCountry).map((w) => w.state))].filter(Boolean).sort()

  const citiesForState = selectedState === "all" ? cities : [...new Set(activeWorkshops.filter((w) => w.state === selectedState).map((w) => w.location))].filter(Boolean).sort()

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-slate-900 to-slate-800 px-4 py-12 text-white lg:px-8 lg:py-16">
        <div className="mx-auto max-w-6xl">
          <h1 className="text-balance text-4xl font-bold lg:text-5xl">Workshops & Training Programs</h1>
          <p className="mt-4 text-lg text-slate-300">
            Discover theatre workshops, masterclasses, and training programs from leading institutions across India and beyond.
          </p>
        </div>
      </div>

      {/* Featured Workshops */}
      {featuredWorkshops.length > 0 && (
        <div className="border-b border-slate-200 bg-slate-50 px-4 py-12 dark:border-slate-800 dark:bg-slate-950 lg:px-8">
          <div className="mx-auto max-w-6xl">
            <h2 className="text-balance text-2xl font-bold lg:text-3xl">Featured Workshops</h2>
            <p className="mt-2 text-slate-600 dark:text-slate-400">Handpicked opportunities you shouldn&apos;t miss</p>
            <div className="mt-8 grid gap-6 lg:grid-cols-3">
              {featuredWorkshops.map((workshop) => (
                <Link key={workshop.id} href={`/workshops/${workshop.id}`} className="group">
                  <WorkshopCard workshop={workshop} />
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="px-4 py-8 lg:px-8 lg:py-12">
        <div className="mx-auto max-w-6xl">
          {/* Search and Filters Header */}
          <div className="mb-8 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
                  <Input
                    placeholder="Search by workshop name, institution, or trainer..."
                    className="pl-10"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>
              {isMobile && (
                <Button
                  variant="outline"
                  size="sm"
                  className="ml-2"
                  onClick={() => setShowDesktopFilters(!showDesktopFilters)}
                >
                  <Filter className="h-4 w-4" />
                </Button>
              )}
            </div>

            {/* Active Filters Display */}
            {activeFiltersCount > 0 && (
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-sm font-medium text-slate-600 dark:text-slate-400">Active filters:</span>
                {searchQuery && (
                  <Badge variant="secondary" className="cursor-pointer" onClick={() => setSearchQuery("")}>
                    Search: {searchQuery} <X className="ml-1 h-3 w-3" />
                  </Badge>
                )}
                {selectedCountry !== "all" && (
                  <Badge variant="secondary" className="cursor-pointer" onClick={() => setSelectedCountry("all")}>
                    {selectedCountry} <X className="ml-1 h-3 w-3" />
                  </Badge>
                )}
                {selectedState !== "all" && (
                  <Badge variant="secondary" className="cursor-pointer" onClick={() => setSelectedState("all")}>
                    {selectedState} <X className="ml-1 h-3 w-3" />
                  </Badge>
                )}
                {selectedCity !== "all" && (
                  <Badge variant="secondary" className="cursor-pointer" onClick={() => setSelectedCity("all")}>
                    {selectedCity} <X className="ml-1 h-3 w-3" />
                  </Badge>
                )}
                {selectedCategory !== "all" && (
                  <Badge variant="secondary" className="cursor-pointer" onClick={() => setSelectedCategory("all")}>
                    {selectedCategory} <X className="ml-1 h-3 w-3" />
                  </Badge>
                )}
                <Button variant="ghost" size="sm" onClick={handleClearFilters} className="text-xs">
                  Clear all
                </Button>
              </div>
            )}
          </div>

          {/* Desktop Filters */}
          {(!isMobile || showDesktopFilters) && (
            <div className="mb-8 space-y-4 rounded-lg border border-slate-200 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-900 lg:flex lg:gap-4 lg:space-y-0">
              <div className="flex-1">
                <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Country</label>
                <Select value={selectedCountry} onValueChange={handleCountryChange}>
                  <SelectTrigger className="mt-1">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Countries</SelectItem>
                    {countries.map((country) => (
                      <SelectItem key={country} value={country}>
                        {country}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="flex-1">
                <label className="text-sm font-medium text-slate-700 dark:text-slate-300">State</label>
                <Select value={selectedState} onValueChange={handleStateChange} disabled={selectedCountry === "all"}>
                  <SelectTrigger className="mt-1">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All States</SelectItem>
                    {statesForCountry.map((state) => (
                      <SelectItem key={state} value={state}>
                        {state}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="flex-1">
                <label className="text-sm font-medium text-slate-700 dark:text-slate-300">City</label>
                <Select value={selectedCity} onValueChange={handleCityChange} disabled={selectedState === "all"}>
                  <SelectTrigger className="mt-1">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Cities</SelectItem>
                    {citiesForState.map((city) => (
                      <SelectItem key={city} value={city}>
                        {city}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="flex-1">
                <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Category</label>
                <Select value={selectedCategory} onValueChange={handleCategoryChange}>
                  <SelectTrigger className="mt-1">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}

          {/* Results */}
          <div className="mb-6">
            <p className="text-sm text-slate-600 dark:text-slate-400">
              Showing {filteredWorkshops.length} of {activeWorkshops.length} workshops
            </p>
          </div>

          {filteredWorkshops.length > 0 ? (
            <div className="grid gap-6 lg:grid-cols-3">
              {filteredWorkshops.map((workshop) => (
                <Link key={workshop.id} href={`/workshops/${workshop.id}`} className="group">
                  <WorkshopCard workshop={workshop} />
                </Link>
              ))}
            </div>
          ) : (
            <div className="rounded-lg border border-slate-200 bg-slate-50 p-8 text-center dark:border-slate-800 dark:bg-slate-900">
              <p className="text-slate-600 dark:text-slate-400">No workshops found matching your filters.</p>
              <Button variant="ghost" onClick={handleClearFilters} className="mt-4">
                Clear filters and try again
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
