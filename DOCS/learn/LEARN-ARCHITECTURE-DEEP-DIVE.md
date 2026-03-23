# `/learn` Architecture & Implementation Guide
## Technical Deep-Dive with Code Examples

**Version:** 1.0  
**Updated:** March 20, 2026  
**Status:** Ready for Development

---

## 1. ARCHITECTURE OVERVIEW

### 1.1 System Architecture Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                    Browser / Client                          │
├─────────────────────────────────────────────────────────────┤
│                                                               │
│  ┌────────────────────────────────────────────────────────┐  │
│  │              Learning Platform UI                      │  │
│  │                                                         │  │
│  │  ┌─────────────┐  ┌──────────┐  ┌────────────────┐   │  │
│  │  │  HubScreen  │→ │ModuleScr │→ │ StoryViewer   │   │  │
│  │  └─────────────┘  └──────────┘  └────────────────┘   │  │
│  │         ↓                ↓              ↓              │  │
│  │    (React Hooks)    (Theme,State)   (Animation)       │  │
│  │                                                         │  │
│  └────────────────────────────────────────────────────────┘  │
│                         ↓                                      │
│  ┌────────────────────────────────────────────────────────┐  │
│  │         State Management & Storage                     │  │
│  │  ┌──────────────┐  ┌──────────────┐  ┌────────────┐  │  │
│  │  │ useModule    │  │ useProgress  │  │ useTheme   │  │  │
│  │  └──────────────┘  └──────────────┘  └────────────┘  │  │
│  │                                                         │  │
│  │  localStorage ↔ sessionStorage ↔ Context API          │  │
│  └────────────────────────────────────────────────────────┘  │
│                         ↓ (fetch)                              │
│  ┌────────────────────────────────────────────────────────┐  │
│  │         Design System & Styling                        │  │
│  │  ┌──────────────────────────────────────────────────┐ │  │
│  │  │ CSS Variables + Tailwind / Emotion              │ │  │
│  │  │ (design-tokens.css + learn.css)                 │ │  │
│  │  └──────────────────────────────────────────────────┘ │  │
│  └────────────────────────────────────────────────────────┘  │
│                                                               │
└─────────────────────────────────────────────────────────────┘
                         ↓ (HTTP)
┌─────────────────────────────────────────────────────────────┐
│                    Backend (Next.js API)                     │
├─────────────────────────────────────────────────────────────┤
│                                                               │
│  ┌────────────────────────────────────────────────────────┐  │
│  │          API Routes                                    │  │
│  │  /api/learn/modules          (GET modules list)       │  │
│  │  /api/learn/modules/[id]     (GET module detail)      │  │
│  │  /api/learn/progress         (GET/POST user progress) │  │
│  │  /api/learn/quiz             (POST quiz answer)       │  │
│  └────────────────────────────────────────────────────────┘  │
│                         ↓ (ORM queries)                       │
│  ┌────────────────────────────────────────────────────────┐  │
│  │       Prisma / ORM Layer                              │  │
│  │  ├─ learningProgress model                            │  │
│  │  ├─ quizResponses model                               │  │
│  │  └─ watchHistory model                                │  │
│  └────────────────────────────────────────────────────────┘  │
│                         ↓                                      │
│  ┌────────────────────────────────────────────────────────┐  │
│  │          PostgreSQL Database                           │  │
│  │  ├─ learning_progress  (track user progress)          │  │
│  │  ├─ quiz_responses    (track quiz answers)            │  │
│  │  ├─ watch_history     (track watched videos)          │  │
│  │  └─ users             (from auth system)               │  │
│  └────────────────────────────────────────────────────────┘  │
│                                                               │
└─────────────────────────────────────────────────────────────┘
```

### 1.2 Data Flow Diagram

```
User Opens Hub
     ↓
HubScreen fetches /api/learn/modules
     ↓
API returns MODULES array
     ↓
Display ModuleCards in grid
     ↓
User clicks module → navigate to /learn/[moduleId]
     ↓
ModuleScreen fetches module details + user progress
     ↓
Render 4 tabs (Stories | Learn | Videos | Quiz)
     ↓
User clicks tab → switch content
     ↓
Story Mode:
  └─ User swipes/clicks → advance slide
     └─ Update story progress in localStorage
     └─ On quiz slide → store answer
     └─ On completion → POST /api/learn/progress
     ↓
Lesson Mode:
  └─ User scrolls → track active section
  └─ Sidebar highlights current section
  └─ No state change needed
     ↓
Video Mode:
  └─ User clicks playlist item → switch video
     └─ POST /api/learn/progress (videoId watched)
     └─ Update watch state
     ↓
Quiz Mode:
  └─ User selects answer → highlight + show feedback
     └─ On next click → store answer in state
     └─ On quiz complete → POST /api/learn/progress (score)
     └─ Show completion screen
     ↓
Return to Hub (all data persisted)
```

---

## 2. Data Modeling

### 2.1 Module Data Structure

```typescript
// lib/learn-data/modules.ts

interface LearningModule {
  id: string;                    // 'bps-basic', 'bps-advanced'
  num: string;                   // '001', '002', '003'
  title: string;                 // Module title
  level: 'basic' | 'advanced' | 'expert';
  credits: string;               // Author attribution
  desc: string;                  // Short description
  duration: string;              // '10 min', '25 min'
  slidesCount: number;           // Count for badge
  lessonsCount: number;
  videosCount: number;
  quizCount: number;
  category: string;              // 'Budget Basics', 'Advanced'
  catColor: string;              // '#HEX' for accent
  catBg: string;                 // 'rgba(...)' for background
  accentA: string;               // Primary accent color
  accentB: string;               // Secondary accent color
  teacher: {
    name: string;
    role: string;
    avatar: string;              // Emoji
  };
  types: ('stories' | 'learn' | 'videos' | 'quiz')[];
}

export const MODULES: LearningModule[] = [
  {
    id: 'bps-basic',
    num: '001',
    title: 'The Budget Policy Statement 2026',
    level: 'basic',
    credits: 'Budget Ndio Story Team',
    desc: 'Understand how Kenya\'s budget roadmap works...',
    duration: '10 min',
    slidesCount: 12,
    lessonsCount: 5,
    videosCount: 3,
    quizCount: 4,
    category: 'Budget Basics',
    catColor: '#38B2AC',
    catBg: 'rgba(56,178,172,.12)',
    accentA: '#E53E3E',
    accentB: '#F5C842',
    teacher: {
      name: 'Wanjiru Kamau',
      role: 'Budget Literacy Educator',
      avatar: '👩🏾‍💼'
    },
    types: ['stories', 'learn', 'videos', 'quiz']
  },
  // ... more modules
];
```

### 2.2 Story Slide Structure

```typescript
// lib/learn-data/stories/001.ts

type StoryType = 
  | 'cover'      // Title slide with gradient
  | 'bullets'    // Text + bullet points
  | 'pillars'    // 4-column layout
  | 'tiles'      // Numbered tiles grid
  | 'risks'      // Risk indicators
  | 'quiz'       // Interactive quiz question
  | 'cta';       // Call-to-action slide

interface StorySlide {
  id: string;
  type: StoryType;
  bg: string;                          // Background gradient start
  orb1: string;                        // Gradient orb 1 color
  orb2: string;                        // Gradient orb 2 color
}

// Type-specific extensions...

interface StoryCoverSlide extends StorySlide {
  type: 'cover';
  title: string;
  subtitle: string;
}

interface StoryBulletsSlide extends StorySlide {
  type: 'bullets';
  title: string;
  bullets: string[];
}

interface StoryQuizSlide extends StorySlide {
  type: 'quiz';
  quizIdx: number;                    // Index in STORY_QUIZ array
}

export const STORIES_001: StorySlide[] = [
  {
    id: 'cover',
    type: 'cover',
    title: 'The Budget Policy Statement 2026',
    subtitle: 'Your Guide to Kenya\'s Financial Roadmap',
    bg: '#100D1A',
    orb1: 'rgba(159,122,234,.45)',
    orb2: 'rgba(245,200,66,.25)'
  },
  {
    id: 'what-is-bps',
    type: 'bullets',
    title: 'What is the BPS?',
    bullets: [
      'Strategic guidance document',
      'Submitted to Parliament by Feb 15',
      'Shapes the annual national budget'
    ],
    bg: '#0D0D14',
    orb1: 'rgba(159,122,234,.3)',
    orb2: 'rgba(56,178,172,.15)'
  },
  // ... more slides
];

export const STORY_QUIZ: QuizQuestion[] = [
  {
    q: 'What is the main purpose of the Budget Policy Statement (BPS)?',
    opts: [
      'To collect taxes from citizens',
      'To guide how national and county governments prepare their budgets',
      'To replace the national development plan',
      'To approve all government projects'
    ],
    correct: 1,
    fb: {
      c: '✓ Correct! The BPS guides budget preparation.',
      w: 'The BPS is a strategic guidance document.'
    }
  }
];
```

### 2.3 User Progress Structure

```typescript
// types/learn.ts

interface UserProgress {
  id: string;                     // UUID
  userId: string;                 // From auth system
  moduleId: string;               // Module ID
  contentType: 'stories' | 'learn' | 'videos' | 'quiz';
  
  // Story progress
  currentSlide: number;
  completedSlides: number[];
  storyAnswers: {slideIdx: number; answer: number}[];
  
  // Video progress
  watchedVideos: {videoId: string; percentage: number}[];
  
  // Quiz progress
  quizAnswers: {questionIdx: number; selected: number}[];
  quizScore: number;
  quizAttempts: number;
  
  // Overall
  completed: boolean;
  progressPercent: number;
  startedAt: Date;
  completedAt?: Date;
}
```

---

## 3. Component Architecture

### 3.1 Component Hierarchy

```
<LearningLayout>
  ├─ <LearningNavBar>
  │  ├─ Logo & branding
  │  ├─ Live status pill
  │  ├─ Progress bar
  │  └─ Theme toggle
  │
  ├─ <ModuleSidebar>
  │  ├─ Module info header
  │  ├─ Level badge
  │  ├─ Progress visualization
  │  ├─ Content tabs nav
  │  └─ Lesson outline (scrollable)
  │
  └─ <ModuleScreen>
     ├─ <TabBar>
     │  ├─ Stories tab button
     │  ├─ Learn tab button
     │  ├─ Videos tab button
     │  └─ Quiz tab button
     │
     ├─ Tab Panes (conditional render)
     │  ├─ <StoryViewer>
     │  │  ├─ Story slide renderer (type-specific)
     │  │  ├─ Progress dots
     │  │  └─ Navigation buttons
     │  │
     │  ├─ <LessonPane>
     │  │  ├─ Section renderer
     │  │  ├─ Rich text content
     │  │  └─ Scroll tracking
     │  │
     │  ├─ <VideoPlayer>
     │  │  ├─ YouTube embed
     │  │  ├─ Metadata display
     │  │  └─ Playlist column
     │  │
     │  └─ <QuizPane>
     │     ├─ Question card
     │     ├─ Answer options
     │     ├─ Feedback display
     │     └─ Completion screen
     │
     └─ <StoryOverlay> (when in stories mode fullscreen)
        └─ Story content with navigation
```

### 3.2 Component Props Examples

```typescript
// components/learn/ModuleSidebar.tsx

interface ModuleSidebarProps {
  module: LearningModule;        // Current module data
  progress: UserProgress;        // User's progress
  activeTab: 'stories' | 'learn' | 'videos' | 'quiz';
  onTabChange: (tab: string) => void;
  onSectionScroll: (sectionId: string) => void;
}

export const ModuleSidebar: React.FC<ModuleSidebarProps> = ({
  module,
  progress,
  activeTab,
  onTabChange,
  onSectionScroll
}) => {
  // Component implementation
};

// components/learn/StoryViewer.tsx

interface StoryViewerProps {
  slides: StorySlide[];
  currentSlideIdx: number;
  onSlideChange: (idx: number) => void;
  onQuizAnswer: (questionIdx: number, answer: number) => void;
  onComplete: () => void;
}

export const StoryViewer: React.FC<StoryViewerProps> = ({
  slides,
  currentSlideIdx,
  onSlideChange,
  onQuizAnswer,
  onComplete
}) => {
  // Render correct slide type
  const slide = slides[currentSlideIdx];
  
  switch(slide.type) {
    case 'cover':
      return <StoryCover slide={slide} />;
    case 'bullets':
      return <StoryBullets slide={slide} />;
    case 'quiz':
      return <StoryQuiz 
        slide={slide} 
        onAnswer={onQuizAnswer}
      />;
    // ... other types
  }
};
```

---

## 4. State Management

### 4.1 Using Context API

```typescript
// lib/learn/LearningContext.tsx

import React, { createContext, useCallback } from 'react';

interface LearningContextType {
  currentModule: LearningModule | null;
  currentTab: 'stories' | 'learn' | 'videos' | 'quiz';
  currentStorySlide: number;
  progress: UserProgress;
  
  setCurrentModule: (module: LearningModule) => void;
  setCurrentTab: (tab: string) => void;
  advanceSlide: () => void;
  recordProgress: (data: Partial<UserProgress>) => Promise<void>;
}

export const LearningContext = createContext<LearningContextType | undefined>(
  undefined
);

export const useLearning = () => {
  const context = React.useContext(LearningContext);
  if (!context) {
    throw new Error('useLearning must be used within LearningProvider');
  }
  return context;
};
```

### 4.2 Custom Hooks

```typescript
// lib/learn/hooks/useModule.ts

export const useModule = (moduleId: string) => {
  const [module, setModule] = React.useState<LearningModule | null>(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<Error | null>(null);

  React.useEffect(() => {
    const fetchModule = async () => {
      try {
        const res = await fetch(`/api/learn/modules/${moduleId}`);
        if (!res.ok) throw new Error('Failed to fetch module');
        const data = await res.json();
        setModule(data.module);
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    };

    fetchModule();
  }, [moduleId]);

  return { module, loading, error };
};

// lib/learn/hooks/useProgress.ts

export const useProgress = (moduleId: string, userId: string) => {
  const [progress, setProgress] = React.useState<UserProgress | null>(null);
  
  // Load from localStorage + API
  React.useEffect(() => {
    const localProgress = localStorage.getItem(`progress_${moduleId}`);
    if (localProgress) {
      setProgress(JSON.parse(localProgress));
    }
    
    // Sync with server
    const syncProgress = async () => {
      const res = await fetch(`/api/learn/progress?moduleId=${moduleId}`);
      const data = await res.json();
      setProgress(data.progress);
    };
    
    syncProgress();
  }, [moduleId]);

  const recordProgress = useCallback(async (updates: Partial<UserProgress>) => {
    const updated = {...progress, ...updates};
    
    // Save locally first
    localStorage.setItem(`progress_${moduleId}`, JSON.stringify(updated));
    setProgress(updated);
    
    // Sync with server
    await fetch('/api/learn/progress', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(updated)
    });
  }, [progress, moduleId]);

  return { progress, recordProgress };
};

// lib/learn/hooks/useTheme.ts

export const useTheme = () => {
  const [theme, setTheme] = React.useState<'dark' | 'light'>('dark');

  React.useEffect(() => {
    const saved = localStorage.getItem('learn-theme') as 'dark' | 'light';
    if (saved) setTheme(saved);
  }, []);

  const toggle = useCallback(() => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    localStorage.setItem('learn-theme', newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
  }, [theme]);

  return { theme, toggle };
};
```

---

## 5. API Endpoints

### 5.1 GET /api/learn/modules

```typescript
// api/learn/modules/route.ts

import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const level = searchParams.get('level');      // 'basic', 'advanced'
    const category = searchParams.get('category');
    const search = searchParams.get('search');
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');

    // Build query
    let query: any = {};
    if (level) query.level = level;
    if (category) query.category = category;
    if (search) query.title = { contains: search, mode: 'insensitive' };

    // Fetch with pagination
    const [modules, total] = await Promise.all([
      prisma.learningModule.findMany({
        where: query,
        skip: (page - 1) * limit,
        take: limit,
        orderBy: { createdAt: 'desc' }
      }),
      prisma.learningModule.count({ where: query })
    ]);

    return NextResponse.json({
      modules,
      total,
      page,
      pages: Math.ceil(total / limit)
    });
  } catch (error) {
    console.error('Error fetching modules:', error);
    return NextResponse.json(
      { error: 'Failed to fetch modules' },
      { status: 500 }
    );
  }
}
```

### 5.2 POST /api/learn/progress

```typescript
// api/learn/progress/route.ts

import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession();
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const body = await req.json();
    const {
      moduleId,
      currentSlide,
      completedSlides,
      quizScore,
      completed
    } = body;

    const progress = await prisma.learningProgress.upsert({
      where: {
        userId_moduleId: {
          userId: session.user.id,
          moduleId
        }
      },
      create: {
        userId: session.user.id,
        moduleId,
        currentSlide: currentSlide || 0,
        completedSlides: completedSlides || [],
        progressPercent: completed ? 100 : 0
      },
      update: {
        currentSlide: currentSlide || undefined,
        completedSlides: completedSlides || undefined,
        quizScore: quizScore || undefined,
        completed: completed || undefined,
        progressPercent: (completedSlides?.length || 0) / 12 * 100
      }
    });

    return NextResponse.json({ success: true, progress });
  } catch (error) {
    console.error('Error saving progress:', error);
    return NextResponse.json(
      { error: 'Failed to save progress' },
      { status: 500 }
    );
  }
}
```

### 5.3 POST /api/learn/quiz

```typescript
// api/learn/quiz/route.ts

import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession();
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await req.json();
    const { moduleId, questionIdx, selectedAnswer } = body;

    // Get correct answer from data
    const correctAnswer = await getCorrectAnswer(moduleId, questionIdx);
    const isCorrect = selectedAnswer === correctAnswer;

    // Save response
    await prisma.quizResponse.create({
      data: {
        userId: session.user.id,
        moduleId,
        questionIdx,
        selectedAnswer,
        isCorrect
      }
    });

    // Get feedback
    const feedback = await getQuestionFeedback(
      moduleId,
      questionIdx,
      isCorrect
    );

    return NextResponse.json({
      isCorrect,
      feedback,
      score: isCorrect ? 1 : 0
    });
  } catch (error) {
    console.error('Error processing quiz:', error);
    return NextResponse.json(
      { error: 'Failed to process quiz response' },
      { status: 500 }
    );
  }
}

async function getCorrectAnswer(
  moduleId: string,
  questionIdx: number
): Promise<number> {
  // Load from data file
  const module = await import(`@/lib/learn-data/quiz/${moduleId}`);
  return module.QUIZ[questionIdx].correct;
}

async function getQuestionFeedback(
  moduleId: string,
  questionIdx: number,
  isCorrect: boolean
): Promise<string> {
  const module = await import(`@/lib/learn-data/quiz/${moduleId}`);
  const feedback = module.QUIZ[questionIdx].fb;
  return isCorrect ? feedback.c : feedback.w;
}
```

---

## 6. Styling Strategy

### 6.1 Design Tokens CSS

```css
/* styles/learn/design-tokens.css */

:root {
  /* Colors */
  --red: #E53E3E;
  --red2: #FC4444;
  --red-dim: rgba(229, 62, 62, 0.1);
  --red-border: rgba(229, 62, 62, 0.22);
  
  --gold: #F5C842;
  --gold2: #FFD54F;
  --gold-dim: rgba(245, 200, 66, 0.1);
  --gold-border: rgba(245, 200, 66, 0.22);
  
  --teal: #38B2AC;
  --teal-dim: rgba(56, 178, 172, 0.1);
  
  --green: #48BB78;
  --green-dim: rgba(72, 187, 120, 0.1);
  
  --purple: #9F7AEA;
  --purple-dim: rgba(159, 122, 234, 0.1);
  
  /* Typography */
  --font-display: 'Fraunces', serif;
  --font-body: 'DM Sans', sans-serif;
  --font-mono: 'DM Mono', monospace;
  
  /* Spacing */
  --space-xs: 0.25rem;
  --space-sm: 0.5rem;
  --space-md: 1rem;
  --space-lg: 1.5rem;
  --space-xl: 2rem;
  
  /* Radius */
  --radius-sm: 9px;
  --radius-md: 14px;
  --radius-lg: 20px;
  
  /* Easing */
  --ease-soft: cubic-bezier(0.34, 1.56, 0.64, 1);
  --ease-out: cubic-bezier(0.22, 1, 0.36, 1);
}

[data-theme="dark"] {
  --bg: #0D0D14;
  --surface: #13131F;
  --surface-secondary: #1A1A2C;
  --text: #F0EDE6;
  --text-secondary: rgba(240, 237, 230, 0.58);
  --text-tertiary: rgba(240, 237, 230, 0.3);
  --border: rgba(255, 255, 255, 0.07);
  --shadow: rgba(0, 0, 0, 0.55);
}

[data-theme="light"] {
  --bg: #F8F7F2;
  --surface: #FFFFFF;
  --surface-secondary: #F4F2EB;
  --text: #1A1A10;
  --text-secondary: rgba(26, 26, 16, 0.6);
  --text-tertiary: rgba(26, 26, 16, 0.35);
  --border: rgba(0, 0, 0, 0.08);
  --shadow: rgba(0, 0, 0, 0.12);
}
```

### 6.2 Component Styling

```css
/* components/learn/ModuleSidebar.scss */

.module-sidebar {
  width: var(--sidebar-width, 260px);
  background: var(--surface);
  border-right: 1px solid var(--border);
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  padding: 1.25rem 0;
  transition: transform 0.3s var(--ease-out);
}

.sb-header {
  padding: 0 1.25rem 1.25rem;
  border-bottom: 1px solid var(--border);
}

.sb-title {
  font-family: var(--font-display);
  font-size: 0.9rem;
  font-weight: 400;
  line-height: 1.35;
  margin-bottom: 0.25rem;
}

.sb-progress {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-top: 0.85rem;
}

.sb-progress-bar {
  height: 3.5px;
  background: var(--surface-secondary);
  border-radius: 100px;
  overflow: hidden;
}

.sb-progress-fill {
  height: 100%;
  background: linear-gradient(90deg, var(--gold), var(--teal));
  border-radius: 100px;
  transition: width 0.6s var(--ease-out);
}

@media (max-width: 1024px) {
  .module-sidebar {
    display: none;
  }
}
```

---

## 7. Error Handling & Edge Cases

### 7.1 Error Boundary

```typescript
// components/learn/ErrorBoundary.tsx

interface ErrorBoundaryProps {
  children: React.ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends React.Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Learning platform error:', error, errorInfo);
    // Send to error tracking service
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="error-container">
          <h2>Something went wrong</h2>
          <p>{this.state.error?.message}</p>
          <button onClick={() => window.location.reload()}>
            Try again
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
```

### 7.2 Network Error Handling

```typescript
// lib/learn/api.ts

export const fetchWithRetry = async (
  url: string,
  options?: RequestInit,
  maxRetries: number = 3
): Promise<Response> => {
  let lastError: Error;

  for (let i = 0; i < maxRetries; i++) {
    try {
      const response = await fetch(url, options);
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }
      return response;
    } catch (error) {
      lastError = error as Error;
      if (i < maxRetries - 1) {
        // Exponential backoff: 1s, 2s, 4s
        await new Promise(resolve => 
          setTimeout(resolve, Math.pow(2, i) * 1000)
        );
      }
    }
  }

  throw lastError!;
};
```

---

## 8. Performance Optimization

### 8.1 Code Splitting

```typescript
// components/learn/ModuleScreen.tsx

import dynamic from 'next/dynamic';

const StoryViewer = dynamic(
  () => import('./StoryViewer'),
  { loading: () => <StoryLoader /> }
);

const LessonPane = dynamic(
  () => import('./LessonPane'),
  { loading: () => <LessonLoader /> }
);

export const ModuleScreen: React.FC<ModuleScreenProps> = ({
  module,
  activeTab
}) => {
  return (
    <>
      {activeTab === 'stories' && <StoryViewer />}
      {activeTab === 'learn' && <LessonPane />}
      {/* ... */}
    </>
  );
};
```

### 8.2 Image Lazy Loading

```typescript
// components/learn/story/StoryTiles.tsx

import Image from 'next/image';

export const StoryTiles: React.FC<StoryTilesProps> = ({ tiles }) => {
  return (
    <div className="story-tiles">
      {tiles.map(tile => (
        <div key={tile.id} className="tile">
          <Image
            src={tile.image}
            alt={tile.title}
            width={200}
            height={200}
            loading="lazy"
            priority={false}
          />
          <h3>{tile.title}</h3>
          <p>{tile.desc}</p>
        </div>
      ))}
    </div>
  );
};
```

### 8.3 Memoization

```typescript
// components/learn/ModuleCard.tsx

export const ModuleCard = React.memo(
  ({ module, onClick }: ModuleCardProps) => {
    return (
      <div className="module-card" onClick={() => onClick(module.id)}>
        {/* Card content */}
      </div>
    );
  },
  (prevProps, nextProps) => {
    // Custom comparison: only re-render if module data changes
    return prevProps.module.id === nextProps.module.id;
  }
);
```

---

## 9. Testing Examples

### 9.1 Unit Test

```typescript
// components/learn/ProgressBar.test.tsx

import { render, screen } from '@testing-library/react';
import { ProgressBar } from './ProgressBar';

describe('ProgressBar', () => {
  it('renders with correct percentage', () => {
    render(<ProgressBar current={7} total={10} />);
    const fill = screen.getByTestId('progress-fill');
    expect(fill).toHaveStyle('width: 70%');
  });

  it('updates on prop change', () => {
    const { rerender } = render(
      <ProgressBar current={5} total={10} />
    );
    expect(screen.getByTestId('progress-fill')).toHaveStyle('width: 50%');

    rerender(<ProgressBar current={7} total={10} />);
    expect(screen.getByTestId('progress-fill')).toHaveStyle('width: 70%');
  });
});
```

### 9.2 Integration Test

```typescript
// __tests__/learn-flow.test.tsx

import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { ModuleScreen } from '@/components/learn/ModuleScreen';

describe('Module Learning Flow', () => {
  it('progresses through stories', async () => {
    const { rerender } = render(
      <ModuleScreen moduleId="001" />
    );

    // Click next button
    fireEvent.click(screen.getByText('→'));

    // Verify slide changed
    await waitFor(() => {
      expect(screen.getByTestId('slide-counter')).toHaveTextContent('2/12');
    });
  });
});
```

---

## 10. Deployment Checklist

### Pre-Deployment
- [ ] All tests passing
- [ ] Bundle size < 500KB
- [ ] No console errors
- [ ] Lighthouse score 90+
- [ ] API endpoints verified
- [ ] Database migrations tested

### Post-Deployment
- [ ] Monitor error rates
- [ ] Check CPU/memory usage
- [ ] Verify page load times
- [ ] Test user flows
- [ ] Monitor database queries

---

**Next Phase:** Begin Phase 1 Implementation

