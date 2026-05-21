"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { MapPin, Mail, Download, UserPlus, Phone, Briefcase, Pencil, Image as ImageIcon, Loader2 } from "lucide-react"
import { TalentProfile } from "@/lib/types/talent"
import { Input } from "@/components/ui/input"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

interface HeroSectionProps {
  profile: Partial<TalentProfile> | null;
  connectionsCount?: number;
  isEditable?: boolean;
  onUpdate?: (section: string, data: any) => Promise<void>;
}

function BasicInfoEditDialog({ profile, onUpdate }: { profile: Partial<TalentProfile>, onUpdate: (section: string, data: any) => Promise<void> }) {
  const [open, setOpen] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [formData, setFormData] = useState({
    full_name: profile.full_name || '',
    phone: profile.phone || '',
    city: profile.city || '',
    state: profile.state || '',
    github_link: profile.github_link || '',
    linkedin_link: profile.linkedin_link || '',
    portfolio_website: profile.portfolio_website || '',
    x_link: profile.x_link || '',
    cover_image_url: profile.cover_image_url || '',
    profile_image_url: profile.profile_image_url || ''
  })

  const handleProfileImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setUploading(true)
    const formDataUpload = new FormData()
    formDataUpload.append('file', file)
    formDataUpload.append('type', 'avatar')

    try {
      const response = await fetch('/api/talent-profile/upload', {
        method: 'POST',
        body: formDataUpload
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Upload failed')
      }

      const data = await response.json()
      setFormData(prev => ({ ...prev, profile_image_url: data.url }))
    } catch (error: any) {
      console.error('Error uploading file:', error)
      alert(error.message || 'Upload failed')
    } finally {
      setUploading(false)
    }
  }

  const handleRemoveProfileImage = () => {
    setFormData(prev => ({ ...prev, profile_image_url: '' }))
  }

  const handleSave = async () => {
    setIsSaving(true)
    try {
      await onUpdate('basic', formData)
      setOpen(false)
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="rounded-full shadow-sm ml-2">
          <Pencil className="h-3.5 w-3.5 mr-2" /> Edit Profile
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px] max-h-[90vh]">
        <DialogHeader>
          <DialogTitle>Edit Basic Info</DialogTitle>
        </DialogHeader>
        <div className="max-h-[60vh] pr-4 overflow-y-auto">
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <label htmlFor="full_name" className="text-sm font-medium">Full Name</label>
              <Input
                id="full_name"
                value={formData.full_name}
                onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
              />
            </div>
            <div className="grid gap-2">
              <label htmlFor="phone" className="text-sm font-medium">Phone Number</label>
              <Input
                id="phone"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <label htmlFor="city" className="text-sm font-medium">City</label>
                <Input
                  id="city"
                  value={formData.city}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                />
              </div>
              <div className="grid gap-2">
                <label htmlFor="state" className="text-sm font-medium">State</label>
                <Input
                  id="state"
                  value={formData.state}
                  onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                />
              </div>
            </div>

            <div className="grid gap-2">
              <label className="text-sm font-medium">Profile Image</label>
              <div className="flex items-center gap-4">
                <Avatar className="w-16 h-16 border">
                  <AvatarImage src={formData.profile_image_url} />
                  <AvatarFallback>{formData.full_name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="flex-1 space-y-2">
                  <input
                    type="file"
                    id="profile-upload"
                    className="hidden"
                    accept="image/*"
                    onChange={handleProfileImageUpload}
                    disabled={uploading}
                  />
                  <div className="flex gap-2">
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      className="flex-1"
                      asChild
                      disabled={uploading}
                    >
                      <label htmlFor="profile-upload" className="cursor-pointer">
                        {uploading ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <ImageIcon className="h-4 w-4 mr-2" />}
                        {uploading ? 'Uploading...' : 'Upload photo'}
                      </label>
                    </Button>
                    {formData.profile_image_url && (
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="text-red-600 hover:text-red-700 hover:bg-red-50"
                        onClick={handleRemoveProfileImage}
                        disabled={uploading}
                      >
                        Remove
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="grid gap-2">
              <label htmlFor="profile_image_url" className="text-sm font-medium">Profile Image URL</label>
              <Input
                id="profile_image_url"
                value={formData.profile_image_url}
                onChange={(e) => setFormData({ ...formData, profile_image_url: e.target.value })}
                placeholder="https://example.com/avatar.jpg"
              />
            </div>
            
            <div className="border-t pt-4 mt-2">
              <h4 className="text-sm font-semibold mb-3">Social Links</h4>
              <div className="grid gap-3">
                <div className="grid gap-2">
                  <label htmlFor="portfolio_website" className="text-xs font-medium text-gray-500">Portfolio Website</label>
                  <Input
                    id="portfolio_website"
                    value={formData.portfolio_website}
                    onChange={(e) => setFormData({ ...formData, portfolio_website: e.target.value })}
                    placeholder="https://yourwebsite.com"
                  />
                </div>
                <div className="grid gap-2">
                  <label htmlFor="linkedin_link" className="text-xs font-medium text-gray-500">LinkedIn URL</label>
                  <Input
                    id="linkedin_link"
                    value={formData.linkedin_link}
                    onChange={(e) => setFormData({ ...formData, linkedin_link: e.target.value })}
                    placeholder="https://linkedin.com/in/username"
                  />
                </div>
                <div className="grid gap-2">
                  <label htmlFor="github_link" className="text-xs font-medium text-gray-500">GitHub URL</label>
                  <Input
                    id="github_link"
                    value={formData.github_link}
                    onChange={(e) => setFormData({ ...formData, github_link: e.target.value })}
                    placeholder="https://github.com/username"
                  />
                </div>
                <div className="grid gap-2">
                  <label htmlFor="x_link" className="text-xs font-medium text-gray-500">X (Twitter) URL</label>
                  <Input
                    id="x_link"
                    value={formData.x_link}
                    onChange={(e) => setFormData({ ...formData, x_link: e.target.value })}
                    placeholder="https://x.com/username"
                  />
                </div>
              </div>
            </div>
          </div>
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

function CoverImageEditDialog({ profile, onUpdate }: { profile: Partial<TalentProfile>, onUpdate: (section: string, data: any) => Promise<void> }) {
  const [open, setOpen] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [coverImageUrl, setCoverImageUrl] = useState(profile.cover_image_url || '')

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setUploading(true)
    const formData = new FormData()
    formData.append('file', file)
    formData.append('type', 'cover')

    try {
      const response = await fetch('/api/talent-profile/upload', {
        method: 'POST',
        body: formData
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Upload failed')
      }

      const data = await response.json()
      setCoverImageUrl(data.url)
    } catch (error: any) {
      console.error('Error uploading file:', error)
      alert(error.message || 'Upload failed')
    } finally {
      setUploading(false)
    }
  }

  const handleRemoveCover = () => {
    setCoverImageUrl('')
  }

  const handleSave = async () => {
    setIsSaving(true)
    try {
      await onUpdate('basic', { cover_image_url: coverImageUrl })
      setOpen(false)
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="secondary" size="sm" className="absolute top-4 right-4 bg-white/80 hover:bg-white text-gray-800 backdrop-blur-sm rounded-full shadow-sm">
          <ImageIcon className="h-4 w-4 mr-2" />
          Edit Cover
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Cover Image</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Upload Image</label>
              <div className="flex flex-col items-center justify-center border-2 border-dashed border-gray-200 rounded-xl p-6 hover:border-purple-400 transition-colors bg-gray-50/50">
                <input
                  type="file"
                  id="cover-upload"
                  className="hidden"
                  accept="image/*"
                  onChange={handleFileChange}
                  disabled={uploading}
                />
                <label
                  htmlFor="cover-upload"
                  className="flex flex-col items-center justify-center cursor-pointer w-full h-full"
                >
                  {uploading ? (
                    <Loader2 className="h-8 w-8 text-purple-600 animate-spin" />
                  ) : (
                    <>
                      <div className="w-12 h-12 bg-purple-50 rounded-full flex items-center justify-center mb-3">
                        <ImageIcon className="h-6 w-6 text-purple-600" />
                      </div>
                      <p className="text-sm font-medium text-gray-700">Click to upload or drag and drop</p>
                      <p className="text-xs text-gray-500 mt-1">PNG, JPG or WebP (max. 10MB)</p>
                    </>
                  )}
                </label>
              </div>
            </div>

            <div className="relative h-32 w-full rounded-lg overflow-hidden border border-gray-100 bg-gray-50">
              {coverImageUrl ? (
                <>
                  <img src={coverImageUrl} alt="Cover preview" className="w-full h-full object-cover" />
                  <Button
                    type="button"
                    variant="destructive"
                    size="sm"
                    className="absolute top-2 right-2 h-7 px-2 text-xs"
                    onClick={handleRemoveCover}
                    disabled={uploading}
                  >
                    Remove
                  </Button>
                </>
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-400 text-sm italic">
                  No image selected
                </div>
              )}
            </div>

    
          </div>
        </div>
        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={() => setOpen(false)} disabled={isSaving || uploading}>Cancel</Button>
          <Button onClick={handleSave} disabled={isSaving || uploading} className="bg-purple-600 hover:bg-purple-700">
            {isSaving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {isSaving ? "Saving..." : "Save Changes"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export function HeroSection({ profile, connectionsCount = 500, isEditable, onUpdate }: HeroSectionProps) {
  if (!profile) return null;

  const getInitials = () => {
    if (!profile.full_name) return 'U';
    return profile.full_name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden relative">
      {/* Cover Image */}
      <div 
        className="h-48 md:h-64 w-full relative group bg-gradient-to-r from-slate-100 to-slate-200"
        style={profile.cover_image_url ? {
          backgroundImage: `url(${profile.cover_image_url})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        } : {}}
      >
        {!profile.cover_image_url && (
          <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] mix-blend-overlay"></div>
        )}
        {isEditable && onUpdate && (
          <div className="opacity-0 group-hover:opacity-100 transition-opacity">
            <CoverImageEditDialog profile={profile} onUpdate={onUpdate} />
          </div>
        )}
      </div>
      
      {/* Profile Content */}
      <div className="px-6 pb-6 relative">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 -mt-16 md:-mt-20 mb-4">
          <div className="flex flex-col md:flex-row items-center md:items-end gap-4 md:gap-6">
            <div className="relative group/avatar">
              <Avatar className="w-32 h-32 md:w-40 md:h-40 border-4 border-white shadow-lg bg-white">
                <AvatarImage src={profile.profile_image_url || undefined} alt={profile.full_name || 'Profile'} className="object-cover" />
                <AvatarFallback className="text-4xl font-semibold bg-primary/10 text-primary">{getInitials()}</AvatarFallback>
              </Avatar>
            </div>
            
            <div className="text-center md:text-left pb-2">
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900 flex items-center justify-center md:justify-start">
                {profile.full_name}
                {profile.verified && (
                  <span className="inline-flex ml-2 align-middle" title="Verified">
                    <svg className="w-6 h-6 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </span>
                )}
              </h1>
              <p className="text-lg text-gray-700 font-medium mt-1">
                {profile.bio ? profile.bio.slice(0, 60) + (profile.bio.length > 60 ? '...' : '') : `${profile.experience_level || 'Aspiring'} ${profile.acting_skills?.[0] || 'Artist'}`}
              </p>
              
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 mt-2 text-sm text-gray-500">
                {(profile.city || profile.state) && (
                  <span className="flex items-center">
                    <MapPin className="w-4 h-4 mr-1 text-gray-400" />
                    {[profile.city, profile.state].filter(Boolean).join(', ')}
                  </span>
                )}
                {profile.phone && isEditable && (
                  <span className="flex items-center text-gray-500">
                    <Phone className="w-4 h-4 mr-1 text-gray-400" />
                    {profile.phone}
                  </span>
                )}
              </div>
            </div>
          </div>
          
          {/* Action Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-2 pb-2">
            {!isEditable ? (
              <>
                <Button size="sm" className="rounded-full px-6 shadow-sm">
                  <UserPlus className="w-4 h-4 mr-2" />
                  Follow
                </Button>
                <Button size="sm" variant="outline" className="rounded-full px-6 shadow-sm border-gray-200">
                  <Mail className="w-4 h-4 mr-2" />
                  Message
                </Button>
                <Button size="sm" variant="secondary" className="rounded-full px-6 shadow-sm">
                  <Briefcase className="w-4 h-4 mr-2" />
                  Hire
                </Button>
                <Button size="sm" variant="ghost" className="rounded-full px-4 shadow-sm border border-gray-100 hover:bg-gray-50 text-gray-600">
                  <Download className="w-4 h-4" />
                </Button>
              </>
            ) : (
              onUpdate && <BasicInfoEditDialog profile={profile} onUpdate={onUpdate} />
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
