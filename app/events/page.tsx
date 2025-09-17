"use client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Calendar, MapPin, Clock, ExternalLink, Star, Trophy, Phone, Globe, Instagram, Award, Info } from "lucide-react"
import Link from "next/link"

interface Event {
  id: string
  title: string
  organizer: string
  dates: string
  competitionDates: string
  lastSubmissionDate: string
  venue: string
  language: string
  category: "Festival" | "Competition"
  type: "Theatre" | "Street Play"
  registrationUrl: string
  description: string
  featured: boolean
  specialEvent: string
  topic: string
  groupSize: string
  registrationFee: string
  prizes: {
    first: string
    second: string
    third: string
  }
  contact: {
    phones: string[]
    website: string
    instagram: string
  }
  eligibility: string
}

const events: Event[] = [
  {
    id: "gorakhpur-rang-mahotsav-2025",
    title: "3rd Gorakhpur Rang Mahotsav 2025 – National Theatre Festival",
    organizer: "Abhiyan Theatre Group, Gorakhpur",
    dates: "11th to 15th October 2025",
    competitionDates: "6th October – 10th October 2025",
    lastSubmissionDate: "5th October 2025",
    venue: "Gorakhpur",
    language: "Hindi",
    category: "Festival",
    type: "Theatre",
    registrationUrl:
      "https://surveyheart.com/form/68c17c6071e428b25f8045bd?fbclid=PAVERTVgM3eatleHRuA2FlbQIxMAABp7q-Ss95hd9qOoUm-wd2UzJYzd-X_SBuo3gKNxPL-QRAC9KtNH86REvFUjbW_aem_Haq5gk4kNuUv7nZU_xHG5g",
    description:
      "A prestigious national theatre festival celebrating the art of theatre with competitions, performances, and cultural exchange.",
    featured: true,
    specialEvent: "Nukkad Natak Pratiyogita (Street Play Competition)",
    topic: "Influence of Social Media (सोशल मीडिया का प्रभाव)",
    groupSize: "8 to 12 participants in a group",
    registrationFee: "₹500",
    prizes: {
      first: "₹5,000 + Memento",
      second: "₹2,500 + Memento",
      third: "₹1,100 + Memento",
    },
    contact: {
      phones: ["+91 7897591044", "+91 6390027730"],
      website: "www.nationaltheatrefestival.in",
      instagram: "@nationaltheatrefest",
    },
    eligibility: "Open entry for all organizations",
  },
]

export default function EventsPage() {
  const event = events[0] // Single event

  const formatDateRange = (dateString: string) => {
    return dateString
  }

  const getLanguageColor = (language: string) => {
    const colors: { [key: string]: string } = {
      Hindi: "bg-red-100 text-red-800",
      Kannada: "bg-yellow-100 text-yellow-800",
      English: "bg-blue-100 text-blue-800",
      Bengali: "bg-green-100 text-green-800",
      "Hindi + English": "bg-purple-100 text-purple-800",
    }
    return colors[language] || "bg-gray-100 text-gray-800"
  }

  const getCategoryColor = (category: string) => {
    const colors: { [key: string]: string } = {
      Festival: "bg-orange-100 text-orange-800",
      Competition: "bg-green-100 text-green-800",
    }
    return colors[category] || "bg-gray-100 text-gray-800"
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-[#7E1F2E] to-[#A02A3A] text-white py-8 sm:py-12 lg:py-16">
        <div className="container px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="font-playfair text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6">
              National Theatre Festival
            </h1>
            <p className="text-base sm:text-lg lg:text-xl opacity-90 mb-6 sm:mb-8 px-4">
              Join the prestigious 3rd Gorakhpur Rang Mahotsav 2025 and showcase your theatrical talent
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 text-center max-w-2xl mx-auto">
              <div className="bg-white/10 rounded-lg p-3 sm:p-4">
                <div className="text-xl sm:text-2xl lg:text-3xl font-bold">5</div>
                <div className="text-xs sm:text-sm opacity-80">Days Festival</div>
              </div>
              <div className="bg-white/10 rounded-lg p-3 sm:p-4">
                <div className="text-xl sm:text-2xl lg:text-3xl font-bold">₹8.6K</div>
                <div className="text-xs sm:text-sm opacity-80">Total Prizes</div>
              </div>
              <div className="bg-white/10 rounded-lg p-3 sm:p-4">
                <div className="text-xl sm:text-2xl lg:text-3xl font-bold">12</div>
                <div className="text-xs sm:text-sm opacity-80">Max Team Size</div>
              </div>
              <div className="bg-white/10 rounded-lg p-3 sm:p-4">
                <div className="text-xl sm:text-2xl lg:text-3xl font-bold">₹500</div>
                <div className="text-xs sm:text-sm opacity-80">Entry Fee</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Privacy & Attribution Notice */}
      <section className="py-6 bg-blue-50 border-b">
        <div className="container px-4">
          <Alert className="max-w-4xl mx-auto border-blue-200 bg-blue-50">
            <Info className="h-4 w-4 text-blue-600" />
            <AlertDescription className="text-blue-800 leading-relaxed">
              <strong>Privacy & Attribution Notice:</strong> This event information is shared for educational and
              promotional purposes. All details are sourced from official announcements by Abhiyan Theatre Group,
              Gorakhpur. All credits and copyrights belong to Abhiyan Theatre Group. For the most current information
              and official registration, please visit their official website or contact them directly. Abhinayपथ is not
              affiliated with the organizers and does not collect or share your data for this post and serves only as an
              information platform.
            </AlertDescription>
          </Alert>
        </div>
      </section>

      {/* Main Event Section */}
      <section className="py-8 sm:py-12">
        <div className="container px-4">
          <div className="max-w-4xl mx-auto">
            {/* Main Event Card */}
            <Card className="group hover:shadow-xl transition-all duration-300 border-2 hover:border-[#7E1F2E]/20 mb-8">
              <CardHeader className="pb-4">
                <div className="flex items-start justify-between gap-4 mb-4">
                  <CardTitle className="text-xl sm:text-2xl lg:text-3xl font-bold group-hover:text-[#7E1F2E] transition-colors font-playfair">
                    {event.title}
                  </CardTitle>
                  {event.featured && (
                    <Badge className="bg-[#7E1F2E] text-white shrink-0">
                      <Star className="h-4 w-4 mr-1" />
                      Featured
                    </Badge>
                  )}
                </div>
                <p className="text-lg text-gray-600 mb-4">
                  Organized by: <strong>{event.organizer}</strong>
                </p>
                <div className="flex flex-wrap gap-2">
                  <Badge className={`${getLanguageColor(event.language)}`}>{event.language}</Badge>
                  <Badge className={`${getCategoryColor(event.category)}`}>{event.category}</Badge>
                  <Badge variant="outline">{event.type}</Badge>
                </div>
              </CardHeader>

              <CardContent className="space-y-6">
                {/* Event Description */}
                <p className="text-gray-700 text-base sm:text-lg leading-relaxed">{event.description}</p>

                {/* Special Event Highlight */}
                <div className="bg-gradient-to-r from-orange-50 to-red-50 p-4 sm:p-6 rounded-lg border border-orange-200">
                  <h3 className="text-lg sm:text-xl font-bold text-orange-800 mb-2 flex items-center">
                    <Award className="h-5 w-5 mr-2" />
                    Special Event
                  </h3>
                  <p className="text-orange-700 font-semibold text-base sm:text-lg mb-2">{event.specialEvent}</p>
                  <p className="text-orange-600">
                    <strong>Topic:</strong> {event.topic}
                  </p>
                </div>

                {/* Event Details Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                  {/* Dates & Venue */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-800 border-b pb-2">Event Details</h3>
                    <div className="space-y-3">
                      <div className="flex items-start gap-3">
                        <Calendar className="h-5 w-5 text-[#7E1F2E] shrink-0 mt-0.5" />
                        <div>
                          <p className="font-medium">Festival Dates</p>
                          <p className="text-gray-600">{event.dates}</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <Clock className="h-5 w-5 text-[#7E1F2E] shrink-0 mt-0.5" />
                        <div>
                          <p className="font-medium">Competition Dates</p>
                          <p className="text-gray-600">{event.competitionDates}</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <MapPin className="h-5 w-5 text-[#7E1F2E] shrink-0 mt-0.5" />
                        <div>
                          <p className="font-medium">Location</p>
                          <p className="text-gray-600">{event.venue}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Registration & Eligibility */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-800 border-b pb-2">Registration Info</h3>
                    <div className="space-y-3">
                      <div>
                        <p className="font-medium">Registration Fee</p>
                        <p className="text-gray-600 text-lg font-semibold text-[#7E1F2E]">{event.registrationFee}</p>
                      </div>
                      <div>
                        <p className="font-medium">Group Size</p>
                        <p className="text-gray-600">{event.groupSize}</p>
                      </div>
                      <div>
                        <p className="font-medium">Eligibility</p>
                        <p className="text-gray-600">{event.eligibility}</p>
                      </div>
                      <div>
                        <p className="font-medium text-red-600">Last Date of Submission</p>
                        <p className="text-red-700 font-semibold">{event.lastSubmissionDate}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Prizes Section */}
                <div className="bg-gradient-to-r from-yellow-50 to-orange-50 p-4 sm:p-6 rounded-lg border border-yellow-200">
                  <h3 className="text-lg sm:text-xl font-bold text-yellow-800 mb-4 flex items-center">
                    <Trophy className="h-5 w-5 mr-2" />
                    Cash Prizes
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="text-center p-3 bg-yellow-100 rounded-lg">
                      <div className="text-2xl font-bold text-yellow-700 mb-1">🥇</div>
                      <div className="font-semibold text-yellow-800">1st Prize</div>
                      <div className="text-yellow-700">{event.prizes.first}</div>
                    </div>
                    <div className="text-center p-3 bg-gray-100 rounded-lg">
                      <div className="text-2xl font-bold text-gray-700 mb-1">🥈</div>
                      <div className="font-semibold text-gray-800">2nd Prize</div>
                      <div className="text-gray-700">{event.prizes.second}</div>
                    </div>
                    <div className="text-center p-3 bg-orange-100 rounded-lg">
                      <div className="text-2xl font-bold text-orange-700 mb-1">🥉</div>
                      <div className="font-semibold text-orange-800">3rd Prize</div>
                      <div className="text-orange-700">{event.prizes.third}</div>
                    </div>
                  </div>
                  <p className="text-center text-yellow-700 mt-4 font-medium">
                    + Participation Certificate for all participants
                  </p>
                </div>

                {/* Contact Information */}
                <div className="bg-gray-50 p-4 sm:p-6 rounded-lg">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Contact Information</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    <div className="flex items-center gap-3">
                      <Phone className="h-5 w-5 text-[#7E1F2E]" />
                      <div>
                        <p className="font-medium">Phone</p>
                        <div className="text-sm text-gray-600">
                          {event.contact.phones.map((phone, index) => (
                            <p key={index}>{phone}</p>
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Globe className="h-5 w-5 text-[#7E1F2E]" />
                      <div>
                        <p className="font-medium">Website</p>
                        <p className="text-sm text-gray-600">{event.contact.website}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Instagram className="h-5 w-5 text-[#7E1F2E]" />
                      <div>
                        <p className="font-medium">Instagram</p>
                        <p className="text-sm text-gray-600">{event.contact.instagram}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Registration Button */}
                <div className="pt-4">
                  <Link href={event.registrationUrl} target="_blank" rel="noopener noreferrer">
                    <Button className="w-full bg-[#7E1F2E] hover:bg-[#6a1a27] text-white text-lg py-6 rounded-lg font-semibold">
                      Register Now - {event.registrationFee}
                      <ExternalLink className="h-5 w-5 ml-2" />
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 sm:py-16 bg-gradient-to-r from-[#7E1F2E] to-[#A02A3A] text-white">
        <div className="container px-4 text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 font-playfair">
            Ready to Showcase Your Talent?
          </h2>
          <p className="text-base sm:text-lg lg:text-xl mb-6 sm:mb-8 opacity-90 max-w-2xl mx-auto px-4">
            Don't miss this opportunity to participate in one of India's premier theatre festivals. Register before{" "}
            {event.lastSubmissionDate}!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link href={event.registrationUrl} target="_blank" rel="noopener noreferrer">
              <Button
                size="lg"
                className="bg-white text-[#7E1F2E] hover:bg-gray-100 px-6 sm:px-8 py-3 text-base sm:text-lg rounded-full font-medium"
              >
                Register Now
              </Button>
            </Link>
            <Link href="/join-community">
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-[#7E1F2E] px-6 sm:px-8 py-3 text-base sm:text-lg rounded-full font-medium bg-transparent"
              >
                Join Our Community
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
