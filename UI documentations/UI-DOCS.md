# Budget Ndio Story - UI Documentation

## Overview

This document provides comprehensive UI/UX documentation for the Budget Ndio Story web application. It focuses exclusively on the frontend presentation layer and user interface elements, excluding all backend implementations, API routes, database operations, server-side logic, and backend services.

---

## Table of Contents

1. [Global Navigation](#global-navigation)
2. [Home Page](#home-page)
3. [News Page](#news-page)
4. [Blogs Page](#blogs-page)
5. [Learn Page](#learn-page)
6. [Reports Page](#reports-page)
7. [Tracker Page](#tracker-page)
8. [Subscribe/Donate Page](#subscribedonate-page)
9. [About Page](#about-page)
10. [Profile Page](#profile-page)
11. [Authentication Pages](#authentication-pages)
12. [Admin Dashboard](#admin-dashboard)
13. [UI Components Reference](#ui-components-reference)

---

## Global Navigation

### Navbar Component
**File:** [`components/navbar.tsx`](components/navbar.tsx)

**Behavior:**
- Sticky positioning on scroll (becomes pill-shaped with backdrop blur after 50px scroll)
- Transparent on home page, solid on other pages
- Hidden on admin routes (`/admin/*`, `/dashboard-shell-01/*`, `/protected/*`)

**Elements:**
| Element | Type | Function |
|---------|------|----------|
| Logo | Image/Link | Links to homepage `/` |
| Navigation Menu | NavigationMenu | Primary nav links |
| Theme Switcher | Button | Toggles dark/light mode |
| Subscribe Button | Button | Links to `/subscribe` (shows "DONATE!" on hover) |
| Mobile Menu Toggle | Sheet/SheetTrigger | Opens mobile navigation |

**Navigation Links:**
| Label | Route | Description |
|-------|-------|-------------|
| Budget Reports | `/reports` | Simplified budget documents |
| Learn | `/learn` | Educational modules |
| Articles | `/blogs` | Blog posts |
| About | `/about` | Organization info |

### Footer Component
**File:** [`components/footer.tsx`](components/footer.tsx)

**Sections:**
- Logo and tagline
- Quick links column
- Resources column  
- Contact column
- Newsletter signup form
- Social media links
- Copyright notice

---

## Home Page

**Route:** `/home` or `/`  
**File:** [`app/home/page.tsx`](app/home/page.tsx)

### Layout Structure

**1. Hero Section**
- **Component:** `AgencyHeroSection` from shadcn-space
- **Layout:** Full-width cinematic hero with header content
- **Elements:**
  - Headline text
  - Subheadline/description
  - Primary CTA buttons
  - Visual elements (images/graphics)

**2. Marquee Banner**
- **Component:** `Marquee` from shadcn-space/animations
- **Behavior:** Continuous scrolling text banner
- **Content:** Three info cards showing:
  - "New: Budget 101 · Learn hub is live"
  - "Creators: Visual budget stories for TikTok, IG & YouTube"
  - "Civic windows: Track key dates in Kenya's budget calendar"

**3. Statistics Section**
- **Component:** Bento grid with animated counters
- **Stats Displayed:**
  - "10 years" - Budget Reports Analyzed
  - "15,000+" - Kenyans Reached
  - "47" - Counties & Contexts Covered
  - "20+" - Partner Organizations

**4. How It Works Section**
- **Layout:** Three-column step-by-step cards
- **Steps:**
  - **01 - Browse Reports:** Explore simplified budget documents
  - **02 - Analyze Insights:** Dive deep into analysis
  - **03 - Take Action:** Use templates, join trainings

**5. Features Section**
- **Component:** Bento grid layout
- **Features:**
  - **Simplified Reports:** Key takeaways from budget documents → `/reports`
  - **Budget Analysis:** What changed, what it means → `/insights`
  - **Budget Tracker:** Follow budget lines → `/tracker`

**6. Latest Reports Section**
- **Layout:** Grid of report preview cards
- **Report Items:** Title, category badge, date, summary excerpt
- **CTA:** "Browse all reports" → `/reports`

**7. Partners Section**
- **Layout:** Grid of partner logos with descriptions
- **Partners:** The Continental Pot, Colour Twist Media, Sen Media & Events

**8. Donate Section**
- **Component:** `DonateSection`
- **CTA:** Links to `/subscribe`

### Interactive Elements
- **Hover effects:** Cards lift with shadow, buttons animate
- **Click actions:** All cards/buttons link to respective pages
- **Animations:** Fade-in, stagger effects on scroll

### Responsive Design
- Mobile: Single column, stacked layout
- Tablet: Two-column grids
- Desktop: Full multi-column bento layouts

---

## News Page

**Route:** `/news`  
**File:** [`app/news/page.tsx`](app/news/page.tsx)

### Components

**NewsHub Component**
**File:** [`components/news-hub.tsx`](components/news-hub.tsx)

**Layout Sections:**

**1. Tab Navigation**
- **Tabs:** "Stories" | "Videos" | "Updates"
- **Behavior:** Click to switch content type

**2. Search Bar**
- **Input:** Text search field
- **Placeholder:** "Search stories..."
- **Behavior:** Filters content in real-time

**3. Filter Pills**
- **Categories (Stories):** All, Investigations, Explainers, County, Sector, Youth Voices, Field Reports
- **Categories (Videos):** All, Basics, Finance Bill, National, County, Sector, Tracker Stories
- **Tags (Updates):** All, Participation, Release, Training, Event, Tracker, New Report
- **Behavior:** Single selection filter

**4. Featured Story Card**
- **Large hero card** for most important story
- **Elements:** Image, category badge, title, excerpt, date, author, read time

**5. Story Grid**
- **Layout:** Multi-column responsive grid
- **Card Elements:**
  - Thumbnail image
  - Category badge
  - Title
  - Date
  - Excerpt
  - Author name
  - Read time estimate

### Interactive Behaviors
- **Hover:** Cards scale slightly, show "Read more" link
- **Click:** Navigate to full story `/news/[id]`
- **Tabs:** Smooth transition between content types
- **Search:** Debounced search input
- **Filters:** Instant filter application

### Responsive Breakpoints
- Mobile (<640px): Single column
- Tablet (640-1024px): 2 columns
- Desktop (>1024px): 3-4 columns

---

## Blogs Page

**Route:** `/blogs`  
**File:** [`app/blogs/page.tsx`](app/blogs/page.tsx)

### Components

**BlogHub Component**
**File:** [`components/blog-hub.tsx`](components/blog-hub.tsx)

**Structure:**
- Similar layout to NewsHub
- Blog-specific categories and filters
- Post type badges: Investigation, Explainer, Update, Field Report, Opinion, Sponsored

**Elements:**
- Search input
- Category filter dropdown
- Featured post highlight
- Blog post grid
- Pagination controls

---

## Learn Page

**Route:** `/learn`  
**File:** [`app/learn/page.tsx`](app/learn/page.tsx)

### Layout Structure

**1. Page Hero**
- **Component:** `PageHero`
- **Eyebrow:** "Budget 101 · Learn"
- **Title:** "Budget school, Your one Stop Hub for Money Mechanics"
- **Description:** "Short, swipeable lessons, quizzes, and real‑world tasks..."
- **Primary CTA:** "Start Module 001" → `/learn/module-one`
- **Secondary CTA:** "See all modules" → `#modules`

**2. Feature Badges**
- ★ Built for Kenyan youth & creators
- ⏱️ 10–15 minutes per module
- ✓ Learn solo, apply with friends

**3. LearnClient Component**
**File:** [`components/learn/learn-client.tsx`]

**Modules Display:**
| Module | Status | Description |
|--------|--------|-------------|
| Module 001: BPS 2026 | **NEW** ✓ Available | Budget Policy Statement 2026 |
| Module 002: Budget Cycle | Coming Soon | Learn the stages of Kenya's budget process |
| Module 003: Roles & Responsibilities | Coming Soon | Who does what in Kenya's budget process |

**Module Card Elements:**
- Icon (BookOpen, BarChart3, Users)
- Title
- Description
- Lesson count indicator
- "NEW" badge for new content
- "Coming Soon" for unavailable modules
- Estimated time (minutes)
- "Start Learning" button for available modules

**4. LearnPromoPopup**
- **File:** [`components/learn/learn-promo-popup.tsx`]
- **Behavior:** Modal popup for promotional content
- **Triggers:** On page load (with timing)

---

## Reports Page

**Route:** `/reports`  
**File:** [`app/reports/page.tsx`](app/reports/page.tsx)

### Layout Structure

**1. Page Hero**
- **Title:** "Simplified Budget Reports"
- **Description:** "Explore short briefs from major budget documents. Uncover what changed, what it means, what to do next."

**2. Document Type Categories**
- **National:** Budget Policy Statement, Estimates, Finance Bill, Appropriation Act
- **County:** CFSP, County Budget Estimates, "Budget at a Glance" briefs
- **Oversight:** Audit & Accountability Highlights

**3. Report Sections (What's Included)**
| Section | Description |
|---------|-------------|
| What report? | Understanding the document type |
| Key takeaways | 5-8 main points |
| What changed | Year-over-year analysis |
| Why it matters | Impact on youth & communities |
| Questions to ask | For accountability |
| Next step | In the budget cycle |
| Sources | Links to original documents |

**4. Filter System**
| Filter | Options |
|--------|---------|
| Document Type | All, BPS, Estimates, Finance Bill, Appropriation Act |
| Year | 2026, 2025, 2024, 2023 |
| Level | All, National, County |
| Sector | All, Education, Health, Agriculture, Water, Roads |

**5. Report Cards**
- Title
- Category badge
- Date
- Read time estimate
- Excerpt summary
- "X takeaways" indicator
- "NEW" badge for recent

**6. CTA Section**
- "Need a brief for your county or sector?"
- "Request a Report" button
- "Take Action" button

---

## Tracker Page

**Route:** `/tracker`  
**File:** [`app/tracker/page.tsx`](app/tracker/page.tsx)

### Layout Structure

**1. Page Hero**
- **Eyebrow:** "Delivery · Budget tracker"
- **Title:** "Track delivery, not just promises."
- **Description:** "Follow selected budget lines from paper to the ground, see where money stalls, and add evidence from your community."
- **Primary CTA:** "View live trackers" → `#trackers`
- **Secondary CTA:** "Submit a tip" → `/take-action`

**2. Tracking Categories**
- Youth livelihoods
- Health
- Education
- Water
- Agriculture
- Roads
- Markets
- Climate resilience

**3. Tracking Stages**
| Stage | Description | Color |
|-------|-------------|-------|
| Allocated | Budget approved by assembly | Blue |
| Released | Funds sent to implementing agency | Yellow |
| Delivered | Outputs achieved on ground | Green |

**4. Tracked Item Cards**
- Title (e.g., "Youth Empowerment Programme - Nairobi")
- Category badge
- Progress bar showing three stages
- Amounts: Allocated, Released, Delivered
- Percentage progress
- Last update date

---

## Subscribe/Donate Page

**Route:** `/subscribe`  
**File:** [`app/subscribe/page.tsx`](app/subscribe/page.tsx)

### Layout (Two-Column Split)

**Left Column (60%) - Organization Info**
- Heart icon
- Heading: "Support Budget Transparency in Kenya"
- Description paragraphs explaining mission
- Video placeholder section

**Contact Information:**
- Mail icon: info@budgetndiostory.org
- Phone icon: +254 XXX XXX XXX
- Map pin: Nairobi, Kenya
- Globe: budgetndiostory.org

**Right Column (40%) - Donation Form**

**Form Fields:**
| Field | Type | Validation |
|-------|------|------------|
| Donation Type | Radio buttons | One-time / Recurring |
| Amount Selection | Button grid | KSh 10,000, 25,000, 50,000, 100,000 |
| Custom Amount | Input | Numeric entry |
| Donor Name | Input | Optional text |
| Donor Email | Input | Required, email format |
| Payment Method | Radio | M-Pesa / Card (Stripe) |

**Amount Options:**
- KSh 10,000
- KSh 25,000
- KSh 50,000
- KSh 100,000
- Custom amount input

**Validation:**
- Email required and validated for format
- Amount must be > 0

**Submit Button:** "Continue to Payment" / "Complete Donation"

**Success State:**
- Thank you message
- Donation amount displayed
- Payment method confirmation
- "Make Another Donation" button

---

## About Page

**Route:** `/about`  
**File:** [`app/about/page.tsx`](app/about/page.tsx)

### Layout Structure

**1. Page Hero**
- **Eyebrow:** "Who we are"
- **Title:** "The home for Kenya's youth budget story."
- **Description:** "A consortium of storytellers, analysts, and organizers working together..."
- **CTA:** "Partner with us" → `#partner`
- **Secondary CTA:** "Explore how we work"

**2. Mission Statement (Bento Card)**
- Centered large card
- Heading: "Our Mission"
- Mission text explaining purpose

**3. Values Section**
- **Five core values in grid:**
  - Clarity - Make complex budget information simple
  - Evidence - Base work on verified data
  - Respect - Treat all perspectives with dignity
  - Inclusion - Ensure everyone can participate
  - Accountability - Help citizens track promises

**4. Approach Section**
- **Four steps numbered 1-4:**
  1. Research - Gather and analyze budget documents
  2. Verify - Cross-check data
  3. Explain - Translate to youth-friendly content
  4. Support Action - Provide tools for civic participation

**5. Consortium Partners**
- The Continental Pot - Lead Implementing Partner
- Colour Twist Media - Media & Communications Partner
- Sen Media & Events - Events & Engagement Partner

**6. Partner Options**
- Trainings - Budget literacy workshops
- Forums - Public discussions
- Co-created Briefs - Custom analysis
- Multimedia Campaigns - Create content together
- Research & Verification - Fact-check claims

---

## Profile Page

**Route:** `/profile`  
**File:** [`app/profile/page.tsx`](app/profile/page.tsx)

### Components

**User Profile Form**
- Protected route (requires login)

**Form Fields:**
| Field | Type | Required |
|-------|------|----------|
| First Name | Input | No |
| Last Name | Input | No |
| Bio | Textarea | No |
| Phone Number | Input | No |
| Location | Input | No |
| Interests | Input (comma-separated) | No |
| Skills | Input (comma-separated) | No |
| Avatar | Avatar upload | No |

**Profile Data:**
- User ID display
- Email display (read-only)
- Member since date

**Actions:**
- **Save Button:** Saves profile changes
- **Loading states:** Shows during fetch/save
- **Success message:** "Profile updated successfully"

**Behavior:**
- Redirects to `/auth/login` if not authenticated
- Pre-fills form with existing profile data
- Validates email format

---

## Authentication Pages

### Login Page

**Route:** `/auth/login`  
**File:** [`app/auth/login/page.tsx`](app/auth/login/page.tsx)

**Component:** `LoginForm`  
**File:** [`components/login-form.tsx`](components/login-form.tsx)

**Form Fields:**
| Field | Type | Validation |
|-------|------|------------|
| Email | Input (email type) | Required, valid email format |
| Password | Input (password type) | Required |

**Interactive Elements:**
- **Login Button:** Submits form, shows "Logging in..." state
- **Forgot Password Link:** → `/auth/forgot-password`
- **Sign Up Link:** → `/auth/sign-up`

**Behavior:**
- On success: Redirect to URL specified in `redirect` param, or default `/`
- On error: Display error message below form
- Loading state disables button

---

### Sign Up Page

**Route:** `/auth/sign-up`  
**File:** [`app/auth/sign-up/page.tsx`](app/auth/sign-up/page.tsx)

**Component:** `SignUpForm`  
**File:** [`components/sign-up-form.tsx`](components/sign-up-form.tsx)

**Form Fields:**
| Field | Type | Validation |
|-------|------|------------|
| Username | Input | Required |
| Email | Input | Required, valid email format |
| Password | Input | Required, min length |
| Confirm Password | Input | Must match password |

**Interactive Elements:**
- **Sign Up Button:** Submits form
- **Login Link:** → `/auth/login`

**Behavior:**
- On success: Redirect to `/auth/sign-up-success`
- On validation error: Show inline errors

---

### Sign Up Success Page

**Route:** `/auth/sign-up-success`  
**File:** [`app/auth/sign-up-success/page.tsx`](app/auth/sign-up-success/page.tsx)

**Elements:**
- Success message/heading
- Description text
- "Go to Home" button → `/`
- "Go to Login" button → `/auth/login`

---

### Forgot Password Page

**Route:** `/auth/forgot-password`  
**File:** [`app/auth/forgot-password/page.tsx`](app/auth/forgot-password/page.tsx)

**Component:** `ForgotPasswordForm`  
**File:** [`components/forgot-password-form.tsx`](components/forgot-password-form.tsx)

**Form Fields:**
| Field | Type | Validation |
|-------|------|------------|
| Email | Input | Required, valid email format |

**Interactive Elements:**
- **Send Reset Link Button**
- **Back to Login Link**

---

### Update Password Page

**Route:** `/auth/update-password`  
**File:** [`app/auth/update-password/page.tsx`](app/auth/update-password/page.tsx)

**Component:** `UpdatePasswordForm`  
**File:** [`components/update-password-form.tsx`](components/update-password-form.tsx)

**Form Fields:**
| Field | Type | Validation |
|-------|------|------------|
| New Password | Input | Required |
| Confirm Password | Input | Must match |

---

## Admin Dashboard

**Route:** `/admin`  
**File:** [`app/admin/page.tsx`](app/admin/page.tsx)

**Access Control:** Requires authentication, redirects to `/auth/login` if not logged in

### Layout Components

**1. AppSidebar**
- **File:** [`components/shadcn-space/blocks/dashboard-shell-01/app-sidebar.tsx`]

**Sidebar Elements:**
- Logo
- Navigation menu with icons
- Collapsible sections
- User profile section
- Sign out button

**2. StatisticsBlock**
- **File:** [`components/shadcn-space/blocks/dashboard-shell-01/statistics.tsx`]

**Displayed Stats:**
- Revenue/statistics cards
- Trend indicators
- Percentage changes

**3. TopProductTable**
- **File:** [`components/shadcn-space/blocks/dashboard-shell-01/top-product-table.tsx`]

**Table Elements:**
- Column headers
- Data rows
- Pagination controls
- Sort controls (if applicable)

**4. SalesByCountryWidget**
- **File:** [`components/shadcn-space/blocks/dashboard-shell-01/salesbycountrywidget.tsx`]

**Visualization:**
- Country-based sales data
- Map or chart visualization

---

## UI Components Reference

### Core UI Components (shadcn/ui)

| Component | Location | Usage |
|-----------|----------|-------|
| Button | `components/ui/button.tsx` | All button elements |
| Card | `components/ui/card.tsx` | Content containers |
| Input | `components/ui/input.tsx` | Text input fields |
| Label | `components/ui/label.tsx` | Form field labels |
| Textarea | `components/ui/textarea.tsx` | Multi-line text input |
| Badge | `components/ui/badge.tsx` | Category/status badges |
| Avatar | `components/ui/avatar.tsx` | User profile images |
| Sheet | `components/ui/sheet.tsx` | Mobile navigation |
| Dialog | `components/ui/dialog.tsx` | Modal dialogs |
| Select | `components/ui/select.tsx` | Dropdown selections |
| Tabs | `components/ui/tabs.tsx` | Tab navigation |

### Custom Components

| Component | File | Description |
|-----------|------|-------------|
| PageHero | `components/page-hero.tsx` | Page header section |
| Navbar | `components/navbar.tsx` | Main navigation |
| Footer | `components/footer.tsx` | Site footer |
| NewsHub | `components/news-hub.tsx` | News listing component |
| BlogHub | `components/blog-hub.tsx` | Blog listing component |
| LoginForm | `components/login-form.tsx` | Login form with validation |
| SignUpForm | `components/sign-up-form.tsx` | Registration form |
| CookieConsent | `components/cookie-consent.tsx` | Cookie consent banner |
| ThemeSwitcher | `components/theme-switcher.tsx` | Dark/light mode toggle |
| NewsletterForm | `components/newsletter-form.tsx` | Email subscription |
| DonateForm | `components/donate-form.tsx` | Donation form |
| ChatWidget | `components/chatbot/chat-widget.tsx` | AI support chat |

### Bento Components

| Component | Purpose |
|-----------|---------|
| BentoCard | Grid card container |
| BentoSection | Section wrapper |
| BentoGrid | Grid layout |
| BentoGridItem | Grid item |
| BentoSectionHeader | Section title/subtitle |
| BentoCTASection | Call-to-action section |
| BentoScrollAnimation | Scroll-triggered animation |
| BentoStaggerGrid | Staggered grid animation |

### Animation Components

| Component | File | Description |
|-----------|------|-------------|
| ScrollAnimation | `components/ui/enhanced-animations.tsx` | Base scroll animation |
| StaggerContainer | `components/ui/enhanced-animations.tsx` | Staggered child animations |
| StaggerItem | `components/ui/enhanced-animations.tsx` | Individual stagger item |
| AnimatedCounter | `components/ui/enhanced-animations.tsx` | Number counter animation |
| SmoothFade | `components/ui/enhanced-animations.tsx` | Fade transition |
| Marquee | `components/shadcn-space/animations/marquee.tsx` | Scrolling text banner |

---

## Responsive Design Breakpoints

| Breakpoint | Width | Layout Changes |
|------------|-------|----------------|
| Mobile | < 640px | Single column, hamburger menu, stacked cards |
| Tablet | 640px - 1024px | Two-column grids, condensed nav |
| Desktop | > 1024px | Full multi-column layouts, expanded nav |

### Common Responsive Patterns

- **Navigation:** Expands to full menu on desktop, sheet/drawer on mobile
- **Grids:** 1 col mobile → 2 col tablet → 3-4 col desktop
- **Cards:** Stack vertically on mobile, side-by-side on larger screens
- **Hero sections:** Full-width on all sizes, adjusted text sizes
- **Forms:** Single column mobile, multi-column on tablet+

---

## Interactive Behaviors Summary

### Common Interactions

| Element | Interaction | Feedback |
|---------|-------------|----------|
| Buttons | Click | Hover state, loading spinner |
| Form inputs | Focus/Blur | Border color change, validation messages |
| Cards | Hover | Scale up, shadow increase |
| Links | Hover | Color change, underline |
| Navigation | Click | Page navigation |
| Tabs | Click | Content switch with transition |
| Filters | Click | Instant content filter |
| Search | Type | Debounced search results |
| Modals | Open/Close | Fade in/out animation |
| Mobile menu | Open/Close | Slide in from side |

### Animation Specifications

- **Page transitions:** Fade (200-300ms)
- **Hover effects:** 150-250ms ease
- **Button clicks:** Scale down (95%) then back
- **Modal open:** Fade + scale from 95% to 100%
- **Scroll animations:** Trigger at 20% viewport entry

---

*This documentation focuses exclusively on frontend UI elements and interactions. For backend API documentation, see [API_DOCS.md](API_DOCS.md).*

*Last Updated: March 2026*