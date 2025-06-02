"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { supabase } from "@/lib/supabase"
import type { FollowUp } from "@/types"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Plus, Check, Clock } from "lucide-react"
import { format, isPast, isToday } from "date-fns"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"

type FollowUpForm = {
  next_action: string
  scheduled_date: Date | null
}

interface ClientFollowUpsProps {
  clientId: string
  onUpdate: () => void
}

export function ClientFollowUps({ clientId, onUpdate }: ClientFollowUpsProps) {
  const [followUps, setFollowUps] = useState<FollowUp[]>([])
  const [showAddForm, setShowAddForm] = useState(false)
  const [formData, setFormData] = useState<FollowUpForm>({
  next_action: "",
  scheduled_date: null,
})

  const [loading, setLoading] = useState(false)

  useEffect(() => {
    fetchFollowUps()
  }, [clientId])

  const fetchFollowUps = async () => {
    try {
      const { data, error } = await supabase
        .from("follow_ups")
        .select("*")
        .eq("client_id", clientId)
        .order("scheduled_date", { ascending: true })

      if (error) throw error
      setFollowUps(data || [])
    } catch (error) {
      console.error("Error fetching follow-ups:", error)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.next_action.trim() || !formData.scheduled_date) return

    setLoading(true)
    try {
      const { error } = await supabase.from("follow_ups").insert([
        {
          client_id: clientId,
          next_action: formData.next_action,
          scheduled_date: formData.scheduled_date.toISOString(),

        },
      ])

      if (error) throw error

      setFormData({ next_action: "", scheduled_date: null })

      setShowAddForm(false)
      fetchFollowUps()
      onUpdate()
    } catch (error) {
      console.error("Error adding follow-up:", error)
      alert("Error adding follow-up. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  const markCompleted = async (followUpId: string) => {
    try {
      const { error } = await supabase.from("follow_ups").update({ status: "completed" }).eq("id", followUpId)

      if (error) throw error
      fetchFollowUps()
      onUpdate()
    } catch (error) {
      console.error("Error updating follow-up:", error)
    }
  }

  const getFollowUpStatus = (followUp: FollowUp) => {
    if (followUp.status === "completed") return "completed"

    const date = new Date(followUp.scheduled_date)
    if (isPast(date) && !isToday(date)) return "overdue"
    if (isToday(date)) return "today"
    return "upcoming"
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "text-green-600 bg-green-50"
      case "overdue":
        return "text-red-600 bg-red-50"
      case "today":
        return "text-orange-600 bg-orange-50"
      default:
        return "text-blue-600 bg-blue-50"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <Check className="h-4 w-4" />
      case "overdue":
        return <Clock className="h-4 w-4" />
      case "today":
        return <Clock className="h-4 w-4" />
      default:
        return <Clock className="h-4 w-4" />
    }
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle>Follow-ups</CardTitle>
          <Button variant="outline" size="sm" onClick={() => setShowAddForm(!showAddForm)}>
            <Plus className="h-4 w-4 mr-2" />
            Add Follow-up
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Add Follow-up Form */}
        {showAddForm && (
          <form onSubmit={handleSubmit} className="space-y-4 p-4 border rounded-lg bg-gray-50">
  <div className="space-y-2">
    <Label htmlFor="next_action">Next Action</Label>
    <Input
      id="next_action"
      placeholder="e.g., Call to confirm appointment"
      value={formData.next_action}
      onChange={(e) => setFormData((prev) => ({ ...prev, next_action: e.target.value }))}
      required
    />
  </div>

  <div className="space-y-2">
    <Label htmlFor="scheduled_date">Scheduled Date & Time</Label>
    <DatePicker
  id="scheduled_date"
  selected={formData.scheduled_date}
 onChange={(date: Date | null, _event: React.SyntheticEvent<any> | undefined) => {
  if (date) {
    setFormData((prev) => ({ ...prev, scheduled_date: date }))
  }
}}

  showTimeSelect
  timeFormat="hh:mm aa"
  timeIntervals={15}
  dateFormat="MMMM d, yyyy h:mm aa"
  className="w-full border rounded px-3 py-2 text-sm"
/>

  </div>

  <div className="flex gap-2">
    <Button type="submit" disabled={loading} size="sm" className="bg-green-600 hover:bg-green-700 text-white">
      <Check className="h-4 w-4 mr-1" />
      {loading ? "Saving..." : "Confirm"}
    </Button>
    <Button
      type="button"
      variant="outline"
      size="sm"
      onClick={() => {
        setShowAddForm(false)
        setFormData({ next_action: "", scheduled_date: null })

      }}
    >
      Cancel
    </Button>
  </div>
</form>

        )}

        {/* Follow-ups List */}
        {followUps.length === 0 ? (
          <p className="text-gray-600 text-center py-4">No follow-ups scheduled.</p>
        ) : (
          <div className="space-y-3">
            {followUps.map((followUp) => {
              const status = getFollowUpStatus(followUp)

              return (
                <div key={followUp.id} className={`p-3 rounded-lg border ${getStatusColor(status)}`}>
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <p className="font-medium text-gray-900">{followUp.next_action}</p>
                      <div className="flex items-center mt-1">
                        {getStatusIcon(status)}
                        <span className="ml-2 text-sm">
                          {format(new Date(followUp.scheduled_date), "MMM d, yyyy h:mm a")}
                          {status === "overdue" && " (Overdue)"}
                          {status === "today" && " (Today)"}
                          {status === "completed" && " (Completed)"}
                        </span>
                      </div>
                    </div>

                    {followUp.status === "pending" && (
                      <Button variant="outline" size="sm" onClick={() => markCompleted(followUp.id)}>
                        <Check className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
