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

    // Fetch user's audition registrations with opportunity details
    const { data: registrations, error: regError } = await supabase
      .from('audition_registrations')
      .select(`
        id,
        opportunity_id,
        status,
        created_at
      `)
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })

    if (regError) {
      console.error('Error fetching registrations:', regError)
      throw regError
    }

    if (!registrations || registrations.length === 0) {
      return NextResponse.json({ applied_auditions: [] })
    }

    const oppIds = registrations.map(r => r.opportunity_id)

    // Fetch corresponding opportunities
    const { data: opportunities, error: oppError } = await supabase
      .from('opportunities')
      .select(`
        id,
        title,
        created_by,
        location,
        type
      `)
      .in('id', oppIds)

    if (oppError) {
      console.error('Error fetching opportunities:', oppError)
      throw oppError
    }

    const creatorIds = Array.from(new Set(opportunities?.map(o => o.created_by) || []))
    
    // Fetch organisation profiles for creators
    const { data: organisations, error: orgError } = await supabase
      .from('profiles')
      .select(`
        user_id,
        organisation_name
      `)
      .eq('type', 'organisation')
      .in('user_id', creatorIds)

    if (orgError) {
      console.error('Error fetching organisations:', orgError)
      // Non-fatal error, we can proceed without org names
    }

    const oppMap = opportunities?.reduce((acc, opp) => {
      acc[opp.id] = opp
      return acc
    }, {} as Record<string, any>) || {}

    const orgMap = organisations?.reduce((acc, org) => {
      acc[org.user_id] = org.organisation_name
      return acc
    }, {} as Record<string, string>) || {}

    const applied_auditions = registrations.map(reg => {
      const opp = oppMap[reg.opportunity_id]
      const orgName = opp?.created_by ? orgMap[opp.created_by] || 'Unknown Organisation' : 'Unknown Organisation'
      
      return {
        id: reg.id,
        opportunity_id: reg.opportunity_id,
        audition_title: opp?.title || 'Unknown Audition',
        organisation_name: orgName,
        location: opp?.location || 'Remote/TBD',
        date: opp?.created_at || null, // Best effort date from opportunity if available, or just use apply date
        application_status: reg.status,
        applied_date: reg.created_at
      }
    })

    return NextResponse.json({ applied_auditions })
  } catch (error) {
    console.error('Error in /api/user/dashboard/applied-auditions:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
