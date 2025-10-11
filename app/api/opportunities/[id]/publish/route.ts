import { NextRequest, NextResponse } from 'next/server'
import { getSupabaseServerClientForRouteHandler } from '@/lib/supabase-server'

export async function POST(
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
    const { action } = body // 'publish' or 'unpublish'
    
    if (!action || !['publish', 'unpublish'].includes(action)) {
      return NextResponse.json(
        { error: 'Invalid action. Must be "publish" or "unpublish"' },
        { status: 400 }
      )
    }
    
    const status = action === 'publish' ? 'published' : 'draft'
    
    const { data: opportunity, error } = await supabase
      .from('opportunities')
      .update({ status })
      .eq('id', id)
      .eq('created_by', user.id) // Ensure user can only update their own opportunities
      .select()
      .single()
    
    if (error) {
      console.error('Error updating opportunity status:', error)
      return NextResponse.json(
        { error: 'Failed to update opportunity status' },
        { status: 500 }
      )
    }
    
    if (!opportunity) {
      return NextResponse.json(
        { error: 'Opportunity not found or unauthorized' },
        { status: 404 }
      )
    }
    
    return NextResponse.json({ 
      opportunity,
      message: `Opportunity ${action}ed successfully`
    })
  } catch (error) {
    console.error('Error in POST /api/opportunities/[id]/publish:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}