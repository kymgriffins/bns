-- Organization Profile Database Schema
-- This migration creates the organization_profile table for storing organization information

-- Create the organization_profile table
CREATE TABLE IF NOT EXISTS organization_profile (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_name TEXT NOT NULL,
  logo_url TEXT,
  description TEXT,
  tagline TEXT,
  mission TEXT,
  vision TEXT,
  contact_email TEXT,
  contact_phone TEXT,
  website_url TEXT,
  address_line1 TEXT,
  address_line2 TEXT,
  city TEXT,
  state TEXT,
  postal_code TEXT,
  country TEXT DEFAULT 'Kenya',
  facebook_url TEXT,
  twitter_url TEXT,
  instagram_url TEXT,
  linkedin_url TEXT,
  youtube_url TEXT,
  founded_year INTEGER,
  registration_number TEXT,
  tax_id TEXT,
  industry TEXT,
  organization_type TEXT,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  created_by UUID REFERENCES auth.users(id),
  updated_by UUID REFERENCES auth.users(id)
);

-- Enable Row Level Security
ALTER TABLE organization_profile ENABLE ROW LEVEL SECURITY;

-- Create policy for public read access
CREATE POLICY "Allow public read access to organization_profile"
ON organization_profile FOR SELECT
USING (true);

-- Create policy for authenticated users to update
CREATE POLICY "Allow authenticated users to update organization_profile"
ON organization_profile FOR UPDATE
USING (auth.role() = 'authenticated');

-- Create policy for authenticated users to insert
CREATE POLICY "Allow authenticated users to insert organization_profile"
ON organization_profile FOR INSERT
WITH CHECK (auth.role() = 'authenticated');

-- Create function to automatically update the updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger to update updated_at on every update
CREATE TRIGGER update_organization_profile_updated_at
  BEFORE UPDATE ON organization_profile
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Create indexes for frequently queried columns
CREATE INDEX IF NOT EXISTS idx_organization_profile_is_active
ON organization_profile(is_active);

CREATE INDEX IF NOT EXISTS idx_organization_profile_country
ON organization_profile(country);

-- Insert default organization profile (this will be the first and only organization)
INSERT INTO organization_profile (
  organization_name,
  tagline,
  description,
  mission,
  vision,
  contact_email,
  contact_phone,
  website_url,
  address_line1,
  city,
  state,
  country,
  founded_year,
  is_active
) VALUES (
  'Budget Ndio Story',
  'Empowering Young Kenyans Through Budget Transparency',
  'Budget Ndio Story is a youth-led initiative dedicated to promoting budget transparency and public participation in Kenya''s financial governance. We work to make complex budget information accessible to young Kenyans, enabling them to understand and engage with the national budget process.',
  'To empower young Kenyans with the knowledge and tools to understand, track, and influence national budget decisions for a more accountable and responsive government.',
  'A Kenya where every young person actively participates in shaping fiscal policies that affect their lives and communities.',
  'info@budgetndiostory.ke',
  '+254 700 000 000',
  'https://budgetndiostory.ke',
  'Nairobi Central Business District',
  'Nairobi',
  'Nairobi County',
  'Kenya',
  2024,
  true
);

-- Create a function to get the current organization (singleton)
CREATE OR REPLACE FUNCTION get_current_organization()
RETURNS TABLE (
  id UUID,
  organization_name TEXT,
  logo_url TEXT,
  description TEXT,
  tagline TEXT,
  mission TEXT,
  vision TEXT,
  contact_email TEXT,
  contact_phone TEXT,
  website_url TEXT,
  address_line1 TEXT,
  address_line2 TEXT,
  city TEXT,
  state TEXT,
  postal_code TEXT,
  country TEXT,
  facebook_url TEXT,
  twitter_url TEXT,
  instagram_url TEXT,
  linkedin_url TEXT,
  youtube_url TEXT,
  founded_year INTEGER,
  registration_number TEXT,
  tax_id TEXT,
  industry TEXT,
  organization_type TEXT,
  is_active BOOLEAN,
  created_at TIMESTAMPTZ,
  updated_at TIMESTAMPTZ
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    op.id,
    op.organization_name,
    op.logo_url,
    op.description,
    op.tagline,
    op.mission,
    op.vision,
    op.contact_email,
    op.contact_phone,
    op.website_url,
    op.address_line1,
    op.address_line2,
    op.city,
    op.state,
    op.postal_code,
    op.country,
    op.facebook_url,
    op.twitter_url,
    op.instagram_url,
    op.linkedin_url,
    op.youtube_url,
    op.founded_year,
    op.registration_number,
    op.tax_id,
    op.industry,
    op.organization_type,
    op.is_active,
    op.created_at,
    op.updated_at
  FROM organization_profile op
  WHERE op.is_active = true
  ORDER BY op.created_at DESC
  LIMIT 1;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
