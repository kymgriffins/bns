# `/learn` Endpoint Redesign Roadmap
## Using Civic Hub Premium as a Scalable Model

**Last Updated:** March 20, 2026  
**Status:** Planning & Architecture Phase  
**Model Reference:** `civic-hub-premium (1).html`

---

## 1. EXECUTIVE SUMMARY

Transform the `/learn` endpoint into a **scalable, modular, adaptive learning platform** that mirrors the architectural excellence of `civic-hub-premium`. This roadmap ensures:

- ✅ **Scalability**: Support unlimited modules, lessons, videos, quizzes
- ✅ **Adaptability**: Multi-format content (stories, lessons, videos, quizzes)
- ✅ **Performance**: Optimized component architecture with lazy loading
- ✅ **Consistency**: Design tokens, theme switching, responsive design
- ✅ **Maintainability**: Modular component structure, centralized data management

---

## 2. CIVIC-HUB-PREMIUM ARCHITECTURE ANALYSIS

### 2.1 Core Design Patterns

The HTML model showcases these key architectural patterns:

| Pattern | Description | Implementation |
|---------|-------------|-----------------|
| **Design Tokens System** | Centralized color, spacing, typography, radius vars | CSS custom properties with dark/light themes |
| **Screen-Based Navigation** | Fixed screens with opacity/transform transitions | Hub → Module → Stories overlay flow |
| **Sidebar Navigation** | Persistent lesson outline in sidebar | Responsive: hide on mobile, show desktop |
| **Tab-Based Content** | Stories \| Lesson \| Videos \| Quiz tabs | Conditional rendering with progress tracking |
| **Progress Tracking** | Visual progress bars & completion status | Global nav progress + per-section tracking |
| **Theme Switching** | Dark/light mode with `[data-theme]` attr | Persistent theme state |
| **Responsive Breakpoints** | 1024px, 768px, 480px media queries | Mobile-first approach |

### 2.2 Content Structure

```
MODULES (Hub Screen)
├── Module 001 (Basic)
│   ├── 12 Stories slides
│   ├── 5 Lesson sections
│   ├── 3 Videos
│   └── 4 Quiz questions
├── Module 002 (Advanced)
│   ├── 12 Stories slides
│   ├── 8 Lesson sections
│   ├── 5 Videos
│   └── 15 Quiz questions
└── Module N (Scalable)
    └── N variations...

Each Module → Module Screen with:
  ├── Slide 1-12 (Stories)
  ├── Sections 1-8 (Learn Tab)
  ├── Playlist 1-5 (Videos)
  └── Questions 1-15 (Quiz)
```

### 2.3 Data Model

**Modules Object** (line ~950 in HTML):
```javascript
{
  id, num, title, level, credits, desc,
  duration, slidesCount, lessonsCount, videosCount, quizCount,
  category, catColor, catBg, accentA, accentB,
  teacher: {name, role, avatar},
  types: ['stories', 'learn', 'videos', 'quiz']
}
```

**Stories Slides Array** (line ~960):
```javascript
[
  {id, type, bg, orb1, orb2, ...typeSpecific},
  // types: 'cover', 'bullets', 'pillars', 'tiles', 'risks', 'quiz', 'cta'
]
```

**Quiz Items Array** (line ~985):
```javascript
{q, opts, correct, fb: {c, w}}
```

---

## 3. CURRENT STATE ANALYSIS

### 3.1 Existing Structure
```
app/learn/
├── page.tsx (metadata + StoryCivicHub import)

components/civic-hub/
├── CivicHubApp.tsx
├── StoryCivicHub.tsx
├── storage.ts
├── types.ts
```

### 3.2 Gaps to Address

| Gap | Civic-Hub-Premium Has | Current `/learn` Status |
|-----|----------------------|------------------------|
| Design Tokens | ✅ Comprehensive CSS vars | ❓ Needs audit |
| Multi-Tab Content | ✅ Stories/Learn/Videos/Quiz | ⚠️ Unknown scope |
| Sidebar Navigation | ✅ Persistent outline nav | ❓ Needs implementation |
| Progress Tracking | ✅ Global + per-section | ❓ Unknown |
| Theme System | ✅ Full dark/light support | ⚠️ Needs verification |
| Responsive Design | ✅ 3 breakpoints | ⚠️ Needs testing |
| Video Integration | ✅ YouTube playlist | ❓ Unknown |
| Quiz System | ✅ MCQ + feedback | ❓ Unknown |

---

## 4. IMPLEMENTATION ROADMAP

### PHASE 1: Foundation & Architecture (Week 1)

**Objective:** Establish scalable component structure and data layer

#### 4.1.1 Design System Implementation
- [ ] **Create `lib/designTokens.ts`**
  - Export all CSS token values as JS constants
  - Colors (red, gold, teal, green, purple, etc.)
  - Typography (Fraunces, DM Sans, DM Mono scales)
  - Spacing (rem-based scale)
  - Radius values
  - Transition easing functions
  - Media query breakpoints

- [ ] **Create `styles/design-tokens.css`**
  - Replicate all :root CSS variables from civic-hub-premium
  - Theme-specific variables for light/dark modes
  - Utilize new CSS cascade layers if supported

#### 4.1.2 Type Definitions
- [ ] **Extend `components/civic-hub/types.ts`**
  ```typescript
  interface LearningModule {
    id: string;
    num: string;
    title: string;
    level: 'basic' | 'advanced' | 'expert';
    credits: string;
    desc: string;
    duration: string;
    slidesCount: number;
    lessonsCount: number;
    videosCount: number;
    quizCount: number;
    category: string;
    catColor: string;
    catBg: string;
    accentA: string;
    accentB: string;
    teacher: {name: string; role: string; avatar: string};
    types: ('stories' | 'learn' | 'videos' | 'quiz')[];
  }
  
  interface StorySlide {
    id: string;
    type: 'cover' | 'bullets' | 'pillars' | 'tiles' | 'risks' | 'quiz' | 'cta';
    bg: string;
    orb1: string;
    orb2: string;
    // Type-specific fields...
  }
  
  interface QuizQuestion {
    q: string;
    opts: string[];
    correct: number;
    fb: {c: string; w: string};
  }
  ```

- [ ] **Create `types/learn.ts`** (centralized learning types)
  ```typescript
  export type ContentType = 'stories' | 'learn' | 'videos' | 'quiz';
  export type LevelType = 'basic' | 'advanced' | 'expert';
  export type StoryType = 'cover' | 'bullets' | 'pillars' | 'tiles' | 'risks' | 'quiz' | 'cta';
  ```

#### 4.1.3 Data Layer Architecture
- [ ] **Create `lib/learn-data/modules.ts`**
  - Export `MODULES` array (scalable structure)
  - Support for 50+ modules without refactoring

- [ ] **Create `lib/learn-data/stories.ts`**
  - Story slides organized by module ID
  - Story quiz questions

- [ ] **Create `lib/learn-data/videos.ts`**
  - Video playlist data (YouTube embed IDs)
  - Metadata (title, duration, description)

- [ ] **Create `lib/learn-data/quiz.ts`**
  - Quiz questions organized by module & level
  - Feedback system for correct/wrong answers

- [ ] **Create `lib/learn-data/index.ts`** (barrel export)
  - Clean import interface for all data

#### 4.1.4 State Management
- [ ] **Review & enhance `components/civic-hub/storage.ts`**
  - User progress tracking
  - Module completion status
  - Quiz answers & scores
  - Watched videos
  - User preferences (theme, language)

---

### PHASE 2: Core Components (Week 2)

**Objective:** Build reusable component system matching civic-hub-premium

#### 4.2.1 Layout Components
- [ ] **`components/learn/LearningLayout.tsx`**
  - Global nav (gnav equivalent)
  - Module screen container
  - Theme toggle button
  - Progress indicator

- [ ] **`components/learn/ModuleSidebar.tsx`**
  - Module info header
  - Content tabs nav
  - Lesson outline (scrollable list)
  - Progress visualization
  - Responsive hide on mobile

- [ ] **`components/learn/TabBar.tsx`**
  - Stories | Lesson | Videos | Quiz tabs
  - Active state indicator
  - Badge counts (12, 8, 5, 15)
  - Sticky position on scroll

#### 4.2.2 Content Components
- [ ] **`components/learn/StoryViewer.tsx`**
  - Full-screen story display
  - Slide progression (prev/next)
  - Dot indicator at bottom
  - Navigation buttons (disabled at edges)
  - Auto-advance option
  - Close overlay

- [ ] **`components/learn/LessonPane.tsx`**
  - Sectioned content rendering
  - Anchor navigation from sidebar
  - Scroll tracking for active section
  - Content type support: bullets, numbers, text blocks, images

- [ ] **`components/learn/VideoPlayer.tsx`**
  - YouTube embed wrapper
  - Lazy loading support
  - Metadata display
  - Playlist column (responsive)

- [ ] **`components/learn/QuizPane.tsx`**
  - Question rendering
  - Multiple choice options
  - Feedback system (correct/wrong)
  - Progress tracking
  - Completion screen

#### 4.2.3 UI Components
- [ ] **`components/learn/ui/ProgressBar.tsx`**
  - Linear gradient fill
  - Animated transitions
  - Responsive sizing

- [ ] **`components/learn/ui/Badge.tsx`**
  - Level badge (Basic/Advanced)
  - Status badge (New/Progress/Done)
  - Content type pills (Stories/Learn/Videos/Quiz)

- [ ] **`components/learn/ui/Card.tsx`**
  - Module card (hub view)
  - Hover animation
  - Gradient accents

- [ ] **`components/learn/ui/Button.tsx`**
  - Primary (gold)
  - Secondary (ghost)
  - Tertiary (red/purple variants)

---

### PHASE 3: Feature Implementation (Week 3)

**Objective:** Build complete learning platform functionality

#### 4.3.1 Hub Screen
- [ ] **`components/learn/HubScreen.tsx`**
  - Module grid display
  - Filter by level/category
  - Search functionality
  - Progress visualization
  - Trust signals (metrics chips)

- [ ] **Module Grid Logic**
  - Responsive layout (auto-fill, minmax)
  - Hover animations
  - Click to module detail

#### 4.3.2 Module Screen
- [ ] **`components/learn/ModuleScreen.tsx`**
  - Multi-tab interface
  - Sidebar + main content split
  - Mobile responsive toggle
  - Breadcrumb nav

#### 4.3.3 Stories Mode (Most Complex)
- [ ] **Story Type Renderers**
  - `StoryCover.tsx` (title slide)
  - `StoryBullets.tsx` (text + bullets)
  - `StoryPillars.tsx` (4-column layout)
  - `StoryTiles.tsx` (grid tiles with numbers)
  - `StoryRisks.tsx` (risk indicators with numbers)
  - `StoryQuiz.tsx` (embedded quiz slide)
  - `StoryCTA.tsx` (call-to-action slide)

- [ ] **Story State Management**
  - Current slide index
  - Completed slides tracking
  - Quiz answers storage
  - Time tracking

- [ ] **Story Navigation**
  - Swipe gestures (left/right)
  - Keyboard navigation (arrow keys)
  - Progress dots (clickable)
  - Auto-advance for quiz completion

#### 4.3.4 Lesson Tab
- [ ] **Section Rendering**
  - Rich text content
  - Inline media (images, quotes)
  - Nested hierarchies
  - Copy-paste friendly

- [ ] **Navigation**
  - Sidebar anchor links
  - Automatic section detection on scroll
  - Fixed sidebar highlighting

#### 4.3.5 Videos Tab
- [ ] **Playlist System**
  - Video selection from playlist
  - Embed switching
  - Watch progress tracking
  - Watched indicator badges

- [ ] **Responsive Layout**
  - Desktop: video + sidebar sidebar
  - Mobile: video above playlist

#### 4.3.6 Quiz Tab
- [ ] **Question Types**
  - Multiple choice
  - Scenario-based (text + options)
  - Reflection (open-ended stored locally)

- [ ] **Quiz Flow**
  - Question-by-question navigation
  - Answer validation
  - Instant feedback (correct/wrong explanation)
  - Completion screen with score
  - Retake option

---

### PHASE 4: Styling & Polish (Week 4)

**Objective:** Pixel-perfect design matching civic-hub-premium

#### 4.4.1 Global Styling
- [ ] **Create `app/learn/layout.css`**
  - All CSS from civic-hub-premium (adapted for Next.js)
  - Design token variables
  - Dark/light theme support
  - Responsive breakpoints
  - Animation keyframes

- [ ] **Tailwind Integration** (if applicable)
  - Custom theme extending design tokens
  - Dark mode configuration

#### 4.4.2 Component Styling
- [ ] Apply Fraunces serif for headings
- [ ] DM Sans for body text
- [ ] DM Mono for numbers/code
- [ ] Gold gradient for progress bars
- [ ] Color accent system (red, teal, gold, purple)

#### 4.4.3 Animations
- [ ] Page transitions (opacity + scale)
- [ ] Tab switching (fade)
- [ ] Slide progression (horizontal translate)
- [ ] Progress fill animations
- [ ] Button hover states
- [ ] Toast notifications
- [ ] Confetti celebration

#### 4.4.4 Theme System
- [ ] Implement `useTheme()` hook
- [ ] Theme toggle button in nav + overlay
- [ ] Persistent storage
- [ ] CSS variable switching
- [ ] Light/dark mode specific styles

---

### PHASE 5: Performance & Optimization (Week 5)

**Objective:** Ensure scalability and fast loading

#### 4.5.1 Code Splitting
- [ ] Lazy load story renderers
- [ ] Lazy load video embeds
- [ ] Lazy load quiz logic
- [ ] Dynamic imports for large modules

#### 4.5.2 Data Optimization
- [ ] Separate module data by level
- [ ] Paginate module grids
- [ ] Lazy load story content
- [ ] Cache expensive computations

#### 4.5.3 Image Optimization
- [ ] Optimize story background gradients
- [ ] WebP support for thumbnails
- [ ] Responsive image loading

#### 4.5.4 Bundle Size
- [ ] Tree shake unused code
- [ ] Minify CSS/JS
- [ ] Remove duplicate styles
- [ ] Audit dependencies

---

### PHASE 6: Integration (Week 6)

**Objective:** Connect to backend and real data

#### 4.6.1 API Integration
- [ ] **Create `/api/learn/modules` endpoint**
  - GET all modules
  - Query filters (level, category)
  - Pagination support

- [ ] **Create `/api/learn/modules/[id]` endpoint**
  - GET module details
  - GET module progress

- [ ] **Create `/api/learn/progress` endpoint**
  - POST/PUT user progress
  - Track completed slides/quizzes
  - Store scores

- [ ] **Create `/api/learn/quiz` endpoint**
  - POST quiz answer
  - Validate and return feedback
  - Calculate score

#### 4.6.2 Database Schema
- [ ] User progress table
- [ ] Quiz responses table
- [ ] Video watch history table
- [ ] Module completion states

#### 4.6.3 Real Data Migration
- [ ] Load modules from database
- [ ] Load stories from CMS or database
- [ ] Load videos from YouTube API or database
- [ ] Load quiz questions from database

---

### PHASE 7: Testing & QA (Week 7)

**Objective:** Ensure reliability and quality

#### 4.7.1 Unit Tests
- [ ] Component rendering tests
- [ ] Data transformation tests
- [ ] Progress calculation tests
- [ ] Quiz validation tests

#### 4.7.2 Integration Tests
- [ ] API endpoint tests
- [ ] Database integration tests
- [ ] User flow tests (hub → module → completion)

#### 4.7.3 E2E Tests
- [ ] Complete learning path simulation
- [ ] Quiz completion flow
- [ ] Progress persistence
- [ ] Theme switching

#### 4.7.4 Performance Tests
- [ ] Load time benchmarks
- [ ] Memory usage profiling
- [ ] Large module handling (50+ modules)

#### 4.7.5 Accessibility Tests
- [ ] WCAG 2.1 AA compliance
- [ ] Keyboard navigation
- [ ] Screen reader compatibility
- [ ] Color contrast validation

---

### PHASE 8: Deployment & Monitoring (Week 8)

**Objective:** Production-ready release

#### 4.8.1 Deployment
- [ ] Build optimization
- [ ] Environment configuration
- [ ] CDN setup for assets
- [ ] Database migrations

#### 4.8.2 Monitoring
- [ ] Error tracking (Sentry)
- [ ] Analytics (page views, completion rates)
- [ ] Performance monitoring (Core Web Vitals)
- [ ] User retention tracking

#### 4.8.3 Documentation
- [ ] Component API docs
- [ ] Data structure docs
- [ ] Content authoring guide
- [ ] Setup instructions for new modules

---

## 5. SCALABILITY ARCHITECTURE

### 5.1 Module Scaling
To support 1000+ modules without refactoring:

```typescript
// Modular data structure
const modulesByCategory = new Map<string, Module[]>();
const modulesByLevel = new Map<Level, Module[]>();
const modulesSearch = new SearchIndex();

// Lazy load modules
const getModule = async (id: string) => {
  const data = await import(`@/data/modules/${id}`);
  return data.module;
};
```

### 5.2 Content Scaling
```typescript
// Separate content by module
stories/001/index.ts
stories/002/index.ts
stories/N/index.ts

videos/001/index.ts
videos/002/index.ts

quiz/001/index.ts
quiz/002/index.ts
```

### 5.3 Performance Scaling
- Virtual scrolling for module grids (50+)
- Pagination for content lists
- Code splitting by feature
- Image lazy loading
- API caching strategies
- Progressive enhancement

---

## 6. TECH STACK RECOMMENDATIONS

| Layer | Technology | Reasoning |
|-------|-----------|-----------|
| **Framework** | Next.js 14+ | SSR support, API routes, image optimization |
| **Styling** | CSS Modules + Tailwind | Design token management + utility classes |
| **State** | Zustand or Context API | Lightweight, no boilerplate |
| **Data Fetching** | React Query / SWR | Caching, invalidation, background sync |
| **API** | Next.js API Routes | Minimal setup, built-in |
| **Database** | PostgreSQL / Supabase | Relational data, scalability |
| **Animation** | Framer Motion | React-first, performance-optimized |
| **Testing** | Jest + React Testing Library | Standard for Next.js |
| **E2E Testing** | Cypress or Playwright | Full user journey testing |
| **Build** | Next.js built-in | Optimized for SSR/SSG |

---

## 7. FILE STRUCTURE (Complete)

```
app/learn/
├── page.tsx                          # Main page (hub view)
├── [moduleId]/
│   └── page.tsx                      # Module detail page
├── layout.tsx                        # Shared layout
└── learn.css                         # Global styles

components/learn/
├── LearningLayout.tsx                # Top-level layout wrapper
├── HubScreen.tsx                     # Module grid hub
├── ModuleScreen.tsx                  # Single module view
├── ModuleSidebar.tsx                 # Sidebar with outline
├── TabBar.tsx                        # Tab navigation
│
├── StandardViewer.tsx                # Story display component
├── LessonPane.tsx                    # Lesson tab content
├── VideoPlayer.tsx                   # Video tab content
├── QuizPane.tsx                      # Quiz tab content
│
├── story/
│   ├── StoryCover.tsx
│   ├── StoryBullets.tsx
│   ├── StoryPillars.tsx
│   ├── StoryTiles.tsx
│   ├── StoryRisks.tsx
│   ├── StoryQuiz.tsx
│   └── StoryCTA.tsx
│
├── quiz/
│   ├── QuestionCard.tsx
│   ├── QuizProgress.tsx
│   └── CompletionScreen.tsx
│
└── ui/
    ├── ProgressBar.tsx
    ├── Badge.tsx
    ├── Card.tsx
    ├── Button.tsx
    └── Toast.tsx

lib/learn/
├── designTokens.ts                   # Design system values
├── hooks.ts                          # Custom hooks
├── utils.ts                          # Utilities
├── data/
│   ├── modules.ts
│   ├── stories/
│   │   ├── 001.ts
│   │   ├── 002.ts
│   │   └── N.ts
│   ├── videos/
│   │   ├── 001.ts
│   │   └── N.ts
│   ├── quiz/
│   │   ├── 001.ts
│   │   └── N.ts
│   └── index.ts
├── hooks/
│   ├── useModule.ts
│   ├── useProgress.ts
│   ├── useTheme.ts
│   └── useStoryNavigation.ts
└── store/
    └── learningStore.ts              # Zustand store (if using)

types/learn.ts                        # All learning types

styles/
├── learn-tokens.css                  # Design tokens (CSS vars)
├── learn-animations.css              # Animation keyframes
└── learn-responsive.css              # Media queries

api/learn/
├── modules/
│   └── route.ts                      # GET modules
├── modules/[id]/
│   └── route.ts                      # GET module detail
├── progress/
│   └── route.ts                      # POST/PUT progress
└── quiz/
    └── route.ts                      # POST quiz answer
```

---

## 8. KEY DESIGN DECISIONS

### 8.1 Component Composition
- ✅ Prefer composition over inheritance
- ✅ Keep components focused (single responsibility)
- ✅ Use custom hooks for shared logic
- ✅ Avoid prop drilling with Context API

### 8.2 Styling
- ✅ Use CSS custom properties (design tokens)
- ✅ Mobile-first responsive approach
- ✅ Support dark/light themes at scale
- ✅ Minimize CSS-in-JS for performance

### 8.3 Data Management
- ✅ Server-side data fetching where possible
- ✅ Client-side state only for UI (theme, current slide)
- ✅ Use React Query for caching
- ✅ Persist critical state to localStorage

### 8.4 Performance
- ✅ Code split by route
- ✅ Lazy load story renderers
- ✅ Virtualize long lists
- ✅ Image optimization via Next.js Image

### 8.5 Accessibility
- ✅ Semantic HTML
- ✅ ARIA labels for interactive elements
- ✅ Keyboard navigation support
- ✅ Color contrast 4.5:1 minimum

---

## 9. CONTENT AUTHORING GUIDE

### 9.1 Adding a New Module

```typescript
// lib/learn/data/modules.ts
{
  id: 'my-module',
  num: '003',
  title: 'Module Title',
  level: 'basic',
  credits: 'Author Name',
  desc: 'Short description...',
  duration: 'XX min',
  slidesCount: N,
  lessonsCount: N,
  videosCount: N,
  quizCount: N,
  category: 'Category Name',
  catColor: '#HEX',
  catBg: 'rgba(r,g,b,.12)',
  accentA: '#HEX',
  accentB: '#HEX',
  teacher: {
    name: 'Teacher Name',
    role: 'Role',
    avatar: '👤'
  },
  types: ['stories', 'learn', 'videos', 'quiz']
}
```

### 9.2 Adding Stories
```typescript
// lib/learn/data/stories/003.ts
export const STORIES_003 = [
  {id: 'cover', type: 'cover', bg: '#...'},
  {id: 'slide2', type: 'bullets', bg: '#...', bullets: [...]},
  // ...
];
```

### 9.3 Adding Videos
```typescript
// lib/learn/data/videos/003.ts
export const VIDEOS_003 = [
  {id: '1', title: '...', youtubeId: '...', duration: '...'},
];
```

### 9.4 Adding Quiz
```typescript
// lib/learn/data/quiz/003.ts
export const QUIZ_003 = [
  {q: 'Question?', opts: [...], correct: 0, fb: {c: '...', w: '...'}},
];
```

---

## 10. MIGRATION CHECKLIST

- [ ] Audit current `/learn` for existing content
- [ ] Map current functionality to new architecture
- [ ] Identify data sources (hardcoded, API, CMS)
- [ ] Plan data migration strategy
- [ ] Document custom content types
- [ ] Plan rollout strategy (gradual vs. switch)

---

## 11. TIMELINE & RESOURCES

| Phase | Duration | Team | Deliverables |
|-------|----------|------|--------------|
| 1 | 1 week | 1 dev | Architecture, types, data layer |
| 2 | 1 week | 2 devs | 10+ components built |
| 3 | 1 week | 2 devs | All features functional |
| 4 | 1 week | 1 dev + designer | Pixel-perfect styling |
| 5 | 1 week | 1 dev | Performance optimized |
| 6 | 1 week | 1 dev | API integrated, real data |
| 7 | 1 week | 1 dev + QA | Testing complete |
| 8 | 1 week | 1 dev + devops | Production deployment |
| **Total** | **8 weeks** | **2-3 devs** | **Production platform** |

---

## 12. SUCCESS METRICS

### 12.1 Performance Metrics
- Hub page load: < 2s (first load)
- Module load: < 1s
- Story slide advance: < 100ms
- Lighthouse score: 90+

### 12.2 User Engagement
- Module completion rate: > 70%
- Quiz attempt rate: > 60%
- Average time per module: 20-30 min
- Repeat visit rate: > 40%

### 12.3 Code Quality
- Test coverage: > 80%
- Bundle size: < 500KB (gzipped)
- No critical security issues
- Accessibility score: 95+

---

## 13. RISK MITIGATION

| Risk | Probability | Impact | Mitigation |
|------|-------------|--------|-----------|
| Data migration failure | Medium | High | Backup before migration, rollback plan |
| Performance degradation | Low | High | Load testing, profiling before launch |
| Poor mobile UX | Medium | Medium | Mobile-first development, testing |
| State management complexity | Medium | Medium | Start with Context, migrate if needed |
| Content scaling issues | Low | Medium | Modular data structure, pagination |

---

## 14. NEXT STEPS

1. **Week 1 Action Items:**
   - [ ] Review this roadmap with team
   - [ ] Audit current civic-hub implementation
   - [ ] Set up development environment
   - [ ] Create initial file structure
   - [ ] Begin Phase 1 (Design + Types)

2. **Provide Feedback On:**
   - Timeline realism
   - Resource allocation
   - Technology choices
   - Scope prioritization

3. **Questions to Answer:**
   - What existing `/learn` functionality must be preserved?
   - Are there real content sources (API, CMS)?
   - What's the deployment timeline?
   - Should we build API endpoints or use existing?

---

## APPENDIX: Quick Reference

### Civic Hub Premium Key Files
- Entire design system: ~800 lines CSS
- JavaScript state: ~300 lines
- HTML structure: ~200 lines
- Total: ~1300 lines for full platform

### Estimated Component Sizes (Lines of Code)
- LearningLayout: 80
- HubScreen: 120
- ModuleScreen: 100
- ModuleSidebar: 150
- Story renderers (7 components): 400
- Quiz system: 250
- Video player: 100
- Utilities & hooks: 300
- **Total: ~1500 lines** (managed, maintainable)

---

**Document Version:** 1.0  
**Last Updated:** March 20, 2026  
**Next Review:** Upon Phase 1 Completion
