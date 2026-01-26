import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';

export const getSupabaseServerClientForRouteHandler = async () => {
  const cookieStore = await cookies();
  return createRouteHandlerClient({ 
    cookies: () => cookieStore  // Pass as function returning the awaited cookieStore
  });
};