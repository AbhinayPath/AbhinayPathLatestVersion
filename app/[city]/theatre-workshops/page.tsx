import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ChevronRight, MapPin, Calendar, Clock, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
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
  type FAQ,
} from "@/lib/seo-utils"

// Import workshops data (we'll extract this from the component)
import { getWorkshopsData } from "@/lib/data/workshops-data"

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

  const category = CATEGORIES["theatre-workshops"]
  const title = generateSEOTitle(city.name, category)
  const description = generateMetaDescription(city.name, category)

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `https://www.abhinaypath.com/${citySlug}/theatre-workshops`,
      siteName: "AbhinayPath",
      type: "website",
      images: [
        {
          url: "https://www.abhinaypath.com/images/acting-workshop.png",
          width: 1200,
          height: 630,
          alt: `Theatre Workshops in ${city.name}`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
    alternates: {
      canonical: `https://www.abhinaypath.com/${citySlug}/theatre-workshops`,
    },
  }
}

export default async function CityWorkshopsPage({ params }: PageProps) {
  const { city: citySlug } = await params
  const city = getCityBySlug(citySlug)

  if (!city) {
    notFound()
  }

  const category = CATEGORIES["theatre-workshops"]
  const allWorkshops = getWorkshopsData()

  // Filter workshops by city (server-side)
  const cityWorkshops = allWorkshops.filter((workshop) => matchesCity(workshop.location, citySlug))

  // Generate SEO content
  const seoIntro = generateSEOIntro(city.name, "theatre-workshops")
  const faqs = generateFAQs(city.name, "theatre-workshops")

  // Generate structured data
  const organizationSchema = generateOrganizationSchema()
  const faqSchema = generateFAQSchema(faqs)
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: "https://www.abhinaypath.com" },
    { name: city.name, url: `https://www.abhinaypath.com/${citySlug}` },
    { name: "Theatre Workshops", url: `https://www.abhinaypath.com/${citySlug}/theatre-workshops` },
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
                <span className="text-foreground font-medium">Theatre Workshops</span>
              </li>
            </ol>
          </div>
        </nav>

        {/* Hero Section with SEO Content */}
        <section className="bg-gradient-to-b from-primary/5 to-background py-12 md:py-16">
          <div className="container mx-auto px-4">
            <h1 className="font-playfair text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
              Theatre Workshops in {city.name}
            </h1>
            <p className="text-lg text-muted-foreground max-w-4xl leading-relaxed">
              {seoIntro}
            </p>
          </div>
        </section>

        {/* Workshop Listings */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <h2 className="font-playfair text-2xl md:text-3xl font-bold mb-8">
              {cityWorkshops.length > 0
                ? `${cityWorkshops.length} Workshop${cityWorkshops.length !== 1 ? "s" : ""} in ${city.name}`
                : `No Active Workshops in ${city.name}`}
            </h2>

            {cityWorkshops.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {cityWorkshops.map((workshop) => (
                  <Card key={workshop.id} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <CardTitle className="line-clamp-2 text-lg">{workshop.title}</CardTitle>
                      <CardDescription>{workshop.institution}</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center text-sm text-muted-foreground">
                        <MapPin className="h-4 w-4 mr-2 flex-shrink-0" />
                        <span>
                          {workshop.location}, {workshop.state}
                        </span>
                      </div>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Calendar className="h-4 w-4 mr-2 flex-shrink-0" />
                        <span>{workshop.date}</span>
                      </div>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Clock className="h-4 w-4 mr-2 flex-shrink-0" />
                        <span>{workshop.time}</span>
                      </div>
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {workshop.description}
                      </p>
                      <div className="flex items-center justify-between pt-2">
                        <span className="font-semibold text-primary">{workshop.price}</span>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm" asChild>
                            <Link href={`/workshops/${workshop.id}`}>Details</Link>
                          </Button>
                          <Button size="sm" asChild>
                            <Link href={workshop.registrationLink} target="_blank">
                              Register <ExternalLink className="h-3 w-3 ml-1" />
                            </Link>
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <Card className="text-center py-12">
                <CardContent>
                  <p className="text-muted-foreground mb-4">
                    No workshops are currently scheduled in {city.name}. Check back soon or explore
                    workshops in other cities.
                  </p>
                  <Button asChild>
                    <Link href="/workshops">View All Workshops</Link>
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
                  <Link href={`/${citySlug}/auditions`}>Auditions in {city.name}</Link>
                </Button>
                <Button variant="outline" asChild>
                  <Link href={`/${citySlug}/theatre-festivals`}>Festivals in {city.name}</Link>
                </Button>
              </div>
            </div>

            {/* Other Cities */}
            <div>
              <h2 className="font-playfair text-2xl font-bold mb-6">
                Theatre Workshops in Other Cities
              </h2>
              <div className="flex flex-wrap gap-3">
                {otherCities.map((otherCity) => (
                  <Button key={otherCity.slug} variant="outline" size="sm" asChild>
                    <Link href={`/${otherCity.slug}/theatre-workshops`}>
                      {otherCity.name}
                    </Link>
                  </Button>
                ))}
                <Button variant="ghost" size="sm" asChild>
                  <Link href="/workshops">View All Cities</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  )
}
