import { createClient } from '@supabase/supabase-js'

// SERVER-ONLY client. Uses the service role key, which bypasses RLS.
// Never import this file into any component that ships to the browser.
export function getSupabaseServerClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { persistSession: false } }
  )
}
