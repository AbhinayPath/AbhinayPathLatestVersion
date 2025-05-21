"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Calendar, MapPin, Users, Phone, Mail, Clock, GraduationCap, CheckCircle } from "lucide-react"
import WorkshopBanner from "@/components/workshop-banner"

// This would typically come from a database, but for now we'll use the same data
const workshops = [
  {
    id: 1,
    title: "NSD TIE Summer Workshop (Tripura)",
    trainer: "NSD (TIE Wing)",
    institution: "National School of Drama",
    location: "Tripura",
    state: "Tripura",
    date: "17 May – 7 June 2025",
    time: "9 AM – 2 PM",
    description:
      "Organized by NSD (TIE Wing) + SCERT, Govt. of Tripura. Located at Nazrul Kalakshetra + Schools across Tripura. For children aged 8–16 years. Forms available from 10th May – First come, first serve basis.",
    image: "/placeholder.svg?height=300&width=500&text=NSD+TIE+Workshop",
    registrationLink: "mailto:nsdtripura@gmail.com",
    featured: true,
    price: "Free",
    contact: "0381-2328797 / 9436511935",
    email: "nsdtripura@gmail.com",
    ageGroup: "8–16 years",
    fullDetails: {
      organizers: "NSD (TIE Wing) + SCERT, Government of Tripura",
      venue: "Nazrul Kalakshetra + Various Schools across Tripura",
      duration: "3 weeks",
      eligibility: "Children aged 8–16 years",
      applicationProcess: "Forms available from 10th May – First come, first serve basis",
      curriculum: [
        "Introduction to theater games and exercises",
        "Voice and movement training",
        "Character development",
        "Storytelling techniques",
        "Group performance skills",
      ],
      additionalInfo:
        "This is part of NSD's outreach program to promote theater education among children in Northeast India.",
    },
  },
  {
    id: 2,
    title: "NSD 3-Month Theatre-in-Education Certificate Course (Delhi)",
    trainer: "NSD TIE Company",
    institution: "National School of Drama",
    location: "New Delhi",
    state: "Delhi",
    date: "2 June – 31 August 2025",
    time: "Batch 1: 10 AM – 1 PM, Batch 2: 2 PM – 5 PM (Wednesday to Sunday)",
    description:
      "Eligibility: Graduate (any stream), Age 21+ (as of May 1, 2025), 3 years theatre or child-focused work, Proficient in Hindi/English, Physically & mentally fit. Application deadline: 25 May 2025, 6 PM.",
    image: "/placeholder.svg?height=300&width=500&text=NSD+Certificate+Course",
    registrationLink: "https://nsd.gov.in",
    featured: true,
    price: "₹35,000",
    contact: "011-23389054 / 23031137",
    email: "nsdtie@gmail.com",
    eligibility: "Graduate, Age 21+, 3 years experience",
    fullDetails: {
      venue: "NSD Premises, Mandi House, New Delhi",
      eligibilityCriteria: [
        "Graduate degree in any stream",
        "Minimum age 21 years (as of May 1, 2025)",
        "At least 3 years of experience in theater or child-focused work",
        "Proficient in Hindi/English",
        "Physically and mentally fit",
      ],
      applicationDeadline: "25 May 2025, 6 PM",
      selectionProcess: "Shortlisting based on application + Interview",
      curriculum: [
        "Practical training in storytelling",
        "Improvisation techniques",
        "Forum theatre methodologies",
        "Actor-Teacher development",
        "Final performance at NSD",
      ],
      certification: "Official certificate from National School of Drama upon successful completion",
    },
  },
  {
    id: 3,
    title: "'Anatomy of a Scene' – Acting Workshop (Mumbai)",
    trainer: "Manas Gupta",
    institution: "FTII Alumnus",
    location: "Mumbai",
    state: "Maharashtra",
    date: "1 – 13 June 2025",
    time: "11 AM – 2 PM",
    description:
      "Curated by Manas Gupta (FTII Alumnus). Located at Abhyaas Manch, Aram Nagar, Mumbai. What You'll Learn: Meisner & Uta Hagen Techniques, Scene analysis & improvisation, Final recorded performance, Guest lecture by Himanshu Prajapati (FTII).",
    image: "/placeholder.svg?height=300&width=500&text=Anatomy+of+a+Scene",
    registrationLink: "tel:+918652722682",
    featured: true,
    price: "Contact for details",
    contact: "+91 8652722682",
    instagram: "@anatomy_of_a_scene",
    fullDetails: {
      venue: "Abhyaas Manch, Aram Nagar, Mumbai",
      curriculum: [
        "Meisner Technique fundamentals",
        "Uta Hagen's approach to character building",
        "Scene analysis methodology",
        "Improvisation exercises",
        "Final recorded performance",
      ],
      specialFeature: "Guest lecture by Himanshu Prajapati (FTII)",
      batchSize: "Limited to 15 participants",
      prerequisites: "Basic understanding of acting principles recommended but not required",
      takeaways: "Participants will receive a recording of their final performance and a certificate of completion",
    },
  },
  {
    id: 4,
    title: "NSD's Certificate Course in Drama-in-Education (Delhi)",
    trainer: "National School of Drama",
    institution: "National School of Drama",
    location: "New Delhi",
    state: "Delhi",
    date: "2 June – 31 August 2025",
    time: "Morning: 10 AM – 1 PM, Afternoon: 2 PM – 5 PM",
    description:
      "Located at NSD Premises, Mandi House. Highlights: Practical training in storytelling, improvisation, forum theatre, Actor-Teacher development, Final performance at NSD. Official NSD Program.",
    image: "/placeholder.svg?height=300&width=500&text=NSD+Drama+in+Education",
    registrationLink: "https://nsd.gov.in",
    featured: true,
    price: "₹35,000",
    contact: "011-23389054, 23031137",
    email: "nsdtiegmail.com",
    tags: "#NSD #VerifiedWorkshop #TheatreEducation #DramaInEducation",
    fullDetails: {
      venue: "NSD Premises, Mandi House, New Delhi",
      eligibilityCriteria: [
        "Graduate degree in any stream",
        "Minimum age 21 years (as of May 1, 2025)",
        "At least 3 years of experience in theater or child-focused work",
        "Proficient in Hindi/English",
        "Physically and mentally fit",
      ],
      applicationDeadline: "25 May 2025, 6 PM",
      selectionProcess: "Shortlisting based on application + Interview",
      curriculum: [
        "Practical training in storytelling",
        "Improvisation techniques",
        "Forum theatre methodologies",
        "Actor-Teacher development",
        "Final performance at NSD",
      ],
      certification: "Official certificate from National School of Drama upon successful completion",
    },
  },
  {
    id: 5,
    title: "Educational Theatre National Workshop @ Mysore",
    trainer: "Rajneesh Bisht",
    institution: "Indian Institute of Educational Theatre",
    location: "Mysore",
    state: "Karnataka",
    date: "June 23 - July 2, 2025",
    time: "9:00 AM - 6:00 PM",
    description:
      "Step into a transformative journey where theatre meets education! Led by renowned theatre director and writer Rajneesh Bisht, and mentored by the visionary theatre stalwart Prasanna, this 10-day intensive workshop is designed for actors, educators, facilitators, and all those passionate about using theatre as a tool for learning and social change.",
    image: "/placeholder.svg?height=300&width=500&text=Educational+Theatre",
    registrationLink: "https://indiantheatrefoundation.org",
    featured: true,
    price: "₹16,000 (includes food & accommodation)",
    contact: "9845605012 / 9448871815",
    fullDetails: {
      venue: "Indian Institute of Educational Theatre, Mysore",
      mentors: ["Rajneesh Bisht - Theatre Director and Writer", "Prasanna - Theatre Stalwart"],
      duration: "10 days intensive residential program",
      includes: "Food and accommodation",
      curriculum: [
        "Theatre as a pedagogical tool",
        "Drama-based learning methodologies",
        "Creating educational theatre productions",
        "Facilitation techniques for educators",
        "Community theatre approaches",
      ],
      targetAudience: "Actors, educators, facilitators, and those interested in educational theatre",
      takeaways: "Participants will develop skills to use theatre as a tool for learning and social change",
    },
  },
  {
    id: 6,
    title: "Diploma in Applied Theatre 2025 - Batch 4",
    trainer: "Applied Theatre India",
    institution: "Applied Theatre India",
    location: "Online",
    state: "All India",
    date: "Starting August 15, 2025",
    time: "Flexible Program",
    description:
      "Transform lives through theatre! Join our groundbreaking program that bridges artistry with social impact. Curious about turning passion into purpose? Join our FREE WEBINAR on Sunday 11 May at 11 am to learn about our transformative curriculum.",
    image: "/placeholder.svg?height=300&width=500&text=Applied+Theatre",
    registrationLink: "https://education.appliedtheatreindia.com/l/4fc92006ec",
    featured: true,
    price: "Contact for details",
    contact: "Via website",
    fullDetails: {
      format: "Online program with optional in-person intensives",
      duration: "1 year (part-time)",
      upcomingWebinar: "Sunday 11 May at 11 am",
      curriculum: [
        "Foundations of Applied Theatre",
        "Theatre for Education",
        "Theatre for Social Change",
        "Theatre in Healthcare Settings",
        "Theatre for Community Development",
        "Research Methods in Applied Theatre",
      ],
      faculty: "Leading practitioners from India and international experts",
      certification: "Diploma certificate upon successful completion",
      careerOpportunities: [
        "Educational institutions",
        "NGOs and social organizations",
        "Healthcare settings",
        "Community development projects",
        "Independent applied theatre practitioner",
      ],
    },
  },
]

export default function WorkshopDetailContent({ id }: { id: number }) {
  const [workshop, setWorkshop] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // In a real app, this would be an API call
    const foundWorkshop = workshops.find((w) => w.id === id)
    setWorkshop(foundWorkshop)
    setLoading(false)
  }, [id])

  if (loading) {
    return (
      <div className="container py-6 md:py-12">
        <div className="animate-pulse space-y-4">
          <div className="h-48 bg-gray-200 rounded-lg"></div>
          <div className="h-8 w-3/4 bg-gray-200 rounded"></div>
          <div className="h-6 w-1/2 bg-gray-200 rounded"></div>
          <div className="space-y-2">
            <div className="h-4 bg-gray-200 rounded"></div>
            <div className="h-4 bg-gray-200 rounded"></div>
            <div className="h-4 w-5/6 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    )
  }

  if (!workshop) {
    return (
      <div className="container py-6 md:py-12 text-center">
        <h1 className="text-2xl font-bold mb-4">Workshop Not Found</h1>
        <p className="mb-6">The workshop you're looking for doesn't exist or has been removed.</p>
        <Link href="/workshops">
          <Button className="rounded-full">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Workshops
          </Button>
        </Link>
      </div>
    )
  }

  return (
    <div className="container py-6 md:py-12">
      <Link href="/workshops" className="inline-flex items-center text-primary hover:underline mb-4 md:mb-6">
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Workshops
      </Link>

      <WorkshopBanner />

      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="relative h-48 md:h-64 w-full">
          <Image src="/images/acting-workshop.png" alt={workshop.title} fill className="object-cover" />
          {workshop.featured && (
            <div className="absolute top-4 right-4 bg-secondary text-black px-3 py-1 rounded-full flex items-center">
              <CheckCircle className="h-4 w-4 mr-1" />
              Featured Workshop
            </div>
          )}
        </div>

        <div className="p-4 md:p-8">
          <div className="flex flex-wrap gap-2 mb-4">
            <span className="badge-primary">Workshop</span>
            <span className="badge-outline">{workshop.institution}</span>
          </div>

          <h1 className="font-playfair text-2xl md:text-3xl font-bold mb-2 md:mb-4">{workshop.title}</h1>
          <p className="text-primary font-medium mb-4 md:mb-6">By {workshop.trainer}</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 mb-6 md:mb-8">
            <div>
              <h2 className="font-playfair text-lg md:text-xl font-bold mb-3 md:mb-4">Workshop Details</h2>
              <div className="space-y-3 md:space-y-4">
                <div className="flex items-start">
                  <MapPin className="h-5 w-5 mr-2 text-primary mt-0.5" />
                  <div>
                    <p className="font-medium">Location</p>
                    <p className="text-gray-600 text-sm md:text-base">
                      {workshop.fullDetails?.venue || `${workshop.location}, ${workshop.state}`}
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <Calendar className="h-5 w-5 mr-2 text-primary mt-0.5" />
                  <div>
                    <p className="font-medium">Dates</p>
                    <p className="text-gray-600 text-sm md:text-base">{workshop.date}</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <Clock className="h-5 w-5 mr-2 text-primary mt-0.5" />
                  <div>
                    <p className="font-medium">Time</p>
                    <p className="text-gray-600 text-sm md:text-base">{workshop.time}</p>
                  </div>
                </div>

                {workshop.price && (
                  <div className="flex items-start">
                    <div className="h-5 w-5 mr-2 flex items-center justify-center text-primary mt-0.5">
                      <span className="font-bold">₹</span>
                    </div>
                    <div>
                      <p className="font-medium">Fee</p>
                      <p className="text-gray-600 text-sm md:text-base">{workshop.price}</p>
                    </div>
                  </div>
                )}

                {workshop.ageGroup && (
                  <div className="flex items-start">
                    <Users className="h-5 w-5 mr-2 text-primary mt-0.5" />
                    <div>
                      <p className="font-medium">Age Group</p>
                      <p className="text-gray-600 text-sm md:text-base">{workshop.ageGroup}</p>
                    </div>
                  </div>
                )}

                {workshop.eligibility && (
                  <div className="flex items-start">
                    <GraduationCap className="h-5 w-5 mr-2 text-primary mt-0.5" />
                    <div>
                      <p className="font-medium">Eligibility</p>
                      <p className="text-gray-600 text-sm md:text-base">{workshop.eligibility}</p>
                    </div>
                  </div>
                )}

                {workshop.fullDetails?.duration && (
                  <div className="flex items-start">
                    <div className="h-5 w-5 mr-2 flex items-center justify-center text-primary mt-0.5">
                      <span className="font-bold">⏱️</span>
                    </div>
                    <div>
                      <p className="font-medium">Duration</p>
                      <p className="text-gray-600 text-sm md:text-base">{workshop.fullDetails.duration}</p>
                    </div>
                  </div>
                )}

                {workshop.fullDetails?.format && (
                  <div className="flex items-start">
                    <div className="h-5 w-5 mr-2 flex items-center justify-center text-primary mt-0.5">
                      <span className="font-bold">🖥️</span>
                    </div>
                    <div>
                      <p className="font-medium">Format</p>
                      <p className="text-gray-600 text-sm md:text-base">{workshop.fullDetails.format}</p>
                    </div>
                  </div>
                )}

                {workshop.fullDetails?.organizers && (
                  <div className="flex items-start">
                    <div className="h-5 w-5 mr-2 flex items-center justify-center text-primary mt-0.5">
                      <span className="font-bold">🏢</span>
                    </div>
                    <div>
                      <p className="font-medium">Organizers</p>
                      <p className="text-gray-600 text-sm md:text-base">{workshop.fullDetails.organizers}</p>
                    </div>
                  </div>
                )}

                {workshop.fullDetails?.includes && (
                  <div className="flex items-start">
                    <div className="h-5 w-5 mr-2 flex items-center justify-center text-primary mt-0.5">
                      <span className="font-bold">✅</span>
                    </div>
                    <div>
                      <p className="font-medium">Includes</p>
                      <p className="text-gray-600 text-sm md:text-base">{workshop.fullDetails.includes}</p>
                    </div>
                  </div>
                )}

                {workshop.fullDetails?.upcomingWebinar && (
                  <div className="flex items-start">
                    <div className="h-5 w-5 mr-2 flex items-center justify-center text-primary mt-0.5">
                      <span className="font-bold">📺</span>
                    </div>
                    <div>
                      <p className="font-medium">Upcoming Webinar</p>
                      <p className="text-gray-600 text-sm md:text-base">{workshop.fullDetails.upcomingWebinar}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div>
              {workshop.fullDetails?.curriculum && (
                <div className="mb-5">
                  <h2 className="font-playfair text-lg md:text-xl font-bold mb-3">Curriculum</h2>
                  <ul className="list-disc pl-5 space-y-1 text-gray-600 text-sm md:text-base">
                    {workshop.fullDetails.curriculum.map((item: string, index: number) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                </div>
              )}

              {workshop.fullDetails?.eligibilityCriteria && (
                <div className="mb-5">
                  <h2 className="font-playfair text-lg md:text-xl font-bold mb-3">Eligibility Criteria</h2>
                  <ul className="list-disc pl-5 space-y-1 text-gray-600 text-sm md:text-base">
                    {workshop.fullDetails.eligibilityCriteria.map((item: string, index: number) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                </div>
              )}

              {workshop.fullDetails?.mentors && (
                <div className="mb-5">
                  <h2 className="font-playfair text-lg md:text-xl font-bold mb-3">Mentors</h2>
                  <ul className="list-disc pl-5 space-y-1 text-gray-600 text-sm md:text-base">
                    {workshop.fullDetails.mentors.map((item: string, index: number) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                </div>
              )}

              {workshop.fullDetails?.careerOpportunities && (
                <div className="mb-5">
                  <h2 className="font-playfair text-lg md:text-xl font-bold mb-3">Career Opportunities</h2>
                  <ul className="list-disc pl-5 space-y-1 text-gray-600 text-sm md:text-base">
                    {workshop.fullDetails.careerOpportunities.map((item: string, index: number) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                </div>
              )}

              {workshop.fullDetails?.takeaways && (
                <div className="mb-5">
                  <h2 className="font-playfair text-lg md:text-xl font-bold mb-3">Takeaways</h2>
                  <p className="text-gray-600 text-sm md:text-base">{workshop.fullDetails.takeaways}</p>
                </div>
              )}

              {workshop.fullDetails?.certification && (
                <div className="mb-5">
                  <h2 className="font-playfair text-lg md:text-xl font-bold mb-3">Certification</h2>
                  <p className="text-gray-600 text-sm md:text-base">{workshop.fullDetails.certification}</p>
                </div>
              )}

              {workshop.fullDetails?.additionalInfo && (
                <div className="mb-5">
                  <h2 className="font-playfair text-lg md:text-xl font-bold mb-3">Additional Information</h2>
                  <p className="text-gray-600 text-sm md:text-base">{workshop.fullDetails.additionalInfo}</p>
                </div>
              )}
            </div>
          </div>

          <div className="border-t pt-4 md:pt-6">
            <h2 className="font-playfair text-lg md:text-xl font-bold mb-3 md:mb-4">Contact Information</h2>
            <div className="flex flex-col md:flex-row md:items-center gap-4">
              <div>
                <p className="font-medium">Institution</p>
                <p className="text-gray-600 text-sm md:text-base">{workshop.institution}</p>
              </div>

              <div className="flex flex-wrap gap-2 md:ml-auto">
                {workshop.contact && workshop.contact !== "Via website" && (
                  <a
                    href={`tel:${workshop.contact.replace(/\D/g, "")}`}
                    className="flex items-center gap-2 bg-blue-500 text-white px-3 py-2 rounded-md hover:bg-blue-600 transition-colors text-sm"
                  >
                    <Phone className="h-4 w-4" />
                    Call
                  </a>
                )}

                {workshop.email && (
                  <a
                    href={`mailto:${workshop.email}`}
                    className="flex items-center gap-2 bg-green-500 text-white px-3 py-2 rounded-md hover:bg-green-600 transition-colors text-sm"
                  >
                    <Mail className="h-4 w-4" />
                    Email
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
