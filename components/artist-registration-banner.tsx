"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { X, Sparkles, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export function ArtistRegistrationBanner() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    // Show banner after a short delay
    const timer = setTimeout(() => {
      setIsVisible(true)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  if (!isVisible) return null

  return (
    <div
      className={cn(
        "fixed bottom-0 left-0 right-0 z-50 p-4 transition-transform duration-500 ease-in-out transform",
        isVisible ? "translate-y-0" : "translate-y-full",
      )}
    >
      <div className="max-w-4xl mx-auto bg-[#2D1A54] text-white rounded-xl shadow-2xl p-4 md:p-6 flex flex-col md:flex-row items-center justify-between gap-4 border border-[#F5A623]/30 relative overflow-hidden">
        {/* Decorative background element */}
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-[#F5A623]/10 to-transparent pointer-events-none" />

        <div className="flex items-center gap-4 relative z-10">
          <div className="bg-[#F5A623] p-3 rounded-full hidden md:block">
            <Sparkles className="h-6 w-6 text-[#2D1A54]" />
          </div>
          <div>
            <h3 className="font-bold text-lg md:text-xl text-[#F5A623] mb-1">Calling All Artists!</h3>
            <p className="text-sm md:text-base text-white/90">Get your Free Profile on Abhinayपथ.</p>
          </div>
        </div>

        <div className="flex items-center gap-3 relative z-10 w-full md:w-auto">
          <Link href="/artists-registration" className="w-full md:w-auto">
            <Button className="w-full md:w-auto bg-[#F5A623] text-[#2D1A54] hover:bg-[#e69b1e] font-medium rounded-full">
              Register Now <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
          <button
            onClick={() => setIsVisible(false)}
            className="text-white/60 hover:text-white p-2 rounded-full hover:bg-white/10 transition-colors"
            aria-label="Close banner"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  )
}
