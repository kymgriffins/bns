-- Migration: Create schema domains
-- Description: Define logical domains for database organization
-- Date: 2024-02-15

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Note: In Supabase, we use the default 'public' schema
-- For better organization, we can use table prefixes instead of schemas
-- This keeps compatibility with Supabase's built-in features (RLS, Auth, etc.)

-- Create custom types for enumerations
CREATE TYPE content_status AS ENUM ('draft', 'published', 'archived', 'review');
CREATE TYPE reaction_type AS ENUM ('like', 'love', 'insightful', 'helpful');
CREATE TYPE device_type AS ENUM ('mobile', '');
CREATE TYPE content_type AS ENUM ('tablet', 'desktopblog', 'news');

-- Create helper function for timestamps
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

COMMENT ON FUNCTION update_updated_at_column() IS 'Trigger function to automatically update updated_at timestamp';
