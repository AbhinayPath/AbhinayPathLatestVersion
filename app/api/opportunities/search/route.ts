import { NextRequest, NextResponse } from 'next/server'
import { getSupabaseServerClientForRouteHandler } from '@/lib/supabase-server'

export async function GET(request: NextRequest) {
  try {
    const supabase = await getSupabaseServerClientForRouteHandler()
    const { searchParams } = new URL(request.url)
    
    // Get query parameters
    const query = searchParams.get('q') || '' // Search query
    const type = searchParams.get('type')
    const city = searchParams.get('city')
    const state = searchParams.get('state')
    const experienceLevel = searchParams.get('experience')
    const payType = searchParams.get('payType')
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '20')
    
    const offset = (page - 1) * limit
    
    let supabaseQuery = supabase
      .from('opportunities')
      .select('*')
      .eq('status', 'published')
      .eq('visibility', 'public')
      .order('created_at', { ascending: false })
      .range(offset, offset + limit - 1)
    
    // Apply filters
    if (type) {
      supabaseQuery = supabaseQuery.eq('type', type)
    }
    
    if (city) {
      supabaseQuery = supabaseQuery.eq('city', city)
    }
    
    if (state) {
      supabaseQuery = supabaseQuery.eq('state', state)
    }
    
    if (experienceLevel) {
      supabaseQuery = supabaseQuery.eq('experience_required', experienceLevel)
    }
    
    if (payType) {
      supabaseQuery = supabaseQuery.eq('pay_type', payType)
    }
    
    // Text search in title and description
    if (query.trim()) {
      supabaseQuery = supabaseQuery.or(
        `title.ilike.%${query}%,description.ilike.%${query}%,company.ilike.%${query}%`
      )
    }
    
    const { data: opportunities, error } = await supabaseQuery
    
    if (error) {
      console.error('Error searching opportunities:', error)
      return NextResponse.json(
        { error: 'Failed to search opportunities' },
        { status: 500 }
      )
    }
    
    // Get total count for pagination (separate query)
    let countQuery = supabase
      .from('opportunities')
      .select('*', { count: 'exact', head: true })
      .eq('status', 'published')
      .eq('visibility', 'public')
    
    // Apply same filters for count
    if (type) countQuery = countQuery.eq('type', type)
    if (city) countQuery = countQuery.eq('city', city)
    if (state) countQuery = countQuery.eq('state', state)
    if (experienceLevel) countQuery = countQuery.eq('experience_required', experienceLevel)
    if (payType) countQuery = countQuery.eq('pay_type', payType)
    if (query.trim()) {
      countQuery = countQuery.or(
        `title.ilike.%${query}%,description.ilike.%${query}%,company.ilike.%${query}%`
      )
    }
    
    const { count, error: countError } = await countQuery
    
    if (countError) {
      console.error('Error counting opportunities:', countError)
      // Continue without count if there's an error
    }
    
    const totalPages = count ? Math.ceil(count / limit) : 1
    
    return NextResponse.json({
      opportunities,
      pagination: {
        page,
        limit,
        total: count || 0,
        totalPages,
        hasNext: page < totalPages,
        hasPrev: page > 1
      },
      filters: {
        query,
        type,
        city,
        state,
        experienceLevel,
        payType
      }
    })
  } catch (error) {
    console.error('Error in GET /api/opportunities/search:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}