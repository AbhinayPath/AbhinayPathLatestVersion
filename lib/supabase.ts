import { createClient } from "@supabase/supabase-js"

// Create a single supabase client for the browser
const createBrowserClient = () => {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL as string
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string

  return createClient(supabaseUrl, supabaseAnonKey)
}

// Create a singleton instance for client-side
let browserClient: ReturnType<typeof createClient> | null = null

export const getSupabaseBrowserClient = () => {
  if (!browserClient) {
    browserClient = createBrowserClient()
  }
  return browserClient
}

// Create a server client (to be used in Server Components or API routes)
export const getSupabaseServerClient = () => {
  const supabaseUrl = process.env.SUPABASE_URL as string
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY as string

  return createClient(supabaseUrl, supabaseServiceKey)
}


export async function uploadAuditionImage(file: File) {
  // Change this line to use getSupabaseBrowserClient instead
  const supabase = getSupabaseBrowserClient();
  const fileName = `audition-${Date.now()}-${file.name}`;
  
  if (!supabase) {
    throw new Error("Failed to initialize Supabase client");
  }
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
