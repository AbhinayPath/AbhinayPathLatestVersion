import { Analytics as VercelAnalytics } from "@vercel/analytics/react"

// Combined Analytics wrapper - includes Vercel Analytics by default
// Vercel Analytics works automatically when deployed to Vercel - no configuration needed
export function Analytics() {
  return <VercelAnalytics />
}
