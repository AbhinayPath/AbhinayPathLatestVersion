import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ChevronRight, MapPin, Calendar, Globe, Clock, ExternalLink } from "lucide-react"
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

// Import festivals data
import { festivals as allFestivals, STATUS_CONFIG, getScaleColor } from "@/lib/data/events"

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

  const category = CATEGORIES["theatre-festivals"]
  const title = generateSEOTitle(city.name, category)
  const description = generateMetaDescription(city.name, category)

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `https://www.abhinaypath.com/${citySlug}/theatre-festivals`,
      siteName: "AbhinayPath",
      type: "website",
      images: [
        {
          url: "https://www.abhinaypath.com/images/events-hero.png",
          width: 1200,
          height: 630,
          alt: `Theatre Festivals in ${city.name}`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
    alternates: {
      canonical: `https://www.abhinaypath.com/${citySlug}/theatre-festivals`,
    },
  }
}

export default async function CityFestivalsPage({ params }: PageProps) {
  const { city: citySlug } = await params
  const city = getCityBySlug(citySlug)

  if (!city) {
    notFound()
  }

  const category = CATEGORIES["theatre-festivals"]

  // Filter festivals by city (server-side)
  const cityFestivals = allFestivals.filter((festival) => matchesCity(festival.city, citySlug))

  // Generate SEO content
  const seoIntro = generateSEOIntro(city.name, "theatre-festivals")
  const faqs = generateFAQs(city.name, "theatre-festivals")

  // Generate structured data
  const organizationSchema = generateOrganizationSchema()
  const faqSchema = generateFAQSchema(faqs)
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: "https://www.abhinaypath.com" },
    { name: city.name, url: `https://www.abhinaypath.com/${citySlug}` },
    { name: "Theatre Festivals", url: `https://www.abhinaypath.com/${citySlug}/theatre-festivals` },
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
                <span className="text-foreground font-medium">Theatre Festivals</span>
              </li>
            </ol>
          </div>
        </nav>

        {/* Hero Section with SEO Content */}
        <section className="bg-gradient-to-b from-primary/5 to-background py-12 md:py-16">
          <div className="container mx-auto px-4">
            <h1 className="font-playfair text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
              Theatre Festivals &amp; Events in {city.name}
            </h1>
            <p className="text-lg text-muted-foreground max-w-4xl leading-relaxed">
              {seoIntro}
            </p>
          </div>
        </section>

        {/* Festival Listings */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <h2 className="font-playfair text-2xl md:text-3xl font-bold mb-8">
              {cityFestivals.length > 0
                ? `${cityFestivals.length} Festival${cityFestivals.length !== 1 ? "s" : ""} in ${city.name}`
                : `No Upcoming Festivals in ${city.name}`}
            </h2>

            {cityFestivals.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {cityFestivals.map((festival) => {
                  const statusConfig = STATUS_CONFIG[festival.status] || STATUS_CONFIG.open
                  const scaleColor = getScaleColor(festival.scale)

                  return (
                    <Card key={festival.id} className="hover:shadow-lg transition-shadow">
                      <CardHeader>
                        <div className="flex items-start justify-between gap-2 mb-2">
                          <Badge className={statusConfig.color}>{statusConfig.shortLabel}</Badge>
                          <Badge className={scaleColor}>{festival.scale}</Badge>
                        </div>
                        <CardTitle className="line-clamp-2 text-lg">{festival.name}</CardTitle>
                        <CardDescription>{festival.country}</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="flex items-center text-sm text-muted-foreground">
                          <MapPin className="h-4 w-4 mr-2 flex-shrink-0" />
                          <span>{festival.city}</span>
                        </div>
                        <div className="flex items-center text-sm text-muted-foreground">
                          <Calendar className="h-4 w-4 mr-2 flex-shrink-0" />
                          <span>{festival.dates}</span>
                        </div>
                        <div className="flex items-center text-sm text-muted-foreground">
                          <Clock className="h-4 w-4 mr-2 flex-shrink-0" />
                          <span>Deadline: {festival.submissionDeadline}</span>
                        </div>
                        <div className="flex items-center text-sm text-muted-foreground">
                          <Globe className="h-4 w-4 mr-2 flex-shrink-0" />
                          <span>{festival.languages}</span>
                        </div>
                        <p className="text-sm text-muted-foreground line-clamp-2">
                          {festival.description}
                        </p>
                        <div className="pt-2">
                          <Button size="sm" className="w-full" asChild>
                            <Link href={festival.link} target="_blank">
                              Learn More <ExternalLink className="h-3 w-3 ml-1" />
                            </Link>
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  )
                })}
              </div>
            ) : (
              <Card className="text-center py-12">
                <CardContent>
                  <p className="text-muted-foreground mb-4">
                    No festivals are currently scheduled in {city.name}. Check back soon or explore
                    festivals in other cities and countries.
                  </p>
                  <Button asChild>
                    <Link href="/events">View All Festivals</Link>
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
                  <Link href={`/${citySlug}/auditions`}>Auditions in {city.name}</Link>
                </Button>
              </div>
            </div>

            {/* Other Cities */}
            <div>
              <h2 className="font-playfair text-2xl font-bold mb-6">
                Theatre Festivals in Other Cities
              </h2>
              <div className="flex flex-wrap gap-3">
                {otherCities.map((otherCity) => (
                  <Button key={otherCity.slug} variant="outline" size="sm" asChild>
                    <Link href={`/${otherCity.slug}/theatre-festivals`}>
                      {otherCity.name}
                    </Link>
                  </Button>
                ))}
                <Button variant="ghost" size="sm" asChild>
                  <Link href="/events">View All Festivals</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  )
}
