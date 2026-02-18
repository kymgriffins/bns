-- Migration: Create analytics domain tables
-- Description: Create all analytics-related tables for tracking and reporting
-- Date: 2024-02-15

-- ============================================================================
-- PAGE_VIEWS TABLE
-- ============================================================================
CREATE TABLE IF NOT EXISTS page_views (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id UUID,
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL ON UPDATE CASCADE,
  path VARCHAR(500) NOT NULL,
  referrer VARCHAR(500),
  device_type VARCHAR(20) CHECK (device_type IN ('mobile', 'tablet', 'desktop')),
  browser VARCHAR(50),
  os VARCHAR(50),
  country VARCHAR(2),
  city VARCHAR(100),
  viewed_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Create indexes for page_views
CREATE INDEX idx_page_views_user_id ON page_views(user_id);
CREATE INDEX idx_page_views_session_id ON page_views(session_id);
CREATE INDEX idx_page_views_path ON page_views(path);
CREATE INDEX idx_page_views_viewed_at ON page_views(viewed_at);
CREATE INDEX idx_page_views_country ON page_views(country);
CREATE INDEX idx_page_views_device_type ON page_views(device_type);

-- Composite indexes for common queries
CREATE INDEX idx_page_views_user_time ON page_views(user_id, viewed_at);
CREATE INDEX idx_page_views_path_time ON page_views(path, viewed_at);

-- ============================================================================
-- CONTENT_ENGAGEMENT TABLE
-- ============================================================================
CREATE TABLE IF NOT EXISTS content_engagement (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL ON UPDATE CASCADE,
  content_id UUID NOT NULL,
  content_type VARCHAR(50) NOT NULL CHECK (content_type IN ('blog', 'news')),
  time_spent_seconds INTEGER,
  scroll_depth INTEGER CHECK (scroll_depth >= 0 AND scroll_depth <= 100),
  completed BOOLEAN,
  event_type VARCHAR(50) CHECK (event_type IN ('read', 'share', 'save', 'download')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Create indexes for content_engagement
CREATE INDEX idx_content_engagement_user_id ON content_engagement(user_id);
CREATE INDEX idx_content_engagement_content_id ON content_engagement(content_id);
CREATE INDEX idx_content_engagement_content_type ON content_engagement(content_type);
CREATE INDEX idx_content_engagement_created_at ON content_engagement(created_at);

-- Composite indexes for analytics queries
CREATE INDEX idx_content_engagement_type_time ON content_engagement(content_type, created_at);
CREATE INDEX idx_content_engagement_content_event ON content_engagement(content_id, event_type);

-- ============================================================================
-- SEARCH_LOGS TABLE
-- ============================================================================
CREATE TABLE IF NOT EXISTS search_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL ON UPDATE CASCADE,
  query VARCHAR(255) NOT NULL,
  results_count INTEGER NOT NULL,
  filters JSONB DEFAULT '{}',
  searched_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Create indexes for search_logs
CREATE INDEX idx_search_logs_user_id ON search_logs(user_id);
CREATE INDEX idx_search_logs_query ON search_logs(query);
CREATE INDEX idx_search_logs_searched_at ON search_logs(searched_at);

-- Full-text search index for search queries
CREATE INDEX idx_search_logs_fts ON search_logs USING GIN (to_tsvector('english', query));

-- ============================================================================
-- USER_ACTIVITIES TABLE
-- ============================================================================
CREATE TABLE IF NOT EXISTS user_activities (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL ON UPDATE CASCADE,
  activity_type VARCHAR(50) NOT NULL,
  metadata JSONB DEFAULT '{}',
  ip_address VARCHAR(45),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Create indexes for user_activities
CREATE INDEX idx_user_activities_user_id ON user_activities(user_id);
CREATE INDEX idx_user_activities_activity_type ON user_activities(activity_type);
CREATE INDEX idx_user_activities_created_at ON user_activities(created_at);

-- Composite index for activity analytics
CREATE INDEX idx_user_activities_type_time ON user_activities(activity_type, created_at);

COMMENT ON TABLE page_views IS 'Track page views and visitor sessions';
COMMENT ON TABLE content_engagement IS 'Track user engagement with content';
COMMENT ON TABLE search_logs IS 'Log search queries for analytics';
COMMENT ON TABLE user_activities IS 'General user activity tracking';
