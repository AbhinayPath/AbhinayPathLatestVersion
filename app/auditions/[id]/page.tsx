import { Suspense } from "react"
import AuditionDetailContent from "@/components/audition-detail-content"

export default function AuditionDetailPage({ params }: { params: { id: string } }) {
  return (
    <Suspense fallback={<div className="container py-12">Loading audition details...</div>}>
      <AuditionDetailContent id={Number.parseInt(params.id)} />
    </Suspense>
  )
}
