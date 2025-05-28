"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import Link from "next/link"
import { supabase } from "@/lib/supabase"
import type { ClientWithDetails } from "@/types"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, Edit, Phone, Mail, MapPin, ExternalLink } from "lucide-react"
import { ClientNotes } from "./client-notes"
import { ClientFollowUps } from "./client-follow-ups"

export default function ClientDetailPage() {
  const params = useParams()
  const router = useRouter()
  const [client, setClient] = useState<ClientWithDetails | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (params.id) {
      fetchClient()
    }
  }, [params.id])

  const fetchClient = async () => {
    try {
      const { data, error } = await supabase
        .from("clients")
        .select(`
          *,
          job_notes (*),
          follow_ups (*)
        `)
        .eq("id", params.id)
        .single()

      if (error) throw error
      setClient(data)
    } catch (error) {
      console.error("Error fetching client:", error)
      router.push("/clients")
    } finally {
      setLoading(false)
    }
  }

  const getStatusColor = (status: string) => {
    const colors = {
      Lead: "bg-blue-100 text-blue-800",
      Quoted: "bg-yellow-100 text-yellow-800",
      Scheduled: "bg-purple-100 text-purple-800",
      Completed: "bg-green-100 text-green-800",
      Paid: "bg-gray-100 text-gray-800",
    }
    return colors[status as keyof typeof colors] || "bg-gray-100 text-gray-800"
  }

  const openMaps = () => {
    if (client?.address) {
      const encodedAddress = encodeURIComponent(client.address)
      // Try to detect mobile platform
      const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent)
      const isAndroid = /Android/.test(navigator.userAgent)

      if (isIOS) {
        window.open(`maps://maps.apple.com/?q=${encodedAddress}`, "_blank")
      } else if (isAndroid) {
        window.open(`geo:0,0?q=${encodedAddress}`, "_blank")
      } else {
        window.open(`https://maps.google.com/maps?q=${encodedAddress}`, "_blank")
      }
    }
  }

  const callClient = () => {
    if (client?.phone) {
      window.open(`tel:${client.phone}`, "_self")
    }
  }

  const emailClient = () => {
    if (client?.email) {
      window.open(`mailto:${client.email}`, "_self")
    }
  }

  if (loading) {
    return (
      <div className="space-y-4">
        <div className="h-8 bg-gray-200 rounded animate-pulse"></div>
        <div className="h-32 bg-gray-200 rounded animate-pulse"></div>
        <div className="h-48 bg-gray-200 rounded animate-pulse"></div>
      </div>
    )
  }

  if (!client) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-600">Client not found</p>
        <Link href="/clients">
          <Button className="mt-4">Back to Clients</Button>
        </Link>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Link href="/clients">
          <Button variant="ghost" size="sm">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <div className="flex-1">
          <h1 className="text-2xl font-bold text-gray-900">{client.name}</h1>
          <span
            className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(client.job_status)}`}
          >
            {client.job_status}
          </span>
        </div>
        <Link href={`/clients/${client.id}/edit`}>
          <Button variant="outline" size="sm">
            <Edit className="h-4 w-4" />
          </Button>
        </Link>
      </div>

      {/* Contact Info */}
      <Card>
        <CardHeader>
          <CardTitle>Contact Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {client.phone && (
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Phone className="h-4 w-4 mr-3 text-gray-400" />
                <span>{client.phone}</span>
              </div>
              <Button variant="outline" size="sm" onClick={callClient}>
                Call
              </Button>
            </div>
          )}

          {client.email && (
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Mail className="h-4 w-4 mr-3 text-gray-400" />
                <span>{client.email}</span>
              </div>
              <Button variant="outline" size="sm" onClick={emailClient}>
                Email
              </Button>
            </div>
          )}

          {client.address && (
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <MapPin className="h-4 w-4 mr-3 text-gray-400" />
                <span className="flex-1">{client.address}</span>
              </div>
              <Button variant="outline" size="sm" onClick={openMaps}>
                <ExternalLink className="h-4 w-4" />
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Follow-ups */}
      <ClientFollowUps clientId={client.id} onUpdate={fetchClient} />

      {/* Notes */}
      <ClientNotes clientId={client.id} onUpdate={fetchClient} />
    </div>
  )
}
