"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { 
  MapPin, 
  Calendar, 
  Mail, 
  Phone, 
  Globe, 
  Star, 
  Award, 
  GraduationCap, 
  Briefcase,
  Camera,
  ArrowLeft,
  Download
} from "lucide-react";
import Link from "next/link";
import ImageCarousel from "@/components/image-carousel";

interface TalentProfile {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone?: string;
  location: string;
  date_of_birth?: string;
  bio: string;
  website?: string;
  experience_level: string;
  skills: string[];
  special_skills: string[];
  languages: string[];
  height?: string;
  weight?: string;
  hair_color?: string;
  eye_color?: string;
  willing_to_travel: boolean;
  willing_to_relocate: boolean;
  union_status?: string;
  availability_status: string;
  hourly_rate?: number;
  education: Array<{
    institution: string;
    degree: string;
    field_of_study: string;
    graduation_year: number;
    gpa?: string;
  }>;
  experience: Array<{
    title: string;
    company: string;
    location: string;
    start_date: string;
    end_date?: string;
    description: string;
    is_current: boolean;
  }>;
  training: Array<{
    program_name: string;
    institution: string;
    instructor: string;
    start_date: string;
    end_date?: string;
    description: string;
    is_current: boolean;
  }>;
  media_files: Array<{
    file_url: string;
    file_type: string;
    is_primary: boolean;
    caption?: string;
  }>;
}

export default function TalentProfileDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [profile, setProfile] = useState<TalentProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (params.id) {
      fetchTalentProfile(params.id as string);
    }
  }, [params.id]);

  const fetchTalentProfile = async (id: string) => {
    try {
      const response = await fetch(`/api/talent-profile/${id}`);
      if (response.ok) {
        const data = await response.json();
        setProfile(data);
      } else {
        setError('Profile not found');
      }
    } catch (error) {
      console.error('Error fetching talent profile:', error);
      setError('Failed to load profile');
    } finally {
      setLoading(false);
    }
  };

  const getProfileImages = () => {
    return profile?.media_files?.filter(file => 
      file.file_type === 'profile_picture' || file.file_type === 'headshot'
    ) || [];
  };

  const getPortfolioImages = () => {
    return profile?.media_files?.filter(file => 
      file.file_type === 'portfolio'
    ) || [];
  };

  const getPrimaryImage = () => {
    const primaryImage = profile?.media_files?.find(file => file.is_primary);
    return primaryImage?.file_url || profile?.media_files?.[0]?.file_url;
  };

  const getInitials = () => {
    if (!profile) return '';
    return `${profile.first_name.charAt(0)}${profile.last_name.charAt(0)}`.toUpperCase();
  };

  const calculateAge = (dateOfBirth: string) => {
    const today = new Date();
    const birthDate = new Date(dateOfBirth);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="animate-pulse space-y-6">
          <div className="h-8 bg-gray-200 rounded w-1/4"></div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              <div className="h-64 bg-gray-200 rounded"></div>
              <div className="h-32 bg-gray-200 rounded"></div>
            </div>
            <div className="space-y-6">
              <div className="h-48 bg-gray-200 rounded"></div>
              <div className="h-32 bg-gray-200 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !profile) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <div className="text-6xl mb-4">😔</div>
        <h1 className="text-2xl font-bold mb-2">Profile Not Found</h1>
        <p className="text-muted-foreground mb-4">
          {error || 'The talent profile you\'re looking for doesn\'t exist or has been removed.'}
        </p>
        <Button asChild>
          <Link href="/talent-directory">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Directory
          </Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      {/* Back Button */}
      <Button variant="outline" asChild>
        <Link href="/talent-directory">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Directory
        </Link>
      </Button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-8">
          {/* Hero Section */}
          <Card>
            <CardHeader>
              <div className="flex flex-col md:flex-row gap-6">
                <Avatar className="w-32 h-32 mx-auto md:mx-0">
                  <AvatarImage src={getPrimaryImage()} alt={`${profile.first_name} ${profile.last_name}`} />
                  <AvatarFallback className="text-2xl">{getInitials()}</AvatarFallback>
                </Avatar>
                <div className="text-center md:text-left space-y-4 flex-1">
                  <div>
                    <h1 className="text-3xl font-bold">{profile.first_name} {profile.last_name}</h1>
                    <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 mt-2 text-muted-foreground">
                      {profile.location && (
                        <div className="flex items-center">
                          <MapPin className="h-4 w-4 mr-1" />
                          {profile.location}
                        </div>
                      )}
                      {profile.date_of_birth && (
                        <div className="flex items-center">
                          <Calendar className="h-4 w-4 mr-1" />
                          {calculateAge(profile.date_of_birth)} years old
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                    <Badge variant="default">{profile.experience_level}</Badge>
                    <Badge variant="outline">{profile.availability_status}</Badge>
                    {profile.union_status && (
                      <Badge variant="secondary">{profile.union_status}</Badge>
                    )}
                  </div>
                  
                  <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                    <Button size="sm">
                      <Mail className="h-4 w-4 mr-2" />
                      Contact
                    </Button>
                    {profile.website && (
                      <Button variant="outline" size="sm" asChild>
                        <a href={profile.website} target="_blank" rel="noopener noreferrer">
                          <Globe className="h-4 w-4 mr-2" />
                          Website
                        </a>
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </CardHeader>
            
            {profile.bio && (
              <CardContent>
                <h3 className="font-semibold mb-2">About</h3>
                <p className="text-muted-foreground leading-relaxed">{profile.bio}</p>
              </CardContent>
            )}
          </Card>

          {/* Skills & Specialties */}
          <Card>
            <CardHeader>
              <CardTitle>Skills & Specialties</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {profile.skills && profile.skills.length > 0 && (
                <div>
                  <h4 className="font-medium mb-2">Skills</h4>
                  <div className="flex flex-wrap gap-2">
                    {profile.skills.map((skill, index) => (
                      <Badge key={index} variant="outline">{skill}</Badge>
                    ))}
                  </div>
                </div>
              )}
              
              {profile.special_skills && profile.special_skills.length > 0 && (
                <div>
                  <h4 className="font-medium mb-2">Special Skills</h4>
                  <div className="flex flex-wrap gap-2">
                    {profile.special_skills.map((skill, index) => (
                      <Badge key={index} variant="default">
                        <Star className="h-3 w-3 mr-1" />
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
              
              {profile.languages && profile.languages.length > 0 && (
                <div>
                  <h4 className="font-medium mb-2">Languages</h4>
                  <div className="flex flex-wrap gap-2">
                    {profile.languages.map((language, index) => (
                      <Badge key={index} variant="secondary">{language}</Badge>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Experience */}
          {profile.experience && profile.experience.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>
                  <Briefcase className="h-5 w-5 mr-2 inline" />
                  Experience
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {profile.experience.map((exp, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                      <div>
                        <h4 className="font-medium">{exp.title}</h4>
                        <p className="text-sm text-muted-foreground">{exp.company} • {exp.location}</p>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {new Date(exp.start_date).toLocaleDateString()} - {
                          exp.is_current ? 'Present' : 
                          exp.end_date ? new Date(exp.end_date).toLocaleDateString() : 'Present'
                        }
                      </p>
                    </div>
                    {exp.description && (
                      <p className="text-sm text-muted-foreground">{exp.description}</p>
                    )}
                    {index < profile.experience.length - 1 && <Separator />}
                  </div>
                ))}
              </CardContent>
            </Card>
          )}

          {/* Education */}
          {profile.education && profile.education.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>
                  <GraduationCap className="h-5 w-5 mr-2 inline" />
                  Education
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {profile.education.map((edu, index) => (
                  <div key={index} className="space-y-2">
                    <div>
                      <h4 className="font-medium">{edu.degree} in {edu.field_of_study}</h4>
                      <p className="text-sm text-muted-foreground">{edu.institution} • {edu.graduation_year}</p>
                      {edu.gpa && (
                        <p className="text-sm text-muted-foreground">GPA: {edu.gpa}</p>
                      )}
                    </div>
                    {index < profile.education.length - 1 && <Separator />}
                  </div>
                ))}
              </CardContent>
            </Card>
          )}

          {/* Training */}
          {profile.training && profile.training.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>
                  <Award className="h-5 w-5 mr-2 inline" />
                  Training & Workshops
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {profile.training.map((training, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                      <div>
                        <h4 className="font-medium">{training.program_name}</h4>
                        <p className="text-sm text-muted-foreground">
                          {training.institution} • Instructor: {training.instructor}
                        </p>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {new Date(training.start_date).toLocaleDateString()} - {
                          training.is_current ? 'Present' : 
                          training.end_date ? new Date(training.end_date).toLocaleDateString() : 'Present'
                        }
                      </p>
                    </div>
                    {training.description && (
                      <p className="text-sm text-muted-foreground">{training.description}</p>
                    )}
                    {index < profile.training.length - 1 && <Separator />}
                  </div>
                ))}
              </CardContent>
            </Card>
          )}

          {/* Portfolio */}
          {getPortfolioImages().length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>
                  <Camera className="h-5 w-5 mr-2 inline" />
                  Portfolio
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ImageCarousel images={getPortfolioImages().map(file => ({
                  src: file.file_url,
                  alt: file.caption || `${profile.first_name} ${profile.last_name} portfolio`,
                  caption: file.caption
                }))} />
              </CardContent>
            </Card>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Quick Info */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Info</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {profile.height && (
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Height:</span>
                  <span>{profile.height}</span>
                </div>
              )}
              {profile.weight && (
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Weight:</span>
                  <span>{profile.weight}</span>
                </div>
              )}
              {profile.hair_color && (
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Hair:</span>
                  <span>{profile.hair_color}</span>
                </div>
              )}
              {profile.eye_color && (
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Eyes:</span>
                  <span>{profile.eye_color}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span className="text-muted-foreground">Travel:</span>
                <span>{profile.willing_to_travel ? 'Yes' : 'No'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Relocate:</span>
                <span>{profile.willing_to_relocate ? 'Yes' : 'No'}</span>
              </div>
              {profile.hourly_rate && (
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Rate:</span>
                  <span>${profile.hourly_rate}/hour</span>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Headshots */}
          {getProfileImages().length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Professional Photos</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-2">
                  {getProfileImages().slice(0, 4).map((file, index) => (
                    <div key={index} className="aspect-square relative overflow-hidden rounded-lg">
                      <img
                        src={file.file_url}
                        alt={file.caption || `${profile.first_name} ${profile.last_name}`}
                        className="object-cover w-full h-full hover:scale-110 transition-transform duration-200"
                      />
                    </div>
                  ))}
                </div>
                {getProfileImages().length > 4 && (
                  <p className="text-sm text-muted-foreground mt-2 text-center">
                    +{getProfileImages().length - 4} more photos
                  </p>
                )}
              </CardContent>
            </Card>
          )}

          {/* Contact Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Get In Touch</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button className="w-full">
                <Mail className="h-4 w-4 mr-2" />
                Send Message
              </Button>
              <Button variant="outline" className="w-full">
                <Download className="h-4 w-4 mr-2" />
                Download Resume
              </Button>
              {profile.phone && (
                <Button variant="outline" className="w-full">
                  <Phone className="h-4 w-4 mr-2" />
                  Call
                </Button>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}