-- Budget Ndio Story - Comments and Live Chat Schema
-- Run this SQL in your Supabase SQL Editor to enable comments and live chat features

-- ============================================
-- COMMENTS TABLE
-- ============================================

CREATE TABLE IF NOT EXISTS public.comments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  news_id UUID NOT NULL,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  parent_id UUID REFERENCES public.comments(id) ON DELETE CASCADE,
  status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected', 'deleted')),
  likes_count INTEGER DEFAULT 0,
  is_edited BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index for fetching comments by news_id
CREATE INDEX IF NOT EXISTS idx_comments_news_id ON public.comments(news_id);
CREATE INDEX IF NOT EXISTS idx_comments_status ON public.comments(status);
CREATE INDEX IF NOT EXISTS idx_comments_user_id ON public.comments(user_id);
CREATE INDEX IF NOT EXISTS idx_comments_parent_id ON public.comments(parent_id);

-- ============================================
-- CHAT MESSAGES TABLE (Live Discussion)
-- ============================================

CREATE TABLE IF NOT EXISTS public.chat_messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  news_id UUID NOT NULL,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index for fetching chat messages
CREATE INDEX IF NOT EXISTS idx_chat_messages_news_id ON public.chat_messages(news_id);
CREATE INDEX IF NOT EXISTS idx_chat_messages_created_at ON public.chat_messages(created_at DESC);

-- ============================================
-- CHAT ACTIVE USERS TABLE
-- ============================================

CREATE TABLE IF NOT EXISTS public.chat_active_users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  news_id UUID NOT NULL,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  last_active TIMESTAMPTZ DEFAULT NOW(),
  joined_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(news_id, user_id)
);

-- Index for fetching active users
CREATE INDEX IF NOT EXISTS idx_chat_active_users_news_id ON public.chat_active_users(news_id);
CREATE INDEX IF NOT EXISTS idx_chat_active_users_last_active ON public.chat_active_users(last_active);

-- ============================================
-- PROFILES TABLE UPDATE (Add is_blocked column if not exists)
-- ============================================

DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'profiles' AND column_name = 'is_blocked'
  ) THEN
    ALTER TABLE public.profiles ADD COLUMN is_blocked BOOLEAN DEFAULT false;
  END IF;
END $$;

-- ============================================
-- ENABLE REALTIME
-- ============================================

-- Enable realtime for comments table
ALTER PUBLICATION supabase_realtime ADD TABLE public.comments;
ALTER PUBLICATION supabase_realtime ADD TABLE public.chat_messages;
ALTER PUBLICATION supabase_realtime ADD TABLE public.chat_active_users;

-- ============================================
-- ROW LEVEL SECURITY POLICIES
-- ============================================

-- Comments: Anyone can read approved comments
CREATE POLICY IF NOT EXISTS "Anyone can read approved comments" ON public.comments
  FOR SELECT USING (status = 'approved');

-- Comments: Authenticated users can insert
CREATE POLICY IF NOT EXISTS "Authenticated users can insert comments" ON public.comments
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');

-- Comments: Users can update their own comments
CREATE POLICY IF NOT EXISTS "Users can update own comments" ON public.comments
  FOR UPDATE USING (auth.uid() = user_id);

-- Comments: Users can delete their own comments
CREATE POLICY IF NOT EXISTS "Users can delete own comments" ON public.comments
  FOR DELETE USING (auth.uid() = user_id);

-- Chat Messages: Anyone can read
CREATE POLICY IF NOT EXISTS "Anyone can read chat messages" ON public.chat_messages
  FOR SELECT USING (true);

-- Chat Messages: Authenticated users can insert
CREATE POLICY IF NOT EXISTS "Authenticated users can insert chat messages" ON public.chat_messages
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');

-- Chat Active Users: Anyone can read
CREATE POLICY IF NOT EXISTS "Anyone can read active users" ON public.chat_active_users
  FOR SELECT USING (true);

-- Chat Active Users: Authenticated users can upsert
CREATE POLICY IF NOT EXISTS "Authenticated users can manage active status" ON public.chat_active_users
  FOR ALL USING (auth.role() = 'authenticated');

-- ============================================
-- FUNCTION TO GET USER PROFILE IN COMMENTS
-- ============================================

COMMENT ON TABLE public.comments IS 'User comments on news articles with safety filtering';
COMMENT ON TABLE public.chat_messages IS 'Real-time chat messages for live discussions';
COMMENT ON TABLE public.chat_active_users IS 'Track active users in live discussions';
