"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, MapPin, Calendar, Filter, GraduationCap, Briefcase, ExternalLink, Wrench } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Sample recruitment data
const opportunities = [
  {
    id: 1,
    title: "NSD Admission 2023",
    type: "Admission",
    organization: "National School of Drama",
    location: "Delhi",
    state: "Delhi",
    deadline: "July 15, 2023",
    description:
      "Applications open for the 3-year diploma program in dramatic arts. Eligibility: Graduate degree with theater experience.",
    image: "/placeholder.svg?height=300&width=500&text=NSD",
    applicationLink: "https://nsd.gov.in/admissions",
    featured: true,
  },
  {
    id: 2,
    title: "FTII Acting Course",
    type: "Admission",
    organization: "Film and Television Institute of India",
    location: "Pune",
    state: "Maharashtra",
    deadline: "June 30, 2023",
    description: "Applications invited for the 2-year acting course. Selection through written test and interview.",
    image: "/placeholder.svg?height=300&width=500&text=FTII",
    applicationLink: "https://ftii.ac.in",
    featured: true,
  },
  {
    id: 3,
    title: "Theater Teacher",
    type: "Job",
    organization: "Prithvi Theatre",
    location: "Mumbai",
    state: "Maharashtra",
    deadline: "June 30, 2023",
    description:
      "Seeking experienced theater educator for regular workshops and classes. Minimum 5 years of teaching experience required.",
    image: "/placeholder.svg?height=300&width=500&text=Theater Teacher",
    applicationLink: "https://prithvitheatre.org/careers",
    featured: false,
  },
  {
    id: 4,
    title: "Assistant Group Leader",
    type: "Job",
    organization: "Aadyam Theatre Group",
    location: "Delhi",
    state: "Delhi",
    deadline: "June 25, 2023",
    description:
      "Opening for an assistant to help coordinate productions and workshops. Fresh graduates with theater background encouraged to apply.",
    image: "/placeholder.svg?height=300&width=500&text=Assistant",
    applicationLink: "https://aadyamtheatre.com/jobs",
    featured: false,
  },
  {
    id: 5,
    title: "SAC Drama School Admission",
    type: "Admission",
    organization: "Shri Ram Centre for Performing Arts",
    location: "Delhi",
    state: "Delhi",
    deadline: "July 20, 2023",
    description: "One-year diploma course in dramatic arts. Focus on acting, voice, movement, and theater history.",
    image: "/placeholder.svg?height=300&width=500&text=SAC",
    applicationLink: "https://srcpa.in",
    featured: true,
  },
  {
    id: 6,
    title: "Production Manager",
    type: "Job",
    organization: "Jagriti Theatre",
    location: "Bangalore",
    state: "Karnataka",
    deadline: "July 5, 2023",
    description:
      "Experienced production manager needed for upcoming season. Must have technical knowledge and team management skills.",
    image: "/placeholder.svg?height=300&width=500&text=Production Manager",
    applicationLink: "https://jagrititheatre.com/work-with-us",
    featured: false,
  },
  {
    id: 7,
    title: "Drama School Mumbai Admission",
    type: "Admission",
    organization: "Drama School Mumbai",
    location: "Mumbai",
    state: "Maharashtra",
    deadline: "August 10, 2023",
    description:
      "Applications open for the Post Graduate Diploma in Acting and Theatre-Making. Intensive one-year program.",
    image: "/placeholder.svg?height=300&width=500&text=DSM",
    applicationLink: "https://dramaschoolmumbai.in",
    featured: true,
  },
  {
    id: 8,
    title: "Lighting Designer",
    type: "Job",
    organization: "NCPA",
    location: "Mumbai",
    state: "Maharashtra",
    deadline: "July 15, 2023",
    description:
      "Seeking experienced lighting designer for upcoming productions. Portfolio and previous work experience required.",
    image: "/placeholder.svg?height=300&width=500&text=Lighting",
    applicationLink: "https://ncpamumbai.com/careers",
    featured: false,
  },
  {
    id: 9,
    title: "Drama Instructor",
    type: "Job",
    organization: "Rangashankara",
    location: "Bangalore",
    state: "Karnataka",
    deadline: "July 25, 2023",
    description: "Part-time drama instructor needed for children's theater program. Weekend availability required.",
    image: "/placeholder.svg?height=300&width=500&text=Drama Instructor",
    applicationLink: "https://rangashankara.org/jobs",
    featured: false,
  },
]

// Backstage opportunities data (moved from networking page)
const backstageOpportunities = [
  {
    id: 10,
    title: "Stage Manager",
    type: "Backstage",
    organization: "Prithvi Theatre",
    location: "Mumbai",
    state: "Maharashtra",
    deadline: "August 5, 2023",
    image: "/placeholder.svg?height=200&width=300&text=Stage Manager",
    description: "Experienced stage manager needed for upcoming season of productions.",
    requirements: ["3+ years experience", "Production management", "Team coordination"],
    applicationLink: "https://prithvitheatre.org/careers",
    featured: true,
  },
  {
    id: 11,
    title: "Lighting Designer",
    type: "Backstage",
    organization: "Jagriti Theatre",
    location: "Bangalore",
    state: "Karnataka",
    deadline: "July 30, 2023",
    image: "/placeholder.svg?height=200&width=300&text=Lighting",
    description: "Creative lighting designer for contemporary dance-drama production.",
    requirements: ["Portfolio required", "Experience with LED systems", "Programming skills"],
    applicationLink: "https://jagrititheatre.com/work-with-us",
    featured: false,
  },
  {
    id: 12,
    title: "Costume Assistant",
    type: "Backstage",
    organization: "Aadyam Productions",
    location: "Delhi",
    state: "Delhi",
    deadline: "August 15, 2023",
    image: "/placeholder.svg?height=200&width=300&text=Costume",
    description: "Assist the head costume designer for a period drama production.",
    requirements: ["Fashion background", "Sewing skills", "Historical knowledge"],
    applicationLink: "https://aadyamtheatre.com/jobs",
    featured: false,
  },
  {
    id: 13,
    title: "Set Construction",
    type: "Backstage",
    organization: "Rangashankara",
    location: "Bangalore",
    state: "Karnataka",
    deadline: "July 25, 2023",
    image: "/placeholder.svg?height=200&width=300&text=Set Construction",
    description: "Skilled carpenters and painters needed for elaborate set construction.",
    requirements: ["Carpentry skills", "Scenic painting", "Technical drawing"],
    applicationLink: "https://rangashankara.org/jobs",
    featured: false,
  },
  {
    id: 14,
    title: "Sound Engineer",
    type: "Backstage",
    organization: "NCPA",
    location: "Mumbai",
    state: "Maharashtra",
    deadline: "August 10, 2023",
    image: "/placeholder.svg?height=200&width=300&text=Sound",
    description: "Sound engineer with theater experience for prestigious venue.",
    requirements: ["Digital console experience", "Acoustic knowledge", "Live mixing"],
    applicationLink: "https://ncpamumbai.com/careers",
    featured: true,
  },
  {
    id: 15,
    title: "Production Assistant",
    type: "Backstage",
    organization: "Motley Theatre Group",
    location: "Multiple Cities",
    state: "Maharashtra",
    deadline: "July 20, 2023",
    image: "/placeholder.svg?height=200&width=300&text=Production",
    description: "Join a touring production as an all-round production assistant.",
    requirements: ["Flexible schedule", "Multiple skills", "Problem-solving ability"],
    applicationLink: "https://motleytheatre.com/jobs",
    featured: false,
  },
]

// Combine all opportunities
const allOpportunities = [...opportunities, ...backstageOpportunities]

// Get unique states, cities, types, and organizations for filters
const states = [...new Set(allOpportunities.map((opp) => opp.state))].sort()
const cities = [...new Set(allOpportunities.map((opp) => opp.location))].sort()
const types = [...new Set(allOpportunities.map((opp) => opp.type))].sort()
const organizations = [...new Set(allOpportunities.map((opp) => opp.organization))].sort()

export default function RecruitmentPage() {
  const [filters, setFilters] = useState({
    search: "",
    city: "",
    state: "",
    type: "",
    organization: "",
  })

  const filteredOpportunities = allOpportunities.filter((opp) => {
    return (
      (filters.search === "" ||
        opp.title.toLowerCase().includes(filters.search.toLowerCase()) ||
        opp.description.toLowerCase().includes(filters.search.toLowerCase())) &&
      (filters.city === "" || opp.location === filters.city) &&
      (filters.state === "" || opp.state === filters.state) &&
      (filters.type === "" || opp.type === filters.type) &&
      (filters.organization === "" || opp.organization === filters.organization)
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
      type: "",
      organization: "",
    })
  }

  // Separate opportunities by type
  const admissions = filteredOpportunities.filter((opp) => opp.type === "Admission")
  const jobs = filteredOpportunities.filter((opp) => opp.type === "Job")
  const backstage = filteredOpportunities.filter((opp) => opp.type === "Backstage")

  return (
    <div className="container py-12">
      <div className="max-w-3xl mx-auto text-center mb-12">
        <h1 className="font-playfair text-4xl font-bold mb-4">Recruitment & Admissions</h1>
        <p className="text-gray-600">
          Find job openings, backstage opportunities, and admission updates from prestigious institutions in the theater
          industry.
        </p>
      </div>

      {/* Filters */}
      <div className="mb-8 p-6 bg-gray-50 rounded-xl">
        <div className="flex items-center gap-2 mb-4">
          <Filter className="h-5 w-5 text-primary" />
          <h2 className="font-playfair text-xl font-bold">Filter Opportunities</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              type="text"
              placeholder="Search opportunities"
              className="pl-10 rounded-full"
              value={filters.search}
              onChange={(e) => handleFilterChange("search", e.target.value)}
            />
          </div>

          <Select value={filters.type} onValueChange={(value) => handleFilterChange("type", value)}>
            <SelectTrigger className="rounded-full">
              <SelectValue placeholder="Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              {types.map((type) => (
                <SelectItem key={type} value={type}>
                  {type}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={filters.organization} onValueChange={(value) => handleFilterChange("organization", value)}>
            <SelectTrigger className="rounded-full">
              <SelectValue placeholder="Organization" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Organizations</SelectItem>
              {organizations.map((org) => (
                <SelectItem key={org} value={org}>
                  {org}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

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
        </div>
        {(filters.search || filters.city || filters.state || filters.type || filters.organization) && (
          <div className="mt-4 flex justify-end">
            <Button variant="outline" size="sm" onClick={clearFilters} className="rounded-full">
              Clear Filters
            </Button>
          </div>
        )}
      </div>

      <Tabs defaultValue="all" className="w-full mb-8">
        <TabsList className="grid w-full grid-cols-4 rounded-full">
          <TabsTrigger value="all" className="rounded-full">
            All Opportunities
          </TabsTrigger>
          <TabsTrigger value="admissions" className="rounded-full">
            <GraduationCap className="h-4 w-4 mr-2" /> Admissions
          </TabsTrigger>
          <TabsTrigger value="jobs" className="rounded-full">
            <Briefcase className="h-4 w-4 mr-2" /> Jobs
          </TabsTrigger>
          <TabsTrigger value="backstage" className="rounded-full">
            <Wrench className="h-4 w-4 mr-2" /> Backstage
          </TabsTrigger>
        </TabsList>

        {/* All Opportunities Tab */}
        <TabsContent value="all">
          {filteredOpportunities.length > 0 ? (
            <div>
              {/* Admissions Section */}
              {admissions.length > 0 && (
                <div className="mb-12">
                  <div className="flex items-center gap-2 mb-6">
                    <GraduationCap className="h-6 w-6 text-theater-blue" />
                    <h2 className="font-playfair text-2xl font-bold">Admissions & Courses</h2>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {admissions.map((opportunity) => (
                      <div key={opportunity.id} className="theater-card flex flex-col h-full">
                        <div className="relative h-48 w-full">
                          {opportunity.featured && (
                            <div className="absolute top-2 right-2 z-10 bg-theater-blue text-white text-xs font-bold px-2 py-1 rounded-full">
                              Featured
                            </div>
                          )}
                          <Image
                            src={opportunity.image || "/placeholder.svg"}
                            alt={opportunity.title}
                            fill
                            className="object-cover rounded-t-xl"
                          />
                        </div>
                        <div className="p-6 flex-1 flex flex-col">
                          <div className="flex justify-between items-start mb-3">
                            <span className="bg-theater-blue/10 text-theater-blue text-xs font-medium px-2.5 py-0.5 rounded-full">
                              {opportunity.type}
                            </span>
                            <span className="flex items-center text-sm text-gray-500">
                              <MapPin className="h-3 w-3 mr-1" />
                              {opportunity.location}, {opportunity.state}
                            </span>
                          </div>
                          <h3 className="font-playfair text-xl font-bold mb-2">{opportunity.title}</h3>
                          <p className="text-primary font-medium text-sm mb-3">{opportunity.organization}</p>
                          <p className="text-gray-600 mb-4 flex-1">{opportunity.description}</p>
                          <div className="flex flex-col gap-2 mb-4">
                            <div className="flex items-center text-sm">
                              <Calendar className="h-3 w-3 mr-1 text-gray-500" />
                              <span className="text-gray-700">Deadline: {opportunity.deadline}</span>
                            </div>
                          </div>
                          <div className="flex justify-end mt-auto pt-4 border-t">
                            <Link href={opportunity.applicationLink} target="_blank">
                              <Button size="sm" className="rounded-full">
                                Apply Now <ExternalLink className="ml-1 h-3 w-3" />
                              </Button>
                            </Link>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Jobs Section */}
              {jobs.length > 0 && (
                <div className="mb-12">
                  <div className="flex items-center gap-2 mb-6">
                    <Briefcase className="h-6 w-6 text-primary" />
                    <h2 className="font-playfair text-2xl font-bold">Job Openings</h2>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {jobs.map((opportunity) => (
                      <div key={opportunity.id} className="theater-card flex flex-col h-full">
                        <div className="relative h-48 w-full">
                          {opportunity.featured && (
                            <div className="absolute top-2 right-2 z-10 bg-primary text-white text-xs font-bold px-2 py-1 rounded-full">
                              Featured
                            </div>
                          )}
                          <Image
                            src={opportunity.image || "/placeholder.svg"}
                            alt={opportunity.title}
                            fill
                            className="object-cover rounded-t-xl"
                          />
                        </div>
                        <div className="p-6 flex-1 flex flex-col">
                          <div className="flex justify-between items-start mb-3">
                            <span className="bg-primary/10 text-primary text-xs font-medium px-2.5 py-0.5 rounded-full">
                              {opportunity.type}
                            </span>
                            <span className="flex items-center text-sm text-gray-500">
                              <MapPin className="h-3 w-3 mr-1" />
                              {opportunity.location}, {opportunity.state}
                            </span>
                          </div>
                          <h3 className="font-playfair text-xl font-bold mb-2">{opportunity.title}</h3>
                          <p className="text-primary font-medium text-sm mb-3">{opportunity.organization}</p>
                          <p className="text-gray-600 mb-4 flex-1">{opportunity.description}</p>
                          <div className="flex flex-col gap-2 mb-4">
                            <div className="flex items-center text-sm">
                              <Calendar className="h-3 w-3 mr-1 text-gray-500" />
                              <span className="text-gray-700">Deadline: {opportunity.deadline}</span>
                            </div>
                          </div>
                          <div className="flex justify-end mt-auto pt-4 border-t">
                            <Link href={opportunity.applicationLink} target="_blank">
                              <Button size="sm" className="rounded-full">
                                Apply Now <ExternalLink className="ml-1 h-3 w-3" />
                              </Button>
                            </Link>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Backstage Opportunities Section */}
              {backstage.length > 0 && (
                <div>
                  <div className="flex items-center gap-2 mb-6">
                    <Wrench className="h-6 w-6 text-secondary" />
                    <h2 className="font-playfair text-2xl font-bold">Backstage Opportunities</h2>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {backstage.map((job) => (
                      <div key={job.id} className="theater-card flex flex-col h-full">
                        <div className="relative h-40 w-full">
                          {job.featured && (
                            <div className="absolute top-2 right-2 z-10 bg-secondary text-white text-xs font-bold px-2 py-1 rounded-full">
                              Featured
                            </div>
                          )}
                          <Image
                            src={job.image || "/placeholder.svg"}
                            alt={job.title}
                            fill
                            className="object-cover rounded-t-xl"
                          />
                        </div>
                        <div className="p-6 flex-1 flex flex-col">
                          <div className="flex justify-between items-start mb-2">
                            <span className="bg-secondary/10 text-secondary text-xs font-medium px-2.5 py-0.5 rounded-full">
                              {job.type}
                            </span>
                          </div>
                          <h3 className="font-playfair text-xl font-bold mb-1">{job.title}</h3>
                          <p className="text-primary font-medium text-sm mb-1">{job.organization}</p>
                          <div className="flex items-center text-sm text-gray-500 mb-3">
                            <MapPin className="h-3 w-3 mr-1" />
                            <span>
                              {job.location}, {job.state}
                            </span>
                          </div>
                          <p className="text-gray-600 mb-4">{job.description}</p>
                          <div className="mt-auto">
                            <h4 className="font-medium text-sm mb-2">Requirements:</h4>
                            <ul className="space-y-1 mb-4">
                              {job.requirements.map((req, i) => (
                                <li key={i} className="text-sm text-gray-600 flex items-start">
                                  <span className="text-secondary mr-2">•</span>
                                  {req}
                                </li>
                              ))}
                            </ul>
                            <div className="flex flex-col gap-2">
                              <div className="flex items-center text-sm mb-3">
                                <Calendar className="h-3 w-3 mr-1 text-gray-500" />
                                <span className="text-gray-700">Deadline: {job.deadline}</span>
                              </div>
                              <Link href={job.applicationLink} target="_blank">
                                <Button size="sm" className="rounded-full w-full">
                                  Apply Now <ExternalLink className="ml-1 h-3 w-3" />
                                </Button>
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500 mb-4">No opportunities match your current filters.</p>
              <Button onClick={clearFilters} variant="outline" className="rounded-full">
                Clear Filters
              </Button>
            </div>
          )}
        </TabsContent>

        {/* Admissions Tab */}
        <TabsContent value="admissions">
          {admissions.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {admissions.map((opportunity) => (
                <div key={opportunity.id} className="theater-card flex flex-col h-full">
                  <div className="relative h-48 w-full">
                    {opportunity.featured && (
                      <div className="absolute top-2 right-2 z-10 bg-theater-blue text-white text-xs font-bold px-2 py-1 rounded-full">
                        Featured
                      </div>
                    )}
                    <Image
                      src={opportunity.image || "/placeholder.svg"}
                      alt={opportunity.title}
                      fill
                      className="object-cover rounded-t-xl"
                    />
                  </div>
                  <div className="p-6 flex-1 flex flex-col">
                    <div className="flex justify-between items-start mb-3">
                      <span className="bg-theater-blue/10 text-theater-blue text-xs font-medium px-2.5 py-0.5 rounded-full">
                        {opportunity.type}
                      </span>
                      <span className="flex items-center text-sm text-gray-500">
                        <MapPin className="h-3 w-3 mr-1" />
                        {opportunity.location}, {opportunity.state}
                      </span>
                    </div>
                    <h3 className="font-playfair text-xl font-bold mb-2">{opportunity.title}</h3>
                    <p className="text-primary font-medium text-sm mb-3">{opportunity.organization}</p>
                    <p className="text-gray-600 mb-4 flex-1">{opportunity.description}</p>
                    <div className="flex flex-col gap-2 mb-4">
                      <div className="flex items-center text-sm">
                        <Calendar className="h-3 w-3 mr-1 text-gray-500" />
                        <span className="text-gray-700">Deadline: {opportunity.deadline}</span>
                      </div>
                    </div>
                    <div className="flex justify-end mt-auto pt-4 border-t">
                      <Link href={opportunity.applicationLink} target="_blank">
                        <Button size="sm" className="rounded-full">
                          Apply Now <ExternalLink className="ml-1 h-3 w-3" />
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500 mb-4">No admission opportunities match your current filters.</p>
              <Button onClick={clearFilters} variant="outline" className="rounded-full">
                Clear Filters
              </Button>
            </div>
          )}
        </TabsContent>

        {/* Jobs Tab */}
        <TabsContent value="jobs">
          {jobs.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {jobs.map((opportunity) => (
                <div key={opportunity.id} className="theater-card flex flex-col h-full">
                  <div className="relative h-48 w-full">
                    {opportunity.featured && (
                      <div className="absolute top-2 right-2 z-10 bg-primary text-white text-xs font-bold px-2 py-1 rounded-full">
                        Featured
                      </div>
                    )}
                    <Image
                      src={opportunity.image || "/placeholder.svg"}
                      alt={opportunity.title}
                      fill
                      className="object-cover rounded-t-xl"
                    />
                  </div>
                  <div className="p-6 flex-1 flex flex-col">
                    <div className="flex justify-between items-start mb-3">
                      <span className="bg-primary/10 text-primary text-xs font-medium px-2.5 py-0.5 rounded-full">
                        {opportunity.type}
                      </span>
                      <span className="flex items-center text-sm text-gray-500">
                        <MapPin className="h-3 w-3 mr-1" />
                        {opportunity.location}, {opportunity.state}
                      </span>
                    </div>
                    <h3 className="font-playfair text-xl font-bold mb-2">{opportunity.title}</h3>
                    <p className="text-primary font-medium text-sm mb-3">{opportunity.organization}</p>
                    <p className="text-gray-600 mb-4 flex-1">{opportunity.description}</p>
                    <div className="flex flex-col gap-2 mb-4">
                      <div className="flex items-center text-sm">
                        <Calendar className="h-3 w-3 mr-1 text-gray-500" />
                        <span className="text-gray-700">Deadline: {opportunity.deadline}</span>
                      </div>
                    </div>
                    <div className="flex justify-end mt-auto pt-4 border-t">
                      <Link href={opportunity.applicationLink} target="_blank">
                        <Button size="sm" className="rounded-full">
                          Apply Now <ExternalLink className="ml-1 h-3 w-3" />
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500 mb-4">No job opportunities match your current filters.</p>
              <Button onClick={clearFilters} variant="outline" className="rounded-full">
                Clear Filters
              </Button>
            </div>
          )}
        </TabsContent>

        {/* Backstage Tab */}
        <TabsContent value="backstage">
          {backstage.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {backstage.map((job) => (
                <div key={job.id} className="theater-card flex flex-col h-full">
                  <div className="relative h-40 w-full">
                    {job.featured && (
                      <div className="absolute top-2 right-2 z-10 bg-secondary text-white text-xs font-bold px-2 py-1 rounded-full">
                        Featured
                      </div>
                    )}
                    <Image
                      src={job.image || "/placeholder.svg"}
                      alt={job.title}
                      fill
                      className="object-cover rounded-t-xl"
                    />
                  </div>
                  <div className="p-6 flex-1 flex flex-col">
                    <div className="flex justify-between items-start mb-2">
                      <span className="bg-secondary/10 text-secondary text-xs font-medium px-2.5 py-0.5 rounded-full">
                        {job.type}
                      </span>
                    </div>
                    <h3 className="font-playfair text-xl font-bold mb-1">{job.title}</h3>
                    <p className="text-primary font-medium text-sm mb-1">{job.organization}</p>
                    <div className="flex items-center text-sm text-gray-500 mb-3">
                      <MapPin className="h-3 w-3 mr-1" />
                      <span>
                        {job.location}, {job.state}
                      </span>
                    </div>
                    <p className="text-gray-600 mb-4">{job.description}</p>
                    <div className="mt-auto">
                      <h4 className="font-medium text-sm mb-2">Requirements:</h4>
                      <ul className="space-y-1 mb-4">
                        {job.requirements.map((req, i) => (
                          <li key={i} className="text-sm text-gray-600 flex items-start">
                            <span className="text-secondary mr-2">•</span>
                            {req}
                          </li>
                        ))}
                      </ul>
                      <div className="flex flex-col gap-2">
                        <div className="flex items-center text-sm mb-3">
                          <Calendar className="h-3 w-3 mr-1 text-gray-500" />
                          <span className="text-gray-700">Deadline: {job.deadline}</span>
                        </div>
                        <Link href={job.applicationLink} target="_blank">
                          <Button size="sm" className="rounded-full w-full">
                            Apply Now <ExternalLink className="ml-1 h-3 w-3" />
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500 mb-4">No backstage opportunities match your current filters.</p>
              <Button onClick={clearFilters} variant="outline" className="rounded-full">
                Clear Filters
              </Button>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}
