import Link from "next/link"
import { Button } from "@/components/ui/button"
import { MapPin } from "lucide-react"
import { SUPPORTED_CITIES } from "@/lib/seo-utils"

export default function CityNotFound() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="text-center px-4">
        <MapPin className="h-16 w-16 mx-auto text-muted-foreground mb-6" />
        <h1 className="font-playfair text-3xl md:text-4xl font-bold mb-4">
          City Not Found
        </h1>
        <p className="text-muted-foreground mb-8 max-w-md mx-auto">
          We couldn&apos;t find the city you&apos;re looking for. Please check the URL or explore
          opportunities in one of our supported cities below.
        </p>
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {SUPPORTED_CITIES.slice(0, 10).map((city) => (
            <Button key={city.slug} variant="outline" size="sm" asChild>
              <Link href={`/city/${city.slug}/theatre-workshops`}>{city.name}</Link>
            </Button>
          ))}
        </div>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild>
            <Link href="/workshops">Browse All Workshops</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/">Go to Homepage</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
