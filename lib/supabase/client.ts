import { createClient } from '@supabase/supabase-js'

// BROWSER client. Uses the anon key, subject to RLS policies.
export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)
