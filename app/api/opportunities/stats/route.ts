import { NextRequest, NextResponse } from 'next/server'
import { getSupabaseServerClientForRouteHandler } from '@/lib/supabase-server'

export async function GET(request: NextRequest) {
  try {
    const supabase = await getSupabaseServerClientForRouteHandler()
    const { searchParams } = new URL(request.url)
    
    // Check if user wants their own stats or public stats
    const userId = searchParams.get('userId')
    
    // Get the current user for authentication if userId is provided
    let user = null
    if (userId) {
      const { data: { user: authUser }, error: authError } = await supabase.auth.getUser()
      
      if (authError || !authUser || authUser.id !== userId) {
        return NextResponse.json(
          { error: 'Unauthorized' },
          { status: 401 }
        )
      }
      user = authUser
    }
    
    const stats: any = {}
    
    if (userId && user) {
      // User-specific stats
      const { data: userOpportunities, error: userError } = await supabase
        .from('opportunities')
        .select('status, type, created_at')
        .eq('created_by', userId)
      
      if (userError) {
        console.error('Error fetching user opportunities:', userError)
        return NextResponse.json(
          { error: 'Failed to fetch user statistics' },
          { status: 500 }
        )
      }
      
      stats.user = {
        total: userOpportunities.length,
        published: userOpportunities.filter(op => op.status === 'published').length,
        draft: userOpportunities.filter(op => op.status === 'draft').length,
        byType: userOpportunities.reduce((acc: any, op) => {
          acc[op.type] = (acc[op.type] || 0) + 1
          return acc
        }, {}),
        recentCount: userOpportunities.filter(op => {
          const createdAt = new Date(op.created_at)
          const weekAgo = new Date()
          weekAgo.setDate(weekAgo.getDate() - 7)
          return createdAt >= weekAgo
        }).length
      }
    } else {
      // Public stats
      const { data: publicOpportunities, error: publicError } = await supabase
        .from('opportunities')
        .select('type, city, state, experience_required, pay_type, created_at')
        .eq('status', 'published')
        .eq('visibility', 'public')
      
      if (publicError) {
        console.error('Error fetching public opportunities:', publicError)
        return NextResponse.json(
          { error: 'Failed to fetch public statistics' },
          { status: 500 }
        )
      }
      
      stats.public = {
        total: publicOpportunities.length,
        byType: publicOpportunities.reduce((acc: any, op) => {
          acc[op.type] = (acc[op.type] || 0) + 1
          return acc
        }, {}),
        byLocation: publicOpportunities.reduce((acc: any, op) => {
          const location = `${op.city}, ${op.state}`
          acc[location] = (acc[location] || 0) + 1
          return acc
        }, {}),
        byExperience: publicOpportunities.reduce((acc: any, op) => {
          if (op.experience_required) {
          acc[op.experience_required] = (acc[op.experience_required] || 0) + 1
          }
          return acc
        }, {}),
        byPayType: publicOpportunities.reduce((acc: any, op) => {
          if (op.pay_type) {
            acc[op.pay_type] = (acc[op.pay_type] || 0) + 1
          }
          return acc
        }, {}),
        recentCount: publicOpportunities.filter(op => {
          const createdAt = new Date(op.created_at)
          const weekAgo = new Date()
          weekAgo.setDate(weekAgo.getDate() - 7)
          return createdAt >= weekAgo
        }).length
      }
    }
    
    return NextResponse.json({ stats })
  } catch (error) {
    console.error('Error in GET /api/opportunities/stats:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}