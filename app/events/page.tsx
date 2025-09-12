"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar, MapPin, Clock, ExternalLink, Filter, Star, Users } from "lucide-react"
import Link from "next/link"

interface Event {
  id: string
  title: string
  date: string
  time?: string
  venue: string
  language: string
  category: "Festival" | "Play" | "Workshop" | "Storytelling" | "Improv"
  type: "Theatre" | "Workshop" | "Talk" | "Children"
  bookingUrl: string
  description?: string
  featured?: boolean
  festivalName?: string
  price?: string
}

const events: Event[] = [
  // Jairangam Festival Events
  {
    id: "jairangam-1",
    title: "Kankad Moti Aur Kinwad",
    date: "2024-09-13",
    venue: "Prabhath Kala Dwarka Auditorium",
    language: "Hindi",
    category: "Festival",
    type: "Theatre",
    bookingUrl: "https://in.bookmyshow.com/plays/kankad-moti-aur-kinwad-jairangam-fringes/ET00460458",
    festivalName: "Jairangam Festival",
    featured: true,
  },
  {
    id: "jairangam-2",
    title: "Lal Paan Ki Begum - A Dramatised Reading",
    date: "2024-09-14",
    venue: "Prabhath Kala Dwarka Auditorium",
    language: "Hindi",
    category: "Festival",
    type: "Theatre",
    bookingUrl: "https://in.bookmyshow.com/plays/lal-paan-ki-begum-a-dramatised-reading/ET00461346",
    festivalName: "Jairangam Festival",
    featured: true,
  },
  {
    id: "jairangam-3",
    title: "Love Letters",
    date: "2024-09-14",
    venue: "Prabhath Kala Dwarka Auditorium",
    language: "Kannada",
    category: "Festival",
    type: "Theatre",
    bookingUrl: "https://in.bookmyshow.com/plays/love-letters-jairangam-fringes/ET00460400",
    festivalName: "Jairangam Festival",
    featured: true,
  },
  {
    id: "jairangam-4",
    title: "A Talk Show by Prasanna Ji",
    date: "2024-09-14",
    venue: "Prabhath Kala Dwarka Auditorium",
    language: "Hindi + English",
    category: "Workshop",
    type: "Talk",
    bookingUrl: "https://in.bookmyshow.com/plays/a-talk-show-by-prasanna-ji/ET00461976",
    festivalName: "Jairangam Festival",
    featured: true,
  },
  // Kannada Theatre Festival
  {
    id: "kannada-fest-1",
    title: "Kannada Natakaotsava - Show 1",
    date: "2024-09-13",
    venue: "Chowdiah Memorial Hall",
    language: "Kannada",
    category: "Festival",
    type: "Theatre",
    bookingUrl: "https://in.bookmyshow.com/plays/kannada-natakaotsava/ET00456792",
    festivalName: "Kannada Theatre Festival",
    featured: true,
  },
  {
    id: "kannada-fest-2",
    title: "Kannada Natakaotsava - Show 2",
    date: "2024-09-13",
    venue: "Chowdiah Memorial Hall",
    language: "Kannada",
    category: "Festival",
    type: "Theatre",
    bookingUrl: "https://in.bookmyshow.com/plays/kannada-natakaotsava/ET00456785",
    festivalName: "Kannada Theatre Festival",
    featured: true,
  },
  // Hindi Theatre Plays
  {
    id: "hindi-1",
    title: "Patna Ka Superhero",
    date: "2024-09-13",
    venue: "Jagriti Theatre",
    language: "Hindi",
    category: "Play",
    type: "Theatre",
    bookingUrl: "https://in.bookmyshow.com/plays/patna-ka-superhero/ET00457494",
  },
  {
    id: "hindi-2",
    title: "Udhedbun",
    date: "2024-09-13",
    venue: "Vyoma Artspace",
    language: "Hindi",
    category: "Play",
    type: "Theatre",
    bookingUrl: "https://in.bookmyshow.com/plays/udhedbun/ET00382208",
  },
  {
    id: "hindi-3",
    title: "Khichik",
    date: "2024-09-14",
    venue: "Jagriti Theatre",
    language: "Hindi",
    category: "Play",
    type: "Theatre",
    bookingUrl: "https://in.bookmyshow.com/plays/khichik/ET00457496",
  },
  // English Theatre Play
  {
    id: "english-1",
    title: "Avatarana",
    date: "2024-09-14",
    venue: "Kappanna Angala",
    language: "English",
    category: "Play",
    type: "Theatre",
    bookingUrl: "https://in.bookmyshow.com/plays/avatarana/ET00459734",
  },
  // Kannada Theatre Plays
  {
    id: "kannada-1",
    title: "Sarasa Virasa Samarasa",
    date: "2024-09-13",
    venue: "Kalagram Bengaluru University",
    language: "Kannada",
    category: "Play",
    type: "Theatre",
    bookingUrl: "https://in.bookmyshow.com/plays/sarasa-virasa-samarasa/ET00381891",
  },
  {
    id: "kannada-2",
    title: "Rama Shama Drama (Comedy Drama)",
    date: "2024-09-13",
    venue: "Dr C Ashwanath Kala Bhavan",
    language: "Kannada",
    category: "Play",
    type: "Theatre",
    bookingUrl: "https://in.bookmyshow.com/plays/rama-shama-drama-comedy-drama/ET00458985",
  },
  {
    id: "kannada-3",
    title: "Suddenaag Sathodre",
    date: "2024-09-14",
    venue: "Seva Sadan, Malleshwaram",
    language: "Kannada",
    category: "Play",
    type: "Theatre",
    bookingUrl: "https://in.bookmyshow.com/plays/kannada-play-suddenaag-sathodre/ET00461528",
  },
  {
    id: "kannada-4",
    title: "Shashvatha Parihara",
    date: "2024-09-12",
    venue: "Kalagram Bengaluru University",
    language: "Kannada",
    category: "Play",
    type: "Theatre",
    bookingUrl: "https://in.bookmyshow.com/plays/shashvatha-parihara/ET00459301",
  },
  {
    id: "kannada-5",
    title: "Pukkate Salahe (Comedy Drama)",
    date: "2024-09-14",
    venue: "Suchitra Film Society",
    language: "Kannada",
    category: "Play",
    type: "Theatre",
    bookingUrl: "https://in.bookmyshow.com/plays/pukkate-salahe-comedy-drama/ET00105263",
  },
  {
    id: "kannada-6",
    title: "Drama Eraderadla Idu",
    date: "2024-09-14",
    venue: "Vyoma Art Space",
    language: "Kannada",
    category: "Play",
    type: "Theatre",
    bookingUrl: "https://in.bookmyshow.com/plays/drama-eraderadla-idu/ET00460455",
  },
  {
    id: "kannada-7",
    title: "Pouranika Yaksha Parva - Damayanthi Bhrigu Shapa",
    date: "2024-09-13",
    venue: "Ravindra Kalakshetra",
    language: "Kannada",
    category: "Play",
    type: "Theatre",
    bookingUrl: "https://in.bookmyshow.com/plays/pouranika-yaksha-parva-damayanthi-bhrigu-shapa/ET00456585",
  },
  {
    id: "kannada-8",
    title: "Sharmisthe",
    date: "2024-09-12",
    venue: "Rangashankara",
    language: "Kannada",
    category: "Play",
    type: "Theatre",
    bookingUrl: "https://in.bookmyshow.com/plays/sharmisthe/ET00459295",
    description: "Running from 12-14 September",
  },
  {
    id: "kannada-9",
    title: "Mysuru Mallige",
    date: "2024-09-13",
    venue: "Rangashankara",
    language: "Kannada",
    category: "Play",
    type: "Theatre",
    bookingUrl: "https://in.bookmyshow.com/plays/mysuru-mallige/ET00326261",
  },
  {
    id: "kannada-10",
    title: "Mukhyamantri",
    date: "2024-09-13",
    venue: "Rangashankara",
    language: "Kannada",
    category: "Play",
    type: "Theatre",
    bookingUrl: "https://in.bookmyshow.com/plays/mukhyamantri/ET00319101",
  },
  // Bengali Theatre
  {
    id: "bengali-1",
    title: "Amrito Sandhane",
    date: "2024-09-14",
    venue: "Medai The Stage",
    language: "Bengali",
    category: "Play",
    type: "Theatre",
    bookingUrl: "https://in.bookmyshow.com/plays/amrito-sandhane/ET00451176",
  },
  // Children's Theatre
  {
    id: "children-1",
    title: "A Plant A Tree",
    date: "2024-09-14",
    venue: "Rangashankara",
    language: "English",
    category: "Play",
    type: "Children",
    bookingUrl: "https://in.bookmyshow.com/plays/a-plant-a-tree/ET00447810",
  },
  // Improv Theatre
  {
    id: "improv-1",
    title: "Whimsical Weekend with Improv Lore",
    date: "2024-09-13",
    venue: "Small World",
    language: "English",
    category: "Improv",
    type: "Theatre",
    bookingUrl: "https://in.bookmyshow.com/plays/whimsical-weekend-with-improv-lore/ET00456951",
  },
  // Storytelling
  {
    id: "storytelling-1",
    title: "Thank You Stranger",
    date: "2024-09-13",
    venue: "Bloom Creative Zone",
    language: "English",
    category: "Storytelling",
    type: "Theatre",
    bookingUrl: "https://in.bookmyshow.com/plays/thank-you-stranger/ET00458919",
  },
  // Workshops
  {
    id: "workshop-1",
    title: "Take a Child to the Theatre - Storytelling",
    date: "2024-09-14",
    venue: "Rangashankara",
    language: "English",
    category: "Workshop",
    type: "Children",
    bookingUrl: "https://in.bookmyshow.com/plays/take-a-child-to-the-theatre-storytelling/ET00436157",
  },
  {
    id: "workshop-2",
    title: "Act on the Spot - Improv Workshop",
    date: "2024-09-13",
    venue: "TBD",
    language: "English",
    category: "Workshop",
    type: "Workshop",
    bookingUrl: "https://in.bookmyshow.com/plays/act-on-the-spot/ET00378386",
  },
  {
    id: "workshop-3",
    title: "Introduction to Playback Theatre",
    date: "2024-09-13",
    venue: "Domlur",
    language: "English",
    category: "Workshop",
    type: "Workshop",
    bookingUrl: "https://www.abhinaypath.com/workshops/32",
    description: "13-14 September",
  },
]

export default function EventsPage() {
  const [selectedDate, setSelectedDate] = useState<string>("all")
  const [selectedLanguage, setSelectedLanguage] = useState<string>("all")
  const [selectedCategory, setSelectedCategory] = useState<string>("all")

  const filteredEvents = events.filter((event) => {
    if (selectedDate !== "all" && event.date !== selectedDate) return false
    if (selectedLanguage !== "all" && event.language !== selectedLanguage) return false
    if (selectedCategory !== "all" && event.category !== selectedCategory) return false
    return true
  })

  const featuredEvents = events.filter((event) => event.featured)
  const festivals = events.filter((event) => event.category === "Festival")
  const plays = events.filter((event) => event.category === "Play")
  const workshops = events.filter((event) => event.category === "Workshop")

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-IN", {
      weekday: "short",
      day: "numeric",
      month: "short",
    })
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
      Play: "bg-blue-100 text-blue-800",
      Workshop: "bg-green-100 text-green-800",
      Storytelling: "bg-purple-100 text-purple-800",
      Improv: "bg-pink-100 text-pink-800",
    }
    return colors[category] || "bg-gray-100 text-gray-800"
  }

  const EventCard = ({ event }: { event: Event }) => (
    <Card className="group hover:shadow-lg transition-all duration-300 border-2 hover:border-[#7E1F2E]/20 h-full flex flex-col">
      <CardHeader className="pb-3 flex-shrink-0">
        <div className="flex items-start justify-between gap-2 mb-2">
          <CardTitle className="text-base sm:text-lg font-bold group-hover:text-[#7E1F2E] transition-colors line-clamp-2 leading-tight">
            {event.title}
          </CardTitle>
          {event.featured && (
            <Badge className="bg-[#7E1F2E] text-white shrink-0 text-xs">
              <Star className="h-3 w-3 mr-1" />
              <span className="hidden sm:inline">Featured</span>
            </Badge>
          )}
        </div>
        {event.festivalName && (
          <Badge variant="outline" className="w-fit text-xs">
            {event.festivalName}
          </Badge>
        )}
      </CardHeader>
      <CardContent className="space-y-3 flex-grow flex flex-col">
        <div className="flex flex-wrap gap-1.5">
          <Badge className={`${getLanguageColor(event.language)} text-xs`}>{event.language}</Badge>
          <Badge className={`${getCategoryColor(event.category)} text-xs`}>{event.category}</Badge>
        </div>

        <div className="space-y-2 text-xs sm:text-sm text-gray-600 flex-grow">
          <div className="flex items-center gap-2">
            <Calendar className="h-3 w-3 sm:h-4 sm:w-4 shrink-0" />
            <span>{formatDate(event.date)}</span>
            {event.time && (
              <>
                <Clock className="h-3 w-3 sm:h-4 sm:w-4 ml-2 shrink-0" />
                <span>{event.time}</span>
              </>
            )}
          </div>
          <div className="flex items-start gap-2">
            <MapPin className="h-3 w-3 sm:h-4 sm:w-4 shrink-0 mt-0.5" />
            <span className="line-clamp-2 leading-tight">{event.venue}</span>
          </div>
        </div>

        {event.description && <p className="text-xs sm:text-sm text-gray-600 line-clamp-2">{event.description}</p>}

        <div className="pt-2 mt-auto">
          <Link href={event.bookingUrl} target="_blank" rel="noopener noreferrer">
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
              Theatre Events in Bangalore
            </h1>
            <p className="text-base sm:text-lg lg:text-xl opacity-90 mb-6 sm:mb-8 px-4">
              Discover the vibrant theatre scene with festivals, plays, workshops, and more happening this week
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 text-center max-w-2xl mx-auto">
              <div className="bg-white/10 rounded-lg p-3 sm:p-4">
                <div className="text-xl sm:text-2xl lg:text-3xl font-bold">{events.length}+</div>
                <div className="text-xs sm:text-sm opacity-80">Total Events</div>
              </div>
              <div className="bg-white/10 rounded-lg p-3 sm:p-4">
                <div className="text-xl sm:text-2xl lg:text-3xl font-bold">{festivals.length}</div>
                <div className="text-xs sm:text-sm opacity-80">Festivals</div>
              </div>
              <div className="bg-white/10 rounded-lg p-3 sm:p-4">
                <div className="text-xl sm:text-2xl lg:text-3xl font-bold">{plays.length}</div>
                <div className="text-xs sm:text-sm opacity-80">Plays</div>
              </div>
              <div className="bg-white/10 rounded-lg p-3 sm:p-4">
                <div className="text-xl sm:text-2xl lg:text-3xl font-bold">{workshops.length}</div>
                <div className="text-xs sm:text-sm opacity-80">Workshops</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Events */}
      {featuredEvents.length > 0 && (
        <section className="py-8 sm:py-12 bg-white">
          <div className="container px-4">
            <h2 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8 text-center font-playfair">
              Featured Festivals
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {featuredEvents.map((event) => (
                <EventCard key={event.id} event={event} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Main Events Section */}
      <section className="py-8 sm:py-12">
        <div className="container px-4">
          {/* Filters */}
          <div className="bg-white p-4 sm:p-6 rounded-lg shadow-sm mb-6 sm:mb-8">
            <div className="flex items-center gap-2 mb-4">
              <Filter className="h-4 w-4 sm:h-5 sm:w-5" />
              <h3 className="font-semibold text-sm sm:text-base">Filter Events</h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
              <Select value={selectedDate} onValueChange={setSelectedDate}>
                <SelectTrigger className="text-sm">
                  <SelectValue placeholder="Select Date" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Dates</SelectItem>
                  <SelectItem value="2024-09-12">Sep 12, 2024</SelectItem>
                  <SelectItem value="2024-09-13">Sep 13, 2024</SelectItem>
                  <SelectItem value="2024-09-14">Sep 14, 2024</SelectItem>
                </SelectContent>
              </Select>

              <Select value={selectedLanguage} onValueChange={setSelectedLanguage}>
                <SelectTrigger className="text-sm">
                  <SelectValue placeholder="Select Language" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Languages</SelectItem>
                  <SelectItem value="Hindi">Hindi</SelectItem>
                  <SelectItem value="Kannada">Kannada</SelectItem>
                  <SelectItem value="English">English</SelectItem>
                  <SelectItem value="Bengali">Bengali</SelectItem>
                  <SelectItem value="Hindi + English">Hindi + English</SelectItem>
                </SelectContent>
              </Select>

              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="text-sm sm:col-span-2 lg:col-span-1">
                  <SelectValue placeholder="Select Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="Festival">Festival</SelectItem>
                  <SelectItem value="Play">Play</SelectItem>
                  <SelectItem value="Workshop">Workshop</SelectItem>
                  <SelectItem value="Storytelling">Storytelling</SelectItem>
                  <SelectItem value="Improv">Improv</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Clear Filters Button */}
            <div className="mt-4 sm:hidden">
              <Button
                variant="outline"
                size="sm"
                className="w-full bg-transparent"
                onClick={() => {
                  setSelectedDate("all")
                  setSelectedLanguage("all")
                  setSelectedCategory("all")
                }}
              >
                Clear All Filters
              </Button>
            </div>
          </div>

          {/* Events Tabs */}
          <Tabs defaultValue="all" className="w-full">
            <div className="overflow-x-auto">
              <TabsList className="grid w-full grid-cols-5 min-w-[500px] sm:min-w-0">
                <TabsTrigger value="all" className="text-xs sm:text-sm px-2 sm:px-4">
                  All ({filteredEvents.length})
                </TabsTrigger>
                <TabsTrigger value="festivals" className="text-xs sm:text-sm px-2 sm:px-4">
                  Festivals ({festivals.length})
                </TabsTrigger>
                <TabsTrigger value="plays" className="text-xs sm:text-sm px-2 sm:px-4">
                  Plays ({plays.length})
                </TabsTrigger>
                <TabsTrigger value="workshops" className="text-xs sm:text-sm px-2 sm:px-4">
                  Workshops ({workshops.length})
                </TabsTrigger>
                <TabsTrigger value="others" className="text-xs sm:text-sm px-2 sm:px-4">
                  Others
                </TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="all" className="mt-6 sm:mt-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                {filteredEvents.map((event) => (
                  <EventCard key={event.id} event={event} />
                ))}
              </div>
              {filteredEvents.length === 0 && (
                <div className="text-center py-12">
                  <Users className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                  <p className="text-gray-500 text-lg mb-4">No events found matching your filters.</p>
                  <Button
                    variant="outline"
                    onClick={() => {
                      setSelectedDate("all")
                      setSelectedLanguage("all")
                      setSelectedCategory("all")
                    }}
                  >
                    Clear All Filters
                  </Button>
                </div>
              )}
            </TabsContent>

            <TabsContent value="festivals" className="mt-6 sm:mt-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                {festivals.map((event) => (
                  <EventCard key={event.id} event={event} />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="plays" className="mt-6 sm:mt-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                {plays.map((event) => (
                  <EventCard key={event.id} event={event} />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="workshops" className="mt-6 sm:mt-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                {workshops.map((event) => (
                  <EventCard key={event.id} event={event} />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="others" className="mt-6 sm:mt-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                {events
                  .filter((event) => !["Festival", "Play", "Workshop"].includes(event.category))
                  .map((event) => (
                    <EventCard key={event.id} event={event} />
                  ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 sm:py-16 bg-gradient-to-r from-[#7E1F2E] to-[#A02A3A] text-white">
        <div className="container px-4 text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 font-playfair">
            Don't Miss Out on These Amazing Events!
          </h2>
          <p className="text-base sm:text-lg lg:text-xl mb-6 sm:mb-8 opacity-90 max-w-2xl mx-auto px-4">
            Book your tickets now and be part of Bangalore's vibrant theatre community
          </p>
          <Link href="/join-community">
            <Button
              size="lg"
              className="bg-white text-[#7E1F2E] hover:bg-gray-100 px-6 sm:px-8 py-3 text-base sm:text-lg rounded-full font-medium"
            >
              Join Our Community
            </Button>
          </Link>
        </div>
      </section>
    </div>
  )
}
