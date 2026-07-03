import { Suspense } from "react"
import type { Metadata } from "next"
import WorkshopsContent from "@/components/workshops-content"

export const metadata: Metadata = {
  title: "Theatre & Acting Workshops in India 2026 - Acting Classes Near You",
  description:
    "Find the best theatre workshops, acting classes, and drama training programs across India. Professional acting workshops in Mumbai, Delhi, Bangalore, Chennai, Kolkata & more cities. Learn acting, voice modulation, movement, improvisation from industry experts.",
  keywords: [
    "acting workshops India",
    "theatre workshops near me",
    "acting classes Mumbai",
    "drama workshops Delhi",
    "theatre training Bangalore",
    "acting course India",
    "theatre workshops 2026",
    "acting classes for beginners",
    "professional acting training",
    "voice and speech workshop",
    "movement workshop actors",
    "improvisation classes",
    "method acting workshop",
    "theatre acting course",
    "weekend acting classes",
    "online acting workshop India",
  ],
  openGraph: {
    title: "Theatre & Acting Workshops in India 2026 - Find Acting Classes Near You",
    description:
      "Discover professional acting workshops and theatre training programs across India. Learn from industry experts in Mumbai, Delhi, Bangalore & more.",
    url: "https://abhinaypath.com/workshops",
    type: "website",
    images: [
      {
        url: "/images/acting-workshop.png",
        width: 1200,
        height: 630,
        alt: "Theatre & Acting Workshops in India - AbhinayPath",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Theatre & Acting Workshops in India 2026",
    description:
      "Find the best acting classes and theatre workshops across India. Professional training in Mumbai, Delhi, Bangalore & more cities.",
  },
  alternates: {
    canonical: "https://abhinaypath.com/workshops",
  },
}

// Workshop Collection JSON-LD Schema
const workshopCollectionSchema = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: "Theatre & Acting Workshops in India",
  description:
    "Comprehensive listing of theatre workshops, acting classes, and drama training programs across India",
  url: "https://abhinaypath.com/workshops",
  mainEntity: {
    "@type": "ItemList",
    name: "Acting Workshops Collection",
    description: "List of theatre and acting workshops available in India",
    numberOfItems: 40,
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
        name: "Workshops",
        item: "https://abhinaypath.com/workshops",
      },
    ],
  },
}

export default function WorkshopsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(workshopCollectionSchema),
        }}
      />
      <Suspense fallback={<div className="container py-12">Loading workshops...</div>}>
        <WorkshopsContent />
      </Suspense>
    </>
  )
}
