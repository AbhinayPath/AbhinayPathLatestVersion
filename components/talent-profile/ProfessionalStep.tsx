'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Checkbox } from '@/components/ui/checkbox'
import { X, Plus, Trash2 } from 'lucide-react'
import { 
  TalentExperience,
  EXPERIENCE_LEVELS, 
  PROJECT_TYPES, 
  DANCE_STYLES, 
  SPECIAL_SKILLS,
  PREFERRED_ROLES 
} from '@/lib/types/talent'

interface ProfessionalStepProps {
  data: any
  experience: Partial<TalentExperience>[]
  onUpdate: (data: any) => void
  onUpdateExperience: (experience: Partial<TalentExperience>[]) => void
  onNext: () => void
  onBack: () => void
}

export default function ProfessionalStep({ 
  data, 
  experience, 
  onUpdate, 
  onUpdateExperience, 
  onNext, 
  onBack 
}: ProfessionalStepProps) {
  const [danceStyles, setDanceStyles] = useState<string[]>(data.dance_styles || [])
  const [specialSkills, setSpecialSkills] = useState<string[]>(data.special_skills || [])
  const [preferredRoles, setPreferredRoles] = useState<string[]>(data.preferred_roles || [])
  const [projectTypes, setProjectTypes] = useState<string[]>(data.project_types || [])

  const handleInputChange = (field: string, value: any) => {
    onUpdate({ ...data, [field]: value })
  }

  const toggleArrayItem = (
    array: string[], 
    setArray: (arr: string[]) => void, 
    item: string, 
    field: string
  ) => {
    const newArray = array.includes(item) 
      ? array.filter(i => i !== item)
      : [...array, item]
    setArray(newArray)
    onUpdate({ ...data, [field]: newArray })
  }

  const addExperience = () => {
    const newExp: Partial<TalentExperience> = {
      project_title: '',
      project_type: 'Film',
      role: '',
      production_company: '',
      start_date: '',
      end_date: '',
      description: ''
    }
    onUpdateExperience([...experience, newExp])
  }

  const updateExperience = (index: number, field: keyof TalentExperience, value: any) => {
    const updated = experience.map((exp, i) => 
      i === index ? { ...exp, [field]: value } : exp
    )
    onUpdateExperience(updated)
  }

  const removeExperience = (index: number) => {
    onUpdateExperience(experience.filter((_, i) => i !== index))
  }

  const isFormValid = () => {
    return data.experience_level && data.years_of_experience !== undefined
  }

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle>Professional Information</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Experience Level */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="experience_level">Experience Level *</Label>
            <Select value={data.experience_level || ''} onValueChange={(value) => handleInputChange('experience_level', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select your experience level" />
              </SelectTrigger>
              <SelectContent>
                {EXPERIENCE_LEVELS.map(level => (
                  <SelectItem key={level} value={level}>{level}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="years_of_experience">Years of Experience *</Label>
            <Input
              id="years_of_experience"
              type="number"
              min="0"
              max="50"
              value={data.years_of_experience || 0}
              onChange={(e) => handleInputChange('years_of_experience', parseInt(e.target.value) || 0)}
              placeholder="0"
            />
          </div>
        </div>

        {/* Dance Styles */}
        <div>
          <Label>Dance Styles</Label>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-2">
            {DANCE_STYLES.map(style => (
              <div key={style} className="flex items-center space-x-2">
                <Checkbox
                  id={`dance-${style}`}
                  checked={danceStyles.includes(style)}
                  onCheckedChange={() => toggleArrayItem(danceStyles, setDanceStyles, style, 'dance_styles')}
                />
                <Label htmlFor={`dance-${style}`} className="text-sm">{style}</Label>
              </div>
            ))}
          </div>
        </div>

        {/* Special Skills */}
        <div>
          <Label>Special Skills</Label>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-2">
            {SPECIAL_SKILLS.map(skill => (
              <div key={skill} className="flex items-center space-x-2">
                <Checkbox
                  id={`skill-${skill}`}
                  checked={specialSkills.includes(skill)}
                  onCheckedChange={() => toggleArrayItem(specialSkills, setSpecialSkills, skill, 'special_skills')}
                />
                <Label htmlFor={`skill-${skill}`} className="text-sm">{skill}</Label>
              </div>
            ))}
          </div>
        </div>

        {/* Preferred Roles */}
        <div>
          <Label>Preferred Roles</Label>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-2">
            {PREFERRED_ROLES.map(role => (
              <div key={role} className="flex items-center space-x-2">
                <Checkbox
                  id={`role-${role}`}
                  checked={preferredRoles.includes(role)}
                  onCheckedChange={() => toggleArrayItem(preferredRoles, setPreferredRoles, role, 'preferred_roles')}
                />
                <Label htmlFor={`role-${role}`} className="text-sm">{role}</Label>
              </div>
            ))}
          </div>
        </div>

        {/* Project Types */}
        <div>
          <Label>Project Types</Label>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-2">
            {PROJECT_TYPES.map(type => (
              <div key={type} className="flex items-center space-x-2">
                <Checkbox
                  id={`project-${type}`}
                  checked={projectTypes.includes(type)}
                  onCheckedChange={() => toggleArrayItem(projectTypes, setProjectTypes, type, 'project_types')}
                />
                <Label htmlFor={`project-${type}`} className="text-sm">{type}</Label>
              </div>
            ))}
          </div>
        </div>

        {/* Work Preferences */}
        <div className="space-y-4">
          <Label className="text-base font-semibold">Work Preferences</Label>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="available_for_work"
              checked={data.available_for_work || false}
              onCheckedChange={(checked) => handleInputChange('available_for_work', checked)}
            />
            <Label htmlFor="available_for_work">Currently available for work</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="willing_to_relocate"
              checked={data.willing_to_relocate || false}
              onCheckedChange={(checked) => handleInputChange('willing_to_relocate', checked)}
            />
            <Label htmlFor="willing_to_relocate">Willing to relocate for projects</Label>
          </div>
        </div>

        {/* Professional Experience */}
        <div>
          <div className="flex justify-between items-center mb-4">
            <Label className="text-base font-semibold">Professional Experience</Label>
            <Button type="button" variant="outline" size="sm" onClick={addExperience}>
              <Plus className="h-4 w-4 mr-2" />
              Add Experience
            </Button>
          </div>
          
          {experience.map((exp, index) => (
            <Card key={index} className="mb-4">
              <CardContent className="pt-4">
                <div className="flex justify-between items-start mb-4">
                  <h4 className="font-medium">Experience #{index + 1}</h4>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => removeExperience(index)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label>Project Title *</Label>
                    <Input
                      value={exp.project_title || ''}
                      onChange={(e) => updateExperience(index, 'project_title', e.target.value)}
                      placeholder="Enter project title"
                    />
                  </div>
                  <div>
                    <Label>Project Type</Label>
                    <Select 
                      value={exp.project_type || ''} 
                      onValueChange={(value) => updateExperience(index, 'project_type', value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select project type" />
                      </SelectTrigger>
                      <SelectContent>
                        {PROJECT_TYPES.map(type => (
                          <SelectItem key={type} value={type}>{type}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>Role *</Label>
                    <Input
                      value={exp.role || ''}
                      onChange={(e) => updateExperience(index, 'role', e.target.value)}
                      placeholder="Your role in the project"
                    />
                  </div>
                  <div>
                    <Label>Production Company</Label>
                    <Input
                      value={exp.production_company || ''}
                      onChange={(e) => updateExperience(index, 'production_company', e.target.value)}
                      placeholder="Production company name"
                    />
                  </div>
                  <div>
                    <Label>Start Date</Label>
                    <Input
                      type="date"
                      value={exp.start_date || ''}
                      onChange={(e) => updateExperience(index, 'start_date', e.target.value)}
                    />
                  </div>
                  <div>
                    <Label>End Date</Label>
                    <Input
                      type="date"
                      value={exp.end_date || ''}
                      onChange={(e) => updateExperience(index, 'end_date', e.target.value)}
                    />
                  </div>
                </div>
                <div className="mt-4">
                  <Label>Description</Label>
                  <Textarea
                    value={exp.description || ''}
                    onChange={(e) => updateExperience(index, 'description', e.target.value)}
                    placeholder="Describe your role and achievements in this project..."
                    rows={3}
                  />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="flex justify-between pt-4">
          <Button type="button" variant="outline" onClick={onBack}>
            Back
          </Button>
          <Button onClick={onNext} disabled={!isFormValid()}>
            Next: Education & Training
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
