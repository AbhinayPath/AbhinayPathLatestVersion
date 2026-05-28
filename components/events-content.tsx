"use client"
import { useState, useMemo, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Calendar, MapPin, ExternalLink, Users, Clock, CheckCircle, Archive, AlertCircle, RefreshCw, Search, X, Filter, ChevronDown } from "lucide-react"
import Link from "next/link"
import { ShareEventButton } from "@/components/share-event-button"
import { useEvents } from "@/hooks/use-events"
import { 
  festivals, 
  STATUS_CONFIG, 
  getScaleColor,
  MONTH_ORDER,
  type EnhancedFestival 
} from "@/lib/data/events"
import type { EventStatus } from "@/lib/utils"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu"

export default function EventsPage() {
  // Search and filter state
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedStatuses, setSelectedStatuses] = useState<EventStatus[]>([])
  const [selectedScales, setSelectedScales] = useState<string[]>([])
  const [selectedMonth, setSelectedMonth] = useState<string | null>(null)
  const [selectedCountry, setSelectedCountry] = useState<string>("")
  
  // Refs for month navigation
  const monthRefs = useRef<Record<string, HTMLDivElement | null>>({})

  // Use the scalable events hook with automatic expiry detection
  const { 
    events: allEvents, 
    eventsByMonth: allEventsByMonth, 
    stats, 
    lastUpdated, 
    refresh, 
    closingSoon,
    isLoading,
    filterBy 
  } = useEvents({
    refreshInterval: 5 * 60 * 1000, // Refresh every 5 minutes
    showExpired: true, // Show all events including expired
  })

  // Apply filters
  const filteredEvents = useMemo(() => {
    return filterBy({
      status: selectedStatuses.length > 0 ? selectedStatuses : undefined,
      scale: selectedScales.length > 0 ? selectedScales : undefined,
      month: selectedMonth || undefined,
      country: selectedCountry || undefined,
      searchQuery: searchQuery || undefined,
      showExpired: true,
    })
  }, [filterBy, selectedStatuses, selectedScales, selectedMonth, selectedCountry, searchQuery])

  // Group filtered events by month
  const filteredEventsByMonth = useMemo(() => {
    return filteredEvents.reduce((acc, event) => {
      if (!acc[event.month]) {
        acc[event.month] = []
      }
      acc[event.month].push(event)
      return acc
    }, {} as Record<string, EnhancedFestival[]>)
  }, [filteredEvents])

  // Get unique values for filters
  const uniqueScales = useMemo(() => {
    const scales = new Set(allEvents.map(e => e.scale))
    return Array.from(scales).sort()
  }, [allEvents])

  const uniqueCountries = useMemo(() => {
    const countries = new Set(allEvents.map(e => e.country))
    return Array.from(countries).sort()
  }, [allEvents])

  const availableMonths = useMemo(() => {
    return MONTH_ORDER.filter(month => filteredEventsByMonth[month])
  }, [filteredEventsByMonth])

  // Scroll to month
  const scrollToMonth = (month: string) => {
    const element = monthRefs.current[month]
    if (element) {
      const headerOffset = 100
      const elementPosition = element.getBoundingClientRect().top
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      })
    }
    setSelectedMonth(null) // Reset filter after scrolling
  }

  // Clear all filters
  const clearFilters = () => {
    setSearchQuery("")
    setSelectedStatuses([])
    setSelectedScales([])
    setSelectedMonth(null)
    setSelectedCountry("")
  }

  const hasActiveFilters = searchQuery || selectedStatuses.length > 0 || selectedScales.length > 0 || selectedMonth || selectedCountry

  // Get status badge configuration
  const getStatusBadge = (status: EventStatus) => {
    const iconMap = {
      open: CheckCircle,
      "closing-soon": AlertCircle,
      upcoming: Clock,
      past: Archive,
    }
    const config = STATUS_CONFIG[status] || STATUS_CONFIG.past
    return {
      ...config,
      icon: iconMap[status] || Archive,
    }
  }

  // Month order for display
  const monthOrder = MONTH_ORDER.filter(month => filteredEventsByMonth[month])

  const FestivalCard = ({ festival }: { festival: EnhancedFestival }) => {
    const statusBadge = getStatusBadge(festival.computedStatus)
    const StatusIcon = statusBadge.icon
    const isPast = festival.isExpired
    const isClosingSoon = festival.isClosingSoon
    const isCompleted = festival.isEventCompleted
    const isSubmissionsClosed = festival.isSubmissionsClosed

    return (
      <Card
        className={`group transition-all duration-300 border-2 h-full flex flex-col relative ${
          isCompleted
            ? "opacity-50 bg-gray-50 border-gray-200 hover:opacity-70"
            : isSubmissionsClosed
              ? "opacity-75 bg-gray-50/50 border-amber-200/60 hover:opacity-90 hover:shadow-lg"
              : festival.featured
                ? "border-[#7E1F2E]/30 bg-gradient-to-br from-amber-50/50 to-white hover:shadow-xl"
                : isClosingSoon
                  ? "border-orange-300 bg-gradient-to-br from-orange-50/50 to-white hover:shadow-xl"
                  : "hover:border-[#7E1F2E]/20 hover:shadow-xl"
        }`}
      >
        {/* Event Completed Banner */}
        {isCompleted && (
          <div className="absolute top-0 left-0 right-0 bg-gray-600 text-white text-xs font-semibold py-1.5 px-3 text-center z-10 rounded-t-lg flex items-center justify-center gap-1.5" role="status">
            <Archive className="h-3 w-3" />
            <span>Event Completed</span>
          </div>
        )}

        {/* Submissions Closed Banner (deadline passed but event still upcoming) */}
        {isSubmissionsClosed && (
          <div className="absolute top-0 left-0 right-0 bg-amber-600 text-white text-xs font-semibold py-1.5 px-3 text-center z-10 rounded-t-lg flex items-center justify-center gap-1.5" role="status">
            <Clock className="h-3 w-3" />
            <span>Submissions Closed</span>
          </div>
        )}

        {/* Deadline Passed (can't parse event dates, generic closed state) */}
        {isPast && !isCompleted && !isSubmissionsClosed && (
          <div className="absolute top-0 left-0 right-0 bg-gray-500 text-white text-xs font-semibold py-1.5 px-3 text-center z-10 rounded-t-lg flex items-center justify-center gap-1.5" role="status">
            <Archive className="h-3 w-3" />
            <span>Deadline Passed</span>
          </div>
        )}
        
        {/* Closing Soon Banner */}
        {isClosingSoon && festival.daysUntilDeadline !== null && (
          <div className="absolute top-0 left-0 right-0 bg-orange-500 text-white text-xs font-semibold py-1.5 px-3 text-center z-10 rounded-t-lg animate-pulse flex items-center justify-center gap-1.5" role="status">
            <AlertCircle className="h-3 w-3" />
            <span>
              {festival.daysUntilDeadline === 0 
                ? "Last Day to Apply!" 
                : festival.daysUntilDeadline === 1 
                  ? "1 Day Left!" 
                  : `${festival.daysUntilDeadline} Days Left!`}
            </span>
          </div>
        )}

        <CardHeader className={`pb-4 flex-shrink-0 ${isPast || isClosingSoon ? "pt-10" : ""}`}>
          {festival.featured && !isPast && (
            <div className="mb-3">
              <Badge className="bg-[#7E1F2E] text-white text-xs px-3 py-1 font-semibold">FEATURED FESTIVAL</Badge>
            </div>
          )}
          {festival.isFellowship && !isPast && (
            <div className="mb-3">
              <Badge className="bg-purple-600 text-white text-xs px-3 py-1 font-semibold">FELLOWSHIP PROGRAM</Badge>
            </div>
          )}
          <div className="flex items-start justify-between gap-3 mb-3">
            <Link href={`/events/${festival.id}`}>
              <CardTitle className={`text-lg sm:text-xl font-bold transition-colors leading-tight flex-1 hover:text-[#7E1F2E] cursor-pointer ${isCompleted ? "text-gray-400" : isPast ? "text-gray-500" : "group-hover:text-[#7E1F2E]"}`}>
                {festival.name}
              </CardTitle>
            </Link>
            <ShareEventButton 
              eventId={festival.id} 
              eventName={festival.name} 
              shareType="event" 
              variant="icon"
              size="sm"
            />
          </div>
          <div className="flex flex-wrap gap-2">
            <Badge className={`${statusBadge.color} text-xs flex items-center gap-1 px-2 py-1 border`}>
              <StatusIcon className="h-3 w-3" />
              {isCompleted ? "Event Completed" : isSubmissionsClosed ? "Submissions Closed" : statusBadge.label}
            </Badge>
            <Badge className={`${getScaleColor(festival.scale)} text-xs ${isPast ? "opacity-60" : ""}`}>{festival.scale}</Badge>
            {isCompleted && (
              <Badge className="bg-gray-100 text-gray-500 text-xs border border-gray-200">Past Event</Badge>
            )}
            {isSubmissionsClosed && (
              <Badge className="bg-amber-50 text-amber-700 text-xs border border-amber-200">Event Upcoming</Badge>
            )}
          </div>
        </CardHeader>

        <CardContent className="space-y-4 flex-grow flex flex-col">
          <div className={`space-y-3 text-sm ${isCompleted ? "text-gray-400" : isPast ? "text-gray-500" : "text-gray-600"}`}>
            <div className="flex items-start gap-3">
              <MapPin className={`h-4 w-4 shrink-0 mt-0.5 ${isCompleted ? "text-gray-300" : isPast ? "text-gray-400" : "text-[#7E1F2E]"}`} />
              <div>
                <span className="font-semibold">
                  {festival.city}, {festival.country}
                </span>
                <div className={`text-xs mt-0.5 ${isCompleted ? "text-gray-400" : "text-gray-500"}`}>{festival.languages}</div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Calendar className={`h-4 w-4 shrink-0 ${isCompleted ? "text-gray-300" : isPast ? "text-gray-400" : "text-[#7E1F2E]"}`} />
              <div>
                <span className={`font-semibold ${isCompleted ? "line-through" : ""}`}>{festival.dates}</span>
                <div className={`text-xs mt-0.5 ${isCompleted ? "text-gray-400" : "text-gray-500"}`}>Duration: {festival.duration}</div>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Clock className={`h-4 w-4 shrink-0 mt-0.5 ${isCompleted ? "text-gray-300" : isPast ? "text-gray-400" : isClosingSoon ? "text-orange-500" : "text-[#7E1F2E]"}`} />
              <div>
                <span className={`text-xs font-semibold ${isCompleted ? "text-gray-400" : isPast ? "text-gray-500" : isClosingSoon ? "text-orange-700" : "text-gray-700"}`}>
                  Submission Deadline:
                </span>
                <div className={`text-sm mt-0.5 ${isPast ? "line-through text-gray-400" : isClosingSoon ? "text-orange-700 font-semibold" : ""}`}>
                  {festival.submissionDeadline}
                </div>
                {!isPast && festival.daysUntilDeadline !== null && festival.daysUntilDeadline > 0 && festival.daysUntilDeadline <= 14 && (
                  <div className={`text-xs mt-1 font-medium ${isClosingSoon ? "text-orange-600" : "text-green-600"}`}>
                    {festival.daysUntilDeadline} {festival.daysUntilDeadline === 1 ? "day" : "days"} remaining
                  </div>
                )}
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Users className={`h-4 w-4 shrink-0 mt-0.5 ${isCompleted ? "text-gray-300" : isPast ? "text-gray-400" : "text-[#7E1F2E]"}`} />
              <div className="text-xs">
                <span className="font-semibold">Eligibility: </span>
                {festival.eligibility}
              </div>
            </div>
          </div>

          <p className={`text-sm leading-relaxed line-clamp-4 flex-grow ${isCompleted ? "text-gray-400" : isPast ? "text-gray-500" : "text-gray-600"}`}>{festival.description}</p>

          {festival.visaSupport && !isPast && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
              <p className="text-xs text-blue-800 font-semibold flex items-center gap-2">
                <CheckCircle className="h-4 w-4" />
                Visa Support: {festival.visaSupport}
              </p>
            </div>
          )}

          {festival.travelSupport && !isPast && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-3">
              <p className="text-xs text-green-800 font-semibold flex items-center gap-2">
                <CheckCircle className="h-4 w-4" />
                Travel Support: {festival.travelSupport}
              </p>
            </div>
          )}

          <div className="pt-3 mt-auto border-t flex gap-2">
            <Link href={`/events/${festival.id}`} className="flex-1">
              <Button 
                variant="outline"
                className={`w-full text-sm py-2.5 border-[#7E1F2E] text-[#7E1F2E] hover:bg-[#7E1F2E]/10 ${
                  isCompleted ? "border-gray-300 text-gray-500 hover:bg-gray-100" : ""
                }`}
              >
                View Details
              </Button>
            </Link>
            <Link href={festival.link} target="_blank" rel="noopener noreferrer" className="flex-1">
              <Button 
                className={`w-full text-sm py-2.5 ${
                  isCompleted 
                    ? "bg-gray-300 hover:bg-gray-400 text-gray-600"
                    : isSubmissionsClosed
                      ? "bg-amber-600 hover:bg-amber-700 text-white"
                      : isPast 
                        ? "bg-gray-400 hover:bg-gray-500 text-white" 
                        : "bg-[#7E1F2E] hover:bg-[#6a1a27] text-white"
                }`}
              >
                {isCompleted ? "View" : isPast ? "View" : "Apply"}
                <ExternalLink className="h-4 w-4 ml-2" />
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-[#7E1F2E] to-[#A02A3A] text-white py-12 sm:py-16 lg:py-20">
        <div className="container px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="font-playfair text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Theatre Festivals 2026
            </h1>
            <p className="text-lg sm:text-xl lg:text-2xl opacity-90 mb-8 leading-relaxed">
              Discover national and international theatre festivals across India and beyond
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 sm:gap-4 text-center max-w-4xl mx-auto">
              <div className="bg-white/10 rounded-lg p-4 backdrop-blur-sm">
                <div className="text-2xl sm:text-3xl lg:text-4xl font-bold">{stats.total}</div>
                <div className="text-sm opacity-80">Festivals</div>
              </div>
              <div className="bg-white/10 rounded-lg p-4 backdrop-blur-sm">
                <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-green-300">
                  {stats.active}
                </div>
                <div className="text-sm opacity-80">Active</div>
              </div>
              <div className="bg-white/10 rounded-lg p-4 backdrop-blur-sm">
                <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-green-200">
                  {stats.open}
                </div>
                <div className="text-sm opacity-80">Open Now</div>
              </div>
              <div className="bg-white/10 rounded-lg p-4 backdrop-blur-sm">
                <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-orange-300">
                  {stats.closingSoon}
                </div>
                <div className="text-sm opacity-80">Closing Soon</div>
              </div>
              <div className="bg-white/10 rounded-lg p-4 backdrop-blur-sm col-span-2 sm:col-span-1">
                <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-300">
                  {stats.past}
                </div>
                <div className="text-sm opacity-80">Closed</div>
              </div>
            </div>
            
            {/* Last Updated & Refresh */}
            <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3 text-sm opacity-80">
              {lastUpdated && (
                <span>
                  Last checked: {lastUpdated.toLocaleTimeString()}
                </span>
              )}
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={refresh}
                className="text-white hover:bg-white/20"
              >
                <RefreshCw className={`h-4 w-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
                Refresh Status
              </Button>
            </div>

            {/* Closing Soon Alert */}
            {closingSoon.length > 0 && (
              <div className="mt-6 bg-orange-500/20 border border-orange-400/30 rounded-lg p-4 max-w-2xl mx-auto">
                <div className="flex items-center gap-2 text-orange-100 font-semibold mb-2">
                  <AlertCircle className="h-5 w-5" />
                  {closingSoon.length} event{closingSoon.length !== 1 ? 's' : ''} closing soon!
                </div>
                <div className="text-sm text-orange-100/80">
                  {closingSoon.slice(0, 3).map(e => (
                    <span key={e.id} className="inline-block mr-3">
                      {e.name.split(' ').slice(0, 3).join(' ')}... ({e.daysUntilDeadline}d)
                    </span>
                  ))}
                </div>
              </div>
            )}

            <div className="mt-8 flex justify-center">
              <ShareEventButton shareType="page" variant="button" />
            </div>
          </div>
        </div>
      </section>

      {/* Search, Filter & Month Navigation */}
      <section className="py-6 bg-white border-b sticky top-0 z-20 shadow-sm">
        <div className="container px-4">
          <div className="max-w-7xl mx-auto space-y-4">
            {/* Search Bar */}
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Search festivals by name, city, or description..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-10"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery("")}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    <X className="h-4 w-4" />
                  </button>
                )}
              </div>
              
              {/* Filter Dropdowns */}
              <div className="flex flex-wrap gap-2">
                {/* Status Filter */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm" className="gap-2">
                      <Filter className="h-4 w-4" />
                      Status
                      {selectedStatuses.length > 0 && (
                        <Badge variant="secondary" className="ml-1 h-5 w-5 p-0 flex items-center justify-center text-xs">
                          {selectedStatuses.length}
                        </Badge>
                      )}
                      <ChevronDown className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56">
                    <DropdownMenuLabel>Filter by Status</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    {(["open", "closing-soon", "upcoming", "past"] as EventStatus[]).map(status => (
                      <DropdownMenuCheckboxItem
                        key={status}
                        checked={selectedStatuses.includes(status)}
                        onCheckedChange={(checked) => {
                          setSelectedStatuses(prev => 
                            checked 
                              ? [...prev, status]
                              : prev.filter(s => s !== status)
                          )
                        }}
                      >
                        <Badge className={`${STATUS_CONFIG[status].color} text-xs mr-2`}>
                          {STATUS_CONFIG[status].shortLabel}
                        </Badge>
                      </DropdownMenuCheckboxItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>

                {/* Scale Filter */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm" className="gap-2">
                      Scale
                      {selectedScales.length > 0 && (
                        <Badge variant="secondary" className="ml-1 h-5 w-5 p-0 flex items-center justify-center text-xs">
                          {selectedScales.length}
                        </Badge>
                      )}
                      <ChevronDown className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-48">
                    <DropdownMenuLabel>Filter by Scale</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    {uniqueScales.map(scale => (
                      <DropdownMenuCheckboxItem
                        key={scale}
                        checked={selectedScales.includes(scale)}
                        onCheckedChange={(checked) => {
                          setSelectedScales(prev => 
                            checked 
                              ? [...prev, scale]
                              : prev.filter(s => s !== scale)
                          )
                        }}
                      >
                        <Badge className={`${getScaleColor(scale)} text-xs mr-2`}>
                          {scale}
                        </Badge>
                      </DropdownMenuCheckboxItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>

                {/* Country Filter */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm" className="gap-2">
                      Country
                      {selectedCountry && (
                        <Badge variant="secondary" className="ml-1 text-xs">
                          1
                        </Badge>
                      )}
                      <ChevronDown className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56 max-h-64 overflow-y-auto">
                    <DropdownMenuLabel>Filter by Country</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuCheckboxItem
                      checked={selectedCountry === ""}
                      onCheckedChange={() => setSelectedCountry("")}
                    >
                      All Countries
                    </DropdownMenuCheckboxItem>
                    {uniqueCountries.map(country => (
                      <DropdownMenuCheckboxItem
                        key={country}
                        checked={selectedCountry === country}
                        onCheckedChange={(checked) => {
                          setSelectedCountry(checked ? country : "")
                        }}
                      >
                        {country}
                      </DropdownMenuCheckboxItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>

                {/* Clear Filters */}
                {hasActiveFilters && (
                  <Button variant="ghost" size="sm" onClick={clearFilters} className="text-red-600 hover:text-red-700 hover:bg-red-50">
                    <X className="h-4 w-4 mr-1" />
                    Clear
                  </Button>
                )}
              </div>
            </div>

            {/* Month Navigation */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-sm font-medium text-gray-600 mr-2">Jump to:</span>
              {MONTH_ORDER.filter(month => allEventsByMonth[month]).map(month => (
                <Button
                  key={month}
                  variant={selectedMonth === month ? "default" : "outline"}
                  size="sm"
                  onClick={() => scrollToMonth(month)}
                  className={`text-xs ${
                    selectedMonth === month 
                      ? "bg-[#7E1F2E] hover:bg-[#6a1a27]" 
                      : "hover:border-[#7E1F2E] hover:text-[#7E1F2E]"
                  }`}
                >
                  {month.slice(0, 3)}
                </Button>
              ))}
            </div>

            {/* Active Filters Display */}
            {hasActiveFilters && (
              <div className="flex flex-wrap items-center gap-2 text-sm">
                <span className="text-gray-500">Showing {filteredEvents.length} of {allEvents.length} events:</span>
                {searchQuery && (
                  <Badge variant="secondary" className="gap-1">
                    Search: {searchQuery}
                    <button onClick={() => setSearchQuery("")} className="ml-1 hover:text-red-600">
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                )}
                {selectedStatuses.map(status => (
                  <Badge key={status} variant="secondary" className="gap-1">
                    {STATUS_CONFIG[status].shortLabel}
                    <button 
                      onClick={() => setSelectedStatuses(prev => prev.filter(s => s !== status))} 
                      className="ml-1 hover:text-red-600"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                ))}
                {selectedScales.map(scale => (
                  <Badge key={scale} variant="secondary" className="gap-1">
                    {scale}
                    <button 
                      onClick={() => setSelectedScales(prev => prev.filter(s => s !== scale))} 
                      className="ml-1 hover:text-red-600"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                ))}
                {selectedCountry && (
                  <Badge variant="secondary" className="gap-1">
                    {selectedCountry}
                    <button onClick={() => setSelectedCountry("")} className="ml-1 hover:text-red-600">
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                )}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Festivals by Month */}
      <section className="py-12 sm:py-16">
        <div className="container px-4">
          <div className="max-w-7xl mx-auto space-y-16">
            {filteredEvents.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-gray-400 mb-4">
                  <Search className="h-16 w-16 mx-auto" />
                </div>
                <h3 className="text-xl font-semibold text-gray-600 mb-2">No events found</h3>
                <p className="text-gray-500 mb-4">Try adjusting your search or filter criteria</p>
                <Button variant="outline" onClick={clearFilters}>
                  Clear All Filters
                </Button>
              </div>
            ) : (
              monthOrder.map((month) => {
                const monthEvents = filteredEventsByMonth[month]
                if (!monthEvents) return null
                
                const openInMonth = monthEvents.filter(f => f.isOpen).length
                const closingSoonInMonth = monthEvents.filter(f => f.isClosingSoon).length
                const completedInMonth = monthEvents.filter(f => f.isEventCompleted).length
                const submissionsClosedInMonth = monthEvents.filter(f => f.isSubmissionsClosed).length
                const deadlinePassedInMonth = monthEvents.filter(f => f.isExpired && !f.isEventCompleted && !f.isSubmissionsClosed).length

                return (
                  <div 
                    key={month} 
                    id={month.toLowerCase()}
                    ref={(el) => { monthRefs.current[month] = el }}
                  >
                    <div className="mb-8">
                      <h2 className="text-3xl sm:text-4xl font-bold font-playfair text-gray-800 mb-2 flex items-center gap-3">
                        <span className="text-[#7E1F2E]">{month} 2026</span>
                      </h2>
                      <div className="flex flex-wrap items-center gap-4 text-gray-600">
                        <span>
                          {monthEvents.length} festival{monthEvents.length !== 1 ? "s" : ""}
                        </span>
                        {openInMonth > 0 && (
                          <Badge className="bg-green-100 text-green-800 text-xs border border-green-200">
                            {openInMonth} accepting submissions
                          </Badge>
                        )}
                        {closingSoonInMonth > 0 && (
                          <Badge className="bg-orange-100 text-orange-800 text-xs border border-orange-200 animate-pulse">
                            {closingSoonInMonth} closing soon
                          </Badge>
                        )}
                        {submissionsClosedInMonth > 0 && (
                          <Badge className="bg-amber-50 text-amber-700 text-xs border border-amber-200">
                            {submissionsClosedInMonth} submissions closed
                          </Badge>
                        )}
                        {completedInMonth > 0 && (
                          <Badge className="bg-gray-100 text-gray-500 text-xs border border-gray-200">
                            {completedInMonth} completed
                          </Badge>
                        )}
                        {deadlinePassedInMonth > 0 && (
                          <Badge className="bg-gray-100 text-gray-600 text-xs border border-gray-200">
                            {deadlinePassedInMonth} deadline passed
                          </Badge>
                        )}
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Events are pre-sorted by the useEvents hook */}
                      {monthEvents.map((festival) => (
                        <FestivalCard key={festival.id} festival={festival} />
                      ))}
                    </div>
                  </div>
                )
              })
            )}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 bg-gradient-to-r from-[#7E1F2E] to-[#A02A3A] text-white">
        <div className="container px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h3 className="text-2xl sm:text-3xl font-bold mb-4">Want to showcase your work?</h3>
            <p className="text-lg opacity-90 mb-6">Stay updated with festival submission deadlines and opportunities</p>
            <Link href="/contact">
              <Button size="lg" className="bg-white text-[#7E1F2E] hover:bg-gray-100 font-semibold px-8 py-6 text-lg">
                Get in Touch
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
