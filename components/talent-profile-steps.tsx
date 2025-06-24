import React from 'react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Upload, X, Plus, Trash2, Calendar, MapPin, User, Phone, Mail, Globe, Camera, Palette, Music } from 'lucide-react'
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

// Basic Info Step Component
interface BasicInfoStepProps {
  profile: Partial<TalentProfile>
  onInputChange: (field: keyof TalentProfile, value: any) => void
}

export function BasicInfoStep({ profile, onInputChange }: BasicInfoStepProps) {
  return (
    <div className="space-y-6">
      {/* Personal Information */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="h-5 w-5" />
            Personal Information
          </CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="full_name">Full Name *</Label>
            <Input
              id="full_name"
              value={profile.full_name || ''}
              onChange={(e) => onInputChange('full_name', e.target.value)}
              placeholder="Your full name"
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="email">Email *</Label>
            <Input
              id="email"
              type="email"
              value={profile.email || ''}
              onChange={(e) => onInputChange('email', e.target.value)}
              placeholder="your.email@example.com"
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="phone">Phone Number</Label>
            <Input
              id="phone"
              type="tel"
              value={profile.phone || ''}
              onChange={(e) => onInputChange('phone', e.target.value)}
              placeholder="+91 XXXXX XXXXX"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="date_of_birth">Date of Birth</Label>
            <Input
              id="date_of_birth"
              type="date"
              value={profile.date_of_birth || ''}
              onChange={(e) => onInputChange('date_of_birth', e.target.value)}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="gender">Gender</Label>
            <Select value={profile.gender || ''} onValueChange={(value) => onInputChange('gender', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select gender" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Male">Male</SelectItem>
                <SelectItem value="Female">Female</SelectItem>
                <SelectItem value="Non-binary">Non-binary</SelectItem>
                <SelectItem value="Other">Other</SelectItem>
                <SelectItem value="Prefer not to say">Prefer not to say</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="height">Height</Label>
            <Input
              id="height"
              value={profile.height || ''}
              onChange={(e) => onInputChange('height', e.target.value)}
              placeholder="e.g., 5'8&quot; or 172 cm"
            />
          </div>
        </CardContent>
      </Card>

      {/* Location */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MapPin className="h-5 w-5" />
            Location
          </CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="city">City</Label>
            <Input
              id="city"
              value={profile.city || ''}
              onChange={(e) => onInputChange('city', e.target.value)}
              placeholder="Your city"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="state">State</Label>
            <Select value={profile.state || ''} onValueChange={(value) => onInputChange('state', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select state" />
              </SelectTrigger>
              <SelectContent>
                {INDIAN_STATES.map((state) => (
                  <SelectItem key={state} value={state}>{state}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="country">Country</Label>
            <Input
              id="country"
              value={profile.country || 'India'}
              onChange={(e) => onInputChange('country', e.target.value)}
              placeholder="Country"
            />
          </div>
        </CardContent>
      </Card>

      {/* Bio */}
      <Card>
        <CardHeader>
          <CardTitle>About You</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <Label htmlFor="bio">Bio / Introduction</Label>
            <Textarea
              id="bio"
              value={profile.bio || ''}
              onChange={(e) => onInputChange('bio', e.target.value)}
              placeholder="Tell us about yourself, your passion for performing arts, and what makes you unique..."
              rows={4}
            />
            <p className="text-sm text-gray-500">
              This will be displayed on your profile. Keep it engaging and professional.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

// Professional Step Component
interface ProfessionalStepProps {
  profile: Partial<TalentProfile>
  onInputChange: (field: keyof TalentProfile, value: any) => void
  onArrayFieldToggle: (field: keyof TalentProfile, value: string) => void
}

export function ProfessionalStep({ profile, onInputChange, onArrayFieldToggle }: ProfessionalStepProps) {
  return (
    <div className="space-y-6">
      {/* Experience Level */}
      <Card>
        <CardHeader>
          <CardTitle>Experience Level</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="experience_level">Experience Level</Label>
            <Select 
              value={profile.experience_level || ''} 
              onValueChange={(value) => onInputChange('experience_level', value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select experience level" />
              </SelectTrigger>
              <SelectContent>
                {EXPERIENCE_LEVELS.map((level) => (
                  <SelectItem key={level} value={level}>{level}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="years_of_experience">Years of Experience</Label>
            <Input
              id="years_of_experience"
              type="number"
              min="0"
              max="50"
              value={profile.years_of_experience || 0}
              onChange={(e) => onInputChange('years_of_experience', parseInt(e.target.value) || 0)}
            />
          </div>
        </CardContent>
      </Card>

      {/* Acting Skills */}
      <Card>
        <CardHeader>
          <CardTitle>Acting Skills</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
            {ACTING_SKILLS.map((skill) => (
              <div key={skill} className="flex items-center space-x-2">
                <Checkbox
                  checked={(profile.acting_skills || []).includes(skill)}
                  onCheckedChange={() => onArrayFieldToggle('acting_skills', skill)}
                />
                <Label className="text-sm">{skill}</Label>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Dance Styles */}
      <Card>
        <CardHeader>
          <CardTitle>Dance Styles</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
            {DANCE_STYLES.map((style) => (
              <div key={style} className="flex items-center space-x-2">
                <Checkbox
                  checked={(profile.dance_styles || []).includes(style)}
                  onCheckedChange={() => onArrayFieldToggle('dance_styles', style)}
                />
                <Label className="text-sm">{style}</Label>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Languages */}
      <Card>
        <CardHeader>
          <CardTitle>Languages</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
            {INDIAN_LANGUAGES.map((language) => (
              <div key={language} className="flex items-center space-x-2">
                <Checkbox
                  checked={(profile.languages || []).includes(language)}
                  onCheckedChange={() => onArrayFieldToggle('languages', language)}
                />
                <Label className="text-sm">{language}</Label>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Special Skills */}
      <Card>
        <CardHeader>
          <CardTitle>Special Skills</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
            {SPECIAL_SKILLS.map((skill) => (
              <div key={skill} className="flex items-center space-x-2">
                <Checkbox
                  checked={(profile.special_skills || []).includes(skill)}
                  onCheckedChange={() => onArrayFieldToggle('special_skills', skill)}
                />
                <Label className="text-sm">{skill}</Label>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Preferred Roles & Availability */}
      <Card>
        <CardHeader>
          <CardTitle>Preferences & Availability</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label className="text-base font-medium">Preferred Roles</Label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-2">
              {PREFERRED_ROLES.map((role) => (
                <div key={role} className="flex items-center space-x-2">
                  <Checkbox
                    checked={(profile.preferred_roles || []).includes(role)}
                    onCheckedChange={() => onArrayFieldToggle('preferred_roles', role)}
                  />
                  <Label className="text-sm">{role}</Label>
                </div>
              ))}
            </div>
          </div>

          <div>
            <Label className="text-base font-medium">Project Types</Label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-2">
              {PROJECT_TYPES.map((type) => (
                <div key={type} className="flex items-center space-x-2">
                  <Checkbox
                    checked={(profile.project_types || []).includes(type)}
                    onCheckedChange={() => onArrayFieldToggle('project_types', type)}
                  />
                  <Label className="text-sm">{type}</Label>
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              checked={profile.available_for_work || false}
              onCheckedChange={(checked) => onInputChange('available_for_work', checked)}
            />
            <Label>Currently available for work</Label>
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              checked={profile.willing_to_relocate || false}
              onCheckedChange={(checked) => onInputChange('willing_to_relocate', checked)}
            />
            <Label>Willing to relocate for projects</Label>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

// Education Step Component
interface EducationStepProps {
  education: Partial<TalentEducation>[]
  experience: Partial<TalentExperience>[]
  training: Partial<TalentTraining>[]
  onAddEducation: () => void
  onUpdateEducation: (index: number, field: keyof TalentEducation, value: any) => void
  onRemoveEducation: (index: number) => void
  onAddExperience: () => void
  onUpdateExperience: (index: number, field: keyof TalentExperience, value: any) => void
  onRemoveExperience: (index: number) => void
  onAddTraining: () => void
  onUpdateTraining: (index: number, field: keyof TalentTraining, value: any) => void
  onRemoveTraining: (index: number) => void
}

export function EducationStep({
  education,
  experience,
  training,
  onAddEducation,
  onUpdateEducation,
  onRemoveEducation,
  onAddExperience,
  onUpdateExperience,
  onRemoveExperience,
  onAddTraining,
  onUpdateTraining,
  onRemoveTraining
}: EducationStepProps) {
  return (
    <div className="space-y-6">
      {/* Education */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span className="flex items-center gap-2">
              <Globe className="h-5 w-5" />
              Education
            </span>
            <Button onClick={onAddEducation} size="sm">
              <Plus className="h-4 w-4 mr-2" />
              Add Education
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {education.length === 0 ? (
            <p className="text-gray-500 text-center py-8">
              No education records added yet. Click "Add Education" to get started.
            </p>
          ) : (
            <div className="space-y-4">
              {education.map((edu, index) => (
                <div key={index} className="border rounded-lg p-4 space-y-4">
                  <div className="flex justify-between items-start">
                    <h4 className="font-medium">Education #{index + 1}</h4>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => onRemoveEducation(index)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Institution *</Label>
                      <Input
                        value={edu.institution || ''}
                        onChange={(e) => onUpdateEducation(index, 'institution', e.target.value)}
                        placeholder="School/University name"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label>Degree/Course</Label>
                      <Input
                        value={edu.degree || ''}
                        onChange={(e) => onUpdateEducation(index, 'degree', e.target.value)}
                        placeholder="e.g., Bachelor of Fine Arts"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label>Field of Study</Label>
                      <Input
                        value={edu.field_of_study || ''}
                        onChange={(e) => onUpdateEducation(index, 'field_of_study', e.target.value)}
                        placeholder="e.g., Performing Arts, Theater"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label>Start Year</Label>
                      <Input
                        type="number"
                        value={edu.start_year || ''}
                        onChange={(e) => onUpdateEducation(index, 'start_year', parseInt(e.target.value))}
                        placeholder="2020"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label>End Year</Label>
                      <Input
                        type="number"
                        value={edu.end_year || ''}
                        onChange={(e) => onUpdateEducation(index, 'end_year', parseInt(e.target.value))}
                        placeholder="2024"
                        disabled={edu.currently_studying}
                      />
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        checked={edu.currently_studying || false}
                        onCheckedChange={(checked) => onUpdateEducation(index, 'currently_studying', checked)}
                      />
                      <Label>Currently studying here</Label>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Experience */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Professional Experience
            </span>
            <Button onClick={onAddExperience} size="sm">
              <Plus className="h-4 w-4 mr-2" />
              Add Experience
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {experience.length === 0 ? (
            <p className="text-gray-500 text-center py-8">
              No experience records added yet. Click "Add Experience" to get started.
            </p>
          ) : (
            <div className="space-y-4">
              {experience.map((exp, index) => (
                <div key={index} className="border rounded-lg p-4 space-y-4">
                  <div className="flex justify-between items-start">
                    <h4 className="font-medium">Experience #{index + 1}</h4>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => onRemoveExperience(index)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Project Title *</Label>
                      <Input
                        value={exp.project_title || ''}
                        onChange={(e) => onUpdateExperience(index, 'project_title', e.target.value)}
                        placeholder="Movie/Show/Play name"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label>Project Type</Label>
                      <Select 
                        value={exp.project_type || ''} 
                        onValueChange={(value) => onUpdateExperience(index, 'project_type', value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                        <SelectContent>
                          {PROJECT_TYPES.map((type) => (
                            <SelectItem key={type} value={type}>{type}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <Label>Role/Character</Label>
                      <Input
                        value={exp.role || ''}
                        onChange={(e) => onUpdateExperience(index, 'role', e.target.value)}
                        placeholder="Your role or character name"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label>Production Company</Label>
                      <Input
                        value={exp.production_company || ''}
                        onChange={(e) => onUpdateExperience(index, 'production_company', e.target.value)}
                        placeholder="Production house/company"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label>Start Date</Label>
                      <Input
                        type="date"
                        value={exp.start_date || ''}
                        onChange={(e) => onUpdateExperience(index, 'start_date', e.target.value)}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label>End Date</Label>
                      <Input
                        type="date"
                        value={exp.end_date || ''}
                        onChange={(e) => onUpdateExperience(index, 'end_date', e.target.value)}
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Description</Label>
                    <Textarea
                      value={exp.description || ''}
                      onChange={(e) => onUpdateExperience(index, 'description', e.target.value)}
                      placeholder="Describe your role and responsibilities..."
                      rows={3}
                    />
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Training */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span className="flex items-center gap-2">
              <Globe className="h-5 w-5" />
              Training & Workshops
            </span>
            <Button onClick={onAddTraining} size="sm">
              <Plus className="h-4 w-4 mr-2" />
              Add Training
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {training.length === 0 ? (
            <p className="text-gray-500 text-center py-8">
              No training records added yet. Click "Add Training" to get started.
            </p>
          ) : (
            <div className="space-y-4">
              {training.map((train, index) => (
                <div key={index} className="border rounded-lg p-4 space-y-4">
                  <div className="flex justify-between items-start">
                    <h4 className="font-medium">Training #{index + 1}</h4>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => onRemoveTraining(index)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Workshop/Course Name *</Label>
                      <Input
                        value={train.workshop_name || ''}
                        onChange={(e) => onUpdateTraining(index, 'workshop_name', e.target.value)}
                        placeholder="Workshop or course name"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label>Instructor/Trainer</Label>
                      <Input
                        value={train.instructor || ''}
                        onChange={(e) => onUpdateTraining(index, 'instructor', e.target.value)}
                        placeholder="Instructor name"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label>Institution/Academy</Label>
                      <Input
                        value={train.institution || ''}
                        onChange={(e) => onUpdateTraining(index, 'institution', e.target.value)}
                        placeholder="Training institution"
                      />
                    </div>
                    
           
                    
                    <div className="space-y-2">
                      <Label>Start Date</Label>
                      <Input
                        type="date"
                        value={train.start_date || ''}
                        onChange={(e) => onUpdateTraining(index, 'start_date', e.target.value)}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label>End Date</Label>
                      <Input
                        type="date"
                        value={train.end_date || ''}
                        onChange={(e) => onUpdateTraining(index, 'end_date', e.target.value)}
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Skills Learned</Label>
                    <Input
                      value={(train.skills_learned || []).join(', ')}
                      onChange={(e) => onUpdateTraining(index, 'skills_learned', e.target.value.split(', ').filter(s => s.trim()))}
                      placeholder="Acting, Dancing, Singing (comma separated)"
                    />
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

// Portfolio Step Component
interface PortfolioStepProps {
  profileImage: string
  headshots: string[]
  portfolioImages: string[]
  portfolioVideos: string[]
  onFileUpload: (file: File, type: 'profile' | 'headshot' | 'portfolio') => Promise<void>
  uploading: boolean
}

export function PortfolioStep({
  profileImage,
  headshots,
  portfolioImages,
  portfolioVideos,
  onFileUpload,
  uploading
}: PortfolioStepProps) {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, type: 'profile' | 'headshot' | 'portfolio') => {
    const file = e.target.files?.[0]
    if (file) {
      onFileUpload(file, type)
    }
  }

  return (
    <div className="space-y-6">
      {/* Profile Image */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="h-5 w-5" />
            Profile Picture
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center space-y-4">
            {profileImage ? (
              <div className="relative">
                <img
                  src={profileImage}
                  alt="Profile"
                  className="w-32 h-32 rounded-full object-cover border-4 border-gray-200"
                />
                <Button
                  variant="outline"
                  size="sm"
                  className="absolute -top-2 -right-2 rounded-full"
                  onClick={() => {
                    // Handle remove profile image
                  }}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ) : (
              <div className="w-32 h-32 rounded-full border-2 border-dashed border-gray-300 flex items-center justify-center">
                <Camera className="h-8 w-8 text-gray-400" />
              </div>
            )}
            
            <div className="text-center">
              <Label htmlFor="profile-image" className="cursor-pointer">
                <Button variant="outline" disabled={uploading}>
                  <Upload className="h-4 w-4 mr-2" />
                  {uploading ? 'Uploading...' : 'Upload Profile Picture'}
                </Button>
              </Label>
              <Input
                id="profile-image"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => handleFileChange(e, 'profile')}
              />
              <p className="text-sm text-gray-500 mt-2">
                JPG, PNG or WebP. Max size 5MB.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Headshots */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Camera className="h-5 w-5" />
            Professional Headshots
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {headshots.map((url, index) => (
                <div key={index} className="relative aspect-square">
                  <img
                    src={url}
                    alt={`Headshot ${index + 1}`}
                    className="w-full h-full object-cover rounded-lg"
                  />
                  <Button
                    variant="outline"
                    size="sm"
                    className="absolute -top-2 -right-2 rounded-full"
                    onClick={() => {
                      // Handle remove headshot
                    }}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ))}
              
              {/* Add Headshot Button */}
              <div className="aspect-square border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center">
                <Label htmlFor="headshots" className="cursor-pointer">
                  <div className="text-center">
                    <Plus className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                    <span className="text-sm text-gray-500">Add Headshot</span>
                  </div>
                </Label>
                <Input
                  id="headshots"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => handleFileChange(e, 'headshot')}
                />
              </div>
            </div>
            
            <p className="text-sm text-gray-500">
              Upload high-quality professional headshots. Recommended: 3-5 images showing different angles and expressions.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Portfolio Images */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Palette className="h-5 w-5" />
            Portfolio Images
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {portfolioImages.map((url, index) => (
                <div key={index} className="relative aspect-square">
                  <img
                    src={url}
                    alt={`Portfolio ${index + 1}`}
                    className="w-full h-full object-cover rounded-lg"
                  />
                  <Button
                    variant="outline"
                    size="sm"
                    className="absolute -top-2 -right-2 rounded-full"
                    onClick={() => {
                      // Handle remove portfolio image
                    }}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ))}
              
              {/* Add Portfolio Image Button */}
              <div className="aspect-square border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center">
                <Label htmlFor="portfolio-images" className="cursor-pointer">
                  <div className="text-center">
                    <Plus className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                    <span className="text-sm text-gray-500">Add Image</span>
                  </div>
                </Label>
                <Input
                  id="portfolio-images"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => handleFileChange(e, 'portfolio')}
                />
              </div>
            </div>
            
            <p className="text-sm text-gray-500">
              Showcase your work with behind-the-scenes photos, performance shots, or costume/makeup tests.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Portfolio Videos */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Music className="h-5 w-5" />
            Portfolio Videos
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {portfolioVideos.map((url, index) => (
                <div key={index} className="relative aspect-video">
                  <video
                    src={url}
                    className="w-full h-full object-cover rounded-lg"
                    controls
                  />
                  <Button
                    variant="outline"
                    size="sm"
                    className="absolute -top-2 -right-2 rounded-full"
                    onClick={() => {
                      // Handle remove portfolio video
                    }}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
            
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
              <Label htmlFor="portfolio-videos" className="cursor-pointer">
                <div className="text-center">
                  <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                  <span className="text-sm text-gray-500">Upload Video</span>
                </div>
              </Label>
              <Input
                id="portfolio-videos"
                type="file"
                accept="video/*"
                className="hidden"
                onChange={(e) => handleFileChange(e, 'portfolio')}
              />
            </div>
            
            <p className="text-sm text-gray-500">
              Upload demo reels, monologues, dance performances, or singing videos. Max size 100MB per video.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

// Review Step Component
interface ReviewStepProps {
  profile: Partial<TalentProfile>
  education: Partial<TalentEducation>[]
  experience: Partial<TalentExperience>[]
  training: Partial<TalentTraining>[]
  profileImage: string
  headshots: string[]
  portfolioImages: string[]
  portfolioVideos: string[]
}

export function ReviewStep({
  profile,
  education,
  experience,
  training,
  profileImage,
  headshots,
  portfolioImages,
  portfolioVideos
}: ReviewStepProps) {
  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h3 className="text-2xl font-bold mb-2">Review Your Profile</h3>
        <p className="text-gray-600">
          Please review all information before publishing your profile. You can edit it later if needed.
        </p>
      </div>

      {/* Profile Summary */}
      <Card>
        <CardHeader>
          <CardTitle>Profile Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-start space-x-4">
            {profileImage && (
              <img
                src={profileImage}
                alt="Profile"
                className="w-20 h-20 rounded-full object-cover"
              />
            )}
            <div className="flex-1">
              <h4 className="font-semibold text-lg">{profile.full_name}</h4>
              <p className="text-gray-600">{profile.email}</p>
              {profile.phone && <p className="text-gray-600">{profile.phone}</p>}
              <p className="text-gray-600">
                {profile.city}, {profile.state}
              </p>
              <p className="text-sm text-gray-500 mt-2">
                {profile.experience_level} • {profile.years_of_experience} years experience
              </p>
            </div>
          </div>
          
          {profile.bio && (
            <div className="mt-4 pt-4 border-t">
              <p className="text-gray-700">{profile.bio}</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Skills & Preferences */}
      <Card>
        <CardHeader>
          <CardTitle>Skills & Preferences</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {profile.acting_skills && profile.acting_skills.length > 0 && (
            <div>
              <Label className="font-medium">Acting Skills</Label>
              <div className="flex flex-wrap gap-2 mt-2">
                {profile.acting_skills.map((skill) => (
                  <Badge key={skill} variant="secondary">{skill}</Badge>
                ))}
              </div>
            </div>
          )}
          
          {profile.dance_styles && profile.dance_styles.length > 0 && (
            <div>
              <Label className="font-medium">Dance Styles</Label>
              <div className="flex flex-wrap gap-2 mt-2">
                {profile.dance_styles.map((style) => (
                  <Badge key={style} variant="secondary">{style}</Badge>
                ))}
              </div>
            </div>
          )}
          
          {profile.languages && profile.languages.length > 0 && (
            <div>
              <Label className="font-medium">Languages</Label>
              <div className="flex flex-wrap gap-2 mt-2">
                {profile.languages.map((lang) => (
                  <Badge key={lang} variant="secondary">{lang}</Badge>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Media Summary */}
      <Card>
        <CardHeader>
          <CardTitle>Media Portfolio</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
            <div className="p-4 border rounded-lg">
              <Camera className="h-8 w-8 mx-auto mb-2 text-blue-500" />
              <p className="font-medium">{headshots.length} Headshots</p>
            </div>
            <div className="p-4 border rounded-lg">
              <Palette className="h-8 w-8 mx-auto mb-2 text-green-500" />
              <p className="font-medium">{portfolioImages.length} Portfolio Images</p>
            </div>
            <div className="p-4 border rounded-lg">
              <Music className="h-8 w-8 mx-auto mb-2 text-purple-500" />
              <p className="font-medium">{portfolioVideos.length} Videos</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Records Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Education</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-blue-600">{education.length}</p>
            <p className="text-sm text-gray-500">Records added</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Experience</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-green-600">{experience.length}</p>
            <p className="text-sm text-gray-500">Projects listed</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Training</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-purple-600">{training.length}</p>
            <p className="text-sm text-gray-500">Workshops completed</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}