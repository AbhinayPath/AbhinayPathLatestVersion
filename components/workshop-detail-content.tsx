"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { MapPin, Calendar, Clock, Mail, Phone, Check, ExternalLink, ArrowLeft } from "lucide-react"
import Link from "next/link"

interface Workshop {
  id: number
  title: string
  trainer: string
  institution: string
  location: string
  state: string
  date: string
  time: string
  description: string
  registrationLink: string
  price: string
  contact: string
  email: string
  eligibility: string
  venue: string
  fullDetails: {
    description: string
    keyHighlights: string[]
    curriculum: string[]
    duration: string
    medium: string
    courseFee: string
    certification: string
    contactInfo: string[]
    venue: string
    organizer: string
  }
}

const workshops: Workshop[] = [
  {
    id: 1,
    title: "FTII / CFOL — Masterclass of Acting (Mumbai)",
    trainer: "FTII Faculty",
    institution: "Film and Television Institute of India (FTII)",
    location: "Mumbai",
    state: "Maharashtra",
    date: "15–24 Jan 2026",
    time: "10 AM–5 PM",
    description: "Master the craft of acting with FTII's intensive masterclass in Mumbai.",
    registrationLink: "https://ftii.ac.in/p/vtwa/masterclass-of-acting-in-mumbai-15-24th-january-2026",
    price: "₹25,000",
    contact: "020-25580085",
    email: "info.cfol@ftii.ac.in",
    eligibility: "18+ (as on 1 Jan 2026), HSC/12th",
    venue: "Mumbai",
    fullDetails: {
      description:
        "Master the craft of acting with FTII's intensive masterclass featuring comprehensive training in performance techniques, character development, and scene work.",
      keyHighlights: [
        "10-day intensive training program",
        "Learn from experienced FTII faculty",
        "Comprehensive acting techniques",
        "Character development workshops",
        "Scene work and performance practice",
      ],
      curriculum: [
        "Fundamentals of acting theory",
        "Character analysis and development",
        "Voice and movement training",
        "Scene study and rehearsal",
        "Performance techniques",
      ],
      duration: "10 days",
      medium: "English/Hindi",
      courseFee: "₹25,000",
      certification: "FTII Certificate",
      contactInfo: ["Phone: 020-25580085", "Email: info.cfol@ftii.ac.in"],
      venue: "Mumbai, Maharashtra",
      organizer: "Film and Television Institute of India (FTII)",
    },
  },
  {
    id: 17,
    title: "Planetary Transitions 2026 — Potsdam Artist Residency (GFZ)",
    trainer: "GFZ German Research Centre for Geosciences",
    institution: "GFZ German Research Centre for Geosciences",
    location: "Potsdam",
    state: "Germany",
    date: "Application Deadline: 8 Feb 2026",
    time: "TBD",
    description:
      "Unique art-science residency exploring planetary transitions, climate change, and earth sciences through artistic practice at Germany's leading geosciences research center.",
    registrationLink: "https://www.gfz.de/en/career/job-offers/details/10920",
    price: "Funded residency with support",
    contact: "GFZ Potsdam",
    email: "See application page",
    eligibility: "Professional artists working in art-science collaboration",
    venue: "GFZ Potsdam, Germany",
    fullDetails: {
      description:
        "The Planetary Transitions 2026 Artist Residency at GFZ Potsdam offers a unique opportunity for artists to engage with cutting-edge earth science research. This residency program brings together artistic practice and scientific inquiry to explore themes of planetary change, climate transitions, and the relationship between human activity and earth systems.",
      keyHighlights: [
        "Work at Germany's leading earth science research center",
        "Collaborate with world-renowned geoscientists",
        "Access to state-of-the-art research facilities",
        "Explore planetary transitions and climate change through art",
        "Create work informed by scientific research and data",
        "Present your work to scientific and artistic communities",
      ],
      curriculum: [
        "Introduction to GFZ research areas and facilities",
        "Collaboration with earth scientists and researchers",
        "Studio time and artistic development",
        "Seminars on planetary science and climate research",
        "Public presentation and exhibition of work",
      ],
      duration: "Variable duration (check application for details)",
      medium: "English/German",
      courseFee: "Funded residency with stipend and support",
      certification: "Residency completion certificate",
      contactInfo: ["See application page for contact details", "Application deadline: 8 February 2026"],
      venue: "GFZ German Research Centre for Geosciences, Potsdam, Germany",
      organizer: "GFZ German Research Centre for Geosciences",
    },
  },
]

export default function WorkshopDetailContent({ id }: { id: number }) {
  const workshop = workshops.find((w) => w.id === id)

  if (!workshop) {
    return (
      <div className="container py-12">
        <Card>
          <CardContent className="py-12 text-center">
            <h2 className="text-2xl font-bold mb-4">Workshop Not Found</h2>
            <p className="text-muted-foreground mb-6">The workshop you're looking for doesn't exist.</p>
            <Button asChild>
              <Link href="/workshops">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Workshops
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="container py-8 md:py-12">
      <Button variant="ghost" asChild className="mb-6">
        <Link href="/workshops">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Workshops
        </Link>
      </Button>

      <div className="grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-8">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold mb-4">{workshop.title}</h1>
            <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                <span>
                  {workshop.location}, {workshop.state}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <span>{workshop.date}</span>
              </div>
              {workshop.time !== "TBD" && (
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  <span>{workshop.time}</span>
                </div>
              )}
            </div>
          </div>

          <Card>
            <CardContent className="pt-6">
              <h2 className="text-2xl font-semibold mb-4">About This Workshop</h2>
              <p className="text-muted-foreground leading-relaxed">{workshop.fullDetails.description}</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <h2 className="text-2xl font-semibold mb-4">Key Highlights</h2>
              <ul className="space-y-3">
                {workshop.fullDetails.keyHighlights.map((highlight, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <Check className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <span>{highlight}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <h2 className="text-2xl font-semibold mb-4">Curriculum</h2>
              <ul className="space-y-3">
                {workshop.fullDetails.curriculum.map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <Check className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardContent className="pt-6">
              <h3 className="font-semibold mb-4">Workshop Details</h3>
              <div className="space-y-4">
                <div>
                  <div className="text-sm text-muted-foreground mb-1">Duration</div>
                  <div className="font-medium">{workshop.fullDetails.duration}</div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground mb-1">Medium</div>
                  <div className="font-medium">{workshop.fullDetails.medium}</div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground mb-1">Course Fee</div>
                  <div className="font-medium">{workshop.fullDetails.courseFee}</div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground mb-1">Certification</div>
                  <div className="font-medium">{workshop.fullDetails.certification}</div>
                </div>
              </div>

              {workshop.registrationLink && (
                <Button asChild className="w-full mt-6">
                  <Link href={workshop.registrationLink} target="_blank" rel="noopener noreferrer">
                    Register Now
                    <ExternalLink className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <h3 className="font-semibold mb-4">Contact Information</h3>
              <div className="space-y-3 text-sm">
                {workshop.fullDetails.contactInfo.map((info, index) => (
                  <div key={index} className="flex items-start gap-2">
                    {info.toLowerCase().includes("email") || info.includes("@") ? (
                      <Mail className="h-4 w-4 text-muted-foreground mt-0.5" />
                    ) : (
                      <Phone className="h-4 w-4 text-muted-foreground mt-0.5" />
                    )}
                    <span className="text-muted-foreground">{info}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <h3 className="font-semibold mb-4">Venue</h3>
              <div className="flex items-start gap-2 text-sm">
                <MapPin className="h-4 w-4 text-muted-foreground mt-0.5" />
                <span className="text-muted-foreground">{workshop.fullDetails.venue}</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
