"use client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, MapPin, ExternalLink, Users, Clock, CheckCircle, Archive } from "lucide-react"
import Link from "next/link"

interface Festival {
  id: string
  name: string
  city: string
  country: string
  languages: string
  scale: string
  duration: string
  month: string
  dates: string
  submissionDeadline: string
  status: "open" | "upcoming" | "past"
  selectionProcess: string
  eligibility: string
  travelSupport?: string
  visaSupport?: string
  registrationFee?: string
  description: string
  link: string
  featured?: boolean
  isFellowship?: boolean
}

const festivals: Festival[] = [
  // January Festivals
  {
    id: "bharat-rang-mahotsav-2026",
    name: "Bharat Rang Mahotsav 2026 (NSD)",
    city: "New Delhi",
    country: "India",
    languages: "Multilingual (Indian & International)",
    scale: "International",
    duration: "Multi-week (Jan–Feb)",
    month: "January",
    dates: "January–February 2026",
    submissionDeadline: "Expected: August–September 2025",
    status: "upcoming",
    selectionProcess: "Open Call + Selection Committee",
    eligibility: "Professional theatre groups, repertory companies, institutions (India & International)",
    description:
      "The world's largest theatre festival celebrating international theatrical excellence. NSD's premier festival brings together drama institutions, theatre companies, and directors from India and abroad to showcase contemporary, traditional, and experimental theatre across multiple venues.",
    link: "https://brmapplication.nsd.gov.in/brm_notification_english.pdf",
    featured: true,
  },
  {
    id: "itfok-2026",
    name: "International Theatre Festival of Kerala (ITFoK) 2026",
    city: "Thrissur",
    country: "India (Kerala)",
    languages: "Multilingual",
    scale: "International",
    duration: "8 days",
    month: "January",
    dates: "Late January 2026",
    submissionDeadline: "Expected: September–October 2025",
    status: "upcoming",
    selectionProcess: "Open Call / Curated",
    eligibility: "Student groups, professional companies, international ensembles",
    description:
      "An international platform for contemporary, experimental, and culturally rooted theatre works. The festival welcomes student groups, professional companies, and international ensembles to participate in Kerala's premier theatre celebration.",
    link: "https://theatrefestivalkerala.com/",
  },
  {
    id: "kala-ghoda-2026",
    name: "Kala Ghoda Arts Festival 2026 – Theatre Section",
    city: "Mumbai",
    country: "India",
    languages: "Multilingual",
    scale: "National",
    duration: "9 days",
    month: "January",
    dates: "31 Jan – 8 Feb 2026",
    submissionDeadline: "9 Nov 2025",
    status: "past",
    selectionProcess: "Open Call + Curated Selection",
    eligibility: "Theatre groups, independent artists, production houses",
    description:
      "Mumbai's premier arts festival featuring an avant-garde theatre section. The festival aims for linguistic and cultural diversity, selecting work based on quality, originality, and alignment with the festival's theme.",
    link: "https://www.mumbaitheatreguide.com/dramas/Articles/25/sep/kala-ghoda-arts-festival-2026-call-for-entries-theatre-section.asp",
  },
  {
    id: "triveni-2026",
    name: "Triveni Theatre Festival 2026",
    city: "New Delhi",
    country: "India",
    languages: "Not specified",
    scale: "Regional (Delhi-NCR)",
    duration: "8 days",
    month: "January",
    dates: "17–24 Jan 2026",
    submissionDeadline: "25 Oct 2025",
    status: "past",
    selectionProcess: "Open Call",
    eligibility: "Theatre groups based in Delhi-NCR",
    description:
      "A regional theatre festival celebrating Delhi-NCR's vibrant theatre community. Organized by Triveni Kala Sangam with support from Rukavipa Foundation, the festival features free entry performances for the general public and theatre enthusiasts.",
    link: "https://www.facebook.com/triveninewdelhi/",
  },
  {
    id: "alter-ego-2026",
    name: "Alter Ego 2026 - Theatre & Dance Festival",
    city: "Bulgaria",
    country: "Bulgaria",
    languages: "Open to all Languages",
    scale: "International",
    duration: "Festival dates TBA",
    month: "January",
    dates: "2026 (dates TBA)",
    submissionDeadline: "15 Jan 2026",
    status: "open",
    selectionProcess: "Apply via form (curation by festival)",
    eligibility: "Alternative theatre and dance artists (experimental/avant-garde focus)",
    description:
      "International open call for experimental and avant-garde theatre and dance artists. This festival celebrates alternative performance practices and contemporary experimental works, providing a platform for cutting-edge theatrical and choreographic expressions.",
    link: "https://dancingopportunities.com/alter-ego-2026-theater-and-dance-festival-open-call/",
  },

  // February Festivals
  {
    id: "pflasterspektakel-2026",
    name: "Pflasterspektakel 2026",
    city: "Linz",
    country: "Austria",
    languages: "Open to all",
    scale: "International",
    duration: "3 days",
    month: "February",
    dates: "Festival dates TBA",
    submissionDeadline: "15 Jan 2026",
    status: "open",
    selectionProcess: "Apply online → invited/refused by email",
    eligibility: "Companies & solo performers (800+ applicants; ~100 invited)",
    description:
      "Large international street theatre and performance festival. A major platform for contemporary street performance art with highly selective curation process, inviting approximately 100 performers from a pool of 800+ international applicants to perform in festival setup venues.",
    link: "https://www.unima.org.uk/p/call-for-artists-applications-open",
  },

  // March Festivals
  {
    id: "meta-2026",
    name: "META – Mahindra Excellence in Theatre Awards 2026",
    city: "New Delhi",
    country: "India",
    languages: "Multilingual (Indian languages)",
    scale: "National",
    duration: "7 days",
    month: "March",
    dates: "March 2026",
    submissionDeadline: "15th January 2026",
    status: "open",
    selectionProcess: "Open Call + Jury Selection",
    eligibility: "Professional theatre groups & directors (India)",
    description:
      "India's most prestigious theatre awards celebrating excellence across proscenium, physical theatre, puppetry, and musical theatre. The festival takes place at premium venues like Kamani Auditorium and Shri Ram Centre, featuring jury-selected productions competing for national recognition.",
    link: "https://metawards.com/",
    featured: true,
  },

  // May Festivals
  {
    id: "outnow-2026",
    name: "OUTNOW! Festival 2026",
    city: "Bremen",
    country: "Germany",
    languages: "Multilingual / English-friendly",
    scale: "International",
    duration: "5 days",
    month: "May",
    dates: "May 2026",
    submissionDeadline: "Expected: October–November 2025",
    status: "upcoming",
    selectionProcess: "Open Call",
    eligibility: "Professional & experimental theatre / performance groups (International)",
    travelSupport: "Yes (travel + accommodation + meals)",
    description:
      "Bremen's international platform for experimental and contemporary performance. The festival actively supports international participation with comprehensive travel, accommodation, and meal provisions for selected artists and companies.",
    link: "https://outnowbremen.de/en/open-call-2026",
  },
  {
    id: "novi-sad-2026",
    name: "Novi Sad Theatre Festival — Serbia",
    city: "Novi Sad",
    country: "Serbia",
    languages: "Not publicly specified",
    scale: "International",
    duration: "Festival month: May 2026",
    month: "May",
    dates: "May 2026",
    submissionDeadline: "15 Nov 2025",
    status: "past",
    selectionProcess: "Open call + Competition + International jury",
    eligibility: "Apply via organiser link (not fully specified)",
    travelSupport: "Yes (travel support + accommodation + full board for selected)",
    description:
      "ASSITEJ International theatre festival featuring competition-based selection through an international jury. Selected participants receive comprehensive support including travel, accommodation, and full board during the festival period.",
    link: "https://assitej-international.org/2025/09/16/open-call-novi-sad-theatre-festival/",
  },
  {
    id: "torino-fringe-2026",
    name: "Torino Fringe Festival 2026",
    city: "Turin (Torino)",
    country: "Italy",
    languages: "Multilingual (not restricted)",
    scale: "International",
    duration: "13 days (19–31 May 2026)",
    month: "May",
    dates: "19–31 May 2026",
    submissionDeadline: "21 Oct 2025",
    status: "past",
    selectionProcess: "Open Call",
    eligibility:
      "Theatre + performance + music + dance + circus + stand-up (Italian & international artists/companies)",
    description:
      "Turin's international fringe festival celebrating contemporary and mixed performance forms. The multi-venue festival welcomes diverse art forms from theatre and performance to music, dance, circus, and stand-up comedy, attracting both local and international audiences.",
    link: "https://www.tofringe.it/call-2026-eng/",
  },
  {
    id: "theatertreffen-forum-2026",
    name: "International Forum @ Theatertreffen 2026 — Berlin",
    city: "Berlin",
    country: "Germany",
    languages: "Not specified",
    scale: "International",
    duration: "17 days (1–17 May 2026)",
    month: "May",
    dates: "1–17 May 2026",
    submissionDeadline: "30 Nov 2025 (23:59 CET)",
    status: "past",
    selectionProcess: "Open applications + Fellows selection",
    eligibility: "Theatre professionals / makers (forum fellowship)",
    travelSupport: "Yes (scholarship covers travel & accommodation for fellows)",
    description:
      "A prestigious fellowship within one of Berlin's major theatre festivals. This highly valuable opportunity is designed for theatre professionals and makers, providing selected fellows with comprehensive support including travel and accommodation to attend the festival's professional forum program.",
    link: "https://www.berlinerfestspiele.de/en/theatertreffen/das-festival/theatertreffen-blog/open-call",
    isFellowship: true,
  },
  {
    id: "mittelyoung-2026",
    name: "Mittelyoung 2026 (Mittelfest)",
    city: "Cividale del Friuli",
    country: "Italy",
    languages: "Open to all Languages",
    scale: "International",
    duration: "4 days (with possible July re-programming)",
    month: "May",
    dates: "14–17 May 2026",
    submissionDeadline: "10 Feb 2026 (3:00 PM)",
    status: "open",
    selectionProcess: "Under-30 curators select 9 projects",
    eligibility: "Under-30 artists/companies from listed European countries",
    description:
      "Europe-focused platform exclusively for emerging artists under 30. Selected by young curators, 9 projects will be featured during the festival with possible re-programming opportunities into the main Mittelfest in July, providing exceptional visibility for early-career European theatre makers.",
    link: "https://www.mittelfest.org/en/mittelyoung/",
  },
  {
    id: "shreeram-lagoo-2026",
    name: "Shreeram Lagoo National Theatre Festival",
    city: "Pune",
    country: "India",
    languages: "Not specified",
    scale: "National",
    duration: "7 days",
    month: "May",
    dates: "25 May – 31 May 2026",
    submissionDeadline: "10 Feb 2026",
    status: "open",
    selectionProcess: "Open Call",
    eligibility: "Theatre groups and companies (India)",
    description:
      "A national theatre festival honoring the legacy of legendary actor Dr. Shreeram Lagoo. Hosted at Jyotsna Bhole Sabhagruha and associated with Shreeram Lagoo Rang-Avkash in Pune, this festival celebrates theatrical excellence and pays tribute to one of Indian theatre's most influential figures.",
    link: "mailto:lagoofestival@mcckala.com",
  },

  // June Festivals
  {
    id: "sibiu-2026",
    name: "Sibiu International Theatre Festival (FITS) 2026",
    city: "Sibiu",
    country: "Romania",
    languages: "Multilingual",
    scale: "International",
    duration: "10 days",
    month: "June",
    dates: "June 2026",
    submissionDeadline: "Submission Closed",
    status: "past",
    selectionProcess: "Curated / Open calls for specific sections",
    eligibility: "Professional theatre companies (International)",
    description:
      "One of Europe's largest theatre festivals featuring large-scale, visual, contemporary, and classical productions. The festival showcases work on indoor and outdoor stages, attracting international audiences, programmers, and critics.",
    link: "https://www.sibfest.ro/en/faq",
  },
  {
    id: "iti-academy-2026",
    name: "ITI Academy Week @ THEATER DER WELT 2026 — Germany",
    city: "Berlin + Chemnitz",
    country: "Germany",
    languages: "Not specified",
    scale: "International",
    duration: "8 days (21–28 June 2026)",
    month: "June",
    dates: "21–28 June 2026",
    submissionDeadline: "5 Jan 2026",
    status: "past",
    selectionProcess: "Open call (global) + Selection of fellows",
    eligibility: "Artists / theatre makers / cultural practitioners",
    travelSupport: "Yes (contribution + local transfers + accommodation + per diems)",
    visaSupport: "Yes (assistance + visa fees covered)",
    description:
      "A high-value international fellowship embedded within a major festival. Selected fellows receive comprehensive support including visa assistance with fees covered, travel contribution, local transfers, accommodation, and per diems, making this an exceptional opportunity for global theatre practitioners.",
    link: "https://www.iti-germany.de/en/meeting-exchange/the-iti-academy/iti-academy-week-open-call-2026",
    isFellowship: true,
  },
  {
    id: "valise-2026",
    name: "VALISE 2026 - International Theatrical Festival",
    city: "Łomża",
    country: "Poland",
    languages: "Open to all Languages",
    scale: "International",
    duration: "4 days",
    month: "June",
    dates: "25–28 Jun 2026",
    submissionDeadline: "15 Jan 2026",
    status: "open",
    selectionProcess: "Apply via email; requirements PDF provided",
    eligibility: "Professional & non-institutional theatres + drama school students",
    description:
      "The 39th edition of this international theatrical festival welcomes professional theatres, non-institutional groups, and drama school students from around the world. Application process requires email submission with detailed requirements provided in PDF format.",
    link: "https://www.unima.org.uk/p/39th-international-theatrical-festival",
  },

  // July Festivals
  {
    id: "china-childrens-theatre-2026",
    name: "China Children's Theatre Festival 2026",
    city: "Beijing",
    country: "China",
    languages: "English or Chinese",
    scale: "International",
    duration: "1 month",
    month: "July",
    dates: "15 Jul – 15 Aug 2026",
    submissionDeadline: "15 Jan 2026",
    status: "open",
    selectionProcess: "Reviewed by selection team; notification by 9 Mar 2026",
    eligibility: "Companies with eligible productions (international TYA focus)",
    travelSupport:
      "Local accommodation/per diem/local transport & performance fee (international travel/shipping on participants)",
    description:
      "International Theatre for Young Audiences (TYA) festival with performance opportunities across Beijing and potentially other Chinese cities. Selected companies receive local support including accommodation, per diem, transportation, and performance fees, though international travel and shipping costs are borne by participants.",
    link: "https://assitej-international.org/2025/12/15/international-performance-open-call-china-childrens-theatre-festival/",
  },
  {
    id: "borderlight-2026",
    name: "BorderLight Theatre Festival 2026",
    city: "Cleveland",
    country: "USA",
    languages: "Open to all Languages",
    scale: "International",
    duration: "Festival month",
    month: "July",
    dates: "July 2026",
    submissionDeadline: "16 Jan 2026",
    status: "open",
    selectionProcess: "Call for artists (details via application link)",
    eligibility: "Artists / theatre makers",
    description:
      "Cleveland's international theatre festival brings together diverse voices and theatrical practices from around the world. The festival seeks innovative artists and theatre makers to participate in this celebration of contemporary performance.",
    link: "https://www.borderlightcle.org/2026artist/",
  },
]

export default function EventsPage() {
  const getStatusBadge = (status: string) => {
    const statusConfig = {
      open: {
        label: "Open / Accepting Submissions",
        color: "bg-green-100 text-green-800 border-green-300",
        icon: CheckCircle,
      },
      upcoming: {
        label: "Upcoming (Submission Closed)",
        color: "bg-blue-100 text-blue-800 border-blue-300",
        icon: Clock,
      },
      past: {
        label: "Past / Archived",
        color: "bg-gray-100 text-gray-800 border-gray-300",
        icon: Archive,
      },
    }
    return statusConfig[status as keyof typeof statusConfig] || statusConfig.past
  }

  const getScaleColor = (scale: string) => {
    const colors: { [key: string]: string } = {
      International: "bg-purple-100 text-purple-800",
      National: "bg-blue-100 text-blue-800",
      Regional: "bg-yellow-100 text-yellow-800",
    }
    return colors[scale] || "bg-gray-100 text-gray-800"
  }

  // Group festivals by month
  const festivalsByMonth = festivals.reduce(
    (acc, festival) => {
      if (!acc[festival.month]) {
        acc[festival.month] = []
      }
      acc[festival.month].push(festival)
      return acc
    },
    {} as Record<string, Festival[]>,
  )

  const monthOrder = ["January", "February", "March", "May", "June", "July"]

  const FestivalCard = ({ festival }: { festival: Festival }) => {
    const statusBadge = getStatusBadge(festival.status)
    const StatusIcon = statusBadge.icon

    return (
      <Card
        className={`group hover:shadow-xl transition-all duration-300 border-2 h-full flex flex-col ${
          festival.featured
            ? "border-[#7E1F2E]/30 bg-gradient-to-br from-amber-50/50 to-white"
            : "hover:border-[#7E1F2E]/20"
        }`}
      >
        <CardHeader className="pb-4 flex-shrink-0">
          {festival.featured && (
            <div className="mb-3">
              <Badge className="bg-[#7E1F2E] text-white text-xs px-3 py-1 font-semibold">⭐ FEATURED FESTIVAL</Badge>
            </div>
          )}
          {festival.isFellowship && (
            <div className="mb-3">
              <Badge className="bg-purple-600 text-white text-xs px-3 py-1 font-semibold">🎓 FELLOWSHIP PROGRAM</Badge>
            </div>
          )}
          <div className="flex items-start justify-between gap-3 mb-3">
            <CardTitle className="text-lg sm:text-xl font-bold group-hover:text-[#7E1F2E] transition-colors leading-tight">
              {festival.name}
            </CardTitle>
          </div>
          <div className="flex flex-wrap gap-2">
            <Badge className={`${statusBadge.color} text-xs flex items-center gap-1 px-2 py-1`}>
              <StatusIcon className="h-3 w-3" />
              {statusBadge.label}
            </Badge>
            <Badge className={`${getScaleColor(festival.scale)} text-xs`}>{festival.scale}</Badge>
          </div>
        </CardHeader>

        <CardContent className="space-y-4 flex-grow flex flex-col">
          <div className="space-y-3 text-sm text-gray-600">
            <div className="flex items-start gap-3">
              <MapPin className="h-4 w-4 shrink-0 mt-0.5 text-[#7E1F2E]" />
              <div>
                <span className="font-semibold">
                  {festival.city}, {festival.country}
                </span>
                <div className="text-xs text-gray-500 mt-0.5">{festival.languages}</div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Calendar className="h-4 w-4 shrink-0 text-[#7E1F2E]" />
              <div>
                <span className="font-semibold">{festival.dates}</span>
                <div className="text-xs text-gray-500 mt-0.5">Duration: {festival.duration}</div>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Clock className="h-4 w-4 shrink-0 mt-0.5 text-[#7E1F2E]" />
              <div>
                <span className="text-xs font-semibold text-gray-700">Submission Deadline:</span>
                <div className="text-sm mt-0.5">{festival.submissionDeadline}</div>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Users className="h-4 w-4 shrink-0 mt-0.5 text-[#7E1F2E]" />
              <div className="text-xs">
                <span className="font-semibold">Eligibility: </span>
                {festival.eligibility}
              </div>
            </div>
          </div>

          <p className="text-sm text-gray-600 leading-relaxed line-clamp-4 flex-grow">{festival.description}</p>

          {festival.visaSupport && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
              <p className="text-xs text-blue-800 font-semibold flex items-center gap-2">
                <CheckCircle className="h-4 w-4" />
                Visa Support: {festival.visaSupport}
              </p>
            </div>
          )}

          {festival.travelSupport && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-3">
              <p className="text-xs text-green-800 font-semibold flex items-center gap-2">
                <CheckCircle className="h-4 w-4" />
                Travel Support: {festival.travelSupport}
              </p>
            </div>
          )}

          <div className="pt-3 mt-auto border-t">
            <Link href={festival.link} target="_blank" rel="noopener noreferrer">
              <Button className="w-full bg-[#7E1F2E] hover:bg-[#6a1a27] text-white text-sm py-2.5">
                View Festival Details
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
                <div className="text-2xl sm:text-3xl lg:text-4xl font-bold">{festivals.length}</div>
                <div className="text-sm opacity-80">Festivals</div>
              </div>
              <div className="bg-white/10 rounded-lg p-4 backdrop-blur-sm">
                <div className="text-2xl sm:text-3xl lg:text-4xl font-bold">
                  {festivals.filter((f) => f.scale === "International").length}
                </div>
                <div className="text-sm opacity-80">International</div>
              </div>
              <div className="bg-white/10 rounded-lg p-4 backdrop-blur-sm">
                <div className="text-2xl sm:text-3xl lg:text-4xl font-bold">
                  {festivals.filter((f) => f.status === "open").length}
                </div>
                <div className="text-sm opacity-80">Open Now</div>
              </div>
              <div className="bg-white/10 rounded-lg p-4 backdrop-blur-sm">
                <div className="text-2xl sm:text-3xl lg:text-4xl font-bold">
                  {festivals.filter((f) => f.country === "India").length}
                </div>
                <div className="text-sm opacity-80">In India</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Festivals by Month */}
      <section className="py-12 sm:py-16">
        <div className="container px-4">
          <div className="max-w-7xl mx-auto space-y-16">
            {monthOrder.map(
              (month) =>
                festivalsByMonth[month] && (
                  <div key={month} id={month.toLowerCase()}>
                    <div className="mb-8">
                      <h2 className="text-3xl sm:text-4xl font-bold font-playfair text-gray-800 mb-2 flex items-center gap-3">
                        <span className="text-[#7E1F2E]">{month} 2026</span>
                      </h2>
                      <p className="text-gray-600">
                        {festivalsByMonth[month].length} festival{festivalsByMonth[month].length !== 1 ? "s" : ""}{" "}
                        scheduled
                      </p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {festivalsByMonth[month].map((festival) => (
                        <FestivalCard key={festival.id} festival={festival} />
                      ))}
                    </div>
                  </div>
                ),
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
