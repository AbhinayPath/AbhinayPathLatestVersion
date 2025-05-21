import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Calendar, Clock, MapPin, CheckCircle } from "lucide-react"

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
      className={`theater-card flex flex-col h-full border rounded-xl overflow-hidden transition-all duration-300 hover:shadow-md hover:border-primary/30 ${
        workshop.featured ? "border-secondary" : "border-gray-200"
      }`}
    >
      <div className="relative h-40 sm:h-48 w-full">
        <div className="absolute top-2 right-2 z-10 bg-secondary text-black text-xs font-bold px-2 py-1 rounded-full flex items-center gap-1">
          <CheckCircle className="h-3 w-3" />
          {workshop.featured ? "Featured" : "Verified"}
        </div>
        <Image
          src="/images/acting-workshop.png"
          alt={workshop.title}
          fill
          className="object-cover"
          sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
        />
      </div>

      <div className="p-4 flex-1 flex flex-col">
        <h3 className="font-playfair text-lg font-bold mb-1 line-clamp-2">{workshop.title}</h3>
        <p className="text-primary font-medium text-sm mb-1">By {workshop.trainer}</p>
        <p className="text-gray-500 text-xs mb-2">{workshop.institution}</p>

        <div className="flex items-center text-xs text-gray-500 mb-2">
          <MapPin className="h-3 w-3 mr-1 flex-shrink-0" />
          <span className="truncate">
            {workshop.location}, {workshop.state}
          </span>
        </div>

        {!isCompact && <p className="text-gray-600 text-sm mb-3 flex-1 line-clamp-2">{workshop.description}</p>}

        <div className="flex flex-col gap-1 mb-3">
          <div className="flex items-center text-xs">
            <Calendar className="h-3 w-3 mr-1 text-gray-500 flex-shrink-0" />
            <span className="text-gray-700 truncate">{workshop.date}</span>
          </div>
          <div className="flex items-center text-xs">
            <Clock className="h-3 w-3 mr-1 text-gray-500 flex-shrink-0" />
            <span className="text-gray-700 truncate">{workshop.time}</span>
          </div>
          <div className="flex items-center text-xs font-medium">
            <span className="text-primary">{workshop.price}</span>
          </div>
        </div>

        <div className="flex justify-between mt-auto pt-3 border-t">
          <Link href={`/workshops/${workshop.id}`}>
            <Button variant="outline" size="sm" className="rounded-full text-xs h-8 px-3">
              Details
            </Button>
          </Link>
          <Link href={workshop.registrationLink} target="_blank">
            <Button size="sm" className="rounded-full text-xs h-8 px-3">
              Register
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
