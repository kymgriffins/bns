-- GR8 News Hub - Blog Content and Categories
-- Migration 003: Categories and Blog Articles
-- This migration creates the core tables for blog content management
-- NOTE: Uses existing user_profiles table from migration 002

-- ============================================
-- CATEGORIES TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS categories (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  color TEXT DEFAULT '#E53935',
  icon TEXT,
  parent_id UUID REFERENCES categories(id),
  sort_order INT DEFAULT 0,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;

-- Public read access
CREATE POLICY "Public categories are viewable by everyone"
ON categories FOR SELECT
USING (is_active = true);

-- Only admins can modify - using auth.users directly
CREATE POLICY "Admins can manage categories"
ON categories FOR ALL
USING (
  EXISTS (
    SELECT 1 FROM auth.users
    WHERE auth.users.id = auth.uid()
    AND auth.users.role = 'admin'
  )
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_categories_slug ON categories(slug);
CREATE INDEX IF NOT EXISTS idx_categories_parent ON categories(parent_id);
CREATE INDEX IF NOT EXISTS idx_categories_sort_order ON categories(sort_order);

-- ============================================
-- BLOGS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS blogs (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  excerpt TEXT,
  content JSONB NOT NULL DEFAULT '{}'::jsonb,
  cover_image TEXT,
  author_id UUID REFERENCES user_profiles(id) ON DELETE SET NULL,
  category_id UUID REFERENCES categories(id) ON DELETE SET NULL,
  status TEXT DEFAULT 'draft' CHECK (status IN ('draft', 'published', 'archived', 'review')),
  is_premium BOOLEAN DEFAULT FALSE,
  is_featured BOOLEAN DEFAULT FALSE,
  reading_time_minutes INT,
  view_count BIGINT DEFAULT 0,
  like_count BIGINT DEFAULT 0,
  comment_count BIGINT DEFAULT 0,
  share_count BIGINT DEFAULT 0,
  bookmark_count BIGINT DEFAULT 0,
  seo_title TEXT,
  seo_description TEXT,
  published_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE blogs ENABLE ROW LEVEL SECURITY;

-- Published blogs are viewable by everyone
CREATE POLICY "Published blogs are viewable by everyone"
ON blogs FOR SELECT
USING (status = 'published');

-- Authors can create blogs
CREATE POLICY "Users can create blogs"
ON blogs FOR INSERT
WITH CHECK (auth.uid() = author_id);

-- Authors can update own blogs
CREATE POLICY "Users can update own blogs"
ON blogs FOR UPDATE
USING (auth.uid() = author_id);

-- Authors can delete own blogs
CREATE POLICY "Users can delete own blogs"
ON blogs FOR DELETE
USING (auth.uid() = author_id);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_blogs_status ON blogs(status) WHERE status = 'published';
CREATE INDEX IF NOT EXISTS idx_blogs_category ON blogs(category_id);
CREATE INDEX IF NOT EXISTS idx_blogs_author ON blogs(author_id);
CREATE INDEX IF NOT EXISTS idx_blogs_published ON blogs(published_at DESC) WHERE status = 'published';
CREATE INDEX IF NOT EXISTS idx_blogs_slug ON blogs(slug);
CREATE INDEX IF NOT EXISTS idx_blogs_featured ON blogs(is_featured) WHERE is_featured = true;

-- ============================================
-- BLOGS LIKES TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS blog_likes (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES user_profiles(id) ON DELETE CASCADE,
  blog_id UUID REFERENCES blogs(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, blog_id)
);

-- Enable RLS
ALTER TABLE blog_likes ENABLE ROW LEVEL SECURITY;

-- Anyone can read likes
CREATE POLICY "Public likes are viewable"
ON blog_likes FOR SELECT
USING (true);

-- Authenticated users can like
CREATE POLICY "Users can like blogs"
ON blog_likes FOR INSERT
WITH CHECK (auth.uid() = user_id);

-- Users can unlike
CREATE POLICY "Users can unlike blogs"
ON blog_likes FOR DELETE
USING (auth.uid() = user_id);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_blog_likes_blog ON blog_likes(blog_id);
CREATE INDEX IF NOT EXISTS idx_blog_likes_user ON blog_likes(user_id);

-- ============================================
-- BLOG BOOKMARKS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS blog_bookmarks (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES user_profiles(id) ON DELETE CASCADE,
  blog_id UUID REFERENCES blogs(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, blog_id)
);

-- Enable RLS
ALTER TABLE blog_bookmarks ENABLE ROW LEVEL SECURITY;

-- Users can read own bookmarks
CREATE POLICY "Users can view own bookmarks"
ON blog_bookmarks FOR SELECT
USING (auth.uid() = user_id);

-- Users can bookmark
CREATE POLICY "Users can bookmark blogs"
ON blog_bookmarks FOR INSERT
WITH CHECK (auth.uid() = user_id);

-- Users can remove bookmark
CREATE POLICY "Users can remove bookmarks"
ON blog_bookmarks FOR DELETE
USING (auth.uid() = user_id);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_blog_bookmarks_blog ON blog_bookmarks(blog_id);
CREATE INDEX IF NOT EXISTS idx_blog_bookmarks_user ON blog_bookmarks(user_id);

-- ============================================
-- BLOG SHARES TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS blog_shares (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES user_profiles(id) ON DELETE SET NULL,
  blog_id UUID REFERENCES blogs(id) ON DELETE CASCADE,
  platform TEXT NOT NULL CHECK (platform IN ('copy', 'whatsapp', 'twitter', 'facebook', 'instagram', 'email')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE blog_shares ENABLE ROW LEVEL SECURITY;

-- Public shares are viewable
CREATE POLICY "Public shares are viewable"
ON blog_shares FOR SELECT
USING (true);

-- Anyone can record share
CREATE POLICY "Anyone can share blogs"
ON blog_shares FOR INSERT
WITH CHECK (true);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_blog_shares_blog ON blog_shares(blog_id);
CREATE INDEX IF NOT EXISTS idx_blog_shares_platform ON blog_shares(platform);

-- ============================================
-- UPDATED AT TRIGGER FUNCTION
-- ============================================
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for all tables
CREATE TRIGGER update_categories_updated_at
  BEFORE UPDATE ON categories
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_blogs_updated_at
  BEFORE UPDATE ON blogs
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- ============================================
-- DEFAULT CATEGORIES
-- ============================================
INSERT INTO categories (name, slug, description, color, icon, sort_order) VALUES
('News', 'news', 'Latest news and current events', '#E53935', 'newspaper', 1),
('Technology', 'technology', 'Tech news, gadgets and innovations', '#1E88E5', 'cpu', 2),
('Politics', 'politics', 'Political news and analysis', '#7B1FA2', 'landmark', 3),
('Business', 'business', 'Business and economy news', '#43A047', 'trending-up', 4),
('Entertainment', 'entertainment', 'Movies, music and pop culture', '#FB8C00', 'film', 5),
('Sports', 'sports', 'Sports news and updates', '#00ACC1', 'trophy', 6),
('Lifestyle', 'lifestyle', 'Lifestyle and culture', '#8E24AA', 'heart', 7),
('Opinion', 'opinion', 'Opinion pieces and editorials', '#5D4037', 'message-circle', 8)
ON CONFLICT (slug) DO NOTHING;
