"use client"

import { TalentProfile } from "@/lib/types/talent"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Mail, Phone, Globe, UserPlus, FileText, CheckCircle2 } from "lucide-react"
import { ContactInfoDialog } from "@/components/ui/contact-info-dialog"
import { toast } from "sonner"

interface RightSidebarProps {
  profile: Partial<TalentProfile> | null;
  isEditable?: boolean;
}

export function RightSidebar({ profile, isEditable }: RightSidebarProps) {
  if (!profile) return null;

  const suggestedProfiles = [
    { id: 1, name: "David Kim", role: "Actor | Voice Artist", avatar: "" },
    { id: 2, name: "Anita Patel", role: "Director of Photography", avatar: "" },
    { id: 3, name: "James Wilson", role: "Screenwriter", avatar: "" }
  ];

  return (
    <div className="space-y-6 sticky top-24">
      {/* Availability Card */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
        <h3 className="text-base font-bold text-gray-900 mb-4">Availability</h3>
        <div className="space-y-3">
          <div className="flex items-center text-sm">
            <CheckCircle2 className="w-4 h-4 text-green-500 mr-2" />
            <span className="text-gray-700">Currently taking new projects</span>
          </div>
          {profile.willing_to_relocate && (
            <div className="flex items-center text-sm">
              <CheckCircle2 className="w-4 h-4 text-green-500 mr-2" />
              <span className="text-gray-700">Willing to relocate</span>
            </div>
          )}
          {profile.project_types && profile.project_types.length > 0 && (
            <div className="mt-4 pt-4 border-t border-gray-100">
              <p className="text-xs text-gray-500 font-medium uppercase mb-2">Preferred Projects</p>
              <div className="flex flex-wrap gap-1.5">
                {profile.project_types.map(pt => (
                  <span key={pt} className="text-xs bg-gray-50 text-gray-600 px-2 py-1 rounded border border-gray-100">{pt}</span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Contact Info Card */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
        <h3 className="text-base font-bold text-gray-900 mb-4">Contact Info</h3>
        <div className="space-y-3 mb-4">
          {profile.email && (
            <div className="flex items-center text-sm text-gray-600">
              <Mail className="w-4 h-4 mr-3 text-gray-400" />
              <span className="truncate">{profile.email}</span>
            </div>
          )}
          {profile.phone && (
            <div className="flex items-center text-sm text-gray-600">
              <Phone className="w-4 h-4 mr-3 text-gray-400" />
              <span>{profile.phone}</span>
            </div>
          )}
          {profile.website_url && (
            <div className="flex items-center text-sm text-gray-600">
              <Globe className="w-4 h-4 mr-3 text-gray-400" />
              <a href={profile.website_url} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline truncate">
                {profile.website_url.replace(/^https?:\/\//, '')}
              </a>
            </div>
          )}
        </div>
        <ContactInfoDialog profile={profile as TalentProfile}>
          <Button variant="outline" className="w-full justify-center">
            View Full Contact Info
          </Button>
        </ContactInfoDialog>
      </div>

      {/* Profile Link/Share Card */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
        <h3 className="text-base font-bold text-gray-900 mb-2">Profile Link</h3>
        <p className="text-sm text-gray-500 mb-3">Share this profile to showcase your talent.</p>
        <div className="flex gap-2">
          <input
            type="text"
            readOnly
            value={`${typeof window !== 'undefined' ? window.location.origin : 'abhinaypath.com'}/talent-directory/${profile.id}`}
            className="text-xs bg-gray-50 border border-gray-200 rounded-md px-3 py-2 flex-1 outline-none text-gray-600 truncate"
          />
          <Button 
            size="sm" 
            variant="secondary" 
            className="px-3"
            onClick={() => {
              if (typeof window !== 'undefined') {
                const url = `${window.location.origin}/talent-directory/${profile.id}`
                navigator.clipboard.writeText(url)
                toast.success("Profile link copied!")
              }
            }}
          >Copy</Button>
        </div>
      </div>

      {/* Suggested Profiles */}

    </div>
  )
}
