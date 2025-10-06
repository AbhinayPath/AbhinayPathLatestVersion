import { NextResponse } from "next/server"
import { createClient } from "@/lib/supabase-server"

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const supabase = createClient()

    // Fetch talent profile with related data
    const { data: profile, error } = await supabase
      .from("talent_profiles")
      .select(`
        *,
        experience:talent_experience(*),
        education:talent_education(*),
        training:talent_training(*)
      `)
      .eq("id", params.id)
      .eq("profile_status", "published")
      .single()

    if (error) {
      console.error("Error fetching talent profile:", error)
      return NextResponse.json({ error: "Profile not found" }, { status: 404 })
    }

    if (!profile) {
      return NextResponse.json({ error: "Profile not found" }, { status: 404 })
    }

    return NextResponse.json(profile)
  } catch (error) {
    console.error("Error in talent profile API:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
