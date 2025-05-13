"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Filter, Mail } from "lucide-react"

// Sample audition data
const auditions = [
  {
    id: 1,
    title: "BRAND: PROHANCE - Doctors Character",
    type: "Commercial",
    location: "Bangalore",
    state: "Karnataka",
    date: "May 16/19/20, 2023",
    director: "Cast Me Models",
    description:
      "Looking for male and female models who speak really good English for doctor's character. Age: 30-45. Medium: Digital. Usage: Social Media.",
    company: "Cast Me Models",
    companyLink: "tel:8867313322",
    contact: "8867313322",
    contactType: "phone",
    experience: "All Levels",
    verified: true,
    image: "/placeholder.svg?height=300&width=500&text=PROHANCE",
  },
  {
    id: 2,
    title: "Educational App - Corporate Teacher Character",
    type: "Corporate",
    location: "Mumbai",
    state: "Maharashtra",
    date: "Dates to be confirmed",
    director: "Snowbell Entertainment",
    description:
      "Looking for Mumbai based male talents with fluent English for corporate video. Need male as corporate teacher character (35-50 years). Perfect fluent in English. Shoot location - Andheri.",
    company: "Snowbell Entertainment",
    companyLink: "https://www.instagram.com/snowbell.entertainment?igsh=dmUwMTVpcnBzOG9z",
    contact: "9619701974",
    contactType: "whatsapp",
    experience: "Intermediate",
    verified: true,
    image: "/placeholder.svg?height=300&width=500&text=Educational+App",
  },
  {
    id: 3,
    title: "Contemporary Play - 'Echoes'",
    type: "Theater",
    location: "Mumbai",
    state: "Maharashtra",
    date: "May 15, 2023",
    director: "Rajat Kapoor",
    description: "Seeking actors for lead and supporting roles in a contemporary drama exploring urban isolation.",
    company: "Aadyam Theatre Group",
    companyLink: "https://instagram.com/aadyamtheatre",
    contact: "casting@aadyamtheatre.com",
    contactType: "email",
    experience: "Intermediate",
    verified: true,
    image: "/placeholder.svg?height=300&width=500&text=Echoes",
  },
  {
    id: 4,
    title: "Feature Film - 'The Last Mile'",
    type: "Film",
    location: "Delhi",
    state: "Delhi",
    date: "May 20, 2023",
    director: "Anurag Kashyap",
    description: "Casting call for an indie drama set in North India. Multiple roles available.",
    company: "Phantom Films",
    companyLink: "https://phantom.film",
    contact: "casting@phantomfilms.com",
    contactType: "email",
    experience: "All Levels",
    verified: true,
    image: "/placeholder.svg?height=300&width=500&text=Last Mile",
  },
  {
    id: 5,
    title: "Web Series - 'Urban Tales'",
    type: "Web",
    location: "Bangalore",
    state: "Karnataka",
    date: "May 25, 2023",
    director: "Zoya Akhtar",
    description: "Looking for fresh faces for an anthology series exploring city life stories.",
    company: "Tiger Baby Films",
    companyLink: "https://instagram.com/tigerbabyfilms",
    contact: "casting@tigerbaby.com",
    contactType: "email",
    experience: "Beginner",
    verified: true,
    image: "/placeholder.svg?height=300&width=500&text=Urban Tales",
  },
  {
    id: 6,
    title: "Period Drama - 'The Forgotten Empire'",
    type: "Theater",
    location: "Kolkata",
    state: "West Bengal",
    date: "June 5, 2023",
    director: "Feroz Abbas Khan",
    description: "Casting for a large-scale historical production set in medieval India.",
    company: "Prithvi Theatre",
    companyLink: "https://prithvitheatre.org",
    contact: "casting@prithvitheatre.org",
    contactType: "email",
    experience: "Advanced",
    verified: true,
    image: "/placeholder.svg?height=300&width=500&text=Forgotten Empire",
  },
  {
    id: 7,
    title: "Comedy Film - 'Family Circus'",
    type: "Film",
    location: "Chennai",
    state: "Tamil Nadu",
    date: "June 10, 2023",
    director: "Rajkumar Hirani",
    description: "Seeking actors with strong comedic timing for a family-oriented comedy film.",
    company: "Vinod Chopra Films",
    companyLink: "https://vinodchoprafilms.com",
    contact: "casting@vcf.com",
    contactType: "email",
    experience: "Intermediate",
    verified: true,
    image: "/placeholder.svg?height=300&width=500&text=Family Circus",
  },
  {
    id: 8,
    title: "Experimental Theater - 'Fragments'",
    type: "Theater",
    location: "Pune",
    state: "Maharashtra",
    date: "June 15, 2023",
    director: "Anamika Haksar",
    description: "Seeking performers for an experimental theater piece combining movement and text.",
    company: "Experimental Theatre Foundation",
    companyLink: "https://etf.org",
    contact: "casting@etf.org",
    contactType: "email",
    experience: "All Levels",
    verified: true,
    image: "/placeholder.svg?height=300&width=500&text=Fragments",
  },
  {
    id: 9,
    title: "Crime Thriller Series - 'Undercover'",
    type: "Web",
    location: "Hyderabad",
    state: "Telangana",
    date: "June 20, 2023",
    director: "Sriram Raghavan",
    description: "Casting multiple roles for a gritty crime thriller web series.",
    company: "Applause Entertainment",
    companyLink: "https://applause.com",
    contact: "casting@applause.com",
    contactType: "email",
    experience: "Intermediate",
    verified: true,
    image: "/placeholder.svg?height=300&width=500&text=Undercover",
  },
]

// Get unique states and categories for filters
const states = [...new Set(auditions.map((audition) => audition.state))].sort()
const categories = [...new Set(auditions.map((audition) => audition.type))].sort()
const cities = [...new Set(auditions.map((audition) => audition.location))].sort()
const experienceLevels = [...new Set(auditions.map((audition) => audition.experience))].sort()

export default function AuditionsPage() {
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
    })
  }

  return (
    <div className="container py-12">
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
        {(filters.search || filters.city || filters.state || filters.category || filters.experience) && (
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
                <Image src={audition.image || "/placeholder.svg"} alt={audition.title} fill className="object-cover" />
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
                <h3 className="font-playfair text-xl font-bold mb-2">{audition.title}</h3>
                <p className="text-gray-600 mb-4 flex-1">{audition.description}</p>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center text-sm text-gray-500">
                    <span className="font-medium text-gray-700 w-20">Director:</span>
                    <span>{audition.director}</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-500">
                    <span className="font-medium text-gray-700 w-20">Location:</span>
                    <span>
                      {audition.location}, {audition.state}
                    </span>
                  </div>
                  <div className="flex items-center text-sm text-gray-500">
                    <span className="font-medium text-gray-700 w-20">Date:</span>
                    <span>{audition.date}</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-500">
                    <span className="font-medium text-gray-700 w-20">Company:</span>
                    <a
                      href={audition.companyLink}
                      className="text-primary hover:underline"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {audition.company}
                    </a>
                  </div>
                  <div className="flex items-center text-sm text-gray-500">
                    <span className="font-medium text-gray-700 w-20">Contact:</span>
                    <div className="flex items-center">
                      <Mail className="h-3 w-3 mr-1 text-primary" />
                      {audition.contactType === "email" ? (
                        <a href={`mailto:${audition.contact}`} className="text-primary hover:underline">
                          {audition.contact}
                        </a>
                      ) : audition.contactType === "whatsapp" ? (
                        <a href={`https://wa.me/${audition.contact}`} className="text-primary hover:underline">
                          {audition.contact}
                        </a>
                      ) : (
                        <a href={`tel:${audition.contact}`} className="text-primary hover:underline">
                          {audition.contact}
                        </a>
                      )}
                    </div>
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
