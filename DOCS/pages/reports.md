# Reports Page (`/reports`) — Progress

**Files:**  
- [`app/reports/page.tsx`](../../app/reports/page.tsx)  
- [`components/heros/ReportsHero.tsx`](../../components/heros/ReportsHero.tsx)

**Status:** 🔴 Critical — a reports page with zero reports rendered

---

## Todo List

### 🔴 Critical — Core functionality missing
- [x] **Build report listing grid** — `sampleReports` (6 items, lines 70-131) defined, never rendered
- [x] **Build filter/search bar** — `filters` array (4 filter groups, line 62) defined, never rendered; `Input` component imported unused
- [x] **Build category navigation** — `nationalCategories`, `countyCategories`, `oversightCategories` all defined, never rendered
- [x] **Build popular topics strip** — `popularTopics` (5 items, line 134) defined, never rendered

### 🟡 Important
- [x] Differentiate the two CTAs — "Request a report" now links to `mailto:info@budgetndiostory.org`
- [ ] Create individual report routes — `/reports/[id]` doesn't exist yet; clicking a report goes nowhere
- [ ] Connect to real data — replace `sampleReports` with Supabase query or CMS content
- [ ] Clean up unused imports: `Filter`, `Calendar`, `Clock`, `ChevronRight`, `CheckCircle2`, `TrendingUp`, `ContentCard`, `Input`

### 🟢 Polish
- [ ] Empty state for when filters return no results
- [ ] Pagination or load-more for when real data is live
- [ ] Report preview/modal so users can skim without full navigation

---

## Unused Code Inventory

| Item | Type | Lines | Action |
|------|------|-------|--------|
| `sampleReports` | Data array | 70–131 | Build the listing grid |
| `filters` | Data array | 62–67 | Build filter UI |
| `nationalCategories` | Data array | 34–39 | Build category nav |
| `countyCategories` | Data array | 41–45 | Build category nav |
| `oversightCategories` | Data array | 47–49 | Build category nav |
| `popularTopics` | Data array | 134–140 | Build topics strip |
| `Input` | Component import | 18 | Use in filter bar |
| `Filter`, `Calendar`, `Clock`, `ChevronRight`, `CheckCircle2`, `TrendingUp` | Icon imports | 8–15 | Use or delete |
| `ContentCard` | Component import | 20 | Use or delete |

---

## Data Plan

Once government document summaries are available in `DOCS/government-data/`, use `data-points.md` files to populate the real report content. Map each government document → one report card in the listing.

---

## Sessions

## 2026-03-24 (session 2)
- Built full report listing grid with 6 report cards (StaggerChildren + CardHover)
- Built filter bar: Level, Sector, Type pills + search input — client-side filtering
- Built category navigation: National / County / Oversight categories with counts
- Built popular topics strip
- Fixed duplicate CTA: "Request a report" → `mailto:info@budgetndiostory.org`
- Cleaned all 8+ unused imports

## 2026-03-24 (session 1)
- Full audit completed — 6 data arrays + 8+ imports found unused
- Core functionality (report listing, filters, categories) completely missing
- Connected to `government-data/` plan for real content pipeline
- Created this progress file

---

## Notes

- The hero is genuinely good — dark, stacked report cards visual is the right direction
- "What each report contains" structure section is useful UX — keep it
- Priority: get even a static listing of 3–4 real reports live before any polish work
