import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const supabaseClientKey = process.env.NEXT_PUBLIC_SUPABASE_CLIENT_KEY || ''

export const SupabaseClient = createClient(supabaseUrl, supabaseClientKey)
