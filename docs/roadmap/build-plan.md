# Aetherstack Build Plan

Status: Phases 1–4 complete · Phase 4.6 in progress · Phase 5 (AI Foundations) next
Project: Aetherstack
Design system: Aether UI

## Purpose

This document is the implementation roadmap for Aetherstack. It defines the build phases, expected deliverables, acceptance criteria, and sequencing for turning the current monorepo foundation into a production-grade, AI-native design system and registry product.

Phases 1–4 are complete and committed. Phase 4.6 is a stabilization sprint (see [the audit & stabilization plan](../../.cursor/plans/aetherstack_quality_stabilization_ea20042a.plan.md)) that tightens the truth-floor of what's already shipped before the AI-native expansion in Phase 5+.

---

## Product Goal

Aetherstack is the umbrella product and monorepo for **Aether UI**, a premium open-code design system and registry for SaaS products, admin dashboards, and modern internal tools. Its registry format is compatible with the shadcn/ui convention, but it ships its own CLI (`aether-ui`), AI metadata, and an opt-in MCP server, and is independent of the shadcn CLI.

The system supports:

- public design-system primitives, patterns, and blocks
- a public installable registry consumed via a first-party CLI
- a future premium registry behind auth + license gating
- AI-native metadata so LLMs can generate, modify, and reason about Aether UI components
- documentation, demos, and examples that match the shipped reality
- a maintainable commercial-grade monorepo architecture

---

## Guiding Principles

1. Build foundations before breadth.
2. Prefer consistency over novelty.
3. Keep boundaries strict between tokens, primitives, patterns, blocks, and AI metadata.
4. Optimize for installability and maintainability, not just visual polish.
5. Keep the public system high quality enough to drive trust.
6. Reserve premium value for deeper blocks, complete shells, themes, and vertical kits.
7. Ship each phase with clear acceptance criteria.
8. Truth in docs: every claim is verifiable in CI before it appears in user-facing docs.

---

## Phase Overview

| Phase | Name | Goal |
|------|------|------|
| 1 | Foundation | Monorepo base, package structure, apps, docs scaffolding |
| 2 | Token System | Design tokens, theme contract, CSS variables, base semantics |
| 3 | Core Primitives | Stable foundational components for forms, layout, and interaction |
| 4 | App Patterns | Reusable product-level UI patterns + first 3 blocks (Dashboard Shell, Login, Signup) |
| 4.6 | Quality, Truth & Coverage | Reality stabilization — registry truth, reference apps, test coverage, CI hardening |
| 5 | AI Foundations | LLM-friendly metadata, `llms.txt`, MCP server, prompt-driven CLI flow |
| 6 | Component Gap-Fill | Net-new primitives, patterns, and blocks chosen by SaaS/AI value |
| 7 | Public Registry hardened | Production-ready public registry, install flows, CDN, versioning |
| 8 | Pro Architecture | Auth, license gating, premium namespace, billing flow |
| 9 | Pro Content + Launch | Vertical kits (CRM, Billing, Analytics), AI Recipes Pro, public launch |

---

# Phase 1 — Foundation

Status: Complete

## Goal
Create the monorepo base and product scaffolding.

## Delivered
- root monorepo structure (pnpm workspaces + Turborepo)
- shared config packages (`config-typescript`, `config-eslint`, `config-tailwind`)
- app scaffolds (`docs`, `studio`, `demo`, `registry-public` with static export)
- package scaffolds (`tokens`, `ui`, `patterns`, `blocks`, `themes`, `icons`, `utils`)
- registry packages (`registry-schema` with Zod types, `registry-build` helpers)
- registry placeholders for `@aether` (public) and `@aether-pro` (premium)
- `@aetherstack/cli` with `init`, `add`, and `list` commands, bundled via `tsup`
- `aether.json` consumer config contract
- validation + build scripts (`validate-registry`, `build-registry`) in `tooling/scripts`
- engineering standards doc, AI working rules (`CLAUDE.md`), product positioning, architecture overview
- roadmap/docs foundation

## Exit Criteria — all met
- repo installs cleanly
- apps run
- packages resolve
- TypeScript boundaries are working

---

# Phase 2 — Token System

Status: Complete

## Delivered
- semantic color system + base neutral palette + accent palettes
- typography, spacing, radius, shadow, motion scales
- CSS variable contract with light/dark theme support
- token exports for package consumption
- 26 vitest cases covering token shape, palette structure, and semantic mapping
- docs for token usage in `apps/docs/src/app/(docs)/tokens`

## Acceptance Criteria — all met
- tokens are defined centrally and consumed consistently
- no primitive hardcodes visual values that should come from tokens
- theme switching is structurally supported
- token naming is stable and semantically meaningful

---

# Phase 3 — Core Primitives

Status: Complete

## Delivered
- 16 primitives in `packages/ui/src/components/`: Badge, Button, Card, Checkbox, Dialog, Input, Label, Radio Group, Select, Sheet, Skeleton, Switch, Table, Tabs, Textarea, Tooltip
- shared variant conventions, accessibility pass, docs examples per component
- 56 vitest cases covering default render, variants/sizes, disabled state, keyboard interaction
- visual sanity in `apps/studio` for each primitive

## Phase 3 Extras (delivered beyond spec)

### Infrastructure
- **Next.js 16.2.4** (Turbopack-enabled) across all four apps
- **npm publishing pipeline** via `tsup` for `@aetherstack/ui`, `@aetherstack/tokens`, `@aetherstack/utils`
- **CI (GitHub Actions)** with parallel Typecheck/Lint, Test, and Build jobs
- **PR template** + `develop` branch model

### Documentation (apps/docs)
| Route | Content |
|-------|---------|
| `/introduction` | shadcn/ui-style intro: design principles, architecture layers, tech stack, quick-start, comparison table |
| `/installation` | Setup for Next.js App Router, Pages Router, Vite + React, Remix, Astro, TanStack Start |
| `/cli` | Full CLI reference: `init`, `add`, `diff`, `update`, `list`, `aether.json` schema |
| `/tokens` | Design token reference |
| `/icons` | Lucide React integration: 80+ icon reference grid, a11y notes |
| `/fonts` | 6-font catalog with live UI demo |
| `/components` | Component index with category grouping |
| `/components/[slug]` | Individual pages for all 16 primitives |
| `/blocks` | Block gallery (Dashboard / Login / Signup) |
| `/charts` | Recharts integration with 4 live chart examples |
| `/patterns` | Pattern index + per-pattern pages |

### Theme + font system
- `next-themes` light/dark/system toggle
- 6 curated Google Fonts swappable via `data-font` attribute on `<html>`, FOUC-prevention inline script

---

# Phase 4 — App Patterns + First Blocks

Status: Complete

## Delivered

### Patterns (packages/patterns)
12 patterns in 9 source files: **FormField** (+ FormLabel, FormControl, FormDescription, FormMessage, useFormField), **PageHeader** (+ Breadcrumb), **SectionHeader** (+ SettingsSection), **EmptyState**, **LoadingState**, **ErrorState**, **MetricCard**, **TableToolbar** (+ FilterToolbar, FilterPill), and **NavItem** / **NavGroup** / **SidebarNav**.

85 vitest cases covering composition contracts, slots, props, error states, and a11y attributes.

### First three blocks (packages/blocks)
- **DashboardShell** — collapsible sidebar, topbar with search/notifications, content slot
- **LoginBlock** — email + password form with validation, optional split-panel layout
- **SignupBlock** — name + email + password form with validation and terms/privacy links

## Acceptance Criteria — all met
- patterns depend on primitives, not parallel implementations
- pattern APIs feel product-oriented and reusable
- docs explain where patterns and blocks should be used
- demo and studio consume patterns and blocks (post-Phase-4.6)
- no pattern duplicates logic that belongs in primitives

---

# Phase 4.6 — Quality, Truth & Coverage

Status: In progress (current)

## Goal
Close the gap between what the build plan claimed and what was actually shipped. Make every claim verifiable in CI before stacking new phases on top.

## Tracks (see [stabilization plan](../../.cursor/plans/aetherstack_quality_stabilization_ea20042a.plan.md) for full detail)

### Track A — Registry truth
- `registry/public/registry.json` populated with all 28 items (16 primitives + 9 patterns + 3 blocks)
- `registry/pro/registry.json` populated with two `pro: true` placeholders
- `tooling/scripts/build-registry.ts` emits one `r/<name>.json` per item alongside the aggregate manifest
- CLI integration test runs `init` + `add` against a fixture project in CI

### Track B — Reference app reality
- `apps/demo` rebuilt with `/dashboard`, `/users`, `/settings`, `/login` routes using `DashboardShell`, `LoginBlock`, real patterns, and recharts — no placeholder text
- `apps/studio` extended with Patterns and Blocks sections so the playground reflects everything we ship

### Track C — Test coverage
- Vitest suites added to `cli` (config / lib/registry / lib/installer + integration), `registry-schema`, `registry-build`, and `blocks`
- All workspace packages with logic now run in CI

### Track D — CI hardening
- Build job runs on every PR (no longer push-only)
- `validate-registry` + `build-registry` diff check enforce registry truth
- Changeset check fails on PRs that touch `packages/*/src/**` without a `.changeset/*.md`
- New test suites wired into the CI test job

### Track E — Cleanups & truth in docs
- `@aetherstack/icons` populated with custom AetherMark / AetherGlyph / AetherSpark / AetherStack icons on top of the lucide-react re-export
- Stray `console.log` removed from docs installation page
- Build plan rewritten (this file)
- Component counts on the introduction page sourced from `src/index.ts` exports at build time
- `pnpm install-hooks` callout added to `CONTRIBUTING.md`

## Acceptance Criteria
- `aether-ui add <any-shipped-item>` installs the file into a fixture project with no errors
- `apps/registry-public/public/r/` contains exactly N+1 JSON files (one per item plus the aggregate)
- `apps/demo` boots and shows three real routes plus `/login`
- `pnpm test` runs vitest in `cli`, `registry-schema`, `registry-build`, `blocks`, plus existing `tokens`, `ui`, `patterns` — all green
- A PR that modifies `packages/ui/src/components/button.tsx` without a changeset fails CI
- A PR that introduces a build error fails CI
- The introduction page no longer hard-codes "16 primitives"

---

# Phase 5 — AI Foundations

Status: Pending (next after Phase 4.6)

## Goal
Make Aether UI the most LLM-friendly design system in the ecosystem. Treat AI agents as a primary consumer alongside human developers.

## Deliverables
- **`llms.txt`** at the registry-public root following the [llms.txt convention](https://llmstxt.org/) — directory of every item with description and install command, optimized for LLM context windows
- **AI metadata schema** extension to `RegistryItem`: `prompts` (example natural-language prompts that should produce this item), `intent` (machine-readable purpose), `composition` (which other items are typically used with this), `slots` (named insertion points an LLM can target)
- **MCP server** (`@aetherstack/mcp-server`): exposes `list_components`, `get_component`, `install_component`, `compose_block` tools so Cursor / Claude Desktop / Codex CLI can read and use the registry directly
- **Prompt-driven CLI**: `aether-ui generate "build me a settings page with notifications and billing sections"` resolves into a sequence of `add` calls plus a starter file
- **Docs site `/llms`** route documenting AI usage and copy-paste integration snippets for popular agents

## Package Focus
- new `packages/mcp-server`
- `packages/registry-schema`
- `packages/cli`
- `apps/registry-public`
- `apps/docs`

## Acceptance Criteria
- An LLM can fetch `/llms.txt` and produce a syntactically valid install plan for "make me a SaaS dashboard"
- The MCP server passes basic conformance tests against a stock Cursor instance
- AI metadata is required for new public-registry items (CI rejects items missing it)
- The prompt-driven CLI resolves at least 5 canonical demo prompts deterministically

## Notes
This is Aether UI's primary differentiation lever. Get this right before adding more components.

---

# Phase 6 — Component Gap-Fill

Status: Pending

## Goal
Bring the public surface to "good enough for any SaaS product" by filling gaps prioritized by SaaS frequency and AI-prompt frequency.

## Deliverables (proposed; finalized at phase entry)

### Primitives
- DropdownMenu / ContextMenu (Radix popover backbone)
- Combobox (autocomplete select with search)
- Calendar / DatePicker
- Toast (notifications system)
- Avatar / AvatarGroup
- Progress / Slider
- ScrollArea
- Separator
- Accordion
- HoverCard
- Toggle / ToggleGroup
- Pagination

### Patterns
- DataTable (sortable, paginated, with column visibility)
- CommandPalette (⌘K searchable command surface)
- StatGroup (multi-metric dashboard row)
- Stepper / Wizard
- KanbanColumn
- ActivityFeed
- FileDropzone
- ColorPicker

### Blocks
- AccountSettings block
- BillingOverview block
- OnboardingChecklist block
- PricingSection block
- TeamSettings block
- NotificationCenter block
- EmptyDashboard block

## Acceptance Criteria
- Every new item ships with: source code in the right package, vitest tests, docs page, AI metadata, registry entry, per-item JSON output
- No primitive hardcodes visual values that belong in tokens
- All items installable end-to-end through the CLI
- Studio playground updated alongside each new item

## Notes
Quantity matters here — but not at the cost of consistency. Reject any item that breaks Phase 4 patterns or skips its acceptance gates.

---

# Phase 7 — Public Registry Hardened

Status: Pending

## Goal
Make the public registry production-quality: durable URLs, versioning, CDN delivery, and a polished install experience.

## Deliverables
- production registry domain (`registry.aetherui.dev`) backed by a CDN
- per-item versioning with semver and `version` field; CLI prefers exact versions when pinned
- `aether-ui update` command upgrades installed items to their latest registry version
- `aether-ui diff` command shows changes between installed file and registry version
- `aether-ui registry list-namespaces` enumerates `@aether`, `@aether-pro`, and any third-party registries
- npm publish flow for `@aetherstack/cli` so `npx @aetherstack/cli init` works for end users
- install-test harness expanded: clean Next.js, Vite, and Remix fixture projects in CI

## Acceptance Criteria
- A new user can run `npx @aetherstack/cli init && npx @aetherstack/cli add dashboard-shell` against the public CDN with zero local setup
- Every published item has a stable `/r/<name>@<version>.json` URL
- CI runs end-to-end install tests against three real frameworks
- Docs cover the full install + update + diff workflow

---

# Phase 8 — Pro Architecture

Status: Pending

## Goal
Build the commercial layer: auth, license gating, billing, and the premium-namespace runtime — without destabilizing the public system.

## Deliverables
- `@aether-pro` namespace fully wired: registry, CDN, schema-level `pro: true` enforcement
- license-aware CLI: `aether-ui login`, `aether-ui add <pro-item>` checks license token before fetching
- account dashboard at `account.aetherui.dev` (sign in, manage seats, view license keys, download invoices)
- Stripe checkout + customer portal integration with workspace-level seat counts
- license validation service (token-bound, rotatable, offline-capable for short windows)
- separation rules between public and pro source: pro items live in `registry/pro/**` with their own build pipeline and never leak into public registry artefacts
- pro `llms.txt` gated behind license

## Acceptance Criteria
- A non-licensed user cannot download any `pro: true` registry item
- A licensed user can install pro items via the CLI without manual auth flow
- Pro items can be added or revoked without rebuilding the public registry
- Account, billing, and license flows are documented and self-serve

## Notes
Resist the urge to ship pro content before the gating works end-to-end. Architecture first, content second.

---

# Phase 9 — Pro Content + Launch

Status: Pending

## Goal
Ship enough premium value to justify a paid tier, then launch publicly.

## Deliverables

### Pro content
- **CRM Vertical Kit** — Contacts page, Deal Pipeline kanban, Activity Timeline block, Contact Drawer
- **Billing Vertical Kit** — Subscription management, Invoice history, Usage charts, Plan picker
- **Analytics Vertical Kit** — Dashboards with recharts, Funnel charts, Cohort retention, Custom report builder
- **AI Recipes Pro** — opinionated prompt → generated-stack flows (e.g. "make me a project management tool"), each backed by composed pro blocks
- 2–3 premium themes (Slate Pro, Indigo Pro, Onyx) with full token overrides

### Release polish
- changesets release flow finalized for both `@aetherstack/*` and `@aether-pro/*`
- versioning policy documented
- regression checklist for docs, demo, and registry
- contribution guidelines + issue templates + release notes process
- launch-ready README, marketing copy, comparison page vs shadcn/ui
- Lighthouse pass on `apps/docs` and `account.aetherui.dev`
- visual regression baseline (Playwright + Percy or equivalent) for primitives and blocks

## Acceptance Criteria
- A subscriber can subscribe, install at least one vertical kit, and ship a working SaaS feature in under 30 minutes
- Repo is maintainable consistently
- Public-facing quality bar is enforceable

## Notes
This is the public-launch milestone. Defer any item that's not directly required for it.

---

## Suggested Build Sequence

Recommended order:

1. ~~Phase 2 — Token System~~ ✅
2. ~~Phase 3 — Core Primitives~~ ✅
3. ~~Phase 4 — App Patterns + First Blocks~~ ✅
4. **Phase 4.6 — Quality, Truth & Coverage** (current)
5. Phase 5 — AI Foundations
6. Phase 6 — Component Gap-Fill
7. Phase 7 — Public Registry Hardened
8. Phase 8 — Pro Architecture
9. Phase 9 — Pro Content + Launch

---

## Recommended Milestone Strategy

### Milestone A — Foundation ✅
Phases 2–3 — Aether Base + stable primitives

### Milestone B — Composability ✅
Phase 4 — Aether UI useful for app teams

### Milestone B.5 — Trust (current)
Phase 4.6 — Truth, coverage, CI parity with claims

### Milestone C — AI Native
Phase 5 — Differentiated, LLM-first design system

### Milestone D — Breadth
Phases 6–7 — Public registry production-ready with broad component coverage

### Milestone E — Commercial
Phases 8–9 — Pro tier live, launch ready

---

## Definition of Done Per Phase

A phase is done only when:

- code is committed and builds cleanly on PRs (not just on merge)
- every claim in this build plan is reflected in shipped code or CI
- docs for the phase exist and match reality
- package boundaries remain clean
- exported APIs are deliberate
- acceptance criteria are met in CI
- demo/docs reflect the new functionality where relevant

---

## Out of Scope for Now

The following should not be prioritized until Phase 9:

- multiple framework targets beyond Next.js / Vite / Remix
- CMS/database integrations
- advanced analytics / telemetry
- Figma kit
- mobile-native rendering targets

---

## Standards Enforcement

The following documents define and reinforce implementation quality:

- `CLAUDE.md`
- `docs/architecture/engineering-standards.md`
- `CONTRIBUTING.md`

These standards are enforced through:

- strict TypeScript
- ESLint rules
- formatting rules
- package boundary discipline
- review checklists
- automated CI checks (typecheck, lint, tests, registry validation, build, changeset enforcement)

No new phase should weaken these standards for convenience.
