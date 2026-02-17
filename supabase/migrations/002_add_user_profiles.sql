-- User Profiles Database Schema
-- This migration creates the user_profiles table for storing user information

-- Create the user_profiles table
CREATE TABLE IF NOT EXISTS user_profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  first_name TEXT,
  last_name TEXT,
  bio TEXT,
  avatar_url TEXT,
  phone_number TEXT,
  location TEXT,
  interests TEXT[],
  skills TEXT[],
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  created_by UUID REFERENCES auth.users(id),
  updated_by UUID REFERENCES auth.users(id)
);

-- Enable Row Level Security
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;

-- Create policy for public read access
CREATE POLICY "Allow public read access to user_profiles"
ON user_profiles FOR SELECT
USING (true);

-- Create policy for authenticated users to update
CREATE POLICY "Allow authenticated users to update user_profiles"
ON user_profiles FOR UPDATE
USING (auth.role() = 'authenticated' AND user_id = auth.uid());

-- Create policy for authenticated users to insert
CREATE POLICY "Allow authenticated users to insert user_profiles"
ON user_profiles FOR INSERT
WITH CHECK (auth.role() = 'authenticated' AND user_id = auth.uid());

-- Create function to automatically update the updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger to update updated_at on every update
CREATE TRIGGER update_user_profiles_updated_at
  BEFORE UPDATE ON user_profiles
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Create indexes for frequently queried columns
CREATE INDEX IF NOT EXISTS idx_user_profiles_is_active
ON user_profiles(is_active);

CREATE INDEX IF NOT EXISTS idx_user_profiles_user_id
ON user_profiles(user_id);

CREATE INDEX IF NOT EXISTS idx_user_profiles_location
ON user_profiles(location);