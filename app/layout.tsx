import type React from "react"
import type { Metadata } from "next"
import { Inter, Playfair_Display as PlayfairDisplay } from "next/font/google"
import { Suspense } from "react"
import "./globals.css"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { ThemeProvider } from "@/components/theme-provider"
import { Analytics } from "@vercel/analytics/react"


const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
})

const playfair = PlayfairDisplay({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-playfair",
})

export const metadata: Metadata = {
  metadataBase: new URL("https://abhinaypath.com"),
  title: {
    default: "AbhinayPath - India's Premier Theatre & Performing Arts Platform",
    template: "%s | AbhinayPath",
  },
  description:
    "Discover theatre auditions, acting workshops, drama festivals, and connect with theatre artists across India. Your gateway to Indian performing arts - acting classes, stage performances, and theatre opportunities in Mumbai, Delhi, Bangalore & more.",
  keywords: [
    "theatre auditions India",
    "acting workshops",
    "theatre festivals",
    "drama classes",
    "theatre artists India",
    "acting auditions Mumbai",
    "theatre workshops Delhi",
    "performing arts India",
    "stage actors",
    "theatre groups India",
    "NSD preparation",
    "FTII coaching",
    "acting classes near me",
    "theatre training",
    "Hindi theatre",
    "regional theatre India",
  ],
  authors: [{ name: "AbhinayPath" }],
  creator: "AbhinayPath",
  publisher: "AbhinayPath",
  generator: "v0.app",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://abhinaypath.com",
    siteName: "AbhinayPath",
    title: "AbhinayPath - India's Premier Theatre & Performing Arts Platform",
    description:
      "Discover theatre auditions, acting workshops, drama festivals, and connect with theatre artists across India. Your gateway to Indian performing arts.",
    images: [
      {
        url: "/images/og-image.png",
        width: 1200,
        height: 630,
        alt: "AbhinayPath - Theatre & Performing Arts Platform",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "AbhinayPath - India's Premier Theatre & Performing Arts Platform",
    description:
      "Discover theatre auditions, acting workshops, drama festivals, and connect with theatre artists across India.",
    images: ["/images/og-image.png"],
    creator: "@abhinaypath",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "https://abhinaypath.com",
    languages: {
      "en-IN": "https://abhinaypath.com",
    },
  },
  verification: {
    google: "your-google-verification-code",
  },
  category: "Arts & Entertainment",
}

// Organization JSON-LD Schema
const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "AbhinayPath",
  alternateName: "Abhinayपथ",
  url: "https://abhinaypath.com",
  logo: "https://abhinaypath.com/images/abhinaypath-logo.png",
  description:
    "India's premier platform for theatre and performing arts - connecting artists with auditions, workshops, festivals, and opportunities across the country.",
  foundingDate: "2024",
  sameAs: [
    "https://www.instagram.com/abhinaypath",
    "https://www.facebook.com/abhinaypath",
    "https://twitter.com/abhinaypath",
    "https://www.youtube.com/@abhinaypath",
  ],
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "customer service",
    availableLanguage: ["English", "Hindi"],
  },
  areaServed: {
    "@type": "Country",
    name: "India",
  },
  knowsAbout: [
    "Theatre",
    "Performing Arts",
    "Acting",
    "Drama",
    "Theatre Workshops",
    "Theatre Auditions",
    "Theatre Festivals",
    "Stage Production",
  ],
}

// Website JSON-LD Schema
const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "AbhinayPath",
  url: "https://abhinaypath.com",
  potentialAction: {
    "@type": "SearchAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate: "https://abhinaypath.com/search?q={search_term_string}",
    },
    "query-input": "required name=search_term_string",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationSchema),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(websiteSchema),
          }}
        />
      </head>
      <body className={`${inter.variable} ${playfair.variable} font-sans`}>
        <ThemeProvider attribute="class" defaultTheme="light">
          <div className="flex min-h-screen flex-col">
            <Suspense fallback={<div className="h-16 border-b bg-background/95 backdrop-blur"></div>}>
              <Navbar />
            </Suspense>
            <main className="flex-1">{children}</main>
            
            <Footer />
          </div>
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  )
}
