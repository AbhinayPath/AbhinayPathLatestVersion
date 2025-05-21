import Image from "next/image"

export default function WorkshopBanner() {
  return (
    <div className="relative w-full h-36 sm:h-48 md:h-56 lg:h-64 mb-6 md:mb-8 rounded-lg overflow-hidden">
      <Image
        src="/images/acting-workshop.png"
        alt="Acting Workshops"
        fill
        className="object-cover"
        priority
        sizes="(max-width: 640px) 100vw, (max-width: 768px) 100vw, (max-width: 1024px) 100vw, 1200px"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-transparent flex items-center">
        <div className="px-4 sm:px-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-white font-playfair drop-shadow-md">Acting Workshops</h2>
          <p className="text-sm sm:text-base text-white/90 max-w-md drop-shadow-md">
            Enhance your skills with professional training
          </p>
        </div>
      </div>
    </div>
  )
}
