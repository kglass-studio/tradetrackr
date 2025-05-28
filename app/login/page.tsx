"use client"

import { useState, useEffect } from "react"
import type { FormEvent } from "react"
import { useRouter } from "next/navigation"
import { supabase } from "@/lib/supabase"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useAuth } from "@/contexts/auth-context"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState("")
  const router = useRouter()
  const { user } = useAuth()
  console.log("LoginPage rendered. User:", user);

  useEffect(() => {
    if (user) {
      console.log("LoginPage - User truthy, replacing history to /dashboard");
      router.replace("/dashboard");
    }
  }, [user, router]);// Removed router from dependency array for this test

  // Single function for magic link (works for both new and existing users)
  const handleMagicLink = async (e: FormEvent) => {
  e.preventDefault()
  setLoading(true)
  setMessage("")

  // Log everything about the current environment
  console.log("=== DEBUGGING SUPABASE EMAIL ===")
  console.log("Current URL:", window.location.href)
  console.log("Origin:", window.location.origin)
  console.log("Supabase URL:", process.env.NEXT_PUBLIC_SUPABASE_URL)
  
  const { data, error } = await supabase.auth.signInWithOtp({
    email,
    // Let's try with NO options at all
  })

  console.log("Full Supabase response:", JSON.stringify({ data, error }, null, 2))
  
  if (error) {
    setMessage(error.message)
  } else {
    setMessage("Check your email - and tell me which template you actually received!")
  }
  setLoading(false)
}

  // if (user) {
  //   return null // Will redirect
  // }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold text-blue-600">TradeTrackr</CardTitle>
          <CardDescription>Simple CRM for contractors</CardDescription>
        </CardHeader>

        {/* This is where the new CardContent goes - replacing the old Tabs content */}
        <CardContent>
          <form onSubmit={handleMagicLink} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </div>
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Sending secure link..." : "Send Login Link"}
            </Button>
            <p className="text-xs text-gray-600 text-center">
              We'll send you a secure link to sign in instantly. Works for new and existing accounts.
            </p>
          </form>

          {message && <div className="mt-4 text-sm text-center text-green-600">{message}</div>}
        </CardContent>
      </Card>
    </div>
  )
}
