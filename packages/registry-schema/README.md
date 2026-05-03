# @aetherstack/registry-schema

> Zod schemas and TypeScript types for the Aether UI registry format.

Part of the [Aetherstack](https://aether-ui.dev) design system monorepo.

## What this is

`@aetherstack/registry-schema` defines the canonical shape of Aether UI registry items and manifests. It is used internally by the registry build tooling and the CLI, and is available for anyone building tooling on top of the registry format (validators, custom CLIs, IDE extensions).

The registry format is compatible with the shadcn/ui registry convention and extends it with an `ai` metadata block.

## Install

```bash
pnpm add @aetherstack/registry-schema
```

## Usage

```ts
import {
  registryItemSchema,
  registrySchema,
  type RegistryItem,
  type Registry,
  type RegistryItemAi,
} from "@aetherstack/registry-schema"

// Validate an item at runtime
const result = registryItemSchema.safeParse(rawItem)
if (!result.success) {
  console.error(result.error.flatten())
}

// Type-safe registry item with AI metadata
const item: RegistryItem = {
  name: "button",
  type: "registry:ui",
  title: "Button",
  description: "Trigger an action or navigate",
  files: [{ path: "components/ui/button.tsx", type: "registry:ui" }],
  ai: {
    intent: "Trigger an action or navigate; supports multiple visual styles and sizes",
    prompts: ["add a button", "create a submit button"],
    slots: ["children", "variant", "size", "asChild"],
    composition: ["form-field", "dialog", "card"],
  },
}
```

## Exported schemas and types

| Export | Description |
|---|---|
| `registryItemSchema` | Zod schema for a single registry item |
| `registrySchema` | Zod schema for a full registry manifest |
| `registryItemTypeSchema` | Zod enum for item types (`registry:ui`, `registry:pattern`, `registry:block`) |
| `registryItemFileSchema` | Zod schema for a file entry within an item |
| `registryItemAiSchema` | Zod schema for the `ai` metadata block |
| `RegistryItem` | TypeScript type inferred from `registryItemSchema` |
| `Registry` | TypeScript type inferred from `registrySchema` |
| `RegistryItemAi` | TypeScript type inferred from `registryItemAiSchema` |

## Documentation

- [Introduction](https://aether-ui.dev/introduction) — Aether UI architecture and registry format overview
- [AI & MCP](https://aether-ui.dev/llms) — how the `ai` metadata block is used by LLMs and the MCP server

## License

MIT — see [LICENSE](../../LICENSE)
