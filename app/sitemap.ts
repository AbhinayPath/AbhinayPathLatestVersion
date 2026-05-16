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
    ...cityLandingPages,
    ...cityWorkshopPages,
    ...cityAuditionPages,
    ...cityFestivalPages,
  ]
}
