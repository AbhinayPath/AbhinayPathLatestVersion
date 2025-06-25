"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Filter, MapPin, Calendar } from "lucide-react"
import AuditionBanner from "@/components/audition-banner"

// Verified audition data
const auditions = [
  {
    id: 3,
    title: "Audition for Hindi Comedy Play – Kalayan Theatre Group",
    type: "Theater",
    location: "Bangalore",
    state: "Karnataka",
    date: "Ongoing",
    director: "Kalayan Theatre Group",
    description:
      "Play Title: Kab Tak Rahein Kunware. Language: Hindi (must read Devanagari). Age Group: 25–35 yrs. Location: Koramangala, Bangalore. Rehearsals: Weekends, then weekday evenings closer to show. Show Dates: August/September 2025.",
    company: "Kalayan Theatre Group",
    companyLink: "tel:9663304790",
    contact: "Amit Aggarwal – 96633 04790",
    contactType: "phone",
    experience: "All Levels",
    verified: true,
    image: "/placeholder.svg?height=300&width=500&text=Hindi+Comedy+Play",
  },
  {
    id: 4,
    title: "CASTING CALL FOR A PLAY CALLED 'ONCE THERE WAS A WAY'",
    type: "Theater",
    location: "Bengaluru",
    state: "Karnataka",
    date: "Ongoing",
    director: "Theater Production",
    description:
      "Need artists who are based in Bengaluru (theatre actors). Male actor: age 21-25 (should know how to play a guitar). Male actor: age 30+. Female actor: age 30+. Male actor: age 50+. DM for more details.",
    company: "Theater Production",
    companyLink: "tel:+917330684137",
    contact: "+917330684137",
    contactType: "phone",
    experience: "All Levels",
    verified: true,
    image: "/placeholder.svg?height=300&width=500&text=Once+There+Was+A+Way",
  },
  {
    id: 5,
    title: "Lead Role Actress for Kannada Feature Film - Mute Character",
    type: "Film",
    location: "Bangalore",
    state: "Karnataka",
    date: "Ongoing",
    director: "CINECUBES",
    description:
      'We are looking for a lead role actress for our Kannada feature film (language is not a barrier). The character is of a mute girl. So, language is not a barrier. Facial expressions are the most important factors along with the ability to use a mute girl\'s sounds like "bhaaaah...", "mahhh..."',
    company: "CINECUBES",
    companyLink: "https://wa.me/919886028205",
    contact: "+91 9886028205 (WhatsApp)",
    contactType: "whatsapp",
    experience: "All Levels",
    verified: true,
    image: "/placeholder.svg?height=300&width=500&text=Kannada+Feature+Film",
  },
  {
    id: 6,
    title: "Casting Call for Web Series - 'Digital Nomads'",
    type: "Web Series",
    location: "Mumbai",
    state: "Maharashtra",
    date: "June 15-30, 2025",
    director: "Horizon Studios",
    description:
      "Casting for an upcoming web series about a group of digital nomads traveling across India while working remotely. Looking for diverse cast members who can portray tech professionals with different backgrounds and personalities.",
    company: "Horizon Studios",
    companyLink: "mailto:casting@horizonstudios.in",
    contact: "casting@horizonstudios.in",
    contactType: "email",
    experience: "Experienced",
    verified: true,
    image: "/placeholder.svg?height=300&width=500&text=Digital+Nomads+Web+Series",
  },
  {
    id: 8,
    title: "Requirement for Public Speaking Teacher",
    type: "Teaching",
    location: "Multiple Schools",
    state: "Karnataka",
    date: "Apply by June 27, 2025",
    director: "Educational Institution",
    description:
      "Seeking qualified public speaking teachers for multiple schools in Bangalore. Teaching commitment from July 2025 to February 2026. Classes once a month, 01:30 PM to 04:30 PM for grades 6 & 7 and 8 & 9. Lesson plans and teacher's guide will be provided. Paid assignment opportunity for actors, theatre practitioners, and educators.",
    company: "Educational Institution",
    companyLink: "https://wa.me/919632220405",
    contact: "9632220405 (WhatsApp)",
    contactType: "whatsapp",
    experience: "All Levels",
    verified: true,
    image: "/placeholder.svg?height=300&width=500&text=Public+Speaking+Teacher",
  },
  {
    id: 10,
    title: "NSD Hiring Theatre Artists (Grade B) - Sanskaar Rang Toli",
    type: "Job Opportunity",
    location: "New Delhi",
    state: "Delhi",
    date: "Apply: May 24 - June 23, 2025",
    director: "National School of Drama (NSD)",
    description:
      "Sanskaar Rang Toli (TIE Company), NSD, New Delhi is inviting online applications for 5 posts of Theatre Artist Grade B (working with children). Contractual position with competitive salary and growth opportunities.",
    company: "National School of Drama (NSD)",
    companyLink: "https://www.nsd.gov.in",
    contact: "Apply online at www.nsd.gov.in",
    contactType: "website",
    experience: "Experienced",
    verified: true,
    image: "/placeholder.svg?height=300&width=500&text=NSD+Theatre+Artists",
  },
  {
    id: 11,
    title: "Casting Call — Female Models for Lifestyle Café Shoot",
    type: "Modeling",
    location: "Mumbai",
    state: "Maharashtra",
    date: "Shoot: 2nd July 2025",
    director: "Commercial Production",
    description:
      "Looking for female models with a young, attractive, modern look for a lifestyle café shoot at Phoenix Palladium Mall, Lower Parel, Mumbai. Must have a chic and upper-class café vibe. Same-day cash payment of ₹7,000 (conveyance not included). Application deadline: 26th June 2025 (by late evening).",
    company: "Commercial Production",
    companyLink: "https://wa.me/918218864140",
    contact: "8218864140 (WhatsApp - Send portfolio/profile)",
    contactType: "whatsapp",
    experience: "All Levels",
    verified: true,
    image: "/placeholder.svg?height=300&width=500&text=Lifestyle+Café+Modeling+Shoot",
  },
]

// Get unique states and categories for filters
const states = [...new Set(auditions.map((audition) => audition.state))].sort()
const categories = [...new Set(auditions.map((audition) => audition.type))].sort()
const cities = [...new Set(auditions.map((audition) => audition.location))].sort()
const experienceLevels = [...new Set(auditions.map((audition) => audition.experience))].sort()

export default function AuditionsContent() {
  const [filters, setFilters] = useState({
    search: "",
    city: "all",
    state: "all",
    category: "all",
    experience: "all",
  })

  const filteredAuditions = auditions.filter((audition) => {
    return (
      (filters.search === "" ||
        audition.title.toLowerCase().includes(filters.search.toLowerCase()) ||
        audition.description.toLowerCase().includes(filters.search.toLowerCase())) &&
      (filters.city === "all" || filters.city === "" || audition.location === filters.city) &&
      (filters.state === "all" || filters.state === "" || audition.state === filters.state) &&
      (filters.category === "all" || filters.category === "" || audition.type === filters.category) &&
      (filters.experience === "all" || filters.experience === "" || audition.experience === filters.experience)
    )
  })

  const handleFilterChange = (key: string, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }))
  }

  const clearFilters = () => {
    setFilters({
      search: "",
      city: "all",
      state: "all",
      category: "all",
      experience: "all",
      state: "all",
      city: "all",
    })
  }

  return (
    <div className="container py-12">
      <AuditionBanner />
      <div className="max-w-3xl mx-auto text-center mb-12">
        <h1 className="font-playfair text-4xl font-bold mb-4">Audition Board</h1>
        <p className="text-gray-600">
          Discover verified audition opportunities across the country. Filter by location, type, and experience level to
          find your perfect role.
        </p>
      </div>

      {/* Filters */}
      <div className="mb-8 p-6 bg-gray-50 rounded-lg shadow-sm">
        <div className="flex items-center gap-2 mb-4">
          <Filter className="h-5 w-5 text-primary" />
          <h2 className="font-playfair text-xl font-bold">Filter Auditions</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              type="text"
              placeholder="Search by title or description"
              className="pl-10 rounded-md"
              value={filters.search}
              onChange={(e) => handleFilterChange("search", e.target.value)}
            />
          </div>

          <Select value={filters.city} onValueChange={(value) => handleFilterChange("city", value)}>
            <SelectTrigger className="rounded-md">
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
            <SelectTrigger className="rounded-md">
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

          <Select value={filters.category} onValueChange={(value) => handleFilterChange("category", value)}>
            <SelectTrigger className="rounded-md">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              {categories.map((category) => (
                <SelectItem key={category} value={category}>
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={filters.experience} onValueChange={(value) => handleFilterChange("experience", value)}>
            <SelectTrigger className="rounded-md">
              <SelectValue placeholder="Experience" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Levels</SelectItem>
              {experienceLevels.map((level) => (
                <SelectItem key={level} value={level}>
                  {level}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        {(filters.search ||
          filters.city !== "all" ||
          filters.state !== "all" ||
          filters.category !== "all" ||
          filters.experience !== "all") && (
          <div className="mt-4 flex justify-end">
            <Button variant="outline" size="sm" onClick={clearFilters} className="rounded-md">
              Clear Filters
            </Button>
          </div>
        )}
      </div>

      {/* Audition Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredAuditions.length > 0 ? (
          filteredAuditions.map((audition) => (
            <div
              key={audition.id}
              className="bg-white rounded-lg border border-gray-200 overflow-hidden flex flex-col h-full card-hover"
            >
              <div className="relative h-48 w-full">
                <Image src="/images/auditions-stage.png" alt={audition.title} fill className="object-cover" />
                {audition.verified && (
                  <div className="absolute top-2 right-2 badge-verified">
                    <span className="flex items-center">
                      <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                      Verified
                    </span>
                  </div>
                )}
              </div>
              <div className="p-6 flex-1 flex flex-col">
                <div className="flex justify-between items-start mb-3">
                  <span className="badge-primary">{audition.type}</span>
                  <span className="badge-outline">{audition.experience}</span>
                </div>
                <h3 className="font-playfair text-xl font-bold mb-4">{audition.title}</h3>

                <div className="space-y-3 mb-4 flex-1">
                  <div className="flex items-center text-sm text-gray-500">
                    <span className="font-medium text-gray-700 w-20">Production:</span>
                    <span>{audition.director}</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-500">
                    <span className="font-medium text-gray-700 w-20">Location:</span>
                    <span className="flex items-center">
                      <MapPin className="h-3 w-3 mr-1 text-gray-400" />
                      {audition.location}, {audition.state}
                    </span>
                  </div>
                  <div className="flex items-center text-sm text-gray-500">
                    <span className="font-medium text-gray-700 w-20">Dates:</span>
                    <span className="flex items-center">
                      <Calendar className="h-3 w-3 mr-1 text-gray-400" />
                      {audition.date}
                    </span>
                  </div>
                </div>

                <div className="flex justify-end mt-auto pt-4 border-t">
                  <Link href={`/auditions/${audition.id}`}>
                    <Button size="sm" className="rounded-md">
                      More Details
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full text-center py-12">
            <p className="text-gray-500 mb-4">No auditions match your current filters.</p>
            <Button onClick={clearFilters} variant="outline" className="rounded-md">
              Clear Filters
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
