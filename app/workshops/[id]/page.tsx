import { Suspense } from "react"
import WorkshopDetailContent from "@/components/workshop-detail-content"

export default async function WorkshopDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const awaitedParams = await params
  return (
    <Suspense fallback={<div className="container py-12">Loading workshop details...</div>}>
      <WorkshopDetailContent id={awaitedParams.id} />
    </Suspense>
  )
}
