import { redirect } from 'next/navigation'
import { getSupabaseServerComponentClient } from '@/lib/supabase-server'
import UserDashboardContent from '@/components/user-dashboard-content'

export default async function UserDashboardPage() {
  const supabase = getSupabaseServerComponentClient()
  
  const { data: { user }, error: authError } = await supabase.auth.getUser()
  
  if (authError || !user) {
    redirect('/login?callbackUrl=/dashboard')
  }

  // Check if the user is an organisation
  const { data: profile, error: profileError } = await supabase
    .from('profiles')
    .select('id, type')
    .eq('user_id', user.id)
    .single()

  if (profile?.type === 'organisation') {
    // Organisations have their own dashboard
    redirect('/organisation/dashboard')
  }

  // Fetch talent profile if any
  const { data: talentProfile } = await supabase
    .from('talent_profiles')
    .select('*')
    .eq('user_id', user.id)
    .single()

  return (
    <div className="min-h-screen bg-gray-50/50">
      <UserDashboardContent user={user} profile={profile} talentProfile={talentProfile} />
    </div>
  )
}
