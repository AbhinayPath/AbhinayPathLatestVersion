import { createRouteHandlerClient, createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { createClient } from '@supabase/supabase-js';
import { cookies } from 'next/headers';

export const getSupabaseServerClientForRouteHandler = async () => {
  return createRouteHandlerClient({ cookies: () => cookies() });
};

export const getSupabaseServerComponentClient = async () => {
  return createServerComponentClient({ cookies: () => cookies() });
};

export const getSupabaseAdminClient = async () => {
  return createClient(
    process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL || '',
    process.env.SUPABASE_SERVICE_ROLE_KEY || '',
    {
      auth: {
        autoRefreshToken: false,
        persistSession: false
      }
    }
  );
};