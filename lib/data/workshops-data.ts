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
  {
    id: 11,
    title: "Source of Performance Energy (SOPE) — Residential Actor Training",
    trainer: "Adishakti Faculty",
    institution: "Adishakti Laboratory for Theatre Art Research",
    location: "Pondicherry",
    state: "Tamil Nadu",
    country: "India",
    date: "May 19 – May 28, 2026",
    time: "12-hr days",
    description:
      "Intensive residential training in Adishakti's unique methodology — breath, emotions, rhythm, energy centres, voice — for maintaining performance freshness across repeated shows.",
    registrationLink: "https://adishaktitheatrearts.com/training/",
    featured: true,
    price: "Contact for fees",
    contact: "Contact via website",
    email: "info@adishaktitheatrearts.com",
    eligibility: "Actors & performing artists, India & abroad",
    venue: "Adishakti, Pondicherry (near Chennai)",
    includes: "10 days residential training",
    category: "Acting & Performance",
    tags: ["Residency", "Short-term Workshop"],
    expiresOn: "2026-05-28",
  },
  {
    id: 12,
    title: "NSD Summer Theatre Festival",
    trainer: "NSD Repertory",
    institution: "National School of Drama (NSD)",
    location: "Delhi",
    state: "Delhi",
    country: "India",
    date: "May 8 – June 14, 2026",
    time: "Various show timings",
    description:
      "NSD Repertory's annual summer festival featuring new productions; key exposure event for emerging theatre practitioners in India. Opens with Aks Tamasha dir. Bhanu Bharati. 26 shows, 10 plays.",
    registrationLink: "https://nsd.gov.in/",
    featured: true,
    price: "Open public",
    contact: "011-23382821",
    email: "nsd@nic.in",
    eligibility: "Open public; theatre practitioners",
    venue: "NSD Campus, New Delhi",
    includes: "~5 weeks festival (26 shows, 10 plays)",
    category: "Acting & Performance",
    tags: ["Institutional Training", "Theatre Festival"],
    expiresOn: "2026-06-14",
  },
  {
    id: 13,
    title: "Theatre in Education (TIE) National Workshop",
    trainer: "IIET Faculty",
    institution: "Indian Institute of Educational Theatre (Indian Theatre Foundation)",
    location: "Mysore",
    state: "Karnataka",
    country: "India",
    date: "Multiple 2026 sessions",
    time: "Multi-day workshop",
    description:
      "Experiential program integrating theatre into education — voice, body, puppetry, improvisation, creative dance for self-expression.",
    registrationLink: "https://www.indiantheatrefoundation.org/theater-in-education-tie-national-workshop/",
    featured: true,
    price: "₹5,000",
    contact: "Contact via website",
    email: "info@indiantheatrefoundation.org",
    eligibility: "Teachers, educators, theatre practitioners",
    venue: "Mysore, Karnataka",
    category: "Acting & Performance",
    tags: ["Short-term Workshop", "Education"],
  },
  {
    id: 14,
    title: "Intensive Acting Workshop, Mumbai",
    trainer: "FTII Faculty",
    institution: "Film and Television Institute of India (FTII)",
    location: "Mumbai",
    state: "Maharashtra",
    country: "India",
    date: "June 8 – 15, 2026",
    time: "Full day",
    description:
      "FTII's intensive workshop covering screen and stage acting fundamentals in Mumbai.",
    registrationLink: "https://ftii.ac.in/",
    featured: true,
    price: "Contact FTII",
    contact: "020-25580085",
    email: "info.cfol@ftii.ac.in",
    eligibility: "Open enrollment",
    venue: "Mumbai",
    includes: "8-day intensive training",
    category: "Acting & Performance",
    tags: ["Short-term Workshop"],
    expiresOn: "2026-06-15",
  },
  {
    id: 15,
    title: "Workshop on Basics of Screen Acting",
    trainer: "FTII Faculty",
    institution: "Film and Television Institute of India (FTII)",
    location: "Mandi",
    state: "Himachal Pradesh",
    country: "India",
    date: "June 20 – 26, 2026",
    time: "Full day",
    description:
      "FTII's workshop on basics of screen acting in Mandi, Himachal Pradesh. Learn fundamental screen acting techniques.",
    registrationLink: "https://ftii.ac.in/",
    featured: false,
    price: "Contact FTII",
    contact: "020-25580085",
    email: "info.cfol@ftii.ac.in",
    eligibility: "Open enrollment",
    venue: "Mandi, Himachal Pradesh",
    includes: "7-day training",
    category: "Acting & Performance",
    tags: ["Short-term Workshop"],
    expiresOn: "2026-06-26",
  },
  {
    id: 16,
    title: "Beginner's Workshop on Hindi Dubbing & Voice Acting",
    trainer: "FTII Faculty",
    institution: "Film and Television Institute of India (FTII)",
    location: "Pune",
    state: "Maharashtra",
    country: "India",
    date: "July 7 – 18, 2026",
    time: "Full day",
    description:
      "FTII's beginner workshop on Hindi dubbing and voice acting. Learn voice modulation, dubbing techniques, and voice-over fundamentals.",
    registrationLink: "https://ftii.ac.in/",
    featured: true,
    price: "Contact FTII",
    contact: "020-25580085",
    email: "info.cfol@ftii.ac.in",
    eligibility: "Open enrollment",
    venue: "FTII Pune",
    includes: "12-day training + FTII Certificate",
    category: "Voice & Diction",
    tags: ["Short-term Workshop", "Voice Acting"],
    expiresOn: "2026-07-18",
  },
  {
    id: 17,
    title: "Workshop on Acting in Intimate Scenes",
    trainer: "FTII Faculty",
    institution: "Film and Television Institute of India (FTII)",
    location: "Pune",
    state: "Maharashtra",
    country: "India",
    date: "Aug 3 – 7, 2026",
    time: "Full day",
    description:
      "FTII's specialized workshop on acting in intimate scenes. Learn professional techniques for portraying intimacy on screen with safety and consent protocols.",
    registrationLink: "https://ftii.ac.in/",
    featured: false,
    price: "Contact FTII",
    contact: "020-25580085",
    email: "info.cfol@ftii.ac.in",
    eligibility: "Open enrollment",
    venue: "FTII Pune",
    includes: "5-day specialized training",
    category: "Acting & Performance",
    tags: ["Short-term Workshop", "Specialized"],
    expiresOn: "2026-08-07",
  },
  {
    id: 18,
    title: "Workshop on Basics of Screen Acting (Hyderabad)",
    trainer: "FTII Faculty",
    institution: "Film and Television Institute of India (FTII)",
    location: "Hyderabad",
    state: "Telangana",
    country: "India",
    date: "Sept 21 – 30, 2026",
    time: "Full day",
    description:
      "FTII's workshop on basics of screen acting in Hyderabad. Learn fundamental screen acting techniques for film and television.",
    registrationLink: "https://ftii.ac.in/",
    featured: false,
    price: "Contact FTII",
    contact: "020-25580085",
    email: "info.cfol@ftii.ac.in",
    eligibility: "Open enrollment",
    venue: "Hyderabad",
    includes: "10-day training",
    category: "Acting & Performance",
    tags: ["Short-term Workshop"],
    expiresOn: "2026-09-30",
  },
  {
    id: 19,
    title: "Workshop on Basics of Screen Acting (Bhopal)",
    trainer: "FTII Faculty",
    institution: "Film and Television Institute of India (FTII)",
    location: "Bhopal",
    state: "Madhya Pradesh",
    country: "India",
    date: "Oct 5 – 11, 2026",
    time: "Full day",
    description:
      "FTII's workshop on basics of screen acting in Bhopal. Learn fundamental screen acting techniques for film and television.",
    registrationLink: "https://ftii.ac.in/",
    featured: false,
    price: "Contact FTII",
    contact: "020-25580085",
    email: "info.cfol@ftii.ac.in",
    eligibility: "Open enrollment",
    venue: "Bhopal",
    includes: "7-day training",
    category: "Acting & Performance",
    tags: ["Short-term Workshop"],
    expiresOn: "2026-10-11",
  },
  {
    id: 20,
    title: "Drama School Mumbai — Year-Round Acting Training",
    trainer: "Drama School Faculty",
    institution: "Drama School Mumbai",
    location: "Mumbai",
    state: "Maharashtra",
    country: "India",
    date: "Year-round enrollment",
    time: "Full-time / Part-time options",
    description:
      "Professional acting training academy in Mumbai offering comprehensive courses in acting, voice, movement, and screen performance.",
    registrationLink: "https://www.dramaschool.in/",
    featured: true,
    price: "Contact for fees",
    contact: "Contact via website",
    email: "info@dramaschool.in",
    eligibility: "All levels welcome",
    venue: "Drama School Mumbai",
    category: "Acting & Performance",
    tags: ["Long-term Program", "Year-round"],
  },
  {
    id: 21,
    title: "Jeff Goldberg Studio — Professional Acting Training",
    trainer: "Jeff Goldberg & Faculty",
    institution: "Jeff Goldberg Studio",
    location: "Mumbai",
    state: "Maharashtra",
    country: "India",
    date: "Rolling admissions",
    time: "Flexible schedules",
    description:
      "Professional acting studio offering Meisner technique and method acting training. Courses designed for serious actors pursuing film and theatre careers.",
    registrationLink: "https://www.jeffgoldbergstudio.com/",
    featured: true,
    price: "Contact for fees",
    contact: "Contact via website",
    email: "info@jeffgoldbergstudio.com",
    eligibility: "Serious actors, all levels",
    venue: "Jeff Goldberg Studio, Mumbai",
    category: "Acting & Performance",
    tags: ["Long-term Program", "Method Acting"],
  },
  {
    id: 24,
    title: "Whistling Woods International — Acting Programs",
    trainer: "WWI Faculty",
    institution: "Whistling Woods International",
    location: "Mumbai",
    state: "Maharashtra",
    country: "India",
    date: "Annual intake",
    time: "Full-time",
    description:
      "Premier film school offering diploma and degree programs in acting. Comprehensive training covering screen acting, voice, movement, and audition techniques.",
    registrationLink: "https://www.whistlingwoods.net/",
    featured: true,
    price: "Contact WWI",
    contact: "Contact via website",
    email: "admissions@whistlingwoods.net",
    eligibility: "12th pass for diploma, graduate for degree",
    venue: "Film City, Goregaon, Mumbai",
    category: "Acting & Performance",
    tags: ["Long-term Program", "Degree/Diploma"],
  },
  {
    id: 25,
    title: "Kreating Charakters Film Acting Institute",
    trainer: "Industry Professionals",
    institution: "Kreating Charakters",
    location: "Mumbai",
    state: "Maharashtra",
    country: "India",
    date: "Regular batches",
    time: "Flexible schedules",
    description:
      "Film acting institute focusing on camera acting, audition preparation, and industry readiness. Practical training for aspiring film actors.",
    registrationLink: "https://kreatingcharakters.com/",
    featured: false,
    price: "Contact for fees",
    contact: "Contact via website",
    email: "info@kreatingcharakters.com",
    eligibility: "All levels",
    venue: "Mumbai",
    category: "Acting & Performance",
    tags: ["Short-term Workshop", "Screen Acting"],
  },
  {
    id: 26,
    title: "Sukriti Academy of Theatre Arts — Acting Workshops",
    trainer: "Sukriti Faculty",
    institution: "Sukriti Academy of Theatre Arts",
    location: "Delhi",
    state: "Delhi",
    country: "India",
    date: "Regular workshops",
    time: "Varies",
    description:
      "Theatre arts academy offering acting workshops and training programs. Focus on theatrical performance, voice work, and stagecraft.",
    registrationLink: "https://sukritiaca.com/",
    featured: false,
    price: "Contact for fees",
    contact: "Contact via website",
    email: "info@sukritiaca.com",
    eligibility: "All levels",
    venue: "Delhi",
    category: "Acting & Performance",
    tags: ["Theatre Training", "Short-term Workshop"],
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
