"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Filter, ChevronDown, ChevronUp, Star, X } from "lucide-react"
import WorkshopBanner from "@/components/workshop-banner"
import WorkshopCard from "@/components/workshop-card"
import MobileFilterDrawer from "@/components/mobile-filter-drawer"
import ActiveFilters from "@/components/active-filters"
import { useMediaQuery } from "@/hooks/use-media-query"

// Verified workshops data
const workshops = [
  {
    id: 4,
    title: "NSD's Certificate Course in Drama-in-Education (Delhi)",
    trainer: "National School of Drama",
    institution: "National School of Drama",
    location: "New Delhi",
    state: "Delhi",
    date: "2 June – 31 August 2025",
    time: "Morning: 10 AM – 1 PM, Afternoon: 2 PM – 5 PM",
    description:
      "Located at NSD Premises, Mandi House. Highlights: Practical training in storytelling, improvisation, forum theatre, Actor-Teacher development, Final performance at NSD. Official NSD Program.",
    image: "/images/acting-workshop.png",
    registrationLink: "https://nsd.gov.in",
    featured: true,
    price: "₹35,000",
    contact: "011-23389054, 23031137",
    email: "nsdtiegmail.com",
    tags: "#NSD #VerifiedWorkshop #TheatreEducation #DramaInEducation",
    mode: "Offline",
  },
  {
    id: 6,
    title: "Diploma in Applied Theatre 2025 - Batch 4",
    trainer: "Applied Theatre India",
    institution: "Applied Theatre India",
    location: "Online",
    state: "All India",
    date: "Starting August 15, 2025",
    time: "Flexible Program",
    description:
      "Transform lives through theatre! Join our groundbreaking program that bridges artistry with social impact. Curious about turning passion into purpose? Join our FREE WEBINAR on Sunday 11 May at 11 am to learn about our transformative curriculum.",
    image: "/images/acting-workshop.png",
    registrationLink: "https://education.appliedtheatreindia.com/l/4fc92006ec",
    featured: true,
    price: "Contact for details",
    contact: "Via website",
    mode: "Online",
  },
  {
    id: 7,
    title: "FTII Workshop in Delhi – Tribute to Raj Kapoor",
    trainer: "Dr. Milind Damle",
    institution: "Film and Television Institute of India (FTII)",
    location: "New Delhi",
    state: "Delhi",
    date: "12–13 July 2025",
    time: "10 AM – 5 PM (with 1–2 PM lunch break)",
    description:
      "This 2-day workshop explores the rich legacy of Raj Kapoor through the lens of his iconic song sequences. From Barsaat to Jagte Raho and Awara, relive the Golden Era of Hindi film music and learn about cinematic storytelling through songs.",
    image: "/images/acting-workshop.png",
    registrationLink:
      "https://ftii.ac.in/p/vtwa/basic-course-in-appreciating-songs-in-raj-kapoor-films-in-delhi-12-13-july-2025",
    featured: true,
    price: "₹1,500",
    contact: "020 25580085",
    email: "info.cfol@ftii.ac.in",
    eligibility: "Age 18+, 12th pass",
    mode: "Offline",
  },
  {
    id: 8,
    title: "FTII's Basic Course on Writing for Short Film Fiction – Delhi",
    trainer: "Dr. Milind Damle",
    institution: "Film and Television Institute of India (FTII)",
    location: "New Delhi",
    state: "Delhi",
    date: "07–11 July 2025",
    time: "10 AM – 5 PM (Lunch: 1–2 PM)",
    description:
      "A hands-on, foundational course for aspiring screenwriters who want to write short fiction films. Learn from industry experts about film history, storytelling, screenwriting fundamentals, and pitching your ideas effectively. Participants will watch and analyse films, and complete daily writing exercises.",
    image: "/images/acting-workshop.png",
    registrationLink:
      "https://ftii.ac.in/p/vtwa/basic-course-on-writing-for-short-film-fiction-in-delhi-07-11-july-2025",
    featured: true,
    price: "₹9,000",
    contact: "020 – 2558 0085",
    email: "info.cfol@ftii.ac.in",
    eligibility: "Age 18+, 12th pass",
    mode: "Offline",
  },
  {
    id: 9,
    title: "FTII's Basic Course in Appreciating Songs in Guru Dutt Films",
    trainer: "Dr. Milind Damle",
    institution: "Film and Television Institute of India (FTII)",
    location: "New Delhi",
    state: "Delhi",
    date: "05–06 July 2025",
    time: "10 AM – 5 PM (Lunch: 1–2 PM)",
    description:
      "To celebrate the birth centenary of the legendary filmmaker Guru Dutt, this special two-day workshop is dedicated to exploring the magic of songs in Guru Dutt's cinema. Explore his cinematic style through timeless songs from classics like Pyaasa, Kagaz Ke Phool, and Sahib Bibi Aur Ghulam.",
    image: "/images/acting-workshop.png",
    registrationLink:
      "https://ftii.ac.in/p/vtwa/basic-course-in-appreciating-songs-in-guru-dutt-films-in-delhi-05-06-july-2025",
    featured: true,
    price: "₹1,500",
    contact: "020 25580085",
    email: "info.cfol@ftii.ac.in",
    eligibility: "Age 18+, 12th pass",
    mode: "Offline",
  },
  {
    id: 14,
    title: "Sooraj Nambiar's – LOCHANAM: A 3-Day Actor/Dancer Workshop",
    trainer: "Sooraj Nambiar",
    institution: "Nrityangana Institute of Performing Arts & Tripudi",
    location: "Bangalore",
    state: "Karnataka",
    date: "July 4-6, 2025",
    time: "10 AM – 1 PM",
    description:
      "Discover the unseen potential of your eyes in performance with this unique acting pedagogy rooted in Kutiyattam. Learn to refine your Abhinaya with depth and precision while stimulating imagination and deepening expression.",
    image: "/images/acting-workshop.png",
    registrationLink: "https://wa.me/918075413321",
    featured: true,
    price: "Contact for details",
    contact: "8075413321",
    email: "tripudiws@gmail.com",
    instagram: "@nrityangana_institute_pa",
    eligibility: "Actors and dancers",
    mode: "Offline",
  },
  {
    id: 15,
    title: "Paradox Studios Support — Performing Arts in Education Mentoring",
    trainer: "Paradox Studios",
    institution: "Paradox Studios",
    location: "Online",
    state: "All India",
    date: "Contact for details",
    time: "Contact for details",
    description:
      "Are you a Performing Arts Facilitator facing challenges in your institution? Paradox Studios is offering two free sessions to Performing Arts (Music/Theatre/Dance) teachers/facilitators who are seeking mentorship, support, and solutions.",
    image: "/images/paradox-studios-logo.png",
    registrationLink:
      "https://docs.google.com/forms/d/e/1FAIpQLSckunGJ7QNQ3kdbTwUVzLEClkfNbKI_do0kOwxMcYDO0LlAmw/viewform",
    featured: false,
    price: "First two sessions free",
    contact: "Via registration form",
    email: "N/A",
    eligibility: "Performing Arts (Music/Theatre/Dance) teachers/facilitators",
    mode: "Online",
  },
  {
    id: 16,
    title: "Paradox Studios Support For Actors — English Play Dialogues Coaching",
    trainer: "Paradox Studios",
    institution: "Paradox Studios",
    location: "Online",
    state: "All India",
    date: "Contact for details",
    time: "Contact for details",
    description:
      "Auditioning for an English Play? Let's sharpen your dialogue delivery! Paradox Studios is offering two free coaching sessions for actors who are either auditioning for, or currently cast in English plays.",
    image: "/images/paradox-studios-logo.png",
    registrationLink:
      "https://docs.google.com/forms/d/e/1FAIpQLSfwqU9RF-zABbUxNPpN-G4KSBJ8ZV2nDf1tsLp3LsPQuF6e_w/viewform",
    featured: false,
    price: "First two sessions free",
    contact: "Via registration form",
    email: "N/A",
    eligibility: "Actors auditioning for or cast in English plays",
    mode: "Online",
  },
  {
    id: 17,
    title: "FTII's Practical Course in Multi-Camera Technical Operations for TV Production",
    trainer: "FTII Faculty",
    institution: "Film and Television Institute of India (FTII)",
    location: "Pune",
    state: "Maharashtra",
    date: "14–18 July 2025",
    time: "9 AM – 6:30 PM",
    description:
      "Ever wondered how reality shows, stand-up comedy, or sports events are technically produced? Learn hands-on with professional gear including Multi-Camera Setup, Audio Consoles, Vision Mixers, Lighting Consoles, Teleprompters, Character Generators & more. Work like a real technical crew in a TV studio and take home a 2–5 min TV show you helped produce.",
    image: "/images/acting-workshop.png",
    registrationLink:
      "https://ftii.ac.in/p/vtwa/introduction-to-multi-camera-technical-operations-for-tv-program-production-14-18-july-2025",
    featured: true,
    price: "₹5,000",
    contact: "020-25580085",
    email: "info.cfol@ftii.ac.in",
    eligibility: "Age 18+, 12th pass (exceptionally 10th pass)",
    mode: "Offline",
    applicationDeadline: "30 June 2025, 6 PM",
    selection: "First Come, First Served",
    highlights: [
      "Work like a real technical crew in a TV studio",
      "Learn camera, audio, vision mixing, lighting & switching",
      "Take home a 2–5 min TV show you helped produce",
      "Get a participation certificate from FTII",
      "Hostel accommodation available",
    ],
  },
  {
    id: 18,
    title: "FTII Tribute to the Showman – Basic Course in Appreciating Songs in Raj Kapoor Films",
    trainer: "Dr. Milind Damle",
    institution: "Film and Television Institute of India (FTII)",
    location: "New Delhi",
    state: "Delhi",
    date: "12–13 July 2025",
    time: "10 AM – 5 PM (with 1–2 PM lunch break)",
    description:
      "Celebrate Raj Kapoor's centenary with a 2-day workshop by FTII exploring the timeless music and song picturization of his films. Learn the cinematic art behind RK's legendary song sequences with insights from FTII Prof. Dr. Milind Damle – an award-winning filmmaker and film educator.",
    image: "/images/acting-workshop.png",
    registrationLink:
      "https://ftii.ac.in/p/vtwa/basic-course-in-appreciating-songs-in-raj-kapoor-films-in-delhi-12-13-july-2025",
    featured: true,
    price: "₹1,500",
    contact: "020–25580085",
    email: "info.cfol@ftii.ac.in",
    eligibility: "Age 18+, 12th pass (10th in exceptional cases)",
    mode: "Offline",
    applicationDeadline: "27 June 2025, 6 PM",
    selection: "First Come, First Served",
    capacity: "Max 70 participants",
    language: "Hindi & English",
    certification: "Certificate on 90% attendance",
  },
  {
    id: 19,
    title: "FTII Pune: Basic Course in Smartphone Filmmaking",
    trainer: "FTII Faculty",
    institution: "Film and Television Institute of India (FTII)",
    location: "Pune",
    state: "Maharashtra",
    date: "04–08 August 2025",
    time: "10 AM – 5 PM",
    description:
      "Want to learn filmmaking using just your phone? Join this 5-day hands-on course by FTII and start telling your own cinematic stories! Learn creative storytelling, framing, audio & lighting basics guided by FTII experts.",
    image: "/images/acting-workshop.png",
    registrationLink: "https://ftii.ac.in/p/vtwa/basic-course-in-smartphone-filmmaking-in-pune-04-08-august-2025",
    featured: true,
    price: "₹7,000",
    contact: "020-25580085",
    email: "info.cfol@ftii.ac.in",
    eligibility: "Age 18+, 12th pass (10th in special cases)",
    mode: "Offline",
    applicationDeadline: "30 June 2025, 6 PM",
    selection: "First Come, First Served",
    capacity: "Limited to 24 participants",
    language: "Hindi & English",
    certification: "Certificate on completion",
  },
  {
    id: 20,
    title: "FTII Pune: Basic Course on Writing for Short-Film Fiction",
    trainer: "FTII Faculty",
    institution: "Film and Television Institute of India (FTII)",
    location: "Pune",
    state: "Maharashtra",
    date: "18–22 August 2025",
    time: "10 AM – 5 PM",
    description:
      "Hone your storytelling craft in five intensive days with FTII faculty: develop ideas, shape characters, structure plots, and leave with a polished short-film script.",
    image: "/images/acting-workshop.png",
    registrationLink:
      "https://ftii.ac.in/p/vtwa/basic-course-on-writing-for-short-film-fiction-in-pune-18-22-august-2025",
    featured: true,
    price: "₹9,000",
    contact: "020-25580085",
    email: "info.cfol@ftii.ac.in",
    eligibility: "Age 18+, 12th pass (10th in special cases)",
    mode: "Offline",
    applicationDeadline: "30 June 2025, 6 PM",
    selection: "First Come, First Served",
    capacity: "Limited to 24 participants",
    language: "Hindi & English",
    certification: "Certificate on completion",
  },
  {
    id: 21,
    title: "FTII Pune: Appreciate the Magic of Guru Dutt's Songs",
    trainer: "FTII Faculty",
    institution: "Film and Television Institute of India (FTII)",
    location: "Pune",
    state: "Maharashtra",
    date: "09–10 August 2025",
    time: "10 AM – 5 PM",
    description:
      "In tribute to Guru Dutt's birth centenary, this 2-day course dives into the poetic brilliance and cinematic genius of his song picturizations.",
    image: "/images/acting-workshop.png",
    registrationLink:
      "https://ftii.ac.in/p/vtwa/basic-course-in-appreciating-songs-in-guru-dutt-films-in-pune-09-10-august-2025",
    featured: true,
    price: "₹1,500",
    contact: "020-25580085",
    email: "info.cfol@ftii.ac.in",
    eligibility: "Age 18+, 12th pass (10th in special cases)",
    mode: "Offline",
    applicationDeadline: "30 June 2025, 6 PM",
    selection: "Open to all eligible applicants",
    capacity: "Limited to 25 participants (minimum 20 required)",
    language: "Hindi & English",
    certification: "Certificate on completion",
  },
]

// Get unique states, cities, and trainers for filters
const states = [...new Set(workshops.map((workshop) => workshop.state))].sort()
const cities = [...new Set(workshops.map((workshop) => workshop.location))].sort()
const trainers = [...new Set(workshops.map((workshop) => workshop.trainer))].sort()
const institutions = [...new Set(workshops.map((workshop) => workshop.institution))].sort()

export default function WorkshopsContent() {
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
