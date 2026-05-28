import { Suspense } from "react"
import type { Metadata } from "next"
import EventDetailContent from "@/components/event-detail-content"
import { festivals } from "@/lib/data/events"

type Props = {
  params: { id: string }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const event = festivals.find(f => f.id === params.id)
  
  if (!event) {
    return {
      title: "Event Not Found - AbhinayPath",
      description: "The requested event could not be found.",
    }
  }

  return {
    title: `${event.name} - Theatre Festival | AbhinayPath`,
    description: event.description.slice(0, 160),
    keywords: [
      event.name,
      "theatre festival",
      event.city,
      event.country,
      "drama event",
      ...(event.tags || []),
    ],
    openGraph: {
      title: `${event.name} - Theatre Festival`,
      description: event.description.slice(0, 160),
      url: `https://abhinaypath.com/events/${event.id}`,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: event.name,
      description: event.description.slice(0, 160),
    },
  }
}

export async function generateStaticParams() {
  return festivals.map((festival) => ({
    id: festival.id,
  }))
}

export default function EventDetailPage({ params }: Props) {
  return (
    <Suspense fallback={<div className="container py-12">Loading event details...</div>}>
      <EventDetailContent id={params.id} />
    </Suspense>
  )
}
