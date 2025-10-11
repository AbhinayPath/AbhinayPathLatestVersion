import { NextRequest, NextResponse } from 'next/server'
import { getSupabaseServerClientForRouteHandler } from '@/lib/supabase-server'

export async function GET(request: NextRequest) {
  try {
    const supabase = await getSupabaseServerClientForRouteHandler()
    const { searchParams } = new URL(request.url)
    
    // Get query parameters
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '10')
    const published = searchParams.get('published') !== 'false' // Default to true
    const city = searchParams.get('city')
    const type = searchParams.get('type')
    const userId = searchParams.get('userId') // For getting user's own organisations
    
    const offset = (page - 1) * limit
    
    let query = supabase
      .from('organisations')
      .select(`
        *,
        organisation_key_people(*),
        organisation_programs(*),
        organisation_video_links(*),
        organisation_additional_info(*)
      `)
      .order('created_at', { ascending: false })
      .range(offset, offset + limit - 1)
    
    // Apply filters
    if (userId) {
      // Get user's own organisations (all statuses)
      query = query.eq('user_id', userId)
    } else {
      // Public organisations only
      if (published) {
        query = query.eq('published', true)
      }
    }
    
    if (city) {
      query = query.eq('city', city)
    }
    
    if (type) {
      query = query.contains('types', [type])
    }
    
    const { data: organisations, error } = await query
    
    if (error) {
      console.error('Error fetching organisations:', error)
      return NextResponse.json(
        { error: 'Failed to fetch organisations' },
        { status: 500 }
      )
    }
    
    return NextResponse.json({ organisations })
  } catch (error) {
    console.error('Error in GET /api/organisations:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const supabase = await getSupabaseServerClientForRouteHandler()
    
    // Get the current user
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    
    if (authError || !user) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      )
    }
    
    const body = await request.json()
    
    // Validate required fields
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
      published = false
    } = body
    
    // Validate required fields
    if (!orgName || !selectedTypes || selectedTypes.length === 0 || !city || !email) {
      return NextResponse.json(
        { error: 'Missing required fields: orgName, selectedTypes, city, email' },
        { status: 400 }
      )
    }
    
    // Start a transaction
    const { data: organisation, error: orgError } = await supabase
      .from('organisations')
      .insert({
        user_id: user.id,
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
        published
      })
      .select()
      .single()
    
    if (orgError) {
      console.error('Error creating organisation:', orgError)
      return NextResponse.json(
        { error: 'Failed to create organisation' },
        { status: 500 }
      )
    }
    
    const organisationId = organisation.id
    
    // Insert key people
    if (keyPeople && keyPeople.length > 0) {
      const keyPeopleData = keyPeople
        .filter((person: any) => person.name && person.name.trim() !== '')
        .map((person: any) => ({
          organisation_id: organisationId,
          name: person.name,
          designation: person.designation || ''
        }))
      
      if (keyPeopleData.length > 0) {
        const { error: keyPeopleError } = await supabase
          .from('organisation_key_people')
          .insert(keyPeopleData)
        
        if (keyPeopleError) {
          console.error('Error inserting key people:', keyPeopleError)
        }
      }
    }
    
    // Insert programs (for educational institutions)
    if (programs && programs.length > 0) {
      const programsData = programs
        .filter((program: any) => program.name && program.name.trim() !== '')
        .map((program: any) => ({
          organisation_id: organisationId,
          name: program.name,
          brief: program.brief || '',
          duration: program.duration || ''
        }))
      
      if (programsData.length > 0) {
        const { error: programsError } = await supabase
          .from('organisation_programs')
          .insert(programsData)
        
        if (programsError) {
          console.error('Error inserting programs:', programsError)
        }
      }
    }
    
    // Insert video links
    if (videoLinks && videoLinks.length > 0) {
      const videoLinksData = videoLinks
        .filter((video: any) => video.url && video.url.trim() !== '')
        .map((video: any) => ({
          organisation_id: organisationId,
          title: video.title || '',
          url: video.url
        }))
      
      if (videoLinksData.length > 0) {
        const { error: videoLinksError } = await supabase
          .from('organisation_video_links')
          .insert(videoLinksData)
        
        if (videoLinksError) {
          console.error('Error inserting video links:', videoLinksError)
        }
      }
    }
    
    // Insert additional info (deep section)
    if (productions || partners) {
      const { error: additionalInfoError } = await supabase
        .from('organisation_additional_info')
        .insert({
          organisation_id: organisationId,
          productions: productions || '',
          partners: partners || ''
        })
      
      if (additionalInfoError) {
        console.error('Error inserting additional info:', additionalInfoError)
      }
    }
    
    // Calculate and update profile completeness
    const { data: completeness } = await supabase
      .rpc('calculate_organisation_completeness', { org_id: organisationId })
    
    if (completeness !== null) {
      await supabase
        .from('organisations')
        .update({ profile_completion_percentage: completeness })
        .eq('id', organisationId)
    }
    
    // Fetch the complete organisation data to return
    const { data: completeOrganisation, error: fetchError } = await supabase
      .from('organisations')
      .select(`
        *,
        organisation_key_people(*),
        organisation_programs(*),
        organisation_video_links(*),
        organisation_additional_info(*)
      `)
      .eq('id', organisationId)
      .single()
    
    if (fetchError) {
      console.error('Error fetching complete organisation:', fetchError)
      return NextResponse.json(
        { error: 'Organisation created but failed to fetch complete data' },
        { status: 500 }
      )
    }
    
    return NextResponse.json({
      success: true,
      message: published ? 'Organisation profile published successfully' : 'Organisation profile saved as draft',
      organisation: completeOrganisation
    }, { status: 201 })
    
  } catch (error) {
    console.error('Error in POST /api/organisations:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}