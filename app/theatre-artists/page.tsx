import type { Metadata } from "next"
import TheatreArtistsContent from "./content"

export const metadata: Metadata = {
  title: "Theatre Artists in India - Actors, Directors & Performers Directory",
  description:
    "Discover talented theatre artists, stage actors, directors, and performers from across India. Connect with professional theatre artists in Mumbai, Delhi, Bangalore, Chennai, Kolkata and more cities. Find actors for your production or explore theatre talent.",
  keywords: [
    "theatre artists India",
    "stage actors India",
    "theatre directors",
    "drama artists",
    "theatre performers",
    "actors Mumbai",
    "theatre actors Delhi",
    "professional actors India",
    "theatre talent directory",
    "Hindi theatre actors",
    "regional theatre artists",
    "NSD alumni actors",
    "FTII actors",
    "emerging theatre artists",
    "theatre cast directory",
  ],
  openGraph: {
    title: "Theatre Artists in India - Actors, Directors & Performers Directory",
    description:
      "Discover talented theatre artists and performers from across India. Connect with professional stage actors and directors.",
    url: "https://abhinaypath.com/theatre-artists",
    type: "website",
    images: [
      {
        url: "/images/community.png",
        width: 1200,
        height: 630,
        alt: "Theatre Artists in India - AbhinayPath",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Theatre Artists in India - Actors & Performers Directory",
    description:
      "Discover talented theatre artists and performers from across India. Connect with professional stage actors.",
  },
  alternates: {
    canonical: "https://abhinaypath.com/theatre-artists",
  },
}

// Theatre Artists Collection JSON-LD Schema
const artistsCollectionSchema = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: "Theatre Artists in India",
  description:
    "Directory of theatre artists, actors, directors, and performers from across India",
  url: "https://abhinaypath.com/theatre-artists",
  mainEntity: {
    "@type": "ItemList",
    name: "Theatre Artists Directory",
    description: "List of theatre artists and performers in India",
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
        name: "Theatre Artists",
        item: "https://abhinaypath.com/theatre-artists",
      },
    ],
  },
}

export default function TheatreArtistsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(artistsCollectionSchema),
        }}
      />
      <TheatreArtistsContent />
    </>
  )
}
