import { Suspense } from "react"
import WorkshopsContent from "@/components/workshops-content"

export default function WorkshopsPage() {
  return (
    <Suspense fallback={<div className="container py-12">Loading workshops...</div>}>
      <WorkshopsContent />
    </Suspense>
  )
}
