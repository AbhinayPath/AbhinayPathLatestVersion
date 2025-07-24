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
    id: 1,
    title: "Introduction to Stopmotion Animation with Vaibhav Kumaresh",
    trainer: "Vaibhav Kumaresh",
    institution: "Indian Institute of Educational Theatre (IIET)",
    location: "Mysuru",
    state: "Karnataka",
    date: "3-Day Hands-on Workshop",
    time: "10 AM – 5 PM daily",
    description:
      "Discover the magical world of stopmotion animation! Learn how to bring everyday objects to life using simple tools and your smartphone. Explore the fundamentals of timing, spacing, and the creative use of space and movement — all guided by acclaimed animator Vaibhav Kumaresh.",
    image: "/images/iiet-logo.png",
    registrationLink: "https://wa.me/919845605012",
    featured: true,
    price: "₹3,000 (General), ₹2,500 (Students)",
    contact: "9845605012 / 9448871815",
    email: "Contact via WhatsApp",
    venue: "IIET Hardwick School Premises, JLB Road, Mysuru",
    includes: "Simple lunch for all participants",
    learningOutcomes: [
      "Basics of stopmotion animation",
      "How to animate using objects around you",
      "Hands-on practice and live demos",
      "Create your own animated clip using just your smartphone",
    ],
    mode: "Offline",
  },
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
  {
    id: 22,
    title: "FTII Online Course: Creating Films & Audio-Visual Content using AI",
    trainer: "Dr. Alwin Anuse",
    institution: "Film and Television Institute of India (FTII)",
    location: "Online",
    state: "All India",
    date: "18–22 August 2025",
    time: "10:30 AM – 12:30 PM & 2:30 PM – 4:30 PM",
    description:
      "🎬 Learn to create films and audio-visual content using Artificial Intelligence! This comprehensive online course by FTII covers AI tools and techniques for modern filmmaking. Perfect for aspiring filmmakers looking to integrate AI into their creative process.",
    image: "/images/acting-workshop.png",
    registrationLink:
      "https://ftii.ac.in/p/ftii-online-1/basic-course-on-creating-films-audio-visual-contents-using-artificial-intelligence-ai-18-22-august-2025-online",
    featured: true,
    price: "₹9,000",
    contact: "020-25580085",
    email: "info.cfol@ftii.ac.in",
    eligibility: "Age 18+, 12th pass, Basic computer literacy mandatory",
    mode: "Online",
    applicationDeadline: "04 August 2025, 6:00 PM IST",
    selection: "First-Come, First-Served basis",
    capacity: "Maximum 22 participants (Minimum 18 required)",
    language: "English & Hindi",
    certification: "FTII Certificate upon successful completion",
  },
  {
    id: 23,
    title: "Introduction to Multi-Camera Technical Operations for TV Program Production",
    trainer: "FTII Faculty",
    institution: "Film and Television Institute of India (FTII)",
    location: "Pune",
    state: "Maharashtra",
    date: "08–12 September 2025",
    time: "9:00 AM – 6:30 PM (with 1:00–1:30 PM lunch break)",
    description:
      "Ever wondered how multi-camera TV shows like Indian Idol, The Kapil Sharma Show, or live sports broadcasts are actually shot and produced? This hands-on, practical Short Term Training Programme takes you behind the scenes of television production. Learn how engineers manage camera feeds, mix audio, insert live graphics, control lighting, and switch between sources to create seamless broadcast experiences.",
    image: "/images/acting-workshop.png",
    registrationLink:
      "https://ftii.ac.in/p/vtwa/introduction-to-multi-camera-technical-operations-for-tv-program-production-08-12-september-2025",
    featured: true,
    price: "₹5,000 (+ ₹1,800 for optional hostel accommodation)",
    contact: "020-25580085",
    email: "info.cfol@ftii.ac.in",
    eligibility: "Age 18+, 12th pass (10th in special cases)",
    mode: "Offline",
    applicationDeadline: "20 August 2025, 6:00 PM",
    selection: "First-Come, First-Served basis",
    capacity: "Maximum 20 participants (Minimum 16 required)",
    language: "English & Hindi",
    certification: "Certificate on 90% attendance",
    venue: "TV Engineering Dept., FTII Main Campus, Law College Road, Pune – 411004",
    includes: "Recorded 2-5 minute TV program + Participation certificate",
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
