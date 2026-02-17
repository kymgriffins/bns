-- GR8 News Hub - Comments and Engagement Tracking
-- Migration 004: Comments, Reading Progress, and Social Links

-- ============================================
-- BLOG COMMENTS TABLE (Threaded)
-- ============================================
CREATE TABLE IF NOT EXISTS blog_comments (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  blog_id UUID REFERENCES blogs(id) ON DELETE CASCADE,
  user_id UUID REFERENCES user_profiles(id) ON DELETE SET NULL,
  parent_id UUID REFERENCES blog_comments(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  is_edited BOOLEAN DEFAULT FALSE,
  is_moderated BOOLEAN DEFAULT FALSE,
  moderation_status TEXT DEFAULT 'pending' CHECK (moderation_status IN ('pending', 'approved', 'rejected', 'flagged')),
  moderation_notes TEXT,
  upvotes INT DEFAULT 0,
  downvotes INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE blog_comments ENABLE ROW LEVEL SECURITY;

-- Approved comments are viewable by everyone
CREATE POLICY "Approved comments are viewable"
ON blog_comments FOR SELECT
USING (moderation_status = 'approved');

-- Authenticated users can create comments
CREATE POLICY "Users can create comments"
ON blog_comments FOR INSERT
WITH CHECK (auth.uid() = user_id);

-- Users can update own comments
CREATE POLICY "Users can update own comments"
ON blog_comments FOR UPDATE
USING (auth.uid() = user_id);

-- Users can delete own comments
CREATE POLICY "Users can delete own comments"
ON blog_comments FOR DELETE
USING (auth.uid() = user_id);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_blog_comments_blog ON blog_comments(blog_id);
CREATE INDEX IF NOT EXISTS idx_blog_comments_parent ON blog_comments(parent_id);
CREATE INDEX IF NOT EXISTS idx_blog_comments_user ON blog_comments(user_id);
CREATE INDEX IF NOT EXISTS idx_blog_comments_status ON blog_comments(moderation_status);

-- ============================================
-- READING PROGRESS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS reading_progress (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES user_profiles(id) ON DELETE CASCADE,
  blog_id UUID REFERENCES blogs(id) ON DELETE CASCADE,
  scroll_position INT DEFAULT 0 CHECK (scroll_position >= 0 AND scroll_position <= 100),
  time_spent_seconds INT DEFAULT 0,
  last_read_at TIMESTAMPTZ DEFAULT NOW(),
  completed_at TIMESTAMPTZ,
  UNIQUE(user_id, blog_id)
);

-- Enable RLS
ALTER TABLE reading_progress ENABLE ROW LEVEL SECURITY;

-- Users can read own progress
CREATE POLICY "Users can view own reading progress"
ON reading_progress FOR SELECT
USING (auth.uid() = user_id);

-- Users can create/update own progress
CREATE POLICY "Users can update own reading progress"
ON reading_progress FOR INSERT
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own reading progress update"
ON reading_progress FOR UPDATE
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own reading progress"
ON reading_progress FOR DELETE
USING (auth.uid() = user_id);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_reading_progress_user ON reading_progress(user_id);
CREATE INDEX IF NOT EXISTS idx_reading_progress_blog ON reading_progress(blog_id);
CREATE INDEX IF NOT EXISTS idx_reading_progress_last_read ON reading_progress(last_read_at DESC);

-- ============================================
-- SOCIAL LINKS TABLE (Deep Links)
-- ============================================
CREATE TABLE IF NOT EXISTS social_links (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  blog_id UUID REFERENCES blogs(id) ON DELETE CASCADE,
  platform TEXT NOT NULL CHECK (platform IN ('instagram', 'tiktok', 'twitter', 'facebook')),
  external_url TEXT NOT NULL,
  thumbnail_url TEXT,
  title TEXT,
  description TEXT,
  embed_type TEXT CHECK (embed_type IN ('post', 'video', 'reel', 'story', 'tweet', 'videoTweet')),
  metadata JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE social_links ENABLE ROW LEVEL SECURITY;

-- Public read access
CREATE POLICY "Public social links are viewable"
ON social_links FOR SELECT
USING (true);

-- Authors can manage social links
CREATE POLICY "Authors can manage social links"
ON social_links FOR ALL
USING (
  EXISTS (
    SELECT 1 FROM blogs
    WHERE blogs.id = social_links.blog_id
    AND blogs.author_id = auth.uid()
  )
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_social_links_blog ON social_links(blog_id);
CREATE INDEX IF NOT EXISTS idx_social_links_platform ON social_links(platform);

-- ============================================
-- UPDATED AT TRIGGER FOR COMMENTS
-- ============================================
CREATE TRIGGER update_blog_comments_updated_at
  BEFORE UPDATE ON blog_comments
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- ============================================
-- COMMENT LIKES/VOTES TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS comment_votes (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES user_profiles(id) ON DELETE CASCADE,
  comment_id UUID REFERENCES blog_comments(id) ON DELETE CASCADE,
  vote_type TEXT NOT NULL CHECK (vote_type IN ('up', 'down')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, comment_id, vote_type)
);

-- Enable RLS
ALTER TABLE comment_votes ENABLE ROW LEVEL SECURITY;

-- Public read access
CREATE POLICY "Public comment votes are viewable"
ON comment_votes FOR SELECT
USING (true);

-- Users can vote
CREATE POLICY "Users can vote on comments"
ON comment_votes FOR INSERT
WITH CHECK (auth.uid() = user_id);

-- Users can remove vote
CREATE POLICY "Users can remove comment votes"
ON comment_votes FOR DELETE
USING (auth.uid() = user_id);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_comment_votes_comment ON comment_votes(comment_id);
CREATE INDEX IF NOT EXISTS idx_comment_votes_user ON comment_votes(user_id);

-- ============================================
-- HELPER FUNCTIONS
-- ============================================

-- Function to get comment count for a blog
CREATE OR REPLACE FUNCTION get_blog_comment_count(blog_uuid UUID)
RETURNS INT AS $$
DECLARE
  comment_count INT;
BEGIN
  SELECT COUNT(*) INTO comment_count
  FROM blog_comments
  WHERE blog_id = blog_uuid
  AND moderation_status = 'approved';
  RETURN comment_count;
END;
$$ LANGUAGE plpgsql;

-- Function to update blog like count
CREATE OR REPLACE FUNCTION update_blog_like_count()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    UPDATE blogs SET like_count = like_count + 1 WHERE id = NEW.blog_id;
  ELSIF TG_OP = 'DELETE' THEN
    UPDATE blogs SET like_count = like_count - 1 WHERE id = OLD.blog_id;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to update like count
CREATE TRIGGER update_blog_like_count_trigger
AFTER INSERT OR DELETE ON blog_likes
FOR EACH ROW
EXECUTE FUNCTION update_blog_like_count();

-- Function to update blog bookmark count
CREATE OR REPLACE FUNCTION update_blog_bookmark_count()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    UPDATE blogs SET bookmark_count = bookmark_count + 1 WHERE id = NEW.blog_id;
  ELSIF TG_OP = 'DELETE' THEN
    UPDATE blogs SET bookmark_count = bookmark_count - 1 WHERE id = OLD.blog_id;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to update bookmark count
CREATE TRIGGER update_blog_bookmark_count_trigger
AFTER INSERT OR DELETE ON blog_bookmarks
FOR EACH ROW
EXECUTE FUNCTION update_blog_bookmark_count();

-- Function to update blog share count
CREATE OR REPLACE FUNCTION update_blog_share_count()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE blogs SET share_count = share_count + 1 WHERE id = NEW.blog_id;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to update share count
CREATE TRIGGER update_blog_share_count_trigger
AFTER INSERT ON blog_shares
FOR EACH ROW
EXECUTE FUNCTION update_blog_share_count();

-- Function to update blog view count
CREATE OR REPLACE FUNCTION increment_blog_view()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE blogs SET view_count = view_count + 1 WHERE id = NEW.blog_id;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to increment view count
CREATE TRIGGER increment_blog_view_trigger
AFTER INSERT ON reading_progress
FOR EACH ROW
EXECUTE FUNCTION increment_blog_view();
