import { NextRequest, NextResponse } from 'next/server'
import { getSupabaseServerClientForRouteHandler } from '@/lib/supabase-server'

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const supabase = await getSupabaseServerClientForRouteHandler()
    const { id } = params

    if (!id) {
      return NextResponse.json({ error: 'Workshop ID is required' }, { status: 400 })
    }

    const { data: { user } } = await supabase.auth.getUser()

    let query = supabase
      .from('workshops')
      .select('*')
      .eq('id', id)

    if (!user) {
      query = query.eq('status', 'published').eq('visibility', 'public')
    }

    const { data: workshop, error } = await query.single()

    if (error) {
      if (error.code === 'PGRST116') {
        return NextResponse.json({ error: 'Workshop not found' }, { status: 404 })
      }
      console.error('Error fetching workshop:', error)
      return NextResponse.json({ error: 'Failed to fetch workshop' }, { status: 500 })
    }

    if (user && workshop.created_by !== user.id) {
      if (workshop.status !== 'published' || workshop.visibility !== 'public') {
        return NextResponse.json({ error: 'Unauthorized to view this workshop' }, { status: 403 })
      }
    }

    // Fetch sessions
    const { data: sessions, error: sessionsError } = await supabase
      .from('workshop_sessions')
      .select('*')
      .eq('workshop_id', workshop.id)
      .order('session_date', { ascending: true })

    if (sessionsError) {
      console.error('Error fetching workshop sessions:', sessionsError)
    }

    return NextResponse.json({ workshop: { ...workshop, sessions: sessions || [] } })
  } catch (error) {
    console.error('Error in GET /api/workshops/[id]:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const supabase = await getSupabaseServerClientForRouteHandler()
    const { id } = params

    if (!id) {
      return NextResponse.json({ error: 'Workshop ID is required' }, { status: 400 })
    }

    const { data: { user }, error: authError } = await supabase.auth.getUser()
    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const {
      // updatable fields
      title,
      description,
      location_mode,
      city,
      venue,
      platform,
      fee_type,
      fee_amount,
      fee_note,
      cover_image,
      registration_link,
      contact_method,
      whatsapp_number,
      email,
      skill_level,
      languages,
      capacity,
      registration_deadline,
      target_audience,
      visibility,
      status,
      sessions,
    } = body

    const updatePayload: any = {}
    const fields = {
      title,
      description,
      location_mode,
      city,
      venue,
      platform,
      fee_type,
      fee_amount,
      fee_note,
      cover_image,
      registration_link,
      contact_method,
      whatsapp_number,
      email,
      skill_level,
      languages,
      target_audience,
      visibility,
      status,
    }
    for (const [k, v] of Object.entries(fields)) {
      if (typeof v !== 'undefined') updatePayload[k] = v
    }
    if (typeof capacity !== 'undefined') updatePayload.capacity = capacity ? parseInt(capacity as any) : null
    if (typeof registration_deadline !== 'undefined') {
      updatePayload.registration_deadline = registration_deadline ? new Date(registration_deadline).toISOString() : null
    }

    const { data: workshop, error } = await supabase
      .from('workshops')
      .update(updatePayload)
      .eq('id', id)
      .eq('created_by', user.id)
      .select('*')
      .single()

    if (error) {
      console.error('Error updating workshop:', error)
      return NextResponse.json({ error: 'Failed to update workshop' }, { status: 500 })
    }

    // Sessions update: simple strategy - delete existing and insert new provided array
    if (Array.isArray(sessions)) {
      const { error: deleteErr } = await supabase
        .from('workshop_sessions')
        .delete()
        .eq('workshop_id', id)
      if (deleteErr) {
        console.error('Error clearing old sessions:', deleteErr)
      }

      const sessionsData = sessions
        .filter((s: any) => s && s.date && s.startTime && s.duration)
        .map((s: any) => ({
          workshop_id: id,
          session_date: new Date(s.date).toISOString().slice(0, 10),
          start_time: s.startTime,
          duration: s.duration,
        }))

      if (sessionsData.length > 0) {
        const { error: insertErr } = await supabase
          .from('workshop_sessions')
          .insert(sessionsData)
        if (insertErr) {
          console.error('Error re-inserting sessions:', insertErr)
        }
      }
    }

    return NextResponse.json({ workshop })
  } catch (error) {
    console.error('Error in PUT /api/workshops/[id]:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const supabase = await getSupabaseServerClientForRouteHandler()
    const { id } = params

    if (!id) {
      return NextResponse.json({ error: 'Workshop ID is required' }, { status: 400 })
    }

    const { data: { user }, error: authError } = await supabase.auth.getUser()
    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { error } = await supabase
      .from('workshops')
      .delete()
      .eq('id', id)
      .eq('created_by', user.id)

    if (error) {
      console.error('Error deleting workshop:', error)
      return NextResponse.json({ error: 'Failed to delete workshop' }, { status: 500 })
    }

    // workshop_sessions will cascade delete
    return NextResponse.json({ message: 'Workshop deleted successfully' })
  } catch (error) {
    console.error('Error in DELETE /api/workshops/[id]:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}