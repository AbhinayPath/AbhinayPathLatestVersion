"use client"
import { useAuth } from '@/contexts/AuthContext'
import OrganisationRegistrationSection from '@/features/organisation/components/organisation-registration-section'
import { OrganisationRegistrationForm } from '@/features/organisation/components/OrganisationRegistrationForm'
import { Building2 } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React, { useEffect } from 'react'

function page() {
  const { profile } = useAuth()
  const router = useRouter()
  useEffect(() => {
    if (profile && profile.completion_percentage > 50) {
      router.push("/")
    }
  }, [profile, router])

  if (!profile || profile.completion_percentage > 50) {
    return null
  }
  return (
    <div className="min-h-screen py-8 px-4 bg-gradient-warm">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8 animate-fade-in">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            <Building2 className="w-4 h-4" />
            Quick Registration
          </div>
          <h1 className="font-display text-3xl sm:text-4xl font-semibold text-foreground mb-2">
            Register Your Organisation
          </h1>
          <p className="text-muted-foreground max-w-md mx-auto">
            Join our creative community in just 2-3 minutes. Fields marked with * are required.
          </p>
        </div>

        {/* Form Card */}
        
          <OrganisationRegistrationSection profileId={profile?.id || ""} />
      </div>
    </div>
  )
}

export default page