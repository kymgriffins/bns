# BPS 2026 Module - Refactoring Complete ✨

## Overview

The BPS 2026 learning module has been refactored with **three distinct learning paths**, **responsive design**, **smooth transitions**, and full **CRUD capabilities** for module management and content editing.

---

## 📚 Learning Paths

### 1. **Stories Version** 📖
- **Duration**: 10 minutes
- **Type**: Narrative-driven story experience
- **Best for**: Quick learners, beginners
- **Content**: Converted from budgetpolicy.txt
- **Slides**: 10
- **File**: `slides-stories.json`

**Journey:**
1. Cover: "Follow the Budget. Find the Story"
2. What is the BPS? (3 Questions)
3. Kenya Context (County Fiscal Strategy Paper)
4. Roadmap Analogy
5. The 5 Core Chapters
6. Budget Numbers Snapshot
7. The 5 Pillars in Detail
8. Potential Risks
9. Knowledge Check Quiz
10. Call-to-Action

### 2. **Basic Version** 📚
- **Duration**: 10 minutes
- **Type**: Structured learning with concepts
- **Best for**: Intermediate learners
- **Slides**: 12
- **File**: `slides-basic.json`

### 3. **Advanced Version** 🎓
- **Duration**: 20 minutes
- **Type**: Deep dive into policy
- **Best for**: Policy professionals, analysts
- **Slides**: 20+
- **File**: `slides-advanced.json`

---

## 🎨 Features

### ✅ Responsive Design
- Mobile-first approach
- Optimized for phones, tablets, desktops
- Touch-friendly navigation
- Adaptive typography and spacing

### ✅ Smooth Transitions
- Slide transitions: Fade + Scale animations
- Navigation: Smooth motion between views
- Progress bar: Animated fill effect
- Staggered animations for content reveal

### ✅ Popup System
- Story highlights can display in modal popups
- Contextual information overlays
- Dismissible with backdrop click or close button
- Mobile-optimized popup sizing

### ✅ CRUD Ready
Full API endpoints for managing modules and content:
- **Create** new modules
- **Read** module data and slides
- **Update** module metadata and slide content
- **Delete** modules

---

## 📁 File Structure

```
app/learn/
├── data/
│   └── modules/
│       └── bps-2026/
│           ├── metadata.json          # Module metadata (enhanced)
│           ├── slides-stories.json    # NEW: Story version
│           ├── slides-basic.json      # Basic version
│           ├── slides-advanced.json   # Advanced version
│           └── stories/               # Story assets (optional)
│
components/learn/
├── PopupStory.tsx                 # NEW: Modal popup component
├── TransitionWrapper.tsx          # NEW: Smooth transition effects
├── SlideNavigator.tsx            # NEW: Enhanced navigation
└── (existing components)

hooks/
├── useModuleManagement.ts        # NEW: CRUD operations hook

app/api/learn/
├── modules/
│   ├── route.ts                  # List modules
│   ├── [moduleId]/
│   │   ├── route.ts             # NEW: Get/Update/Delete module
│   │   └── slides/
│   │       └── [level]/
│   │           └── route.ts     # NEW: Get/Update/Add slides
```

---

## 🚀 API Endpoints

### Modules

#### GET `/api/learn/modules`
List all modules
```bash
curl http://localhost:3000/api/learn/modules
```

#### GET `/api/learn/modules/{moduleId}`
Get module metadata
```bash
curl http://localhost:3000/api/learn/modules/bps-2026
```

#### PUT `/api/learn/modules/{moduleId}`
Update module
```bash
curl -X PUT http://localhost:3000/api/learn/modules/bps-2026 \
  -H "Content-Type: application/json" \
  -d '{"status": "published", "title": "Updated Title"}'
```

#### DELETE `/api/learn/modules/{moduleId}`
Delete module
```bash
curl -X DELETE http://localhost:3000/api/learn/modules/bps-2026
```

### Slides

#### GET `/api/learn/modules/{moduleId}/slides/{level}`
Get slides for a specific level (basic/advanced/stories)
```bash
curl http://localhost:3000/api/learn/modules/bps-2026/slides/stories
```

#### PUT `/api/learn/modules/{moduleId}/slides/{level}`
Update all slides for a level
```bash
curl -X PUT http://localhost:3000/api/learn/modules/bps-2026/slides/stories \
  -H "Content-Type: application/json" \
  -d @slides-stories.json
```

#### POST `/api/learn/modules/{moduleId}/slides/{level}`
Add a new slide
```bash
curl -X POST http://localhost:3000/api/learn/modules/bps-2026/slides/stories \
  -H "Content-Type: application/json" \
  -d '{
    "id": "new-slide",
    "type": "concept",
    "bg": "bg-dark",
    "content": {
      "tag": "New Concept",
      "question": "What is this?"
    }
  }'
```

---

## 💻 Using the Hook

```typescript
import { useModuleManagement } from "@/hooks/useModuleManagement";

export function ModuleEditor() {
  const {
    createModule,
    updateModule,
    deleteModule,
    getModule,
    updateSlides,
    addSlide,
    loading,
    error,
  } = useModuleManagement();

  // Create new module
  const handleCreate = async () => {
    await createModule({
      id: "new-module-001",
      title: "New Learning Module",
      description: "Description here",
      category: "Budget Basics",
    });
  };

  // Update slides
  const handleUpdateSlides = async () => {
    await updateSlides("bps-2026", "stories", slidesData);
  };

  // Add single slide
  const handleAddSlide = async () => {
    await addSlide("bps-2026", "stories", newSlideData);
  };

  return (
    <>
      {error && <div className="error">{error}</div>}
      <button onClick={handleCreate} disabled={loading}>
        {loading ? "Creating..." : "Create Module"}
      </button>
    </>
  );
}
```

---

## 🎬 Using Components

### PopupStory
```typescript
import { PopupStory } from "@/components/learn/PopupStory";

export function Module() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button onClick={() => setIsOpen(true)}>Open Story</button>
      <PopupStory
        isOpen={isOpen}
        title="Learn More"
        content="<p>Detailed story content...</p>"
        onClose={() => setIsOpen(false)}
        icon="📚"
        action={{
          label: "Take Action",
          onClick: () => console.log("Action!"),
        }}
      />
    </>
  );
}
```

### TransitionWrapper
```typescript
import { TransitionWrapper, SlideTransition } from "@/components/learn/TransitionWrapper";

export function SlideViewer() {
  return (
    <SlideTransition currentSlideId={slide.id}>
      <div className="slide-content">
        <TransitionWrapper direction="right">
          <h1>{slide.title}</h1>
        </TransitionWrapper>
      </div>
    </SlideTransition>
  );
}
```

### SlideNavigator
```typescript
import { SlideNavigator } from "@/components/learn/SlideNavigator";

export function Navigation() {
  const [current, setCurrent] = useState(0);

  return (
    <SlideNavigator
      currentSlide={current}
      totalSlides={10}
      onPrevious={() => setCurrent(c => Math.max(0, c - 1))}
      onNext={() => setCurrent(c => c + 1)}
      onGoToSlide={setCurrent}
      showProgress
      responsive
    />
  );
}
```

---

## 📊 Module Metadata (Enhanced)

```json
{
  "id": "bps-2026",
  "num": "001",
  "title": "Budget Policy Statement 2026",
  "description": "Understand Kenya's budget roadmap and its impact on your life.",
  "category": "Budget Basics",
  "structure": {
    "stories": {
      "title": "Budget Policy Statement 2026 - Stories",
      "duration": "10 min",
      "level": "stories",
      "slides": 10,
      "isActive": true,
      "icon": "📖",
      "order": 1
    },
    "basic": {
      "title": "Budget Policy Statement 2026 (Basics)",
      "duration": "10 min",
      "level": "basic",
      "slides": 12,
      "isActive": true,
      "icon": "📚",
      "order": 2
    },
    "advanced": {
      "title": "Reflecting on Kenya's 2026 Budget Policy Statement",
      "duration": "20 min",
      "level": "advanced",
      "slides": 20,
      "isActive": true,
      "icon": "🎓",
      "order": 3
    }
  },
  "features": {
    "hasPopups": true,
    "hasTransitions": true,
    "isResponsive": true,
    "supportsCRUD": true,
    "supportsEditing": true
  },
  "status": "published",
  "createdAt": "2026-03-20T00:00:00Z",
  "updatedAt": "2026-03-20T00:00:00Z",
  "version": "1.0.0"
}
```

---

## 🔧 Slide Types

### Cover
Introduction slide with title, subtitle, and promise
```json
{
  "type": "cover",
  "bg": "bg-red",
  "content": {
    "tag": "Module 001",
    "title": "Title *emphasized*",
    "sub": "Subtitle",
    "promise": "What you'll learn"
  }
}
```

### Concept
Key concept with bullets and Kenya context
```json
{
  "type": "concept",
  "content": {
    "tag": "Tag",
    "question": "Main question",
    "bullets": [
      { "dot": "#F5C842", "text": "Point <strong>one</strong>" }
    ],
    "badge": "🇰🇪 Kenya context"
  }
}
```

### Chapters
Multi-chapter breakdown
```json
{
  "type": "chapters",
  "content": {
    "headline": "The 5 Chapters",
    "chapters": [
      { "num": "1", "label": "Vision", "name": "Development Agenda" }
    ]
  }
}
```

### Pillars
Multi-pillar display with icons and funding
```json
{
  "type": "pillars",
  "content": {
    "headline": "The 5 Pillars",
    "pillars": [
      { "emoji": "🌽", "title": "Agriculture", "desc": "..." }
    ]
  }
}
```

### Stats
Statistics showcase
```json
{
  "type": "stats",
  "content": {
    "headline": "Key Numbers",
    "stats": [
      { "emoji": "💰", "label": "Spending", "value": "KES 4.74T" }
    ]
  }
}
```

### Quiz
Knowledge check
```json
{
  "type": "quiz",
  "content": {
    "question": "The question?",
    "options": [
      { "letter": "A", "text": "Option A" }
    ],
    "correct": 0,
    "feedback": { "correct": "✓ Right!", "wrong": "Try again" }
  }
}
```

### CTA
Call-to-action with multiple actions
```json
{
  "type": "cta",
  "content": {
    "title": "You finished!",
    "sub": "What's next?",
    "actions": [
      { "icon": "🔍", "title": "Next Step", "sub": "Description" }
    ]
  }
}
```

---

## 🎯 Next Steps

### For Content Management
1. Use the API endpoints to create/edit modules
2. Hook into dashboard for admin interface
3. Implement module versioning

### For Feature Expansion
1. Add story-specific popups with detailed explanations
2. Implement quiz result tracking
3. Add progress synchronization to database
4. Create admin dashboard for analytics

### For Performance
1. Add caching for frequently accessed modules
2. Implement lazy loading for slide images
3. Optimize JSON parsing with memoization

---

## 📝 Development Notes

- Module data is stored as JSON files for easy versioning
- Transitions use Framer Motion for smooth animations
- Mobile breakpoint: 768px (md)
- All components are server-safe ("use client" where needed)
- API routes handle both file system and potential database storage

---

## 🤝 Contributing

When adding new modules:
1. Follow the structure in `/app/learn/data/modules/bps-2026/`
2. Create metadata.json first
3. Add at least one slide level (basic/advanced/stories)
4. Test all three levels for responsiveness
5. Use consistent color scheme from design tokens

---

**Created**: March 20, 2026  
**Status**: Ready for Production  
**Version**: 1.0.0
