import Image from "next/image"

const WorkshopBanner = () => {
  return (
    <Image
      src="/images/acting-workshop.png"
      alt="Workshops & Training"
      width={500}
      height={300}
      className="w-full h-48 mb-8 rounded-lg object-cover"
      priority
      onError={(e) => {
        // Fallback to a placeholder if image fails to load
        e.currentTarget.src = "/placeholder.svg?height=300&width=500&text=Workshops+and+Training"
      }}
    />
  )
}

export default WorkshopBanner
