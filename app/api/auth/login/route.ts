import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const { email, password } = await request.json();
  const supabase = createRouteHandlerClient({ cookies });

  const { data, error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) {
    return NextResponse.json({ error: error.message || "Invalid credentials" }, { status: 401 });
  }

  // Set the session cookie using auth-helpers
  await supabase.auth.setSession({
    access_token: data.session.access_token,
    refresh_token: data.session.refresh_token,
  });

  return NextResponse.json({
    success: true,
    message: "User signed in successfully",
    user: {
      id: data.user?.id,
      email: data.user?.email,
      // ...other fields
    },
  });
}