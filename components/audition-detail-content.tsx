"use client"

import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, CheckCircle, Building, Calendar, Mail, MapPin, MessageSquare, Phone, IndianRupee, CalendarIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
type Audition = {
  id: number
  title: string
  image?: string
  verified?: boolean
  type: string
  experience: string
  description: string
  roles: string[]
  requirements: string[]
  applicationProcess: string
  company: string
  companyLink: string
  location: string
  state: string
  date: string
  contactType: "email" | "phone" | "whatsapp"
  contact: string,
  contact_info: string,
  application_method: string,
  experience_required: string,
  city: string
  // Added to fetch organisation linked to the opportunity creator
  created_by: string
  venue?: string
  platform?: string
  location_mode: string
  deadline: string
  gender_preference: string
  age_min?: number
  age_max?: number
  languages?: string[]
  roles_needed?: string
  pay_type: string
  pay_amount?: string
}
import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase-browser"
import { toast } from "@/components/ui/use-toast"

export default function AuditionDetailContent({ audition, organisation }: { audition: Audition, organisation?: any | null }) {
  const [hasAlreadyApplied, setHasAlreadyApplied] = useState(false)
  const [loading, setLoading] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  // Organisation state (no longer used; organisation is provided via server-side props)
  const [organisationState, setOrganisationState] = useState<any | null>(null)
  const [orgLoadingState, setOrgLoadingState] = useState(false)

  useEffect(() => {
    const checkAlreadyApplied = async () => {
      try {
        setIsLoading(true)
        const user = await supabase.auth.getUser()
        const userId = user?.data?.user?.id
        if (!userId || !audition?.id) return
        const { data: existing } = await supabase
          .from("audition_registrations")
          .select("id")
          .eq("user_id", userId)
          .eq("opportunity_id", audition.id)
          .maybeSingle()
        if (existing) setHasAlreadyApplied(true)
      } catch (err) {
        // Optionally handle error
      } finally {
        setIsLoading(false)
      }
    }
    checkAlreadyApplied()
  }, [audition?.id])

  // Fetch organisation linked to the opportunity creator
  // Organisation is provided via server-side props on page load; no client-side fetch needed.
  // useEffect(() => {
  //   const fetchOrganisation = async () => {
  //     try {
  //       setOrgLoadingState(true)
  //       if (!audition?.created_by) return
  //       const res = await fetch(`/api/organisations?userId=${audition.created_by}`)
  //       if (!res.ok) throw new Error('Failed to fetch organisation')
  //       const data = await res.json()
  //       if (Array.isArray(data.organisations) && data.organisations.length > 0) {
  //         setOrganisationState(data.organisations[0])
  //       } else {
  //         setOrganisationState(null)
  //       }
  //     } catch (error) {
  //       console.error('Error fetching organisation:', error)
  //       setOrganisationState(null)
  //     } finally {
  //       setOrgLoadingState(false)
  //     }
  //   }
  //   fetchOrganisation()
  // }, [audition?.created_by])

  const handleApply = async () => {
    setLoading(true)
    try {
      // use singleton
      // const supabase = getSupabaseBrowserClient()
      const user = await supabase.auth.getUser()
      const userId = user?.data?.user?.id
      if (!userId) {
        toast({ title: "Please login to apply.", variant: "destructive" })
        setLoading(false)
        return
      }
      // Prevent duplicate applications
      const { data: existing } = await supabase
        .from("audition_registrations")
        .select("id")
        .eq("user_id", userId)
        .eq("opportunity_id", audition.id)
        .maybeSingle()
      if (existing) {
        toast({ title: "You’ve already applied.", variant: "destructive" })
        setHasAlreadyApplied(true)
        setLoading(false)
        return
      }
      const { error } = await supabase.from("audition_registrations").insert({
        user_id: userId,
        opportunity_id: audition.id

      })
      if (error) {
        toast({ title: "Failed to apply. Try again.", variant: "destructive" })
      } else {
        toast({ title: "Successfully applied!", variant: "default" })
        setHasAlreadyApplied(true)
      }
    } catch (err) {
      toast({ title: "Failed to apply. Try again.", variant: "destructive" })
    } finally {
      setLoading(false)
    }
  }

  if (!audition) {
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
    <div className="container py-8 sm:py-12 bg-gray-50 min-h-screen">
      <div className="max-w-4xl mx-auto">
        <Link href="/auditions" className="inline-flex items-center text-purple-600 hover:text-purple-700 font-medium mb-8 transition-colors group">
          <ArrowLeft className="mr-2 h-4 w-4 group-hover:-translate-x-1 transition-transform" />
          Back to Auditions
        </Link>

        <Card className="overflow-hidden border-none shadow-xl bg-white rounded-2xl">
          <div className="relative h-64 sm:h-96 w-full">
            <Image
              src={audition.image || "/images/auditions-stage.png"}
              alt={audition.title}
              fill
              className="object-cover"
              onError={(e) => {
                const target = e.target as HTMLImageElement
                target.src = "/images/auditions-stage.png"
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

            {audition.verified && (
              <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm text-green-700 text-xs font-bold px-4 py-2 rounded-full flex items-center shadow-lg border border-green-100">
                <CheckCircle className="h-4 w-4 mr-1.5 fill-green-50" />
                VERIFIED AUDITION
              </div>
            )}

            <div className="absolute bottom-6 left-6 right-6">
              <div className="flex flex-wrap gap-2 mb-3">
                <Badge className="bg-purple-600/90 hover:bg-purple-600 border-none px-3 py-1 text-xs">
                  {audition.type || "Audition"}
                </Badge>
                {audition.pay_type !== "free" && audition.pay_type !== "not-specified" && (
                  <Badge className="bg-amber-500/90 hover:bg-amber-500 border-none px-3 py-1 text-xs">
                    Paid Opportunity
                  </Badge>
                )}
              </div>
              <h1 className="font-playfair text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight drop-shadow-md">
                {audition.title}
              </h1>
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
                      <p className="text-[10px] uppercase tracking-wider text-gray-500 font-bold">Deadline</p>
                      <p className="font-medium">{audition.deadline ? new Date(audition.deadline).toLocaleDateString("en-IN", { day: 'numeric', month: 'short', year: 'numeric' }) : "Not Specified"}</p>
                    </div>
                  </div>

                  <div className="flex items-center text-gray-700">
                    <MapPin className="h-5 w-5 mr-3 text-purple-500" />
                    <div>
                      <p className="text-[10px] uppercase tracking-wider text-gray-500 font-bold">Location</p>
                      <p className="font-medium">
                        {audition.location_mode === "city"
                          ? `${audition.venue || audition.city}`
                          : audition.platform || "Online"}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Description */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <div className="h-6 w-1 bg-purple-600 rounded-full" />
                    <h2 className="text-2xl font-bold text-gray-900 font-playfair">Description</h2>
                  </div>
                  <div className="prose prose-purple max-w-none text-gray-700 leading-relaxed [&_ul]:list-disc [&_ul]:pl-5 [&_ol]:list-decimal [&_ol]:pl-5 space-y-3">
                    {audition.description ? (
                      <div dangerouslySetInnerHTML={{ __html: audition.description }} />
                    ) : (
                      <p className="italic text-gray-500">No description provided.</p>
                    )}
                  </div>
                </div>

                {/* Requirements & Roles */}
                {(audition.gender_preference !== "any" || audition.age_min || audition.age_max || (Array.isArray(audition.languages) && audition.languages.length > 0) || audition.experience_required || audition.roles_needed) && (
                  <div className="space-y-6 pt-8 border-t border-gray-100">
                    <div className="flex items-center gap-2">
                      <div className="h-6 w-1 bg-purple-600 rounded-full" />
                      <h2 className="text-2xl font-bold text-gray-900 font-playfair">Requirements & Roles</h2>
                    </div>

                    {audition.roles_needed && (
                      <div className="prose prose-purple max-w-none text-gray-700 leading-relaxed [&_ul]:list-disc [&_ul]:pl-5 [&_ol]:list-decimal [&_ol]:pl-5 space-y-3"
                        dangerouslySetInnerHTML={{ __html: audition.roles_needed }} />
                    )}

                    <div className="flex flex-wrap gap-2 pt-2">
                      {audition.gender_preference && audition.gender_preference !== "any" && (
                        <Badge variant="secondary" className="px-4 py-2 bg-gray-100 text-gray-700 border-none capitalize text-sm">
                          {String(audition.gender_preference).replace("-", " ")}
                        </Badge>
                      )}
                      {(audition.age_min || audition.age_max) && (
                        <Badge variant="secondary" className="px-4 py-2 bg-gray-100 text-gray-700 border-none text-sm">
                          Age: {audition.age_min || "?"}–{audition.age_max || "?"}
                        </Badge>
                      )}
                      {Array.isArray(audition.languages) && audition.languages.length > 0 && (
                        <Badge variant="secondary" className="px-4 py-2 bg-gray-100 text-gray-700 border-none text-sm">
                          Languages: {audition.languages.join(", ")}
                        </Badge>
                      )}
                      {audition.experience_required && (
                        <Badge variant="secondary" className="px-4 py-2 bg-gray-100 text-gray-700 border-none text-sm capitalize">
                          Experience: {audition.experience_required}
                        </Badge>
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* Sidebar Action Card */}
              <div className="lg:col-span-1">
                <div className="p-8 bg-purple-50 rounded-2xl border border-purple-100 flex flex-col items-center text-center space-y-8 sticky top-24 shadow-sm h-fit">
                  {/* Profile Details */}



                  {/* Audition Summary */}
                  <div className="space-y-4 w-full">
                    <h3 className="text-xs font-bold text-purple-900 uppercase tracking-widest">Audition Summary</h3>
                    <div className="w-full border-t border-purple-200/50"></div>

                    <div className="space-y-4 w-full">
                      <div className="flex flex-col items-center gap-3">
                        <div className="h-12 w-12 rounded-full bg-white flex items-center justify-center shadow-sm text-purple-600">
                          <Building className="h-6 w-6" />
                        </div>
                        <p className="font-bold text-gray-900 text-lg leading-tight">
                          Posted by {organisation?.name || audition.company || "Reputed Production"}
                        </p>
                      </div>
                    </div>

                    <div className="flex justify-center items-center gap-2">
                      <div className="h-10 w-10 rounded-full bg-white flex items-center justify-center shadow-sm text-purple-600 mb-1">
                        <IndianRupee className="h-5 w-5" />
                      </div>
                      <p className="font-semibold text-gray-900 px-5">
                        {audition.pay_type === "not-specified" && "Not specified"}
                        {audition.pay_type === "free" && "Free"}
                        {audition.pay_type === "stipend" && (audition.pay_amount ? `Stipend: ₹${audition.pay_amount}` : "Stipend")}
                        {audition.pay_type === "paid" && (audition.pay_amount ? `Paid: ₹${audition.pay_amount}` : "Paid")}
                      </p>
                    </div>
                  </div>

                  <div className="w-full border-t border-purple-200/50"></div>

                  {/* Action Button */}
                  <div className="w-full flex justify-center pt-2">
                    {isLoading ? (
                      <div className="flex justify-center p-4">
                        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-purple-600"></div>
                      </div>
                    ) : audition.application_method === "whatsapp" ? (
                      <div className="space-y-6 w-full flex flex-col items-center">
                        <div className="p-4 bg-green-50 rounded-xl border border-green-100 text-center w-full">
                          <p className="text-[10px] text-green-600 font-bold mb-1 uppercase tracking-wider">WhatsApp Contact</p>
                          <p className="font-mono text-green-700 font-bold text-base">{audition.contact_info}</p>
                        </div>
                        <Button asChild className="h-12 px-10 rounded-xl bg-[#25D366] hover:bg-[#20ba5a] text-white font-bold border-none shadow-md transition-all hover:scale-[1.05] active:scale-95">
                          <a
                            href={`https://wa.me/${audition.contact_info}?text=${encodeURIComponent(`Hi, I saw your audition titled "${audition.title}" on AbhinayPath and I'm interested in applying.`)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <MessageSquare className="mr-2 h-5 w-5" /> Apply on AbhinayPath
                          </a>
                        </Button>
                      </div>
                    ) : audition.application_method === "email" ? (
                      <div className="space-y-6 w-full flex flex-col items-center">
                        <div className="p-4 bg-blue-50 rounded-xl border border-blue-100 text-center w-full">
                          <p className="text-[10px] text-blue-600 font-bold mb-1 uppercase tracking-wider">Email Contact</p>
                          <p className="font-mono text-blue-700 font-bold truncate text-base">{audition.contact_info}</p>
                        </div>
                        <Button asChild className="h-12 px-10 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold shadow-md border-none transition-all hover:scale-[1.05] active:scale-95">
                          <a
                            href={`mailto:${audition.contact_info}?subject=${encodeURIComponent(`Application for: ${audition.title}`)}&body=${encodeURIComponent("Hello,\n\nI would like to apply for the audition. Please find my profile attached.")}`}
                          >
                            <Mail className="mr-2 h-5 w-5" /> Apply on AbhinayPath
                          </a>
                        </Button>
                      </div>
                    ) : !hasAlreadyApplied ? (
                      <Button
                        className="h-12 px-10 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold shadow-md border-none transition-all hover:scale-[1.05] active:scale-95 mx-auto"
                        onClick={handleApply}
                        disabled={loading}
                      >
                        {loading ? "Processing..." : "Apply on AbhinayPath"}
                      </Button>
                    ) : (
                      <div className="p-4 bg-green-50 rounded-xl border border-green-100 text-center w-full">
                        <p className="text-green-700 font-bold flex items-center justify-center text-sm">
                          <CheckCircle className="h-5 w-5 mr-2" />
                          Application Sent
                        </p>
                      </div>
                    )}
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
