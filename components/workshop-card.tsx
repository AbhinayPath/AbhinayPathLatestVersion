import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Calendar, Clock, MapPin, CheckCircle, Star } from "lucide-react"

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
  const isCompact = variant === "compact"

  return (
    <div
      className={`theater-card flex flex-col h-full rounded-xl overflow-hidden transition-all duration-300 
      shadow-sm hover:shadow-md transform hover:-translate-y-1 bg-white 
      ${workshop.featured ? "border-2 border-secondary" : "border border-gray-100"}`}
    >
      <div className="relative h-48 w-full overflow-hidden group">
        {workshop.featured && (
          <div className="absolute top-3 left-3 z-10 bg-secondary text-black text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1 shadow-md">
            <Star className="h-3 w-3 fill-black" />
            Featured
          </div>
        )}
        <div className="absolute top-3 right-3 z-10 bg-white/90 backdrop-blur-sm text-primary text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1 shadow-sm">
          <CheckCircle className="h-3 w-3" />
          Verified
        </div>
        <div className="absolute inset-0 bg-gray-200">
          <Image
            src="/images/acting-workshop.png"
            alt={workshop.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
            onError={(e) => {
              // Fallback to a placeholder if image fails to load
              e.currentTarget.src = "/placeholder.svg?height=300&width=500&text=Acting+Workshop"
            }}
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-70"></div>
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <p className="text-white font-medium text-sm truncate">{workshop.institution}</p>
        </div>
      </div>

      <div className="p-5 flex-1 flex flex-col">
        <h3 className="font-playfair text-xl font-bold mb-2 line-clamp-2 text-gray-800">{workshop.title}</h3>
        <p className="text-primary font-medium text-sm mb-3 flex items-center">
          <span className="inline-block w-5 h-5 bg-primary/10 rounded-full mr-2 flex items-center justify-center">
            <span className="text-primary text-xs">👤</span>
          </span>
          By {workshop.trainer}
        </p>

        <div className="flex items-center text-sm text-gray-600 mb-3 bg-gray-50 px-3 py-2 rounded-lg">
          <MapPin className="h-4 w-4 mr-2 text-gray-500 flex-shrink-0" />
          <span className="truncate">
            {workshop.location}, {workshop.state}
          </span>
        </div>

        {!isCompact && (
          <p className="text-gray-600 text-sm mb-4 flex-1 line-clamp-2 leading-relaxed">{workshop.description}</p>
        )}

        <div className="flex flex-col gap-2 mb-4 mt-auto">
          <div className="flex items-center text-sm bg-gray-50 px-3 py-2 rounded-lg">
            <Calendar className="h-4 w-4 mr-2 text-primary flex-shrink-0" />
            <span className="text-gray-700 truncate">{workshop.date}</span>
          </div>
          <div className="flex items-center text-sm">
            <Clock className="h-4 w-4 mr-2 text-gray-500 flex-shrink-0" />
            <span className="text-gray-700 truncate">{workshop.time}</span>
          </div>
          <div className="flex items-center text-sm font-medium mt-1">
            <span className="text-primary bg-primary/10 px-3 py-1 rounded-full">{workshop.price}</span>
          </div>
        </div>

        <div className="flex justify-between pt-4 border-t border-gray-100">
          <Link href={`/workshops/${workshop.id}`} className="flex-1 mr-2">
            <Button variant="outline" size="sm" className="w-full rounded-full text-sm h-9">
              View Details
            </Button>
          </Link>
          <Link href={workshop.registrationLink} target="_blank" className="flex-1">
            <Button size="sm" className="w-full rounded-full text-sm h-9 font-medium">
              Register Now
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
