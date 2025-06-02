'use client'

import { useAuth } from "@/contexts/auth-context"

export function UpgradeButton() {
  const { plan } = useAuth()

  if (plan === "pro") return null

  return (
    <a
      href="https://payhip.com/order?link=aOYT4&pricing_plan=Q9zO4L0VBx"
      target="_blank"
      rel="noopener noreferrer"
    >
      <button className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded shadow text-sm">
        Upgrade to Pro
      </button>
    </a>
  )
}
