import { NextRequest, NextResponse } from 'next/server'
import { getSupabaseServerClientForRouteHandler } from '@/lib/supabase-server'

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    console.log("opportunity_id",params.id);

    const supabase = await getSupabaseServerClientForRouteHandler()
    const { id } = params
    

    if (!id) {
      return NextResponse.json(
        { error: 'Opportunity ID is required' },
        { status: 400 }
      )
    }
    
    // Get the current user (optional for public opportunities)
    const { data: { user } } = await supabase.auth.getUser()
    
    let query = supabase
      .from('opportunities')
      .select('*')
      .eq('id', id)
    
    // If user is not authenticated or not the owner, only show published public opportunities
    if (!user) {
      query = query.eq('status', 'published').eq('visibility', 'public')
    }
    
    const { data: opportunity, error } = await query.single()
    
    if (error) {
      if (error.code === 'PGRST116') {
        return NextResponse.json(
          { error: 'Opportunity not found' },
          { status: 404 }
        )
      }
      console.error('Error fetching opportunity:', error)
      return NextResponse.json(
        { error: 'Failed to fetch opportunity' },
        { status: 500 }
      )
    }
    
    // If user is authenticated, check if they can view this opportunity
    if (user && opportunity.created_by !== user.id) {
      // Non-owners can only see published public opportunities
      if (opportunity.status !== 'published' || opportunity.visibility !== 'public') {
        return NextResponse.json(
          { error: 'Opportunity not found' },
          { status: 404 }
        )
      }
    }
    
    return NextResponse.json({ opportunity })
  } catch (error) {
    console.error('Error in GET /api/opportunities/[id]:', error)
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
        { error: 'Opportunity ID is required' },
        { status: 400 }
      )
    }
    
    // Get the current user
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    
    if (authError || !user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }
    
    const body = await request.json()
    
    // Prepare update data
    const updateData = { ...body }
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
    console.error('Error in PUT /api/opportunities/[id]:', error)
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
        { error: 'Opportunity ID is required' },
        { status: 400 }
      )
    }
    
    // Get the current user
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    
    if (authError || !user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
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
    console.error('Error in DELETE /api/opportunities/[id]:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}