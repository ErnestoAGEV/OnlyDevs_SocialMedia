import {crearteClient} from "@supabase/supabase-js"
export const supabase = crearteClient(
    import.meta.env.VITE_SUPABASE_URL,
    import.meta.env.VITE_SUPABASE_ANON_KEY
)