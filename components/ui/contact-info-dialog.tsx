'use client'

import * as React from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Mail, Phone, MapPin, Globe, Instagram, Facebook, Youtube } from "lucide-react"
import { TalentProfile } from "@/lib/types/talent"

interface ContactInfoDialogProps {
  profile: TalentProfile
  children: React.ReactNode
}

export function ContactInfoDialog({ profile, children }: ContactInfoDialogProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Mail className="h-5 w-5" />
            Contact Information
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          {/* Email */}
          {profile.email && (
            <div className="flex items-center gap-3">
              <Mail className="h-4 w-4 text-muted-foreground" />
              <div>
                <p className="text-sm font-medium">Email</p>
                <p className="text-sm text-muted-foreground">{profile.email}</p>
              </div>
            </div>
          )}

          {/* Phone */}
          {profile.phone && (
            <div className="flex items-center gap-3">
              <Phone className="h-4 w-4 text-muted-foreground" />
              <div>
                <p className="text-sm font-medium">Phone</p>
                <p className="text-sm text-muted-foreground">{profile.phone}</p>
              </div>
            </div>
          )}

          {/* Location */}
          {(profile.city || profile.state) && (
            <div className="flex items-center gap-3">
              <MapPin className="h-4 w-4 text-muted-foreground" />
              <div>
                <p className="text-sm font-medium">Location</p>
                <p className="text-sm text-muted-foreground">
                  {[profile.city, profile.state].filter(Boolean).join(', ')}
                </p>
              </div>
            </div>
          )}

          {/* Social Media */}
          <div className="space-y-2">
            <p className="text-sm font-medium">Social Media</p>
            <div className="flex flex-wrap gap-2">
              {profile.instagram_url && (
                <Button
                  variant="outline"
                  size="sm"
                  asChild
                  className="h-8 px-3"
                >
                  <a href={profile.instagram_url} target="_blank" rel="noopener noreferrer">
                    <Instagram className="h-3 w-3 mr-1" />
                    Instagram
                  </a>
                </Button>
              )}
              {profile.facebook_url && (
                <Button
                  variant="outline"
                  size="sm"
                  asChild
                  className="h-8 px-3"
                >
                  <a href={profile.facebook_url} target="_blank" rel="noopener noreferrer">
                    <Facebook className="h-3 w-3 mr-1" />
                    Facebook
                  </a>
                </Button>
              )}
              {profile.youtube_url && (
                <Button
                  variant="outline"
                  size="sm"
                  asChild
                  className="h-8 px-3"
                >
                  <a href={profile.youtube_url} target="_blank" rel="noopener noreferrer">
                    <Youtube className="h-3 w-3 mr-1" />
                    YouTube
                  </a>
                </Button>
              )}
            </div>
          </div>

          {/* Additional Info */}
          <div className="space-y-2">
            <p className="text-sm font-medium">Availability</p>
            <div className="flex gap-2">
              <Badge variant={profile.available_for_work ? "default" : "secondary"}>
                {profile.available_for_work ? "Available for Work" : "Not Available"}
              </Badge>
              {profile.willing_to_relocate && (
                <Badge variant="outline">Willing to Relocate</Badge>
              )}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}