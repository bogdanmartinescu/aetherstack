# Aetherstack

**Aether UI** — a premium open-code design system for any modern web product, with a
shadcn-compatible registry format, AI-native metadata, an MCP server, and its own installer CLI.

[![License: MIT](https://img.shields.io/badge/License-MIT-violet.svg)](LICENSE)
[![npm](https://img.shields.io/badge/npm-%40aetherstack-violet)](https://www.npmjs.com/org/aetherstack)

---

## What is this?

Aetherstack is the monorepo for **Aether UI** — an open-code design system built for serious web
products: SaaS dashboards, marketing sites, admin interfaces, and AI-powered applications. It is
not a loose component collection; it is a structured product with a public registry, its own CLI,
an MCP server for AI agents, documentation site, playground, and room for a future premium tier.

Aether UI uses a registry format compatible with the shadcn/ui convention (same JSON schema shape),
but ships its own CLI (`aether-ui`) and its own installer. It does not depend on the shadcn CLI and
is not built on top of shadcn/ui.

**Design system name:** Aether UI  
**Registry namespace:** `@aether` (public), `@aether-pro` (future premium)  
**Stack:** Next.js 16 · Tailwind CSS 3 · TypeScript · pnpm workspaces · Turborepo

---

## What's shipped

Counts match the public registry (`registry/public/registry.json` — **151** items):

| Layer                              | Core | + AI-native | Total  |
| ---------------------------------- | ---- | ----------- | ------ |
| Primitives (`@aetherstack/ui`)     | 64   | 14          | **78** |
| Patterns (`@aetherstack/patterns`) | 29   | 10          | **39** |
| Blocks (`@aetherstack/blocks`)     | 25   | 9           | **34** |

All items carry AI metadata, are installable via the CLI, and have per-item registry JSON. AI-native
items (`@aether/ai-*`) are SDK-agnostic — they accept plain strings and `AsyncIterable<string>`;
consumers wire their own AI SDK.

Core packages are published to npm under the `@aetherstack` org (see versions in the package table below).

---

## Project Docs

**Hosting and CI/CD:** Cloudflare Workers Static Assets host the documentation and registry;
CircleCI is the exclusive verification and deployment runner. See the
[Cloudflare deployment operations guide](docs/deployment/README.md),
[registry runbook](docs/deployment/REGISTRY-RUNBOOK.md),
[docs runbook](docs/deployment/DOCS-RUNBOOK.md), and
[migration plan](docs/deployment/CLOUDFLARE-CIRCLECI-MIGRATION.md).

- Documentation: https://aether-ui.dev (Worker: `aether-ui-docs`).
- Registry: https://registry.aether-ui.dev (Worker: `aether-ui-registry`).
- Preview endpoints: `aether-ui-docs.hi-5be.workers.dev` and
  `aether-ui-registry.hi-5be.workers.dev`.
- The public npm release and clean published-CLI installation acceptance remain separate gates.

**Continuous development:** [GOAL.md](GOAL.md) · [AGENTS.md](AGENTS.md) · [ROADMAP.md](ROADMAP.md) · [Task backlog](docs/roadmap/platform-backlog.md) · [Execution state](docs/roadmap/execution-state.md). Future platform features and monetization proposals are planning documents, not shipped functionality.

| Doc                                                                                        | Purpose                                                            |
| ------------------------------------------------------------------------------------------ | ------------------------------------------------------------------ |
| [`docs/architecture/overview.md`](docs/architecture/overview.md)                           | Repo layout, dependency graph, naming glossary                     |
| [`docs/architecture/engineering-standards.md`](docs/architecture/engineering-standards.md) | Coding, API, styling, a11y, and review standards — source of truth |
| [`docs/roadmap/build-plan.md`](docs/roadmap/build-plan.md)                                 | Phased roadmap and acceptance criteria                             |
| [`docs/product/positioning.md`](docs/product/positioning.md)                               | Product vision and audience                                        |
| [`CONTRIBUTING.md`](CONTRIBUTING.md)                                                       | Dev setup, branching, commit style, pre-PR checklist               |
| [`SECURITY.md`](SECURITY.md)                                                               | Vulnerability reporting                                            |
| [`CODE_OF_CONDUCT.md`](CODE_OF_CONDUCT.md)                                                 | Community conduct                                                  |
| [`docs/governance/overview.md`](docs/governance/overview.md)                               | Maintainer decision process                                        |
| [`CLAUDE.md`](CLAUDE.md)                                                                   | Working rules for AI assistants in this repo                       |
| [`LICENSE`](LICENSE)                                                                       | MIT — free for personal and commercial use                         |

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
│   ├── ui/               — Core component library (64 + 14 AI primitives)
│   ├── patterns/         — Higher-level UI compositions (29 + 10 AI patterns)
│   ├── blocks/           — Full page-section blocks (25 + 9 AI blocks)
│   ├── themes/           — CSS variable theme collections
│   ├── icons/            — Icon set (lucide-react + custom Aether icons)
│   ├── utils/            — Shared utilities
│   ├── registry-schema/  — Zod types for registry manifests + AI metadata
│   ├── registry-build/   — Registry build & validation tooling
│   ├── mcp-server/       — stdio MCP server (list/get/install/compose tools)
│   └── cli/              — `aether-ui` CLI (init / add / list / generate)
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

All packages are published to npm. Install components using the Aether UI CLI:

```bash
# 1. Initialize your project (creates aether.json)
npx @aetherstack/cli init

# 2. Browse available components
npx @aetherstack/cli list

# 3. Add a component
npx @aetherstack/cli add button

# 4. Add multiple components at once
npx @aetherstack/cli add button badge card

# 5. Generate components from a description (AI-driven)
npx @aetherstack/cli generate "make me a SaaS dashboard"
npx @aetherstack/cli generate "add a chat interface"
npx @aetherstack/cli generate "build an onboarding flow"
```

The CLI writes component source files directly into your project — you own the code.
No lock-in. No wrapper components. Just clean, editable TypeScript.

---

## MCP Server (for AI Agents)

Aether UI ships a stdio MCP server that lets AI agents discover, inspect, and install components:

```json
{
  "mcpServers": {
    "aether-ui": {
      "command": "npx",
      "args": ["@aetherstack/mcp-server"]
    }
  }
}
```

Available tools: `list_components`, `get_component`, `install_component`, `compose_block`.

See [`apps/docs/src/app/(docs)/llms`](apps/docs/src/app/%28docs%29/llms) or your running docs site at `/llms` for the full setup guide and canonical composition recipes.

---

## Package Overview

| Package                          | npm      | Description                                                      |
| -------------------------------- | -------- | ---------------------------------------------------------------- |
| `@aetherstack/tokens`            | ✅ 0.1.1 | Design tokens — colors, spacing, typography, radius, shadows     |
| `@aetherstack/ui`                | ✅ 0.4.0 | Core UI components — 64 primitives + 14 AI-native primitives     |
| `@aetherstack/patterns`          | ✅ 0.3.0 | Higher-level compositions — 29 patterns + 10 AI-native patterns  |
| `@aetherstack/blocks`            | ✅ 0.3.0 | Full page-section layout blocks — 25 blocks + 9 AI-native blocks |
| `@aetherstack/themes`            | ✅ 0.0.3 | CSS variable theme collections                                   |
| `@aetherstack/utils`             | ✅ 0.1.1 | `cn()` and shared utility functions                              |
| `@aetherstack/registry-schema`   | ✅ 0.0.2 | Zod schemas and TypeScript types for registry data + AI metadata |
| `@aetherstack/mcp-server`        | ✅ 0.1.1 | stdio MCP server for AI agent integration                        |
| `@aetherstack/cli`               | ✅ 0.1.1 | `aether-ui` CLI — `init`, `add`, `list`, `generate` commands     |
| `@aetherstack/registry-build`    | internal | Registry validation and build utilities                          |
| `@aetherstack/eslint-config`     | internal | Shared ESLint configurations                                     |
| `@aetherstack/typescript-config` | internal | Shared TypeScript configurations                                 |
| `@aetherstack/tailwind-config`   | internal | Shared Tailwind CSS base configuration                           |

---

## Contributing

See [`CONTRIBUTING.md`](CONTRIBUTING.md) for setup, branching, and the pre-PR checklist.
Conduct: [`CODE_OF_CONDUCT.md`](CODE_OF_CONDUCT.md). Security reports: [`SECURITY.md`](SECURITY.md).
Governance: [`docs/governance/overview.md`](docs/governance/overview.md).

---

## License

MIT — see [LICENSE](LICENSE) for details.
