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

    const { searchParams } = new URL(request.url)
    const opportunityId = searchParams.get('opportunityId')
    const search = searchParams.get('search')

    // Get all opportunity IDs created by this user
    const { data: userOpps, error: oppsError } = await supabase
      .from('opportunities')
      .select('id, title')
      .eq('created_by', user.id)

    if (oppsError) throw oppsError

    // Get all workshop IDs created by this user
    const { data: userWorkshops, error: workshopsError } = await supabase
      .from('workshops')
      .select('id, title')
      .eq('created_by', user.id)

    if (workshopsError) throw workshopsError

    const oppIds = userOpps.map(opp => opp.id)
    const workshopIds = userWorkshops.map(w => w.id)

    const titleMap = {
      ...userOpps.reduce((acc, opp) => ({ ...acc, [opp.id]: opp.title }), {} as Record<string, string>),
      ...userWorkshops.reduce((acc, w) => ({ ...acc, [w.id]: w.title }), {} as Record<string, string>)
    }

    if (oppIds.length === 0 && workshopIds.length === 0) {
      return NextResponse.json({ applicants: [] })
    }

    // Build query for audition registrations
    let auditionQuery = supabase
      .from('audition_registrations')
      .select(`id, user_id, opportunity_id, status, created_at`)
      .in('opportunity_id', oppIds)

    if (opportunityId) {
      auditionQuery = auditionQuery.eq('opportunity_id', opportunityId)
    }

    // Build query for workshop registrations
    let workshopQuery = supabase
      .from('workshop_registrations')
      .select(`id, user_id, workshop_id, status, created_at`)
      .in('workshop_id', workshopIds)

    if (opportunityId) {
      workshopQuery = workshopQuery.eq('workshop_id', opportunityId)
    }

    const [
      { data: audRegistrations, error: audError },
      { data: workshopRegistrations, error: workshopError }
    ] = await Promise.all([
      oppIds.length > 0 ? auditionQuery : Promise.resolve({ data: [], error: null }),
      workshopIds.length > 0 ? workshopQuery : Promise.resolve({ data: [], error: null })
    ])

    if (audError) throw audError
    if (workshopError) throw workshopError

    const allRegistrations = [
      ...(audRegistrations || []).map(r => ({ ...r, entity_id: r.opportunity_id, type: 'audition' })),
      ...(workshopRegistrations || []).map(r => ({ ...r, entity_id: r.workshop_id, type: 'workshop' }))
    ].sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())

    if (allRegistrations.length === 0) {
      return NextResponse.json({ applicants: [] })
    }

    // Get unique user IDs to fetch profile data
    const userIds = Array.from(new Set(allRegistrations.map(r => r.user_id)))

    // Fetch talent profiles for these users
    let talentQuery = supabase
      .from('talent_profiles')
      .select(`
        user_id, full_name, first_name, last_name, email, phone, 
        city, state, bio, experience_level, years_of_experience,
        acting_skills, dance_styles, languages, special_skills,
        preferred_roles, project_types, profile_image_url, gender,
        portfolio_images, portfolio_videos, height, date_of_birth
      `)
      .in('user_id', userIds)

    if (search) {
      talentQuery = talentQuery.or(`full_name.ilike.%${search}%,first_name.ilike.%${search}%,last_name.ilike.%${search}%`)
    }

    const { data: talentProfiles, error: talentError } = await talentQuery
    if (talentError) throw talentError

    // Fetch base profiles for fallback
    const { data: baseProfiles, error: baseError } = await supabase
      .from('profiles')
      .select('user_id, email')
      .in('user_id', userIds)

    if (baseError) throw baseError

    const talentMap = talentProfiles.reduce((acc, p) => {
      // Prioritize profiles with names if there are duplicates for the same user
      const existing = acc[p.user_id]
      if (!existing || (!existing.full_name && p.full_name) || (!existing.first_name && p.first_name)) {
        acc[p.user_id] = p
      }
      return acc
    }, {} as Record<string, any>)

    const baseMap = baseProfiles.reduce((acc, p) => {
      acc[p.user_id] = p
      return acc
    }, {} as Record<string, any>)

    // Map registrations with profile data
    const applicants = allRegistrations
      .map(reg => {
        const talentProfile = talentMap[reg.user_id]
        const baseProfile = baseMap[reg.user_id]

        if (!talentProfile && search) return null // Filtered out by search

        // Map Name: Full name -> First + Last -> Email prefix
        let mappedName = talentProfile?.full_name
        if (!mappedName && (talentProfile?.first_name || talentProfile?.last_name)) {
          mappedName = `${talentProfile.first_name || ''} ${talentProfile.last_name || ''}`.trim()
        }

        const email = talentProfile?.email || baseProfile?.email || 'N/A'
        if (!mappedName) {
          mappedName = email !== 'N/A' ? email.split('@')[0] : 'Unknown User'
        }

        return {
          id: reg.id,
          user_name: mappedName,
          email: email,
          phone_number: talentProfile?.phone || 'N/A',
          applied_audition: titleMap[reg.entity_id] || 'Unknown',
          application_status: reg.status,
          applied_date: reg.created_at,
          opportunity_id: reg.entity_id,
          opportunity_type: reg.type,
          profile: talentProfile || null
        }
      })
      .filter(Boolean)

    return NextResponse.json({ applicants })
  } catch (error) {
    console.error('Error in /api/organisation/dashboard/applicants:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
