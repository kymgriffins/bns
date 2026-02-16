# Budget Ndio Story - HTML Files Documentation

## Overview

This documentation covers all 8 HTML files located in the `public/` directory. These files represent mobile application screens for "Budget Ndio Story," a Kenyan budget transparency platform designed to make government budgets accessible to young citizens.

---

## File Inventory

| File | Purpose |
|------|---------|
| `about:_mission_&_partners/code.html` | Mission statement and partner information page |
| `budget_insights:_sector_analysis/code.html` | Budget insights with sector analysis and voting |
| `budget_reports:_simplified_briefs/code.html` | Simplified budget report cards with search/filter |
| `budget_tracker:_delivery_tracking/code.html` | Project delivery tracking with progress indicators |
| `home:_follow_the_budget/code.html` | Main landing/home page |
| `learn:_budget_101_basics/code.html` | Educational module for budget basics |
| `news:_stories_&_updates/code.html` | News feed with stories, videos, and updates |
| `take_action:_youth_participation/code.html` | Action pathways for youth engagement |

---

## Part 1: Styling Documentation

### 1.1 Design System

#### Color Palette

| Color Name | Hex Code | Usage |
|------------|----------|-------|
| `primary` | `#30e87a` | Main accent color (green) |
| `background-light` | `#f6f8f7` | Light mode background |
| `background-dark` | `#112117` | Dark mode background |
| `neutral-800` | `#1a2e22` | Dark mode card backgrounds |
| `neutral-900` | `#0a130e` | Deep dark backgrounds |
| Red/Orange variants | `#ef4444`, `#f97316` | Warning/delayed states |

#### Typography

- **Primary Font**: Manrope (Google Fonts)
  - Weights: 300, 400, 500, 600, 700, 800
  - Usage: All body text, headings
- **Fallback**: sans-serif
- **Icon Font**: Material Icons / Material Symbols Outlined

#### Tailwind Configuration

All files share a common Tailwind configuration:

```javascript
tailwind.config = {
    darkMode: "class",
    theme: {
        extend: {
            colors: {
                "primary": "#30e87a",
                "background-light": "#f6f8f7",
                "background-dark": "#112117",
            },
            fontFamily: {
                "display": ["Manrope"]
            },
            borderRadius: {
                "DEFAULT": "0.25rem",
                "lg": "0.5rem",
                "xl": "0.75rem",
                "full": "9999px"
            },
        },
    },
}
```

### 1.2 Common CSS Patterns

#### Scrollbar Hiding

```css
.hide-scrollbar::-webkit-scrollbar { display: none; }
.hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
```

#### iOS-Style Blur Effects

```css
.ios-blur {
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
}
```

#### Progress Line Animation (Tracker Page)

```css
.progress-line {
    height: 2px;
    background: rgba(48, 232, 122, 0.2);
    position: absolute;
    top: 12px;
    left: 0;
    right: 0;
    z-index: 0;
}
.progress-line-active {
    height: 2px;
    background: #30e87a;
    position: absolute;
    top: 12px;
    left: 0;
    z-index: 1;
}
```

#### Glass Card Effect (News Page)

```css
.glass-card {
    background: rgba(48, 232, 122, 0.05);
    backdrop-filter: blur(10px);
    border: 1px solid rgba(48, 232, 122, 0.1);
}
```

### 1.3 Responsive Design

All pages use a **mobile-first approach** with a maximum width container:

```html
<!-- Standard mobile wrapper -->
<div class="max-w-md mx-auto min-h-screen">
<!-- iPhone aspect ratio container -->
<div class="w-full max-w-[430px] min-h-screen">
```

### 1.4 Component Styling Patterns

#### Buttons

- **Primary**: `bg-primary text-background-dark font-bold py-3 rounded-lg`
- **Secondary**: `border border-primary/30 text-primary`
- **Icon Button**: `w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center`
- **States**: `hover:opacity-90 active:scale-95 transition-all`

#### Cards

- **Standard Card**: `bg-white dark:bg-neutral-800 p-5 rounded-2xl border border-neutral-200 dark:border-primary/10 shadow-sm`
- **Featured Card**: `bg-gradient-to-br from-background-dark to-[#1a2e22] rounded-xl p-6 shadow-xl`

#### Input Fields

- **Search**: `bg-slate-200 dark:bg-primary/5 border-0 rounded-xl py-4 pl-12 pr-4 text-sm focus:ring-2 focus:ring-primary/50`

#### Navigation (iOS Tab Bar Style)

```html
<nav class="fixed bottom-0 left-0 right-0 bg-background-dark/80 backdrop-blur-lg border-t border-white/5 px-8 pt-4 pb-8 flex justify-between items-center">
    <button class="flex flex-col items-center gap-1 text-slate-500">
        <span class="material-icons">home</span>
        <span class="text-[10px] font-bold">Home</span>
    </button>
</nav>
```

### 1.5 Visual Effects

- **Backdrop Blur**: `backdrop-blur-md` / `backdrop-blur-lg`
- **Shadows**: `shadow-2xl`, `shadow-lg shadow-primary/40`
- **Gradients**: `bg-gradient-to-t from-background-dark via-background-dark to-transparent`
- **Animations**: `animate-pulse`, `transition-all duration-500`
- **Grayscale Hover**: `grayscale hover:grayscale-0 transition-all duration-500`

---

## Part 2: Data Documentation

### 2.1 Form Fields

#### Email Subscription Form (About Page)

```html
<form class="space-y-3" onsubmit="return false;">
    <input 
        class="w-full bg-background-dark/10 border-background-dark/20 focus:ring-background-dark focus:border-background-dark rounded-lg text-background-dark placeholder-background-dark/50 text-sm font-medium p-3" 
        placeholder="Email address" 
        type="email"
    />
    <button class="w-full bg-background-dark text-white font-bold py-3 rounded-lg">
        Subscribe
    </button>
</form>
```

**Data Structure:**
- Field: `email` (email type)
- Validation: HTML5 email validation
- Action: `onsubmit="return false;"` (currently non-functional)

#### Search Input (Reports Page)

```html
<input 
    class="w-full bg-slate-200 dark:bg-primary/5 border-0 rounded-xl py-4 pl-12 pr-4 text-sm focus:ring-2 focus:ring-primary/50 transition-all placeholder:text-slate-500" 
    placeholder="Search by county or keyword..." 
    type="text"
/>
```

**Data Structure:**
- Field: Search query (text)
- Placeholder: "Search by county or keyword..."

### 2.2 Interactive Elements

#### Segmented Controls

**Insights Page (National/County/Sector):**
```html
<div class="bg-primary/5 dark:bg-white/5 p-1 rounded-xl flex mb-8">
    <button class="flex-1 py-2 text-sm font-semibold rounded-lg bg-primary text-background-dark shadow-sm">National</button>
    <button class="flex-1 py-2 text-sm font-semibold text-slate-500">County</button>
    <button class="flex-1 py-2 text-sm font-semibold text-slate-500">Sector</button>
</div>
```

**News Page (Stories/Videos/Updates):**
```html
<div class="flex p-1 bg-primary/10 rounded-xl">
    <button class="flex-1 py-2 text-sm font-bold rounded-lg bg-primary text-background-dark shadow-sm">Stories</button>
    <button class="flex-1 py-2 text-sm font-semibold text-primary/70">Videos</button>
    <button class="flex-1 py-2 text-sm font-semibold text-primary/70">Updates</button>
</div>
```

#### Filter Chips (Tracker Page)

```html
<button class="px-5 py-2.5 rounded-full bg-primary text-background-dark font-bold whitespace-nowrap text-sm">
    All Sectors
</button>
<button class="px-5 py-2.5 rounded-full bg-primary/10 border border-primary/20 text-white font-medium whitespace-nowrap text-sm">
    Youth Livelihoods
</button>
```

#### Quick Poll (Insights Page)

```html
<div class="flex gap-2">
    <button class="flex-1 py-2 bg-background-dark text-white rounded-lg text-xs font-bold">Ndio (Yes)</button>
    <button class="flex-1 py-2 border border-background-dark/20 text-background-dark rounded-lg text-xs font-bold">La (No)</button>
</div>
```

### 2.3 Data Display Structures

#### Budget Progress Cards (Tracker Page)

Each card displays:
- **Category**: e.g., "Youth Livelihoods", "Health"
- **Project Title**: e.g., "Youth Fund Distribution"
- **Status**: "ON TRACK", "Delayed", "Completed"
- **Progress Stages**: ALLOCATED → RELEASED → DELIVERED
- **Evidence Notes**: User-submitted evidence

**Data Structure Example:**
```javascript
{
    category: "Youth Livelihoods",
    title: "Youth Fund Distribution",
    status: "ON TRACK",
    progress: {
        allocated: true,
        released: true,
        delivered: false
    },
    evidence: "M-Pesa disbursement confirmed by 500+ recipients in Nairobi County. Project ID #KF-992."
}
```

#### Sector Analysis Cards (Insights Page)

```html
<!-- Health Sector Example -->
<div class="bg-white/5 border border-white/10 rounded-xl p-4 flex gap-4 items-center">
    <div class="p-3 bg-red-400/10 rounded-xl">
        <span class="material-icons text-red-400">health_and_safety</span>
    </div>
    <div class="flex-1">
        <div class="flex justify-between items-center mb-1">
            <h4 class="font-bold text-sm">Health & UHC</h4>
            <span class="text-[10px] font-bold px-2 py-0.5 bg-primary/20 text-primary rounded-full uppercase">12 Participation Pts</span>
        </div>
        <div class="flex items-center gap-4">
            <div class="flex-1 h-1 bg-white/5 rounded-full overflow-hidden">
                <div class="h-full bg-red-400 w-[68%]"></div>
            </div>
            <span class="text-xs font-bold">68%</span>
        </div>
    </div>
</div>
```

#### Report Cards (Reports Page)

Each report card contains:
- **Badge**: Finance Bill / County Estimates / Policy Statement
- **Reading Time**: e.g., "5 min read"
- **Title**: e.g., "National Finance Bill 2024 (Revised)"
- **Key Takeaways**: Bullet points
- **Change Summary**: Version highlights

### 2.4 Learning Module Data (Learn Page)

```javascript
{
    courseTitle: "Budget 101 Basics",
    overallProgress: "35%",
    modules: [
        {
            id: 1,
            title: "The Basics",
            status: "completed",
            duration: "4:20 MINS",
            thumbnail: "image_url",
            description: "Understanding what a budget is in the Kenyan context..."
        },
        {
            id: 2,
            title: "The Budget Cycle",
            status: "active",
            stages: [
                { name: "Formulation (Aug - Jan)", status: "completed" },
                { name: "Approval (Feb - June)", status: "pending" },
                { name: "Implementation & Audit", status: "locked" }
            ]
        },
        {
            id: 3,
            title: "Reading Tables",
            status: "locked"
        }
    ]
}
```

### 2.5 News/Story Data Structure

#### Featured Story
```javascript
{
    type: "breaking",
    category: "Investigations",
    title: "The 500M Road to Nowhere: Where did the Nakuru infrastructure fund go?",
    readTime: "8 min read",
    author: "Investigative Team",
    publishedAt: "2h ago",
    thumbnail: "image_url"
}
```

#### Video Item
```javascript
{
    title: "Finance Bill 2024: What it means for your pocket",
    views: "12.4k",
    thumbnail: "image_url"
}
```

#### Update Card
```javascript
{
    type: "Public Participation",
    title: "Mombasa County Budget Estimates Review",
    date: {
        month: "Oct",
        day: 12
    },
    description: "The Governor's office has released the draft estimates...",
    actions: ["Add to Calendar", "Download Draft"]
}
```

### 2.6 Navigation Data

#### Bottom Tab Navigation (Common Pattern)

```html
<nav class="fixed bottom-0">
    <button class="flex flex-col items-center gap-1 text-primary">
        <span class="material-icons">home</span>
        <span class="text-[10px] font-bold">Home</span>
    </button>
    <button class="flex flex-col items-center gap-1 text-slate-500">
        <span class="material-icons">analytics</span>
        <span class="text-[10px] font-bold">Insights</span>
    </button>
    <!-- Central action button -->
    <button class="w-14 h-14 bg-primary rounded-full">
        <span class="material-icons">add</span>
    </button>
    <button class="flex flex-col items-center gap-1 text-slate-500">
        <span class="material-icons">forum</span>
        <span class="text-[10px] font-bold">Debate</span>
    </button>
    <button class="flex flex-col items-center gap-1 text-slate-500">
        <span class="material-icons">settings</span>
        <span class="text-[10px] font-bold">Account</span>
    </button>
</nav>
```

### 2.7 Embedded Data Patterns

#### User Profile Data

```html
<div class="w-10 h-10 rounded-full overflow-hidden border-2 border-primary/20">
    <img 
        alt="User Profile" 
        class="w-full h-full object-cover" 
        data-alt="Portrait of a young Kenyan woman smiling" 
        src="https://lh3.googleusercontent.com/..."
    />
</div>
```

#### Static Badge Data

```html
<span class="bg-primary/20 text-primary text-[10px] font-bold px-2 py-1 rounded uppercase">Finance Bill</span>
<span class="bg-primary/20 text-primary text-[10px] font-bold px-2 py-1 rounded">ON TRACK</span>
<span class="bg-orange-500/20 text-orange-400 text-[10px] font-bold px-2 py-1 rounded uppercase">Delayed</span>
```

### 2.8 Action Buttons

#### Primary Call-to-Action Buttons

```html
<!-- Home Page -->
<button class="bg-primary hover:bg-primary/90 text-background-dark font-display font-extrabold py-4 px-6 rounded-xl flex items-center justify-center gap-2 transition-all active:scale-95 shadow-lg shadow-primary/20">
    VIEW LATEST REPORT
    <span class="material-icons-round">arrow_forward</span>
</button>

<!-- Learn Page -->
<button class="w-full bg-primary text-slate-900 font-extrabold py-4 rounded-xl shadow-lg shadow-primary/20 flex items-center justify-center gap-2 hover:opacity-90 active:scale-[0.98] transition-all">
    START LEARNING
    <span class="material-icons-round">trending_flat</span>
</button>

<!-- Take Action Page -->
<button class="bg-background-dark text-white px-6 py-3 rounded-full font-bold text-sm shadow-xl flex items-center gap-2">
    Start a County Chapter <span class="material-icons-round text-sm">rocket_launch</span>
</button>
```

---

## Summary

### Styling Highlights

1. **Consistent Design Language**: All 8 pages share the same color palette, typography (Manrope), and Tailwind configuration
2. **Mobile-First**: Designed for 430px width (iPhone form factor)
3. **iOS-Inspired**: Tab bars, status bar spacers, home indicators, backdrop blur effects
4. **Dark Mode Support**: All components have dark mode variants using `dark:` prefix
5. **Interactive States**: Hover effects, active states, transitions throughout

### Data Handling Highlights

1. **Form Fields**: Email subscription, search inputs (currently static/non-functional)
2. **Navigation**: Tab-based navigation with active state indicators
3. **Content Display**: Progress bars, percentage indicators, status badges
4. **Interactive Polls**: Yes/No voting mechanism
5. **Filter Systems**: Category filters, segmented controls, filter chips
6. **Progress Tracking**: Multi-stage progress indicators (Allocated → Released → Delivered)
7. **Learning Management**: Course progress tracking with module status

### External Dependencies

- **Tailwind CSS**: `https://cdn.tailwindcss.com?plugins=forms,container-queries`
- **Google Fonts (Manrope)**: `https://fonts.googleapis.com/css2?family=Manrope:wght@300;400;500;600;700;800&display=swap`
- **Material Icons**: `https://fonts.googleapis.com/icon?family=Material+Icons`
- **Material Symbols**: `https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap`
- **Image Assets**: Google Cloud CDN (lh3.googleusercontent.com)
