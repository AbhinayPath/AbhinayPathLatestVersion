import { type NextRequest, NextResponse } from "next/server"
import { getSupabaseServerClientForRouteHandler } from "@/lib/supabase-server"

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params
    const supabase = await getSupabaseServerClientForRouteHandler()

    // Get the talent profile by ID
    const { data: profile, error: profileError } = await supabase
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
      .eq("id", id)
      .eq("is_published", true)
      .single()

    if (profileError || !profile) {
      return NextResponse.json({ error: "Profile not found" }, { status: 404 })
    }

    // Get education records
    const { data: education } = await supabase
      .from("talent_education")
      .select("*")
      .eq("talent_profile_id", id)
      .order("end_year", { ascending: false })

    // Get experience records
    const { data: experience } = await supabase
      .from("talent_experience")
      .select("*")
      .eq("talent_profile_id", id)
      .order("year", { ascending: false })

    // Get training records
    const { data: training } = await supabase
      .from("talent_training")
      .select("*")
      .eq("talent_profile_id", id)
      .order("year", { ascending: false })

    // Get portfolio media
    const { data: media } = await supabase
      .from("talent_media")
      .select("*")
      .eq("talent_profile_id", id)
      .order("created_at", { ascending: false })
      .limit(5)

    return NextResponse.json({
      profile,
      education: education || [],
      experience: experience || [],
      training: training || [],
      media: media || [],
    })
  } catch (error) {
    console.error("Error fetching talent profile:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
