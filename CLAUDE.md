# CLAUDE.md

This file provides working rules for Claude in the Aetherstack monorepo.

## Project Identity

- Project / umbrella brand: **Aetherstack**
- Design system: **Aether UI**
- Public namespace: `@aether`
- Future premium namespace: `@aether-pro`

Aetherstack is a serious product monorepo for a premium open-code design system and registry. Its registry format is compatible with the shadcn/ui convention, but it ships its own CLI (`aether-ui`) and does not depend on the shadcn CLI.

Names map as follows (see [`docs/architecture/overview.md`](docs/architecture/overview.md#naming-glossary) for the full glossary):
- `aetherstack` — monorepo + brand
- `Aether UI` — the design system product
- `@aetherstack/*` — npm scope for internal packages
- `@aether` / `@aether-pro` — public / premium registry namespaces
- `aether-ui` — the CLI binary

## Primary Rules

Always follow the standards in:

- [`docs/architecture/engineering-standards.md`](docs/architecture/engineering-standards.md) — coding, API, styling, a11y, and review standards
- [`docs/roadmap/build-plan.md`](docs/roadmap/build-plan.md) — current phase, deliverables, and acceptance criteria

If there is a conflict between local convenience and either of these, follow them.

---

## Architecture Model

The system has four main layers:

1. tokens
2. primitives
3. patterns
4. blocks

### Dependency rules

- `tokens` must not depend on `ui`, `patterns`, or `blocks`
- `ui` may depend on `tokens` and `utils`
- `patterns` may depend on `ui`, `tokens`, and `utils`
- `blocks` may depend on `patterns`, `ui`, `tokens`, and `utils`
- `themes` should integrate through tokens
- registry packages should validate/package assets, not own UI behavior

Do not blur these boundaries.

---

## Working Expectations

When implementing something:

1. identify the correct package/layer first
2. keep scope narrow
3. prefer explicit, maintainable code
4. keep APIs consistent with the rest of the system
5. use token-driven styling
6. update docs if the change affects public usage or architecture
7. do not introduce avoidable dependencies

---

## Code Quality Rules

- Use strict TypeScript
- Do not use `any` casually
- Avoid unsafe casts
- Favor readable, boring code
- Avoid premature abstraction
- Keep shared package APIs deliberate
- Do not leak unstable internals into public exports

---

## Styling Rules

- Prefer tokens over hardcoded visual values
- Keep class composition readable
- Preserve accessibility
- Do not create one-off styling conventions that conflict with the system
- Maintain theme compatibility

---

## Package Discipline

- Do not place app-specific code in shared packages
- Do not place block-level compositions in `ui`
- Do not duplicate logic across packages
- Move reusable logic to the lowest appropriate layer

---

## Docs and Tests

For meaningful shared functionality:

- update docs where relevant
- add tests where logic/regression risk justifies them
- do not leave architecture-impacting changes undocumented

---

## What to Avoid

Do not:

- overengineer early
- create duplicate APIs for the same concept
- add random dependencies for trivial problems
- mix demo hacks into shared packages
- hardcode brand styling across unrelated files
- introduce circular dependencies

---

## Current Phase Context

**Phases 1–3 complete + Phase 3 Extras + Phase 4 in progress**

### Phase 3 core (complete)
16 UI primitives in `packages/ui`: Button, Input, Textarea, Select, Checkbox, RadioGroup, Switch, Badge, Card, Tabs, Dialog, Sheet, Tooltip, Table, Label, Skeleton. Full Vitest test suite (82 tests).

### Phase 3 extras (complete)
- Next.js upgraded to 16.2.4 across all four apps
- tsup build pipeline for `@aetherstack/ui`, `@aetherstack/tokens`, `@aetherstack/utils` (publishConfig for npm)
- GitHub Actions CI (`.github/workflows/ci.yml`) — typecheck/lint/test/build on push + PR
- `apps/docs` routes: `/introduction`, `/installation`, `/cli`, `/tokens`, `/icons`, `/fonts`, `/components`, `/components/[slug]` (16 pages)
- `DocsShell` header: font picker (6 Google Fonts, global via `data-font` + CSS vars, persisted to localStorage) + theme toggle (light/dark/system via next-themes)
- Sidebar: Getting started · Foundation · Components

### Phase 4 — App Patterns (in progress)
Package: `packages/patterns`

Patterns are higher-level compositions of primitives. Rules:
- Must depend on `@aetherstack/ui`, never re-implement primitive behavior
- Export named components with a stable API
- Each pattern has its own file in `packages/patterns/src/`
- Docs live at `/patterns/[slug]` in `apps/docs`

Deliverables in progress:
- FormField (Label + control + helper + error message)
- PageHeader (title, description, breadcrumb, actions)
- SectionHeader (title + description + optional action)
- SettingsSection (header + content + optional footer)
- EmptyState (icon, title, description, CTA)
- LoadingState (spinner / skeleton variant)
- ErrorState (title, description, retry CTA)
- MetricCard (label, value, trend, icon)
- FilterToolbar (active filter pills + clear-all)
- TableToolbar (search + filter + actions)
- NavItem / NavGroup (sidebar nav building blocks)
- Breadcrumb