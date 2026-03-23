# BUDGET NDIO STORY - LEARNING HUB, BLOGS & NEWSLETTER PRD

## Version 1.0 | February 2026

---

## 1. EXECUTIVE SUMMARY

### 1.1 Product Overview

**Product Name:** Budget Ndio Story - Learning Hub  
**Product Type:** Civic Education Content Platform (Web)  
**Platform:** Web Application (Responsive - Mobile, Tablet, Desktop)  
**Core Summary:** A social media-driven learning platform that leverages video content from TikTok, YouTube, and X (Twitter) as the primary learning mechanism, complemented by written blog content and a newsletter delivery system.

### 1.2 Strategic Rationale

Budget Ndio Story recognizes that the majority of our target audience (Kenyan youth aged 18-35) consumes content primarily through social media platforms. By positioning social media videos as the core of our learning hub, we can:

- Meet users where they already spend time (TikTok, YouTube, X)
- Leverage short-form video for complex budget concepts
- Build audience across multiple platforms
- Create cross-promotional opportunities
- Maximize reach and engagement

### 1.3 Key Pillars

| Pillar | Description | Priority |
|--------|-------------|----------|
| **Learning Hub** | Central hub for social media video content (TikTok, YouTube, X) | Critical |
| **Blogs** | Long-form written content for in-depth analysis | Critical |
| **Newsletter** | Email subscription for content delivery and engagement | Critical |

---

## 2. STAKEHOLDER REQUIREMENTS

### 2.1 Client Information

**Client:** Budget Ndio Story Consortium  
**Consortium Partners:**
- The Continental Pot (Lead)
- Colour Twist Media
- Sen Media & Events

### 2.2 Priority Requirements

#### 2.2.1 Learning Hub Requirements

| Requirement ID | Requirement | Priority | Description |
|---------------|-------------|----------|-------------|
| LH-001 | Central Media Hub Page | Critical | Unified page displaying all video content from social platforms |
| LH-002 | Platform Tabs | Critical | Tabbed interface for TikTok, YouTube, X content |
| LH-003 | Video Embedding | Critical | Embedded video players for each platform |
| LH-004 | Content Categorization | Critical | Videos organized by topic (Budget Basics, Finance Bill, County, Sector) |
| LH-005 | Playlist/Curated Collections | High | Curated video playlists for learning paths |
| LH-006 | Social Platform Links | Critical | Direct links to follow on each platform |
| LH-007 | Video Performance Metrics | Medium | Display engagement metrics (views, likes, shares) |
| LH-008 | Related Content Recommendations | Medium | Recommend related blogs/articles based on video topic |
| LH-009 | Newsletter Signup Integration | Critical | Prominent newsletter signup within media hub |
| LH-010 | Mobile-Optimized Video Experience | Critical | Responsive video players optimized for mobile |

#### 2.2.2 Blog Requirements

| Requirement ID | Requirement | Priority | Description |
|---------------|-------------|----------|-------------|
| BLOG-001 | Blog Listing Page | Critical | Grid/list view of all blog posts |
| BLOG-002 | Blog Content Display | Critical | Full article view with rich formatting |
| BLOG-003 | Category Filtering | Critical | Filter by category (Investigation, Explainer, County, Sector, Youth Voice) |
| BLOG-004 | Author Attribution | High | Display author information and profile |
| BLOG-005 | Reading Time Estimation | High | Show estimated reading time |
| BLOG-006 | Related Posts | Medium | Recommend related articles |
| BLOG-007 | Social Sharing | High | Share buttons for each article |
| BLOG-008 | Comments/Discussion | Medium | Reader comments and engagement |
| BLOG-009 | Newsletter Signup CTA | Critical | Newsletter signup within blog posts |
| BLOG-010 | Search Functionality | High | Search across all blog content |
| BLOG-011 | Featured/Recent Posts | Critical | Highlight featured and recent content |
| BLOG-012 | SEO Optimization | High | Meta tags, Open Graph, structured data |

#### 2.2.3 Newsletter Requirements

| Requirement ID | Requirement | Priority | Description |
|---------------|-------------|----------|-------------|
| NEWS-001 | Subscription Form | Critical | Email signup form with validation |
| NEWS-002 | Preference Management | Critical | User preferences for content types |
| NEWS-003 | Double Opt-in | Critical | Confirmation email for subscription |
| NEWS-004 | Welcome Series | High | Automated welcome email sequence |
| NEWS-005 | Content Types | Critical | Options: All Content, Videos Only, Blogs Only, Weekly Digest |
| NEWS-006 | Unsubscribe Functionality | Critical | One-click unsubscribe |
| NEWS-007 | Subscriber Analytics | High | Track open rates, click rates |
| NEWS-008 | Popup Subscription | High | Timed popup on media hub |
| NEWS-009 | Inline Subscription | Critical | Subscription forms within content |
| NEWS-010 | Footer Subscription | Critical | Always-visible footer signup |
| NEWS-011 | Segment-Based Sending | Medium | Targeted emails based on interests |
| NEWS-012 | Archive Page | Medium | Web view of past newsletters |

---

## 3. USER PERSONAS

### 3.1 Primary Persona: Social Media-First Learner

**Name:** Amina Ochieng  
**Age:** 22  
**Occupation:** University student (Business Administration)  
**Location:** Nairobi  
**Tech Proficiency:** High - Mobile-first, TikTok/YouTube dominant

**Goals:**
- Learn about Kenya's budget through short, engaging videos
- Get quick explanations during commute or break time
- Share educational content with peers
- Stay updated without visiting multiple sites

**Pain Points:**
- Long articles are time-consuming
- Budget jargon is confusing
- Need content in digestible formats
- Prefer watching over reading

**User Journey:**
1. Discovers TikTok/YouTube video from Budget Ndio Story
2. Visits Media Hub to see more videos
3. Reads related blog for deeper understanding
4. Subscribes to newsletter for updates
5. Shares content on personal social media

### 3.2 Secondary Persona: Newsletter Subscriber

**Name:** Joseph Kamau  
**Age:** 29  
**Occupation:** NGO Program Officer  
**Location:** Kisumu  
**Tech Proficiency:** Medium - Email-heavy user

**Goals:**
- Receive curated budget updates weekly
- Access in-depth analysis when time permits
- Forward valuable content to colleagues
- Stay informed on specific topics

**Pain Points:**
- Information overload
- Need content curated by experts
- Limited time for research
- Want reliable, verified sources

**User Journey:**
1. Subscribes via website footer
2. Receives weekly newsletter
3. Clicks interesting articles
4. Reads full blog posts
5. Explores media hub for videos

### 3.3 Tertiary Persona: Content Consumer

**Name:** Sarah Wanjiku  
**Age:** 26  
**Occupation:** Freelance Writer  
**Location:** Mombasa  
**Tech Proficiency:** High - Multi-platform

**Goals:**
- Find accurate background information
- Get story ideas from budget data
- Verify facts for articles
- Access source-linked content

**Pain Points:**
- Need quick fact-checking
- Require visual content for stories
- Want expert analysis
- Need content for multiple formats

---

## 4. FEATURE SPECIFICATIONS

### 4.1 Learning Hub (Media Hub)

#### 4.1.1 Page Structure

```
/media-hub/
├── Hero Section
│   - Headline: "Media Hub"
│   - Subhead: Social platform value proposition
│   - Social follow buttons (TikTok, YouTube, X)
│   - Newsletter signup CTA
│
├── Platform Tabs
│   - [TikTok] [YouTube] [X/Twitter] [All]
│   - Active tab shows corresponding content
│
├── Video Grid
│   - Thumbnail previews
│   - Title
│   - Duration/Metrics
│   - Category tag
│   - Click to play
│
├── Category Filters
│   - Budget Basics
│   - Finance Bill
│   - National Budget
│   - County Budget
│   - Sector Deep Dives
│   - Tracker Stories
│
├── Featured Playlist Section
│   - Curated collections
│   - "Start Here" for beginners
│   - Topic-specific playlists
│
└── Newsletter CTA Section
    - "Get videos delivered to your inbox"
```

#### 4.1.2 Platform Integrations

| Platform | Integration Type | Features |
|----------|----------------|----------|
| TikTok | Embedded Player | Video playback, profile link |
| YouTube | Embedded Player | Video playback, playlist sync |
| X (Twitter) | Timeline Widget | Tweet feed, thread display |

#### 4.1.3 Content Categories

| Category | Description | Example Videos |
|----------|-------------|----------------|
| Budget Basics | Introduction to budget concepts | "What is a Budget?" |
| Finance Bill | Current Finance Bill explained | "Understanding the Finance Bill 2025" |
| National Budget | National budget analysis | "Breaking Down the 2024/25 Budget" |
| County Budget | County-level content | "How Nairobi Spends Your Taxes" |
| Sector Deep Dives | Specific sector analysis | "Education Budget Explained" |
| Tracker Stories | Project tracking updates | "Youth Fund: Where is the Money?" |
| Youth Voices | Youth perspectives | "Young Kenyans Demand Accountability" |

### 4.2 Blog System

#### 4.2.1 Content Types

| Type | Description | Best For |
|------|-------------|----------|
| Investigation | Deep-dive analysis | Data-heavy stories |
| Explainer | Concept explanation | Budget education |
| Update | Timely news | Budget process updates |
| Field Report | On-ground observations | Community impact stories |
| Opinion | Perspective pieces | Youth voices |

#### 4.2.2 Blog Page Structure

```
/news/
├── Featured Story (Hero)
│   - Large image
│   - Category badge
│   - Title
│   - Excerpt
│   - Author & date
│
├── Tab Navigation
│   - [Stories] [Videos] [Updates]
│
├── Filter Bar
│   - Category filter
│   - Date filter
│   - Search
│
├── Story Grid
│   - Card layout
│   - Thumbnail
│   - Category
│   - Title
│   - Excerpt
│   - Date & reading time
│
└── Sidebar
    - Newsletter signup
    - Popular posts
    - Categories
```

#### 4.2.3 Individual Post Structure

```
/news/[slug]/
├── Article Header
│   - Category badge
│   - Title
│   - Author info
│   - Published date
│   - Reading time
│   - Share buttons
│
├── Featured Image
│
├── Article Content
│   - Rich text formatting
│   - Embedded videos
│   - Data visualizations
│   - Pull quotes
│   - Source citations
│
├── Newsletter CTA Banner
│
├── Related Posts
│
├── Comments Section
│
└── Author Bio
```

### 4.3 Newsletter System

#### 4.3.1 Subscription Types

| Type | Frequency | Content |
|------|-----------|---------|
| Daily Digest | Daily | Breaking news, urgent updates |
| Weekly Digest | Weekly | Top stories, videos, tracker updates |
| Video Only | As posted | New video content only |
| Blog Only | As posted | New articles only |
| Monthly Round-up | Monthly | Monthly summary |

#### 4.3.2 Email Content Structure

**Weekly Newsletter:**
```
Subject: Your Weekly Budget Update - [Date]

Header:
- Logo
- Date

Top Story:
- Featured article with image
- Brief excerpt

Video Highlights:
- New videos this week
- Thumbnail previews
- Platform links

Recent Articles:
- List of recent blog posts
- Brief descriptions
- Read time

Upcoming:
- Budget calendar highlights
- Participation opportunities

Footer:
- Unsubscribe link
- Social links
- Privacy policy
```

#### 4.3.3 Subscription Flow

```
Landing → Email Input → Validation → Double Opt-in → Welcome Email → Preference Center
```

#### 4.3.4 Subscription Points

| Location | Type | Trigger |
|----------|------|---------|
| Footer | Always visible | Static |
| Media Hub Popup | Timed popup | 5 seconds on page |
| Blog Sidebar | Inline | Always visible |
| Post-article | Inline | After reading |
| Home Page | Section | Homepage load |
| Exit Intent | Popup | Mouse leaves viewport |

---

## 5. FUNCTIONAL REQUIREMENTS

### 5.1 Learning Hub Features

| Feature ID | Feature | Description | Priority |
|------------|---------|-------------|----------|
| LH-F001 | Platform Tabs | Switch between TikTok, YouTube, X content | Critical |
| LH-F002 | Video Grid Display | Responsive grid of video thumbnails | Critical |
| LH-F003 | Category Filtering | Filter videos by topic category | Critical |
| LH-F004 | Embedded Players | In-page video playback | Critical |
| LH-F005 | External Links | Links to full platform profiles | Critical |
| LH-F006 | Newsletter Integration | Signup form on media hub | Critical |
| LH-F007 | Search | Search videos by title/topic | High |
| LH-F008 | Lazy Loading | Load videos on scroll | High |
| LH-F009 | Share Functionality | Share individual videos | Medium |
| LH-F010 | View Count Display | Show video engagement metrics | Medium |

### 5.2 Blog Features

| Feature ID | Feature | Description | Priority |
|------------|---------|-------------|----------|
| BLOG-F001 | Article Listing | Paginated list of all posts | Critical |
| BLOG-F002 | Category System | Organize by category | Critical |
| BLOG-F003 | Rich Text Editor | WYSIWYG for content | Critical |
| BLOG-F004 | Featured Image | Hero image for articles | Critical |
| BLOG-F005 | Author Profiles | Author bio and posts | High |
| BLOG-F006 | Reading Time | Calculate and display | High |
| BLOG-F007 | Social Sharing | Share to social platforms | High |
| BLOG-F008 | Related Posts | Algorithm-based suggestions | Medium |
| BLOG-F009 | Comments | Reader discussion | Medium |
| BLOG-F010 | Newsletter CTA | Inline signup | Critical |
| BLOG-F011 | Search | Full-text search | High |
| BLOG-F012 | SEO | Meta tags, schema | High |
| BLOG-F013 | Newsletter Signup | Inline form | Critical |

### 5.3 Newsletter Features

| Feature ID | Feature | Description | Priority |
|------------|---------|-------------|----------|
| NEWS-F001 | Email Collection | Capture email addresses | Critical |
| NEWS-F002 | Double Opt-in | Confirm subscription | Critical |
| NEWS-F003 | Preference Center | Manage subscription | Critical |
| NEWS-F004 | Unsubscribe | One-click unsubscribe | Critical |
| NEWS-F005 | Welcome Email | Automated series | High |
| NEWS-F006 | Template System | Email templates | Critical |
| NEWS-F007 | Analytics | Track opens/clicks | High |
| NEWS-F008 | Segmentation | User preference groups | Medium |
| NEWS-F009 | A/B Testing | Subject line testing | Medium |
| NEWS-F010 | Automation | Triggered emails | High |
| NEWS-F011 | Archive | Web archive view | Medium |

---

## 6. USER INTERFACE REQUIREMENTS

### 6.1 Learning Hub UI

#### 6.1.1 Layout Specifications

| Element | Desktop | Tablet | Mobile |
|---------|---------|--------|--------|
| Hero height | 400px | 350px | 300px |
| Video grid columns | 3 | 2 | 1 |
| Tab bar | Horizontal | Horizontal | Horizontal scroll |
| Sidebar | 280px | Collapsed | Hidden |

#### 6.1.2 Visual Design

- **Color Scheme:** Brand colors (Primary: #0066CC, Accent: #FF6B35)
- **Typography:** Inter for body, bold for headings
- **Spacing:** 8px base unit, 16px content padding
- **Cards:** 8px border radius, subtle shadow on hover

### 6.2 Blog UI

#### 6.2.1 Layout Specifications

| Element | Desktop | Tablet | Mobile |
|---------|---------|--------|--------|
| Content width | 720px max | 100% | 100% |
| Sidebar | 300px | Collapsed | Hidden |
| Grid columns | 3 | 2 | 1 |

#### 6.2.2 Reading Experience

- **Font size:** 18px body, 32px headings
- **Line height:** 1.6 for body text
- **Paragraph spacing:** 24px
- **Image max-width:** 100%

### 6.3 Newsletter UI

#### 6.3.1 Form Design

- **Input fields:** Full width, 48px height
- **Submit button:** Full width, 48px height, brand color
- **Validation:** Inline error messages
- **Success state:** Confirmation message

---

## 7. NON-FUNCTIONAL REQUIREMENTS

### 7.1 Performance

| Metric | Target |
|--------|--------|
| Page load time | < 3 seconds |
| Time to interactive | < 5 seconds |
| Video load time | < 2 seconds |
| Newsletter form submit | < 1 second |
| Search response | < 500ms |

### 7.2 Accessibility

| Standard | Level |
|----------|-------|
| WCAG 2.1 | AA |
| Keyboard navigation | Full support |
| Screen reader | Compatible |
| Color contrast | 4.5:1 minimum |

### 7.3 Browser Support

| Browser | Version |
|---------|---------|
| Chrome | 90+ |
| Firefox | 88+ |
| Safari | 14+ |
| Edge | 90+ |

### 7.4 Mobile Support

| Device | Support |
|--------|---------|
| iOS Safari | Full |
| Chrome Mobile | Full |
| Mobile responsiveness | Required |

---

## 8. CONTENT REQUIREMENTS

### 8.1 Content Strategy

#### 8.1.1 Learning Hub Content

| Content Type | Frequency | Platform | Length |
|--------------|-----------|----------|--------|
| Educational shorts | 3-5/week | TikTok | 15-60 sec |
| Explainer videos | 2-3/week | YouTube | 3-10 min |
| Updates | As needed | X/Twitter | Thread |
| Deep dives | Weekly | YouTube | 10-20 min |

#### 8.1.2 Blog Content

| Content Type | Frequency |
|--------------|-----------|
| Investigations | 1-2/month |
| Explainers | 2-3/week |
| Updates | As needed |
| Field reports | 1-2/month |

#### 8.1.3 Newsletter Content

| Type | Frequency |
|------|-----------|
| Weekly Digest | Every Friday |
| Breaking News | As needed |
| Monthly Round-up | 1st of month |

---

## 9. ANALYTICS & MEASUREMENT

### 9.1 Key Metrics

#### 9.1.1 Learning Hub Metrics

| Metric | Target | Measurement |
|--------|--------|-------------|
| Monthly views | 100,000 | Platform analytics |
| Average watch time | 60% | Platform analytics |
| Social follows | 10,000/month | Platform analytics |
| Newsletter conversion | 5% | Internal tracking |

#### 9.1.2 Blog Metrics

| Metric | Target | Measurement |
|--------|--------|-------------|
| Monthly readers | 25,000 | Analytics |
| Avg. read time | 3 minutes | Analytics |
| Shares per post | 50 | Social analytics |
| Newsletter conversion | 3% | Internal tracking |

#### 9.1.3 Newsletter Metrics

| Metric | Target | Measurement |
|--------|--------|-------------|
| Subscribers | 15,000 | Email platform |
| Open rate | 25% | Email platform |
| Click rate | 5% | Email platform |
| Unsubscribe rate | < 1% | Email platform |

---

## 10. TECHNICAL IMPLEMENTATION

### 10.1 Current Architecture

The site is built with:
- **Framework:** Next.js 14 (App Router)
- **Styling:** Tailwind CSS + shadcn/ui
- **Database:** Supabase (PostgreSQL)
- **Authentication:** Supabase Auth
- **Email:** Newsletter API endpoints

### 10.2 Existing Components

| Component | Location | Status |
|-----------|----------|--------|
| Media Hub Page | /app/media-hub/page.tsx | Built |
| News Hub | /components/news-hub.tsx | Built |
| Twitter Feed | /components/twitter-feed.tsx | Built |
| TikTok Embed | /components/tiktok-embed.tsx | Built |
| Newsletter Form | /components/newsletter-form.tsx | Built |
| Blog Management | /app/admin/blog/ | Built |

### 10.3 Required Enhancements

| Enhancement | Priority | Effort |
|-------------|----------|--------|
| Video analytics dashboard | Medium | Medium |
| Playlist curation system | High | High |
| Advanced blog categorization | High | Medium |
| Newsletter automation | High | High |
| Comments system | Medium | Medium |
| Search enhancement | High | Medium |

---

## 11. ROADMAP

### Phase 1: Foundation (Weeks 1-4)
- [ ] Enhance media hub with improved categorization
- [ ] Implement playlist/collection system
- [ ] Upgrade newsletter popup
- [ ] Add blog reading time
- [ ] Implement newsletter preference center

### Phase 2: Engagement (Weeks 5-8)
- [ ] Add comments to blog posts
- [ ] Implement related posts algorithm
- [ ] Create video playlist pages
- [ ] Add newsletter analytics dashboard
- [ ] Implement A/B testing for newsletters

### Phase 3: Growth (Weeks 9-12)
- [ ] Add social sharing enhancements
- [ ] Implement advanced search
- [ ] Create video engagement analytics
- [ ] Build community features
- [ ] Optimize for conversions

---

## 12. APPENDIX

### A. Glossary

| Term | Definition |
|------|------------|
| Learning Hub | Central page for all video content |
| Media Hub | Same as Learning Hub |
| Double Opt-in | Two-step email subscription confirmation |
| CTR | Click-through rate |
| Open Rate | Percentage of subscribers who opened email |

### B. Related Documents

- [PRD-BUDGETNDIOSTORY.md](/PRD-BUDGETNDIOSTORY.md) - Main product requirements
- [architecture.md](/architecture.md) - Detailed site architecture
- [BRAND.md](/BRAND.md) - Brand guidelines

### C. Contact

For questions about this PRD:
- Email: info@budgetndiostory.org
- Website: www.budgetndiostory.org

---

*Document Version: 1.0*  
*Last Updated: February 2026*  
*Author: Budget Ndio Story Product Team*
