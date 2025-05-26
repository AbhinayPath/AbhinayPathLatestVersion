"use client"

import { Suspense } from "react"
import AuditionsContent from "@/components/auditions-content"

export default function AuditionsPage() {
  return (
    <Suspense fallback={<div className="container py-12">Loading auditions...</div>}>
      <AuditionsContent />
    </Suspense>
  )
}
