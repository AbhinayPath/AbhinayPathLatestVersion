"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Calendar, MapPin, Users, Phone, Mail, Clock, GraduationCap, CheckCircle } from "lucide-react"
import WorkshopBanner from "@/components/workshop-banner"


export default function WorkshopDetailContent({ id }: { id: String }) {

  const [workshop, setWorkshop] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let canceled = false;
    (async () => {
      try {
        const res = await fetch(`/api/workshops/${id}`)
        const data = await res.json()
        if (!res.ok) throw new Error(data?.error || 'Failed to load workshop')
        const api = data.workshop
        const firstSession = Array.isArray(api?.workshop_sessions) && api.workshop_sessions.length ? api.workshop_sessions[0] : null
        const viewWorkshop = {
          id: api.id,
          title: api.title,
          trainer: '',
          institution: '',
          location: api.city || (api.platform ? `Online (${api.platform})` : 'Online'),
          state: api.location_mode === 'online' ? 'All India' : api.state || '',
          date: firstSession ? new Date(firstSession.session_date).toLocaleDateString() : '',
          time: firstSession ? firstSession.start_time : '',
          description: api.description,
          image: api.cover_image || '',
          registrationLink: api.registration_link || '',
          featured: api.status === 'published',
          price: api.fee_type === 'paid' ? (api.fee_amount ? `₹${api.fee_amount}` : 'Paid') : 'Free',
          contact: api.whatsapp_number || '',
          email: api.email || '',
          fullDetails: {
            venue: api.venue || '',
            capacity: api.capacity || '',
            format: api.location_mode === 'online' ? 'Online' : 'In person',
          },
        }
        if (!canceled) setWorkshop(viewWorkshop)
      } catch (e) {
        if (!canceled) setWorkshop(null)
      } finally {
        if (!canceled) setLoading(false)
      }
    })()
    return () => {
      canceled = true
    }
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

      {/* <WorkshopBanner /> */}

      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="relative h-48 md:h-64 w-full">
          <Image
            src={workshop.image || "/images/acting-workshop.png"}
            alt={workshop.title}
            fill
            className="object-cover"
            onError={(e) => {
              e.currentTarget.src = "/placeholder.svg?height=300&width=500&text=Acting+Workshop"
            }}
          />
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
            {workshop.institution && <span className="badge-outline">{workshop.institution}</span>}
          </div>

          <h1 className="font-playfair text-2xl md:text-3xl font-bold mb-2 md:mb-4">{workshop.title}</h1>
          {workshop.trainer && (
  <p className="text-primary font-medium mb-4 md:mb-6">By {workshop.trainer}</p>
)}
          <div className="mb-6 md:mb-8">


                        <h2 className="font-playfair text-lg md:text-xl font-bold mb-3 md:mb-4">Workshop Details</h2>
            <p className="text-gray-600 text-sm md:text-base">{workshop.description}</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-2 md:gap-6 mb-6 md:mb-8">

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 mb-6 md:mb-8">
            <div>
              <div className="space-y-3 md:space-y-4">
                
                
                <div className="flex items-start">
                  <MapPin className="h-5 w-5 mr-2 text-primary mt-0.5" />
                  <div>
                    <p className="font-medium">Location</p>
                    <p className="text-gray-600 text-sm md:text-base">
                      {workshop.fullDetails?.venue || workshop.location}
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

                {workshop.fullDetails?.organizer && (
                  <div className="flex items-start">
                    <div className="h-5 w-5 mr-2 flex items-center justify-center text-primary mt-0.5">
                      <span className="font-bold">🏢</span>
                    </div>
                    <div>
                      <p className="font-medium">Organizers</p>
                      <p className="text-gray-600 text-sm md:text-base">{workshop.fullDetails.organizer}</p>
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

                {workshop.fullDetails?.medium && (
                  <div className="flex items-start">
                    <div className="h-5 w-5 mr-2 flex items-center justify-center text-primary mt-0.5">
                      <span className="font-bold">🗣️</span>
                    </div>
                    <div>
                      <p className="font-medium">Medium</p>
                      <p className="text-gray-600 text-sm md:text-base">{workshop.fullDetails.medium}</p>
                    </div>
                  </div>
                )}

                {workshop.fullDetails?.capacity && (
                  <div className="flex items-start">
                    <div className="h-5 w-5 mr-2 flex items-center justify-center text-primary mt-0.5">
                      <span className="font-bold">👥</span>
                    </div>
                    <div>
                      <p className="font-medium">Capacity</p>
                      <p className="text-gray-600 text-sm md:text-base">{workshop.fullDetails.capacity}</p>
                    </div>
                  </div>
                )}

                {workshop.fullDetails?.topic && (
                  <div className="flex items-start">
                    <div className="h-5 w-5 mr-2 flex items-center justify-center text-primary mt-0.5">
                      <span className="font-bold">📚</span>
                    </div>
                    <div>
                      <p className="font-medium">Topic</p>
                      <p className="text-gray-600 text-sm md:text-base">{workshop.fullDetails.topic}</p>
                    </div>
                  </div>
                )}

                {workshop.fullDetails?.prerequisites && (
                  <div className="flex items-start">
                    <div className="h-5 w-5 mr-2 flex items-center justify-center text-primary mt-0.5">
                      <span className="font-bold">📋</span>
                    </div>
                    <div>
                      <p className="font-medium">Prerequisites</p>
                      <p className="text-gray-600 text-sm md:text-base">{workshop.fullDetails.prerequisites}</p>
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

              {workshop.fullDetails?.methodology && (
                <div className="mb-5">
                  <h2 className="font-playfair text-lg md:text-xl font-bold mb-3">Methodology</h2>
                  <ul className="list-disc pl-5 space-y-1 text-gray-600 text-sm md:text-base">
                    {workshop.fullDetails.methodology.map((item: string, index: number) => (
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

              {workshop.fullDetails?.applicationProcess && (
                <div className="mb-5">
                  <h2 className="font-playfair text-lg md:text-xl font-bold mb-3">Application Process</h2>
                  <ul className="list-disc pl-5 space-y-1 text-gray-600 text-sm md:text-base">
                    {workshop.fullDetails.applicationProcess.map((item: string, index: number) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                </div>
              )}

              {workshop.fullDetails?.contactInfo && (
                <div className="mb-5">
                  <h2 className="font-playfair text-lg md:text-xl font-bold mb-3">Contact Information</h2>
                  <ul className="list-disc pl-5 space-y-1 text-gray-600 text-sm md:text-base">
                    {workshop.fullDetails.contactInfo.map((item: string, index: number) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                </div>
              )}

              {workshop.fullDetails?.techRequirements && (
                <div className="mb-5">
                  <h2 className="font-playfair text-lg md:text-xl font-bold mb-3">Technical Requirements</h2>
                  <ul className="list-disc pl-5 space-y-1 text-gray-600 text-sm md:text-base">
                    {workshop.fullDetails.techRequirements.map((item: string, index: number) => (
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

              {workshop.fullDetails?.aboutInstructor && (
                <div className="mb-5">
                  <h2 className="font-playfair text-lg md:text-xl font-bold mb-3">About the Instructor</h2>
                  <p className="text-gray-600 text-sm md:text-base">{workshop.fullDetails.aboutInstructor}</p>
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
                    href={`https://wa.me/91${workshop.contact.replace(/\D/g, "")}`}
                    className="flex items-center gap-2 bg-green-500 text-white px-3 py-2 rounded-md hover:bg-green-600 transition-colors text-sm"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Phone className="h-4 w-4" />
                    WhatsApp
                  </a>
                )}

                {workshop.email && (
                  <a
                    href={`mailto:${workshop.email}`}
                    className="flex items-center gap-2 bg-blue-500 text-white px-3 py-2 rounded-md hover:bg-blue-600 transition-colors text-sm"
                  >
                    <Mail className="h-4 w-4" />
                    Email
                  </a>
                )}

                {workshop.instagram && (
                  <a
                    href={`https://instagram.com/${workshop.instagram.replace("@", "")}`}
                    className="flex items-center gap-2 bg-pink-500 text-white px-3 py-2 rounded-md hover:bg-pink-600 transition-colors text-sm"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                    </svg>
                    Instagram
                  </a>
                )}
              </div>
            </div>
          </div>
           </div>
        </div>
      </div>
    </div>
  )
}
