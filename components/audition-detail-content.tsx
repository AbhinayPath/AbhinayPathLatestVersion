"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Calendar, MapPin, Users, Phone, Instagram, CheckCircle } from "lucide-react"
import AuditionBanner from "@/components/audition-banner"

// This would typically come from a database, but for now we'll use the same data
const auditions = [
  {
    id: 1,
    title: "PAN-INDIA CASTING CALL – Cement Brand Ad Shoot (Tamil)",
    type: "Commercial",
    location: "Mumbai",
    state: "Maharashtra",
    date: "18–25 May 2025",
    director: "Inorita Productions",
    description:
      "Brand: Ultratech Cement. Usage: 2 years (TV, Digital, Cinema). Roles: Father (55 yrs), Mother (50 yrs), Tai Ji (60 yrs) – Wife of father's elder brother. Requirements: Fluent in Tamil, Experienced, expressive, natural actors. Immediate audition needed.",
    company: "Inorita Productions",
    companyLink: "https://instagram.com/indriyaproductions",
    contact: "88841 28712",
    contactType: "whatsapp",
    experience: "Experienced",
    verified: true,
    image: "/placeholder.svg?height=300&width=500&text=Cement+Ad+Casting",
    fullDetails: {
      brand: "Ultratech Cement",
      shootDates: "18–25 May 2025",
      location: "Mumbai + 1 other city",
      usage: "2 years (TV, Digital, Cinema)",
      roles: [
        {
          name: "Father",
          age: "55 yrs",
          requirements: "Fluent in Tamil, Experienced, expressive, natural actor",
        },
        {
          name: "Mother",
          age: "50 yrs",
          requirements: "Fluent in Tamil, Experienced, expressive, natural actor",
        },
        {
          name: "Tai Ji",
          age: "60 yrs",
          description: "Wife of father's elder brother",
          requirements: "Fluent in Tamil, Experienced, expressive, natural actor",
        },
      ],
      requirements: ["Fluent in Tamil", "Experienced, expressive, natural actors", "Immediate audition needed"],
    },
  },
  {
    id: 2,
    title: "CASTING CALL – Friendship App DVC (Kannada/Malayalam)",
    type: "Digital",
    location: "Bangalore",
    state: "Karnataka",
    date: "16, 17, or 19 May 2025",
    director: "Inorita Productions",
    description:
      "Budget: Medium. Roles: 3 Female Artists (20–28 yrs, Fluent in Kannada), 2 Female Artists (20–28 yrs, Fluent in Malayalam). Requirements: Comfortable with western/knee-length/low neckline dresses, Good screen presence.",
    company: "Inorita Productions",
    companyLink: "https://instagram.com/indriyaproductions",
    contact: "88841 28712",
    contactType: "whatsapp",
    experience: "All Levels",
    verified: true,
    image: "/placeholder.svg?height=300&width=500&text=Friendship+App+DVC",
    fullDetails: {
      shootDates: "16, 17, or 19 May 2025 (One day shoot)",
      location: "Bangalore",
      budget: "Medium",
      roles: [
        {
          name: "Female Artists (Kannada)",
          count: 3,
          age: "20–28 yrs",
          requirements:
            "Fluent in Kannada, Comfortable with western/knee-length/low neckline dresses, Good screen presence",
        },
        {
          name: "Female Artists (Malayalam)",
          count: 2,
          age: "20–28 yrs",
          requirements:
            "Fluent in Malayalam, Comfortable with western/knee-length/low neckline dresses, Good screen presence",
        },
      ],
      requirements: ["Comfortable wearing western/knee-length/low neckline dresses", "Good screen presence"],
    },
  },
  {
    id: 3,
    title: "Audition for Hindi Comedy Play – Kalayan Theatre Group",
    type: "Theater",
    location: "Bangalore",
    state: "Karnataka",
    date: "Ongoing",
    director: "Kalayan Theatre Group",
    description:
      "Play Title: Kab Tak Rahein Kunware. Language: Hindi (must read Devanagari). Age Group: 25–35 yrs. Location: Koramangala, Bangalore. Rehearsals: Weekends, then weekday evenings closer to show. Show Dates: August/September 2025.",
    company: "Kalayan Theatre Group",
    companyLink: "tel:9663304790",
    contact: "Amit Aggarwal – 96633 04790",
    contactType: "phone",
    experience: "All Levels",
    verified: true,
    image: "/placeholder.svg?height=300&width=500&text=Hindi+Comedy+Play",
    fullDetails: {
      playTitle: "Kab Tak Rahein Kunware",
      language: "Hindi (must read Devanagari script)",
      ageGroup: "25–35 years",
      location: "Koramangala, Bangalore",
      rehearsals: "Weekends (Weekday evenings closer to show)",
      showDates: "August/September 2025",
      director: "Amit Aggarwal",
      requirements: [
        "Must be able to read Hindi in Devanagari script",
        "Age between 25-35 years",
        "Available for weekend rehearsals",
        "Available for weekday evening rehearsals closer to show dates",
      ],
    },
  },
]

export default function AuditionDetailContent({ id }: { id: number }) {
  const [audition, setAudition] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // In a real app, this would be an API call
    const foundAudition = auditions.find((a) => a.id === id)
    setAudition(foundAudition)
    setLoading(false)
  }, [id])

  if (loading) {
    return <div className="container py-12">Loading audition details...</div>
  }

  if (!audition) {
    return (
      <div className="container py-12 text-center">
        <h1 className="text-2xl font-bold mb-4">Audition Not Found</h1>
        <p className="mb-6">The audition you're looking for doesn't exist or has been removed.</p>
        <Link href="/auditions">
          <Button>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Auditions
          </Button>
        </Link>
      </div>
    )
  }

  return (
    <div className="container py-12">
      <Link href="/auditions" className="inline-flex items-center text-primary hover:underline mb-6">
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Auditions
      </Link>

      <AuditionBanner />

      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="relative h-64 w-full">
          <Image src="/images/auditions-stage.png" alt={audition.title} fill className="object-cover" />
          {audition.verified && (
            <div className="absolute top-4 right-4 bg-green-500 text-white px-3 py-1 rounded-full flex items-center">
              <CheckCircle className="h-4 w-4 mr-1" />
              Verified Listing
            </div>
          )}
        </div>

        <div className="p-8">
          <div className="flex flex-wrap gap-2 mb-4">
            <span className="badge-primary">{audition.type}</span>
            <span className="badge-outline">{audition.experience}</span>
          </div>

          <h1 className="font-playfair text-3xl font-bold mb-4">{audition.title}</h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <div>
              <h2 className="font-playfair text-xl font-bold mb-4">Audition Details</h2>
              <div className="space-y-4">
                <div className="flex items-start">
                  <MapPin className="h-5 w-5 mr-2 text-primary mt-0.5" />
                  <div>
                    <p className="font-medium">Location</p>
                    <p className="text-gray-600">
                      {audition.fullDetails.location || `${audition.location}, ${audition.state}`}
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <Calendar className="h-5 w-5 mr-2 text-primary mt-0.5" />
                  <div>
                    <p className="font-medium">Dates</p>
                    <p className="text-gray-600">{audition.fullDetails.shootDates || audition.date}</p>
                  </div>
                </div>

                {audition.fullDetails.budget && (
                  <div className="flex items-start">
                    <div className="h-5 w-5 mr-2 flex items-center justify-center text-primary mt-0.5">
                      <span className="font-bold">₹</span>
                    </div>
                    <div>
                      <p className="font-medium">Budget</p>
                      <p className="text-gray-600">{audition.fullDetails.budget}</p>
                    </div>
                  </div>
                )}

                {audition.fullDetails.usage && (
                  <div className="flex items-start">
                    <div className="h-5 w-5 mr-2 flex items-center justify-center text-primary mt-0.5">
                      <span className="font-bold">📺</span>
                    </div>
                    <div>
                      <p className="font-medium">Usage</p>
                      <p className="text-gray-600">{audition.fullDetails.usage}</p>
                    </div>
                  </div>
                )}

                {audition.fullDetails.brand && (
                  <div className="flex items-start">
                    <div className="h-5 w-5 mr-2 flex items-center justify-center text-primary mt-0.5">
                      <span className="font-bold">🏢</span>
                    </div>
                    <div>
                      <p className="font-medium">Brand</p>
                      <p className="text-gray-600">{audition.fullDetails.brand}</p>
                    </div>
                  </div>
                )}

                {audition.fullDetails.playTitle && (
                  <div className="flex items-start">
                    <div className="h-5 w-5 mr-2 flex items-center justify-center text-primary mt-0.5">
                      <span className="font-bold">🎭</span>
                    </div>
                    <div>
                      <p className="font-medium">Play Title</p>
                      <p className="text-gray-600">{audition.fullDetails.playTitle}</p>
                    </div>
                  </div>
                )}

                {audition.fullDetails.language && (
                  <div className="flex items-start">
                    <div className="h-5 w-5 mr-2 flex items-center justify-center text-primary mt-0.5">
                      <span className="font-bold">🗣️</span>
                    </div>
                    <div>
                      <p className="font-medium">Language</p>
                      <p className="text-gray-600">{audition.fullDetails.language}</p>
                    </div>
                  </div>
                )}

                {audition.fullDetails.rehearsals && (
                  <div className="flex items-start">
                    <div className="h-5 w-5 mr-2 flex items-center justify-center text-primary mt-0.5">
                      <span className="font-bold">🎬</span>
                    </div>
                    <div>
                      <p className="font-medium">Rehearsals</p>
                      <p className="text-gray-600">{audition.fullDetails.rehearsals}</p>
                    </div>
                  </div>
                )}

                {audition.fullDetails.showDates && (
                  <div className="flex items-start">
                    <div className="h-5 w-5 mr-2 flex items-center justify-center text-primary mt-0.5">
                      <span className="font-bold">📅</span>
                    </div>
                    <div>
                      <p className="font-medium">Show Dates</p>
                      <p className="text-gray-600">{audition.fullDetails.showDates}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div>
              <h2 className="font-playfair text-xl font-bold mb-4">Roles & Requirements</h2>

              {audition.fullDetails.roles && (
                <div className="mb-6">
                  <h3 className="font-medium text-lg mb-2 flex items-center">
                    <Users className="h-4 w-4 mr-2 text-primary" />
                    Roles
                  </h3>
                  <div className="space-y-4">
                    {audition.fullDetails.roles.map((role: any, index: number) => (
                      <div key={index} className="bg-gray-50 p-4 rounded-md">
                        <p className="font-medium">
                          {role.count ? `${role.count}x ` : ""}
                          {role.name} {role.age ? `(${role.age})` : ""}
                        </p>
                        {role.description && <p className="text-gray-600 text-sm">{role.description}</p>}
                        {role.requirements && (
                          <p className="text-gray-600 text-sm mt-1">Requirements: {role.requirements}</p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {audition.fullDetails.requirements && (
                <div>
                  <h3 className="font-medium text-lg mb-2">Requirements</h3>
                  <ul className="list-disc pl-5 space-y-1 text-gray-600">
                    {audition.fullDetails.requirements.map((req: string, index: number) => (
                      <li key={index}>{req}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>

          <div className="border-t pt-6">
            <h2 className="font-playfair text-xl font-bold mb-4">Contact Information</h2>
            <div className="flex flex-wrap gap-4 items-center">
              <div>
                <p className="font-medium">Production Company</p>
                <p className="text-gray-600">{audition.company}</p>
              </div>

              <div className="flex gap-3 ml-auto">
                {audition.contactType === "whatsapp" && (
                  <a
                    href={`https://wa.me/91${audition.contact}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition-colors"
                  >
                    <Phone className="h-5 w-5" />
                    WhatsApp Now
                  </a>
                )}

                {audition.contactType === "phone" && (
                  <a
                    href={`tel:+91${audition.contact.replace(/\D/g, "")}`}
                    className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors"
                  >
                    <Phone className="h-5 w-5" />
                    Call Now
                  </a>
                )}

                {audition.companyLink.includes("instagram") && (
                  <a
                    href={audition.companyLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 bg-purple-500 text-white px-4 py-2 rounded-md hover:bg-purple-600 transition-colors"
                  >
                    <Instagram className="h-5 w-5" />
                    Instagram
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
