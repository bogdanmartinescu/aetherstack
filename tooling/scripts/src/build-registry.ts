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

function clearStaleItemFiles(dir: string, currentItems: RegistryItem[]): void {
  const keep = new Set(["registry.json", ...currentItems.map((i) => `${i.name}.json`)])
  for (const entry of readdirSync(dir)) {
    if (!entry.endsWith(".json")) continue
    if (keep.has(entry)) continue
    rmSync(resolve(dir, entry))
  }
}
