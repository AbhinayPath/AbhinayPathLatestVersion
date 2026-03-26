"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, Filter, ChevronDown, ChevronUp, Star, X } from "lucide-react"
import WorkshopCard from "@/components/workshop-card"
import MobileFilterDrawer from "@/components/mobile-filter-drawer"
import ActiveFilters from "@/components/active-filters"
import { useMediaQuery } from "@/hooks/use-media-query"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { BookOpen, Calendar, MapPin, Clock, IndianRupee, ExternalLink, Tag } from "lucide-react"
import { ShareWorkshopButton } from "@/components/share-workshop-button"

// Verified workshops data
interface Workshop {
  id: number
  title: string
  trainer: string
  institution: string
  location: string
  state: string
  country: string
  date: string
  time: string
  description: string
  image?: string
  registrationLink: string
  featured?: boolean
  price: string
  contact: string
  email: string
  eligibility: string
  venue: string
  includes?: string
  category: string
  tags: string[]
  travelSupport?: boolean
  mode?: string
  // ISO date string for expiration check (YYYY-MM-DD format)
  // If not provided, workshop is considered non-expiring (e.g., ongoing programs)
  expiresOn?: string
}

// Utility function to check if a workshop has expired
function isWorkshopExpired(workshop: Workshop): boolean {
  // If no expiration date is set, workshop doesn't expire (ongoing programs)
  if (!workshop.expiresOn) {
    return false
  }
  
  const today = new Date()
  today.setHours(0, 0, 0, 0) // Reset to start of day for fair comparison
  
  const expirationDate = new Date(workshop.expiresOn)
  expirationDate.setHours(23, 59, 59, 999) // End of expiration day
  
  return today > expirationDate
}

const workshops: Workshop[] = [
  {
    id: 1,
    title: "FTII / CFOL — Masterclass of Acting (Mumbai)",
    trainer: "FTII Faculty",
    institution: "Film and Television Institute of India (FTII)",
    location: "Mumbai",
    state: "Maharashtra",
    country: "India",
    date: "15–24 Jan 2026",
    time: "10 AM–5 PM",
    description:
      "🎭 Master the craft of acting with FTII's intensive masterclass in Mumbai. Comprehensive training covering performance techniques, character development, and scene work.",
    registrationLink: "https://ftii.ac.in/p/vtwa/masterclass-of-acting-in-mumbai-15-24th-january-2026",
    featured: true,
    price: "₹25,000",
    contact: "020-25580085",
    email: "info.cfol@ftii.ac.in",
    eligibility: "18+ (as on 1 Jan 2026), HSC/12th (10th in exceptional cases), Indian nationals",
    venue: "Mumbai",
    includes: "10-day intensive training + FTII Certificate",
    category: "Acting & Performance",
    tags: ["Short-term Workshop"],
    expiresOn: "2026-01-24", // End date of workshop
  },
  {
    id: 22,
    title: "FTII / CFOL — Basic Course in Screen Acting (Mumbai)",
    trainer: "FTII Faculty",
    institution: "Film and Television Institute of India (FTII)",
    location: "Mumbai",
    state: "Maharashtra",
    country: "India",
    date: "09–18 Feb 2026",
    time: "10 AM–5 PM",
    description:
      "Learn acting fundamentals and on-camera performance techniques in this intensive short-term course. Covers screen acting essentials for film and television.",
    registrationLink: "https://ftii.ac.in/p/vtwa/basic-course-in-screen-acting-in-mumbai-09-18-february-2026",
    featured: true,
    price: "Contact FTII",
    contact: "020-25580085",
    email: "info.cfol@ftii.ac.in",
    eligibility: "18+, 12th pass (exceptions considered)",
    venue: "Mumbai",
    includes: "10-day intensive training + FTII Certificate",
    category: "Acting & Performance",
    tags: ["Short-term Workshop"],
    expiresOn: "2026-02-18",
  },
  {
    id: 23,
    title: "FTII / CFOL — Basic Course in Screen Acting (Lucknow)",
    trainer: "FTII Faculty",
    institution: "Film and Television Institute of India (FTII)",
    location: "Lucknow",
    state: "Uttar Pradesh",
    country: "India",
    date: "19–25 Feb 2026",
    time: "10 AM–5 PM",
    description:
      "Learn acting fundamentals and on-camera performance techniques in this intensive short-term workshop. Covers screen acting essentials for film and television.",
    registrationLink: "https://ftii.ac.in/p/vtwa/basic-course-in-screen-acting-in-lucknow-19-25-february-2026",
    featured: true,
    price: "Contact FTII",
    contact: "020-25580085",
    email: "info.cfol@ftii.ac.in",
    eligibility: "18+, 12th pass (exceptions considered)",
    venue: "Lucknow",
    includes: "7-day intensive training + FTII Certificate",
    category: "Acting & Performance",
    tags: ["Short-term Workshop"],
    expiresOn: "2026-02-25",
  },
  {
    id: 24,
    title: "FTII / CFOL — Masterclass of Documentary Film Making (Mandi)",
    trainer: "FTII Faculty",
    institution: "Film and Television Institute of India (FTII)",
    location: "Mandi",
    state: "Himachal Pradesh",
    country: "India",
    date: "25 Feb–07 Mar 2026",
    time: "10 AM–5 PM",
    description:
      "Master documentary filmmaking techniques in this intensive short-term workshop. Covers documentary practice, storytelling, camera work, and post-production essentials.",
    registrationLink: "https://ftii.ac.in/p/vtwa/masterclass-of-documentary-film-making-in-mandi-himachal-pradesh-25-february-07-march-2026",
    featured: true,
    price: "Contact FTII",
    contact: "020-25580085",
    email: "info.cfol@ftii.ac.in",
    eligibility: "18+, 12th pass (exceptions considered)",
    venue: "Mandi, Himachal Pradesh",
    includes: "11-day intensive training + FTII Certificate",
    category: "Acting & Performance",
    tags: ["Short-term Workshop"],
    expiresOn: "2026-03-07",
  },
  {
    id: 25,
    title: "FTII / CFOL — Basic Course in Screen Acting (Nainital)",
    trainer: "FTII Faculty",
    institution: "Film and Television Institute of India (FTII)",
    location: "Nainital",
    state: "Uttarakhand",
    country: "India",
    date: "08–14 Mar 2026",
    time: "10 AM–5 PM",
    description:
      "Learn acting technique, characterization, monologue work, scene work, voice and expression in this intensive short-term course at Jim Corbett National Park.",
    registrationLink: "https://ftii.ac.in/p/vtwa/basic-course-in-screen-acting-in-nainital-08th-to-14th-march-2026",
    featured: true,
    price: "Rs. 8,900",
    contact: "020-25580085",
    email: "info.cfol@ftii.ac.in",
    eligibility: "18+, 12th pass (10th pass in exceptional cases)",
    venue: "Lemonwood Riverside Premier Resort, Jim Corbett National Park, Nainital",
    includes: "7-day intensive training + FTII Certificate",
    category: "Acting & Performance",
    tags: ["Short-term Workshop"],
    expiresOn: "2026-03-14",
  },
  {
    id: 26,
    title: "Adishakti SOPE Residency — Session 1 (March 2026)",
    trainer: "Adishakti Faculty",
    institution: "Adishakti Theatre Arts Laboratory",
    location: "Puducherry",
    state: "Tamil Nadu",
    country: "India",
    date: "08–17 Mar 2026",
    time: "Full Day (Residential)",
    description:
      "Source of Performance Energy (SOPE) is an intensive residential training program focusing on breath, energy, movement, body expression, voice, and rhythm for holistic performer development.",
    registrationLink: "https://adishaktitheatrearts.com/training/",
    featured: true,
    price: "Contact Adishakti",
    contact: "0413-2622287",
    email: "info@adishaktitheatrearts.com",
    eligibility: "Open to performers and theatre practitioners",
    venue: "Adishakti Campus, Tamil Nadu",
    includes: "10-day immersive residential training",
    category: "Movement & Physical Theatre",
    tags: ["Residency", "Intensive Workshop"],
    expiresOn: "2026-03-17",
  },
  {
    id: 27,
    title: "Adishakti SOPE Residency — Session 2 (March 2026)",
    trainer: "Adishakti Faculty",
    institution: "Adishakti Theatre Arts Laboratory",
    location: "Puducherry",
    state: "Tamil Nadu",
    country: "India",
    date: "21–30 Mar 2026",
    time: "Full Day (Residential)",
    description:
      "Source of Performance Energy (SOPE) is an intensive residential training program focusing on breath, energy, movement, body expression, voice, and rhythm for holistic performer development.",
    registrationLink: "https://adishaktitheatrearts.com/training/",
    featured: true,
    price: "Contact Adishakti",
    contact: "0413-2622287",
    email: "info@adishaktitheatrearts.com",
    eligibility: "Open to performers and theatre practitioners",
    venue: "Adishakti Campus, Tamil Nadu",
    includes: "10-day immersive residential training",
    category: "Movement & Physical Theatre",
    tags: ["Residency", "Intensive Workshop"],
    expiresOn: "2026-03-30",
  },
  {
    id: 28,
    title: "FTII / CFOL — Workshop on Foundations of Mobile Filmmaking (Lonavala)",
    trainer: "FTII Faculty",
    institution: "Film and Television Institute of India (FTII)",
    location: "Lonavala",
    state: "Maharashtra",
    country: "India",
    date: "14–20 Mar 2026",
    time: "10 AM–5 PM",
    description:
      "Learn production design concepts and mobile filmmaking foundations in this intensive short-term workshop. Covers visual storytelling, set design principles, and practical production techniques.",
    registrationLink: "https://ftii.ac.in/p/vtwa/workshop-on-foundations-of-mobile-filmmaking-in-lonavala-16th-to-20th-march-2026",
    featured: true,
    price: "Contact FTII",
    contact: "020-25580085",
    email: "info.cfol@ftii.ac.in",
    eligibility: "18+, 12th pass (exceptions considered)",
    venue: "Lonavala, Maharashtra",
    includes: "7-day intensive training + FTII Certificate",
    category: "Design & Production",
    tags: ["Short-term Workshop"],
    expiresOn: "2026-03-20",
  },
  {
    id: 29,
    title: "FTII / CFOL — Sound Recording & Design Workshop (Lonavala)",
    trainer: "FTII Faculty",
    institution: "Film and Television Institute of India (FTII)",
    location: "Lonavala",
    state: "Maharashtra",
    country: "India",
    date: "09–15 Mar 2026",
    time: "10 AM–5 PM",
    description:
      "Master the art of sound recording and sound design for films through immersive learning. Covers recording techniques, sound design principles, and post-production audio workflows.",
    registrationLink: "https://ftii.ac.in/p/vtwa/master-the-art-of-sound-recording-sound-design-for-your-films-though-immersive-learning-in-lonavala-09-to-15-march-2026",
    featured: true,
    price: "Contact FTII",
    contact: "020-25580085",
    email: "info.cfol@ftii.ac.in",
    eligibility: "18+, 12th pass (exceptions considered)",
    venue: "Lonavala, Maharashtra",
    includes: "7-day intensive training + FTII Certificate",
    category: "Design & Production",
    tags: ["Short-term Workshop"],
    expiresOn: "2026-03-15",
  },
  {
    id: 30,
    title: "Rangakarmee Kolkata — Act. Create. Transform. 3-Month Weekend Acting Workshop",
    trainer: "Rangakarmee Faculty",
    institution: "Rangakarmee Kolkata",
    location: "Kolkata",
    state: "West Bengal",
    country: "India",
    date: "March 2026 (Weekends)",
    time: "Weekend Evenings & Sundays",
    description:
      "A comprehensive 3-month weekend acting workshop focusing on acting technique, scene work, and character development with a theatre focus. Perfect for working professionals looking to develop their craft.",
    registrationLink: "tel:7278992871",
    featured: true,
    price: "Contact for details",
    contact: "7278992871",
    email: "rangakarmee@gmail.com",
    eligibility: "Open to all aspiring actors",
    venue: "Kolkata, West Bengal",
    includes: "3-month weekend training program",
    category: "Acting & Performance",
    tags: ["Long-term Course"],
  },
  {
    id: 31,
    title: "Prasanna's Acting Workshop \u2014 Mysore (8-Day Residential)",
    trainer: "Sri Prasanna & Rajneesh Bisht",
    institution: "Indian Theatre Foundation / IIET Mysore",
    location: "Mysore",
    state: "Karnataka",
    country: "India",
    date: "2\u201309 Apr 2026",
    time: "9 AM \u2013 6 PM daily",
    description:
      "An 8-day intensive residential acting workshop led by Sri Prasanna and Rajneesh Bisht, designed for serious actors who want to deepen their craft. Training covers Improvisation, Voice & Communication, Ensemble Work, Character Exploration, and Performance Presence. Includes one outdoor Mysore exploration day. April 9 features Certificate & Feedback session (till 5 PM). Smoking and alcohol strictly prohibited on campus. Selected participants will be contacted after applying.",
    registrationLink: "https://www.indiantheatrefoundation.org/acting-workshop/",
    featured: true,
    price: "\u20B920,000",
    contact: "Via website",
    email: "Via website",
    eligibility: "Serious actors looking to deepen craft",
    venue: "IIET, Mysore, Karnataka",
    includes: "Accommodation (separate dorms), Breakfast & Lunch, Tea/Coffee, Certificate & Feedback. Dinner self-managed.",
    category: "Acting & Performance",
    tags: ["Residential Workshop", "Intensive Workshop"],
    expiresOn: "2026-04-09",
  },
  {
    id: 2,
    title: "FTII / CFOL — Michael Chekhov Acting Workshop (Goa)",
    trainer: "FTII Faculty",
    institution: "Film and Television Institute of India (FTII)",
    location: "Saligao, Goa",
    state: "Goa",
    country: "India",
    date: "15–21 Jan 2026",
    time: "10 AM–5 PM",
    description:
      "🎭 Explore the Michael Chekhov acting technique in the beautiful setting of Goa. Learn psychological gesture, imagination, and character transformation methods.",
    registrationLink: "https://ftii.ac.in/p/vtwa/michael-chekhov-acting-workshop-in-goa-15th-to-21st-jan-2026",
    featured: true,
    price: "₹12,000",
    contact: "020-25580085",
    email: "info.cfol@ftii.ac.in",
    eligibility: "Open to all",
    venue: "Villa Azavado, Saligao, Goa",
    includes: "7-day workshop + FTII Certificate",
    category: "Acting & Performance",
    tags: ["Short-term Workshop"],
    expiresOn: "2026-01-21",
  },
  {
    id: 3,
    title: "FTII / CFOL — Basic Course in Screen Acting (New Delhi)",
    trainer: "FTII Faculty",
    institution: "Film and Television Institute of India (FTII)",
    location: "New Delhi",
    state: "Delhi",
    country: "India",
    date: "21–27 Jan 2026",
    time: "10 AM–5 PM",
    description:
      "🎬 Learn fundamentals of screen acting for film and television. Comprehensive training in camera techniques, close-ups, and on-screen performance.",
    registrationLink: "https://ftii.ac.in/p/vtwa/basic-course-in-screen-acting-in-new-delhi-21-27-january-2026",
    featured: true,
    price: "₹9,900",
    contact: "020-25580085",
    email: "info.cfol@ftii.ac.in",
    eligibility: "18+",
    venue: "NIV Art Centre and Film Studios, Neb Sarai (near IGNOU), New Delhi",
    includes: "7-day training + FTII Certificate",
    category: "Acting & Performance",
    tags: ["Short-term Workshop"],
    expiresOn: "2026-01-27",
  },
  {
    id: 4,
    title: "FTII / CFOL — Digital Cinematography (Pune)",
    trainer: "FTII Faculty",
    institution: "Film and Television Institute of India (FTII)",
    location: "Pune",
    state: "Maharashtra",
    country: "India",
    date: "05–17 Jan 2026",
    time: "10 AM–5 PM",
    description:
      "🎥 Master digital cinematography techniques, camera operations, lighting, and visual storytelling. Hands-on training with professional equipment.",
    registrationLink: "https://ftii.ac.in/p/vtwa/basic-course-in-digital-cinematography-in-pune-05-17-january-2026",
    featured: true,
    price: "Contact for details",
    contact: "020-25580085",
    email: "info.cfol@ftii.ac.in",
    eligibility: "18+",
    venue: "FTII Pune",
    includes: "Comprehensive cinematography training + FTII Certificate",
    category: "Acting & Performance",
    tags: ["Short-term Workshop"],
    expiresOn: "2026-01-17",
  },
  {
    id: 5,
    title: "All the World's a Stage - Intro to Acting (The Self Centre)",
    trainer: "The Self Centre",
    institution: "The Self Centre",
    location: "Bengaluru",
    state: "Karnataka",
    country: "India",
    date: "Sun, 18 Jan 2026",
    time: "10:00 AM",
    description:
      "🎭 Introduction to acting workshop covering basic acting techniques, improvisation, and character development. Perfect for beginners exploring theatre.",
    registrationLink:
      "https://www.district.in/events/all-the-worlds-a-stage-intro-to-acting-workshop-by-the-self-centre-jan18-2026-buy-tickets",
    featured: false,
    price: "₹1,499",
    contact: "Via district.in",
    email: "Via district.in",
    eligibility: "Open to all",
    venue: "Underline Center, Domlur, Bengaluru",
    includes: "4-hour workshop + certificate",
    category: "Acting & Performance",
    tags: ["Short-term Workshop"],
    expiresOn: "2026-01-18",
  },
  {
    id: 6,
    title: "Moving Parts (Arambol, Goa) — Body & Performance Course: Part Two",
    trainer: "Moving Parts",
    institution: "Moving Parts",
    location: "Arambol, Goa",
    state: "Goa",
    country: "India",
    date: "5–30 Jan 2026",
    time: "Full day intensive",
    description:
      "🧍 Intensive physical theatre training focusing on neutral mask journey, hero's journey, tragic chorus, ensemble work, monologues and vocal technique.",
    registrationLink: "https://www.movingparts.art/training",
    featured: true,
    price: "Contact for details",
    contact: "Via website",
    email: "Via website",
    eligibility: "Open to serious practitioners",
    venue: "Arambol, Goa",
    includes: "Part of 4-part intensive Dec 2025–Mar 2026",
    category: "Movement & Physical Theatre",
    tags: ["Long-term Course"],
    expiresOn: "2026-01-30",
  },
  {
    id: 7,
    title: "FTII / CFOL — Workshop: Script to Screen (Only for Women) (Pune)",
    trainer: "FTII Faculty",
    institution: "Film and Television Institute of India (FTII)",
    location: "Pune",
    state: "Maharashtra",
    country: "India",
    date: "20–29 Jan 2026",
    time: "10 AM–5 PM",
    description:
      "🎬 Exclusive workshop for women covering the complete journey from script development to screen. Learn storytelling, direction, and production.",
    registrationLink:
      "https://ftii.ac.in/p/vtwa/workshop-on-script-to-screen-only-for-women-in-pune-20-29-january-2026",
    featured: true,
    price: "₹18,000",
    contact: "020-25580085",
    email: "info.cfol@ftii.ac.in",
    eligibility: "Women only, 18+",
    venue: "Vijay Tendulkar Writer's Academy, Kothrud, Pune",
    includes: "10-day intensive + FTII Certificate",
    category: "Direction & Dramaturgy",
    tags: ["Short-term Workshop"],
    expiresOn: "2026-01-29",
  },
  {
    id: 8,
    title: "FTII / CFOL — Basic Course in Screenplay Writing (Mumbai)",
    trainer: "FTII Faculty",
    institution: "Film and Television Institute of India (FTII)",
    location: "Mumbai",
    state: "Maharashtra",
    country: "India",
    date: "25–31 Jan 2026",
    time: "10 AM–5 PM",
    description:
      "✍️ Learn fundamentals of screenplay writing including story structure, character development, dialogue, and formatting for cinema.",
    registrationLink: "https://ftii.ac.in/p/vtwa/basic-course-in-screenplay-writing-in-mumbai-25-31-january-2026",
    featured: true,
    price: "Contact for details",
    contact: "020-25580085",
    email: "info.cfol@ftii.ac.in",
    eligibility: "18+",
    venue: "Mumbai",
    includes: "7-day training + FTII Certificate",
    category: "Direction & Dramaturgy",
    tags: ["Short-term Workshop"],
    expiresOn: "2026-01-31",
  },
  {
    id: 9,
    title: "FTII / CFOL — Basic Course in Screenplay Writing (Goa)",
    trainer: "FTII Faculty",
    institution: "Film and Television Institute of India (FTII)",
    location: "Goa",
    state: "Goa",
    country: "India",
    date: "25–31 Jan 2026",
    time: "10 AM–5 PM",
    description:
      "✍️ Learn screenplay writing in the inspiring setting of Goa. Master story structure, character arcs, and cinematic storytelling techniques.",
    registrationLink: "https://ftii.ac.in/p/vtwa/basic-course-in-screenplay-writing-in-goa-25th-to-31st-jan-2026",
    featured: true,
    price: "Contact for details",
    contact: "020-25580085",
    email: "info.cfol@ftii.ac.in",
    eligibility: "18+",
    venue: "Goa",
    includes: "7-day training + FTII Certificate",
    category: "Direction & Dramaturgy",
    tags: ["Short-term Workshop"],
    expiresOn: "2026-01-31",
  },
  {
    id: 10,
    title: "FTII / CFOL — The Art of Foley Sound FX for Films (Mumbai)",
    trainer: "FTII Faculty",
    institution: "Film and Television Institute of India (FTII)",
    location: "Mumbai",
    state: "Maharashtra",
    country: "India",
    date: "21–23 Jan 2026",
    time: "Full day sessions",
    description:
      "🎙️ Learn the art of creating Foley sound effects for films. Hands-on training in sound design, recording techniques, and audio post-production.",
    registrationLink: "https://ftii.ac.in/p/vtwa/the-art-of-foley-sound-fx-for-films-in-mumbai-21-23-jan-2026",
    featured: true,
    price: "Contact for details",
    contact: "020-25580085",
    email: "info.cfol@ftii.ac.in",
    eligibility: "18+",
    venue: "Mumbai",
    includes: "3-day intensive + FTII Certificate",
    category: "Design & Production",
    tags: ["Short-term Workshop"],
    expiresOn: "2026-01-23",
  },
  {
    id: 11,
    title: "IIET (Mysuru) — Educational Theatre National Workshop",
    trainer: "Rajneesh Bisht",
    institution: "Indian Institute of Educational Theatre (IIET)",
    location: "Mysuru",
    state: "Karnataka",
    country: "India",
    date: "22–29 Jan 2026",
    time: "9:00 AM–6:00 PM daily",
    description:
      "🏛️ Intensive 8-day residential workshop on educational theatre led by Rajneesh Bisht, guided by Prasanna. Includes accommodation and meals.",
    registrationLink:
      "https://masthmysore.com/events/educational-theatre-national-workshop-mysuru-rajneesh-bisht-prasanna/",
    featured: true,
    price: "₹16,000 (includes breakfast, lunch, accommodation)",
    contact: "Via website",
    email: "Via website",
    eligibility: "Open to all",
    venue: "Hardwicke School Campus, J.L.B. Road, Mysuru (IIET)",
    includes: "Accommodation + 2 meals/day + Certificate",
    category: "Institution & Residency",
    tags: ["Institutional Training", "Residency"],
    expiresOn: "2026-01-29",
  },
  {
    id: 12,
    title: "NSD Mumbai Centre — Weekend Acting Course / 3-Month Certificate",
    trainer: "NSD Faculty",
    institution: "National School of Drama (NSD)",
    location: "Mumbai",
    state: "Maharashtra",
    country: "India",
    date: "Admissions open",
    time: "Part-time, non-residential",
    description:
      "🎭 NSD invites applications for Basic Three-Month Certificate Course in Dramatics and Weekend Acting Course. Part-time, non-residential programs.",
    registrationLink: "https://onlineadmission.nsd.gov.in/mumbai/",
    featured: true,
    price: "Contact for details (Application fee: ₹100)",
    contact: "Via NSD website",
    email: "Via NSD website",
    eligibility: "Age 18–60, 12th pass",
    venue: "NSD Mumbai Centre",
    includes: "NSD Certificate upon completion",
    category: "Institution & Residency",
    tags: ["Institutional Training", "Long-term Course"],
  },
  {
    id: 13,
    title: "TISS International Seminar — Youth Voices in the Digital Age",
    trainer: "TISS Faculty",
    institution: "Tata Institute of Social Sciences (TISS)",
    location: "Mumbai",
    state: "Maharashtra",
    country: "India",
    date: "8-10 March 2026",
    time: "Full day event",
    description:
      "🎓 International seminar exploring youth perspectives in the digital age. Call for papers with travel and accommodation support for selected papers. Interdisciplinary event bringing together researchers, practitioners, and youth voices.",
    image: "/images/acting-workshop.png",
    registrationLink:
      "https://tiss.ac.in/view/5/homepage-data/homepage-events-and-announcements/international-seminar-on-youth-voices-in-the-digit/",
    featured: true,
    price: "Registration details on website",
    contact: "Via TISS website",
    email: "Via TISS website",
    eligibility: "Open to researchers, practitioners, and students",
    venue: "TISS Mumbai Campus",
    category: "Fellowship & Seminars",
    tags: ["Seminar", "Call for Papers", "International"],
    expiresOn: "2026-03-10", // End of seminar
  },
  {
    id: 14,
    title: "Rijksakademie Residency — Applications for Residency Year 2027",
    trainer: "Rijksakademie Faculty",
    institution: "Rijksakademie van beeldende kunsten",
    location: "Amsterdam",
    state: "",
    country: "Netherlands",
    date: "Residency Year 2027",
    time: "Full year programme",
    description:
      "🎨 Prestigious visual arts residency in Amsterdam. Applications open for the 2027 residency year. One-year fully funded residency program for visual artists from around the world. State-of-the-art studios and facilities.",
    image: "/images/acting-workshop.png",
    registrationLink: "https://rijksakademie.nl/en/residency-apply/apply",
    featured: true,
    price: "Fully funded residency",
    contact: "Via Rijksakademie website",
    email: "Via Rijksakademie website",
    eligibility: "Visual artists worldwide",
    venue: "Rijksakademie, Amsterdam",
    category: "Fellowship & Seminars",
    tags: ["Residency", "Fellowship", "Visual Arts"],
  },
  {
    id: 15,
    title: "Cité internationale des arts — 'In Situ' Residency Programme",
    trainer: "Cité internationale des arts",
    institution: "Cité internationale des arts",
    location: "Paris",
    state: "",
    country: "France",
    date: "2025-2026 Programme",
    time: "Variable duration",
    description:
      "🏛️ Prestigious arts residency in the heart of Paris. 'In Situ' programme supporting international artists across all disciplines. Live and work in Paris with full studio facilities and cultural immersion.",
    image: "/images/acting-workshop.png",
    registrationLink:
      "https://www.citeinternationaledesarts.fr/en/appels-a-candidature/in-situ-residency-programme-2025-2026/",
    featured: true,
    price: "Fellowship support available",
    contact: "Via Cité website",
    email: "Via Cité website",
    eligibility: "International artists (all disciplines)",
    venue: "Cité internationale des arts, Paris",
    category: "Fellowship & Seminars",
    tags: ["Residency", "Arts", "International"],
  },
  {
    id: 16,
    title: "ITI Academy Week Open Call 2026 — THEATER DER WELT",
    trainer: "ITI Germany Team",
    institution: "International Theatre Institute (ITI) Germany",
    location: "Berlin + Chemnitz",
    state: "",
    country: "Germany",
    date: "21-28 June 2026",
    time: "Full week programme",
    description:
      "🎭 Intensive fellowship week during THEATER DER WELT festival. Exclusive opportunity for theatre makers to participate in workshops, performances, and networking. One-week immersion in contemporary theatre practices.",
    image: "/images/acting-workshop.png",
    registrationLink: "https://www.iti-germany.de/en/meeting-exchange/the-iti-academy/iti-academy-week-open-call-2026",
    featured: true,
    price: "Fellowship covers participation",
    contact: "Via ITI Germany website",
    email: "Via ITI Germany website",
    eligibility: "Theatre makers worldwide",
    venue: "Berlin and Chemnitz, Germany",
    category: "Fellowship & Seminars",
    tags: ["Fellowship", "Theatre", "Academy Week"],
    expiresOn: "2026-06-28", // End of academy week
  },
  {
    id: 17,
    title: "Planetary Transitions 2026 — Potsdam Artist Residency (GFZ)",
    trainer: "GFZ Research Center",
    institution: "GFZ German Research Centre for Geosciences",
    location: "Potsdam",
    state: "",
    country: "Germany",
    date: "Deadline: 8 Feb 2026",
    time: "Residency programme",
    description:
      "🎨 Unique artist residency at Germany's leading earth science research center. Art-science collaboration opportunity exploring planetary transitions, climate change, and earth systems. Interdisciplinary programme at GFZ Potsdam.",
    image: "/images/acting-workshop.png",
    registrationLink: "https://www.gfz.de/en/career/job-offers/details/10920",
    featured: true,
    price: "Fellowship support available",
    contact: "Via GFZ website",
    email: "Via GFZ website",
    eligibility: "Artists interested in art-science collaboration",
    venue: "GFZ German Research Centre for Geosciences, Potsdam",
    category: "Fellowship & Seminars",
    tags: ["Residency", "Art-Science", "Fellowship"],
    expiresOn: "2026-02-08", // Application deadline
  },
  {
    id: 18,
    title: "Culture Moves Europe — Individual Mobility Grant",
    trainer: "Culture Moves Europe",
    institution: "Culture Moves Europe / Goethe-Institut",
    location: "Europe-wide",
    state: "",
    country: "Europe",
    date: "Deadlines: 28 Feb, 31 Mar, 30 Apr 2026",
    time: "Rolling application rounds",
    description:
      "Mobility grant supporting artists and cultural professionals across Europe. Funding includes travel allowance, daily allowance, and residency support. Open to international artists with an eligible host partner in EU/Creative Europe countries. Best for theatre artists seeking mobility and funded residencies for cross-border collaborations and professional development.",
    image: "/images/acting-workshop.png",
    registrationLink: "https://on-the-move.org/news/countries",
    featured: true,
    price: "Travel + daily allowance + residency support",
    contact: "Via Culture Moves Europe website",
    email: "Via Culture Moves Europe website",
    eligibility: "International artists with eligible host partner (EU/Creative Europe)",
    venue: "Europe-wide programme",
    category: "Fellowship & Seminars",
    tags: ["Mobility Grant", "Fellowship", "Europe-wide", "Travel Support"],
    travelSupport: true,
    expiresOn: "2026-04-30", // Last application deadline
  },
  {
    id: 19,
    title: "Art of Research 2026 (Aalto University) — Call for Papers",
    trainer: "Aalto University",
    institution: "Aalto University, Finland",
    location: "Aalto",
    state: "",
    country: "Finland",
    date: "Deadline: 15 March 2026",
    time: "Conference dates TBA",
    description:
      "📚 Call for Papers for the Art of Research 2026 conference focusing on arts and design research. Submit your research papers and creative practice documentation for peer review. Conference organized by Aalto University, Finland.",
    image: "/images/acting-workshop.png",
    registrationLink:
      "https://events.aalto.fi/3X3IKxA7/g/82Z1zDshz8/art-of-research-2026-4a3bQtTRKz/custom/call-for-papers-4a3KQtaYeH",
    featured: true,
    price: "Conference registration fees apply",
    contact: "Via Aalto University event platform",
    email: "Via Aalto University event platform",
    eligibility: "Researchers, artists, designers, academics",
    venue: "Aalto University, Finland",
    category: "Fellowship & Seminars",
    tags: ["Conference", "Call for Papers", "Arts Research", "Design Research"],
    expiresOn: "2026-03-15", // Paper submission deadline
  },
  {
    id: 20,
    title: "The Paris Conference on Arts & Humanities (IAFOR) — Call for Papers",
    trainer: "IAFOR",
    institution: "The International Academic Forum (IAFOR)",
    location: "Paris",
    state: "",
    country: "France",
    date: "Conference: 15–19 June 2026",
    time: "Early-bird deadline: 15 Jan 2026, Final deadline: 20 Mar 2026",
    description:
      "🎨 International conference on Arts & Humanities in Paris. Submit your abstract for the IAFOR conference series. Early-bird deadline: 15 January 2026, Final abstract deadline: 20 March 2026. Conference dates: 15-19 June 2026.",
    image: "/images/acting-workshop.png",
    registrationLink: "https://pcah.iafor.org/call-for-papers/",
    featured: true,
    price: "Conference registration fees apply",
    contact: "IAFOR Conference Services",
    email: "Via IAFOR website",
    eligibility: "Researchers, academics, practitioners in arts and humanities",
    venue: "Paris, France",
    category: "Fellowship & Seminars",
    tags: ["Conference", "Call for Papers", "Arts & Humanities", "Paris"],
    expiresOn: "2026-06-19", // End of conference
  },
  {
    id: 21,
    title: "Villa Albertine — Theatre & New Forms Grant",
    trainer: "Villa Albertine",
    institution: "Villa Albertine (France–USA Cultural Program)",
    location: "France–USA",
    state: "",
    country: "International",
    date: "Deadline: 13 February 2026",
    time: "Application deadline approaching",
    description:
      "International grant for collaborative theatre projects between France and USA. Comprehensive funding covering travel, living expenses, and project costs. Open to international theatre artists with France-USA partnership. Best for collaborative theatre projects and new theatrical forms exploring cross-cultural collaboration.",
    image: "/images/acting-workshop.png",
    registrationLink: "https://villa-albertine.org/va/professionals/call-for-applications-theatre-new-forms-2026/?utm_source=chatgpt.com",
    featured: true,
    price: "Travel + living + project costs funded",
    contact: "Via Villa Albertine website",
    email: "Via Villa Albertine website",
    eligibility: "International theatre artists with FR–US partnership",
    venue: "France–USA Collaboration",
    category: "Fellowship & Seminars",
    tags: ["International Grant", "Travel Support", "Project Fund", "Collaboration"],
    travelSupport: true,
    expiresOn: "2026-02-13", // Application deadline
  },
  {
    id: 32,
    title: "Alpine Fellowship Theatre Prize 2026",
    trainer: "Alpine Fellowship",
    institution: "Alpine Fellowship",
    location: "Online",
    state: "",
    country: "International",
    date: "Deadline: 1 May 2026",
    time: "Online submission",
    description:
      "International playwriting competition inviting playwrights worldwide to submit an original play responding to the theme 'Joy.' Significant cash prizes: First Prize: £3,000, Second Prize: £1,000, Third Prize: £1,000. Open to playwrights aged 18 or above.",
    image: "/images/acting-workshop.png",
    registrationLink: "https://alpinefellowship.com/theatre-prize",
    featured: true,
    price: "£10 entry fee per submission",
    contact: "Via Alpine Fellowship website",
    email: "Via Alpine Fellowship website",
    eligibility: "Playwrights aged 18 or above",
    venue: "Online / International",
    category: "Fellowship & Seminars",
    tags: ["Playwriting Competition", "International", "Prize Money", "Theatre Prize"],
    mode: "Online",
    expiresOn: "2026-05-01", // Application deadline
  },
  {
    id: 33,
    title: "Intensive Course in Improvised Theatre",
    trainer: "Improv Lore",
    institution: "Improv Lore",
    location: "Bengaluru",
    state: "Karnataka",
    country: "India",
    date: "7–8 & 14–15 March 2026",
    time: "4 sessions (~12 hours)",
    description:
      "A practical improvisation workshop designed to help performers develop spontaneity, quick thinking, and collaborative stage presence through improv games and performance exercises.",
    registrationLink: "https://in.bookmyshow.com/events/intensive-course-in-improvised-theatre/ET00479740",
    featured: true,
    price: "Contact organizer for fees",
    contact: "Via BookMyShow",
    email: "Via booking platform",
    eligibility: "Age 18+",
    venue: "Bengaluru, India",
    includes: "4 sessions of intensive improv training",
    category: "Movement & Physical Theatre",
    tags: ["Short-term Workshop"],
    expiresOn: "2026-03-15", // Workshop end date
  },
  {
    id: 34,
    title: "Basic Theatre Workshop",
    trainer: "Yours Truly Theatre",
    institution: "Yours Truly Theatre",
    location: "Bengaluru",
    state: "Karnataka",
    country: "India",
    date: "11–26 April 2026 (weekends)",
    time: "4 sessions",
    description:
      "A beginner-friendly theatre workshop covering improvisation, character development, and stage expression. Participants explore performance basics through weekend sessions and collaborative exercises.",
    registrationLink: "https://in.bookmyshow.com/events/basic-theatre-workshop/ET00484596",
    featured: true,
    price: "Contact organizer for fees",
    contact: "Via BookMyShow",
    email: "Via booking platform",
    eligibility: "Age 16+",
    venue: "Bengaluru, India",
    includes: "4 weekend sessions",
    category: "Acting & Performance",
    tags: ["Short-term Workshop"],
    expiresOn: "2026-04-26", // Workshop end date
  },
  {
    id: 35,
    title: "Serendipity Arts Residency 2026",
    trainer: "Serendipity Arts Foundation",
    institution: "Serendipity Arts Foundation",
    location: "New Delhi",
    state: "Delhi",
    country: "India",
    date: "3-month program (Apply by 11 March 2026)",
    time: "Full-time residency",
    description:
      "A three-month interdisciplinary residency supporting artists to develop research-based creative projects. Theatre and performance practitioners are encouraged to apply.",
    registrationLink: "https://serendipityarts.org/workshop/serendipity-arts-residency-2026/",
    featured: true,
    price: "Funded residency",
    contact: "Via Serendipity Arts Foundation",
    email: "Via official portal",
    eligibility: "Emerging artists and creative practitioners",
    venue: "New Delhi, India",
    includes: "3-month residency support",
    category: "Institution & Residency",
    tags: ["Residency"],
    expiresOn: "2026-03-11", // Application deadline
  },
  {
    id: 36,
    title: "Residency at ITI (Intercultural Theatre Institute) – Open Call 2026",
    trainer: "Intercultural Theatre Institute",
    institution: "Intercultural Theatre Institute",
    location: "Singapore",
    state: "",
    country: "Singapore",
    date: "Period 1: May–Jul 2026 | Period 2: Aug–Oct 2026",
    time: "3 months per cycle",
    description:
      "A residency for independent theatre artists to conduct practice-based research and experimental performance development within an intercultural theatre environment. Access to ITI Studio 5, interaction with international students and faculty.",
    registrationLink: "https://iti.edu.sg/community/residency/2026-open-call/",
    featured: true,
    price: "No stipend (access to facilities provided)",
    contact: "Via ITI website",
    email: "Via official portal",
    eligibility: "Singapore citizens, permanent residents, or work-pass holders interested in practice research",
    venue: "Singapore",
    includes: "Studio access (20 hrs/week), faculty interaction, public sharing opportunity",
    category: "Institution & Residency",
    tags: ["Residency"],
    expiresOn: "2026-03-25", // Application deadline
  },
  {
    id: 37,
    title: "JUST ACT – Acting Workshop",
    trainer: "Mukesh Chhabra Casting",
    institution: "Mukesh Chhabra Casting",
    location: "Delhi",
    state: "Delhi",
    country: "India",
    date: "25–29 March 2026",
    time: "5 days",
    description:
      "A professional acting workshop that introduces participants to acting techniques, camera performance basics, and practical exercises with industry mentors.",
    registrationLink: "https://docs.google.com/forms/d/e/1FAIpQLScyajBTAtWiRw451x6SyTsUec_C8n9_WbUZbOrzG4lAxZ64qQ/viewform",
    featured: true,
    price: "Contact organizer for fees",
    contact: "Via Mukesh Chhabra Casting",
    email: "Via registration form",
    eligibility: "Open to aspiring actors",
    venue: "Delhi, India",
    includes: "5-day intensive training with industry mentors",
    category: "Acting & Performance",
    tags: ["Short-term Workshop"],
    expiresOn: "2026-03-29", // Workshop end date
  },
  {
    id: 38,
    title: "Tomfoolery! – Comedy & Theatre Games Workshop",
    trainer: "Shivam",
    institution: "What If Productions",
    location: "Bangalore",
    state: "Karnataka",
    country: "India",
    date: "Wednesday, April 1, 2026",
    time: "7:30 PM – 9:00 PM",
    description:
      "A playful, beginner-friendly workshop exploring improvisation, theatre games, and clowning-inspired exercises. All about play — no pressure, no performance anxiety. Just show up, say 'Yes!', and be part of the ensemble.",
    registrationLink: "https://docs.google.com/forms/d/e/1FAIpQLSePYaZ45OKb6JNAzV7-HKpjVMVBL0ZCaSMWPE7ZWOkg5wxPgg/viewform",
    featured: false,
    price: "Pay What You Like",
    contact: "Via What If Productions",
    email: "Via registration form",
    eligibility: "Beginners welcome, 16+",
    venue: "Beku – Cafe Bakery Bookstore, JP Nagar, Bangalore",
    includes: "Theatre games, improvisation, clowning exercises, ensemble activities",
    category: "Acting & Performance",
    tags: ["Short-term Workshop"],
    expiresOn: "2026-04-01", // Workshop date
  },
  {
    id: 39,
    title: "Playful Connections III – Clowning Workshop",
    trainer: "Workshop Facilitator",
    institution: "Independent",
    location: "Bangalore",
    state: "Karnataka",
    country: "India",
    date: "April 4 & 5, 2026 (Sat–Sun)",
    time: "10 AM – 5 PM",
    description:
      "A 2-day immersive workshop exploring clowning, play, and human connection through the red nose. No performance, no pressure — just play. Experience clowning & red nose work, theatre games & improvisation, deep connection & spontaneity, and letting go of overthinking.",
    registrationLink: "https://docs.google.com/forms/d/e/1FAIpQLSdsHS_tEjHJumXokYw9YgIZREChYn_hjKXq2ntkIk9MdHBerw/viewform",
    featured: false,
    price: "₹1500 – ₹2500+ (Sliding Scale)",
    contact: "Via registration form",
    email: "Via registration form",
    eligibility: "16+ | Beginners welcome",
    venue: "Banashankari, Bangalore",
    includes: "Clowning, red nose work, theatre games, improvisation, connection exercises",
    category: "Acting & Performance",
    tags: ["Short-term Workshop"],
    expiresOn: "2026-04-05", // Last day of workshop
  },
]

// Filter out expired workshops - this runs on every render for real-time updates
const activeWorkshops = workshops.filter((workshop) => !isWorkshopExpired(workshop))

// Get unique countries, states, cities, and trainers for filters (from active workshops only)
const countries = [...new Set(activeWorkshops.map((workshop) => workshop.country))].filter(Boolean).sort()
const allStates = [...new Set(activeWorkshops.map((workshop) => workshop.state))].filter(Boolean).sort()
const allCities = [...new Set(activeWorkshops.map((workshop) => workshop.location))].sort()
const trainers = [...new Set(activeWorkshops.map((workshop) => workshop.trainer))].sort()
const institutions = [...new Set(activeWorkshops.map((workshop) => workshop.institution))].sort()

// Helper function to get states for a specific country
function getStatesForCountry(country: string): string[] {
  if (!country) return allStates
  return [...new Set(activeWorkshops
    .filter((workshop) => workshop.country === country)
    .map((workshop) => workshop.state)
  )].filter(Boolean).sort()
}

// Helper function to get cities for a specific country and state
function getCitiesForFilters(country: string, state: string): string[] {
  let filtered = activeWorkshops
  if (country) {
    filtered = filtered.filter((workshop) => workshop.country === country)
  }
  if (state) {
    filtered = filtered.filter((workshop) => workshop.state === state)
  }
  return [...new Set(filtered.map((workshop) => workshop.location))].sort()
}

const categories = [
  { id: "all", name: "All", icon: "🎭" },
  { id: "Acting & Performance", name: "Acting & Performance", icon: "🎭" },
  { id: "Movement & Physical Theatre", name: "Movement & Physical Theatre", icon: "🧍" },
  { id: "Voice & Speech", name: "Voice & Speech", icon: "🗣" },
  { id: "Direction & Dramaturgy", name: "Direction & Dramaturgy", icon: "🎬" },
  { id: "Design & Production", name: "Design & Production", icon: "🎨" },
  { id: "Institution & Residency", name: "Institution & Residency", icon: "🏛" },
  { id: "Fellowship & Seminars", name: "Fellowship & Seminars", icon: "🎓" },
]

function WorkshopsContent() {
  const [activeCategory, setActiveCategory] = useState("all")
  const [filters, setFilters] = useState({
    search: "",
    country: "",
    state: "",
    city: "",
    trainer: "",
    institution: "",
    mode: "",
  })
  const [showDesktopFilters, setShowDesktopFilters] = useState(true)
  const isMobile = useMediaQuery("(max-width: 768px)")
  const isSmallMobile = useMediaQuery("(max-width: 640px)")

  // Get available states and cities based on selected filters
  const availableStates = getStatesForCountry(filters.country)
  const availableCities = getCitiesForFilters(filters.country, filters.state)

  // Filter from activeWorkshops (already excludes expired)
  const filteredWorkshops = activeWorkshops.filter((workshop) => {
    return (
      (activeCategory === "all" || workshop.category === activeCategory) &&
      (filters.search === "" ||
        workshop.title.toLowerCase().includes(filters.search.toLowerCase()) ||
        workshop.description.toLowerCase().includes(filters.search.toLowerCase())) &&
      (filters.country === "" || workshop.country === filters.country) &&
      (filters.state === "" || workshop.state === filters.state) &&
      (filters.city === "" || workshop.location === filters.city) &&
      (filters.trainer === "" || workshop.trainer === filters.trainer) &&
      (filters.institution === "" || workshop.institution === filters.institution) &&
      (filters.mode === "" || workshop.mode === filters.mode)
    )
  })

  const handleFilterChange = (key: string, value: string) => {
    setFilters((prev) => {
      const newFilters = { ...prev, [key]: value }
      // Reset dependent filters when parent filter changes
      if (key === "country") {
        newFilters.state = ""
        newFilters.city = ""
      } else if (key === "state") {
        newFilters.city = ""
      }
      return newFilters
    })
  }

  const clearFilters = () => {
    setFilters({
      search: "",
      country: "",
      state: "",
      city: "",
      trainer: "",
      institution: "",
      mode: "",
    })
  }

  // Featured workshops also exclude expired ones
  const featuredWorkshops = activeWorkshops.filter((workshop) => workshop.featured)
  const hasActiveFilters = Object.values(filters).some((value) => value !== "")

  return (
    <div className="container py-6 md:py-16 px-3 sm:px-6">
      <div className="max-w-3xl mx-auto text-center mb-8 md:mb-12">
        <h1 className="font-playfair text-3xl md:text-5xl font-bold mb-3 text-gray-800">
          Training & <span className="text-primary">Education</span>
        </h1>
        <p className="text-gray-600 text-sm md:text-base max-w-xl mx-auto mb-4">
          Enhance your skills with professional training and education sessions led by renowned theater professionals
          from across the country.
        </p>
        <div className="flex justify-center">
          <ShareWorkshopButton
            variant="button"
            size="sm"
            shareType="page"
          />
        </div>
      </div>

      {/* Mobile Search */}
      {isMobile && (
        <div className="mb-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              type="text"
              placeholder="Search programs"
              className="pl-10 rounded-full"
              value={filters.search}
              onChange={(e) => handleFilterChange("search", e.target.value)}
            />
            {filters.search && (
              <button
                className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 hover:text-gray-600"
                onClick={() => handleFilterChange("search", "")}
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>
        </div>
      )}

      {/* Category Tabs Navigation */}
      <Tabs value={activeCategory} onValueChange={setActiveCategory} className="mb-6">
        <TabsList className="w-full flex flex-wrap justify-start gap-2 bg-transparent h-auto p-0 mb-6">
          {categories.map((category) => (
            <TabsTrigger
              key={category.id}
              value={category.id}
              className="rounded-full data-[state=active]:bg-primary data-[state=active]:text-white px-4 py-2 text-sm"
            >
              <span className="mr-2">{category.icon}</span>
              {isMobile ? category.name.split(" ")[0] : category.name}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>

      {/* Mobile Filter Button and Count */}
      <div className="mb-6 flex justify-between items-center">
        <h2 className="font-playfair text-lg md:text-xl font-bold">
          {hasActiveFilters || activeCategory !== "all"
            ? `${filteredWorkshops.length} Program${filteredWorkshops.length !== 1 ? "s" : ""} Found`
            : "All Programs"}
        </h2>

        <div className="flex items-center gap-2">
          <MobileFilterDrawer
            filters={filters}
            countries={countries}
            states={availableStates}
            cities={availableCities}
            trainers={trainers}
            institutions={institutions}
            handleFilterChange={handleFilterChange}
            clearFilters={clearFilters}
          />

          {/* Desktop Filter Toggle */}
          <Button
            variant="outline"
            className="hidden md:flex items-center gap-2 rounded-full bg-transparent"
            onClick={() => setShowDesktopFilters(!showDesktopFilters)}
          >
            <Filter className="h-4 w-4" />
            {showDesktopFilters ? "Hide Filters" : "Show Filters"}
            {showDesktopFilters ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
          </Button>
        </div>
      </div>

      {/* Active Filters Display */}
      <ActiveFilters filters={filters} handleFilterChange={handleFilterChange} clearFilters={clearFilters} />

      {/* Desktop Filters */}
      {showDesktopFilters && (
        <div className="hidden md:block mb-8 p-6 bg-gray-50 rounded-xl">
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                type="text"
                placeholder="Search programs"
                className="pl-10 rounded-full"
                value={filters.search}
                onChange={(e) => handleFilterChange("search", e.target.value)}
              />
            </div>

            <Select value={filters.country} onValueChange={(value) => handleFilterChange("country", value)}>
              <SelectTrigger className="rounded-full">
                <SelectValue placeholder="Country" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Countries</SelectItem>
                {countries.map((country) => (
                  <SelectItem key={country} value={country}>
                    {country}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select 
              value={filters.state} 
              onValueChange={(value) => handleFilterChange("state", value)}
              disabled={availableStates.length === 0}
            >
              <SelectTrigger className="rounded-full">
                <SelectValue placeholder={availableStates.length === 0 ? "No states available" : "State"} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All States</SelectItem>
                {availableStates.map((state) => (
                  <SelectItem key={state} value={state}>
                    {state}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={filters.city} onValueChange={(value) => handleFilterChange("city", value)}>
              <SelectTrigger className="rounded-full">
                <SelectValue placeholder="City" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Cities</SelectItem>
                {availableCities.map((city) => (
                  <SelectItem key={city} value={city}>
                    {city}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-4">
            <Select value={filters.trainer} onValueChange={(value) => handleFilterChange("trainer", value)}>
              <SelectTrigger className="rounded-full">
                <SelectValue placeholder="Trainer" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Trainers</SelectItem>
                {trainers.map((trainer) => (
                  <SelectItem key={trainer} value={trainer}>
                    {trainer}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={filters.institution} onValueChange={(value) => handleFilterChange("institution", value)}>
              <SelectTrigger className="rounded-full">
                <SelectValue placeholder="Institution" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Institutions</SelectItem>
                {institutions.map((institution) => (
                  <SelectItem key={institution} value={institution}>
                    {institution}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={filters.mode} onValueChange={(value) => handleFilterChange("mode", value)}>
              <SelectTrigger className="rounded-full">
                <SelectValue placeholder="Mode" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Modes</SelectItem>
                <SelectItem value="Online">Online</SelectItem>
                <SelectItem value="Offline">Offline</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      )}

      {featuredWorkshops.length > 0 && !hasActiveFilters && activeCategory === "all" && !isSmallMobile && (
        <div className="mb-10 md:mb-16">
          <div className="flex items-center mb-4 md:mb-6">
            <Star className="h-5 w-5 text-secondary mr-2 fill-secondary" />
            <h2 className="font-playfair text-xl md:text-2xl font-bold">Featured Programs</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
            {featuredWorkshops.slice(0, 2).map((workshop) => (
              <WorkshopCard key={workshop.id} workshop={workshop} />
            ))}
          </div>
        </div>
      )}

      {/* Workshop Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
        {filteredWorkshops.map((workshop) => (
          <WorkshopCard key={workshop.id} workshop={workshop} />
        ))}
      </div>

      {/* Empty State */}
      {filteredWorkshops.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No workshops found in this category.</p>
        </div>
      )}
    </div>
  )
}

export default WorkshopsContent
