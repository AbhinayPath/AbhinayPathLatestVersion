"use client"

import { useState } from "react"
import { TalentProfile } from "@/lib/types/talent"
import { Badge } from "@/components/ui/badge"
import { Check, Pencil, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { MultiSelect } from "@/components/ui/multiselect"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

interface SkillsSectionProps {
  profile: Partial<TalentProfile> | null;
  isEditable?: boolean;
  onUpdate?: (section: string, data: any) => Promise<void>;
}

const ACTING_SKILLS = [
  { label: 'Method Acting', value: 'Method Acting' },
  { label: 'Improvisation', value: 'Improvisation' },
  { label: 'Comedy', value: 'Comedy' },
  { label: 'Drama', value: 'Drama' },
  { label: 'Voice Acting', value: 'Voice Acting' },
  { label: 'Motion Capture', value: 'Motion Capture' },
  { label: 'Stage Combat', value: 'Stage Combat' },
  { label: 'Teleprompter', value: 'Teleprompter' }
]

const DANCE_STYLES = [
  { label: 'Ballet', value: 'Ballet' },
  { label: 'Jazz', value: 'Jazz' },
  { label: 'Tap', value: 'Tap' },
  { label: 'Hip Hop', value: 'Hip Hop' },
  { label: 'Contemporary', value: 'Contemporary' },
  { label: 'Ballroom', value: 'Ballroom' },
  { label: 'Bollywood', value: 'Bollywood' },
  { label: 'Classical Indian', value: 'Classical Indian' }
]

const SPECIAL_SKILLS = [
  { label: 'Stunts', value: 'Stunts' },
  { label: 'Wire Work', value: 'Wire Work' },
  { label: 'Martial Arts', value: 'Martial Arts' },
  { label: 'Acrobatics', value: 'Acrobatics' },
  { label: 'Firearms', value: 'Firearms' },
  { label: 'Horseback Riding', value: 'Horseback Riding' },
  { label: 'Singing', value: 'Singing' },
  { label: 'Instruments', value: 'Instruments' },
  { label: 'Juggling', value: 'Juggling' }
]

function SkillsEditDialog({ profile, onUpdate }: { profile: Partial<TalentProfile>, onUpdate: (section: string, data: any) => Promise<void> }) {
  const [open, setOpen] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [formData, setFormData] = useState({
    acting_skills: profile.acting_skills || [],
    dance_styles: profile.dance_styles || [],
    special_skills: profile.special_skills || []
  })

  const handleSave = async () => {
    setIsSaving(true)
    try {
      await onUpdate('skills', formData)
      setOpen(false)
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-500 hover:text-purple-600 hover:bg-purple-50 rounded-full" onClick={() => setFormData({
          acting_skills: profile.acting_skills || [],
          dance_styles: profile.dance_styles || [],
          special_skills: profile.special_skills || []
        })}>
          <Pencil className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Edit Skills & Endorsements</DialogTitle>
        </DialogHeader>
        <div className="grid gap-6 py-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Acting Skills</label>
            <MultiSelect
              options={ACTING_SKILLS}
              onChange={(vals) => setFormData({ ...formData, acting_skills: vals })}
              selected={formData.acting_skills}
              placeholder="Select acting skills"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Dance Styles</label>
            <MultiSelect
              options={DANCE_STYLES}
              onChange={(vals) => setFormData({ ...formData, dance_styles: vals })}
              selected={formData.dance_styles}
              placeholder="Select dance styles"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Special Skills</label>
            <MultiSelect
              options={SPECIAL_SKILLS}
              onChange={(vals) => setFormData({ ...formData, special_skills: vals })}
              selected={formData.special_skills}
              placeholder="Select special skills"
            />
          </div>
        </div>
        <div className="flex justify-end gap-2 mt-4">
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

export function SkillsSection({ profile, isEditable, onUpdate }: SkillsSectionProps) {
  if (!profile) return null;

  const hasSkills = (profile.acting_skills?.length || 0) > 0 || 
                    (profile.dance_styles?.length || 0) > 0 || 
                    (profile.special_skills?.length || 0) > 0;

  if (!hasSkills && !isEditable) return null;

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 relative group">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-gray-900">Skills & Endorsements</h2>
        {isEditable && onUpdate && (
          <div className="opacity-0 group-hover:opacity-100 transition-opacity">
            <SkillsEditDialog profile={profile} onUpdate={onUpdate} />
          </div>
        )}
      </div>
      
      {!hasSkills ? (
        <p className="text-gray-500 italic text-sm">No skills added yet.</p>
      ) : (
        <div className="space-y-6">
          {profile.acting_skills && profile.acting_skills.length > 0 && (
            <div>
              <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-3">Acting</h3>
              <div className="flex flex-wrap gap-2">
                {profile.acting_skills.map((skill) => (
                  <div key={skill} className="inline-flex items-center group/skill px-3 py-1.5 bg-white border border-gray-200 hover:border-primary hover:shadow-sm rounded-full transition-all">
                    <span className="text-sm font-medium text-gray-800">{skill}</span>
                    <div className="ml-2 pl-2 border-l border-gray-200 flex items-center text-primary font-semibold text-xs">
                      <Check className="w-3 h-3 mr-0.5" /> 9+
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {profile.dance_styles && profile.dance_styles.length > 0 && (
            <div>
              <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-3">Dance</h3>
              <div className="flex flex-wrap gap-2">
                {profile.dance_styles.map((style) => (
                  <div key={style} className="inline-flex items-center group/skill px-3 py-1.5 bg-white border border-gray-200 hover:border-primary hover:shadow-sm rounded-full transition-all">
                    <span className="text-sm font-medium text-gray-800">{style}</span>
                    <div className="ml-2 pl-2 border-l border-gray-200 flex items-center text-primary font-semibold text-xs">
                      <Check className="w-3 h-3 mr-0.5" /> 5+
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {profile.special_skills && profile.special_skills.length > 0 && (
            <div>
              <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-3">Special Skills</h3>
              <div className="flex flex-wrap gap-2">
                {profile.special_skills.map((skill) => (
                  <div key={skill} className="inline-flex items-center group/skill px-3 py-1.5 bg-white border border-gray-200 hover:border-primary hover:shadow-sm rounded-full transition-all">
                    <span className="text-sm font-medium text-gray-800">{skill}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
