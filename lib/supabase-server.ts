import { createRouteHandlerClient, createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';

export const getSupabaseServerClientForRouteHandler = async () => {
  return createRouteHandlerClient({ cookies: () => cookies() });
};

export const getSupabaseServerComponentClient = async () => {
  return createServerComponentClient({ cookies: () => cookies() });
};