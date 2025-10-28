import { NextRequest, NextResponse } from 'next/server'
import { getSupabaseServerClientForRouteHandler } from '@/lib/supabase-server'

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const supabase = await getSupabaseServerClientForRouteHandler()
    const id = params.id

    const { data: workshop, error } = await supabase
      .from('workshops')
      .select('*, workshop_sessions(*)')
      .eq('id', id)
      .single()

    if (error) {
      console.error('Error fetching workshop:', error)
      return NextResponse.json({ error: 'Failed to fetch workshop' }, { status: 500 })
    }

    return NextResponse.json({ workshop })
  } catch (error) {
    console.error('Error in GET /api/workshops/[id]:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const supabase = await getSupabaseServerClientForRouteHandler()
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const id = params.id
    const body = await request.json()

    const {
      title,
      description,
      locationMode,
      city,
    state,
      venue,
      platform,
      feeType,
      feeAmount,
      feeNote,
      coverImage,
      registrationLink,
      contactMethod,
      whatsappNumber,
      email,
      skillLevel,
      selectedLanguages,
      capacity,
      registrationDeadline,
      targetAudience,
      visibility,
      status,
    } = body

    const updatePayload: any = {
      title,
      description,
      location_mode: locationMode,
      city: city || null,
   state: state || null,
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

    return NextResponse.json({ workshop })
  } catch (error) {
    console.error('Error in PUT /api/workshops/[id]:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}