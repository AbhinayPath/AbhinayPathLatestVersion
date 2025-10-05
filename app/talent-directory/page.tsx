"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MapPin, Search, Filter, Star } from "lucide-react";
import Link from "next/link";

interface TalentProfile {
  id: string;
  first_name: string;
  last_name: string;
  location: string;
  bio: string;
  experience_level: string;
  skills: string[];
  special_skills: string[];
  media_files: Array<{
    file_url: string;
    file_type: string;
    is_primary: boolean;
  }>;
}

export default function TalentDirectoryPage() {
  const [profiles, setProfiles] = useState<TalentProfile[]>([]);
  const [filteredProfiles, setFilteredProfiles] = useState<TalentProfile[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [locationFilter, setLocationFilter] = useState("");
  const [experienceFilter, setExperienceFilter] = useState("");
  const [skillsFilter, setSkillsFilter] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTalentProfiles();
  }, []);

  useEffect(() => {
    filterProfiles();
  }, [profiles, searchTerm, locationFilter, experienceFilter, skillsFilter]);

  const fetchTalentProfiles = async () => {
    try {
      const response = await fetch('/api/talent-profile?published=true');
      if (response.ok) {
        const data = await response.json();
        setProfiles(data);
      }
    } catch (error) {
      console.error('Error fetching talent profiles:', error);
    } finally {
      setLoading(false);
    }
  };

  const filterProfiles = () => {
    let filtered = profiles;

    if (searchTerm) {
      filtered = filtered.filter(profile =>
        `${profile.first_name} ${profile.last_name}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
        profile.bio?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        profile.skills?.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    if (locationFilter) {
      filtered = filtered.filter(profile =>
        profile.location?.toLowerCase().includes(locationFilter.toLowerCase())
      );
    }

    if (experienceFilter) {
      filtered = filtered.filter(profile =>
        profile.experience_level === experienceFilter
      );
    }

    if (skillsFilter) {
      filtered = filtered.filter(profile =>
        profile.skills?.some(skill => 
          skill.toLowerCase().includes(skillsFilter.toLowerCase())
        )
      );
    }

    setFilteredProfiles(filtered);
  };

  const getPrimaryImage = (mediaFiles: TalentProfile['media_files']) => {
    const primaryImage = mediaFiles?.find(file => 
      file.is_primary && (file.file_type === 'profile_picture' || file.file_type === 'headshot')
    );
    return primaryImage?.file_url || mediaFiles?.[0]?.file_url;
  };

  const getInitials = (firstName: string, lastName: string) => {
    return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <Card key={i} className="animate-pulse">
              <CardHeader>
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 bg-gray-200 rounded-full"></div>
                  <div className="space-y-2">
                    <div className="h-4 bg-gray-200 rounded w-32"></div>
                    <div className="h-3 bg-gray-200 rounded w-24"></div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="h-3 bg-gray-200 rounded"></div>
                  <div className="h-3 bg-gray-200 rounded w-3/4"></div>
                  <div className="flex gap-2">
                    <div className="h-6 bg-gray-200 rounded w-16"></div>
                    <div className="h-6 bg-gray-200 rounded w-20"></div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold">Talent Directory</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Discover talented performers and connect with the next generation of artists.
        </p>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search by name, skills, or bio..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <Input
              placeholder="Location"
              value={locationFilter}
              onChange={(e) => setLocationFilter(e.target.value)}
            />
            
            <select
              value={experienceFilter}
              onChange={(e) => setExperienceFilter(e.target.value)}
              className="px-3 py-2 border border-input rounded-md bg-background"
            >
              <option value="">All Experience Levels</option>
              <option value="Beginner">Beginner</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Advanced">Advanced</option>
              <option value="Professional">Professional</option>
            </select>
            
            <Input
              placeholder="Skills (e.g., Acting, Dancing)"
              value={skillsFilter}
              onChange={(e) => setSkillsFilter(e.target.value)}
            />
          </div>
        </CardContent>
      </Card>

      {/* Results Count */}
      <div className="flex items-center justify-between">
        <p className="text-muted-foreground">
          {filteredProfiles.length} talent{filteredProfiles.length !== 1 ? 's' : ''} found
        </p>
        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4" />
          <span className="text-sm text-muted-foreground">Sort by relevance</span>
        </div>
      </div>

      {/* Talent Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProfiles.map((profile) => (
          <Card key={profile.id} className="group hover:shadow-lg transition-shadow duration-200">
            <CardHeader>
              <div className="flex items-center space-x-4">
                <Avatar className="w-16 h-16">
                  <AvatarImage 
                    src={getPrimaryImage(profile.media_files)} 
                    alt={`${profile.first_name} ${profile.last_name}`}
                  />
                  <AvatarFallback>
                    {getInitials(profile.first_name, profile.last_name)}
                  </AvatarFallback>
                </Avatar>
                <div className="space-y-1">
                  <CardTitle className="text-lg">
                    {profile.first_name} {profile.last_name}
                  </CardTitle>
                  {profile.location && (
                    <div className="flex items-center text-sm text-muted-foreground">
                      <MapPin className="h-3 w-3 mr-1" />
                      {profile.location}
                    </div>
                  )}
                  {profile.experience_level && (
                    <Badge variant="secondary" className="text-xs">
                      {profile.experience_level}
                    </Badge>
                  )}
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-4">
              {profile.bio && (
                <p className="text-sm text-muted-foreground line-clamp-3">
                  {profile.bio}
                </p>
              )}
              
              {profile.skills && profile.skills.length > 0 && (
                <div className="space-y-2">
                  <h4 className="text-sm font-medium">Skills</h4>
                  <div className="flex flex-wrap gap-1">
                    {profile.skills.slice(0, 4).map((skill, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {skill}
                      </Badge>
                    ))}
                    {profile.skills.length > 4 && (
                      <Badge variant="outline" className="text-xs">
                        +{profile.skills.length - 4} more
                      </Badge>
                    )}
                  </div>
                </div>
              )}
              
              {profile.special_skills && profile.special_skills.length > 0 && (
                <div className="space-y-2">
                  <h4 className="text-sm font-medium">Special Skills</h4>
                  <div className="flex flex-wrap gap-1">
                    {profile.special_skills.slice(0, 3).map((skill, index) => (
                      <Badge key={index} variant="default" className="text-xs">
                        <Star className="h-3 w-3 mr-1" />
                        {skill}
                      </Badge>
                    ))}
                    {profile.special_skills.length > 3 && (
                      <Badge variant="default" className="text-xs">
                        +{profile.special_skills.length - 3} more
                      </Badge>
                    )}
                  </div>
                </div>
              )}
              
              <div className="pt-2">
                <Button asChild className="w-full">
                  <Link href={`/talent-directory/${profile.id}`}>
                    View Profile
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Empty State */}
      {filteredProfiles.length === 0 && !loading && (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">🎭</div>
          <h3 className="text-xl font-semibold mb-2">No talent found</h3>
          <p className="text-muted-foreground">
            Try adjusting your search criteria or check back later for new profiles.
          </p>
        </div>
      )}
    </div>
  );
}
