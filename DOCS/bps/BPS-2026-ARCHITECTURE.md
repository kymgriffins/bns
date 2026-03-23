# BPS 2026 - System Architecture & Data Flow

## 🏗️ Overall Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                         USER INTERFACE                           │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐           │
│  │   Slides     │  │   Navigation │  │   Popups     │           │
│  │   Display    │  │   Controls   │  │   & Modals   │           │
│  └──────────────┘  └──────────────┘  └──────────────┘           │
└────┬──────────────────────────────────────────────────────┬──────┘
     │                                                      │
     ▼                                                      ▼
┌──────────────────────────────────┐      ┌─────────────────────────┐
│      REACT COMPONENTS            │      │   HOOKS & LOGIC         │
│                                  │      │                         │
│ ├─ PopupStory.tsx               │      │ ├─ useModuleManagement  │
│ ├─ TransitionWrapper.tsx        │      │ └─ useLocalStorage      │
│ ├─ SlideNavigator.tsx           │      │                         │
│ ├─ ModuleEditor.tsx             │      └─────────────────────────┘
│ └─ SlideEditor.tsx              │            │
│                                  │            │
└────┬───────────────────────────┬─┘            │
     │                           │              │
     ▼                           ▼              ▼
┌──────────────────────────────────────────────────────────┐
│            API LAYER (Next.js Route Handlers)            │
│                                                          │
│  GET /api/learn/modules                                 │
│  GET /api/learn/modules/[moduleId]                      │
│  PUT /api/learn/modules/[moduleId]                      │
│  DELETE /api/learn/modules/[moduleId]                   │
│                                                          │
│  GET /api/learn/modules/[moduleId]/slides/[level]       │
│  PUT /api/learn/modules/[moduleId]/slides/[level]       │
│  POST /api/learn/modules/[moduleId]/slides/[level]      │
└────────────┬───────────────────────────────────────────┘
             │
             ▼
┌──────────────────────────────────────────────────────────┐
│            DATA LAYER (File System / JSON)               │
│                                                          │
│  /app/learn/data/modules/                               │
│  └── bps-2026/                                          │
│      ├── metadata.json (module config)                  │
│      ├── slides-stories.json (10 slides) ← NEW          │
│      ├── slides-basic.json (12 slides)                  │
│      └── slides-advanced.json (20+ slides)              │
└──────────────────────────────────────────────────────────┘
```

---

## 🔄 Data Flow: Reading a Module

```
   User Visits /learn
         │
         ▼
   StoryCivicHub Component
   Mounted (useEffect)
         │
         ▼
   Call API: GET /api/learn/modules/bps-2026
         │
         ▼
   Next.js API Route Handler
   [moduleId]/route.ts
         │
         ▼
   Read: metadata.json
   Read: slides-{level}.json
         │
         ▼
   Return JSON Response
         │
         ▼
   Component State Updated
   Render with Data
         │
         ▼
   Display Slides with
   Transitions & Animations
```

---

## 🎬 Rendering Pipeline

```
Component Mount
       ▼
useEffect: Load Module
       ▼
Component State Update
       │
       ├─► Module Data
       ├─► Slides Array
       ├─► Current Slide Index
       └─► Progress State
       │
       ▼
SlideTransition Wrapper
(Framer Motion)
       ▼
Render Current Slide
       │
       ├─► TransitionWrapper
       │   (Entrance animation)
       │
       ├─► Slide Content
       │   (HTML from JSON)
       │
       └─► SlideNavigator
           (Navigation UI)
       │
       ▼
Browser Paint
       │
       ├─► 60fps Animation
       ├─► Smooth Transitions
       └─► User Interaction
```

---

## 📊 Module Data Structure

```
Module Metadata (metadata.json)
├── id: "bps-2026"
├── num: "001"
├── title: "Budget Policy Statement 2026"
├── description: "..."
├── category: "Budget Basics"
├── teacher: { name, role, avatar }
├── accentA: "#E53E3E"       (primary color)
├── accentB: "#F5C842"       (secondary color)
├── structure:
│   ├── stories:
│   │   ├── title: "...Stories"
│   │   ├── duration: "10 min"
│   │   ├── level: "stories"
│   │   ├── slides: 10
│   │   ├── isActive: true
│   │   ├── icon: "📖"
│   │   └── order: 1
│   ├── basic:
│   │   └── ... (similar)
│   └── advanced:
│       └── ... (similar)
├── features:
│   ├── hasPopups: true
│   ├── hasTransitions: true
│   ├── isResponsive: true
│   ├── supportsCRUD: true
│   └── supportsEditing: true
├── status: "published"
├── version: "1.0.0"
├── createdAt: "2026-03-20T..."
└── updatedAt: "2026-03-20T..."
```

---

## 🎞️ Slide Data Structure

```
Slide (from slides-{level}.json)
├── id: "slide-id"
├── type: "cover|concept|quiz|cta|etc"
├── bg: "bg-red|bg-dark|etc"
├── orbA: "rgba(229,62,62,.5)"    (background animation orb)
├── orbB: "rgba(245,200,66,.3)"   (background animation orb)
├── quizIdx?: 0                    (for quiz slides)
└── content:
    ├── tag?: "Module 001"
    ├── title?: "Title *emphasized*"
    ├── sub?: "Subtitle"
    ├── promise?: "What you'll learn"
    ├── bullets?: [
    │   { dot: "#F5C842", text: "Bullet point" }
    │ ]
    ├── badge?: "🇰🇪 Kenya context"
    ├── question?: "Quiz question?"
    ├── options?: [
    │   { letter: "A", text: "Option" }
    │ ]
    ├── correct?: 0
    ├── feedback?: { correct: "...", wrong: "..." }
    ├── chapters?: [...]
    ├── pillars?: [...]
    ├── stats?: [...]
    └── actions?: [...]
```

---

## 🔌 Component Hierarchy

```
/learn Page
└── StoryCivicHub
    ├── LearningLayout (Outer shell)
    │   ├── Header
    │   │   ├── Logo
    │   │   ├── TabBar {stories|basic|advanced}
    │   │   └── ThemeToggle
    │   │
    │   ├── Main Content Area
    │   │   └── SlideTransition
    │   │       ├── TransitionWrapper
    │   │       │   └── Slide Component
    │   │       │       ├── Content Rendered from JSON
    │   │       │       ├── PopupStory (if needed)
    │   │       │       └── Images/Icons
    │   │       │
    │   │       └── SlideNavigator
    │   │           ├── Progress Bar
    │   │           ├── Slide Counter
    │   │           ├── Previous Button
    │   │           ├── Indicators/Dots
    │   │           └── Next Button
    │   │
    │   └── Footer
    │       ├── Progress (optional)
    │       └── Meta Info
    │
    └── State Management
        ├── progress: { [moduleId]: { slide, completed } }
        ├── theme: "dark" | "light"
        ├── activeModule: string
        ├── slideIdx: number
        ├── activeTab: "stories" | "basic" | "advanced"
        └── quizState: { answered, scores }
```

---

## 🌊 Animation Pipeline

```
User Action (click Next)
    │
    ▼
Event Handler Triggered
    │
    ▼
Update State (slideIdx++)
    │
    ▼
Component Re-renders
    │
    ▼
SlideTransition Wrapper
Key Changed → Animation Triggered
    │
    ├─► Exit Animation
    │   └─ Current Slide Fades Out
    │
    ├─► Re-render Slide
    │   └─ Load Next Slide Data
    │
    └─► Entrance Animation
        ├─ Fade in: 0-500ms
        ├─ Scale: 0.98 → 1.0
        └─ Ease Out
    │
    ▼
Content Reveals
TransitionWrapper (staggered)
    ├─ Title: delay 0ms
    ├─ Bullets: delay 100ms
    ├─ Badge: delay 200ms
    └─ Animation complete 300-500ms
    │
    ▼
User Sees New Slide
With Smooth Entrance Effect
```

---

## 🔗 API Request-Response Flow

### Get Module
```
Client Request:
GET /api/learn/modules/bps-2026

Server Processing:
  1. Parse route params: moduleId = "bps-2026"
  2. Read file: /app/learn/data/modules/bps-2026/metadata.json
  3. Parse JSON
  4. Return response

Response:
{
  "id": "bps-2026",
  "title": "Budget Policy Statement 2026",
  "structure": { ... },
  "features": { ... },
  ...
}

Status: 200 OK
```

### Get Slides
```
Client Request:
GET /api/learn/modules/bps-2026/slides/stories

Server Processing:
  1. Parse params: moduleId = "bps-2026", level = "stories"
  2. Read file: /app/learn/data/modules/bps-2026/slides-stories.json
  3. Parse JSON array
  4. Return full slide collection

Response:
{
  "id": "bps-2026-stories",
  "moduleId": "bps-2026",
  "level": "stories",
  "title": "...",
  "slides": [
    { id: "cover", type: "cover", ... },
    { id: "slide-2", type: "concept", ... },
    ...
  ]
}

Status: 200 OK
```

### Update Slides
```
Client Request:
PUT /api/learn/modules/bps-2026/slides/stories
Content-Type: application/json
Body: { id, level, slides: [...] }

Server Processing:
  1. Parse route: moduleId = "bps-2026", level = "stories"
  2. Validate request body (has slides array)
  3. Add updatedAt timestamp
  4. Write to file: slides-stories.json
  5. Return updated data

Response:
{
  "success": true,
  "data": { ... updated slides ... }
}

Status: 200 OK
```

---

## 🎯 User Journey Through Stories

```
1. Launch /learn
   └─ StoryCivicHub loads
      └─ Fetches: GET /api/learn/modules/bps-2026

2. Select BPS 2026
   └─ Fetches: GET /api/learn/modules/bps-2026/slides/basic

3. Click "Stories" tab
   └─ Fetches: GET /api/learn/modules/bps-2026/slides/stories
   └─ Transitions to stories version

4. View Slides 1-8
   └─ Read content from JSON
   └─ Display with animations
   └─ Save progress to localStorage

5. Slide 9: Quiz
   └─ Display question and options
   └─ User selects answer
   └─ Show feedback (correct/wrong)

6. Slide 10: CTA
   └─ Display call-to-action
   └─ User clicks "Track Budget" / "Join Participation" / etc.
   └─ Could navigate to other sections

7. Complete Module
   └─ Save progress: completed = true
   └─ Show completion badge
   └─ Offer next module or resource
```

---

## 🗂️ File Organization During Runtime

```
Memory (Client)
├── Module Metadata
│   └─ id, title, structure, features, etc.
├── Current Slide Data
│   └─ { id, type, bg, content, ... }
├── Progress State
│   └─ { [moduleId]: { slide: 0, completed: false } }
├── Theme
│   └─ "dark" | "light"
└── Quiz Answers
    └─ { slideId: chosenOption }

File System (Server)
├── metadata.json
├── slides-stories.json (10 items)
├── slides-basic.json (12 items)
└── slides-advanced.json (20+ items)

Browser Storage (Client)
├── localStorage:
│   ├─ bns_progress_stories (progress state)
│   └─ bns_theme_stories (dark/light)
└── sessionStorage:
    └─ quiz_answers (temporary)
```

---

## 🚀 Performance Optimization Path

```
Initial Load
    ├─ 1. Load module metadata (< 50ms)
    ├─ 2. Load basic slides (default) (< 100ms)
    ├─ 3. Parse JSON (< 10ms)
    └─ 4. Render with hydration (< 500ms)
    └─► Total: ~660ms to interactive

Route to Stories
    ├─ 1. Fetch stories slides (< 100ms)
    ├─ 2. Parse JSON (< 10ms)
    ├─ 3. Trigger exit animation (200ms)
    ├─ 4. Switch tab (< 10ms)
    ├─ 5. Render new slides (< 50ms)
    ├─ 6. Trigger entrance animation (300ms)
    └─► Total: ~670ms perceived, smooth

Slide Navigation
    ├─ 1. User clicks Next
    ├─ 2. Update state (< 5ms)
    ├─ 3. Trigger animations (500ms total)
    │   ├─ Exit animation (0-200ms)
    │   ├─ Render (200-210ms)
    │   └─ Entrance animation (200-500ms)
    └─► Total: ~500ms, very smooth
```

---

## 🔐 Security Model

```
Data → API → Component → DOM
  ↓      ↓      ↓        ↓
JSON   Route  React     HTML
      Handler  JSX    (Sanitized)

All content flows through:
1. JSON validation (file parsing)
2. Type checking (TypeScript)
3. React rendering (XSS protection)
4. HTML escaping (unless marked safe)

Notes:
- No direct file downloads
- Content served server-side
- Progress stored client-side (can move to DB)
- API endpoints validate inputs
```

---

## 🎨 Responsive Design Breakpoints

```
Mobile (<768px md)
├─ Single column layout
├─ Touch-friendly buttons
├─ Full-width content
├─ Simplified navigation
└─ Optimized typography

Tablet (768px - 1024px md)
├─ Two column option
├─ Balanced spacing
├─ Full navigation
└─ Optimized images

Desktop (>1024px)
├─ Multiple columns
├─ Rich layouts
├─ Full UI
└─ Hover effects
```

---

## 📈 Growth Path

```
Current State (v1.0)
├─ 1 module (BPS 2026)
├─ 3 levels (Stories, Basic, Advanced)
├─ 42 total slides
└─ JSON storage

Planned Expansion (v2.0)
├─ 5+ modules
├─ User authentication
├─ Database persistence
├─ Progress tracking
├─ Analytics
└─ Supabase integration

Future Vision (v3.0)
├─ 50+ modules
├─ Multi-language
├─ Adaptive learning
├─ Gamification
├─ Community features
└─ AI-powered recommendations
```

---

**Architecture Diagram**: Complete  
**Data Flow**: Documented  
**Status**: Ready for implementation ✅
