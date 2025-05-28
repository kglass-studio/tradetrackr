"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { supabase } from "@/lib/supabase"
import type { Client, FollowUp } from "@/types"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Plus, Users, Calendar, CheckCircle, Clock } from "lucide-react"
import { format, isToday, isPast } from "date-fns"

export default function DashboardPage() {
  const [clients, setClients] = useState<Client[]>([])
  const [followUps, setFollowUps] = useState<FollowUp[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchDashboardData()
  }, [])

  const fetchDashboardData = async () => {
    try {
      // Fetch recent clients
      const { data: clientsData } = await supabase
        .from("clients")
        .select("*")
        .order("updated_at", { ascending: false })
        .limit(5)

      // Fetch today's and overdue follow-ups
      const today = new Date()
      today.setHours(23, 59, 59, 999)

      const { data: followUpsData } = await supabase
        .from("follow_ups")
        .select(`
          *,
          clients (name)
        `)
        .eq("status", "pending")
        .lte("scheduled_date", today.toISOString())
        .order("scheduled_date", { ascending: true })

      setClients(clientsData || [])
      setFollowUps(followUpsData || [])
    } catch (error) {
      console.error("Error fetching dashboard data:", error)
      console.error("Full error object:", error); // Add this line
    } finally {
      setLoading(false)
    }
  }

  const getStatusCounts = () => {
    const counts = {
      Lead: 0,
      Quoted: 0,
      Scheduled: 0,
      Completed: 0,
      Paid: 0,
    }

    clients.forEach((client) => {
      counts[client.job_status]++
    })

    return counts
  }

  const statusCounts = getStatusCounts()

  if (loading) {
    return (
      <div className="space-y-4">
        <div className="h-8 bg-gray-200 rounded animate-pulse"></div>
        <div className="grid grid-cols-2 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-24 bg-gray-200 rounded animate-pulse"></div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <Link href="/clients/new">
          <Button size="sm">
            <Plus className="h-4 w-4 mr-2" />
            Add Client
          </Button>
        </Link>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center">
              <Users className="h-8 w-8 text-blue-600" />
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-600">Total Clients</p>
                <p className="text-2xl font-bold text-gray-900">{clients.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center">
              <Calendar className="h-8 w-8 text-orange-600" />
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-600">Follow-ups</p>
                <p className="text-2xl font-bold text-gray-900">{followUps.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center">
              <CheckCircle className="h-8 w-8 text-green-600" />
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-600">Completed</p>
                <p className="text-2xl font-bold text-gray-900">{statusCounts.Completed}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center">
              <Clock className="h-8 w-8 text-purple-600" />
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-600">Active Jobs</p>
                <p className="text-2xl font-bold text-gray-900">
                  {statusCounts.Lead + statusCounts.Quoted + statusCounts.Scheduled}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Today's Follow-ups */}
      {followUps.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Calendar className="h-5 w-5 mr-2" />
              Today's Follow-ups & Overdue
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {followUps.map((followUp) => {
              const isOverdue = isPast(new Date(followUp.scheduled_date)) && !isToday(new Date(followUp.scheduled_date))

              return (
                <div
                  key={followUp.id}
                  className={`p-3 rounded-lg border ${
                    isOverdue ? "border-red-200 bg-red-50" : "border-gray-200 bg-gray-50"
                  }`}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-medium text-gray-900">{(followUp as any).clients?.name}</p>
                      <p className="text-sm text-gray-600">{followUp.next_action}</p>
                      <p className={`text-xs ${isOverdue ? "text-red-600" : "text-gray-500"}`}>
                        {format(new Date(followUp.scheduled_date), "MMM d, h:mm a")}
                        {isOverdue && " (Overdue)"}
                      </p>
                    </div>
                  </div>
                </div>
              )
            })}
          </CardContent>
        </Card>
      )}

      {/* Quick Actions */}
      <div className="grid grid-cols-1 gap-4">
        <Link href="/clients">
          <Card className="hover:shadow-md transition-shadow">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium text-gray-900">View All Clients</h3>
                  <p className="text-sm text-gray-600">Manage your client list</p>
                </div>
                <Users className="h-6 w-6 text-gray-400" />
              </div>
            </CardContent>
          </Card>
        </Link>
      </div>
    </div>
  )
}
