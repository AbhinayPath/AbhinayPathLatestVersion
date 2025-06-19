"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ArrowLeft, MapPin, Calendar, Building, Phone, MessageSquare, CheckCircle, Mail } from "lucide-react"

// This would typically come from an API or database
const auditions = [
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
    image: "/images/auditions-stage.png",
    requirements: [
      "Must be able to read Hindi in Devanagari script",
      "Age between 25-35 years",
      "Available for weekend rehearsals",
      "Available for weekday evening rehearsals closer to show dates",
      "Based in or near Koramangala, Bangalore",
    ],
    roles: ["Multiple male and female roles available", "Exact character details will be shared during audition"],
    applicationProcess: "Contact Amit Aggarwal at the provided phone number to schedule an audition slot.",
  },
  {
    id: 4,
    title: "CASTING CALL FOR A PLAY CALLED 'ONCE THERE WAS A WAY'",
    type: "Theater",
    location: "Bengaluru",
    state: "Karnataka",
    date: "Ongoing",
    director: "Theater Production",
    description:
      "Need artists who are based in Bengaluru (theatre actors). Male actor: age 21-25 (should know how to play a guitar). Male actor: age 30+. Female actor: age 30+. Male actor: age 50+. DM for more details.",
    company: "Theater Production",
    companyLink: "tel:+917330684137",
    contact: "+917330684137",
    contactType: "phone",
    experience: "All Levels",
    verified: true,
    image: "/images/auditions-stage.png",
    requirements: [
      "Must be based in Bengaluru",
      "Previous theater experience preferred",
      "Male actor (21-25) must know how to play guitar",
      "Available for rehearsals (schedule to be discussed)",
    ],
    roles: [
      "Male actor: age 21-25 (must know how to play guitar)",
      "Male actor: age 30+",
      "Female actor: age 30+",
      "Male actor: age 50+",
    ],
    applicationProcess: "Contact the production team at the provided phone number for audition details and scheduling.",
  },
  {
    id: 5,
    title: "Lead Role Actress for Kannada Feature Film - Mute Character",
    type: "Film",
    location: "Bangalore",
    state: "Karnataka",
    date: "Ongoing",
    director: "CINECUBES",
    description:
      'We are looking for a lead role actress for our Kannada feature film (language is not a barrier). The character is of a mute girl. So, language is not a barrier. Facial expressions are the most important factors along with the ability to use a mute girl\'s sounds like "bhaaaah...", "mahhh..."',
    company: "CINECUBES",
    companyLink: "https://wa.me/919886028205",
    contact: "+91 9886028205 (WhatsApp)",
    contactType: "whatsapp",
    experience: "All Levels",
    verified: true,
    image: "/images/auditions-stage.png",
    requirements: [
      "Facial expressions are the most important factor",
      'Ability to use mute girl\'s sounds like "bhaaaah...", "mahhh..."',
      "Language is not a barrier (character is mute)",
      "Screen age: Around 20 years",
    ],
    roles: [
      "Lead role - Mute girl character",
      "Character description: Innocent, Lot of pain in eyes, A warrior mother with fire in eyes",
    ],
    applicationProcess:
      "Record a video of yourself performing the audition task and WhatsApp to +91 9886028205. Audition task: Scenario where few people are about to harm her 6-month-old baby but she is helpless to stop them. 1) Start by looking into camera (baby) with light smile. 2) Smile turns into laugh indicating she can't do anything. Laugh is not loud but there is intensive pain behind it. 3) Laugh turns into an inside cry with lot of pain in eyes. 4) Laugh turns into a blank expression looking deep into camera. She is trying to hide the pain but eyes are filled with painful tears.",
  },
  {
    id: 6,
    title: "Casting Call for Web Series - 'Digital Nomads'",
    type: "Web Series",
    location: "Mumbai",
    state: "Maharashtra",
    date: "June 15-30, 2025",
    director: "Horizon Studios",
    description:
      "Casting for an upcoming web series about a group of digital nomads traveling across India while working remotely. Looking for diverse cast members who can portray tech professionals with different backgrounds and personalities.",
    company: "Horizon Studios",
    companyLink: "mailto:casting@horizonstudios.in",
    contact: "casting@horizonstudios.in",
    contactType: "email",
    experience: "Experienced",
    verified: true,
    image: "/images/auditions-stage.png",
    requirements: [
      "Previous acting experience in web series or films",
      "Age range: 25-40 years",
      "Comfortable with technology (will be using laptops/devices on screen)",
      "Available for a 45-day shoot schedule across multiple locations in India",
      "Good English communication skills",
      "Hindi speaking ability preferred but not mandatory",
    ],
    roles: [
      "Lead Role: Software Developer (Male/Female, 28-35 years)",
      "Lead Role: Digital Marketing Specialist (Female, 25-32 years)",
      "Supporting Role: UX Designer (Male/Female, 25-35 years)",
      "Supporting Role: Content Creator/Vlogger (Male/Female, 25-30 years)",
      "Supporting Role: Startup Founder (Male, 35-40 years)",
      "Supporting Role: Cybersecurity Expert (Male/Female, 30-40 years)",
    ],
    applicationProcess:
      "Send your updated portfolio, headshots, and a self-tape audition to casting@horizonstudios.in. For the self-tape, please record a 2-minute scene showing your character working remotely in a challenging environment (e.g., poor internet, noisy cafe, etc.) and how they handle the situation. Include your name, contact details, and the role you're applying for in the email subject line.",
  },
  {
    id: 7,
    title: "Casting Call for 2-Minute Short Film - Family Drama",
    type: "Short Film",
    location: "Bangalore",
    state: "Karnataka",
    date: "May 26-27, 2025",
    director: "Independent Filmmaker",
    description:
      "Casting for a 2-minute short film shot in Bangalore. Language: Hindi and English (Hinglish). Roles: Gen Z female (17-21), supportive mother (40s-50s), and sarcastic father (40s-50s). This is a PAID opportunity. Apply via WhatsApp specifying the role you're interested in.",
    company: "Independent Production",
    companyLink: "https://wa.me/919862853175",
    contact: "9862853175 (WhatsApp)",
    contactType: "whatsapp",
    experience: "All Levels",
    verified: true,
    image: "/images/auditions-stage.png",
    requirements: [
      "Must be comfortable with Hindi and English (Hinglish) dialogue",
      "Must be available on either May 26th or 27th, 2025 for the shoot",
      "Must be based in or able to travel to Bangalore",
      "Previous acting experience is preferred but not mandatory",
      "Must be comfortable with the filming process and taking direction",
    ],
    roles: [
      "Gen Z Female (17-21 years): Confident, slightly rebellious character with good emotional range. Should be able to portray both vulnerability and strength.",
      "Supportive Mother (40s-50s): Warm, understanding character who balances traditional values with modern thinking. Requires subtle emotional expressions.",
      "Sarcastic Father (40s-50s): Witty, slightly stern but loving character. Should have good comic timing and ability to deliver sarcastic lines naturally.",
    ],
    applicationProcess:
      "Send a WhatsApp message to 9862853175 clearly mentioning which role you're applying for. Include your name, age, location, previous acting experience (if any), and a recent photo. Selected candidates will be called for a brief audition. This is a PAID opportunity - compensation details will be discussed during the selection process.",
  },
  {
    id: 8,
    title: "Requirement for Public Speaking Teacher",
    type: "Teaching",
    location: "Multiple Schools",
    state: "Karnataka",
    date: "Apply by June 27, 2025",
    director: "Educational Institution",
    description:
      "Seeking qualified public speaking teachers for multiple schools in Bangalore. Teaching commitment from July 2025 to February 2026. Classes once a month, 01:30 PM to 04:30 PM for grades 6 & 7 and 8 & 9. Lesson plans and teacher's guide will be provided. This is a paid assignment opportunity open to actors, theatre practitioners, and educators with excellent communication skills.",
    company: "Educational Institution",
    companyLink: "https://wa.me/919632220405",
    contact: "9632220405 (WhatsApp)",
    contactType: "whatsapp",
    experience: "All Levels",
    verified: true,
    image: "/images/auditions-stage.png",
    requirements: [
      "Excellent communication and presentation skills",
      "Experience in public speaking, acting, or theatre preferred",
      "Comfortable working with students in grades 6-9",
      "Available for monthly sessions from July 2025 to February 2026",
      "Ability to engage and motivate young learners",
      "Professional attitude and punctuality",
      "Based in or able to travel to multiple locations in Bangalore",
    ],
    roles: [
      "Public Speaking Teacher for Grades 6 & 7 (01:30 PM to 04:30 PM, once a month)",
      "Public Speaking Teacher for Grades 8 & 9 (01:30 PM to 04:30 PM, once a month)",
      "Curriculum delivery using provided lesson plans and teacher's guide",
      "Student assessment and progress tracking",
    ],
    applicationProcess:
      "Contact via WhatsApp at 9632220405 to express your interest and schedule an interview. Please mention your relevant experience in public speaking, acting, or education. Application deadline: June 27, 2025. This is a paid teaching assignment with opportunities across multiple school locations in Bangalore.",
  },
  {
    id: 10,
    title: "NSD Hiring Theatre Artists (Grade B) - Sanskaar Rang Toli",
    type: "Job Opportunity",
    location: "New Delhi",
    state: "Delhi",
    date: "Apply: May 24 - June 23, 2025",
    director: "National School of Drama (NSD)",
    description:
      "Sanskaar Rang Toli (TIE Company), NSD, New Delhi is inviting online applications for 5 posts of Theatre Artist Grade B (working with children). This is a prestigious contractual position offering competitive compensation and the opportunity to work in Theatre in Education with one of India's premier drama institutions.",
    company: "National School of Drama (NSD)",
    companyLink: "https://www.nsd.gov.in",
    contact: "Apply online at www.nsd.gov.in",
    contactType: "website",
    experience: "Experienced",
    verified: true,
    image: "/images/auditions-stage.png",
    salary: "₹50,000–55,000/month (contractual)",
    duration: "Initially 1 year, extendable up to 5 years based on performance",
    numberOfPosts: 5,
    roleFocus: "Working with children (Theatre in Education - TIE)",
    applicationOpenDate: "May 24, 2025 (10 AM)",
    applicationCloseDate: "June 23, 2025 (5 PM)",
    applicationWebsite: "www.nsd.gov.in",
    requirements: [
      "NSD Graduate or Degree/Diploma in Dramatic Arts with 5+ years' acting experience",
      "Major roles in at least 10 productions",
      "Proficiency in Hindi language & speech",
    ],
    desirableSkills: [
      "Knowledge of dance, music, regional styles",
      "Direction experience",
      "Stagecraft knowledge",
      "Acting theories understanding",
    ],
    specialNotes: [
      "Applicants from 2024 shortlist need not reapply",
      "No TA/DA except for SC/ST candidates (as per norms)",
    ],
    roles: [
      "Theatre Artist Grade B - Working with children in Theatre in Education programs",
      "Conducting educational theatre workshops and performances",
      "Developing age-appropriate theatrical content for young audiences",
    ],
    applicationProcess:
      "Apply online through the official NSD website at www.nsd.gov.in during the application period from May 24, 2025 (10 AM) to June 23, 2025 (5 PM).",
  },
]

export default function AuditionDetailContent({ id }: { id: number }) {
  const [audition, setAudition] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    // Simulate API fetch with timeout
    const timer = setTimeout(() => {
      const foundAudition = auditions.find((a) => a.id === id)
      if (foundAudition) {
        setAudition(foundAudition)
        setLoading(false)
      } else {
        setError("Audition not found")
        setLoading(false)
      }
    }, 500)

    return () => clearTimeout(timer)
  }, [id])

  if (loading) {
    return (
      <div className="container py-12">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-3/4 mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2 mb-8"></div>
          <div className="h-64 bg-gray-200 rounded mb-6"></div>
          <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-5/6 mb-6"></div>
        </div>
      </div>
    )
  }

  if (error || !audition) {
    return (
      <div className="container py-12">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="font-playfair text-3xl font-bold mb-4">Audition Not Found</h1>
          <p className="text-gray-600 mb-6">The audition you're looking for doesn't exist or has been removed.</p>
          <Link href="/auditions">
            <Button>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Auditions
            </Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="container py-12">
      <Link href="/auditions" className="inline-flex items-center text-primary hover:underline mb-6">
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Auditions
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
            <div className="relative h-64 w-full">
              <Image
                src={audition.image || "/placeholder.svg"}
                alt={audition.title}
                fill
                className="object-cover"
                onError={(e) => {
                  // Fallback to default image on error
                  const target = e.target as HTMLImageElement
                  target.src = "/images/auditions-stage.png"
                }}
              />
              {audition.verified && (
                <div className="absolute top-4 right-4 bg-green-100 text-green-800 text-xs font-medium px-3 py-1.5 rounded-full flex items-center">
                  <CheckCircle className="h-3.5 w-3.5 mr-1" />
                  Verified Audition
                </div>
              )}
            </div>

            <div className="p-6">
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="badge-primary">{audition.type}</span>
                <span className="badge-outline">{audition.experience}</span>
                {(audition.id === 7 || audition.id === 8) && <span className="badge-success">Paid</span>}
              </div>

              <h1 className="font-playfair text-3xl font-bold mb-4">{audition.title}</h1>

              <div className="prose max-w-none">
                <h2 className="text-xl font-semibold mb-3">Description</h2>
                <p className="text-gray-800 mb-6">{audition.description}</p>

                {audition.id === 10 && (
                  <>
                    <section>
                      <h2 className="text-xl font-semibold mb-3">Position Details</h2>
                      <div className="bg-gray-50 p-4 rounded-lg mb-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <p className="font-medium text-gray-700">Salary</p>
                            <p className="text-gray-800">{audition.salary}</p>
                          </div>
                          <div>
                            <p className="font-medium text-gray-700">Duration</p>
                            <p className="text-gray-800">{audition.duration}</p>
                          </div>
                          <div>
                            <p className="font-medium text-gray-700">Number of Posts</p>
                            <p className="text-gray-800">{audition.numberOfPosts}</p>
                          </div>
                          <div>
                            <p className="font-medium text-gray-700">Role Focus</p>
                            <p className="text-gray-800">{audition.roleFocus}</p>
                          </div>
                        </div>
                      </div>
                    </section>

                    <section>
                      <h2 className="text-xl font-semibold mb-3">Eligibility Criteria</h2>
                      <ul className="list-disc pl-5 mb-6">
                        {audition.requirements.map((req: string, index: number) => (
                          <li key={index} className="text-gray-800 mb-2">
                            {req}
                          </li>
                        ))}
                      </ul>
                    </section>

                    <section>
                      <h2 className="text-xl font-semibold mb-3">Desirable Skills</h2>
                      <ul className="list-disc pl-5 mb-6">
                        {audition.desirableSkills.map((skill: string, index: number) => (
                          <li key={index} className="text-gray-800 mb-2">
                            {skill}
                          </li>
                        ))}
                      </ul>
                    </section>

                    <section>
                      <h2 className="text-xl font-semibold mb-3">Application Timeline</h2>
                      <div className="bg-blue-50 p-4 rounded-lg mb-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <p className="font-medium text-gray-700">Application Opens</p>
                            <p className="text-gray-800">{audition.applicationOpenDate}</p>
                          </div>
                          <div>
                            <p className="font-medium text-gray-700">Application Closes</p>
                            <p className="text-gray-800">{audition.applicationCloseDate}</p>
                          </div>
                        </div>
                      </div>
                    </section>

                    <section>
                      <h2 className="text-xl font-semibold mb-3">Important Notes</h2>
                      <div className="bg-yellow-50 p-4 rounded-lg mb-6">
                        <ul className="list-disc pl-5">
                          {audition.specialNotes.map((note: string, index: number) => (
                            <li key={index} className="text-gray-800 mb-2">
                              {note}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </section>
                  </>
                )}

                <h2 className="text-xl font-semibold mb-3">Roles</h2>
                <ul className="list-disc pl-5 mb-6">
                  {audition.roles.map((role: string, index: number) => (
                    <li key={index} className="text-gray-800 mb-2">
                      {role}
                    </li>
                  ))}
                </ul>

                <h2 className="text-xl font-semibold mb-3">Requirements</h2>
                <ul className="list-disc pl-5 mb-6">
                  {audition.requirements.map((req: string, index: number) => (
                    <li key={index} className="text-gray-800 mb-2">
                      {req}
                    </li>
                  ))}
                </ul>

                <h2 className="text-xl font-semibold mb-3">How to Apply</h2>
                <p className="text-gray-800 mb-6">{audition.applicationProcess}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg border border-gray-200 p-6 sticky top-24">
            <h2 className="font-playfair text-xl font-bold mb-4">Audition Details</h2>

            <div className="space-y-4">
              <div className="flex items-start">
                <Building className="h-5 w-5 text-gray-500 mt-0.5 mr-3" />
                <div>
                  <p className="font-medium text-gray-700">Production Company</p>
                  <p className="text-gray-800">{audition.company}</p>
                </div>
              </div>

              <div className="flex items-start">
                <MapPin className="h-5 w-5 text-gray-500 mt-0.5 mr-3" />
                <div>
                  <p className="font-medium text-gray-700">Location</p>
                  <p className="text-gray-800">
                    {audition.location}, {audition.state}
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <Calendar className="h-5 w-5 text-gray-500 mt-0.5 mr-3" />
                <div>
                  <p className="font-medium text-gray-700">Dates</p>
                  <p className="text-gray-800">{audition.date}</p>
                </div>
              </div>

              {audition.salary && (
                <div className="flex items-start">
                  <div className="h-5 w-5 mr-2 flex items-center justify-center text-primary mt-0.5">
                    <span className="font-bold">💰</span>
                  </div>
                  <div>
                    <p className="font-medium text-gray-700">Salary</p>
                    <p className="text-gray-800">{audition.salary}</p>
                  </div>
                </div>
              )}

              {audition.duration && (
                <div className="flex items-start">
                  <div className="h-5 w-5 mr-2 flex items-center justify-center text-primary mt-0.5">
                    <span className="font-bold">⏱️</span>
                  </div>
                  <div>
                    <p className="font-medium text-gray-700">Duration</p>
                    <p className="text-gray-800">{audition.duration}</p>
                  </div>
                </div>
              )}

              <div className="flex items-start">
                {audition.contactType === "email" ? (
                  <Mail className="h-5 w-5 text-gray-500 mt-0.5 mr-3" />
                ) : (
                  <Phone className="h-5 w-5 text-gray-500 mt-0.5 mr-3" />
                )}
                <div>
                  <p className="font-medium text-gray-700">Contact</p>
                  {audition.contactType === "email" ? (
                    <a href={`mailto:${audition.contact}`} className="text-primary hover:underline flex items-center">
                      {audition.contact}
                      <span className="ml-1 text-xs bg-blue-500 text-white px-1.5 py-0.5 rounded">Email</span>
                    </a>
                  ) : audition.contactType === "whatsapp" ? (
                    <a
                      href={`https://wa.me/${audition.contact.replace(/\D/g, "")}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline flex items-center"
                    >
                      {audition.contact}
                      <span className="ml-1 text-xs bg-green-500 text-white px-1.5 py-0.5 rounded">WhatsApp</span>
                    </a>
                  ) : (
                    <a
                      href={`tel:${audition.contact.replace(/\s/g, "")}`}
                      className="text-primary hover:underline flex items-center"
                    >
                      {audition.contact}
                      <span className="ml-1 text-xs bg-blue-500 text-white px-1.5 py-0.5 rounded">Call</span>
                    </a>
                  )}
                </div>
              </div>

              {(audition.id === 7 || audition.id === 8) && (
                <div className="flex items-start">
                  <div className="h-5 w-5 mr-2 flex items-center justify-center text-primary mt-0.5">
                    <span className="font-bold">💰</span>
                  </div>
                  <div>
                    <p className="font-medium">Compensation</p>
                    <p className="text-gray-600">
                      {audition.id === 7 ? "Paid opportunity (details during selection)" : "Paid teaching assignment"}
                    </p>
                  </div>
                </div>
              )}

              <div className="pt-4 mt-4 border-t border-gray-200">
                <a href={audition.companyLink} target="_blank" rel="noopener noreferrer" className="w-full">
                  <Button className="w-full rounded-md">
                    {audition.contactType === "email" ? (
                      <Mail className="mr-2 h-4 w-4" />
                    ) : audition.contactType === "whatsapp" ? (
                      <MessageSquare className="mr-2 h-4 w-4" />
                    ) : audition.id === 10 ? (
                      <Building className="mr-2 h-4 w-4" />
                    ) : (
                      <Phone className="mr-2 h-4 w-4" />
                    )}
                    {audition.id === 10 ? "Apply at NSD Website" : "Contact for Audition"}
                  </Button>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
