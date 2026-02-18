-- Migration: Create media domain tables
-- Description: Create all media-related tables for asset management
-- Date: 2024-02-15

-- ============================================================================
-- MEDIA_COLLECTIONS TABLE
-- ============================================================================
CREATE TABLE IF NOT EXISTS media_collections (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(100) NOT NULL,
  description TEXT,
  created_by UUID REFERENCES auth.users(id) ON DELETE SET NULL ON UPDATE CASCADE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Create trigger for updated_at
CREATE TRIGGER update_media_collections_updated_at
  BEFORE UPDATE ON media_collections
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Create indexes for media_collections
CREATE INDEX idx_media_collections_created_by ON media_collections(created_by);
CREATE INDEX idx_media_collections_name ON media_collections(name);

-- ============================================================================
-- MEDIA_ITEMS TABLE
-- ============================================================================
CREATE TABLE IF NOT EXISTS media_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  file_name VARCHAR(255) NOT NULL,
  file_path VARCHAR(500) NOT NULL,
  mime_type VARCHAR(100) NOT NULL,
  file_size INTEGER NOT NULL,
  url VARCHAR(500) NOT NULL,
  uploaded_by UUID REFERENCES auth.users(id) ON DELETE SET NULL ON UPDATE CASCADE,
  collection_id UUID REFERENCES media_collections(id) ON DELETE SET NULL ON UPDATE CASCADE,
  width INTEGER,
  height INTEGER,
  alt_text VARCHAR(255),
  caption TEXT,
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  deleted_at TIMESTAMPTZ
);

-- Create trigger for updated_at
CREATE TRIGGER update_media_items_updated_at
  BEFORE UPDATE ON media_items
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Create indexes for media_items
CREATE INDEX idx_media_items_uploaded_by ON media_items(uploaded_by);
CREATE INDEX idx_media_items_collection_id ON media_items(collection_id);
CREATE INDEX idx_media_items_mime_type ON media_items(mime_type);
CREATE INDEX idx_media_items_deleted_at ON media_items(deleted_at);
CREATE INDEX idx_media_items_created_at ON media_items(created_at);

-- ============================================================================
-- MEDIA_TAGS TABLE
-- ============================================================================
CREATE TABLE IF NOT EXISTS media_tags (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  media_id UUID NOT NULL REFERENCES media_items(id) ON DELETE CASCADE ON UPDATE CASCADE,
  tag_id UUID NOT NULL REFERENCES tags(id) ON DELETE CASCADE ON UPDATE CASCADE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(media_id, tag_id)
);

-- Create indexes for media_tags
CREATE INDEX idx_media_tags_media_id ON media_tags(media_id);
CREATE INDEX idx_media_tags_tag_id ON media_tags(tag_id);

-- ============================================================================
-- BLOG_MEDIA TABLE
-- ============================================================================
CREATE TABLE IF NOT EXISTS blog_media (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  blog_id UUID NOT NULL REFERENCES blogs(id) ON DELETE CASCADE ON UPDATE CASCADE,
  media_id UUID NOT NULL REFERENCES media_items(id) ON DELETE CASCADE ON UPDATE CASCADE,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(blog_id, media_id)
);

-- Create indexes for blog_media
CREATE INDEX idx_blog_media_blog_id ON blog_media(blog_id);
CREATE INDEX idx_blog_media_media_id ON blog_media(media_id);
CREATE INDEX idx_blog_media_display_order ON blog_media(display_order);

-- ============================================================================
-- NEWS_MEDIA TABLE
-- ============================================================================
CREATE TABLE IF NOT EXISTS news_media (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  news_id UUID NOT NULL REFERENCES news(id) ON DELETE CASCADE ON UPDATE CASCADE,
  media_id UUID NOT NULL REFERENCES media_items(id) ON DELETE CASCADE ON UPDATE CASCADE,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(news_id, media_id)
);

-- Create indexes for news_media
CREATE INDEX idx_news_media_news_id ON news_media(news_id);
CREATE INDEX idx_news_media_media_id ON news_media(media_id);
CREATE INDEX idx_news_media_display_order ON news_media(display_order);

COMMENT ON TABLE media_collections IS 'Grouping containers for media items';
COMMENT ON TABLE media_items IS 'Individual media assets (images, documents, videos)';
COMMENT ON TABLE media_tags IS 'Many-to-many relationship between media and tags';
COMMENT ON TABLE blog_media IS 'Media attached to blog posts';
COMMENT ON TABLE news_media IS 'Media attached to news articles';
