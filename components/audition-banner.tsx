import Image from "next/image"

export default function AuditionBanner() {
  return (
    <div className="relative w-full h-48 mb-8 rounded-lg overflow-hidden">
      <Image src="/images/auditions-stage.png" alt="Auditions" fill className="object-cover" priority />
      <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent flex items-center">
        <div className="px-8">
          <h2 className="text-3xl font-bold text-white font-playfair">Auditions & Casting Calls</h2>
          <p className="text-white/80 max-w-md">Find your next role in theater, film, and television productions</p>
        </div>
      </div>
    </div>
  )
}
