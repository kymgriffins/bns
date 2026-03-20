# /learn Progress Update (JSON + API) - 2026-03-20

## What was implemented
1. **Stories level + `stats` slide support**
   - Updated learning JSON typing to include `slide.type === "stats"` and extended the `/learn` story renderer to display the `stats` slide format from `slides-stories.json`.
   - Updated hub module generation so modules with `metadata.structure.stories` show a **Stories** option alongside **Basic** and **Advanced**.

2. **API-driven loading (browser)**
   - `/learn` now loads module list and module slides through the API contract:
     - Hub module list: `GET /api/learn/modules?unlocked=true`
     - Slides: `GET /api/learn/modules/:moduleId/slides?level=basic|advanced|stories`
   - The `moduleLoader` helpers now prefer these API endpoints **when running in the browser**, while server-side API route handlers still fetch JSON directly.

3. **CRUD persistence in server memory (no JSON file writes)**
   - `PUT /api/learn/modules/:id` now persists updates into the in-memory module registry.
   - `DELETE /api/learn/modules/:id` now actually removes the module from the in-memory registry.
   - Slide CRUD now persists per-runtime using an in-memory override map:
     - `PUT /api/learn/modules/:id/slides?level=...` replaces the runtime slide list for that `(moduleId, level)`
     - `POST /api/learn/modules/:id/slides?level=...` appends to the runtime slide list (creating it from the JSON baseline if needed)
     - `GET .../slides?level=...` returns overrides when present.

## How `/learn` works end-to-end now
- The `/learn` page renders `StoryCivicHub` (`components/civic-hub/StoryCivicHub.tsx`).
- On mount, `StoryCivicHub` fetches the module list from:
  - `GET /api/learn/modules?unlocked=true`
- The hub presents module options based on `metadata.structure.*`:
  - `structure.basic` -> Basic option
  - `structure.advanced` -> Advanced option
  - `structure.stories` -> Stories option
- When you start a module option:
  - The selected option id encodes the level (`<moduleId>`, `<moduleId>-advanced`, `<moduleId>-stories`)
  - Slide loading uses `loadModuleSlides()` which (in the browser) calls:
    - `GET /api/learn/modules/<moduleId>/slides?level=<level>`
- The story slide renderer now includes a `stats` branch so slides from `slides-stories.json` with `type: "stats"` render properly.

## JSON sources used
- **Metadata baseline** (registered in-memory): imported from `app/learn/data/modules/bps-2026/metadata.json` at server startup (via `app/learn/utils/moduleRegistry.ts`).
- **Slides baseline** (server-side fallback for overrides): fetched from the public JSON files at:
  - `/public/data/modules/<moduleId>/slides-basic.json`
  - `/public/data/modules/<moduleId>/slides-advanced.json`
  - `/public/data/modules/<moduleId>/slides-stories.json`

## CRUD persistence semantics (important)
- All module/slide “persistence” is **in-memory** for the lifetime of the server process.
- A server restart resets:
  - slide overrides (`slidesOverrides` map)
  - module updates done via `PUT` (module registry reinitializes defaults)

## Key files changed
- `app/learn/utils/moduleLoader.ts`
  - Added `stats` slide type + updated `structure.stories` typing
  - Browser now calls `/api/learn/...` for metadata + slides
- `components/civic-hub/StoryCivicHub.tsx`
  - Hub includes Stories option
  - Loader uses API-backed module list
  - Renderer supports `slide.type === "stats"`
- `app/learn/utils/moduleRegistry.ts`
  - Added `updateModule()` for `PUT` persistence
  - Ensured initialization for `removeModule()`
- `app/api/learn/modules/[id]/route.ts`
  - `PUT` and `DELETE` now persist to the registry
- `app/api/learn/modules/[id]/slides/route.ts`
  - Added `slidesOverrides` in-memory store and override-aware `GET/PUT/POST`

## Quick verification steps
1. Start the app and open `/learn`.
2. In the hub, verify **Stories** appears (in addition to Basic/Advanced) for `bps-2026`.
3. Start the **Stories** option.
4. Confirm a slide with `id: "story-budget-numbers"` (or any `type: "stats"`) renders as a stats grid.
5. Call slide CRUD via API and verify the viewer updates on the next load:
   - `PUT /api/learn/modules/bps-2026/slides?level=stories`
   - `POST /api/learn/modules/bps-2026/slides?level=stories`

## Remaining known gaps (not part of this change)
- User progress is still stored locally by `StoryCivicHub` (`localStorage`), not via `/api/learn/progress`.
- `/learn` still primarily targets the story-style experience (the separate `ModuleScreen`/`lib/learn-data/*` path is not the active `/learn` page).

