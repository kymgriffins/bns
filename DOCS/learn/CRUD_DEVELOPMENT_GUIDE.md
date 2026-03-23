# Development Guide: Learn CRUD System

This guide provides actionable steps to implement the customizable CRUD system for the Learn section in Next.js.

## Step 1: Define the Data Model
Use a JSON-first approach for content. A single `module` should contain metadata and a flexible `content` array.

```typescript
// Example JSON for a Learning Module
{
  "id": "m-001",
  "title": "Budget Basics",
  "level": "basic",
  "content": [
    {
      "type": "story",
      "slides": [
        { "emoji": "💰", "title": "What is a Budget?", "text": "A budget is a plan..." }
      ]
    },
    {
      "type": "document",
      "sections": [
        { "type": "h1", "content": "Understanding Revenue" },
        { "type": "p", "content": "Revenue comes from taxes..." }
      ]
    }
  ]
}
```

---

## Step 2: Build the Admin UI Components

### 1. `ModuleCardEditor`
A component to edit basic module properties (Title, Slug, Level).

### 2. `ContentBlockManager`
A list that allows adding new content blocks. Use `dnd-kit` for drag-and-drop reordering.

### 3. `BlockEditors`
Create separate editor components for each block type:
- `StoryEditor`: Text inputs + Emoji picker.
- `DocumentEditor`: Markdown editor or a Block-based builder.
- `QuizEditor`: Add/Remove question fields.

---

## Step 3: Implement the Public "Player"

### `LearnHubGrid`
Maps through the `modules` table and displays cards. Use the CSS tokens from `learn.html`.

### `ModulePlayer`
- **Sidebar**: Lists the `content` items.
- **Main View**: A switch statement based on `content[activeIndex].type`.

```tsx
function ContentRenderer({ block }) {
  switch (block.type) {
    case 'story': return <StoryPlayer data={block.slides} />;
    case 'document': return <DocumentViewer data={block.sections} />;
    case 'video': return <VideoPlaylist data={block.videos} />;
    case 'quiz': return <QuizInteraction data={block.questions} />;
    default: return <div>Unknown block type</div>;
  }
}
```

---

## Step 4: Supabase Integration
1. **Migrations**: Create the `modules` table in Supabase.
2. **RPC/Hooks**: Use `useSWR` or `react-query` to fetch data.
3. **RLS**: Ensure only users with `role = 'admin'` can `INSERT`/`UPDATE`/`DELETE`.

---

## Aesthetic Reminders
- Keep the **Gold/Teal/Red/Purple** palette.
- Use **Fraunces** for headings and **DM Sans** for body text.
- Maintain the **1100px max-width** for the hub and **tabbed interface** for the modules.
