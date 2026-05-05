import Link from "next/link"
import { ArrowRight } from "lucide-react"

// City-specific links for local SEO
const cityLinks = [
  { name: "Mumbai", slug: "mumbai" },
  { name: "Delhi", slug: "delhi" },
  { name: "Bangalore", slug: "bangalore" },
  { name: "Chennai", slug: "chennai" },
  { name: "Kolkata", slug: "kolkata" },
  { name: "Hyderabad", slug: "hyderabad" },
  { name: "Pune", slug: "pune" },
  { name: "Ahmedabad", slug: "ahmedabad" },
]

interface InternalLinksProps {
  currentPage: "workshops" | "auditions" | "events" | "artists" | "backstage" | "blog"
  showCityLinks?: boolean
}

export function SEOInternalLinks({ currentPage, showCityLinks = true }: InternalLinksProps) {
  const mainLinks = [
    { href: "/workshops", label: "Acting Workshops", page: "workshops" },
    { href: "/auditions", label: "Theatre Auditions", page: "auditions" },
    { href: "/events", label: "Theatre Festivals", page: "events" },
    { href: "/theatre-artists", label: "Theatre Artists", page: "artists" },
    { href: "/production-backstage", label: "Technical Artists", page: "backstage" },
    { href: "/admissions", label: "Drama School Admissions", page: "admissions" },
    { href: "/blog", label: "Theatre Blog & Guides", page: "blog" },
  ].filter((link) => link.page !== currentPage)

  return (
    <section className="mt-16 pt-12 border-t border-gray-200">
      <div className="max-w-4xl mx-auto">
        {/* Main Navigation Links */}
        <div className="mb-10">
          <h3 className="font-semibold text-gray-800 mb-4">Explore More on AbhinayPath</h3>
          <div className="flex flex-wrap gap-x-6 gap-y-2">
            {mainLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-[#7E1F2E] hover:underline text-sm flex items-center gap-1"
              >
                {link.label}
                <ArrowRight className="h-3 w-3" />
              </Link>
            ))}
          </div>
        </div>

        {/* City-specific Links */}
        {showCityLinks && (
          <div>
            <h3 className="font-semibold text-gray-800 mb-4">
              {currentPage === "workshops" && "Theatre Workshops by City"}
              {currentPage === "auditions" && "Theatre Auditions by City"}
              {currentPage === "events" && "Theatre Festivals by City"}
              {currentPage === "artists" && "Theatre Artists by City"}
              {currentPage === "backstage" && "Technical Artists by City"}
              {currentPage === "blog" && "Theatre Resources by City"}
            </h3>
            <div className="flex flex-wrap gap-x-4 gap-y-2">
              {cityLinks.map((city) => {
                const categoryPath =
                  currentPage === "workshops"
                    ? "theatre-workshops"
                    : currentPage === "auditions"
                      ? "auditions"
                      : currentPage === "events"
                        ? "theatre-festivals"
                        : "theatre-workshops"

                return (
                  <Link
                    key={city.slug}
                    href={`/city/${city.slug}/${categoryPath}`}
                    className="text-gray-600 hover:text-[#7E1F2E] text-sm"
                  >
                    {currentPage === "workshops" && `Workshops in ${city.name}`}
                    {currentPage === "auditions" && `Auditions in ${city.name}`}
                    {currentPage === "events" && `Festivals in ${city.name}`}
                    {currentPage === "artists" && `Artists in ${city.name}`}
                    {currentPage === "backstage" && `Technicians in ${city.name}`}
                    {currentPage === "blog" && `Theatre in ${city.name}`}
                  </Link>
                )
              })}
            </div>
          </div>
        )}

        {/* Related Categories */}
        <div className="mt-8 pt-8 border-t border-gray-100">
          <h3 className="font-semibold text-gray-800 mb-4">Popular Categories</h3>
          <div className="flex flex-wrap gap-2">
            {[
              "Acting Classes",
              "Voice Training",
              "Movement Workshops",
              "Improvisation",
              "Method Acting",
              "Theatre Festivals 2026",
              "Open Auditions",
              "Paid Acting Roles",
              "NSD Preparation",
              "FTII Coaching",
            ].map((category) => (
              <span
                key={category}
                className="bg-gray-100 text-gray-700 text-xs px-3 py-1.5 rounded-full"
              >
                {category}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

// Breadcrumb component for SEO
interface BreadcrumbProps {
  items: Array<{ label: string; href?: string }>
}

export function SEOBreadcrumb({ items }: BreadcrumbProps) {
  return (
    <nav aria-label="Breadcrumb" className="mb-6">
      <ol className="flex flex-wrap items-center gap-2 text-sm text-gray-600">
        <li>
          <Link href="/" className="hover:text-[#7E1F2E]">
            Home
          </Link>
        </li>
        {items.map((item, index) => (
          <li key={index} className="flex items-center gap-2">
            <span className="text-gray-400">/</span>
            {item.href ? (
              <Link href={item.href} className="hover:text-[#7E1F2E]">
                {item.label}
              </Link>
            ) : (
              <span className="text-gray-400">{item.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  )
}
