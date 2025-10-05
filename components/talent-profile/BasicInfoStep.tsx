'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { X } from 'lucide-react'
import { ACTING_SKILLS, INDIAN_LANGUAGES, EXPERIENCE_LEVELS } from '@/lib/types/talent'

interface BasicInfoStepProps {
  data: any
  onUpdate: (data: any) => void
  onNext: () => void
  onBack?: () => void
}

export default function BasicInfoStep({ data, onUpdate, onNext, onBack }: BasicInfoStepProps) {
  const [skills, setSkills] = useState<string[]>(data.acting_skills || [])
  const [languages, setLanguages] = useState<string[]>(data.languages || [])
  const [newSkill, setNewSkill] = useState('')
  const [newLanguage, setNewLanguage] = useState('')

  const handleInputChange = (field: string, value: any) => {
    onUpdate({ ...data, [field]: value })
  }

  const addSkill = (skill: string) => {
    if (skill && !skills.includes(skill)) {
      const updatedSkills = [...skills, skill]
      setSkills(updatedSkills)
      onUpdate({ ...data, acting_skills: updatedSkills })
      setNewSkill('')
    }
  }

  const removeSkill = (skill: string) => {
    const updatedSkills = skills.filter(s => s !== skill)
    setSkills(updatedSkills)
    onUpdate({ ...data, acting_skills: updatedSkills })
  }

  const addLanguage = (language: string) => {
    if (language && !languages.includes(language)) {
      const updatedLanguages = [...languages, language]
      setLanguages(updatedLanguages)
      onUpdate({ ...data, languages: updatedLanguages })
      setNewLanguage('')
    }
  }

  const removeLanguage = (language: string) => {
    const updatedLanguages = languages.filter(l => l !== language)
    setLanguages(updatedLanguages)
    onUpdate({ ...data, languages: updatedLanguages })
  }

  const isFormValid = () => {
    return data.full_name && data.email && data.phone && data.date_of_birth && 
           data.gender && data.city && data.state && data.country && data.bio
  }

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle>Basic Information</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="full_name">Full Name *</Label>
            <Input
              id="full_name"
              value={data.full_name || ''}
              onChange={(e) => handleInputChange('full_name', e.target.value)}
              placeholder="Enter your full name"
            />
          </div>
          <div>
            <Label htmlFor="email">Email *</Label>
            <Input
              id="email"
              type="email"
              value={data.email || ''}
              onChange={(e) => handleInputChange('email', e.target.value)}
              placeholder="Enter your email"
            />
          </div>
          <div>
            <Label htmlFor="phone">Phone Number *</Label>
            <Input
              id="phone"
              value={data.phone || ''}
              onChange={(e) => handleInputChange('phone', e.target.value)}
              placeholder="Enter your phone number"
            />
          </div>
          <div>
            <Label htmlFor="date_of_birth">Date of Birth *</Label>
            <Input
              id="date_of_birth"
              type="date"
              value={data.date_of_birth || ''}
              onChange={(e) => handleInputChange('date_of_birth', e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="gender">Gender *</Label>
            <Select value={data.gender || ''} onValueChange={(value) => handleInputChange('gender', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select gender" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Male">Male</SelectItem>
                <SelectItem value="Female">Female</SelectItem>
                <SelectItem value="Non-binary">Non-binary</SelectItem>
                <SelectItem value="Prefer not to say">Prefer not to say</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="height">Height</Label>
            <Input
              id="height"
              value={data.height || ''}
              onChange={(e) => handleInputChange('height', e.target.value)}
              placeholder="e.g., 5'8\"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <Label htmlFor="city">City *</Label>
            <Input
              id="city"
              value={data.city || ''}
              onChange={(e) => handleInputChange('city', e.target.value)}
              placeholder="Enter your city"
            />
          </div>
          <div>
            <Label htmlFor="state">State *</Label>
            <Input
              id="state"
              value={data.state || ''}
              onChange={(e) => handleInputChange('state', e.target.value)}
              placeholder="Enter your state"
            />
          </div>
          <div>
            <Label htmlFor="country">Country *</Label>
            <Input
              id="country"
              value={data.country || ''}
              onChange={(e) => handleInputChange('country', e.target.value)}
              placeholder="Enter your country"
            />
          </div>
        </div>

        <div>
          <Label htmlFor="bio">Bio *</Label>
          <Textarea
            id="bio"
            value={data.bio || ''}
            onChange={(e) => handleInputChange('bio', e.target.value)}
            placeholder="Tell us about yourself, your passion for acting, and what makes you unique..."
            rows={4}
          />
        </div>

        <div>
          <Label htmlFor="experience_level">Experience Level</Label>
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
          <Label>Acting Skills</Label>
          <div className="flex flex-wrap gap-2 mb-2">
            {skills.map(skill => (
              <Badge key={skill} variant="secondary" className="flex items-center gap-1">
                {skill}
                <X className="h-3 w-3 cursor-pointer" onClick={() => removeSkill(skill)} />
              </Badge>
            ))}
          </div>
          <div className="flex gap-2">
            <Select value={newSkill} onValueChange={setNewSkill}>
              <SelectTrigger className="flex-1">
                <SelectValue placeholder="Select a skill" />
              </SelectTrigger>
              <SelectContent>
                {ACTING_SKILLS.filter(skill => !skills.includes(skill)).map(skill => (
                  <SelectItem key={skill} value={skill}>{skill}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => addSkill(newSkill)}
              disabled={!newSkill}
            >
              Add
            </Button>
          </div>
        </div>

        <div>
          <Label>Languages</Label>
          <div className="flex flex-wrap gap-2 mb-2">
            {languages.map(language => (
              <Badge key={language} variant="secondary" className="flex items-center gap-1">
                {language}
                <X className="h-3 w-3 cursor-pointer" onClick={() => removeLanguage(language)} />
              </Badge>
            ))}
          </div>
          <div className="flex gap-2">
            <Select value={newLanguage} onValueChange={setNewLanguage}>
              <SelectTrigger className="flex-1">
                <SelectValue placeholder="Select a language" />
              </SelectTrigger>
              <SelectContent>
                {INDIAN_LANGUAGES.filter(lang => !languages.includes(lang)).map(lang => (
                  <SelectItem key={lang} value={lang}>{lang}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => addLanguage(newLanguage)}
              disabled={!newLanguage}
            >
              Add
            </Button>
          </div>
        </div>

        <div className="flex justify-between pt-4">
          {onBack && (
            <Button type="button" variant="outline" onClick={onBack}>
              Back
            </Button>
          )}
          <Button 
            onClick={onNext}
            disabled={!isFormValid()}
            className={!onBack ? 'ml-auto' : ''}
          >
            Next: Professional Info
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
