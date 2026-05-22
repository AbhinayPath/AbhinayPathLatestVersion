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

    // 1. Total auditions created by this user
    const { count: totalAuditions, error: countError } = await supabase
      .from('opportunities')
      .select('*', { count: 'exact', head: true })
      .eq('created_by', user.id)

    if (countError) throw countError

    // 2. Active auditions (status 'published' and deadline > now)
    const now = new Date().toISOString()
    const { count: activeAuditions, error: activeError } = await supabase
      .from('opportunities')
      .select('*', { count: 'exact', head: true })
      .eq('created_by', user.id)
      .eq('status', 'published')
      .or(`deadline.gt.${now},deadline.is.null`)

    if (activeError) throw activeError

    // 3. Closed auditions
    const { count: closedAuditions, error: closedError } = await supabase
      .from('opportunities')
      .select('*', { count: 'exact', head: true })
      .eq('created_by', user.id)
      .or(`status.eq.closed,deadline.lt.${now}`)

    if (closedError) throw closedError

    // 4. Total applications received for all opportunities of this user
    // First get user's opportunity IDs
    const { data: userOpps, error: oppsError } = await supabase
      .from('opportunities')
      .select('id')
      .eq('created_by', user.id)

    if (oppsError) throw oppsError

    const oppIds = userOpps.map(opp => opp.id)
    
    let totalApplications = 0
    if (oppIds.length > 0) {
      const { count, error: appError } = await supabase
        .from('audition_registrations')
        .select('*', { count: 'exact', head: true })
        .in('opportunity_id', oppIds)
      
      if (appError) throw appError
      totalApplications = count || 0
    }

    // 5. Total workshops created by this user
    const { count: totalWorkshops, error: workshopsCountError } = await supabase
      .from('workshops')
      .select('*', { count: 'exact', head: true })
      .eq('created_by', user.id)

    if (workshopsCountError) throw workshopsCountError

    // 6. Active workshops
    const { count: activeWorkshops, error: activeWorkshopsError } = await supabase
      .from('workshops')
      .select('*', { count: 'exact', head: true })
      .eq('created_by', user.id)
      .eq('status', 'published')
      .or(`registration_deadline.gt.${now},registration_deadline.is.null`)

    if (activeWorkshopsError) throw activeWorkshopsError

    // 7. Closed workshops
    const { count: closedWorkshops, error: closedWorkshopsError } = await supabase
      .from('workshops')
      .select('*', { count: 'exact', head: true })
      .eq('created_by', user.id)
      .or(`status.eq.closed,registration_deadline.lt.${now}`)

    if (closedWorkshopsError) throw closedWorkshopsError

    // 8. Total applications received for workshops
    const { data: userWorkshops, error: oppsWorkshopsError } = await supabase
      .from('workshops')
      .select('id')
      .eq('created_by', user.id)

    if (oppsWorkshopsError) throw oppsWorkshopsError

    const workshopIds = userWorkshops.map(w => w.id)
    
    let totalWorkshopApplications = 0
    if (workshopIds.length > 0) {
      const { count, error: workshopAppError } = await supabase
        .from('workshop_registrations')
        .select('*', { count: 'exact', head: true })
        .in('workshop_id', workshopIds)
      
      if (workshopAppError) throw workshopAppError
      totalWorkshopApplications = count || 0
    }

    return NextResponse.json({
      metrics: {
        total_auditions_created: totalAuditions || 0,
        total_applications_received: totalApplications,
        active_auditions: activeAuditions || 0,
        closed_auditions: closedAuditions || 0,
        total_workshops_created: totalWorkshops || 0,
        total_workshop_applications: totalWorkshopApplications || 0,
        active_workshops: activeWorkshops || 0,
        closed_workshops: closedWorkshops || 0
      }
    })
  } catch (error) {
    console.error('Error in /api/organisation/dashboard/stats:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
