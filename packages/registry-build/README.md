# @aetherstack/registry-build

> Build and validation tooling for the Aether UI registry.

Part of the [Aetherstack](https://aether-ui.dev) design system monorepo.

## What this is

`@aetherstack/registry-build` provides the functions used by `tooling/scripts` to validate, build, and sort Aether UI registry manifests. Use it if you are building tooling that needs to process or generate registry-compatible JSON.

## Install

```bash
pnpm add @aetherstack/registry-build
```

## Usage

```ts
import {
  buildRegistry,
  sortRegistryItems,
  validateRegistry,
  validateRegistryItem,
  findMissingDependencies,
  type BuildResult,
  type ValidationResult,
} from "@aetherstack/registry-build"

// Validate a raw registry object (parsed from JSON)
const validation: ValidationResult = validateRegistry(raw)
if (!validation.valid) {
  console.error(validation.errors)
}

// Build a registry — resolves item dependencies, attaches metadata
const { registry, warnings }: BuildResult = buildRegistry(raw)

// Sort items by type then name (ui → pattern → block, then alphabetical)
const sorted = sortRegistryItems(registry.items)

// Find items referenced as dependencies that are not present in the registry
const missing = findMissingDependencies(registry.items)
```

## Exported API

| Export | Description |
|---|---|
| `buildRegistry(raw)` | Parse and build a registry manifest, returning resolved items and warnings |
| `sortRegistryItems(items)` | Sort registry items by type order then name |
| `validateRegistry(raw)` | Validate a full registry manifest against the schema |
| `validateRegistryItem(raw)` | Validate a single registry item |
| `findMissingDependencies(items)` | Return dependency names referenced by items that are absent from the list |
| `BuildResult` | `{ registry: Registry; warnings: string[] }` |
| `ValidationResult` | `{ valid: boolean; errors: string[] }` |

## Documentation

- [Introduction](https://aether-ui.dev/introduction) — Aether UI architecture and registry format overview
- [AI & MCP](https://aether-ui.dev/llms) — how validated registry items are served to LLMs

## License

MIT — see [LICENSE](../../LICENSE)
