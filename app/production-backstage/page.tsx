import type { Metadata } from "next"
import ProductionBackstageContent from "@/components/production-backstage-content"

export const metadata: Metadata = {
  title: "Technical Theatre Artists India - Lighting, Sound, Set Design Professionals",
  description:
    "Find skilled technical theatre professionals, lighting designers, sound engineers, set designers, costume designers, and stage managers across India. Hire backstage crew for your theatre production in Mumbai, Delhi, Bangalore, and more cities.",
  keywords: [
    "technical theatre India",
    "lighting designer theatre",
    "sound engineer theatre",
    "set designer India",
    "costume designer theatre",
    "stage manager",
    "theatre technicians",
    "backstage crew India",
    "production manager theatre",
    "theatre lighting technician",
    "sound design theatre",
    "scenic designer",
    "props designer",
    "makeup artist theatre",
    "theatre production crew",
  ],
  openGraph: {
    title: "Technical Theatre Artists India - Lighting, Sound, Set Design Professionals",
    description:
      "Find skilled technical theatre professionals and backstage crew across India. Lighting designers, sound engineers, set designers & more.",
    url: "https://abhinaypath.com/production-backstage",
    type: "website",
    images: [
      {
        url: "/images/hero-bg.png",
        width: 1200,
        height: 630,
        alt: "Technical Theatre Artists India - AbhinayPath",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Technical Theatre Artists India",
    description:
      "Find skilled technical theatre professionals and backstage crew across India. Hire for your production.",
  },
  alternates: {
    canonical: "https://abhinaypath.com/production-backstage",
  },
}

// Technical Artists Collection JSON-LD Schema
const technicalArtistsSchema = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: "Technical Theatre Artists in India",
  description:
    "Directory of technical theatre professionals including lighting designers, sound engineers, set designers, and stage managers",
  url: "https://abhinaypath.com/production-backstage",
  mainEntity: {
    "@type": "ItemList",
    name: "Technical Theatre Artists Directory",
    description: "List of technical theatre professionals in India",
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
        name: "Technical Artists",
        item: "https://abhinaypath.com/production-backstage",
      },
    ],
  },
}

export default function ProductionBackstagePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(technicalArtistsSchema),
        }}
      />
      <ProductionBackstageContent />
    </>
  )
}
