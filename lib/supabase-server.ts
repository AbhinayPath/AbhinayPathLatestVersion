import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';

export const getSupabaseServerClientForRouteHandler = async () => {
  const cookieStore = await cookies(); // no `await`

  console.log('🍪 Cookie store:', cookieStore);
  return createRouteHandlerClient({ cookies: () => cookieStore });
};
