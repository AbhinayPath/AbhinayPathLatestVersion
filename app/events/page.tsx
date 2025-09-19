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
  }
  eligibility: string
}

interface BangalorePlay {
  id: string
  title: string
  venue: string
  date: string
  language: string
  category: "English" | "Hindi" | "Kannada" | "Special"
  bookingUrl: string
  description?: string
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

const bangalorePlays: BangalorePlay[] = [
  // English Plays
  {
    id: "external-affairs",
    title: "External Affairs",
    venue: "Ranga Shankara",
    date: "21st September",
    language: "English",
    category: "English",
    bookingUrl: "https://in.bookmyshow.com/plays/external-affairs/ET00405814",
    description: "A compelling drama exploring diplomatic relationships and personal conflicts.",
  },
  {
    id: "and-then-there-were-none",
    title: "And Then There Were None",
    venue: "Samarthanam Auditorium",
    date: "20th September",
    language: "English",
    category: "English",
    bookingUrl: "https://in.bookmyshow.com/plays/and-then-there-were-none/ET00436758",
    description: "Agatha Christie's classic mystery thriller brought to life on stage.",
  },
  {
    id: "reunion",
    title: "Reunion",
    venue: "Bangalore International Centre",
    date: "20th September",
    language: "English",
    category: "English",
    bookingUrl: "https://in.bookmyshow.com/plays/reunion/ET00457337",
    description: "A heartwarming story about old friends reconnecting after years apart.",
  },
  {
    id: "tiki-taka",
    title: "Tiki-Taka",
    venue: "Ranga Shankara",
    date: "20th September",
    language: "English",
    category: "English",
    bookingUrl: "https://in.bookmyshow.com/plays/tiki-taka/ET00447946",
    description: "A dynamic play inspired by football tactics and life strategies.",
  },
  {
    id: "madness-of-science",
    title: "Madness of Science",
    venue: "Curiouscity Science Center",
    date: "20th September",
    language: "English",
    category: "English",
    bookingUrl: "https://in.bookmyshow.com/plays/madness-of-science-by-the-science-circus/ET00461491",
    description: "An entertaining blend of science experiments and theatrical performance.",
  },
  {
    id: "tale-of-tall-girl",
    title: "Tale of a Tall Girl",
    venue: "Qutum Studio",
    date: "20th September",
    language: "English",
    category: "English",
    bookingUrl: "https://in.bookmyshow.com/plays/open-mic-night/ET00439182",
    description: "A coming-of-age story about self-acceptance and finding your place in the world.",
  },
  {
    id: "tragically-lonesome-vampire",
    title: "The Tragically Lonesome Vigilante Vampire",
    venue: "Shoonya Centre of Arts and Somatic Practices",
    date: "20th September",
    language: "English",
    category: "English",
    bookingUrl: "https://in.bookmyshow.com/plays/the-tragically-lonesome-vigilante-vampire/ET00460932",
    description: "A darkly comedic tale of a vampire struggling with modern life and loneliness.",
  },
  {
    id: "akvarious-25-years",
    title: "Akvarious 25 Years Celebration",
    venue: "Multiple Venues, Ranga Shankara",
    date: "19th September",
    language: "English",
    category: "English",
    bookingUrl: "https://in.bookmyshow.com/plays/akvarious-25-years-celebration/ET00441774",
    description: "A special celebration marking 25 years of Akvarious theatre group's journey.",
  },
  // Hindi Plays
  {
    id: "waiting-for-naseer",
    title: "Waiting for Naseer",
    venue: "The Comedy Theatre, Indiranagar",
    date: "20th September",
    language: "Hindi",
    category: "Hindi",
    bookingUrl: "https://in.bookmyshow.com/plays/waiting-for-naseer/ET00460155",
    description: "A witty comedy about anticipation, expectations, and the art of waiting.",
  },
  {
    id: "contractions",
    title: "Contractions",
    venue: "The Comedy Theatre, Indiranagar",
    date: "21st September",
    language: "Hindi",
    category: "Hindi",
    bookingUrl: "https://in.bookmyshow.com/plays/contractions/ET00460664",
    description: "A sharp, satirical look at corporate culture and workplace dynamics.",
  },
  // Kannada Plays
  {
    id: "maayaa-dweepa",
    title: "Maayaa Dweepa",
    venue: "Kalagrama",
    date: "21st September",
    language: "Kannada",
    category: "Kannada",
    bookingUrl: "https://in.bookmyshow.com/plays/maayaa-dweepa/ET00462369",
    description: "A mystical journey through an island of illusions and self-discovery.",
  },
  {
    id: "baybadki",
    title: "BAYBADKI",
    venue: "Dr.C Ashwath Kala Bhavana",
    date: "21st September",
    language: "Kannada",
    category: "Kannada",
    bookingUrl: "https://in.bookmyshow.com/plays/baybadki-comedy-drama/ET00448592",
    description: "A comedy-drama exploring family relationships and generational conflicts.",
  },
  {
    id: "home-rule-kailasam",
    title: "Home Rule & Kannadakkobane Kailasam",
    venue: "Dr.C Ashwath Kala Bhavana",
    date: "20th September",
    language: "Kannada",
    category: "Kannada",
    bookingUrl: "https://in.bookmyshow.com/plays/home-rule-kannadakkobane-kailasam/ET00444016",
    description: "A tribute to Kannada literature and the freedom struggle through theatrical storytelling.",
  },
  {
    id: "anumanada-avanthara",
    title: "ANUMANADA AVANTHARA",
    venue: "Dr.C Ashwath Kala Bhavana",
    date: "21st September",
    language: "Kannada",
    category: "Kannada",
    bookingUrl: "https://in.bookmyshow.com/plays/anumanada-avanthara-comedy-drama/ET00458921",
    description: "A comedy-drama about unexpected adventures and life's surprising turns.",
  },
  // Special/Multilingual Plays
  {
    id: "anthithottam",
    title: "Anthithottam – The Final Act",
    venue: "Jagriti Theatre",
    date: "20th September",
    language: "French/Malayalam",
    category: "Special",
    bookingUrl: "https://in.bookmyshow.com/plays/anthithottam-the-last-act/ET00460217",
    description: "A bilingual theatrical experience exploring themes of finality and new beginnings.",
  },
  {
    id: "divine-devis",
    title: "Divine Devis",
    venue: "Namma Ashram",
    date: "20th September",
    language: "Multilingual",
    category: "Special",
    bookingUrl: "https://in.bookmyshow.com/plays/divine-devis/ET00461626",
    description: "A celebration of feminine divinity through dance, music, and storytelling.",
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
  const specialPlays = bangalorePlays.filter((play) => play.category === "Special")

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
                <div className="text-xl sm:text-2xl lg:text-3xl font-bold">5</div>
                <div className="text-xs sm:text-sm opacity-80">Days Festival</div>
              </div>
              <div className="bg-white/10 rounded-lg p-3 sm:p-4">
                <div className="text-xl sm:text-2xl lg:text-3xl font-bold">{bangalorePlays.length}+</div>
                <div className="text-xs sm:text-sm opacity-80">Weekend Shows</div>
              </div>
              <div className="bg-white/10 rounded-lg p-3 sm:p-4">
                <div className="text-xl sm:text-2xl lg:text-3xl font-bold">4</div>
                <div className="text-xs sm:text-sm opacity-80">Languages</div>
              </div>
              <div className="bg-white/10 rounded-lg p-3 sm:p-4">
                <div className="text-xl sm:text-2xl lg:text-3xl font-bold">₹500</div>
                <div className="text-xs sm:text-sm opacity-80">Festival Entry</div>
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
                Discover this weekend's exciting theatre performances across Bangalore in multiple languages
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
                  <TabsTrigger value="special" className="text-xs sm:text-sm px-2 sm:px-4">
                    Special ({specialPlays.length})
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

              <TabsContent value="special" className="mt-6 sm:mt-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                  {specialPlays.map((play) => (
                    <PlayCard key={play.id} play={play} />
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </section>

      {/* Main Event Section */}
      <section className="py-8 sm:py-12">
        <div className="container px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-2xl sm:text-3xl font-bold font-playfair text-gray-800 mb-4">
                National Theatre Festival
              </h2>
              <p className="text-base sm:text-lg text-gray-600">
                Join the prestigious 3rd Gorakhpur Rang Mahotsav 2025
              </p>
            </div>

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
            Ready to Experience Theatre?
          </h2>
          <p className="text-base sm:text-lg lg:text-xl mb-6 sm:mb-8 opacity-90 max-w-2xl mx-auto px-4">
            Book your tickets for this weekend's shows or register for the national festival before{" "}
            {event.lastSubmissionDate}!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link href={event.registrationUrl} target="_blank" rel="noopener noreferrer">
              <Button
                size="lg"
                className="bg-white text-[#7E1F2E] hover:bg-gray-100 px-6 sm:px-8 py-3 text-base sm:text-lg rounded-full font-medium"
              >
                Register for Festival
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
