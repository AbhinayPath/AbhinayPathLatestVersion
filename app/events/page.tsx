"use client"
import { useState, useEffect, useMemo } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, MapPin, ExternalLink, Users, Clock, CheckCircle, Archive, Ticket, FileText, Gift, AlertTriangle, Mail, Phone, User, AlertCircle } from "lucide-react"
import Link from "next/link"
import { ShareEventButton } from "@/components/share-event-button"
import { getEventStatus, getDaysUntilDeadline, type EventStatus } from "@/lib/utils"

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
  status: EventStatus
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
    id: "alcheringa-2026",
    name: "Alcheringa 2026 — Theatre Competitions (IIT Guwahati)",
    city: "IIT Guwahati, Assam",
    country: "India",
    languages: "Hindi / English",
    scale: "National",
    duration: "4 days",
    month: "January",
    dates: "29 Jan – 1 Feb 2026",
    submissionDeadline: "Open (check website)",
    status: "open",
    selectionProcess: "Online Registration",
    eligibility:
      "Open to all participants (min age 12); includes Theatrix (Group Stage Play), Monodrama (Solo 5 min), Halla Bol (Nukkad-style, min 6 members)",
    description:
      "IIT Guwahati's flagship cultural festival featuring three theatre competitions: Theatrix (Group Stage Play, 50 min finals), Monodrama (Solo Play, 5 min limit with collar mic provided), and Halla Bol (Nukkad-style group play, 20 min limit, min 6 members). Venues include Main Stage and Auditorium. Rules: No fire/water/smoke; live music allowed; bring laptop for sound.",
    link: "https://www.alcheringa.co.in/Competitions",
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
  {
    id: "lotte-lenya-competition-2026",
    name: "Lotte Lenya Competition 2026 - Singing & Acting International Contest",
    city: "New York",
    country: "USA",
    languages: "English (International applicants welcome)",
    scale: "International",
    duration: "Competition event",
    month: "February",
    dates: "2026 (Competition dates TBA)",
    submissionDeadline: "4 Feb 2026",
    status: "open",
    selectionProcess: "Application + Audition",
    eligibility: "Actors/singers aged 19-32 years, all nationalities",
    travelSupport: "No funded travel included",
    description:
      "An international singing and acting competition celebrating musical theatre and lyric performance artistry. This prestigious competition blends acting and singing, offering cash prizes up to $25,000 plus exceptional performance exposure. Great opportunity for musical theatre and lyric performance artists looking to showcase their combined vocal and dramatic talents on an international stage.",
    link: "https://thekurtweillfoundationformusic.submittable.com/submit/335888/2026-lotte-lenya-competition-application",
    featured: true,
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
    id: "bursa-children-youth-2026",
    name: "International Bursa Children & Youth Theatre Festival 2026",
    city: "Bursa",
    country: "Turkiye",
    languages: "Open to all",
    scale: "International",
    duration: "Festival",
    month: "June",
    dates: "2026 (Festival dates TBA)",
    submissionDeadline: "30 June 2026",
    status: "open",
    selectionProcess: "Open call + Selection committee",
    eligibility: "International theatre companies with works for children & youth",
    travelSupport: "Not guaranteed (festival hospitality may apply)",
    description:
      "One of the leading global festivals for theatre for young audiences. Open to international theatre companies including Indian artists. A great platform for exposure, networking, and presenting work created for children and youth audiences on an international stage.",
    link: "https://assitej-international.org/2026/01/14/open-call-international-bursa-children-and-youth-theatre-festival/",
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
  {
    id: "theatre-exposed-2026",
    name: "THEATRE EXPOSED 2026 - International Theatre Photography Competition",
    city: "Online",
    country: "International",
    languages: "Open to all",
    scale: "International",
    duration: "Competition",
    month: "July",
    dates: "2026 (Online submissions)",
    submissionDeadline: "1 July 2026",
    status: "open",
    selectionProcess: "Online submission + jury selection",
    eligibility: "Professional theatre photographers globally",
    travelSupport: "Not Provided",
    registrationFee: "Free participation",
    description:
      "International theatre photography competition celebrating the art of performance documentation. Categories include art photo, portrait, movement, and open (theatre). A great international platform for theatre photographers to showcase their work capturing the magic of live performance. Free to enter.",
    link: "https://assitej-international.org/2026/01/14/international-theatre-photography-competition/",
  },
]

export default function EventsPage() {
  const [currentDate, setCurrentDate] = useState<Date | null>(null)

  // Update current date on mount to trigger status recalculation
  useEffect(() => {
    setCurrentDate(new Date())
    
    // Set up interval to check every hour for deadline changes
    const interval = setInterval(() => {
      setCurrentDate(new Date())
    }, 60 * 60 * 1000) // Check every hour
    
    return () => clearInterval(interval)
  }, [])

  // Compute festivals with auto-calculated status
  const festivalsWithAutoStatus = useMemo(() => {
    if (!currentDate) return festivals
    
    return festivals.map(festival => ({
      ...festival,
      computedStatus: getEventStatus(festival.submissionDeadline, festival.status),
      daysUntilDeadline: getDaysUntilDeadline(festival.submissionDeadline)
    }))
  }, [currentDate])

  const getStatusBadge = (status: EventStatus) => {
    const statusConfig = {
      open: {
        label: "Open / Accepting Submissions",
        color: "bg-green-100 text-green-800 border-green-300",
        icon: CheckCircle,
      },
      "closing-soon": {
        label: "Closing Soon!",
        color: "bg-orange-100 text-orange-800 border-orange-300 animate-pulse",
        icon: AlertCircle,
      },
      upcoming: {
        label: "Upcoming (Submission Closed)",
        color: "bg-blue-100 text-blue-800 border-blue-300",
        icon: Clock,
      },
      past: {
        label: "Deadline Passed",
        color: "bg-gray-100 text-gray-600 border-gray-300",
        icon: Archive,
      },
    }
    return statusConfig[status] || statusConfig.past
  }

  const getScaleColor = (scale: string) => {
    const colors: { [key: string]: string } = {
      International: "bg-purple-100 text-purple-800",
      National: "bg-blue-100 text-blue-800",
      Regional: "bg-yellow-100 text-yellow-800",
    }
    return colors[scale] || "bg-gray-100 text-gray-800"
  }

  // Enhanced festival type with computed status
  type EnhancedFestival = Festival & {
    computedStatus: EventStatus
    daysUntilDeadline: number | null
  }

  // Group festivals by month using computed status
  const festivalsByMonth = useMemo(() => {
    return festivalsWithAutoStatus.reduce(
      (acc, festival) => {
        if (!acc[festival.month]) {
          acc[festival.month] = []
        }
        acc[festival.month].push(festival)
        return acc
      },
      {} as Record<string, EnhancedFestival[]>,
    )
  }, [festivalsWithAutoStatus])

  // Calculate stats based on computed status
  const openCount = useMemo(() => {
    return festivalsWithAutoStatus.filter(f => f.computedStatus === "open" || f.computedStatus === "closing-soon").length
  }, [festivalsWithAutoStatus])

  const monthOrder = ["January", "February", "March", "May", "June", "July"]

  const FestivalCard = ({ festival }: { festival: EnhancedFestival }) => {
    const statusBadge = getStatusBadge(festival.computedStatus)
    const StatusIcon = statusBadge.icon
    const isPast = festival.computedStatus === "past"
    const isClosingSoon = festival.computedStatus === "closing-soon"

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
                <div className="text-2xl sm:text-3xl lg:text-4xl font-bold">{festivalsWithAutoStatus.length}</div>
                <div className="text-sm opacity-80">Festivals</div>
              </div>
              <div className="bg-white/10 rounded-lg p-4 backdrop-blur-sm">
                <div className="text-2xl sm:text-3xl lg:text-4xl font-bold">
                  {festivalsWithAutoStatus.filter((f) => f.computedStatus !== "past").length}
                </div>
                <div className="text-sm opacity-80">Active</div>
              </div>
              <div className="bg-white/10 rounded-lg p-4 backdrop-blur-sm">
                <div className="text-2xl sm:text-3xl lg:text-4xl font-bold">
                  {openCount}
                </div>
                <div className="text-sm opacity-80">Open Now</div>
              </div>
              <div className="bg-white/10 rounded-lg p-4 backdrop-blur-sm">
                <div className="text-2xl sm:text-3xl lg:text-4xl font-bold">
                  {festivalsWithAutoStatus.filter((f) => f.computedStatus === "closing-soon").length}
                </div>
                <div className="text-sm opacity-80">Closing Soon</div>
              </div>
            </div>
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
            {monthOrder.map(
              (month) =>
                festivalsByMonth[month] && (
                  <div key={month} id={month.toLowerCase()}>
                    <div className="mb-8">
                      <h2 className="text-3xl sm:text-4xl font-bold font-playfair text-gray-800 mb-2 flex items-center gap-3">
                        <span className="text-[#7E1F2E]">{month} 2026</span>
                      </h2>
                      <div className="flex flex-wrap items-center gap-4 text-gray-600">
                        <span>
                          {festivalsByMonth[month].length} festival{festivalsByMonth[month].length !== 1 ? "s" : ""}
                        </span>
                        {festivalsByMonth[month].filter(f => f.computedStatus === "open" || f.computedStatus === "closing-soon").length > 0 && (
                          <Badge className="bg-green-100 text-green-800 text-xs">
                            {festivalsByMonth[month].filter(f => f.computedStatus === "open" || f.computedStatus === "closing-soon").length} accepting submissions
                          </Badge>
                        )}
                        {festivalsByMonth[month].filter(f => f.computedStatus === "closing-soon").length > 0 && (
                          <Badge className="bg-orange-100 text-orange-800 text-xs animate-pulse">
                            {festivalsByMonth[month].filter(f => f.computedStatus === "closing-soon").length} closing soon
                          </Badge>
                        )}
                        {festivalsByMonth[month].filter(f => f.computedStatus === "past").length > 0 && (
                          <Badge className="bg-gray-100 text-gray-600 text-xs">
                            {festivalsByMonth[month].filter(f => f.computedStatus === "past").length} closed
                          </Badge>
                        )}
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Sort: open/closing-soon first, then upcoming, then past */}
                      {[...festivalsByMonth[month]]
                        .sort((a, b) => {
                          const statusOrder = { "closing-soon": 0, open: 1, upcoming: 2, past: 3 }
                          return statusOrder[a.computedStatus] - statusOrder[b.computedStatus]
                        })
                        .map((festival) => (
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
