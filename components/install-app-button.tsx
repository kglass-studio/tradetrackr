"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"

export default function InstallAppButton() {
  const [deferredPrompt, setDeferredPrompt] = useState<Event | null>(null)
  const [isSupported, setIsSupported] = useState(false)

  useEffect(() => {
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault()
      setDeferredPrompt(e)
      setIsSupported(true)
    }

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt)

    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt)
    }
  }, [])

  const handleInstallClick = () => {
    if (!deferredPrompt) return

    // Cast to specific type for TS
    const promptEvent = deferredPrompt as any
    promptEvent.prompt()
    promptEvent.userChoice.then(() => {
      setDeferredPrompt(null)
      setIsSupported(false)
    })
  }

  if (!isSupported) return null

  return (
    <div className="bg-blue-100 border border-blue-300 text-blue-900 p-3 rounded flex items-center justify-between">
      <p className="text-sm font-medium">Install SaltCRM as an app on your device.</p>
      <Button onClick={handleInstallClick} size="sm" className="ml-4">
        Install
      </Button>
    </div>
  )
}
