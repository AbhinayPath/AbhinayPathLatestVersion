import { NextResponse } from "next/server"
import { getSupabaseServerClient } from "@/lib/supabase"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, email, subject, message } = body

    // Validate the input
    if (!name || !email || !subject || !message) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Get the Supabase client
    const supabase = getSupabaseServerClient()

    // Insert the contact submission into the database
    const { data, error } = await supabase
      .from("contact_submissions")
      .insert([{ name, email, subject, message }])
      .select()

    if (error) {
      console.error("Error submitting contact form:", error)
      return NextResponse.json({ error: "Failed to submit contact form" }, { status: 500 })
    }

    return NextResponse.json({
      success: true,
      message: "Contact form submitted successfully",
      data,
    })
  } catch (error) {
    console.error("Error in contact form submission:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
