import { type NextRequest, NextResponse } from "next/server"
import { getSupabaseServerClientForRouteHandler } from "@/lib/supabase-server"

// GET - Fetch talent profiles (with optional filters)
export async function GET(request: NextRequest) {
  try {
    const supabase = await getSupabaseServerClientForRouteHandler()

    // Get all published talent profiles
    const { data: profiles, error } = await supabase
      .from("talent_profiles")
      .select(`
        id,
        user_id,
        full_name,
        city,
        state,
        bio,
        profile_picture_url,
        experience_level,
        years_of_experience,
        acting_skills,
        languages,
        contact_email,
        contact_phone,
        website,
        social_instagram,
        social_youtube,
        social_imdb,
        is_published,
        created_at,
        updated_at
      `)
      .eq("is_published", true)
      .order("created_at", { ascending: false })

    if (error) {
      console.error("Error fetching talent profiles:", error)
      return NextResponse.json({ error: "Failed to fetch talent profiles" }, { status: 500 })
    }

    return NextResponse.json({ profiles: profiles || [] })
  } catch (error) {
    console.error("Error in talent profile API:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

// POST - Create or update talent profile
export async function POST(request: NextRequest) {
  try {
    const supabase = await getSupabaseServerClientForRouteHandler()

    // Get the authenticated user
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser()

    if (authError || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const body = await request.json()

    // Insert or update talent profile
    const { data, error } = await supabase
      .from("talent_profiles")
      .upsert(
        {
          user_id: user.id,
          ...body,
          updated_at: new Date().toISOString(),
        },
        {
          onConflict: "user_id",
        },
      )
      .select()
      .single()

    if (error) {
      console.error("Error saving talent profile:", error)
      return NextResponse.json({ error: "Failed to save talent profile" }, { status: 500 })
    }

    return NextResponse.json({ profile: data })
  } catch (error) {
    console.error("Error in talent profile API:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
