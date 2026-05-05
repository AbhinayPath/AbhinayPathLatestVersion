import type { MetadataRoute } from "next"
import { SUPPORTED_CITIES } from "@/lib/seo-utils"

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://abhinaypath.com"
  
  // Core pages with high priority
  const corePages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/workshops`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.95,
    },
    {
      url: `${baseUrl}/auditions`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.95,
    },
    {
      url: `${baseUrl}/events`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/theatre-artists`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.85,
    },
    {
      url: `${baseUrl}/production-backstage`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.85,
    },
    {
      url: `${baseUrl}/admissions`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${baseUrl}/join-community`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/resources`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.75,
    },
    {
      url: `${baseUrl}/recruitment`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.85,
    },
  ]

  // Blog articles (high SEO value content)
  const blogArticles: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/blog/how-to-prepare-for-theatre-auditions-india`,
      lastModified: new Date("2026-05-01"),
      changeFrequency: "monthly" as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/blog/top-10-theatre-groups-mumbai`,
      lastModified: new Date("2026-04-25"),
      changeFrequency: "monthly" as const,
      priority: 0.85,
    },
    {
      url: `${baseUrl}/blog/nsd-entrance-exam-preparation-guide`,
      lastModified: new Date("2026-04-20"),
      changeFrequency: "monthly" as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/blog/acting-techniques-indian-theatre`,
      lastModified: new Date("2026-04-15"),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/blog/theatre-festivals-india-2026`,
      lastModified: new Date("2026-04-10"),
      changeFrequency: "monthly" as const,
      priority: 0.85,
    },
    {
      url: `${baseUrl}/blog/career-in-theatre-india-salary-guide`,
      lastModified: new Date("2026-04-05"),
      changeFrequency: "monthly" as const,
      priority: 0.85,
    },
    {
      url: `${baseUrl}/blog/voice-training-exercises-actors`,
      lastModified: new Date("2026-03-28"),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/blog/ftii-acting-course-complete-guide`,
      lastModified: new Date("2026-03-20"),
      changeFrequency: "monthly" as const,
      priority: 0.9,
    },
  ]
  
  // City-specific landing pages
  const cityLandingPages: MetadataRoute.Sitemap = SUPPORTED_CITIES.map((city) => ({
    url: `${baseUrl}/city/${city.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }))
  
  // City + Category pages (high SEO value)
  const cityWorkshopPages: MetadataRoute.Sitemap = SUPPORTED_CITIES.map((city) => ({
    url: `${baseUrl}/city/${city.slug}/theatre-workshops`,
    lastModified: new Date(),
    changeFrequency: "daily" as const,
    priority: 0.85,
  }))
  
  const cityAuditionPages: MetadataRoute.Sitemap = SUPPORTED_CITIES.map((city) => ({
    url: `${baseUrl}/city/${city.slug}/auditions`,
    lastModified: new Date(),
    changeFrequency: "daily" as const,
    priority: 0.85,
  }))
  
  const cityFestivalPages: MetadataRoute.Sitemap = SUPPORTED_CITIES.map((city) => ({
    url: `${baseUrl}/city/${city.slug}/theatre-festivals`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }))
  
  return [
    ...corePages,
    ...blogArticles,
    ...cityLandingPages,
    ...cityWorkshopPages,
    ...cityAuditionPages,
    ...cityFestivalPages,
  ]
}
