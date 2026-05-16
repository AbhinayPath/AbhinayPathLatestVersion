import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  ArrowRight,
  Clapperboard,
  Users,
  Handshake,
  CalendarDays,
  MapPin,
  Award,
  Clock,
  Globe,
  Play,
  ExternalLink,
  MessageCircle,
} from "lucide-react"

export const metadata: Metadata = {
  title: "Collaborations & Productions | AbhinayPath",
  description:
    "AbhinayPath collaborates with institutions, theatre groups, and cultural communities to curate meaningful live theatre experiences across India.",
  openGraph: {
    title: "Collaborations & Productions | AbhinayPath",
    description:
      "AbhinayPath collaborates with institutions, theatre groups, and cultural communities to curate meaningful live theatre experiences.",
    url: "https://abhinaypath.com/collaborations",
    type: "website",
  },
}

const productions = [
  {
    id: "goodbye-calendar",
    title: "Goodbye Calendar",
    language: "English",
    duration: "90 minutes",
    director: "Srinivas Beesetty",
    writer: "Rita Chhablani",
    productionBy: "Kahe Vidushak Foundation",
    venue: "Indian Heritage Academy, Koramangala, Bengaluru",
    date: "11 April, 6:30 PM",
    poster: "/images/goodbye-calendar-poster.png",
    eventLink: "https://indianheritageacademy.org/etn/goodbye-calendar/",
    videoLink: "https://youtu.be/ZohjtWxZYEU?si=uMsieAs7XcTNyhUj",
    synopsis:
      "Retired school teacher Mr. Rodrigues lives a quiet, disciplined life, occasionally interrupted by loneliness. When his former student Sidharth rents a room in his house, the young man's presence brings warmth and energy into his routine. Through humour, tenderness, and introspection, the play explores loneliness, companionship, memory, and the courage to change — even late in life.",
  },
  {
    id: "sakal-jaani-he-naath",
    title: "Sakal Jaani He Naath",
    language: "Hindi / Folk musical satire",
    director: "Srinivas Beesetty",
    performer: "Bhumika Mane",
    productionBy: "Kahe Vidushak Foundation",
    venue: "Indian Heritage Academy, Koramangala, Bengaluru",
    date: "2 May, 6:30 PM",
    poster: "/images/sakal-jaani-poster.jpeg",
    eventLink: "https://indianheritageacademy.org/etn/sakal-jaani-he-naath-theatre-may-2/",
    synopsis:
      "A folk musical comical satire adapted from Vasant Deo's 'Sudama Ke Chawal'. The play revisits the mythological story of Krishna and Sudama while exploring contemporary social behaviour, double standards, masculinity, and power through folk theatre forms.",
    recognitions: [
      "National School of Drama, New Delhi",
      "Serendipity Art Festival, Goa",
      "Jairangam Fringes",
      "National Folk Theatre Festival, Mysuru",
      "Windermere Theatre Fest, Bareilly",
      "National Theatre Festival, Shimla",
      "Nataknama Theatre Festival, Bangalore",
    ],
    awards: ["Play of the Year", "Best Folk Play", "Best Actress - Shimla 2023", "Best Actress - Nataknama, Blr"],
    stats: { cities: "12", shows: "30+" },
  },
]

const partnerLogos = [
  { name: "AbhinayPath", logo: "/images/abhinaypath-full-logo.jpeg" },
  { name: "Azim Premji University", logo: "/images/azim-premji-university-logo.png" },
  { name: "Indian Heritage Academy", logo: "/images/indian-heritage-academy-logo.png" },
  { name: "Kahe Vidushak Foundation", logo: "/images/kahe-vidushak-foundation-logo.png" },
]

export default function CollaborationsPage() {
  return (
    <div className="flex flex-col min-h-screen bg-[#0a0a0f] scroll-smooth">
      {/* Hero Section */}
      <section className="relative py-20 md:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#1a1a2e] via-[#0a0a0f] to-[#0a0a0f]" />
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-20 left-10 w-72 h-72 bg-amber-500/20 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
        </div>

        <div className="container relative z-10">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <Badge className="bg-amber-500/20 text-amber-400 border-amber-500/30 hover:bg-amber-500/30 mb-4">
              <Handshake className="h-3.5 w-3.5 mr-1" />
              Collaborations & Productions
            </Badge>
            <h1 className="font-playfair text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight">
              Curating meaningful theatre experiences with institutions, artists, and audiences.
            </h1>
            <p className="text-lg sm:text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
              AbhinayPath works with institutions and theatre groups to bring carefully selected live performances into
              cultural, academic, and community spaces.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
              <a href="#productions">
                <Button
                  size="lg"
                  className="rounded-full bg-amber-500 text-black hover:bg-amber-400 text-lg px-8 py-6 h-auto font-medium transition-all hover:scale-105"
                >
                  Explore Productions <Clapperboard className="ml-2 h-5 w-5" />
                </Button>
              </a>
              <a href="#partner">
                <Button
                  size="lg"
                  variant="outline"
                  className="rounded-full border-2 border-white/30 text-white hover:bg-white/10 text-lg px-8 py-6 h-auto font-medium transition-all bg-transparent"
                >
                  Partner With Us <Handshake className="ml-2 h-5 w-5" />
                </Button>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Strip - Partner Logos */}
      <section className="py-12 border-y border-white/10 bg-[#0d0d14]">
        <div className="container">
          <p className="text-center text-gray-500 text-sm uppercase tracking-widest mb-8">
            In collaboration with
          </p>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16">
            {partnerLogos.map((partner) => (
              <div key={partner.name} className="flex items-center gap-3 opacity-70 hover:opacity-100 transition-opacity">
                <div className="relative h-12 w-12 rounded-full overflow-hidden bg-white/10">
                  <Image
                    src={partner.logo}
                    alt={partner.name}
                    fill
                    className="object-contain p-2"
                  />
                </div>
                <span className="text-gray-400 text-sm font-medium">{partner.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Institutional Collaboration */}
      <section className="py-20 md:py-28">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <Badge className="bg-purple-500/20 text-purple-400 border-purple-500/30">
              <Award className="h-3.5 w-3.5 mr-1" />
              Featured Collaboration
            </Badge>
            <h2 className="font-playfair text-3xl md:text-4xl lg:text-5xl font-bold text-white">
              Presented with Indian Heritage Academy, supported by Azim Premji University
            </h2>
            <p className="text-gray-400 text-lg leading-relaxed max-w-3xl mx-auto">
              AbhinayPath collaborated with Indian Heritage Academy and Azim Premji University to present curated
              theatre productions at IHA, Koramangala, Bengaluru — bringing meaningful live theatre to academic and
              cultural communities.
            </p>
          </div>
        </div>
      </section>

      {/* Featured Productions */}
      <section id="productions" className="py-20 md:py-28 bg-gradient-to-b from-[#0a0a0f] to-[#0d0d14]">
        <div className="container">
          <div className="text-center mb-16">
            <Badge className="bg-amber-500/20 text-amber-400 border-amber-500/30 mb-4">
              <Clapperboard className="h-3.5 w-3.5 mr-1" />
              Featured Productions
            </Badge>
            <h2 className="font-playfair text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
              Curated Theatre Productions
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Carefully selected productions that bring depth, meaning, and artistry to the stage.
            </p>
          </div>

          <div className="space-y-16">
            {productions.map((production, index) => (
              <Card
                key={production.id}
                className="bg-[#12121a] border-white/10 overflow-hidden hover:border-amber-500/30 transition-all"
              >
                <div className={`grid md:grid-cols-2 gap-0 ${index % 2 === 1 ? "md:grid-flow-dense" : ""}`}>
                  {/* Poster */}
                  <div className={`relative aspect-[3/4] md:aspect-auto ${index % 2 === 1 ? "md:col-start-2" : ""}`}>
                    <Image
                      src={production.poster}
                      alt={production.title}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#12121a] via-transparent to-transparent md:bg-gradient-to-r md:from-transparent md:via-transparent md:to-[#12121a]" />
                  </div>

                  {/* Content */}
                  <CardContent className="p-8 md:p-12 flex flex-col justify-center">
                    <Badge className="bg-amber-500/20 text-amber-400 border-amber-500/30 w-fit mb-4">
                      {production.language}
                    </Badge>
                    <h3 className="font-playfair text-3xl md:text-4xl font-bold text-white mb-4">
                      {production.title}
                    </h3>

                    <div className="space-y-3 text-gray-400 mb-6">
                      <div className="flex items-center gap-2">
                        <Users className="h-4 w-4 text-amber-500" />
                        <span>Directed by {production.director}</span>
                      </div>
                      {production.writer && (
                        <div className="flex items-center gap-2">
                          <Clapperboard className="h-4 w-4 text-amber-500" />
                          <span>Written by {production.writer}</span>
                        </div>
                      )}
                      {production.performer && (
                        <div className="flex items-center gap-2">
                          <Users className="h-4 w-4 text-amber-500" />
                          <span>Performed by {production.performer}</span>
                        </div>
                      )}
                      {production.duration && (
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4 text-amber-500" />
                          <span>{production.duration}</span>
                        </div>
                      )}
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-amber-500" />
                        <span>{production.venue}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CalendarDays className="h-4 w-4 text-amber-500" />
                        <span>{production.date}</span>
                      </div>
                    </div>

                    <p className="text-gray-300 leading-relaxed mb-6">{production.synopsis}</p>

                    {/* Awards & Recognitions for Sakal Jaani */}
                    {production.recognitions && (
                      <div className="mb-6">
                        <p className="text-amber-400 text-sm font-medium mb-3">Performed at:</p>
                        <div className="flex flex-wrap gap-2">
                          {production.recognitions.slice(0, 4).map((recognition) => (
                            <Badge
                              key={recognition}
                              variant="outline"
                              className="text-gray-400 border-white/20 text-xs"
                            >
                              {recognition}
                            </Badge>
                          ))}
                          {production.recognitions.length > 4 && (
                            <Badge variant="outline" className="text-gray-400 border-white/20 text-xs">
                              +{production.recognitions.length - 4} more
                            </Badge>
                          )}
                        </div>
                      </div>
                    )}

                    {production.awards && (
                      <div className="flex flex-wrap gap-3 mb-6">
                        {production.awards.slice(0, 3).map((award) => (
                          <div
                            key={award}
                            className="flex items-center gap-1 text-amber-400 text-sm"
                          >
                            <Award className="h-4 w-4" />
                            <span>{award}</span>
                          </div>
                        ))}
                      </div>
                    )}

                    <div className="flex flex-wrap gap-3">
                      <Link href={production.eventLink} target="_blank">
                        <Button className="rounded-full bg-amber-500 text-black hover:bg-amber-400">
                          View Event <ExternalLink className="ml-2 h-4 w-4" />
                        </Button>
                      </Link>
                      {production.videoLink && (
                        <Link href={production.videoLink} target="_blank">
                          <Button
                            variant="outline"
                            className="rounded-full border-white/30 text-white hover:bg-white/10 bg-transparent"
                          >
                            Watch Video <Play className="ml-2 h-4 w-4" />
                          </Button>
                        </Link>
                      )}
                    </div>
                  </CardContent>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Theatre Partner Section */}
      <section className="py-20 md:py-28 bg-[#0d0d14]">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <Badge className="bg-purple-500/20 text-purple-400 border-purple-500/30 mb-4">
                <Users className="h-3.5 w-3.5 mr-1" />
                Theatre Partner
              </Badge>
              <h2 className="font-playfair text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
                Kahe Vidushak Foundation
              </h2>
            </div>

            <Card className="bg-[#12121a] border-white/10 p-8 md:p-12">
              <p className="text-gray-300 text-lg leading-relaxed mb-8 text-center">
                Kahe Vidushak Foundation is a Bangalore-based theatre group founded by Srinivas Beesetty. Their
                productions explore multiple genres and subjects with a strong element of folk theatre. The group uses
                theatre to draw attention to oppression, power, and contemporary social questions.
              </p>

              <div className="grid grid-cols-3 gap-8 text-center">
                <div>
                  <div className="text-4xl md:text-5xl font-bold text-amber-400 mb-2">200+</div>
                  <div className="text-gray-400 text-sm">Shows Across India</div>
                </div>
                <div>
                  <div className="text-4xl md:text-5xl font-bold text-amber-400 mb-2">30+</div>
                  <div className="text-gray-400 text-sm">National Awards</div>
                </div>
                <div>
                  <div className="text-4xl md:text-5xl font-bold text-amber-400 mb-2">15</div>
                  <div className="text-gray-400 text-sm">Productions</div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* What This Means Section */}
      <section className="py-20 md:py-28">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <Badge className="bg-amber-500/20 text-amber-400 border-amber-500/30 mb-4">
              <Globe className="h-3.5 w-3.5 mr-1" />
              Our Evolution
            </Badge>
            <h2 className="font-playfair text-3xl md:text-4xl lg:text-5xl font-bold text-white">
              Bridging Stage and Community
            </h2>
            <p className="text-gray-400 text-lg leading-relaxed">
              We help institutions discover credible productions, help theatre groups access meaningful stages, and help audiences experience live theatre with context and depth.
            </p>
          </div>
        </div>
      </section>

      {/* WhatsApp CTA Sections */}
      <section id="partner" className="py-16 md:py-28 bg-[#0d0d14]">
        <div className="container px-4 sm:px-6">
          <div className="grid md:grid-cols-2 gap-6 md:gap-8 max-w-5xl mx-auto">
            {/* For Theatre Groups */}
            <Card className="bg-[#12121a] border-white/10 p-5 sm:p-8 md:p-10 hover:border-amber-500/30 transition-all overflow-hidden">
              <div className="space-y-4 sm:space-y-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-amber-500/20 flex items-center justify-center flex-shrink-0">
                    <Clapperboard className="h-5 w-5 sm:h-6 sm:w-6 text-amber-400" />
                  </div>
                  <span className="text-amber-400 text-xs sm:text-sm font-medium uppercase tracking-wider">For Theatre Groups</span>
                </div>
                <h3 className="font-playfair text-xl sm:text-2xl md:text-3xl font-bold text-white">
                  Have a production you want to present?
                </h3>
                <p className="text-gray-400 leading-relaxed text-sm sm:text-base">
                  Collaborate with AbhinayPath to bring your play to institutions, cultural venues, and new audiences.
                </p>
                <Link
                  href="https://wa.me/917843847071?text=Hi%20AbhinayPath%2C%20we%20are%20a%20theatre%20group%20interested%20in%20collaboration."
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button
                    size="lg"
                    className="w-full rounded-full bg-[#25D366] text-white hover:bg-[#20bd5a] text-sm sm:text-base px-4 sm:px-6 py-4 sm:py-5 h-auto font-medium transition-all hover:scale-105"
                  >
                    <MessageCircle className="mr-2 h-4 w-4 sm:h-5 sm:w-5 flex-shrink-0" />
                    <span className="truncate">Discuss Your Production on WhatsApp</span>
                  </Button>
                </Link>
              </div>
            </Card>

            {/* For Institutions */}
            <Card className="bg-[#12121a] border-white/10 p-5 sm:p-8 md:p-10 hover:border-purple-500/30 transition-all overflow-hidden">
              <div className="space-y-4 sm:space-y-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-purple-500/20 flex items-center justify-center flex-shrink-0">
                    <Users className="h-5 w-5 sm:h-6 sm:w-6 text-purple-400" />
                  </div>
                  <span className="text-purple-400 text-xs sm:text-sm font-medium uppercase tracking-wider">For Institutions</span>
                </div>
                <h3 className="font-playfair text-xl sm:text-2xl md:text-3xl font-bold text-white">
                  Looking to host a theatre experience?
                </h3>
                <p className="text-gray-400 leading-relaxed text-sm sm:text-base">
                  We curate meaningful theatre evenings for institutions, clubs, universities, and communities.
                </p>
                <Link
                  href="https://wa.me/917843847071?text=Hi%20AbhinayPath%2C%20we%20are%20interested%20in%20hosting%20a%20theatre%20experience."
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button
                    size="lg"
                    className="w-full rounded-full bg-[#25D366] text-white hover:bg-[#20bd5a] text-sm sm:text-base px-4 sm:px-6 py-4 sm:py-5 h-auto font-medium transition-all hover:scale-105"
                  >
                    <MessageCircle className="mr-2 h-4 w-4 sm:h-5 sm:w-5 flex-shrink-0" />
                    <span>Talk to Us on WhatsApp</span>
                  </Button>
                </Link>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 md:py-28 bg-gradient-to-b from-[#0a0a0f] to-[#1a1a2e] relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-10 right-20 w-72 h-72 bg-amber-500/30 rounded-full blur-3xl" />
          <div className="absolute bottom-10 left-20 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl" />
        </div>

        <div className="container relative z-10">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <Badge className="bg-amber-500/20 text-amber-400 border-amber-500/30 mb-4">
              <Handshake className="h-3.5 w-3.5 mr-1" />
              Start a Collaboration
            </Badge>
            <h2 className="font-playfair text-3xl md:text-4xl lg:text-5xl font-bold text-white">
              Bring curated theatre to your institution, club, or community.
            </h2>
            <p className="text-gray-400 text-lg leading-relaxed">
              AbhinayPath designs theatre evenings, student-facing performances, member programs, post-show discussions,
              and cultural experiences tailored to your audience.
            </p>
            <div className="pt-6">
              <Link href="/contact">
                <Button
                  size="lg"
                  className="rounded-full bg-amber-500 text-black hover:bg-amber-400 text-lg px-10 py-6 h-auto font-medium transition-all hover:scale-105"
                >
                  Start a Collaboration <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
