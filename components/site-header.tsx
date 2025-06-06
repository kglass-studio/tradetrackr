"use client"

import Link from "next/link"
import Image from "next/image"
import { useAuth } from "@/contexts/auth-context"
import { Button } from "@/components/ui/button"
import { PlanBadge } from "@/components/PlanBadge"

const SiteHeader = () => {
  const { user, signOut, plan } = useAuth()

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-white border-b shadow-sm">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo + App Name */}
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center gap-2">
            <Image src="/saltcrm-logo.png" alt="SaltCRM Logo" width={100} height={100} />
            {/* <span className="text-xl font-bold text-gray-800">SaltCRM</span> */}
          </Link>
          {user && plan && <PlanBadge />}
        </div>

        {/* Navigation */}
        <nav className="flex items-center gap-4">
          {user ? (
            <>
              <Link href="/dashboard" className="text-sm text-gray-700 hover:text-blue-600">
                Dashboard
              </Link>
              <Link href="/account" className="text-sm text-gray-700 hover:text-blue-600">
                Account
              </Link>
              <Button variant="ghost" size="sm" onClick={signOut}>
                Logout
              </Button>
            </>
          ) : (
            <>
              <Link href="/login" className="text-sm text-gray-700 hover:text-blue-600">
                Log In
              </Link>
              <Link href="/signup" className="text-sm text-gray-700 hover:text-blue-600">
                Sign Up
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  )
}

export default SiteHeader
