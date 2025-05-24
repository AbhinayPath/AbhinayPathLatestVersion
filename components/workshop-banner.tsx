import Image from "next/image"

const WorkshopBanner = () => {
  return (
    <div className="relative w-full h-48 mb-8 rounded-lg overflow-hidden">
      <Image
        src="/images/acting-workshop.png"
        alt="Workshops & Training"
        fill
        className="object-cover"
        priority
        onError={(e) => {
          // Fallback to a placeholder if image fails to load
          e.currentTarget.src = "/placeholder.svg?height=300&width=500&text=Workshops+and+Training"
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent flex items-center">
        <div className="px-8">
          <h2 className="text-3xl font-bold text-white font-playfair">Workshops & Training</h2>
          <p className="text-white/80 max-w-md">Enhance your skills with workshops led by industry professionals</p>
        </div>
      </div>
    </div>
  )
}

export default WorkshopBanner
