import { Suspense } from "react"
import AuditionDetailContent from "@/components/audition-detail-content"

export default async function AuditionDetailPage({ params }: { params: { id: string } }) {
  const { id } = params

  // Fetch opportunity (audition)
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/opportunities/${id}`, { cache: 'no-store' })
  const { opportunity } = await res.json()
  const audition = opportunity

  // Fetch organisation linked to the opportunity creator on server side
  let organisation: any | null = null
  if (audition?.created_by) {
    try {
      const orgRes = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/organisations?userId=${audition.created_by}`, { cache: 'no-store' })
      if (orgRes.ok) {
        const data = await orgRes.json()
        if (Array.isArray(data.organisations) && data.organisations.length > 0) {
          organisation = data.organisations[0]
        }
      }
    } catch (e) {
      organisation = null
    }
  }
  
  return <AuditionDetailContent audition={audition} organisation={organisation} />
}
