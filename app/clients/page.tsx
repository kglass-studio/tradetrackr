"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { supabase } from "@/lib/supabase"
import type { Client, FollowUp } from "@/types"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { format, isPast, isToday } from "date-fns"
import { Users, Calendar, Clock, CheckCircle } from "lucide-react"
import { useAuth } from "@/contexts/auth-context"
import InstallAppButton from "@/components/install-app-button"
import { PlanBadge } from "@/components/PlanBadge"
import { UpgradeButton } from "@/components/UpgradeButton"

export default function ClientsList() {
  const [clients, setClients] = useState<Client[]>([])
  const [followUps, setFollowUps] = useState<FollowUp[]>([])
  const { signOut, user, plan } = useAuth()
  const [planLoaded, setPlanLoaded] = useState(false)


 useEffect(() => {
  if (!user || !plan) return // Don’t fetch if no user or plan isn’t loaded
  let isMounted = true

  const fetchData = async () => {
    try {
      const { data: clientsData } = await supabase
        .from("clients")
        .select("*")
        .order("created_at", { ascending: false }) as unknown as { data: Client[] }

      const { data: followUpsData } = await supabase
        .from("follow_ups")
        .select("*")
        .eq("status", "pending")
        .order("scheduled_date", { ascending: true }) as unknown as { data: FollowUp[] }

      if (isMounted) {
        setClients(clientsData || [])
        setFollowUps(followUpsData || [])
        setPlanLoaded(true)
      }
    } catch (error) {
      console.error("Error fetching client data:", error)
    }
  }

  fetchData()
  return () => {
    isMounted = false
  }
}, [user, plan])


  const getStatus = (date: string) => {
    const parsed = new Date(date)
    if (isPast(parsed) && !isToday(parsed)) return "Overdue"
    if (isToday(parsed)) return "Today"
    return format(parsed, "MMM d")
  }

  const getClientFollowUp = (clientId: string) => {
    return followUps.find(f => f.client_id === clientId)
  }

  const statusIcons = {
    Lead: Users,
    Quoted: Calendar,
    Scheduled: Clock,
    Completed: CheckCircle,
    Paid: CheckCircle,
  }

  const statusColors = {
    Lead: "text-gray-600",
    Quoted: "text-yellow-600",
    Scheduled: "text-indigo-600",
    Completed: "text-green-600",
    Paid: "text-blue-600",
  }

  const getStatusCounts = () => {
    const counts = { Lead: 0, Quoted: 0, Scheduled: 0, Completed: 0, Paid: 0 }
    clients.forEach((client) => {
      counts[client.job_status]++
    })
    return counts
  }

  const statusCounts = getStatusCounts()

  if (!user || !planLoaded) {
  return (
    <div className="h-screen flex items-center justify-center">
      <p className="text-gray-600 text-lg">Loading...</p>
    </div>
  )
}


  return (
    <div className="max-w-7xl mx-auto py-6 px-4 space-y-4">
      {plan === "free" && (
        <div className="rounded bg-yellow-100 p-4 text-yellow-800 shadow flex justify-between items-center mb-6">
          <div>
            <p className="font-semibold">You’re on the Free Plan</p>
            <p className="text-sm">Upgrade to unlock unlimited clients and PWA access.</p>
          </div>
          <UpgradeButton />
        </div>
      )}

      {plan === "pro" && <InstallAppButton />}

      <div className="flex justify-between items-center mb-6">
        <div className="flex gap-2">
          <Link href="/dashboard">
            {/* <Button variant="outline" size="sm">
              ← Back to Dashboard
            </Button> */}
          </Link>
          {/* <Button variant="ghost" size="sm" onClick={() => signOut()}>
            Logout
          </Button> */}
          
        </div>

        {plan === "pro" || clients.filter(c => c.user_id === user?.id).length < 5 ? (
          <Link href="/clients/new">
            <Button className="bg-blue-500 hover:bg-blue-600">Add Client</Button>
          </Link>
        ) : (
          <Button disabled title="Free plan allows up to 5 clients only.">
            Add Client (Limit Reached)
          </Button>
        )}
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            Job Status Summary
            <PlanBadge />
          </CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {Object.entries(statusCounts).map(([status, count]) => {
            const Icon = statusIcons[status as keyof typeof statusIcons]
            const color = statusColors[status as keyof typeof statusColors]
            return (
              <div key={status} className="bg-gray-50 border rounded-md p-4 text-center">
                <Icon className={`mx-auto mb-2 h-6 w-6 ${color}`} />
                <p className="text-sm text-gray-600 font-medium">{status}</p>
                <p className="text-2xl font-bold text-gray-900">{count}</p>
              </div>
            )
          })}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            Clients
            <PlanBadge />
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {clients.map(client => {
            const followUp = getClientFollowUp(client.id)
            return (
              <div key={client.id} className="border p-4 rounded-lg flex justify-between items-center">
                <div>
                  <Link href={`/clients/${client.id}`} className="text-lg font-semibold text-blue-600">
                    {client.name}
                  </Link>
                  <p className="text-sm text-gray-600">{client.phone}</p>
                  <p className="text-sm text-gray-500">{client.email}</p>
                </div>

                {followUp ? (
                  <div className="text-right">
                    <p className="text-sm font-medium text-gray-700">Follow-up</p>
                    <p className={`text-sm ${
                      getStatus(followUp.scheduled_date) === "Overdue"
                        ? "text-red-600"
                        : getStatus(followUp.scheduled_date) === "Today"
                        ? "text-orange-600"
                        : "text-gray-600"
                    }`}>
                      {getStatus(followUp.scheduled_date)}
                    </p>
                  </div>
                ) : (
                  <p className="text-sm text-gray-400">No follow-up</p>
                )}
              </div>
            )
          })}
        </CardContent>
      </Card>
    </div>
  )
}
