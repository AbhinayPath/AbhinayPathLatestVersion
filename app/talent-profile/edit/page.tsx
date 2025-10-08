'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/contexts/AuthContext'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import Image from 'next/image'
import { TalentProfile } from '@/lib/types/talent'
import ProfileSection from '@/components/talent-profile/ProfileSection'
import { Loader2 } from 'lucide-react'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { useMediaQuery } from '@/hooks/use-media-query'
import { ContactInfoDialog } from '@/components/ui/contact-info-dialog'

export default function EditTalentProfilePage() {
  const { user } = useAuth()
  const router = useRouter()
  const [profile, setProfile] = useState<TalentProfile | null>(null)
  const [experience, setExperience] = useState<any[]>([])
  const [education, setEducation] = useState<any[]>([])
  const [training, setTraining] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [dataLoading, setDataLoading] = useState({
    profile: true,
    experience: true,
    education: true,
    training: true
  })
  const [isMobile, setIsMobile] = useState(false)
  const [isUploading, setIsUploading] = useState(false)
  const [previewImage, setPreviewImage] = useState<string | null>(null)
  const [showPreview, setShowPreview] = useState(false)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const supabase = createClientComponentClient()

  // Handle file selection and preview
  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file || !profile) return

    // Validate file type
    if (!file.type.startsWith('image/')) {
      toast.error('Please select a valid image file')
      return
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast.error('Image size must be less than 5MB')
      return
    }

    // Create preview URL
    const previewUrl = URL.createObjectURL(file)
    setPreviewImage(previewUrl)
    setSelectedFile(file)
    setShowPreview(true)
  }

  // Handle photo upload after preview confirmation
  const handlePhotoUpload = async () => {
    if (!selectedFile || !profile) return

    setIsUploading(true)

    try {
      // Create a unique filename
      const fileExt = selectedFile.name.split('.').pop()
      const fileName = `${profile.id}-${Date.now()}.${fileExt}`
      const filePath = `profile-images/${fileName}`

      // Upload to Supabase Storage
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('talent-profiles')
        .upload(filePath, selectedFile, {
          cacheControl: '3600',
          upsert: false
        })

      if (uploadError) {
        throw uploadError
      }

      // Get the public URL
      const { data: { publicUrl } } = supabase.storage
        .from('talent-profiles')
        .getPublicUrl(filePath)

      // Update the profile with the new image URL
      const { error: updateError } = await supabase
        .from('talent_profiles')
        .update({ profile_image_url: publicUrl })
        .eq('id', profile.id)

      if (updateError) {
        throw updateError
      }

      // Update local state
      setProfile(prev => prev ? { ...prev, profile_image_url: publicUrl } : null)
      toast.success('Profile photo updated successfully!')
      
      // Clean up
      handleCancelPreview()

    } catch (error: any) {
      console.error('Error uploading image:', error)
      toast.error('Failed to update profile photo. Please try again.')
    } finally {
      setIsUploading(false)
    }
  }

  // Cancel preview and cleanup
  const handleCancelPreview = () => {
    if (previewImage) {
      URL.revokeObjectURL(previewImage)
    }
    setPreviewImage(null)
    setSelectedFile(null)
    setShowPreview(false)
  }

  const handleSectionUpdate = async (section: string, data: any) => {
    try {
      if (section === 'experience' || section === 'education' || section === 'training') {
        // For experience, education, and training, use the API endpoint that handles related tables
        const updateData = {
          profile: profile ? { id: profile.id } : null,
          experience: section === 'experience' ? data.experience : experience,
          education: section === 'education' ? data.education : education,
          training: section === 'training' ? data.training : training
        }

        const response = await fetch('/api/talent-profile', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(updateData)
        })

        if (!response.ok) {
          const errorData = await response.json()
          throw new Error(errorData.error || 'Failed to update profile')
        }

        const result = await response.json()
        
        // Update local state with the returned data
        if (result.data) {
          setProfile(result.data)
          setExperience(result.data.experience_records || [])
          setEducation(result.data.education_records || [])
          setTraining(result.data.training_records || [])
        } else {
          // Update local state based on section
          if (section === 'experience') {
            setExperience(data.experience || [])
          } else if (section === 'education') {
            setEducation(data.education || [])
          } else if (section === 'training') {
            setTraining(data.training || [])
          }
        }
      } else {
        // For profile fields (about, skills, languages), update talent_profiles table directly
        const { error } = await supabase
          .from('talent_profiles')
          .update(data)
          .eq('user_id', user?.id)

        if (error) {
          console.error('Error updating profile:', error)
          toast.error('Failed to update profile')
          return
        }

        // Update local state
        setProfile(prev => prev ? { ...prev, ...data } : null)
      }

      toast.success('Profile updated successfully')
    } catch (error: any) {
      console.error('Error updating profile:', error)
      toast.error('Failed to update profile: ' + error.message)
    }
  }

  useEffect(() => {
    if (!user) {
      router.push('/login')
      return
    }

    const fetchProfile = async () => {
      try {
        setError(null)
        setDataLoading({
          profile: true,
          experience: true,
          education: true,
          training: true
        })
        
        // Use the same API endpoint as talent-profile page for comprehensive data
        const response = await fetch('/api/talent-profile')
        
        if (response.ok) {
          const data = await response.json()
          
          // Set profile data with all fields
          setProfile({
            id: data.id,
            user_id: data.user_id,
            full_name: data.full_name,
            email: data.email,
            phone: data.phone,
            city: data.city,
            state: data.state,
            bio: data.bio,
            experience_level: data.experience_level,
            years_of_experience: data.years_of_experience,
            acting_skills: data.acting_skills,
            dance_styles: data.dance_styles,
            languages: data.languages,
            special_skills: data.special_skills,
            preferred_roles: data.preferred_roles,
            project_types: data.project_types,
            available_for_work: data.available_for_work,
            willing_to_relocate: data.willing_to_relocate,
            profile_status: data.profile_status,
            profile_image_url: data.profile_image_url,
            headshot_urls: data.headshot_urls,
            portfolio_videos: data.portfolio_videos,
            portfolio_images: data.portfolio_images,
            verified: data.verified,
            created_at: data.created_at,
            updated_at: data.updated_at,
          })
          
          // Set related data from API response
          setEducation(data.education_records || [])
          setExperience(data.experience_records || [])
          setTraining(data.training_records || [])
          
        } else {
          console.error('Error fetching profile:', response.statusText)
          setError('Failed to load profile data')
        }
      } catch (error: any) {
        console.error('Error fetching profile data:', error)
        setError('Failed to load profile data. Please try again.')
        toast.error('Error loading profile: ' + error.message)
      } finally {
        setLoading(false)
        setDataLoading({
          profile: false,
          experience: false,
          education: false,
          training: false
        })
      }
    }

    fetchProfile()
  }, [user, router, supabase])

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="flex flex-col items-center gap-4 p-8 rounded-lg bg-background/50 backdrop-blur-sm">
          <Loader2 className="h-10 w-10 animate-spin text-primary" />
          <p className="text-muted-foreground font-medium">Loading your profile...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md mx-auto">
            <h2 className="text-xl font-bold text-red-800 mb-2">Error Loading Profile</h2>
            <p className="text-red-600 mb-4">{error}</p>
            <Button 
              onClick={() => {
                setError(null)
                window.location.reload()
              }}
              variant="destructive"
            >
              Try Again
            </Button>
          </div>
        </div>
      </div>
    )
  }

  if (!profile) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen gap-4 p-8">
        <div className="bg-card p-8 rounded-lg shadow-lg max-w-md w-full text-center">
          <h1 className="text-2xl font-bold mb-4">Profile not found</h1>
          <p className="text-muted-foreground mb-6">Please complete your profile setup first.</p>
          <Button onClick={() => router.push('/')} className="w-full">Return to Home</Button>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-8 md:py-12 px-4 max-w-7xl">
      <div className="flex flex-col gap-2 mb-6 md:mb-10">
        <h1 className="text-xl md:text-2xl font-bold text-foreground">Edit Talent Profile</h1>
        <p className="text-muted-foreground text-base md:text-lg">Update your profile information to showcase your talents</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
        <div className="md:col-span-1 order-1 md:order-none gap-4 flex flex-col ">
          <Card className="overflow-hidden border-0 shadow-lg bg-white relative">
            
            <CardContent className="p-6 relative z-10">
              <div className="flex flex-col items-center text-center">
                {/* Profile Image */}
                <div className="relative group">
                  <div className="relative w-24 h-24 rounded-full overflow-hidden bg-white border-4 border-white shadow-lg mb-4 cursor-pointer transition-all duration-300 group-hover:shadow-xl">
                    {profile.profile_image_url ? (
                      <Image
                        src={profile.profile_image_url}
                        alt={profile.full_name || 'Profile'}
                        fill
                        className="object-cover transition-all duration-300 group-hover:scale-110"
                        sizes="96px"
                        priority
                      />
                    ) : (
                      <div className="flex items-center justify-center h-full w-full bg-gray-100 transition-all duration-300 group-hover:bg-gray-200">
                        <span className="text-gray-400 text-lg font-medium">
                          {profile.full_name?.charAt(0) || 'U'}
                        </span>
                      </div>
                    )}
                    
                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center rounded-full">
                      <div className="text-white text-center">
                        {isUploading ? (
                          <Loader2 className="w-6 h-6 mx-auto animate-spin" />
                        ) : (
                          <>
                            <svg className="w-6 h-6 mx-auto mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                            <span className="text-xs font-medium">Change</span>
                          </>
                        )}
                      </div>
                    </div>
                    
                    {/* Loading Overlay */}
                    {isUploading && (
                      <div className="absolute inset-0 bg-white/80 flex items-center justify-center rounded-full">
                        <Loader2 className="w-6 h-6 text-blue-500 animate-spin" />
                      </div>
                    )}
                  </div>
                  
                  {/* Hidden File Input */}
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileSelect}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    title="Click to change profile photo"
                    disabled={isUploading}
                  />
                </div>

                {/* User Info */}
                <div className="space-y-2 mb-4">
                  <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                    {profile.full_name || 'User Name'}
                    {profile.verified && (
                      <div className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
                        <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                    )}
                  </h2>
                  
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {profile.bio || `${profile.experience_level || 'Aspiring'} ${profile.acting_skills?.slice(0, 2).join(' | ') || 'Actor'} | ${profile.years_of_experience || 0}+ years`}
                  </p>
                  
                  <p className="text-sm text-gray-500">
                    {[profile.city, profile.state].filter(Boolean).join(', ') || 'Location not specified'}
                  </p>
                </div>

                {/* Contact Info Button */}
                <ContactInfoDialog profile={profile}>
                  <Button 
                    variant="outline" 
                    className="w-full bg-white/80 hover:bg-white border-gray-200 text-gray-700 hover:text-gray-900"
                  >
                    Contact info
                  </Button>
                </ContactInfoDialog>
              </div>
            </CardContent>
          </Card>

          <div>
            <ProfileSection
              title="Skills"
              data={{
                acting_skills: profile.acting_skills || [],
                dance_styles: profile.dance_styles || [],
                special_skills: profile.special_skills || []
              }}
              section="skills"
              onUpdate={handleSectionUpdate}
            />
          </div>

          <div>
            <ProfileSection
              title="Languages"
              data={{
                languages: profile.languages || []
              }}
              section="languages"
              onUpdate={handleSectionUpdate}
            />
          </div>

        </div>

        <div className="md:col-span-2">
          <div className="space-y-4">
            <ProfileSection
              title="About"
              data={{
                bio: profile.bio || '',
                full_name: profile.full_name || '',
                email: profile.email || '',
                phone: profile.phone || '',
                city: profile.city || '',
                state: profile.state || '',
                experience_level: profile.experience_level || '',
                years_of_experience: profile.years_of_experience || 0
              }}
              section="about"
              onUpdate={handleSectionUpdate}
            />

            <ProfileSection
              title="Work Experience"
              data={{
                experience: experience
              }}
              section="experience"
              onUpdate={handleSectionUpdate}
            />

            <ProfileSection
              title="Education"
              data={{
                education: education
              }}
              section="education"
              onUpdate={handleSectionUpdate}
            />

            <ProfileSection
              title="Training & Workshops"
              data={{
                training: training
              }}
              section="training"
              onUpdate={handleSectionUpdate}
            />
          </div>
        </div>
      </div>
    </div>
  )
}