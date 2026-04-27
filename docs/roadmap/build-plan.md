# Aetherstack Build Plan

Status: Phases 1–3 complete  
Project: Aetherstack  
Design system: Aether UI

## Purpose

This document is the implementation roadmap for Aetherstack. It defines the build phases, expected deliverables, acceptance criteria, and sequencing for turning the current monorepo foundation into a production-grade design system and registry product.

Phase 1 is already complete and committed. The remaining phases should be executed in order unless a specific dependency can be isolated safely.

---

## Product Goal

Aetherstack is the umbrella product and monorepo for **Aether UI**, a premium open-code design system and registry for SaaS products, admin dashboards, and modern internal tools. Its registry format is compatible with the shadcn/ui convention, but it ships its own CLI (`aether-ui`) and is independent from the shadcn CLI.

The system should support:

- public design-system primitives
- reusable app patterns
- polished blocks and shells
- a public installable registry
- a future premium registry
- documentation, demos, and examples
- a maintainable commercial-grade monorepo architecture

---

## Guiding Principles

1. Build foundations before breadth.
2. Prefer consistency over novelty.
3. Keep boundaries strict between tokens, primitives, patterns, and blocks.
4. Optimize for installability and maintainability, not just visual polish.
5. Keep the public system high quality enough to drive trust.
6. Reserve premium value for deeper blocks, complete shells, themes, and vertical kits.
7. Ship each phase with clear acceptance criteria.

---

## Phase Overview

| Phase | Name | Goal |
|------|------|------|
| 1 | Foundation | Monorepo base, package structure, apps, docs scaffolding |
| 2 | Token System | Design tokens, theme contract, CSS variables, base semantics |
| 3 | Core Primitives | Stable foundational components for forms, layout, and interaction |
| 4 | App Patterns | Reusable product-level UI patterns built on primitives |
| 5 | Blocks & Shells | Complete page sections and app blocks with real product value |
| 6 | Public Registry | Installable public registry with validated manifests and build flow |
| 7 | Docs & Demo Hardening | Production-quality docs, examples, demo app, install flows |
| 8 | Pro Architecture | Premium registry structure, gated items, premium package plan |
| 9 | Release Readiness | Versioning, QA, contribution flow, release process, launch prep |

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

## Testing
- `pnpm typecheck`, `pnpm lint`, and `pnpm build` all green across the workspace
- CLI smoke-tested end-to-end: `init` → `list` → `add button` in a clean target directory

## Exit Criteria
- repo installs cleanly
- apps run
- packages resolve
- TypeScript boundaries are working
- structure is stable enough to build on

---

# Phase 2 — Token System

## Goal
Create the design foundation for Aether UI.

## Scope
Build the token layer that all other packages depend on.

## Deliverables
- semantic color system
- base neutral palette
- accent palette(s)
- typography scale
- spacing scale
- radius scale
- shadow scale
- motion tokens
- CSS variable contract
- light/dark theme support
- token exports for package consumption
- docs for token usage

## Package Focus
- `packages/tokens`
- `packages/themes`
- `packages/utils`
- app integration for docs/demo/studio

## Acceptance Criteria
- tokens are defined centrally and consumed consistently
- no primitive hardcodes visual values that should come from tokens
- theme switching is structurally supported
- docs app can demonstrate the token system clearly
- token naming is stable and semantically meaningful

## Notes
This phase should establish the long-term visual language. Avoid overbuilding multiple themes too early. The default Aether theme should be complete and well-structured before any style packs are added.

---

# Phase 3 — Core Primitives

## Goal
Build the first stable, reusable Aether UI primitive layer.

## Scope
Implement the minimum serious component base required for product UI work.

## Deliverables
- Button
- Input
- Textarea
- Select
- Checkbox
- Radio Group
- Switch
- Badge
- Card
- Tabs
- Dialog
- Sheet
- Tooltip
- Table
- Skeleton
- shared variant conventions
- accessibility pass
- docs examples for each component

## Testing
- unit tests (Vitest + Testing Library) for every primitive covering default render, each variant/size, disabled state, and keyboard interaction where applicable
- axe/a11y smoke tests for interactive primitives (Dialog, Sheet, Tabs, Tooltip, Select, Switch)
- visual sanity in `apps/studio` for each primitive at default and key variants

## Package Focus
- `packages/ui`
- `packages/utils`
- `apps/docs`
- `apps/studio`

## Acceptance Criteria
- all primitives compile and are exported cleanly
- components are token-driven
- variants follow a consistent API shape
- keyboard/accessibility behavior is correct for core interactions
- components are demonstrated in docs and studio
- component APIs are stable enough for patterns to depend on them

## Notes
This is the first phase where public quality becomes visible. Do not rush quantity. A smaller, clean set is better than a broad but inconsistent library.

---

# Phase 4 — App Patterns

## Goal
Create reusable product UI compositions built on the primitives.

## Scope
Patterns should represent real application use, not isolated visual demos.

## Deliverables
- Form Field wrapper
- Page Header
- Filter Toolbar
- Search/Command surface
- Empty State
- Loading State
- Error State
- Settings Section
- Section Header
- Table Toolbar
- Sidebar/Nav pattern
- Dashboard metric card pattern
- simple layout helpers

## Testing
- unit tests for each pattern covering composition contracts (slots, props, empty/loading/error states)
- integration tests in `apps/demo` exercising at least one realistic flow per pattern category (form, table toolbar, empty state)

## Package Focus
- `packages/patterns`
- `packages/ui`
- `packages/utils`
- `apps/docs`
- `apps/studio`
- `apps/demo`

## Acceptance Criteria
- patterns depend on primitives, not parallel implementations
- pattern APIs feel product-oriented and reusable
- docs explain where patterns should be used
- demo app consumes patterns realistically
- no pattern duplicates logic that belongs in primitives

## Notes
This phase is where Aether UI starts becoming commercially interesting. Focus on patterns people repeatedly need in SaaS and internal tools.

---

# Phase 5 — Blocks & Shells

## Goal
Deliver installable blocks with obvious end-user value.

## Scope
Create complete sections, page-level structures, and starter building blocks.

## Deliverables
- Login Page block
- Signup Page block
- Dashboard Shell block
- Account Settings Page block
- Pricing Section block
- Onboarding Checklist block
- Profile/Team Settings block
- Empty Dashboard block
- Billing Overview block
- Notification Preferences block
- sidebar/topbar shell variants

## Testing
- render tests per block (snapshot-lite: key structural assertions, not full DOM snapshots)
- a clean-project install test for at least 2 blocks end-to-end through the CLI
- demo app regression pass: every shipped block renders without runtime errors in `apps/demo`

## Package Focus
- `packages/blocks`
- `packages/patterns`
- `packages/ui`
- `packages/themes`
- `apps/docs`
- `apps/demo`

## Acceptance Criteria
- blocks are installable, not just showcased
- blocks are composed from patterns/primitives cleanly
- docs clearly distinguish blocks from primitives/patterns
- demo app proves block interoperability
- at least 5 blocks are strong enough for a public first release

## Notes
This phase creates the first serious differentiation layer. The public/free layer should include a small but polished set. Hold back deeper vertical or premium-value blocks for Pro later.

---

# Phase 6 — Public Registry

## Goal
Turn Aether UI into an installable public registry product.

## Scope
Mature the registry infrastructure scaffolded in Phase 1 and populate it with real items.

## Already delivered in Phase 1
- `@aetherstack/registry-schema` (Zod types + runtime validators)
- `@aetherstack/registry-build` helpers
- `@aetherstack/cli` with `init` / `add` / `list`
- `tooling/scripts/validate-registry` and `tooling/scripts/build-registry`
- placeholder `registry/public/registry.json` and `registry/pro/registry.json`

## Deliverables (this phase)
- populated public `registry.json` with real items
- item manifests for base, primitives, patterns, and selected blocks
- per-item file resolution (inline content vs. path references)
- public namespace strategy using `@aether`
- docs for installation and usage
- versioning strategy for registry items (semver + per-item `version` field)
- registry-format compatibility with the shadcn convention (JSON schema only, not CLI)
- install-test harness: a throwaway project the CLI installs into in CI

## Testing
- CI step: run `validate-registry` on every push; fail on any invalid item
- CI step: install-test harness runs `aether-ui add <item>` against each published item and asserts files land in the right place
- snapshot test on the generated `apps/registry-public/public/r/*.json` artifacts

## Package Focus
- `packages/registry-schema`
- `packages/registry-build`
- `packages/cli`
- `registry/public`
- `apps/registry-public`
- `apps/docs`

## Acceptance Criteria
- registry manifests are valid and reproducible
- install examples work in a clean test project
- at least one `registry:base` flow is defined
- selected public items install correctly via the Aether UI CLI
- docs cover setup, install, and troubleshooting

## Notes
This phase is critical. The value of Aether UI depends heavily on installability and registry discipline, not only design quality.

---

# Phase 7 — Docs & Demo Hardening

## Goal
Make the project feel like a serious product.

## Scope
Polish documentation, examples, and demo consumption.

## Deliverables
- improved docs navigation
- component pages
- pattern pages
- block pages
- token/theming docs
- install guides
- monorepo architecture docs
- demo app using real Aether UI flows
- copy refinement across docs site
- example usage snippets
- contribution guidance

## Package Focus
- `apps/docs`
- `apps/demo`
- `docs/`
- all shared packages as needed

## Acceptance Criteria
- a new developer can understand the product quickly
- demo app showcases realistic use
- install docs are complete
- docs reflect actual package boundaries
- public repo is presentable enough for external users

## Notes
This is a trust phase. Good docs are part of the product.

---

# Phase 8 — Pro Architecture

## Goal
Prepare the premium layer without destabilizing the public system.

## Scope
Design and scaffold the premium namespace and packaging strategy.

## Deliverables
- `@aether-pro` namespace plan
- premium registry structure under `registry/pro`
- auth/gating architecture plan
- premium item classification
- pro block roadmap
- premium theme strategy
- license/access control plan
- separation rules between public and pro items

## Package Focus
- `registry/pro`
- `packages/registry-build`
- docs/product planning
- optional premium source structure if needed

## Acceptance Criteria
- premium boundary is clearly defined
- no accidental coupling between free and premium assets
- premium items can be added without reworking the public registry model
- commercial path is documented clearly

## Notes
Do not implement billing/auth/product delivery before the architecture is clear. This phase is about system design and product separation.

---

# Phase 9 — Release Readiness

## Goal
Prepare Aetherstack for a real public release cycle.

## Scope
Formalize quality, release, and maintenance workflow.

## Deliverables
- changeset/release flow finalized
- versioning policy documented
- package release checklist
- QA checklist for public items
- regression checklist for docs/demo
- contribution guidelines
- issue templates
- PR template
- release notes process
- launch-ready README cleanup
- npm publish flow for `@aetherstack/cli` (required for `npx @aetherstack/cli` to work end-to-end)
- registry CDN deployment for `apps/registry-public`

## Acceptance Criteria
- repo can be maintained consistently
- releases can be created without guesswork
- contribution standards are documented
- public-facing quality bar is enforceable

## Notes
This phase should happen before broad external promotion.

---

## Suggested Build Sequence

Recommended near-term order:

1. Phase 2 — Token System
2. Phase 3 — Core Primitives
3. Phase 4 — App Patterns
4. Phase 5 — Blocks & Shells
5. Phase 6 — Public Registry
6. Phase 7 — Docs & Demo Hardening
7. Phase 8 — Pro Architecture
8. Phase 9 — Release Readiness

---

## Recommended Milestone Strategy

### Milestone A
Complete Phases 2–3  
Outcome: Aether Base + stable primitives

### Milestone B
Complete Phase 4  
Outcome: Aether UI becomes useful for app teams

### Milestone C
Complete Phases 5–6  
Outcome: installable public registry with meaningful value

### Milestone D
Complete Phase 7  
Outcome: public-ready product surface

### Milestone E
Complete Phases 8–9  
Outcome: commercial structure and release discipline

---

## Definition of Done Per Phase

A phase is done only when:

- code is committed and builds cleanly
- docs for the phase exist
- package boundaries remain clean
- exported APIs are deliberate
- acceptance criteria are met
- demo/docs reflect the new functionality where relevant

---

## Out of Scope for Now

The following should not be prioritized until the core system is stable:

- billing implementation
- full premium marketplace
- Figma kit
- complex theming matrix
- multiple framework targets
- CMS/database integrations
- advanced analytics
- SaaS account system

---

## Immediate Next Step

Start **Phase 4 — App Patterns** and complete the following first:

- Form Field wrapper (Label + Input + error message composition)
- Page Header (title, breadcrumb, actions slot)
- Empty State (icon, title, description, CTA)
- Loading State
- Section Header

Patterns must depend on `@aetherstack/ui` primitives, not parallel implementations. Package: `packages/patterns`.

## Standards Enforcement

The following documents define and reinforce implementation quality:

- `CLAUDE.md`
- `docs/architecture/engineering-standards.md`
- `CONTRIBUTING.md`

These standards should be enforced progressively through:

- strict TypeScript
- ESLint rules
- formatting rules
- package boundary discipline
- review checklists
- CI checks later in the build process

No new phase should weaken these standards for convenience.