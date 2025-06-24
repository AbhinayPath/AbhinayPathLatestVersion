import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(request: NextRequest) {
  let createdUserId: string | null = null;
  
  try {
    const { firstName, lastName, email, password, profession, name } = await request.json();

    // Handle both old format (name) and new format (firstName, lastName)
    let finalFirstName: string;
    let finalLastName: string;

    if (firstName && lastName) {
      // New format from RegisterModal
      finalFirstName = firstName.trim();
      finalLastName = lastName.trim();
    } else if (name) {
      // Old format from signup page
      const nameParts = name.trim().split(" ");
      finalFirstName = nameParts[0] || "";
      finalLastName = nameParts.slice(1).join(" ") || "";
    } else {
      return NextResponse.json(
        { 
          error: "Missing required fields",
          message: "First name and last name are required",
          success: false
        },
        { status: 400 }
      );
    }

    // Validate input
    if (!email || !password || !finalFirstName) {
      return NextResponse.json(
        { 
          error: "Missing required fields",
          message: "Email, password, and first name are required",
          success: false
        },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { 
          error: "Invalid email format",
          message: "Please provide a valid email address",
          success: false
        },
        { status: 400 }
      );
    }

    // Validate password length
    if (password.length < 6) {
      return NextResponse.json(
        { 
          error: "Password too short",
          message: "Password must be at least 6 characters long",
          success: false
        },
        { status: 400 }
      );
    }

    console.log('🔄 Starting user registration process...');

    // Step 1: Create user in Supabase Auth
    const { data: authData, error: authError } = await supabase.auth.admin.createUser({
      email,
      password,
      email_confirm: true,
      user_metadata: {
        first_name: finalFirstName,
        last_name: finalLastName,
        full_name: `${finalFirstName} ${finalLastName}`.trim(),
        profession: profession || null
      }
    });

    if (authError) {
      console.error("❌ Auth error:", authError);
      
      let errorMessage = "Failed to create account";
      if (authError.message.includes("already registered")) {
        errorMessage = "An account with this email already exists";
      } else if (authError.message.includes("password")) {
        errorMessage = "Password does not meet requirements";
      }
      
      return NextResponse.json(
        { 
          error: authError.message,
          message: errorMessage,
          success: false
        },
        { status: 400 }
      );
    }

    if (!authData.user) {
      return NextResponse.json(
        { 
          error: "User creation failed",
          message: "Failed to create user account",
          success: false
        },
        { status: 500 }
      );
    }

    // Store the user ID for potential cleanup
    createdUserId = authData.user.id;
    console.log('✅ Auth user created:', createdUserId);

    console.log('🔄 Creating talent profile...');

    // Step 2: Create talent profile with correct column names
    const { data: profileData, error: profileError } = await supabase
      .from("talent_profiles")
      .insert({
        user_id: authData.user.id,
        first_name: finalFirstName,
        last_name: finalLastName,
        email: email,
        published: false,
        profile_completion_percentage: 10,
      })
      .select()
      .single();

    if (profileError) {
      console.error("❌ Error creating talent profile:", profileError);
      
      // CRITICAL: Clean up the auth user since profile creation failed
      console.log('🔄 Cleaning up auth user due to profile creation failure...');
      
      try {
        const { error: deleteError } = await supabase.auth.admin.deleteUser(createdUserId);
        
        if (deleteError) {
          console.error("❌ Failed to cleanup auth user:", deleteError);
          return NextResponse.json(
            { 
              error: "Critical error: User created but profile failed and cleanup failed",
              message: "Please contact support immediately",
              success: false,
              criticalError: true,
              userId: createdUserId
            },
            { status: 500 }
          );
        } else {
          console.log('✅ Successfully cleaned up auth user');
        }
      } catch (cleanupError) {
        console.error("❌ Exception during cleanup:", cleanupError);
        return NextResponse.json(
          { 
            error: "Critical error during cleanup",
            message: "Please contact support immediately",
            success: false,
            criticalError: true,
            userId: createdUserId
          },
          { status: 500 }
        );
      }

      return NextResponse.json(
        { 
          error: "Profile creation failed",
          message: "Failed to create user profile. Please try again.",
          success: false,
          details: profileError.message
        },
        { status: 500 }
      );
    }

    console.log('✅ Talent profile created successfully');

    // Step 3: Verify both user and profile exist
    const { data: verifyUser } = await supabase.auth.admin.getUserById(authData.user.id);
    const { data: verifyProfile } = await supabase
      .from("talent_profiles")
      .select("id")
      .eq("user_id", authData.user.id)
      .single();

    if (!verifyUser.user || !verifyProfile) {
      console.error("❌ Verification failed - data inconsistency detected");
      
      // Attempt cleanup
      if (verifyUser.user) {
        await supabase.auth.admin.deleteUser(authData.user.id);
      }
      
      return NextResponse.json(
        { 
          error: "Data inconsistency detected",
          message: "Registration failed. Please try again.",
          success: false
        },
        { status: 500 }
      );
    }

    console.log('✅ Registration completed successfully');

    return NextResponse.json({
      success: true,
      message: "Account created successfully! Welcome to AbhinayPath!",
      user: {
        id: authData.user.id,
        email: authData.user.email,
        firstName: finalFirstName,
        lastName: finalLastName,
        fullName: `${finalFirstName} ${finalLastName}`.trim(),
        profession: profession || null,
        profile: profileData,
      },
    }, { status: 201 });

  } catch (error) {
    console.error("❌ Registration error:", error);
    
    // If we created a user but something went wrong, clean it up
    if (createdUserId) {
      console.log('🔄 Cleaning up auth user due to exception...');
      try {
        await supabase.auth.admin.deleteUser(createdUserId);
        console.log('✅ Successfully cleaned up auth user after exception');
      } catch (cleanupError) {
        console.error("❌ Failed to cleanup auth user after exception:", cleanupError);
      }
    }
    
    return NextResponse.json(
      { 
        error: "Internal server error",
        message: "Something went wrong. Please try again.",
        success: false
      },
      { status: 500 }
    );
  }
}
