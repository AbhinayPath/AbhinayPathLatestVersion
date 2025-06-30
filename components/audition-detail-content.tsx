"use client"

import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, CheckCircle, Building, Calendar, Mail, MapPin, MessageSquare, Phone } from "lucide-react"
import { Button } from "@/components/ui/button"
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
  contact: string
}

import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase-browser"
import { toast } from "@/components/ui/use-toast"

export default function AuditionDetailContent({ audition }: { audition: Audition }) {
  const [hasAlreadyApplied, setHasAlreadyApplied] = useState(false)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const checkAlreadyApplied = async () => {
      try {
        // use singleton
// const supabase = getSupabaseBrowserClient()
        const user = await supabase.auth.getUser()
        const userId = user?.data?.user?.id
        if (!userId) return
        const { data: existing } = await supabase
          .from("audition_applications")
          .select("id")
          .eq("user_id", userId)
          .eq("audition_id", audition.id)
          .maybeSingle()
        if (existing) setHasAlreadyApplied(true)
      } catch (err) {
        // Optionally handle error
      }
    }
    checkAlreadyApplied()
  }, [audition.id])

  const handleApply = async () => {
    debugger
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
        .from("audition_applications")
        .select("id")
        .eq("user_id", userId)
        .eq("audition_id", audition.id)
        .maybeSingle()
      if (existing) {
        toast({ title: "You’ve already applied.", variant: "destructive" })
        setHasAlreadyApplied(true)
        setLoading(false)
        return
      }
      const { error } = await supabase.from("audition_applications").insert({
        user_id: userId,
        audition_id: audition.id,
        height: null,
        weight: null,
        skin_tone: null,
        video_url: null,
        additional_info: { appliedWith: "quick_apply" },
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
                {audition.id === 7 && <span className="badge-success">Paid</span>}
              </div>

              <h1 className="font-playfair text-3xl font-bold mb-4">{audition.title}</h1>

              <div className="prose max-w-none">
                <h2 className="text-xl font-semibold mb-3">Description</h2>
                <p className="text-gray-800 mb-6">{audition.description}</p>

                <h2 className="text-xl font-semibold mb-3">Roles</h2>
                <ul className="list-disc pl-5 mb-6">
                  {audition.roles.map((role, index) => (
                    <li key={index} className="text-gray-800 mb-2">
                      {role}
                    </li>
                  ))}
                </ul>

                <h2 className="text-xl font-semibold mb-3">Requirements</h2>
                <ul className="list-disc pl-5 mb-6">
                  {audition.requirements.map((req, index) => (
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

              {audition.id === 7 && (
                <div className="flex items-start">
                  <div className="h-5 w-5 mr-2 flex items-center justify-center text-primary mt-0.5">
                    <span className="font-bold">💰</span>
                  </div>
                  <div>
                    <p className="font-medium">Compensation</p>
                    <p className="text-gray-600">Paid opportunity (details during selection)</p>
                  </div>
                </div>
              )}

              <div className="pt-4 mt-4 border-t border-gray-200">
                {!hasAlreadyApplied ? (
                  <Button className="w-full rounded-md" onClick={handleApply} disabled={loading}>
                    {loading ? "Applying..." : "Apply Now"}
                  </Button>
                ) : (
                  <p className="text-green-600 font-medium text-center">You’ve already applied</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
