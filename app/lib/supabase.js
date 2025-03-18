import { createClient } from "@supabase/supabase-js";
import { supabaseEnv } from "../env";

export const supabase = createClient(
    supabaseEnv.SUPABASE_URL,
    supabaseEnv.SUPABASE_ANON_KEY
);