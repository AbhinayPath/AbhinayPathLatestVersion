"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import {
  Instagram,
  Mail,
  MapPin,
  Languages,
  Sparkles,
  Phone,
  Search,
  Filter,
  ChevronDown,
  ChevronUp,
  X,
  Youtube,
  Award,
  Facebook,
  ExternalLink,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useMediaQuery } from "@/hooks/use-media-query"
import { ShareProfileButton } from "@/components/share-profile-button"

interface Artist {
  id: string
  name: string
  image: string
  location: string
  age?: number
  languages: string[]
  email?: string
  interests: string[]
  bio: string
  instagram?: string
  facebook?: string
  whatsapp?: string
  youtube?: string
  credential?: string
}

const artists: Artist[] = [
  {
    id: "naman-jain",
    name: "Naman Jain",
    image: "/images/artists/naman-jain.jpeg",
    location: "Bengaluru, Indiranagar",
    age: 26,
    languages: ["English", "Hindi"],
    email: "namanjn0608@gmail.com",
    interests: ["Acting", "Writing", "Assistant Directing"],
    bio: "Naman Jain is a versatile theatre artist based in Bengaluru with a passion for storytelling through performance. At 26, he brings a fresh perspective to the stage, combining his skills in acting, writing, and assistant directing. His work reflects a deep commitment to exploring human emotions and narratives, making him a valuable contributor to the theatre community. Naman is dedicated to continuous learning and collaboration, always seeking new ways to push creative boundaries.",
    instagram: "https://www.instagram.com/whatswrongnaman?igsh=NGE5aGV3MDV4ZDk%3D&utm_source=qr",
    whatsapp: "9811763837",
  },
  {
    id: "shivesh-ranjan",
    name: "Shivesh Ranjan",
    image: "/images/artists/shivesh-ranjan.jpg",
    location: "Bengaluru, BTM Layout",
    age: 35,
    languages: ["Hindi", "English"],
    email: "shiveshranjan7@gmail.com",
    interests: ["Acting", "Direction", "Writing"],
    bio: "Shivesh Ranjan is a seasoned theatre artist with 14+ years of experience and over 450 stage shows to his credit. Trained in Proscenium, improv theatre, and clowning, he brings a wealth of expertise and versatility to every performance. His extensive background in acting, direction, and writing makes him a multifaceted contributor to the theatre community, known for his dynamic stage presence and creative vision.",
    instagram: "https://www.instagram.com/shiveshranjan7",
    whatsapp: "8095876104",
  },
  {
    id: "nuhar-bansal",
    name: "Nuhar Bansal",
    image: "/images/artists/nuhar-bansal.jpeg",
    location: "Bengaluru, Jakkur",
    age: 32,
    languages: ["Hindi", "English", "Punjabi", "Kannada"],
    email: "nuharbansal@gmail.com",
    interests: ["Acting"],
    bio: "I am a 32 year old female actor with a special interest in clowning and mental health. I value honesty, kindness, and playfulness.",
    instagram: "https://www.instagram.com/abaldfatindiangirl?igsh=MmE2ZGlicjFweWow&utm_source=qr",
    whatsapp: "9916587281",
  },
  {
    id: "bhoomika-srivastava",
    name: "Dr. Bhoomika Srivastava",
    image: "/images/artists/bhoomika-srivastava.jpg",
    location: "Bengaluru, Brookfield",
    languages: ["Hindi", "English"],
    interests: ["Acting"],
    bio: "I am a trained Kathak dancer, hindi poet & theatre artist",
    instagram: "https://www.instagram.com/eternalqueenofswag?igsh=MXJ1NTFsZGpzMTQ5eg==",
  },
  {
    id: "aniruddh-jain",
    name: "Aniruddh Jain",
    image: "/images/artists/aniruddh-jain.jpg",
    location: "Bengaluru, Beratena Agrahara",
    languages: ["Hindi", "English"],
    email: "surreal.reels@gmail.com",
    interests: ["Acting", "Direction", "Writing", "Lyrics Writing", "Music Composition", "Singing"],
    bio: "An engineer by profession, artist by passion, I have been involved with theatre and films since 2012. Acted in many plays since then, I have also contributed to writing, direction, songs writing and composition and singing. I have also written, directed and produced a feature film, short film and music video (under progress). I have done many types of theatre like improv, playback, forum, complete the story, clown, devised and scripted.",
    instagram: "https://www.instagram.com/src_films?igsh=MWU0bGV6eWI0eTE1Zw==",
    youtube: "https://youtube.com/@surrealreelscreation8951?si=DiD-z_uKjcd8LO3D",
  },
  {
    id: "deepali-sharma",
    name: "Deepali Sharma",
    image: "/images/artists/deepali-sharma.jpg",
    location: "Bengaluru, Jalahalli East",
    age: 50,
    languages: ["Hindi", "Punjabi", "English"],
    email: "deepalisharmarocky43@gmail.com",
    interests: ["Acting"],
    bio: "A passionate theatre artist with a deep love for the performing arts. With years of experience in acting, Deepali brings authenticity and dedication to every role she takes on, contributing meaningfully to the theatre community.",
    whatsapp: "9731985626",
  },
  {
    id: "sugandh-pandey",
    name: "Sugandh Pandey",
    image: "/images/artists/sugandh-pandey.jpg",
    location: "Bengaluru, J P Nagar",
    age: 33,
    languages: ["Hindi"],
    email: "Sugandhpandey5@gmail.com",
    interests: ["Acting", "Direction"],
    bio: "A dedicated theatre artist with formal training from India's most prestigious theatre institution.",
    credential: "NSD ALUMNI (DELHI) 2017-2020 BATCH",
    instagram: "https://www.instagram.com/sugandhpandey5?igsh=dHYwOXk2Mzh0OWlu",
  },
  {
    id: "mohammed-yunus-parvez",
    name: "Mohammed Yunus Parvez",
    image: "/images/artists/mohammed-yunus-parvez.jpg",
    location: "Bengaluru",
    languages: ["Urdu", "Hindi", "English", "Kannada"],
    interests: ["Acting", "Direction"],
    bio: "Fresher seeking good roles opportunity",
    whatsapp: "9845428007",
  },
  {
    id: "sangeeta-singh",
    name: "Sangeeta Singh",
    image: "/images/artists/sangeeta-singh.jpg",
    location: "Fremont, California, USA",
    languages: ["Hindi", "English", "Bhojpuri", "Urdu"],
    email: "sangeeta.xinix@gmail.com",
    interests: ["Acting", "Direction", "Backstage roles"],
    bio: 'Acted in English (Shakespeare), Bengali (Rabindranath Tagore\'s dance drama "Chandalika") and Hindi plays. A versatile theatre artist with international experience, bringing diverse cultural perspectives to every performance.',
    facebook: "https://www.facebook.com/sangeeta.singh.7330763?mibextid=ZbWKwL",
    youtube: "https://youtu.be/foXwI5jPd1M?si=WOo_AHB6kTr-pVCm",
  },
  {
    id: "ronak-sharma",
    name: "Ronak Sharma",
    image: "/images/artists/ronak-sharma.jpg",
    location: "Bengaluru",
    age: 41,
    languages: ["Hindi", "English"],
    email: "Shanu.ronak@gmail.com",
    interests: ["Directing", "Writing", "Costume"],
    bio: "I have 10 years of experience in writing directing plays, music video, documentary, podcast and mini series.",
    instagram: "https://www.instagram.com/ronaksharmagupta?igsh=MWUwZnpkaGFxdGdvdw==",
    whatsapp: "8095955140",
  },
  {
    id: "vandana-dugar",
    name: "Vandana Dugar",
    image: "/images/artists/vandana-dugar.jpg",
    location: "Bengaluru, Dr. Raj Kumar Road",
    languages: ["Hindi"],
    interests: ["Acting"],
    bio: "I am Vandana dugar Theatre enthusiast from Bangalore based theatre group Urban Chaupaal. Here to learn, explore and tell stories.",
    instagram: "https://www.instagram.com/theatrekraft?igsh=b21nMnh3eXN4Njhz&utm_source=qr",
    whatsapp: "9019760520",
  },
  {
    id: "srinivas-nayaka",
    name: "Srinivas Nayaka",
    image: "/images/artists/srinivas-nayaka.jpg",
    location: "Bengaluru",
    age: 24,
    languages: ["Kannada", "Telugu", "Hindi", "English"],
    email: "srinivasnayakame@gmail.com",
    interests: ["Direction"],
    bio: "Srinivas, Writer - Director from Bangalore. I have made 4 short films so far and one of them has been screened in BISFF 2025.",
  },
  {
    id: "ganesh-gopalan",
    name: "Ganesh Gopalan",
    image: "/images/artists/ganesh-gopalan.jpg",
    location: "Coimbatore",
    age: 45,
    languages: ["Hindi", "English", "Telugu", "Tamil"],
    email: "ganesh.thinker@gmail.com",
    interests: ["Writing", "Direction"],
    bio: "An IT professional with 12 stage plays to credit both within IT companies and in famous theatre spaces across India...",
    whatsapp: "8095225777",
  },
  {
    id: "aaqib-jamal",
    name: "Aaqib Jamal",
    image: "/images/artists/aaqib-jamal.jpg",
    location: "Bengaluru",
    age: 33,
    languages: ["English", "Hindi", "Kannada"],
    email: "aaqib.jamal25@gmail.com",
    interests: ["Direction", "Acting", "Production Manager", "Sound Design", "Videography", "Photography"],
    bio: "Bangalore based creative director, filmmaker, photographer, actor, theatre practitioner, and soft skills trainer. Started theatre in 2011 as an actor, then moved on to be an assistant director, sound designer, director, producer and production manager",
    instagram: "https://www.instagram.com/aaqib_jamal/",
  },
  {
    id: "zahoor",
    name: "Zahoor",
    image: "/images/artists/zahoor.jpg",
    location: "Bengaluru",
    age: 40,
    languages: ["English", "Hindi"],
    email: "zoshsaysright@gmail.com",
    interests: ["Acting"],
    bio: "I am a theatre enthusiast looking for an opportunity to act",
    whatsapp: "7892146961",
  },
]

const locations = [...new Set(artists.map((artist) => artist.location.split(",")[0].trim()))].sort()
const allLanguages = [...new Set(artists.flatMap((artist) => artist.languages))].sort()
const allSkills = [...new Set(artists.flatMap((artist) => artist.interests))].sort()

export default function TheatreArtistsContent() {
  const [filters, setFilters] = useState({
    search: "",
    location: "",
    language: "",
    skill: "",
  })
  const [showDesktopFilters, setShowDesktopFilters] = useState(true)
  const isMobile = useMediaQuery("(max-width: 768px)")

  const filteredArtists = artists.filter((artist) => {
    const matchesSearch =
      filters.search === "" ||
      artist.name.toLowerCase().includes(filters.search.toLowerCase()) ||
      artist.bio.toLowerCase().includes(filters.search.toLowerCase()) ||
      artist.interests.some((interest) => interest.toLowerCase().includes(filters.search.toLowerCase()))

    const matchesLocation = filters.location === "" || artist.location.includes(filters.location)

    const matchesLanguage = filters.language === "" || artist.languages.includes(filters.language)

    const matchesSkill = filters.skill === "" || artist.interests.includes(filters.skill)

    return matchesSearch && matchesLocation && matchesLanguage && matchesSkill
  })

  const handleFilterChange = (key: string, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }))
  }

  const clearFilters = () => {
    setFilters({
      search: "",
      location: "",
      language: "",
      skill: "",
    })
  }

  const hasActiveFilters = Object.values(filters).some((value) => value !== "")
  const activeFilterCount = Object.values(filters).filter((value) => value !== "").length

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-muted/20 to-background">
      {/* Hero Section */}
      <section className="relative py-12 sm:py-16 md:py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5" />
        <div className="container relative">
          <div className="max-w-3xl mx-auto text-center space-y-4 sm:space-y-6 md:space-y-8 overflow-hidden">
            <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-primary/10 text-primary text-xs sm:text-sm font-medium">
              <Sparkles className="h-3 w-3 sm:h-4 sm:w-4 flex-shrink-0" />
              <span>Meet Our Community</span>
            </div>
            <h1 className="font-playfair text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-balance leading-tight">
              Theatre Artists
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-muted-foreground text-pretty max-w-2xl mx-auto px-2">
              Discover the talented individuals who bring stories to life on stage. Each artist brings their unique
              voice, passion, and dedication to the art of theatre.
            </p>
          </div>
        </div>
      </section>

      <section className="py-8 px-4">
        <div className="container">
          {/* Mobile Search */}
          {isMobile && (
            <div className="mb-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Search artists..."
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

          {/* Filter Header */}
          <div className="mb-6 flex justify-between items-center">
            <h2 className="font-playfair text-lg md:text-xl font-bold">
              {hasActiveFilters
                ? `${filteredArtists.length} Artist${filteredArtists.length !== 1 ? "s" : ""} Found`
                : `All Artists (${artists.length})`}
            </h2>

            {/* Desktop Filter Toggle */}
            <Button
              variant="outline"
              className="hidden md:flex items-center gap-2 rounded-full bg-transparent"
              onClick={() => setShowDesktopFilters(!showDesktopFilters)}
            >
              <Filter className="h-4 w-4" />
              {showDesktopFilters ? "Hide Filters" : "Show Filters"}
              {activeFilterCount > 0 && (
                <Badge variant="secondary" className="ml-1 h-5 w-5 rounded-full p-0 flex items-center justify-center">
                  {activeFilterCount}
                </Badge>
              )}
              {showDesktopFilters ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
            </Button>

            {/* Mobile Filter Toggle */}
            <Button
              variant="outline"
              className="md:hidden flex items-center gap-2 rounded-full bg-transparent"
              onClick={() => setShowDesktopFilters(!showDesktopFilters)}
            >
              <Filter className="h-4 w-4" />
              Filters
              {activeFilterCount > 0 && (
                <Badge variant="secondary" className="ml-1 h-5 w-5 rounded-full p-0 flex items-center justify-center">
                  {activeFilterCount}
                </Badge>
              )}
            </Button>
          </div>

          {/* Active Filters Display */}
          {hasActiveFilters && (
            <div className="mb-6 flex flex-wrap gap-2 items-center">
              {filters.search && (
                <div className="bg-gray-100 text-gray-800 text-xs md:text-sm px-3 py-1.5 rounded-full flex items-center gap-2">
                  <span className="truncate max-w-[150px]">Search: {filters.search}</span>
                  <button
                    onClick={() => handleFilterChange("search", "")}
                    className="text-gray-500 hover:text-gray-700"
                    aria-label="Remove search filter"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </div>
              )}
              {filters.location && (
                <div className="bg-gray-100 text-gray-800 text-xs md:text-sm px-3 py-1.5 rounded-full flex items-center gap-2">
                  <span className="truncate max-w-[150px]">Location: {filters.location}</span>
                  <button
                    onClick={() => handleFilterChange("location", "")}
                    className="text-gray-500 hover:text-gray-700"
                    aria-label="Remove location filter"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </div>
              )}
              {filters.language && (
                <div className="bg-gray-100 text-gray-800 text-xs md:text-sm px-3 py-1.5 rounded-full flex items-center gap-2">
                  <span className="truncate max-w-[150px]">Language: {filters.language}</span>
                  <button
                    onClick={() => handleFilterChange("language", "")}
                    className="text-gray-500 hover:text-gray-700"
                    aria-label="Remove language filter"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </div>
              )}
              {filters.skill && (
                <div className="bg-gray-100 text-gray-800 text-xs md:text-sm px-3 py-1.5 rounded-full flex items-center gap-2">
                  <span className="truncate max-w-[150px]">Skill: {filters.skill}</span>
                  <button
                    onClick={() => handleFilterChange("skill", "")}
                    className="text-gray-500 hover:text-gray-700"
                    aria-label="Remove skill filter"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </div>
              )}
              <Button
                variant="ghost"
                size="sm"
                onClick={clearFilters}
                className="text-xs md:text-sm h-7 px-3 text-gray-500 hover:text-gray-700"
              >
                Clear all
              </Button>
            </div>
          )}

          {/* Filter Controls */}
          {showDesktopFilters && (
            <div className="mb-8 p-6 bg-gray-50 rounded-xl">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {/* Search - Desktop only */}
                <div className="hidden md:block relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    type="text"
                    placeholder="Search artists..."
                    className="pl-10 rounded-full"
                    value={filters.search}
                    onChange={(e) => handleFilterChange("search", e.target.value)}
                  />
                </div>

                {/* Location Filter */}
                <Select
                  value={filters.location}
                  onValueChange={(value) => handleFilterChange("location", value === "all" ? "" : value)}
                >
                  <SelectTrigger className="rounded-full">
                    <SelectValue placeholder="All Locations" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Locations</SelectItem>
                    {locations.map((location) => (
                      <SelectItem key={location} value={location}>
                        {location}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                {/* Language Filter */}
                <Select
                  value={filters.language}
                  onValueChange={(value) => handleFilterChange("language", value === "all" ? "" : value)}
                >
                  <SelectTrigger className="rounded-full">
                    <SelectValue placeholder="All Languages" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Languages</SelectItem>
                    {allLanguages.map((language) => (
                      <SelectItem key={language} value={language}>
                        {language}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                {/* Skills Filter */}
                <Select
                  value={filters.skill}
                  onValueChange={(value) => handleFilterChange("skill", value === "all" ? "" : value)}
                >
                  <SelectTrigger className="rounded-full">
                    <SelectValue placeholder="All Skills" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Skills</SelectItem>
                    {allSkills.map((skill) => (
                      <SelectItem key={skill} value={skill}>
                        {skill}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Artists Grid */}
      <section className="py-8 px-4">
        <div className="container">
          {filteredArtists.length > 0 ? (
            <div className="grid gap-8 sm:gap-10 md:gap-12 lg:gap-16">
              {filteredArtists.map((artist) => (
                <Card
                  key={artist.id}
                  className="overflow-hidden border-0 shadow-lg hover:shadow-xl transition-shadow duration-300"
                >
                  <div className="grid md:grid-cols-5 gap-4 sm:gap-6 md:gap-8 p-4 sm:p-6 md:p-8 lg:p-12">
                    {/* Artist Image */}
                    <div className="md:col-span-2">
                      <Link href={`/theatre-artists/${artist.id}`} className="block">
                        <div className="relative w-full aspect-[3/4] rounded-xl sm:rounded-2xl overflow-hidden bg-muted group cursor-pointer">
                          <Image
                            src={artist.image || "/placeholder.svg"}
                            alt={artist.name}
                            fill
                            className="object-cover transition-transform duration-300 group-hover:scale-105"
                            sizes="(max-width: 640px) 100vw, (max-width: 768px) 100vw, 40vw"
                            priority
                          />
                          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-300 flex items-center justify-center">
                            <span className="text-white font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center gap-2">
                              <ExternalLink className="h-4 w-4" />
                              View Profile
                            </span>
                          </div>
                        </div>
                      </Link>
                    </div>

                    {/* Artist Details */}
                    <div className="md:col-span-3 space-y-4 sm:space-y-6 md:space-y-8 overflow-hidden">
                      {/* Header */}
                      <div className="space-y-3 sm:space-y-4">
                        <div className="flex items-start justify-between gap-2 sm:gap-4">
                          <div className="flex-1 min-w-0">
                            <Link
                              href={`/theatre-artists/${artist.id}`}
                              className="hover:text-primary transition-colors"
                            >
                              <h2 className="font-playfair text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-balance break-words leading-tight hover:underline decoration-primary/50 underline-offset-4">
                                {artist.name}
                              </h2>
                            </Link>
                            {artist.credential && (
                              <div className="mt-2 sm:mt-3 inline-flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-4 py-1.5 sm:py-2 rounded-full bg-primary/10 text-primary border border-primary/20">
                                <Award className="h-3 w-3 sm:h-4 sm:w-4 flex-shrink-0" />
                                <span className="text-xs sm:text-sm font-semibold break-words">
                                  {artist.credential}
                                </span>
                              </div>
                            )}
                            <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 mt-2 sm:mt-3 text-muted-foreground text-sm sm:text-base">
                              <MapPin className="h-3 w-3 sm:h-4 sm:w-4 flex-shrink-0" />
                              <span className="break-words">{artist.location}</span>
                              {artist.age && (
                                <>
                                  <span className="text-muted-foreground/60">•</span>
                                  <span>{artist.age} years</span>
                                </>
                              )}
                            </div>
                          </div>
                          <div className="flex gap-1.5 sm:gap-2 flex-shrink-0">
                            <ShareProfileButton artistId={artist.id} artistName={artist.name} />
                            {artist.instagram && (
                              <Link href={artist.instagram} target="_blank" rel="noopener noreferrer">
                                <Button
                                  size="icon"
                                  variant="outline"
                                  className="rounded-full bg-transparent h-8 w-8 sm:h-10 sm:w-10"
                                >
                                  <Instagram className="h-4 w-4 sm:h-5 sm:w-5" />
                                </Button>
                              </Link>
                            )}
                            {artist.facebook && (
                              <Link href={artist.facebook} target="_blank" rel="noopener noreferrer">
                                <Button
                                  size="icon"
                                  variant="outline"
                                  className="rounded-full bg-transparent h-8 w-8 sm:h-10 sm:w-10"
                                >
                                  <Facebook className="h-4 w-4 sm:h-5 sm:w-5" />
                                </Button>
                              </Link>
                            )}
                            {artist.youtube && (
                              <Link href={artist.youtube} target="_blank" rel="noopener noreferrer">
                                <Button
                                  size="icon"
                                  variant="outline"
                                  className="rounded-full bg-transparent h-8 w-8 sm:h-10 sm:w-10"
                                >
                                  <Youtube className="h-4 w-4 sm:h-5 sm:w-5" />
                                </Button>
                              </Link>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Quick Info */}
                      <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
                        <div className="space-y-2 min-w-0">
                          <div className="flex items-center gap-2 text-xs sm:text-sm font-medium text-muted-foreground">
                            <Languages className="h-3 w-3 sm:h-4 sm:w-4 flex-shrink-0" />
                            <span>Languages</span>
                          </div>
                          <div className="flex flex-wrap gap-1.5 sm:gap-2">
                            {artist.languages.map((lang) => (
                              <Badge key={lang} variant="secondary" className="text-xs sm:text-sm">
                                {lang}
                              </Badge>
                            ))}
                          </div>
                        </div>

                        {artist.email && (
                          <div className="space-y-2 min-w-0">
                            <div className="flex items-center gap-2 text-xs sm:text-sm font-medium text-muted-foreground">
                              <Mail className="h-3 w-3 sm:h-4 sm:w-4 flex-shrink-0" />
                              <span>Email</span>
                            </div>
                            <Link
                              href={`mailto:${artist.email}`}
                              className="text-xs sm:text-sm text-primary hover:underline block truncate"
                              title={artist.email}
                            >
                              {artist.email}
                            </Link>
                          </div>
                        )}
                      </div>

                      {artist.whatsapp && (
                        <div className="space-y-2 min-w-0">
                          <div className="flex items-center gap-2 text-xs sm:text-sm font-medium text-muted-foreground">
                            <Phone className="h-3 w-3 sm:h-4 sm:w-4 flex-shrink-0" />
                            <span>WhatsApp</span>
                          </div>
                          <Link
                            href={`https://wa.me/${artist.whatsapp}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs sm:text-sm text-primary hover:underline block break-all"
                          >
                            +91 {artist.whatsapp}
                          </Link>
                        </div>
                      )}

                      {/* Interests */}
                      <div className="space-y-2 sm:space-y-3">
                        <h3 className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                          Areas of Interest
                        </h3>
                        <div className="flex flex-wrap gap-1.5 sm:gap-2">
                          {artist.interests.map((interest) => (
                            <Badge
                              key={interest}
                              variant="outline"
                              className="text-xs sm:text-sm px-2 sm:px-3 py-0.5 sm:py-1"
                            >
                              {interest}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      {/* Bio */}
                      <div className="space-y-2 sm:space-y-3">
                        <h3 className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                          About
                        </h3>
                        <p className="text-sm sm:text-base leading-relaxed text-foreground/90 text-pretty break-words">
                          {artist.bio}
                        </p>
                      </div>

                      {/* CTA */}
                      <div className="pt-2 sm:pt-4 flex flex-wrap gap-2 sm:gap-3">
                        <Link href={`/theatre-artists/${artist.id}`}>
                          <Button size="sm" variant="default" className="rounded-full text-xs sm:text-sm h-9 sm:h-11">
                            <ExternalLink className="h-3 w-3 sm:h-4 sm:w-4 mr-1.5 sm:mr-2" />
                            View Full Profile
                          </Button>
                        </Link>
                        {artist.email && (
                          <Link href={`mailto:${artist.email}`}>
                            <Button
                              size="sm"
                              variant="outline"
                              className="rounded-full bg-transparent text-xs sm:text-sm h-9 sm:h-11"
                            >
                              <Mail className="h-3 w-3 sm:h-4 sm:w-4 mr-1.5 sm:mr-2" />
                              Email
                            </Button>
                          </Link>
                        )}
                        {artist.whatsapp && (
                          <Link href={`https://wa.me/${artist.whatsapp}`} target="_blank" rel="noopener noreferrer">
                            <Button
                              size="sm"
                              variant="outline"
                              className="rounded-full bg-transparent text-xs sm:text-sm h-9 sm:h-11"
                            >
                              <Phone className="h-3 w-3 sm:h-4 sm:w-4 mr-1.5 sm:mr-2" />
                              WhatsApp
                            </Button>
                          </Link>
                        )}
                        {artist.youtube && (
                          <Link href={artist.youtube} target="_blank" rel="noopener noreferrer">
                            <Button
                              size="sm"
                              variant="outline"
                              className="rounded-full bg-transparent text-xs sm:text-sm h-9 sm:h-11"
                            >
                              <Youtube className="h-3 w-3 sm:h-4 sm:w-4 mr-1.5 sm:mr-2" />
                              YouTube
                            </Button>
                          </Link>
                        )}
                        {artist.facebook && (
                          <Link href={artist.facebook} target="_blank" rel="noopener noreferrer">
                            <Button
                              size="sm"
                              variant="outline"
                              className="rounded-full bg-transparent text-xs sm:text-sm h-9 sm:h-11"
                            >
                              <Facebook className="h-3 w-3 sm:h-4 sm:w-4 mr-1.5 sm:mr-2" />
                              Facebook
                            </Button>
                          </Link>
                        )}
                        {artist.instagram && !artist.email && !artist.whatsapp && (
                          <Link href={artist.instagram} target="_blank" rel="noopener noreferrer">
                            <Button size="sm" className="rounded-full text-xs sm:text-sm h-9 sm:h-11">
                              <Instagram className="h-3 w-3 sm:h-4 sm:w-4 mr-1.5 sm:mr-2" />
                              Contact on Instagram
                            </Button>
                          </Link>
                        )}
                        <ShareProfileButton artistId={artist.id} artistName={artist.name} variant="button" />
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-gray-50 rounded-xl">
              <p className="text-gray-500 mb-4 text-lg">No artists match your current filters.</p>
              <Button onClick={clearFilters} variant="outline" className="rounded-full bg-transparent">
                Clear Filters
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 sm:py-16 md:py-20 px-4">
        <div className="container">
          <Card className="relative overflow-hidden border-0 bg-gradient-to-br from-primary/10 via-primary/5 to-accent/10">
            <div className="absolute inset-0 bg-grid-white/5" />
            <div className="relative p-6 sm:p-10 md:p-12 lg:p-16 text-center space-y-4 sm:space-y-6">
              <h2 className="font-playfair text-2xl sm:text-3xl md:text-4xl font-bold text-balance">
                Join Our Theatre Community
              </h2>
              <p className="text-sm sm:text-base md:text-lg text-muted-foreground max-w-2xl mx-auto text-pretty px-2">
                Are you a theatre artist looking to connect with like-minded individuals? Join Abhinayपथ and become part
                of a vibrant community dedicated to the performing arts.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center pt-2 sm:pt-4">
                <Link href="/join-community">
                  <Button size="lg" className="rounded-full w-full sm:w-auto">
                    Join Community
                  </Button>
                </Link>
                <Link href="/contact">
                  <Button size="lg" variant="outline" className="rounded-full bg-transparent w-full sm:w-auto">
                    Contact Us
                  </Button>
                </Link>
              </div>
            </div>
          </Card>
        </div>
      </section>
    </div>
  )
}
