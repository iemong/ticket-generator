import { createClient } from '@supabase/supabase-js'
import { AppLoadContext } from '@remix-run/server-runtime/data'

export const supabase = (context: AppLoadContext) =>
  createClient(context.SUPABASE_URL ?? '', context.SUPABASE_ANON_KEY ?? '', {
    fetch: (...args) => fetch(...args),
  })
