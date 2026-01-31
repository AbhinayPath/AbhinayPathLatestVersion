import { NextRequest, NextResponse } from "next/server";
import { getSupabaseServerClient } from "@/lib/supabase";

type ProfileType = "artist" | "technician" | "organisation";

export async function POST(req: NextRequest) {
  try {
    const { email, password, profileType } = await req.json() as {
      email: string;
      password: string;
      profileType: ProfileType;
    };

    if (!email || !password || !profileType) {
      return NextResponse.json(
        { success: false, message: "Email, password, and profile type are required" },
        { status: 400 }
      );
    }

    if (password.length < 6) {
      return NextResponse.json(
        { success: false, message: "Password must be at least 6 characters" },
        { status: 400 }
      );
    }
    const supabase = getSupabaseServerClient();
    const { data: existingProfile } = await supabase
      .from("profiles")
      .select("id")
      .eq("email", email)
      .maybeSingle();

    if (existingProfile) {
      return NextResponse.json(
        { success: false, message: "Email already registered" },
        { status: 409 }
      );
    }

    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          profile_type: profileType,
        },
       emailRedirectTo: `${process.env.NEXT_PUBLIC_BASE_URL}/auth/callback`,
      },
    });


    console.log("authError", authError, "authData", authData)
    if (authError || !authData.user) {
      // Handle specific Supabase auth errors
      if (authError?.message.includes("already registered")) {
        return NextResponse.json(
          { success: false, message: "Email already registered" },
          { status: 409 }
        );
      }

      return NextResponse.json(
        { success: false, message: authError?.message ?? "Signup failed" },
        { status: 400 }
      );
    }

    const userId = authData.user.id;
    console.log("userId", userId)
    const { data: profile, error: profileError } = await supabase
      .from("profiles")
      .insert({
        user_id: userId,
        email,
        type: profileType,
        is_completed: false,
        completion_percentage: 0,
      })
      .select()
      .single();

    if (profileError || !profile) {
      console.error("Profile creation error:", profileError);

      // Rollback: Delete user and auth user
      await supabase.auth.admin.deleteUser(userId);

      return NextResponse.json(
        { success: false, message: "Profile creation failed" },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "Account created. Please verify your email.",
        profileId: profile.id,
      },
      { status: 201 }
    );

  } catch (err) {
    console.error("Registration error:", err);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}