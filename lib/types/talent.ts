// Talent Profile Types for AbhinayPath

export interface TalentProfile {
  id: string
  user_id: string
  
  // Basic Information
  full_name: string
  email: string
  phone?: string
  date_of_birth?: string
  gender?: string
  height?: string
  weight?: string
  
  // Location
  city?: string
  state?: string
  country?: string
  
  // Professional Information
  bio?: string
  experience_level?: 'Fresher' | 'Beginner' | 'Intermediate' | 'Professional' | 'Expert'
  years_of_experience?: number
  
  // Skills and Specializations
  acting_skills?: string[]
  dance_styles?: string[]
  languages?: string[]
  special_skills?: string[]
  
  // Physical Attributes
  eye_color?: string
  hair_color?: string
  skin_tone?: string
  body_type?: string
  
  // Media
  profile_image_url?: string
  headshot_urls?: string[]
  portfolio_videos?: string[]
  portfolio_images?: string[]
  
  // Social Media & Links
  instagram_url?: string
  youtube_url?: string
  website_url?: string
  imdb_url?: string
  
  // Professional Details
  represented_by?: string
  agent_contact?: string
  union_memberships?: string[]
  
  // Availability
  available_for_work?: boolean
  willing_to_relocate?: boolean
  travel_radius?: number
  
  // Preferences
  preferred_roles?: string[]
  project_types?: string[]
  
  // Verification & Status
  verified?: boolean
  profile_status?: 'draft' | 'published' | 'suspended'
  
  // Metadata
  created_at?: string
  updated_at?: string
}

export interface TalentEducation {
  id: string
  profile_id: string
  institution: string
  degree?: string
  field_of_study?: string
  start_year?: number
  end_year?: number
  currently_studying?: boolean
  description?: string
  created_at?: string
}

export interface TalentExperience {
  id: string
  profile_id: string
  project_title: string
  project_type?: 'Film' | 'Theatre' | 'Commercial' | 'Web Series' | 'Music Video' | 'Documentary' | 'Other'
  role?: string
  production_company?: string
  director?: string
  start_date?: string
  end_date?: string
  description?: string
  created_at?: string
}

export interface TalentTraining {
  id: string
  profile_id: string
  workshop_name: string
  instructor?: string
  institution?: string
  start_date?: string
  end_date?: string
  skills_learned?: string[]
  certificate_url?: string
  description?: string
  created_at?: string
}

// Form types for profile creation/editing
export interface TalentProfileFormData extends Omit<TalentProfile, 'id' | 'user_id' | 'created_at' | 'updated_at'> {}

export interface TalentEducationFormData extends Omit<TalentEducation, 'id' | 'profile_id' | 'created_at'> {}

export interface TalentExperienceFormData extends Omit<TalentExperience, 'id' | 'profile_id' | 'created_at'> {}

export interface TalentTrainingFormData extends Omit<TalentTraining, 'id' | 'profile_id' | 'created_at'> {}

// Constants for dropdowns and selections
export const EXPERIENCE_LEVELS = [
  'Fresher',
  'Beginner', 
  'Intermediate',
  'Professional',
  'Expert'
] as const

export const PROJECT_TYPES = [
  'Film',
  'Theatre', 
  'Commercial',
  'Web Series',
  'Music Video',
  'Documentary',
  'Short Film',
  'TV Show',
  'Other'
] as const

export const ACTING_SKILLS = [
  'Method Acting',
  'Classical Acting',
  'Improvisation',
  'Voice Acting',
  'Stage Combat',
  'Mime',
  'Physical Theatre',
  'Musical Theatre',
  'Comedy',
  'Drama',
  'Action',
  'Romance',
  'Character Acting',
  'Monologue Performance',
  'Dialogue Delivery'
] as const

export const DANCE_STYLES = [
  'Classical Indian',
  'Bharatanatyam',
  'Kathak',
  'Odissi',
  'Kuchipudi',
  'Manipuri',
  'Mohiniyattam',
  'Kathakali',
  'Contemporary',
  'Jazz',
  'Hip Hop',
  'Ballet',
  'Bollywood',
  'Folk Dance',
  'Salsa',
  'Tango',
  'Breakdance',
  'Freestyle'
] as const

export const INDIAN_LANGUAGES = [
  'Hindi',
  'English',
  'Tamil',
  'Telugu',
  'Bengali',
  'Marathi',
  'Gujarati',
  'Kannada',
  'Malayalam',
  'Punjabi',
  'Urdu',
  'Odia',
  'Assamese',
  'Sanskrit',
  'Rajasthani',
  'Bhojpuri',
  'Haryanvi',
  'Konkani',
  'Manipuri',
  'Nepali'
] as const

export const INDIAN_STATES = [
  'Andhra Pradesh',
  'Arunachal Pradesh', 
  'Assam',
  'Bihar',
  'Chhattisgarh',
  'Goa',
  'Gujarat',
  'Haryana',
  'Himachal Pradesh',
  'Jharkhand',
  'Karnataka',
  'Kerala',
  'Madhya Pradesh',
  'Maharashtra',
  'Manipur',
  'Meghalaya',
  'Mizoram',
  'Nagaland',
  'Odisha',
  'Punjab',
  'Rajasthan',
  'Sikkim',
  'Tamil Nadu',
  'Telangana',
  'Tripura',
  'Uttar Pradesh',
  'Uttarakhand',
  'West Bengal',
  'Delhi',
  'Chandigarh',
  'Dadra and Nagar Haveli and Daman and Diu',
  'Jammu and Kashmir',
  'Ladakh',
  'Lakshadweep',
  'Puducherry'
] as const

export const PREFERRED_ROLES = [
  'Lead Actor',
  'Supporting Actor',
  'Character Artist',
  'Villain',
  'Comic Relief',
  'Narrator',
  'Voice Over Artist',
  'Background Artist',
  'Body Double',
  'Stunt Double'
] as const

export const SPECIAL_SKILLS = [
  'Martial Arts',
  'Horse Riding',
  'Swimming',
  'Driving',
  'Motorcycling',
  'Singing',
  'Musical Instruments',
  'Juggling',
  'Acrobatics',
  'Rock Climbing',
  'Gymnastics',
  'Magic Tricks',
  'Stand-up Comedy',
  'Mimicry',
  'Cooking',
  'Sports',
  'Yoga',
  'Meditation'
] as const
