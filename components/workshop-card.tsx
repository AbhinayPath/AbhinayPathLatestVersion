import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { CalendarIcon, MapPin, Clock, Star } from "lucide-react"

interface WorkshopCardProps {
  workshop: {
    id: number
    title: string
    trainer: string
    institution: string
    location: string
    state: string
    date: string
    time: string
    description: string
    price: string
    featured?: boolean
    registrationLink: string
  }
  variant?: "compact" | "full"
}

export default function WorkshopCard({ workshop, variant = "full" }: WorkshopCardProps) {
  return (
    <div
      className={`bg-white rounded-lg overflow-hidden flex flex-col h-full card-hover shadow-sm border ${
        workshop.featured ? "border-purple-200" : "border-gray-100"
      }`}
    >
      <div className="relative h-48 w-full group">
        <Image
          src="/images/acting-workshop.png"
          alt={workshop.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
          priority={workshop.featured}
          onError={(e) => {
            e.currentTarget.src = "/placeholder.svg?height=300&width=500&text=Acting+Workshop"
          }}
        />
        {workshop.featured && (
          <div className="absolute top-2 right-2 badge-verified">
            <span className="flex items-center">
              <Star className="w-3 h-3 mr-1 fill-current" />
              Featured
            </span>
          </div>
        )}
      </div>

      <div className="p-6 flex-1 flex flex-col space-y-4">
        {/* Title */}
        <h3 className="font-playfair text-xl font-bold text-gray-900 break-words line-clamp-2">
          {workshop.title || "Workshop Title"}
        </h3>
        
        {/* Subtitle / Trainer */}
        <p className="text-purple-600 font-medium text-sm truncate">
          By {workshop.trainer}
        </p>

        {/* Details: Date, Location, Time */}
        <div className="flex items-start sm:items-center gap-2 text-sm text-gray-600 flex-wrap">
          <div className="flex items-center gap-1">
            <CalendarIcon className="h-4 w-4 flex-shrink-0" />
            <span className="break-words">{workshop.date}</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="hidden sm:inline">•</span>
            <Clock className="h-4 w-4 flex-shrink-0 text-gray-400" />
            <span className="truncate">{workshop.time}</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="hidden sm:inline">•</span>
            <MapPin className="h-4 w-4 flex-shrink-0 text-gray-400" />
            <span className="truncate">
              {workshop.location}{workshop.location !== "Online" ? `, ${workshop.state}` : ""}
            </span>
          </div>
        </div>

        {/* Description Snippet */}
        <div className="text-gray-600 text-sm line-clamp-3 overflow-hidden flex-1">
          {workshop.description ? (
            <p className="whitespace-pre-line leading-relaxed">{workshop.description}</p>
          ) : (
            <p>No description provided.</p>
          )}
        </div>

        {/* Price Tag */}
        <div className="flex items-center text-sm font-medium pt-2">
          <span className="text-purple-700 bg-purple-50 px-3 py-1 rounded-md border border-purple-100">{workshop.price}</span>
        </div>

        {/* CTA */}
        <div className="mt-auto pt-4 border-t">
          <Link href={`/workshops/${workshop.id}`} className="w-full">
            <Button variant="outline" className="w-full rounded-lg h-10 border-purple-200 text-purple-700 hover:bg-purple-50 hover:text-purple-800 transition-all font-medium">
              View Details
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
