import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ChevronRight, MapPin, Theater, Calendar, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  getCityBySlug,
  getAllCitySlugs,
  generateOrganizationSchema,
  generateBreadcrumbSchema,
  SUPPORTED_CITIES,
} from "@/lib/seo-utils"

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

  const title = `Theatre Opportunities in ${city.name} | AbhinayPath`
  const description = `Discover theatre workshops, auditions, and festivals in ${city.name}. Find acting classes, casting calls, and performance opportunities on AbhinayPath - India's platform for creative artists.`

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `https://www.abhinaypath.com/city/${citySlug}`,
      siteName: "AbhinayPath",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
    alternates: {
      canonical: `https://www.abhinaypath.com/city/${citySlug}`,
    },
  }
}

export default async function CityLandingPage({ params }: PageProps) {
  const { city: citySlug } = await params
  const city = getCityBySlug(citySlug)

  if (!city) {
    notFound()
  }

  // Generate structured data
  const organizationSchema = generateOrganizationSchema()
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: "https://www.abhinaypath.com" },
    { name: city.name, url: `https://www.abhinaypath.com/city/${citySlug}` },
  ])

  // Get other cities for internal linking
  const otherCities = SUPPORTED_CITIES.filter((c) => c.slug !== citySlug).slice(0, 8)

  const categories = [
    {
      title: "Theatre Workshops",
      description: `Find acting classes, theatre training programs, and skill development workshops in ${city.name}.`,
      icon: Theater,
      href: `/city/${citySlug}/theatre-workshops`,
      color: "bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-300",
    },
    {
      title: "Auditions",
      description: `Discover theatre and film auditions, casting calls, and performance opportunities in ${city.name}.`,
      icon: Sparkles,
      href: `/city/${citySlug}/auditions`,
      color: "bg-purple-50 text-purple-700 dark:bg-purple-950 dark:text-purple-300",
    },
    {
      title: "Theatre Festivals",
      description: `Explore theatre festivals, drama competitions, and cultural events happening in ${city.name}.`,
      icon: Calendar,
      href: `/city/${citySlug}/theatre-festivals`,
      color: "bg-amber-50 text-amber-700 dark:bg-amber-950 dark:text-amber-300",
    },
  ]

  return (
    <>
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
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
                <span className="text-foreground font-medium">{city.name}</span>
              </li>
            </ol>
          </div>
        </nav>

        {/* Hero Section */}
        <section className="bg-gradient-to-b from-primary/5 to-background py-12 md:py-20">
          <div className="container mx-auto px-4 text-center">
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full mb-6">
              <MapPin className="h-4 w-4" />
              <span className="text-sm font-medium">{city.state}, India</span>
            </div>
            <h1 className="font-playfair text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
              Theatre Opportunities in {city.name}
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
              {city.description}. Discover workshops, auditions, and festivals to grow your career
              in performing arts.
            </p>
          </div>
        </section>

        {/* Categories Section */}
        <section className="py-12 md:py-16">
          <div className="container mx-auto px-4">
            <h2 className="font-playfair text-2xl md:text-3xl font-bold text-center mb-8">
              Explore Opportunities
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {categories.map((category) => (
                <Link key={category.href} href={category.href} className="group">
                  <Card className="h-full hover:shadow-lg transition-all duration-300 group-hover:-translate-y-1">
                    <CardHeader>
                      <div
                        className={`w-12 h-12 rounded-lg ${category.color} flex items-center justify-center mb-4`}
                      >
                        <category.icon className="h-6 w-6" />
                      </div>
                      <CardTitle className="text-xl group-hover:text-primary transition-colors">
                        {category.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="text-base">
                        {category.description}
                      </CardDescription>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Other Cities Section */}
        <section className="py-12 bg-muted/30">
          <div className="container mx-auto px-4">
            <h2 className="font-playfair text-2xl font-bold mb-6 text-center">
              Explore Other Cities
            </h2>
            <div className="flex flex-wrap justify-center gap-3">
              {otherCities.map((otherCity) => (
                <Button key={otherCity.slug} variant="outline" size="sm" asChild>
                  <Link href={`/city/${otherCity.slug}`}>{otherCity.name}</Link>
                </Button>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-12 md:py-16">
          <div className="container mx-auto px-4 text-center">
            <h2 className="font-playfair text-2xl md:text-3xl font-bold mb-4">
              Can&apos;t Find What You&apos;re Looking For?
            </h2>
            <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
              Browse all opportunities across India or explore our other resources for theatre
              artists.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild>
                <Link href="/workshops">All Workshops</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/auditions">All Auditions</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/events">All Festivals</Link>
              </Button>
            </div>
          </div>
        </section>
      </div>
    </>
  )
}
