"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowLeft, Calendar, MapPin, Users, Phone, Mail, Clock, GraduationCap, CheckCircle, CalendarIcon, IndianRupee, Building, MessageSquare } from "lucide-react"

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
          trainer: api.trainer || '',
          institution: api.institution || '',
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
    <div className="container py-8 sm:py-12 bg-gray-50 min-h-screen">
      <div className="max-w-4xl mx-auto">
        <Link href="/workshops" className="inline-flex items-center text-purple-600 hover:text-purple-700 font-medium mb-8 transition-colors group">
          <ArrowLeft className="mr-2 h-4 w-4 group-hover:-translate-x-1 transition-transform" />
          Back to Workshops
        </Link>

        <Card className="overflow-hidden border-none shadow-xl bg-white rounded-2xl">
          <div className="relative h-64 sm:h-96 w-full">
            <Image
              src={workshop.image || "/images/acting-workshop.png"}
              alt={workshop.title}
              fill
              className="object-cover"
              onError={(e) => {
                const target = e.target as HTMLImageElement
                target.src = "/placeholder.svg?height=300&width=500&text=Acting+Workshop"
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

            {workshop.featured && (
              <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm text-green-700 text-xs font-bold px-4 py-2 rounded-full flex items-center shadow-lg border border-green-100">
                <CheckCircle className="h-4 w-4 mr-1.5 fill-green-50" />
                VERIFIED WORKSHOP
              </div>
            )}

            <div className="absolute bottom-6 left-6 right-6">
              <div className="flex flex-wrap gap-2 mb-3">
                <Badge className="bg-purple-600/90 hover:bg-purple-600 border-none px-3 py-1 text-xs">
                  Workshop
                </Badge>
                {workshop.institution && (
                  <Badge className="bg-amber-500/90 hover:bg-amber-500 border-none px-3 py-1 text-xs">
                    {workshop.institution}
                  </Badge>
                )}
              </div>
              <h1 className="font-playfair text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight drop-shadow-md">
                {workshop.title}
              </h1>
              {workshop.trainer && (
                <p className="text-white/90 font-medium mt-2">By {workshop.trainer}</p>
              )}
            </div>
          </div>

          <CardContent className="p-6 sm:p-10">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
              {/* Main Content */}
              <div className="lg:col-span-2 space-y-8">

                {/* Meta Row */}
                <div className="flex flex-wrap items-center gap-6 p-4 bg-gray-50 rounded-xl border border-gray-100">
                  <div className="flex items-center text-gray-700">
                    <CalendarIcon className="h-5 w-5 mr-3 text-purple-500" />
                    <div>
                      <p className="text-[10px] uppercase tracking-wider text-gray-500 font-bold">Dates</p>
                      <p className="font-medium">{workshop.date || "Not Specified"}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center text-gray-700">
                    <Clock className="h-5 w-5 mr-3 text-purple-500" />
                    <div>
                      <p className="text-[10px] uppercase tracking-wider text-gray-500 font-bold">Time</p>
                      <p className="font-medium">{workshop.time || "Not Specified"}</p>
                    </div>
                  </div>

                  <div className="flex items-center text-gray-700">
                    <MapPin className="h-5 w-5 mr-3 text-purple-500" />
                    <div>
                      <p className="text-[10px] uppercase tracking-wider text-gray-500 font-bold">Location</p>
                      <p className="font-medium">
                        {workshop.fullDetails?.venue || workshop.location}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Description */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <div className="h-6 w-1 bg-purple-600 rounded-full" />
                    <h2 className="text-2xl font-bold text-gray-900 font-playfair">Workshop Details</h2>
                  </div>
                  <div className="prose prose-purple max-w-none text-gray-700 leading-relaxed [&_ul]:list-disc [&_ul]:pl-5 [&_ol]:list-decimal [&_ol]:pl-5 space-y-3">
                    {workshop.description ? (
                      <div className="whitespace-pre-line">{workshop.description}</div>
                    ) : (
                      <p className="italic text-gray-500">No description provided.</p>
                    )}
                  </div>
                </div>

                {/* Requirements & Roles (Other Details) */}
                {(workshop.ageGroup || workshop.eligibility || workshop.fullDetails?.duration || workshop.fullDetails?.format) && (
                  <div className="space-y-6 pt-8 border-t border-gray-100">
                    <div className="flex items-center gap-2">
                      <div className="h-6 w-1 bg-purple-600 rounded-full" />
                      <h2 className="text-2xl font-bold text-gray-900 font-playfair">Additional Information</h2>
                    </div>
                    
                    <div className="flex flex-wrap gap-2 pt-2">
                      {workshop.fullDetails?.duration && (
                        <Badge variant="secondary" className="px-4 py-2 bg-gray-100 text-gray-700 border-none text-sm">
                          Duration: {workshop.fullDetails.duration}
                        </Badge>
                      )}
                      {workshop.fullDetails?.format && (
                        <Badge variant="secondary" className="px-4 py-2 bg-gray-100 text-gray-700 border-none text-sm">
                          Format: {workshop.fullDetails.format}
                        </Badge>
                      )}
                      {workshop.ageGroup && (
                        <Badge variant="secondary" className="px-4 py-2 bg-gray-100 text-gray-700 border-none text-sm">
                          Age Group: {workshop.ageGroup}
                        </Badge>
                      )}
                      {workshop.eligibility && (
                        <Badge variant="secondary" className="px-4 py-2 bg-gray-100 text-gray-700 border-none text-sm">
                          Eligibility: {workshop.eligibility}
                        </Badge>
                      )}
                      {workshop.fullDetails?.capacity && (
                        <Badge variant="secondary" className="px-4 py-2 bg-gray-100 text-gray-700 border-none text-sm">
                          Capacity: {workshop.fullDetails.capacity}
                        </Badge>
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* Sidebar Action Card */}
              <div className="lg:col-span-1">
                <div className="p-8 bg-purple-50 rounded-2xl border border-purple-100 flex flex-col items-center text-center space-y-8 sticky top-24 shadow-sm h-fit">
                  {/* Workshop Summary */}
                  <div className="space-y-4 w-full">
                    <h3 className="text-xs font-bold text-purple-900 uppercase tracking-widest">Workshop Summary</h3>
                    <div className="w-full border-t border-purple-200/50"></div>

                    <div className="space-y-4 w-full">
                      <div className="flex flex-col items-center gap-3">
                        <div className="h-12 w-12 rounded-full bg-white flex items-center justify-center shadow-sm text-purple-600">
                          <Building className="h-6 w-6" />
                        </div>
                        <p className="font-bold text-gray-900 text-lg leading-tight">
                          Hosted by {workshop.institution || workshop.trainer || "Reputed Institution"}
                        </p>
                      </div>
                    </div>

                    <div className="flex justify-center items-center gap-2">
                      <div className="h-10 w-10 rounded-full bg-white flex items-center justify-center shadow-sm text-purple-600 mb-1">
                        <IndianRupee className="h-5 w-5" />
                      </div>
                      <p className="font-semibold text-gray-900 px-5">
                        {workshop.price}
                      </p>
                    </div>
                  </div>

                  <div className="w-full border-t border-purple-200/50"></div>

                  {/* Action Button */}
                  <div className="w-full flex justify-center pt-2">
                    {workshop.registrationLink && (
                      <Button asChild className="w-full h-12 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold shadow-md border-none transition-all hover:scale-[1.05] active:scale-95 mx-auto">
                        <a href={workshop.registrationLink} target="_blank" rel="noopener noreferrer">
                          Register Now
                        </a>
                      </Button>
                    )}
                  </div>
                  
                  {/* Contact Info */}
                  <div className="w-full pt-4">
                    <p className="text-[10px] font-bold text-purple-900 uppercase tracking-widest mb-3">Contact Info</p>
                    <div className="flex flex-wrap gap-2 justify-center">
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
                    </div>
                  </div>

                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
