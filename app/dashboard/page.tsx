"use client"

import { useEffect, useRef, useState, Suspense } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { supabase } from "@/lib/supabase"
import { useAuth } from "@/contexts/auth-context"
import type { Client, FollowUpWithClient } from "@/types"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, Calendar, Clock, CheckCircle } from "lucide-react"
import { format, isPast, isToday } from "date-fns"
import WelcomeBanner from "@/components/WelcomeBanner"
import { PlanBadge } from "@/components/PlanBadge"
import { UpgradeButton } from "@/components/UpgradeButton"

export default function DashboardPage() {
  const { user, authLoading, signOut } = useAuth()
  const router = useRouter()
  const [clients, setClients] = useState<Client[]>([])
  const [followUps, setFollowUps] = useState<FollowUpWithClient[]>([])
  const [plan, setPlan] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const hasMounted = useRef(false)

  const fetchUserPlan = async () => {
    if (!user) {
      console.warn("No user found when fetching plan")
      return
    }

    console.log("User ID:", user.id)

    const { data, error } = await supabase
      .from("profiles")
      .select("plan")
      .eq("id", user.id)
      .single()

    console.log("fetchUserPlan result:", data)
    if (error) {
      console.error("fetchUserPlan error:", error)
      return
    }

    setPlan(data?.plan || "free")
  }

  const fetchDashboardData = async () => {
    try {
      const { data: clientsData, error: clientsError } = await supabase
        .from("clients")
        .select("*")
        .order("created_at", { ascending: false })

      const { data: followUpsData, error: followUpsError } = await supabase
        .from("follow_ups")
        .select("*, clients(name)")
        .eq("status", "pending")
        .order("scheduled_date", { ascending: true })
        .limit(5)

      if (clientsError) throw clientsError
      if (followUpsError) throw followUpsError

      setClients(clientsData || [])
      setFollowUps(followUpsData || [])
    } catch (error) {
      console.error("Error fetching dashboard data:", error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (authLoading || hasMounted.current) return
    hasMounted.current = true
    if (!user) {
      router.push("/login")
      return
    }
    fetchDashboardData()
    fetchUserPlan()
  }, [authLoading, user])

  const getFollowUpStatus = (dateStr: string) => {
    const date = new Date(dateStr)
    if (isPast(date) && !isToday(date)) return "overdue"
    if (isToday(date)) return "today"
    return "upcoming"
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "overdue":
        return "text-red-600"
      case "today":
        return "text-orange-600"
      default:
        return "text-blue-600"
    }
  }

  const getStatusCounts = () => {
    const counts = { Lead: 0, Quoted: 0, Scheduled: 0, Completed: 0, Paid: 0 }
    clients.forEach((client) => {
      counts[client.job_status]++
    })
    return counts
  }

  const statusCounts = getStatusCounts()
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

  if (authLoading || loading || plan === null) {
    return (
      <div className="h-screen flex items-center justify-center">
        <p className="text-gray-600 text-lg">Loading...</p>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      <Suspense fallback={null}>
        <WelcomeBanner />
      </Suspense>

      {plan === "free" && (
        <div className="rounded bg-yellow-100 border border-yellow-300 p-4 shadow text-yellow-900 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <p className="font-semibold">You're currently on the free plan.</p>
            <p className="text-sm text-yellow-800">
              Upgrade to SaltCRM Pro for unlimited clients and advanced features.
            </p>
          </div>
          <UpgradeButton />
        </div>
      )}

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h1 className="text-3xl font-bold text-gray-900 flex items-center">
          Dashboard <PlanBadge />
        </h1>
        <div className="flex flex-wrap gap-2">
          <Link href="/clients/new">
            {plan === "pro" || clients.filter(c => c.user_id === user?.id).length < 5 ? (
              <Button>Add Client</Button>
            ) : (
              <Button disabled title="Free plan allows up to 5 clients only.">
                Add Client (Limit Reached)
              </Button>
            )}
          </Link>
          <UpgradeButton />
          <Button variant="ghost" size="sm" onClick={() => signOut()}>
            Logout
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Job Status Summary</CardTitle>
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
          <CardTitle>Upcoming Follow-ups</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {followUps.length === 0 ? (
            <p className="text-gray-600 text-sm">No upcoming follow-ups.</p>
          ) : (
            followUps.map((fup) => {
              const status = getFollowUpStatus(fup.scheduled_date)
              return (
                <div
                  key={fup.id}
                  className={`flex justify-between items-start border rounded-md px-4 py-2 ${getStatusColor(
                    status
                  )}`}
                >
                  <div>
                    <p className="font-medium">{fup.next_action}</p>
                    <p className="text-sm text-gray-700">
                      {fup.clients?.name} •{" "}
                      {format(new Date(fup.scheduled_date), "MMM d, yyyy h:mm a")} ({status})
                    </p>
                  </div>
                  <Link href={`/clients/${fup.client_id}`}>View</Link>
                </div>
              )
            })
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex justify-between items-center">
          <CardTitle>Recent Clients</CardTitle>
          <Link href="/clients">
            <Button variant="outline" size="sm">
              View All
            </Button>
          </Link>
        </CardHeader>
        <CardContent className="space-y-2">
          {clients.length === 0 ? (
            <p className="text-gray-600 text-sm">No clients found.</p>
          ) : (
            clients.slice(0, 5).map((client) => (
              <div
                key={client.id}
                className="flex justify-between items-center border rounded-md px-4 py-2"
              >
                <div>
                  <p className="font-medium">{client.name}</p>
                  <p className="text-sm text-gray-600">
                    {client.email || client.phone || "No contact info"} •{" "}
                    <span className="font-semibold">{client.job_status}</span>
                  </p>
                </div>
                <Link href={`/clients/${client.id}`}>
                  <Button size="sm" variant="ghost">
                    View
                  </Button>
                </Link>
              </div>
            ))
          )}
        </CardContent>
      </Card>
    </div>
  )
}
