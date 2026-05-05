import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ChevronRight, MapPin, Calendar, Users, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  getCityBySlug,
  getAllCitySlugs,
  generateSEOTitle,
  generateMetaDescription,
  generateSEOIntro,
  generateFAQs,
  generateOrganizationSchema,
  generateFAQSchema,
  generateBreadcrumbSchema,
  CATEGORIES,
  SUPPORTED_CITIES,
  matchesCity,
} from "@/lib/seo-utils"

// Import auditions data
import { getAuditionsData } from "@/lib/data/auditions-data"

interface PageProps {
  params: Promise<{ city: string }>
}

// Generate static params for all supported cities
export async function generateStaticParams() {
  return getAllCitySlugs().map((city) => ({ city }))
}

// Generate metadata for SEO
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { city: citySlug } = await params
  const city = getCityBySlug(citySlug)

  if (!city) {
    return { title: "City Not Found | AbhinayPath" }
  }

  const category = CATEGORIES["auditions"]
  const title = generateSEOTitle(city.name, category)
  const description = generateMetaDescription(city.name, category)

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `https://www.abhinaypath.com/${citySlug}/auditions`,
      siteName: "AbhinayPath",
      type: "website",
      images: [
        {
          url: "https://www.abhinaypath.com/images/auditions-stage.png",
          width: 1200,
          height: 630,
          alt: `Theatre Auditions in ${city.name}`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
    alternates: {
      canonical: `https://www.abhinaypath.com/${citySlug}/auditions`,
    },
  }
}

export default async function CityAuditionsPage({ params }: PageProps) {
  const { city: citySlug } = await params
  const city = getCityBySlug(citySlug)

  if (!city) {
    notFound()
  }

  const category = CATEGORIES["auditions"]
  const allAuditions = getAuditionsData()

  // Filter auditions by city (server-side)
  const cityAuditions = allAuditions.filter((audition) => matchesCity(audition.location, citySlug))

  // Generate SEO content
  const seoIntro = generateSEOIntro(city.name, "auditions")
  const faqs = generateFAQs(city.name, "auditions")

  // Generate structured data
  const organizationSchema = generateOrganizationSchema()
  const faqSchema = generateFAQSchema(faqs)
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: "https://www.abhinaypath.com" },
    { name: city.name, url: `https://www.abhinaypath.com/${citySlug}` },
    { name: "Auditions", url: `https://www.abhinaypath.com/${citySlug}/auditions` },
  ])

  // Get other cities for internal linking
  const otherCities = SUPPORTED_CITIES.filter((c) => c.slug !== citySlug).slice(0, 8)

  return (
    <>
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <div className="min-h-screen bg-background">
        {/* Breadcrumb */}
        <nav className="border-b bg-muted/30">
          <div className="container mx-auto px-4 py-3">
            <ol className="flex items-center text-sm text-muted-foreground">
              <li>
                <Link href="/" className="hover:text-primary transition-colors">
                  Home
                </Link>
              </li>
              <ChevronRight className="h-4 w-4 mx-2" />
              <li>
                <span className="text-foreground">{city.name}</span>
              </li>
              <ChevronRight className="h-4 w-4 mx-2" />
              <li>
                <span className="text-foreground font-medium">Auditions</span>
              </li>
            </ol>
          </div>
        </nav>

        {/* Hero Section with SEO Content */}
        <section className="bg-gradient-to-b from-primary/5 to-background py-12 md:py-16">
          <div className="container mx-auto px-4">
            <h1 className="font-playfair text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
              Theatre &amp; Film Auditions in {city.name}
            </h1>
            <p className="text-lg text-muted-foreground max-w-4xl leading-relaxed">
              {seoIntro}
            </p>
          </div>
        </section>

        {/* Audition Listings */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <h2 className="font-playfair text-2xl md:text-3xl font-bold mb-8">
              {cityAuditions.length > 0
                ? `${cityAuditions.length} Audition${cityAuditions.length !== 1 ? "s" : ""} in ${city.name}`
                : `No Active Auditions in ${city.name}`}
            </h2>

            {cityAuditions.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {cityAuditions.map((audition) => (
                  <Card key={audition.id} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="flex items-start justify-between gap-2">
                        <CardTitle className="line-clamp-2 text-lg">{audition.title}</CardTitle>
                        {audition.verified && (
                          <Badge variant="secondary" className="flex-shrink-0">
                            Verified
                          </Badge>
                        )}
                      </div>
                      <CardDescription>{audition.company}</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center text-sm text-muted-foreground">
                        <MapPin className="h-4 w-4 mr-2 flex-shrink-0" />
                        <span>
                          {audition.location}, {audition.state}
                        </span>
                      </div>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Calendar className="h-4 w-4 mr-2 flex-shrink-0" />
                        <span>{audition.date}</span>
                      </div>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Users className="h-4 w-4 mr-2 flex-shrink-0" />
                        <span>{audition.experience}</span>
                      </div>
                      <Badge variant="outline">{audition.type}</Badge>
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {audition.description}
                      </p>
                      <div className="flex gap-2 pt-2">
                        <Button variant="outline" size="sm" className="flex-1" asChild>
                          <Link href={`/auditions/${audition.id}`}>Details</Link>
                        </Button>
                        <Button size="sm" className="flex-1" asChild>
                          <Link href={audition.companyLink} target="_blank">
                            Apply <ExternalLink className="h-3 w-3 ml-1" />
                          </Link>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <Card className="text-center py-12">
                <CardContent>
                  <p className="text-muted-foreground mb-4">
                    No auditions are currently available in {city.name}. Check back soon or explore
                    auditions in other cities.
                  </p>
                  <Button asChild>
                    <Link href="/auditions">View All Auditions</Link>
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-12 bg-muted/30">
          <div className="container mx-auto px-4">
            <h2 className="font-playfair text-2xl md:text-3xl font-bold mb-8">
              Frequently Asked Questions
            </h2>
            <div className="grid gap-6 max-w-4xl">
              {faqs.map((faq, index) => (
                <Card key={index}>
                  <CardHeader>
                    <CardTitle className="text-lg font-semibold">{faq.question}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{faq.answer}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Internal Links Section */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            {/* Other Categories in This City */}
            <div className="mb-12">
              <h2 className="font-playfair text-2xl font-bold mb-6">
                More Opportunities in {city.name}
              </h2>
              <div className="flex flex-wrap gap-3">
                <Button variant="outline" asChild>
                  <Link href={`/${citySlug}/theatre-workshops`}>Workshops in {city.name}</Link>
                </Button>
                <Button variant="outline" asChild>
                  <Link href={`/${citySlug}/theatre-festivals`}>Festivals in {city.name}</Link>
                </Button>
              </div>
            </div>

            {/* Other Cities */}
            <div>
              <h2 className="font-playfair text-2xl font-bold mb-6">
                Auditions in Other Cities
              </h2>
              <div className="flex flex-wrap gap-3">
                {otherCities.map((otherCity) => (
                  <Button key={otherCity.slug} variant="outline" size="sm" asChild>
                    <Link href={`/${otherCity.slug}/auditions`}>
                      {otherCity.name}
                    </Link>
                  </Button>
                ))}
                <Button variant="ghost" size="sm" asChild>
                  <Link href="/auditions">View All Cities</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  )
}
