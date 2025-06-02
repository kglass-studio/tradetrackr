"use client";

import { createPagesBrowserClient } from "@supabase/auth-helpers-nextjs";
import type { SupabaseClient } from "@supabase/supabase-js";
//import type { Database } from "@/types/supabase"; // Optional if using types

export const supabase = createPagesBrowserClient();
