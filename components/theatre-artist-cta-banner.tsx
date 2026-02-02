"use client"

import Link from "next/link"
import { Sparkles, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

const REGISTRATION_FORM_URL = "https://docs.google.com/forms/d/e/1FAIpQLSeAHTz3-fdFQaU9Sht8u5h95K7-0dBWhksACEx8xkeoJRGPXw/viewform?usp=header"

export function TheatreArtistCTABanner() {
  return (
    <section className="px-4 py-6 sm:py-8">
      <div className="container">
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#2D1A54] via-[#3D2470] to-[#2D1A54] p-6 sm:p-8 md:p-10 lg:p-12">
          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#F5A623]/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-[#F5A623]/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
          
          <div className="relative z-10 flex flex-col items-center text-center space-y-4 sm:space-y-6">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#F5A623]/20 text-[#F5A623] text-sm font-medium">
              <Sparkles className="h-4 w-4" />
              <span>100% Free</span>
            </div>

            {/* Headline */}
            <h2 className="font-playfair text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white text-balance leading-tight max-w-3xl">
              🎭 Get Your Free Theatre Artist Profile on Abhinayपथ!
            </h2>

            {/* Subtext */}
            <p className="text-base sm:text-lg md:text-xl text-white/80 max-w-2xl text-pretty leading-relaxed">
              Be discoverable by casting calls, workshops, and theatre groups across India. 
              Create your professional profile in just <span className="text-[#F5A623] font-semibold">2-3 minutes</span> and 
              join a thriving community of theatre artists.
            </p>

            {/* CTA Button */}
            <Link 
              href={REGISTRATION_FORM_URL} 
              target="_blank" 
              rel="noopener noreferrer"
              className="mt-2"
            >
              <Button 
                size="lg" 
                className="bg-[#F5A623] text-[#2D1A54] hover:bg-[#e69b1e] font-semibold text-base sm:text-lg px-6 sm:px-8 py-5 sm:py-6 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
              >
                ✨ Create My Free Profile
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>

            {/* Trust indicator */}
            <p className="text-sm text-white/60 mt-2">
              Join 50+ artists already on the platform
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
