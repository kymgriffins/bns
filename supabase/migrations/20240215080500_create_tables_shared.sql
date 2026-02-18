-- Migration: Create shared domain tables
-- Description: Create all shared tables for audit, settings, and API management
-- Date: 2024-02-15

-- ============================================================================
-- AUDIT_LOGS TABLE
-- ============================================================================
CREATE TABLE IF NOT EXISTS audit_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL ON UPDATE CASCADE,
  action VARCHAR(50) NOT NULL,
  resource_type VARCHAR(50) NOT NULL,
  resource_id UUID NOT NULL,
  old_values JSONB,
  new_values JSONB,
  ip_address VARCHAR(45),
  user_agent TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Create indexes for audit_logs
CREATE INDEX idx_audit_logs_user_id ON audit_logs(user_id);
CREATE INDEX idx_audit_logs_action ON audit_logs(action);
CREATE INDEX idx_audit_logs_resource_type ON audit_logs(resource_type);
CREATE INDEX idx_audit_logs_resource_id ON audit_logs(resource_id);
CREATE INDEX idx_audit_logs_created_at ON audit_logs(created_at);

-- Composite index for audit queries
CREATE INDEX idx_audit_logs_resource ON audit_logs(resource_type, resource_id);
CREATE INDEX idx_audit_logs_user_time ON audit_logs(user_id, created_at);

-- ============================================================================
-- API_KEYS TABLE
-- ============================================================================
CREATE TABLE IF NOT EXISTS api_keys (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(100) NOT NULL,
  key_hash VARCHAR(255) NOT NULL UNIQUE,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE ON UPDATE CASCADE,
  permissions JSONB DEFAULT '[]',
  expires_at TIMESTAMPTZ,
  last_used_at TIMESTAMPTZ,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Create indexes for api_keys
CREATE INDEX idx_api_keys_user_id ON api_keys(user_id);
CREATE INDEX idx_api_keys_key_hash ON api_keys(key_hash);
CREATE INDEX idx_api_keys_is_active ON api_keys(is_active);
CREATE INDEX idx_api_keys_expires_at ON api_keys(expires_at);

-- ============================================================================
-- SETTINGS TABLE
-- ============================================================================
CREATE TABLE IF NOT EXISTS settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  key VARCHAR(100) NOT NULL UNIQUE,
  value JSONB NOT NULL,
  description TEXT,
  is_public BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Create trigger for updated_at
CREATE TRIGGER update_settings_updated_at
  BEFORE UPDATE ON settings
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Create index for settings
CREATE INDEX idx_settings_key ON settings(key);
CREATE INDEX idx_settings_is_public ON settings(is_public);

COMMENT ON TABLE audit_logs IS 'Audit trail for all data modifications';
COMMENT ON TABLE api_keys IS 'API key management for external integrations';
COMMENT ON TABLE settings IS 'Application settings and configuration';

-- ============================================================================
-- HELPER FUNCTIONS
-- ============================================================================

-- Function to get published blogs
CREATE OR REPLACE FUNCTION get_published_blogs()
RETURNS SETOF blogs
LANGUAGE sql
STABLE
AS $$
  SELECT * FROM blogs 
  WHERE status = 'published' 
  AND published_at <= NOW()
  AND deleted_at IS NULL
  ORDER BY published_at DESC;
$$;

-- Function to get published news
CREATE OR REPLACE FUNCTION get_published_news()
RETURNS SETOF news
LANGUAGE sql
STABLE
AS $$
  SELECT * FROM news 
  WHERE status = 'published' 
  AND published_at <= NOW()
  AND deleted_at IS NULL
  ORDER BY published_at DESC;
$$;

-- Function to get active categories
CREATE OR REPLACE FUNCTION get_active_categories()
RETURNS SETOF categories
LANGUAGE sql
STABLE
AS $$
  SELECT * FROM categories 
  WHERE is_active = true 
  AND deleted_at IS NULL
  ORDER BY sort_order, name;
$$;

-- Function to calculate reading time
CREATE OR REPLACE FUNCTION calculate_reading_time(content_text TEXT)
RETURNS INTEGER
LANGUAGE sql
STABLE
AS $$
  SELECT CASE 
    WHEN content_text IS NULL OR content_text = '' THEN 0
    ELSE CEIL(array_length(string_to_array(content_text, ' '), 1) / 200.0)::INTEGER
  END;
$$;

-- Function to increment view count
CREATE OR REPLACE FUNCTION increment_blog_view_count(blog_id UUID)
RETURNS VOID
LANGUAGE sql
AS $$
  UPDATE blogs 
  SET view_count = view_count + 1 
  WHERE id = blog_id;
$$;

CREATE OR REPLACE FUNCTION increment_news_view_count(news_id UUID)
RETURNS VOID
LANGUAGE sql
AS $$
  UPDATE news 
  SET view_count = view_count + 1 
  WHERE id = news_id;
$$;

-- Function to get user role names
CREATE OR REPLACE FUNCTION get_user_roles(user_uuid UUID)
RETURNS TABLE(role_name VARCHAR)
LANGUAGE sql
STABLE
AS $$
  SELECT r.name 
  FROM roles r
  INNER JOIN user_roles ur ON r.id = ur.role_id
  WHERE ur.user_id = user_uuid
  AND (ur.expires_at IS NULL OR ur.expires_at > NOW());
$$;

-- Function to check if user has permission
CREATE OR REPLACE FUNCTION has_permission(user_uuid UUID, permission_name VARCHAR)
RETURNS BOOLEAN
LANGUAGE plpgsql
STABLE
AS $$
DECLARE
  has_perm BOOLEAN := FALSE;
BEGIN
  SELECT EXISTS (
    SELECT 1 
    FROM roles r
    INNER JOIN user_roles ur ON r.id = ur.role_id
    INNER JOIN role_permissions rp ON r.id = rp.role_id
    INNER JOIN permissions p ON rp.permission_id = p.id
    WHERE ur.user_id = user_uuid
    AND p.name = permission_name
    AND (ur.expires_at IS NULL OR ur.expires_at > NOW())
  ) INTO has_perm;
  
  RETURN has_perm;
END;
$$;
