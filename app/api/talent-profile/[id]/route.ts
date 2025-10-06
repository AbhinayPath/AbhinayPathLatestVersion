import { type NextRequest, NextResponse } from "next/server"
import { getSupabaseServerClientForRouteHandler } from "@/lib/supabase-server"

// GET - Fetch a single talent profile by ID
export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params

    if (!id) {
      return NextResponse.json({ error: "Profile ID is required" }, { status: 400 })
    }

    const supabase = await getSupabaseServerClientForRouteHandler()

    const { data: profile, error } = await supabase
      .from("talent_profiles")
      .select(`
        *,
        education_records(*),
        experience_records(*),
        training_records(*),
        media_files(*)
      `)
      .eq("id", id)
      .eq("published", true)
      .single()

    if (error) {
      console.error("Error fetching talent profile:", error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    if (!profile) {
      return NextResponse.json({ error: "Profile not found" }, { status: 404 })
    }

    return NextResponse.json(profile)
  } catch (error) {
    console.error("GET talent profile by ID failed:", error)
    return NextResponse.json({ error: "Failed to fetch talent profile" }, { status: 500 })
  }
}
