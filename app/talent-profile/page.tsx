"use client"

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/contexts/AuthContext'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { Progress } from '@/components/ui/progress'
import { toast } from 'sonner'
import { 
  Camera, 
  Upload, 
  X, 
  Plus, 
  Trash2, 
  Save, 
  Eye, 
  User, 
  MapPin, 
  Briefcase, 
  GraduationCap,
  Award,
  Star,
  Film,
  Music,
  Palette,
  Globe,
  Phone,
  Mail,
  AlertCircle
} from 'lucide-react'
import {
  TalentProfile,
  TalentEducation,
  TalentExperience,
  TalentTraining,
  EXPERIENCE_LEVELS,
  PROJECT_TYPES,
  ACTING_SKILLS,
  DANCE_STYLES,
  INDIAN_LANGUAGES,
  INDIAN_STATES,
  PREFERRED_ROLES,
  SPECIAL_SKILLS
} from '@/lib/types/talent'

// Import the step components
import {
  BasicInfoStep,
  ProfessionalStep,
  EducationStep,
  PortfolioStep,
  ReviewStep
} from '@/components/talent-profile-steps'

// Add React import for createElement
import React from 'react'

const STEPS = [
  { id: 1, title: 'Basic Info', icon: User, description: 'Personal details and contact information' },
  { id: 2, title: 'Professional', icon: Briefcase, description: 'Experience, skills, and specializations' },
  { id: 3, title: 'Education', icon: GraduationCap, description: 'Educational background and training' },
  { id: 4, title: 'Portfolio', icon: Camera, description: 'Photos, videos, and media showcase' },
  { id: 5, title: 'Review', icon: Eye, description: 'Review and publish your profile' }
]

export default function TalentProfileUploadPage() {
  const { user, loading } = useAuth()
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(1)
  const [saving, setSaving] = useState(false)
  const [uploading, setUploading] = useState(false)

  // Profile data states
  const [profile, setProfile] = useState<Partial<TalentProfile>>({
    full_name: '',
    email: user?.email || '',
    phone: '',
    city: '',
    state: '',
    bio: '',
    experience_level: 'Beginner',
    years_of_experience: 0,
    acting_skills: [],
    dance_styles: [],
    languages: [],
    special_skills: [],
    preferred_roles: [],
    project_types: [],
    available_for_work: true,
    willing_to_relocate: false,
    profile_status: 'draft'
  })

  const [education, setEducation] = useState<Partial<TalentEducation>[]>([])
  const [experience, setExperience] = useState<Partial<TalentExperience>[]>([])
  const [training, setTraining] = useState<Partial<TalentTraining>[]>([])

  // Media states
  const [profileImage, setProfileImage] = useState<string>('')
  const [headshots, setHeadshots] = useState<string[]>([])
  const [portfolioImages, setPortfolioImages] = useState<string[]>([])
  const [portfolioVideos, setPortfolioVideos] = useState<string[]>([])

  // Validation functions for each step
  const validateStep1 = () => {
    const missingFields = []
    
    if (!profile.full_name?.trim()) missingFields.push('Full Name')
    if (!profile.email?.trim()) missingFields.push('Email')
    if (!profile.phone?.trim()) missingFields.push('Phone')
    if (!profile.city?.trim()) missingFields.push('City')
    if (!profile.state?.trim()) missingFields.push('State')
    if (!profile.bio?.trim()) missingFields.push('Bio')
    
    return missingFields
  }

  const validateStep2 = () => {
    const missingFields = []
    
    if (!profile.experience_level) missingFields.push('Experience Level')
    if (profile.acting_skills?.length === 0) missingFields.push('At least one Acting Skill')
    if (profile.languages?.length === 0) missingFields.push('At least one Language')
    
    return missingFields
  }

  const validateStep3 = () => {
    const missingFields = []
    
    // Education validation - at least one education entry with required fields
    if (education.length === 0) {
      missingFields.push('At least one Education entry')
    } else {
      const incompleteEducation = education.some(edu => 
        !edu.institution?.trim() || !edu.degree?.trim()
      )
      if (incompleteEducation) {
        missingFields.push('Complete Education details (Institution and Degree)')
      }
    }
    
    return missingFields
  }

  const validateStep4 = () => {
    const missingFields = []
    
    // At least one profile image is recommended
    if (!profileImage) {
      missingFields.push('Profile Image (recommended)')
    }
    
    return missingFields
  }

  const validateCurrentStep = () => {
    switch (currentStep) {
      case 1:
        return validateStep1()
      case 2:
        return validateStep2()
      case 3:
        return validateStep3()
      case 4:
        return validateStep4()
      default:
        return []
    }
  }

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login')
    }
  }, [user, loading, router])

  useEffect(() => {
    if (user?.email) {
      setProfile(prev => ({ ...prev, email: user.email }))
    }
  }, [user])

  // Load existing profile if it exists
  useEffect(() => {
    const loadProfile = async () => {
      if (!user) return

      try {
        const response = await fetch('/api/talent-profile')
        if (response.ok) {
          const data = ((d) => Array.isArray(d) ? d[0] : d)(await response.json());
          debugger
            setProfile({
              id: data.id,
              user_id: data.user_id,
              full_name: data.full_name,
              email: data.email,
              phone: data.phone,
              date_of_birth: data.date_of_birth,
              gender: data.gender,
              height: data.height,
              weight: data.weight,
              city: data.city,
              state: data.state,
              country: data.country,
              bio: data.bio,
              experience_level: data.experience_level,
              years_of_experience: data.years_of_experience,
              acting_skills: data.acting_skills,
              dance_styles: data.dance_styles,
              languages: data.languages,
              special_skills: data.special_skills,
              eye_color: data.eye_color,
              hair_color: data.hair_color,
              skin_tone: data.skin_tone,
              body_type: data.body_type,
              profile_image_url: data.profile_image_url,
              headshot_urls: data.headshot_urls,
              portfolio_videos: data.portfolio_videos,
              portfolio_images: data.portfolio_images,
              instagram_url: data.instagram_url,
              youtube_url: data.youtube_url,
              website_url: data.website_url,
              imdb_url: data.imdb_url,
              represented_by: data.represented_by,
              agent_contact: data.agent_contact,
              union_memberships: data.union_memberships,
              available_for_work: data.available_for_work,
              willing_to_relocate: data.willing_to_relocate,
              travel_radius: data.travel_radius,
              preferred_roles: data.preferred_roles,
              project_types: data.project_types,
              verified: data.verified,
              profile_status: data.profile_status,
              created_at: data.created_at,
              updated_at: data.updated_at,
            });
            setEducation((data.education_records || []).map((e: TalentEducation) => ({
              id: e.id,
              profile_id: e.profile_id,
              institution: e.institution,
              degree: e.degree,
              field_of_study: e.field_of_study,
              start_year: e.start_year,
              end_year: e.end_year,
              currently_studying: e.currently_studying,
              description: e.description,
              created_at: e.created_at,
            })));
            setExperience((data.experience_records || []).map((e: TalentExperience) => ({
              id: e.id,
              profile_id: e.profile_id,
              project_title: e.project_title,
              project_type: e.project_type,
              role: e.role,
              production_company: e.production_company,
              director: e.director,
              start_date: e.start_date,
              end_date: e.end_date,
              description: e.description,
              created_at: e.created_at,
            })));
            setTraining((data.training_records || []).map((e: TalentTraining) => ({
              id: e.id,
              profile_id: e.profile_id,
              workshop_name: e.workshop_name,
              instructor: e.instructor,
              institution: e.institution,
              start_date: e.start_date,
              end_date: e.end_date,
              skills_learned: e.skills_learned,
              certificate_url: e.certificate_url,
              description: e.description,
              created_at: e.created_at,
            })));
            setProfileImage(data.profile_image_url || '');
            setHeadshots(data.headshot_urls || []);
            setPortfolioImages(data.portfolio_images || []);
            setPortfolioVideos(data.portfolio_videos || []);
          
        }
      } catch (error) {
        console.error('Error loading profile:', error)
      }
    }

    loadProfile()
  }, [user])

  console.log('Profile:', profile)

  const handleInputChange = (field: keyof TalentProfile, value: any) => {
    setProfile(prev => ({ ...prev, [field]: value }))
  }

  const handleArrayFieldToggle = (field: keyof TalentProfile, value: string) => {
    setProfile(prev => {
      const currentArray = (prev[field] as string[]) || []
      const newArray = currentArray.includes(value)
        ? currentArray.filter(item => item !== value)
        : [...currentArray, value]
      return { ...prev, [field]: newArray }
    })
  }

  const addEducation = () => {
    setEducation(prev => [...prev, {
      institution: '',
      degree: '',
      field_of_study: '',
      start_year: new Date().getFullYear(),
      currently_studying: false
    }])
  }

  const updateEducation = (index: number, field: keyof TalentEducation, value: any) => {
    setEducation(prev => prev.map((edu, i) => 
      i === index ? { ...edu, [field]: value } : edu
    ))
  }

  const removeEducation = (index: number) => {
    setEducation(prev => prev.filter((_, i) => i !== index))
  }

  const addExperience = () => {
    setExperience(prev => [...prev, {
      project_title: '',
      project_type: 'Film',
      role: '',
      production_company: '',
      start_date: '',
      end_date: ''
    }])
  }

  const updateExperience = (index: number, field: keyof TalentExperience, value: any) => {
    setExperience(prev => prev.map((exp, i) => 
      i === index ? { ...exp, [field]: value } : exp
    ))
  }

  const removeExperience = (index: number) => {
    setExperience(prev => prev.filter((_, i) => i !== index))
  }

  const addTraining = () => {
    setTraining(prev => [...prev, {
      program_name: '',
      instructor: '',
      institution: '',
      start_date: '',
      end_date: '',
      description: '',
      certificate_earned: false
    }])
  }

  const updateTraining = (index: number, field: keyof TalentTraining, value: any) => {
    setTraining(prev => prev.map((train, i) => 
      i === index ? { ...train, [field]: value } : train
    ))
  }

  const removeTraining = (index: number) => {
    setTraining(prev => prev.filter((_, i) => i !== index))
  }

  const handleFileUpload = async (file: File, type: 'profile' | 'headshot' | 'portfolio') => {
    setUploading(true);
    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('type', type);

      const response = await fetch('/api/talent-profile/media', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        if (type === 'profile') {
          setProfileImage(data.url);
        } else if (type === 'headshot') {
          setHeadshots(prev => [...prev, data.url]);
        } else if (type === 'portfolio') {
          if (file.type.startsWith('video/')) {
            setPortfolioVideos(prev => [...prev, data.url]);
          } else {
            setPortfolioImages(prev => [...prev, data.url]);
          }
        }
        toast.success('File uploaded successfully!');
      } else {
        const error = await response.json();
        throw new Error(error.error || 'Upload failed');
      }
    } catch (error) {
      console.error('Upload error:', error);
      toast.error(error instanceof Error ? error.message : 'Upload failed');
    } finally {
      setUploading(false);
    }
  };

  const nextStep = () => {
    // Validate current step before proceeding
    const missingFields = validateCurrentStep()
    
    if (missingFields.length > 0) {
      toast.error(
        `Please complete all required fields before proceeding: ${missingFields.join(', ')}`,
        {
          description: 'All fields marked with * are mandatory.',
          duration: 6000,
          icon: <AlertCircle className="text-red-500" />,
        }
      )
      return
    }

    if (currentStep < STEPS.length) {
      setCurrentStep(currentStep + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const saveProfile = async (status: 'draft' | 'published' = 'draft') => {
    setSaving(true);
    try {
      const profileData = {
        ...profile,
        profile_image_url: profileImage,
        headshot_urls: headshots,
        portfolio_images: portfolioImages,
        portfolio_videos: portfolioVideos,
        profile_status: status,
      };
      const payload = {
        profile: profileData,
        education,
        experience,
        training,
      };

      
      const response = await fetch('/api/talent-profile', {
        method: profile?.id ? 'PUT' : 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
        credentials: 'include',
      });
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to save profile');
      }
      const data = await response.json();
      setProfile(data.profile);
      toast.success(status === 'published' ? 'Profile published successfully!' : 'Profile saved as draft!');
      if (status === 'published') {
        router.push('/profile');
      }
    } catch (error) {
      console.error('Save error:', error);
      toast.error(error instanceof Error ? error.message : 'Failed to save profile');
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p>Loading...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return null
  }

  const progress = (currentStep / STEPS.length) * 100

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="font-playfair text-4xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            Create Your Talent Profile
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Build a comprehensive profile to showcase your talents and connect with casting directors, 
            producers, and industry professionals.
          </p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            {STEPS.map((step, index) => {
              const Icon = step.icon
              const isActive = currentStep === step.id
              const isCompleted = currentStep > step.id
              
              return (
                <div key={step.id} className="flex flex-col items-center">
                  <div className={`
                    w-12 h-12 rounded-full flex items-center justify-center border-2 mb-2
                    ${isActive ? 'bg-primary border-primary text-white' : 
                      isCompleted ? 'bg-green-500 border-green-500 text-white' : 
                      'bg-white border-gray-300 text-gray-400'}
                  `}>
                    <Icon className="h-5 w-5" />
                  </div>
                  <span className={`text-sm font-medium ${isActive ? 'text-primary' : 'text-gray-500'}`}>
                    {step.title}
                  </span>
                </div>
              )
            })}
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        {/* Step Content */}
        <Card className="max-w-4xl mx-auto">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              {React.createElement(STEPS[currentStep - 1].icon, { className: "h-5 w-5" })}
              {STEPS[currentStep - 1].title}
            </CardTitle>
            <CardDescription>
              {STEPS[currentStep - 1].description}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Step 1: Basic Info */}
            {currentStep === 1 && (
              <BasicInfoStep 
                profile={profile || {}}
                onInputChange={handleInputChange}
              />
            )}

            {/* Step 2: Professional */}
            {currentStep === 2 && (
              <ProfessionalStep 
                profile={profile || {}}
                onInputChange={handleInputChange}
                onArrayFieldToggle={handleArrayFieldToggle}
              />
            )}

            {/* Step 3: Education */}
            {currentStep === 3 && (
              <EducationStep 
                education={education   || {}}
                experience={experience || {}}
                training={training || {}}
                onAddEducation={addEducation}
                onUpdateEducation={updateEducation}
                onRemoveEducation={removeEducation}
                onAddExperience={addExperience}
                onUpdateExperience={updateExperience}
                onRemoveExperience={removeExperience}
                onAddTraining={addTraining}
                onUpdateTraining={updateTraining}
                onRemoveTraining={removeTraining}
              />
            )}

            {/* Step 4: Portfolio */}
            {currentStep === 4 && (
              <PortfolioStep 
                profileImage={profileImage || ''}
                headshots={headshots || []}
                portfolioImages={portfolioImages || []}
                portfolioVideos={portfolioVideos || []}
                onFileUpload={handleFileUpload}
                uploading={uploading}
              />
            )}

            {/* Step 5: Review */}
            {currentStep === 5 && (
              <ReviewStep 
                profile={profile || {}}
                education={education || {}}
                experience={experience || {}}
                training={training || {}}
                profileImage={profileImage || ''}
                headshots={headshots || []}
                portfolioImages={portfolioImages}
                portfolioVideos={portfolioVideos}
              />
            )}
          </CardContent>
          {/* Navigation */}
          <div className="flex justify-between pt-6 border-t">
            <Button 
              variant="outline" 
              onClick={prevStep}
              disabled={currentStep === 1}
            >
              Previous
            </Button>
            
            <div className="flex gap-2">
              <Button 
                variant="outline" 
                onClick={() => saveProfile('draft')}
                disabled={saving}
              >
                <Save className="h-4 w-4 mr-2" />
                Save Draft
              </Button>
              
              {currentStep === STEPS.length ? (
                <Button 
                  onClick={() => saveProfile('published')}
                  disabled={saving || !profile.full_name}
                  className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                >
                  <Star className="h-4 w-4 mr-2" />
                  Publish Profile
                </Button>
              ) : (
                <Button onClick={nextStep}>
                  Next
                </Button>
              )}
            </div>
          </div>
        </Card>
      </div>
    </div>
  )}