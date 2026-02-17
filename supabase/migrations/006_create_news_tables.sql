-- News Database Schema
-- This migration creates tables for news content: stories, videos, and updates

-- Create the news_stories table
CREATE TABLE IF NOT EXISTS news_stories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  category TEXT NOT NULL,
  date TEXT NOT NULL,
  excerpt TEXT NOT NULL,
  author TEXT NOT NULL,
  content TEXT,
  image_url TEXT,
  is_published BOOLEAN DEFAULT true,
  is_featured BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create the news_videos table
CREATE TABLE IF NOT EXISTS news_videos (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  category TEXT NOT NULL,
  duration TEXT NOT NULL,
  thumbnail TEXT,
  video_url TEXT,
  description TEXT,
  is_published BOOLEAN DEFAULT true,
  is_featured BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create the news_updates table
CREATE TABLE IF NOT EXISTS news_updates (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  tag TEXT NOT NULL,
  date TEXT NOT NULL,
  description TEXT,
  link_url TEXT,
  is_published BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security for all tables
ALTER TABLE news_stories ENABLE ROW LEVEL SECURITY;
ALTER TABLE news_videos ENABLE ROW LEVEL SECURITY;
ALTER TABLE news_updates ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access
CREATE POLICY "Allow public read access to news_stories"
ON news_stories FOR SELECT
USING (is_published = true);

CREATE POLICY "Allow public read access to news_videos"
ON news_videos FOR SELECT
USING (is_published = true);

CREATE POLICY "Allow public read access to news_updates"
ON news_updates FOR SELECT
USING (is_published = true);

-- Create indexes for frequently queried columns
CREATE INDEX IF NOT EXISTS idx_news_stories_category ON news_stories(category);
CREATE INDEX IF NOT EXISTS idx_news_stories_is_featured ON news_stories(is_featured);
CREATE INDEX IF NOT EXISTS idx_news_stories_created_at ON news_stories(created_at DESC);

CREATE INDEX IF NOT EXISTS idx_news_videos_category ON news_videos(category);
CREATE INDEX IF NOT EXISTS idx_news_videos_is_featured ON news_videos(is_featured);
CREATE INDEX IF NOT EXISTS idx_news_videos_created_at ON news_videos(created_at DESC);

CREATE INDEX IF NOT EXISTS idx_news_updates_tag ON news_updates(tag);
CREATE INDEX IF NOT EXISTS idx_news_updates_created_at ON news_updates(created_at DESC);

-- Insert dummy data for testing - Stories (one for each category)
INSERT INTO news_stories (title, category, date, excerpt, author, is_published, is_featured) VALUES
('How Youth Livelihood Funds Are Being Spent in Nairobi', 'Investigations', 'February 2026', 'A deep dive into the youth empowerment programme allocations and what''s actually reaching young people.', 'Budget Team', true, true),
('Understanding the 2025/26 Finance Bill', 'Explainers', 'January 2026', 'What the new taxes mean for ordinary Kenyans and what you can do about it.', 'Analysis Team', true, false),
('Makueni County Budget: What''s Changed Since Last Year', 'County', 'January 2026', 'Comparing this year''s allocations with last year''s spending in one of Kenya''s ASAL counties.', 'County Watch', true, false),
('Health Sector Budget Analysis for FY 2026/27', 'Sector', 'January 2026', 'Breaking down the healthcare allocation and what it means for citizens.', 'Sector Analysis', true, false),
('Youth Voices: My Experience with Public Participation', 'Youth Voices', 'December 2025', 'A young Kenyan shares their experience participating in the budget process.', 'Youth Correspondent', true, false),
('Field Report: Bungoma County Budget Hearing', 'Field Reports', 'December 2025', 'Observations from the public participation forum in Bungoma.', 'Field Team', true, false);

-- Insert dummy data for testing - Videos (one for each category)
INSERT INTO news_videos (title, category, duration, is_published, is_featured) VALUES
('Budget Basics: What is a Budget?', 'Basics', '5:30', true, true),
('Understanding the Finance Bill 2025', 'Finance Bill', '8:15', true, false),
('County Budgets Explained', 'County', '6:45', true, false),
('National Budget Process Overview', 'National', '10:00', true, false),
('Education Sector Budget Breakdown', 'Sector', '7:30', true, false),
('Tracker Stories: Following the Money', 'Tracker Stories', '12:00', true, false);

-- Insert dummy data for testing - Updates (one for each tag)
INSERT INTO news_updates (title, tag, date, is_published) VALUES
('Public Participation Window Opens for FY 2026/27 Budget', 'Participation', 'February 15, 2026', true),
('2025 Budget Policy Statement Now Available', 'Release', 'February 1, 2026', true),
('Free Budget Training: Nairobi Cohort Starting Soon', 'Training', 'January 28, 2026', true),
('Virtual Public Forum: Have Your Say on Health Budget', 'Event', 'January 25, 2026', true),
('New Tracker Features: Visualize County Spending', 'Tracker', 'January 20, 2026', true),
('Annual Report 2025 Now Available', 'New Report', 'January 15, 2026', true);
