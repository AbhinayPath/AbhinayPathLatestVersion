import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";

export async function GET() {
  const supabase = createRouteHandlerClient({ cookies });

  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    return NextResponse.json({ user: null }, { status: 401 });
  }
  const { data: profile, error: profileError } = await supabase
    .from("profiles")
    .select(
      `
        id,
        type,
        completion_percentage,
        is_completed
      `
    )
    .eq("user_id", user.id)
    .single();

  if (profileError) {
    return NextResponse.json(
      {
        user: {
          id: user.id,
          email: user.email,
        },
        profile: null,
        message: "Profile not found",
      },
      { status: 200 }
    );
  }
  return NextResponse.json({
    user: {
      id: user.id,
      email: user.email,
    },
    profile: {
      id: profile.id,
      type: profile.type,
      completion_percentage: profile.completion_percentage,
      is_completed: profile.is_completed,
    },
  });
}
