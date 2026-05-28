"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { 
  MapPin, 
  Calendar, 
  Clock, 
  Mail, 
  Check, 
  ExternalLink, 
  ArrowLeft,
  Users,
  Globe,
  Award,
  Plane,
  FileText,
  AlertCircle,
  Archive
} from "lucide-react"
import Link from "next/link"
import { ShareEventButton } from "@/components/share-event-button"
import { 
  festivals, 
  processEvent, 
  STATUS_CONFIG, 
  getScaleColor,
  type EnhancedFestival 
} from "@/lib/data/events"

interface EventDetailContentProps {
  id: string
}

export default function EventDetailContent({ id }: EventDetailContentProps) {
  const festival = festivals.find(f => f.id === id)
  
  if (!festival) {
    return (
      <div className="container py-12">
        <Card>
          <CardContent className="py-12 text-center">
            <h2 className="text-2xl font-bold mb-4">Event Not Found</h2>
            <p className="text-muted-foreground mb-6">The event you&apos;re looking for doesn&apos;t exist.</p>
            <Button asChild>
              <Link href="/events">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Events
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  // Process the event to get computed status
  const event: EnhancedFestival = processEvent(festival)
  const statusConfig = STATUS_CONFIG[event.computedStatus] || STATUS_CONFIG.past

  const isPast = event.isExpired
  const isClosingSoon = event.isClosingSoon
  const isCompleted = event.isEventCompleted
  const isSubmissionsClosed = event.isSubmissionsClosed

  // Build key highlights from event data
  const keyHighlights: string[] = []
  if (event.scale) keyHighlights.push(`${event.scale} scale festival`)
  if (event.duration) keyHighlights.push(`Duration: ${event.duration}`)
  if (event.languages) keyHighlights.push(`Languages: ${event.languages}`)
  if (event.selectionProcess) keyHighlights.push(`Selection: ${event.selectionProcess}`)
  if (event.travelSupport) keyHighlights.push(`Travel Support: ${event.travelSupport}`)
  if (event.visaSupport) keyHighlights.push(`Visa Support: ${event.visaSupport}`)
  if (event.registrationFee) keyHighlights.push(`Registration Fee: ${event.registrationFee}`)
  if (event.featured) keyHighlights.push("Featured Festival")
  if (event.isFellowship) keyHighlights.push("Fellowship Program")

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className={`py-8 md:py-12 ${
        isCompleted 
          ? "bg-gradient-to-r from-gray-600 to-gray-700" 
          : isSubmissionsClosed
            ? "bg-gradient-to-r from-amber-600 to-amber-700"
            : isPast 
              ? "bg-gradient-to-r from-gray-500 to-gray-600" 
              : "bg-gradient-to-r from-[#7E1F2E] to-[#A02A3A]"
      } text-white`}>
        <div className="container px-4">
          <Button variant="ghost" asChild className="mb-6 text-white hover:bg-white/20">
            <Link href="/events">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Events
            </Link>
          </Button>
          
          {/* Status Banner */}
          {(isCompleted || isSubmissionsClosed || isPast || isClosingSoon) && (
            <div className={`mb-4 inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold ${
              isCompleted 
                ? "bg-gray-800/50" 
                : isSubmissionsClosed 
                  ? "bg-amber-800/50"
                  : isClosingSoon
                    ? "bg-orange-500/80 animate-pulse"
                    : "bg-gray-700/50"
            }`}>
              {isCompleted ? (
                <><Archive className="h-4 w-4" /> Event Completed</>
              ) : isSubmissionsClosed ? (
                <><Clock className="h-4 w-4" /> Submissions Closed - Event Upcoming</>
              ) : isClosingSoon && event.daysUntilDeadline !== null ? (
                <><AlertCircle className="h-4 w-4" /> {event.daysUntilDeadline === 0 ? "Last Day to Apply!" : `${event.daysUntilDeadline} Days Left!`}</>
              ) : (
                <><Archive className="h-4 w-4" /> Deadline Passed</>
              )}
            </div>
          )}
          
          <div className="flex items-start justify-between gap-4 mb-4">
            <h1 className="font-playfair text-3xl md:text-4xl lg:text-5xl font-bold">{event.name}</h1>
            <ShareEventButton 
              eventId={event.id} 
              eventName={event.name} 
              shareType="event" 
              variant="icon"
              size="default"
            />
          </div>
          
          <div className="flex flex-wrap gap-3 mb-6">
            <Badge className={`${statusConfig.color} text-sm px-3 py-1`}>
              {isCompleted ? "Event Completed" : isSubmissionsClosed ? "Submissions Closed" : statusConfig.label}
            </Badge>
            <Badge className={`${getScaleColor(event.scale)} text-sm px-3 py-1`}>{event.scale}</Badge>
            {event.featured && !isPast && (
              <Badge className="bg-[#7E1F2E] text-white text-sm px-3 py-1">Featured Festival</Badge>
            )}
            {event.isFellowship && (
              <Badge className="bg-purple-600 text-white text-sm px-3 py-1">Fellowship Program</Badge>
            )}
            {event.category && (
              <Badge variant="outline" className="border-white/50 text-white text-sm px-3 py-1 capitalize">
                {event.category}
              </Badge>
            )}
          </div>
          
          <div className="flex flex-wrap gap-6 text-sm opacity-90">
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              <span>{event.city}, {event.country}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              <span>{event.dates}</span>
            </div>
            <div className="flex items-center gap-2">
              <Globe className="h-4 w-4" />
              <span>{event.languages}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-8 md:py-12">
        <div className="container px-4">
          <div className="grid gap-8 lg:grid-cols-3">
            {/* Left Column - Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* About */}
              <Card>
                <CardContent className="pt-6">
                  <h2 className="text-2xl font-semibold mb-4">About This Festival</h2>
                  <p className="text-muted-foreground leading-relaxed whitespace-pre-line">{event.description}</p>
                </CardContent>
              </Card>

              {/* Key Highlights */}
              {keyHighlights.length > 0 && (
                <Card>
                  <CardContent className="pt-6">
                    <h2 className="text-2xl font-semibold mb-4">Key Highlights</h2>
                    <ul className="space-y-3">
                      {keyHighlights.map((highlight, index) => (
                        <li key={index} className="flex items-start gap-3">
                          <Check className="h-5 w-5 text-[#7E1F2E] mt-0.5 flex-shrink-0" />
                          <span>{highlight}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              )}

              {/* Eligibility */}
              <Card>
                <CardContent className="pt-6">
                  <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
                    <Users className="h-5 w-5 text-[#7E1F2E]" />
                    Eligibility
                  </h2>
                  <p className="text-muted-foreground leading-relaxed">{event.eligibility}</p>
                </CardContent>
              </Card>

              {/* Selection Process */}
              {event.selectionProcess && (
                <Card>
                  <CardContent className="pt-6">
                    <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
                      <FileText className="h-5 w-5 text-[#7E1F2E]" />
                      Selection Process
                    </h2>
                    <p className="text-muted-foreground leading-relaxed">{event.selectionProcess}</p>
                  </CardContent>
                </Card>
              )}

              {/* Travel & Visa Support */}
              {(event.travelSupport || event.visaSupport) && (
                <Card className="border-green-200 bg-green-50/50">
                  <CardContent className="pt-6">
                    <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2 text-green-800">
                      <Plane className="h-5 w-5" />
                      Support Provided
                    </h2>
                    <div className="space-y-4">
                      {event.travelSupport && (
                        <div>
                          <h3 className="font-medium text-green-800 mb-1">Travel Support</h3>
                          <p className="text-green-700">{event.travelSupport}</p>
                        </div>
                      )}
                      {event.visaSupport && (
                        <div>
                          <h3 className="font-medium text-green-800 mb-1">Visa Support</h3>
                          <p className="text-green-700">{event.visaSupport}</p>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Tags */}
              {event.tags && event.tags.length > 0 && (
                <Card>
                  <CardContent className="pt-6">
                    <h2 className="text-2xl font-semibold mb-4">Tags</h2>
                    <div className="flex flex-wrap gap-2">
                      {event.tags.map((tag, index) => (
                        <Badge key={index} variant="secondary" className="text-sm">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>

            {/* Right Column - Sidebar */}
            <div className="space-y-6">
              {/* Quick Info */}
              <Card>
                <CardContent className="pt-6">
                  <h3 className="font-semibold mb-4">Event Details</h3>
                  <div className="space-y-4">
                    <div>
                      <div className="text-sm text-muted-foreground mb-1">Festival Dates</div>
                      <div className="font-medium flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-[#7E1F2E]" />
                        {event.dates}
                      </div>
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground mb-1">Duration</div>
                      <div className="font-medium flex items-center gap-2">
                        <Clock className="h-4 w-4 text-[#7E1F2E]" />
                        {event.duration}
                      </div>
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground mb-1">Location</div>
                      <div className="font-medium flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-[#7E1F2E]" />
                        {event.city}, {event.country}
                      </div>
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground mb-1">Languages</div>
                      <div className="font-medium flex items-center gap-2">
                        <Globe className="h-4 w-4 text-[#7E1F2E]" />
                        {event.languages}
                      </div>
                    </div>
                    {event.registrationFee && (
                      <div>
                        <div className="text-sm text-muted-foreground mb-1">Registration Fee</div>
                        <div className="font-medium">{event.registrationFee}</div>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Submission Deadline */}
              <Card className={isClosingSoon ? "border-orange-300 bg-orange-50" : ""}>
                <CardContent className="pt-6">
                  <h3 className="font-semibold mb-4 flex items-center gap-2">
                    <Clock className={`h-4 w-4 ${isClosingSoon ? "text-orange-600" : "text-[#7E1F2E]"}`} />
                    Submission Deadline
                  </h3>
                  <div className={`text-lg font-bold ${
                    isPast ? "text-gray-500 line-through" : isClosingSoon ? "text-orange-700" : "text-[#7E1F2E]"
                  }`}>
                    {event.submissionDeadline}
                  </div>
                  {!isPast && event.daysUntilDeadline !== null && event.daysUntilDeadline > 0 && (
                    <div className={`mt-2 text-sm font-medium ${isClosingSoon ? "text-orange-600" : "text-green-600"}`}>
                      {event.daysUntilDeadline} {event.daysUntilDeadline === 1 ? "day" : "days"} remaining
                    </div>
                  )}
                  {isPast && (
                    <div className="mt-2 text-sm text-gray-500">
                      {isCompleted ? "Event has concluded" : isSubmissionsClosed ? "Event upcoming" : "Deadline has passed"}
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Apply Button */}
              <Card>
                <CardContent className="pt-6">
                  <Button 
                    asChild 
                    className={`w-full ${
                      isCompleted 
                        ? "bg-gray-400 hover:bg-gray-500"
                        : isSubmissionsClosed
                          ? "bg-amber-600 hover:bg-amber-700"
                          : isPast 
                            ? "bg-gray-500 hover:bg-gray-600" 
                            : "bg-[#7E1F2E] hover:bg-[#6a1a27]"
                    }`}
                  >
                    <Link href={event.link} target="_blank" rel="noopener noreferrer">
                      {isCompleted ? "View Past Festival" : isSubmissionsClosed ? "View Festival Info" : isPast ? "View Festival" : "Apply / Learn More"}
                      <ExternalLink className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                  
                  <div className="mt-4">
                    <ShareEventButton 
                      eventId={event.id} 
                      eventName={event.name} 
                      shareType="event" 
                      variant="button"
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Contact */}
              <Card>
                <CardContent className="pt-6">
                  <h3 className="font-semibold mb-4">More Information</h3>
                  <div className="space-y-3 text-sm">
                    <div className="flex items-start gap-2">
                      <ExternalLink className="h-4 w-4 text-muted-foreground mt-0.5" />
                      <Link 
                        href={event.link} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-[#7E1F2E] hover:underline break-all"
                      >
                        Official Website / Application
                      </Link>
                    </div>
                    {event.link.includes("mailto:") && (
                      <div className="flex items-start gap-2">
                        <Mail className="h-4 w-4 text-muted-foreground mt-0.5" />
                        <span className="text-muted-foreground break-all">
                          {event.link.replace("mailto:", "").split("?")[0]}
                        </span>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Fellowship Badge */}
              {event.isFellowship && (
                <Card className="border-purple-200 bg-purple-50">
                  <CardContent className="pt-6">
                    <div className="flex items-center gap-2 text-purple-800 mb-2">
                      <Award className="h-5 w-5" />
                      <h3 className="font-semibold">Fellowship Program</h3>
                    </div>
                    <p className="text-sm text-purple-700">
                      This is a prestigious fellowship opportunity that may include scholarships, travel support, and professional development.
                    </p>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 bg-gradient-to-r from-[#7E1F2E] to-[#A02A3A] text-white">
        <div className="container px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h3 className="text-2xl sm:text-3xl font-bold mb-4">Explore More Festivals</h3>
            <p className="text-lg opacity-90 mb-6">Discover more theatre festivals and opportunities</p>
            <Button asChild size="lg" className="bg-white text-[#7E1F2E] hover:bg-gray-100 font-semibold px-8">
              <Link href="/events">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to All Events
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
