"use client"

import { useEffect } from "react"
import Script from "next/script"

export function PlausibleAnalytics({ domain }: { domain: string }) {
  return (
    <>
      <Script defer data-domain={domain} src="https://plausible.io/js/script.js" strategy="afterInteractive" />
    </>
  )
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
