import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    // Validation
    if (!email || !password) {
      return NextResponse.json(
        { success: false, message: "Email and password are required" },
        { status: 400 }
      );
    }

    const supabase = createRouteHandlerClient({ cookies });

    // Sign in with password
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      console.error("Login error:", error);

      // Handle specific error cases
      if (error.message.includes("Invalid login credentials")) {
        return NextResponse.json(
          { success: false, message: "Invalid email or password" },
          { status: 401 }
        );
      }

      if (error.message.includes("Email not confirmed")) {
        return NextResponse.json(
          { success: false, message: "Please verify your email before logging in" },
          { status: 403 }
        );
      }

      return NextResponse.json(
        { success: false, message: error.message },
        { status: 401 }
      );
    }

    if (!data.user || !data.session) {
      return NextResponse.json(
        { success: false, message: "Login failed" },
        { status: 401 }
      );
    }

    // Fetch user profile information
    const { data: profile, error: profileError } = await supabase
      .from("profiles")
      .select("id, type, is_completed, completion_percentage")
      .eq("user_id", data.user.id)
      .single();

    if (profileError) {
      console.error("Error fetching profile:", profileError);
    }

    return NextResponse.json({
      success: true,
      message: "Logged in successfully",
      user: {
        id: data.user.id,
        email: data.user.email,
      },
      profile: profile || null,
      session: {
        access_token: data.session.access_token,
        expires_at: data.session.expires_at,
      },
    });

  } catch (err) {
    console.error("Login error:", err);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}