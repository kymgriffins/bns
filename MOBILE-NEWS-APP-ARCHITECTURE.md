# GR8 News Hub - Mobile News Application Architecture

## Executive Summary

This document outlines the comprehensive architecture for **GR8 News Hub**, a mobile-first news aggregation platform that serves as a centralized media hub for news and updates. The application functions strictly as a content aggregator without hosting any video or short-form content internally. All multimedia content is sourced exclusively through deep links to top social media platforms (Instagram, TikTok, Twitter/X, Facebook), while blog content is hosted internally with a dedicated "Stories" reading experience.

---

## 1. Application Overview

### 1.1 Core Concept

**GR8 News Hub** is a hybrid content aggregator that combines:
- **Internal Blog Hosting**: Full article publishing system with rich text editing
- **External Social Media Integration**: Deep linking to Instagram, TikTok, Twitter/X, and Facebook for video/short-form content
- **Stories Experience**: Immersive, swipeable card-based reading interface for blog content
- **Real-time Engagement**: Live comments, notifications, and interactive features via WebSockets

### 1.2 Content Model

| Content Type | Hosting Strategy | Display Method |
|--------------|-------------------|----------------|
| Blog Articles | Internal Database | In-app rendering with Stories UI |
| Instagram Posts | External Deep Link | Embedded preview card → Native app/web |
| TikTok Videos | External Deep Link | Embedded preview card → Native app/web |
| Twitter/X Posts | External Deep Link | Embedded preview card → Native app/web |
| Facebook Content | External Deep Link | Embedded preview card → Native app/web |

### 1.3 Target Platform

- **Primary**: iOS and Android mobile applications
- **Secondary**: Progressive Web App (PWA) for desktop access
- **Minimum iOS Version**: iOS 14.0
- **Minimum Android Version**: Android 8.0 (API 26)

---

## 2. System Architecture

### 2.1 High-Level Architecture

```
┌─────────────────────────────────────────────────────────────────────────┐
│                          CLIENT LAYER                                    │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐   │
│  │  React      │  │  React      │  │  React      │  │  PWA        │   │
│  │  Native     │  │  Native     │  │  Native     │  │  (Fallback) │   │
│  │  (iOS)      │  │  (Android)  │  │  Web        │  │             │   │
│  └─────────────┘  └─────────────┘  └─────────────┘  └─────────────┘   │
└─────────────────────────────────────────────────────────────────────────┘
                                    │
                                    ▼
┌─────────────────────────────────────────────────────────────────────────┐
│                         API GATEWAY LAYER                               │
│  ┌─────────────────────────────────────────────────────────────────┐   │
│  │                    Next.js API Routes                           │   │
│  │  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────────────┐   │   │
│  │  │ Auth     │ │ Content  │ │ Engage   │ │ Social Links    │   │   │
│  │  │ Service  │ │ Service  │ │ Service  │ │ Service         │   │   │
│  │  └──────────┘ └──────────┘ └──────────┘ └──────────────────┘   │   │
│  └─────────────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────────────┘
                                    │
                                    ▼
┌─────────────────────────────────────────────────────────────────────────┐
│                       MICROSERVICES LAYER                                │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐   │
│  │  User       │  │  Content    │  │  Engage-    │  │  Social     │   │
│  │  Service    │  │  Service    │  │  ment       │  │  Integration │   │
│  │             │  │  (Blogs)    │  │  Service    │  │  Service    │   │
│  └─────────────┘  └─────────────┘  └─────────────┘  └─────────────┘   │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐   │
│  │  Notifi-    │  │  Stories    │  │  Moderation │  │  Analytics  │   │
│  │  cation     │  │  Service    │  │  Service    │  │  Service    │   │
│  │  Service    │  │             │  │             │  │             │   │
│  └─────────────┘  └─────────────┘  └─────────────┘  └─────────────┘   │
└─────────────────────────────────────────────────────────────────────────┘
                                    │
                                    ▼
┌─────────────────────────────────────────────────────────────────────────┐
│                         DATA LAYER                                       │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐   │
│  │  PostgreSQL  │  │   Redis     │  │  S3/Blob     │  │  Elastic-   │   │
│  │  (Primary)   │  │  (Cache/    │  │  Storage     │  │  search     │   │
│  │              │  │   Queue)    │  │  (Media)     │  │  (Search)   │   │
│  └─────────────┘  └─────────────┘  └─────────────┘  └─────────────┘   │
└─────────────────────────────────────────────────────────────────────────┘
                                    │
                                    ▼
┌─────────────────────────────────────────────────────────────────────────┐
│                    EXTERNAL INTEGRATIONS                                 │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐   │
│  │  Instagram  │  │   TikTok    │  │ Twitter/X   │  │  Facebook   │   │
│  │  API        │  │   API       │  │   API       │  │   API       │   │
│  └─────────────┘  └─────────────┘  └─────────────┘  └─────────────┘   │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐   │
│  │  Apple Push │  │  Firebase   │  │  SendGrid   │  │  Cloudflare │   │
│  │  Notif.     │  │  CloudMsg   │  │  (Email)    │  │  (CDN)      │   │
│  └─────────────┘  └─────────────┘  └─────────────┘  └─────────────┘   │
└─────────────────────────────────────────────────────────────────────────┘
```

### 2.2 Technology Stack

#### Frontend (Mobile)

| Technology | Version | Purpose |
|------------|---------|---------|
| React Native | 0.76.x | Cross-platform mobile framework |
| Expo | SDK 52 | Development and build tooling |
| React Navigation | 6.x | Navigation framework |
| Redux Toolkit | 2.x | State management |
| RTK Query | 2.x | Data fetching and caching |
| react-native-reanimated | 3.x | Animations |
| react-native-gesture-handler | 2.x | Gesture handling |
| MMKV | 1.x | Fast key-value storage |
| SQLite | expo-sqlite | Offline database |

#### Frontend (Web PWA)

| Technology | Version | Purpose |
|------------|---------|---------|
| Next.js | 14.x | React framework with SSR |
| TypeScript | 5.x | Type safety |
| Tailwind CSS | 3.x | Styling |
| Zustand | 4.x | Lightweight state management |
| SWR | 1.x | Data fetching |

#### Backend

| Technology | Version | Purpose |
|------------|---------|---------|
| Next.js API Routes | 14.x | Server-side API |
| Supabase | Latest | Auth, Database, Realtime |
| PostgreSQL | 15.x | Primary database |
| Redis | 7.x | Caching, sessions, pub/sub |
| Socket.io | 4.x | WebSocket server |
| Node.js | 20.x LTS | Runtime |

#### Infrastructure

| Service | Purpose |
|---------|---------|
| Vercel | Frontend deployment |
| Supabase | Database and auth |
| AWS S3 | Media storage |
| Cloudflare | CDN and DDoS protection |
| Firebase Cloud Messaging | Push notifications |

---

## 3. Database Schema Design

### 3.1 Core Entity Relationship Diagram

```
┌──────────────┐       ┌──────────────┐       ┌──────────────┐
│    users     │       │   profiles   │       │  categories  │
├──────────────┤       ├──────────────┤       ├──────────────┤
│ id (PK)      │──1:1──│ user_id (FK) │       │ id (PK)      │
│ email        │       │ username     │       │ name         │
│ email_verified│      │ avatar_url    │       │ slug         │
│ created_at   │       │ bio          │       │ description  │
│ last_sign_in │       │ is_verified  │       │ color        │
│ role         │       │ created_at   │       │ icon         │
└──────────────┘       └──────────────┘       └──────────────┘
                              │                        │
                              │                        │
                              ▼                        ▼
┌────────────────────────────────────────────────────────────────┐
│                         blogs                                   │
├────────────────────────────────────────────────────────────────┤
│ id (PK)                                                      │
│ title                                                        │
│ slug (unique)                                                │
│ excerpt                                                      │
│ content (JSON - rich text)                                   │
│ cover_image                                                  │
│ author_id (FK → users)                                       │
│ category_id (FK → categories)                                │
│ status (draft/published/archived)                           │
│ is_premium (boolean)                                         │
│ reading_time_minutes                                         │
│ view_count                                                   │
│ published_at                                                 │
│ created_at                                                   │
│ updated_at                                                   │
└────────────────────────────────────────────────────────────────┘
                              │
            ┌─────────────────┼─────────────────┐
            ▼                 ▼                 ▼
┌──────────────────┐ ┌──────────────────┐ ┌──────────────────┐
│  blog_likes      │ │ blog_bookmarks  │ │  blog_shares    │
├──────────────────┤ ├──────────────────┤ ├──────────────────┤
│ id (PK)          │ │ id (PK)         │ │ id (PK)         │
│ user_id (FK)     │ │ user_id (FK)    │ │ user_id (FK)    │
│ blog_id (FK)     │ │ blog_id (FK)    │ │ blog_id (FK)    │
│ created_at       │ │ created_at      │ │ created_at      │
│                  │ │                 │ │ platform        │
└──────────────────┘ └──────────────────┘ └──────────────────┘
            │
            ▼
┌────────────────────────────────────────────────────────────────┐
│                     blog_comments                              │
├────────────────────────────────────────────────────────────────┤
│ id (PK)                                                      │
│ blog_id (FK)                                                 │
│ user_id (FK)                                                 │
│ parent_id (FK - self-referencing for replies)                │
│ content                                                      │
│ is_edited                                                    │
│ is_moderated                                                 │
│ moderation_status (pending/approved/rejected)                │
│ created_at                                                   │
│ updated_at                                                   │
└────────────────────────────────────────────────────────────────┘
            │
            ▼
┌────────────────────────────────────────────────────────────────┐
│                  reading_progress                              │
├────────────────────────────────────────────────────────────────┤
│ id (PK)                                                      │
│ user_id (FK)                                                 │
│ blog_id (FK)                                                 │
│ scroll_position (percentage 0-100)                           │
│ last_read_at                                                 │
│ completed_at                                                 │
└────────────────────────────────────────────────────────────────┘
```

### 3.2 Social Media Links Schema

```
┌────────────────────────────────────────────────────────────────┐
│                     social_links                               │
├────────────────────────────────────────────────────────────────┤
│ id (PK)                                                      │
│ blog_id (FK)                                                 │
│ platform (instagram/tiktok/twitter/facebook)                │
│ external_url                                                 │
│ thumbnail_url                                                │
│ title                                                        │
│ description                                                  │
│ embed_type (post/video/reel/story)                          │
│ created_at                                                   │
└────────────────────────────────────────────────────────────────┘
```

### 3.3 Notifications Schema

```
┌────────────────────────────────────────────────────────────────┐
│                      notifications                             │
├────────────────────────────────────────────────────────────────┤
│ id (PK)                                                      │
│ user_id (FK)                                                 │
│ type (like/comment/reply/mention/follow/system)             │
│ title                                                        │
│ body                                                         │
│ data (JSON - type-specific payload)                          │
│ is_read                                                      │
│ created_at                                                   │
└────────────────────────────────────────────────────────────────┘
```

### 3.4 Stories Schema

```
┌────────────────────────────────────────────────────────────────┐
│                       story_sessions                           │
├────────────────────────────────────────────────────────────────┤
│ id (PK)                                                      │
│ blog_id (FK)                                                 │
│ user_id (FK - creator)                                       │
│ title                                                        │
│ cover_image                                                  │
│ status (active/expired)                                      │
│ view_count                                                   │
│ started_at                                                   │
│ expires_at                                                   │
│ created_at                                                   │
└────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌────────────────────────────────────────────────────────────────┐
│                      story_cards                               │
├────────────────────────────────────────────────────────────────┤
│ id (PK)                                                      │
│ session_id (FK → story_sessions)                             │
│ order_index                                                  │
│ type (cover/content/cta)                                     │
│ content (JSON - card-specific data)                          │
│ created_at                                                   │
└────────────────────────────────────────────────────────────────┘
```

### 3.5 Polls Schema (Interactive Features)

```
┌────────────────────────────────────────────────────────────────┐
│                         polls                                   │
├────────────────────────────────────────────────────────────────┤
│ id (PK)                                                      │
│ blog_id (FK - optional, can be standalone)                   │
│ question                                                    │
│ options (JSON array)                                         │
│ ends_at                                                      │
│ is_active                                                    │
│ created_by (FK → users)                                      │
│ created_at                                                   │
└────────────────────────────────────────────────────────────────┘
            │
            ▼
┌────────────────────────────────────────────────────────────────┐
│                       poll_votes                               │
├────────────────────────────────────────────────────────────────┤
│ id (PK)                                                      │
│ poll_id (FK)                                                 │
│ user_id (FK)                                                 │
│ option_index                                                │
│ created_at                                                   │
└────────────────────────────────────────────────────────────────┘
```

### 3.6 SQL Schema Definitions

```sql
-- Users table (extends Supabase auth.users)
CREATE TABLE public.profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  username TEXT UNIQUE NOT NULL,
  display_name TEXT,
  avatar_url TEXT,
  bio TEXT,
  is_verified BOOLEAN DEFAULT FALSE,
  role TEXT DEFAULT 'user' CHECK (role IN ('user', 'author', 'moderator', 'admin')),
  notification_preferences JSONB DEFAULT '{"email": true, "push": true, "likes": true, "comments": true, "follows": true}'::jsonb,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Categories for content organization
CREATE TABLE public.categories (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  color TEXT DEFAULT '#E53935',
  icon TEXT,
  parent_id UUID REFERENCES categories(id),
  sort_order INT DEFAULT 0,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Blog articles
CREATE TABLE public.blogs (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  excerpt TEXT,
  content JSONB NOT NULL, -- Rich text content with blocks
  cover_image TEXT,
  author_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
  category_id UUID REFERENCES categories(id) ON DELETE SET NULL,
  status TEXT DEFAULT 'draft' CHECK (status IN ('draft', 'published', 'archived', 'review')),
  is_premium BOOLEAN DEFAULT FALSE,
  is_featured BOOLEAN DEFAULT FALSE,
  reading_time_minutes INT,
  view_count BIGINT DEFAULT 0,
  like_count BIGINT DEFAULT 0,
  comment_count BIGINT DEFAULT 0,
  share_count BIGINT DEFAULT 0,
  bookmark_count BIGINT DEFAULT 0,
  seo_title TEXT,
  seo_description TEXT,
  published_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Blog likes
CREATE TABLE public.blog_likes (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  blog_id UUID REFERENCES blogs(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, blog_id)
);

-- Blog bookmarks
CREATE TABLE public.blog_bookmarks (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  blog_id UUID REFERENCES blogs(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, blog_id)
);

-- Blog shares
CREATE TABLE public.blog_shares (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
  blog_id UUID REFERENCES blogs(id) ON DELETE CASCADE,
  platform TEXT NOT NULL CHECK (platform IN ('copy', 'whatsapp', 'twitter', 'facebook', 'instagram', 'email')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Blog comments with threading
CREATE TABLE public.blog_comments (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  blog_id UUID REFERENCES blogs(id) ON DELETE CASCADE,
  user_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
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

-- Reading progress tracking
CREATE TABLE public.reading_progress (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  blog_id UUID REFERENCES blogs(id) ON DELETE CASCADE,
  scroll_position INT DEFAULT 0 CHECK (scroll_position >= 0 AND scroll_position <= 100),
  time_spent_seconds INT DEFAULT 0,
  last_read_at TIMESTAMPTZ DEFAULT NOW(),
  completed_at TIMESTAMPTZ,
  UNIQUE(user_id, blog_id)
);

-- Social media links for deep linking
CREATE TABLE public.social_links (
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

-- Notifications
CREATE TABLE public.notifications (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  type TEXT NOT NULL CHECK (type IN ('like', 'comment', 'reply', 'mention', 'follow', 'system', 'story', 'poll')),
  title TEXT NOT NULL,
  body TEXT,
  data JSONB,
  action_url TEXT,
  is_read BOOLEAN DEFAULT FALSE,
  is_deleted BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Story sessions for Stories feature
CREATE TABLE public.story_sessions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  blog_id UUID REFERENCES blogs(id) ON DELETE CASCADE,
  author_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
  title TEXT NOT NULL,
  cover_image TEXT,
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'expired', 'draft')),
  view_count BIGINT DEFAULT 0,
  started_at TIMESTAMPTZ DEFAULT NOW(),
  expires_at TIMESTAMPTZ DEFAULT (NOW() + INTERVAL '24 hours'),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Story cards within sessions
CREATE TABLE public.story_cards (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  session_id UUID REFERENCES story_sessions(id) ON DELETE CASCADE,
  order_index INT NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('cover', 'content', 'image', 'cta', 'poll')),
  content JSONB NOT NULL,
  background_color TEXT DEFAULT '#FFFFFF',
  text_color TEXT DEFAULT '#000000',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Interactive polls
CREATE TABLE public.polls (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  blog_id UUID REFERENCES blogs(id) ON DELETE SET NULL,
  question TEXT NOT NULL,
  options JSONB NOT NULL CHECK (jsonb_array_length(options) >= 2),
  allow_multiple BOOLEAN DEFAULT FALSE,
  show_results_before_vote BOOLEAN DEFAULT FALSE,
  ends_at TIMESTAMPTZ,
  is_active BOOLEAN DEFAULT TRUE,
  created_by UUID REFERENCES profiles(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Poll votes
CREATE TABLE public.poll_votes (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  poll_id UUID REFERENCES polls(id) ON DELETE CASCADE,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  option_indices JSONB NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(poll_id, user_id)
);

-- Content moderation queue
CREATE TABLE public.moderation_queue (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  content_type TEXT NOT NULL CHECK (content_type IN ('blog', 'comment', 'profile')),
  content_id UUID NOT NULL,
  reported_by UUID REFERENCES profiles(id) ON DELETE SET NULL,
  reason TEXT NOT NULL CHECK (reason IN ('spam', 'harassment', ' misinformation', 'violence', 'other')),
  description TEXT,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected', 'escalated')),
  moderated_by UUID REFERENCES profiles(id) ON DELETE SET NULL,
  moderation_notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  resolved_at TIMESTAMPTZ
);

-- Indexes for performance
CREATE INDEX idx_blogs_status ON blogs(status) WHERE status = 'published';
CREATE INDEX idx_blogs_category ON blogs(category_id);
CREATE INDEX idx_blogs_author ON blogs(author_id);
CREATE INDEX idx_blogs_published ON blogs(published_at DESC) WHERE status = 'published';
CREATE INDEX idx_comments_blog ON blog_comments(blog_id);
CREATE INDEX idx_comments_parent ON blog_comments(parent_id);
CREATE INDEX idx_notifications_user ON notifications(user_id, is_read, created_at DESC);
CREATE INDEX idx_reading_progress_user ON reading_progress(user_id, last_read_at DESC);
CREATE INDEX idx_story_sessions_active ON story_sessions(status, expires_at) WHERE status = 'active';

-- Row Level Security Policies
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE blogs ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_comments ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_likes ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_bookmarks ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;

-- Profiles: Users can read all, update own
CREATE POLICY "Public profiles are viewable by everyone" ON profiles FOR SELECT USING (true);
CREATE POLICY "Users can update own profile" ON profiles FOR UPDATE USING (auth.uid() = id);

-- Blogs: Read published, create/update own
CREATE POLICY "Published blogs are viewable by everyone" ON blogs FOR SELECT USING (status = 'published');
CREATE POLICY "Users can create blogs" ON blogs FOR INSERT WITH CHECK (auth.uid() = author_id);
CREATE POLICY "Users can update own blogs" ON blogs FOR UPDATE USING (auth.uid() = author_id);

-- Comments: Read approved, create own, update/delete own
CREATE POLICY "Approved comments are viewable" ON blog_comments FOR SELECT USING (moderation_status = 'approved');
CREATE POLICY "Users can create comments" ON blog_comments FOR INSERT WITH CHECK (auth.uid() = user_id);
```

---

## 4. API Endpoint Design

### 4.1 REST API Endpoints

#### Authentication
```
POST   /api/auth/register          - User registration
POST   /api/auth/login             - User login
POST   /api/auth/logout            - User logout
POST   /api/auth/refresh           - Refresh access token
POST   /api/auth/forgot-password   - Request password reset
POST   /api/auth/reset-password    - Reset password
GET    /api/auth/me                - Get current user
```

#### Blogs
```
GET    /api/blogs                  - List blogs (with filters, pagination)
GET    /api/blogs/:slug            - Get blog by slug
POST   /api/blogs                  - Create blog (authenticated)
PUT    /api/blogs/:id              - Update blog (authenticated)
DELETE /api/blogs/:id              - Delete blog (authenticated)
GET    /api/blogs/featured         - Get featured blogs
GET    /api/blogs/trending         - Get trending blogs
GET    /api/blogs/category/:slug   - Get blogs by category
GET    /api/blogs/author/:username - Get blogs by author
GET    /api/blogs/search            - Search blogs
```

#### Engagement
```
POST   /api/blogs/:id/like         - Like blog
DELETE /api/blogs/:id/like         - Unlike blog
POST   /api/blogs/:id/bookmark     - Bookmark blog
DELETE /api/blogs/:id/bookmark     - Remove bookmark
POST   /api/blogs/:id/share        - Record share
POST   /api/blogs/:id/comments     - Add comment
GET    /api/blogs/:id/comments     - Get comments (paginated)
PUT    /api/comments/:id           - Update comment
DELETE /api/comments/:id           - Delete comment
POST   /api/comments/:id/reply      - Reply to comment
POST   /api/comments/:id/vote       - Vote on comment
```

#### Reading Progress
```
GET    /api/progress/:blogId       - Get reading progress
POST   /api/progress/:blogId       - Update reading progress
POST   /api/progress/:blogId/complete - Mark as completed
```

#### Social Links
```
GET    /api/blogs/:id/social-links - Get social links for blog
POST   /api/blogs/:id/social-links  - Add social link (author only)
DELETE /api/social-links/:id        - Delete social link
```

#### Stories
```
GET    /api/stories                - Get active story sessions
GET    /api/stories/:id            - Get story session details
GET    /api/stories/:id/progress   - Get user's story progress
POST   /api/stories/:id/view       - Record story view
PUT    /api/stories/:id/progress   - Update story progress
```

#### Polls
```
GET    /api/polls/:id              - Get poll details
POST   /api/polls/:id/vote         - Vote on poll
GET    /api/polls/:id/results      - Get poll results
POST   /api/blogs/:id/polls        - Create poll (author only)
```

#### Notifications
```
GET    /api/notifications          - Get user notifications
PUT    /api/notifications/:id/read - Mark as read
PUT    /api/notifications/read-all - Mark all as read
DELETE /api/notifications/:id      - Delete notification
GET    /api/notifications/unread-count - Get unread count
```

#### User Profiles
```
GET    /api/users/:username         - Get user profile
PUT    /api/users/:username         - Update own profile
GET    /api/users/:username/activity - Get user activity
POST   /api/users/:username/follow - Follow user
DELETE /api/users/:username/follow - Unfollow user
```

#### Moderation
```
GET    /api/moderation/queue        - Get moderation queue (moderators)
POST   /api/moderation/report       - Report content
PUT    /api/moderation/:id/approve  - Approve content
PUT    /api/moderation/:id/reject   - Reject content
```

### 4.2 WebSocket Events

#### Connection Management
```
ws://api.example.com/ws
- Event: connect
- Event: disconnect
- Event: auth (authenticate connection)
```

#### Real-time Comments
```
- Subscribe: blog/:id/comments
- Event: comment:new         - New comment posted
- Event: comment:updated    - Comment edited
- Event: comment:deleted     - Comment removed
- Event: comment:vote        - Vote updated
```

#### Notifications
```
- Subscribe: user/:id/notifications
- Event: notification:new   - New notification
- Event: notification:read  - Notification read
```

#### Stories
```
- Subscribe: stories
- Event: story:view        - Story viewed
- Event: story:progress    - Progress updated
```

#### Polls
```
- Subscribe: poll/:id
- Event: poll:vote        - New vote recorded
- Event: poll:ended       - Poll ended
```

---

## 5. UI/UX Architecture

### 5.1 Design System

#### Color Palette
```css
:root {
  /* Primary Colors */
  --color-primary: #E53935;        /* Red - main brand */
  --color-primary-dark: #B71C1C;
  --color-primary-light: #FFCDD2;
  
  /* Secondary Colors */
  --color-secondary: #1E88E5;      /* Blue */
  --color-secondary-dark: #1565C0;
  --color-secondary-light: #BBDEFB;
  
  /* Accent Colors */
  --color-accent: #43A047;         /* Green - success */
  --color-warning: #FB8C00;         /* Orange - warning */
  --color-error: #E53935;          /* Red - error */
  
  /* Neutrals */
  --color-background: #FFFFFF;
  --color-surface: #F5F5F5;
  --color-surface-elevated: #FFFFFF;
  --color-text-primary: #212121;
  --color-text-secondary: #757575;
  --color-text-disabled: #BDBDBD;
  --color-border: #E0E0E0;
  
  /* Dark Mode */
  --color-background-dark: #121212;
  --color-surface-dark: #1E1E1E;
  --color-text-primary-dark: #FFFFFF;
  --color-text-secondary-dark: #B0B0B0;
}
```

#### Typography
```css
/* Font Families */
--font-primary: 'Inter', system-ui, sans-serif;
--font-display: 'Poppins', system-ui, sans-serif;
--font-mono: 'JetBrains Mono', monospace;

/* Font Sizes */
--text-xs: 0.75rem;     /* 12px */
--text-sm: 0.875rem;    /* 14px */
--text-base: 1rem;      /* 16px */
--text-lg: 1.125rem;   /* 18px */
--text-xl: 1.25rem;    /* 20px */
--text-2xl: 1.5rem;    /* 24px */
--text-3xl: 1.875rem;  /* 30px */
--text-4xl: 2.25rem;   /* 36px */
--text-5xl: 3rem;      /* 48px */

/* Line Heights */
--leading-tight: 1.25;
--leading-normal: 1.5;
--leading-relaxed: 1.75;

/* Font Weights */
--font-normal: 400;
--font-medium: 500;
--font-semibold: 600;
--font-bold: 700;
```

#### Spacing System
```css
--space-1: 0.25rem;   /* 4px */
--space-2: 0.5rem;    /* 8px */
--space-3: 0.75rem;   /* 12px */
--space-4: 1rem;      /* 16px */
--space-5: 1.25rem;  /* 20px */
--space-6: 1.5rem;   /* 24px */
--space-8: 2rem;     /* 32px */
--space-10: 2.5rem;  /* 40px */
--space-12: 3rem;    /* 48px */
--space-16: 4rem;    /* 64px */
```

#### Component Sizes
```css
/* Border Radius */
--radius-sm: 4px;
--radius-md: 8px;
--radius-lg: 12px;
--radius-xl: 16px;
--radius-full: 9999px;

/* Shadows */
--shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.05);
--shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
--shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
--shadow-xl: 0 20px 25px -5px rgba(0, 0, 0, 0.1);

/* Transitions */
--transition-fast: 150ms ease;
--transition-base: 200ms ease;
--transition-slow: 300ms ease;
--transition-spring: 300ms cubic-bezier(0.34, 1.56, 0.64, 1);
```

### 5.2 Component Hierarchy

```
App
├── NavigationProvider
│   ├── TabNavigator (Bottom Tabs)
│   │   ├── HomeStack
│   │   │   ├── HomeScreen
│   │   │   ├── BlogListScreen
│   │   │   ├── BlogDetailScreen
│   │   │   └── BlogReaderScreen
│   │   ├── StoriesStack
│   │   │   ├── StoriesFeedScreen
│   │   │   ├── StoryViewerScreen
│   │   │   └── StoryCreateScreen
│   │   ├── ExploreStack
│   │   │   ├── ExploreScreen
│   │   │   ├── CategoryScreen
│   │   │   └── SearchScreen
│   │   ├── NotificationsStack
│   │   │   ├── NotificationsScreen
│   │   │   └── NotificationDetailScreen
│   │   └── ProfileStack
│   │       ├── ProfileScreen
│   │       ├── EditProfileScreen
│   │       ├── BookmarksScreen
│   │       ├── ReadingHistoryScreen
│   │       └── SettingsScreen
│   └── AuthNavigator
│       ├── LoginScreen
│       ├── RegisterScreen
│       ├── ForgotPasswordScreen
│       └── VerifyEmailScreen
├── ThemeProvider
├── AuthProvider
└── NotificationProvider
```

### 5.3 Core UI Components

#### Content Display Components
| Component | Description |
|-----------|-------------|
| `BlogCard` | Preview card for blog articles |
| `BlogList` | Paginated list of blog cards |
| `BlogCover` | Full-width cover image with overlay |
| `BlogContent` | Rich text content renderer |
| `SocialLinkCard` | External social media preview |
| `SocialLinkEmbed` | Embedded social media content |
| `CategoryBadge` | Category tag pill |
| `AuthorBadge` | Author info with avatar |

#### Stories Components
| Component | Description |
|-----------|-------------|
| `StoryProgressBar` | Horizontal progress indicators |
| `StoryCard` | Individual story frame |
| `StoryViewer` | Full-screen swipeable viewer |
| `StoryCreator` | Multi-step story creator |
| `StoryAvatar` | Circular avatar with ring indicator |

#### Engagement Components
| Component | Description |
|-----------|-------------|
| `LikeButton` | Animated like button with count |
| `BookmarkButton` | Save/bookmark toggle |
| `ShareSheet` | Native share sheet modal |
| `CommentInput` | Comment text input with actions |
| `CommentThread` | Nested comment display |
| `CommentItem` | Single comment with actions |
| `ReactionPicker` | Emoji reaction picker |
| `ReadingProgressBar` | Inline progress indicator |

#### Navigation Components
| Component | Description |
|-----------|-------------|
| `BottomTabBar` | Bottom navigation tabs |
| `Header` | Screen header with actions |
| `SearchBar` | Expandable search input |
| `CategoryFilter` | Horizontal scrollable filters |
| `DrawerMenu` | Side drawer for settings |

#### Feedback Components
| Component | Description |
|-----------|-------------|
| `LoadingSpinner` | Loading indicator |
| `EmptyState` | Empty content placeholder |
| `ErrorState` | Error message display |
| `Toast` | Temporary notification |
| `Banner` | Persistent informational banner |

### 5.4 Screen Specifications

#### Home Screen
```
┌────────────────────────────────────────┐
│  Header: "GR8 News"          [🔔] [👤]  │
├────────────────────────────────────────┤
│  [Featured Story Carousel]             │
│  ┌──────────────────────────────────┐  │
│  │  Cover Image + Overlay            │  │
│  │  Category Badge                   │  │
│  │  Title (2 lines max)             │  │
│  │  Author + Read Time               │  │
│  └──────────────────────────────────┘  │
├────────────────────────────────────────┤
│  Categories: [All] [Tech] [Politics].. │
├────────────────────────────────────────┤
│  Latest Stories                        │
│  ┌────┐ ┌────┐ ┌────┐ ┌────┐           │
│  │ 📷 │ │ 📷 │ │ 📷 │ │ 📷 │           │
│  │    │ │    │ │    │ │    │           │
│  │Title│ │Title│ │Title│ │Title│        │
│  │Time│ │Time│ │Time│ │Time│           │
│  └────┘ └────┘ └────┘ └────┘           │
├────────────────────────────────────────┤
│  Social Feed Preview                   │
│  ┌──────────────────────────────────┐  │
│  │ [IG] @user • 2h ago              │  │
│  │ Preview content...               │  │
│  │ [View on Instagram] →           │  │
│  └──────────────────────────────────┘  │
└────────────────────────────────────────┘
│  [Home] [Stories] [Explore] [Notif] [Profile] │
└────────────────────────────────────────┘
```

#### Stories Viewer Screen (Full Screen)
```
┌────────────────────────────────────────┐
│ [←]              Story           [••] │
├────────────────────────────────────────┤
│ ████████████░░░░░░░░░░░░░░░░░░░░░░░░░░ │
├────────────────────────────────────────┤
│                                        │
│         ┌─────────────────┐           │
│         │                 │           │
│         │   CONTENT       │           │
│         │   (Image/       │           │
│         │    Text/        │           │
│         │    Poll)        │           │
│         │                 │           │
│         └─────────────────┘           │
│                                        │
│                                        │
│  [←] swipe [→]                         │
│                                        │
├────────────────────────────────────────┤
│  [❤️] 234    [💬] 45    [↗️] Share    │
└────────────────────────────────────────┘
```

#### Blog Reader Screen
```
┌────────────────────────────────────────┐
│ [←]                      [🔖] [📤] [⋮] │
├────────────────────────────────────────┤
│  Cover Image (16:9)                    │
├────────────────────────────────────────┤
│  Category Badge                        │
│                                        │
│  Blog Title (Large)                    │
│                                        │
│  Author Avatar + Name    •   Read Time │
│                                        │
├────────────────────────────────────────┤
│  ████████████░░░░░░ 45%                │
├────────────────────────────────────────┤
│  Rich text content begins here...      │
│                                        │
│  [Embedded Social Links Section]       │
│  ┌──────────────────────────────────┐  │
│  │ 📱 View on Instagram           →│  │
│  │ 📱 View on TikTok               →│  │
│  │ 📱 View on Twitter              →│  │
│  └──────────────────────────────────┘  │
│                                        │
│  [Interactive Poll if present]         │
│  ┌──────────────────────────────────┐  │
│  │ Poll question?                   │  │
│  │ ○ Option A                       │  │
│  │ ○ Option B                       │  │
│  │ ○ Option C                       │  │
│  └──────────────────────────────────┘  │
│                                        │
├────────────────────────────────────────┤
│  💬 Comments (24)                       │
│  ┌──────────────────────────────────┐  │
│  │ 👤 User1: Great article!        │  │
│  │    2h ago  [Reply] [👍]        │  │
│  │  ↳ 👤 User2: Agree!            │  │
│  │       1h ago [Reply] [👍]       │  │
│  └──────────────────────────────────┘  │
│  ┌──────────────────────────────────┐  │
│  │ Add a comment...                 │  │
│  └──────────────────────────────────┘  │
└────────────────────────────────────────┘
```

---

## 6. Navigation Flow

### 6.1 Primary Navigation Structure

```
App Entry
    │
    ├── First Launch / Not Logged In
    │   └── Auth Flow
    │       ├── Splash Screen
    │       ├── Onboarding (optional)
    │       ├── Login Screen
    │       ├── Register Screen
    │       └── Forgot Password
    │
    └── Logged In
        └── Main Tab Navigator
            ├── Tab 1: Home
            │   └── Home Stack
            │       ├── Home Feed
            │       ├── Blog List (by category)
            │       ├── Blog Detail
            │       └── Blog Reader
            │
            ├── Tab 2: Stories
            │   └── Stories Stack
            │       ├── Stories Feed (horizontal)
            │       ├── Story Viewer (full screen)
            │       └── Create Story (author only)
            │
            ├── Tab 3: Explore
            │   └── Explore Stack
            │       ├── Search
            │       ├── Categories
            │       ├── Trending
            │       └── Authors
            │
            ├── Tab 4: Notifications
            │   └── Notifications Stack
            │       ├── Notification List
            │       └── Notification Detail
            │
            └── Tab 5: Profile
                └── Profile Stack
                    ├── My Profile
                    ├── Edit Profile
                    ├── My Blogs
                    ├── Bookmarks
                    ├── Reading History
                    ├── Settings
                    └── Admin Panel (if applicable)
```

### 6.2 Deep Linking Schema

```typescript
// Custom URL Scheme: gr8news://
// Universal Links: https://gr8news.app/

// Route patterns
const routes = {
  // Blog routes
  'blog/:slug': '/blog/[slug]',
  'blog/:slug/comments': '/blog/[slug]/comments',
  
  // Stories routes
  'stories': '/stories',
  'story/:id': '/stories/[id]',
  
  // Profile routes
  'profile/:username': '/profile/[username]',
  'profile/:username/blogs': '/profile/[username]/blogs',
  
  // Auth routes
  'auth/login': '/auth/login',
  'auth/register': '/auth/register',
  
  // Social media deep links
  'social/instagram/:postId': 'instagram://',
  'social/tiktok/:videoId': 'tiktok://',
  'social/twitter/:tweetId': 'twitter://',
  'social/facebook/:postId': 'fb://',
};

// External social media URL handlers
const socialPlatforms = {
  instagram: {
    app: 'instagram://',
    web: 'https://instagram.com/',
    fallback: 'https://instagram.com/',
  },
  tiktok: {
    app: 'tiktok://',
    web: 'https://www.tiktok.com/@',
    fallback: 'https://www.tiktok.com/',
  },
  twitter: {
    app: 'twitter://',
    web: 'https://twitter.com/',
    fallback: 'https://twitter.com/',
  },
  facebook: {
    app: 'fb://',
    web: 'https://facebook.com/',
    fallback: 'https://facebook.com/',
  },
};
```

### 6.3 State Management Architecture

```typescript
// Global State Structure
interface RootState {
  auth: AuthState;
  blogs: BlogsState;
  stories: StoriesState;
  notifications: NotificationsState;
  ui: UIState;
  offline: OfflineState;
}

interface AuthState {
  user: User | null;
  profile: Profile | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

interface BlogsState {
  featured: Blog[];
  latest: Blog[];
  trending: Blog[];
  byCategory: Record<string, Blog[]>;
  currentBlog: Blog | null;
  comments: Comment[];
  loading: boolean;
  error: string | null;
}

interface StoriesState {
  activeSessions: StorySession[];
  currentSession: StorySession | null;
  currentCardIndex: number;
  viewedCards: string[];
  loading: boolean;
}

interface NotificationsState {
  items: Notification[];
  unreadCount: number;
  loading: boolean;
}

interface UIState {
  theme: 'light' | 'dark' | 'system';
  bottomSheet: BottomSheetState | null;
  modal: ModalState | null;
  toast: ToastState | null;
}

interface OfflineState {
  isOnline: boolean;
  cachedBlogs: Blog[];
  pendingActions: PendingAction[];
  syncStatus: 'idle' | 'syncing' | 'error';
}
```

---

## 7. User Engagement Systems

### 7.1 Like Reactions System

```typescript
// Like/Reaction Types
interface Reaction {
  type: 'like' | 'love' | 'laugh' | 'angry' | 'sad' | 'surprised';
  emoji: string;
  count: number;
}

// Implementation
- Optimistic UI updates
- Debounced API calls (300ms)
- Real-time sync via WebSocket
- Animation: Scale bounce + particle effect
```

### 7.2 Comments System

```typescript
// Comment Features
- Threaded replies (max 3 levels deep)
- Rich text formatting (bold, italic, links, mentions)
- @mentions with autocomplete
- Report functionality
- Moderation integration
- Real-time new comment notifications
- Pagination: 20 comments per page
- Sort: Newest, Oldest, Most Liked
```

### 7.3 Share Functionality

```typescript
// Share Options
const shareOptions = [
  { id: 'copy', label: 'Copy Link', icon: 'link', native: false },
  { id: 'whatsapp', label: 'WhatsApp', icon: 'message-circle', native: true },
  { id: 'twitter', label: 'Twitter', icon: 'twitter', native: true },
  { id: 'facebook', label: 'Facebook', icon: 'facebook', native: true },
  { id: 'instagram', label: 'Instagram', icon: 'instagram', native: true },
  { id: 'email', label: 'Email', icon: 'mail', native: true },
  { id: 'sms', label: 'Message', icon: 'message-square', native: true },
];

// Deep Link Integration
- Pre-populated share text
- UTM parameters for tracking
- Preview card generation
```

### 7.4 Bookmarking System

```typescript
// Bookmark Features
- Save later reading for
- Organize into collections (future)
- Offline access integration
- Sync across devices
- Quick access from reader screen
- Swipe to bookmark (gesture)
```

### 7.5 Reading Progress Tracking

```typescript
// Tracking Implementation
- Scroll position (0-100%)
- Time spent reading (seconds)
- Read completion detection (>90% scroll + >30s)
- Progress saved every 5 seconds
- Resume from last position
- Reading history with timestamps

// Visual Indicators
- Progress bar in reader header
- Percentage indicator
- "X min remaining" estimate
- Completion celebration (animation)
```

### 7.6 Interactive Polls

```typescript
// Poll Features
- Single or multiple choice
- Real-time vote counts
- Anonymous or visible voting
- Time-limited polls
- Results visibility options
- Integration within blog content
- WebSocket real-time updates
```

---

## 8. Real-Time Architecture (WebSockets)

### 8.1 Socket.io Implementation

```typescript
// Server Setup
import { Server } from 'socket.io';
import { createAdapter } from '@socket.io/redis-adapter';
import { createClient } from 'redis';

const io = new Server(httpServer, {
  cors: {
    origin: process.env.ALLOWED_ORIGINS?.split(',') || '*',
    methods: ['GET', 'POST'],
  },
  transports: ['websocket', 'polling'],
});

// Redis adapter for scalability
const pubClient = createClient({ url: process.env.REDIS_URL });
const subClient = pubClient.duplicate();
io.adapter(createAdapter(pubClient, subClient));

// Authentication middleware
io.use(async (socket, next) => {
  const token = socket.handshake.auth.token;
  if (!token) {
    return next(new Error('Authentication required'));
  }
  // Verify token and attach user to socket
  const user = await verifyToken(token);
  socket.user = user;
  next();
});

// Room management
const rooms = {
  blog: (blogId: string) => `blog:${blogId}`,
  user: (userId: string) => `user:${userId}`,
  story: (storyId: string) => `story:${storyId}`,
  poll: (pollId: string) => `poll:${pollId}`,
};
```

### 8.2 Event Handlers

```typescript
// Comments Events
io.on('connection', (socket) => {
  // Join blog comments room
  socket.on('comments:subscribe', (blogId: string) => {
    socket.join(rooms.blog(blogId));
  });
  
  socket.on('comments:unsubscribe', (blogId: string) => {
    socket.leave(rooms.blog(blogId));
  });
  
  // Handle new comment
  socket.on('comment:create', async (data) => {
    const comment = await createComment(data);
    io.to(rooms.blog(data.blogId)).emit('comment:new', comment);
  });
});

// Notifications Events
socket.on('notifications:subscribe', (userId: string) => {
  socket.join(rooms.user(userId));
});

socket.on('notifications:mark-read', async (notificationId: string) => {
  await markAsRead(notificationId);
  socket.emit('notification:read', notificationId);
});

// Stories Events
socket.on('stories:view', async (storyId: string) => {
  const view = await recordStoryView(storyId);
  io.to(rooms.story(storyId)).emit('story:view:count', view.count);
});

// Poll Events
socket.on('poll:vote', async (data) => {
  const vote = await recordVote(data);
  io.to(rooms.poll(data.pollId)).emit('poll:update', vote);
});
```

### 8.3 Presence System

```typescript
// Online user tracking
io.on('connection', (socket) => {
  // Track user presence
  socket.on('presence:join', (roomId: string) => {
    socket.join(`presence:${roomId}`);
    socket.to(`presence:${roomId}`).emit('user:online', socket.user.id);
  });
  
  socket.on('presence:leave', (roomId: string) => {
    socket.to(`presence:${roomId}`).emit('user:offline', socket.user.id);
  });
  
  // Get online users
  socket.on('presence:get', async (roomId: string) => {
    const sockets = await io.in(`presence:${roomId}`).fetchSockets();
    const onlineUsers = sockets.map(s => s.user.id);
    socket.emit('presence:list', onlineUsers);
  });
});
```

---

## 9. Content Moderation Framework

### 9.1 Moderation Pipeline

```
┌─────────────┐    ┌─────────────┐    ┌─────────────┐    ┌─────────────┐
│  Content    │───▶│  Auto       │───▶│  Report     │───▶│  Manual     │
│  Created    │    │  Moderation │    │  Queue      │    │  Review     │
└─────────────┘    └─────────────┘    └─────────────┘    └─────────────┘
       │                  │                   │                  │
       ▼                  ▼                   ▼                  ▼
  - User posts       - AI/ML Filter      - Flagged          - Moderator
    content          - Keyword Block      Content            Decision
  - System           - Rate Limit       - Priority        - Approve/
    creates         - Sentiment          Queue              Reject
  - Initial         - NSFW Detection  - Auto-ticket      - Escalate
    status:                            - Alerts           - Warn User
    "pending"
```

### 9.2 Auto-Moderation Rules

```typescript
// Moderation Configuration
const moderationRules = {
  // Content filters
  filters: {
    // Blocked keywords (exact match)
    blockedKeywords: [
      'spam', 'scam', 'fake', 'fraud',
    ],
    // Flagged keywords (require review)
    flaggedKeywords: [
      'suspicious', 'verify', 'claim',
    ],
    // Regex patterns for spam detection
    spamPatterns: [
      /\b(buy|sell|discount|free|prize|winner)\b/i,
      /https?:\/\/[^\s]{50,}/,
      /(.)\1{5,}/, // Repeated characters
    ],
    // NSFW detection (would integrate with ML service)
    nsfwThreshold: 0.8,
  },
  
  // Rate limiting
  rateLimits: {
    postsPerHour: 10,
    commentsPerMinute: 5,
    reportsPerDay: 20,
  },
  
  // Auto-approve conditions
  autoApprove: {
    trustedUsers: true, // Users with trusted status
    minAccountAge: 7, // days
    minReputation: 100,
  },
  
  // Escalation triggers
  escalation: {
    multipleReports: 3,
    highRiskKeywords: true,
    sentimentScore: -0.8,
  },
};
```

### 9.3 Moderation API

```typescript
// Moderation Queue Types
interface ModerationItem {
  id: string;
  contentType: 'blog' | 'comment' | 'profile';
  contentId: string;
  content: any;
  reporterId?: string;
  reason: ModerationReason;
  description?: string;
  status: 'pending' | 'approved' | 'rejected' | 'escalated';
  autoProcessed: boolean;
  createdAt: Date;
  resolvedAt?: Date;
  moderatorId?: string;
  notes?: string;
}

type ModerationReason = 
  | 'spam'
  | 'harassment'
  | 'misinformation'
  | 'violence'
  | 'hate_speech'
  | 'nsfw'
  | 'copyright'
  | 'other';

// API Endpoints
- GET /api/moderation/queue - Get pending items
- GET /api/moderation/stats - Get moderation statistics
- POST /api/moderation/:id/approve - Approve content
- POST /api/moderation/:id/reject - Reject content
- POST /api/moderation/:id/escalate - Escalate to senior moderator
- POST /api/moderation/:id/warn - Issue warning to user
- POST /api/moderation/report - Report content (public)
```

### 9.4 User Reporting

```typescript
// Report Flow
1. User selects "Report" on content
2. Choose reason from predefined list
3. Optional: Add description
4. Submit report
5. Confirmation toast
6. Content added to moderation queue

// Report Reasons
const reportReasons = {
  blog: ['spam', 'misinformation', 'harassment', 'violence', 'nsfw', 'copyright', 'other'],
  comment: ['spam', 'harassment', 'hate_speech', 'off_topic', 'other'],
  profile: ['impersonation', 'harassment', 'spam', 'other'],
};
```

---

## 10. Offline Capabilities Strategy

### 10.1 Caching Architecture

```
┌─────────────────────────────────────────────────────────┐
│                    Cache Hierarchy                       │
├─────────────────────────────────────────────────────────┤
│                                                          │
│  ┌──────────────┐    ┌──────────────┐    ┌────────────┐ │
│  │  Memory      │    │  Local DB   │    │  Remote    │ │
│  │  Cache       │    │  (SQLite)    │    │  Server    │ │
│  │              │    │              │    │            │ │
│  │  - Redux     │    │  - Blogs     │    │  - All     │ │
│  │  - Current   │    │  - Comments  │    │    Data    │ │
│  │    Screen    │    │  - Progress  │    │            │ │
│  │  - Prefs     │    │  - Bookmarks │    │            │ │
│  └──────┬───────┘    └──────┬───────┘    └─────┬──────┘ │
│         │                   │                   │        │
│         ▼                   ▼                   ▼        │
│  ┌─────────────────────────────────────────────────────┐ │
│  │              Cache Coordinator                       │ │
│  │  - Write-through for critical data                  │ │
│  │  - Lazy loading for large content                    │ │
│  │  - Background sync when online                       │ │
│  │  - Conflict resolution                                │ │
│  └─────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────┘
```

### 10.2 Offline-First Data Strategy

```typescript
// Data Synchronization Strategy
interface SyncStrategy {
  // Always available offline
  offlineCritical: [
    'userProfile',
    'bookmarks',
    'readingProgress',
    'draftContent',
  ];
  
  // Cache and sync
  cacheAndSync: [
    'recentBlogs',
    'homeFeed',
    'categories',
    'trending',
  ];
  
  // Always fetch fresh
  alwaysOnline: [
    'comments',
    'notifications',
    'real-time polls',
    'live stories',
  ];
}

// Background Sync
const backgroundSync = {
  // Sync when app returns to foreground
  onForeground: ['userData', 'notifications'],
  
  // Sync periodically
  periodic: [
    { key: 'homeFeed', interval: 15 * 60 * 1000 }, // 15 min
    { key: 'trending', interval: 30 * 60 * 1000 }, // 30 min
  ],
  
  // Sync on network restore
  onNetworkRestore: ['pendingActions', 'drafts'],
};
```

### 10.3 Storage Implementation

```typescript
// Storage Layer Implementation
import AsyncStorage from '@react-native-async-storage/async-storage';
import { expoSQLite } from 'expo-sqlite';
import { MMKV } from 'react-native-mmkv';

// MMKV for fast key-value storage (settings, preferences)
const mmkvStorage = new MMKV({
  id: 'gr8-settings',
});

// SQLite for structured data (blogs, comments)
const db = expoSQLite.openDatabase('gr8cache.db');

// Sync queue for offline actions
const syncQueue = {
  add: async (action: PendingAction) => {
    await AsyncStorage.setItem(
      `sync_${Date.now()}`,
      JSON.stringify(action)
    );
  },
  
  process: async () => {
    const keys = await AsyncStorage.getAllKeys();
    const pending = keys.filter(k => k.startsWith('sync_'));
    
    for (const key of pending) {
      const action = JSON.parse(await AsyncStorage.getItem(key));
      try {
        await executeAction(action);
        await AsyncStorage.removeItem(key);
      } catch (error) {
        // Retry logic
      }
    }
  },
};
```

### 10.4 Performance Optimization

#### Image Optimization
```typescript
// Image Loading Strategy
const imageOptimization = {
  // Use responsive images
  sizes: [400, 800, 1200, 1600],
  
  // Use modern formats (WebP, AVIF)
  formats: ['avif', 'webp', 'jpg'],
  
  // Lazy loading
  lazyThreshold: 200, // pixels
  
  // Caching
  cachePolicy: 'cacheFirst',
  
  // Placeholder
  placeholder: 'blurhash',
};

// Social Media Preview Optimization
const socialPreviewOptimization = {
  // Pre-fetch metadata on feed scroll
  prefetchDistance: 5,
  
  // Cache OG tags
  cacheTTL: 24 * 60 * 60 * 1000, // 24 hours
  
  // Fallback for failed previews
  fallbackImage: '/assets/placeholder-social.png',
};
```

#### List Optimization
```typescript
// Virtualized Lists
const listOptimization = {
  // Use FlashList for performance
  itemHeight: 120,
  overscan: 5,
  
  // Pagination
  pageSize: 20,
  
  // Prefetching
  prefetchThreshold: 10,
  
  // Image optimization
  maxConcurrent: 4,
};
```

---

## 11. Third-Party API Integrations

### 11.1 Social Media Deep Linking

```typescript
// Deep Link Handler Service
class SocialMediaLinkService {
  // Platform detection and linking
  async openSocialLink(platform: Platform, contentId: string): Promise<void> {
    const url = this.buildDeepLink(platform, contentId);
    const canOpen = await Linking.canOpenURL(url);
    
    if (canOpen) {
      await Linking.openURL(url);
    } else {
      // Fallback to web
      await Linking.openURL(this.getWebUrl(platform, contentId));
    }
  }
  
  buildDeepLink(platform: Platform, contentId: string): string {
    const schemes = {
      instagram: `instagram://`,
      tiktok: `tiktok://`,
      twitter: `twitter://`,
      facebook: `fb://`,
    };
    
    return schemes[platform];
  }
  
  getWebUrl(platform: Platform, contentId: string): string {
    const urls = {
      instagram: `https://instagram.com/p/${contentId}`,
      tiktok: `https://www.tiktok.com/@${contentId}`,
      twitter: `https://twitter.com/i/status/${contentId}`,
      facebook: `https://facebook.com/${contentId}`,
    };
    
    return urls[platform];
  }
}

// URL Preview Generator
class PreviewGenerator {
  async generatePreview(url: string): Promise<SocialPreview> {
    // Use a metadata extraction service
    const metadata = await this.fetchMetadata(url);
    
    return {
      title: metadata.ogTitle,
      description: metadata.ogDescription,
      image: metadata.ogImage,
      platform: this.detectPlatform(url),
    };
  }
}
```

### 11.2 Required API Keys & Services

| Service | Purpose | Integration |
|---------|---------|-------------|
| Firebase | Push notifications, analytics | FCM for APNs/APNs |
| SendGrid | Email notifications | Transactional emails |
| Cloudflare | CDN, DDoS protection | DNS, caching |
| OpenGraph.io | Social preview metadata | URL preview extraction |
| Sentry | Error tracking | Performance monitoring |
| Mixpanel | Analytics | User behavior tracking |

### 11.3 Push Notification Architecture

```typescript
// Push Notification Types
const notificationTypes = {
  // Real-time notifications
  like: {
    title: 'Someone liked your post',
    body: '{{user}} liked "{{blogTitle}}"',
    data: { type: 'like', blogId: '{{blogId}}' },
  },
  comment: {
    title: 'New comment on your post',
    body: '{{user}} commented: "{{preview}}"',
    data: { type: 'comment', blogId: '{{blogId}}', commentId: '{{commentId}}' },
  },
  reply: {
    title: 'New reply to your comment',
    body: '{{user}} replied to your comment',
    data: { type: 'reply', commentId: '{{commentId}}' },
  },
  story: {
    title: 'New story from {{user}}',
    body: 'Tap to view',
    data: { type: 'story', storyId: '{{storyId}}' },
  },
  system: {
    title: 'GR8 News',
    body: '{{message}}',
    data: { type: 'system' },
  },
};

// Push Setup
const setupPushNotifications = async () => {
  // Request permission
  const { status } = await Notifications.requestPermissionsAsync();
  
  if (status === 'granted') {
    // Get push token
    const token = await Notifications.getDevicePushTokenAsync();
    
    // Send to backend
    await api.registerPushToken(token);
    
    // Set up notification handlers
    Notifications.addNotificationReceivedListener(handleNotification);
    Notifications.addNotificationResponseReceivedListener(handleResponse);
  }
};
```

---

## 12. Security Considerations

### 12.1 Authentication & Authorization

```typescript
// JWT Token Structure
interface JWTPayload {
  userId: string;
  email: string;
  role: 'user' | 'author' | 'moderator' | 'admin';
  iat: number;
  exp: number;
}

// Auth Flow
const authFlow = {
  // Access token: 15 minutes
  accessTokenExpiry: 15 * 60,
  
  // Refresh token: 7 days
  refreshTokenExpiry: 7 * 24 * 60 * 60,
  
  // Token refresh threshold: 5 minutes before expiry
  refreshThreshold: 5 * 60,
};

// Role-Based Access Control
const rbac = {
  user: ['read', 'comment', 'like', 'bookmark', 'share', 'create_draft'],
  author: ['user permissions', 'create', 'edit_own', 'delete_own', 'create_story'],
  moderator: ['author permissions', 'moderate', 'view_queue', 'approve', 'reject'],
  admin: ['all permissions', 'manage_users', 'manage_categories', 'view_analytics'],
};
```

### 12.2 API Security

```typescript
// Security Headers
const securityHeaders = {
  'Content-Security-Policy': "default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; connect-src 'self' https: wss:;",
  'X-Frame-Options': 'DENY',
  'X-Content-Type-Options': 'nosniff',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'Strict-Transport-Security': 'max-age=31536000; includeSubDomains',
};

// Rate Limiting
const rateLimits = {
  global: { windowMs: 60000, max: 100 },
  auth: { windowMs: 15 * 60 * 1000, max: 5 },
  api: { windowMs: 60 * 1000, max: 60 },
  comments: { windowMs: 60 * 1000, max: 10 },
};
```

### 12.3 Data Protection

```typescript
// Sensitive Data Handling
const dataProtection = {
  // Encrypt sensitive fields
  encryptFields: ['phone', 'address', 'nationalId'],
  
  // Hash identifiers
  hashIdentifiers: ['email'],
  
  // PII handling
  piiFields: ['name', 'email', 'phone', 'bio'],
  
  // GDPR compliance
  gdpr: {
    dataPortability: true,
    rightToErasure: true,
    consentManagement: true,
  },
};
```

---

## 13. Analytics & Monitoring

### 13.1 Event Tracking

```typescript
// Analytics Events
const analyticsEvents = {
  // User Events
  user: {
    signUp: { method: 'email' | 'social' },
    login: { method: 'email' | 'social' },
    logout: {},
  },
  
  // Content Events
  content: {
    blogView: { blogId, category, authorId },
    blogRead: { blogId, duration, progress },
    storyView: { storyId, cardsViewed },
    socialLinkClick: { platform, blogId },
  },
  
  // Engagement Events
  engagement: {
    like: { contentType, contentId },
    bookmark: { contentType, contentId },
    share: { platform, contentType, contentId },
    comment: { contentType, contentId },
  },
  
  // Error Events
  errors: {
    apiError: { endpoint, statusCode },
    renderError: { component, error },
  },
};
```

### 13.2 Performance Monitoring

```typescript
// Performance Metrics
const performanceMetrics = {
  // Core Web Vitals
  webVitals: {
    FCP: 'first-contentful-paint',
    LCP: 'largest-contentful-paint',
    FID: 'first-input-delay',
    CLS: 'cumulative-layout-shift',
    TTFB: 'time-to-first-byte',
  },
  
  // Custom metrics
  custom: {
    feedLoadTime: 'time to load home feed',
    blogLoadTime: 'time to load blog content',
    imageLoadTime: 'time to load images',
    apiResponseTime: 'API response times',
  },
};
```

---

## 14. Implementation Roadmap

### Phase 1: Core Infrastructure (Weeks 1-4)
- [ ] Set up Next.js project with TypeScript
- [ ] Configure Supabase database and authentication
- [ ] Implement basic blog CRUD operations
- [ ] Build authentication flow
- [ ] Set up API routes

### Phase 2: UI/UX Foundation (Weeks 5-8)
- [ ] Implement design system
- [ ] Build navigation structure
- [ ] Create core UI components
- [ ] Implement home feed
- [ ] Build blog reader

### Phase 3: Engagement Features (Weeks 9-12)
- [ ] Implement likes, comments, shares
- [ ] Add bookmarking system
- [ ] Build reading progress tracking
- [ ] Implement notifications

### Phase 4: Stories & Real-time (Weeks 13-16)
- [ ] Build Stories feature
- [ ] Implement WebSocket server
- [ ] Add real-time comments
- [ ] Implement interactive polls

### Phase 5: Social Integration (Weeks 17-20)
- [ ] Implement deep linking to social platforms
- [ ] Build social preview cards
- [ ] Add share functionality
- [ ] Implement social login

### Phase 6: Offline & Performance (Weeks 21-24)
- [ ] Implement offline caching
- [ ] Add background sync
- [ ] Optimize performance
- [ ] Complete testing

### Phase 7: Moderation & Security (Weeks 25-28)
- [ ] Build moderation dashboard
- [ ] Implement auto-moderation
- [ ] Add user reporting
- [ ] Security audit

### Phase 8: Launch Preparation (Weeks 29-32)
- [ ] Mobile app builds (iOS/Android)
- [ ] PWA optimization
- [ ] App store submission
- [ ] Documentation

---

## 15. Conclusion

This architecture provides a comprehensive blueprint for building **GR8 News Hub** - a modern, mobile-first news aggregation platform. The hybrid content model, combining internally hosted blogs with external social media deep links, creates a unique user experience that keeps engagement within the app while seamlessly connecting to broader social media ecosystems.

Key architectural decisions include:
- **Scalable Backend**: Microservices-ready architecture with Supabase and Redis
- **Real-time First**: WebSocket infrastructure for live engagement
- **Offline Capable**: Progressive enhancement with robust caching
- **Moderation Built-in**: Multi-layer content moderation framework
- **Performance Optimized**: Modern image loading, virtualized lists, and CDN integration

The modular design ensures future scalability and makes it straightforward to add new features, integrate additional social platforms, or expand to new content types as the platform evolves.
