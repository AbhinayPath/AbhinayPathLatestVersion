import { notFound } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import {
  MapPin,
  Mail,
  Phone,
  Briefcase,
  Calendar,
  ArrowLeft,
  Instagram,
  Youtube,
  Facebook,
  ExternalLink,
  Video,
} from "lucide-react"
import { productionProfessionals } from "@/lib/data/production-backstage"
import { ShareProfileButton } from "@/components/share-profile-button"

export async function generateStaticParams() {
  return productionProfessionals.map((professional) => ({
    id: professional.id,
  }))
}

export async function generateMetadata({ params }: { params: { id: string } }) {
  const professional = productionProfessionals.find((p) => p.id === params.id)

  if (!professional) {
    return {
      title: "Professional Not Found",
    }
  }

  return {
    title: `${professional.name} - Production & Backstage Professional | Abhinayपथ`,
    description: `${professional.name} is a ${professional.skills.join(", ")} professional with ${professional.experience} of experience. Based in ${professional.location}, ${professional.state}.`,
  }
}

export default function ProfessionalProfilePage({ params }: { params: { id: string } }) {
  const professional = productionProfessionals.find((p) => p.id === params.id)

  if (!professional) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      {/* Hero Section */}
      <section className="relative py-12 sm:py-16 md:py-20 px-4">
        <div className="container max-w-6xl">
          {/* Back Button */}
          <Link href="/production-backstage">
            <Button variant="ghost" size="sm" className="mb-6 sm:mb-8 group">
              <ArrowLeft className="h-4 w-4 mr-2 group-hover:-translate-x-1 transition-transform" />
              Back to Production & Backstage
            </Button>
          </Link>

          {/* Profile Card */}
          <Card className="overflow-hidden border-0 shadow-2xl">
            <div className="grid md:grid-cols-2 gap-6 sm:gap-8 md:gap-12 p-6 sm:p-8 md:p-12">
              {/* Left Column - Image */}
              <div className="space-y-4">
                <div className="relative w-full aspect-[3/4] rounded-2xl overflow-hidden bg-muted">
                  <Image
                    src={professional.image || "/placeholder.svg"}
                    alt={professional.name}
                    fill
                    className="object-cover object-top"
                    sizes="(max-width: 768px) 100vw, 50vw"
                    priority
                  />
                </div>
              </div>

              {/* Right Column - Details */}
              <div className="space-y-6">
                {/* Header */}
                <div className="space-y-4">
                  <div className="flex items-start justify-between gap-4">
                    <h1 className="font-playfair text-3xl sm:text-4xl md:text-5xl font-bold text-balance leading-tight">
                      {professional.name}
                    </h1>
                    <div className="flex gap-2 flex-shrink-0">
                      <ShareProfileButton
                        artistId={professional.id}
                        artistName={professional.name}
                        variant="icon"
                        profileType="production-backstage"
                      />
                      {professional.instagram && (
                        <Link href={professional.instagram} target="_blank" rel="noopener noreferrer">
                          <Button size="icon" variant="outline" className="rounded-full bg-transparent h-10 w-10">
                            <Instagram className="h-5 w-5" />
                          </Button>
                        </Link>
                      )}
                      {professional.facebook && (
                        <Link href={professional.facebook} target="_blank" rel="noopener noreferrer">
                          <Button size="icon" variant="outline" className="rounded-full bg-transparent h-10 w-10">
                            <Facebook className="h-5 w-5" />
                          </Button>
                        </Link>
                      )}
                      {professional.youtube && (
                        <Link href={professional.youtube} target="_blank" rel="noopener noreferrer">
                          <Button size="icon" variant="outline" className="rounded-full bg-transparent h-10 w-10">
                            <Youtube className="h-5 w-5" />
                          </Button>
                        </Link>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <MapPin className="h-4 w-4 flex-shrink-0" />
                    <span>
                      {professional.location}, {professional.state}
                    </span>
                  </div>
                </div>

                {/* Quick Info Grid */}
                <div className="grid gap-6">
                  {/* Skills */}
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                      <Briefcase className="h-4 w-4 flex-shrink-0" />
                      <span>Skills & Expertise</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {professional.skills.map((skill) => (
                        <Badge key={skill} variant="secondary" className="text-sm px-3 py-1">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Experience */}
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                      <Calendar className="h-4 w-4 flex-shrink-0" />
                      <span>Experience</span>
                    </div>
                    <p className="text-lg font-semibold">{professional.experience}</p>
                  </div>

                  {/* Contact Info */}
                  {professional.email && (
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                        <Mail className="h-4 w-4 flex-shrink-0" />
                        <span>Email</span>
                      </div>
                      <Link
                        href={`mailto:${professional.email}`}
                        className="text-sm text-primary hover:underline block break-all"
                      >
                        {professional.email}
                      </Link>
                    </div>
                  )}

                  {professional.whatsapp && (
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                        <Phone className="h-4 w-4 flex-shrink-0" />
                        <span>WhatsApp</span>
                      </div>
                      <Link
                        href={`https://wa.me/${professional.whatsapp}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-primary hover:underline block"
                      >
                        +91 {professional.whatsapp}
                      </Link>
                    </div>
                  )}
                </div>

                {/* CTAs */}
                <div className="pt-4 flex flex-wrap gap-3">
                  {professional.workLink && (
                    <Link href={professional.workLink} target="_blank" rel="noopener noreferrer">
                      <Button className="rounded-full">
                        <ExternalLink className="h-4 w-4 mr-2" />
                        View Work Portfolio
                      </Button>
                    </Link>
                  )}
                  {professional.auditionVideo && (
                    <Link href={professional.auditionVideo} target="_blank" rel="noopener noreferrer">
                      <Button className="rounded-full">
                        <Video className="h-4 w-4 mr-2" />
                        Watch Audition Video
                      </Button>
                    </Link>
                  )}
                  {professional.whatsapp && (
                    <Link href={`https://wa.me/${professional.whatsapp}`} target="_blank" rel="noopener noreferrer">
                      <Button variant="outline" className="rounded-full bg-transparent">
                        <Phone className="h-4 w-4 mr-2" />
                        Contact via WhatsApp
                      </Button>
                    </Link>
                  )}
                  <ShareProfileButton
                    artistId={professional.id}
                    artistName={professional.name}
                    variant="button"
                    profileType="production-backstage"
                  />
                </div>
              </div>
            </div>

            {/* Productions Section */}
            <div className="border-t bg-muted/30 p-6 sm:p-8 md:p-12">
              <div className="space-y-4">
                <h2 className="text-xl sm:text-2xl font-semibold font-playfair">Productions Worked With</h2>
                <div className="flex flex-wrap gap-2">
                  {professional.productions.map((prod, index) => (
                    <Badge key={index} variant="outline" className="text-sm px-4 py-2 bg-background">
                      {prod}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </Card>
        </div>
      </section>
    </div>
  )
}
