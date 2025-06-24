process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
import { createClient, SupabaseClient } from "@supabase/supabase-js"

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
export const getSupabaseServerClient = (): SupabaseClient => {
  const supabaseUrl = process.env.SUPABASE_URL as string
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY as string

  if (!supabaseUrl || !supabaseServiceKey) {
    throw new Error("Missing Supabase server environment variables")
  }

  return createClient(supabaseUrl, supabaseServiceKey)
}

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
