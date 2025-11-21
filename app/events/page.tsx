"use client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Calendar,
  MapPin,
  Clock,
  ExternalLink,
  Star,
  Trophy,
  Phone,
  Globe,
  Instagram,
  Award,
  Info,
  Theater,
  Mail,
} from "lucide-react"
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
    email?: string
  }
  eligibility: string
  additionalInfo?: string[]
}

interface BangalorePlay {
  id: string
  title: string
  venue: string
  date: string
  language: string
  category: "English" | "Hindi" | "Kannada" | "Odia"
  bookingUrl: string
  description?: string
}

const events: Event[] = [
  {
    id: "bharat-rang-mahotsav-2026",
    title: "25th Bharat Rang Mahotsav 2026 – International Theatre Festival of India",
    organizer: "National School of Drama (NSD), New Delhi",
    dates: "January–February 2026",
    competitionDates: "January–February 2026",
    lastSubmissionDate: "25th October 2025 till 12:00 Midnight",
    venue: "Delhi & other cities in India and abroad",
    language: "Multilingual",
    category: "Festival",
    type: "Theatre",
    registrationUrl: "https://brmapplication.nsd.gov.in/",
    description:
      "The world's largest theatre festival celebrating 25 years of international theatrical excellence. This prestigious festival brings together drama institutions, theatre companies, and directors from India and abroad to showcase the finest in contemporary theatre across multiple venues and cities.",
    featured: true,
    specialEvent: "25th Edition - Silver Jubilee Celebration",
    topic: "International Theatre Excellence & Cultural Exchange",
    groupSize: "Theatre Companies & Institutions",
    registrationFee: "₹250 (India & SAARC) | ₹500 (Others)",
    prizes: {
      first: "International Recognition",
      second: "Global Platform",
      third: "Cultural Exchange",
    },
    contact: {
      phones: [],
      website: "www.nsd.gov.in",
      instagram: "@nsd_delhi",
      email: "festivalcell@gmail.com",
    },
    eligibility:
      "Drama Institutions, Theatre Companies & Theatre Directors (India & abroad). Only plays previously performed for the public with minimum 60 minutes duration.",
    additionalInfo: [
      "Productions can be submitted under 10 categories",
      "Only plays previously performed for the public are eligible",
      "Minimum duration: 60 minutes",
      "Offline submissions will not be accepted",
      "NSD reserves the right to change or cancel the festival schedule",
    ],
  },
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
    featured: false,
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

const bangalorePlays: BangalorePlay[] = [
  // English Plays
  {
    id: "frankenstein",
    title: "Frankenstein",
    venue: "Prabhat Kaladwarka Koramangala Club, Bengaluru",
    date: "Saturday, 22 November 2025",
    language: "English",
    category: "English",
    bookingUrl: "https://in.bookmyshow.com/plays/frankenstein/ET00454959",
    description:
      "Stage adaptation of Mary Shelley’s Frankenstein. Victor Frankenstein creates a creature from a corpse in his obsession to defeat death, but terrified by his creation, he abandons it. The creature's loneliness and people's hatred turn into a tragic conflict of creator vs creation.",
  },
  {
    id: "chamak",
    title: "Chamak, A play for children",
    venue: "Ranga Shankara, Bengaluru",
    date: "Sunday, 23 November 2025",
    language: "English",
    category: "English",
    bookingUrl: "https://in.bookmyshow.com/plays/chamak/ET00449898",
    description:
      "Ranga Shankara’s AHA! Theatre for Children production. Chamak is a 10-year-old girl who loves her seaside town, but fears the 'new world' will change everything. Amidst waves, chickens, friends, and coconut barfi, she searches for 'home', 'belonging', and her identity.",
  },

  // Hindi Plays
  {
    id: "kaun-draupadi",
    title: "Kaun Draupadi?",
    venue: "Samarthanam Auditorium – Bengaluru",
    date: "Sunday, 23 November 2025",
    language: "Hindi",
    category: "Hindi",
    bookingUrl: "https://in.bookmyshow.com/plays/kaun-draupadi/ET00469287",
    description:
      "Set backstage of a Mahabharat production. New actor Dravya (Draupadi) becomes the center of gossip due to her closeness with the lead. Amidst lost props and tension, the stage becomes a 'courtroom of conscience' asking: who is Draupadi in real life — wronged, used, or survivor?",
  },

  // Kannada Plays
  {
    id: "bob-marley-from-kodihalli",
    title: "Bob Marley from Kodihalli",
    venue: "Ranga Shankara, Bengaluru",
    date: "Saturday, 22 November 2025",
    language: "Kannada",
    category: "Kannada",
    bookingUrl: "https://in.bookmyshow.com/plays/bob-marley-from-kodihalli/ET00467805",
    description:
      "Set in urban Bangalore, three people try to survive by hiding their caste/identity. A political/social commentary on identity, caste concealment, and survival, inspired by Dr. Ambedkar's 'Waiting for a Visa'.",
  },
  {
    id: "mr-rao-and-associates",
    title: "Mr Rao and Associates",
    venue: "Khincha Auditorium – Bhartiya Vidya Bhavan, Bengaluru",
    date: "Saturday, 22 November 2025, 11:00 AM",
    language: "Kannada",
    category: "Kannada",
    bookingUrl: "https://in.bookmyshow.com/plays/mr-rao-and-associates/ET00448369",
    description:
      "A family/society-based comic drama showing that parents are not ATMs. It explores how modern lifestyle and materialism weaken relationship bonds, leading to emotional neglect of the elderly.",
  },
  {
    id: "rakshasa-tangadi",
    title: "Rakshasa Tangadi",
    venue: "Ravindra Kalakshetra, Bengaluru",
    date: "Saturday, 22 November 2025, 7:00 PM",
    language: "Kannada",
    category: "Kannada",
    bookingUrl: "https://in.bookmyshow.com/plays/rakshasa-tangadi/ET00357400",
    description:
      "Girish Karnad's classic historical play bringing the 1565 Battle of Talikota (Vijayanagara vs Deccan Sultans) to stage. A spectacle of politics, ego, war strategy, power, and the plight of common people.",
  },
  {
    id: "lakshmi-kataksha",
    title: "Lakshmi Kataksha",
    venue: "Kalagrama (Backside Bangalore University), Bengaluru",
    date: "Saturday, 22 November 2025, 7:00 PM",
    language: "Kannada",
    category: "Kannada",
    bookingUrl: "https://in.bookmyshow.com/plays/lakshmi-kataksha/ET00470236",
    description:
      "A play based on relationships and selfishness — husband-wife, teacher-student, parents-children, citizen-politician. It questions whether relationships are just calculations or divine, and what true 'Lakshmi Kataksha' really is.",
  },
  {
    id: "oorugoolu",
    title: "OORUGOOLU – Tragedy Drama",
    venue: "Suchitra Cinema & Cultural Academy, Bengaluru",
    date: "Saturday, 22 November 2025, 6:30 PM",
    language: "Kannada",
    category: "Kannada",
    bookingUrl: "https://in.bookmyshow.com/plays/oorugoolu-tragedy-drama/ET00467563",
    description:
      "An emotional tragedy about parents who give everything for their children, only to be abandoned by them. The play questions duty, humanity, and the meaning of 'home' and 'peace' for an old soul.",
  },
]

export default function EventsPage() {
  const bharatRangEvent = events[0] // Bharat Rang Mahotsav 2026
  const gorakhpurEvent = events[1] // Gorakhpur Rang Mahotsav 2025

  const getLanguageColor = (language: string) => {
    const colors: { [key: string]: string } = {
      Hindi: "bg-red-100 text-red-800",
      Kannada: "bg-yellow-100 text-yellow-800",
      English: "bg-blue-100 text-blue-800",
      Bengali: "bg-green-100 text-green-800",
      Odia: "bg-purple-100 text-purple-800",
      "Hindi + English": "bg-purple-100 text-purple-800",
      "French/Malayalam": "bg-indigo-100 text-indigo-800",
      Multilingual: "bg-pink-100 text-pink-800",
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

  const englishPlays = bangalorePlays.filter((play) => play.category === "English")
  const hindiPlays = bangalorePlays.filter((play) => play.category === "Hindi")
  const kannadaPlays = bangalorePlays.filter((play) => play.category === "Kannada")
  const odiaPlays = bangalorePlays.filter((play) => play.category === "Odia")

  const PlayCard = ({ play }: { play: BangalorePlay }) => (
    <Card className="group hover:shadow-lg transition-all duration-300 border-2 hover:border-[#7E1F2E]/20 h-full flex flex-col">
      <CardHeader className="pb-3 flex-shrink-0">
        <div className="flex items-start justify-between gap-2 mb-2">
          <CardTitle className="text-base sm:text-lg font-bold group-hover:text-[#7E1F2E] transition-colors line-clamp-2 leading-tight">
            {play.title}
          </CardTitle>
        </div>
      </CardHeader>
      <CardContent className="space-y-3 flex-grow flex flex-col">
        <div className="flex flex-wrap gap-1.5">
          <Badge className={`${getLanguageColor(play.language)} text-xs`}>{play.language}</Badge>
        </div>

        <div className="space-y-2 text-xs sm:text-sm text-gray-600 flex-grow">
          <div className="flex items-center gap-2">
            <Calendar className="h-3 w-3 sm:h-4 sm:w-4 shrink-0" />
            <span>{play.date}</span>
          </div>
          <div className="flex items-start gap-2">
            <MapPin className="h-3 w-3 sm:h-4 sm:w-4 shrink-0 mt-0.5" />
            <span className="line-clamp-2 leading-tight">{play.venue}</span>
          </div>
        </div>

        {play.description && (
          <p className="text-xs sm:text-sm text-gray-600 line-clamp-3 leading-relaxed">{play.description}</p>
        )}

        <div className="pt-2 mt-auto">
          <Link href={play.bookingUrl} target="_blank" rel="noopener noreferrer">
            <Button className="w-full bg-[#7E1F2E] hover:bg-[#6a1a27] text-white text-xs sm:text-sm py-2 sm:py-2.5">
              Book Tickets
              <ExternalLink className="h-3 w-3 sm:h-4 sm:w-4 ml-2" />
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  )

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-[#7E1F2E] to-[#A02A3A] text-white py-8 sm:py-12 lg:py-16">
        <div className="container px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="font-playfair text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6">
              Theatre Events & Festivals
            </h1>
            <p className="text-base sm:text-lg lg:text-xl opacity-90 mb-6 sm:mb-8 px-4">
              Discover national festivals and weekend theatre performances in Bangalore
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 text-center max-w-2xl mx-auto">
              <div className="bg-white/10 rounded-lg p-3 sm:p-4">
                <div className="text-xl sm:text-2xl lg:text-3xl font-bold">25th</div>
                <div className="text-xs sm:text-sm opacity-80">BRM Edition</div>
              </div>
              <div className="bg-white/10 rounded-lg p-3 sm:p-4">
                <div className="text-xl sm:text-2xl lg:text-3xl font-bold">{bangalorePlays.length}+</div>
                <div className="text-xs sm:text-sm opacity-80">Weekend Shows</div>
              </div>
              <div className="bg-white/10 rounded-lg p-3 sm:p-4">
                <div className="text-xl sm:text-2xl lg:text-3xl font-bold">Global</div>
                <div className="text-xs sm:text-sm opacity-80">Participation</div>
              </div>
              <div className="bg-white/10 rounded-lg p-3 sm:p-4">
                <div className="text-xl sm:text-2xl lg:text-3xl font-bold">₹250</div>
                <div className="text-xs sm:text-sm opacity-80">BRM Entry</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Privacy & Attribution Notice */}
      <section className="py-6 bg-blue-50 border-b">
        <div className="container px-4">
          <Alert className="max-w-4xl mx-auto border-blue-200 bg-blue-50 mb-4">
            <Info className="h-4 w-4 text-blue-600" />
            <AlertDescription className="text-blue-800 leading-relaxed">
              <strong>Privacy & Data Handling Notice:</strong> This event information is shared for educational and
              promotional purposes. For Bharat Rang Mahotsav 2026, all application data is handled directly by the
              National School of Drama (NSD) through their official portal. For Gorakhpur Rang Mahotsav, data is managed
              by Abhiyan Theatre Group. Abhinayपथ does not collect, store, or process any personal data related to these
              events and serves only as an information platform.
            </AlertDescription>
          </Alert>
          <Alert className="max-w-4xl mx-auto border-orange-200 bg-orange-50">
            <Award className="h-4 w-4 text-orange-600" />
            <AlertDescription className="text-orange-800 leading-relaxed">
              <strong>Attribution Notice:</strong> All festival details are sourced from official announcements by the
              National School of Drama (NSD) and Abhiyan Theatre Group. All credits and copyrights belong to their
              respective organizers. For the most current information and official applications, please visit their
              official websites or contact them directly.
            </AlertDescription>
          </Alert>
        </div>
      </section>

      {/* Bangalore Theatre Events Section */}
      <section className="py-8 sm:py-12 bg-white">
        <div className="container px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-8 sm:mb-12">
              <div className="flex items-center justify-center gap-3 mb-4">
                <Theater className="h-6 w-6 sm:h-8 sm:w-8 text-[#7E1F2E]" />
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold font-playfair text-gray-800">
                  Bangalore Theatre Events
                </h2>
              </div>
              <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
                Discover this weekend's exciting theatre performances across Bangalore - November 22-23
              </p>
            </div>

            <Tabs defaultValue="english" className="w-full">
              <div className="overflow-x-auto mb-6 sm:mb-8">
                <TabsList className="grid w-full grid-cols-4 min-w-[400px] sm:min-w-0">
                  <TabsTrigger value="english" className="text-xs sm:text-sm px-2 sm:px-4">
                    English ({englishPlays.length})
                  </TabsTrigger>
                  <TabsTrigger value="hindi" className="text-xs sm:text-sm px-2 sm:px-4">
                    Hindi ({hindiPlays.length})
                  </TabsTrigger>
                  <TabsTrigger value="kannada" className="text-xs sm:text-sm px-2 sm:px-4">
                    Kannada ({kannadaPlays.length})
                  </TabsTrigger>
                  <TabsTrigger value="odia" className="text-xs sm:text-sm px-2 sm:px-4">
                    Odia ({odiaPlays.length})
                  </TabsTrigger>
                </TabsList>
              </div>

              <TabsContent value="english" className="mt-6 sm:mt-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                  {englishPlays.map((play) => (
                    <PlayCard key={play.id} play={play} />
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="hindi" className="mt-6 sm:mt-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                  {hindiPlays.map((play) => (
                    <PlayCard key={play.id} play={play} />
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="kannada" className="mt-6 sm:mt-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                  {kannadaPlays.map((play) => (
                    <PlayCard key={play.id} play={play} />
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="odia" className="mt-6 sm:mt-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                  {odiaPlays.map((play) => (
                    <PlayCard key={play.id} play={play} />
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </section>

      {/* Major Theatre Festivals Section */}
      <section className="py-8 sm:py-12">
        <div className="container px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-2xl sm:text-3xl font-bold font-playfair text-gray-800 mb-4">
                Major Theatre Festivals
              </h2>
              <p className="text-base sm:text-lg text-gray-600">
                Discover prestigious national and international theatre festivals
              </p>
            </div>

            <Tabs defaultValue="bharat-rang" className="w-full">
              <div className="overflow-x-auto mb-6 sm:mb-8">
                <TabsList className="grid w-full grid-cols-2 min-w-[400px] sm:min-w-0">
                  <TabsTrigger value="bharat-rang" className="text-xs sm:text-sm px-2 sm:px-4">
                    Bharat Rang Mahotsav 2026
                  </TabsTrigger>
                  <TabsTrigger value="gorakhpur-rang" className="text-xs sm:text-sm px-2 sm:px-4">
                    Gorakhpur Rang Mahotsav 2025
                  </TabsTrigger>
                </TabsList>
              </div>

              <TabsContent value="bharat-rang" className="mt-6 sm:mt-8">
                {/* Bharat Rang Mahotsav Card */}
                <Card className="group hover:shadow-xl transition-all duration-300 border-2 hover:border-[#7E1F2E]/20 mb-8">
                  <CardHeader className="pb-4">
                    <div className="flex items-start justify-between gap-4 mb-4">
                      <CardTitle className="text-xl sm:text-2xl lg:text-3xl font-bold group-hover:text-[#7E1F2E] transition-colors font-playfair">
                        {bharatRangEvent.title}
                      </CardTitle>
                      {bharatRangEvent.featured && (
                        <Badge className="bg-[#7E1F2E] text-white shrink-0">
                          <Star className="h-4 w-4 mr-1" />
                          Featured
                        </Badge>
                      )}
                    </div>
                    <p className="text-lg text-gray-600 mb-4">
                      Organized by: <strong>{bharatRangEvent.organizer}</strong>
                    </p>
                    <div className="flex flex-wrap gap-2">
                      <Badge className="bg-purple-100 text-purple-800">{bharatRangEvent.language}</Badge>
                      <Badge className={`${getCategoryColor(bharatRangEvent.category)}`}>
                        {bharatRangEvent.category}
                      </Badge>
                      <Badge variant="outline">{bharatRangEvent.type}</Badge>
                      <Badge className="bg-gold-100 text-gold-800">World's Largest</Badge>
                    </div>
                  </CardHeader>

                  <CardContent className="space-y-6">
                    {/* Event Description */}
                    <p className="text-gray-700 text-base sm:text-lg leading-relaxed">{bharatRangEvent.description}</p>

                    {/* Special Event Highlight */}
                    <div className="bg-gradient-to-r from-purple-50 to-indigo-50 p-4 sm:p-6 rounded-lg border border-purple-200">
                      <h3 className="text-lg sm:text-xl font-bold text-purple-800 mb-2 flex items-center">
                        <Award className="h-5 w-5 mr-2" />
                        Special Milestone
                      </h3>
                      <p className="text-purple-700 font-semibold text-base sm:text-lg mb-2">
                        {bharatRangEvent.specialEvent}
                      </p>
                      <p className="text-purple-600">
                        <strong>Focus:</strong> {bharatRangEvent.topic}
                      </p>
                    </div>

                    {/* Event Details Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                      {/* Dates & Venue */}
                      <div className="space-y-4">
                        <h3 className="text-lg font-semibold text-gray-800 border-b pb-2">Festival Details</h3>
                        <div className="space-y-3">
                          <div className="flex items-start gap-3">
                            <Calendar className="h-5 w-5 text-[#7E1F2E] shrink-0 mt-0.5" />
                            <div>
                              <p className="font-medium">Festival Dates</p>
                              <p className="text-gray-600">{bharatRangEvent.dates}</p>
                            </div>
                          </div>
                          <div className="flex items-start gap-3">
                            <MapPin className="h-5 w-5 text-[#7E1F2E] shrink-0 mt-0.5" />
                            <div>
                              <p className="font-medium">Locations</p>
                              <p className="text-gray-600">{bharatRangEvent.venue}</p>
                            </div>
                          </div>
                          <div className="flex items-start gap-3">
                            <Globe className="h-5 w-5 text-[#7E1F2E] shrink-0 mt-0.5" />
                            <div>
                              <p className="font-medium">Website</p>
                              <p className="text-gray-600">{bharatRangEvent.contact.website}</p>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Application & Eligibility */}
                      <div className="space-y-4">
                        <h3 className="text-lg font-semibold text-gray-800 border-b pb-2">Application Info</h3>
                        <div className="space-y-3">
                          <div>
                            <p className="font-medium">Application Fee</p>
                            <p className="text-gray-600 text-sm font-semibold text-[#7E1F2E]">
                              {bharatRangEvent.registrationFee}
                            </p>
                          </div>
                          <div>
                            <p className="font-medium">Participants</p>
                            <p className="text-gray-600">{bharatRangEvent.groupSize}</p>
                          </div>
                          <div>
                            <p className="font-medium text-red-600">Application Deadline</p>
                            <p className="text-red-700 font-semibold">{bharatRangEvent.lastSubmissionDate}</p>
                          </div>
                          <div>
                            <p className="font-medium">Contact</p>
                            <p className="text-gray-600 text-sm">{bharatRangEvent.contact.email}</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Eligibility & Requirements Section */}
                    <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-4 sm:p-6 rounded-lg border border-green-200">
                      <h3 className="text-lg sm:text-xl font-bold text-green-800 mb-4 flex items-center">
                        <Award className="h-5 w-5 mr-2" />
                        Eligibility & Requirements
                      </h3>
                      <div className="space-y-2 text-green-700">
                        <p>• {bharatRangEvent.eligibility}</p>
                        {bharatRangEvent.additionalInfo?.map((info, index) => (
                          <p key={index}>• {info}</p>
                        ))}
                      </div>
                    </div>

                    {/* Contact Information */}
                    <div className="bg-gray-50 p-4 sm:p-6 rounded-lg">
                      <h3 className="text-lg font-semibold text-gray-800 mb-4">Contact Information</h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        <div className="flex items-center gap-3">
                          <Mail className="h-5 w-5 text-[#7E1F2E]" />
                          <div>
                            <p className="font-medium">Email</p>
                            <p className="text-sm text-gray-600">{bharatRangEvent.contact.email}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <Globe className="h-5 w-5 text-[#7E1F2E]" />
                          <div>
                            <p className="font-medium">Website</p>
                            <p className="text-sm text-gray-600">{bharatRangEvent.contact.website}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <Instagram className="h-5 w-5 text-[#7E1F2E]" />
                          <div>
                            <p className="font-medium">Instagram</p>
                            <p className="text-sm text-gray-600">{bharatRangEvent.contact.instagram}</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Application Button */}
                    <div className="pt-4">
                      <Link href={bharatRangEvent.registrationUrl} target="_blank" rel="noopener noreferrer">
                        <Button className="w-full bg-[#7E1F2E] hover:bg-[#6a1a27] text-white text-lg py-6 rounded-lg font-semibold">
                          Apply Now - {bharatRangEvent.registrationFee}
                          <ExternalLink className="h-5 w-5 ml-2" />
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="gorakhpur-rang" className="mt-6 sm:mt-8">
                {/* Gorakhpur Rang Mahotsav Card */}
                <Card className="group hover:shadow-xl transition-all duration-300 border-2 hover:border-[#7E1F2E]/20 mb-8">
                  <CardHeader className="pb-4">
                    <div className="flex items-start justify-between gap-4 mb-4">
                      <CardTitle className="text-xl sm:text-2xl lg:text-3xl font-bold group-hover:text-[#7E1F2E] transition-colors font-playfair">
                        {gorakhpurEvent.title}
                      </CardTitle>
                    </div>
                    <p className="text-lg text-gray-600 mb-4">
                      Organized by: <strong>{gorakhpurEvent.organizer}</strong>
                    </p>
                    <div className="flex flex-wrap gap-2">
                      <Badge className={`${getLanguageColor(gorakhpurEvent.language)}`}>
                        {gorakhpurEvent.language}
                      </Badge>
                      <Badge className={`${getCategoryColor(gorakhpurEvent.category)}`}>
                        {gorakhpurEvent.category}
                      </Badge>
                      <Badge variant="outline">{gorakhpurEvent.type}</Badge>
                    </div>
                  </CardHeader>

                  <CardContent className="space-y-6">
                    {/* Event Description */}
                    <p className="text-gray-700 text-base sm:text-lg leading-relaxed">{gorakhpurEvent.description}</p>

                    {/* Special Event Highlight */}
                    <div className="bg-gradient-to-r from-orange-50 to-red-50 p-4 sm:p-6 rounded-lg border border-orange-200">
                      <h3 className="text-lg sm:text-xl font-bold text-orange-800 mb-2 flex items-center">
                        <Award className="h-5 w-5 mr-2" />
                        Special Event
                      </h3>
                      <p className="text-orange-700 font-semibold text-base sm:text-lg mb-2">
                        {gorakhpurEvent.specialEvent}
                      </p>
                      <p className="text-orange-600">
                        <strong>Topic:</strong> {gorakhpurEvent.topic}
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
                              <p className="text-gray-600">{gorakhpurEvent.dates}</p>
                            </div>
                          </div>
                          <div className="flex items-start gap-3">
                            <Clock className="h-5 w-5 text-[#7E1F2E] shrink-0 mt-0.5" />
                            <div>
                              <p className="font-medium">Competition Dates</p>
                              <p className="text-gray-600">{gorakhpurEvent.competitionDates}</p>
                            </div>
                          </div>
                          <div className="flex items-start gap-3">
                            <MapPin className="h-5 w-5 text-[#7E1F2E] shrink-0 mt-0.5" />
                            <div>
                              <p className="font-medium">Location</p>
                              <p className="text-gray-600">{gorakhpurEvent.venue}</p>
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
                            <p className="text-gray-600 text-lg font-semibold text-[#7E1F2E]">
                              {gorakhpurEvent.registrationFee}
                            </p>
                          </div>
                          <div>
                            <p className="font-medium">Group Size</p>
                            <p className="text-gray-600">{gorakhpurEvent.groupSize}</p>
                          </div>
                          <div>
                            <p className="font-medium">Eligibility</p>
                            <p className="text-gray-600">{gorakhpurEvent.eligibility}</p>
                          </div>
                          <div>
                            <p className="font-medium text-red-600">Last Date of Submission</p>
                            <p className="text-red-700 font-semibold">{gorakhpurEvent.lastSubmissionDate}</p>
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
                          <div className="text-yellow-700">{gorakhpurEvent.prizes.first}</div>
                        </div>
                        <div className="text-center p-3 bg-gray-100 rounded-lg">
                          <div className="text-2xl font-bold text-gray-700 mb-1">🥈</div>
                          <div className="font-semibold text-gray-800">2nd Prize</div>
                          <div className="text-gray-700">{gorakhpurEvent.prizes.second}</div>
                        </div>
                        <div className="text-center p-3 bg-orange-100 rounded-lg">
                          <div className="text-2xl font-bold text-orange-700 mb-1">🥉</div>
                          <div className="font-semibold text-orange-800">3rd Prize</div>
                          <div className="text-orange-700">{gorakhpurEvent.prizes.third}</div>
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
                              {gorakhpurEvent.contact.phones.map((phone, index) => (
                                <p key={index}>{phone}</p>
                              ))}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <Globe className="h-5 w-5 text-[#7E1F2E]" />
                          <div>
                            <p className="font-medium">Website</p>
                            <p className="text-sm text-gray-600">{gorakhpurEvent.contact.website}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <Instagram className="h-5 w-5 text-[#7E1F2E]" />
                          <div>
                            <p className="font-medium">Instagram</p>
                            <p className="text-sm text-gray-600">{gorakhpurEvent.contact.instagram}</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Registration Button */}
                    <div className="pt-4">
                      <Link href={gorakhpurEvent.registrationUrl} target="_blank" rel="noopener noreferrer">
                        <Button className="w-full bg-[#7E1F2E] hover:bg-[#6a1a27] text-white text-lg py-6 rounded-lg font-semibold">
                          Register Now - {gorakhpurEvent.registrationFee}
                          <ExternalLink className="h-5 w-5 ml-2" />
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 sm:py-16 bg-gradient-to-r from-[#7E1F2E] to-[#A02A3A] text-white">
        <div className="container px-4 text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 font-playfair">
            Ready to Experience Theatre?
          </h2>
          <p className="text-base sm:text-lg lg:text-xl mb-6 sm:mb-8 opacity-90 max-w-2xl mx-auto px-4">
            Book your tickets for this weekend's shows or apply for prestigious theatre festivals. Don't miss the
            application deadline for Bharat Rang Mahotsav 2026 till 12:00 Midnight on{" "}
            {bharatRangEvent.lastSubmissionDate.split(" till ")[0]}!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link href={bharatRangEvent.registrationUrl} target="_blank" rel="noopener noreferrer">
              <Button
                size="lg"
                className="bg-white text-[#7E1F2E] hover:bg-gray-100 px-6 sm:px-8 py-3 text-base sm:text-lg rounded-full font-medium"
              >
                Apply to BRM 2026
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
