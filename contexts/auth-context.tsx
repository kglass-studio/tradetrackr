"use client"

import { createContext, useContext, useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { toast } from "@/components/ui/use-toast"
import { supabase } from "@/lib/supabase"
import type { Session, User } from "@supabase/supabase-js"

type AuthContextType = {
  user: User | null
  session: Session | null
  authLoading: boolean
  plan: string | null;
  signOut: () => void
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  session: null,
  authLoading: true,
  plan: "free",
  signOut: () => {},
})

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [session, setSession] = useState<Session | null>(null)
  const [user, setUser] = useState<User | null>(null)
  const [authLoading, setAuthLoading] = useState(true)
  const [plan, setPlan] = useState<string | null>(null)

  const router = useRouter()

  useEffect(() => {
    const getSession = async () => {
      const { data: sessionData, error } = await supabase.auth.getSession()

      if (error) {
        console.error("🔴 Error fetching session:", error.message)
      }

      setSession(sessionData.session)
      setUser(sessionData.session?.user ?? null)
      setAuthLoading(false)

      if (sessionData.session?.user?.id) {
        const { data, error } = await supabase
          .from("profiles")
          .select("plan")
          .eq("id", sessionData.session.user.id)
          .single()

        if (!error && data?.plan) {
          setPlan(data.plan)
        } else {
          setPlan("free")
        }
      }
    }

    getSession()

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
      setUser(session?.user ?? null)
    })

    return () => {
      listener.subscription.unsubscribe()
    }
  }, [])

  const signOut = async () => {
    await supabase.auth.signOut()

    toast({
      title: "Signed out",
      description: "You’ve been signed out. See you soon!",
      action: (
        <button
          onClick={() => router.push("/login")}
          className="text-sm text-blue-600 hover:underline ml-2"
        >
          Log back in
        </button>
      ),
    })

    setTimeout(() => {
      router.push("/login")
    }, 1500)
  }

  return (
    <AuthContext.Provider value={{ user, session, authLoading, plan, signOut }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
