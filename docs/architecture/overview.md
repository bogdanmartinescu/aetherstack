# Architecture Overview

> Companion doc: [`engineering-standards.md`](./engineering-standards.md) — the source of truth for
> coding, API, styling, a11y, and review standards in this repo.

## What is Aetherstack?

**Aetherstack** is the monorepo and umbrella brand that contains the **Aether UI** design system, its
public registry, documentation, and demo applications. It is built as a real product, not a loose
component collection.

---

## Naming Glossary

Six related names show up across the repo — this table pins down what each one refers to so imports
and URLs stay consistent.

| Name | Refers to |
|---|---|
| `aetherstack` | The monorepo, the GitHub repository, and the umbrella brand |
| `Aether UI` | The design system product shipped from this monorepo |
| `@aetherstack/*` | npm scope for all internal packages (e.g. `@aetherstack/ui`) |
| `@aether` | Namespace for the **public** registry manifest items |
| `@aether-pro` | Namespace for the future **premium** registry manifest items |
| `aether-ui` | The CLI binary (`npx @aetherstack/cli` → runs `aether-ui`) |

## Repository Structure

```
aetherstack/
├── apps/
│   ├── docs/             — Public documentation site (Next.js)
│   ├── studio/           — Internal component playground (Next.js, private)
│   ├── demo/             — Reference SaaS dashboard (Next.js)
│   └── registry-public/  — Static registry host (Next.js, output: export)
│
├── packages/
│   ├── config-eslint/    — Shared ESLint configs
│   ├── config-typescript/— Shared tsconfig presets
│   ├── config-tailwind/  — Shared Tailwind base config
│   │
│   ├── tokens/           — Design tokens (colors, spacing, typography, …)
│   ├── ui/               — Core component library (open-code, registry-installable)
│   ├── patterns/         — Higher-level compositions (forms, nav, data)
│   ├── blocks/           — Full page-section layout blocks
│   ├── themes/           — CSS variable theme collections
│   ├── icons/            — lucide-react re-export + custom icons
│   ├── utils/            — Shared utilities (cn(), etc.)
│   │
│   ├── registry-schema/  — Zod schemas + types for registry manifests
│   ├── registry-build/   — Build tooling for validating/generating registries
│   └── cli/              — `aether-ui` CLI (init / add / list)
│
├── registry/
│   ├── public/           — @aether public registry manifest (registry.json)
│   └── pro/              — @aether-pro private registry manifest (registry.json)
│
├── tooling/
│   └── scripts/          — CLI scripts (validate-registry, build-registry)
│
└── docs/
    ├── architecture/     — This file and related ADRs
    ├── product/          — Product positioning and vision docs
    └── roadmap/          — Phased development roadmap
```

---

## Package Dependency Graph

```
config-typescript  ←── (extended by all packages and apps)
config-eslint      ←── (extended by all packages and apps)
config-tailwind    ←── (extended by all apps)

tokens
  └── themes

utils
  └── ui
       └── patterns
            └── blocks

registry-schema
  ├── registry-build
  │    └── tooling/scripts
  └── cli
```

Apps consume whichever packages they need. The `docs`, `studio`, and `demo` apps consume the full
UI stack. `registry-public` only consumes `registry-schema`. The `cli` package depends on
`registry-schema` for validating manifests it fetches at runtime; `tsup` bundles the schema into
the CLI output so the published binary has no workspace runtime deps.

---

## Technology Choices

| Concern | Choice | Rationale |
|---|---|---|
| Monorepo | pnpm workspaces + Turborepo | Industry standard, fast, great caching |
| Language | TypeScript everywhere | Type safety across all boundaries |
| UI framework | Next.js 14 (App Router) | SSR/SSG support, best-in-class DX |
| Styling | Tailwind CSS 3 | Utility-first, token-driven |
| Component model | Open-code, registry-installable | Users own the source; shadcn-format-compatible |
| CLI bundler | tsup | Single-file CJS output with workspace deps inlined |
| Schema validation | Zod | Runtime safety for registry data |
| Versioning | Changesets | Independent package versioning |
| Linting | ESLint 8 | Next.js native support |
| Formatting | Prettier + prettier-plugin-tailwindcss | Consistent class ordering |

---

## Package Exports Strategy

For this monorepo, all packages export their **TypeScript source directly**
(`"main": "./src/index.ts"`). Next.js apps compile them via `transpilePackages`.

This trades a package build step for simplicity during development:
- No `tsc --watch` per package
- TypeScript errors surface in consuming apps
- Zero-config hot reload across package boundaries

When packages are eventually published to npm, a proper build step (e.g. `tsup`)
will be added. The export shape stays the same.

---

## Registry Architecture

Aether UI uses its own registry and CLI — not the shadcn CLI.

- `registry/public/registry.json` — source of truth for the public registry, committed to git
- `apps/registry-public/public/r/registry.json` — built artifact, copied by `build-registry` script
- `apps/registry-public` — static Next.js export served from a CDN at `registry.aetherui.dev`
- `packages/cli` — the `aether-ui` CLI that reads from the registry and installs components

### CLI flow

```
User runs: npx @aetherstack/cli add button

  1. Reads aether.json in project root for config (registry URL, target dirs)
  2. Fetches /r/button.json (or falls back to /r/registry.json manifest)
  3. Validates item against @aetherstack/registry-schema
  4. Writes component files to configured aliases.components directory
  5. Prints any npm/registry dependencies to install manually
```

### Registry format

Each item in the manifest carries its own `files[]` array with either inline
`content` or a `path` the CLI resolves relative to the registry base URL.
The `cssVars` and `tailwind` fields let items ship theme overrides alongside code.

The pro registry (`registry/pro/`) follows the same format and will be served
from an authenticated endpoint in a future phase.
