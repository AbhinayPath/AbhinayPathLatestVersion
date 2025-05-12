"use client"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Users, User, Star, MapPin, Filter } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function NetworkingPage() {
  // State for filters
  const [groupFilters, setGroupFilters] = useState({
    city: "",
    state: "",
    category: "",
  })

  const [directorFilters, setDirectorFilters] = useState({
    city: "",
    state: "",
    category: "",
  })

  // Sample drama groups data
  const dramaGroups = [
    {
      name: "Aadyam Theater",
      location: "Mumbai",
      state: "Maharashtra",
      established: "2015",
      image: "/placeholder.svg?height=200&width=300&text=Aadyam",
      description: "Professional theater company producing high-quality plays across various genres.",
      productions: ["Twelve Angry Jurors", "The Kite Runner", "Loretta"],
      categories: ["Contemporary", "Adaptations"],
    },
    {
      name: "Motley",
      location: "Mumbai",
      state: "Maharashtra",
      established: "1979",
      image: "/placeholder.svg?height=200&width=300&text=Motley",
      description: "One of India's oldest theater groups known for their adaptations of classic texts.",
      productions: ["Waiting for Godot", "The Father", "Einstein"],
      categories: ["Classic", "Adaptations"],
    },
    {
      name: "Pierrot's Troupe",
      location: "Delhi",
      state: "Delhi",
      established: "1989",
      image: "/placeholder.svg?height=200&width=300&text=Pierrot",
      description: "Versatile theater company with a focus on both comedy and serious drama.",
      productions: ["Ghalib in New Delhi", "Kennedy Bridge", "Lal Quile Ka Aakhri Mushaira"],
      categories: ["Comedy", "Historical"],
    },
    {
      name: "The Company Theatre",
      location: "Mumbai",
      state: "Maharashtra",
      established: "1993",
      image: "/placeholder.svg?height=200&width=300&text=Company Theatre",
      description: "Experimental theater group exploring innovative performance techniques.",
      productions: ["Piya Behrupiya", "Hamlet: The Clown Prince", "Numbers in the Dark"],
      categories: ["Experimental", "Shakespeare"],
    },
    {
      name: "Rangashankara",
      location: "Bangalore",
      state: "Karnataka",
      established: "2004",
      image: "/placeholder.svg?height=200&width=300&text=Rangashankara",
      description: "Theater space and company dedicated to promoting multilingual theater in India.",
      productions: ["Bikhre Bimb", "Hayavadana", "Sankranti"],
      categories: ["Multilingual", "Contemporary"],
    },
    {
      name: "Abhinaya Theatre Group",
      location: "Hyderabad",
      state: "Telangana",
      established: "1976",
      image: "/placeholder.svg?height=200&width=300&text=Abhinaya",
      description: "Renowned Telugu theater group with a focus on social and political themes.",
      productions: ["Evam Indrajit", "Pagdi Soudha", "Kanyasulkam"],
      categories: ["Regional", "Political"],
    },
    {
      name: "Neelam Mansingh Chowdhry Group",
      location: "Chandigarh",
      state: "Punjab",
      established: "1983",
      image: "/placeholder.svg?height=200&width=300&text=Neelam Group",
      description: "Innovative theater company blending traditional forms with contemporary themes.",
      productions: ["Kitchen Katha", "The Suit", "Nagamandala"],
      categories: ["Folk", "Contemporary"],
    },
    {
      name: "Ranga Shankara Theatre",
      location: "Bangalore",
      state: "Karnataka",
      established: "2004",
      image: "/placeholder.svg?height=200&width=300&text=Ranga Shankara",
      description: "Prominent theater space hosting diverse productions and fostering new talent.",
      productions: ["Hamlet", "Tughlaq", "Hayavadana"],
      categories: ["Multilingual", "Classic"],
    },
  ]

  // Sample directors data
  const directors = [
    {
      name: "Feroz Abbas Khan",
      location: "Mumbai",
      state: "Maharashtra",
      image: "/placeholder.svg?height=200&width=300&text=Feroz Khan",
      description: "Award-winning director known for 'Tumhari Amrita' and 'Mughal-e-Azam' musical.",
      specialties: ["Period Drama", "Adaptations", "Musicals"],
      categories: ["Musical", "Period"],
      rating: 5,
    },
    {
      name: "Lillete Dubey",
      location: "Delhi",
      state: "Delhi",
      image: "/placeholder.svg?height=200&width=300&text=Lillete Dubey",
      description: "Actor-director known for contemporary plays and international collaborations.",
      specialties: ["Contemporary Drama", "Comedy", "International Works"],
      categories: ["Contemporary", "Comedy"],
      rating: 5,
    },
    {
      name: "Rajat Kapoor",
      location: "Mumbai",
      state: "Maharashtra",
      image: "/placeholder.svg?height=200&width=300&text=Rajat Kapoor",
      description: "Filmmaker and theater director known for clown adaptations of Shakespeare.",
      specialties: ["Experimental", "Shakespeare", "Clown Theater"],
      categories: ["Experimental", "Shakespeare"],
      rating: 5,
    },
    {
      name: "Neelam Mansingh Chowdhry",
      location: "Chandigarh",
      state: "Punjab",
      image: "/placeholder.svg?height=200&width=300&text=Neelam Chowdhry",
      description: "Padma Shri awardee known for blending traditional forms with contemporary themes.",
      specialties: ["Folk Forms", "Adaptations", "Physical Theater"],
      categories: ["Folk", "Physical"],
      rating: 5,
    },
    {
      name: "Ratan Thiyam",
      location: "Imphal",
      state: "Manipur",
      image: "/placeholder.svg?height=200&width=300&text=Ratan Thiyam",
      description: "Internationally acclaimed director known for visual storytelling and Manipuri traditions.",
      specialties: ["Traditional Forms", "Visual Theater", "Political Drama"],
      categories: ["Traditional", "Political"],
      rating: 5,
    },
    {
      name: "Alyque Padamsee",
      location: "Mumbai",
      state: "Maharashtra",
      image: "/placeholder.svg?height=200&width=300&text=Alyque Padamsee",
      description: "Legendary director known for 'Evita', 'Jesus Christ Superstar', and 'Tughlaq'.",
      specialties: ["Musicals", "Historical Drama", "Large Productions"],
      categories: ["Musical", "Historical"],
      rating: 5,
    },
    {
      name: "Sunil Shanbag",
      location: "Mumbai",
      state: "Maharashtra",
      image: "/placeholder.svg?height=200&width=300&text=Sunil Shanbag",
      description: "Versatile director known for socially relevant plays and adaptations.",
      specialties: ["Social Drama", "Adaptations", "Contemporary"],
      categories: ["Social", "Contemporary"],
      rating: 5,
    },
    {
      name: "Anuradha Kapur",
      location: "Delhi",
      state: "Delhi",
      image: "/placeholder.svg?height=200&width=300&text=Anuradha Kapur",
      description: "Former NSD director known for experimental and feminist theater.",
      specialties: ["Experimental", "Feminist", "Academic"],
      categories: ["Experimental", "Feminist"],
      rating: 5,
    },
  ]

  // Get unique cities, states, and categories
  const cities = [...new Set([...dramaGroups.map((g) => g.location), ...directors.map((d) => d.location)])].sort()
  const states = [...new Set([...dramaGroups.map((g) => g.state), ...directors.map((d) => d.state)])].sort()

  const groupCategories = [...new Set(dramaGroups.flatMap((g) => g.categories))].sort()
  const directorCategories = [...new Set(directors.flatMap((d) => d.categories))].sort()

  // Filter drama groups based on selected filters
  const filteredGroups = dramaGroups.filter((group) => {
    return (
      (groupFilters.city === "" || group.location === groupFilters.city) &&
      (groupFilters.state === "" || group.state === groupFilters.state) &&
      (groupFilters.category === "" || group.categories.includes(groupFilters.category))
    )
  })

  // Filter directors based on selected filters
  const filteredDirectors = directors.filter((director) => {
    return (
      (directorFilters.city === "" || director.location === directorFilters.city) &&
      (directorFilters.state === "" || director.state === directorFilters.state) &&
      (directorFilters.category === "" || director.categories.includes(directorFilters.category))
    )
  })

  // Handle filter changes
  const handleGroupFilterChange = (key: string, value: string) => {
    setGroupFilters((prev) => ({ ...prev, [key]: value }))
  }

  const handleDirectorFilterChange = (key: string, value: string) => {
    setDirectorFilters((prev) => ({ ...prev, [key]: value }))
  }

  // Clear filters
  const clearGroupFilters = () => {
    setGroupFilters({
      city: "",
      state: "",
      category: "",
    })
  }

  const clearDirectorFilters = () => {
    setDirectorFilters({
      city: "",
      state: "",
      category: "",
    })
  }

  return (
    <div className="container py-12">
      <div className="max-w-3xl mx-auto text-center mb-12">
        <h1 className="font-playfair text-4xl font-bold mb-4">Theater Networking</h1>
        <p className="text-gray-600">
          Connect with drama groups, directors, and find opportunities to expand your theater network.
        </p>
      </div>

      <Tabs defaultValue="groups" className="w-full">
        <TabsList className="grid w-full grid-cols-2 rounded-full">
          <TabsTrigger value="groups" className="rounded-full">
            <Users className="h-4 w-4 mr-2" /> Drama Groups
          </TabsTrigger>
          <TabsTrigger value="directors" className="rounded-full">
            <User className="h-4 w-4 mr-2" /> Directors
          </TabsTrigger>
        </TabsList>

        {/* Drama Groups Tab */}
        <TabsContent value="groups" className="mt-6">
          {/* Filters for Drama Groups */}
          <div className="mb-8 p-6 bg-gray-50 rounded-xl">
            <div className="flex items-center gap-2 mb-4">
              <Filter className="h-5 w-5 text-primary" />
              <h2 className="font-playfair text-xl font-bold">Filter Drama Groups</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Select value={groupFilters.city} onValueChange={(value) => handleGroupFilterChange("city", value)}>
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

              <Select value={groupFilters.state} onValueChange={(value) => handleGroupFilterChange("state", value)}>
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

              <Select
                value={groupFilters.category}
                onValueChange={(value) => handleGroupFilterChange("category", value)}
              >
                <SelectTrigger className="rounded-full">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {groupCategories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            {(groupFilters.city || groupFilters.state || groupFilters.category) && (
              <div className="mt-4 flex justify-end">
                <Button variant="outline" size="sm" onClick={clearGroupFilters} className="rounded-full">
                  Clear Filters
                </Button>
              </div>
            )}
          </div>

          {filteredGroups.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredGroups.map((group, index) => (
                <div key={index} className="theater-card flex flex-col h-full">
                  <div className="relative h-40 w-full">
                    <Image
                      src={group.image || "/placeholder.svg"}
                      alt={group.name}
                      fill
                      className="object-cover rounded-t-xl"
                    />
                  </div>
                  <div className="p-6 flex-1 flex flex-col">
                    <div className="flex justify-between items-start mb-3">
                      <h3 className="font-playfair text-xl font-bold">{group.name}</h3>
                    </div>
                    <div className="flex items-center text-sm text-gray-500 mb-3">
                      <MapPin className="h-3 w-3 mr-1" />
                      <span>
                        {group.location}, {group.state}
                      </span>
                      <span className="mx-2">•</span>
                      <span>Est. {group.established}</span>
                    </div>
                    <div className="flex flex-wrap gap-2 mb-3">
                      {group.categories.map((category, i) => (
                        <span key={i} className="bg-primary/10 text-primary text-xs px-2 py-1 rounded-full">
                          {category}
                        </span>
                      ))}
                    </div>
                    <p className="text-gray-600 mb-4">{group.description}</p>
                    <div className="mt-auto">
                      <h4 className="font-medium text-sm mb-2">Notable Productions:</h4>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {group.productions.map((production, i) => (
                          <span key={i} className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded-full">
                            {production}
                          </span>
                        ))}
                      </div>
                      <Button variant="outline" size="sm" className="rounded-full w-full">
                        Connect
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500 mb-4">No drama groups match your current filters.</p>
              <Button onClick={clearGroupFilters} variant="outline" className="rounded-full">
                Clear Filters
              </Button>
            </div>
          )}
        </TabsContent>

        {/* Directors Tab */}
        <TabsContent value="directors" className="mt-6">
          {/* Filters for Directors */}
          <div className="mb-8 p-6 bg-gray-50 rounded-xl">
            <div className="flex items-center gap-2 mb-4">
              <Filter className="h-5 w-5 text-primary" />
              <h2 className="font-playfair text-xl font-bold">Filter Directors</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Select value={directorFilters.city} onValueChange={(value) => handleDirectorFilterChange("city", value)}>
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

              <Select
                value={directorFilters.state}
                onValueChange={(value) => handleDirectorFilterChange("state", value)}
              >
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

              <Select
                value={directorFilters.category}
                onValueChange={(value) => handleDirectorFilterChange("category", value)}
              >
                <SelectTrigger className="rounded-full">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {directorCategories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            {(directorFilters.city || directorFilters.state || directorFilters.category) && (
              <div className="mt-4 flex justify-end">
                <Button variant="outline" size="sm" onClick={clearDirectorFilters} className="rounded-full">
                  Clear Filters
                </Button>
              </div>
            )}
          </div>

          {filteredDirectors.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredDirectors.map((director, index) => (
                <div key={index} className="theater-card flex flex-col h-full">
                  <div className="relative h-40 w-full">
                    <Image
                      src={director.image || "/placeholder.svg"}
                      alt={director.name}
                      fill
                      className="object-cover rounded-t-xl"
                    />
                  </div>
                  <div className="p-6 flex-1 flex flex-col">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-playfair text-xl font-bold">{director.name}</h3>
                      <div className="flex">
                        {[...Array(director.rating)].map((_, i) => (
                          <Star key={i} className="h-4 w-4 text-secondary" fill="currentColor" />
                        ))}
                      </div>
                    </div>
                    <div className="flex items-center text-sm text-gray-500 mb-3">
                      <MapPin className="h-3 w-3 mr-1" />
                      <span>
                        {director.location}, {director.state}
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-2 mb-3">
                      {director.categories.map((category, i) => (
                        <span key={i} className="bg-primary/10 text-primary text-xs px-2 py-1 rounded-full">
                          {category}
                        </span>
                      ))}
                    </div>
                    <p className="text-gray-600 mb-4">{director.description}</p>
                    <div className="mt-auto">
                      <h4 className="font-medium text-sm mb-2">Specialties:</h4>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {director.specialties.map((specialty, i) => (
                          <span key={i} className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded-full">
                            {specialty}
                          </span>
                        ))}
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" className="rounded-full flex-1">
                          Message
                        </Button>
                        <Button variant="outline" size="sm" className="rounded-full flex-1">
                          View Profile
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500 mb-4">No directors match your current filters.</p>
              <Button onClick={clearDirectorFilters} variant="outline" className="rounded-full">
                Clear Filters
              </Button>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}
