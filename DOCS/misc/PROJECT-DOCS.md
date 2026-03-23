# Budget Ndio Story - Technical Documentation

## Table of Contents

1. [Project Overview](#project-overview)
2. [Technology Stack](#technology-stack)
3. [Architecture](#architecture)
4. [Frontend Pages & Routes](#frontend-pages--routes)
5. [API Routes & Endpoints](#api-routes--endpoints)
6. [Components](#components)
7. [Authentication & Security](#authentication--security)
8. [Data Models & Types](#data-models--types)
9. [Environment Configuration](#environment-configuration)
10. [Deployment](#deployment)
11. [Scripts & Automation](#scripts--automation)

---

## Project Overview

**Budget Ndio Story** is a Kenyan budget transparency platform designed to help young citizens understand and track national and county budgets. The platform transforms complex budget data into clear insights, practical analysis, and trackable evidence to enhance youth participation and government accountability.

### Key Features

- 📊 Budget tracking (national and 47 county governments)
- 📰 News and blog content management
- 📚 Educational learning modules
- 💬 Interactive chatbot support
- 📧 Newsletter subscription system
- 🔐 User authentication and profiles
- 📈 Analytics and engagement tracking

---

## Technology Stack

### Frontend

| Technology | Version | Purpose |
|------------|---------|---------|
| [Next.js](https://nextjs.org) | latest | React framework with App Router |
| [React](https://react.dev) | 19.x | UI library |
| [Tailwind CSS](https://tailwindcss.com) | 3.4.x | Styling framework |
| [shadcn/ui](https://ui.shadcn.com) | latest | Component library (Radix UI) |
| [Framer Motion](https://www.framer.com/motion/) | 12.x | Animations |
| [Recharts](https://recharts.org) | 3.x | Charts and data visualization |
| [Lucide React](https://lucide.dev) | latest | Icons |

### Backend (External)

| Technology | Purpose |
|------------|---------|
| [Django REST Framework](https://www.django-rest-framework.org) | Backend API (port 8000) |
| [Supabase](https://supabase.com) | Authentication provider |
| [PostgreSQL](https://postgresql.org) | Database |

### Development Tools

| Tool | Purpose |
|------|---------|
| [TypeScript](https://typescriptlang.org) | Type safety |
| [ESLint](https://eslint.org) | Code linting |
| [tsx](https://github.com/privatenumber/tsx) | TypeScript execution |
| [Node.js](https://nodejs.org) | 24.13.0+ required |

---

## Architecture

### System Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                        Frontend (Next.js)                       │
│                         Port: 3000                               │
├─────────────────────────────────────────────────────────────────┤
│  API Routes (Next.js)     │   Pages (App Router)                │
│  ├─ /api/auth/*           │   ├─ / (home)                       │
│  ├─ /api/blogs/*          │   ├─ /news/*                        │
│  ├─ /api/news/*           │   ├─ /blogs/*                       │
│  ├─ /api/chatbot/*        │   ├─ /learn/*                       │
│  └─ /api/newsletter/*     │   ├─ /admin/*                       │
│                           │   └─ /auth/*                        │
├───────────────────────────┴─────────────────────────────────────┤
│                    Proxy to Django Backend                       │
│                 (NEXT_PUBLIC_API_URL: port 8000)                 │
├─────────────────────────────────────────────────────────────────┤
│                      Backend (Django REST)                       │
│                         Port: 8000                               │
│  ├─ /api/v1/content/* (blogs, news, videos, categories)        │
│  ├─ /api/v1/accounts/* (users, profiles)                       │
│  ├─ /api/v1/newsletter/* (subscribers)                         │
│  ├─ /api/v1/sponsors/* (donations)                              │
│  ├─ /api/v1/analytics/* (pageviews, engagement)               │
│  └─ /api/auth/* (login, logout, CSRF)                           │
└─────────────────────────────────────────────────────────────────┘
```

### Project Structure

```
/home/gunzo/Desktop/GR8/bns
├── app/                          # Next.js App Router pages
│   ├── layout.tsx               # Root layout with providers
│   ├── page.tsx                 # Redirect to /home
│   ├── api/                     # API route handlers (proxies)
│   │   ├── auth/                # Authentication endpoints
│   │   ├── blogs/               # Blog proxy
│   │   ├── news/                # News proxy
│   │   ├── chatbot/             # AI chatbot (built-in)
│   │   └── newsletter/          # Newsletter subscriptions
│   ├── admin/                   # Admin dashboard pages
│   ├── auth/                    # Authentication pages
│   ├── home/                    # Home page
│   ├── news/                    # News listing & details
│   ├── blogs/                   # Blog listing & details
│   ├── learn/                   # Educational modules
│   └── [other pages]            # Reports, tracker, etc.
├── components/                  # React components
│   ├── ui/                      # shadcn/ui components
│   ├── blog-hub.tsx             # Blog listing component
│   ├── news-hub.tsx            # News listing component
│   ├── navbar.tsx              # Navigation component
│   ├── chatbot/                 # Chat widget components
│   └── [other components]       # Various UI components
├── lib/                         # Utility libraries
│   ├── api.ts                  # API client (Django backend)
│   ├── supabase/               # Supabase utilities
│   └── [other utilities]       # Auth, analytics, email
├── hooks/                       # React hooks
│   ├── useAuth.tsx             # Authentication hook
│   └── useConsent.tsx          # Cookie consent hook
├── types/                       # TypeScript definitions
│   └── api.ts                  # API data types
├── public/                     # Static assets
├── server.js                   # Production server entry
├── next.config.ts              # Next.js configuration
├── tailwind.config.ts          # Tailwind configuration
└── package.json                # Dependencies
```

---

## Frontend Pages & Routes

### Public Pages

| Route | File | Description |
|-------|------|-------------|
| `/` | [`app/home/page.tsx`](app/home/page.tsx) | Home/Landing page |
| `/news` | [`app/news/page.tsx`](app/news/page.tsx) | News listing |
| `/news/[id]` | [`app/news/[id]/page.tsx`](app/news/[id]/page.tsx) | Single news article |
| `/blogs` | [`app/blogs/page.tsx`](app/blogs/page.tsx) | Blog posts listing |
| `/blogs/[id]` | [`app/blogs/[id]/page.tsx`](app/blogs/[id]/page.tsx) | Single blog post |
| `/learn` | [`app/learn/page.tsx`](app/learn/page.tsx) | Learning hub |
| `/learn/module-one` | [`app/learn/module-one/page.tsx`](app/learn/module-one/page.tsx) | Module one content |
| `/reports` | [`app/reports/page.tsx`](app/reports/page.tsx) | Budget reports |
| `/tracker` | [`app/tracker/page.tsx`](app/tracker/page.tsx) | Budget tracker |
| `/insights` | [`app/insights/page.tsx`](app/insights/page.tsx) | Budget insights |
| `/take-action` | [`app/take-action/page.tsx`](app/take-action/page.tsx) | Action center |
| `/subscribe` | [`app/subscribe/page.tsx`](app/subscribe/page.tsx) | Newsletter subscription |
| `/about` | [`app/about/page.tsx`](app/about/page.tsx) | About page |
| `/organization` | [`app/organization/page.tsx`](app/organization/page.tsx) | Organization info |
| `/partners` | [`app/partners/page.tsx`](app/partners/page.tsx) | Partners page |
| `/advertisements` | [`app/advertisements/page.tsx`](app/advertisements/page.tsx) | Advertisements |
| `/profile` | [`app/profile/page.tsx`](app/profile/page.tsx) | User profile |
| `/cookies` | [`app/cookies/page.tsx`](app/cookies/page.tsx) | Cookie policy |
| `/media-hub` | [`app/media-hub/page.tsx`](app/media-hub/page.tsx) | Media content hub |
| `/design` | [`app/design/page.tsx`](app/design/page.tsx) | Design showcase |
| `/tiktok` | [`app/tiktok/page.tsx`](app/tiktok/page.tsx) | TikTok content |
| `/twitter` | [`app/twitter/page.tsx`](app/twitter/page.tsx) | Twitter feed |

### Authentication Pages

| Route | File | Description |
|-------|------|-------------|
| `/auth/login` | [`app/auth/login/page.tsx`](app/auth/login/page.tsx) | Login form |
| `/auth/sign-up` | [`app/auth/sign-up/page.tsx`](app/auth/sign-up/page.tsx) | Registration form |
| `/auth/sign-up-success` | [`app/auth/sign-up-success/page.tsx`](app/auth/sign-up-success/page.tsx) | Registration success |
| `/auth/forgot-password` | [`app/auth/forgot-password/page.tsx`](app/auth/forgot-password/page.tsx) | Password reset request |
| `/auth/update-password` | [`app/auth/update-password/page.tsx`](app/auth/update-password/page.tsx) | Password update |
| `/auth/error` | [`app/auth/error/page.tsx`](app/auth/error/page.tsx) | Auth error page |
| `/auth/confirm` | [`app/auth/confirm/route.ts`](app/auth/confirm/route.ts) | Email confirmation |
| `/auth/signout` | [`app/auth/signout/route.ts`](app/auth/signout/route.ts) | Sign out handler |

### Admin Pages

| Route | File | Description |
|-------|------|-------------|
| `/admin` | [`app/admin/page.tsx`](app/admin/page.tsx) | Admin dashboard |
| `/admin/news` | [`app/admin/news/page.tsx`](app/admin/news/page.tsx) | News management |
| `/admin/blog` | [`app/admin/blog/page.tsx`](app/admin/blog/page.tsx) | Blog management |
| `/admin/categories` | [`app/admin/categories/page.tsx`](app/admin/categories/page.tsx) | Category management |
| `/admin/organization` | [`app/admin/organization/page.tsx`](app/admin/organization/page.tsx) | Organization management |

---

## API Routes & Endpoints

### Next.js API Routes (Proxies)

All routes proxy to the Django backend at `NEXT_PUBLIC_API_URL`.

| Endpoint | File | Backend Target |
|----------|------|----------------|
| `GET /api/auth/me` | [`app/api/auth/me/route.ts`](app/api/auth/me/route.ts) | `/api/v1/accounts/users/me/` |
| `POST /api/auth/welcome` | [`app/api/auth/welcome/route.ts`](app/api/auth/welcome/route.ts) | Welcome endpoint |
| `GET /api/blogs` | [`app/api/blogs/route.ts`](app/api/blogs/route.ts) | `/api/v1/content/posts/` |
| `GET /api/news` | [`app/api/news/route.ts`](app/api/news/route.ts) | `/api/v1/content/news/` |
| `GET /api/categories` | [`app/api/categories/route.ts`](app/api/categories/route.ts) | `/api/v1/content/categories/` |
| `GET /api/newsletter` | [`app/api/newsletter/route.ts`](app/api/newsletter/route.ts) | Newsletter subscription |
| `POST /api/chatbot` | [`app/api/chatbot/route.ts`](app/api/chatbot/route.ts) | Built-in AI support |
| `GET /api/comments` | [`app/api/comments/route.ts`](app/api/comments/route.ts) | Comments management |
| `GET /api/profile` | [`app/api/profile/route.ts`](app/api/profile/route.ts) | User profile |
| `GET /api/organization` | [`app/api/organization/route.ts`](app/api/organization/route.ts) | Organization data |
| `GET /api/consent` | [`app/api/consent/route.ts`](app/api/consent/route.ts) | Cookie consent |
| `POST /api/seed/*` | [`app/api/seed/route.ts`](app/api/seed/route.ts) | Database seeding |

### Chat API

| Endpoint | File | Description |
|----------|------|-------------|
| `GET /api/chat/active` | [`app/api/chat/active/route.ts`](app/api/chat/active/route.ts) | Active chats |
| `GET /api/chat/active-users` | [`app/api/chat/active-users/route.ts`](app/api/chat/active-users/route.ts) | Active users |
| `GET /api/chat/inactive` | [`app/api/chat/inactive/route.ts`](app/api/chat/inactive/route.ts) | Inactive chats |
| `GET /api/chat/messages` | [`app/api/chat/messages/route.ts`](app/api/chat/messages/route.ts) | Chat messages |

### Django Backend Endpoints (Reference)

#### Authentication
- `POST /api/auth/login/` - Login with credentials
- `POST /api/auth/logout/` - Logout
- `POST /api/auth/refresh/` - Refresh session
- `GET /api/csrf/` - Get CSRF token

#### Content
- `GET /api/v1/content/posts/` - List blog posts
- `GET /api/v1/content/posts/{slug}/` - Get single post
- `GET /api/v1/content/news/` - List news
- `GET /api/v1/content/categories/` - List categories
- `GET /api/v1/content/videos/` - List videos

#### Users
- `GET /api/v1/accounts/users/` - List users
- `GET /api/v1/accounts/users/me/` - Current user
- `POST /api/v1/accounts/users/` - Create user

#### Newsletter
- `POST /api/v1/newsletter/subscribers/` - Subscribe

#### Analytics
- `POST /api/v1/analytics/pageviews/` - Record page view
- `POST /api/v1/analytics/engagement/` - Record engagement

---

## Components

### Core Components

| Component | File | Description |
|-----------|------|-------------|
| Navbar | [`components/navbar.tsx`](components/navbar.tsx) | Main navigation |
| Footer | [`components/footer.tsx`](components/footer.tsx) | Site footer |
| BlogHub | [`components/blog-hub.tsx`](components/blog-hub.tsx) | Blog listing grid |
| BlogPostView | [`components/blog-post-view.tsx`](components/blog-post-view.tsx) | Single post display |
| NewsHub | [`components/news-hub.tsx`](components/news-hub.tsx) | News listing grid |
| NewsArticleView | [`components/news-article-view.tsx`](components/news-article-view.tsx) | Single news display |
| LoginForm | [`components/login-form.tsx`](components/login-form.tsx) | Login form |
| SignUpForm | [`components/sign-up-form.tsx`](components/sign-up-form.tsx) | Registration form |
| ForgotPasswordForm | [`components/forgot-password-form.tsx`](components/forgot-password-form.tsx) | Password reset |
| CookieConsent | [`components/cookie-consent.tsx`](components/cookie-consent.tsx) | Cookie banner |
| GlobalEmailPopup | [`components/global-email-popup.tsx`](components/global-email-popup.tsx) | Email capture modal |
| ChatWidget | [`components/chatbot/chat-widget.tsx`](components/chatbot/chat-widget.tsx) | AI support chat |
| NewsletterForm | [`components/newsletter-form.tsx`](components/newsletter-form.tsx) | Subscription form |
| DonateForm | [`components/donate-form.tsx`](components/donate-form.tsx) | Donation form |
| ThemeSwitcher | [`components/theme-switcher.tsx`](components/theme-switcher.tsx) | Dark/light mode |

### shadcn/ui Components

Located in `components/ui/`:

- Button
- Card
- Input
- Label
- Select
- Dialog
- Dropdown Menu
- Tabs
- Checkbox

### Component Directories

```
components/
├── animations/          # Animation utilities
├── chatbot/           # Chat widget components
├── comments/          # Comment system
├── feedback/          # User feedback
├── learn/             # Learning components
├── loading/           # Loading states
├── scroll/            # Smooth scrolling
├── shadcn-space/      # Pre-built blocks
├── tutorial/          # Tutorial components
└── ui/                # shadcn/ui components
```

---

## Authentication & Security

### Authentication Flow

1. **Session-Based Auth**: Uses Django session authentication (NOT JWT)
2. **CSRF Protection**: Required for all mutating requests
3. **Cookie-Based**: Session cookies with `credentials: 'include'`

### Auth Implementation

```typescript
// hooks/useAuth.tsx - React Context for auth state
- AuthProvider wrapper in layout.tsx
- useAuth() hook for accessing user state
- login/logout functions via API
```

### Protected Routes

Routes that hide navbar/footer:
- `/admin/*`
- `/dashboard-shell-01/*`
- `/protected/*`

### Security Headers

Set in `server.js`:
- `X-Content-Type-Options: nosniff`
- `X-Frame-Options: SAMEORIGIN`
- `X-XSS-Protection: 1; mode=block`

---

## Data Models & Types

### TypeScript Interfaces

```typescript
// types/api.ts

interface User {
  id: number;
  username: string;
  email: string;
  first_name: string;
  last_name: string;
}

interface Category {
  id: number;
  name: string;
  slug: string;
  description: string;
  color: string;
  icon: string;
}

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  content_html: string;
  post_type: 'investigation' | 'explainer' | 'update' | 'field_report' | 'opinion' | 'sponsored';
  categories: Category[];
  tags: string[];
  featured_image: string;
  author: User;
  status: 'draft' | 'review' | 'published' | 'archived';
  published_at: string;
  view_count: number;
  read_time_minutes: number;
}

interface VideoContent {
  id: string;
  title: string;
  platform: 'tiktok' | 'youtube' | 'x' | 'facebook' | 'instagram';
  external_id: string;
  external_url: string;
  embed_url: string;
  thumbnail_url: string;
  duration_seconds: number;
  view_count: number;
  is_featured: boolean;
}

interface Subscriber {
  id: number;
  email: string;
  subscribed_at: string;
  is_active: boolean;
}

interface Donation {
  id: number;
  amount: number;
  currency: string;
  donor_name: string;
  donor_email: string;
  status: 'pending' | 'completed' | 'failed';
}
```

---

## Environment Configuration

### Required Variables

```env
# Supabase (REQUIRED)
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here

# Application
NEXT_PUBLIC_APP_URL=https://yourdomain.com
NEXT_PUBLIC_API_URL=http://localhost:8000
```

### Optional Variables

```env
# Email (SMTP or Resend)
SMTP_HOST=smtp.example.com
SMTP_PORT=465
SMTP_USER=user@example.com
SMTP_PASS=password
RESEND_API_KEY=re_xxxx

# Analytics
NEXT_PUBLIC_GOOGLE_ANALYTICS_ID=G-XXXXXXXXXX
NEXT_PUBLIC_FACEBOOK_PIXEL_ID=1234567890

# Marketing
NEXT_PUBLIC_HOTJAR_ID=XXXXXX
NEXT_PUBLIC_MARKETING_ENABLED=true
NEXT_PUBLIC_COOKIE_CONSENT_MODE=banner
```

### Environment File Locations

- `.env` - Local development (not committed)
- `.env.example` - Template for environment variables

---

## Deployment

### Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Run with custom port
PORT=3001 npm run dev
```

### Production Build

```bash
# Build for production
npm run build

# Build with local assets
npm run build:local
```

### Production Server

```bash
# Start production server
npm run start

# Or use standalone mode
npm run start:standalone
```

### cPanel Deployment

The app uses Next.js standalone output for cPanel deployment:

1. Run `npm run build:local`
2. Files are output to `.next/standalone/`
3. Copy contents to cPanel public_html
4. Configure environment variables in cPanel

### Server.js Entry Point

Production server is handled by [`server.js`](server.js):
- Custom HTTP server with Next.js
- Security headers applied
- Graceful shutdown handling
- Environment validation

---

## Scripts & Automation

### NPM Scripts

```json
// package.json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "build:local": "npm run build && npm run copy-assets",
    "start": "NODE_ENV=production node server.js",
    "start:standalone": "NODE_ENV=production node .next/standalone/server.js",
    "lint": "eslint .",
    "seed": "npx tsx scripts/seed-blogs.ts",
    "copy-assets": "node scripts/copy-assets.js",
    "deploy:prep": "node scripts/deploy-prep.js",
    "deploy:full": "npm run build:local && npm run deploy:prep"
  }
}
```

### Key Scripts

| Script | Purpose |
|--------|---------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run start` | Run production server |
| `npm run lint` | Run ESLint |
| `npm run seed` | Seed database with sample data |
| `npm run deploy:full` | Full deployment preparation |

---

## Additional Documentation

- [API Documentation](API_DOCS.md) - Detailed API endpoints
- [Architecture](architecture.md) - Content and design breakdown
- [Brand Guidelines](BRAND.md) - Brand assets and guidelines
- [Design Tokens](designtokens.md) - Design system tokens
- [Deployment Guide](DEPLOY-README.md) - Deployment instructions

---

*Last Updated: March 2026*