'use client'

import { useSearchParams } from 'next/navigation'

export default function WelcomeBanner() {
  const searchParams = useSearchParams()
  const msg = searchParams.get('msg')

  if (msg !== 'welcome') return null

  return (
    <div className="rounded bg-green-100 p-3 text-green-800 font-medium shadow">
      Welcome back!
    </div>
  )
}
