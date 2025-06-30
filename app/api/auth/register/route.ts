import { NextRequest, NextResponse } from "next/server";
import { getSupabaseAnonServerClient } from "@/lib/supabase";

const supabase = getSupabaseAnonServerClient();

export async function POST(request: NextRequest) {
  let createdUserId: string | null = null;

  try {
    const {
      firstName,
      lastName,
      email,
      password,
      profession,
      name,
    } = await request.json();

    // Name normalization
    let finalFirstName = firstName?.trim() || "";
    let finalLastName = lastName?.trim() || "";

    if (!finalFirstName && name) {
      const parts = name.trim().split(" ");
      finalFirstName = parts[0] || "";
      finalLastName = parts.slice(1).join(" ") || "";
    }

    if (!finalFirstName || !email || !password) {
      return NextResponse.json(
        {
          error: "Missing required fields",
          message: "First name, email, and password are required",
          success: false,
        },
        { status: 400 }
      );
    }

    // Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        {
          error: "Invalid email format",
          message: "Please provide a valid email address",
          success: false,
        },
        { status: 400 }
      );
    }

    // Password length validation
    if (password.length < 6) {
      return NextResponse.json(
        {
          error: "Password too short",
          message: "Password must be at least 6 characters long",
          success: false,
        },
        { status: 400 }
      );
    }

    // ✅ Register user with public signUp
    const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          first_name: finalFirstName,
          last_name: finalLastName,
          full_name: `${finalFirstName} ${finalLastName}`.trim(),
          profession: profession || null,
        }
      }
    });

    if (signUpError) {
      let message = "Failed to create account";
      if (signUpError.message.includes("already registered")) {
        message = "An account with this email already exists";
      } else if (signUpError.message.includes("password")) {
        message = "Password does not meet requirements";
      }
      console.log("signUpError", signUpError);
      return NextResponse.json(
        {
          error: signUpError.message,
          message,
          success: false,
        },
        { status: 400 }
      );
    }

    if (!signUpData.user) {
      return NextResponse.json(
        {
          error: "User creation failed",
          message: "Failed to create user account",
          success: false,
        },
        { status: 500 }
      );
    }

    // ✅ Create talent profile
    const { data: profileData, error: profileError } = await supabase
      .from("talent_profiles")
      .insert({
        user_id: signUpData.user.id,
        first_name: finalFirstName,
        last_name: finalLastName,
        email,
        published: false,
        profile_completion_percentage: 10,
      })
      .select()
      .single();
      console.log("signUpData", signUpData);
    console.log("profileData", profileData);
    console.log("profileError", profileError);
    
    if (profileError) {
      return NextResponse.json(
        {
          error: "Profile creation failed",
          message: "User created, but failed to create profile.",
          success: false,
          details: profileError.message,
        },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "Account created successfully! Please check your email to confirm your account.",
        user: {
          id: signUpData.user.id,
          email,
          firstName: finalFirstName,
          lastName: finalLastName,
          fullName: `${finalFirstName} ${finalLastName}`.trim(),
          profession: profession || null,
          profile: profileData,
        },
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("❌ Registration error:", error);
    return NextResponse.json(
      {
        error: "Internal server error",
        message: "Something went wrong. Please try again.",
        success: false,
      },
      { status: 500 }
    );
  }
}
