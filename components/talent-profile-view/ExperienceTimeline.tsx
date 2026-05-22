"use client"

import { useState } from "react"
import { TalentExperience } from "@/lib/types/talent"
import { Building2, Calendar, MapPin, Pencil, Plus, X, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

interface ExperienceTimelineProps {
  experience: Partial<TalentExperience>[];
  isEditable?: boolean;
  onUpdate?: (section: string, data: any) => Promise<void>;
}

function ExperienceEditDialog({ experience, onUpdate }: { experience: Partial<TalentExperience>[], onUpdate: (section: string, data: any) => Promise<void> }) {
  const [open, setOpen] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [formData, setFormData] = useState<Partial<TalentExperience>[]>(experience || [])

  const handleSave = async () => {
    setIsSaving(true)
    try {
      await onUpdate('experience', { experience: formData })
      setOpen(false)
    } finally {
      setIsSaving(false)
    }
  }

  const addExperience = () => {
    setFormData([...formData, {
      project_title: '',
      project_type: 'Other' as any,
      role: '',
      production_company: '',
      start_date: '',
      end_date: '',
      description: ''
    }])
  }

  const removeExperience = (index: number) => {
    const newExp = [...formData]
    newExp.splice(index, 1)
    setFormData(newExp)
  }

  const updateExperience = (index: number, field: string, value: string) => {
    const newExp = [...formData]
    newExp[index] = { ...newExp[index], [field]: value }
    setFormData(newExp)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-500 hover:text-purple-600 hover:bg-purple-50 rounded-full" onClick={() => setFormData(experience || [])}>
          <Pencil className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[700px] max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit Experience</DialogTitle>
        </DialogHeader>
        <div className="space-y-6 py-4">
          {formData.map((exp, index) => (
            <div key={index} className="border border-gray-200 rounded-lg p-4 space-y-4 relative">
              <div className="flex justify-between items-start">
                <h4 className="font-medium text-gray-900">Experience {index + 1}</h4>
                <Button
                  onClick={() => removeExperience(index)}
                  variant="ghost"
                  size="sm"
                  className="text-red-600 hover:text-red-700 h-8 w-8 p-0"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Project Title</label>
                  <Input
                    value={exp.project_title || ''}
                    onChange={(e) => updateExperience(index, 'project_title', e.target.value)}
                    placeholder="e.g. The Great Movie"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
                  <Input
                    value={exp.role || ''}
                    onChange={(e) => updateExperience(index, 'role', e.target.value)}
                    placeholder="e.g. Lead Actor"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Project Type</label>
                  <Input
                    value={exp.project_type || ''}
                    onChange={(e) => updateExperience(index, 'project_type', e.target.value)}
                    placeholder="e.g. Film, TV Show, Commercial"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Production Company</label>
                  <Input
                    value={exp.production_company || ''}
                    onChange={(e) => updateExperience(index, 'production_company', e.target.value)}
                    placeholder="e.g. Warner Bros"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
                  <Input
                    type="date"
                    value={exp.start_date || ''}
                    onChange={(e) => updateExperience(index, 'start_date', e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">End Date</label>
                  <Input
                    type="date"
                    value={exp.end_date || ''}
                    onChange={(e) => updateExperience(index, 'end_date', e.target.value)}
                    placeholder="Leave empty if current"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                  <Textarea
                    value={exp.description || ''}
                    onChange={(e) => updateExperience(index, 'description', e.target.value)}
                    placeholder="Describe your role and achievements..."
                    rows={3}
                  />
                </div>
              </div>
            </div>
          ))}
          <Button onClick={addExperience} variant="outline" className="w-full">
            <Plus className="h-4 w-4 mr-2" /> Add Experience
          </Button>
        </div>
        <div className="flex justify-end gap-2 pt-4 border-t">
          <Button variant="outline" onClick={() => setOpen(false)} disabled={isSaving}>Cancel</Button>
          <Button onClick={handleSave} disabled={isSaving} className="bg-purple-600 hover:bg-purple-700">
            {isSaving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {isSaving ? "Saving..." : "Save Changes"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export function ExperienceTimeline({ experience, isEditable, onUpdate }: ExperienceTimelineProps) {
  const hasExperience = experience && experience.length > 0;

  if (!hasExperience && !isEditable) return null;

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 relative group">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-gray-900">Experience</h2>
        {isEditable && onUpdate && (
          <div className="opacity-0 group-hover:opacity-100 transition-opacity">
            <ExperienceEditDialog experience={experience} onUpdate={onUpdate} />
          </div>
        )}
      </div>
      
      {!hasExperience ? (
        <p className="text-gray-500 italic text-sm">No experience added yet.</p>
      ) : (
        <div className="space-y-8 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:ml-[2.25rem] before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-gray-200 before:to-transparent">
          {experience.map((exp, index) => (
            <div key={exp.id || index} className="relative flex items-start group/item">
              {/* Logo/Icon Container */}
              <div className="flex items-center justify-center w-10 h-10 md:w-16 md:h-16 rounded-lg bg-gray-50 border border-gray-100 z-10 shrink-0 md:mr-6 mr-4 group-hover/item:border-primary/30 transition-colors shadow-sm">
                <Building2 className="w-5 h-5 md:w-8 md:h-8 text-gray-400 group-hover/item:text-primary transition-colors" />
              </div>
              
              {/* Content */}
              <div className="flex-1 pb-4">
                <h3 className="text-lg font-semibold text-gray-900">{exp.role || 'Role Title'}</h3>
                <div className="text-base text-gray-700 font-medium mt-0.5">{exp.project_title || 'Project'} {exp.production_company ? `• ${exp.production_company}` : ''}</div>
                
                <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-gray-500 mt-2">
                  <span className="flex items-center">
                    <Calendar className="w-3.5 h-3.5 mr-1" />
                    {exp.start_date ? new Date(exp.start_date).toLocaleDateString('en-US', { month: 'short', year: 'numeric' }) : 'Start Date'} - {
                      exp.end_date ? new Date(exp.end_date).toLocaleDateString('en-US', { month: 'short', year: 'numeric' }) : 'Present'
                    }
                  </span>
                  {exp.project_type && (
                    <span className="flex items-center text-xs font-medium px-2 py-0.5 bg-gray-100 rounded-md">
                      {exp.project_type}
                    </span>
                  )}
                </div>
                
                {exp.description && (
                  <div className="mt-3 text-sm text-gray-600 leading-relaxed whitespace-pre-wrap">
                    {exp.description}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
