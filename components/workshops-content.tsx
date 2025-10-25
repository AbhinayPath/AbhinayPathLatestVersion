"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Filter, ChevronDown, ChevronUp, Star, X } from "lucide-react"
import WorkshopCard from "@/components/workshop-card"
import MobileFilterDrawer from "@/components/mobile-filter-drawer"
import ActiveFilters from "@/components/active-filters"
import { useMediaQuery } from "@/hooks/use-media-query"

// Verified workshops data
const workshops = [
  {
    id: 33,
    title: "NSD's One-Year Acting Course – Mumbai",
    trainer: "NSD Faculty",
    institution: "National School of Drama (NSD)",
    location: "Mumbai",
    state: "Maharashtra",
    date: "15th October 2025",
    time: "Monday–Friday, 8 AM to 6 PM",
    description:
      "🎭 Comprehensive one-year full-time acting course by NSD Mumbai. Learn directly from renowned industry professionals with intensive, practical training for camera acting. Perfect for beginners and aspiring professionals in films, TV, and web series. Two intensive semesters with step-by-step learning and professional guidance.",
    image: "/images/acting-workshop.png",
    registrationLink: "https://nsd.gov.in/delhi/index.php/admission-notice-mumbai-2025/",
    featured: true,
    price: "₹5,00,000 (Full Course) or ₹3,00,000 per semester",
    contact: "011-23389402 / 23387916",
    email: "Via NSD website",
    eligibility: "12th Pass, Age 18+",
    mode: "Offline",
    applicationDeadline: "1st October 2025",
    auditionDate: "10th October 2025",
    selection: "Online/Offline Audition (mandatory)",
    capacity: "Limited seats available",
    language: "Hindi & English",
    certification: "NSD Certificate",
    venue: "602 Durga Chambers, Andheri West, Mumbai",
    duration: "1 Year (Full-Time) - 1440 hours total",
    courseStructure: "Semester 1: Foundation Training (720 hours), Semester 2: Industry-Oriented Training (720 hours)",
    includes: "Professional industry training + NSD Certificate + Real-world preparation",
  },
  {
    id: 29,
    title: "NSD Delhi: Sunday Club Part-I (2025–26) - Children's Theatre Workshop",
    trainer: "Sanskaar Rang Toli (T.I.E. Company)",
    institution: "National School of Drama (NSD)",
    location: "New Delhi",
    state: "Delhi",
    date: "Last week of August 2025 – January 2026",
    time: "Saturdays & Sundays + Daily sessions during Winter Vacation",
    description:
      "🎭 A unique opportunity for children aged 8-17 to learn theatre at India's premier drama institution! This extension of NSD's Summer Theatre Workshop focuses on devising performances through improvisation, play-making, and collaborative theatre. Culminates in a Festival of Devised Performances in January 2026.",
    image: "/images/acting-workshop.png",
    registrationLink: "https://nsd.gov.in",
    featured: true,
    price: "₹8,000 (General), ₹2,000 (SC/ST/OBC/EWS), Free (BPL) + ₹150 processing fee",
    contact: "NSD Campus, New Delhi",
    email: "Via NSD website",
    eligibility: "Children aged 8-17 years (must have participated in NSD Summer Theatre Workshop)",
    mode: "Offline",
    applicationDeadline: "25 August 2025, 6:00 PM",
    applicationStart: "15 August 2025, 10:00 AM",
    selection: "First-Come, First-Served basis",
    capacity: "Limited seats available",
    language: "Hindi & English",
    certification: "NSD Certificate + Festival Performance",
    venue: "NSD Campus or other designated spaces in Delhi",
    duration: "5 months (August 2025 – January 2026)",
    includes: "Festival of Devised Performances + NSD Certificate",
  },
  {
    id: 30,
    title: "Improv Theatre Workshop by White Board – Bengaluru",
    trainer: "White Board Theatre Group",
    institution: "White Board Theatre Group",
    location: "Bengaluru",
    state: "Karnataka",
    date: "23 & 24 August 2025",
    time: "9:00 AM – 2:00 PM",
    description:
      "🎭 Beginner or experienced — this is for anyone ready to break habits and try something new. Even trained actors will find improv like learning a fresh dance form. Unlearn. Go deeper. Feel the freedom. Learn core tools of improv, devising through collaboration, mind & body prep, ensemble thinking, and the difference between acting vs improv.",
    image: "/images/acting-workshop.png",
    registrationLink:
      "https://docs.google.com/forms/d/e/1FAIpQLSfN161-59dE3oo0wuVc2EwWNQ2T5FXmwVoVuQOTjcTK_nivRA/viewform",
    featured: true,
    price: "₹2,999 (Early Bird: ₹2,499, Student: ₹2,199)",
    contact: "Via registration form",
    email: "Via Instagram @whit.eboard",
    eligibility: "Open to all - beginners and experienced actors welcome",
    mode: "Offline",
    venue: "Obeya Nest, HSR Layout, Bengaluru",
    duration: "2 days (Weekend Workshop)",
    includes: "Complete improv training + performance techniques",
  },
  {
    id: 31,
    title: "Educational Theatre National Workshop – IIET, Mysore",
    trainer: "Rajneesh Bisht",
    institution: "Indian Institute of Educational Theatre (IIET)",
    location: "Mysore",
    state: "Karnataka",
    date: "6 – 15 October 2025",
    time: "Full day sessions",
    description:
      "🎭 A comprehensive 10-day workshop for actors & educators by renowned theatre director Rajneesh Bisht. Develop acting skills, confidence & teamwork through improvisation, empathy & communication training. Learn theatre as a tool for student growth and innovative classroom management strategies.",
    image: "/images/iiet-logo.png",
    registrationLink: "https://www.indiantheatrefoundation.org/theatre-in-education-workshop/",
    featured: true,
    price: "₹16,000 (includes accommodation + 2 meals/day)",
    contact: "Via registration link",
    email: "Via IIET website",
    eligibility: "Open to actors and educators",
    mode: "Offline",
    venue: "Indian Institute of Educational Theatre, Hardwicke School, JLB Road, Mysore",
    accommodation: "Youth Hostel, Saraswathipuram, Mysore",
    duration: "10 days",
    includes: "Accommodation + 2 meals/day + Tea/Coffee + Workshop materials",
    instagramLink: "https://www.instagram.com/iietmysuru?igsh=NHdqZ2FsdmEwdTZ3",
  },
  {
    id: 34,
    title: "FTII Pune: Basic Acting Workshop for Children",
    trainer: "Megh Varn Pant",
    institution: "Film and Television Institute of India (FTII)",
    location: "Pune",
    state: "Maharashtra",
    date: "18–26 October 2025",
    time: "Morning: 9:30 AM – 12:30 PM (Ages 8–13), Afternoon: 2:00 PM – 5:00 PM (Ages 13–17)",
    description:
      "🎭 A special on-campus acting workshop exclusively for children at FTII! Learn theatre games, improvisation, storytelling, Navrasas, voice training, monologue work, and audition techniques. Led by FTII alumnus and experienced acting coach Megh Varn Pant with 18+ years of teaching experience.",
    image: "/images/acting-workshop.png",
    registrationLink:
      "https://ftii.ac.in/p/courses-for-children/basic-acting-workshop-for-children-in-pune-18-26-october-2025-1",
    featured: true,
    price: "₹9,000 (excludes meals)",
    contact: "020–25580085",
    email: "info.cfol@ftii.ac.in / ftiicfol@gmail.com",
    eligibility: "Children aged 8-17, minimum 3rd std. pass (2nd std. in exceptional cases)",
    mode: "Offline",
    applicationDeadline: "30 September 2025, 6:00 PM IST",
    selection: "First-Come, First-Served basis",
    capacity: "25 per batch (Minimum 20 required per batch)",
    language: "English & Hindi",
    certification: "FTII & CFOL participation certificate (90% attendance required)",
    venue: "FTII's Vijay Tendulkar Writers' Academy Campus, Pune",
    duration: "9 days (including Saturdays & Sundays)",
    courseDirector: "Megh Varn Pant (FTII alumnus 2004–06, actor & coach with 18+ years teaching experience)",
    includes: "Theatre games, improvisation, storytelling, voice training, monologue work, audition techniques",
    highlights: [
      "Children's Acting",
      "Theatre Games",
      "Improvisation",
      "Storytelling",
      "Voice Training",
      "Audition Techniques",
    ],
  },
  {
    id: 35,
    title: "ABCD of AI for Content Creation – Powered by Your Own Creativity",
    trainer: "Dr. Alwin Anuse",
    institution: "Film and Television Institute of India (FTII)",
    location: "Pune",
    state: "Maharashtra",
    date: "21–24 October 2025",
    time: "Morning: 10 AM – 1 PM, Afternoon: 2:30 PM – 5:30 PM",
    description:
      "🤖 A unique blend of creativity + AI tools for children! Learn the ABCD framework: A = Awareness (spot AI in daily life), B = Brain (keep imagination first), C = Creativity (use AI for text, image, sound & video projects), D = Design Thinking (collaborate & showcase). Led by Dr. Alwin Anuse with 20+ years experience, 2 patents, and expertise in AI systems. Focus on storytelling, design, teamwork, and responsible AI use - no coding required!",
    image: "/images/acting-workshop.png",
    registrationLink:
      "https://ftii.ac.in/p/vtwa/abcd-of-ai-for-content-creation-for-children-powered-by-own-creativity-in-pune-21-24-october-2025",
    featured: true,
    price: "₹4,500 (excludes meals)",
    contact: "020–25580085",
    email: "info.cfol@ftii.ac.in",
    eligibility: "Children aged 13-17 (as of 1 Oct 2025), minimum 5th std. pass",
    mode: "Offline",
    applicationDeadline: "03 October 2025, 6:00 PM IST",
    selection: "First-Come, First-Served basis",
    capacity: "20 per batch (Minimum 20 required per batch, 4 reserved for FTII staff children)",
    language: "Hindi & English",
    certification: "FTII participation certificate (90% attendance mandatory)",
    venue: "FTII's Vijay Tendulkar Writers' Academy, Kothrud, Pune",
    duration: "4 days",
    courseDirector:
      "Dr. Alwin Anuse (Associate Professor, FTII with 20+ years experience, 2 patents, expertise in AI systems & creative applications)",
    includes:
      "ABCD Framework training + AI tools for content creation + Design thinking workshops + Group projects + Responsible AI use guidelines",
    highlights: [
      "AI for Content Creation",
      "ABCD Framework",
      "Design Thinking",
      "Creative AI Tools",
      "No Coding Required",
      "Responsible AI Use",
    ],
  },
  {
    id: 37,
    title: "FTII Pune: Basic Course in Digital Cinematography",
    trainer: "Rakesh Bhilare",
    institution: "Film and Television Institute of India (FTII)",
    location: "Pune",
    state: "Maharashtra",
    date: "08–20 December 2025",
    time: "10 AM – 5 PM",
    description:
      "🎥 Learn how to see light. Frame truth. Capture emotion. A comprehensive 12-day cinematography course at FTII covering camera & composition, light & exposure, movement & framing, filters & lighting setup, and 6-shot continuity exercise. Led by award-winning cinematographer Rakesh Bhilare with 12+ years in the film industry.",
    image: "/images/acting-workshop.png",
    registrationLink: "https://ftii.ac.in/p/vtwa/basic-course-in-digital-cinematography-in-pune-08-20-december-2025",
    featured: true,
    price: "₹15,000 (Hostel optional: ₹4,200 for 14 days, triple share)",
    contact: "020–25580085",
    email: "info.cfol@ftii.ac.in / ftiicfol@gmail.com",
    eligibility: "Age 18+",
    mode: "Offline",
    applicationDeadline: "10 November 2025, 6:00 PM IST",
    selection: "First-Come, First-Served basis",
    capacity: "24 seats",
    language: "English & Hindi",
    certification: "FTII & CFOL participation certificate",
    venue: "Vijay Tendulkar Writer's Academy, Kothrud, Pune",
    duration: "12 days (Sunday off)",
    courseDirector: "Rakesh Bhilare (Cinematographer with 12+ years in film industry, FTII Alumnus)",
    includes: "Camera & composition training + Lighting setup + 6-shot continuity exercise + FTII Certificate",
    highlights: [
      "Camera & Composition",
      "Light & Exposure",
      "Movement & Framing",
      "Filters & Lighting Setup",
      "6-Shot Continuity Exercise",
      "Industry Expert Mentor",
    ],
  },
  {
    id: 38,
    title: "FTII Pune: Introduction to Multi-Camera Technical Operations for TV Program Production",
    trainer: "Prof. Sandeep Shahare",
    institution: "Film and Television Institute of India (FTII)",
    location: "Pune",
    state: "Maharashtra",
    date: "01–05 December 2025",
    time: "9 AM – 6:30 PM",
    description:
      "🎥 Step inside the studio. Learn how multi-camera television magic is made — from the switcher to the spotlight. Master multi-camera setup, signal flow, lighting, vision mixing, live switching, audio control, and program production. Create your own 2-5 minute TV program and receive a copy + certificate.",
    image: "/images/acting-workshop.png",
    registrationLink:
      "https://ftii.ac.in/p/vtwa/introduction-to-multi-camera-technical-operations-for-tv-program-production-01-05-december-2025",
    featured: true,
    price: "₹5,000 (Hostel optional: ₹1,800 for 6 days, triple share)",
    contact: "020–25580085",
    email: "info.cfol@ftii.ac.in / ftiicfol@gmail.com",
    eligibility: "Age 18+",
    mode: "Offline",
    applicationDeadline: "10 November 2025, 6:00 PM IST",
    selection: "First-Come, First-Served basis",
    capacity: "20 seats (Minimum 16 required)",
    language: "English & Hindi",
    certification: "FTII certificate + Copy of your TV program",
    venue: "TV Engineering Department, FTII Main Campus, Law College Road, Pune",
    duration: "5 days",
    courseDirector:
      "Prof. Sandeep Shahare (Head of TV Engineering & Dean TV, FTII with 29 years professional & teaching experience, M.E. Electronics & Telecom)",
    includes:
      "Multi-camera setup training + Live switching + Audio control + Recording & playback + Create your own 2-5 min TV program + Certificate",
    highlights: [
      "Multi-Camera Setup",
      "Vision Mixing",
      "Live Switching",
      "Audio Control",
      "TV Program Production",
      "Hands-on Studio Experience",
    ],
  },
  {
    id: 39,
    title: "FTII Chennai: Basic Film Appreciation Course",
    trainer: "Dr. Milind Damle",
    institution: "Film and Television Institute of India (FTII)",
    location: "Chennai",
    state: "Tamil Nadu",
    date: "17–21 November 2025",
    time: "10 AM – 6 PM",
    description:
      "🎬 See films not just as stories — but as language, rhythm, and truth. Learn the art and language of cinema, film history, how images and sound create meaning, and the relationship between cinema, culture, and society. Includes film screenings, discussions, and guided analysis led by Dr. Milind Damle with 20+ years of experience.",
    image: "/images/acting-workshop.png",
    registrationLink: "https://ftii.ac.in/p/vtwa/basic-film-appreciation-course-in-chennai-17-21-november-2025",
    featured: true,
    price: "₹4,000",
    contact: "020–25580085",
    email: "info.cfol@ftii.ac.in / ftiicfol@gmail.com",
    eligibility: "Age 18+",
    mode: "Offline",
    applicationDeadline: "30 October 2025, 6:00 PM IST",
    selection: "First-Come, First-Served basis",
    capacity: "70 seats",
    language: "English & Hindi",
    certification: "FTII participation certificate",
    venue: "SA College of Arts & Science, Thiruverkadu, Chennai",
    duration: "5 days",
    courseDirector:
      "Dr. Milind Damle (Associate Professor, FTII Pune, Film Editor, Writer, Educator with 20+ years in Radio, Cinema & Television, Ph.D. on Song Picturization in Vijay Anand Films)",
    includes: "Film screenings + Discussions + Guided analysis + FTII Certificate",
    highlights: [
      "Art & Language of Cinema",
      "Film History & Evolution",
      "Images, Sound & Editing",
      "Cinema & Culture",
      "Film Screenings",
      "Expert Analysis",
    ],
  },
  {
    id: 40,
    title: "FTII Pune: Basic Course in Screen Acting (Hindi)",
    trainer: "Rispal Singh Vikal & Harsh Prasad",
    institution: "Film and Television Institute of India (FTII)",
    location: "Pune",
    state: "Maharashtra",
    date: "10–22 November 2025",
    time: "10:30 AM – 5:00 PM",
    description:
      "🎭 Find your truth before the camera. Break inhibitions. Express freely. Live the character. Learn freedom from inhibition, classical & modern acting approaches, memory & imagination work, voice & mime training, and theatre games. Led by veteran theatre director Rispal Singh Vikal with 45+ years of experience.",
    image: "/images/acting-workshop.png",
    registrationLink: "https://ftii.ac.in/p/vtwa/basic-course-in-screen-acting-in-hindi-in-pune-10-22-november-2025",
    featured: true,
    price: "₹12,000 (Hostel optional: ₹4,200 for 14 days, triple share)",
    contact: "020–25580085",
    email: "info.cfol@ftii.ac.in / ftiicfol@gmail.com",
    eligibility: "Age 18+",
    mode: "Offline",
    applicationDeadline: "21 October 2025, 6:00 PM IST",
    selection: "First-Come, First-Served basis",
    capacity: "20 seats (Minimum 16 required)",
    language: "Hindi",
    certification: "FTII participation certificate",
    venue: "Vijay Tendulkar Writers' Academy Campus, Kothrud, Pune",
    duration: "12 days (Sunday off)",
    courseDirector:
      "Rispal Singh Vikal (Veteran theatre director with 45+ years experience, Writer-Director of Poster, Kokh, Dhadhak, Founder of Virat Acting Lab) & Harsh Prasad (Co-Course Director, Senior cinema & theatre personality)",
    includes:
      "Freedom from inhibition training + Classical & modern acting approaches + Voice & mime training + Theatre games + FTII Certificate",
    highlights: [
      "Screen Acting",
      "Freedom from Inhibition",
      "Classical & Modern Acting",
      "Memory & Imagination",
      "Voice & Mime Training",
      "Theatre Games",
    ],
  },
  {
    id: 41,
    title: "FTII Pune: Basic Course on Creating Films & AV Content using AI",
    trainer: "Dr. Alwin Anuse",
    institution: "Film and Television Institute of India (FTII)",
    location: "Online",
    state: "Maharashtra",
    date: "10–14 November 2025",
    time: "10:30 AM – 12:30 PM & 2:30 PM – 4:30 PM",
    description:
      "🤖 The camera is evolving. Now the imagination directs the machine. Learn generative AI for storytelling, script ideation, prompt design, AI-based image/video/sound creation, storyboarding, editing, and ethical AI use. Led by Dr. Alwin Anuse with 20+ years experience, 2 patents, and expertise in AI & deep learning.",
    image: "/images/acting-workshop.png",
    registrationLink:
      "https://ftii.ac.in/p/ftii-online-1/basic-course-on-creating-films-audio-visual-contents-using-artificial-intelligence-ai-10-14-november-2025",
    featured: true,
    price: "₹9,000",
    contact: "020–25580085",
    email: "info.cfol@ftii.ac.in / ftiicfol@gmail.com",
    eligibility: "Age 18+, Laptop/Desktop (min. 4GB RAM, Intel i3+), 10 Mbps Internet, Headphones + HD Webcam",
    mode: "Online",
    applicationDeadline: "30 October 2025, 6:00 PM IST",
    selection: "First-Come, First-Served basis",
    capacity: "30 seats (Minimum 24 required)",
    language: "English & Hindi",
    certification: "FTII participation certificate",
    venue: "Online (Google Classroom + Google Meet)",
    duration: "5 days (20 hours)",
    courseDirector:
      "Dr. Alwin Anuse (Associate Professor, FTII Pune, Ph.D. from COEP, Researcher in AI, Deep Learning & Visual Media, 20+ years teaching & industry experience, Published with Springer & Elsevier, Holds 2 patents)",
    includes:
      "Generative AI for storytelling + Script ideation & prompt design + AI-based image/video/sound creation + Storyboarding & editing with AI + Ethical AI use + Guided demos + Assignments + Group projects",
    highlights: [
      "AI Filmmaking",
      "Generative AI",
      "Script Ideation",
      "Prompt Design",
      "AI Video Creation",
      "Ethical AI Use",
    ],
  },
  {
    id: 42,
    title: "ACT IT OUT – 7 Days Theatre Workshop",
    trainer: "Mr. Arun Srivastava",
    institution: "Vinod Rastogi Smriti Sansthan",
    location: "Prayagraj",
    state: "Uttar Pradesh",
    date: "24th October 2025",
    time: "Everyday 10:00 AM",
    description:
      "🎭 Unleash your hidden performer & step into the world of stage! A comprehensive 7-day theatre workshop covering basic understanding of theatre & human activities, physical exercises & theatre games, script reading, pronunciation & diction, work on Rasa's & Bhava, and improvisation & performance techniques. Under the supervision of Ajay Mukherjee and mentored by Mr. Arun Srivastava (Research Scholar, University of Rajasthan | Alumnus – Mandi School of Drama & Pondicherry University).",
    image: "/images/acting-workshop.png",
    registrationLink: "https://forms.gle/9Dw8N1eJDCNpE3Mb7",
    featured: true,
    price: "₹500",
    contact: "+91 7783912449",
    email: "Via registration form",
    eligibility: "Open to all",
    mode: "Offline",
    certification: "Certificate will be provided",
    venue: "Maharashtra Lok Sewa Mandal, Alopibagh, Prayagraj",
    duration: "7 days",
    supervisor: "Ajay Mukherjee",
    language: "Hindi & English",
    includes: "Certificate + Comprehensive theatre training",
    highlights: [
      "Basic understanding of theatre & human activities",
      "Physical exercises & theatre games",
      "Script reading, pronunciation & diction",
      "Work on Rasa's & Bhava",
      "Improvisation & performance techniques",
    ],
    socialMedia: "@Officialvrss",
  },
]

// Get unique states, cities, and trainers for filters
const states = [...new Set(workshops.map((workshop) => workshop.state))].sort()
const cities = [...new Set(workshops.map((workshop) => workshop.location))].sort()
const trainers = [...new Set(workshops.map((workshop) => workshop.trainer))].sort()
const institutions = [...new Set(workshops.map((workshop) => workshop.institution))].sort()

function WorkshopsContent() {
  const [filters, setFilters] = useState({
    search: "",
    city: "",
    state: "",
    trainer: "",
    institution: "",
    mode: "",
  })
  const [showDesktopFilters, setShowDesktopFilters] = useState(true)
  const isMobile = useMediaQuery("(max-width: 768px)")
  const isSmallMobile = useMediaQuery("(max-width: 640px)")

  const filteredWorkshops = workshops.filter((workshop) => {
    return (
      (filters.search === "" ||
        workshop.title.toLowerCase().includes(filters.search.toLowerCase()) ||
        workshop.description.toLowerCase().includes(filters.search.toLowerCase())) &&
      (filters.city === "" || workshop.location === filters.city) &&
      (filters.state === "" || workshop.state === filters.state) &&
      (filters.trainer === "" || workshop.trainer === filters.trainer) &&
      (filters.institution === "" || workshop.institution === filters.institution) &&
      (filters.mode === "" || workshop.mode === filters.mode)
    )
  })

  const handleFilterChange = (key: string, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }))
  }

  const clearFilters = () => {
    setFilters({
      search: "",
      city: "",
      state: "",
      trainer: "",
      institution: "",
      mode: "",
    })
  }

  // Featured workshops
  const featuredWorkshops = workshops.filter((workshop) => workshop.featured)
  const hasActiveFilters = Object.values(filters).some((value) => value !== "")

  return (
    <div className="container py-6 md:py-16 px-3 sm:px-6">
      <div className="max-w-3xl mx-auto text-center mb-8 md:mb-12">
        <h1 className="font-playfair text-3xl md:text-5xl font-bold mb-3 text-gray-800">
          Workshops & <span className="text-primary">Training</span>
        </h1>
        <p className="text-gray-600 text-sm md:text-base max-w-xl mx-auto">
          Enhance your skills with professional workshops and training sessions led by renowned theater professionals
          from across the country.
        </p>
      </div>

      {/* Mobile Search */}
      {isMobile && (
        <div className="mb-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              type="text"
              placeholder="Search workshops"
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

      {/* Mobile Filter Button and Count */}
      <div className="mb-6 flex justify-between items-center">
        <h2 className="font-playfair text-lg md:text-xl font-bold">
          {hasActiveFilters
            ? `${filteredWorkshops.length} Workshop${filteredWorkshops.length !== 1 ? "s" : ""} Found`
            : "All Workshops"}
        </h2>

        <div className="flex items-center gap-2">
          <MobileFilterDrawer
            filters={filters}
            cities={cities}
            states={states}
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
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                type="text"
                placeholder="Search workshops"
                className="pl-10 rounded-full"
                value={filters.search}
                onChange={(e) => handleFilterChange("search", e.target.value)}
              />
            </div>

            <Select value={filters.city} onValueChange={(value) => handleFilterChange("city", value)}>
              <SelectTrigger className="rounded-full">
                <SelectValue placeholder="City" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Cities</SelectItem>
                {cities.map((city) => (
                  <SelectItem key={city} value={city}>
                    {city}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={filters.state} onValueChange={(value) => handleFilterChange("state", value)}>
              <SelectTrigger className="rounded-full">
                <SelectValue placeholder="State" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All States</SelectItem>
                {states.map((state) => (
                  <SelectItem key={state} value={state}>
                    {state}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

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

      {featuredWorkshops.length > 0 && !hasActiveFilters && !isSmallMobile && (
        <div className="mb-10 md:mb-16">
          <div className="flex items-center mb-4 md:mb-6">
            <Star className="h-5 w-5 text-secondary mr-2 fill-secondary" />
            <h2 className="font-playfair text-xl md:text-2xl font-bold">Featured Workshops</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
            {featuredWorkshops.slice(0, 2).map((workshop) => (
              <WorkshopCard key={workshop.id} workshop={workshop} />
            ))}
          </div>
        </div>
      )}

      {/* Workshop Cards */}
      {filteredWorkshops.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
          {filteredWorkshops.map((workshop) => (
            <WorkshopCard key={workshop.id} workshop={workshop} variant={isMobile ? "compact" : "full"} />
          ))}
        </div>
      ) : (
        <div className="text-center py-8 md:py-12 bg-gray-50 rounded-xl">
          <p className="text-gray-500 mb-4">No workshops match your current filters.</p>
          <Button onClick={clearFilters} variant="outline" className="rounded-full bg-transparent">
            Clear Filters
          </Button>
        </div>
      )}
    </div>
  )
}

export default WorkshopsContent
