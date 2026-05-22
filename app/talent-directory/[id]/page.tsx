import { Metadata } from "next"
import { notFound } from "next/navigation"
import { getSupabaseServerComponentClient } from "@/lib/supabase-server"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"

// Import view components
import { HeroSection } from "@/components/talent-profile-view/HeroSection"
import { AboutCard } from "@/components/talent-profile-view/AboutCard"
import { ExperienceTimeline } from "@/components/talent-profile-view/ExperienceTimeline"
import { ProjectsPortfolio } from "@/components/talent-profile-view/ProjectsPortfolio"
import { SkillsSection } from "@/components/talent-profile-view/SkillsSection"
import { EducationCard } from "@/components/talent-profile-view/EducationCard"
import { CertificationsCard } from "@/components/talent-profile-view/CertificationsCard"
import { RightSidebar } from "@/components/talent-profile-view/RightSidebar"

export const dynamic = 'force-dynamic';

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const supabase = await getSupabaseServerComponentClient()
  const { data } = await supabase
    .from('talent_profiles')
    .select('full_name, bio, city, state')
    .eq('id', params.id)
    .single()

  if (!data) {
    return { title: "Profile Not Found - Abhinaypath" }
  }

  return {
    title: `${data.full_name || 'Talent'} - Abhinaypath Profile`,
    description: data.bio ? data.bio.substring(0, 160) : `Check out ${data.full_name}'s talent profile on Abhinaypath.`,
  }
}

export default async function TalentProfilePublicView({ params }: { params: { id: string } }) {
  const supabase = await getSupabaseServerComponentClient()

  // Fetch the complete profile
  const { data: profile, error } = await supabase
    .from('talent_profiles')
    .select(`
      *,
      education_records(*),
      experience_records(*),
      training_records(*),
      media_files(*)
    `)
    .eq('id', params.id)
    .single()

  if (error || !profile) {
    return (
      <div className="container mx-auto px-4 py-16 text-center min-h-[60vh] flex flex-col items-center justify-center">
        <div className="text-6xl mb-4">😔</div>
        <h1 className="text-3xl font-bold mb-2">Profile Not Found</h1>
        <p className="text-muted-foreground mb-8 max-w-md mx-auto">
          The talent profile you're looking for doesn't exist or has been removed.
        </p>
        <Button asChild className="bg-purple-600 hover:bg-purple-700">
          <Link href="/talent-directory">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Directory
          </Link>
        </Button>
      </div>
    )
  }

  const education = profile.education_records || [];
  const experience = profile.experience_records || [];
  const training = profile.training_records || [];
  const isEditable = false; // Public view is never editable

  return (
    <div className="min-h-screen bg-[#F3F2EF] font-sans pb-12 pt-6">
      <div className="container mx-auto px-4 max-w-6xl space-y-6">
        
        {/* Navigation */}
        <div className="flex justify-between items-center bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
          <Button variant="ghost" asChild className="text-gray-600 hover:text-purple-700 hover:bg-purple-50">
            <Link href="/talent-directory">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Directory
            </Link>
          </Button>
          <div className="text-sm font-medium text-gray-500">
            Public Talent Profile
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Main Content Area */}
          <div className="lg:col-span-8 space-y-6">
            <HeroSection profile={profile} isEditable={isEditable} />
            <AboutCard profile={profile} isEditable={isEditable} />
            <ExperienceTimeline experience={experience} isEditable={isEditable} />
            <ProjectsPortfolio
              portfolioImages={profile.portfolio_images || []}
              portfolioVideos={profile.portfolio_videos || []}
            />
            <SkillsSection profile={profile} isEditable={isEditable} />
            <EducationCard education={education} isEditable={isEditable} />
            <CertificationsCard training={training} isEditable={isEditable} />
          </div>

          {/* Right Sidebar */}
          <div className="lg:col-span-4 hidden md:block">
            <RightSidebar profile={profile} isEditable={isEditable} />
          </div>
        </div>
      </div>
    </div>
  )
}
