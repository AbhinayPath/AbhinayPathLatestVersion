import Image from "next/image"

export default function WorkshopBanner() {
  return (
    <div className="relative w-full h-48 sm:h-56 md:h-64 lg:h-72 mb-10 md:mb-16 rounded-xl overflow-hidden shadow-lg">
      <Image
        src="/images/acting-workshop.png"
        alt="Acting Workshops"
        fill
        className="object-cover"
        priority
        sizes="(max-width: 640px) 100vw, (max-width: 768px) 100vw, (max-width: 1024px) 100vw, 1200px"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent flex items-center">
        <div className="px-6 sm:px-10 max-w-2xl">
          <div className="inline-block bg-secondary/90 text-black text-xs font-bold px-3 py-1 rounded-full mb-3">
            Professional Training
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white font-playfair drop-shadow-md leading-tight">
            Acting Workshops
          </h2>
          <p className="text-sm sm:text-base text-white/90 max-w-md drop-shadow-md mt-2 sm:mt-3">
            Enhance your skills with professional training from industry experts
          </p>
        </div>
      </div>
    </div>
  )
}
