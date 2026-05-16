/**
 * Workshops data module for server-side usage
 * This allows the workshop data to be imported in server components
 */

export interface Workshop {
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
  expiresOn?: string
}

// Utility function to check if a workshop has expired
export function isWorkshopExpired(workshop: Workshop): boolean {
  if (!workshop.expiresOn) return false
  
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  
  const expirationDate = new Date(workshop.expiresOn)
  expirationDate.setHours(23, 59, 59, 999)
  
  return today > expirationDate
}

// Workshop data - this is the single source of truth
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
      "Master the craft of acting with FTII's intensive masterclass in Mumbai. Comprehensive training covering performance techniques, character development, and scene work.",
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
    expiresOn: "2026-01-24",
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
    id: 3,
    title: "Paradox Studios Actors Lab",
    trainer: "Industry Professionals",
    institution: "Paradox Studios",
    location: "Bangalore",
    state: "Karnataka",
    country: "India",
    date: "Ongoing",
    time: "Flexible",
    description:
      "Professional acting training program at Paradox Studios, Bangalore. Comprehensive curriculum covering screen acting, audition techniques, and industry preparation.",
    registrationLink: "https://paradoxstudios.in/actors-lab",
    featured: true,
    price: "Contact for fees",
    contact: "Contact via website",
    email: "info@paradoxstudios.in",
    eligibility: "All levels welcome",
    venue: "Paradox Studios, Bangalore",
    category: "Acting & Performance",
    tags: ["Long-term Program", "Screen Acting"],
  },
  {
    id: 4,
    title: "NSD Theatre Workshop",
    trainer: "NSD Faculty",
    institution: "National School of Drama",
    location: "Delhi",
    state: "Delhi",
    country: "India",
    date: "Monthly batches",
    time: "Full day",
    description:
      "Intensive theatre training workshops conducted by National School of Drama faculty. Learn traditional and contemporary theatre techniques from India's premier drama school.",
    registrationLink: "https://nsd.gov.in",
    featured: true,
    price: "Varies by program",
    contact: "011-23382821",
    email: "nsd@nic.in",
    eligibility: "As per program requirements",
    venue: "NSD Campus, New Delhi",
    category: "Acting & Performance",
    tags: ["Theatre Training", "Prestigious Institute"],
  },
  {
    id: 5,
    title: "Prithvi Theatre Workshop",
    trainer: "Guest Artists",
    institution: "Prithvi Theatre",
    location: "Mumbai",
    state: "Maharashtra",
    country: "India",
    date: "Seasonal",
    time: "Varies",
    description:
      "Regular theatre workshops at Mumbai's iconic Prithvi Theatre. Learn from industry veterans and explore various aspects of theatrical performance.",
    registrationLink: "https://prithvitheatre.org",
    featured: false,
    price: "Contact for details",
    contact: "022-26149546",
    email: "info@prithvitheatre.org",
    eligibility: "Open to all",
    venue: "Prithvi Theatre, Juhu",
    category: "Acting & Performance",
    tags: ["Theatre Workshop"],
  },
  {
    id: 6,
    title: "Rangayana Theatre Training",
    trainer: "Rangayana Faculty",
    institution: "Rangayana",
    location: "Mysuru",
    state: "Karnataka",
    country: "India",
    date: "Annual programs",
    time: "Full-time residential",
    description:
      "Residential theatre training at Rangayana, founded by B.V. Karanth. Intensive program covering Kannada theatre traditions and contemporary performance.",
    registrationLink: "https://rangayana.org",
    featured: true,
    price: "Subsidized",
    contact: "0821-2515483",
    email: "rangayanamysore@gmail.com",
    eligibility: "Through entrance exam",
    venue: "Rangayana, Mysuru",
    category: "Acting & Performance",
    tags: ["Residential Program", "Regional Theatre"],
  },
  {
    id: 7,
    title: "Barry John Acting Studio Workshop",
    trainer: "Barry John & Team",
    institution: "Barry John Acting Studio",
    location: "Mumbai",
    state: "Maharashtra",
    country: "India",
    date: "Regular batches",
    time: "Flexible schedules",
    description:
      "Learn from legendary acting coach Barry John. Workshops focus on method acting, improvisation, and preparing actors for film and television.",
    registrationLink: "https://barryjohnactingstudio.com",
    featured: true,
    price: "Contact for fees",
    contact: "Contact via website",
    email: "info@barryjohnactingstudio.com",
    eligibility: "All levels",
    venue: "Mumbai",
    category: "Acting & Performance",
    tags: ["Method Acting", "Film Acting"],
  },
  {
    id: 8,
    title: "Ranga Shankara Workshop",
    trainer: "Various Artists",
    institution: "Ranga Shankara",
    location: "Bangalore",
    state: "Karnataka",
    country: "India",
    date: "Throughout the year",
    time: "Varies",
    description:
      "Regular workshops at Bangalore's premier theatre space. Covers acting, direction, playwriting, and technical theatre aspects.",
    registrationLink: "https://rangashankara.org",
    featured: false,
    price: "Nominal fees",
    contact: "080-26493982",
    email: "info@rangashankara.org",
    eligibility: "Open to all",
    venue: "Ranga Shankara, JP Nagar",
    category: "Acting & Performance",
    tags: ["Theatre Workshop", "Multi-disciplinary"],
  },
  {
    id: 9,
    title: "Anupam Kher's Actor Prepares",
    trainer: "Anupam Kher & Faculty",
    institution: "Actor Prepares",
    location: "Mumbai",
    state: "Maharashtra",
    country: "India",
    date: "Regular batches",
    time: "Intensive schedules",
    description:
      "Training academy founded by Anupam Kher. Comprehensive acting courses designed to prepare actors for Bollywood and beyond.",
    registrationLink: "https://actorprepares.net",
    featured: true,
    price: "Contact for fees",
    contact: "022-26203665",
    email: "info@actorprepares.net",
    eligibility: "All levels welcome",
    venue: "Andheri, Mumbai",
    category: "Acting & Performance",
    tags: ["Film Acting", "Celebrity Coach"],
  },
  {
    id: 10,
    title: "Ninasam Theatre Institute",
    trainer: "Ninasam Faculty",
    institution: "Ninasam",
    location: "Heggodu",
    state: "Karnataka",
    country: "India",
    date: "Annual intake",
    time: "Residential program",
    description:
      "One-year residential theatre diploma at Ninasam, Heggodu. Immersive training in a village setting, combining theory with practical theatre-making.",
    registrationLink: "https://ninasam.org",
    featured: true,
    price: "Highly subsidized",
    contact: "08183-240356",
    email: "ninasam@gmail.com",
    eligibility: "Graduate or equivalent",
    venue: "Ninasam, Heggodu",
    category: "Acting & Performance",
    tags: ["Diploma Program", "Residential"],
  },
]

// Get all workshops (optionally filter out expired ones)
export function getWorkshopsData(includeExpired = false): Workshop[] {
  if (includeExpired) {
    return workshops
  }
  return workshops.filter((w) => !isWorkshopExpired(w))
}

// Get a single workshop by ID
export function getWorkshopById(id: number): Workshop | undefined {
  return workshops.find((w) => w.id === id)
}

// Get workshops by city
export function getWorkshopsByCity(city: string): Workshop[] {
  const normalizedCity = city.toLowerCase()
  return workshops.filter(
    (w) =>
      w.location.toLowerCase().includes(normalizedCity) && !isWorkshopExpired(w)
  )
}

// Get workshops by category
export function getWorkshopsByCategory(category: string): Workshop[] {
  return workshops.filter(
    (w) => w.category === category && !isWorkshopExpired(w)
  )
}

// Get featured workshops
export function getFeaturedWorkshops(): Workshop[] {
  return workshops.filter((w) => w.featured && !isWorkshopExpired(w))
}
