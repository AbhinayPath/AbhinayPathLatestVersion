import { NextResponse } from "next/server"
import { getSupabaseServerClient } from "@/lib/supabase"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { email, password } = body

    // Validate the input
    if (!email || !password) {
      return NextResponse.json({ error: "Email and password are required" }, { status: 400 })
    }

    // Get the Supabase client
    const supabase = getSupabaseServerClient()

    // Sign in the user
    const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
      email,
      password
    })

    if (authError) {
      console.error("Error signing in user:", authError)
      return NextResponse.json({ 
        error: "Invalid credentials" 
      }, { status: 401 })
    }

    return NextResponse.json({
      success: true,
      message: "User signed in successfully",
      user: {
        id: authData.user?.id,
        email: authData.user?.email,
        name: authData.user?.user_metadata?.full_name,
        profession: authData.user?.user_metadata?.profession
      }
    })
  } catch (error) {
    console.error("Error in user login:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}