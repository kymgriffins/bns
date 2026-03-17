# YouTube Integration - Budget Ndio Story

This integration allows you to automatically fetch videos from your YouTube channel, display them on the landing page and media-hub, and convert them into lessons with AI-generated key takeaways.

## Setup Instructions

### 1. Get YouTube API Key

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project (or select existing)
3. Navigate to **APIs & Services > Library**
4. Search for **YouTube Data API v3** and enable it
5. Go to **APIs & Services > Credentials**
6. Click **Create Credentials > API Key**
7. Copy the API key

### 2. Get Your YouTube Channel ID

1. Go to your YouTube channel
2. Click **More > Settings**
3. Click **Advanced settings**
4. Copy the **Channel ID** (starts with `UC`)

### 3. Configure Environment Variables

Add to your `.env` file:

```env
# YouTube API Configuration
YOUTUBE_API_KEY=your_api_key_here
YOUTUBE_CHANNEL_ID=UCYourChannelId

# Optional: Use channel handle instead of ID
# YOUTUBE_CHANNEL_HANDLE=@BudgetNdioStory

# Maximum videos to fetch
YOUTUBE_MAX_VIDEOS=20

# Enable auto transcript & key takeaways (requires OpenAI)
YOUTUBE_AUTO_TRANSCRIPT=true
OPENAI_API_KEY=your_openai_key_here
```

### 4. Set Up Database (Supabase)

Run the SQL from `DATABASE_LESSONS_SCHEMA.md` in your Supabase dashboard to create the lessons table.

### 5. Sync Videos

To sync videos from YouTube to your database:

```bash
# Option 1: Use the API directly
curl -X POST "http://localhost:3000/api/youtube/sync?limit=10&takeaways=true"

# Option 2: Use the admin page (if implemented)
```

## API Endpoints

### GET /api/youtube/videos
Fetch latest videos from the YouTube channel.

**Parameters:**
- `limit` (optional): Number of videos to fetch (default: 10)
- `videoId` (optional): Fetch a specific video

**Response:**
```json
{
  "videos": [
    {
      "id": "abc123",
      "title": "Video Title",
      "description": "...",
      "thumbnail": "https://...",
      "publishedAt": "2024-01-01T00:00:00Z",
      "duration": "PT10M30S",
      "formattedDuration": "10:30",
      "viewCount": 1000,
      "formattedViewCount": "1K"
    }
  ]
}
```

### GET /api/youtube/lessons
Fetch lessons from the database (includes key takeaways).

**Parameters:**
- `limit` (optional): Number of lessons to fetch

### POST /api/youtube/sync
Sync videos from YouTube to database.

**Parameters:**
- `limit` (optional): Number of videos to sync
- `takeaways` (optional): Generate key takeaways using OpenAI

## Features

### Landing Page
- Displays the latest video from your YouTube channel
- Falls back to `NEXT_PUBLIC_YOUTUBE_PODCAST_URL` if no API key

### Media Hub
- **Lessons Tab**: Videos with AI-generated key takeaways
- **YouTube Tab**: Latest videos from channel
- **TikTok Tab**: TikTok feed
- **Twitter Tab**: Twitter/X feed

### Key Takeaways Generation
When enabled, the system uses OpenAI to:
1. Analyze video title and description
2. Generate a concise lesson title
3. Create a 2-3 sentence summary
4. Extract 3-5 key learning points

## Files Created

- `lib/youtube.ts` - YouTube API service
- `hooks/useYouTube.ts` - React hooks for fetching data
- `components/youtube/YouTubeVideoCard.tsx` - Video components
- `app/api/youtube/videos/route.ts` - Videos API endpoint
- `app/api/youtube/lessons/route.ts` - Lessons API endpoint
- `app/api/youtube/sync/route.ts` - Sync API endpoint

## Transcript Generation

The YouTube Data API doesn't provide captions directly. For production transcript generation, consider:

1. **AssemblyAI** - https://www.assemblyai.com
2. **Rev.com** - https://www.rev.com
3. **Speechmatics** - https://www.speechmatics.com

To add transcript support:
1. Implement a speech-to-text service
2. Add the transcript to the `transcript_json` field in the lessons table
3. Update the `LessonCard` component to display transcript

## Troubleshooting

### Videos Not Loading
- Verify `YOUTUBE_API_KEY` is set correctly
- Check that YouTube Data API is enabled in Google Cloud Console
- Ensure `YOUTUBE_CHANNEL_ID` is correct

### Key Takeaways Not Generating
- Verify `OPENAI_API_KEY` is set
- Check that the video has enough description text

### Database Errors
- Ensure the `lessons` table exists in Supabase
- Check Supabase credentials in `.env`
