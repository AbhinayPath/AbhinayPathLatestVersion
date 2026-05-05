/**
 * SEO utilities for city-based dynamic pages
 * This file contains all the SEO content, city data, and utility functions
 */

// Supported cities with their metadata
export interface CityData {
  slug: string
  name: string
  state: string
  description: string
}

export const SUPPORTED_CITIES: CityData[] = [
  { slug: "mumbai", name: "Mumbai", state: "Maharashtra", description: "India's entertainment capital and home to Bollywood" },
  { slug: "bangalore", name: "Bangalore", state: "Karnataka", description: "India's Silicon Valley with a thriving theatre scene" },
  { slug: "delhi", name: "Delhi", state: "Delhi", description: "India's capital with rich cultural heritage" },
  { slug: "kolkata", name: "Kolkata", state: "West Bengal", description: "The cultural capital of India" },
  { slug: "chennai", name: "Chennai", state: "Tamil Nadu", description: "Hub of South Indian classical arts and cinema" },
  { slug: "hyderabad", name: "Hyderabad", state: "Telangana", description: "City of pearls with a growing film industry" },
  { slug: "pune", name: "Pune", state: "Maharashtra", description: "Cultural hub of Maharashtra with vibrant theatre" },
  { slug: "ahmedabad", name: "Ahmedabad", state: "Gujarat", description: "Gujarat's largest city with growing arts scene" },
  { slug: "jaipur", name: "Jaipur", state: "Rajasthan", description: "The Pink City with rich cultural traditions" },
  { slug: "lucknow", name: "Lucknow", state: "Uttar Pradesh", description: "City of Nawabs with classical arts heritage" },
  { slug: "chandigarh", name: "Chandigarh", state: "Punjab/Haryana", description: "The City Beautiful with modern arts scene" },
  { slug: "bhopal", name: "Bhopal", state: "Madhya Pradesh", description: "City of Lakes with growing cultural scene" },
  { slug: "patna", name: "Patna", state: "Bihar", description: "Ancient city with emerging theatre community" },
  { slug: "kochi", name: "Kochi", state: "Kerala", description: "Cultural hub of Kerala with traditional arts" },
  { slug: "guwahati", name: "Guwahati", state: "Assam", description: "Gateway to Northeast India's arts scene" },
  { slug: "bhubaneswar", name: "Bhubaneswar", state: "Odisha", description: "Temple city with classical dance traditions" },
  { slug: "thiruvananthapuram", name: "Thiruvananthapuram", state: "Kerala", description: "Kerala's capital with rich arts heritage" },
  { slug: "indore", name: "Indore", state: "Madhya Pradesh", description: "Central India's commercial hub" },
  { slug: "nagpur", name: "Nagpur", state: "Maharashtra", description: "Orange city with cultural institutions" },
  { slug: "visakhapatnam", name: "Visakhapatnam", state: "Andhra Pradesh", description: "Port city with cultural activities" },
]

export type CategoryType = "theatre-workshops" | "auditions" | "theatre-festivals"

export interface CategoryData {
  slug: CategoryType
  name: string
  singular: string
  pageTitle: string
  metaDescription: string
}

export const CATEGORIES: Record<CategoryType, CategoryData> = {
  "theatre-workshops": {
    slug: "theatre-workshops",
    name: "Theatre Workshops",
    singular: "Workshop",
    pageTitle: "Theatre Workshops",
    metaDescription: "acting classes, theatre training, and workshop opportunities",
  },
  auditions: {
    slug: "auditions",
    name: "Auditions",
    singular: "Audition",
    pageTitle: "Theatre & Film Auditions",
    metaDescription: "theatre auditions, film casting calls, and acting opportunities",
  },
  "theatre-festivals": {
    slug: "theatre-festivals",
    name: "Theatre Festivals",
    singular: "Festival",
    pageTitle: "Theatre Festivals & Events",
    metaDescription: "theatre festivals, drama competitions, and cultural events",
  },
}

// Get city data by slug
export function getCityBySlug(slug: string): CityData | undefined {
  return SUPPORTED_CITIES.find((city) => city.slug === slug.toLowerCase())
}

// Get all city slugs for static generation
export function getAllCitySlugs(): string[] {
  return SUPPORTED_CITIES.map((city) => city.slug)
}

// Generate SEO title
export function generateSEOTitle(cityName: string, category: CategoryData): string {
  return `${category.pageTitle} in ${cityName} 2026 | AbhinayPath`
}

// Generate meta description
export function generateMetaDescription(cityName: string, category: CategoryData): string {
  return `Explore ${category.name.toLowerCase()} in ${cityName}. Find ${category.metaDescription} on AbhinayPath - India's platform for creative artists.`
}

// Generate SEO intro paragraph (250-300 words)
export function generateSEOIntro(cityName: string, category: CategoryType): string {
  const intros: Record<CategoryType, (city: string) => string> = {
    "theatre-workshops": (city) => `
      Discover the best theatre workshops in ${city} and take the next step in your acting journey. Whether you are a beginner looking to explore the world of performance or an experienced actor seeking to refine your craft, ${city} offers a vibrant ecosystem of acting classes and theatre training programs designed to nurture talent at every level.

      ${city}'s theatre community is known for its diversity and dedication to the performing arts. From intensive method acting workshops to specialized training in voice modulation, movement, and improvisation, you will find opportunities that cater to various aspects of theatrical performance. Many renowned theatre practitioners and institutions in ${city} conduct regular workshops that combine traditional techniques with contemporary approaches.

      AbhinayPath brings you a curated list of verified theatre workshops happening in ${city}. Each listing includes detailed information about the workshop curriculum, trainer credentials, duration, fees, and registration process. We ensure that all workshops listed on our platform are conducted by qualified professionals and recognized institutions, giving you the confidence to invest in your artistic development.

      Whether you are preparing for NSD or FTII entrance exams, looking to build your acting portfolio, or simply want to explore theatre as a creative outlet, the workshops in ${city} offer something for everyone. Many workshops also provide certificates that can enhance your professional profile and open doors to further opportunities in theatre, film, and television.
    `,
    auditions: (city) => `
      Find the latest theatre and film auditions in ${city} and take your first step towards a career in performing arts. ${city} is home to numerous theatre groups, production houses, and casting agencies that regularly seek fresh talent for their projects. Whether you dream of performing on stage or in front of the camera, audition opportunities in ${city} can help you turn your passion into a profession.

      The theatre scene in ${city} is vibrant and diverse, with productions ranging from experimental plays to commercial theatre, from regional language dramas to English productions. Film and web series auditions are equally abundant, thanks to the growing content creation industry. Directors and casting directors in ${city} are always on the lookout for actors who bring authenticity, dedication, and unique perspectives to their roles.

      AbhinayPath provides a comprehensive listing of verified auditions happening in ${city}. Each audition call includes essential details such as project type, roles being cast, experience requirements, and how to apply. We work directly with theatre companies and production houses to ensure that every listing is legitimate and offers real opportunities for aspiring performers.

      Whether you are a seasoned actor looking for your next role or a newcomer ready to face the camera for the first time, the auditions listed here represent genuine opportunities to showcase your talent. Remember to prepare thoroughly, bring your best headshots and portfolio, and approach each audition as a learning experience that brings you closer to your goals.
    `,
    "theatre-festivals": (city) => `
      Explore upcoming theatre festivals and cultural events in ${city} that celebrate the performing arts. ${city} hosts numerous festivals throughout the year that bring together theatre enthusiasts, performers, and audiences for unforgettable experiences. These festivals showcase diverse theatrical traditions, from classical forms to contemporary experimental works.

      Theatre festivals in ${city} offer more than just performances—they are platforms for networking, learning, and artistic exchange. Many festivals include workshops, masterclasses, panel discussions, and opportunities to interact with renowned theatre practitioners. For aspiring artists, participating in or attending these festivals can be transformative experiences that shape their understanding of theatre.

      AbhinayPath curates a comprehensive list of theatre festivals happening in ${city} and across India. Our listings include details about festival themes, participating groups, submission deadlines for performances, and registration information for attendees. Whether you want to perform, submit your play, or simply attend as an audience member, you will find all the information you need here.

      Many festivals also offer travel support, accommodation assistance, and special provisions for young artists and students. Some festivals focus on specific themes like street theatre, children's theatre, or folk traditions, while others celebrate the full spectrum of theatrical expression. Check our listings regularly for updates on upcoming festivals and early bird registration opportunities.
    `,
  }

  return intros[category](cityName).trim().replace(/\s+/g, " ")
}

// Generate FAQs for each category
export interface FAQ {
  question: string
  answer: string
}

export function generateFAQs(cityName: string, category: CategoryType): FAQ[] {
  const faqs: Record<CategoryType, (city: string) => FAQ[]> = {
    "theatre-workshops": (city) => [
      {
        question: `How can I join theatre workshops in ${city}?`,
        answer: `To join theatre workshops in ${city}, browse our curated list of verified workshops above. Each listing includes registration links, contact details, and application procedures. Most workshops accept online registrations, while some may require in-person auditions or interviews. Check individual workshop pages for specific requirements and deadlines.`,
      },
      {
        question: `Are there free acting classes in ${city}?`,
        answer: `Yes, several theatre groups and cultural organizations in ${city} occasionally offer free introductory workshops and acting classes. Additionally, some institutions provide scholarships and financial assistance for deserving candidates. Keep checking AbhinayPath for updates on free and subsidized workshop opportunities in ${city}.`,
      },
      {
        question: `Who can apply for theatre workshops in ${city}?`,
        answer: `Theatre workshops in ${city} welcome participants from all backgrounds and experience levels. While some advanced workshops may require prior experience, many beginner-friendly programs are specifically designed for newcomers. Age requirements vary by workshop—some are open to all ages, while others are restricted to adults (18+). Check individual listings for eligibility criteria.`,
      },
      {
        question: `What types of acting workshops are available in ${city}?`,
        answer: `${city} offers diverse acting workshops including method acting, Stanislavski technique, Meisner technique, physical theatre, voice and speech training, improvisation, screen acting, and audition preparation. You can also find specialized workshops for NSD/FTII entrance preparation, children's theatre, and corporate training programs.`,
      },
    ],
    auditions: (city) => [
      {
        question: `How do I find theatre auditions in ${city}?`,
        answer: `AbhinayPath lists all verified theatre and film auditions in ${city}. Browse our curated listings above to find current casting calls. Each listing includes project details, roles being cast, requirements, and application instructions. You can also follow ${city}-based theatre groups on social media for additional audition announcements.`,
      },
      {
        question: `Do I need experience to audition for plays in ${city}?`,
        answer: `Not always. Many theatre groups in ${city} actively seek fresh talent and welcome actors with no prior experience. Listings marked "All Levels" or "Beginners Welcome" are specifically open to newcomers. For experienced-only roles, the requirements are clearly mentioned. Always read the full audition description before applying.`,
      },
      {
        question: `What should I prepare for a theatre audition in ${city}?`,
        answer: `Typically, you should prepare one or two monologues (1-2 minutes each), bring updated headshots and a resume, and dress appropriately for the character type. Some auditions may require cold readings or improvisations. Check the specific audition listing for exact requirements—some may ask for self-tape submissions or specific scenes.`,
      },
      {
        question: `Are auditions in ${city} paid or unpaid?`,
        answer: `Payment varies by production. Professional theatre companies and film productions typically offer compensation, while community theatre and student productions may be unpaid but offer valuable experience and exposure. Payment details are usually mentioned in the audition listing. Always clarify compensation terms before committing to a project.`,
      },
    ],
    "theatre-festivals": (city) => [
      {
        question: `What theatre festivals happen in ${city}?`,
        answer: `${city} hosts several theatre festivals throughout the year, ranging from international events to regional celebrations. These include drama competitions, mono-acting festivals, street theatre gatherings, and multi-day theatrical celebrations. Check our listings for upcoming festivals with dates, venues, and participation details.`,
      },
      {
        question: `How can I participate in theatre festivals in ${city}?`,
        answer: `Festival participation typically involves submitting your play or performance proposal before the deadline. Requirements vary—some festivals invite established groups, while others welcome amateur performers. Registration often involves filling out application forms, submitting play scripts, and paying nominal fees. Check individual festival listings for specific submission guidelines.`,
      },
      {
        question: `Do theatre festivals in ${city} offer travel support?`,
        answer: `Many established festivals offer travel support, accommodation, and honorarium for participating groups, especially for out-station performers. The extent of support varies by festival and is usually mentioned in the call for entries. Some festivals also provide special subsidies for student groups and emerging artists.`,
      },
      {
        question: `Can I attend theatre festivals as an audience member?`,
        answer: `Absolutely! Theatre festivals welcome audiences with open arms. Many festivals offer free entry for select performances, while others sell affordable passes for the entire festival duration. Festival passes often include access to workshops, discussions, and networking events in addition to performances.`,
      },
    ],
  }

  return faqs[category](cityName)
}

// Generate JSON-LD structured data for Organization
export function generateOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "AbhinayPath",
    url: "https://www.abhinaypath.com",
    logo: "https://www.abhinaypath.com/images/abhinaypath-logo.png",
    description: "India's creative platform to discover auditions, workshops & prep support — across theatre, film & web.",
    sameAs: [
      "https://www.instagram.com/abhinaypath",
      "https://www.facebook.com/abhinaypath",
      "https://twitter.com/abhinaypath",
    ],
  }
}

// Generate JSON-LD FAQ Schema
export function generateFAQSchema(faqs: FAQ[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  }
}

// Generate JSON-LD Event Schema for workshops/auditions/festivals
export function generateEventSchema(event: {
  name: string
  description: string
  startDate: string
  endDate?: string
  location: string
  organizer: string
  url: string
  image?: string
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Event",
    name: event.name,
    description: event.description,
    startDate: event.startDate,
    endDate: event.endDate || event.startDate,
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    eventStatus: "https://schema.org/EventScheduled",
    location: {
      "@type": "Place",
      name: event.location,
      address: {
        "@type": "PostalAddress",
        addressLocality: event.location,
        addressCountry: "IN",
      },
    },
    organizer: {
      "@type": "Organization",
      name: event.organizer,
    },
    url: event.url,
    image: event.image || "https://www.abhinaypath.com/images/acting-workshop.png",
  }
}

// Generate BreadcrumbList Schema
export function generateBreadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  }
}

// Normalize city name from URL slug
export function normalizeCityName(slug: string): string {
  const city = getCityBySlug(slug)
  return city?.name || slug.charAt(0).toUpperCase() + slug.slice(1)
}

// Match workshop/audition location to city
export function matchesCity(itemLocation: string, citySlug: string): boolean {
  const normalizedLocation = itemLocation.toLowerCase()
  const normalizedSlug = citySlug.toLowerCase()
  const city = getCityBySlug(citySlug)
  
  if (!city) return false
  
  // Check if the location contains the city name
  return (
    normalizedLocation.includes(normalizedSlug) ||
    normalizedLocation.includes(city.name.toLowerCase())
  )
}
