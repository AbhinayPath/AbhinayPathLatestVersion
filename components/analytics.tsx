"use client"

import { useEffect, useState } from "react"

export function PlausibleAnalytics({ domain }: { domain: string }) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    // Load Plausible script dynamically after mount
    if (typeof window !== "undefined" && domain) {
      const script = document.createElement("script")
      script.defer = true
      script.setAttribute("data-domain", domain)
      script.src = "https://plausible.io/js/script.js"
      document.head.appendChild(script)

      return () => {
        // Cleanup on unmount
        if (script.parentNode) {
          script.parentNode.removeChild(script)
        }
      }
    }
  }, [domain])

  return null
}

export function PostHogAnalytics({ apiKey }: { apiKey: string }) {
  useEffect(() => {
    // Initialize PostHog
    if (typeof window !== "undefined") {
      import("posthog-js").then((posthog) => {
        posthog.default.init(apiKey, {
          api_host: "https://app.posthog.com",
          loaded: (ph) => {
            if (process.env.NODE_ENV === "development") ph.opt_out_capturing()
          },
        })
      })
    }
  }, [apiKey])

  return null
}
