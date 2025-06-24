-- Talent Profiles Schema for AbhinayPath
-- Run this in your Supabase SQL Editor

-- Create talent_profiles table
CREATE TABLE talent_profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  
  -- Basic Info
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  date_of_birth DATE,
  gender TEXT,
  location TEXT,
  bio TEXT,
  
  -- Professional Info
  experience_level TEXT,
  skills TEXT[],
  languages TEXT[],
  union_status TEXT,
  willing_to_travel BOOLEAN DEFAULT false,
  willing_to_relocate BOOLEAN DEFAULT false,
  special_skills TEXT[],
  
  -- Profile Status
  published BOOLEAN DEFAULT false,
  profile_completion_percentage INTEGER DEFAULT 0,
  
  -- Timestamps
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create education_records table
CREATE TABLE education_records (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  talent_profile_id UUID REFERENCES talent_profiles(id) ON DELETE CASCADE,
  institution TEXT NOT NULL,
  degree TEXT,
  field_of_study TEXT,
  start_date DATE,
  end_date DATE,
  is_current BOOLEAN DEFAULT false,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create experience_records table
CREATE TABLE experience_records (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  talent_profile_id UUID REFERENCES talent_profiles(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  company TEXT,
  type TEXT, -- 'Theatre', 'Film', 'TV', 'Commercial', etc.
  start_date DATE,
  end_date DATE,
  is_current BOOLEAN DEFAULT false,
  description TEXT,
  role TEXT,
  director TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create training_records table
CREATE TABLE training_records (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  talent_profile_id UUID REFERENCES talent_profiles(id) ON DELETE CASCADE,
  program_name TEXT NOT NULL,
  institution TEXT,
  instructor TEXT,
  start_date DATE,
  end_date DATE,
  description TEXT,
  certificate_earned BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create media_files table
CREATE TABLE media_files (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  talent_profile_id UUID REFERENCES talent_profiles(id) ON DELETE CASCADE,
  file_name TEXT NOT NULL,
  file_url TEXT NOT NULL,
  file_type TEXT NOT NULL, -- 'profile_picture', 'headshot', 'portfolio', 'reel'
  file_size INTEGER,
  mime_type TEXT,
  is_primary BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX idx_talent_profiles_user_id ON talent_profiles(user_id);
CREATE INDEX idx_talent_profiles_published ON talent_profiles(published);
CREATE INDEX idx_talent_profiles_location ON talent_profiles(location);
CREATE INDEX idx_education_records_profile_id ON education_records(talent_profile_id);
CREATE INDEX idx_experience_records_profile_id ON experience_records(talent_profile_id);
CREATE INDEX idx_training_records_profile_id ON training_records(talent_profile_id);
CREATE INDEX idx_media_files_profile_id ON media_files(talent_profile_id);

-- Enable Row Level Security
ALTER TABLE talent_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE education_records ENABLE ROW LEVEL SECURITY;
ALTER TABLE experience_records ENABLE ROW LEVEL SECURITY;
ALTER TABLE training_records ENABLE ROW LEVEL SECURITY;
ALTER TABLE media_files ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for talent_profiles
CREATE POLICY "Users can view published profiles" ON talent_profiles
  FOR SELECT USING (published = true);

CREATE POLICY "Users can view their own profiles" ON talent_profiles
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own profiles" ON talent_profiles
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own profiles" ON talent_profiles
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own profiles" ON talent_profiles
  FOR DELETE USING (auth.uid() = user_id);

-- Create RLS policies for related tables (education, experience, training, media)
-- Education records
CREATE POLICY "Users can view education records of published profiles" ON education_records
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM talent_profiles 
      WHERE talent_profiles.id = education_records.talent_profile_id 
      AND (talent_profiles.published = true OR talent_profiles.user_id = auth.uid())
    )
  );

CREATE POLICY "Users can manage their own education records" ON education_records
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM talent_profiles 
      WHERE talent_profiles.id = education_records.talent_profile_id 
      AND talent_profiles.user_id = auth.uid()
    )
  );

-- Experience records (similar pattern)
CREATE POLICY "Users can view experience records of published profiles" ON experience_records
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM talent_profiles 
      WHERE talent_profiles.id = experience_records.talent_profile_id 
      AND (talent_profiles.published = true OR talent_profiles.user_id = auth.uid())
    )
  );

CREATE POLICY "Users can manage their own experience records" ON experience_records
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM talent_profiles 
      WHERE talent_profiles.id = experience_records.talent_profile_id 
      AND talent_profiles.user_id = auth.uid()
    )
  );

-- Training records (similar pattern)
CREATE POLICY "Users can view training records of published profiles" ON training_records
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM talent_profiles 
      WHERE talent_profiles.id = training_records.talent_profile_id 
      AND (talent_profiles.published = true OR talent_profiles.user_id = auth.uid())
    )
  );

CREATE POLICY "Users can manage their own training records" ON training_records
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM talent_profiles 
      WHERE talent_profiles.id = training_records.talent_profile_id 
      AND talent_profiles.user_id = auth.uid()
    )
  );

-- Media files (similar pattern)
CREATE POLICY "Users can view media files of published profiles" ON media_files
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM talent_profiles 
      WHERE talent_profiles.id = media_files.talent_profile_id 
      AND (talent_profiles.published = true OR talent_profiles.user_id = auth.uid())
    )
  );

CREATE POLICY "Users can manage their own media files" ON media_files
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM talent_profiles 
      WHERE talent_profiles.id = media_files.talent_profile_id 
      AND talent_profiles.user_id = auth.uid()
    )
  );

-- Create function to update the updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger to automatically update updated_at
CREATE TRIGGER update_talent_profiles_updated_at 
  BEFORE UPDATE ON talent_profiles 
  FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();

-- ===========================
-- STORAGE BUCKET CONFIGURATION
-- ===========================

-- Create storage bucket for talent media files
INSERT INTO storage.buckets (id, name, public) 
VALUES ('talent-media', 'talent-media', true);

-- Create storage policies for talent-media bucket
CREATE POLICY "Users can view talent media files" ON storage.objects
  FOR SELECT USING (bucket_id = 'talent-media');

CREATE POLICY "Users can upload their own talent media files" ON storage.objects
  FOR INSERT WITH CHECK (
    bucket_id = 'talent-media' 
    AND auth.uid()::text = (storage.foldername(name))[1]
  );

CREATE POLICY "Users can update their own talent media files" ON storage.objects
  FOR UPDATE USING (
    bucket_id = 'talent-media' 
    AND auth.uid()::text = (storage.foldername(name))[1]
  );

CREATE POLICY "Users can delete their own talent media files" ON storage.objects
  FOR DELETE USING (
    bucket_id = 'talent-media' 
    AND auth.uid()::text = (storage.foldername(name))[1]
  );