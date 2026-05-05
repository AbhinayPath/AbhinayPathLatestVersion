import { Suspense } from "react"
import type { Metadata } from "next"
import AuditionsContent from "@/components/auditions-content"

export const metadata: Metadata = {
  title: "Theatre & Acting Auditions in India 2026 - Open Casting Calls",
  description:
    "Find latest theatre auditions, acting casting calls, and performance opportunities across India. Open auditions in Mumbai, Delhi, Bangalore, Chennai, Kolkata & more. Theatre groups, production houses, and independent projects casting now.",
  keywords: [
    "theatre auditions India",
    "acting auditions Mumbai",
    "casting calls Delhi",
    "theatre auditions 2026",
    "acting jobs India",
    "theatre casting",
    "drama auditions",
    "stage actor auditions",
    "open auditions near me",
    "theatre group auditions",
    "acting opportunities India",
    "Hindi theatre auditions",
    "regional theatre casting",
    "professional theatre auditions",
    "student theatre auditions",
    "paid acting roles India",
  ],
  openGraph: {
    title: "Theatre & Acting Auditions in India 2026 - Open Casting Calls",
    description:
      "Find latest theatre auditions and casting calls across India. Open auditions in Mumbai, Delhi, Bangalore & more cities.",
    url: "https://abhinaypath.com/auditions",
    type: "website",
    images: [
      {
        url: "/images/auditions-stage.png",
        width: 1200,
        height: 630,
        alt: "Theatre Auditions in India - AbhinayPath",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Theatre & Acting Auditions in India 2026",
    description:
      "Find latest theatre auditions and casting calls across India. Open auditions in Mumbai, Delhi, Bangalore & more.",
  },
  alternates: {
    canonical: "https://abhinaypath.com/auditions",
  },
}

// Auditions Collection JSON-LD Schema
const auditionsCollectionSchema = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: "Theatre & Acting Auditions in India",
  description:
    "Comprehensive listing of theatre auditions, casting calls, and acting opportunities across India",
  url: "https://abhinaypath.com/auditions",
  mainEntity: {
    "@type": "ItemList",
    name: "Theatre Auditions Collection",
    description: "List of open theatre auditions and casting calls in India",
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
        name: "Auditions",
        item: "https://abhinaypath.com/auditions",
      },
    ],
  },
}

export default function AuditionsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(auditionsCollectionSchema),
        }}
      />
      <Suspense fallback={<div className="container py-12">Loading auditions...</div>}>
        <AuditionsContent />
      </Suspense>
    </>
  )
}
