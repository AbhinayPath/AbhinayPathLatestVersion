"use client"
import { useMemo } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, MapPin, ExternalLink, Users, Clock, CheckCircle, Archive, AlertCircle, RefreshCw } from "lucide-react"
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

export default function EventsPage() {
  // Use the scalable events hook with automatic expiry detection
  const { 
    events, 
    eventsByMonth, 
    stats, 
    lastUpdated, 
    refresh, 
    closingSoon,
    isLoading 
  } = useEvents({
    refreshInterval: 5 * 60 * 1000, // Refresh every 5 minutes
    showExpired: true, // Show all events including expired
  })

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
  const monthOrder = MONTH_ORDER.filter(month => eventsByMonth[month])

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
            <CardTitle className={`text-lg sm:text-xl font-bold transition-colors leading-tight flex-1 ${isCompleted ? "text-gray-400" : isPast ? "text-gray-500" : "group-hover:text-[#7E1F2E]"}`}>
              {festival.name}
            </CardTitle>
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

          <div className="pt-3 mt-auto border-t">
            <Link href={festival.link} target="_blank" rel="noopener noreferrer">
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
                {isCompleted ? "View Past Festival" : isSubmissionsClosed ? "View Festival Info" : isPast ? "View Festival" : "View Festival Details"}
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

      {/* Festivals by Month */}
      <section className="py-12 sm:py-16">
        <div className="container px-4">
          <div className="max-w-7xl mx-auto space-y-16">
            {monthOrder.map((month) => {
              const monthEvents = eventsByMonth[month]
              if (!monthEvents) return null
              
              const openInMonth = monthEvents.filter(f => f.isOpen).length
              const closingSoonInMonth = monthEvents.filter(f => f.isClosingSoon).length
              const completedInMonth = monthEvents.filter(f => f.isEventCompleted).length
              const submissionsClosedInMonth = monthEvents.filter(f => f.isSubmissionsClosed).length
              const deadlinePassedInMonth = monthEvents.filter(f => f.isExpired && !f.isEventCompleted && !f.isSubmissionsClosed).length

              return (
                <div key={month} id={month.toLowerCase()}>
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
            })}
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
