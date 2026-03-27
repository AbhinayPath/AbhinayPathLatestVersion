import { redirect } from 'next/navigation'
import { getSupabaseServerComponentClient } from '@/lib/supabase-server'
import OrganisationDashboardContent from '@/components/organisation-dashboard-content'

export default async function OrganisationDashboardPage() {
  const supabase = getSupabaseServerComponentClient()
  
  const { data: { user }, error: authError } = await supabase.auth.getUser()
  
  if (authError || !user) {
    redirect('/login?callbackUrl=/organisation/dashboard')
  }

  // Check if the user is an organisation
  const { data: profile, error: profileError } = await supabase
    .from('profiles')
    .select('id, type')
    .eq('user_id', user.id)
    .single()

  if (profileError || profile?.type !== 'organisation') {
    // If not an organisation, redirect to their respective home or a forbidden page
    redirect('/auditions')
  }

  return (
    <div className="min-h-screen bg-gray-50/50">
      <OrganisationDashboardContent user={user} profile={profile} />
    </div>
  )
}
