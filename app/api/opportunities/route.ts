import { NextRequest, NextResponse } from 'next/server'
import { getSupabaseServerClientForRouteHandler } from '@/lib/supabase-server'
import { cookies } from 'next/headers'

export async function GET(request: NextRequest) {
  try {
    const supabase = await getSupabaseServerClientForRouteHandler()
    const { searchParams } = new URL(request.url)
    
    // Get query parameters
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '10')
    const status = searchParams.get('status') || 'published'
    const type = searchParams.get('type')
    const city = searchParams.get('city')
    const userId = searchParams.get('userId') // For getting user's own opportunities
    
    const offset = (page - 1) * limit
    
    let query = supabase
      .from('opportunities')
      .select('*')
      .order('created_at', { ascending: false })
      .range(offset, offset + limit - 1)
    
    // Apply filters
    if (userId) {
      // Get user's own opportunities (all statuses)
      query = query.eq('created_by', userId)
    } else {
      // Public opportunities only
      query = query.eq('status', status).eq('visibility', 'public')
    }
    
    if (type) {
      query = query.eq('type', type)
    }
    
    if (city) {
      query = query.eq('city', city)
    }
    
    const { data: opportunities, error } = await query
    
    if (error) {
      console.error('Error fetching opportunities:', error)
      return NextResponse.json(
        { error: 'Failed to fetch opportunities' },
        { status: 500 }
      )
    }
    
    return NextResponse.json({ opportunities })
  } catch (error) {
    console.error('Error in GET /api/opportunities:', error)
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
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }
    
    const body = await request.json()
    
    // Validate required fields
    const { title, type, description, deadline } = body
    
    if (!title || !type || !description) {
      return NextResponse.json(
        { error: 'Missing required fields: title, type, description' },
        { status: 400 }
      )
    }
    
    // Prepare opportunity data
    const opportunityData = {
      ...body,
      created_by: user.id,
      deadline: deadline ? new Date(deadline).toISOString() : null
    }
    
    const { data: opportunity, error } = await supabase
      .from('opportunities')
      .insert([opportunityData])
      .select()
      .single()
    
    if (error) {
      console.error('Error creating opportunity:', error)
      return NextResponse.json(
        { error: 'Failed to create opportunity' },
        { status: 500 }
      )
    }
    
    return NextResponse.json({ opportunity }, { status: 201 })
  } catch (error) {
    console.error('Error in POST /api/opportunities:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function PUT(request: NextRequest) {
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
    
    const body = await request.json()
    const { id, ...updateData } = body
    
    if (!id) {
      return NextResponse.json(
        { error: 'Opportunity ID is required' },
        { status: 400 }
      )
    }
    
    // Prepare update data
    if (updateData.deadline) {
      updateData.deadline = new Date(updateData.deadline).toISOString()
    }
    
    const { data: opportunity, error } = await supabase
      .from('opportunities')
      .update(updateData)
      .eq('id', id)
      .eq('created_by', user.id) // Ensure user can only update their own opportunities
      .select()
      .single()
    
    if (error) {
      console.error('Error updating opportunity:', error)
      return NextResponse.json(
        { error: 'Failed to update opportunity' },
        { status: 500 }
      )
    }
    
    if (!opportunity) {
      return NextResponse.json(
        { error: 'Opportunity not found or unauthorized' },
        { status: 404 }
      )
    }
    
    return NextResponse.json({ opportunity })
  } catch (error) {
    console.error('Error in PUT /api/opportunities:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function DELETE(request: NextRequest) {
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
    const id = searchParams.get('id')
    
    if (!id) {
      return NextResponse.json(
        { error: 'Opportunity ID is required' },
        { status: 400 }
      )
    }
    
    const { error } = await supabase
      .from('opportunities')
      .delete()
      .eq('id', id)
      .eq('created_by', user.id) // Ensure user can only delete their own opportunities
    
    if (error) {
      console.error('Error deleting opportunity:', error)
      return NextResponse.json(
        { error: 'Failed to delete opportunity' },
        { status: 500 }
      )
    }
    
    return NextResponse.json({ message: 'Opportunity deleted successfully' })
  } catch (error) {
    console.error('Error in DELETE /api/opportunities:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}