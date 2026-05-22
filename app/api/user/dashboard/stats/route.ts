import { NextRequest, NextResponse } from 'next/server'
import { getSupabaseServerClientForRouteHandler } from '@/lib/supabase-server'

export async function GET(request: NextRequest) {
  try {
    const supabase = await getSupabaseServerClientForRouteHandler()

    // Get the current user
    const { data: { user }, error: authError } = await supabase.auth.getUser()

    if (authError || !user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const { data: registrations, error } = await supabase
      .from('audition_registrations')
      .select('status')
      .eq('user_id', user.id)

    if (error) {
      console.error('Error fetching registrations:', error)
      throw error
    }

    const { data: workshopRegistrations, error: workshopError } = await supabase
      .from('workshop_registrations')
      .select('status')
      .eq('user_id', user.id)

    if (workshopError) {
      console.error('Error fetching workshop registrations:', workshopError)
    }

    const allRegistrations = [
      ...(registrations || []),
      ...(workshopRegistrations || [])
    ]

    // Calculate metrics
    const total_auditions_applied = allRegistrations.length
    const active_applications = allRegistrations.filter(r => r.status && r.status !== 'rejected').length
    const shortlisted_applications = allRegistrations.filter(r => r.status === 'shortlisted').length
    const rejected_applications = allRegistrations.filter(r => r.status === 'rejected').length

    return NextResponse.json({
      metrics: {
        total_auditions_applied,
        active_applications,
        shortlisted_applications,
        rejected_applications
      }
    })
  } catch (error) {
    console.error('Error in /api/user/dashboard/stats:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
