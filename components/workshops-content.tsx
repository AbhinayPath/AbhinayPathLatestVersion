"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, MapPin, Calendar, Filter, Clock, CheckCircle } from "lucide-react"

// Verified workshops data
const workshops = [
  {
    id: 1,
    title: "NSD TIE Summer Workshop (Tripura)",
    trainer: "NSD (TIE Wing)",
    institution: "National School of Drama",
    location: "Tripura",
    state: "Tripura",
    date: "17 May – 7 June 2025",
    time: "9 AM – 2 PM",
    description:
      "Organized by NSD (TIE Wing) + SCERT, Govt. of Tripura. Located at Nazrul Kalakshetra + Schools across Tripura. For children aged 8–16 years. Forms available from 10th May – First come, first serve basis.",
    image: "/placeholder.svg?height=300&width=500&text=NSD+TIE+Workshop",
    registrationLink: "mailto:nsdtripura@gmail.com",
    featured: true,
    price: "Free",
    contact: "0381-2328797 / 9436511935",
    email: "nsdtripura@gmail.com",
    ageGroup: "8–16 years",
  },
  {
    id: 2,
    title: "NSD 3-Month Theatre-in-Education Certificate Course (Delhi)",
    trainer: "NSD TIE Company",
    institution: "National School of Drama",
    location: "New Delhi",
    state: "Delhi",
    date: "2 June – 31 August 2025",
    time: "Batch 1: 10 AM – 1 PM, Batch 2: 2 PM – 5 PM (Wednesday to Sunday)",
    description:
      "Eligibility: Graduate (any stream), Age 21+ (as of May 1, 2025), 3 years theatre or child-focused work, Proficient in Hindi/English, Physically & mentally fit. Application deadline: 25 May 2025, 6 PM.",
    image: "/placeholder.svg?height=300&width=500&text=NSD+Certificate+Course",
    registrationLink: "https://nsd.gov.in",
    featured: true,
    price: "₹35,000",
    contact: "011-23389054 / 23031137",
    email: "nsdtie@gmail.com",
    eligibility: "Graduate, Age 21+, 3 years experience",
  },
  {
    id: 3,
    title: "'Anatomy of a Scene' – Acting Workshop (Mumbai)",
    trainer: "Manas Gupta",
    institution: "FTII Alumnus",
    location: "Mumbai",
    state: "Maharashtra",
    date: "1 – 13 June 2025",
    time: "11 AM – 2 PM",
    description:
      "Curated by Manas Gupta (FTII Alumnus). Located at Abhyaas Manch, Aram Nagar, Mumbai. What You'll Learn: Meisner & Uta Hagen Techniques, Scene analysis & improvisation, Final recorded performance, Guest lecture by Himanshu Prajapati (FTII).",
    image: "/placeholder.svg?height=300&width=500&text=Anatomy+of+a+Scene",
    registrationLink: "tel:+918652722682",
    featured: true,
    price: "Contact for details",
    contact: "+91 8652722682",
    instagram: "@anatomy_of_a_scene",
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
    image: "/placeholder.svg?height=300&width=500&text=NSD+Drama+in+Education",
    registrationLink: "https://nsd.gov.in",
    featured: true,
    price: "₹35,000",
    contact: "011-23389054, 23031137",
    email: "nsdtiegmail.com",
    tags: "#NSD #VerifiedWorkshop #TheatreEducation #DramaInEducation",
  },
  {
    id: 5,
    title: "Educational Theatre National Workshop @ Mysore",
    trainer: "Rajneesh Bisht",
    institution: "Indian Institute of Educational Theatre",
    location: "Mysore",
    state: "Karnataka",
    date: "June 23 - July 2, 2025",
    time: "9:00 AM - 6:00 PM",
    description:
      "Step into a transformative journey where theatre meets education! Led by renowned theatre director and writer Rajneesh Bisht, and mentored by the visionary theatre stalwart Prasanna, this 10-day intensive workshop is designed for actors, educators, facilitators, and all those passionate about using theatre as a tool for learning and social change.",
    image: "/placeholder.svg?height=300&width=500&text=Educational+Theatre",
    registrationLink: "https://indiantheatrefoundation.org",
    featured: true,
    price: "₹16,000 (includes food & accommodation)",
    contact: "9845605012 / 9448871815",
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
    image: "/placeholder.svg?height=300&width=500&text=Applied+Theatre",
    registrationLink: "https://education.appliedtheatreindia.com/l/4fc92006ec",
    featured: true,
    price: "Contact for details",
    contact: "Via website",
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
  })

  const filteredWorkshops = workshops.filter((workshop) => {
    return (
      (filters.search === "" ||
        workshop.title.toLowerCase().includes(filters.search.toLowerCase()) ||
        workshop.description.toLowerCase().includes(filters.search.toLowerCase())) &&
      (filters.city === "" || workshop.location === filters.city) &&
      (filters.state === "" || workshop.state === filters.state) &&
      (filters.trainer === "" || workshop.trainer === filters.trainer) &&
      (filters.institution === "" || workshop.institution === filters.institution)
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
    })
  }

  // Featured workshops
  const featuredWorkshops = workshops.filter((workshop) => workshop.featured)

  return (
    <div className="container py-12">
      <div className="max-w-3xl mx-auto text-center mb-12">
        <h1 className="font-playfair text-4xl font-bold mb-4">Workshops & Training</h1>
        <p className="text-gray-600">
          Enhance your skills with workshops and training sessions led by renowned theater professionals.
        </p>
      </div>

      {/* Filters */}
      <div className="mb-8 p-6 bg-gray-50 rounded-xl">
        <div className="flex items-center gap-2 mb-4">
          <Filter className="h-5 w-5 text-primary" />
          <h2 className="font-playfair text-xl font-bold">Filter Workshops</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
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
        </div>
        {(filters.search || filters.city || filters.state || filters.trainer || filters.institution) && (
          <div className="mt-4 flex justify-end">
            <Button variant="outline" size="sm" onClick={clearFilters} className="rounded-full">
              Clear Filters
            </Button>
          </div>
        )}
      </div>

      {/* Featured Workshops */}
      {featuredWorkshops.length > 0 &&
        !filters.search &&
        !filters.city &&
        !filters.state &&
        !filters.trainer &&
        !filters.institution && (
          <div className="mb-12">
            <h2 className="font-playfair text-2xl font-bold mb-6">Featured Workshops</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {featuredWorkshops.map((workshop) => (
                <div key={workshop.id} className="theater-card flex flex-col h-full border-secondary">
                  <div className="relative h-48 w-full">
                    <div className="absolute top-2 right-2 z-10 bg-secondary text-black text-xs font-bold px-2 py-1 rounded-full flex items-center gap-1">
                      <CheckCircle className="h-3 w-3" />
                      Featured
                    </div>
                    <Image
                      src={workshop.image || "/placeholder.svg"}
                      alt={workshop.title}
                      fill
                      className="object-cover rounded-t-xl"
                    />
                  </div>
                  <div className="p-6 flex-1 flex flex-col">
                    <h3 className="font-playfair text-xl font-bold mb-2">{workshop.title}</h3>
                    <p className="text-primary font-medium text-sm mb-1">By {workshop.trainer}</p>
                    <p className="text-gray-500 text-sm mb-3">{workshop.institution}</p>
                    <div className="flex justify-between items-start mb-3">
                      <span className="flex items-center text-sm text-gray-500">
                        <MapPin className="h-3 w-3 mr-1" />
                        {workshop.location}, {workshop.state}
                      </span>
                    </div>
                    <p className="text-gray-600 mb-4 flex-1 line-clamp-3">{workshop.description}</p>
                    <div className="flex flex-col gap-2 mb-4">
                      <div className="flex items-center text-sm">
                        <Calendar className="h-3 w-3 mr-1 text-gray-500" />
                        <span className="text-gray-700">{workshop.date}</span>
                      </div>
                      <div className="flex items-center text-sm">
                        <Clock className="h-3 w-3 mr-1 text-gray-500" />
                        <span className="text-gray-700">{workshop.time}</span>
                      </div>
                      <div className="flex items-center text-sm font-medium">
                        <span className="text-primary">{workshop.price}</span>
                      </div>
                    </div>
                    <div className="flex justify-between mt-auto pt-4 border-t">
                      <Link href={`/workshops/${workshop.id}`}>
                        <Button variant="outline" size="sm" className="rounded-full">
                          More Details
                        </Button>
                      </Link>
                      <Link href={workshop.registrationLink} target="_blank">
                        <Button size="sm" className="rounded-full">
                          Register Now
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      {/* Workshop Cards (Filtered) */}
      {filteredWorkshops.length > 0 &&
      (filters.search || filters.city || filters.state || filters.trainer || filters.institution) ? (
        <div>
          <h2 className="font-playfair text-2xl font-bold mb-6">
            {filteredWorkshops.length} Workshop{filteredWorkshops.length !== 1 ? "s" : ""} Found
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredWorkshops.map((workshop) => (
              <div
                key={workshop.id}
                className={`theater-card flex flex-col h-full ${workshop.featured ? "border-secondary" : ""}`}
              >
                <div className="relative h-48 w-full">
                  <div className="absolute top-2 right-2 z-10 bg-secondary text-black text-xs font-bold px-2 py-1 rounded-full flex items-center gap-1">
                    <CheckCircle className="h-3 w-3" />
                    Verified
                  </div>
                  <Image
                    src={workshop.image || "/placeholder.svg"}
                    alt={workshop.title}
                    fill
                    className="object-cover rounded-t-xl"
                  />
                </div>
                <div className="p-6 flex-1 flex flex-col">
                  <h3 className="font-playfair text-xl font-bold mb-2">{workshop.title}</h3>
                  <p className="text-primary font-medium text-sm mb-1">By {workshop.trainer}</p>
                  <p className="text-gray-500 text-sm mb-3">{workshop.institution}</p>
                  <div className="flex justify-between items-start mb-3">
                    <span className="flex items-center text-sm text-gray-500">
                      <MapPin className="h-3 w-3 mr-1" />
                      {workshop.location}, {workshop.state}
                    </span>
                  </div>
                  <p className="text-gray-600 mb-4 flex-1 line-clamp-3">{workshop.description}</p>
                  <div className="flex flex-col gap-2 mb-4">
                    <div className="flex items-center text-sm">
                      <Calendar className="h-3 w-3 mr-1 text-gray-500" />
                      <span className="text-gray-700">{workshop.date}</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <Clock className="h-3 w-3 mr-1 text-gray-500" />
                      <span className="text-gray-700">{workshop.time}</span>
                    </div>
                    <div className="flex items-center text-sm font-medium">
                      <span className="text-primary">{workshop.price}</span>
                    </div>
                  </div>
                  <div className="flex justify-between mt-auto pt-4 border-t">
                    <Link href={`/workshops/${workshop.id}`}>
                      <Button variant="outline" size="sm" className="rounded-full">
                        More Details
                      </Button>
                    </Link>
                    <Link href={workshop.registrationLink} target="_blank">
                      <Button size="sm" className="rounded-full">
                        Register Now
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : filters.search !== "" && filteredWorkshops.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 mb-4">No workshops match your current filters.</p>
          <Button onClick={clearFilters} variant="outline" className="rounded-full">
            Clear Filters
          </Button>
        </div>
      ) : null}

      {/* All Workshops (when no filters are applied and no featured section) */}
      {!filters.search &&
        !filters.city &&
        !filters.state &&
        !filters.trainer &&
        !filters.institution &&
        featuredWorkshops.length === 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {workshops.map((workshop) => (
              <div key={workshop.id} className="theater-card flex flex-col h-full">
                <div className="relative h-48 w-full">
                  <div className="absolute top-2 right-2 z-10 bg-secondary text-black text-xs font-bold px-2 py-1 rounded-full flex items-center gap-1">
                    <CheckCircle className="h-3 w-3" />
                    Verified
                  </div>
                  <Image
                    src={workshop.image || "/placeholder.svg"}
                    alt={workshop.title}
                    fill
                    className="object-cover rounded-t-xl"
                  />
                </div>
                <div className="p-6 flex-1 flex flex-col">
                  <h3 className="font-playfair text-xl font-bold mb-2">{workshop.title}</h3>
                  <p className="text-primary font-medium text-sm mb-1">By {workshop.trainer}</p>
                  <p className="text-gray-500 text-sm mb-3">{workshop.institution}</p>
                  <div className="flex justify-between items-start mb-3">
                    <span className="flex items-center text-sm text-gray-500">
                      <MapPin className="h-3 w-3 mr-1" />
                      {workshop.location}, {workshop.state}
                    </span>
                  </div>
                  <p className="text-gray-600 mb-4 flex-1 line-clamp-3">{workshop.description}</p>
                  <div className="flex flex-col gap-2 mb-4">
                    <div className="flex items-center text-sm">
                      <Calendar className="h-3 w-3 mr-1 text-gray-500" />
                      <span className="text-gray-700">{workshop.date}</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <Clock className="h-3 w-3 mr-1 text-gray-500" />
                      <span className="text-gray-700">{workshop.time}</span>
                    </div>
                    <div className="flex items-center text-sm font-medium">
                      <span className="text-primary">{workshop.price}</span>
                    </div>
                  </div>
                  <div className="flex justify-between mt-auto pt-4 border-t">
                    <Link href={`/workshops/${workshop.id}`}>
                      <Button variant="outline" size="sm" className="rounded-full">
                        More Details
                      </Button>
                    </Link>
                    <Link href={workshop.registrationLink} target="_blank">
                      <Button size="sm" className="rounded-full">
                        Register Now
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
    </div>
  )
}
