-- Migration: Seed default data
-- Description: Insert initial seed data for roles, permissions, categories, tags, and settings
-- Date: 2024-02-15

-- ============================================================================
-- SEED ROLES
-- ============================================================================
INSERT INTO roles (name, description, permissions) VALUES
('admin', 'Full system access with all permissions', '[
  "blogs:create", "blogs:read", "blogs:update", "blogs:delete", "blogs:publish",
  "news:create", "news:read", "news:update", "news:delete", "news:publish",
  "categories:create", "categories:read", "categories:update", "categories:delete",
  "tags:create", "tags:read", "tags:update", "tags:delete",
  "comments:create", "comments:read", "comments:update", "comments:delete", "comments:approve",
  "media:upload", "media:read", "media:delete",
  "users:create", "users:read", "users:update", "users:delete", "users:assign_role",
  "analytics:read",
  "settings:read", "settings:update"
]'),
('editor', 'Content management with publishing rights', '[
  "blogs:create", "blogs:read", "blogs:update", "blogs:publish",
  "news:create", "news:read", "news:update", "news:publish",
  "categories:create", "categories:read", "categories:update",
  "tags:create", "tags:read", "tags:update",
  "comments:create", "comments:read", "comments:update", "comments:approve",
  "media:upload", "media:read",
  "analytics:read"
]'),
('author', 'Create and manage own content', '[
  "blogs:create", "blogs:read", "blogs:update",
  "news:create", "news:read", "news:update",
  "categories:read",
  "tags:read",
  "comments:create", "comments:read",
  "media:upload", "media:read"
]'),
('subscriber', 'Basic access to public content', '[
  "blogs:read",
  "news:read",
  "categories:read",
  "tags:read",
  "comments:create"
]'),
('moderator', 'Comment and content moderation', '[
  "blogs:read",
  "news:read",
  "categories:read",
  "tags:read",
  "comments:create", "comments:read", "comments:update", "comments:delete", "comments:approve",
  "reactions:create", "reactions:read"
]')
ON CONFLICT (name) DO NOTHING;

-- ============================================================================
-- SEED PERMISSIONS
-- ============================================================================
INSERT INTO permissions (name, description, resource, action) VALUES
-- Blog permissions
('blogs:create', 'Create new blog posts', 'blogs', 'create'),
('blogs:read', 'View blog posts', 'blogs', 'read'),
('blogs:update', 'Update blog posts', 'blogs', 'update'),
('blogs:delete', 'Delete blog posts', 'blogs', 'delete'),
('blogs:publish', 'Publish/unpublish blog posts', 'blogs', 'publish'),

-- News permissions
('news:create', 'Create news articles', 'news', 'create'),
('news:read', 'View news articles', 'news', 'read'),
('news:update', 'Update news articles', 'news', 'update'),
('news:delete', 'Delete news articles', 'news', 'delete'),
('news:publish', 'Publish/unpublish news articles', 'news', 'publish'),

-- Category permissions
('categories:create', 'Create categories', 'categories', 'create'),
('categories:read', 'View categories', 'categories', 'read'),
('categories:update', 'Update categories', 'categories', 'update'),
('categories:delete', 'Delete categories', 'categories', 'delete'),

-- Tag permissions
('tags:create', 'Create tags', 'tags', 'create'),
('tags:read', 'View tags', 'tags', 'read'),
('tags:update', 'Update tags', 'tags', 'update'),
('tags:delete', 'Delete tags', 'tags', 'delete'),

-- Comment permissions
('comments:create', 'Create comments', 'comments', 'create'),
('comments:read', 'View comments', 'comments', 'read'),
('comments:update', 'Update comments', 'comments', 'update'),
('comments:delete', 'Delete comments', 'comments', 'delete'),
('comments:approve', 'Approve comments', 'comments', 'approve'),

-- Reaction permissions
('reactions:create', 'Add reactions', 'reactions', 'create'),
('reactions:read', 'View reactions', 'reactions', 'read'),

-- Media permissions
('media:upload', 'Upload media', 'media', 'upload'),
('media:read', 'View media', 'media', 'read'),
('media:delete', 'Delete media', 'media', 'delete'),

-- User permissions
('users:create', 'Create users', 'users', 'create'),
('users:read', 'View users', 'users', 'read'),
('users:update', 'Update users', 'users', 'update'),
('users:delete', 'Delete users', 'users', 'delete'),
('users:assign_role', 'Assign roles to users', 'users', 'assign_role'),

-- Analytics permissions
('analytics:read', 'View analytics', 'analytics', 'read'),

-- Settings permissions
('settings:read', 'View settings', 'settings', 'read'),
('settings:update', 'Update settings', 'settings', 'update')
ON CONFLICT (name) DO NOTHING;

-- ============================================================================
-- SEED ROLE_PERMISSIONS (assign all permissions to admin role)
-- ============================================================================
INSERT INTO role_permissions (role_id, permission_id)
SELECT r.id, p.id
FROM roles r
CROSS JOIN permissions p
WHERE r.name = 'admin'
ON CONFLICT DO NOTHING;

-- ============================================================================
-- SEED CATEGORIES
-- ============================================================================
INSERT INTO categories (name, slug, description, color, icon, sort_order, is_active) VALUES
('Budget Reports', 'budget-reports', 'In-depth budget analysis and reports', '#1E40AF', 'file-text', 1, true),
('News', 'news', 'Latest news and updates', '#DC2626', 'news', 2, true),
('Insights', 'insights', 'Data-driven insights and analysis', '#7C3AED', 'bar-chart-2', 3, true),
('Learn', 'learn', 'Educational content about budgets', '#059669', 'book-open', 4, true),
('County', 'county', 'County-specific budget content', '#D97706', 'map-pin', 5, true),
('Youth', 'youth', 'Youth-focused civic content', '#EC4899', 'users', 6, true),
('Action', 'action', 'Call to action campaigns', '#EF4444', 'zap', 7, true),
('Reports', 'reports', 'Official reports and documents', '#6366F1', 'file', 8, true)
ON CONFLICT (slug) DO NOTHING;

-- ============================================================================
-- SEED TAGS
-- ============================================================================
INSERT INTO tags (name, slug, color) VALUES
('Breaking', 'breaking', '#EF4444'),
('Analysis', 'analysis', '#3B82F6'),
('Data', 'data', '#10B981'),
('Education', 'education', '#8B5CF6'),
('Youth', 'youth', '#EC4899'),
('Healthcare', 'healthcare', '#F59E0B'),
('Education Sector', 'education-sector', '#06B6D4'),
('Infrastructure', 'infrastructure', '#6366F1'),
('Agriculture', 'agriculture', '#84CC16'),
('Transparency', 'transparency', '#14B8A6'),
('Accountability', 'accountability', '#F97316'),
('Participation', 'participation', '#06B6D4'),
('County', 'county', '#D97706'),
('National', 'national', '#1E40AF'),
('Budget', 'budget', '#7C3AED'),
('Tracking', 'tracking', '#10B981'),
('Explainer', 'explainer', '#8B5CF6'),
('Interview', 'interview', '#EC4899'),
('Opinion', 'opinion', '#F59E0B'),
('Feature', 'feature', '#6366F1')
ON CONFLICT (name) DO NOTHING;

-- ============================================================================
-- SEED SETTINGS
-- ============================================================================
INSERT INTO settings (key, value, description, is_public) VALUES
('site_name', '"Budget Ndio Story"', 'Website name', true),
('site_description', '"Follow the Budget. Find the Story."', 'Website tagline', true),
('site_logo', 'null', 'Website logo URL', true),
('posts_per_page', '10', 'Number of posts per page', true),
('enable_comments', 'true', 'Enable comment functionality', true),
('enable_reactions', 'true', 'Enable reaction functionality', true),
('require_comment_approval', 'false', 'Require approval for comments', false),
('max_upload_size', '10485760', 'Maximum upload size in bytes (10MB)', false),
('allowed_file_types', '["image/jpeg", "image/png", "image/webp", "application/pdf"]', 'Allowed file types for upload', false),
('default_og_image', 'null', 'Default Open Graph image URL', true),
('twitter_handle', '"@budgetndio"', 'Twitter handle for social sharing', true),
('facebook_page', 'null', 'Facebook page URL', true),
('contact_email', '"info@budgetndiostory.org"', 'Contact email address', true),
('analytics_enabled', 'true', 'Enable analytics tracking', false),
('maintenance_mode', 'false', 'Enable maintenance mode', false)
ON CONFLICT (key) DO NOTHING;

-- ============================================================================
-- VERIFY SEED DATA
-- ============================================================================
DO $$
BEGIN
  RAISE NOTICE 'Seed data inserted successfully:';
  RAISE NOTICE 'Roles: %', (SELECT COUNT(*) FROM roles);
  RAISE NOTICE 'Permissions: %', (SELECT COUNT(*) FROM permissions);
  RAISE NOTICE 'Categories: %', (SELECT COUNT(*) FROM categories);
  RAISE NOTICE 'Tags: %', (SELECT COUNT(*) FROM tags);
  RAISE NOTICE 'Settings: %', (SELECT COUNT(*) FROM settings);
END $$;
