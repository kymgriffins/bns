-- GR8 News Hub - Stories, Polls, Notifications, and Moderation
-- Migration 005: Interactive features and content moderation

-- ============================================
-- STORY SESSIONS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS story_sessions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  blog_id UUID REFERENCES blogs(id) ON DELETE CASCADE,
  author_id UUID REFERENCES user_profiles(id) ON DELETE SET NULL,
  title TEXT NOT NULL,
  cover_image TEXT,
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'expired', 'draft')),
  view_count BIGINT DEFAULT 0,
  started_at TIMESTAMPTZ DEFAULT NOW(),
  expires_at TIMESTAMPTZ DEFAULT (NOW() + INTERVAL '24 hours'),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE story_sessions ENABLE ROW LEVEL SECURITY;

-- Active stories are viewable by everyone
CREATE POLICY "Active stories are viewable"
ON story_sessions FOR SELECT
USING (status = 'active' AND expires_at > NOW());

-- Authors can create stories
CREATE POLICY "Authors can create stories"
ON story_sessions FOR INSERT
WITH CHECK (auth.uid() = author_id);

-- Authors can update own stories
CREATE POLICY "Authors can update own stories"
ON story_sessions FOR UPDATE
USING (auth.uid() = author_id);

-- Authors can delete own stories
CREATE POLICY "Authors can delete own stories"
ON story_sessions FOR DELETE
USING (auth.uid() = author_id);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_story_sessions_status ON story_sessions(status) WHERE status = 'active';
CREATE INDEX IF NOT EXISTS idx_story_sessions_expires ON story_sessions(expires_at);
CREATE INDEX IF NOT EXISTS idx_story_sessions_author ON story_sessions(author_id);
CREATE INDEX IF NOT EXISTS idx_story_sessions_blog ON story_sessions(blog_id);

-- ============================================
-- STORY CARDS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS story_cards (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  session_id UUID REFERENCES story_sessions(id) ON DELETE CASCADE,
  order_index INT NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('cover', 'content', 'image', 'cta', 'poll')),
  content JSONB NOT NULL DEFAULT '{}'::jsonb,
  background_color TEXT DEFAULT '#FFFFFF',
  text_color TEXT DEFAULT '#000000',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE story_cards ENABLE ROW LEVEL SECURITY;

-- Public read access
CREATE POLICY "Public story cards are viewable"
ON story_cards FOR SELECT
USING (true);

-- Authors can manage cards
CREATE POLICY "Authors can manage story cards"
ON story_cards FOR ALL
USING (
  EXISTS (
    SELECT 1 FROM story_sessions
    WHERE story_sessions.id = story_cards.session_id
    AND story_sessions.author_id = auth.uid()
  )
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_story_cards_session ON story_cards(session_id);
CREATE INDEX IF NOT EXISTS idx_story_cards_order ON story_cards(order_index);

-- ============================================
-- STORY VIEWS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS story_views (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  session_id UUID REFERENCES story_sessions(id) ON DELETE CASCADE,
  user_id UUID REFERENCES user_profiles(id) ON DELETE SET NULL,
  card_index INT,
  viewed_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE story_views ENABLE ROW LEVEL SECURITY;

-- Public read access
CREATE POLICY "Public story views are viewable"
ON story_views FOR SELECT
USING (true);

-- Anyone can record view
CREATE POLICY "Anyone can record story view"
ON story_views FOR INSERT
WITH CHECK (true);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_story_views_session ON story_views(session_id);
CREATE INDEX IF NOT EXISTS idx_story_views_user ON story_views(user_id);
CREATE INDEX IF NOT EXISTS idx_story_views_viewed ON story_views(viewed_at DESC);

-- ============================================
-- POLLS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS polls (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  blog_id UUID REFERENCES blogs(id) ON DELETE SET NULL,
  question TEXT NOT NULL,
  options JSONB NOT NULL CHECK (jsonb_array_length(options) >= 2),
  allow_multiple BOOLEAN DEFAULT FALSE,
  show_results_before_vote BOOLEAN DEFAULT FALSE,
  ends_at TIMESTAMPTZ,
  is_active BOOLEAN DEFAULT TRUE,
  created_by UUID REFERENCES user_profiles(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE polls ENABLE ROW LEVEL SECURITY;

-- Active polls are viewable
CREATE POLICY "Active polls are viewable"
ON polls FOR SELECT
USING (is_active = true OR (ends_at IS NOT NULL AND ends_at > NOW()));

-- Authors can create polls
CREATE POLICY "Authors can create polls"
ON polls FOR INSERT
WITH CHECK (auth.uid() = created_by);

-- Authors can update own polls
CREATE POLICY "Authors can update own polls"
ON polls FOR UPDATE
USING (auth.uid() = created_by);

-- Authors can delete own polls
CREATE POLICY "Authors can delete own polls"
ON polls FOR DELETE
USING (auth.uid() = created_by);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_polls_blog ON polls(blog_id);
CREATE INDEX IF NOT EXISTS idx_polls_active ON polls(is_active);
CREATE INDEX IF NOT EXISTS idx_polls_ends ON polls(ends_at);

-- ============================================
-- POLL VOTES TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS poll_votes (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  poll_id UUID REFERENCES polls(id) ON DELETE CASCADE,
  user_id UUID REFERENCES user_profiles(id) ON DELETE CASCADE,
  option_indices JSONB NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(poll_id, user_id)
);

-- Enable RLS
ALTER TABLE poll_votes ENABLE ROW LEVEL SECURITY;

-- Public read access for results
CREATE POLICY "Public poll votes are viewable"
ON poll_votes FOR SELECT
USING (true);

-- Authenticated users can vote
CREATE POLICY "Users can vote on polls"
ON poll_votes FOR INSERT
WITH CHECK (auth.uid() = user_id);

-- Users can update own vote
CREATE POLICY "Users can update own poll vote"
ON poll_votes FOR UPDATE
USING (auth.uid() = user_id);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_poll_votes_poll ON poll_votes(poll_id);
CREATE INDEX IF NOT EXISTS idx_poll_votes_user ON poll_votes(user_id);

-- ============================================
-- NOTIFICATIONS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS notifications (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES user_profiles(id) ON DELETE CASCADE,
  type TEXT NOT NULL CHECK (type IN ('like', 'comment', 'reply', 'mention', 'follow', 'system', 'story', 'poll')),
  title TEXT NOT NULL,
  body TEXT,
  data JSONB,
  action_url TEXT,
  is_read BOOLEAN DEFAULT FALSE,
  is_deleted BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;

-- Users can read own notifications
CREATE POLICY "Users can view own notifications"
ON notifications FOR SELECT
USING (auth.uid() = user_id);

-- System can create notifications
CREATE POLICY "System can create notifications"
ON notifications FOR INSERT
WITH CHECK (true);

-- Users can mark as read
CREATE POLICY "Users can mark notifications as read"
ON notifications FOR UPDATE
USING (auth.uid() = user_id);

-- Users can delete own notifications
CREATE POLICY "Users can delete own notifications"
ON notifications FOR DELETE
USING (auth.uid() = user_id);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_notifications_user ON notifications(user_id, is_read, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_notifications_type ON notifications(type);
CREATE INDEX IF NOT EXISTS idx_notifications_unread ON notifications(user_id, is_read) WHERE is_read = false;

-- ============================================
-- MODERATION QUEUE TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS moderation_queue (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  content_type TEXT NOT NULL CHECK (content_type IN ('blog', 'comment', 'profile')),
  content_id UUID NOT NULL,
  reported_by UUID REFERENCES user_profiles(id) ON DELETE SET NULL,
  reason TEXT NOT NULL CHECK (reason IN ('spam', 'harassment', 'misinformation', 'violence', 'hate_speech', 'nsfw', 'copyright', 'other')),
  description TEXT,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected', 'escalated')),
  moderated_by UUID REFERENCES user_profiles(id) ON DELETE SET NULL,
  moderation_notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  resolved_at TIMESTAMPTZ
);

-- Enable RLS
ALTER TABLE moderation_queue ENABLE ROW LEVEL SECURITY;

-- Public can view pending reports
CREATE POLICY "Public can view moderation queue"
ON moderation_queue FOR SELECT
USING (status = 'pending');

-- Anyone can report content
CREATE POLICY "Anyone can report content"
ON moderation_queue FOR INSERT
WITH CHECK (true);

-- Moderators can update status
CREATE POLICY "Moderators can update moderation status"
ON moderation_queue FOR UPDATE
USING (
  EXISTS (
    SELECT 1 FROM user_profiles
    WHERE user_profiles.id = auth.uid()
    AND user_profiles.is_active = true
  )
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_moderation_queue_status ON moderation_queue(status);
CREATE INDEX IF NOT EXISTS idx_moderation_queue_type ON moderation_queue(content_type);
CREATE INDEX IF NOT EXISTS idx_moderation_queue_reason ON moderation_queue(reason);
CREATE INDEX IF NOT EXISTS idx_moderation_queue_created ON moderation_queue(created_at DESC);

-- ============================================
-- HELPER FUNCTIONS FOR POLLS
-- ============================================

-- Function to get poll results
CREATE OR REPLACE FUNCTION get_poll_results(poll_uuid UUID)
RETURNS TABLE (
  option_index INT,
  option_text TEXT,
  vote_count BIGINT
) AS $$
BEGIN
  RETURN QUERY
  SELECT
    (jsonb_array_elements(p.options)::jsonb->>'index')::INT as option_index,
    (jsonb_array_elements(p.options)::jsonb->>'text')::TEXT as option_text,
    COUNT(pv.id)::BIGINT as vote_count
  FROM polls p
  LEFT JOIN poll_votes pv ON pv.poll_id = p.id
  WHERE p.id = poll_uuid
  GROUP BY (jsonb_array_elements(p.options)::jsonb->>'index')::INT, (jsonb_array_elements(p.options)::jsonb->>'text')::TEXT
  ORDER BY (jsonb_array_elements(p.options)::jsonb->>'index')::INT;
END;
$$ LANGUAGE plpgsql;

-- Function to auto-expire stories
CREATE OR REPLACE FUNCTION expire_stories()
RETURNS void AS $$
BEGIN
  UPDATE story_sessions
  SET status = 'expired'
  WHERE status = 'active'
  AND expires_at < NOW();
END;
$$ LANGUAGE plpgsql;

-- ============================================
-- TRIGGER FOR STORY VIEW COUNT
-- ============================================
CREATE OR REPLACE FUNCTION update_story_view_count()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE story_sessions SET view_count = view_count + 1 WHERE id = NEW.session_id;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_story_view_count_trigger
AFTER INSERT ON story_views
FOR EACH ROW
EXECUTE FUNCTION update_story_view_count();
