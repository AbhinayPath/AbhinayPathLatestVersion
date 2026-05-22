"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/contexts/AuthContext"
import { Skeleton } from "@/components/ui/skeleton"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import Link from "next/link"
import { AlertCircle, ArrowRight } from "lucide-react"

// Import view components
import { HeroSection } from "@/components/talent-profile-view/HeroSection"
import { AboutCard } from "@/components/talent-profile-view/AboutCard"
import { ExperienceTimeline } from "@/components/talent-profile-view/ExperienceTimeline"
import { ProjectsPortfolio } from "@/components/talent-profile-view/ProjectsPortfolio"
import { SkillsSection } from "@/components/talent-profile-view/SkillsSection"
import { EducationCard } from "@/components/talent-profile-view/EducationCard"
import { CertificationsCard } from "@/components/talent-profile-view/CertificationsCard"
import { FeaturedContent } from "@/components/talent-profile-view/FeaturedContent"
import { ActivityFeed } from "@/components/talent-profile-view/ActivityFeed"
import { RecommendationsCard } from "@/components/talent-profile-view/RecommendationsCard"
import { RightSidebar } from "@/components/talent-profile-view/RightSidebar"

import { TalentProfile, TalentEducation, TalentExperience, TalentTraining } from "@/lib/types/talent"

export default function TalentProfileViewPage() {
  const { user, loading: authLoading, profile: authProfile } = useAuth()
  const router = useRouter()

  const [profile, setProfile] = useState<Partial<TalentProfile> | null>(null)
  const [education, setEducation] = useState<Partial<TalentEducation>[]>([])
  const [experience, setExperience] = useState<Partial<TalentExperience>[]>([])
  const [training, setTraining] = useState<Partial<TalentTraining>[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!authLoading) {
      if (!user) {
        router.push('/login?callbackUrl=/talent-profile')
      } else if (authProfile && authProfile.type !== 'artist') {
        toast.error('Access Denied', {
          description: 'Only artists have a talent profile.',
        })
        router.push('/')
      }
    }
  }, [user, authProfile, authLoading, router])

  useEffect(() => {
    const loadProfile = async () => {
      if (!user) return

      try {
        const response = await fetch('/api/talent-profile', { cache: 'no-store' })
        console.log('Fetched profile response', await response.clone().text())
        if (response.ok) {
          const data = await response.json();
          if (data) {
            setProfile(data);
            setEducation(data.education_records || []);
            setExperience(data.experience_records || []);
            setTraining(data.training_records || []);
          } else {
            // User does not have a profile yet - bypass setup and render empty profile view
            setProfile({
              id: '',
              user_id: user.id,
              full_name: user?.user_metadata?.full_name || '',
              email: user?.email || '',
            });
            setEducation([]);
            setExperience([]);
            setTraining([]);
          }
        } else {
          // API request error
          toast.error("Failed to load profile details")
        }
      } catch (error) {
        console.error('Error loading profile:', error)
      } finally {
        setLoading(false)
      }
    }

    if (user && !authLoading) {
      loadProfile()
    }
  }, [user, authLoading, router])

  const handleUpdateSection = async (section: string, data: any) => {
    try {
      const updateData = {
        profile: profile,
        experience: section === 'experience' ? data.experience : experience,
        education: section === 'education' ? data.education : education,
        training: section === 'training' ? data.training : training,
        ...data // For top-level profile fields like bio, etc.
      }

      // If it's a profile update (not array), merge into profile
      if (section !== 'experience' && section !== 'education' && section !== 'training') {
        updateData.profile = { ...profile, ...data };
      }

      const method = profile?.id ? 'PUT' : 'POST'
      const response = await fetch('/api/talent-profile', {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updateData)
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Failed to update profile')
      }

      const result = await response.json()

      // Update local state
      if (result.data || result) {
        console.log('Update result', result)
        const returnedData = result.data || result;
        if (returnedData.id) {
          console.log('Returned profile data', returnedData)
          console.log('Training records length', returnedData.training_records?.length)
          setProfile(returnedData)
          setEducation(returnedData.education_records || [])
          setExperience(returnedData.experience_records || [])
          setTraining(returnedData.training_records || [])
        }
      }

      toast.success('Profile updated successfully!');
    } catch (error: any) {
      console.error('Error updating profile:', error)
      toast.error('Failed to update profile: ' + error.message)
    }
  }

  if (authLoading || loading) {
    return <ProfileSkeleton />
  }

  if (!profile) return null;

  const isEditable = user?.id === profile.user_id;

  // Calculate profile completeness fields
  const missingFields: string[] = [];
  const requiredFields = [
    { key: 'full_name', name: 'Full Name' },
    { key: 'phone', name: 'Phone Number' },
    { key: 'city', name: 'City' },
    { key: 'state', name: 'State' },
    { key: 'bio', name: 'Bio Description' },
    { key: 'acting_skills', name: 'Acting Skills', isArray: true },
    { key: 'languages', name: 'Languages', isArray: true },
    { key: 'portfolio_images', name: 'Portfolio Images', isArray: true },
    { key: 'portfolio_videos', name: 'Portfolio Videos', isArray: true }
  ];

  requiredFields.forEach(field => {
    const val = profile[field.key as keyof TalentProfile]
    if (field.isArray) {
      if (!val || (val as any).length === 0) missingFields.push(field.name);
    } else {
      if (!val || (val as string).trim().length === 0) missingFields.push(field.name);
    }
  });

  const isComplete = missingFields.length === 0;

  return (
    <div className="min-h-screen bg-[#F3F2EF] font-sans pb-12">
      <div className="container mx-auto px-4 py-8 max-w-6xl">

        {/* Actionable Profile Completeness Banner */}
        {!isComplete && isEditable && (
          <div className="bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-2xl p-6 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
            <div className="space-y-2">
              <h3 className="text-amber-900 font-semibold flex items-center gap-2">
                <AlertCircle className="h-5 w-5 text-amber-600 shrink-0" />
                Complete Your Talent Profile
              </h3>
              <p className="text-amber-800 text-sm">
                Your profile is incomplete. Casting directors and recruiters prioritize profiles with complete details and media.
              </p>
              <div className="flex flex-wrap items-center gap-2 mt-2">
                <span className="text-xs font-semibold text-amber-700">Missing fields:</span>
                {missingFields.map((field, idx) => (
                  <span key={idx} className="bg-amber-100/60 border border-amber-200/50 text-amber-800 text-xs px-2.5 py-0.5 rounded-full font-medium">
                    {field}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

          {/* Main Content Area */}
          <div className="lg:col-span-8 space-y-6">
            <HeroSection profile={profile} isEditable={isEditable} onUpdate={handleUpdateSection} />
            <AboutCard profile={profile} isEditable={isEditable} onUpdate={handleUpdateSection} />
            <ExperienceTimeline experience={experience} isEditable={isEditable} onUpdate={handleUpdateSection} />
            <ProjectsPortfolio
              portfolioImages={profile.portfolio_images || []}
              portfolioVideos={profile.portfolio_videos || []}
              isEditable={isEditable}
              onUpdate={handleUpdateSection}
            />
            <SkillsSection profile={profile} isEditable={isEditable} onUpdate={handleUpdateSection} />
            <EducationCard education={education} isEditable={isEditable} onUpdate={handleUpdateSection} />
            <CertificationsCard training={training} isEditable={isEditable} onUpdate={handleUpdateSection} />

          </div>

          {/* Right Sidebar */}
          <div className="lg:col-span-4 hidden md:block">
            <RightSidebar profile={profile} />
          </div>

        </div>
      </div>
    </div>
  )
}

function ProfileSkeleton() {
  return (
    <div className="min-h-screen bg-[#F3F2EF] pb-12">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-8 space-y-6">
            <div className="bg-white rounded-2xl p-6 h-80 flex flex-col justify-end gap-4 shadow-sm">
              <Skeleton className="w-32 h-32 rounded-full absolute top-12" />
              <Skeleton className="h-8 w-1/3" />
              <Skeleton className="h-4 w-2/3" />
              <div className="flex gap-2">
                <Skeleton className="h-10 w-24 rounded-full" />
                <Skeleton className="h-10 w-24 rounded-full" />
              </div>
            </div>
            <div className="bg-white rounded-2xl p-6 space-y-4 shadow-sm">
              <Skeleton className="h-6 w-1/4" />
              <Skeleton className="h-20 w-full" />
            </div>
            <div className="bg-white rounded-2xl p-6 space-y-4 shadow-sm">
              <Skeleton className="h-6 w-1/4" />
              <Skeleton className="h-16 w-full" />
              <Skeleton className="h-16 w-full" />
            </div>
          </div>
          <div className="lg:col-span-4 hidden md:block space-y-6">
            <div className="bg-white rounded-2xl p-6 space-y-4 shadow-sm">
              <Skeleton className="h-6 w-1/3" />
              <Skeleton className="h-12 w-full" />
              <Skeleton className="h-12 w-full" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
