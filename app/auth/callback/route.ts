
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { type EmailOtpType } from '@supabase/supabase-js'
import { type NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'

export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url)
    const token_hash = searchParams.get('token_hash')
    const code = searchParams.get('code')
    const type = searchParams.get('type') as EmailOtpType | null
    console.log("token_hash", token_hash)
    console.log("code", code)
    console.log("type", type)
    if (token_hash && type) {
        const supabase = await createRouteHandlerClient({ cookies });
        const { error } = await supabase.auth.verifyOtp({ type, token_hash })
        if (!error) {
            return NextResponse.redirect(new URL('/', request.url))
        }
    }
    return NextResponse.redirect(new URL('/', request.url))
}