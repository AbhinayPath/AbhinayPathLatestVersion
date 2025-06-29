// DEPRECATED: Use lib/supabase-browser.ts for client/browser code and lib/supabase-server.ts for App Router/server code.
// This file is kept for legacy reasons only. Do not import from here.
import { createClient, SupabaseClient } from "@supabase/supabase-js"
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import type { NextRequest } from 'next/server';

// Create a single supabase client for the browser
const createBrowserClient = (): SupabaseClient => {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL as string
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string

  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error("Missing Supabase environment variables")
  }

  return createClient(supabaseUrl, supabaseAnonKey)
}

// Create a singleton instance for client-side
let browserClient: SupabaseClient | null = null

export const getSupabaseBrowserClient = (): SupabaseClient => {
  if (!browserClient) {
    browserClient = createBrowserClient()
  }
  return browserClient
}

// Create a server client (to be used in Server Components or API routes)
// For server-side user context (API routes, Route Handlers)
// export const getSupabaseServerClientForRouteHandler = (request: NextRequest) => {
//   const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL as string;
//   const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string;
//   if (!supabaseUrl || !supabaseAnonKey) {
//     throw new Error('Missing Supabase environment variables');
//   }
//   // Pass cookies from the request to the Supabase client for user session
//   return createRouteHandlerClient({ cookies });
// }

// Create a server client (to be used in Server Components or API routes)
export const getSupabaseServerClient = (): SupabaseClient => {
  const supabaseUrl = process.env.SUPABASE_URL as string
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY as string

  if (!supabaseUrl || !supabaseServiceKey) {
    throw new Error("Missing Supabase server environment variables")
  }

  return createClient(supabaseUrl, supabaseServiceKey)
}

// Create a server client using anon key (for login/signup endpoints)
export const getSupabaseAnonServerClient = (): SupabaseClient => {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL as string;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string;
  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error('Missing Supabase anon environment variables');
  }
  return createClient(supabaseUrl, supabaseAnonKey);
};

export async function uploadAuditionImage(file: File) {
  const supabase = getSupabaseBrowserClient();
  const fileName = `audition-${Date.now()}-${file.name}`;
  
  const { data, error } = await supabase.storage
    .from('audition-images')
    .upload(fileName, file);
    
  if (error) throw error;
  
  // Get the public URL
  const { data: publicUrlData } = supabase.storage
    .from('audition-images')
    .getPublicUrl(fileName);
    
  return publicUrlData.publicUrl;
}
