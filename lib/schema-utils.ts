// Comprehensive Schema.org utilities for SEO

// Course schema for workshops
export function generateCourseSchema(workshop: {
  title: string
  description: string
  trainer: string
  institution: string
  location: string
  date: string
  price: string
  url: string
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Course",
    name: workshop.title,
    description: workshop.description,
    provider: {
      "@type": "Organization",
      name: workshop.institution,
    },
    instructor: {
      "@type": "Person",
      name: workshop.trainer,
    },
    courseMode: "onsite",
    inLanguage: "en",
    offers: {
      "@type": "Offer",
      price: workshop.price.includes("Free") ? "0" : workshop.price.replace(/[^0-9]/g, ""),
      priceCurrency: "INR",
      availability: "https://schema.org/InStock",
      url: workshop.url,
    },
    location: {
      "@type": "Place",
      name: workshop.location,
      address: {
        "@type": "PostalAddress",
        addressLocality: workshop.location,
        addressCountry: "IN",
      },
    },
  }
}

// Event schema for auditions and festivals
export function generateEventSchema(event: {
  title: string
  description: string
  location: string
  startDate: string
  endDate?: string
  organizer: string
  url: string
  image?: string
  eventType?: "audition" | "festival" | "workshop"
}) {
  return {
    "@context": "https://schema.org",
    "@type": event.eventType === "audition" ? "Event" : "TheaterEvent",
    name: event.title,
    description: event.description,
    startDate: event.startDate,
    endDate: event.endDate || event.startDate,
    eventStatus: "https://schema.org/EventScheduled",
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    location: {
      "@type": "Place",
      name: event.location,
      address: {
        "@type": "PostalAddress",
        addressLocality: event.location,
        addressCountry: "IN",
      },
    },
    organizer: {
      "@type": "Organization",
      name: event.organizer,
    },
    image: event.image || "https://abhinaypath.com/images/events-hero.png",
    offers: {
      "@type": "Offer",
      availability: "https://schema.org/InStock",
      url: event.url,
    },
  }
}

// Person schema for theatre artists
export function generatePersonSchema(artist: {
  name: string
  description: string
  image: string
  location: string
  skills: string[]
  url: string
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: artist.name,
    description: artist.description,
    image: artist.image,
    jobTitle: "Theatre Artist",
    knowsAbout: artist.skills,
    url: artist.url,
    address: {
      "@type": "PostalAddress",
      addressLocality: artist.location,
      addressCountry: "IN",
    },
  }
}

// LocalBusiness schema for theatre groups
export function generateLocalBusinessSchema(business: {
  name: string
  description: string
  address: string
  city: string
  image?: string
  url: string
}) {
  return {
    "@context": "https://schema.org",
    "@type": "PerformingArtsTheater",
    name: business.name,
    description: business.description,
    image: business.image || "https://abhinaypath.com/images/community.png",
    address: {
      "@type": "PostalAddress",
      streetAddress: business.address,
      addressLocality: business.city,
      addressCountry: "IN",
    },
    url: business.url,
  }
}

// HowTo schema for guides
export function generateHowToSchema(guide: {
  title: string
  description: string
  steps: Array<{ name: string; text: string }>
  totalTime?: string
}) {
  return {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: guide.title,
    description: guide.description,
    totalTime: guide.totalTime || "PT30M",
    step: guide.steps.map((step, index) => ({
      "@type": "HowToStep",
      position: index + 1,
      name: step.name,
      text: step.text,
    })),
  }
}

// ItemList schema for collection pages
export function generateItemListSchema(items: Array<{ name: string; url: string; position: number }>) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: items.map((item) => ({
      "@type": "ListItem",
      position: item.position,
      name: item.name,
      url: item.url,
    })),
  }
}

// Video schema for video content
export function generateVideoSchema(video: {
  title: string
  description: string
  thumbnailUrl: string
  uploadDate: string
  duration: string
  contentUrl: string
}) {
  return {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    name: video.title,
    description: video.description,
    thumbnailUrl: video.thumbnailUrl,
    uploadDate: video.uploadDate,
    duration: video.duration,
    contentUrl: video.contentUrl,
  }
}

// Aggregate rating schema
export function generateAggregateRatingSchema(rating: {
  ratingValue: number
  reviewCount: number
  itemName: string
}) {
  return {
    "@type": "AggregateRating",
    ratingValue: rating.ratingValue,
    reviewCount: rating.reviewCount,
    bestRating: 5,
    worstRating: 1,
    itemReviewed: {
      "@type": "Organization",
      name: rating.itemName,
    },
  }
}
