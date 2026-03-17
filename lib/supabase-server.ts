import { createRouteHandlerClient, createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';

export const getSupabaseServerClientForRouteHandler = () => {
  return createRouteHandlerClient({ cookies });
};

export const getSupabaseServerComponentClient = () => {
  return createServerComponentClient({ cookies });
};