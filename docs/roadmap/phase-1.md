# Roadmap — Phase 1: Foundation

## Objective

Establish a production-grade monorepo foundation that supports all future work.
No component library yet. No marketing. Clean structure, clean types, clean builds.

## Status

✅ **Complete** — all builds pass, all typechecks pass, lint clean, CLI verified at runtime

---

## Deliverables

### ✅ Monorepo skeleton
- [x] pnpm workspaces
- [x] Turborepo configuration
- [x] TypeScript base configs
- [x] ESLint shared configs
- [x] Prettier + tailwindcss class sorting
- [x] Changesets configuration
- [x] .gitignore, .editorconfig

### ✅ Config packages
- [x] `@aetherstack/typescript-config` (base, nextjs, react-library presets)
- [x] `@aetherstack/eslint-config` (base, next, react-internal)
- [x] `@aetherstack/tailwind-config` (base Tailwind config with CSS variable theme)

### ✅ Design token foundation
- [x] `@aetherstack/tokens` — color palette (violet primary + neutral grays)
- [x] `@aetherstack/tokens` — semantic color variable maps (light + dark)
- [x] `@aetherstack/tokens` — spacing, typography, radius, shadow tokens
- [x] `@aetherstack/themes` — default theme + `generateCssVariables()` helper

### ✅ Utility layer
- [x] `@aetherstack/utils` — `cn()` helper (clsx + tailwind-merge)
- [x] `@aetherstack/icons` — lucide-react re-export

### ✅ UI package skeleton
- [x] `@aetherstack/ui` — `Button` component (placeholder, validates import chain)
- [x] `@aetherstack/ui` — `globals.css` with CSS variable definitions
- [x] `@aetherstack/patterns` — package scaffold
- [x] `@aetherstack/blocks` — package scaffold

### ✅ Registry infrastructure
- [x] `@aetherstack/registry-schema` — Zod schemas + TypeScript types
- [x] `@aetherstack/registry-build` — validate + build utilities
- [x] `registry/public/registry.json` — initial manifest with Button
- [x] `registry/pro/registry.json` — empty placeholder
- [x] `tooling/scripts` — validate-registry and build-registry scripts

### ✅ CLI (`@aetherstack/cli`)
- [x] `aether-ui init` — creates `aether.json` in the user's project
- [x] `aether-ui list` — fetches registry and lists available components grouped by type
- [x] `aether-ui add <component>` — resolves item, checks conflicts, writes files, reports npm deps
- [x] `--overwrite`, `--dry-run`, `--registry`, `--cwd` flags
- [x] `aether.json` config schema (registry URL, component/utils aliases)

### ✅ Apps
- [x] `apps/docs` — Next.js 14, Tailwind, Aether UI, clean placeholder
- [x] `apps/studio` — Next.js 14, component gallery scaffold
- [x] `apps/demo` — Next.js 14, reference SaaS dashboard shell
- [x] `apps/registry-public` — Next.js 14, static export, /r/registry.json endpoint

### ✅ Documentation
- [x] Root README
- [x] `docs/architecture/overview.md`
- [x] `docs/product/positioning.md`
- [x] `docs/roadmap/phase-1.md`

---

## Phase 2 Preview

- Full UI kit: Typography, Input, Select, Checkbox, Badge, Card, Table, Sheet, Dialog, …
- Pattern library: DataTable, SearchInput, FilterBar, StatCard, EmptyState, …
- First public blocks: DashboardShell, SidebarNav, TopBar, SettingsLayout
- MDX-based docs site with component previews and code copy
- `aether-ui add` end-to-end integration tests against the live registry
- GitHub Actions CI (typecheck, lint, build)

## Phase 3 Preview

- Pro registry infrastructure (auth-gated, license check)
- First premium blocks
- Marketing landing page
- Changelog / versioning automation via Changesets
