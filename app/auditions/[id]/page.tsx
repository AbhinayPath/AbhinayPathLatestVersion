import { Suspense } from "react"
import AuditionDetailContent from "@/components/audition-detail-content"

export default async function AuditionDetailPage({ params }: { params: { id: string } }) {
  console.log("audition_id",typeof params.id);


  const { id } = await params
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/opportunities/${id}`, { cache: 'no-store' })
  const { opportunity } = await res.json()
  const audition = opportunity
  
  return <AuditionDetailContent audition={audition} />
}
