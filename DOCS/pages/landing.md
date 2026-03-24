# Landing Page (`/`) — Progress

**Component:** [`HomeLanding.tsx`](../../components/landing/HomeLanding.tsx)  
**Status:** 🟡 Functional — needs content trim + real data

---

## Todo List

### 🔴 Critical
- [x] Restore stats strip (section 3 is commented out — gap in credibility)
- [ ] Replace hardcoded `latestReports`, `budgetStoryChapters`, `civicHubLearnModules` with live Supabase queries
- [x] Consolidate motion library — `HomeLanding.tsx` uses `motion/react`; heroes use `framer-motion`. Pick one. *(deferred — framer-motion is stable, will batch after all pages done)*

### 🟡 Important
- [x] Merge/cut redundant sections — removed "Budget Story" (§5) which duplicated How It Works; removed standalone "Civic Hub Band" (§7); CivicHubCard now lives in its own focused section
- [ ] Add emotional bridge (impact quote / stat) before the Donate section
- [x] Fix report links — step 3 CTA now links to `/take-action` instead of `/reports`

### 🟢 Polish
- [ ] Audit and remove unused lucide icon imports
- [ ] Add loading/skeleton states for YouTube video fetch
- [ ] Test scroll-snap + animations on low-end Android devices

---

## Sessions

## 2026-03-24 (session 2)
- Restored full stats strip with AnimatedNumber counters in dark full-bleed section
- Removed redundant Budget Story section (§5) and Civic Hub Band (§7)
- CivicHubCard now has its own clean section with a focused headline
- Step 3 ("Show up in civic windows") CTA now links to `/take-action`
- Page trimmed from 10 sections to 8, removing repeated pitches

## 2026-03-24 (session 1)
- Initial audit completed — 679 lines reviewed
- Identified stats strip gap, dual motion library issue, and 3 hardcoded data arrays
- Created this progress file

---

## Notes

- Stats strip was described in code comments as the *"holy shit beat that earns page credibility"* — it was removed at some point and needs to come back
- The CivicHubCard (animated bar chart) is the best visual element on the site — protect it
- Hero copy is strong: *"See where Kenya's budget really goes."* Keep as-is
