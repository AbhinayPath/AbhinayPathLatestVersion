import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { getSupabaseServerClientForRouteHandler } from "@/lib/supabase"

// GET - Fetch talent profiles (with optional filters)
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get("userId")
    const skills = searchParams.get("skills")
    const location = searchParams.get("location")
    const published = searchParams.get("published")

    const supabase = await getSupabaseServerClientForRouteHandler()

    let query = supabase.from("talent_profiles").select(`
      *,
      education_records(*),
      experience_records(*),
      training_records(*),
      media_files(*)
    `)

    // Apply filters
    if (userId) query = query.eq("user_id", userId)
    if (published !== "false") query = query.eq("published", true) // Default to published only
    if (location) query = query.ilike("location", `%${location}%`)
    if (skills) query = query.contains("skills", [skills])

    const { data, error } = await query.order("created_at", { ascending: false })

    if (error) {
      console.error("Error fetching talent profiles:", error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json(data || [])
  } catch (error) {
    console.error("GET talent profiles failed:", error)
    return NextResponse.json({ error: "Failed to fetch talent profiles" }, { status: 500 })
  }
}
