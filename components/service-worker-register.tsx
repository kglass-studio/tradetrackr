// components/service-worker-register.tsx
"use client"

import { useEffect } from "react"

export default function ServiceWorkerRegister() {
  useEffect(() => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker
        .register("/service-worker.js")
        .catch((err) => console.error("Service Worker registration failed:", err))
    }
  }, [])

  return null
}
