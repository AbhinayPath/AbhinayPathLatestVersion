import Link from "next/link"
import { Search, Filter, MapPin, Star, CheckCircle2 } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

// Mock function to fetch all actors - replace with actual API call
async function getAllActors() {
  // This would be replaced with actual Supabase query
  return [
    {
      id: "1",
      full_name: "Priya Sharma",
      profile_image_url: "/placeholder-user.jpg",
      city: "Mumbai",
      state: "Maharashtra",
      bio: "Passionate theatre artist with 5+ years of experience in classical and contemporary performances.",
      experience_level: "Professional",
      acting_skills: ["Method Acting", "Classical Acting", "Improvisation"],
      verified: true,
    },
    {
      id: "2",
      full_name: "Rahul Kapoor",
      profile_image_url: "/placeholder-user.jpg",
      city: "Delhi",
      state: "Delhi",
      bio: "Character artist specializing in experimental theatre and voice acting.",
      experience_level: "Intermediate",
      acting_skills: ["Voice Acting", "Stage Combat", "Physical Theatre"],
      verified: true,
    },
    {
      id: "3",
      full_name: "Ananya Desai",
      profile_image_url: "/placeholder-user.jpg",
      city: "Bangalore",
      state: "Karnataka",
      bio: "Musical theatre performer with classical dance training.",
      experience_level: "Beginner",
      acting_skills: ["Musical Theatre", "Dance", "Singing"],
      verified: false,
    },
  ]
}

export default async function ActorsDirectoryPage() {
  const actors = await getAllActors()

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-purple-600 via-purple-700 to-pink-600 text-white py-16 md:py-24">
        <div className="absolute inset-0 bg-black/10" />
        <div className="container relative">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">Discover Talented Actors</h1>
            <p className="text-xl text-purple-100 mb-8">
              Browse profiles of skilled performers ready for your next production
            </p>

            {/* Search Bar */}
            <div className="bg-white rounded-full shadow-2xl p-2 flex items-center gap-2 max-w-2xl mx-auto">
              <Search className="h-5 w-5 text-gray-400 ml-4" />
              <Input
                placeholder="Search by name, city, or skills..."
                className="border-0 focus-visible:ring-0 text-gray-900"
              />
              <Button size="lg" className="rounded-full bg-purple-600 hover:bg-purple-700 px-8">
                Search
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Filters & Results */}
      <section className="py-12">
        <div className="container">
          {/* Filter Bar */}
          <div className="mb-8 flex flex-wrap gap-4 items-center">
            <Button variant="outline" className="rounded-full bg-transparent">
              <Filter className="h-4 w-4 mr-2" />
              All Experience Levels
            </Button>
            <Button variant="outline" className="rounded-full bg-transparent">
              <MapPin className="h-4 w-4 mr-2" />
              All Locations
            </Button>
            <div className="ml-auto text-sm text-gray-600">Showing {actors.length} actors</div>
          </div>

          {/* Actor Cards Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {actors.map((actor) => (
              <Card key={actor.id} className="group hover:shadow-xl transition-all border-2 hover:border-purple-300">
                <CardContent className="p-6">
                  {/* Avatar & Name */}
                  <div className="flex items-start gap-4 mb-4">
                    <div className="relative">
                      <Avatar className="h-16 w-16 border-2 border-purple-200">
                        <AvatarImage src={actor.profile_image_url || "/placeholder.svg"} alt={actor.full_name} />
                        <AvatarFallback className="bg-purple-100 text-purple-700">
                          {actor.full_name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      {actor.verified && (
                        <div className="absolute -bottom-1 -right-1 bg-blue-500 rounded-full p-1">
                          <CheckCircle2 className="h-3 w-3 text-white" />
                        </div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-lg text-gray-900 truncate">{actor.full_name}</h3>
                      <div className="flex items-center gap-1 text-sm text-gray-600">
                        <MapPin className="h-3 w-3" />
                        <span className="truncate">
                          {actor.city}, {actor.state}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Experience Badge */}
                  <Badge className="mb-3 bg-purple-100 text-purple-700 hover:bg-purple-200">
                    {actor.experience_level}
                  </Badge>

                  {/* Bio */}
                  <p className="text-sm text-gray-600 mb-4 line-clamp-2">{actor.bio}</p>

                  {/* Skills */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {actor.acting_skills.slice(0, 3).map((skill) => (
                      <Badge key={skill} variant="secondary" className="text-xs">
                        <Star className="h-3 w-3 mr-1 fill-purple-500 text-purple-500" />
                        {skill}
                      </Badge>
                    ))}
                    {actor.acting_skills.length > 3 && (
                      <Badge variant="secondary" className="text-xs">
                        +{actor.acting_skills.length - 3}
                      </Badge>
                    )}
                  </div>

                  {/* View Profile Button */}
                  <Button asChild className="w-full rounded-full bg-purple-600 hover:bg-purple-700">
                    <Link href={`/actors/${actor.id}`}>View Profile</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Empty State (if no actors) */}
          {actors.length === 0 && (
            <div className="text-center py-16">
              <div className="text-gray-400 mb-4">
                <Star className="h-16 w-16 mx-auto" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No actors found</h3>
              <p className="text-gray-600">Try adjusting your search or filters</p>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
