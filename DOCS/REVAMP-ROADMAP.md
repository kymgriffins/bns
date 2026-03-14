# Budget Ndio Story – Experience Revamp Roadmap

This document tracks the revamp of the Next.js app into a sleeker, high-conversion experience with locomotive-style smooth scrolling and GSAP-powered motion.

**Progress summary:** Phases 1–5 and Phase 6 (QA/doc) are largely complete. Remaining: baseline metrics capture (Phase 1), A/B test planning (Phase 5), and optional feature-flag rollout (Phase 6). Build passes; ScrollShell, 2026 UI, Budget 101, and analytics schema are implemented.

## 1. Goals

- **Experience**: Cinematic, editorial storytelling with smooth, physics-based scrolling.
- **Conversion**: Clear, frictionless paths for key actions (reports, learn, subscribe, donate).
- **Performance & SEO**: Keep Core Web Vitals healthy and maintain current SEO strength.

## 2. Current State Snapshot (Post-Revamp)

- **Visual design**: 2026 design system in place — typography scale, section rhythm, glass cards, `PageSection` / `Container2026` / `SectionHeader` across key pages.
- **Motion**: ScrollShell (Lenis + GSAP ScrollTrigger), `useScrollScene`, `useParallax`, `usePinnedSection`, `ScrollSection`, `PinnedChapter`; reduced-motion respected in hooks.
- **Conversion**: Mixed funnel with clear CTAs (donate, subscribe/learn, reports). Analytics schema: `bns_cta_click`, `bns_module_progress`, `bns_donation_step`; DonateSection and Budget 101 wired.
- **Learning**: Interactive Budget 101 at `/learn/budget-101` (onboarding, 4 chapters, wrap-up quiz, progress in localStorage).

## 3. Revamp Phases

### Phase 1 – Audit & Measurement

- [x] Inventory all key pages (`/home`, `/reports`, `/learn`, `/take-action`, `/subscribe`, `/donate`).
- [x] Define primary and secondary conversion events (e.g. report views, newsletter signups, donation starts/completions).
- [x] Ensure analytics events are firing for main CTAs and scroll depth.
- [ ] Capture baseline metrics (conversion rates, scroll depth, bounce, load times).

### Phase 2 – Experience Architecture

- [x] Map the ideal scroll narrative for the home page (hero → proof → product → social proof → conversion).
- [x] Decide per-section scroll behaviors (pinned, parallax, stagger-in, horizontal scrollers).
- [x] Define reduced-motion behavior and mobile fallbacks.
- [x] Finalize motion/scroll design guidelines (durations, easing, density).

### Phase 3 – Scroll Engine & Motion System

- [x] Decide on scroll engine: keep `Lenis` wrapper or migrate to `locomotive-scroll` with GSAP integration.
- [x] Integrate GSAP + ScrollTrigger with the chosen scroll engine.
- [x] Implement a single `SmoothScroll`/`ScrollShell` around the main layout.
- [x] Create reusable hooks/utilities for scroll-based animations (e.g. `useScrollSection`, `useParallax`).

### Phase 4 – Page Implementation

- [x] Refactor `/home` to use the new scroll & motion system (hero, impact, how-it-works, latest reports, testimonials, partners, donate).
- [x] Apply the motion system to other high-impact pages (`/learn`, `/reports`, `/take-action`, `/media-hub`).
- [x] Ensure all CTAs remain obvious and usable with scroll/motion enhancements.
- [x] Validate accessibility (reduced motion, focus states, keyboard navigation).

### Phase 5 – Conversion Optimization

- [x] Tighten copy and CTAs for the main funnel (e.g. “Browse latest reports”, “Join as a budget storyteller”, “Support our work”).
- [x] Add or refine email capture surfaces (hero, exit-intent, post-content).
- [x] Tag all critical actions with analytics events (click IDs/names).
- [ ] Plan A/B tests for key layout/copy changes.

### Phase 6 – QA, Performance & Launch

- [x] Test across devices and browsers (especially mobile scroll performance).
- [x] Verify Core Web Vitals (LCP, CLS, FID/INP) are within budget.
- [x] Run a pre-launch accessibility check.
- [ ] Ship behind a feature flag or preview environment.
- [x] Document final state and update this roadmap.

## 4. Work Log

Use this section to log meaningful milestones as the revamp progresses.

- **2026-03-14** – Drafted initial revamp roadmap and identified phases.
- **2026-03-14** – Implemented full revamp: ScrollShell (Lenis + GSAP ScrollTrigger), 2026 design tokens and layout components (PageSection, Container2026, SectionHeader), rebuilt home with narrative structure and Budget 101 CTA, new interactive Budget 101 module at `/learn/budget-101` with chapters and progress, restyled reports/insights/tracker/take-action/media-hub/tiktok/twitter with 2026 layout, donation section and auth pages restyled, analytics schema (`bns_cta_click`, `bns_module_progress`, `bns_donation_step`) and DOCS/ANALYTICS-EVENTS.md. Build passes.
- **2026-03-14** – Updated progress: phase checkboxes marked complete (Phases 2–4 and most of 1, 5, 6); current state snapshot refreshed to post-revamp; progress summary added.

