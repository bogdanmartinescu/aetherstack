# Aetherstack

**Aether UI** — a premium shadcn-compatible design system for SaaS dashboards and admin interfaces.

[![License: MIT](https://img.shields.io/badge/License-MIT-violet.svg)](LICENSE)

---

## What is this?

Aetherstack is the monorepo for **Aether UI** — an open-code, shadcn/ui-compatible design system
built for serious SaaS products. It is not a loose component collection; it is a structured product
with a public registry, documentation site, playground, and room for a future premium tier.

**Design system name:** Aether UI  
**Registry namespace:** `@aether` (public), `@aether-pro` (future premium)  
**Stack:** Next.js 14 · Tailwind CSS 3 · TypeScript · pnpm workspaces · Turborepo · shadcn/ui-compatible

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
│   └── registry-build/   — Registry build & validation tooling
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

---

## Package Overview

| Package | Description |
|---|---|
| `@aetherstack/tokens` | Design tokens — colors, spacing, typography, radius, shadows |
| `@aetherstack/ui` | Core UI components (shadcn-compatible) |
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
