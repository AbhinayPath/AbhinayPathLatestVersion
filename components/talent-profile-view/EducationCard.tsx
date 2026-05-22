"use client"

import { useState } from "react"
import { TalentEducation } from "@/lib/types/talent"
import { GraduationCap, Pencil, Plus, X, Loader2 } from "lucide-react"
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

interface EducationCardProps {
  education: Partial<TalentEducation>[];
  isEditable?: boolean;
  onUpdate?: (section: string, data: any) => Promise<void>;
}

function EducationEditDialog({ education, onUpdate }: { education: Partial<TalentEducation>[], onUpdate: (section: string, data: any) => Promise<void> }) {
  const [open, setOpen] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [formData, setFormData] = useState<Partial<TalentEducation>[]>(education || [])

  const handleSave = async () => {
    setIsSaving(true)
    try {
      await onUpdate('education', { education: formData })
      setOpen(false)
    } finally {
      setIsSaving(false)
    }
  }

  const addEducation = () => {
    setFormData([...formData, {
      institution: '',
      degree: '',
      field_of_study: '',
      start_date: '',
      end_date: '',
      description: ''
    }])
  }

  const removeEducation = (index: number) => {
    const newEdu = [...formData]
    newEdu.splice(index, 1)
    setFormData(newEdu)
  }

  const updateEducation = (index: number, field: string, value: string) => {
    const newEdu = [...formData]
    newEdu[index] = { ...newEdu[index], [field]: value }
    setFormData(newEdu)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-500 hover:text-purple-600 hover:bg-purple-50 rounded-full" onClick={() => setFormData(education || [])}>
          <Pencil className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[700px] max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit Education</DialogTitle>
        </DialogHeader>
        <div className="space-y-6 py-4">
          {formData.map((edu, index) => (
            <div key={index} className="border border-gray-200 rounded-lg p-4 space-y-4 relative">
              <div className="flex justify-between items-start">
                <h4 className="font-medium text-gray-900">Education {index + 1}</h4>
                <Button
                  onClick={() => removeEducation(index)}
                  variant="ghost"
                  size="sm"
                  className="text-red-600 hover:text-red-700 h-8 w-8 p-0"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Institution</label>
                  <Input
                    value={edu.institution || ''}
                    onChange={(e) => updateEducation(index, 'institution', e.target.value)}
                    placeholder="e.g. Harvard University"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Degree</label>
                  <Input
                    value={edu.degree || ''}
                    onChange={(e) => updateEducation(index, 'degree', e.target.value)}
                    placeholder="e.g. Bachelor of Arts"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Field of Study</label>
                  <Input
                    value={edu.field_of_study || ''}
                    onChange={(e) => updateEducation(index, 'field_of_study', e.target.value)}
                    placeholder="e.g. Theater"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
                  <Input
                    type="date"
                    value={edu.start_date || ''}
                    onChange={(e) => updateEducation(index, 'start_date', e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">End Date</label>
                  <Input
                    type="date"
                    value={edu.end_date || ''}
                    onChange={(e) => updateEducation(index, 'end_date', e.target.value)}
                    placeholder="Leave empty if current"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                  <Textarea
                    value={edu.description || ''}
                    onChange={(e) => updateEducation(index, 'description', e.target.value)}
                    placeholder="Describe your studies, achievements, etc..."
                    rows={3}
                  />
                </div>
              </div>
            </div>
          ))}
          <Button onClick={addEducation} variant="outline" className="w-full">
            <Plus className="h-4 w-4 mr-2" /> Add Education
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

export function EducationCard({ education, isEditable, onUpdate }: EducationCardProps) {
  const hasEducation = education && education.length > 0;

  if (!hasEducation && !isEditable) return null;

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 relative group">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-gray-900">Education</h2>
        {isEditable && onUpdate && (
          <div className="opacity-0 group-hover:opacity-100 transition-opacity">
            <EducationEditDialog education={education} onUpdate={onUpdate} />
          </div>
        )}
      </div>
      
      {!hasEducation ? (
        <p className="text-gray-500 italic text-sm">No education added yet.</p>
      ) : (
        <div className="space-y-6">
          {education.map((edu, index) => (
            <div key={edu.id || index} className="flex items-start group/item">
              <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-gray-50 border border-gray-100 shrink-0 mr-4 group-hover/item:border-primary/30 transition-colors">
                <GraduationCap className="w-6 h-6 text-gray-400 group-hover/item:text-primary transition-colors" />
              </div>
              
              <div className="flex-1 pb-4 border-b border-gray-50 last:border-0 last:pb-0">
                <h3 className="text-lg font-semibold text-gray-900">{edu.institution || 'Institution'}</h3>
                <div className="text-base text-gray-700 mt-0.5">{edu.degree} {edu.field_of_study ? `, ${edu.field_of_study}` : ''}</div>
                
                <div className="text-sm text-gray-500 mt-1">
                  {edu.start_date ? new Date(edu.start_date).toLocaleDateString('en-US', { month: 'short', year: 'numeric' }) : (edu.start_year || 'Start')} - {
                    edu.end_date ? new Date(edu.end_date).toLocaleDateString('en-US', { month: 'short', year: 'numeric' }) : (edu.currently_studying ? 'Present' : (edu.end_year || 'End'))
                  }
                </div>
                
                {edu.description && (
                  <div className="mt-3 text-sm text-gray-600 leading-relaxed whitespace-pre-wrap">
                    {edu.description}
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
