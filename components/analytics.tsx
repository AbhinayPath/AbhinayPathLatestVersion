"use client"

import { Analytics as VercelAnalytics } from "@vercel/analytics/react"
import { useEffect, useState } from "react"

// Combined Analytics wrapper - includes Vercel Analytics by default
// Vercel Analytics works automatically when deployed to Vercel - no configuration needed
// Uses client-side mounting to avoid script tag issues in preview environments
export function Analytics() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  // Only render analytics after client-side hydration to avoid script tag warnings
  if (!mounted) return null

  return <VercelAnalytics />
}
