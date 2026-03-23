# Learn Section: CRUD UI Architecture

This document outlines the architecture for a customizable CRUD (Create, Read, Update, Delete) system for the **Learn (Civic Hub)** section, based on the `public/learn.html` template.

## Overview
The goal is to move from a static HTML structure to a dynamic, database-driven Next.js application where administrators can manage learning modules and their content (Stories, Documents, Videos, Quizzes).

## Data Schema (Alignment with `types/learn.ts`)

The CRUD system will directly populate the existing TypeScript interfaces defined in `types/learn.ts`. This ensures that the admin-generated data is type-safe and immediately compatible with the current frontend.

### 1. Modules (`modules`)
Maps to the `LearningModule` interface.
- `id`: UUID (Primary Key)
- `num`: String (e.g., '001')
- `title`: String
- `level`: Enum (`basic`, `advanced`, `expert`)
- `credits`: String
- `teacher`: JSONB (Matching `TeacherInfo`)
- `status`: Enum (`draft`, `published`)
- `catColor`, `catBg`, `accentA`, `accentB`: String (Theme colors)

### 2. Content Sections
The CRUD will manage the four main content types defined in `ContentType`:

- **Stories**: An array of `StorySlide` objects (Covers, Bullets, Pillars, Tiles, Risks, Quiz, CTA).
- **Learn (Lessons)**: An array of `LessonSection` objects, each containing an array of `LessonContent` (Text, Bullets, Image, Quote, Code, Title).
- **Videos**: An array of `VideoItem` objects (YouTube IDs, Titles, Durations).
- **Quiz**: An array of `QuizQuestion` objects (Questions, Options, Correct index, Feedback).

---

## UI Components (Next.js + Tailwind)

### Admin Dashboard (CRUD Interface)
1. **Module List**: A table/grid to view all modules, search, and filter by level/status.
2. **Module Editor**:
   - **General Tab**: Edit title, description, level, and credits.
   - **Content Tab**: A drag-and-drop interface to add/reorder content blocks (Story, Document, Video, Quiz).
   - **Block Editors**:
     - **Story Editor**: Add/remove slides with live preview.
     - **Document Editor**: Rich text or structured block editor (Header, Paragraph, Pillar Card).
     - **Video Editor**: Input video IDs and titles for the playlist.
     - **Quiz Editor**: interface to add questions, options, and explanations.

### Public Learning Interface (The "Learn" App)
- **`app/learn/page.tsx`**: The Hub Screen (displaying module cards).
- **`app/learn/[slug]/page.tsx`**: The Module Screen (with sidebar and tabbed content).

---

## Implementation Strategy

### Phase 1: Database Setup (Supabase)
- Initialize Supabase tables and Row Level Security (RLS).
- Seed initial data from the current `learn.html`.

### Phase 2: API Routes
- `GET /api/learn`: Fetch modules for the hub.
- `GET /api/learn/[slug]`: Fetch full module details.
- `POST /api/admin/learn`: (Protected) Save/Update module data.

### Phase 3: UI Development
- Build the **Hub Card** and **Module Player** components using Tailwind, mirroring the aesthetics of the HTML template (glassmorphism, vibrant accents).
- Implement the **Admin Dashboard** using a clean, functional layout for content management.

---

## Key Aesthetic Principles
- **Vibrant Accents**: Use the defined CSS tokens (`--gold`, `--teal`, `--red`, `--purple`).
- **Glassmorphism**: Use `backdrop-blur` and subtle borders for cards and navigation.
- **Micro-interactions**: Use Framer Motion for smooth tab transitions and card hover effects.
