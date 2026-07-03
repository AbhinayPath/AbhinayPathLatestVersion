"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { MapPin, Calendar, Clock, Mail, Phone, Check, ExternalLink, ArrowLeft } from "lucide-react"
import Link from "next/link"
import { ShareWorkshopButton } from "@/components/share-workshop-button"
import { getWorkshopById, type Workshop } from "@/lib/data/workshops-data"

interface WorkshopDetailProps {
  id: number
}

export default function WorkshopDetailContent({ id }: WorkshopDetailProps) {
  const workshop = getWorkshopById(id)

  if (!workshop) {
    return (
      <div className="container py-12 text-center">
        <h1 className="text-2xl font-bold mb-4">Workshop Not Found</h1>
        <p className="text-gray-600 mb-6">The workshop you&apos;re looking for doesn&apos;t exist.</p>
        <Link href="/workshops">
          <Button variant="outline">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Workshops
          </Button>
        </Link>
      </div>
    )
  }

  return (
    <div className="bg-background min-h-screen py-12">
      <div className="container max-w-4xl">
        {/* Back Button */}
        <Link href="/workshops" className="inline-block mb-6">
          <Button variant="outline" size="sm">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Workshops
          </Button>
        </Link>

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4">{workshop.title}</h1>
          <div className="flex flex-wrap gap-6 text-sm">
            {workshop.state && (
              <div className="flex items-center text-gray-700">
                <MapPin className="w-4 h-4 mr-2" />
                {workshop.location}, {workshop.state}
              </div>
            )}
            {workshop.date && (
              <div className="flex items-center text-gray-700">
                <Calendar className="w-4 h-4 mr-2" />
                {workshop.date}
              </div>
            )}
            {workshop.time && (
              <div className="flex items-center text-gray-700">
                <Clock className="w-4 h-4 mr-2" />
                {workshop.time}
              </div>
            )}
          </div>
        </div>

        {/* Share Button */}
        <div className="mb-8">
          <ShareWorkshopButton workshop={workshop} />
        </div>

        {/* Main Content Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {/* Left Column - Main Content */}
          <div className="md:col-span-2 space-y-8">
            {/* Overview */}
            <Card>
              <CardContent className="pt-6">
                <h2 className="text-2xl font-bold mb-4">Overview</h2>
                <p className="text-gray-700 leading-relaxed">{workshop.description}</p>
              </CardContent>
            </Card>

            {/* Key Details */}
            <Card>
              <CardContent className="pt-6">
                <h2 className="text-2xl font-bold mb-6">Key Details</h2>
                <div className="grid md:grid-cols-2 gap-6">
                  {workshop.trainer && (
                    <div>
                      <h3 className="font-semibold text-sm text-gray-500 uppercase mb-2">Trainer</h3>
                      <p className="text-lg">{workshop.trainer}</p>
                    </div>
                  )}
                  {workshop.institution && (
                    <div>
                      <h3 className="font-semibold text-sm text-gray-500 uppercase mb-2">Institution</h3>
                      <p className="text-lg">{workshop.institution}</p>
                    </div>
                  )}
                  {workshop.date && (
                    <div>
                      <h3 className="font-semibold text-sm text-gray-500 uppercase mb-2">Duration</h3>
                      <p className="text-lg">{workshop.date}</p>
                    </div>
                  )}
                  {workshop.time && (
                    <div>
                      <h3 className="font-semibold text-sm text-gray-500 uppercase mb-2">Time</h3>
                      <p className="text-lg">{workshop.time}</p>
                    </div>
                  )}
                  {workshop.venue && (
                    <div>
                      <h3 className="font-semibold text-sm text-gray-500 uppercase mb-2">Location</h3>
                      <p className="text-lg">{workshop.venue}</p>
                    </div>
                  )}
                  {workshop.price && (
                    <div>
                      <h3 className="font-semibold text-sm text-gray-500 uppercase mb-2">Price</h3>
                      <p className="text-lg font-semibold">{workshop.price}</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Eligibility */}
            {workshop.eligibility && (
              <Card>
                <CardContent className="pt-6">
                  <h2 className="text-2xl font-bold mb-4">Eligibility</h2>
                  <div className="flex items-start gap-3">
                    <Check className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                    <p className="text-gray-700">{workshop.eligibility}</p>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Right Column - Sidebar */}
          <div className="space-y-6">
            {/* Registration Card */}
            <Card className="bg-primary/5 border-primary/20 sticky top-6">
              <CardContent className="pt-6">
                <div className="space-y-4">
                  {workshop.contact && (
                    <div>
                      <p className="text-sm font-semibold text-gray-600 uppercase mb-2">Contact</p>
                      <p className="text-lg font-semibold">{workshop.contact}</p>
                    </div>
                  )}
                  {workshop.email && workshop.email !== "Via website" && (
                    <div>
                      <p className="text-sm font-semibold text-gray-600 uppercase mb-2">Email</p>
                      <a href={`mailto:${workshop.email}`} className="text-primary hover:underline break-all">
                        {workshop.email}
                      </a>
                    </div>
                  )}
                  {workshop.registrationLink && (
                    <Button asChild className="w-full">
                      <a href={workshop.registrationLink} target="_blank" rel="noopener noreferrer">
                        Register Now
                        <ExternalLink className="w-4 h-4 ml-2" />
                      </a>
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Price Summary */}
            {workshop.price && (
              <Card>
                <CardContent className="pt-6">
                  <p className="text-sm font-semibold text-gray-600 uppercase mb-2">Workshop Fee</p>
                  <p className="text-3xl font-bold">{workshop.price}</p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
