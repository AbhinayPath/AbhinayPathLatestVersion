"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, MapPin, Calendar, Filter, Clock } from "lucide-react"

// Sample workshops data
const workshops = [
  {
    id: 1,
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
    id: 2,
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
  {
    id: 3,
    title: "Acting Workshop with Bollywood Casting Director Shiv Chauhan",
    trainer: "Shiv Chauhan",
    institution: "Bangalore Hindi Theatre",
    location: "Bangalore",
    state: "Karnataka",
    date: "May 24-25, 2023",
    time: "10:00 AM - 4:00 PM",
    description:
      "Acclaimed Bollywood Casting Director Shiv Chauhan (Stree, Emergency, Aspirants, Kota Factory) is coming to Bangalore to conduct his acting workshop in collaboration with the Bangalore Hindi Theatre community. Use the referral code Amit Aggarwal to avail 5% discount on the course.",
    image: "/placeholder.svg?height=300&width=500&text=Acting+Workshop",
    registrationLink: "tel:8076410925",
    featured: true,
    price: "Contact for details",
    contact: "8076410925",
  },
  {
    id: 4,
    title: "Energy Clowning Session",
    trainer: "Rupesh Tillu",
    institution: "Clown Academy",
    location: "Mumbai",
    state: "Maharashtra",
    date: "June 10-12, 2023",
    time: "10:00 AM - 5:00 PM",
    description:
      "Explore the art of clowning and physical comedy in this intensive workshop led by internationally acclaimed clown performer.",
    image: "/placeholder.svg?height=300&width=500&text=Clowning",
    registrationLink: "https://example.com/register",
    featured: false,
    price: "₹5,000",
  },
  {
    id: 5,
    title: "Voice & Speech Masterclass",
    trainer: "Arundhati Nag",
    institution: "Rangashankara",
    location: "Bangalore",
    state: "Karnataka",
    date: "June 15-16, 2023",
    time: "11:00 AM - 4:00 PM",
    description:
      "Learn voice modulation, projection, and speech techniques for theatrical performances from a theater legend.",
    image: "/placeholder.svg?height=300&width=500&text=Voice Workshop",
    registrationLink: "https://example.com/register",
    featured: false,
    price: "₹3,500",
  },
  {
    id: 6,
    title: "Method Acting Intensive",
    trainer: "Naseeruddin Shah",
    institution: "Motley Theatre Group",
    location: "Delhi",
    state: "Delhi",
    date: "June 20-25, 2023",
    time: "9:00 AM - 6:00 PM",
    description:
      "Deep dive into method acting with one of India's most respected actors in this week-long intensive workshop.",
    image: "/placeholder.svg?height=300&width=500&text=Method Acting",
    registrationLink: "https://example.com/register",
    featured: false,
    price: "₹10,000",
  },
  {
    id: 7,
    title: "Physical Theater Workshop",
    trainer: "Sankar Venkateswaran",
    institution: "Theatre Roots & Wings",
    location: "Kochi",
    state: "Kerala",
    date: "July 5-8, 2023",
    time: "10:00 AM - 5:00 PM",
    description:
      "Explore movement-based theater techniques and body awareness for performers in this immersive workshop.",
    image: "/placeholder.svg?height=300&width=500&text=Physical Theater",
    registrationLink: "https://example.com/register",
    featured: false,
    price: "₹4,500",
  },
  {
    id: 8,
    title: "Playwriting Masterclass",
    trainer: "Mahesh Dattani",
    institution: "Writers' Guild",
    location: "Chennai",
    state: "Tamil Nadu",
    date: "July 12-14, 2023",
    time: "2:00 PM - 6:00 PM",
    description:
      "Learn the craft of playwriting from one of India's most celebrated playwrights in this three-day workshop.",
    image: "/placeholder.svg?height=300&width=500&text=Playwriting",
    registrationLink: "https://example.com/register",
    featured: false,
    price: "₹3,000",
  },
  {
    id: 9,
    title: "Improvisation Techniques",
    trainer: "Sheeba Chaddha",
    institution: "Improv Theatre Mumbai",
    location: "Mumbai",
    state: "Maharashtra",
    date: "July 20-22, 2023",
    time: "11:00 AM - 4:00 PM",
    description:
      "Develop spontaneity and quick thinking through improvisation exercises and games in this fun workshop.",
    image: "/placeholder.svg?height=300&width=500&text=Improv",
    registrationLink: "https://example.com/register",
    featured: false,
    price: "₹2,500",
  },
]

// Get unique states, cities, and trainers for filters
const states = [...new Set(workshops.map((workshop) => workshop.state))].sort()
const cities = [...new Set(workshops.map((workshop) => workshop.location))].sort()
const trainers = [...new Set(workshops.map((workshop) => workshop.trainer))].sort()
const institutions = [...new Set(workshops.map((workshop) => workshop.institution))].sort()

export default function WorkshopsPage() {
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

      {/* Featured Workshops */}
      {featuredWorkshops.length > 0 && (
        <div className="mb-12">
          <h2 className="font-playfair text-2xl font-bold mb-6">Featured Workshops</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredWorkshops.map((workshop) => (
              <div key={workshop.id} className="theater-card flex flex-col h-full border-secondary">
                <div className="relative h-48 w-full">
                  <div className="absolute top-2 right-2 z-10 bg-secondary text-black text-xs font-bold px-2 py-1 rounded-full">
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
                  <p className="text-gray-600 mb-4 flex-1">{workshop.description}</p>
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
                    {workshop.contact && (
                      <div className="flex items-center text-sm">
                        <span className="text-gray-700">Contact: {workshop.contact}</span>
                      </div>
                    )}
                  </div>
                  <div className="flex justify-end mt-auto pt-4 border-t">
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

      {/* Workshop Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredWorkshops.length > 0 ? (
          filteredWorkshops.map((workshop) => (
            <div
              key={workshop.id}
              className={`theater-card flex flex-col h-full ${workshop.featured ? "border-secondary" : ""}`}
            >
              <div className="relative h-48 w-full">
                {workshop.featured && (
                  <div className="absolute top-2 right-2 z-10 bg-secondary text-black text-xs font-bold px-2 py-1 rounded-full">
                    Featured
                  </div>
                )}
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
                <p className="text-gray-600 mb-4 flex-1">{workshop.description}</p>
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
                <div className="flex justify-end mt-auto pt-4 border-t">
                  <Link href={workshop.registrationLink} target="_blank">
                    <Button size="sm" className="rounded-full">
                      Register Now
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full text-center py-12">
            <p className="text-gray-500 mb-4">No workshops match your current filters.</p>
            <Button onClick={clearFilters} variant="outline" className="rounded-full">
              Clear Filters
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
