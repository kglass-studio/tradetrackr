"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, Users, Calendar, LogOut } from "lucide-react"
import { useAuth } from "@/contexts/auth-context"
import { Button } from "@/components/ui/button"

export function MobileNav() {
  const pathname = usePathname()
  const { signOut } = useAuth()

  const navItems = [
    { href: "/dashboard", icon: Home, label: "Home" },
    { href: "/clients", icon: Users, label: "Clients" },
    { href: "/follow-ups", icon: Calendar, label: "Follow-ups" },
  ]

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-2 safe-area-pb">
      <div className="flex justify-around items-center">
        {navItems.map((item) => {
          const Icon = item.icon
          const isActive = pathname.startsWith(item.href)

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center py-2 px-3 rounded-lg transition-colors ${
                isActive ? "text-blue-600 bg-blue-50" : "text-gray-600 hover:text-gray-900"
              }`}
            >
              <Icon className="h-5 w-5" />
              <span className="text-xs mt-1">{item.label}</span>
            </Link>
          )
        })}

        <Button
          variant="ghost"
          size="sm"
          onClick={signOut}
          className="flex flex-col items-center py-2 px-3 text-gray-600 hover:text-gray-900"
        >
          <LogOut className="h-5 w-5" />
          <span className="text-xs mt-1">Sign Out</span>
        </Button>
      </div>
    </div>
  )
}
