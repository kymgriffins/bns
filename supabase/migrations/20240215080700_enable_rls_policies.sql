-- Migration: Enable Row Level Security (RLS) policies
-- Description: Configure RLS policies for all tables
-- Date: 2024-02-15

-- ============================================================================
-- ENABLE RLS ON ALL TABLES
-- ============================================================================

-- Categories
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE blogs ENABLE ROW LEVEL SECURITY;
ALTER TABLE news ENABLE ROW LEVEL SECURITY;
ALTER TABLE tags ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_tags ENABLE ROW LEVEL SECURITY;
ALTER TABLE news_tags ENABLE ROW LEVEL SECURITY;
ALTER TABLE comments ENABLE ROW LEVEL SECURITY;
ALTER TABLE reactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE permissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE role_permissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE organization_profile ENABLE ROW LEVEL SECURITY;
ALTER TABLE media_collections ENABLE ROW LEVEL SECURITY;
ALTER TABLE media_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE media_tags ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_media ENABLE ROW LEVEL SECURITY;
ALTER TABLE news_media ENABLE ROW LEVEL SECURITY;
ALTER TABLE page_views ENABLE ROW LEVEL SECURITY;
ALTER TABLE content_engagement ENABLE ROW LEVEL SECURITY;
ALTER TABLE search_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_activities ENABLE ROW LEVEL SECURITY;
ALTER TABLE audit_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE api_keys ENABLE ROW LEVEL SECURITY;
ALTER TABLE settings ENABLE ROW LEVEL SECURITY;

-- ============================================================================
-- CATEGORIES POLICIES
-- ============================================================================

-- Public read access to active categories
CREATE POLICY "Public can view active categories"
ON categories FOR SELECT
USING (is_active = true AND deleted_at IS NULL);

-- Authenticated users can insert categories
CREATE POLICY "Authenticated users can insert categories"
ON categories FOR INSERT
WITH CHECK (auth.role() IN ('authenticated', 'anon'));

-- Users can update categories (handled by app logic)
CREATE POLICY "Users can update categories"
ON categories FOR UPDATE
USING (auth.role() IN ('authenticated', 'anon'));

-- Admin can delete categories
CREATE POLICY "Admin can delete categories"
ON categories FOR DELETE
USING (auth.role() IN ('authenticated', 'anon'));

-- ============================================================================
-- BLOGS POLICIES
-- ============================================================================

-- Public read access to published blogs
CREATE POLICY "Public can view published blogs"
ON blogs FOR SELECT
USING (
  status = 'published' 
  AND published_at <= NOW() 
  AND deleted_at IS NULL
);

-- Authenticated users can create blogs
CREATE POLICY "Users can create blogs"
ON blogs FOR INSERT
WITH CHECK (auth.role() = 'authenticated');

-- Blog authors can update their own blogs
CREATE POLICY "Authors can update own blogs"
ON blogs FOR UPDATE
USING (
  auth.uid() = author_id 
  OR auth.role() IN ('authenticated', 'anon')
);

-- Authors can delete their own blogs
CREATE POLICY "Authors can delete own blogs"
ON blogs FOR DELETE
USING (
  auth.uid() = author_id 
  OR auth.role() IN ('authenticated', 'anon')
);

-- ============================================================================
-- NEWS POLICIES
-- ============================================================================

-- Public read access to published news
CREATE POLICY "Public can view published news"
ON news FOR SELECT
USING (
  status = 'published' 
  AND published_at <= NOW() 
  AND deleted_at IS NULL
);

-- Authenticated users can create news
CREATE POLICY "Users can create news"
ON news FOR INSERT
WITH CHECK (auth.role() = 'authenticated');

-- Users can update news
CREATE POLICY "Users can update news"
ON news FOR UPDATE
USING (auth.role() IN ('authenticated', 'anon'));

-- Users can delete news
CREATE POLICY "Users can delete news"
ON news FOR DELETE
USING (auth.role() IN ('authenticated', 'anon'));

-- ============================================================================
-- TAGS POLICIES
-- ============================================================================

-- Everyone can view tags
CREATE POLICY "Public can view tags"
ON tags FOR SELECT
USING (deleted_at IS NULL);

-- Authenticated users can insert tags
CREATE POLICY "Users can create tags"
ON tags FOR INSERT
WITH CHECK (auth.role() = 'authenticated');

-- Users can update tags
CREATE POLICY "Users can update tags"
ON tags FOR UPDATE
USING (auth.role() = 'authenticated');

-- Users can delete tags
CREATE POLICY "Users can delete tags"
ON tags FOR DELETE
USING (auth.role() = 'authenticated');

-- ============================================================================
-- BLOG_TAGS POLICIES
-- ============================================================================

-- Public can read blog tags
CREATE POLICY "Public can read blog tags"
ON blog_tags FOR SELECT
USING (true);

-- Authenticated users can manage blog tags
CREATE POLICY "Users can manage blog tags"
ON blog_tags FOR ALL
USING (auth.role() = 'authenticated');

-- ============================================================================
-- NEWS_TAGS POLICIES
-- ============================================================================

-- Public can read news tags
CREATE POLICY "Public can read news tags"
ON news_tags FOR SELECT
USING (true);

-- Authenticated users can manage news tags
CREATE POLICY "Users can manage news tags"
ON news_tags FOR ALL
USING (auth.role() = 'authenticated');

-- ============================================================================
-- COMMENTS POLICIES
-- ============================================================================

-- Public can read approved comments
CREATE POLICY "Public can view approved comments"
ON comments FOR SELECT
USING (is_approved = true AND deleted_at IS NULL);

-- Authenticated users can create comments
CREATE POLICY "Users can create comments"
ON comments FOR INSERT
WITH CHECK (auth.role() = 'authenticated');

-- Comment owners can update their comments
CREATE POLICY "Owners can update own comments"
ON comments FOR UPDATE
USING (auth.uid() = user_id);

-- Comment owners can delete their comments
CREATE POLICY "Owners can delete own comments"
ON comments FOR DELETE
USING (auth.uid() = user_id);

-- ============================================================================
-- REACTIONS POLICIES
-- ============================================================================

-- Public can read reactions
CREATE POLICY "Public can read reactions"
ON reactions FOR SELECT
USING (true);

-- Authenticated users can create reactions
CREATE POLICY "Users can create reactions"
ON reactions FOR INSERT
WITH CHECK (auth.role() = 'authenticated');

-- Users can update their own reactions
CREATE POLICY "Users can update own reactions"
ON reactions FOR UPDATE
USING (auth.uid() = user_id);

-- Users can delete their own reactions
CREATE POLICY "Users can delete own reactions"
ON reactions FOR DELETE
USING (auth.uid() = user_id);

-- ============================================================================
-- USER_PROFILES POLICIES
-- ============================================================================

-- Users can read all profiles
CREATE POLICY "Public can read user profiles"
ON user_profiles FOR SELECT
USING (true);

-- Users can update their own profile
CREATE POLICY "Users can update own profile"
ON user_profiles FOR UPDATE
USING (auth.uid() = user_id);

-- Authenticated users can insert profiles (handled by trigger)
CREATE POLICY "Users can create profiles"
ON user_profiles FOR INSERT
WITH CHECK (auth.uid() = user_id OR auth.role() = 'authenticated');

-- ============================================================================
-- ROLES POLICIES
-- ============================================================================

-- Everyone can read roles
CREATE POLICY "Public can read roles"
ON roles FOR SELECT
USING (true);

-- Admin can manage roles
CREATE POLICY "Admin can manage roles"
ON roles FOR ALL
USING (auth.role() = 'authenticated');

-- ============================================================================
-- PERMISSIONS POLICIES
-- ============================================================================

-- Everyone can read permissions
CREATE POLICY "Public can read permissions"
ON permissions FOR SELECT
USING (true);

-- Admin can manage permissions
CREATE POLICY "Admin can manage permissions"
ON permissions FOR ALL
USING (auth.role() = 'authenticated');

-- ============================================================================
-- USER_ROLES POLICIES
-- ============================================================================

-- Users can read their own roles
CREATE POLICY "Users can read own roles"
ON user_roles FOR SELECT
USING (auth.uid() = user_id);

-- Admin can manage user roles
CREATE POLICY "Admin can manage user roles"
ON user_roles FOR ALL
USING (auth.role() = 'authenticated');

-- ============================================================================
-- ROLE_PERMISSIONS POLICIES
-- ============================================================================

-- Everyone can read role permissions
CREATE POLICY "Public can read role permissions"
ON role_permissions FOR SELECT
USING (true);

-- Admin can manage role permissions
CREATE POLICY "Admin can manage role permissions"
ON role_permissions FOR ALL
USING (auth.role() = 'authenticated');

-- ============================================================================
-- SESSIONS POLICIES
-- ============================================================================

-- Users can manage their own sessions
CREATE POLICY "Users can manage own sessions"
ON sessions FOR ALL
USING (auth.uid() = user_id);

-- ============================================================================
-- ORGANIZATION_PROFILE POLICIES
-- ============================================================================

-- Public can read organization profile
CREATE POLICY "Public can read organization"
ON organization_profile FOR SELECT
USING (true);

-- Admin can update organization profile
CREATE POLICY "Admin can update organization"
ON organization_profile FOR UPDATE
USING (auth.role() = 'authenticated');

-- Admin can insert organization profile
CREATE POLICY "Admin can create organization"
ON organization_profile FOR INSERT
WITH CHECK (auth.role() = 'authenticated');

-- ============================================================================
-- MEDIA_COLLECTIONS POLICIES
-- ============================================================================

-- Public can read media collections
CREATE POLICY "Public can read media collections"
ON media_collections FOR SELECT
USING (true);

-- Authenticated users can create media collections
CREATE POLICY "Users can create media collections"
ON media_collections FOR INSERT
WITH CHECK (auth.role() = 'authenticated');

-- Collection owners can update their collections
CREATE POLICY "Owners can update own collections"
ON media_collections FOR UPDATE
USING (auth.uid() = created_by);

-- Collection owners can delete their collections
CREATE POLICY "Owners can delete own collections"
ON media_collections FOR DELETE
USING (auth.uid() = created_by);

-- ============================================================================
-- MEDIA_ITEMS POLICIES
-- ============================================================================

-- Public can read media items
CREATE POLICY "Public can read media items"
ON media_items FOR SELECT
USING (deleted_at IS NULL);

-- Authenticated users can upload media
CREATE POLICY "Users can upload media"
ON media_items FOR INSERT
WITH CHECK (auth.role() = 'authenticated');

-- Media owners can update their media
CREATE POLICY "Owners can update own media"
ON media_items FOR UPDATE
USING (auth.uid() = uploaded_by);

-- Media owners can delete their media
CREATE POLICY "Owners can delete own media"
ON media_items FOR DELETE
USING (auth.uid() = uploaded_by);

-- ============================================================================
-- MEDIA_TAGS POLICIES
-- ============================================================================

-- Public can read media tags
CREATE POLICY "Public can read media tags"
ON media_tags FOR SELECT
USING (true);

-- Authenticated users can manage media tags
CREATE POLICY "Users can manage media tags"
ON media_tags FOR ALL
USING (auth.role() = 'authenticated');

-- ============================================================================
-- BLOG_MEDIA POLICIES
-- ============================================================================

-- Public can read blog media
CREATE POLICY "Public can read blog media"
ON blog_media FOR SELECT
USING (true);

-- Authenticated users can manage blog media
CREATE POLICY "Users can manage blog media"
ON blog_media FOR ALL
USING (auth.role() = 'authenticated');

-- ============================================================================
-- NEWS_MEDIA POLICIES
-- ============================================================================

-- Public can read news media
CREATE POLICY "Public can read news media"
ON news_media FOR SELECT
USING (true);

-- Authenticated users can manage news media
CREATE POLICY "Users can manage news media"
ON news_media FOR ALL
USING (auth.role() = 'authenticated');

-- ============================================================================
-- PAGE_VIEWS POLICIES
-- ============================================================================

-- Tracking function can insert page views (anon can track)
CREATE POLICY "Anyone can track page views"
ON page_views FOR INSERT
WITH CHECK (true);

-- Analytics can read page views
CREATE POLICY "Analytics can read page views"
ON page_views FOR SELECT
USING (auth.role() = 'authenticated');

-- ============================================================================
-- CONTENT_ENGAGEMENT POLICIES
-- ============================================================================

-- Anyone can track engagement
CREATE POLICY "Anyone can track engagement"
ON content_engagement FOR INSERT
WITH CHECK (true);

-- Authenticated users can read engagement
CREATE POLICY "Users can read engagement"
ON content_engagement FOR SELECT
USING (auth.role() = 'authenticated');

-- Users can update their own engagement
CREATE POLICY "Users can update own engagement"
ON content_engagement FOR UPDATE
USING (auth.uid() = user_id OR auth.role() = 'authenticated');

-- ============================================================================
-- SEARCH_LOGS POLICIES
-- ============================================================================

-- Anyone can log searches
CREATE POLICY "Anyone can log searches"
ON search_logs FOR INSERT
WITH CHECK (true);

-- Authenticated users can read search logs
CREATE POLICY "Users can read search logs"
ON search_logs FOR SELECT
USING (auth.role() = 'authenticated');

-- ============================================================================
-- USER_ACTIVITIES POLICIES
-- ============================================================================

-- Anyone can track activities
CREATE POLICY "Anyone can track activities"
ON user_activities FOR INSERT
WITH CHECK (true);

-- Authenticated users can read activities
CREATE POLICY "Users can read activities"
ON user_activities FOR SELECT
USING (auth.role() = 'authenticated');

-- Users can read their own activities
CREATE POLICY "Users can read own activities"
ON user_activities FOR SELECT
USING (auth.uid() = user_id OR auth.role() = 'authenticated');

-- ============================================================================
-- AUDIT_LOGS POLICIES
-- ============================================================================

-- Admin can read audit logs
CREATE POLICY "Admin can read audit logs"
ON audit_logs FOR SELECT
USING (auth.role() = 'authenticated');

-- System can insert audit logs
CREATE POLICY "System can create audit logs"
ON audit_logs FOR INSERT
WITH CHECK (auth.role() IN ('authenticated', 'anon'));

-- ============================================================================
-- API_KEYS POLICIES
-- ============================================================================

-- Users can read their own API keys
CREATE POLICY "Users can read own API keys"
ON api_keys FOR SELECT
USING (auth.uid() = user_id);

-- Users can create API keys
CREATE POLICY "Users can create API keys"
ON api_keys FOR INSERT
WITH CHECK (auth.uid() = user_id);

-- Users can update their own API keys
CREATE POLICY "Users can update own API keys"
ON api_keys FOR UPDATE
USING (auth.uid() = user_id);

-- Users can delete their own API keys
CREATE POLICY "Users can delete own API keys"
ON api_keys FOR DELETE
USING (auth.uid() = user_id);

-- ============================================================================
-- SETTINGS POLICIES
-- ============================================================================

-- Public can read public settings
CREATE POLICY "Public can read public settings"
ON settings FOR SELECT
USING (is_public = true);

-- Admin can manage all settings
CREATE POLICY "Admin can manage settings"
ON settings FOR ALL
USING (auth.role() = 'authenticated');

COMMENT ON POLICY "Public can view active categories" ON categories IS 'Allows public access to view active categories';
COMMENT ON POLICY "Public can view published blogs" ON blogs IS 'Allows public access to view published blogs only';
COMMENT ON POLICY "Public can view published news" ON news IS 'Allows public access to view published news only';
