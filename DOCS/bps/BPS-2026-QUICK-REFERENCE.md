# BPS 2026 - Developer Quick Reference

## 📌 Essential Quick Links

| What? | Where? | Reference |
|-------|--------|-----------|
| **Slides JSON** | `/app/learn/data/modules/bps-2026/slides-stories.json` | 10 slides, story format |
| **Media Data** | `/app/learn/data/modules/bps-2026/metadata.json` | Module config |
| **Components** | `/components/learn/` | PopupStory, TransitionWrapper, SlideNavigator, etc. |
| **Hooks** | `/hooks/useModuleManagement.ts` | CRUD operations |
| **APIs** | `/app/api/learn/modules/` | REST endpoints |
| **Docs** | Root: `BPS-2026-*.md` | 4 comprehensive guides |

---

## ⚡ 30-Second Setup

```bash
cd /home/gunzo/Desktop/GR8/bns
rm -rf .next
pnpm dev

# Open http://localhost:3000/learn
```

---

## 🎯 The 3 Paths at a Glance

```
BPS 2026 Module
├─ Stories (📖 10 min, 10 slides) ← NEW
├─ Basic (📚 10 min, 12 slides)
└─ Advanced (🎓 20 min, 20+ slides)
```

---

## 📜 Slide Types (Copy-Paste Reference)

```json
{
  "type": "cover",
  "bg": "bg-red",
  "orbA": "rgba(229,62,62,.5)",
  "orbB": "rgba(245,200,66,.3)",
  "content": {
    "tag": "Module 001",
    "title": "Title *emphasized*",
    "sub": "Subtitle",
    "promise": "What you'll learn"
  }
}

{
  "type": "concept",
  "bg": "bg-dark",
  "content": {
    "tag": "Tag",
    "question": "Main question *here*",
    "bullets": [
      { "dot": "#F5C842", "text": "<strong>Bold</strong> text" }
    ],
    "badge": "🇰🇪 Kenya context"
  }
}

{
  "type": "quiz",
  "bg": "bg-teal",
  "content": {
    "question": "Question?",
    "options": [
      { "letter": "A", "text": "Option" }
    ],
    "correct": 0,
    "feedback": { "correct": "✓", "wrong": "Try again" }
  }
}

{
  "type": "cta",
  "bg": "bg-green",
  "content": {
    "title": "You finished",
    "sub": "What's next?",
    "actions": [
      { "icon": "🔍", "title": "Action", "sub": "Description" }
    ]
  }
}
```

---

## 🔌 Component Imports

```typescript
import { PopupStory } from "@/components/learn/PopupStory";
import { TransitionWrapper, SlideTransition } from "@/components/learn/TransitionWrapper";
import { SlideNavigator } from "@/components/learn/SlideNavigator";
import { ModuleEditor } from "@/components/learn/ModuleEditor";
import { SlideEditor } from "@/components/learn/SlideEditor";
import { useModuleManagement } from "@/hooks/useModuleManagement";
```

---

## 🚀 Quick Code Snippets

### Get Module Data
```javascript
fetch("/api/learn/modules/bps-2026").then(r => r.json()).then(console.log);
```

### Get Stories Slides
```javascript
fetch("/api/learn/modules/bps-2026/slides/stories").then(r => r.json()).then(console.log);
```

### Update Module Status
```bash
curl -X PUT http://localhost:3000/api/learn/modules/bps-2026 \
  -H "Content-Type: application/json" \
  -d '{"status":"published"}'
```

### Add New Slide
```bash
curl -X POST http://localhost:3000/api/learn/modules/bps-2026/slides/stories \
  -H "Content-Type: application/json" \
  -d '{
    "id": "slide-99",
    "type": "concept",
    "bg": "bg-dark",
    "content": { "tag": "New" }
  }'
```

### Use Hook in Component
```typescript
const { updateModule, loading, error } = useModuleManagement();
await updateModule("bps-2026", { status: "published" });
```

---

## 🎨 Colors Available

```
Backgrounds: bg-dark, bg-red, bg-blue, bg-green
            bg-teal, bg-purple, bg-gold, bg-orange

RGBA Values (sample):
- Orange: rgba(229,62,62,.4)
- Gold: rgba(245,200,66,.3)
- Teal: rgba(56,178,172,.2)
- Purple: rgba(159,122,234,.3)
```

---

## 📏 Responsive Breakpoints

```typescript
// Mobile: < 768px (md)
// Tablet: 768px - 1024px
// Desktop: > 1024px

// In Tailwind:
<div className="md:grid-cols-2">  // 1 col on mobile, 2 on md+
```

---

## 🐛 Common Issues & Fixes

| Issue | Fix |
|-------|-----|
| Stories tab not visible | Clear cache: `Cmd+Shift+R`, restart server |
| API 404 | Check module directory exists, verify filename |
| Transitions stuttering | Install framer-motion: `pnpm add framer-motion` |
| Mobile layout broken | Clear .next: `rm -rf .next`, restart |
| Dark mode not working | Check theme provider in layout |

---

## 📂 File Organization

```
Data Layer:        /app/learn/data/modules/bps-2026/
UI Components:     /components/learn/
Business Logic:    /hooks/useModuleManagement.ts
API Layer:         /app/api/learn/modules/
```

---

## 🔄 CRUD Cheatsheet

```typescript
// CREATE
await createModule({ id, title, description, ... });

// READ
const module = await getModule("bps-2026");

// UPDATE
await updateModule("bps-2026", { status: "published" });

// DELETE
await deleteModule("bps-2026");

// SLIDES
await updateSlides("bps-2026", "stories", slidesData);
await addSlide("bps-2026", "stories", newSlide);
```

---

## 🎬 Animation Durations

```
Slides:     500ms (fade + scale)
Progress:   500ms (fill animation)
Buttons:    300ms (hover/tap)
Content:    400-500ms (staggered)
Popups:     300ms (entrance)
```

---

## 🔗 API Endpoints Reference

```
GET    /api/learn/modules
GET    /api/learn/modules/{moduleId}
PUT    /api/learn/modules/{moduleId}
DELETE /api/learn/modules/{moduleId}

GET    /api/learn/modules/{moduleId}/slides/{level}
PUT    /api/learn/modules/{moduleId}/slides/{level}
POST   /api/learn/modules/{moduleId}/slides/{level}
```

---

## 📊 Stories Version Structure

```
Slide 1:  Cover - "Follow the Budget. Find the Story"
Slide 2:  What is BPS (3 questions)
Slide 3:  Kenya Context (CFSP connection)
Slide 4:  Roadmap Analogy
Slide 5:  5 Core Chapters
Slide 6:  Budget Numbers (stats)
Slide 7:  The 5 Pillars
Slide 8:  Potential Risks
Slide 9:  Knowledge Check Quiz
Slide 10: Call-to-Action
```

---

## 🎯 Testing Sequence

1. ✅ Start server
2. ✅ Visit `/learn`
3. ✅ Click Stories tab
4. ✅ Navigate all 10 slides
5. ✅ Take quiz
6. ✅ Test mobile (DevTools)
7. ✅ Test theme toggle
8. ✅ Check API endpoints

---

## 💾 Where to Save Your Changes

| Type | Location |
|------|----------|
| Slide content | `.../bps-2026/slides-{level}.json` |
| Module config | `.../bps-2026/metadata.json` |
| New components | `/components/learn/` |
| New hooks | `/hooks/` |
| API logic | `/app/api/learn/` |

---

## 🚨 Remember

- ✅ JSON must be valid (use JSON validator)
- ✅ File names are case-sensitive
- ✅ Always restart server after adding API routes
- ✅ Clear browser cache for frontend changes
- ✅ Test on mobile with DevTools
- ✅ Check console for errors
- ✅ Use TypeScript for type safety

---

## 📚 Documentation Map

```
Quick Start?        → BPS-2026-TESTING-GUIDE.md
Need Code Help?     → BPS-2026-IMPLEMENTATION-GUIDE.md
Architecture Q?     → BPS-2026-REFACTOR-README.md
Quick Ref?          → This file!
```

---

## 🎓 Learning Outcomes for Users

After completing the Stories version, users can:
- Explain what the BPS is
- Understand the 3 core questions it answers
- Know how counties are affected
- List the 5 pillars of 2026 budget
- Identify key fiscal risks
- Know where to engage with budget process

---

## ⚡ Performance Targets

- First load: < 2s
- Slide transition: < 500ms
- API response: < 100ms
- Animation frame rate: 60fps
- Mobile score: 90+

---

## 🔐 Security Notes

- Content served server-side (API endpoints)
- No direct PDF downloads
- Progress stored locally by default
- Ready for auth integration
- Type-safe on all layers

---

**Last Updated**: March 20, 2026  
**Status**: Ready to Use  
**Format**: Quick Reference Card  
**Print-Friendly**: Yes ✅
