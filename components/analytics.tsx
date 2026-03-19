"use client"

import { useEffect, useState } from "react"

// Analytics wrapper that only loads Vercel Analytics in production environments
// Completely avoids loading the analytics module in v0 preview to prevent script tag warnings
export function Analytics() {
  const [AnalyticsComponent, setAnalyticsComponent] = useState<React.ComponentType | null>(null)

  useEffect(() => {
    // Check if running in v0 preview environment
    const isV0Preview = 
      window.location.hostname.includes("vusercontent.net") || 
      window.location.hostname.includes("v0.dev") ||
      window.location.hostname === "localhost"

    // Only load analytics in production (deployed to Vercel)
    if (!isV0Preview) {
      import("@vercel/analytics/react").then((mod) => {
        setAnalyticsComponent(() => mod.Analytics)
      })
    }
  }, [])

  if (!AnalyticsComponent) return null

  return <AnalyticsComponent />
}
