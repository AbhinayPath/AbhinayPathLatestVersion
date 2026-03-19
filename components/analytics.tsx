"use client"

import dynamic from "next/dynamic"

// Dynamically import Vercel Analytics with SSR disabled to prevent script tag issues
// This ensures analytics only loads on the client after hydration in production
const VercelAnalytics = dynamic(
  () => import("@vercel/analytics/react").then((mod) => mod.Analytics),
  { ssr: false }
)

// Combined Analytics wrapper - includes Vercel Analytics by default
// Vercel Analytics works automatically when deployed to Vercel - no configuration needed
// Uses dynamic import with ssr:false to completely avoid server-side script rendering
export function Analytics() {
  // Check if running in v0 preview environment (sandbox/iframe) to avoid script errors
  const isV0Preview = typeof window !== "undefined" && 
    (window.location.hostname.includes("vusercontent.net") || 
     window.location.hostname.includes("v0.dev"))

  // Skip analytics in v0 preview to avoid script tag errors
  // Analytics will work properly when deployed to Vercel
  if (isV0Preview) return null

  return <VercelAnalytics />
}
