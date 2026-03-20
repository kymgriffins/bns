# BPS 2026 Module - Implementation Guide

## Quick Start

The BPS 2026 module has been completely refactored with three distinct learning paths, responsive design, smooth animations, and full CRUD capabilities.

---

## 🎓 The Three Learning Paths

### 1. Stories Version (📖 10 min)
**File**: `/app/learn/data/modules/bps-2026/slides-stories.json`

A narrative-driven story journey through Kenya's budget, perfect for quick learners:
- Cover slide introducing the concept
- 3 questions the BPS answers
- Kenya context & county connection
- Budget roadmap analogy
- 5 core chapters breakdown
- Budget numbers snapshot
- 5 pillars of BPS 2026
- Key risks to watch
- Knowledge check quiz
- Call-to-action

**Access via**: `/learn` → Select "Stories" tab

### 2. Basic Version (📚 10 min)
**File**: `/app/learn/data/modules/bps-2026/slides-basic.json`

Structured learning with key concepts and Kenya context.

**Access via**: `/learn` → Default module view

### 3. Advanced Version (🎓 20 min)
**File**: `/app/learn/data/modules/bps-2026/slides-advanced.json`

Deep dive into policy, BETA Agenda, and fiscal analysis for professionals.

**Access via**: `/learn` → Select "Advanced" tab

---

## 🔧 Setup Instructions

### Prerequisites
```bash
# Ensure you have these installed
node >= 18
npm or pnpm

# Dependencies already in project
framer-motion  # For transitions
next-themes    # For theme management
```

### Verify Files Exist

All files have been created at:
```
✅ /app/learn/data/modules/bps-2026/slides-stories.json
✅ /app/learn/data/modules/bps-2026/metadata.json (enhanced)
✅ /components/learn/PopupStory.tsx
✅ /components/learn/TransitionWrapper.tsx
✅ /components/learn/SlideNavigator.tsx
✅ /components/learn/ModuleEditor.tsx
✅ /components/learn/SlideEditor.tsx
✅ /hooks/useModuleManagement.ts
✅ /app/api/learn/modules/[moduleId]/route.ts
✅ /app/api/learn/modules/[moduleId]/slides/[level]/route.ts
```

### Run the Application

```bash
# Start development server
pnpm dev
# or
npm run dev

# Visit in browser
http://localhost:3000/learn
```

---

## 📱 Component Usage Examples

### Using PopupStory Component

```tsx
import { PopupStory } from "@/components/learn/PopupStory";
import { useState } from "react";

export function StoryDetail() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button onClick={() => setIsOpen(true)}>
        Learn More About This Concept
      </button>

      <PopupStory
        isOpen={isOpen}
        title="What is the BPS Really About?"
        icon="📚"
        content={`
          <p>The Budget Policy Statement (BPS) is the government's strategic roadmap for the year.</p>
          <p>It answers three questions:</p>
          <ul>
            <li><strong>Where are we now?</strong> Economy assessment</li>
            <li><strong>Where do we want to go?</strong> Strategic priorities</li>
            <li><strong>How much will we spend?</strong> Revenue & borrowing</li>
          </ul>
        `}
        onClose={() => setIsOpen(false)}
        action={{
          label: "Read Full Analysis",
          onClick: () => {
            console.log("Navigate to full article");
            setIsOpen(false);
          },
        }}
      />
    </>
  );
}
```

### Using TransitionWrapper

```tsx
import { TransitionWrapper, SlideTransition } from "@/components/learn/TransitionWrapper";

export function SlideViewer({ slide, slideIndex }) {
  return (
    <SlideTransition currentSlideId={slide.id}>
      <div className="slide-container">
        <TransitionWrapper direction="right" delay={0}>
          <h2 className="text-3xl font-bold">{slide.content.question}</h2>
        </TransitionWrapper>

        <TransitionWrapper direction="right" delay={0.1}>
          <div className="mt-6 space-y-3">
            {slide.content.bullets?.map((bullet, idx) => (
              <div key={idx} className="flex gap-3">
                <div
                  className="w-2 h-2 rounded-full mt-2"
                  style={{ backgroundColor: bullet.dot }}
                />
                <p dangerouslySetInnerHTML={{ __html: bullet.text }} />
              </div>
            ))}
          </div>
        </TransitionWrapper>
      </div>
    </SlideTransition>
  );
}
```

### Using SlideNavigator

```tsx
import { SlideNavigator } from "@/components/learn/SlideNavigator";
import { useState } from "react";

export function ModuleViewer({ slides }) {
  const [currentSlide, setCurrentSlide] = useState(0);

  return (
    <div className="flex flex-col gap-8">
      {/* Slide Display */}
      <div className="flex-1">
        <SlideContent slide={slides[currentSlide]} />
      </div>

      {/* Navigation */}
      <SlideNavigator
        currentSlide={currentSlide}
        totalSlides={slides.length}
        onPrevious={() => setCurrentSlide(c => Math.max(0, c - 1))}
        onNext={() => setCurrentSlide(c => Math.min(slides.length - 1, c + 1))}
        onGoToSlide={setCurrentSlide}
        slideTitle={slides[currentSlide].content?.tag}
        showProgress={true}
        responsive={true}
      />
    </div>
  );
}
```

### Using ModuleEditor

```tsx
import { ModuleEditor } from "@/components/learn/ModuleEditor";

export function CreateModulePage() {
  return (
    <ModuleEditor
      onSuccess={(moduleId) => {
        console.log(`Module ${moduleId} created!`);
        // Redirect to module
      }}
    />
  );
}
```

### Using SlideEditor

```tsx
import { SlideEditor } from "@/components/learn/SlideEditor";

export function AddSlidePage() {
  return (
    <SlideEditor
      moduleId="bps-2026"
      level="stories"
      onSuccess={() => {
        console.log("Slide added!");
        // Refresh slides
      }}
    />
  );
}
```

### Using Module Management Hook

```tsx
import { useModuleManagement } from "@/hooks/useModuleManagement";
import { useState, useEffect } from "react";

export function ModuleManager() {
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

  const [module, setModule] = useState(null);

  // Fetch module on mount
  useEffect(() => {
    getModule("bps-2026").then(setModule);
  }, []);

  // Update module status
  const handlePublish = async () => {
    const updated = await updateModule("bps-2026", {
      status: "published",
    });
    setModule(updated);
  };

  // Update all slides
  const handleUpdateSlides = async () => {
    const slides = await import("@/app/learn/data/modules/bps-2026/slides-stories.json");
    await updateSlides("bps-2026", "stories", slides);
  };

  return (
    <div>
      {error && <div className="error">{error}</div>}
      {loading && <div>Loading...</div>}
      {module && (
        <>
          <h1>{module.title}</h1>
          <button onClick={handlePublish}>Publish</button>
          <button onClick={handleUpdateSlides}>Update Slides</button>
        </>
      )}
    </div>
  );
}
```

---

## 🌐 API Usage Examples

### Using cURL

#### Get All Modules
```bash
curl http://localhost:3000/api/learn/modules
```

#### Get BPS 2026 Module
```bash
curl http://localhost:3000/api/learn/modules/bps-2026
```

#### Get Stories Slides
```bash
curl http://localhost:3000/api/learn/modules/bps-2026/slides/stories
```

#### Update Module Status
```bash
curl -X PUT http://localhost:3000/api/learn/modules/bps-2026 \
  -H "Content-Type: application/json" \
  -d '{
    "status": "published",
    "updatedAt": "2026-03-20T12:00:00Z"
  }'
```

#### Add New Slide
```bash
curl -X POST http://localhost:3000/api/learn/modules/bps-2026/slides/stories \
  -H "Content-Type: application/json" \
  -d '{
    "id": "my-new-slide",
    "type": "concept",
    "bg": "bg-blue",
    "orbA": "rgba(59,130,246,.3)",
    "orbB": "rgba(56,178,172,.2)",
    "content": {
      "tag": "New Concept",
      "question": "What is this about?",
      "bullets": [
        {
          "dot": "#3B82F6",
          "text": "First key point"
        }
      ]
    }
  }'
```

#### Update All Slides for a Level
```bash
curl -X PUT http://localhost:3000/api/learn/modules/bps-2026/slides/stories \
  -H "Content-Type: application/json" \
  -d @slides-stories-updated.json
```

#### Delete Module
```bash
curl -X DELETE http://localhost:3000/api/learn/modules/bps-2026
```

### Using JavaScript/TypeScript

```typescript
// Fetch module
const module = await fetch("/api/learn/modules/bps-2026").then(r => r.json());

// Update module
const updated = await fetch("/api/learn/modules/bps-2026", {
  method: "PUT",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    status: "published",
    title: "Updated Title"
  })
}).then(r => r.json());

// Get slides
const slides = await fetch("/api/learn/modules/bps-2026/slides/stories")
  .then(r => r.json());

// Add slide
const newSlide = await fetch("/api/learn/modules/bps-2026/slides/stories", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    id: "new-slide",
    type: "concept",
    bg: "bg-dark",
    content: { /* ... */ }
  })
}).then(r => r.json());
```

---

## 🎨 Responsive Design Features

### Mobile Optimizations
- Touch-friendly buttons and navigation
- Optimized font sizes for small screens
- Full-width containers on mobile
- Simplified navigation on small screens (no slide indicators on very small screens)

### Breakpoints
- **Mobile**: < 768px (md)
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

### Components Adapt To:
- Screen size
- Touch vs mouse input
- Dark/light theme
- Keyboard navigation

---

## ✨ Smooth Transitions

All transitions use Framer Motion:

- **Slide Entrance**: Fade + Scale (0.5s)
- **Slide Exit**: Fade + Scale reverse (0.5s)
- **Navigation**: Smooth movement (0.4s)
- **Progress Bar**: Animated fill (0.5s ease-out)
- **Popup Open**: Scale + Fade (0.3s)
- **Content Reveal**: Staggered animations (0.1s between items)

---

## 🔐 CRUD Operations

### Create Module
```typescript
const newModule = await createModule({
  id: "new-module",
  title: "New Module",
  description: "Description",
  category: "Budget Basics",
  accentA: "#E53E3E",
  accentB: "#F5C842"
});
```

### Read Module
```typescript
const module = await getModule("bps-2026");
const slides = await fetch("/api/learn/modules/bps-2026/slides/stories")
  .then(r => r.json());
```

### Update Module
```typescript
const updated = await updateModule("bps-2026", {
  status: "published",
  title: "New Title"
});

const updatedSlides = await updateSlides("bps-2026", "stories", newSlidesData);
```

### Delete Module
```typescript
await deleteModule("bps-2026");
```

### Create/Update Slides
```typescript
// Add single slide
await addSlide("bps-2026", "stories", newSlideObject);

// Update all slides for a level
await updateSlides("bps-2026", "stories", allSlidesObject);
```

---

## 📊 Slide Data Structure

Every slide must have:
```json
{
  "id": "unique-slide-id",
  "type": "cover|concept|chapters|pillars|stats|quiz|cta|videos|lessons",
  "bg": "bg-dark|bg-red|bg-blue|bg-green|bg-teal|bg-purple|bg-gold|bg-orange",
  "orbA": "rgba(r,g,b,alpha)",
  "orbB": "rgba(r,g,b,alpha)",
  "content": {
    // Type-specific content
  }
}
```

### Type-Specific Content

**Cover**:
```json
{
  "tag": "Header tag",
  "title": "Main title",
  "sub": "Subtitle",
  "promise": "What learners will gain"
}
```

**Concept**:
```json
{
  "tag": "Concept name",
  "tagBg": "rgba()",
  "tagColor": "#HEX",
  "question": "Main question",
  "bullets": [
    { "dot": "#HEX", "text": "HTML content" }
  ],
  "badge": "Optional badge text"
}
```

**Quiz**:
```json
{
  "question": "What is...?",
  "options": [
    { "letter": "A", "text": "Option" }
  ],
  "correct": 0,
  "feedback": {
    "correct": "✓ Correct!",
    "wrong": "Try again"
  }
}
```

---

## 🚀 Next Steps

### Immediate
1. ✅ Test all three learning paths in browser
2. ✅ Verify responsive design on mobile
3. ✅ Test all transitions and animations

### Short Term
1. Create admin dashboard for module management
2. Add analytics tracking (quiz results, time spent)
3. Implement user progress persistence
4. Add certificate generation

### Medium Term
1. Create module versioning system
2. Add multi-language support
3. Build content recommendation engine
4. Implement peer review workflow

### Long Term
1. Create AI-powered quiz generation
2. Add adaptive learning paths
3. Build community features
4. Integrate with LMS systems

---

## 📚 Resources

- **Component Documentation**: See inline JSDoc comments
- **API Routes**: Check `/app/api/learn/modules/`
- **Data Structure**: Check `/app/learn/data/modules/bps-2026/`
- **Styling**: See Tailwind CSS classes in component files

---

## ❓ Troubleshooting

### Slides not loading
- Check module ID matches URL/props
- Verify JSON syntax in slide files
- Check browser console for errors

### Transitions not smooth
- Ensure `framer-motion` is installed
- Check for CSS conflicts
- Verify `use client` directive in components

### API endpoints returning 404
- Ensure module directory exists
- Check file names (case-sensitive)
- Verify JSON is valid

### Responsive layout broken
- Check breakpoints (md = 768px)
- Ensure viewport meta tag in layout
- Test with browser DevTools

---

**Last Updated**: March 20, 2026  
**Version**: 1.0.0  
**Status**: Production Ready ✅
