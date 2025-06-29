import { NextResponse } from 'next/server';
import { getSupabaseServerClient } from '@/lib/supabase';



export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    // Validate email format
    if (!email || !email.includes('@')) {
      return NextResponse.json(
        { error: 'Please provide a valid email address' },
        { status: 400 }
      );
    }

    // Use Supabase to send password reset email
    const supabase = getSupabaseServerClient();
    const { error: supabaseError } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `http://localhost:3001/reset-password`,
    });
    if (supabaseError) {
      return NextResponse.json(
        { error: supabaseError.message },
        { status: 400 }
      );
    }

    return NextResponse.json({ message: 'Password reset email sent successfully' });
  } catch (error) {
    console.error('Error sending password reset email:', error);
    return NextResponse.json(
      { error: 'Failed to send password reset email' },
      { status: 500 }
    );
  }
}
