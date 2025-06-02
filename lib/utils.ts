import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
import { supabase } from "./supabase"
import type { Client, FollowUpWithClient } from "@/types"

export async function fetchClients(): Promise<Client[]> {
  const { data, error } = await supabase
    .from("clients")
    .select("*")
    .order("created_at", { ascending: false })

  if (error) {
    console.error("Error fetching clients:", error)
    throw new Error("Failed to fetch clients.")
  }

  return data || []
}

export async function fetchFollowUpsWithClients(): Promise<FollowUpWithClient[]> {
  const { data, error } = await supabase
    .from("follow_ups")
    .select("*, clients (name)")
    .eq("status", "pending")
    .order("scheduled_date", { ascending: true })
    .limit(5)

  if (error) {
    console.error("Error fetching follow-ups:", error)
    throw new Error("Failed to fetch follow-ups.")
  }

  return data || []
}
