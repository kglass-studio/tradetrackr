'use client'

import { useAuth } from "@/contexts/auth-context"

export function PlanBadge() {
  const { plan } = useAuth()
  const isPro = plan === "pro"

  return (
    <span
      className={`ml-2 px-2 py-1 text-xs rounded font-semibold shadow ${
        isPro
          ? "bg-green-100 text-green-800 border border-green-300"
          : "bg-gray-100 text-gray-700 border border-gray-300"
      }`}
    >
      {isPro ? "Pro User" : "Free Plan"}
    </span>
  )
}
