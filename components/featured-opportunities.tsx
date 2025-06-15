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
    id: 2,
    title: "NSD Theatre-in-Education Certificate Course",
    shortDescription:
      "3-month intensive program by National School of Drama focusing on educational theatre techniques and actor-teacher development.",
    trainer: "NSD TIE Company",
    institution: "National School of Drama",
    location: "New Delhi",
    state: "Delhi",
    date: "2 June – 31 August 2025",
    time: "10 AM – 1 PM / 2 PM – 5 PM",
    price: "₹35,000",
    registrationLink: "https://nsd.gov.in",
    featured: true,
    category: "Certificate Course",
    duration: "3 months",
    image: "/images/acting-workshop.png",
  },
  {
    id: 3,
    title: "Anatomy of a Scene - Acting Workshop",
    shortDescription:
      "Master Meisner & Uta Hagen techniques with FTII alumnus. Includes scene analysis, improvisation, and recorded performance.",
    trainer: "Manas Gupta",
    institution: "FTII Alumnus",
    location: "Mumbai",
    state: "Maharashtra",
    date: "1 – 13 June 2025",
    time: "11 AM – 2 PM",
    price: "Contact for details",
    registrationLink: "tel:+918652722682",
    featured: true,
    category: "Acting Workshop",
    duration: "13 days",
    image: "/images/acting-workshop.png",
  },
  {
    id: 7,
    title: "FTII Tribute to Raj Kapoor Workshop",
    shortDescription:
      "Explore Raj Kapoor's cinematic legacy through iconic song sequences. Learn storytelling through the Golden Era of Hindi cinema.",
    trainer: "Dr. Milind Damle",
    institution: "Film and Television Institute of India",
    location: "New Delhi",
    state: "Delhi",
    date: "12–13 July 2025",
    time: "10 AM – 5 PM",
    price: "₹1,500",
    registrationLink:
      "https://ftii.ac.in/p/vtwa/basic-course-in-appreciating-songs-in-raj-kapoor-films-in-delhi-12-13-july-2025",
    featured: true,
    category: "Film Appreciation",
    duration: "2 days",
    image: "/images/acting-workshop.png",
  },
  {
    id: 12,
    title: "FTII Screenwriting Course - Online",
    shortDescription:
      "Master feature film screenwriting with core elements of storytelling, character development, and story structure.",
    trainer: "Vikas Sharma",
    institution: "Film and Television Institute of India",
    location: "Online",
    state: "All India",
    date: "16–27 June 2025",
    time: "10 AM–12 PM & 1 PM–3 PM",
    price: "₹14,000",
    registrationLink:
      "https://ftii.ac.in/p/ftii-online-1/basic-course-in-the-art-of-feature-film-writing-16-27-june-2025-online",
    featured: true,
    category: "Screenwriting",
    duration: "10 days",
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
                      className="w-full rounded-full border-2 border-gray-200 hover:border-primary hover:text-primary transition-all font-medium"
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
              className="rounded-full border-2 border-primary text-primary hover:bg-primary hover:text-white transition-all px-8 py-6 h-auto font-medium group"
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
