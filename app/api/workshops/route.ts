import { NextRequest, NextResponse } from 'next/server'
import { getSupabaseServerClientForRouteHandler } from '@/lib/supabase-server'

export async function GET(request: NextRequest) {
  try {
    const supabase = await getSupabaseServerClientForRouteHandler()
    const { searchParams } = new URL(request.url)

    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '10')
    const status = searchParams.get('status') || 'published'
    const city = searchParams.get('city')
    const userId = searchParams.get('userId')

    const offset = (page - 1) * limit

    let query = supabase
      .from('workshops')
      .select('*')
      .order('created_at', { ascending: false })
      .range(offset, offset + limit - 1)

    if (userId) {
      query = query.eq('created_by', userId)
    } else {
      query = query.eq('status', status).eq('visibility', 'public')
    }

    if (city) {
      query = query.eq('city', city)
    }

    const { data: workshops, error } = await query

    if (error) {
      console.error('Error fetching workshops:', error)
      return NextResponse.json({ error: 'Failed to fetch workshops' }, { status: 500 })
    }

    return NextResponse.json({ workshops })
  } catch (error) {
    console.error('Error in GET /api/workshops:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const supabase = await getSupabaseServerClientForRouteHandler()

    // Auth
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    if (authError || !user) {
      return NextResponse.json({ error: 'Authentication required' }, { status: 401 })
    }

    const body = await request.json()

    const {
      title,
      description,
      sessions = [],
      locationMode = 'city',
      city,
      venue,
      platform,
      feeType = 'free',
      feeAmount,
      feeNote,
      coverImage, // optional string URL or data URI
      registrationLink,
      contactMethod = 'whatsapp',
      whatsappNumber,
      email,
      skillLevel = 'open-to-all',
      selectedLanguages = [],
      capacity,
      registrationDeadline,
      targetAudience,
      // optional overrides
      visibility = 'public',
      status = 'published',
    } = body

    // Basic validation mirroring frontend
    if (!title || !description) {
      return NextResponse.json({ error: 'Missing required fields: title, description' }, { status: 400 })
    }
    if (!sessions || sessions.length === 0) {
      return NextResponse.json({ error: 'At least one session is required' }, { status: 400 })
    }
    const firstSession = sessions[0]
    if (!firstSession?.date || !firstSession?.startTime || !firstSession?.duration) {
      return NextResponse.json({ error: 'First session must include date, startTime and duration' }, { status: 400 })
    }
    if (locationMode === 'city' && !city) {
      return NextResponse.json({ error: 'City is required for in-city workshops' }, { status: 400 })
    }
    if (locationMode === 'online' && !platform) {
      return NextResponse.json({ error: 'Platform is required for online workshops' }, { status: 400 })
    }
    if (feeType === 'paid' && !feeAmount) {
      return NextResponse.json({ error: 'Fee amount is required for paid workshops' }, { status: 400 })
    }

    // Prepare insert payload
    const insertData: any = {
      created_by: user.id,
      title,
      description,
      location_mode: locationMode,
      city: city || null,
      venue: venue || null,
      platform: platform || null,
      fee_type: feeType,
      fee_amount: feeAmount || null,
      fee_note: feeNote || null,
      cover_image: coverImage || null,
      registration_link: registrationLink || null,
      contact_method: contactMethod,
      whatsapp_number: whatsappNumber || null,
      email: email || null,
      skill_level: skillLevel,
      languages: Array.isArray(selectedLanguages) ? selectedLanguages : [],
      capacity: capacity ? parseInt(capacity) : null,
      registration_deadline: registrationDeadline ? new Date(registrationDeadline).toISOString() : null,
      target_audience: targetAudience || null,
      visibility,
      status,
    }

    const { data: workshop, error: insertError } = await supabase
      .from('workshops')
      .insert(insertData)
      .select('*')
      .single()

    if (insertError) {
      console.error('Error creating workshop:', insertError)
      return NextResponse.json({ error: 'Failed to create workshop' }, { status: 500 })
    }

    const workshopId = workshop.id

    // Prepare session rows
    const sessionsData = (sessions as any[])
      .filter((s) => s && s.date && s.startTime && s.duration)
      .map((s) => ({
        workshop_id: workshopId,
        session_date: new Date(s.date).toISOString().slice(0, 10), // YYYY-MM-DD
        start_time: s.startTime,
        duration: s.duration,
      }))

    if (sessionsData.length > 0) {
      const { error: sessionsError } = await supabase
        .from('workshop_sessions')
        .insert(sessionsData)

      if (sessionsError) {
        console.error('Error inserting workshop sessions:', sessionsError)
        // Not fatal for overall creation; return created workshop without sessions
      }
    }

    return NextResponse.json({ workshop }, { status: 201 })
  } catch (error) {
    console.error('Error in POST /api/workshops:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  try {
    const supabase = await getSupabaseServerClientForRouteHandler()
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const { id, ...updateData } = body
    if (!id) {
      return NextResponse.json({ error: 'Workshop ID is required' }, { status: 400 })
    }

    if (updateData.registration_deadline) {
      updateData.registration_deadline = new Date(updateData.registration_deadline).toISOString()
    }
    if (updateData.capacity) {
      updateData.capacity = parseInt(updateData.capacity)
    }

    const { data: workshop, error } = await supabase
      .from('workshops')
      .update(updateData)
      .eq('id', id)
      .eq('created_by', user.id)
      .select('*')
      .single()

    if (error) {
      console.error('Error updating workshop:', error)
      return NextResponse.json({ error: 'Failed to update workshop' }, { status: 500 })
    }

    return NextResponse.json({ workshop })
  } catch (error) {
    console.error('Error in PUT /api/workshops:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const supabase = await getSupabaseServerClientForRouteHandler()
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')
    if (!id) {
      return NextResponse.json({ error: 'Workshop ID is required' }, { status: 400 })
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

    return NextResponse.json({ message: 'Workshop deleted successfully' })
  } catch (error) {
    console.error('Error in DELETE /api/workshops:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}