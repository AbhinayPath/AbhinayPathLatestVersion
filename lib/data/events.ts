import { getEventStatus, getDaysUntilDeadline, isEventCompleted, type EventStatus } from "@/lib/utils"

/**
 * Event/Festival interface for scalable event management
 * New events can be added by simply adding to the festivals array
 */
export interface Festival {
  id: string
  name: string
  city: string
  country: string
  languages: string
  scale: "International" | "National" | "Regional" | string
  duration: string
  month: string
  dates: string
  submissionDeadline: string
  /** Base status - will be automatically computed based on deadline */
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
  /** Optional: Year of the event for multi-year support */
  year?: number
  /** Optional: Category for filtering */
  category?: "theatre" | "dance" | "music" | "mixed" | "competition" | "fellowship"
  /** Optional: Tags for enhanced filtering */
  tags?: string[]
}

/**
 * Enhanced festival with computed runtime properties
 */
export interface EnhancedFestival extends Festival {
  computedStatus: EventStatus
  daysUntilDeadline: number | null
  isExpired: boolean
  isClosingSoon: boolean
  isOpen: boolean
  /** Whether the event dates themselves have fully passed */
  isEventCompleted: boolean
  /** Whether submissions are closed but event hasn't happened yet */
  isSubmissionsClosed: boolean
  lastUpdated: string
}

/**
 * Status configuration for visual display
 */
export const STATUS_CONFIG = {
  open: {
    label: "Open / Accepting Submissions",
    shortLabel: "Open",
    color: "bg-green-100 text-green-800 border-green-300",
    iconColor: "text-green-600",
    priority: 1,
  },
  "closing-soon": {
    label: "Closing Soon!",
    shortLabel: "Closing Soon",
    color: "bg-orange-100 text-orange-800 border-orange-300",
    iconColor: "text-orange-600",
    priority: 0,
  },
  upcoming: {
    label: "Upcoming (Submission Closed)",
    shortLabel: "Upcoming",
    color: "bg-blue-100 text-blue-800 border-blue-300",
    iconColor: "text-blue-600",
    priority: 2,
  },
  past: {
    label: "Deadline Passed",
    shortLabel: "Closed",
    color: "bg-gray-100 text-gray-600 border-gray-300",
    iconColor: "text-gray-500",
    priority: 3,
  },
} as const

/**
 * Scale color configuration
 */
export const SCALE_COLORS: Record<string, string> = {
  International: "bg-purple-100 text-purple-800",
  National: "bg-indigo-100 text-indigo-800",
  Regional: "bg-teal-100 text-teal-800",
  default: "bg-gray-100 text-gray-800",
}

export function getScaleColor(scale: string): string {
  return SCALE_COLORS[scale] || SCALE_COLORS.default
}

/**
 * Process a single festival and compute its runtime status
 */
export function processEvent(festival: Festival): EnhancedFestival {
  const computedStatus = getEventStatus(festival.submissionDeadline, festival.status)
  const daysUntilDeadline = getDaysUntilDeadline(festival.submissionDeadline)
  const eventCompleted = isEventCompleted(festival.dates)
  const deadlinePassed = computedStatus === "past"
  
  return {
    ...festival,
    computedStatus,
    daysUntilDeadline,
    isExpired: deadlinePassed,
    isClosingSoon: computedStatus === "closing-soon",
    isOpen: computedStatus === "open" || computedStatus === "closing-soon",
    isEventCompleted: eventCompleted,
    isSubmissionsClosed: deadlinePassed && !eventCompleted,
    lastUpdated: new Date().toISOString(),
  }
}

/**
 * Process all festivals and compute their statuses
 * This is the main function called by both client and server
 */
export function processAllEvents(festivals: Festival[]): EnhancedFestival[] {
  return festivals.map(processEvent)
}

/**
 * Sort festivals by status priority (open/closing-soon first, then upcoming, then past)
 */
export function sortByStatusPriority(festivals: EnhancedFestival[]): EnhancedFestival[] {
  return [...festivals].sort((a, b) => {
    const priorityA = STATUS_CONFIG[a.computedStatus]?.priority ?? 99
    const priorityB = STATUS_CONFIG[b.computedStatus]?.priority ?? 99
    return priorityA - priorityB
  })
}

/**
 * Group festivals by month
 */
export function groupByMonth(festivals: EnhancedFestival[]): Record<string, EnhancedFestival[]> {
  return festivals.reduce((acc, festival) => {
    if (!acc[festival.month]) {
      acc[festival.month] = []
    }
    acc[festival.month].push(festival)
    return acc
  }, {} as Record<string, EnhancedFestival[]>)
}

/**
 * Get statistics about festivals
 */
export function getEventStats(festivals: EnhancedFestival[]) {
  return {
    total: festivals.length,
    open: festivals.filter(f => f.computedStatus === "open").length,
    closingSoon: festivals.filter(f => f.computedStatus === "closing-soon").length,
    upcoming: festivals.filter(f => f.computedStatus === "upcoming").length,
    past: festivals.filter(f => f.computedStatus === "past").length,
    active: festivals.filter(f => f.isOpen).length,
    international: festivals.filter(f => f.scale === "International").length,
    featured: festivals.filter(f => f.featured).length,
    completed: festivals.filter(f => f.isEventCompleted).length,
    submissionsClosed: festivals.filter(f => f.isSubmissionsClosed).length,
  }
}

/**
 * Filter festivals by various criteria
 */
export function filterEvents(
  festivals: EnhancedFestival[],
  filters: {
    status?: EventStatus | EventStatus[]
    scale?: string | string[]
    country?: string
    month?: string
    searchQuery?: string
    showExpired?: boolean
  }
): EnhancedFestival[] {
  return festivals.filter(festival => {
    // Filter by status
    if (filters.status) {
      const statuses = Array.isArray(filters.status) ? filters.status : [filters.status]
      if (!statuses.includes(festival.computedStatus)) return false
    }
    
    // Filter out expired unless explicitly showing them
    if (filters.showExpired === false && festival.isExpired) return false
    
    // Filter by scale
    if (filters.scale) {
      const scales = Array.isArray(filters.scale) ? filters.scale : [filters.scale]
      if (!scales.includes(festival.scale)) return false
    }
    
    // Filter by country
    if (filters.country && !festival.country.toLowerCase().includes(filters.country.toLowerCase())) {
      return false
    }
    
    // Filter by month
    if (filters.month && festival.month !== filters.month) return false
    
    // Search query
    if (filters.searchQuery) {
      const query = filters.searchQuery.toLowerCase()
      const searchableText = `${festival.name} ${festival.city} ${festival.country} ${festival.description}`.toLowerCase()
      if (!searchableText.includes(query)) return false
    }
    
    return true
  })
}

/**
 * Master list of festivals - ADD NEW EVENTS HERE
 * The system will automatically compute their status based on submission deadline
 */
export const festivals: Festival[] = [
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
    category: "theatre",
    tags: ["NSD", "professional", "international"],
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
    category: "theatre",
    tags: ["Kerala", "experimental", "student-friendly"],
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
    status: "open",
    selectionProcess: "Open Call + Curated Selection",
    eligibility: "Theatre groups, independent artists, production houses",
    description:
      "Mumbai's premier arts festival featuring an avant-garde theatre section. The festival aims for linguistic and cultural diversity, selecting work based on quality, originality, and alignment with the festival's theme.",
    link: "https://www.mumbaitheatreguide.com/dramas/Articles/25/sep/kala-ghoda-arts-festival-2026-call-for-entries-theatre-section.asp",
    category: "theatre",
    tags: ["Mumbai", "arts festival", "avant-garde"],
  },
  {
    id: "triveni-2026",
    name: "Triveni Theatre Festival 2026",
    city: "New Delhi",
    country: "India",
    languages: "Not specified",
    scale: "Regional",
    duration: "8 days",
    month: "January",
    dates: "17–24 Jan 2026",
    submissionDeadline: "25 Oct 2025",
    status: "open",
    selectionProcess: "Open Call",
    eligibility: "Theatre groups based in Delhi-NCR",
    description:
      "A regional theatre festival celebrating Delhi-NCR's vibrant theatre community. Organized by Triveni Kala Sangam with support from Rukavipa Foundation, the festival features free entry performances for the general public and theatre enthusiasts.",
    link: "https://www.facebook.com/triveninewdelhi/",
    category: "theatre",
    tags: ["Delhi-NCR", "regional", "free entry"],
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
    category: "competition",
    tags: ["IIT", "competition", "student", "nukkad"],
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
    category: "mixed",
    tags: ["experimental", "dance", "avant-garde"],
  },

  // February Festivals
  {
    id: "natsamrat-natya-utsav-2026",
    name: "Natsamrat Natya Utsav 2026",
    city: "New Delhi",
    country: "India",
    languages: "Hindi",
    scale: "Regional",
    duration: "9 days (Feb 28 – Mar 8)",
    month: "February",
    dates: "28 Feb – 8 Mar 2026",
    submissionDeadline: "2 Feb 2026",
    status: "open",
    selectionProcess: "Open Call + Selection by Natsamrat Theatre Group",
    eligibility: "Theatre Directors & Groups based in Delhi & NCR (play duration: 50–75 mins, studio format)",
    description:
      "Dedicated to Padmashree Late Shri D. P. Sinha Ji. A curated theatre festival by Abhinaypath celebrating meaningful stage work in an intimate studio setting at LTG Auditorium – The Blank Canvas Studio, Mandi House. Ticketed entry with 50-seat studio capacity. Festival offers performance venue access, 5 complimentary passes, publicity support, social media coverage, festival memento for the director, and certificates for all on-stage and backstage members. No TA/DA or honorarium provided. Contact: Shyam Kumar (Director – Natsamrat Theatre Group) at shyamkumaro8@yahoo.co.in or 9811232072 / 7982598635.",
    link: "mailto:shyamkumaro8@yahoo.co.in?subject=Application for Natsamrat Natya Utsav 2026",
    category: "theatre",
    tags: ["Delhi-NCR", "studio format", "curated"],
  },
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
    category: "theatre",
    tags: ["street theatre", "performance", "selective"],
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
    category: "competition",
    tags: ["musical theatre", "competition", "cash prize"],
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
    category: "theatre",
    tags: ["awards", "professional", "prestigious"],
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
    category: "theatre",
    tags: ["experimental", "travel support", "Germany"],
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
    status: "open",
    selectionProcess: "Open call + Competition + International jury",
    eligibility: "Apply via organiser link (not fully specified)",
    travelSupport: "Yes (travel support + accommodation + full board for selected)",
    description:
      "ASSITEJ International theatre festival featuring competition-based selection through an international jury. Selected participants receive comprehensive support including travel, accommodation, and full board during the festival period.",
    link: "https://assitej-international.org/2025/09/16/open-call-novi-sad-theatre-festival/",
    category: "theatre",
    tags: ["ASSITEJ", "competition", "full support"],
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
    status: "open",
    selectionProcess: "Open Call",
    eligibility:
      "Theatre + performance + music + dance + circus + stand-up (Italian & international artists/companies)",
    description:
      "Turin's international fringe festival celebrating contemporary and mixed performance forms. The multi-venue festival welcomes diverse art forms from theatre and performance to music, dance, circus, and stand-up comedy, attracting both local and international audiences.",
    link: "https://www.tofringe.it/call-2026-eng/",
    category: "mixed",
    tags: ["fringe", "multi-genre", "Italy"],
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
    submissionDeadline: "30 Nov 2025",
    status: "open",
    selectionProcess: "Open applications + Fellows selection",
    eligibility: "Theatre professionals / makers (forum fellowship)",
    travelSupport: "Yes (scholarship covers travel & accommodation for fellows)",
    description:
      "A prestigious fellowship within one of Berlin's major theatre festivals. This highly valuable opportunity is designed for theatre professionals and makers, providing selected fellows with comprehensive support including travel and accommodation to attend the festival's professional forum program.",
    link: "https://www.berlinerfestspiele.de/en/theatertreffen/das-festival/theatertreffen-blog/open-call",
    isFellowship: true,
    category: "fellowship",
    tags: ["fellowship", "Berlin", "professional development"],
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
    submissionDeadline: "10 Feb 2026",
    status: "open",
    selectionProcess: "Under-30 curators select 9 projects",
    eligibility: "Under-30 artists/companies from listed European countries",
    description:
      "Europe-focused platform exclusively for emerging artists under 30. Selected by young curators, 9 projects will be featured during the festival with possible re-programming opportunities into the main Mittelfest in July, providing exceptional visibility for early-career European theatre makers.",
    link: "https://www.mittelfest.org/en/mittelyoung/",
    category: "theatre",
    tags: ["under-30", "emerging artists", "Europe"],
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
    category: "theatre",
    tags: ["Pune", "national", "tribute festival"],
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
    category: "theatre",
    tags: ["Europe", "large-scale", "prestigious"],
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
    status: "open",
    selectionProcess: "Open call (global) + Selection of fellows",
    eligibility: "Artists / theatre makers / cultural practitioners",
    travelSupport: "Yes (contribution + local transfers + accommodation + per diems)",
    visaSupport: "Yes (assistance + visa fees covered)",
    description:
      "A high-value international fellowship embedded within a major festival. Selected fellows receive comprehensive support including visa assistance with fees covered, travel contribution, local transfers, accommodation, and per diems, making this an exceptional opportunity for global theatre practitioners.",
    link: "https://www.iti-germany.de/en/meeting-exchange/the-iti-academy/iti-academy-week-open-call-2026",
    isFellowship: true,
    category: "fellowship",
    tags: ["fellowship", "visa support", "ITI"],
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
    category: "theatre",
    tags: ["TYA", "children", "youth"],
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
    category: "theatre",
    tags: ["Poland", "student-friendly", "non-institutional"],
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
    category: "theatre",
    tags: ["TYA", "China", "local support"],
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
      "Cleveland's international theatre festival offering a platform for diverse theatrical voices and innovative performances. Open to artists and theatre makers from around the world looking to showcase their work in the United States.",
    link: "https://www.borderlightcle.org/",
    category: "theatre",
    tags: ["USA", "Cleveland", "international"],
  },

  // August Festivals
  {
    id: "colombo-intl-theatre-festival-2026",
    name: "12th Colombo International Theatre Festival (CITF) 2026",
    city: "Colombo",
    country: "Sri Lanka",
    languages: "Non-verbal or minimal dialogue preferred",
    scale: "International",
    duration: "7 days (22–28 Aug)",
    month: "August",
    dates: "22–28 August 2026",
    submissionDeadline: "10 Feb 2026",
    status: "open",
    selectionProcess: "Application review by organizing committee",
    eligibility: "International theatre groups & solo performers (Mono Drama format, 45–60 min for international; 15 min short play for South Asia)",
    travelSupport: "Accommodation (4 nights/5 days), meals, local transport, performance venue, and publicity provided for up to 4 participants. International airfare, visa, insurance, and production costs must be covered by participants.",
    description:
      "An internationally recognized Mono Drama competitive festival hosted by Inter Act Art Theatre Institute, Sri Lanka. Since 2012, CITF has welcomed theatre practitioners from 80+ countries and 100+ theatre groups worldwide. Awards include Best Mono Drama, Best Mono Drama Actor, and Best Mono Drama Actress. Non-verbal or visual storytelling is strongly encouraged. Selected teams may also apply for parallel festivals in Chilaw (Sri Lanka), Makassar (Indonesia), or Assam (India). Applications require a script in English, 2-minute video trailer, YouTube/Vimeo link, 6 high-res production stills, director & playwright photos, technical requirements, 150-word synopsis, and 150-word director's note.",
    link: "https://citf.lk/pdf/12th-CITF-Application-Final-2026.docx",
    featured: true,
    category: "competition",
    tags: ["Sri Lanka", "mono drama", "international competition", "visual storytelling", "awards"],
  },
]

/**
 * Month order for display
 */
export const MONTH_ORDER = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
