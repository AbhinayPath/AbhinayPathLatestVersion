// Utility to calculate profile completion percentage for a talent profile

import { TalentProfile, TalentEducation, TalentExperience, TalentTraining } from '@/lib/types/talent'

export interface ProfileCompletionInput {
  profile: Partial<TalentProfile>
  education: Partial<TalentEducation>[]
  experience: Partial<TalentExperience>[]
  training: Partial<TalentTraining>[]
  headshots?: string[]
}

export function getProfileCompletion({ profile, education, experience, training, headshots = [] }: ProfileCompletionInput): number {
  // Define required fields for each step
  const requiredFields = [
    !!profile.full_name,
    !!profile.email,
    !!profile.city,
    !!profile.state,
    !!profile.bio,
    !!profile.acting_skills && Array.isArray(profile.acting_skills) && profile.acting_skills.length > 0,
    !!profile.languages && Array.isArray(profile.languages) && profile.languages.length > 0,
    !!profile.experience_level,
    education.length > 0 && !!education[0].institution && !!education[0].degree,
    experience.length > 0 && !!experience[0].project_title,
    training.length > 0 && !!training[0].workshop_name,
    headshots.length > 0,
  ]
  const completed = requiredFields.filter(Boolean).length
  const percent = Math.round((completed / requiredFields.length) * 100)
  return percent
}
