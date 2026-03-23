# Learning Hub - Module Architecture

> A flexible, client-driven learning module system for Budget Ndio Story

## Overview

The learning system is now completely decoupled from hardcoded data. Clients can create, submit, and manage their own modules without touching code.

### Architecture Changes

**Before:**
- All modules hardcoded in `StoryCivicHub.tsx`
- Two modules (BPS basic + advanced)
- No way to add new modules without code changes

**After:**
- **Module Registry**: Dynamic loading system via JSON
- **Data Layer**: Reusable utilities for loading/managing modules
- **API Endpoints**: REST API for module operations
- **Client Portal**: Form-based module creation
- **Scalable**: Support for unlimited modules

---

## Directory Structure

```
/app/learn/
├── page.tsx                          # Hub landing page
├── create/
│   └── page.tsx                      # Module creation page
├── data/
│   └── modules/
│       └── bps-2026/                 # Module directory
│           ├── metadata.json         # Module metadata
│           ├── slides-basic.json     # Basic level slides
│           ├── slides-advanced.json  # Advanced level slides
│           └── stories/              # (Future) Story files
├── utils/
│   ├── moduleLoader.ts               # Data loading utilities
│   ├── moduleRegistry.ts             # Module registry & management
│   └── index.ts                      # Exports
└── /api/learn/modules/
    ├── route.ts                      # List/create modules
    ├── [id]/route.ts                 # Module details
    └── [id]/slides/route.ts          # Get slides by level

/components/
├── civic-hub/
│   └── StoryCivicHub.tsx             # (Refactored) Main viewer
└── learn/
    └── CreateModuleForm.tsx          # Module creation form
```

---

## Module Structure

### 1. Module Metadata (`metadata.json`)

```json
{
  "id": "bps-2026",
  "num": "001",
  "title": "Budget Policy Statement 2026",
  "description": "Understand Kenya's budget roadmap...",
  "category": "Budget Basics",
  "credits": ["Millicent Makini", "Budget Ndio Story Team"],
  "accentA": "#E53E3E",
  "accentB": "#F5C842",
  "teacher": {
    "name": "Millicent Makini",
    "role": "Budget Literacy Educator",
    "avatar": "👩🏾‍💼"
  },
  "structure": {
    "basic": {
      "title": "Budget Policy Statement 2026 (Basics)",
      "description": "10 minute introduction...",
      "duration": "10 min",
      "level": "basic",
      "slides": 12
    },
    "advanced": {
      "title": "Reflecting on Kenya's 2026 BPS",
      "description": "Deep dive into BETA Agenda...",
      "duration": "20 min",
      "level": "advanced",
      "slides": 20
    }
  },
  "tags": ["budget", "policy", "kenya", "fiscal"],
  "isLocked": false
}
```

### 2. Slides File (`slides-basic.json` / `slides-advanced.json`)

```json
{
  "id": "bps-2026-basic",
  "moduleId": "bps-2026",
  "level": "basic",
  "title": "Budget Policy Statement 2026",
  "slides": [
    {
      "id": "cover",
      "type": "cover",
      "bg": "bg-red",
      "orbA": "rgba(229,62,62,.5)",
      "orbB": "rgba(245,200,66,.3)",
      "content": {
        "tag": "Module 001 · Budget Basics",
        "title": "Budget\nPolicy\n*Statement* 2026",
        "sub": "How Kenya's budget roadmap works...",
        "promise": "In the next 10 minutes, you'll understand..."
      }
    },
    {
      "id": "what-is-bps",
      "type": "concept",
      "bg": "bg-dark",
      "content": { ... }
    }
  ]
}
```

### Slide Types

- **cover**: Module introduction slide
- **concept**: Teaching slide with bullets and optional Kenya context badge
- **chapters**: Section overview showing numbered chapters
- **snapshot**: Data visualization with tiles/stats
- **pillars**: Five-pillar horizontal scroll layout
- **risks**: Risk/challenge list with icons
- **quiz**: Multiple choice question
- **cta**: Call-to-action/completion slide

---

## API Endpoints

### List All Modules
```
GET /api/learn/modules

Query Params:
  - unlocked: true|false    (return only unlocked modules)
  - category: string        (filter by category)
  - stats: true|false       (include statistics)

Response:
{
  "success": true,
  "data": [...],
  "count": 5,
  "stats": { "total": 5, "locked": 1, ... }
}
```

### Get Module Details
```
GET /api/learn/modules/:id

Response:
{
  "success": true,
  "data": { metadata object... }
}
```

### Get Module Slides
```
GET /api/learn/modules/:id/slides?level=basic|advanced

Response:
{
  "success": true,
  "data": {
    "moduleId": "bps-2026",
    "level": "basic",
    "slideCount": 12,
    "slides": [...]
  }
}
```

### Submit New Module
```
POST /api/learn/modules

Body: {
  "id": "unique-module-id",
  "title": "Module Title",
  "description": "...",
  ...metadata fields
}

Response:
{
  "success": true,
  "message": "Module registered successfully",
  "module": {...}
}
```

---

## Creating a New Module

### Step 1: Use the Client Portal
Navigate to `/learn/create` and fill in the form:
- Module ID (unique identifier)
- Title and description
- Category
- Instructor info
- Colors
- Basic level info

### Step 2: Prepare Your Slide Content

Create two JSON files:
- `slides-basic.json` - For beginners (simple narratives)
- `slides-advanced.json` - For advanced learners (deep dives)

Follow the structure in the examples above.

### Step 3: Upload Files

After creating the module metadata, you'll need to add the slide files to:
```
/app/learn/data/modules/{moduleId}/
├── metadata.json
├── slides-basic.json
├── slides-advanced.json
└── stories/ (optional - for narratives)
```

### Step 4: Test

Visit `/learn` and your module should appear in the hub!

---

## Module Development Workflow

### For Creators

1. **Plan**: Outline your module's goals and target audience
2. **Create Basic Version**: 
   - 8-12 simple slides
   - Use stories and analogies
   - Aim for 8-15 minutes
3. **Create Advanced Version** (optional):
   - 15-25 detailed slides
   - Include data & analysis
   - Add reflection prompts
   - Aim for 20-30 minutes
4. **Test**: Iterate based on feedback
5. **Submit**: Upload via the client portal or API

### File Format Guidelines

**For Basic Modules:**
- Start with a cover slide
- Use concept slides with real-world analogies
- Include 2-3 interactive elements
- End with reflection or CTA

**For Advanced Modules:**
- Deep dive into policy details
- Use multiple data visualizations
- Include 5+ quiz questions
- Connect to broader context

---

## Adding Stories to Modules

The `stories/` directory within a module can contain additional narrative-based learning materials:

```
/app/learn/data/modules/bps-2026/stories/
├── story-001-farmer-perspective.json
├── story-002-business-owner.json
└── story-003-student-view.json
```

Each story follows the same slide structure but focuses on a specific persona's perspective.

---

## TypeScript Types

```typescript
// Module metadata
type ModuleMetadata = {
  id: string
  num: string
  title: string
  description: string
  category: string
  credits: string[]
  accentA: string    // Primary color (hex)
  accentB: string    // Secondary color (hex)
  teacher: {
    name: string
    role: string
    avatar: string   // Single emoji
  }
  structure: {
    basic?: {
      title: string
      description: string
      duration: string
      level: "basic"
      slides: number
    }
    advanced?: {
      title: string
      description: string
      duration: string
      level: "advanced"
      slides: number
    }
  }
  tags: string[]
  isLocked: boolean
}

// Slide structure
type StorySlide = {
  id: string
  type: SlideType
  bg: string        // CSS class: bg-red, bg-dark, etc.
  orbA?: string     // Background color (rgba)
  orbB?: string     // Background color (rgba)
  content: SlideContent
  quizIdx?: number  // For quiz slides
}

type SlideType = 
  | "cover" 
  | "concept" 
  | "chapters" 
  | "snapshot" 
  | "pillars" 
  | "risks" 
  | "quiz" 
  | "cta"
```

---

## Utility Functions

### Load Modules
```typescript
import { getModule, loadModuleSlides, getUnlockedModules } from "@/app/learn/utils"

// Get all unlocked modules
const modules = getUnlockedModules()

// Get specific module metadata
const metadata = getModule("bps-2026")

// Load slides for a module
const slides = await loadModuleSlides("bps-2026", "basic")
```

### Module Registry
```typescript
import { moduleExists, getModulesByCategory, getModuleStats } from "@/app/learn/utils"

// Check if exists
if (moduleExists("bps-2026")) { ... }

// Get by category
const policyModules = getModulesByCategory("Policy")

// Get statistics
const { total, locked, unlocked, categories } = getModuleStats()
```

---

## Progress Tracking

User progress is automatically saved in browser localStorage:

**Key**: `bns_progress_stories`

**Format**:
```javascript
{
  "bps-2026": { slide: 3, completed: false },
  "bps-2026-advanced": { slide: 12, completed: true },
  ...
}
```

This allows users to resume from where they left off.

---

## Future Enhancements

- [ ] Database persistence for progress
- [ ] Multi-language support
- [ ] Video integration
- [ ] Interactive quizzes with scoring
- [ ] Certification system
- [ ] Analytics dashboard
- [ ] Community ratings
- [ ] Mobile app export

---

## Troubleshooting

### Module Not Appearing
1. Check metadata.json is valid JSON
2. Verify module ID is unique
3. Ensure `isLocked: false`
4. Restart dev server

### Slides Not Loading
1. Verify slide file path: `/app/learn/data/modules/{id}/slides-{level}.json`
2. Check JSON syntax
3. Ensure `type` values are valid
4. Verify `level` matches filename (basic/advanced)

### API Errors
1. Check module exists in registry
2. Verify query parameters
3. Check Content-Type headers
4. Review error message in response

---

## Support

For questions or issues:
1. Check the examples in `/app/learn/data/modules/bps-2026/`
2. Review the type definitions in `/app/learn/utils/moduleLoader.ts`
3. Test API endpoints with Postman/curl
4. Open an issue with your module details

---

**Created**: March 2026  
**Last Updated**: March 20, 2026  
**Status**: Production Ready
