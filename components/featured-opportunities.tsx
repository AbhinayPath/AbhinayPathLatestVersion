"use client"

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, MapPin, Star, ArrowRight, Clock } from "lucide-react"

// Featured workshops data - subset of the most important opportunities
const featuredOpportunities = [
  {
    id: 31,
    title: "Educational Theatre National Workshop",
    shortDescription:
      "Comprehensive 5-day workshop on educational theatre techniques, drama in education, and creative pedagogy by IIET.",
    trainer: "IIET Faculty",
    institution: "Indian Institute of Educational Theatre",
    location: "Mumbai",
    state: "Maharashtra",
    date: "15-19 March 2025",
    time: "10 AM - 5 PM",
    price: "₹8,500",
    registrationLink: "https://www.instagram.com/iiet_mumbai/",
    featured: true,
    category: "Educational Theatre",
    duration: "5 days",
    image: "/images/iiet-logo.png",
  },
  {
    id: 1,
    title: "Advanced Acting Masterclass",
    shortDescription:
      "Intensive masterclass covering method acting, character development, and scene work with industry professionals.",
    trainer: "Rajesh Kumar",
    institution: "Mumbai Theatre Academy",
    location: "Mumbai",
    state: "Maharashtra",
    date: "20-25 March 2025",
    time: "2 PM - 6 PM",
    price: "₹12,000",
    registrationLink: "#",
    featured: true,
    category: "Acting Workshop",
    duration: "6 days",
    image: "/images/acting-workshop.png",
  },
  {
    id: 4,
    title: "Theatre Direction Workshop",
    shortDescription:
      "Learn the fundamentals of theatre direction, script analysis, and working with actors in this comprehensive workshop.",
    trainer: "Priya Sharma",
    institution: "Delhi Theatre Collective",
    location: "New Delhi",
    state: "Delhi",
    date: "1-10 April 2025",
    time: "11 AM - 3 PM",
    price: "₹15,000",
    registrationLink: "#",
    featured: true,
    category: "Direction",
    duration: "10 days",
    image: "/images/acting-workshop.png",
  },
  {
    id: 5,
    title: "Voice and Diction for Actors",
    shortDescription:
      "Master voice projection, articulation, and speech techniques essential for stage and screen performance.",
    trainer: "Dr. Meera Joshi",
    institution: "Vocal Arts Institute",
    location: "Pune",
    state: "Maharashtra",
    date: "5-12 April 2025",
    time: "10 AM - 1 PM",
    price: "₹7,500",
    registrationLink: "#",
    featured: true,
    category: "Voice Training",
    duration: "8 days",
    image: "/images/acting-workshop.png",
  },
]

export default function FeaturedOpportunities() {
  return (
    <section className="py-16 md:py-24 bg-gradient-to-br from-gray-50 to-white">
      <div className="container px-4 sm:px-6">
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16">
          <Badge className="bg-[#2D1A54]/10 text-[#2D1A54] hover:bg-[#2D1A54]/20 mb-4">
            <Star className="h-3.5 w-3.5 mr-1 fill-current" />
            Featured Opportunities
          </Badge>
          <h2 className="font-playfair text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-gray-900">
            Don't Miss These <span className="text-primary">Workshops</span>
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto leading-relaxed">
            Handpicked opportunities from top institutions and industry professionals. Limited seats available.
          </p>
        </div>

        {/* Preview Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 mb-12">
          {featuredOpportunities.map((opportunity) => (
            <Card
              key={opportunity.id}
              className="group overflow-hidden border-0 shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 bg-white rounded-2xl"
            >
              {/* Card Image */}
              <div className="relative h-48 md:h-56 overflow-hidden">
                <Image
                  src={opportunity.image || "/placeholder.svg"}
                  alt={opportunity.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                {/* Overlay Badges */}
                <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                  <Badge className="bg-white/90 text-gray-900 hover:bg-white font-medium">{opportunity.category}</Badge>
                  {opportunity.featured && (
                    <Badge className="bg-[#F5A623] text-[#2D1A54] hover:bg-[#e69b1e] font-medium">
                      <Star className="h-3 w-3 mr-1 fill-current" />
                      Featured
                    </Badge>
                  )}
                </div>

                {/* Price Badge */}
                <div className="absolute top-4 right-4">
                  <Badge className="bg-primary text-white hover:bg-primary/90 font-bold text-sm px-3 py-1">
                    {opportunity.price}
                  </Badge>
                </div>

                {/* Title Overlay */}
                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="font-playfair text-xl md:text-2xl font-bold text-white mb-1 line-clamp-2">
                    {opportunity.title}
                  </h3>
                  <p className="text-white/90 text-sm font-medium">by {opportunity.trainer}</p>
                </div>
              </div>

              {/* Card Content */}
              <CardContent className="p-6 md:p-8">
                {/* Institution */}
                <div className="flex items-center mb-4">
                  <div className="w-2 h-2 bg-primary rounded-full mr-3"></div>
                  <span className="text-primary font-semibold text-sm">{opportunity.institution}</span>
                </div>

                {/* Description */}
                <p className="text-gray-600 text-sm md:text-base leading-relaxed mb-6 line-clamp-3">
                  {opportunity.shortDescription}
                </p>

                {/* Details Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                  <div className="flex items-center text-sm text-gray-600">
                    <Calendar className="h-4 w-4 mr-2 text-primary flex-shrink-0" />
                    <span className="truncate">{opportunity.date}</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <Clock className="h-4 w-4 mr-2 text-gray-500 flex-shrink-0" />
                    <span className="truncate">{opportunity.duration}</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600 sm:col-span-2">
                    <MapPin className="h-4 w-4 mr-2 text-gray-500 flex-shrink-0" />
                    <span className="truncate">
                      {opportunity.location}, {opportunity.state}
                    </span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-3">
                  <Link href={`/workshops/${opportunity.id}`} className="flex-1">
                    <Button
                      variant="outline"
                      className="w-full rounded-full border-2 border-gray-200 hover:border-primary hover:text-primary transition-all font-medium bg-transparent"
                    >
                      View Details
                    </Button>
                  </Link>
                  <Link href={opportunity.registrationLink} target="_blank" className="flex-1">
                    <Button className="w-full rounded-full bg-primary hover:bg-primary/90 text-white font-medium transition-all group">
                      Register Now
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center">
          <Link href="/workshops">
            <Button
              size="lg"
              variant="outline"
              className="rounded-full border-2 border-primary text-primary hover:bg-primary hover:text-white transition-all px-8 py-6 h-auto font-medium group bg-transparent"
            >
              View All Workshops
              <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
