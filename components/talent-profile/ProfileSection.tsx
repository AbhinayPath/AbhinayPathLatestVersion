'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { MultiSelect, MultiSelectOption } from '@/components/ui/multiselect'
import { Edit, Save, X, Plus } from 'lucide-react'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { toast } from 'sonner'
import { ACTING_SKILLS, SPECIAL_SKILLS, INDIAN_LANGUAGES, INDIAN_STATES } from '@/lib/types/talent'

interface ProfileSectionProps {
  title: string
  section: string
  data: any
  onUpdate: (section: string, data: any) => void
}

export default function ProfileSection({ title, section, data, onUpdate }: ProfileSectionProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [editedData, setEditedData] = useState(data)
  const [newSkill, setNewSkill] = useState('')
  const [newSpecialSkill, setNewSpecialSkill] = useState('')
  const [newLanguage, setNewLanguage] = useState('')
  const [customSkill, setCustomSkill] = useState('')
  const [customSpecialSkill, setCustomSpecialSkill] = useState('')
  const [customLanguage, setCustomLanguage] = useState('')
  const [customState, setCustomState] = useState('')
  const supabase = createClientComponentClient()

  useEffect(() => {
    setEditedData(data)
  }, [data])

  const handleInputChange = (field: string, value: any) => {
    setEditedData({
      ...editedData,
      [field]: value
    })
  }

  const handleSave = async () => {
    setIsLoading(true)
    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) throw new Error('Not authenticated')

      // Get the talent profile ID
      const { data: profile } = await supabase
        .from('talent_profiles')
        .select('id')
        .eq('user_id', user.id)
        .single()

      if (!profile) throw new Error('Profile not found')

      // Separate data for different tables
      const { experience, education, training, ...talentProfileData } = editedData

      // Update talent_profiles table (excluding arrays)
      const { error: profileError } = await supabase
        .from('talent_profiles')
        .update(talentProfileData)
        .eq('user_id', user.id)

      if (profileError) throw profileError

      // Handle experience records
      if (experience && Array.isArray(experience)) {
        // Delete existing experience records
        await supabase
          .from('experience_records')
          .delete()
          .eq('talent_profile_id', profile.id)

        // Insert new experience records
        if (experience.length > 0) {
          const experienceRecords = experience.map(exp => {
            // Destructure to exclude id and other database-generated fields
            const { id, created_at, ...expData } = exp
            return {
              talent_profile_id: profile.id,
              project_title: expData.project_title,
              project_type: expData.project_type,
              role: expData.role,
              production_company: expData.production_company,
              start_date: expData.start_date,
              end_date: expData.end_date,
              description: expData.description
            }
          })

          const { error: expError } = await supabase
            .from('experience_records')
            .insert(experienceRecords)

          if (expError) throw expError
        }
      }

      // Handle education records
      if (education && Array.isArray(education)) {
        // Delete existing education records
        await supabase
          .from('education_records')
          .delete()
          .eq('talent_profile_id', profile.id)

        // Insert new education records
        if (education.length > 0) {
          const educationRecords = education.map(edu => {
            // Destructure to exclude id and other database-generated fields
            const { id, created_at, ...eduData } = edu
            return {
              talent_profile_id: profile.id,
              institution: eduData.institution,
              degree: eduData.degree,
              field_of_study: eduData.field_of_study,
              start_date: eduData.start_date,
              end_date: eduData.end_date,
              description: eduData.description
            }
          })

          const { error: eduError } = await supabase
            .from('education_records')
            .insert(educationRecords)

          if (eduError) throw eduError
        }
      }

      // Handle training records
      if (training && Array.isArray(training)) {
        // Delete existing training records
        await supabase
          .from('training_records')
          .delete()
          .eq('talent_profile_id', profile.id)

        // Insert new training records
        if (training.length > 0) {
          const trainingRecords = training.map(train => {
            // Destructure to exclude id and other database-generated fields
            const { id, created_at, ...trainData } = train
            return {
              talent_profile_id: profile.id,
              program_name: trainData.program_name,
              institution: trainData.institution,
              start_date: trainData.start_date,
              end_date: trainData.end_date,
              description: trainData.description
            }
          })

          const { error: trainError } = await supabase
            .from('training_records')
            .insert(trainingRecords)

          if (trainError) throw trainError
        }
      }

      onUpdate(section, editedData)
      setIsEditing(false)
      toast.success('Profile updated successfully!')
    } catch (error) {
      console.error('Error updating profile:', error)
      toast.error('Failed to update profile')
    } finally {
      setIsLoading(false)
    }
  }

  const addSkill = (skill: string, type: 'acting' | 'special') => {
    if (!skill) return
    
    const field = type === 'acting' ? 'acting_skills' : 'special_skills'
    const currentSkills = editedData[field] || []
    
    if (!currentSkills.includes(skill)) {
      setEditedData({
        ...editedData,
        [field]: [...currentSkills, skill]
      })
    }
    
    if (type === 'acting') {
      setNewSkill('')
    } else {
      setNewSpecialSkill('')
    }
  }

  const removeSkill = (skill: string, type: 'acting' | 'special') => {
    const field = type === 'acting' ? 'acting_skills' : 'special_skills'
    setEditedData({
      ...editedData,
      [field]: editedData[field].filter((s: string) => s !== skill)
    })
  }

  const addLanguage = (language: string) => {
    if (!language || editedData.languages.includes(language)) return
    
    setEditedData({
      ...editedData,
      languages: [...editedData.languages, language]
    })
    setNewLanguage('')
  }

  const removeLanguage = (language: string) => {
    setEditedData({
      ...editedData,
      languages: editedData.languages.filter((l: string) => l !== language)
    })
  }

  const renderContent = () => {
    if (isEditing) {
      switch (section) {
        case 'about':
          return (
            <div className="space-y-4">
              <div className="grid gap-2">
                <label htmlFor="bio" className="text-sm font-medium text-muted-foreground">Your Bio</label>
                <Textarea
                  id="bio"
                  value={editedData.bio || ''}
                  onChange={(e) => handleInputChange('bio', e.target.value)}
                  placeholder="Tell us about yourself, your background, interests and aspirations..."
                  className="min-h-[200px] resize-none focus:ring-2 focus:ring-primary/20 transition-all"
                />
                <p className="text-xs text-muted-foreground mt-1">A compelling bio helps casting directors understand your unique talents and personality.</p>
              </div>
              
              <div className="grid gap-2">
                <label htmlFor="state" className="text-sm font-medium text-muted-foreground">State</label>
                <Select
                  value={editedData.state || ''}
                  onValueChange={(value) => handleInputChange('state', value)}
                >
                  <SelectTrigger className="focus:ring-2 focus:ring-primary/20 transition-all">
                    <SelectValue placeholder="Select your state" />
                  </SelectTrigger>
                  <SelectContent>
                    {INDIAN_STATES.map((state) => (
                      <SelectItem key={state} value={state}>
                        {state}
                      </SelectItem>
                    ))}
                    <SelectItem value="Other">Other</SelectItem>
                  </SelectContent>
                </Select>
                {editedData.state === 'Other' && (
                   <div className="flex gap-2 mt-2">
                     <Input
                       value={customState}
                       onChange={(e) => setCustomState(e.target.value)}
                       placeholder="Enter your state"
                       className="flex-1"
                     />
                     <Button
                       onClick={() => {
                         if (customState.trim()) {
                           handleInputChange('state', customState.trim())
                           setCustomState('')
                         }
                       }}
                       size="sm"
                       className="px-3"
                     >
                       Add
                     </Button>
                   </div>
                 )}
              </div>
            </div>
          )
        
        case 'skills':
          return (
            <div className="space-y-8">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-medium text-foreground">Acting Skills</h3>
                  <Badge variant="outline" className="bg-primary/5 text-primary border-primary/20">
                    {editedData.acting_skills?.length || 0} skills
                  </Badge>
                </div>
                
                <MultiSelect
                  options={ACTING_SKILLS.map(skill => ({ label: skill, value: skill }))}
                  selected={editedData.acting_skills || []}
                  onChange={(selected) => setEditedData({ ...editedData, acting_skills: selected })}
                  placeholder="Select acting skills..."
                  searchPlaceholder="Search acting skills..."
                  allowCustom={true}
                  onAddCustom={(value) => {
                    // Custom skills are handled by the MultiSelect component
                  }}
                  className="w-full"
                />
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-medium text-foreground">Special Skills</h3>
                  <Badge variant="outline" className="bg-primary/5 text-primary border-primary/20">
                    {editedData.special_skills?.length || 0} skills
                  </Badge>
                </div>
                
                <MultiSelect
                  options={SPECIAL_SKILLS.map(skill => ({ label: skill, value: skill }))}
                  selected={editedData.special_skills || []}
                  onChange={(selected) => setEditedData({ ...editedData, special_skills: selected })}
                  placeholder="Select special skills..."
                  searchPlaceholder="Search special skills..."
                  allowCustom={true}
                  onAddCustom={(value) => {
                    // Custom skills are handled by the MultiSelect component
                  }}
                  className="w-full"
                />
              </div>
            </div>
          )
        
        case 'languages':
          return (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium text-foreground">Languages</h3>
                <Badge variant="outline" className="bg-primary/5 text-primary border-primary/20">
                  {editedData.languages?.length || 0} languages
                </Badge>
              </div>
              
              <MultiSelect
                options={INDIAN_LANGUAGES.map(lang => ({ label: lang, value: lang }))}
                selected={editedData.languages || []}
                onChange={(selected) => setEditedData({ ...editedData, languages: selected })}
                placeholder="Select languages..."
                searchPlaceholder="Search languages..."
                allowCustom={true}
                onAddCustom={(value) => {
                  // Custom languages are handled by the MultiSelect component
                }}
                className="w-full"
              />
            </div>
          )
        
        case 'physical':
          return (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Height</label>
                  <Input
                    value={editedData.height || ''}
                    onChange={(e) => handleInputChange('height', e.target.value)}
                    placeholder="e.g., 5'8"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Weight</label>
                  <Input
                    value={editedData.weight || ''}
                    onChange={(e) => handleInputChange('weight', e.target.value)}
                    placeholder="e.g., 70 kg"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Eye Color</label>
                  <Input
                    value={editedData.eye_color || ''}
                    onChange={(e) => handleInputChange('eye_color', e.target.value)}
                    placeholder="e.g., Brown"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Hair Color</label>
                  <Input
                    value={editedData.hair_color || ''}
                    onChange={(e) => handleInputChange('hair_color', e.target.value)}
                    placeholder="e.g., Black"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Body Type</label>
                  <Input
                    value={editedData.body_type || ''}
                    onChange={(e) => handleInputChange('body_type', e.target.value)}
                    placeholder="e.g., Athletic"
                  />
                </div>
              </div>
            </div>
          )

        case 'social':
          return (
            <div className="space-y-4">
              <div className="grid grid-cols-1 gap-4">
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Instagram URL</label>
                  <Input
                    value={editedData.instagram_url || ''}
                    onChange={(e) => handleInputChange('instagram_url', e.target.value)}
                    placeholder="https://instagram.com/username"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Facebook URL</label>
                  <Input
                    value={editedData.facebook_url || ''}
                    onChange={(e) => handleInputChange('facebook_url', e.target.value)}
                    placeholder="https://facebook.com/username"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">YouTube URL</label>
                  <Input
                    value={editedData.youtube_url || ''}
                    onChange={(e) => handleInputChange('youtube_url', e.target.value)}
                    placeholder="https://youtube.com/channel/..."
                  />
                </div>
              </div>
            </div>
          )

        case 'experience':
          return (
            <div className="space-y-6">
              {editedData.experience && editedData.experience.map((exp: any, index: number) => (
                <div key={index} className="border border-gray-200 rounded-lg p-4 space-y-4">
                  <div className="flex justify-between items-start">
                    <h4 className="font-medium text-gray-900">Experience {index + 1}</h4>
                    <Button
                      onClick={() => {
                        const newExperience = [...(editedData.experience || [])]
                        newExperience.splice(index, 1)
                        setEditedData({ ...editedData, experience: newExperience })
                      }}
                      variant="ghost"
                      size="sm"
                      className="text-red-600 hover:text-red-700"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Project Title</label>
                      <Input
                        value={exp.project_title || ''}
                        onChange={(e) => {
                          const newExperience = [...(editedData.experience || [])]
                          newExperience[index] = { ...newExperience[index], project_title: e.target.value }
                          setEditedData({ ...editedData, experience: newExperience })
                        }}
                        placeholder="e.g. The Great Movie"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
                      <Input
                        value={exp.role || ''}
                        onChange={(e) => {
                          const newExperience = [...(editedData.experience || [])]
                          newExperience[index] = { ...newExperience[index], role: e.target.value }
                          setEditedData({ ...editedData, experience: newExperience })
                        }}
                        placeholder="e.g. Lead Actor"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Project Type</label>
                      <Input
                        value={exp.project_type || ''}
                        onChange={(e) => {
                          const newExperience = [...(editedData.experience || [])]
                          newExperience[index] = { ...newExperience[index], project_type: e.target.value }
                          setEditedData({ ...editedData, experience: newExperience })
                        }}
                        placeholder="e.g. Film, TV Show, Commercial"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Production Company</label>
                      <Input
                        value={exp.production_company || ''}
                        onChange={(e) => {
                          const newExperience = [...(editedData.experience || [])]
                          newExperience[index] = { ...newExperience[index], production_company: e.target.value }
                          setEditedData({ ...editedData, experience: newExperience })
                        }}
                        placeholder="e.g. Warner Bros"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
                      <Input
                        type="date"
                        value={exp.start_date || ''}
                        onChange={(e) => {
                          const newExperience = [...(editedData.experience || [])]
                          newExperience[index] = { ...newExperience[index], start_date: e.target.value }
                          setEditedData({ ...editedData, experience: newExperience })
                        }}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">End Date</label>
                      <Input
                        type="date"
                        value={exp.end_date || ''}
                        onChange={(e) => {
                          const newExperience = [...(editedData.experience || [])]
                          newExperience[index] = { ...newExperience[index], end_date: e.target.value }
                          setEditedData({ ...editedData, experience: newExperience })
                        }}
                        placeholder="Leave empty if current"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                      <Textarea
                        value={exp.description || ''}
                        onChange={(e) => {
                          const newExperience = [...(editedData.experience || [])]
                          newExperience[index] = { ...newExperience[index], description: e.target.value }
                          setEditedData({ ...editedData, experience: newExperience })
                        }}
                        placeholder="Describe your role and achievements..."
                        rows={3}
                      />
                    </div>
                  </div>
                </div>
              ))}
              <Button
                onClick={() => {
                  const newExperience = [...(editedData.experience || []), {
                    project_title: '',
                    project_type: '',
                    role: '',
                    production_company: '',
                    start_date: '',
                    end_date: '',
                    description: ''
                  }]
                  setEditedData({ ...editedData, experience: newExperience })
                }}
                variant="outline"
                className="w-full"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Experience
              </Button>
            </div>
          )
        
        case 'education':
          return (
            <div className="space-y-6">
              {editedData.education && editedData.education.map((edu: any, index: number) => (
                <div key={index} className="border border-gray-200 rounded-lg p-4 space-y-4">
                  <div className="flex justify-between items-start">
                    <h4 className="font-medium text-gray-900">Education {index + 1}</h4>
                    <Button
                      onClick={() => {
                        const newEducation = [...(editedData.education || [])]
                        newEducation.splice(index, 1)
                        setEditedData({ ...editedData, education: newEducation })
                      }}
                      variant="ghost"
                      size="sm"
                      className="text-red-600 hover:text-red-700"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Institution</label>
                      <Input
                        value={edu.institution || ''}
                        onChange={(e) => {
                          const newEducation = [...(editedData.education || [])]
                          newEducation[index] = { ...newEducation[index], institution: e.target.value }
                          setEditedData({ ...editedData, education: newEducation })
                        }}
                        placeholder="e.g. Harvard University"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Degree</label>
                      <Input
                        value={edu.degree || ''}
                        onChange={(e) => {
                          const newEducation = [...(editedData.education || [])]
                          newEducation[index] = { ...newEducation[index], degree: e.target.value }
                          setEditedData({ ...editedData, education: newEducation })
                        }}
                        placeholder="e.g. Bachelor of Arts"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-1">Field of Study</label>
                      <Input
                        value={edu.field_of_study || ''}
                        onChange={(e) => {
                          const newEducation = [...(editedData.education || [])]
                          newEducation[index] = { ...newEducation[index], field_of_study: e.target.value }
                          setEditedData({ ...editedData, education: newEducation })
                        }}
                        placeholder="e.g. Computer Science"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
                      <Input
                        type="date"
                        value={edu.start_date || ''}
                        onChange={(e) => {
                          const newEducation = [...(editedData.education || [])]
                          newEducation[index] = { ...newEducation[index], start_date: e.target.value }
                          setEditedData({ ...editedData, education: newEducation })
                        }}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">End Date</label>
                      <Input
                        type="date"
                        value={edu.end_date || ''}
                        onChange={(e) => {
                          const newEducation = [...(editedData.education || [])]
                          newEducation[index] = { ...newEducation[index], end_date: e.target.value }
                          setEditedData({ ...editedData, education: newEducation })
                        }}
                        placeholder="Leave empty if current"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                      <Textarea
                        value={edu.description || ''}
                        onChange={(e) => {
                          const newEducation = [...(editedData.education || [])]
                          newEducation[index] = { ...newEducation[index], description: e.target.value }
                          setEditedData({ ...editedData, education: newEducation })
                        }}
                        placeholder="Describe your studies, achievements, etc..."
                        rows={3}
                      />
                    </div>
                  </div>
                </div>
              ))}
              <Button
                onClick={() => {
                  const newEducation = [...(editedData.education || []), {
                    institution: '',
                    degree: '',
                    field_of_study: '',
                    start_date: '',
                    end_date: '',
                    description: ''
                  }]
                  setEditedData({ ...editedData, education: newEducation })
                }}
                variant="outline"
                className="w-full"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Education
              </Button>
            </div>
          )
        
        case 'training':
          return (
            <div className="space-y-6">
              {editedData.training && editedData.training.map((train: any, index: number) => (
                <div key={index} className="border border-gray-200 rounded-lg p-4 space-y-4">
                  <div className="flex justify-between items-start">
                    <h4 className="font-medium text-gray-900">Training {index + 1}</h4>
                    <Button
                      onClick={() => {
                        const newTraining = [...(editedData.training || [])]
                        newTraining.splice(index, 1)
                        setEditedData({ ...editedData, training: newTraining })
                      }}
                      variant="ghost"
                      size="sm"
                      className="text-red-600 hover:text-red-700"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Program Name</label>
                      <Input
                        value={train.program_name || ''}
                        onChange={(e) => {
                          const newTraining = [...(editedData.training || [])]
                          newTraining[index] = { ...newTraining[index], program_name: e.target.value }
                          setEditedData({ ...editedData, training: newTraining })
                        }}
                        placeholder="e.g. Acting Workshop"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Institution</label>
                      <Input
                        value={train.institution || ''}
                        onChange={(e) => {
                          const newTraining = [...(editedData.training || [])]
                          newTraining[index] = { ...newTraining[index], institution: e.target.value }
                          setEditedData({ ...editedData, training: newTraining })
                        }}
                        placeholder="e.g. Drama School"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
                      <Input
                        type="date"
                        value={train.start_date || ''}
                        onChange={(e) => {
                          const newTraining = [...(editedData.training || [])]
                          newTraining[index] = { ...newTraining[index], start_date: e.target.value }
                          setEditedData({ ...editedData, training: newTraining })
                        }}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">End Date</label>
                      <Input
                        type="date"
                        value={train.end_date || ''}
                        onChange={(e) => {
                          const newTraining = [...(editedData.training || [])]
                          newTraining[index] = { ...newTraining[index], end_date: e.target.value }
                          setEditedData({ ...editedData, training: newTraining })
                        }}
                        placeholder="Leave empty if current"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                      <Textarea
                        value={train.description || ''}
                        onChange={(e) => {
                          const newTraining = [...(editedData.training || [])]
                          newTraining[index] = { ...newTraining[index], description: e.target.value }
                          setEditedData({ ...editedData, training: newTraining })
                        }}
                        placeholder="Describe the training program..."
                        rows={3}
                      />
                    </div>
                  </div>
                </div>
              ))}
              <Button
                onClick={() => {
                  const newTraining = [...(editedData.training || []), {
                    program_name: '',
                    institution: '',
                    start_date: '',
                    end_date: '',
                    description: ''
                  }]
                  setEditedData({ ...editedData, training: newTraining })
                }}
                variant="outline"
                className="w-full"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Training
              </Button>
            </div>
          )
        
        default:
          return null
      }
    }
    
    // Display mode (not editing)
    switch (section) {
      case 'about':
        return data.bio ? (
          <p className="text-gray-700">{data.bio}</p>
        ) : (
          <p className="text-gray-500 italic">No information added yet</p>
        )
      
      case 'skills':
        return data.skills && data.skills.length > 0 ? (
          <div className="flex flex-wrap gap-2">
            {data.skills.map((skill: string) => (
              <Badge key={skill} variant="secondary">{skill}</Badge>
            ))}
          </div>
        ) : (
          <p className="text-gray-500 italic">No skills added yet</p>
        )
      
      case 'languages':
        return data.languages && data.languages.length > 0 ? (
          <div className="flex flex-wrap gap-2">
            {data.languages.map((language: string) => (
              <Badge key={language} variant="outline">{language}</Badge>
            ))}
          </div>
        ) : (
          <p className="text-gray-500 italic">No languages added yet</p>
        )
      
      case 'physical':
        return (
          <div className="grid grid-cols-2 gap-4 text-sm">
            {data.height && <div><span className="font-medium">Height:</span> {data.height}</div>}
            {data.weight && <div><span className="font-medium">Weight:</span> {data.weight}</div>}
            {data.eye_color && <div><span className="font-medium">Eye Color:</span> {data.eye_color}</div>}
            {data.hair_color && <div><span className="font-medium">Hair Color:</span> {data.hair_color}</div>}
            {data.body_type && <div><span className="font-medium">Body Type:</span> {data.body_type}</div>}
          </div>
        )
      
      case 'social':
        return (
          <div className="space-y-2">
            {data.instagram_url && (
              <div>
                <span className="font-medium">Instagram:</span>
                <a href={data.instagram_url} target="_blank" rel="noopener noreferrer" className="ml-2 text-blue-600 hover:underline">
                  {data.instagram_url}
                </a>
              </div>
            )}
            {data.facebook_url && (
              <div>
                <span className="font-medium">Facebook:</span>
                <a href={data.facebook_url} target="_blank" rel="noopener noreferrer" className="ml-2 text-blue-600 hover:underline">
                  {data.facebook_url}
                </a>
              </div>
            )}
            {data.youtube_url && (
              <div>
                <span className="font-medium">YouTube:</span>
                <a href={data.youtube_url} target="_blank" rel="noopener noreferrer" className="ml-2 text-blue-600 hover:underline">
                  {data.youtube_url}
                </a>
              </div>
            )}
          </div>
        )
      
      case 'experience':
        return data.experience && data.experience.length > 0 ? (
          <div className="space-y-3">
            {data.experience.map((exp: any, index: number) => (
              <div key={index} className="flex gap-3 pb-3 border-b border-gray-100 last:border-b-0 last:pb-0">
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                    <div className="w-7 h-7 bg-blue-600 rounded text-white text-xs font-bold flex items-center justify-center">
                      {exp.production_company ? exp.production_company.charAt(0).toUpperCase() : 'P'}
                    </div>
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-gray-900 text-sm">{exp.project_title || 'Project Title'}</h3>
                  <p className="text-gray-700 text-sm">{exp.role || 'Role'} • {exp.production_company || 'Production Company'}</p>
                  <p className="text-xs text-gray-500 mt-0.5">
                    {exp.project_type && `${exp.project_type} • `}
                    {exp.start_date && new Date(exp.start_date).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                    {' - '}
                    {exp.end_date ? new Date(exp.end_date).toLocaleDateString('en-US', { month: 'short', year: 'numeric' }) : 'Present'}
                  </p>
                  {exp.description && (
                    <p className="text-gray-600 text-xs mt-1 leading-relaxed">{exp.description}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500 italic">No work experience added yet</p>
        )
      
      case 'education':
        return data.education && data.education.length > 0 ? (
          <div className="space-y-3">
            {data.education.map((edu: any, index: number) => (
              <div key={index} className="flex gap-3 pb-3 border-b border-gray-100 last:border-b-0 last:pb-0">
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                    <div className="w-7 h-7 bg-green-600 rounded text-white text-xs font-bold flex items-center justify-center">
                      {edu.institution ? edu.institution.charAt(0).toUpperCase() : 'S'}
                    </div>
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-gray-900 text-sm">{edu.institution || 'Institution'}</h3>
                  <p className="text-gray-700 text-sm">{edu.degree || 'Degree'}</p>
                  {edu.field_of_study && (
                    <p className="text-gray-600 text-xs">{edu.field_of_study}</p>
                  )}
                  <p className="text-xs text-gray-500 mt-0.5">
                    {edu.start_date && new Date(edu.start_date).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                    {' - '}
                    {edu.end_date ? new Date(edu.end_date).toLocaleDateString('en-US', { month: 'short', year: 'numeric' }) : 'Present'}
                  </p>
                  {edu.description && (
                    <p className="text-gray-600 text-xs mt-1 leading-relaxed">{edu.description}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500 italic">No education added yet</p>
        )
      
      case 'training':
        return data.training && data.training.length > 0 ? (
          <div className="space-y-3">
            {data.training.map((train: any, index: number) => (
              <div key={index} className="flex gap-3 pb-3 border-b border-gray-100 last:border-b-0 last:pb-0">
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                    <div className="w-7 h-7 bg-purple-600 rounded text-white text-xs font-bold flex items-center justify-center">
                      {train.program_name ? train.program_name.charAt(0).toUpperCase() : 'T'}
                    </div>
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-gray-900 text-sm">{train.program_name || 'Training Program'}</h3>
                  <p className="text-gray-700 text-sm">{train.institution || 'Institution'}</p>
                  <p className="text-xs text-gray-500 mt-0.5">
                    {train.start_date && new Date(train.start_date).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                    {' - '}
                    {train.end_date ? new Date(train.end_date).toLocaleDateString('en-US', { month: 'short', year: 'numeric' }) : 'Present'}
                  </p>
                  {train.description && (
                    <p className="text-gray-600 text-xs mt-1 leading-relaxed">{train.description}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500 italic">No training added yet</p>
        )
      
      default:
        return null
    }
  }

  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-base font-medium">{title}</CardTitle>
        <div className="flex items-center space-x-2">
          {isEditing ? (
            <>
              <Button 
                onClick={handleSave} 
                size="sm" 
                disabled={isLoading}
                className="h-8 px-3"
              >
                <Save className="h-4 w-4 mr-1" />
                {isLoading ? 'Saving...' : 'Save'}
              </Button>
              <Button 
                onClick={() => {
                  setIsEditing(false)
                  setEditedData(data)
                }} 
                variant="outline" 
                size="sm"
                className="h-8 px-3"
              >
                Cancel
              </Button>
            </>
          ) : (
            <Button 
              onClick={() => setIsEditing(true)} 
              variant="outline" 
              size="sm"
              className="h-8 px-3"
            >
              <Edit className="h-4 w-4 mr-1" />
              Edit
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="flex items-center justify-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
            <span className="ml-2 text-gray-600">Loading...</span>
          </div>
        ) : (
          renderContent()
        )}
      </CardContent>
    </Card>
  )
}