import type { Metadata } from "next"
import { notFound } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import {
  MapPin,
  Mail,
  Phone,
  Globe,
  Star,
  Award,
  Briefcase,
  Languages,
  Youtube,
  Instagram,
  ExternalLink,
  Play,
  CheckCircle2,
  Shield,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Checkbox } from "@/components/ui/checkbox"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

// Mock function to fetch actor data - replace with actual API call
async function getActorProfile(id: string) {
  // This would be replaced with actual Supabase query
  // const supabase = await getSupabaseServerClientForRouteHandler()
  // const { data, error } = await supabase
  //   .from('talent_profiles')
  //   .select('*')
  //   .eq('id', id)
  //   .single()

  // Mock data for demonstration
  return {
    id,
    full_name: "Priya Sharma",
    profile_image_url: "/placeholder-user.jpg",
    city: "Mumbai",
    state: "Maharashtra",
    bio: "Passionate theatre artist with 5+ years of experience in classical and contemporary performances. Trained at National School of Drama. Specializing in character roles and experimental theatre.",
    email: "priya.sharma@example.com",
    phone: "+91 98765 43210",
    website_url: "https://priyasharma.com",
    experience_level: "Professional",
    years_of_experience: 5,
    acting_skills: ["Method Acting", "Classical Acting", "Improvisation", "Voice Acting", "Stage Combat"],
    languages: ["Hindi", "English", "Marathi", "Bengali"],
    experience: [
      { project_title: "Hamlet", role: "Ophelia", production_company: "National Theatre", year: "2023" },
      {
        project_title: "A Streetcar Named Desire",
        role: "Blanche",
        production_company: "Prithvi Theatre",
        year: "2022",
      },
      { project_title: "The Glass Menagerie", role: "Laura", production_company: "NCPA", year: "2021" },
    ],
    portfolio_images: [
      "/placeholder.jpg",
      "/placeholder.jpg",
      "/placeholder.jpg",
      "/placeholder.jpg",
      "/placeholder.jpg",
    ],
    portfolio_videos: ["https://youtube.com/watch?v=example1", "https://youtube.com/watch?v=example2"],
    youtube_url: "https://youtube.com/@priyasharma",
    instagram_url: "https://instagram.com/priyasharma",
    imdb_url: "https://imdb.com/name/nm0000000",
    verified: true,
  }
}

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const actor = await getActorProfile(params.id)

  return {
    title: `${actor.full_name} - Actor Profile | Abhinayपथ`,
    description: actor.bio,
  }
}

export default async function ActorProfilePage({ params }: { params: { id: string } }) {
  const actor = await getActorProfile(params.id)

  if (!actor) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50">
      {/* SECTION 1: ESSENCE */}
      <section className="relative bg-gradient-to-r from-purple-600 via-purple-700 to-pink-600 text-white">
        <div className="absolute inset-0 bg-black/20" />
        <div className="container relative py-16 md:py-24">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
            {/* Profile Picture */}
            <div className="relative">
              <Avatar className="h-48 w-48 md:h-56 md:w-56 border-4 border-white shadow-2xl">
                <AvatarImage src={actor.profile_image_url || "/placeholder.svg"} alt={actor.full_name} />
                <AvatarFallback className="text-4xl bg-purple-200 text-purple-900">
                  {actor.full_name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              {actor.verified && (
                <div className="absolute bottom-2 right-2 bg-blue-500 rounded-full p-2 shadow-lg">
                  <CheckCircle2 className="h-6 w-6 text-white" />
                </div>
              )}
            </div>

            {/* Name & Location */}
            <div className="flex-1 text-center md:text-left">
              <div className="flex items-center justify-center md:justify-start gap-2 mb-2">
                <h1 className="text-4xl md:text-5xl font-bold">{actor.full_name}</h1>
                {actor.verified && <Shield className="h-6 w-6 text-blue-300" />}
              </div>

              <div className="flex items-center justify-center md:justify-start gap-2 text-purple-100 mb-4">
                <MapPin className="h-5 w-5" />
                <span className="text-lg">
                  {actor.city}, {actor.state}
                </span>
              </div>

              {/* About Bio */}
              <p className="text-lg text-purple-50 max-w-3xl mb-6 leading-relaxed">{actor.bio}</p>

              {/* Contact Buttons */}
              <div className="flex flex-wrap gap-3 justify-center md:justify-start">
                {actor.email && (
                  <Button
                    variant="secondary"
                    size="lg"
                    className="rounded-full bg-white text-purple-700 hover:bg-purple-50"
                    asChild
                  >
                    <a href={`mailto:${actor.email}`}>
                      <Mail className="mr-2 h-4 w-4" />
                      Email
                    </a>
                  </Button>
                )}
                {actor.phone && (
                  <Button
                    variant="secondary"
                    size="lg"
                    className="rounded-full bg-white text-purple-700 hover:bg-purple-50"
                    asChild
                  >
                    <a href={`tel:${actor.phone}`}>
                      <Phone className="mr-2 h-4 w-4" />
                      Call
                    </a>
                  </Button>
                )}
                {actor.website_url && (
                  <Button
                    variant="secondary"
                    size="lg"
                    className="rounded-full bg-white text-purple-700 hover:bg-purple-50"
                    asChild
                  >
                    <a href={actor.website_url} target="_blank" rel="noopener noreferrer">
                      <Globe className="mr-2 h-4 w-4" />
                      Website
                    </a>
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2: CRAFT */}
      <section className="py-16">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-3">The Craft</h2>
            <p className="text-lg text-gray-600">Skills, Experience & Expertise</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Experience Level */}
            <Card className="border-2 hover:border-purple-300 transition-all hover:shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-purple-700">
                  <Award className="h-5 w-5" />
                  Experience Level
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <Badge className="bg-purple-100 text-purple-700 hover:bg-purple-200 text-base px-4 py-1">
                    {actor.experience_level}
                  </Badge>
                  <p className="text-sm text-gray-600">{actor.years_of_experience} years in the industry</p>
                </div>
              </CardContent>
            </Card>

            {/* Languages */}
            <Card className="border-2 hover:border-purple-300 transition-all hover:shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-purple-700">
                  <Languages className="h-5 w-5" />
                  Languages
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {actor.languages.map((lang) => (
                    <Badge key={lang} variant="secondary" className="bg-purple-50 text-purple-700">
                      {lang}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Skills - Spans 2 columns */}
            <Card className="border-2 hover:border-purple-300 transition-all hover:shadow-lg md:col-span-2">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-purple-700">
                  <Star className="h-5 w-5" />
                  Skills & Specializations
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {actor.acting_skills.map((skill) => (
                    <Badge
                      key={skill}
                      variant="outline"
                      className="border-purple-300 text-purple-700 hover:bg-purple-50"
                    >
                      <Star className="h-3 w-3 mr-1 fill-purple-500 text-purple-500" />
                      {skill}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Past Work Highlights */}
          <Card className="mt-6 border-2 hover:border-purple-300 transition-all">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-purple-700">
                <Briefcase className="h-5 w-5" />
                Past Work Highlights
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {actor.experience.slice(0, 3).map((work, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-4 p-4 rounded-lg bg-purple-50 hover:bg-purple-100 transition-colors"
                  >
                    <div className="flex-shrink-0 w-12 h-12 rounded-full bg-purple-200 flex items-center justify-center">
                      <Award className="h-6 w-6 text-purple-700" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900">{work.project_title}</h4>
                      <p className="text-sm text-gray-600">as {work.role}</p>
                      <p className="text-xs text-gray-500 mt-1">
                        {work.production_company} • {work.year}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* SECTION 3: SHOWCASE */}
      <section className="py-16 bg-gradient-to-br from-purple-50 to-pink-50">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-3">Showcase</h2>
            <p className="text-lg text-gray-600">Portfolio & Creative Work</p>
          </div>

          {/* Gallery */}
          <div className="mb-12">
            <h3 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
              <span className="w-1 h-8 bg-purple-600 rounded-full" />
              Portfolio Gallery
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {actor.portfolio_images.slice(0, 5).map((image, index) => (
                <div
                  key={index}
                  className="relative aspect-square rounded-lg overflow-hidden group cursor-pointer border-2 border-transparent hover:border-purple-400 transition-all"
                >
                  <Image
                    src={image || "/placeholder.svg"}
                    alt={`${actor.full_name} portfolio ${index + 1}`}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              ))}
            </div>
          </div>

          {/* Showreel & Monologue Links */}
          <div className="grid md:grid-cols-2 gap-6 mb-12">
            <Card className="border-2 hover:border-purple-300 transition-all hover:shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-purple-700">
                  <Play className="h-5 w-5" />
                  Showreel & Monologues
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {actor.portfolio_videos.map((video, index) => (
                    <a
                      key={index}
                      href={video}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 p-3 rounded-lg bg-purple-50 hover:bg-purple-100 transition-colors group"
                    >
                      <div className="w-10 h-10 rounded-full bg-red-500 flex items-center justify-center">
                        <Play className="h-5 w-5 text-white fill-white" />
                      </div>
                      <span className="flex-1 font-medium text-gray-900">
                        {index === 0 ? "Showreel" : `Performance ${index}`}
                      </span>
                      <ExternalLink className="h-4 w-4 text-gray-400 group-hover:text-purple-600" />
                    </a>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Social Links */}
            <Card className="border-2 hover:border-purple-300 transition-all hover:shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-purple-700">
                  <ExternalLink className="h-5 w-5" />
                  Connect & Follow
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {actor.youtube_url && (
                    <a
                      href={actor.youtube_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 p-3 rounded-lg bg-red-50 hover:bg-red-100 transition-colors group"
                    >
                      <div className="w-10 h-10 rounded-full bg-red-500 flex items-center justify-center">
                        <Youtube className="h-5 w-5 text-white" />
                      </div>
                      <span className="flex-1 font-medium text-gray-900">YouTube Channel</span>
                      <ExternalLink className="h-4 w-4 text-gray-400 group-hover:text-red-600" />
                    </a>
                  )}
                  {actor.instagram_url && (
                    <a
                      href={actor.instagram_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 p-3 rounded-lg bg-pink-50 hover:bg-pink-100 transition-colors group"
                    >
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                        <Instagram className="h-5 w-5 text-white" />
                      </div>
                      <span className="flex-1 font-medium text-gray-900">Instagram</span>
                      <ExternalLink className="h-4 w-4 text-gray-400 group-hover:text-pink-600" />
                    </a>
                  )}
                  {actor.imdb_url && (
                    <a
                      href={actor.imdb_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 p-3 rounded-lg bg-yellow-50 hover:bg-yellow-100 transition-colors group"
                    >
                      <div className="w-10 h-10 rounded-full bg-yellow-400 flex items-center justify-center">
                        <Star className="h-5 w-5 text-yellow-900 fill-yellow-900" />
                      </div>
                      <span className="flex-1 font-medium text-gray-900">IMDb Profile</span>
                      <ExternalLink className="h-4 w-4 text-gray-400 group-hover:text-yellow-600" />
                    </a>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Call to Action */}
          <Card className="bg-gradient-to-r from-purple-600 to-pink-600 text-white border-0">
            <CardContent className="p-8 text-center">
              <h3 className="text-2xl font-bold mb-3">Interested in collaborating?</h3>
              <p className="text-purple-100 mb-6">Get in touch to discuss your next project</p>
              <div className="flex flex-wrap gap-3 justify-center">
                <Button
                  size="lg"
                  variant="secondary"
                  className="rounded-full bg-white text-purple-700 hover:bg-purple-50"
                  asChild
                >
                  <a href={`mailto:${actor.email}`}>
                    <Mail className="mr-2 h-4 w-4" />
                    Send Message
                  </a>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="rounded-full border-2 border-white text-white hover:bg-white/10 bg-transparent"
                  asChild
                >
                  <a href={`tel:${actor.phone}`}>
                    <Phone className="mr-2 h-4 w-4" />
                    Schedule Call
                  </a>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* CONSENT FOOTER */}
      <section className="py-12 bg-gray-50 border-t">
        <div className="container">
          <Card className="max-w-3xl mx-auto">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-purple-700">
                <Shield className="h-5 w-5" />
                Privacy & Consent
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start gap-3">
                <Checkbox id="terms" className="mt-1" />
                <label htmlFor="terms" className="text-sm text-gray-700 leading-relaxed cursor-pointer">
                  I understand that this profile is publicly visible and I consent to displaying my information on
                  Abhinayपथ platform. I agree to the{" "}
                  <Link href="/terms" className="text-purple-600 hover:underline font-medium">
                    Terms of Service
                  </Link>{" "}
                  and{" "}
                  <Link href="/privacy" className="text-purple-600 hover:underline font-medium">
                    Privacy Policy
                  </Link>
                  .
                </label>
              </div>
              <div className="flex items-start gap-3">
                <Checkbox id="contact" className="mt-1" />
                <label htmlFor="contact" className="text-sm text-gray-700 leading-relaxed cursor-pointer">
                  I consent to being contacted by casting directors, producers, and other industry professionals through
                  the contact information provided on this profile.
                </label>
              </div>
              <Separator />
              <div className="flex items-center gap-2 text-xs text-gray-500">
                <Shield className="h-4 w-4" />
                <span>Your data is secure and will be handled according to our privacy policy</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  )
}
