/**
 * Auditions data module for server-side usage
 * This allows the audition data to be imported in server components
 */

export interface Audition {
  id: number
  title: string
  type: string
  location: string
  state: string
  date: string
  director: string
  description: string
  company: string
  companyLink: string
  contact: string
  contactType: string
  experience: string
  verified: boolean
  image: string
  requirements: string[]
  roles: string[]
  applicationProcess: string
  auditionDetails?: {
    venue?: string
    performanceVenue?: string
    rehearsalSchedule?: string
    performanceDate?: string
    registrationLink?: string
  }
  projectDetails?: Record<string, string>
  directorDetails?: {
    name: string
    company: string
    description: string
  }
  whyThisMatters?: string[]
}

// Audition data - single source of truth
const auditions: Audition[] = [
  {
    id: 18,
    title: "POOP - World Toilet Organisation Theatre Production",
    type: "Theater",
    location: "Bangalore",
    state: "Karnataka",
    date: "Ongoing",
    director: "Theatre Production Team",
    description:
      "POOP is a bold, relevant, and socially urgent production that uses humour, satire, and storytelling to talk about sanitation, dignity, and public health. Officially partnered with World Toilet Organisation (WTO), this production goes beyond the stage with planned traveling performances across festivals, institutions, and multiple cities.",
    company: "World Toilet Organisation Partnership",
    companyLink: "https://forms.gle/iXNJPaDBrFi1m16h7",
    contact: "Register via Google Form",
    contactType: "form",
    experience: "All Levels",
    verified: true,
    image: "/images/auditions-stage.png",
    requirements: [
      "Passionate about meaningful and purpose-driven theatre",
      "Interested in ensemble work and collaborative performances",
      "Excited to tour and engage with diverse audiences",
      "Available for traveling performances across festivals and cities",
      "Based in or able to travel to Bangalore for rehearsals",
      "Commitment to social impact theatre",
    ],
    roles: [
      "Actors / Performers - Ensemble cast members",
      "Physical theatre performers welcome",
      "All experience levels considered",
    ],
    applicationProcess:
      "Fill out the audition form at https://forms.gle/iXNJPaDBrFi1m16h7 to express your interest and be considered for the production.",
    auditionDetails: {
      venue: "Bangalore (Rehearsals)",
      registrationLink: "https://forms.gle/iXNJPaDBrFi1m16h7",
    },
    whyThisMatters: [
      "Backed by World Toilet Organisation - a global organisation working across countries and communities",
      "Strong social impact & purpose-driven theatre",
      "Planned traveling performances across festivals, institutions, and multiple cities",
      "Opportunity to be part of a production that goes beyond the stage",
    ],
  },
  {
    id: 17,
    title: "Mega Historical Play (Hindi) - Katputliyan Theatre Group",
    type: "Theater",
    location: "Bidar / Bangalore",
    state: "Karnataka",
    date: "End of April 2026",
    director: "Zafer Mohiuddin",
    description:
      "Audition call for a Mega Historical Play written by Chandra Shekhar Kambar (originally in Kannada), Hindi adaptation. The play features 27 characters and will be performed at the historic ruins of Mahmood Gawan Madrasa in Bidar. Rehearsals will be held in RT Nagar area, Bangalore from Monday to Saturday, 6:30 PM to 9:00 PM.",
    company: "Katputliyan Theatre Group",
    companyLink: "https://wa.me/917847852004",
    contact: "+91 78478 52004 (WhatsApp)",
    contactType: "whatsapp",
    experience: "All Levels",
    verified: true,
    image: "/images/auditions-stage.png",
    requirements: [
      "Actors interested in historical theatre",
      "Available for rehearsals Monday to Saturday, 6:30 PM - 9:00 PM",
      "Based in or able to travel to RT Nagar area, Bangalore for rehearsals",
      "Comfortable with Hindi language",
      "Commitment to the full production schedule",
      "Available for performance at end of April 2026",
    ],
    roles: [
      "27 characters available - Various historical roles",
      "Male and female actors needed",
      "All experience levels welcome",
    ],
    applicationProcess:
      "Contact Director Zafer Mohiuddin via WhatsApp at +91 78478 52004 to express your interest and schedule an audition.",
    auditionDetails: {
      venue: "RT Nagar area, Bangalore (Rehearsals)",
      performanceVenue: "Historic ruins of Mahmood Gawan Madrasa, Bidar",
      rehearsalSchedule: "Monday to Saturday, 6:30 PM - 9:00 PM",
      performanceDate: "End of April 2026",
      registrationLink: "https://wa.me/917847852004",
    },
    directorDetails: {
      name: "Zafer Mohiuddin",
      company: "Katputliyan Theatre Group",
      description:
        "Renowned theatre director leading Katputliyan Theatre Group with extensive experience in historical and cultural productions.",
    },
  },
  {
    id: 16,
    title: "Audition Call - Urban Chaupaal's Next Theatre Production",
    type: "Theater",
    location: "Bangalore",
    state: "Karnataka",
    date: "Ongoing",
    director: "Urban Chaupaal",
    description:
      "Join the Revolution of Artists! Urban Chaupaal is holding auditions for their next theatre production. This is an extraordinary chance to highlight your skills, collaborate with a dynamic creative crew, and immerse yourself in a deeply moving stage production.",
    company: "Urban Chaupaal",
    companyLink: "https://forms.gle/LGuwkUn4mPzBUNfT9",
    contact: "Register via Google Form",
    contactType: "form",
    experience: "All Levels",
    verified: true,
    image: "/images/auditions-stage.png",
    requirements: [
      "Passion for theatre and performance",
      "Ability to work collaboratively",
      "Commitment to rehearsal schedule",
      "Based in Bangalore or willing to relocate",
    ],
    roles: ["Various roles available", "All experience levels welcome"],
    applicationProcess:
      "Fill out the Google Form to express your interest and schedule an audition.",
    auditionDetails: {
      venue: "Bangalore",
      registrationLink: "https://forms.gle/LGuwkUn4mPzBUNfT9",
    },
  },
  {
    id: 15,
    title: "Theatre Production - Delhi Theatre Group",
    type: "Theater",
    location: "Delhi",
    state: "Delhi",
    date: "Monthly auditions",
    director: "Various Directors",
    description:
      "Regular audition calls for various theatre productions in Delhi. Multiple theatre groups collaborate to bring fresh content to Delhi's vibrant theatre scene.",
    company: "Delhi Theatre Collective",
    companyLink: "https://example.com/delhi-theatre",
    contact: "Contact via website",
    contactType: "website",
    experience: "All Levels",
    verified: true,
    image: "/images/auditions-stage.png",
    requirements: [
      "Interest in Hindi/English theatre",
      "Based in Delhi NCR",
      "Flexible schedule for rehearsals",
    ],
    roles: ["Multiple roles", "Various age groups needed"],
    applicationProcess: "Apply through the collective's website or social media handles.",
    auditionDetails: {
      venue: "Various locations in Delhi",
    },
  },
  {
    id: 14,
    title: "Mumbai Theatre Company Auditions",
    type: "Theater",
    location: "Mumbai",
    state: "Maharashtra",
    date: "Ongoing",
    director: "Various",
    description:
      "Mumbai's leading theatre companies regularly hold auditions for their productions. From commercial plays to experimental theatre, opportunities abound for actors of all levels.",
    company: "Mumbai Theatre Consortium",
    companyLink: "https://example.com/mumbai-theatre",
    contact: "Contact via website",
    contactType: "website",
    experience: "All Levels",
    verified: true,
    image: "/images/auditions-stage.png",
    requirements: [
      "Fluency in Hindi/Marathi/English",
      "Based in Mumbai",
      "Professional attitude",
    ],
    roles: ["Lead roles", "Supporting roles", "Ensemble"],
    applicationProcess: "Apply through individual theatre company websites.",
    auditionDetails: {
      venue: "Various venues in Mumbai",
    },
  },
  {
    id: 13,
    title: "Kolkata Theatre Festival Auditions",
    type: "Theater",
    location: "Kolkata",
    state: "West Bengal",
    date: "Seasonal",
    director: "Festival Committee",
    description:
      "Annual auditions for Kolkata's prestigious theatre festivals. Multiple productions seek talented performers for Bengali and Hindi theatre.",
    company: "Kolkata Theatre Festival Committee",
    companyLink: "https://example.com/kolkata-theatre",
    contact: "Contact via website",
    contactType: "website",
    experience: "Intermediate to Advanced",
    verified: true,
    image: "/images/auditions-stage.png",
    requirements: [
      "Experience in Bengali/Hindi theatre",
      "Strong voice and movement skills",
      "Available for festival duration",
    ],
    roles: ["Festival productions", "Multiple shows"],
    applicationProcess: "Apply through festival registration portal.",
    auditionDetails: {
      venue: "Academy of Fine Arts, Kolkata",
    },
  },
  {
    id: 12,
    title: "Chennai Theatre Workshop & Auditions",
    type: "Theater",
    location: "Chennai",
    state: "Tamil Nadu",
    date: "Quarterly",
    director: "Chennai Theatre Academy",
    description:
      "Combined workshop and audition program for Chennai-based performers. Learn and audition simultaneously for upcoming productions.",
    company: "Chennai Theatre Academy",
    companyLink: "https://example.com/chennai-theatre",
    contact: "Contact via website",
    contactType: "website",
    experience: "All Levels",
    verified: true,
    image: "/images/auditions-stage.png",
    requirements: [
      "Interest in Tamil/English theatre",
      "Willingness to learn",
      "Based in Chennai",
    ],
    roles: ["Workshop participants", "Production cast"],
    applicationProcess: "Register for workshop which includes audition opportunity.",
    auditionDetails: {
      venue: "Chennai Theatre Academy",
    },
  },
  {
    id: 11,
    title: "Hyderabad Film & Theatre Auditions",
    type: "Film/Theater",
    location: "Hyderabad",
    state: "Telangana",
    date: "Ongoing",
    director: "Various",
    description:
      "Auditions for both film and theatre projects in Hyderabad. With the growing Telugu film industry and vibrant theatre scene, opportunities are expanding.",
    company: "Hyderabad Artists Network",
    companyLink: "https://example.com/hyderabad-arts",
    contact: "Contact via website",
    contactType: "website",
    experience: "All Levels",
    verified: true,
    image: "/images/auditions-stage.png",
    requirements: [
      "Telugu/Hindi/English proficiency",
      "Based in Hyderabad",
      "Flexible availability",
    ],
    roles: ["Film roles", "Theatre roles", "Web series"],
    applicationProcess: "Apply through network portal or attend open auditions.",
    auditionDetails: {
      venue: "Film Nagar, Hyderabad",
    },
  },
]

// Get all auditions
export function getAuditionsData(): Audition[] {
  return auditions
}

// Get a single audition by ID
export function getAuditionById(id: number): Audition | undefined {
  return auditions.find((a) => a.id === id)
}

// Get auditions by city
export function getAuditionsByCity(city: string): Audition[] {
  const normalizedCity = city.toLowerCase()
  return auditions.filter((a) => a.location.toLowerCase().includes(normalizedCity))
}

// Get auditions by type
export function getAuditionsByType(type: string): Audition[] {
  return auditions.filter((a) => a.type === type)
}

// Get verified auditions only
export function getVerifiedAuditions(): Audition[] {
  return auditions.filter((a) => a.verified)
}
