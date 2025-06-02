import { supabase } from "@/lib/supabase";

export async function fetchUserPlan(userId: string) {
  if (!userId) return null;

  const { data, error } = await supabase
    .from("profiles")
    .select("plan")
    .eq("id", userId)
    .single();

  if (error) {
    console.error("Error fetching plan:", error.message);
    return null;
  }

  return data?.plan || "free";
}
