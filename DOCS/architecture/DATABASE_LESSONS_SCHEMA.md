# Database Schema: Lessons Table

Run this SQL in your Supabase dashboard or via migration to create the lessons table.

```sql
-- Create lessons table for storing YouTube video lessons
CREATE TABLE IF NOT EXISTS lessons (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  video_id VARCHAR(255) UNIQUE NOT NULL,
  video_title TEXT NOT NULL,
  video_description TEXT,
  video_thumbnail TEXT,
  video_published_at TIMESTAMPTZ,
  video_duration VARCHAR(50),
  video_view_count BIGINT DEFAULT 0,
  video_channel_id VARCHAR(255),
  video_channel_title VARCHAR(255),
  video_tags JSONB,
  transcript_json JSONB,
  takeaways_json JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create index for faster queries
CREATE INDEX IF NOT EXISTS idx_lessons_published_at ON lessons(video_published_at DESC);
CREATE INDEX IF NOT EXISTS idx_lessons_video_id ON lessons(video_id);

-- Enable RLS
ALTER TABLE lessons ENABLE ROW LEVEL SECURITY;

-- Create policy for public read access
CREATE POLICY "Allow public read access to lessons" 
ON lessons FOR SELECT 
USING (true);

-- Create policy for authenticated insert/update
CREATE POLICY "Allow authenticated users to manage lessons"
ON lessons FOR ALL
USING (auth.role() = 'authenticated');
```

## Alternative: Using Supabase JavaScript Client

You can also create the table programmatically using the Supabase client:

```typescript
const { data, error } = await supabase
  .from('lessons')
  .select(`
    *,
    video:video_id (
      id,
      title,
      description,
      thumbnail,
      publishedAt,
      duration,
      viewCount,
      channelId,
      channelTitle,
      tags
    )
  `)
  .order('video_published_at', { ascending: false })
  .limit(20);
```
