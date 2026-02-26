# Apple HIG Design Tokens Documentation

## Overview

This document outlines the design token system for the Budget Ndio Story application, rebuilt according to Apple's Human Interface Guidelines (HIG). The design system follows three fundamental principles:

- **Clarity**: Easy to understand and navigate, with legible text and precise icons
- **Deference**: UI helps users understand content, never competing with it
- **Depth**: Visual layers and motion convey hierarchy and vitality

## Color System

### Core Colors (Apple HIG - Black, White, Blue Only)

The color palette is strictly limited to three colors following Apple's HIG:

| Token | Hex Value | Usage |
|-------|-----------|-------|
| `--color-black` | `#000000` | Primary text, headings, borders |
| `--color-white` | `#ffffff` | Backgrounds, card surfaces |
| `--color-blue` | `#007AFF` | Primary actions, links, accents (Apple's system blue) |

### Semantic Color Tokens

These tokens map to the core colors and adapt for light/dark modes:

#### Light Mode

| Token | HSL Value | Core Color | Usage |
|-------|-----------|------------|-------|
| `--background` | `0 0% 100%` | White | Page backgrounds |
| `--foreground` | `0 0% 0%` | Black | Primary text |
| `--card` | `0 0% 100%` | White | Card surfaces |
| `--card-foreground` | `0 0% 0%` | Black | Text on cards |
| `--primary` | `211 100% 50%` | Blue | Primary actions, CTAs |
| `--primary-foreground` | `0 0% 100%` | White | Text on primary |
| `--secondary` | `0 0% 96%` | White/Gray | Secondary backgrounds |
| `--secondary-foreground` | `0 0% 0%` | Black | Secondary text |
| `--muted` | `0 0% 96%` | White/Gray | Muted backgrounds |
| `--muted-foreground` | `0 0% 40%` | Black (40%) | Muted text |
| `--border` | `0 0% 90%` | Gray | Borders, dividers |
| `--destructive` | `0 100% 50%` | Red | Error states |

#### Dark Mode

| Token | HSL Value | Core Color | Usage |
|-------|-----------|------------|-------|
| `--background` | `0 0% 0%` | Black | Page backgrounds |
| `--foreground` | `0 0% 100%` | White | Primary text |
| `--card` | `0 0% 8%` | Black | Card surfaces |
| `--card-foreground` | `0 0% 100%` | White | Text on cards |
| `--primary` | `211 100% 60%` | Blue | Primary actions |
| `--primary-foreground` | `0 0% 0%` | Black | Text on primary |
| `--secondary` | `0 0% 15%` | Black | Secondary surfaces |
| `--secondary-foreground` | `0 0% 100%` | White | Secondary text |
| `--muted` | `0 0% 15%` | Black | Muted backgrounds |
| `--muted-foreground` | `0 0% 60%` | White (60%) | Muted text |
| `--border` | `0 0% 20%` | Gray | Borders |
| `--destructive` | `0 100% 60%` | Red | Error states |

### Usage in Components

```tsx
// Primary button - Blue
<button className="bg-blue text-white rounded-lg px-4 py-2">
  Action
</button>

// Secondary button - White with border
<button className="bg-white text-black border border-border rounded-lg px-4 py-2">
  Secondary
</button>

// Card - White with subtle border
<div className="bg-card border border-border rounded-lg p-4">
  Content
</div>
```

---

## Typography

### Font Families

The application uses two custom brand fonts:

#### Founders Grotesk
- **Usage**: Headings, titles, display text
- **CSS Declaration**: `font-family: 'FoundersGrotesk', sans-serif;`
- **Weight**: Semi-bold (600) for primary headings

#### Neue Montreal
- **Usage**: Body text, buttons, navigation, paragraphs
- **CSS Declaration**: `font-family: 'NeueMontreal', sans-serif;`
- **Weight**: Regular (400) and Medium (500)

### Typography Scale

| Element | Size | Line Height |
|---------|------|-------------|
| H1 | 2.5rem (40px) | 1.2 |
| H2 | 2rem (32px) | 1.25 |
| H3 | 1.5rem (24px) | 1.3 |
| Body | 1rem (16px) | 1.5 |
| Small | 0.875rem (14px) | 1.5 |
| Caption | 0.75rem (12px) | 1.4 |

---

## Spacing (White Space)

### Apple HIG Spacing Scale

Consistent white space following Apple's 8pt grid system:

| Token | Value | Usage |
|-------|-------|-------|
| `--space-1` | 4px | Tight spacing |
| `--space-2` | 8px | Icon gaps |
| `--space-3` | 12px | Small gaps |
| `--space-4` | 16px | Standard padding |
| `--space-5` | 24px | Section spacing |
| `--space-6` | 32px | Large gaps |
| `--space-8` | 48px | Section breaks |
| `--space-10` | 64px | Major sections |

### Responsive Padding

```css
.container-hig {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 16px;
}

.section-hig {
  padding: 64px 0;
}
```

---

## Border Radius (Clean & Consistent)

### Apple HIG Standard Radius

Following Apple's design language with clean, consistent radius:

| Class | Value | Usage |
|-------|-------|-------|
| `--radius` | 8px (0.5rem) | Base radius |
| `rounded-sm` | 6px | Small elements |
| `rounded-md` | 8px | Cards, inputs |
| `rounded-lg` | 12px | Buttons, modals |
| `rounded-full` | 9999px | Pills, avatars |

### Component Patterns

```tsx
// Button - rounded-lg for clean look
<button className="rounded-lg px-4 py-2 bg-blue text-white">
  Action
</button>

// Card - rounded-lg with subtle border
<div className="rounded-lg border border-border bg-card p-4">
  Content
</div>

// Input - rounded-md
<input className="rounded-md border border-border px-3 py-2" />
```

---

## Shadows

### Minimal Shadows (Apple Style)

Apple HIG uses subtle, minimal shadows:

```css
.shadow-sm {
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
}

.shadow-md {
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
}

.shadow-lg {
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
}
```

---

## Animations (Depth Principle)

### Purposeful Motion

Apple HIG animations are subtle and purposeful, conveying depth:

```css
/* Fade in - Clarity */
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

/* Slide up - Depth */
@keyframes slideUp {
  from { 
    opacity: 0; 
    transform: translateY(8px); 
  }
  to { 
    opacity: 1; 
    transform: translateY(0); 
  }
}

/* Scale in - Focus */
@keyframes scaleIn {
  from { 
    opacity: 0; 
    transform: scale(0.96); 
  }
  to { 
    opacity: 1; 
    transform: scale(1); 
  }
}
```

### Animation Durations

| Duration | Value | Usage |
|----------|-------|-------|
| Fast | 150ms | Micro-interactions |
| Normal | 250ms | Standard transitions |
| Slow | 350ms | Emphasis, reveal |

---

## Implementation

### CSS Variables (globals.css)

```css
:root {
  /* Core Colors */
  --color-black: #000000;
  --color-white: #ffffff;
  --color-blue: #007AFF;
  
  /* Semantic Tokens - Light Mode */
  --background: 0 0% 100%;
  --foreground: 0 0% 0%;
  --primary: 211 100% 50%;
  --primary-foreground: 0 0% 100%;
  --card: 0 0% 100%;
  --card-foreground: 0 0% 0%;
  --border: 0 0% 90%;
  
  /* Radius */
  --radius: 0.5rem;
}

.dark {
  --background: 0 0% 0%;
  --foreground: 0 0% 100%;
  --primary: 211 100% 60%;
  --primary-foreground: 0 0% 0%;
  --card: 0 0% 8%;
  --card-foreground: 0 0% 100%;
  --border: 0 0% 20%;
}
```

### Tailwind Configuration

```ts
// tailwind.config.ts
export default {
  theme: {
    extend: {
      colors: {
        black: "#000000",
        white: "#ffffff",
        blue: "#007AFF",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
    },
  },
}
```

---

## Design Principles Applied

### 1. Clarity
- Text is legible at every size
- Icons are precise and simple
- White space is generous and intentional
- No visual clutter or ambiguity

### 2. Deference
- Content takes precedence over decoration
- UI elements are subtle and supportive
- Color is used purposefully (blue for actions)
- No gradients - solid colors only

### 3. Depth
- Subtle shadows create visual hierarchy
- Motion conveys relationships between elements
- Cards have slight elevation
- Focus states are clearly visible
