#!/usr/bin/env tsx
/**
 * Builds the public registry manifest, inlining file content for every item,
 * and writes:
 *   - apps/registry-public/public/r/registry.json   (aggregate)
 *   - apps/registry-public/public/r/<name>.json     (one per item)
 *
 * The CLI prefers per-item endpoints (see packages/cli/src/lib/registry.ts
 * `fetchRegistryItem`) and falls back to the aggregate when those 404, so we
 * emit both for compatibility.
 *
 * Run with: pnpm --filter @aetherstack/scripts build-registry
 */
import {
  existsSync,
  mkdirSync,
  readdirSync,
  readFileSync,
  rmSync,
  writeFileSync,
} from "node:fs"
import { resolve } from "node:path"
import { buildRegistry, sortRegistryItems } from "@aetherstack/registry-build"
import type { Registry, RegistryItem } from "@aetherstack/registry-schema"

const ROOT = resolve(__dirname, "../../../")

const INPUT = resolve(ROOT, "registry/public/registry.json")
const OUTPUT_DIR = resolve(ROOT, "apps/registry-public/public/r")
const OUTPUT_FILE = resolve(OUTPUT_DIR, "registry.json")
const LLMS_TXT_FILE = resolve(ROOT, "apps/registry-public/public/llms.txt")

console.log("Building public registry …")

const raw = JSON.parse(readFileSync(INPUT, "utf-8"))
const { registry, warnings } = buildRegistry(raw)

for (const warning of warnings) {
  console.warn(`  ⚠ ${warning}`)
}

const sortedItems = sortRegistryItems(registry.items)

const itemsWithContent: RegistryItem[] = sortedItems.map((item) =>
  inlineItemFiles(item),
)

const aggregate: Registry = {
  ...registry,
  items: itemsWithContent,
}

mkdirSync(OUTPUT_DIR, { recursive: true })

clearStaleItemFiles(OUTPUT_DIR, itemsWithContent)

writeFileSync(OUTPUT_FILE, JSON.stringify(aggregate, null, 2) + "\n")

for (const item of itemsWithContent) {
  const itemPath = resolve(OUTPUT_DIR, `${item.name}.json`)
  writeFileSync(itemPath, JSON.stringify(item, null, 2) + "\n")
}

console.log(`  ✓ Written aggregate manifest with ${aggregate.items.length} items`)
console.log(`  ✓ Written ${aggregate.items.length} per-item JSON files`)

const llmsTxt = buildLlmsTxt(aggregate)
writeFileSync(LLMS_TXT_FILE, llmsTxt)
console.log(`  ✓ Written llms.txt`)

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function inlineItemFiles(item: RegistryItem): RegistryItem {
  if (!item.files || item.files.length === 0) return item

  const files = item.files.map((file) => {
    if (file.content) return file

    const sourcePath = resolve(ROOT, file.path)
    if (!existsSync(sourcePath)) {
      throw new Error(
        `Source file not found for item "${item.name}": ${file.path} (resolved to ${sourcePath})`,
      )
    }
    const content = readFileSync(sourcePath, "utf-8")
    return { ...file, content }
  })

  return { ...item, files }
}

function buildLlmsTxt(registry: Registry): string {
  const registryUrl = "https://registry.aether-ui.dev"
  const docsUrl = "https://aether-ui.dev"

  const typeOrder: Record<string, number> = {
    "registry:ui": 0,
    "registry:pattern": 1,
    "registry:block": 2,
  }

  const sorted = [...registry.items].sort((a, b) => {
    const ta = typeOrder[a.type] ?? 99
    const tb = typeOrder[b.type] ?? 99
    return ta !== tb ? ta - tb : a.name.localeCompare(b.name)
  })

  const primitives = sorted.filter((i) => i.type === "registry:ui")
  const patterns = sorted.filter((i) => i.type === "registry:pattern")
  const blocks = sorted.filter((i) => i.type === "registry:block")

  const formatItem = (item: RegistryItem): string => {
    const intent = item.ai?.intent ?? item.description ?? ""
    const installCmd = `aether-ui add ${item.name}`
    const slots = item.ai?.slots?.length ? `  Slots: ${item.ai.slots.join(", ")}` : ""
    const composition = item.ai?.composition?.length
      ? `  Often used with: ${item.ai.composition.join(", ")}`
      : ""
    const prompts = item.ai?.prompts?.length
      ? `  Prompts: ${item.ai.prompts.slice(0, 3).join(" | ")}`
      : ""
    return [
      `## ${item.title ?? item.name}`,
      `- Name: ${item.name}`,
      `- Install: ${installCmd}`,
      `- Source: ${registryUrl}/r/${item.name}.json`,
      `- Intent: ${intent}`,
      slots,
      composition,
      prompts,
    ]
      .filter(Boolean)
      .join("\n")
  }

  const lines: string[] = [
    `# Aether UI`,
    ``,
    `> Aether UI is a premium open-code design system for SaaS dashboards and admin interfaces.`,
    `> Registry format is compatible with shadcn/ui. Use the \`aether-ui\` CLI to install components.`,
    ``,
    `## Quick Start`,
    ``,
    `\`\`\`bash`,
    `npx aether-ui init          # initialise project, creates aether.json`,
    `npx aether-ui list          # browse available components`,
    `npx aether-ui add button    # install a component`,
    `npx aether-ui generate "build me a SaaS dashboard"  # AI-driven scaffolding`,
    `\`\`\``,
    ``,
    `## Documentation`,
    ``,
    `- Full docs: ${docsUrl}`,
    `- Registry API: ${registryUrl}/r/registry.json`,
    `- AI usage guide: ${docsUrl}/llms`,
    `- Tokens reference: ${docsUrl}/tokens`,
    `- Component reference: ${docsUrl}/components`,
    ``,
    `## Architecture`,
    ``,
    `Aether UI uses a four-layer architecture:`,
    `1. **Primitives** (registry:ui) — foundational components for forms, layout, and interaction`,
    `2. **Patterns** (registry:pattern) — higher-level compositions of primitives`,
    `3. **Blocks** (registry:block) — full page-section assemblies`,
    `4. **Tokens** — design tokens for colors, spacing, typography, and more`,
    ``,
    `## Primitives (${primitives.length})`,
    ``,
    ...primitives.map(formatItem).flatMap((s) => [s, ""]),
    `## Patterns (${patterns.length})`,
    ``,
    ...patterns.map(formatItem).flatMap((s) => [s, ""]),
    `## Blocks (${blocks.length})`,
    ``,
    ...blocks.map(formatItem).flatMap((s) => [s, ""]),
    `## Compose a SaaS Dashboard`,
    ``,
    `To build a standard SaaS dashboard, install these items in order:`,
    ``,
    `\`\`\`bash`,
    `npx aether-ui add dashboard-shell   # full-page layout with sidebar and topbar`,
    `npx aether-ui add metric-card       # KPI cards for the overview`,
    `npx aether-ui add table-toolbar     # search + filter above data tables`,
    `npx aether-ui add table             # data table`,
    `npx aether-ui add page-header       # page titles with breadcrumbs`,
    `npx aether-ui add empty-state       # zero-data fallbacks`,
    `npx aether-ui add loading-state     # async loading indicators`,
    `npx aether-ui add error-state       # fetch error fallbacks`,
    `\`\`\``,
    ``,
    `## Compose an Authentication Flow`,
    ``,
    `\`\`\`bash`,
    `npx aether-ui add login-block       # email + password login`,
    `npx aether-ui add signup-block      # registration form`,
    `\`\`\``,
    ``,
    `## Token-Driven Styling`,
    ``,
    `All components consume CSS custom properties from \`@aetherstack/tokens\`.`,
    `Override the design system by redefining tokens in your global CSS:`,
    ``,
    `\`\`\`css`,
    `:root {`,
    `  --color-primary: 220 90% 56%;`,
    `  --radius: 0.5rem;`,
    `}`,
    `\`\`\``,
  ]

  return lines.join("\n") + "\n"
}

function clearStaleItemFiles(dir: string, currentItems: RegistryItem[]): void {
  const keep = new Set(["registry.json", ...currentItems.map((i) => `${i.name}.json`)])
  for (const entry of readdirSync(dir)) {
    if (!entry.endsWith(".json")) continue
    if (keep.has(entry)) continue
    rmSync(resolve(dir, entry))
  }
}
