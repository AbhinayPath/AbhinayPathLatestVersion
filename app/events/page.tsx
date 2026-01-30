"use client"
import { useMemo } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, MapPin, ExternalLink, Users, Clock, CheckCircle, Archive, Ticket, FileText, Gift, AlertTriangle, Mail, Phone, User, AlertCircle, RefreshCw } from "lucide-react"
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

    return (
      <Card
        className={`group transition-all duration-300 border-2 h-full flex flex-col relative ${
          isPast 
            ? "opacity-60 bg-gray-50 border-gray-200 hover:opacity-80" 
            : festival.featured
              ? "border-[#7E1F2E]/30 bg-gradient-to-br from-amber-50/50 to-white hover:shadow-xl"
              : isClosingSoon
                ? "border-orange-300 bg-gradient-to-br from-orange-50/50 to-white hover:shadow-xl"
                : "hover:border-[#7E1F2E]/20 hover:shadow-xl"
        }`}
      >
        {/* Expired Overlay Banner */}
        {isPast && (
          <div className="absolute top-0 left-0 right-0 bg-gray-700 text-white text-xs font-semibold py-1.5 px-3 text-center z-10 rounded-t-lg">
            <Archive className="h-3 w-3 inline mr-1.5" />
            Submissions Closed
          </div>
        )}
        
        {/* Closing Soon Banner */}
        {isClosingSoon && festival.daysUntilDeadline !== null && (
          <div className="absolute top-0 left-0 right-0 bg-orange-500 text-white text-xs font-semibold py-1.5 px-3 text-center z-10 rounded-t-lg animate-pulse">
            <AlertCircle className="h-3 w-3 inline mr-1.5" />
            {festival.daysUntilDeadline === 0 
              ? "Last Day to Apply!" 
              : festival.daysUntilDeadline === 1 
                ? "1 Day Left!" 
                : `${festival.daysUntilDeadline} Days Left!`}
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
            <CardTitle className={`text-lg sm:text-xl font-bold transition-colors leading-tight flex-1 ${isPast ? "text-gray-500" : "group-hover:text-[#7E1F2E]"}`}>
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
              {statusBadge.label}
            </Badge>
            <Badge className={`${getScaleColor(festival.scale)} text-xs ${isPast ? "opacity-60" : ""}`}>{festival.scale}</Badge>
          </div>
        </CardHeader>

        <CardContent className="space-y-4 flex-grow flex flex-col">
          <div className={`space-y-3 text-sm ${isPast ? "text-gray-500" : "text-gray-600"}`}>
            <div className="flex items-start gap-3">
              <MapPin className={`h-4 w-4 shrink-0 mt-0.5 ${isPast ? "text-gray-400" : "text-[#7E1F2E]"}`} />
              <div>
                <span className="font-semibold">
                  {festival.city}, {festival.country}
                </span>
                <div className="text-xs text-gray-500 mt-0.5">{festival.languages}</div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Calendar className={`h-4 w-4 shrink-0 ${isPast ? "text-gray-400" : "text-[#7E1F2E]"}`} />
              <div>
                <span className="font-semibold">{festival.dates}</span>
                <div className="text-xs text-gray-500 mt-0.5">Duration: {festival.duration}</div>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Clock className={`h-4 w-4 shrink-0 mt-0.5 ${isPast ? "text-gray-400" : isClosingSoon ? "text-orange-500" : "text-[#7E1F2E]"}`} />
              <div>
                <span className={`text-xs font-semibold ${isPast ? "text-gray-500" : isClosingSoon ? "text-orange-700" : "text-gray-700"}`}>
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
              <Users className={`h-4 w-4 shrink-0 mt-0.5 ${isPast ? "text-gray-400" : "text-[#7E1F2E]"}`} />
              <div className="text-xs">
                <span className="font-semibold">Eligibility: </span>
                {festival.eligibility}
              </div>
            </div>
          </div>

          <p className={`text-sm leading-relaxed line-clamp-4 flex-grow ${isPast ? "text-gray-500" : "text-gray-600"}`}>{festival.description}</p>

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
                  isPast 
                    ? "bg-gray-400 hover:bg-gray-500 text-white" 
                    : "bg-[#7E1F2E] hover:bg-[#6a1a27] text-white"
                }`}
              >
                {isPast ? "View Past Festival" : "View Festival Details"}
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
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center max-w-3xl mx-auto">
              <div className="bg-white/10 rounded-lg p-4 backdrop-blur-sm">
                <div className="text-2xl sm:text-3xl lg:text-4xl font-bold">{stats.total}</div>
                <div className="text-sm opacity-80">Festivals</div>
              </div>
              <div className="bg-white/10 rounded-lg p-4 backdrop-blur-sm">
                <div className="text-2xl sm:text-3xl lg:text-4xl font-bold">
                  {stats.active}
                </div>
                <div className="text-sm opacity-80">Active</div>
              </div>
              <div className="bg-white/10 rounded-lg p-4 backdrop-blur-sm">
                <div className="text-2xl sm:text-3xl lg:text-4xl font-bold">
                  {stats.open}
                </div>
                <div className="text-sm opacity-80">Open Now</div>
              </div>
              <div className="bg-white/10 rounded-lg p-4 backdrop-blur-sm">
                <div className="text-2xl sm:text-3xl lg:text-4xl font-bold">
                  {stats.closingSoon}
                </div>
                <div className="text-sm opacity-80">Closing Soon</div>
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

      {/* Featured Festival - Natsamrat Natya Utsav 2026 */}
      <section className="py-12 sm:py-16 bg-gradient-to-b from-amber-50/50 to-white">
        <div className="container px-4">
          <div className="max-w-5xl mx-auto">
            {/* Festival Header */}
            <div className="text-center mb-10">
              <Badge className="bg-[#7E1F2E] text-white text-sm px-4 py-1.5 mb-4">Featured Festival</Badge>
              <h2 className="font-playfair text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-3">
                Natsamrat Natya Utsav 2026
              </h2>
              <p className="text-lg text-[#7E1F2E] font-medium italic">
                Dedicated to Padmashree Late Shri D. P. Sinha Ji
              </p>
              <p className="mt-4 text-gray-600 max-w-3xl mx-auto leading-relaxed">
                Abhinaypath brings to you an exciting opportunity for theatre directors and groups from Delhi & NCR to be part of Natsamrat Natya Utsav 2026 — a curated theatre festival celebrating meaningful stage work in an intimate studio setting.
              </p>
            </div>

            {/* Festival Details Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              {/* Venue Card */}
              <Card className="border-2 border-[#7E1F2E]/10 hover:border-[#7E1F2E]/30 transition-colors">
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-3 text-lg font-bold text-gray-900">
                    <div className="p-2 bg-[#7E1F2E]/10 rounded-lg">
                      <MapPin className="h-5 w-5 text-[#7E1F2E]" />
                    </div>
                    Venue
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <p className="font-semibold text-gray-900">LTG Auditorium – The Blank Canvas Studio</p>
                  <p className="text-sm text-gray-600">Copernicus Marg, Mandi House, New Delhi – 110001</p>
                  <div className="flex flex-wrap gap-3 pt-2">
                    <div className="flex items-center gap-2 text-sm text-gray-700">
                      <Ticket className="h-4 w-4 text-[#7E1F2E]" />
                      <span>Ticketed Entry</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-700">
                      <Users className="h-4 w-4 text-[#7E1F2E]" />
                      <span>Capacity: 50 (Studio Format)</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Festival Dates Card */}
              <Card className="border-2 border-[#7E1F2E]/10 hover:border-[#7E1F2E]/30 transition-colors">
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-3 text-lg font-bold text-gray-900">
                    <div className="p-2 bg-[#7E1F2E]/10 rounded-lg">
                      <Calendar className="h-5 w-5 text-[#7E1F2E]" />
                    </div>
                    Festival Dates
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-3">
                    {["28 February 2026", "4 March 2026", "7 March 2026", "8 March 2026"].map((date) => (
                      <div key={date} className="bg-gray-50 rounded-lg px-3 py-2 text-center">
                        <span className="text-sm font-medium text-gray-800">{date}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Who Can Apply Card */}
              <Card className="border-2 border-[#7E1F2E]/10 hover:border-[#7E1F2E]/30 transition-colors">
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-3 text-lg font-bold text-gray-900">
                    <div className="p-2 bg-[#7E1F2E]/10 rounded-lg">
                      <Users className="h-5 w-5 text-[#7E1F2E]" />
                    </div>
                    Who Can Apply?
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p className="font-medium text-gray-800">Theatre Directors & Groups based in Delhi & NCR</p>
                  <div className="bg-amber-50 border border-amber-200 rounded-lg p-3">
                    <p className="text-sm font-semibold text-amber-900 mb-2">Play Requirements:</p>
                    <ul className="text-sm text-amber-800 space-y-1">
                      <li className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-amber-600 shrink-0" />
                        Duration: 50–75 Minutes
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-amber-600 shrink-0" />
                        Suitable for Studio Format Performance
                      </li>
                    </ul>
                  </div>
                </CardContent>
              </Card>

              {/* Application Requirements Card */}
              <Card className="border-2 border-[#7E1F2E]/10 hover:border-[#7E1F2E]/30 transition-colors">
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-3 text-lg font-bold text-gray-900">
                    <div className="p-2 bg-[#7E1F2E]/10 rounded-lg">
                      <FileText className="h-5 w-5 text-[#7E1F2E]" />
                    </div>
                    Application Must Include
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {[
                      "Director's Name & Profile",
                      "Group Details",
                      "Play Synopsis & Duration",
                      "Complete On-Stage & Backstage Team List"
                    ].map((item) => (
                      <li key={item} className="flex items-start gap-2 text-sm text-gray-700">
                        <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-4 pt-4 border-t border-gray-100 space-y-1">
                    <p className="text-sm"><span className="font-semibold text-[#7E1F2E]">Last Date to Apply:</span> 2 February 2026</p>
                    <p className="text-sm"><span className="font-semibold text-[#7E1F2E]">Final Selection:</span> 3 February 2026</p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* What the Festival Offers */}
            <Card className="border-2 border-[#7E1F2E]/10 hover:border-[#7E1F2E]/30 transition-colors mb-6">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-3 text-lg font-bold text-gray-900">
                  <div className="p-2 bg-[#7E1F2E]/10 rounded-lg">
                    <Gift className="h-5 w-5 text-[#7E1F2E]" />
                  </div>
                  What the Festival Offers
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {[
                    { title: "Performance Venue", desc: "Access 20 mins before show" },
                    { title: "Complimentary Passes", desc: "5 passes for the group" },
                    { title: "Publicity Support", desc: "Hoardings, Posters, Pamphlets" },
                    { title: "Social Media", desc: "Instagram, Facebook, YouTube" },
                    { title: "Festival Memento", desc: "For the Director" },
                    { title: "Certificates", desc: "For all On-Stage & Backstage Members" }
                  ].map((offer) => (
                    <div key={offer.title} className="bg-green-50 border border-green-100 rounded-lg p-3">
                      <p className="font-semibold text-green-900 text-sm">{offer.title}</p>
                      <p className="text-xs text-green-700 mt-0.5">{offer.desc}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Important Notice */}
            <div className="bg-amber-50 border-2 border-amber-300 rounded-xl p-5 mb-8">
              <div className="flex items-start gap-4">
                <div className="p-2 bg-amber-100 rounded-lg shrink-0">
                  <AlertTriangle className="h-6 w-6 text-amber-600" />
                </div>
                <div>
                  <h4 className="font-bold text-amber-900 text-lg mb-1">Important</h4>
                  <p className="text-amber-800">No TA/DA or honorarium will be provided to participating teams.</p>
                </div>
              </div>
            </div>

            {/* Apply / Contact Section */}
            <Card className="border-2 border-[#7E1F2E] bg-gradient-to-br from-[#7E1F2E]/5 to-white">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-3 text-xl font-bold text-[#7E1F2E]">
                  <div className="p-2 bg-[#7E1F2E] rounded-lg">
                    <Mail className="h-5 w-5 text-white" />
                  </div>
                  Apply / Contact
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <Mail className="h-5 w-5 text-[#7E1F2E] shrink-0" />
                      <a href="mailto:shyamkumaro8@yahoo.co.in" className="text-[#7E1F2E] hover:underline font-medium">
                        shyamkumaro8@yahoo.co.in
                      </a>
                    </div>
                    <div className="flex items-center gap-3">
                      <Phone className="h-5 w-5 text-[#7E1F2E] shrink-0" />
                      <div className="space-x-2">
                        <a href="tel:9811232072" className="text-[#7E1F2E] hover:underline font-medium">9811232072</a>
                        <span className="text-gray-400">/</span>
                        <a href="tel:7982598635" className="text-[#7E1F2E] hover:underline font-medium">7982598635</a>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <User className="h-5 w-5 text-[#7E1F2E] shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-gray-900">Shyam Kumar</p>
                      <p className="text-sm text-gray-600">Director – Natsamrat Theatre Group</p>
                    </div>
                  </div>
                </div>

                {/* Call to Action */}
                <div className="mt-6 pt-6 border-t border-[#7E1F2E]/20 text-center">
                  <p className="text-gray-700 mb-4">
                    Are you ready to present your work at Mandi House&apos;s iconic LTG studio space?
                  </p>
                  <p className="text-[#7E1F2E] font-bold text-lg mb-4">
                    Apply before 2 February 2026 and be part of NATSAMRAT NATYA UTSAV 2026.
                  </p>
                  <a href="mailto:shyamkumaro8@yahoo.co.in?subject=Application for Natsamrat Natya Utsav 2026">
                    <Button size="lg" className="bg-[#7E1F2E] hover:bg-[#6a1a27] text-white font-semibold px-8 py-6 text-lg">
                      <Mail className="h-5 w-5 mr-2" />
                      Apply Now via Email
                    </Button>
                  </a>
                </div>
              </CardContent>
            </Card>
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
              const expiredInMonth = monthEvents.filter(f => f.isExpired).length

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
                      {expiredInMonth > 0 && (
                        <Badge className="bg-gray-100 text-gray-600 text-xs border border-gray-200">
                          {expiredInMonth} closed
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
