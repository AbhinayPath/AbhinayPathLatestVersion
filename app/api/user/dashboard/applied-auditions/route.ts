import { NextRequest, NextResponse } from 'next/server'
import { getSupabaseServerClientForRouteHandler, getSupabaseAdminClient } from '@/lib/supabase-server'

export async function GET(request: NextRequest) {
  try {
    const supabase = await getSupabaseServerClientForRouteHandler()
    const adminSupabase = await getSupabaseAdminClient()

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

    // Fetch user's workshop registrations
    const { data: workshopRegistrations, error: workshopRegError } = await supabase
      .from('workshop_registrations')
      .select(`
        id,
        workshop_id,
        status,
        created_at
      `)
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })

    if (workshopRegError) {
      console.error('Error fetching workshop registrations:', workshopRegError)
    }

    const allRegistrations = [
      ...(registrations || []).map(r => ({ ...r, entity_id: r.opportunity_id, type: 'audition' })),
      ...(workshopRegistrations || []).map(r => ({ ...r, entity_id: r.workshop_id, type: 'workshop' }))
    ].sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())

    if (allRegistrations.length === 0) {
      return NextResponse.json({ applied_auditions: [] })
    }

    const oppIds = registrations?.map(r => r.opportunity_id) || []
    const workshopIds = workshopRegistrations?.map(r => r.workshop_id) || []

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
    }

    // Fetch corresponding workshops
    const { data: workshops, error: workshopError } = await supabase
      .from('workshops')
      .select(`
        id,
        title,
        created_by,
        location,
        type
      `)
      .in('id', workshopIds)

    if (workshopError) {
      console.error('Error fetching workshops:', workshopError)
    }

    const allEntities = [
      ...(opportunities || []),
      ...(workshops || [])
    ]

    const creatorIds = Array.from(new Set(allEntities.map(o => o.created_by) || []))
    
    // Fetch profiles first to get the profile IDs using Admin client to bypass RLS
    const { data: profiles, error: profilesError } = await adminSupabase
      .from('profiles')
      .select('id, user_id')
      .in('user_id', creatorIds)

    if (profilesError) {
      console.error('Error fetching profiles:', profilesError)
    }

    const profileIdToUserId: Record<string, string> = {}
    const profileIds: string[] = []
    
    profiles?.forEach(p => {
      profileIdToUserId[p.id] = p.user_id
      profileIds.push(p.id)
    })

    // Fetch organisation profiles for creators using profile IDs with Admin client
    const { data: organisations, error: orgError } = await adminSupabase
      .from('organisation_profiles')
      .select(`
        profile_id,
        organisation_name
      `)
      .in('profile_id', profileIds)

    if (orgError) {
      console.error('Error fetching organisations:', orgError)
      // Non-fatal error, we can proceed without org names
    }

    const entityMap = allEntities?.reduce((acc, ent) => {
      acc[ent.id] = ent
      return acc
    }, {} as Record<string, any>) || {}

    const orgMap = organisations?.reduce((acc, org) => {
      const userId = profileIdToUserId[org.profile_id]
      if (userId) {
        acc[userId] = org.organisation_name
      }
      return acc
    }, {} as Record<string, string>) || {}

    const applied_auditions = allRegistrations.map(reg => {
      const ent = entityMap[reg.entity_id]
      const orgName = ent?.created_by ? orgMap[ent.created_by] || 'Unknown Organisation' : 'Unknown Organisation'
      
      return {
        id: reg.id,
        opportunity_id: reg.entity_id,
        audition_title: ent?.title || 'Unknown Opportunity',
        organisation_name: orgName,
        location: ent?.location || 'Remote/TBD',
        date: ent?.created_at || null,
        application_status: reg.status,
        applied_date: reg.created_at,
        type: reg.type
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
