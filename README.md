# Aetherstack

**Aether UI** — a premium design system for SaaS dashboards and admin interfaces, with a
shadcn-compatible registry format and its own installer CLI.

[![License: MIT](https://img.shields.io/badge/License-MIT-violet.svg)](LICENSE)

---

## What is this?

Aetherstack is the monorepo for **Aether UI** — an open-code design system built for serious SaaS
products. It is not a loose component collection; it is a structured product with a public
registry, its own CLI, documentation site, playground, and room for a future premium tier.

Aether UI uses a registry format compatible with the shadcn/ui convention (same JSON schema shape),
but ships its own CLI (`aether-ui`) and its own installer. It does not depend on the shadcn CLI and
is not built on top of shadcn/ui.

**Design system name:** Aether UI  
**Registry namespace:** `@aether` (public), `@aether-pro` (future premium)  
**Stack:** Next.js 14 · Tailwind CSS 3 · TypeScript · pnpm workspaces · Turborepo

---

## Project Docs

| Doc | Purpose |
|---|---|
| [`docs/architecture/overview.md`](docs/architecture/overview.md) | Repo layout, dependency graph, naming glossary |
| [`docs/architecture/engineering-standards.md`](docs/architecture/engineering-standards.md) | Coding, API, styling, a11y, and review standards — source of truth |
| [`docs/roadmap/build-plan.md`](docs/roadmap/build-plan.md) | Phased roadmap and acceptance criteria |
| [`docs/product/positioning.md`](docs/product/positioning.md) | Product vision and audience |
| [`CONTRIBUTING.md`](CONTRIBUTING.md) | Dev setup, branching, commit style, pre-PR checklist |
| [`CLAUDE.md`](CLAUDE.md) | Working rules for AI assistants in this repo |

---

## Repository Structure

```
aetherstack/
├── apps/
│   ├── docs/             — Public documentation (localhost:3000)
│   ├── studio/           — Internal component playground (localhost:3001)
│   ├── demo/             — Reference SaaS dashboard (localhost:3002)
│   └── registry-public/  — Public registry static site (localhost:3003)
│
├── packages/
│   ├── config-eslint/
│   ├── config-typescript/
│   ├── config-tailwind/
│   ├── tokens/           — Design tokens (colors, spacing, typography, …)
│   ├── ui/               — Core component library
│   ├── patterns/         — Higher-level UI compositions
│   ├── blocks/           — Full page-section blocks
│   ├── themes/           — CSS variable theme collections
│   ├── icons/            — Icon set (lucide-react + custom)
│   ├── utils/            — Shared utilities
│   ├── registry-schema/  — Zod types for registry manifests
│   ├── registry-build/   — Registry build & validation tooling
│   └── cli/              — `aether-ui` CLI (init / add / list)
│
├── registry/
│   ├── public/           — Public registry manifest
│   └── pro/              — Pro registry manifest (future)
│
├── tooling/scripts/      — Monorepo scripts
└── docs/                 — Architecture, product, roadmap docs
```

---

## Getting Started

### Prerequisites

- Node.js ≥ 20
- pnpm ≥ 9 (`npm install -g pnpm`)

### Install

```bash
pnpm install
```

### Develop

```bash
# Start all apps in parallel
pnpm dev

# Start a specific app
pnpm --filter @aetherstack/docs dev
pnpm --filter @aetherstack/studio dev
pnpm --filter @aetherstack/demo dev
```

### Build

```bash
pnpm build
```

### Lint & typecheck

```bash
pnpm lint
pnpm typecheck
```

### Format

```bash
pnpm format
```

### Registry

```bash
# Validate registry manifests
pnpm --filter @aetherstack/scripts validate-registry

# Build registry output for registry-public app
pnpm --filter @aetherstack/scripts build-registry
```

---

## Using Aether UI in Your Project

Install components using the Aether UI CLI:

```bash
# 1. Initialize your project (creates aether.json)
npx @aetherstack/cli init

# 2. Browse available components
npx @aetherstack/cli list

# 3. Add a component
npx @aetherstack/cli add button

# 4. Add multiple components at once
npx @aetherstack/cli add button badge card
```

The CLI writes component source files directly into your project — you own the code.
No lock-in. No wrapper components. Just clean, editable TypeScript.

> **Note:** `@aetherstack/cli` is not yet published to npm. During development, run the CLI from
> this repo instead:
>
> ```bash
> # Dev mode (tsx, no build required)
> pnpm --filter @aetherstack/cli dev -- add button --cwd /path/to/your/project
>
> # Or after `pnpm --filter @aetherstack/cli build`, invoke the compiled binary
> node packages/cli/dist/index.js add button --cwd /path/to/your/project
> ```
>
> The published `npx @aetherstack/cli` flow becomes available after Phase 9 (release readiness).

---

## Package Overview

| Package | Description |
|---|---|
| `@aetherstack/tokens` | Design tokens — colors, spacing, typography, radius, shadows |
| `@aetherstack/ui` | Core UI components (open-code, registry-installable) |
| `@aetherstack/patterns` | Higher-level compositions built on `@aetherstack/ui` |
| `@aetherstack/blocks` | Full page-section layout blocks |
| `@aetherstack/themes` | CSS variable theme collections |
| `@aetherstack/icons` | Icons (lucide-react + custom Aether icons) |
| `@aetherstack/utils` | `cn()` and shared utility functions |
| `@aetherstack/registry-schema` | Zod schemas and TypeScript types for registry data |
| `@aetherstack/registry-build` | Registry validation and build utilities |
| `@aetherstack/cli` | `aether-ui` CLI — `init`, `add`, `list` commands |
| `@aetherstack/eslint-config` | Shared ESLint configurations |
| `@aetherstack/typescript-config` | Shared TypeScript configurations |
| `@aetherstack/tailwind-config` | Shared Tailwind CSS base configuration |

---

## Contributing

This is a private monorepo. Contribution guidelines will be added when the project opens.

---

## License

MIT — see [LICENSE](LICENSE) for details.
