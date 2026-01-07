"use client"

import { MapPin, Calendar, Clock, Mail, Phone, Check } from "lucide-react"

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
    venue: string
    organizer: string
    duration: string
    medium: string
    eligibilityCriteria?: string[]
    applicationDeadline?: string
    courseFee: string
    certification: string
    keyHighlights: string[]
    curriculum: string[]
    learningOutcomes?: string[]
    contactInfo: string[]
  }
}

// Workshop data would be passed as props or fetched
// For now, using a placeholder structure
export default function WorkshopDetailContent({ workshopId }: { workshopId: number }) {
  // In a real implementation, this would fetch the workshop data
  // For now, returning a placeholder
  const workshop: Workshop = {
    id: workshopId,
    title: "Workshop Details",
    trainer: "Expert Trainer",
    institution: "Institution Name",
    location: "City",
    state: "State",
    date: "TBD",
    time: "TBD",
    description: "Workshop description",
    registrationLink: "#",
    price: "Contact for details",
    contact: "Contact info",
    email: "email@example.com",
    eligibility: "Open to all",
    venue: "Venue details",
    fullDetails: {
      description: "Full description",
      venue: "Full venue details",
      organizer: "Organizer name",
      duration: "Duration",
      medium: "Language",
      courseFee: "Fee details",
      certification: "Certificate details",
      keyHighlights: ["Highlight 1", "Highlight 2"],
      curriculum: ["Topic 1", "Topic 2"],
      contactInfo: ["Contact 1", "Contact 2"],
    },
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4">{workshop.title}</h1>
        <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4" />
            <span>
              {workshop.location}, {workshop.state}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            <span>{workshop.date}</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4" />
            <span>{workshop.time}</span>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        <section>
          <h2 className="text-2xl font-semibold mb-3">About This Workshop</h2>
          <p className="text-muted-foreground">{workshop.fullDetails.description}</p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-3">Key Highlights</h2>
          <ul className="space-y-2">
            {workshop.fullDetails.keyHighlights.map((highlight, index) => (
              <li key={index} className="flex items-start gap-2">
                <Check className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                <span>{highlight}</span>
              </li>
            ))}
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-3">Curriculum</h2>
          <ul className="space-y-2">
            {workshop.fullDetails.curriculum.map((item, index) => (
              <li key={index} className="flex items-start gap-2">
                <Check className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className="grid md:grid-cols-2 gap-4">
          <div>
            <h3 className="font-semibold mb-2">Duration</h3>
            <p className="text-muted-foreground">{workshop.fullDetails.duration}</p>
          </div>
          <div>
            <h3 className="font-semibold mb-2">Medium</h3>
            <p className="text-muted-foreground">{workshop.fullDetails.medium}</p>
          </div>
          <div>
            <h3 className="font-semibold mb-2">Course Fee</h3>
            <p className="text-muted-foreground">{workshop.fullDetails.courseFee}</p>
          </div>
          <div>
            <h3 className="font-semibold mb-2">Certification</h3>
            <p className="text-muted-foreground">{workshop.fullDetails.certification}</p>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-3">Contact Information</h2>
          <div className="space-y-2">
            {workshop.fullDetails.contactInfo.map((info, index) => (
              <p key={index} className="flex items-center gap-2 text-muted-foreground">
                {info.includes("Email") || info.includes("@") ? (
                  <Mail className="w-4 h-4" />
                ) : (
                  <Phone className="w-4 h-4" />
                )}
                <span>{info}</span>
              </p>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-3">Venue</h2>
          <p className="text-muted-foreground mb-4">{workshop.fullDetails.venue}</p>
          <div className="w-full h-64 bg-muted rounded-lg flex items-center justify-center">
            <MapPin className="w-8 h-8 text-muted-foreground" />
          </div>
        </section>

        <div className="pt-6">
          <a
            href={workshop.registrationLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center px-6 py-3 bg-primary text-primary-foreground font-semibold rounded-lg hover:bg-primary/90 transition-colors"
          >
            Register Now
          </a>
        </div>
      </div>
    </div>
  )
}
