"use client"

import { useState } from "react"
import { TalentProfile } from "@/lib/types/talent"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Pencil, Loader2 } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

interface AboutCardProps {
  profile: Partial<TalentProfile> | null;
  isEditable?: boolean;
  onUpdate?: (section: string, data: any) => Promise<void>;
}

function AboutEditDialog({ profile, onUpdate }: { profile: Partial<TalentProfile>, onUpdate: (section: string, data: any) => Promise<void> }) {
  const [open, setOpen] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [formData, setFormData] = useState({
    bio: profile.bio || '',
    experience_level: profile.experience_level || 'Beginner',
    years_of_experience: profile.years_of_experience || 0,
    available_for_work: profile.available_for_work || false,
    willing_to_relocate: profile.willing_to_relocate || false
  })

  const handleSave = async () => {
    setIsSaving(true)
    try {
      await onUpdate('about', formData)
      setOpen(false)
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-500 hover:text-purple-600 hover:bg-purple-50 rounded-full" onClick={() => setFormData({
          bio: profile.bio || '',
          experience_level: profile.experience_level || 'Beginner',
          years_of_experience: profile.years_of_experience || 0,
          available_for_work: profile.available_for_work || false,
          willing_to_relocate: profile.willing_to_relocate || false
        })}>
          <Pencil className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit About Section</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <label htmlFor="bio" className="text-sm font-medium">Bio Description</label>
            <Textarea
              id="bio"
              value={formData.bio}
              onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
              className="min-h-[150px] resize-none"
              placeholder="Tell us about yourself..."
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <label htmlFor="experience_level" className="text-sm font-medium">Experience Level</label>
              <Select
                value={formData.experience_level}
                onValueChange={(value) => setFormData({ ...formData, experience_level: value as any })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Beginner">Beginner</SelectItem>
                  <SelectItem value="Intermediate">Intermediate</SelectItem>
                  <SelectItem value="Expert">Expert</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <label htmlFor="years" className="text-sm font-medium">Years of Experience</label>
              <Input
                id="years"
                type="number"
                min="0"
                value={formData.years_of_experience}
                onChange={(e) => setFormData({ ...formData, years_of_experience: parseInt(e.target.value) || 0 })}
              />
            </div>
          </div>
          <div className="flex items-center space-x-2 mt-2">
            <Checkbox
              id="available"
              checked={formData.available_for_work}
              onCheckedChange={(checked) => setFormData({ ...formData, available_for_work: checked as boolean })}
            />
            <label htmlFor="available" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
              Open to Work
            </label>
          </div>
          <div className="flex items-center space-x-2 mt-2">
            <Checkbox
              id="relocate"
              checked={formData.willing_to_relocate}
              onCheckedChange={(checked) => setFormData({ ...formData, willing_to_relocate: checked as boolean })}
            />
            <label htmlFor="relocate" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
              Willing to Relocate
            </label>
          </div>
        </div>
        <div className="flex justify-end gap-2">
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

export function AboutCard({ profile, isEditable, onUpdate }: AboutCardProps) {
  if (!profile) return null;

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 relative group">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-gray-900">About</h2>
        {isEditable && onUpdate && (
          <div className="opacity-0 group-hover:opacity-100 transition-opacity">
            <AboutEditDialog profile={profile} onUpdate={onUpdate} />
          </div>
        )}
      </div>
      
      <div className="text-gray-700 leading-relaxed whitespace-pre-wrap text-sm md:text-base">
        {profile.bio || (
          <span className="italic text-gray-400">No bio provided yet. Add a short professional summary to stand out.</span>
        )}
      </div>

      <div className="mt-6 flex flex-wrap gap-2">
        <Badge variant="secondary" className="bg-gray-100 text-gray-700 hover:bg-gray-200 font-normal px-3 py-1 text-sm rounded-full">
          {profile.experience_level || 'Beginner'} Level
        </Badge>
        {profile.years_of_experience ? (
          <Badge variant="secondary" className="bg-gray-100 text-gray-700 hover:bg-gray-200 font-normal px-3 py-1 text-sm rounded-full">
            {profile.years_of_experience}+ Years Exp.
          </Badge>
        ) : null}
        {profile.available_for_work && (
          <Badge variant="secondary" className="bg-green-50 text-green-700 border border-green-200 hover:bg-green-100 font-normal px-3 py-1 text-sm rounded-full">
            Open to Work
          </Badge>
        )}
        {profile.willing_to_relocate && (
          <Badge variant="secondary" className="bg-blue-50 text-blue-700 border border-blue-200 hover:bg-blue-100 font-normal px-3 py-1 text-sm rounded-full">
            Willing to Relocate
          </Badge>
        )}
      </div>
    </div>
  )
}
