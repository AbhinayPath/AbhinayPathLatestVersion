"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Search, Filter, MapPin, Calendar } from "lucide-react"
import AuditionBanner from "@/components/audition-banner"

export default function AuditionsContent() {
  const [auditions, setAuditions] = useState([])
  const [filters, setFilters] = useState({
  
    search: "",
    city: "all",
    state: "all",
    category: "all",
    experience: "all",
  })
  const [loader,setLoader] = useState(true)

  

  useEffect(() => {
    async function fetchAuditions() {
      try {
        setLoader(true)
        const response = await fetch("/api/opportunities")
        if (!response.ok) {
          throw new Error("Failed to fetch auditions")
        }
        const { opportunities } = await response.json()
        setAuditions(opportunities || [])
        setLoader(false)
      } catch (error) {
        console.error("Error fetching auditions:", error)
        setLoader(false)
      }
    }

    fetchAuditions()
  }, [])

  const filteredAuditions = auditions.filter((audition) => {
    return (
      (filters.search === "" ||
        audition.title.toLowerCase().includes(filters.search.toLowerCase()) ||
        audition.description.toLowerCase().includes(filters.search.toLowerCase())) &&
      (filters.city === "all" || filters.city === "" || audition.city === filters.city) &&
      (filters.state === "all" || filters.state === "" || audition.state === filters.state) &&
      (filters.category === "all" || filters.category === "" || audition.type === filters.category) &&
      (filters.experience === "all" || filters.experience === "" || audition.experience_required === filters.experience)
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

  const states = [...new Set(auditions.map((a) => (a.state ?? "").trim()).filter(Boolean))].sort()
  const categories = [...new Set(auditions.map((a) => (a.type ?? "").trim()).filter(Boolean))].sort()
  const cities = [...new Set(auditions.map((a) => (a.city ?? "").trim()).filter(Boolean))].sort()
  const experienceLevels = [...new Set(auditions.map((a) => (a.experience_required ?? "").trim()).filter(Boolean))].sort()

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
      {!loader ? <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredAuditions.length > 0 ? (
          filteredAuditions.map((audition) => (
            <div
              key={audition.id}
              className="bg-white rounded-lg   overflow-hidden flex flex-col h-full card-hover"
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
              <div className="p-6 flex-1 flex flex-col space-y-3">
                {/* Meta: Type and Location */}
                <div className="flex items-center gap-2 text-sm text-gray-600 flex-wrap mb-3">
                  {audition.type && (
                    <Badge variant="secondary" className="capitalize text-xs">
                      {String(audition.type).replace("-", " ")}
                    </Badge>
                  )}
                  {(audition.location_mode === "city" ? audition.city : audition.location_mode === "online") && (
                    <>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        {audition.location_mode === "city" ? (
                          <>
                            <MapPin className="h-3 w-3 flex-shrink-0" />
                            <span className="truncate">{audition.city || "City"}</span>
                          </>
                        ) : (
                          <>
                            {/* Globe icon intentionally omitted to keep imports minimal */}
                            Online
                          </>
                        )}
                      </span>
                    </>
                  )}
                </div>

                {/* Title */}
                <h3 className="font-playfair text-xl font-bold text-gray-900 break-words mb-2">
                  {audition.title || "Opportunity Title"}
                </h3>

                {/* Deadline and Venue/Platform */}
                <div className="flex items-start gap-2 text-sm text-gray-600 flex-wrap mb-3">
                  {audition.deadline && (
                    <>
                      <Calendar className="h-4 w-4 flex-shrink-0" />
                      <span className="break-words">Deadline: {new Date(audition.deadline).toLocaleDateString()}</span>
                    </>
                  )}
                  {audition.location_mode === "city" && audition.venue && (
                    <>
                      <span className="hidden sm:inline">•</span>
                      <span className="break-words w-full sm:w-auto">{audition.venue}</span>
                    </>
                  )}
                  {audition.location_mode === "online" && audition.platform && (
                    <>
                      <span className="hidden sm:inline">•</span>
                      <span className="break-words w-full sm:w-auto">{audition.platform}</span>
                    </>
                  )}
                </div>

                {/* Description snippet */}
                {audition.description && (
                  <p className="text-gray-700 line-clamp-3 text-sm break-words mb-3">
                    {audition.description}
                  </p>
                )}

                {/* Requirements */}
                {(audition.gender_preference !== "any" || audition.age_min || audition.age_max || (Array.isArray(audition.languages) && audition.languages.length > 0) || audition.experience_required) && (
                  <div className="space-y-2 pt-3">
                    <h4 className="text-sm font-semibold text-gray-900">Requirements</h4>
                    <div className="flex flex-wrap gap-2">
                      {audition.gender_preference && audition.gender_preference !== "any" && (
                        <Badge variant="outline" className="capitalize text-xs">
                          {String(audition.gender_preference).replace("-", " ")}
                        </Badge>
                      )}
                      {(audition.age_min || audition.age_max) && (
                        <Badge variant="outline" className="text-xs">
                          Age: {audition.age_min || "?"}–{audition.age_max || "?"}
                        </Badge>
                      )}
                      {Array.isArray(audition.languages) && audition.languages.map((lang: string) => (
                        <Badge key={lang} variant="outline" className="text-xs">
                          {lang}
                        </Badge>
                      ))}
                      {audition.experience_required && (
                        <Badge variant="outline" className="capitalize text-xs">
                          {audition.experience_required}
                        </Badge>
                      )}
                    </div>
                  </div>
                )}

                {/* Pay */}
                {(audition.pay_type || audition.pay_amount) && (
                  <div className="flex items-center gap-2 text-sm pt-3 text-gray-900 font-medium">
                    {/* Using text only to avoid adding new icon imports */}
                    <span>
                      {audition.pay_type === "not-specified" && "Not specified"}
                      {audition.pay_type === "free" && "Free"}
                      {audition.pay_type === "stipend" && (audition.pay_amount ? `Stipend: ₹${audition.pay_amount}` : "Stipend")}
                      {audition.pay_type === "paid" && (audition.pay_amount ? `Paid: ₹${audition.pay_amount}` : "Paid")}
                    </span>
                  </div>
                )}

                {/* CTA */}
                <div className="flex justify-end mt-auto pt-4">
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
      </div> : <div className="text-center py-12">Loading auditions...</div>}
    </div>
  )
}
