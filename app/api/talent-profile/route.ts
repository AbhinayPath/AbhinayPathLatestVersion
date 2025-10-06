import { createClient } from "@supabase/supabase-js"
import { NextResponse } from "next/server"

export async function GET(request: Request) {
  try {
    const supabase = createClient()

    // Fetch all published talent profiles
    const { data: profiles, error } = await supabase
      .from("talent_profiles")
      .select(`
        id,
        full_name,
        email,
        phone,
        city,
        state,
        bio,
        profile_image_url,
        experience_level,
        acting_skills,
        languages,
        verified,
        years_of_experience,
        portfolio_images,
        instagram_url,
        youtube_url,
        website_url,
        imdb_url
      `)
      .eq("profile_status", "published")
      .order("created_at", { ascending: false })

    if (error) {
      console.error("Error fetching talent profiles:", error)
      return NextResponse.json({ error: "Failed to fetch profiles" }, { status: 500 })
    }

    return NextResponse.json(profiles || [])
  } catch (error) {
    console.error("Error in talent profile API:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
