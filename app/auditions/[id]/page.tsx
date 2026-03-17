import { Suspense } from "react"
import AuditionDetailContent from "@/components/audition-detail-content"
import { getSupabaseServerClientForRouteHandler } from '@/lib/supabase-server'

export default async function AuditionDetailPage({ params }: { params: { id: string } }) {
  const { id } = params

  // Fetch opportunity (audition)
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/opportunities/${id}`, { cache: 'no-store' })
  const { opportunity } = await res.json()
  const audition = opportunity

  // Fetch organisation details from the correct table
  let organisation: any | null = null
  if (audition?.created_by) {
    try {
      const supabase = await getSupabaseServerClientForRouteHandler()
      
      // 1. Get the profile ID for the creator
      const { data: profile } = await supabase
        .from('profiles')
        .select('id')
        .eq('user_id', audition.created_by)
        .single()

      if (profile?.id) {
        // 2. Get the organisation profile using the profile ID
        const { data: orgProfile } = await supabase
          .from('organisation_profiles')
          .select('organisation_name')
          .eq('profile_id', profile.id)
          .single()
        
        if (orgProfile) {
          organisation = { name: orgProfile.organisation_name }
        }
      }
    } catch (e) {
      console.error("Error fetching organisation name:", e)
      organisation = null
    }
  }
  
  return <AuditionDetailContent audition={audition} organisation={organisation} />
}
