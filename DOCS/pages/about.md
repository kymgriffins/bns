# About Page (`/about`) — Progress

**Files:**  
- [`app/about/page.tsx`](../../app/about/page.tsx)  
- [`components/heros/AboutHero.tsx`](../../components/heros/AboutHero.tsx)

**Status:** 🔴 Half-built — dead code, no real people shown

---

## Todo List

### 🔴 Critical
- [x] **Render "Our Approach" section** — `approachSteps` (4 steps) defined at line 27, never used
- [x] **Render "Partner With Us" section** — `partnerOptions` (5 options) defined at line 34, never used
- [x] **Delete `keySupporters` dead code** — defined line 48, never rendered, never will be
- [x] **Remove blank lines 121-123** — leftover ghost of deleted sections

### 🟡 Important
- [ ] Add real photos/bios — no humans appear on a "who we are" page
- [x] Add real logos for consortium partners with onError fallback (removed client-side onError for SSR compatibility, logos load from external URLs)
- [x] Replace fake avatar cluster in hero — removed the 4 identical `<Users />` icons
- [x] Give mission statement more visual weight (larger type + eyebrow label)

### 🟢 Polish
- [ ] Verify `#mission` and `#contact` anchor scroll works correctly from hero CTAs
- [ ] Check values grid 2-col layout on small mobile (320px)
- [ ] Consider a timeline section: founding → first report → community milestones

---

## Sessions

## 2026-03-24 (session 2)
- Rendered all 3 previously unused data arrays
- Added "How We Work" 4-step section with icons
- Added "Partner With Us" grid (5 partnership types)
- Added descriptions + website links to consortium partner cards with real logos
- Removed fake avatar cluster from hero; gave mission statement `text-4xl` weight + eyebrow label
- Fixed SSR crash from `onError` img handler — removed it

## 2026-03-24 (session 1)
- Audit completed — found 3 unused data arrays (`approachSteps`, `partnerOptions`, `keySupporters`)
- Noted fake avatar cluster in `AboutHero.tsx` lines 101-113
- Created this progress file

---

## Notes

- For real team photos: even stock-style consistent headshots are better than icons
- Approach steps (Research → Verify → Explain → Support Action) would make a great visual flow or numbered list section
- Partner options section would be good above the contact CTA as a conversion tool
