-- Migration: Create content domain tables
-- Description: Create all content-related tables including existing tables for backward compatibility
-- Date: 2024-02-15

-- ============================================================================
-- CATEGORIES TABLE (Existing - Enhanced)
-- ============================================================================
CREATE TABLE IF NOT EXISTS categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(100) NOT NULL,
  slug VARCHAR(100) NOT NULL UNIQUE,
  description TEXT,
  color VARCHAR(7),
  icon VARCHAR(50),
  parent_id UUID REFERENCES categories(id) ON DELETE SET NULL ON UPDATE CASCADE,
  sort_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  deleted_at TIMESTAMPTZ
);

-- Create trigger for updated_at
CREATE TRIGGER update_categories_updated_at
  BEFORE UPDATE ON categories
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Create indexes for categories
CREATE INDEX idx_categories_parent_id ON categories(parent_id);
CREATE INDEX idx_categories_slug ON categories(slug);
CREATE INDEX idx_categories_is_active ON categories(is_active);
CREATE INDEX idx_categories_sort_order ON categories(sort_order);

-- ============================================================================
-- BLOGS TABLE (Existing - Enhanced with soft delete)
-- ============================================================================
CREATE TABLE IF NOT EXISTS blogs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title VARCHAR(255) NOT NULL,
  slug VARCHAR(255) NOT NULL UNIQUE,
  excerpt TEXT,
  content JSONB NOT NULL DEFAULT '{"html": "", "plain": ""}',
  cover_image VARCHAR(500),
  author_id UUID REFERENCES auth.users(id) ON DELETE SET NULL ON UPDATE CASCADE,
  category_id UUID REFERENCES categories(id) ON DELETE SET NULL ON UPDATE CASCADE,
  status VARCHAR(20) NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'published', 'archived', 'review')),
  is_premium BOOLEAN DEFAULT false,
  is_featured BOOLEAN DEFAULT false,
  reading_time_minutes INTEGER,
  view_count INTEGER DEFAULT 0,
  published_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  deleted_at TIMESTAMPTZ,
  seo_title VARCHAR(70),
  seo_description VARCHAR(160)
);

-- Create trigger for updated_at
CREATE TRIGGER update_blogs_updated_at
  BEFORE UPDATE ON blogs
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Create indexes for blogs
CREATE INDEX idx_blogs_author_id ON blogs(author_id);
CREATE INDEX idx_blogs_category_id ON blogs(category_id);
CREATE INDEX idx_blogs_status ON blogs(status);
CREATE INDEX idx_blogs_published_at ON blogs(published_at);
CREATE INDEX idx_blogs_slug ON blogs(slug);
CREATE INDEX idx_blogs_is_featured ON blogs(is_featured);
CREATE INDEX idx_blogs_is_premium ON blogs(is_premium);
CREATE INDEX idx_blogs_deleted_at ON blogs(deleted_at);

-- Full-text search index for blogs
CREATE INDEX idx_blogs_fts ON blogs USING GIN (to_tsvector('english', title || ' ' || COALESCE(excerpt, '') || ' ' || COALESCE(content->>'plain', '')));

-- ============================================================================
-- NEWS TABLE (New)
-- ============================================================================
CREATE TABLE IF NOT EXISTS news (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title VARCHAR(255) NOT NULL,
  slug VARCHAR(255) NOT NULL UNIQUE,
  excerpt TEXT,
  content JSONB NOT NULL DEFAULT '{"html": "", "plain": ""}',
  cover_image VARCHAR(500),
  author_id UUID REFERENCES auth.users(id) ON DELETE SET NULL ON UPDATE CASCADE,
  category_id UUID REFERENCES categories(id) ON DELETE SET NULL ON UPDATE CASCADE,
  status VARCHAR(20) NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'published', 'archived', 'review')),
  is_featured BOOLEAN DEFAULT false,
  reading_time_minutes INTEGER,
  view_count INTEGER DEFAULT 0,
  published_at TIMESTAMPTZ,
  source VARCHAR(255),
  source_url VARCHAR(500),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  deleted_at TIMESTAMPTZ
);

-- Create trigger for updated_at
CREATE TRIGGER update_news_updated_at
  BEFORE UPDATE ON news
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Create indexes for news
CREATE INDEX idx_news_author_id ON news(author_id);
CREATE INDEX idx_news_category_id ON news(category_id);
CREATE INDEX idx_news_status ON news(status);
CREATE INDEX idx_news_published_at ON news(published_at);
CREATE INDEX idx_news_slug ON news(slug);
CREATE INDEX idx_news_is_featured ON news(is_featured);
CREATE INDEX idx_news_deleted_at ON news(deleted_at);

-- Full-text search index for news
CREATE INDEX idx_news_fts ON news USING GIN (to_tsvector('english', title || ' ' || COALESCE(excerpt, '') || ' ' || COALESCE(content->>'plain', '')));

-- ============================================================================
-- TAGS TABLE
-- ============================================================================
CREATE TABLE IF NOT EXISTS tags (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(50) NOT NULL UNIQUE,
  slug VARCHAR(50) NOT NULL UNIQUE,
  color VARCHAR(7),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  deleted_at TIMESTAMPTZ
);

-- Create indexes for tags
CREATE INDEX idx_tags_slug ON tags(slug);
CREATE INDEX idx_tags_deleted_at ON tags(deleted_at);

-- ============================================================================
-- BLOG_TAGS JUNCTION TABLE
-- ============================================================================
CREATE TABLE IF NOT EXISTS blog_tags (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  blog_id UUID NOT NULL REFERENCES blogs(id) ON DELETE CASCADE ON UPDATE CASCADE,
  tag_id UUID NOT NULL REFERENCES tags(id) ON DELETE CASCADE ON UPDATE CASCADE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(blog_id, tag_id)
);

-- Create indexes for blog_tags
CREATE INDEX idx_blog_tags_blog_id ON blog_tags(blog_id);
CREATE INDEX idx_blog_tags_tag_id ON blog_tags(tag_id);

-- ============================================================================
-- NEWS_TAGS JUNCTION TABLE
-- ============================================================================
CREATE TABLE IF NOT EXISTS news_tags (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  news_id UUID NOT NULL REFERENCES news(id) ON DELETE CASCADE ON UPDATE CASCADE,
  tag_id UUID NOT NULL REFERENCES tags(id) ON DELETE CASCADE ON UPDATE CASCADE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(news_id, tag_id)
);

-- Create indexes for news_tags
CREATE INDEX idx_news_tags_news_id ON news_tags(news_id);
CREATE INDEX idx_news_tags_tag_id ON news_tags(tag_id);

-- ============================================================================
-- COMMENTS TABLE
-- ============================================================================
CREATE TABLE IF NOT EXISTS comments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  parent_id UUID REFERENCES comments(id) ON DELETE CASCADE ON UPDATE CASCADE,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE ON UPDATE CASCADE,
  content_id UUID NOT NULL,
  content_type VARCHAR(50) NOT NULL CHECK (content_type IN ('blog', 'news')),
  body TEXT NOT NULL,
  is_approved BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  deleted_at TIMESTAMPTZ
);

-- Create trigger for updated_at
CREATE TRIGGER update_comments_updated_at
  BEFORE UPDATE ON comments
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Create indexes for comments
CREATE INDEX idx_comments_content_id ON comments(content_id);
CREATE INDEX idx_comments_content_type ON comments(content_type);
CREATE INDEX idx_comments_user_id ON comments(user_id);
CREATE INDEX idx_comments_parent_id ON comments(parent_id);
CREATE INDEX idx_comments_is_approved ON comments(is_approved);
CREATE INDEX idx_comments_deleted_at ON comments(deleted_at);

-- Full-text search index for comments
CREATE INDEX idx_comments_fts ON comments USING GIN (to_tsvector('english', body));

-- ============================================================================
-- REACTIONS TABLE
-- ============================================================================
CREATE TABLE IF NOT EXISTS reactions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE ON UPDATE CASCADE,
  content_id UUID NOT NULL,
  content_type VARCHAR(50) NOT NULL CHECK (content_type IN ('blog', 'news')),
  reaction_type VARCHAR(20) NOT NULL CHECK (reaction_type IN ('like', 'love', 'insightful', 'helpful')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(user_id, content_id, content_type)
);

-- Create indexes for reactions
CREATE INDEX idx_reactions_content_id ON reactions(content_id);
CREATE INDEX idx_reactions_content_type ON reactions(content_type);
CREATE INDEX idx_reactions_user_id ON reactions(user_id);
CREATE INDEX idx_reactions_reaction_type ON reactions(reaction_type);

-- Composite index for content reaction counts
CREATE INDEX idx_reactions_content_type_id ON reactions(content_id, content_type);

COMMENT ON TABLE categories IS 'Content categories with hierarchical support';
COMMENT ON TABLE blogs IS 'Blog posts with full content management';
COMMENT ON TABLE news IS 'News articles and updates';
COMMENT ON TABLE tags IS 'Tag definitions for content categorization';
COMMENT ON TABLE blog_tags IS 'Many-to-many relationship between blogs and tags';
COMMENT ON TABLE news_tags IS 'Many-to-many relationship between news and tags';
COMMENT ON TABLE comments IS 'User comments on content';
COMMENT ON TABLE reactions IS 'User reactions to content';
