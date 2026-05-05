import { Suspense } from "react"
import type { Metadata } from "next"
import EventsContent from "@/components/events-content"

export const metadata: Metadata = {
  title: "Theatre Festivals in India 2026 - Drama & Performing Arts Events",
  description:
    "Discover upcoming theatre festivals, drama events, and performing arts celebrations across India and internationally. Find submission deadlines, eligibility criteria, and festival dates for 2026. National Theatre Festival, Prithvi Theatre Festival, and more.",
  keywords: [
    "theatre festivals India 2026",
    "drama festivals",
    "theatre events",
    "performing arts festival",
    "national theatre festival",
    "international theatre festival",
    "Prithvi Theatre Festival",
    "NSD theatre festival",
    "theatre competitions India",
    "drama competitions",
    "theatre fest submission",
    "theatre festival call for entries",
    "Hindi theatre festival",
    "regional theatre festivals",
    "street theatre festival",
    "experimental theatre festival",
  ],
  openGraph: {
    title: "Theatre Festivals in India 2026 - Drama & Performing Arts Events",
    description:
      "Discover upcoming theatre festivals, drama events, and performing arts celebrations across India. Find submission deadlines and festival dates.",
    url: "https://abhinaypath.com/events",
    type: "website",
    images: [
      {
        url: "/images/events-hero.png",
        width: 1200,
        height: 630,
        alt: "Theatre Festivals in India 2026 - AbhinayPath",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Theatre Festivals in India 2026",
    description:
      "Discover upcoming theatre festivals and drama events across India. Find submission deadlines and festival dates.",
  },
  alternates: {
    canonical: "https://abhinaypath.com/events",
  },
}

// Events Collection JSON-LD Schema
const eventsCollectionSchema = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: "Theatre Festivals in India 2026",
  description:
    "Comprehensive listing of theatre festivals, drama events, and performing arts celebrations across India and internationally",
  url: "https://abhinaypath.com/events",
  mainEntity: {
    "@type": "ItemList",
    name: "Theatre Festivals Collection",
    description: "List of theatre festivals and drama events",
  },
  breadcrumb: {
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://abhinaypath.com",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Theatre Festivals",
        item: "https://abhinaypath.com/events",
      },
    ],
  },
}

export default function EventsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(eventsCollectionSchema),
        }}
      />
      <Suspense fallback={<div className="container py-12">Loading festivals...</div>}>
        <EventsContent />
      </Suspense>
    </>
  )
}
