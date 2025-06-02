export interface Client {
  id: string
  user_id: string
  name: string
  phone?: string
  email?: string
  address?: string
  job_status: "Lead" | "Quoted" | "Scheduled" | "Completed" | "Paid"
  created_at: string
  updated_at: string
}

export interface JobNote {
  id: string
  client_id: string
  note_text: string
  photo_url?: string
  created_at: string
}

export interface FollowUp {
  id: string
  client_id: string
  next_action: string
  scheduled_date: string
  status: "pending" | "completed"
  created_at: string
  updated_at: string

  // 👇 This adds optional related client data returned from Supabase
  clients?: {
    name: string
  }
}
export interface FollowUpWithClient extends FollowUp {
  clients?: {
    name: string
  }
}



export interface ClientWithDetails extends Client {
  job_notes?: JobNote[]
  follow_ups?: FollowUp[]
}
