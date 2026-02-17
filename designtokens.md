# Design Token System Documentation

## Overview

This document outlines the comprehensive design token system for the Budget Ndio Story application. The design system is built on a foundation of semantic color tokens, custom typography with unique brand fonts, and a flexible spacing scale. It supports both light and dark modes while maintaining a consistent visual language across all pages and components.

The design tokens are implemented using CSS custom properties (CSS variables) in combination with Tailwind CSS utility classes. This approach provides flexibility for theming while maintaining compile-time optimization. The system is framework-agnostic and can be adapted to any JavaScript framework or design tool.

---

## Table of Contents

1. [Color System](#color-system)
2. [Typography](#typography)
3. [Spacing](#spacing)
4. [Border Radius](#border-radius)
5. [Shadows](#shadows)
6. [Breakpoints & Responsive Design](#breakpoints--responsive-design)
7. [Component Patterns](#component-patterns)
8. [Icon System](#icon-system)
9. [Animation & Motion](#animation--motion)
10. [Usage Guidelines](#usage-guidelines)

---

## Color System

### Semantic Color Tokens

The color system uses HSL (Hue, Saturation, Lightness) values for semantic tokens, allowing for easy light/dark mode transitions and color manipulation. These tokens are defined in [`styles/globals.css`](styles/globals.css:21) and mapped to Tailwind utilities in [`tailwind.config.ts`](tailwind.config.ts:14).

#### Light Mode Colors

| Token | HSL Value | Hex Approximation | Usage |
|-------|-----------|-------------------|-------|
| `--background` | `0 0% 100%` | `#ffffff` | Page backgrounds, main canvas |
| `--foreground` | `222.2 84% 4.9%` | `#0f1729` | Primary text, headings |
| `--card` | `0 0% 100%` | `#ffffff` | Card surfaces |
| `--card-foreground` | `222.2 84% 4.9%` | `#0f1729` | Text on card surfaces |
| `--popover` | `0 0% 100%` | `#ffffff` | Dropdown backgrounds |
| `--popover-foreground` | `222.2 84% 4.9%` | `#0f1729` | Text in popovers |
| `--primary` | `222.2 47.4% 11.2%` | `#1e293b` | Primary actions, CTAs |
| `--primary-foreground` | `210 40% 98%` | `#f8fafc` | Text on primary surfaces |
| `--secondary` | `210 40% 96.1%` | `#f1f5f9` | Secondary backgrounds |
| `--secondary-foreground` | `222.2 47.4% 11.2%` | `#1e293b` | Secondary text |
| `--muted` | `210 40% 96.1%` | `#f1f5f9` | Muted backgrounds |
| `--muted-foreground` | `215.4 16.3% 46.9%` | `#64748b` | Muted text, placeholders |
| `--accent` | `210 40% 96.1%` | `#f1f5f9` | Accent backgrounds |
| `--accent-foreground` | `222.2 47.4% 11.2%` | `#1e293b` | Accent text |
| `--destructive` | `0 84.2% 60.2%` | `#ef4444` | Error states, delete actions |
| `--destructive-foreground` | `210 40% 98%` | `#f8fafc` | Text on destructive surfaces |
| `--border` | `214.3 31.8% 91.4%` | `#e2e8f0` | Borders, dividers |
| `--input` | `214.3 31.8% 91.4%` | `#e2e8f0` | Form input backgrounds |
| `--ring` | `222.2 84% 4.9%` | `#0f1729` | Focus rings |

#### Dark Mode Colors

Dark mode colors are activated when the `.dark` class is present on the `html` element. The theme provider component at [`components/theme-provider.tsx`](components/theme-provider.tsx:1) handles class switching.

| Token | HSL Value | Hex Approximation | Usage |
|-------|-----------|-------------------|-------|
| `--background` | `222.2 84% 4.9%` | `#0f1729` | Page backgrounds |
| `--foreground` | `210 40% 98%` | `#f8fafc` | Primary text |
| `--card` | `222.2 84% 4.9%` | `#0f1729` | Card surfaces |
| `--card-foreground` | `210 40% 98%` | `#f8fafc` | Text on cards |
| `--primary` | `210 40% 98%` | `#f8fafc` | Primary actions |
| `--primary-foreground` | `222.2 47.4% 11.2%` | `#1e293b` | Text on primary |
| `--secondary` | `217.2 32.6% 17.5%` | `#1e293b` | Secondary surfaces |
| `--muted` | `217.2 32.6% 17.5%` | `#1e293b` | Muted backgrounds |
| `--muted-foreground` | `215 20.2% 65.1%` | `#94a3b8` | Muted text |
| `--destructive` | `0 62.8% 30.6%` | `#7f1d1d` | Error states |
| `--border` | `217.2 32.6% 17.5%` | `#1e293b` | Borders |
| `--ring` | `212.7 26.8% 83.9%` | `#cbd5e1` | Focus rings |

### Brand Colors

Beyond the semantic token system, the application uses specific brand colors for visual identity and accent purposes. These are defined as legacy colors in [`tailwind.config.ts`](tailwind.config.ts:46) for backward compatibility.

| Token | Hex Value | Usage |
|-------|-----------|-------|
| `secondry` | `#212121` | Primary brand color for text, buttons, borders |
| `marquee` | `#ffffff` | White background for marquee sections |
| `about` | `#000000` | Black background for about sections |

### Brand Accent Colors

The application uses additional accent colors for specific features and visual elements:

| Color | Hex Value | Usage |
|-------|-----------|-------|
| Brand Green | `#00aa55` | Primary accent, success states, CTAs |
| Brand Green Light | `#00cc66` | Hover states for green accent |
| Brand Red/Pink | `#ff2f55` | Secondary accent, featured content |
| Lime Green | `#BFDA62` | Decorative elements, presentation page |
| Light Lime | `#B8D5E` | Subtle decorative variations |
| Teal | `#145B52` | Services page accents |

### Functional Color Usage

The color system follows consistent patterns across the application:

- **Primary text** uses `#212121` (dark gray) for optimal readability
- **Secondary text** uses opacity variations like `#212121/70`, `#212121/60`, `#212121/50` for hierarchy
- **Borders** use `#21212122` (hex with alpha) for subtle dividers
- **Interactive elements** use full `#212121` with hover transitions to lighter or darker states
- **Cards** use white with subtle borders `#212121/8` transitioning to `#212121/15` on hover

---

## Typography

### Font Families

The application uses two custom brand fonts loaded via `@font-face` in [`styles/globals.css`](styles/globals.css:85):

#### Founders Grotesk

A distinctive grotesque sans-serif font used for headings and display text.

- **Usage**: Headings, titles, hero text
- **Tailwind Class**: `font-FoundersGrotesk`
- **CSS Declaration**: `font-family: 'FoundersGrotesk', sans-serif;`
- **Weight**: Semi-bold (600) for primary headings
- **File**: Loaded from `fonts/FoundersGrotesk.woff`

#### Neue Montreal

A clean, modern sans-serif used for body text, UI elements, and paragraphs.

- **Usage**: Body text, buttons, navigation, paragraphs
- **Tailwind Class**: `font-NeueMontreal`
- **CSS Declaration**: `font-family: 'NeueMontreal', sans-serif;`
- **Weight**: Regular (400) and Medium (500)
- **File**: Loaded from `fonts/NeueMontreal.woff`

### Typography Scale

The typography system uses responsive utility classes defined in [`styles/globals.css`](styles/globals.css:105). These classes automatically adjust font sizes based on viewport breakpoints.

#### Heading Classes

| Class | Desktop (xl) | Large (lg) | Medium (md) | Small (sm) | Extra Small (xm) |
|-------|--------------|------------|-------------|------------|------------------|
| `.heading` | 150px / 100px | 130px / 98px | 100px / 75px | 74px / 50px | 64px / 45px |
| `.sub-heading` | 55px / 55px | 52px / 52px | 52px / 52px | 40px / 40px | 31px / 31px |

**Usage in components:**
```tsx
<h1 className="heading tracking-[-1.3px] text-[#212121] font-semibold font-FoundersGrotesk uppercase">
  Main Heading
</h1>
<h2 className="sub-heading font-normal tracking-[-1.3px] text-[#212121] font-NeueMontreal">
  Sub Heading
</h2>
```

#### Paragraph Classes

| Class | Desktop (xl) | Tablet & Below |
|-------|--------------|----------------|
| `.paragraph` | 18px / 26px | 16px / 24px |
| `.sub-paragraph` | 21px / 31px | 16px / 24px |
| `.small-text` | 16px / 24px | 14px / 22px |

**Usage in components:**
```tsx
<p className="paragraph font-NeueMontreal text-[#212121]/70">
  Main paragraph text
</p>
<p className="small-text font-NeueMontreal text-[#212121]/50">
  Small caption text
</p>
```

### Font Weight Usage

| Weight | Value | Usage |
|--------|-------|-------|
| Normal | 400 | Body text, paragraphs |
| Medium | 500 | Emphasized body text, buttons |
| Semi-bold | 600 | Headings (Founders Grotesk) |

### Letter Spacing

The design system uses negative letter spacing for display text to create a modern, editorial feel:

- **Headings**: `tracking-[-1.3px]` for tight, impactful headlines
- **Small text**: `tracking-[0.15em]` for uppercase labels and tags
- **Default**: Normal tracking for body text

---

## Spacing

### Responsive Padding System

The spacing system uses responsive padding utilities defined in [`styles/globals.css`](styles/globals.css:96):

#### Horizontal Padding (`.padding-x`)

| Breakpoint | Value |
|------------|-------|
| Default (xl) | 50px |
| Large (lg) | 50px |
| Medium (md) | 30px |
| Small (sm) | 20px |
| Extra Small (xm) | 20px |

#### Vertical Padding (`.padding-y`)

| Breakpoint | Value |
|------------|-------|
| Default (xl) | 100px |
| Large (lg) | 80px |
| Medium (md) | 60px |
| Small (sm) | 40px |
| Extra Small (xm) | 40px |

#### Vertical Margin (`.margin`)

| Breakpoint | Top Margin | Bottom Margin |
|------------|------------|---------------|
| Default (xl) | 170px | 130px |
| Large (lg) | 80px | 80px |
| Medium (md) | 60px | 60px |
| Small (sm) | 40px | 40px |
| Extra Small (xm) | 40px | 40px |

### Component Spacing

Standard spacing values used throughout components:

| Token | Value | Usage |
|-------|-------|-------|
| `--space-xs` | 4px | Tight spacing, icon gaps |
| `--space-sm` | 8px | Small gaps, inline elements |
| `--space-md` | 16px | Standard component padding |
| `--space-lg` | 24px | Section spacing |
| `--space-xl` | 32px | Large section gaps |
| `--space-2xl` | 48px | Hero section spacing |
| `--space-3xl` | 64px | Major section breaks |

### Grid Gap Values

Common gap values used in grid layouts:

| Class | Value | Usage |
|-------|-------|-------|
| `gap-[10px]` | 10px | Tight grids |
| `gap-[12px]` | 12px | Card grids |
| `gap-[14px]` | 14px | Standard grids |
| `gap-[16px]` | 16px | Content grids |
| `gap-[20px]` | 20px | Section elements |
| `gap-[30px]` | 30px | Large separations |

---

## Border Radius

### Base Radius Token

The base border radius is defined as a CSS custom property in [`styles/globals.css`](styles/globals.css:41):

```css
--radius: 0.5rem; /* 8px */
```

### Tailwind Radius Classes

Border radius values mapped in [`tailwind.config.ts`](tailwind.config.ts:50):

| Class | Value | Calculation |
|-------|-------|-------------|
| `rounded-sm` | 4px | `--radius - 4px` |
| `rounded-md` | 6px | `--radius - 2px` |
| `rounded-lg` | 8px | `--radius` |
| `rounded-xl` | 12px | `--radius + 4px` |
| `rounded-2xl` | 16px | `--radius + 8px` |
| `rounded-3xl` | 24px | `--radius + 16px` |

### Custom Radius Values

The codebase uses specific radius values beyond Tailwind defaults:

| Class | Value | Usage |
|-------|-------|-------|
| `rounded-[10px]` | 10px | Image cards, small containers |
| `rounded-[12px]` | 12px | Course cards, feature boxes |
| `rounded-[15px]` | 15px | Image containers |
| `rounded-[16px]` | 16px | Content cards |
| `rounded-[20px]` | 20px | Sections, large cards |
| `rounded-[22px]` | 22px | Feature cards |
| `rounded-[24px]` | 24px | Featured content |
| `rounded-[26px]` | 26px | Stat cards |
| `rounded-[28px]` | 28px | Hero sections |
| `rounded-[30px]` | 30px | Large containers |
| `rounded-[32px]` | 32px | CTA sections |

### Pill & Circle Shapes

| Class | Value | Usage |
|-------|-------|-------|
| `rounded-full` | 9999px | Buttons, tags, pills |
| `rounded-[50px]` | 50px | Custom pill shapes |
| `rounded-[50px]` | 50px | Tag components |

### Radius Usage by Component

| Component | Radius | File Reference |
|-----------|--------|----------------|
| Buttons | `rounded-full` (pill) | [`components/Button.tsx`](components/Button.tsx:9) |
| Tags | `rounded-[50px]` | [`components/Tags.tsx`](components/Tags.tsx:15) |
| Cards | `rounded-[20px]` to `rounded-[28px]` | Various containers |
| Images | `rounded-[10px]` to `rounded-[20px]` | Various image wrappers |
| Input fields | `rounded-[5px]` | Forms |
| Sections | `rounded-t-[20px]` | Page sections |

---

## Shadows

### Tailwind Shadow Classes

The application uses Tailwind's default shadow scale with custom accent shadows for specific brand colors:

| Class | Definition | Usage |
|-------|-----------|-------|
| `shadow-sm` | `0 1px 2px 0 rgb(0 0 0 / 0.05)` | Subtle elevation |
| `shadow-md` | `0 4px 6px -1px rgb(0 0 0 / 0.1)` | Cards, dropdowns |
| `shadow-lg` | `0 10px 15px -3px rgb(0 0 0 / 0.1)` | Modals, popovers |
| `shadow-xl` | `0 20px 25px -5px rgb(0 0 0 / 0.1)` | Large elements |
| `shadow-2xl` | `0 25px 50px -12px rgb(0 0 0 / 0.25)` | Hero elements |

### Custom Shadow Values

The codebase defines specific shadow values using arbitrary values:

| Class | Definition | Usage |
|-------|-----------|-------|
| `shadow-[0_20px_60px_rgba(0,0,0,0.4)]` | Large card hover | Course cards |
| `shadow-[0_25px_80px_rgba(0,0,0,0.12)]` | Featured content | Hero sections |
| `shadow-[0_20px_60px_rgba(0,0,0,0.08)]` | Subtle card hover | Grid cards |
| `shadow-lg shadow-[#212121]/10` | Brand shadow | Active buttons |

### Accent Color Shadows

Brand-colored shadows for emphasis:

| Class | Definition | Usage |
|-------|-----------|-------|
| `shadow-green-500/20` | Green glow | Progress indicators |
| `shadow-blue-500/20` | Blue glow | Feature highlights |
| `shadow-orange-500/20` | Orange glow | Warning states |
| `shadow-purple-500/20` | Purple glow | Special features |
| `shadow-red-500/10` | Subtle red | Error states |
| `shadow-white/10` | White glow | Dark mode elements |

### Shadow Usage Patterns

Cards use a consistent hover elevation pattern:

```tsx
className="rounded-[20px] bg-white border border-[#212121]/8 
  hover:border-[#212121]/15 hover:shadow-[0_20px_60px_rgba(0,0,0,0.1)] 
  transition-all duration-300"
```

---

## Breakpoints & Responsive Design

### Custom Breakpoint System

The application uses custom breakpoints defined in [`tailwind.config.ts`](tailwind.config.ts:82) for precise control:

| Breakpoint | Min Width | Max Width | Class Prefix |
|------------|-----------|------------|--------------|
| xm | 0 | 400px | `xm:` |
| sm | 401px | 768px | `sm:` or `smOnly:` |
| md | 769px | 1024px | `md:` or `mdOnly:` |
| lg | 1025px | 1490px | `lg:` or `lgOnly:` |
| xl | 1491px | ∞ | `xl:` or default |

### Responsive Class Usage

The system uses both inclusive and exclusive breakpoint prefixes:

- **Inclusive** (`xm:`, `sm:`, `md:`, `lg:`, `xl:`): Applies at and above the breakpoint
- **Exclusive** (`xmOnly:`, `smOnly:`, `mdOnly:`, `lgOnly:`, `xlOnly:`): Applies only within the breakpoint range

Example from [`styles/globals.css`](styles/globals.css:106):
```css
.heading {
  @apply text-[150px] leading-[100px] 
    lgOnly:text-[130px] lgOnly:leading-[98px] 
    mdOnly:text-[100px] mdOnly:leading-[75px] 
    smOnly:text-[74px] smOnly:leading-[50px] 
    xm:text-[64px] xm:leading-[45px];
}
```

### Mobile-First Approach

The design follows a mobile-first philosophy:

1. **Base styles** target mobile (xm) viewport
2. **Progressive enhancement** adds larger sizes for tablets and desktops
3. **Touch-friendly** tap targets minimum 44px
4. **Content优先** text remains readable at all sizes

---

## Component Patterns

### Button Components

#### Standard Button ([`components/Button.tsx`](components/Button.tsx:1))

A pill-shaped button with an animated arrow icon that appears on hover.

- **Border Radius**: `rounded-[50px]`
- **Padding**: `py-[3px] px-[12px]`
- **Font**: `small-text font-NeueMontreal uppercase`
- **Border**: `border border-[#21212199]`
- **Hover Effect**: Background transitions to brand color (`secondry`)
- **Transition**: `transition-all duration-300 ease-in-out`

#### Round Button ([`components/RoundButton.tsx`](components/RoundButton.tsx:1))

A fully rounded button with icon animation.

- **Shape**: `rounded-full`
- **Icon**: `ArrowUpRight` from Lucide React
- **Hover Animation**: Icon scales from 0 to 1
- **Customizable**: Supports custom background color via `bgcolor` prop

#### Tag Component ([`components/Tags.tsx`](components/Tags.tsx:1))

Pill-shaped tags for categorization and navigation.

- **Border Radius**: `rounded-[50px]`
- **Padding**: `py-[2px] px-[15px]`
- **Font**: `small-text font-NeueMontreal uppercase`
- **Usage**: Category labels, filters, metadata

### Card Components

#### Standard Card Pattern

Used throughout the application for content cards:

```tsx
className="rounded-[20px] bg-white border border-[#212121]/8 
  p-[20px] hover:border-[#212121]/15 hover:shadow-[0_20px_60px_rgba(0,0,0,0.08)] 
  transition-all duration-300"
```

#### Featured Card Pattern

For highlighted content:

```tsx
className="rounded-[24px] overflow-hidden bg-white border border-[#212121]/8 
  hover:border-[#212121]/15 transition-all duration-300 
  hover:shadow-[0_25px_80px_rgba(0,0,0,0.1)]"
```

### Form Components

#### Input Fields

Standard input styling:

```tsx
className="w-full p-[10px] border border-gray-300 rounded-[5px] 
  focus:ring-2 focus:ring-black focus:border-transparent"
```

#### Textarea

Multi-line input:

```tsx
className="w-full p-[10px] border border-gray-300 rounded-[5px] 
  focus:ring-2 focus:ring-black focus:border-transparent resize-none"
```

#### Underline Style Inputs

Used on dark backgrounds:

```tsx
className="w-full bg-transparent border-b border-[#21212155] 
  focus:border-secondry outline-none py-[10px] transition duration-200"
```

### Navigation Components

#### Navbar ([`components/Navbar.tsx`](components/Navbar.tsx:1))

- Fixed position at top
- Z-index: 50 for layering
- Background: Semi-transparent with blur

#### Mobile Navigation ([`components/MobileNav.tsx`](components/MobileNav.tsx:1))

- Slide-in from right
- Full viewport height
- Overlay background with opacity

### Layout Components

#### Section Wrappers

Page sections use consistent patterns:

```tsx
<section className="w-full padding-y rounded-t-[20px] bg-background">
  {/* Section content */}
</section>
```

#### Grid Layouts

Responsive grid system:

```tsx
className="grid grid-cols-4 gap-[12px] 
  mdOnly:grid-cols-2 
  smOnly:grid-cols-2 
  xm:grid-cols-2"
```

---

## Icon System

### Primary Icon Library

The application uses **Lucide React** as the primary icon library. This provides a consistent, lightweight icon set.

#### Import Pattern

```tsx
import { IconName } from "lucide-react";
```

#### Common Icons Used

| Icon | Component | Usage |
|------|-----------|-------|
| ArrowUpRight | `lucide-react` | Button arrows, links |
| Play | `lucide-react` | Video playback |
| Check | `lucide-react` | Success states |
| Plus | `lucide-react` | Add actions |
| Users | `lucide-react` | Community sections |

#### Icon Sizing

| Size | Value | Usage |
|------|-------|-------|
| Small | 16px / `size={16}` | Inline icons, badges |
| Default | 20px / `size={20}` | Standard icons |
| Medium | 24px / `size={24}` | Featured icons |
| Large | 32px / `size={32}` | Hero icons |
| XL | 48px / `size={48}` | Featured sections |

#### Icon Stroke Width

| Usage | Stroke Width |
|-------|--------------|
| Default icons | 1.25px |
| Featured icons | 1.5px |
| Large icons | 2px |

### Emoji Usage

Emojis are used for category icons and visual flair:

| Emoji | Usage |
|-------|-------|
| 🎙️ | Podcasts |
| 🎬 | Videos/Shorts |
| 📚 | Courses |
| ⚡ | Quick actions |
| 🔍 | Search, analysis |
| 🗣️ | Community |
| 🎯 | Goals, clarity |
| 🚀 | Action-oriented |

---

## Animation & Motion

### Transition Utilities

The application defines standard transition durations and easing:

| Token | Value | Usage |
|-------|-------|-------|
| Default | `duration-300` / 300ms | Standard interactions |
| Fast | `duration-200` / 200ms | Quick feedback |
| Slow | `duration-500` / 500ms | Emphasis, reveal |
| Very Slow | `duration-800` / 800ms | Page transitions |

### Easing Functions

| Token | Cubic Bezier | Usage |
|-------|--------------|-------|
| Default | `ease-in-out` | Standard transitions |
| Expo | `cubic-bezier(0.19, 1, 0.22, 1)` | Link animations |
| Custom | `cubic-bezier(.215,.61,.355,1)` | Button transforms |

### Animation Classes

#### Fade Up

Used for scroll-triggered content reveal:

```tsx
<FadeUp delay={0.1} duration={0.8}>
  {/* Content */}
</FadeUp>
```

#### Card Animation

```tsx
data-animate="card"
className="transition-all duration-300"
```

#### Hover Effects

Standard hover transition:
```tsx
className="hover:scale-[0.99] transition-transform duration-300"
```

### Animation Libraries

The application uses multiple animation approaches:

1. **Framer Motion**: Primary animation library for complex sequences
2. **CSS Transitions**: Simple hover and state changes
3. **Tailwind Animation Utilities**: Predefined animations like shimmer

#### Shimmer Effect

Loading state animation:

```tsx
className="animate-shimmer bg-gradient-to-r from-gray-100 via-gray-50 to-gray-100 
  bg-[length:200%_100%]"
```

Keyframes defined in [`tailwind.config.ts`](tailwind.config.ts:67):

```js
keyframes: {
  shimmer: {
    "0%": { backgroundPosition: "-200% 0" },
    "100%": { backgroundPosition: "200% 0" },
  },
}
```

---

## Usage Guidelines

### Applying Design Tokens

#### Colors

Use semantic tokens for consistent theming:

```tsx
// ✅ Recommended - uses semantic tokens
<div className="bg-background text-foreground">
  Content
</div>

// ✅ Brand color for specific elements
<button className="bg-[#212121] text-white">
  Action
</button>

// ❌ Avoid hardcoded colors for common elements
<div className="bg-white text-black">
  Content
</div>
```

#### Typography

Follow the type scale consistently:

```tsx
// ✅ Headings use Founders Grotesk
<h1 className="heading font-FoundersGrotesk">Title</h1>

// ✅ Body text uses Neue Montreal
<p className="paragraph font-NeueMontreal">Content</p>

// ✅ Small text for metadata
<span className="small-text font-NeueMontreal">Metadata</span>
```

#### Spacing

Use the predefined spacing system:

```tsx
// ✅ Section padding
<section className="padding-x padding-y">
  Content
</section>

// ✅ Card padding
<div className="p-[20px]">
  Content
</div>

// ✅ Grid gaps
<div className="grid gap-[16px]">
  Items
</div>
```

### Responsive Implementation

```tsx
// ✅ Responsive typography
<h1 className="text-[150px] lgOnly:text-[130px] mdOnly:text-[100px] smOnly:text-[74px] xm:text-[64px]">
  Responsive Heading
</h1>

// ✅ Responsive grids
<div className="grid grid-cols-4 mdOnly:grid-cols-2 smOnly:grid-cols-1">
  Items
</div>
```

### Component Composition

Build complex components using the design tokens:

```tsx
export function FeatureCard({ title, description, icon }) {
  return (
    <div className="
      rounded-[20px] 
      bg-white 
      border border-[#212121]/8 
      p-[24px] 
      hover:border-[#212121]/15 
      hover:shadow-[0_20px_60px_rgba(0,0,0,0.08)] 
      transition-all duration-300
    ">
      <div className="w-12 h-12 rounded-xl bg-[#212121]/10 flex items-center justify-center mb-4">
        {icon}
      </div>
      <h3 className="text-[18px] font-FoundersGrotesk font-medium text-[#212121]">
        {title}
      </h3>
      <p className="paragraph font-NeueMontreal text-[#212121]/70 mt-[8px]">
        {description}
      </p>
    </div>
  );
}
```

### Dark Mode Implementation

```tsx
// Automatic dark mode support via semantic tokens
<div className="bg-background text-foreground border-border">
  Content adapts to theme
</div>

// Explicit dark mode styles
<div className="dark:bg-[#111] dark:text-white">
  Dark specific styles
</div>
```

---

## File Reference

| File | Purpose |
|------|---------|
| [`styles/globals.css`](styles/globals.css) | CSS variables, base styles, utility classes |
| [`tailwind.config.ts) | Tailwind configurationtailwind.config.ts`](, theme extension |
| [`components/theme-provider.tsx`](components/theme-provider.tsx) | Dark mode provider |
| [`components/Button.tsx`](components/Button.tsx) | Standard button component |
| [`components/RoundButton.tsx`](components/RoundButton.tsx) | Rounded button with icon |
| [`components/Tags.tsx`](components/Tags.tsx) | Tag/category component |
| [`components/Navbar.tsx`](components/Navbar.tsx) | Main navigation |
| [`components/MobileNav.tsx`](components/MobileNav.tsx) | Mobile navigation |

---

## Design Principles

The design system follows these core principles:

1. **Consistency**: Every element uses tokens from this system
2. **Scalability**: Tokens can be updated in one place
3. **Accessibility**: Semantic tokens ensure sufficient contrast
4. **Performance**: CSS variables enable theming without rebuilds
5. **Flexibility**: Custom values extend the base system

---

*Last Updated: February 2026*
*Version: 1.0*
*Application: Budget Ndio Story - Kenyan Budget Transparency Platform*
