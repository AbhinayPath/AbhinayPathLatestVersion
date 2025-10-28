import { Suspense } from "react"
import WorkshopDetailContent from "@/components/workshop-detail-content"

export default function WorkshopDetailPage({ params }: { params: { id: string } }) {
  return (
    <Suspense fallback={<div className="container py-12">Loading workshop details...</div>}>
      <WorkshopDetailContent id={params.id} />
    </Suspense>
  )
}
