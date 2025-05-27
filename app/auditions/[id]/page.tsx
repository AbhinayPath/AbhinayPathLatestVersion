import { Suspense } from "react"
import AuditionDetailContent from "@/components/audition-detail-content"

export default async function AuditionDetailPage({ params }: { params: { id: string } }) {
 const { id } = await params
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/auditions`, { cache: 'no-store' })
  const auditions = await res.json()
  const audition = auditions.find((a: any) => String(a.id) ===id)

  console.log("auditions", auditions);
  console.log('audition', audition);
  return <AuditionDetailContent audition={audition} />
}
