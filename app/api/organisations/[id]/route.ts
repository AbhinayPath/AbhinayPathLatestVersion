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
      return NextResponse.json(
        { error: 'Organisation ID is required' },
        { status: 400 }
      )
    }
    
    const { data: organisation, error } = await supabase
      .from('organisations')
      .select(`
        *,
        organisation_key_people(*),
        organisation_programs(*),
        organisation_video_links(*),
        organisation_additional_info(*)
      `)
      .eq('id', id)
      .single()
    
    if (error) {
      if (error.code === 'PGRST116') {
        return NextResponse.json(
          { error: 'Organisation not found' },
          { status: 404 }
        )
      }
      console.error('Error fetching organisation:', error)
      return NextResponse.json(
        { error: 'Failed to fetch organisation' },
        { status: 500 }
      )
    }
    
    return NextResponse.json({ organisation })
  } catch (error) {
    console.error('Error in GET /api/organisations/[id]:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
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
      return NextResponse.json(
        { error: 'Organisation ID is required' },
        { status: 400 }
      )
    }
    
    // Get the current user
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    
    if (authError || !user) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      )
    }
    
    // Check if the organisation exists and belongs to the user
    const { data: existingOrg, error: checkError } = await supabase
      .from('organisations')
      .select('user_id')
      .eq('id', id)
      .single()
    
    if (checkError) {
      if (checkError.code === 'PGRST116') {
        return NextResponse.json(
          { error: 'Organisation not found' },
          { status: 404 }
        )
      }
      return NextResponse.json(
        { error: 'Failed to verify organisation ownership' },
        { status: 500 }
      )
    }
    
    if (existingOrg.user_id !== user.id) {
      return NextResponse.json(
        { error: 'Unauthorized to update this organisation' },
        { status: 403 }
      )
    }
    
    const body = await request.json()
    
    const {
      // Essence
      orgName,
      selectedTypes,
      foundedYear,
      language,
      city,
      state,
      country,
      website,
      instagram,
      youtube,
      about,
      
      // Work
      selectedAreas,
      keyPeople,
      activeSince,
      email,
      phone,
      address,
      
      // Showcase
      coverImage,
      gallery,
      videoLinks,
      
      // Deep Section
      programs,
      productions,
      partners,
      
      // Status
      published
    } = body
    
    // Validate required fields
    if (!orgName || !selectedTypes || selectedTypes.length === 0 || !city || !email) {
      return NextResponse.json(
        { error: 'Missing required fields: orgName, selectedTypes, city, email' },
        { status: 400 }
      )
    }
    
    // Update main organisation record
    const { error: orgError } = await supabase
      .from('organisations')
      .update({
        name: orgName,
        types: selectedTypes,
        founded_year: foundedYear ? parseInt(foundedYear) : null,
        primary_language: language,
        city,
        state,
        country: country || 'India',
        website,
        instagram,
        youtube,
        about,
        core_areas: selectedAreas || [],
        active_since: activeSince,
        email,
        phone,
        address,
        cover_image: coverImage,
        gallery: gallery || [],
        published: published !== undefined ? published : false
      })
      .eq('id', id)
    
    if (orgError) {
      console.error('Error updating organisation:', orgError)
      return NextResponse.json(
        { error: 'Failed to update organisation' },
        { status: 500 }
      )
    }
    
    // Update key people - delete existing and insert new
    await supabase
      .from('organisation_key_people')
      .delete()
      .eq('organisation_id', id)
    
    if (keyPeople && keyPeople.length > 0) {
      const keyPeopleData = keyPeople
        .filter((person: any) => person.name && person.name.trim() !== '')
        .map((person: any) => ({
          organisation_id: id,
          name: person.name,
          designation: person.designation || ''
        }))
      
      if (keyPeopleData.length > 0) {
        const { error: keyPeopleError } = await supabase
          .from('organisation_key_people')
          .insert(keyPeopleData)
        
        if (keyPeopleError) {
          console.error('Error updating key people:', keyPeopleError)
        }
      }
    }
    
    // Update programs - delete existing and insert new
    await supabase
      .from('organisation_programs')
      .delete()
      .eq('organisation_id', id)
    
    if (programs && programs.length > 0) {
      const programsData = programs
        .filter((program: any) => program.name && program.name.trim() !== '')
        .map((program: any) => ({
          organisation_id: id,
          name: program.name,
          brief: program.brief || '',
          duration: program.duration || ''
        }))
      
      if (programsData.length > 0) {
        const { error: programsError } = await supabase
          .from('organisation_programs')
          .insert(programsData)
        
        if (programsError) {
          console.error('Error updating programs:', programsError)
        }
      }
    }
    
    // Update video links - delete existing and insert new
    await supabase
      .from('organisation_video_links')
      .delete()
      .eq('organisation_id', id)
    
    if (videoLinks && videoLinks.length > 0) {
      const videoLinksData = videoLinks
        .filter((video: any) => video.url && video.url.trim() !== '')
        .map((video: any) => ({
          organisation_id: id,
          title: video.title || '',
          url: video.url
        }))
      
      if (videoLinksData.length > 0) {
        const { error: videoLinksError } = await supabase
          .from('organisation_video_links')
          .insert(videoLinksData)
        
        if (videoLinksError) {
          console.error('Error updating video links:', videoLinksError)
        }
      }
    }
    
    // Update additional info - delete existing and insert new if data exists
    await supabase
      .from('organisation_additional_info')
      .delete()
      .eq('organisation_id', id)
    
    if (productions || partners) {
      const { error: additionalInfoError } = await supabase
        .from('organisation_additional_info')
        .insert({
          organisation_id: id,
          productions: productions || '',
          partners: partners || ''
        })
      
      if (additionalInfoError) {
        console.error('Error updating additional info:', additionalInfoError)
      }
    }
    
    // Calculate and update profile completeness
    const { data: completeness } = await supabase
      .rpc('calculate_organisation_completeness', { org_id: id })
    
    if (completeness !== null) {
      await supabase
        .from('organisations')
        .update({ profile_completion_percentage: completeness })
        .eq('id', id)
    }
    
    // Fetch the updated organisation data to return
    const { data: updatedOrganisation, error: fetchError } = await supabase
      .from('organisations')
      .select(`
        *,
        organisation_key_people(*),
        organisation_programs(*),
        organisation_video_links(*),
        organisation_additional_info(*)
      `)
      .eq('id', id)
      .single()
    
    if (fetchError) {
      console.error('Error fetching updated organisation:', fetchError)
      return NextResponse.json(
        { error: 'Organisation updated but failed to fetch updated data' },
        { status: 500 }
      )
    }
    
    return NextResponse.json({
      success: true,
      message: published ? 'Organisation profile updated and published' : 'Organisation profile updated',
      organisation: updatedOrganisation
    })
    
  } catch (error) {
    console.error('Error in PUT /api/organisations/[id]:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
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
      return NextResponse.json(
        { error: 'Organisation ID is required' },
        { status: 400 }
      )
    }
    
    // Get the current user
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    
    if (authError || !user) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      )
    }
    
    // Check if the organisation exists and belongs to the user
    const { data: existingOrg, error: checkError } = await supabase
      .from('organisations')
      .select('user_id')
      .eq('id', id)
      .single()
    
    if (checkError) {
      if (checkError.code === 'PGRST116') {
        return NextResponse.json(
          { error: 'Organisation not found' },
          { status: 404 }
        )
      }
      return NextResponse.json(
        { error: 'Failed to verify organisation ownership' },
        { status: 500 }
      )
    }
    
    if (existingOrg.user_id !== user.id) {
      return NextResponse.json(
        { error: 'Unauthorized to delete this organisation' },
        { status: 403 }
      )
    }
    
    // Delete the organisation (cascade will handle related records)
    const { error: deleteError } = await supabase
      .from('organisations')
      .delete()
      .eq('id', id)
    
    if (deleteError) {
      console.error('Error deleting organisation:', deleteError)
      return NextResponse.json(
        { error: 'Failed to delete organisation' },
        { status: 500 }
      )
    }
    
    return NextResponse.json({
      success: true,
      message: 'Organisation deleted successfully'
    })
    
  } catch (error) {
    console.error('Error in DELETE /api/organisations/[id]:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}