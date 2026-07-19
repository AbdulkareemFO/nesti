import { createClient } from '@supabase/supabase-js'

// Used for public catalog reads (categories, products). Anon key only —
// RLS policies restrict this to active/public rows. Safe for client components.
export const supabasePublic = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)
