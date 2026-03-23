# Learning Management System (LMS) Module Architecture

## Executive Summary

This document outlines the comprehensive architecture for transforming static PDF educational content into immersive, interactive learning experiences within the BudgetNdioStory platform. The LMS module architecture provides a modular, scalable foundation for delivering engaging educational content while preventing unauthorized content downloads.

---

## 1. Core Architecture Overview

### 1.1 System Architecture Diagram

```
┌─────────────────────────────────────────────────────────────────────────────────┐
│                         LEARNING MANAGEMENT SYSTEM                               │
├─────────────────────────────────────────────────────────────────────────────────┤
│                                                                                  │
│  ┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐             │
│  │   User Layer    │    │  Presentation   │    │   Content       │             │
│  │                 │    │    Layer        │    │   Management    │             │
│  │ • Authentication│    │                 │    │                 │             │
│  │ • Progress      │◄──►│ • Teacher       │◄──►│ • Module        │             │
│  │ • Preferences   │    │   Avatar        │    │   Builder       │             │
│  │ • Accessibility │    │ • Animations    │    │ • PDF Renderer  │             │
│  │                 │    │ • Responsive    │    │ • Media Manager │             │
│  └─────────────────┘    └─────────────────┘    └─────────────────┘             │
│           │                      │                      │                       │
│           └──────────────────────┼──────────────────────┘                       │
│                                  ▼                                               │
│  ┌─────────────────────────────────────────────────────────────────┐            │
│  │                      Service Layer                              │            │
│  │  • Learning Engine    • Quiz Engine    • Progress Tracker      │            │
│  │  • PDF Protection    • Branching Logic • Media Streaming      │            │
│  └─────────────────────────────────────────────────────────────────┘            │
│                                  │                                               │
│                                  ▼                                               │
│  ┌─────────────────────────────────────────────────────────────────┐            │
│  │                       Data Layer                                 │            │
│  │  • Supabase (PostgreSQL)    • Storage (Media)    • Edge Cache  │            │
│  └─────────────────────────────────────────────────────────────────┘            │
│                                                                                  │
└─────────────────────────────────────────────────────────────────────────────────┘
```

### 1.2 Technology Stack

| Layer | Technology | Purpose |
|-------|------------|---------|
| Frontend | Next.js 14+ (App Router) | Server-side rendering, SEO |
| Styling | Tailwind CSS + CSS Variables | Responsive, themeable design |
| Animations | Framer Motion | Smooth, accessible animations |
| State | React Context + Zustand | Global learning state |
| PDF Rendering | react-pdf (with protection) | Secure PDF viewing |
| Data | Supabase | User progress, content storage |
| Media | Cloudinary/Mux | Video streaming, CDN |

---

## 2. Four-Phase Learning Module Framework

Each learning module follows a structured four-phase approach designed to maximize learner engagement and knowledge retention.

### 2.1 Phase Structure Overview

```
┌────────────────────────────────────────────────────────────────────────────────┐
│                           LEARNING MODULE PHASES                               │
├────────────────────────────────────────────────────────────────────────────────┤
│                                                                                 │
│  PHASE 1              PHASE 2              PHASE 3              PHASE 4        │
│  ┌──────────┐        ┌──────────┐        ┌──────────┐        ┌──────────┐    │
│  │  🚀      │        │  📚      │        │  🎯      │        │  ⚡      │    │
│  │INTRO     │───────►│CONTENT   │───────►│KNOWLEDGE │───────►│  CALL   │    │
│  │          │        │          │        │  CHECK   │        │  TO     │    │
│  │          │        │          │        │          │        │  ACTION │    │
│  └──────────┘        └──────────┘        └──────────┘        └──────────┘    │
│                                                                                 │
│  • Hook/Story        • Multi-format      • Pop-up          • Next Steps      │
│  • Objectives        • Interactive         Quizzes         • Downloads       │
│  • Duration          • Protected PDF      • Branching       • Assignments     │
│  • Context           • Video/Audio        • Immediate       • Recommendations │
│                      • External Links       Feedback                          │
│                                                                                 │
│  Duration: ~1 min    Duration: ~70%      Duration: ~15%    Duration: ~15%     │
│                                                                                 │
└────────────────────────────────────────────────────────────────────────────────┘
```

### 2.2 Phase 1: Introduction Module

**Purpose**: Engage learners immediately and set clear expectations

#### Component: `IntroductionPhase`

```typescript
interface IntroductionPhaseProps {
  moduleTitle: string;
  moduleNumber: string;
  estimatedDuration: string;
  learningObjectives: string[];
  hookStory: string;
  teacherAvatar: TeacherAvatarConfig;
  onStart: () => void;
}
```

#### Key Features

| Feature | Implementation | User Experience |
|---------|---------------|-----------------|
| **Hook/Story** | Animated narrative with teacher avatar | Immediate engagement |
| **Objectives** | 3-4 clear learning outcomes | Know what to expect |
| **Duration** | Visual time estimate | Plan learning session |
| **Context** | Real-world relevance | Understand "why" |

#### Visual Design Specifications

- **Animation**: Teacher avatar enters from left with fade-in (300ms ease-out)
- **Typography**: Hook text in larger size (1.25rem), objectives in list format
- **Color**: Use primary brand colors with accent for key points
- **Progress Indicator**: Subtle ring showing 0% complete

### 2.3 Phase 2: Core Content Module

**Purpose**: Deliver educational material through multiple engaging formats

#### Component: `ContentPhase`

```typescript
interface ContentPhaseProps {
  sections: ContentSection[];
  teacherAvatar: TeacherAvatarConfig;
  pdfContent?: ProtectedPDFContent;
  videos?: VideoContent[];
  interactiveElements?: InteractiveElement[];
  onSectionComplete: (sectionId: string) => void;
}
```

#### Content Types Supported

1. **Rich Text** - Markdown with custom components
2. **Protected PDF Viewer** - Canvas-rendered, download-disabled
3. **Embedded Videos** - Lazy-loaded, with transcripts
4. **External Links** - Curated resources in new tabs
5. **Interactive Widgets** - Data visualizations, comparisons

#### Protected PDF Implementation

```typescript
interface ProtectedPDFViewerProps {
  pdfUrl: string; // Served from protected endpoint
  pageNumber: number;
  onPageChange: (page: number) => void;
  // Disable features:
  disablePrint: true;
  disableDownload: true;
  disableCopy: true;
  watermark: string; // User info overlay
}
```

**Security Measures**:
- PDF served via authenticated API route
- Canvas rendering (not iframe)
- Right-click disabled
- Keyboard shortcuts blocked
- Watermark overlay with user identifier
- No direct URL exposure

### 2.4 Phase 3: Knowledge Check Module

**Purpose**: Verify comprehension at strategic intervals

#### Component: `KnowledgeCheckPhase`

```typescript
interface KnowledgeCheckPhaseProps {
  questions: QuizQuestion[];
  checkInterval: number; // After every N sections
  feedbackMode: 'immediate' | 'deferred';
  branchingEnabled: boolean;
  onComplete: (results: QuizResult) => void;
}
```

#### Quiz Interaction Types

| Type | Description | Use Case |
|------|-------------|----------|
| **Multiple Choice** | Single/multi-select with visual feedback | Core concepts |
| **True/False** | Binary decision with explanation | Quick checks |
| **Fill-in-Blank** | Text input with fuzzy matching | Terminology |
| **Drag & Drop** | Match items to categories | Relationships |
| **Hotspot** | Click on image areas | Visual identification |
| **Scenario** | Branching based on responses | Applied knowledge |

#### Branching Logic

```typescript
interface BranchingScenario {
  scenarioId: string;
  introduction: string;
  decisionPoints: DecisionPoint[];
  outcomes: ScenarioOutcome[];
  
  // Branching logic
  determinePath: (responses: Record<string, string>) => string;
}
```

### 2.5 Phase 4: Call-to-Action Module

**Purpose**: Guide learners to next steps

#### Component: `CallToActionPhase`

```typescript
interface CallToActionPhaseProps {
  moduleCompletion: ModuleCompletion;
  recommendations: ModuleRecommendation[];
  downloadableResources: ProtectedResource[];
  assignments: Assignment[];
  onNextModule: (moduleId: string) => void;
  onDownload: (resourceId: string) => void;
}
```

#### CTA Options

1. **Next Module Recommendation** - Personalized based on progress
2. **Resource Downloads** - PDF worksheets, checklists (protected formats)
3. **Practical Assignments** - Real-world application tasks
4. **Community Actions** - Discussion, comments, sharing
5. **Assessment** - Final certification quiz

---

## 3. Virtual Teacher Avatar System

### 3.1 Avatar Architecture

```
┌─────────────────────────────────────────────────────────────────────────────────┐
│                        VIRTUAL TEACHER AVATAR SYSTEM                             │
├─────────────────────────────────────────────────────────────────────────────────┤
│                                                                                  │
│    ┌──────────────┐        ┌──────────────┐        ┌──────────────┐            │
│    │   Avatar     │        │   Avatar     │        │   Avatar     │            │
│    │   Display    │◄──────►│   State      │◄──────►│   Animation  │            │
│    │   Component  │        │   Manager    │        │   Controller │            │
│    └──────────────┘        └──────────────┘        └──────────────┘            │
│           │                        │                        │                  │
│           ▼                        ▼                        ▼                  │
│    ┌──────────────┐        ┌──────────────┐        ┌──────────────┐            │
│    │   Visual     │        │   Speech     │        │   Gesture    │            │
│    │   Elements  │        │   Synthesis  │        │   System     │            │
│    │              │        │              │        │              │            │
│    │ • Character  │        │ • Text-to-   │        │ • Pointing   │            │
│    │ • Expression │        │   Speech     │        │ • Hand wave  │            │
│    │ • Clothing   │        │ • Voice      │        │ • Nodding    │            │
│    │ • Background │        │   selection  │        │ • Emphasize │            │
│    └──────────────┘        └──────────────┘        └──────────────┘            │
│                                                                                  │
└─────────────────────────────────────────────────────────────────────────────────┘
```

### 3.2 Avatar Component Implementation

```typescript
// components/lms/teacher-avatar/TeacherAvatar.tsx

interface TeacherAvatarProps {
  config: AvatarConfig;
  state: AvatarState;
  onInteraction?: (interaction: AvatarInteraction) => void;
}

interface AvatarConfig {
  characterId: string;        // Visual character
  voiceId: string;           // Speech voice
  style: 'formal' | 'casual' | 'storytelling';
  language: 'en' | 'sw';
}

interface AvatarState {
  currentAction: AvatarAction;
  expression: 'neutral' | 'happy' | 'thoughtful' | 'excited';
  position: 'left' | 'right' | 'center';
  isSpeaking: boolean;
  currentPhrase?: string;
}

type AvatarAction = 
  | 'idle'
  | 'explaining'
  | 'pointing'
  | 'questioning'
  | 'celebrating'
  | 'reading';
```

### 3.3 Storytelling Narrative Engine

```typescript
// Story progression system
interface NarrativeBeat {
  beatId: string;
  type: 'intro' | 'explanation' | 'example' | 'transition' | 'conclusion';
  teacherDialogue: string;
  visualInstruction: VisualInstruction;
  duration: number; // seconds
  trigger: 'auto' | 'scroll' | 'click';
}

interface StorySegment {
  segmentId: string;
  title: string;
  beats: NarrativeBeat[];
  contentModules: string[]; // Associated content
  quizTrigger?: string; // Quiz after this segment
}
```

### 3.4 Avatar Visual States

| State | Visual Expression | Animation | Sound |
|-------|-------------------|-----------|-------|
| **Idle** | Neutral smile | Subtle breathing | None |
| **Explaining** | Thoughtful | Hand gestures | TTS audio |
| **Questioning** | Curious tilt | Raised eyebrow | Tone rise |
| **Celebrating** | Big smile + jump | Arms up | Cheerful tone |
| **Reading** | Focused | Page turn gesture | Soft reading |
| **Transitioning** | Nodding | Slide to position | Transition SFX |

---

## 4. Interactive Elements

### 4.1 Click-to-Reveal Content

```typescript
// components/lms/interactive/ClickReveal.tsx

interface ClickRevealProps {
  revealType: 'text' | 'image' | 'video' | 'interactive';
  content: ReactNode;
  hint: string;
  onReveal: () => void;
  revealAnimation?: 'fade' | 'slide' | 'scale' | 'flip';
}
```

**Behavior**:
- Initial state shows "question mark" or blurred preview
- Click/tap reveals content with smooth animation
- Optionally auto-trigger after scroll into view

### 4.2 Drag-and-Drop Activities

```typescript
// components/lms/interactive/DragDrop.tsx

interface DragDropActivityProps {
  items: DraggableItem[];
  dropZones: DropZone[];
  correctMapping: Record<string, string>;
  onComplete: (result: DragDropResult) => void;
  feedbackMode: 'immediate' | 'on-submit';
}

interface DraggableItem {
  id: string;
  content: string;
  category?: string; // For hint
  imageUrl?: string;
}

interface DropZone {
  id: string;
  label: string;
  acceptCategories: string[];
  position: { x: number; y: number };
}
```

**Implementation**:
- Uses `@dnd-kit/core` for accessible drag-and-drop
- Touch-friendly for mobile devices
- Keyboard accessible (arrow keys + enter)
- Visual feedback on hover/drop
- Reset and retry functionality

### 4.3 Scrolling-Triggered Animations

```typescript
// Using Intersection Observer + Framer Motion

interface ScrollTriggerConfig {
  triggerAt: 'top-enter' | 'center' | 'bottom' | 'percentage';
  threshold: number;
  once: boolean;
  animation: AnimationVariant;
}

// Predefined scroll animations
const scrollAnimations = {
  'fade-in': { opacity: [0, 1], y: [30, 0] },
  'slide-in-left': { opacity: [0, 1], x: [-50, 0] },
  'slide-in-right': { opacity: [0, 1], x: [50, 0] },
  'scale-up': { opacity: [0, 1], scale: [0.8, 1] },
  'stagger-children': { transition: { staggerChildren: 0.1 } },
};
```

### 4.4 Interactive Quizzes with Immediate Feedback

```typescript
// components/lms/quiz/InteractiveQuiz.tsx

interface InteractiveQuizProps {
  questions: QuizQuestion[];
  settings: QuizSettings;
  onComplete: (results: QuizResult) => void;
}

interface QuizSettings {
  shuffleQuestions: boolean;
  showFeedback: 'immediate' | 'deferred';
  allowRetry: boolean;
  passingScore: number;
  timeLimit?: number; // seconds
  showCorrectAnswers: boolean;
}

interface QuizQuestion {
  id: string;
  type: 'multiple-choice' | 'true-false' | 'fill-blank' | 'matching' | 'scenario';
  question: string;
  media?: MediaContent;
  options?: QuizOption[];
  correctAnswer: string | string[];
  explanation: string;
  points: number;
}
```

**Feedback System**:
- **Correct**: Green highlight, checkmark, celebratory animation
- **Incorrect**: Red highlight, X mark, show correct answer with explanation
- **Partial**: Yellow highlight, shows which parts are correct

### 4.5 Branching Scenarios

```typescript
// components/lms/scenarios/BranchingScenario.tsx

interface BranchingScenarioProps {
  scenario: Scenario;
  learnerProfile: LearnerProfile;
  onComplete: (outcome: ScenarioOutcome) => void;
}

interface Scenario {
  id: string;
  title: string;
  introduction: string;
  decisionPoints: DecisionPoint[];
  // Each decision leads to different content
  paths: ScenarioPath[];
}

interface DecisionPoint {
  id: string;
  situation: string;
  options: DecisionOption[];
  // Branching logic
  nextPointId: string | ((choice: string) => string);
}

interface DecisionOption {
  id: string;
  label: string;
  description: string;
  feedback?: string; // Immediate feedback
  impact?: Record<string, number>; // Affects outcome metrics
}
```

---

## 5. Progress Tracking System

### 5.1 Progress Data Model

```typescript
// Database schema (Supabase)

interface LearningProgress {
  id: string;
  user_id: string;
  module_id: string;
  
  // Phase progress
  phase_1_complete: boolean;
  phase_2_progress: number; // 0-100
  phase_2_sections_complete: string[];
  phase_3_answers: Record<string, QuizAnswer>;
  phase_3_score: number;
  phase_4_complete: boolean;
  
  // Time tracking
  time_spent_seconds: number;
  started_at: timestamp;
  last_activity_at: timestamp;
  completed_at?: timestamp;
  
  // Engagement metrics
  interactions: InteractionLog[];
  scroll_depth: number[];
  video_progress: Record<string, number>;
}

// Types
type InteractionLog = {
  type: 'click' | 'hover' | 'drag' | 'quiz-answer' | 'branch-choice';
  element_id: string;
  timestamp: number;
  data?: Record<string, unknown>;
};
```

### 5.2 Progress Visualization

```typescript
// components/lms/progress/ProgressIndicator.tsx

interface ProgressIndicatorProps {
  progress: LearningProgress;
  moduleConfig: ModuleConfig;
  showDetailed?: boolean;
}

interface ModuleConfig {
  totalSections: number;
  totalQuizzes: number;
  estimatedMinutes: number;
  phases: PhaseConfig[];
}
```

**Progress Display Options**:
- **Linear Progress Bar**: Shows overall completion (0-100%)
- **Phase Indicators**: Four circles showing phase completion
- **Section Dots**: Individual dots for each content section
- **Time Estimate**: "X minutes remaining"
- **Milestone Badges**: Achievement indicators

---

## 6. Visual Design & Animations

### 6.1 Animation System

```typescript
// Animation configuration
const lmsAnimations = {
  // Page transitions
  pageEnter: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
    transition: { duration: 0.4, ease: 'easeOut' }
  },
  
  // Content reveal
  contentReveal: {
    initial: { opacity: 0, scale: 0.95 },
    animate: { opacity: 1, scale: 1 },
    transition: { duration: 0.3 }
  },
  
  // Teacher avatar
  avatarEnter: {
    initial: { opacity: 0, x: -100 },
    animate: { opacity: 1, x: 0 },
    transition: { type: 'spring', stiffness: 200, damping: 25 }
  },
  
  // Quiz feedback
  correctAnswer: {
    initial: { scale: 1 },
    animate: { 
      scale: [1, 1.05, 1],
      transition: { duration: 0.3 }
    }
  },
  
  // Progress update
  progressBar: {
    initial: { width: '0%' },
    animate: { width: '100%' },
    transition: { duration: 0.5, ease: 'easeInOut' }
  }
};
```

### 6.2 Color System for LMS

```css
/* LMS-specific CSS variables */
:root {
  /* Phase colors */
  --phase-intro: var(--color-blue);
  --phase-content: var(--color-green);
  --phase-quiz: var(--color-purple);
  --phase-action: var(--color-orange);
  
  /* Feedback colors */
  --feedback-correct: #22c55e;
  --feedback-incorrect: #ef4444;
  --feedback-partial: #eab308;
  
  /* Interactive elements */
  --drag-active: var(--color-blue);
  --drop-target: var(--color-purple);
  --hover-highlight: var(--color-blue-light);
  
  /* Accessibility */
  --focus-ring: 3px solid var(--color-blue);
  --high-contrast-text: var(--color-black);
}
```

### 6.3 Responsive Design Breakpoints

| Breakpoint | Width | Layout Adjustments |
|------------|-------|-------------------|
| Mobile | < 640px | Single column, stacked avatar, full-width content |
| Tablet | 640-1024px | Two column where appropriate, smaller avatar |
| Desktop | 1024-1440px | Optimal learning layout, side avatar |
| Wide | > 1440px | Centered content with breathing room |

---

## 7. Accessibility Standards (WCAG 2.1 AA)

### 7.1 Accessibility Requirements

| Requirement | Implementation |
|-------------|----------------|
| **Keyboard Navigation** | Full tab support, skip links, focus indicators |
| **Screen Reader** | ARIA labels, live regions, semantic HTML |
| **Color Contrast** | Minimum 4.5:1 for text, 3:1 for UI |
| **Motion** | `prefers-reduced-motion` support |
| **Text Size** | Rem units, zoom support to 200% |
| **Focus Management** | Visible focus, logical tab order |
| **Error Handling** | Clear error messages, suggestions |

### 7.2 ARIA Implementation

```typescript
// Accessible quiz component example
<div 
  role="group" 
  aria-labelledby="quiz-title"
  aria-describedby="quiz-instructions"
>
  <h2 id="quiz-title">Knowledge Check</h2>
  <p id="quiz-instructions" className="sr-only">
    Select the correct answer for each question
  </p>
  
  {questions.map((q, idx) => (
    <div 
      role="radiogroup" 
      aria-labelledby={`question-${idx}`}
      key={q.id}
    >
      <p id={`question-${idx}`}>{q.question}</p>
      {q.options.map((opt, optIdx) => (
        <button
          role="radio"
          aria-checked={selectedAnswers[idx] === opt.id}
          key={opt.id}
        >
          {opt.label}
        </button>
      ))}
    </div>
  ))}
</div>
```

---

## 8. Component Architecture

### 8.1 Directory Structure

```
components/
└── lms/
    ├── index.ts
    ├── learning-shell.tsx           # Main learning container
    │
    ├── phases/
    │   ├── introduction/
    │   │   ├── IntroductionPhase.tsx
    │   │   ├── LearningObjectives.tsx
    │   │   └── HookStory.tsx
    │   ├── content/
    │   │   ├── ContentPhase.tsx
    │   │   ├── ProtectedPDFViewer.tsx
    │   │   ├── VideoPlayer.tsx
    │   │   └── ExternalLink.tsx
    │   ├── knowledge-check/
    │   │   ├── KnowledgeCheckPhase.tsx
    │   │   ├── QuizContainer.tsx
    │   │   ├── BranchingScenario.tsx
    │   │   └── FeedbackDisplay.tsx
    │   └── call-to-action/
    │       ├── CallToActionPhase.tsx
    │       ├── NextModuleCard.tsx
    │       ├── ResourceDownload.tsx
    │       └── AssignmentCard.tsx
    │
    ├── teacher-avatar/
    │   ├── TeacherAvatar.tsx
    │   ├── AvatarState.tsx
    │   ├── AvatarAnimations.tsx
    │   ├── AvatarSpeech.tsx
    │   └── index.ts
    │
    ├── interactive/
    │   ├── ClickReveal.tsx
    │   ├── DragDrop.tsx
    │   ├── ScrollTrigger.tsx
    │   ├── InteractiveHotspot.tsx
    │   └── InteractiveTimeline.tsx
    │
    ├── progress/
    │   ├── ProgressIndicator.tsx
    │   ├── PhaseProgress.tsx
    │   ├── TimeTracker.tsx
    │   └── AchievementBadge.tsx
    │
    └── shared/
        ├── LMSButton.tsx
        ├── LMSCard.tsx
        ├── LMSModal.tsx
        └── LMSNavigation.tsx
```

### 8.2 Core Component: Learning Shell

```typescript
// components/lms/learning-shell.tsx

interface LearningShellProps {
  module: LearningModule;
  userProgress?: LearningProgress;
  onProgressUpdate: (progress: Partial<LearningProgress>) => void;
  children: React.ReactNode;
}

export function LearningShell({
  module,
  userProgress,
  onProgressUpdate,
  children
}: LearningShellProps) {
  const [currentPhase, setCurrentPhase] = useState<Phase>(1);
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  
  return (
    <div className="lms-shell">
      {/* Header with progress */}
      <LMSHeader 
        module={module}
        progress={userProgress}
        onMenuToggle={() => setSidebarOpen(!isSidebarOpen)}
      />
      
      <div className="lms-body">
        {/* Sidebar navigation */}
        <LMSSidebar 
          isOpen={isSidebarOpen}
          module={module}
          progress={userProgress}
        />
        
        {/* Main content area */}
        <main className="lms-content" role="main">
          <PhaseRouter currentPhase={currentPhase}>
            {children}
          </PhaseRouter>
        </main>
        
        {/* Teacher avatar (desktop) */}
        <TeacherAvatar 
          position="right"
          config={module.avatarConfig}
        />
      </div>
    </div>
  );
}
```

---

## 9. API Endpoints

### 9.1 Learning Module Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/modules` | List all available modules |
| GET | `/api/modules/[id]` | Get module content |
| GET | `/api/modules/[id]/progress` | Get user progress |
| POST | `/api/modules/[id]/progress` | Update progress |
| POST | `/api/modules/[id]/quiz` | Submit quiz answers |
| GET | `/api/modules/[id]/certificate` | Get completion certificate |

### 9.2 Protected PDF Endpoint

```typescript
// app/api/modules/[id]/pdf/route.ts

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  // Verify authentication
  const session = await getServerSession();
  if (!session) return new Response('Unauthorized', { status: 401 });
  
  // Verify module access
  const hasAccess = await checkModuleAccess(session.user.id, params.id);
  if (!hasAccess) return new Response('Forbidden', { status: 403 });
  
  // Fetch PDF with watermarking
  const pdfBuffer = await fetchProtectedPDF(params.id);
  const watermarkedPdf = addWatermark(pdfBuffer, session.user.email);
  
  return new Response(watermarkedPdf, {
    headers: {
      'Content-Type': 'application/pdf',
      'Content-Disposition': 'inline', // Force inline, not download
      'X-Frame-Options': 'DENY',
      'X-Content-Type-Options': 'nosniff'
    }
  });
}
```

---

## 10. Data Models

### 10.1 Learning Module Schema

```typescript
interface LearningModule {
  id: string;
  title: string;
  description: string;
  module_number: string;
  estimated_duration_minutes: number;
  
  // Phase 1: Introduction
  hook_story: string;
  learning_objectives: string[];
  
  // Phase 2: Content
  content_sections: ContentSection[];
  pdf_content?: string; // Protected PDF ID
  videos?: VideoContent[];
  interactive_elements?: InteractiveElement[];
  
  // Phase 3: Knowledge Check
  quiz_questions: QuizQuestion[];
  quiz_interval: number; // After every N sections
  
  // Phase 4: Call to Action
  next_module_id?: string;
  downloadable_resources?: Resource[];
  assignments?: Assignment[];
  
  // Metadata
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  prerequisites: string[];
  tags: string[];
  created_at: timestamp;
  updated_at: timestamp;
}

interface ContentSection {
  id: string;
  title: string;
  type: 'text' | 'pdf' | 'video' | 'interactive';
  order: number;
  content: any; // Type varies by type
  duration_estimate: number;
}
```

---

## 11. Implementation Roadmap

### Phase 1: Foundation (Week 1-2)
- [ ] Set up component directory structure
- [ ] Create LearningShell layout component
- [ ] Implement basic Phase 1 (Introduction)
- [ ] Set up progress tracking in Supabase

### Phase 2: Content Delivery (Week 3-4)
- [ ] Build ContentPhase component
- [ ] Implement ProtectedPDFViewer
- [ ] Add video player component
- [ ] Create content section renderer

### Phase 3: Interactivity (Week 5-6)
- [ ] Implement ClickReveal component
- [ ] Build DragDrop activity component
- [ ] Add scroll-trigger animations
- [ ] Create quiz system

### Phase 4: Teacher Avatar (Week 7-8)
- [ ] Design avatar component
- [ ] Implement animation system
- [ ] Add TTS integration
- [ ] Create storytelling narrative engine

### Phase 5: Advanced Features (Week 9-10)
- [ ] Implement branching scenarios
- [ ] Add progress visualization
- [ ] Create CTA components
- [ ] Build analytics tracking

### Phase 6: Polish (Week 11-12)
- [ ] Accessibility audit and fixes
- [ ] Responsive testing
- [ ] Performance optimization
- [ ] User testing and feedback

---

## 12. Conclusion

This LMS module architecture provides a comprehensive foundation for transforming static PDF content into engaging, interactive learning experiences. The four-phase approach ensures consistent learner engagement while the virtual teacher avatar creates a personal connection that enhances knowledge retention.

Key architectural decisions:
- **Modular design** allows incremental implementation and testing
- **Protected content** prevents unauthorized downloads while maintaining usability
- **Accessibility-first** ensures all learners can benefit
- **Analytics integration** enables continuous improvement
- **Scalable structure** supports future expansion

This architecture aligns with the existing BudgetNdioStory platform while providing specialized components for educational content delivery.
