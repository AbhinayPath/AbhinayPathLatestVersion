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
    image: "/images/acting-workshop.png",
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
    id: 23,
    title: "FTII Pune: Introduction to Multi-camera Technical Operations for TV Program Production",
    trainer: "FTII Faculty",
    institution: "Film and Television Institute of India (FTII)",
    location: "Pune",
    state: "Maharashtra",
    date: "08–12 September 2025",
    time: "9:00 AM – 6:30 PM (45 hours total)",
    description:
      "📺 Learn how live TV shows, sports broadcasts, and reality programs are technically produced! This hands-on Short Term Training Program covers multi-camera setup, Vision Mixer, CCU, Audio Console, Lighting Console, Character Generator operations. Produce a 2–5 min TV program with your team and take home a recorded copy plus participation certificate.",
    image: "/images/acting-workshop.png",
    registrationLink:
      "https://ftii.ac.in/p/vtwa/introduction-to-multi-camera-technical-operations-for-tv-program-production-08-12-september-2025",
    featured: true,
    price: "₹5,000 (+ ₹1,800 for optional accommodation)",
    contact: "020-25580085",
    email: "info.cfol@ftii.ac.in",
    eligibility: "Age 18+, 12th pass (10th in exceptional cases)",
    mode: "Offline",
    applicationDeadline: "20 August 2025, 6:00 PM IST",
    selection: "First-Come, First-Served basis",
    capacity: "Maximum 20 participants (Minimum 16 required)",
    language: "English & Hindi",
    certification: "Participation certificate + recorded TV program copy",
    venue: "TV Engineering Dept., FTII Main Campus, Law College Road, Pune – 411004",
    duration: "1 week (5 days) - 45 hours total",
    includes: "Recorded 2-5 minute TV program + Participation certificate",
  },
  {
    id: 24,
    title: "FTII Pune: Basic Course in the Art of Screenwriting (Online)",
    trainer: "Vikas Sharma",
    institution: "Film and Television Institute of India (FTII)",
    location: "Online",
    state: "All India",
    date: "29 September – 10 October 2025",
    time: "10 AM – 12 PM & 1 PM – 3 PM (IST)",
    description:
      "🎬 Master the art of cinematic storytelling with FTII's comprehensive online screenwriting course. Learn foundations of storytelling, character development, screenplay structures, visual storytelling, and dialogue writing. Perfect for aspiring writers who want to craft compelling screenplays for cinema.",
    image: "/images/acting-workshop.png",
    registrationLink:
      "https://ftii.ac.in/p/ftii-online-1/basic-course-in-the-art-of-screenwriting-29-september-10-october-2025-online",
    featured: true,
    price: "₹14,000 (India), ₹42,000 (Foreign/OCI/PIO)",
    contact: "020-25580085",
    email: "info.cfol@ftii.ac.in",
    eligibility: "Age 18+, 12th pass (10th in special cases)",
    mode: "Online",
    applicationDeadline: "29 August 2025, 6:00 PM IST",
    selection: "First-Come, First-Served basis",
    capacity: "Maximum 24 participants (Minimum 20 required)",
    language: "English & Hindi",
    certification: "FTII Certificate upon completion",
    platform: "Google Classroom & Google Meet",
    duration: "4 hours/day (Weekdays only)",
    courseDirector: "Vikas Sharma",
  },
  {
    id: 25,
    title: "FTII Pune: Exploring an Indian Classic – Guide (Diamond Jubilee Appreciation)",
    trainer: "Dr. Milind Damle",
    institution: "Film and Television Institute of India (FTII)",
    location: "Chittorgarh",
    state: "Rajasthan",
    date: "03–07 November 2025",
    time: "10 AM – 6 PM (with travel/rest breaks)",
    description:
      "🎬 A once-in-a-lifetime chance to explore the iconic film 'Guide' at its original shooting locations in Udaipur & Chittorgarh. Analyze R.K. Narayan's novel vs. film adaptation, compare Hindi & English versions, and appreciate legendary songs. Walk where Waheeda ji danced, S.D. Burman composed, and Vijay Anand called 'Action!'",
    image: "/images/acting-workshop.png",
    registrationLink:
      "https://ftii.ac.in/p/vtwa/exploring-an-indian-classic-guide-a-diamond-jubilee-appreciation-03-07-november-2025",
    featured: true,
    price: "₹10,000 (+ ₹150/day accommodation + ₹150/day meals)",
    contact: "020-25580085",
    email: "info.cfol@ftii.ac.in",
    eligibility: "Age 18+, 12th pass (10th in exceptional cases)",
    mode: "Offline",
    applicationDeadline: "31 August 2025, 6:00 PM IST",
    selection: "First-Come, First-Served basis",
    capacity: "Maximum 25 participants (Minimum 20 required)",
    language: "English & Hindi",
    certification: "FTII Certificate upon completion",
    venue: "Mewar University, Chittorgarh + Iconic shooting locations in Udaipur & Chittorgarh",
    duration: "5 Days",
    courseDirector: "Dr. Milind Damle",
    includes: "Location visits, film screenings, analysis sessions",
  },
  {
    id: 26,
    title: "FTII Pune: Basic Course in Video Editing",
    trainer: "FTII Faculty",
    institution: "Film and Television Institute of India (FTII)",
    location: "Pune",
    state: "Maharashtra",
    date: "20 September – 01 October 2025",
    time: "10 AM – 5 PM (lunch: 1–2 PM)",
    description:
      "🎬 Master the art and craft of video editing with FTII's comprehensive course. Learn history & principles of editing, continuity, storytelling techniques, sound basics, and hands-on editing exercises. Perfect for aspiring editors to start their journey in cinema's most crucial craft!",
    image: "/images/acting-workshop.png",
    registrationLink: "https://ftii.ac.in/p/vtwa/basic-course-in-video-editing-in-pune-20-september-01-october-2025",
    featured: true,
    price: "₹18,000 (excluding food & snacks)",
    contact: "020-25580085",
    email: "info.cfol@ftii.ac.in",
    eligibility: "Age 18+, 12th pass (10th in exceptional cases)",
    mode: "Offline",
    applicationDeadline: "29 August 2025, 6:00 PM IST",
    selection: "First-Come, First-Served basis",
    capacity: "Maximum 12 participants (Minimum 10 required)",
    language: "English & Hindi",
    certification: "FTII Certificate upon completion",
    venue: "Vijay Tendulkar Writer's Academy, Rambaug Colony, Near Doordarshan Kendra, Kothrud, Pune",
    duration: "12 days (including Sundays)",
    includes: "Completed short films + FTII Certificate + practical workshops",
  },
  {
    id: 27,
    title: "FTII Pune: Basic Course in Stop Motion Animation",
    trainer: "Mandar Digrajkar",
    institution: "Film and Television Institute of India (FTII)",
    location: "Pune",
    state: "Maharashtra",
    date: "08–18 September 2025",
    time: "10 AM – 6 PM (lunch: 1:30–2 PM)",
    description:
      "🎬 Learn the fundamentals of stop motion animation at FTII! This practice-oriented program covers animation techniques, storyboarding, model creation with armatures, and hands-on production. Work in teams to conceptualize, produce & finish your own stop-motion film while learning from FTII animation experts.",
    image: "/images/acting-workshop.png",
    registrationLink: "https://ftii.ac.in/p/vtwa/basic-course-in-stop-motion-animation-08-18-september-2025",
    featured: true,
    price: "₹15,000 (+ ₹3,600 for optional accommodation)",
    contact: "020-25580085",
    email: "info.cfol@ftii.ac.in",
    eligibility: "Age 18+, 12th pass (10th in exceptional cases)",
    mode: "Offline",
    applicationDeadline: "20 August 2025, 6:00 PM IST",
    selection: "First-Come, First-Served basis",
    capacity: "Maximum 16 participants (Minimum 13 required)",
    language: "English & Hindi",
    certification: "FTII Certificate + completed stop-motion film",
    venue: "Animation Dept., FTII Main Campus, Law College Road, Pune – 411004",
    duration: "10 days (excluding Sundays)",
    courseDirector: "Mandar Digrajkar (HoD, TV Graphics, FTII Pune)",
    includes: "Completed stop-motion film + FTII Certificate",
  },
  {
    id: 28,
    title: "FTII Pune: Foundation Course in Filmmaking (in collaboration with Arthouse Film Academy, Goa)",
    trainer: "Avinash Roy & Jasmine Kaur Roy",
    institution: "Film and Television Institute of India (FTII)",
    location: "Saligao, Goa",
    state: "Goa",
    date: "07–27 September 2025",
    time: "10 AM – 5 PM (lunch: 1–2 PM)",
    description:
      "🎬 Learn the complete art & craft of filmmaking with FTII in collaboration with Arthouse Film Academy, Goa! This comprehensive 20-day foundation course covers screenwriting, film grammar, direction, cinematography, sound design, and post-production. Create short films from ideation to execution under guidance of National Award-winning FTII alumni filmmakers.",
    image: "/images/acting-workshop.png",
    registrationLink: "https://ftii.ac.in/p/vtwa/foundation-course-in-filmmaking-in-goa-07-27-september-2025",
    featured: true,
    price: "₹39,000 (excluding food & accommodation)",
    contact: "020-25580085",
    email: "info.cfol@ftii.ac.in",
    eligibility: "Age 18+, 12th pass (10th in exceptional cases)",
    mode: "Offline",
    venue: "Saligao, Goa (in collaboration with Arthouse Film Academy)",
    duration: "20 days",
    courseDirector: "Avinash Roy & Jasmine Kaur Roy (National Award-winning filmmakers, FTII alumni)",
    includes: "Completed short films + FTII Certificate + practical workshops",
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
